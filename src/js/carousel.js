import Swiper from 'swiper';
import {Navigation, Pagination, HashNavigation} from 'swiper/modules';

export function loadCarousel() {
    const swiper = document.querySelector('.swiper');
    if (!swiper) return;

    return new Swiper('.swiper', {
        modules: [Navigation, Pagination, HashNavigation],
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        hashNavigation: {
            watchState: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}
