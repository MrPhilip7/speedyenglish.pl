// Modern Navigation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Scroll effect for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('current-page');
        } else {
            link.classList.remove('current-page');
        }
    });
    
    // Mobile menu functionality
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // Check if we're in mobile/tablet mode (< 1500px)
    function isMobileMode() {
        return window.innerWidth < 1500;
    }
    
    // Handle responsive behavior
    function handleResize() {
        if (isMobileMode()) {
            // Force mobile behavior
            if (navbarCollapse) {
                navbarCollapse.classList.remove('show');
            }
            if (navbarToggler) {
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    }
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Initial setup
    handleResize();
    
    // Ensure Bootstrap 5 attributes are correct for mobile
    if (navbarToggler && navbarCollapse && isMobileMode()) {
        navbarToggler.setAttribute('data-bs-toggle', 'collapse');
        navbarToggler.setAttribute('data-bs-target', '#navbarNav');
        navbarToggler.setAttribute('aria-controls', 'navbarNav');
    }
    
    // Mobile menu auto-close on link click (only in mobile mode)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobileMode() && navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                if (navbarToggler) {
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Close menu when clicking outside (only in mobile mode)
    document.addEventListener('click', function(e) {
        if (isMobileMode() && !navbar.contains(e.target) && navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            if (navbarToggler) {
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Add loading animation
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-100%)';
    
    setTimeout(() => {
        navbar.style.transition = 'all 0.8s ease-out';
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }, 100);
});

// Intersection Observer for scroll animations
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

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.card, .row, section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});