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
 * @param {string} id
 * @param {string} url
 * @param {string} title
 * @returns {string}
 */
const cardMarkup = ((id, url, title) => {
    return `    
    <div class="card position-relative">
        <a href="${url}" target="blank"><img class="img-${id} card-img-top image" src="./assets/loading.gif" alt="${title}"></a>
        <div class="d-flex p-2 justify-content-between align-items-baseline hidden card__header position-absolute">
            <h4 class="text-white m-0 title">${title}</h4>
            <button type="button" class="btn btn-sm btn-outline-light ml-1 delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
    </div>`
});

/**
 * @method myGalleryCardMaker
 * @description Get images data and create cards
 * @param {object} imageInfo
 * @param {object} htmlNode
 */
function myGalleryCardMaker(imageInfo, htmlNode) {
    const { link, page, title, category } = imageInfo;
    const card = myImageCardMarkup(link, page, title, category);
    htmlNode.innerHTML += card;
    htmlNode.querySelectorAll('.delete').forEach((button) => button.addEventListener('click', deleteImage));
};

/**
 * @method myImageCardMarkup
 * @description Card marking method
 * @param {string} link
 * @param {string} page
 * @param {string} title
 * @param {string} category
 * @returns {string}
 */
const myImageCardMarkup = ((link, page, title, category) => {
    return `    
    <div class="card position-relative">
        <a href="${page}" target="blank"><img data-category="${category}" class="card-img-top image" src="${link}" alt="${title}"></a>
        <div class="d-flex p-2 justify-content-between align-items-baseline hidden card__header position-absolute">
            <h4 class="text-white m-0 title">${title}</h4>
            <button type="button" class="btn btn-sm btn-outline-light ml-1 delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
    </div>`
});


/**
 * @method deleteImage
 * @description Delete cards
 * @param {object} event
 */
function deleteImage(e) {
    e.currentTarget.parentNode.parentNode.classList.add('d-none');
};

/**
 * @method loadImage
 * @description Render images when they are already loaded
 * @param {string} imagePath
 * @param {string} where
 */
async function loadImage(imagePath, where) {
    const target = document.querySelector(where);
    try {
        const response = await fetch(imagePath);
        if (response.ok) {
            target.style.filter = 'opacity(0)';
            const myBlob = await response.blob();
            const objectURL = URL.createObjectURL(myBlob);
            target.src = objectURL;
            target.onload = () => target.style.filter = 'opacity(1)';
        } else {
            console.log('Nextwork OK but wrong HTTP response');
        };
    } catch (error) {
        console.log('Fetch issues:' + error.message);
    };
};

export {

    makeImagesCards,
    myGalleryCardMaker
};