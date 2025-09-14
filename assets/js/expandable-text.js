// Expandable Text Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Find all review texts and make long ones expandable
    const reviewTexts = document.querySelectorAll('.review-text');
    const maxLength = 200; // Maximum characters before truncation
    
    reviewTexts.forEach(function(textElement) {
        const fullText = textElement.textContent.trim();
        
        // Only make expandable if text is longer than maxLength
        if (fullText.length > maxLength) {
            const truncatedText = fullText.substring(0, maxLength) + '...';
            
            // Create wrapper for expandable functionality
            const wrapper = document.createElement('div');
            wrapper.className = 'expandable-text collapsed';
            
            // Create text container
            const textContainer = document.createElement('div');
            textContainer.className = 'text-content';
            textContainer.textContent = truncatedText;
            
            // Create expand button
            const expandBtn = document.createElement('button');
            expandBtn.className = 'expand-btn';
            expandBtn.textContent = 'Czytaj więcej';
            expandBtn.setAttribute('aria-expanded', 'false');
            
            // Replace original text with new structure
            textElement.innerHTML = '';
            wrapper.appendChild(textContainer);
            textElement.appendChild(wrapper);
            textElement.appendChild(expandBtn);
            
            // Add click event listener
            expandBtn.addEventListener('click', function() {
                const isExpanded = wrapper.classList.contains('expanded');
                
                if (isExpanded) {
                    // Collapse
                    wrapper.classList.remove('expanded');
                    wrapper.classList.add('collapsed');
                    textContainer.textContent = truncatedText;
                    expandBtn.textContent = 'Czytaj więcej';
                    expandBtn.setAttribute('aria-expanded', 'false');
                } else {
                    // Expand
                    wrapper.classList.remove('collapsed');
                    wrapper.classList.add('expanded');
                    textContainer.textContent = fullText;
                    expandBtn.textContent = 'Zwiń';
                    expandBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
    
    // Add smooth scrolling when expanding text
    function smoothScrollToElement(element) {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = elementTop - (windowHeight / 2) + (elementHeight / 2);
        
        window.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
    }
    
    // Enhanced expand functionality with scroll
    document.querySelectorAll('.expand-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            setTimeout(() => {
                const reviewCard = this.closest('.review-card') || this.closest('.row');
                if (reviewCard && this.textContent === 'Zwiń') {
                    smoothScrollToElement(reviewCard);
                }
            }, 300); // Wait for expansion animation
        });
    });
});

// Auto-expand functionality for hash links
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            const expandBtn = targetElement.querySelector('.expand-btn');
            if (expandBtn && expandBtn.textContent === 'Czytaj więcej') {
                expandBtn.click();
            }
        }
    }
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('expand-btn')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Intersection Observer for animation triggers
const reviewObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const reviewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, reviewObserverOptions);

// Observe review cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const reviewCards = document.querySelectorAll('.review-card, .row');
    reviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        reviewObserver.observe(card);
    });
});