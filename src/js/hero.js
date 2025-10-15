import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, Keyboard, A11y, Autoplay],
    slidesPerView: 1,
    loop: false,
    speed: 400,
    watchOverflow: true,
    simulateTouch: true,
    grabCursor: true,
    navigation: {
        nextEl: '.hero__button--next',
        prevEl: '.hero__button--prev',
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    on: {
        init: function () {
            updateButtons(this);
        },
        slideChange: function () {
            updateButtons(this);
        },

    },
});

function updateButtons(swiper) {
    const prevBtn = document.querySelector('.hero__button--prev');
    const nextBtn = document.querySelector('.hero__button--next');

    prevBtn.disabled = swiper.isBeginning;
    nextBtn.disabled = swiper.isEnd;
}