document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

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

    let currentSlide = 0;

    function changeSlide(direction) {
        const slides = document.querySelectorAll('.slides img');
        slides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].style.display = 'block';
    }
});