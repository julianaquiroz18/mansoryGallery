function animateImage(e) {
    const card = e.currentTarget;
    card.querySelector('.card__header').classList.add('appear');
    card.style.zIndex = '100';
    card.animate([
        { transform: "scale(1)" },
        { transform: "scale(1.25)" },
        { transform: "scale(1)" },
    ], {
        duration: 700,
        easing: "linear"
    })
}

function hideTitle(e) {
    const card = e.currentTarget;
    card.querySelector('.card__header').classList.remove('appear');
    card.style.zIndex = 'initial';
}

function deleteImage(e) {
    e.currentTarget.parentNode.parentNode.classList.add('d-none');
}

export {
    animateImage,
    hideTitle,
    deleteImage
}