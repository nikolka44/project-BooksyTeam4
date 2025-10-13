document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('.events-list');
  if (!list) return;

  const cards = document.querySelectorAll('.item-card');
  const container = document.querySelector('.events-container');

  const controls = document.createElement('div');
  controls.className = 'slider-controls';
  controls.innerHTML = `
    <div class="dots"></div>
    <div class="arrows">
      <button class="slider-btn prev" aria-label="Previous slide">
        <svg>
          <use href="/img/icons.svg#icon-left-arrow"></use>
        </svg>
      </button>
      <button class="slider-btn next" aria-label="Next slide">
        <svg>
          <use href="/img/icons.svg#icon-right-arrow"></use>
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

  function fadeOutIn(callback) {
    list.style.transition = 'opacity 0.3s ease';
    list.style.opacity = '0';
    setTimeout(() => {
      callback();
      list.style.opacity = '1';
    }, 300);
  }

  function updateSlider() {
    const total = cards.length;
    cards.forEach((card, i) => {
      card.style.display =
        i >= current && i < current + slidesToShow ? 'flex' : 'none';
    });

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));

    prevBtn.classList.toggle('is-disabled', current === 0);
    nextBtn.classList.toggle('is-disabled', current >= total - slidesToShow);
  }

  function checkViewport() {
    const width = window.innerWidth;

    if (width >= 1440) {
      slidesToShow = cards.length;
      cards.forEach(card => (card.style.display = 'flex'));
      controls.style.display = 'none';
      list.style.transition = '';
      list.style.opacity = '1';
    } else {
      slidesToShow = width < 768 ? 1 : 2;
      controls.style.display = 'flex';
      current = 0;
      createDots();
      updateSlider();
    }
  }

  nextBtn.addEventListener('click', () => {
    const total = cards.length;
    if (current < total - slidesToShow) {
      fadeOutIn(() => {
        current++;
        updateSlider();
      });
    }
  });

  prevBtn.addEventListener('click', () => {
    if (current > 0) {
      fadeOutIn(() => {
        current--;
        updateSlider();
      });
    }
  });

  dotsContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('dot')) return;
    const index = Array.from(dotsContainer.children).indexOf(e.target);
    fadeOutIn(() => {
      current = index;
      updateSlider();
    });
  });

  window.addEventListener('resize', checkViewport);
  checkViewport();
});
