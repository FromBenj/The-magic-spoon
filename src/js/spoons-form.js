import {routes} from "../router.js";

async function getResearchPropositions(q) {
    return fetch('/api/spoons/data/search', {
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
    if (!searchInput) return;
    searchInput.addEventListener('input', async (e) => {
        const q = e.target.value;
        if (!isInputValueValid(q) || q.length > 1) return;
        const ingredients = await getResearchPropositions(q);
        console.log(ingredients);
    })

    return ingredient;
}

function renderAutoCompletion(ingredients) {
    return '';
}

function isInputValueValid(value) {
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0 && trimmedValue.length > 25) return null;
    const regex = /^[a-zA-ZÀ-ÿ -]+$/;

    return regex.test(value);
}

function searchInputAnimation(searchLength) {
    const clearButton = document.getElementById("clear-button");
    if (!clearButton) return;
    if (searchLength === 0) clearButton.style.display = 'none';
    if (searchLength !== 0 && clearButton.style.display !== 'block') {
        clearButton.style.display = 'block';
    }

    clearButton.addEventListener('touchstart', () => {

    })
}
