// Create star background
function createStars() {
    // Check if star background already exists to avoid duplicating
    if (document.querySelector('.star-background')) return;
    
    // Create star container
    const starBackground = document.createElement('div');
    starBackground.classList.add('star-background');
    document.body.appendChild(starBackground);
    
    const numberOfStars = 350; // Increase star count for a more noticeable effect
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100; // Use percentage positioning
        const y = Math.random() * 100;
        
        // Random size class
        const sizeClass = Math.random();
        if (sizeClass < 0.6) {
            star.classList.add('star-small');
        } else if (sizeClass < 0.9) {
            star.classList.add('star-medium');
        } else {
            star.classList.add('star-large');
        }
        
        // Random animation duration and delay
        const duration = 1.5 + Math.random() * 3; // Shorten animation time
        const delay = Math.random() * 3;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--twinkle-duration', `${duration}s`);
        star.style.setProperty('--twinkle-delay', `${delay}s`);
        
        // Random initial opacity
        star.style.opacity = (0.3 + Math.random() * 0.7).toString();
        
        starBackground.appendChild(star);
    }
    
    console.log('Stars created:', document.querySelectorAll('.star').length);
}

// Ensure stars are created immediately on page load, not waiting for DOMContentLoaded
(function() {
    // Execute immediately on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createStars);
    } else {
        createStars();
    }
})();

// Handle scroll effects
function handleScroll() {
    const scrollPosition = window.scrollY;
    const items = document.querySelectorAll('.structure-item');
    const planetSections = document.querySelectorAll('.planet-detail-section');
    
    items.forEach((item, index) => {
        const delay = index * 0.1;
        const triggerPosition = item.offsetTop - window.innerHeight * 0.8;
        
        if (scrollPosition > triggerPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transitionDelay = `${delay}s`;
        }
    });
    
    // Handle display of planet detail sections
    planetSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

// Smooth scrolling
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effect
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

// Page transition animations
function setupPageTransitions() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only execute animation when clicking on a non-active page
            if (!this.classList.contains('active')) {
                e.preventDefault();
                
                const targetHref = this.getAttribute('href');
                const currentPage = document.body;
                
                // Choose different transition effects based on target page type
                let transitionClass = 'fade-out';
                
                if (this.classList.contains('structure-link')) {
                    transitionClass = 'slide-left-out';
                } else if (this.classList.contains('planet-link')) {
                    transitionClass = 'zoom-out';
                } else if (this.classList.contains('sun-link')) {
                    transitionClass = 'fade-out-bright';
                } else if (this.classList.contains('moon-link')) {
                    transitionClass = 'slide-right-out';
                }
                
                // Add transition animation class
                currentPage.classList.add(transitionClass);
                
                // Navigate to new page after animation ends
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500); // Match with CSS animation duration
            }
        });
    });
}

// Add star follow mouse movement effect
function setupStarMouseEffect() {
    const starBackground = document.querySelector('.star-background');
    if (!starBackground) {
        // Don't execute if star background doesn't exist
        console.log('No star background found for mouse effect');
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let movementTimeout;
    let animationFrameId;
    
    // Capture mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        isMoving = true;
        clearTimeout(movementTimeout);
        
        // Reset isMoving if mouse stops moving for 3 seconds
        movementTimeout = setTimeout(() => {
            isMoving = false;
        }, 3000);
    });
    
    // Stars follow mouse with slight movement
    function animateStars() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            // Different movement range for each star creates parallax effect
            const moveFactorX = ((index % 5) - 2) * 0.3; // Increase movement range
            const moveFactorY = (Math.floor(index / 5) % 5 - 2) * 0.3;
            
            // Calculate movement distance
            const moveX = (mouseX - 0.5) * moveFactorX; 
            const moveY = (mouseY - 0.5) * moveFactorY;
            
            // Smooth movement
            star.style.transform = `translate(${moveX}%, ${moveY}%)`;
        });
        
        animationFrameId = requestAnimationFrame(animateStars);
    }
    
    // Start animation
    animateStars();
    console.log('Star mouse effect initialized');
}

