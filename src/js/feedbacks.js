import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, A11y, Autoplay } from 'swiper/modules';
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
   autoplay: {
   delay: 5000,
   disableOnInteraction: false,
 },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  a11y: {
    enabled: true,
    containerRoleDescriptionMessage: 'Testimonials slider',
    slideRole: 'listitem',
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
    bulletClass: 'feedbacks__dots-elem',
    bulletActiveClass: 'is-active',
    renderBullet: (index, className) =>
      `<span class="${className}" aria-label="Go to slide group ${
        index + 1
      }"></span>`,
  },
  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 16 },
    768: { slidesPerView: 2, spaceBetween: 24 },
    1440: { slidesPerView: 3, spaceBetween: 24 },
  },
});
