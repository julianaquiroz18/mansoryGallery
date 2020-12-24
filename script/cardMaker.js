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
        const imageId = image.id;
        return cardMarkup(imageId, imageURL, imageTitle);
    });
    htmlNode.innerHTML = "";
    htmlNode.innerHTML += imagesHTML.join("\n");
    images.forEach(image => loadImage(image.largeImageURL, `.img-${image.id}`));
    htmlNode.querySelectorAll('.delete').forEach((button) => button.addEventListener('click', deleteImage));
};

/**
 * @method cardMarkup
 * @description Card marking method
 * @param {string} url
 * @param {string} title
 * @returns {string}
 */
const cardMarkup = ((id, url, title) => {
    return `    
    <div class="card position-relative">
        <a href="${url}" target="blank"><img class="img-${id} card-img-top image" src="./assets/loading.gif" alt="${title}"></a>
        <div class="d-flex p-2 justify-content-between align-items-baseline hidden card__header position-absolute">
            <h4 class="text-white m-0">${title}</h4>
            <button type="button" class="btn btn-sm btn-outline-light ml-1 delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
    </div>`
});

async function loadImage(imagePath, where) {
    const target = document.querySelector(where);
    try {
        const response = await fetch(imagePath);
        if (response.ok) {
            target.style.filter = 'opacity(0)';
            const miBlob = await response.blob()
            const objectURL = URL.createObjectURL(miBlob);
            target.onload = () => target.style.filter = '';
            target.src = objectURL;
        } else {
            console.log('Respuesta de red OK pero respuesta HTTP no OK');
        }
    } catch (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    }
}


export {

    makeImagesCards
};