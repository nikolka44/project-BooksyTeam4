import Swiper from 'swiper';
import { Navigation, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const prevBtn = document.querySelector('.hero__button--prev');
const nextBtn = document.querySelector('.hero__button--next');

if (prevBtn && nextBtn) {
    const swiper = new Swiper('.swiper', {
        modules: [Navigation, Keyboard, Autoplay],
        slidesPerView: 1,
        speed: 400,
        grabCursor: true,
        watchOverflow: true,
        simulateTouch: true,
        loop: false,

        navigation: { nextEl: nextBtn, prevEl: prevBtn },

        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        on: {
            init: updateButtons,
            slideChange: updateButtons,
        },
    });

    function updateButtons(swiper) {
        prevBtn.disabled = swiper.isBeginning;
        nextBtn.disabled = swiper.isEnd;
    }
}