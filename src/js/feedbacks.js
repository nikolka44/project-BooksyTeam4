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
    0: { slidesPerView: 1, spaceBetween: 16 },
    768: { slidesPerView: 2, spaceBetween: 24 },
    1440: { slidesPerView: 3, spaceBetween: 24 },
  },

  keyboard: { enabled: true, onlyInViewport: true },

  a11y: {
    enabled: true,
    prevSlideMessage: 'Previous testimonials',
    nextSlideMessage: 'Next testimonials',
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
  },

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  on: {
    afterInit(sw) {
      syncNavDisabled(sw);
    },
    slideChange(sw) {
      syncNavDisabled(sw);
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
