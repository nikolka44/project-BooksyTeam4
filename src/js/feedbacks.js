import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const prevBtnFeed = document.querySelector('.feedbacks__btn--prev');
const nextBtnFeed = document.querySelector('.feedbacks__btn--next');

if (prevBtnFeed && nextBtnFeed) {
  const feedbacksSwiper = new Swiper('.swiper-feedbacks', {
    modules: [Navigation, Keyboard, Autoplay, Pagination],
    slidesPerView: 1,
    speed: 400,
    grabCursor: true,
    watchOverflow: true,
    simulateTouch: true,
    loop: false,

    navigation: { nextEl: nextBtnFeed, prevEl: prevBtnFeed },

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 0 },
      768: { slidesPerView: 2, spaceBetween: 24 },
      1440: { slidesPerView: 3, spaceBetween: 24 },
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    on: {
      init: updateButtons,
      slideChange: updateButtons,
    },
    pagination: {
      el: '.feedbacks__dots',
      clickable: true,
      bulletElement: 'button',
      bulletClass: 'feedbacks__dots-elem',
      bulletActiveClass: 'is-active',
    },
  });

  function updateButtons(feedbacksSwiper) {
    prevBtnFeed.disabled = feedbacksSwiper.isBeginning;
    nextBtnFeed.disabled = feedbacksSwiper.isEnd;
  }
}
