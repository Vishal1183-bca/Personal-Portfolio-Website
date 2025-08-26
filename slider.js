// Projects Slider Functionality
let currentSlide = 0;
const projectCards = document.querySelectorAll('.project-card');
const totalSlides = projectCards.length;

function initSlider() {
    const dotsContainer = document.getElementById('sliderDots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
    
    updateSlider();
}

function slideProjects(direction) {
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    
    updateSlider();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

function updateSlider() {
    const projectsGrid = document.getElementById('projectsGrid');
    const translateX = -currentSlide * 100;
    
    projectsGrid.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Auto-slide every 5 seconds
setInterval(() => {
    slideProjects(1);
}, 5000);

// Initialize slider when page loads
document.addEventListener('DOMContentLoaded', initSlider);

// Update on window resize
window.addEventListener('resize', updateSlider);