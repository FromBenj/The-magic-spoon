import {renderCarousel} from "./js/carousel.js";
import {searchIngredients} from "./js/spoons-form.js";

const app = document.getElementById('app');

export const routes = {
    '/': 'home',
    '/spoons': 'spoons',
    '/favourites': 'favorites',
    '/oops': '404-error',
};

export function appRouter() {
    document.addEventListener('click', (e) => {
        e.preventDefault();
        const viewName = e.target.dataset.nextView;
        if (!viewName) return;
        const link = '/' + viewName;
        navigateTo(link.href);
    });
    backButton();
    window.addEventListener('popstate', render);
    render();
}

function navigateTo(url) {
    history.pushState(null, null, url);
    render();
}

function render() {
    const path = window.location.pathname;
    const viewName = routes[path] ?? '404-error';
    loadView(viewName)
        .then(async html => {
            headerManagement(viewName);
            app.innerHTML = html ?? get404ErrorView();
            if (viewName === 'spoons') {
                searchIngredients();
                await renderCarousel();
            }
        })
}

function loadView(viewName) {
    if (!app) return;
    return fetch('./views/' + viewName + '.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Request error');
            }
            return response.text();
        })
        .catch((error) => {
            console.error('Failed to load' + viewName + '.html', error);
            return null;
        });
}

function get404ErrorView() {
    const errorView = document.getElementById('error-404-view');
    if (!errorView) return;

    return errorView.innerHTML;
}

function headerManagement(viewName) {
    const header = document.getElementById('header');
    if (!header) return;
    if (viewName === 'home') {
        header.style.display = 'none';
    } else if (header.style.display === 'none') {
        header.style.display = "block";
    }
}

function backButton() {
    const backButton = document.querySelector('.back-btn');
    if (!backButton) return;
    backButton.addEventListener('touchstart', () => {
        window.history.back();
    })
}
