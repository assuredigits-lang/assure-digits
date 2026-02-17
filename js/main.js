// Main JavaScript file for Assure Digits

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();

            const isOpen = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active', isOpen);



            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');

                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (
                navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Highlight active navigation link
    document.querySelectorAll('nav a:not(.btn)').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
    
    // Scroll animations
    const elementsToAnimate = document.querySelectorAll(
      '.section:not(.values-section):not(.legal-container)'
    );

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe major sections only for better performance
        elementsToAnimate.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers: render sections without animation.
        elementsToAnimate.forEach(el => el.classList.add('animate-in'));
    }

    // Dropdown functionality for offer cards
    document.querySelectorAll('.offer-card[data-dropdown]').forEach(card => {
        const header = card.querySelector('.offer-header');
        const description = card.querySelector('.offer-description');
        const arrow = card.querySelector('.arrow');
        
        header.style.cursor = 'pointer';
        
        header.addEventListener('click', function() {
            // Close all other offer cards
            document.querySelectorAll('.offer-description').forEach(desc => {
                if (desc !== description) desc.classList.remove('open');
            });
            
            document.querySelectorAll('.offer-card').forEach(c => {
                if (c !== card) c.classList.remove('expanded');
            });
            
            document.querySelectorAll('.arrow').forEach(a => {
                if (a !== arrow) a.classList.remove('rotated');
            });
            
            // Toggle current card
            description.classList.toggle('open');
            card.classList.toggle('expanded');
            if (arrow) arrow.classList.toggle('rotated');
        });
    });

    // Cookie Consent Banner
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Show banner after a short delay
        setTimeout(() => {
            if (cookieBanner) {
                cookieBanner.classList.add('show');
            }
        }, 1000);
    }
    
    // Handle cookie acceptance
    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            if (cookieBanner) {
                cookieBanner.classList.remove('show');
            }
        });
    }
});