// Auto-start star mouse follow effect
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupStarMouseEffect);
    } else {
        setupStarMouseEffect();
    }
})();

// Randomly create meteors
function createMeteors() {
    // Ensure star background container exists
    let starBackground = document.querySelector('.star-background');
    if (!starBackground) {
        // Create a star background if one doesn't exist
        createStars();
        starBackground = document.querySelector('.star-background');
        if (!starBackground) return; // Exit if still fails
    }
    
    // Clear any existing timers
    if (window.meteorInterval) {
        clearInterval(window.meteorInterval);
    }
    
    // Create a meteor at intervals
    window.meteorInterval = setInterval(() => {
        // 30% chance to create a meteor, increasing probability
        if (Math.random() > 0.3) return;
        
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        
        // Random position and angle
        const startX = Math.random() * 100;
        const startY = -5; // Start from top
        const angle = 15 + Math.random() * 30; // 15-45 degree angle
        const length = 100 + Math.random() * 150; // Meteor length
        
        // Set meteor styles
        meteor.style.left = `${startX}%`;
        meteor.style.top = `${startY}%`;
        meteor.style.width = `${length}px`;
        meteor.style.transform = `rotate(${angle}deg)`;
        
        // Add to background
        starBackground.appendChild(meteor);
        
        // Remove meteor after animation completes
        setTimeout(() => {
            if (meteor.parentNode === starBackground) {
                starBackground.removeChild(meteor);
            }
        }, 1500); // Increase animation duration
    }, 8000); // Reduce interval time, average possible appearance every 8 seconds
    
    console.log('Meteor generation started');
}

// Ensure meteor effect starts immediately after page load
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMeteors);
    } else {
        createMeteors();
    }
})();

// Function to control mobile menu button visibility
function checkMenuButtonVisibility() {
    console.log("Checking menu button visibility");
    const menuButton = document.querySelector('.mobile-menu-toggle');
    
    if (!menuButton) {
        console.error("Menu button element not found");
        return;
    }
    
    // Get current window dimensions
    const windowWidth = window.innerWidth;
    
    // Only check width, ignore height restrictions
    if (windowWidth <= 768) {
        console.log(`Show menu button: width=${windowWidth}px`);
        menuButton.style.display = 'flex';
        menuButton.style.visibility = 'visible';
        menuButton.style.opacity = '1';
    } else {
        console.log(`Hide menu button: width=${windowWidth}px`);
        menuButton.style.display = 'none';
        menuButton.style.visibility = 'hidden';
        menuButton.style.opacity = '0';
    }
}

// Initialize navigation menu
function initNavMenu() {
    console.log('Initializing navigation menu...'); 
    
    // Get mobile menu toggle button and navigation links elements
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Verify navigation menu elements exist
    if (!menuToggle) {
        console.error('Menu button element not found!'); 
        return;
    }
    
    if (!navLinks) {
        console.error('Navigation links element not found!');
        return;
    }
    
    // Add click event handler for menu button
    menuToggle.addEventListener('click', function(e) {
        console.log('Menu button clicked'); 
        e.preventDefault(); 
        e.stopPropagation(); 
        
        // Toggle navigation menu display state
        navLinks.classList.toggle('active'); 
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); 
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); 
            }
        }
        
        return false; 
    });
    
    // Close menu when clicking outside the menu area
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            e.target !== menuToggle && 
            !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active'); 
            
            // Restore hamburger icon
            const icon = menuToggle.querySelector('i');
            if (icon && icon.classList.contains('fa-times')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close menu when clicking navigation links
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active'); 
                
                // Restore hamburger icon
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

// Set up planet card interactions
function setupPlanetCardInteractions() {
    console.log('Setting up planet card interactions');
    
    // Handle scroll animations for planet detail areas
    const planetDetailSections = document.querySelectorAll('.planet-detail-section');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Handle scroll events
    function handleScroll() {
        planetDetailSections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }
    
    // Initial check
    handleScroll();
    
    // Check on scroll
    window.addEventListener('scroll', handleScroll);
    
    // Add click event to planet cards for smooth scrolling
    const planetCards = document.querySelectorAll('.planet-card');
    planetCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Get target from onclick attribute
            const href = this.getAttribute('onclick').replace("location.href='", "").replace("'", "");
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Smooth scroll to target
                    const yOffset = -80; // Offset for fixed header
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add touch support for planet cards
    planetCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
}

// Create star background
function createStarBackground() {
    const starContainer = document.createElement('div');
    starContainer.className = 'star-background';
    document.body.appendChild(starContainer);
    
    // Create 150 stars
    for (let i = 0; i < 150; i++) {
        createStar(starContainer);
    }
}

// Create a single star
function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Determine star type based on size
    const size = Math.random();
    if (size < 0.3) star.classList.add('star-small');
    else if (size < 0.8) star.classList.add('star-medium');
    else star.classList.add('star-large');
    
    // Random position
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    
    // Random twinkle animation
    star.style.setProperty('--twinkle-duration', `${2 + Math.random() * 3}s`);
    star.style.setProperty('--twinkle-delay', `${Math.random() * 5}s`);
    
    container.appendChild(star);
}

