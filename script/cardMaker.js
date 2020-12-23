import { animateImage, hideTitle, deleteImage } from './eventsCallbacks.js'

/**
 * @method makeImagesCards
 * @description Get images data and create cards
 * @param {array} images
 * @param {object} htmlNode
 */
function makeImagesCards(images, htmlNode) {
    const imagesHTML = images.map((image) => {
        const imageURL = image.largeImageURL;
        const imageTitle = image.tags;
        return cardMarkup(imageURL, imageTitle);
    });
    htmlNode.innerHTML += imagesHTML.join("\n");
    htmlNode.querySelectorAll('.card').forEach((card) => card.addEventListener('mouseenter', animateImage));
    htmlNode.querySelectorAll('.card').forEach((card) => card.addEventListener('mouseleave', hideTitle));
    htmlNode.querySelectorAll('.delete').forEach((button) => button.addEventListener('click', deleteImage));
};

/**
 * @method cardMarkup
 * @description Card marking method
 * @param {string} url
 * @param {string} title
 * @returns {string}
 */
const cardMarkup = ((url, title) => {
    return `    
    <div class="card position-relative">
        <a href="${url}" target="blank"><img class="card-img-top image" src="${url}" alt="${title}"></a>
        <div class="d-flex p-2 justify-content-between align-items-baseline hidden card__header position-absolute">
            <h4 class="text-white m-0">${title}</h4>
            <button type="button" class="btn btn-sm btn-outline-light ml-1 delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
    </div>`
});


export {

    makeImagesCards
};