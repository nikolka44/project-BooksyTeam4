document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('.events-list');
  if (!list) return;

  const cards = document.querySelectorAll('.item-card');
  const container = document.querySelector('.events-container');

  // Создаем элементы управления
  const controls = document.createElement('div');
  controls.className = 'slider-controls';
  controls.innerHTML = `
    <div class="dots"></div>
    <div class="arrows">
      <button class="slider-btn prev" aria-label="Previous slide">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.707 12.5049L4.414 8.21188H14V6.21188H4.414L8.707 1.91888L7.293 0.504883L0.585999 7.21188L7.293 13.9189L8.707 12.5049Z" fill="white"/>
        </svg>
      </button>
      <button class="slider-btn next" aria-label="Next slide">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.293 12.5049L6.707 13.9189L13.414 7.21188L6.707 0.504883L5.293 1.91888L9.586 6.21188H0V8.21188H9.586L5.293 12.5049Z" fill="white"/>
        </svg>
      </button>
    </div>
  `;
  container.appendChild(controls);

  const dotsContainer = controls.querySelector('.dots');
  const prevBtn = controls.querySelector('.prev');
  const nextBtn = controls.querySelector('.next');

  let current = 0;
  let slidesToShow = 1;

  // === Создание точек ===
  function createDots() {
    dotsContainer.innerHTML = '';
    const totalDots =
      slidesToShow === 1 ? cards.length : cards.length - slidesToShow + 1;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dotsContainer.appendChild(dot);
    }
  }

  // === Обновление отображения ===
  function updateSlider() {
    const total = cards.length;
    cards.forEach((card, i) => {
      card.style.display =
        i >= current && i < current + slidesToShow ? 'flex' : 'none';
    });

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));

    // --- Обновляем состояние стрелок ---
    prevBtn.classList.toggle('is-disabled', current === 0);
    nextBtn.classList.toggle('is-disabled', current >= total - slidesToShow);
  }

  // === Проверка ширины окна ===
  function checkViewport() {
    const width = window.innerWidth;

    if (width >= 1440) {
      slidesToShow = cards.length;
      cards.forEach(card => (card.style.display = 'flex'));
      controls.style.display = 'none';
    } else {
      slidesToShow = width < 768 ? 1 : 2;
      controls.style.display = 'flex';
      current = 0;
      createDots();
      updateSlider();
    }
  }

  // === Навигация стрелками ===
  nextBtn.addEventListener('click', () => {
    const total = cards.length;
    if (current < total - slidesToShow) {
      current++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (current > 0) {
      current--;
      updateSlider();
    }
  });

  // === Навигация по точкам ===
  dotsContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('dot')) return;
    const index = Array.from(dotsContainer.children).indexOf(e.target);
    current = index;
    updateSlider();
  });

  // === Слушатель ресайза ===
  window.addEventListener('resize', checkViewport);
  checkViewport();
});
