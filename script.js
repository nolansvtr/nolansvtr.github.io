// Mobile Menu Toggle
const burgerMenu = document.getElementById('burgerMenu');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = document.querySelectorAll('.menu-link');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});


// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !burgerMenu.contains(e.target)) {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Project Modals
const projectCards = document.querySelectorAll('.project-card');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');
const modalOverlays = document.querySelectorAll('.modal-overlay');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const modal = document.getElementById(`modal-${projectId}`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal functions
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        closeModal(modal);
    });
});

modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        const modal = overlay.closest('.modal');
        closeModal(modal);
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                closeModal(modal);
            }
        });
    }
});

// Download buttons (placeholders for now)
const downloadButtons = document.querySelectorAll('.btn-download');
downloadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const project = btn.dataset.project;
        alert(`Le téléchargement du projet "${project}" sera disponible prochainement.`);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .contact-card');
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active nav link highlighting based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.menu-link[href="#${sectionId}"]`);

        if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.menu-link').forEach(link => {
                if (!link.classList.contains('but-link')) {
                    link.style.color = '';
                }
            });
            if (!navLink.classList.contains('but-link')) {
                navLink.style.color = 'var(--color-purple-light)';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