// Create random meteors
function createRandomMeteors() {
    // Create a meteor every 3-8 seconds
    setInterval(() => {
        createMeteor();
    }, 3000 + Math.random() * 5000);
}

// Create a single meteor
function createMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    
    // Meteor width (length)
    const width = 100 + Math.random() * 200;
    meteor.style.width = `${width}px`;
    
    // Random position and angle
    meteor.style.left = `${Math.random() * 100}vw`;
    meteor.style.top = `${Math.random() * 50}vh`;
    meteor.style.transform = `rotate(${30 + Math.random() * 30}deg)`;
    
    document.body.appendChild(meteor);
    
    // Remove meteor after animation ends
    setTimeout(() => {
        meteor.remove();
    }, 1500);
}

// Adjust title layout for mobile screen sizes
function adjustTitleLayout() {
    console.log("Adjusting title layout");
    
    // Get current window dimensions
    const windowWidth = window.innerWidth;
    
    // Get all title elements
    const heroTitles = document.querySelectorAll('.hero-title, .sun-title, .moon-title');
    
    // If on mobile device size (consistent with menu button visibility logic)
    if (windowWidth <= 768) {
        // Apply mobile styles
        heroTitles.forEach(title => {
            title.style.textAlign = 'center';
            title.style.position = 'relative';
            title.style.left = '0';
            title.style.width = '100%';
        });
        
        // Adjust title container alignment
        const heroContents = document.querySelectorAll('.hero-content');
        heroContents.forEach(content => {
            content.style.justifyContent = 'center';
            content.style.alignItems = 'center';
            content.style.textAlign = 'center';
        });
    } else {
        // Reset to desktop styles
        heroTitles.forEach(title => {
            title.style.textAlign = '';
            title.style.position = '';
            title.style.left = '';
            title.style.width = '';
        });
        
        // Reset title container alignment
        const heroContents = document.querySelectorAll('.hero-content');
        heroContents.forEach(content => {
            content.style.justifyContent = '';
            content.style.alignItems = '';
            content.style.textAlign = '';
        });
    }
}

// Execute when page finishes loading
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Initial menu button check
    checkMenuButtonVisibility();
    
    // Initial title layout adjustment
    adjustTitleLayout();
    
    // Recheck when window size changes
    window.addEventListener('resize', function() {
        checkMenuButtonVisibility();
        adjustTitleLayout();
    });
    
    // Initialize navigation menu
    initNavMenu();
    
    // Add touch effects for each planet card
    setupPlanetCardInteractions();
    
    // Set up page transition animations
    setupPageTransitions();
    
    // Create star background
    createStarBackground();
    
    // Add random meteors
    createRandomMeteors();
}); 