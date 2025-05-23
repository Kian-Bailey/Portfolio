document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.enhanced-hero');
    const heroBg = document.querySelector('.hero-bg');

    if (hero && heroBg) {
        let animating = false;
        // Set initial position
        let current = { x: 50, y: 50 };
        let target = { x: 50, y: 50 };
        let animationFrame;

        function setGradient(x, y) {
            heroBg.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--hero-gradient-1) 0%, var(--hero-gradient-2) 100%)`;
        }

        function animateGradient() {
            const speed = 0.15;
            // Calculate the distance to the target
            current.x += (target.x - current.x) * speed;
            current.y += (target.y - current.y) * speed;
            setGradient(current.x, current.y);

            if (Math.abs(current.x - target.x) > 0.1 || Math.abs(current.y - target.y) > 0.1) {
                animationFrame = requestAnimationFrame(animateGradient);
            } else {
                current.x = target.x;
                current.y = target.y;
                setGradient(current.x, current.y);
                animating = false;
            }
        }

        window.addEventListener('mousemove', function (e) {
            const rect = hero.getBoundingClientRect();
            // Clamp mouse position to hero bounds
            let x = ((e.clientX - rect.left) / rect.width) * 100;
            let y = ((e.clientY - rect.top) / rect.height) * 100;
            x = Math.max(0, Math.min(100, x));
            y = Math.max(0, Math.min(100, y));
            target.x = x;
            target.y = y;
            if (!animating) {
                animating = true;
                animationFrame = requestAnimationFrame(animateGradient);
            }
        });

        // Set initial gradient at center
        setGradient(current.x, current.y);
    }
    
    // --- Skills Legend Filtering ---
    const legendChips = document.querySelectorAll('.legend-chip');
    const skillChips = document.querySelectorAll('.skills-cloud .chip');

    legendChips.forEach(chip => {
        chip.addEventListener('click', function () {
            // Scroll to the top of the skills section
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // If already active, reset filter (show all)
            if (chip.classList.contains('active')) {
                legendChips.forEach(c => c.classList.remove('active'));
                skillChips.forEach(s => s.style.display = '');
                return;
            }

            // Remove active from all legend chips
            legendChips.forEach(c => c.classList.remove('active'));
            // Add active to clicked chip
            chip.classList.add('active');

            // Get category from classList (front-end, back-end, misc, soft)
            const categories = ['front-end', 'back-end', 'misc', 'soft'];
            const category = categories.find(cat => chip.classList.contains(cat));

            // Filter skills
            skillChips.forEach(s => {
                if (s.classList.contains(category)) {
                    s.style.display = '';
                } else {
                    s.style.display = 'none';
                }
            });
        });
    });
});

function changeSlide(direction, btn) {
    // Find the closest gallery container from the clicked button
    const gallery = btn.closest('.gallery');
    if (!gallery) return;

    const slides = gallery.querySelectorAll('.slides img');
    let currentIndex = Array.from(slides).findIndex(slide => slide.style.display !== 'none');

    // Hide the current slide
    slides[currentIndex].style.display = 'none';

    // Calculate the next slide index
    currentIndex = (currentIndex + direction + slides.length) % slides.length;

    // Show the next slide
    slides[currentIndex].style.display = 'block';
}

// Initialise the first slide for all galleries
document.querySelectorAll('.gallery').forEach(gallery => {
    const slides = gallery.querySelectorAll('.slides img');
    if (slides.length > 0) {
        slides.forEach(slide => (slide.style.display = 'none'));
        slides[0].style.display = 'block';
    }
});
