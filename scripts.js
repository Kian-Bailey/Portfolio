document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-container");

    // Tab switching functionality
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs and tab contents
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Add active class to the clicked tab and its content
            tab.classList.add("active");
            const target = document.getElementById(tab.dataset.tab);
            target.classList.add("active");
        });
    });

    // Slider functionality
    tabContents.forEach(tabContent => {
        const slides = tabContent.querySelectorAll('.slides img');
        if (slides.length > 0) {
            let currentSlide = 0;

            const showSlide = (index) => {
                slides.forEach((slide, i) => {
                    slide.style.display = i === index ? 'block' : 'none';
                });
            };

            const prevButton = tabContent.querySelector('.prev');
            const nextButton = tabContent.querySelector('.next');

            if (prevButton && nextButton) {
                prevButton.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                });

                nextButton.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                });

                // Initialize the first slide
                showSlide(currentSlide);
            }
        }
    });
});