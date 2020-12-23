import { apiRequest } from './services.js';
import constant from './constants.js';
import { makeImagesCards } from './cardMaker.js'

const initialImagesURL = constant.BASE_URL + constant.API_KEY + '&per_page=30';
const mansoryNode = document.querySelector('.mansoryGallery')

const getInitialImages = apiRequest(initialImagesURL);
getInitialImages.then((response) => {
    makeImagesCards(response.hits, mansoryNode)
    console.log(response)
}).catch((error) => { console.log(error) });