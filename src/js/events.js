console.log('Events.js loaded'); // ✅ Для перевірки

// Чекаємо завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired in events.js');
  // ========== SLIDER LOGIC ==========
  const slider = document.querySelector('.events-list');
  const slides = document.querySelectorAll('.event-item');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const paginationDots = document.querySelectorAll('.pagination-dot');

  if (!slider || !slides.length) {
    console.error('Slider elements not found');
    return;
  }

  let currentIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth >= 1440) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateSlider() {
    const visible = getVisibleCount();
    
        // Для мобільної та планшета
    const slideWidth = slides[0].offsetWidth;
    const gap = window.innerWidth >= 768 ? 24 : 24;
    const offset = currentIndex * (slideWidth + gap);
    
    slider.style.transform = `translateX(-${offset}px)`;
    
    // Оновлення кнопок
    const maxIndex = Math.max(0, slides.length - visible);
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
    
    // Оновлення пагінації
    paginationDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Кнопки навігації
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, slides.length - visible);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  }

  // Пагінація - клік по точках
  paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, slides.length - visible);
      currentIndex = Math.min(index, maxIndex);
      updateSlider();
    });
  });

  // Оновлення при зміні розміру екрана
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, slides.length - visible);
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
      updateSlider();
    }, 100);
  });

  // Ініціалізація
  updateSlider();

  // ========== MODAL LOGIC ==========
  const modal = document.getElementById('eventModal');
  const modalEventName = document.getElementById('modalEventName');
  const modalClose = document.querySelector('.modal-close');
  const eventForm = document.getElementById('eventForm');
  const eventButtons = document.querySelectorAll('.event-btn');

  if (!modal || !modalEventName || !modalClose || !eventForm) {
    console.error('Modal elements not found');
    return;
  }

  console.log('Found event buttons:', eventButtons.length);

  // Відкриття модального вікна
  eventButtons.forEach((btn, index) => {
    console.log(`Setting up button ${index}`, btn);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventName = btn.getAttribute('data-event');
      console.log('Button clicked, event:', eventName);
      modalEventName.textContent = eventName;
      modal.classList.remove('is-hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  // Закриття модального вікна
  function closeModal() {
    modal.classList.add('is-hidden');
    document.body.style.overflow = '';
    eventForm.reset();
  }

  modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });

  // Закриття по кліку на backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Закриття по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('is-hidden')) {
      closeModal();
    }
  });

  // Відправка форми
  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(eventForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Показати повідомлення
    alert(`Thank you for registering for "${modalEventName.textContent}"! We'll contact you soon.`);
    
    closeModal();
  });
});
