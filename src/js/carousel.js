import Swiper from 'swiper';
import {HashNavigation, Navigation, Pagination} from 'swiper/modules';
import {routes} from "../router.js";
import Mustache from "mustache";

export async function renderCarousel() {
    if (routes[window.location.pathname] !== 'spoons') return;
    await addCarouselContent();
    loadCarousel();
}

function loadCarousel() {
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
            dynamicBullets: true,
            dynamicMainBullets: 3,
            clickable: true,
        },
    });
}

async function addCarouselContent() {
    const templateHTML = await loadTemplate();
    const parser = new DOMParser();
    const doc = parser.parseFromString(templateHTML, 'text/html');
    const template = doc.getElementById('spoons-carousel-template').innerHTML;
    if (!template) return;
    const spoons = await fetch('/api/spoons/data')
        .then(r => r.json())
        .catch(err => {
            console.log(err);
            console.log('error when fetching Spoons data')
        });

    const context = {spoons};
    document.getElementById('spoons-carousel-container').innerHTML = Mustache.render(template, context);
}

async function loadTemplate() {
    const url = './views/components/carousel.html';

    return fetch(url)
        .then(res => res.text())
        .catch(err => {
            console.error('Error loading template:', err);
            return '';
        });
}
