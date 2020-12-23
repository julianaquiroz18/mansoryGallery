import { apiRequest } from './services.js';
import constant from './constants.js';
import { makeImagesCards } from './cardMaker.js'

const filterButton = document.querySelector('.filter');
const categorySelect = document.querySelector('#category');


filterButton.addEventListener('click', filter);


function filter() {
    const category = categorySelect.value;
    const filterURL = `${constant.BASE_URL}${constant.API_KEY}&per_page=30&category=${category}`;
    const getFilterImages = apiRequest(filterURL);
    getFilterImages.then((response) => {
        makeImagesCards(response.hits, mansoryNode)
    }).catch((error) => { console.log(error) });
}