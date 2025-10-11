import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    loop: false,
    navigation: {
        nextEl: '.hero__button--next',
        prevEl: '.hero__button--prev',
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