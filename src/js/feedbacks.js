import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Keyboard,
  A11y,
  Autoplay,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const feedbacksSwiper = new Swiper('.swiper-feedbacks', {
  modules: [Navigation, Pagination, Keyboard, A11y, Autoplay],

  wrapperClass: 'feedbacks__list',
  slideClass: 'feedbacks__elements',

  loop: false,
  speed: 400,
  spaceBetween: 24,
  slidesPerView: 3,
  watchOverflow: true,
  simulateTouch: true,
  grabCursor: true,

  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 0 },
    768: { slidesPerView: 2, spaceBetween: 24 },
    1440: { slidesPerView: 3, spaceBetween: 24 },
  },

  keyboard: { enabled: true, onlyInViewport: true },

  a11y: {
    enabled: true,
    slideRole: 'group', 
    itemRoleDescriptionMessage: 'slide',
    slideLabelMessage: '{{index}} / {{slidesLength}}',
    paginationBulletMessage: 'Go to slide {{index}}',
    prevSlideMessage: 'Previous testimonials',
    nextSlideMessage: 'Next testimonials',
    wrapperLiveRegion: true, 
  },

  navigation: {
    nextEl: '.feedbacks__btn--next',
    prevEl: '.feedbacks__btn--prev',
    disabledClass: 'is-disabled',
  },

  pagination: {
    el: '.feedbacks__dots',
    clickable: true,
    bulletElement: 'button', 
    bulletClass: 'feedbacks__dots-elem',
    bulletActiveClass: 'is-active',
    renderBullet: (index, className) => {
      const slideId = `feedbacks-slide-${index + 1}`;
      return `<button type="button"
                      class="${className}"
                      role="tab"
                      aria-controls="${slideId}"
                      aria-label="Go to testimonial ${index + 1}">
              </button>`;
    },
  },

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  on: {
    afterInit(sw) {
      syncNavDisabled(sw);
      fixSlidesAria(sw);
    },
    slideChange(sw) {
      syncNavDisabled(sw);
      updateBulletAria(sw);
    },
  },
});

function syncNavDisabled(sw) {
  const prev = sw.navigation?.prevEl;
  const next = sw.navigation?.nextEl;
  if (prev)
    prev.setAttribute(
      'aria-disabled',
      prev.classList.contains('is-disabled') ? 'true' : 'false'
    );
  if (next)
    next.setAttribute(
      'aria-disabled',
      next.classList.contains('is-disabled') ? 'true' : 'false'
    );
}

function fixSlidesAria(sw) {
  const slides = sw.slides;
  slides.forEach((slideEl, i) => {
    if (!slideEl.id) slideEl.id = `feedbacks-slide-${i + 1}`;
    slideEl.setAttribute('role', 'group'); 
    slideEl.setAttribute('aria-roledescription', 'slide');
    slideEl.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
  });
  updateBulletAria(sw);
}

function updateBulletAria(sw) {
  const bullets = sw.pagination?.bullets || [];
  bullets.forEach((b, i) => {
    const slideId = `feedbacks-slide-${i + 1}`;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', slideId);
    b.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    b.setAttribute('aria-selected', i === sw.activeIndex ? 'true' : 'false');
  });
}

