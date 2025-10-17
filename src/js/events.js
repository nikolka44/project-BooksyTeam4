console.log('Events.js loaded'); // ✅ Для перевірки

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

    const slideWidth = slides[0].offsetWidth;
    const gap = window.innerWidth >= 768 ? 24 : 24;
    const offset = currentIndex * (slideWidth + gap);

    slider.style.transform = `translateX(-${offset}px)`;

    const maxIndex = Math.max(0, slides.length - visible);
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;

    paginationDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

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

  document.addEventListener('keydown', e => {
    const active = document.activeElement;
    const isTyping =
      active &&
      (active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.isContentEditable);
    if (isTyping) return;

    if (e.key === 'ArrowRight') {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, slides.length - visible);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    }
  });

  let startX = 0;
  let isDragging = false;

  // mouse
  slider.addEventListener('mousedown', e => {
    if (e.target.closest('button, a, input, textarea, select')) return;
    isDragging = true;
    startX = e.clientX;
  });

  slider.addEventListener('mouseup', e => {
    if (!isDragging) return;
    const endX = e.clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        const visible = getVisibleCount();
        const maxIndex = Math.max(0, slides.length - visible);
        if (currentIndex < maxIndex) currentIndex++;
      } else {
        if (currentIndex > 0) currentIndex--;
      }
      updateSlider();
    }
    isDragging = false;
  });

  slider.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  slider.addEventListener('touchstart', e => {
    if (!e.touches || !e.touches[0]) return;
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', e => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        const visible = getVisibleCount();
        const maxIndex = Math.max(0, slides.length - visible);
        if (currentIndex < maxIndex) currentIndex++;
      } else {
        if (currentIndex > 0) currentIndex--;
      }
      updateSlider();
    }
  });

  paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, slides.length - visible);
      currentIndex = Math.min(index, maxIndex);
      updateSlider();
    });
  });

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

  function handleModalKeydown(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  function openModal(eventName) {
    modalEventName.textContent = eventName;
    modal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleModalKeydown);
  }

  function closeModal() {
    modal.classList.add('is-hidden');
    document.body.style.overflow = '';
    eventForm.reset();
    document.removeEventListener('keydown', handleModalKeydown);
  }

  eventButtons.forEach((btn, index) => {
    console.log(`Setting up button ${index}`, btn);
    btn.addEventListener('click', e => {
      e.preventDefault();
      const eventName = btn.getAttribute('data-event');
      console.log('Button clicked, event:', eventName);
      openModal(eventName);
    });
  });

  modalClose.addEventListener('click', e => {
    e.preventDefault();
    closeModal();
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ========== FORM SUBMIT ==========
  eventForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(eventForm);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);

    iziToast.success({
      message: `Thank you for registering for "${modalEventName.textContent}"! We'll contact you soon.`,
      position: 'topRight',
      timeout: 4000,
      backgroundColor: '#343232ff',
      icon: '',
      messageColor: '#fff',
    });

    closeModal();
  });
});
