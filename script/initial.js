import { apiRequest } from './services.js';
import constant from './constants.js';
import { makeImagesCards, myGalleryCardMaker } from './cardMaker.js';

/**
 * Global Variables
 */
const initialImagesURL = `${constant.BASE_URL}${constant.API_KEY}&per_page=30`;
const masonryNode = document.querySelector('.masonryGallery');
const filterButton = document.querySelector('.filter');
const categorySelect = document.querySelector('#category');
const createButton = document.querySelector('.create');

const link = document.querySelector('#imageLink');
const page = document.querySelector('#pageLink');
const title = document.querySelector('#imageTitle');
const category = document.querySelector('#newImageCategory');

/**
 * Events
 */
window.addEventListener('hashchange', init);
filterButton.addEventListener('click', filter);
createButton.addEventListener('click', newImage);
link.addEventListener('input', checkValue);
page.addEventListener('input', checkValue);
title.addEventListener('input', checkValue);
category.addEventListener('input', checkValue);

/**
 * @description Reset modal when is closed
 */
$('#new-image').on('hide.bs.modal', () => {
    document.getElementById("new-image-form").reset();
    createButton.disabled = true;
});

/**
 * @method getImages
 * @description Get images from API without filter
 */
function getImages() {
    const initialImages = apiRequest(initialImagesURL);
    initialImages.then((response) => {
        makeImagesCards(response.hits, masonryNode);
    }).catch((error) => { console.log(error) });
};

/**
 * @method filter
 * @description Get images from API according filter selection
 */
function filter() {
    const category = categorySelect.value;
    history.pushState({}, category, `#${category}`);
    if (category != "") {
        const filterURL = `${initialImagesURL}&category=${category}`;
        const getFilterImages = apiRequest(filterURL);
        getFilterImages.then((response) => {
            makeImagesCards(response.hits, masonryNode);
        }).catch((error) => { console.log(error) });
    } else {
        getImages();
    };
};

/**
 * @method init
 * @description Change URL according filter selection
 */
function init() {
    const category = window.location.hash.split('#')[1];
    if (category === undefined) {
        categorySelect.value = "";
        getImages();
    } else {
        categorySelect.value = category;
        filter();
    };
};

/**
 * @method newImage
 * @description Create new image
 */
function newImage() {
    const myGallery = document.querySelector('.myGallery');
    const newImageInfo = {
        link: link.value,
        page: page.value,
        title: title.value,
        category: category.value
    };
    myGalleryCardMaker(newImageInfo, myGallery);
    document.querySelector('.myGallery__container').classList.remove('d-none');
};

/**
 * @method checkValue
 * @description Check form input values to enable create button
 */
function checkValue() {
    if (link.value.trim() && page.value.trim() && title.value.trim() && category.value.trim() != "") {
        createButton.disabled = false;
    } else {
        createButton.disabled = true;
    };
};

init();