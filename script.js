// Enhanced JavaScript for Cansi Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Navbar scroll effect
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        if (scrolled > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Back to top button functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
                    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // New: Animate elements on scroll using Intersection Observer
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add slide-in effect
                if (element.classList.contains('timeline-item')) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                } else if (element.classList.contains('journey-card') || element.classList.contains('business-item')) {
                     element.style.opacity = 1;
                     element.style.transform = 'scale(1)';
                } else {
                    element.style.opacity = 1;
                }
                
                observer.unobserve(element);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial state for elements to be animated
    const animatedElements = document.querySelectorAll('.timeline-item, .journey-card, .business-item, .container h2, .container p');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        if (element.classList.contains('timeline-item')) {
            element.style.transform = 'translateY(50px)';
        }
        scrollObserver.observe(element);
    });

    // New: 3D Flip effect on culture cards
    const cultureCards = document.querySelectorAll('.culture-card');
    cultureCards.forEach(card => {
        // Initial state for the flip effect
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.3s';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03) rotateY(180deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Timeline item animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Floating ingredients animation enhancement
    const floatingIngredients = document.querySelectorAll('.floating-ingredient');
    floatingIngredients.forEach((ingredient, index) => {
        ingredient.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(45deg)';
            this.style.filter = 'drop-shadow(4px 4px 8px rgba(0,0,0,0.5))';
        });
        
        ingredient.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))';
        });
    });
    
    // Recipe ingredient hover effects
    const ingredientItems = document.querySelectorAll('.ingredient-item');
    ingredientItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.ingredient-icon');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.ingredient-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Business item scale effect
    const businessItems = document.querySelectorAll('.business-item');
    businessItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Form validation and interaction (if forms are added)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation logic here
            console.log('Form submitted');
        });
    });
    
    // Image lazy loading enhancement
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Add smooth transitions for all interactive elements
    const interactiveElements = document.querySelectorAll('button, .card, .timeline-item, .ingredient-item, .business-item');
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Loading screen (optional)
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // Trigger initial animations
        document.body.classList.add('loaded');
    });
});

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Export utility functions for global use
window.scrollToSection = scrollToSection;
