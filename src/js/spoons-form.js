import {routes} from "../router.js";
import {loadCarousel} from "./carousel.js";

async function getResearchPropositions(q) {
    return fetch('/api/spoons/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({q})
    })
        .then(r => r.json())
        .catch(err => {
            console.log(`error when fetching Spoons data: ${err}`)
            return [];
        });
}

export function searchIngredients() {
    let ingredient = '';
    if (routes[window.location.pathname] !== 'spoons') return;
    const searchInput = document.getElementById("ingredient-search");
    const propositions = document.getElementById('search-propositions');
    if (!searchInput || !propositions) return;
    searchInput.addEventListener('input', async (e) => {
            const q = e.target.value;
            searchInputAnimation(q.length);
            if (!isInputValueValid(q)) {
                removeChildren(propositions);
                return;
            }
            const spoons = await getResearchPropositions(q);
            renderPropositions(spoons);
        }, {passive: true}
    )
}

function renderPropositions(spoons) {
    const resultsContainer = document.getElementById('search-propositions');
    if (!resultsContainer) return;
    removeChildren(resultsContainer);
    const swiper = loadCarousel();
    if (!spoons.length) return;
    for (let i = 0; i < Math.min(spoons.length, 2); i++) {
        const proposition = document.createElement('div');
        proposition.innerText = spoons[i].ingredient;
        proposition.classList.add('search-proposition');
        resultsContainer.appendChild(proposition)
        proposition.addEventListener('touchstart', () => {
            const target = spoons[i].index;
            console.log(target)
            swiper.slideTo(target, 600);
        })
    }
}

function isInputValueValid(value) {
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0 && trimmedValue.length > 25) return null;
    const regex = /^[a-zA-ZÀ-ÿ -]+$/;

    return regex.test(value);
}

function searchInputAnimation(searchLength) {
    const clearButton = document.getElementById("clear-button");
    const searchInput = document.getElementById('ingredient-search');
    const propositions = document.getElementById('search-propositions');
    if (!clearButton || !searchInput || !propositions) return;
    if (searchLength > 0 && clearButton.style.opacity !== '1') {
        clearButton.style.opacity = '1';
    }
    if (searchLength === 0 && clearButton.style.opacity !== '0.1') {
        clearButton.style.opacity = '0.1';
    }
    if (searchLength > 0) {
        clearButton.addEventListener('touchstart', () => {
            searchInput.value = '';
            removeChildren(propositions);
        }, {passive: true})
    }
}

const removeChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function ingredientRedirection(ingredient) {

}
