window.onresize = () => { location.reload();} ;
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.getElementsByClassName("slideItem");
const slideCount = carouselImages.length;

// Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 1;
const size = carouselImages[0].clientWidth;

// Create Slide Indicators
const buttonsDiv = document.querySelector('#controlBtns');
let newBtn;
for (let i = 0; i < (slideCount - 2); i++) {
    newBtn = document.createElement('span');
    newBtn.className += 'controlBtn';
    buttonsDiv.appendChild(newBtn);
}
const slideIndicators = document.getElementsByClassName('controlBtn');

function updateIndicators() {
    for (let i = 0; i < slideIndicators.length; i++) {
        if (i === (counter - 1)) {
            slideIndicators[i].className += ' active';
        } else {
            slideIndicators[i].className = slideIndicators[i].className.replace(' active', '');
        }
    }
}

updateIndicators();
carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// Button listeners
nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    updateIndicators();
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    updateIndicators();
});

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