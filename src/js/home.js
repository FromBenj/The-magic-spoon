import {routes} from "../router.js";
export function loadHome() {
    if (routes[window.location.pathname] !== 'home') return;
    const homeContainer = document.getElementById('home-container');
    if (!homeContainer) return;
    fetch('./html/home.html')
        .then(response => response.text())
        .then(html => {
            homeContainer.innerHTML = html;
        })
        .catch(() => {
            return console.error('Failed to load home.html');
        })
}
