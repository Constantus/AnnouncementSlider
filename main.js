function updateIndicators() {
    for (let i = 0; i < slideIndicators.length; i++) {
        if (i === (counter - 1)) {
            if (!slideIndicators[i].classList.contains('active')){
                slideIndicators[i].className += ' active';
            }
        } else {
            slideIndicators[i].className = slideIndicators[i].className.replace(' active', '');
        }
    }
}

function nextSlide() {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    let slideSize = carouselImages[counter - 1].clientWidth + 5;
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-slideSize * counter) + 'px)';
    updateIndicators();
}

function prevSlide() {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    let slideSize = carouselImages[counter - 1].clientWidth + 5;
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-slideSize * counter) + 'px)';
    updateIndicators();
}

function buildSlideIndicators() {
    let newBtn;
    for (let i = 0; i < (slideCount - 2); i++) {
        newBtn = document.createElement('span');
        newBtn.className += 'controlBtn';
        buttonsDiv.appendChild(newBtn);
    }
}

function updateSize() {
    size = carouselImages[0].clientWidth + 5;
    if (counter >= 0 && counter <= (slideCount - 2)) {
        carouselSlide.style.transition = "transform 0.4s ease-in-out";
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        updateIndicators();
    } else {
        console.log('ERROR! Slide indicators not working as expected!');
    }
}

const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.getElementsByClassName("slideItem");
const slideCount = carouselImages.length;
window.onresize = () => { updateSize()};

// Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 1;

// Create Slide Indicators
const buttonsDiv = document.querySelector('#controlBtns');
buildSlideIndicators();
const slideIndicators = document.getElementsByClassName('controlBtn');

let size = carouselImages[0].clientWidth + 5;
updateIndicators();

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
for (let i = 0; i < slideIndicators.length; i++) {
    slideIndicators[i].addEventListener('click', () => {
        let slideNum = i + 1;
    if (i >= 0 && i <= (slideCount - 2)) {
        carouselSlide.style.transition = "transform 0.4s ease-in-out";
        counter = slideNum;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        updateIndicators();
    } else {
        console.log('ERROR! Slide indicators not working as expected!');
    }
    });
}

// Button listeners
nextBtn.addEventListener('click', nextSlide);

prevBtn.addEventListener('click', prevSlide);

carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === 'lastClone') {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        updateIndicators();
    }
    if (carouselImages[counter].id === 'firstClone') {
        carouselSlide.style.transition = 'none';
        counter = 1;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        updateIndicators();
    }
});