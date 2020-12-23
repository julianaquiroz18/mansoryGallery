import { apiRequest } from './services.js';
import constant from './constants.js';
import { makeImagesCards } from './cardMaker.js'

const initialImagesURL = `${constant.BASE_URL}${constant.API_KEY}&per_page=30`;
const mansoryNode = document.querySelector('.mansoryGallery')
const filterButton = document.querySelector('.filter');
const categorySelect = document.querySelector('#category');

history.replaceState({}, 'Home', '#home');
window.addEventListener('hashchange', changePage)
filterButton.addEventListener('click', filter);

function init() {
    const getInitialImages = apiRequest(initialImagesURL);
    getInitialImages.then((response) => {
        makeImagesCards(response.hits, mansoryNode)
        console.log(response)
    }).catch((error) => { console.log(error) });
}

function filter() {
    const category = categorySelect.value;
    history.pushState({}, category, `#${category}`)
    if (category != "") {
        const filterURL = `${initialImagesURL}&category=${category}`;
        const getFilterImages = apiRequest(filterURL);
        getFilterImages.then((response) => {
            makeImagesCards(response.hits, mansoryNode)
        }).catch((error) => { console.log(error) });
    }
}

function changePage() {
    const category = window.location.hash.split('#')[1];
    if (category === 'home') {
        categorySelect.value = "";
        init()
    } else {
        categorySelect.value = category;
        filter();
    }
}

init()