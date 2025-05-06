function changeSlide(direction) {
    const galleries = document.querySelectorAll('.gallery');

    galleries.forEach(gallery => {
        const slides = gallery.querySelectorAll('.slides img');
        let currentIndex = Array.from(slides).findIndex(slide => slide.style.display !== 'none');

        // Hide the current slide
        slides[currentIndex].style.display = 'none';

        // Calculate the next slide index
        currentIndex = (currentIndex + direction + slides.length) % slides.length;

        // Show the next slide
        slides[currentIndex].style.display = 'block';
    });
}

// Initialise the first slide for all galleries
document.querySelectorAll('.gallery').forEach(gallery => {
    const slides = gallery.querySelectorAll('.slides img');
    if (slides.length > 0) {
        slides.forEach(slide => (slide.style.display = 'none'));
        slides[0].style.display = 'block';
    }
});