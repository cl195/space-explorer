// Specialized JavaScript for the Moon page - Handles animations, parallax effects, and interactive elements

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main page components
    initMoonPage();
    
    // Add scroll event listener for parallax and animation effects
    window.addEventListener('scroll', handleMoonScroll);
    
    // Trigger scroll handler once initially to set starting positions
    handleMoonScroll();
    
    // Initialize parallax effects for mouse movement
    moonParallaxEffect();
    
    // Set up lunar phase animations and interactions
    initPhaseAnimations();
    
    // Initialize timeline interaction for historical events
    initTimelineInteraction();
    
    // Set up rotating fact carousel functionality
    initFactCarousel();
    
    // Initialize panoramic image viewer capabilities
    initPanoramaViewer();
});

// Initialize the Moon page with entry animations and card effects
function initMoonPage() {
    console.log('Moon page initialized');
    
    // Add page entry fade-in animation
    document.body.classList.add('fade-in');
    
    // Initialize floating animation effect for information cards
    initCardFloating();
}

// Handle scroll-based effects and animations for the Moon page
function handleMoonScroll() {
    const scrollPosition = window.scrollY;
    
    // Process parallax effects for multiple layers
    const moonHero = document.querySelector('.moon-hero');
    const moonImage = document.querySelector('.moon-image');
    const starsLayer = document.querySelector('.stars-layer');
    const cloudsLayer = document.querySelector('.clouds-layer');
    
    if (moonHero && moonImage && starsLayer && cloudsLayer) {
        const heroHeight = moonHero.offsetHeight;
        const scrollRatio = Math.min(scrollPosition / heroHeight, 1);
        
        // Moon upward movement effect based on scroll position
        moonImage.style.transform = `translateY(calc(-50% - ${scrollRatio * 30}px))`;
        
        // Adjust cloud layer animation speed based on scroll position
        cloudsLayer.style.animationDuration = `${60 - scrollRatio * 20}s`;
        
        // Stars layer parallax movement
        starsLayer.style.transform = `translateY(${scrollRatio * 50}px)`;
    }
    
    // Detect and trigger element animations when scrolled into view
    animateOnScroll('.moon-card', 'card-visible', 0.8);
    animateOnScroll('.moon-earth-section', 'section-visible', 0.7);
    animateOnScroll('.footer-navigation', 'nav-visible', 0.9);
}

// Add animation classes to elements when they scroll into the viewport
function animateOnScroll(selector, className, threshold = 0.8) {
    const elements = document.querySelectorAll(selector);
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = windowHeight * threshold;
        
        if (elementTop < elementVisible) {
            element.classList.add(className);
        }
    });
}

// Create parallax effects for moon elements based on mouse movement
function moonParallaxEffect() {
    const moonParallax = document.querySelector('.moon-parallax');
    
    if (moonParallax) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moonImage = document.querySelector('.moon-image');
            const starsLayer = document.querySelector('.stars-layer');
            
            if (moonImage && starsLayer) {
                // Subtle moon movement following cursor position
                const moveX = (mouseX - 0.5) * 20;
                const moveY = (mouseY - 0.5) * 20;
                
                moonImage.style.transform = `translateY(-50%) translate(${moveX}px, ${moveY}px)`;
                
                // Opposite movement for stars layer to enhance depth effect
                starsLayer.style.transform = `translate(${-moveX * 0.5}px, ${-moveY * 0.5}px)`;
            }
        });
    }
}

// Initialize lunar phase animations and hover effects
function initPhaseAnimations() {
    const phaseItems = document.querySelectorAll('.phase-item');
    
    phaseItems.forEach(item => {
        const phase = item.querySelector('.phase-animation');
        const phaseImg = item.querySelector('.phase-img');
        
        if (phase) {
            item.addEventListener('mouseenter', () => {
                // Add pulsating effect on hover
                phase.style.transform = 'scale(1.1)';
                phase.style.boxShadow = '0 0 30px rgba(143, 184, 255, 0.5)';
                phase.style.transition = 'all 0.3s ease';
                
                // Add special effects for specific lunar phases
                if (item.querySelector('h3').textContent === 'Full Moon') {
                    phaseImg.style.filter = 'brightness(1.2)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                // Restore original state when mouse leaves
                phase.style.transform = 'scale(1)';
                phase.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                
                if (item.querySelector('h3').textContent === 'Full Moon') {
                    phaseImg.style.filter = 'brightness(1)';
                }
            });
        }
    });
    
    // Add fade-in transition effect for phase images after loading
    const phaseImages = document.querySelectorAll('.phase-img');
    phaseImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
            }, 100);
        });
        
        // If image is already in cache, manually set opacity
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Set up lunar phase sequence animation
    setupPhaseSequence();
}

// Configure the animated sequence showing lunar phase progression
function setupPhaseSequence() {
    const moonPhasesSection = document.querySelector('.moon-phases-section');
    
    if (moonPhasesSection) {
        // Add sequence animation when scrolled to the lunar phases section
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const phaseItems = document.querySelectorAll('.phase-item');
                    
                    // Highlight each phase in sequence to simulate lunar cycle
                    let currentIndex = 0;
                    const highlightInterval = setInterval(() => {
                        // Reset all phase items to default state
                        phaseItems.forEach(item => {
                            item.style.transform = 'translateY(0)';
                            item.style.borderColor = 'rgba(194, 197, 204, 0.1)';
                            const phaseAnimation = item.querySelector('.phase-animation');
                            if (phaseAnimation) {
                                phaseAnimation.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                            }
                        });
                        
                        // Highlight the current phase in the sequence
                        if (phaseItems[currentIndex]) {
                            phaseItems[currentIndex].style.transform = 'translateY(-10px)';
                            phaseItems[currentIndex].style.borderColor = 'var(--moon-accent)';
                            const phaseAnimation = phaseItems[currentIndex].querySelector('.phase-animation');
                            if (phaseAnimation) {
                                phaseAnimation.style.boxShadow = '0 0 30px rgba(143, 184, 255, 0.5)';
                            }
                        }
                        
                        currentIndex = (currentIndex + 1) % phaseItems.length;
                        
                        // 5 seconds after stopping the loop
                        if (currentIndex === 0) {
                            setTimeout(() => {
                                clearInterval(highlightInterval);
                                // Reset all items to default state
                                phaseItems.forEach(item => {
                                    item.style.transform = 'translateY(0)';
                                    item.style.borderColor = 'rgba(194, 197, 204, 0.1)';
                                    const phaseAnimation = item.querySelector('.phase-animation');
                                    if (phaseAnimation) {
                                        phaseAnimation.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                                    }
                                });
                            }, 1000);
                        }
                    }, 600);
                    
                    // Cancel observation
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(moonPhasesSection);
    }
}

// Initialize floating animation effect for information cards
function initCardFloating() {
    const cards = document.querySelectorAll('.moon-card');
    
    cards.forEach((card, index) => {
        // Set different initial delays to make cards look like natural floating
        const delay = index * 0.1;
        card.style.animationDelay = `${delay}s`;
        
        // Add floating animation
        card.style.animation = `floatingCard 4s infinite ease-in-out ${delay}s`;
    });
}

// Add floating animation to CSS
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes floatingCard {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
    
    .card-visible {
        animation: cardReveal 0.8s forwards ease-out;
    }
    
    @keyframes cardReveal {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .section-visible {
        animation: sectionFadeIn 1s forwards ease-out;
    }
    
    @keyframes sectionFadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .nav-visible {
        animation: navSlideUp 0.5s forwards ease-out;
    }
    
    @keyframes navSlideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(floatingStyle);

// Initialize timeline interaction for historical events
function initTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Highlight the current project
            item.style.backgroundColor = 'rgba(143, 184, 255, 0.1)';
            item.style.borderRadius = '8px';
            item.style.padding = '10px';
            item.style.marginLeft = '10px';
            item.style.transition = 'all 0.3s ease';
            
            // Darken other projects
            timelineItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5';
                    otherItem.style.transition = 'opacity 0.3s ease';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            // Restore original state of all projects
            item.style.backgroundColor = 'transparent';
            item.style.padding = '0';
            item.style.marginLeft = '0';
            
            timelineItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
}

// Lunar system animation effect
window.addEventListener('load', () => {
    const earthMoonSection = document.querySelector('.earth-moon-section');
    
    if (earthMoonSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When the area is visible, add special effect
                    const earth = document.querySelector('.earth');
                    const moonOrbital = document.querySelector('.moon-orbital');
                    
                    if (earth) {
                        // Earth rotation animation
                        earth.style.animation = 'earthRotate 20s linear infinite';
                        
                        // Add CSS animation for earth rotation
                        const earthStyle = document.createElement('style');
                        earthStyle.textContent = `
                            @keyframes earthRotate {
                                from { background-position: 0% center; }
                                to { background-position: 200% center; }
                            }
                        `;
                        document.head.appendChild(earthStyle);
                    }
                    
                    if (moonOrbital) {
                        // Highlight lunar orbit
                        moonOrbital.style.boxShadow = '0 0 20px var(--moon-accent)';
                    }
                    
                    // Cancel observation
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(earthMoonSection);
    }
});

// Handle page exit animation
document.querySelectorAll('a').forEach(link => {
    if (!link.classList.contains('moon-link')) {
        link.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');
            
            // Execute only when the link points to another page within the site
            if (targetHref && targetHref.indexOf('#') !== 0 && !targetHref.match(/^https?:\/\//)) {
                e.preventDefault();
                
                // Add exit animation
                document.body.classList.add('fade-out');
                
                // Redirect after animation ends
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500);
            }
        });
    }
});

// Add exit animation to CSS
const leaveStyle = document.createElement('style');
leaveStyle.textContent = `
    .fade-out {
        animation: fadeOut 0.5s forwards !important;
    }
    
    @keyframes fadeOut {
        to { opacity: 0; }
    }
`;
document.head.appendChild(leaveStyle);

// Set up rotating fact carousel functionality
function initFactCarousel() {
    const factSlides = document.querySelectorAll('.fact-slide');
    const factDots = document.querySelectorAll('.fact-dot');
    
    if (factSlides.length > 0 && factDots.length > 0) {
        // Automatic rotation
        let currentIndex = 0;
        const slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % factSlides.length;
            updateFactSlide();
        }, 5000);
        
        // Click navigation point to switch facts
        factDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateFactSlide();
                // Reset automatic rotation timer
                clearInterval(slideInterval);
                setTimeout(() => {
                    setInterval(() => {
                        currentIndex = (currentIndex + 1) % factSlides.length;
                        updateFactSlide();
                    }, 5000);
                }, 10000);
            });
        });
        
        // Update fact rotation
        function updateFactSlide() {
            factSlides.forEach((slide, index) => {
                slide.classList.remove('active');
                factDots[index].classList.remove('active');
                
                if (index === currentIndex) {
                    slide.classList.add('active');
                    factDots[index].classList.add('active');
                }
            });
        }
    }
}

// Initialize panoramic image viewer capabilities
function initPanoramaViewer() {
    const panoramaOverlay = document.querySelector('.panorama-overlay');
    const panoramaImage = document.querySelector('.panorama-viewer img');
    
    if (panoramaOverlay && panoramaImage) {
        panoramaOverlay.addEventListener('click', () => {
            // Create full screen preview element
            const fullScreenView = document.createElement('div');
            fullScreenView.classList.add('fullscreen-panorama');
            fullScreenView.innerHTML = `
                <div class="fullscreen-close">
                    <i class="fas fa-times"></i>
                </div>
                <img src="${panoramaImage.src}" alt="Lunar Panorama Fullscreen">
            `;
            
            // Add to body
            document.body.appendChild(fullScreenView);
            document.body.style.overflow = 'hidden';
            
            // Fade in effect
            setTimeout(() => {
                fullScreenView.style.opacity = '1';
            }, 10);
            
            // Close full screen preview
            const closeButton = fullScreenView.querySelector('.fullscreen-close');
            closeButton.addEventListener('click', () => {
                fullScreenView.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(fullScreenView);
                    document.body.style.overflow = '';
                }, 300);
            });
        });
    }
}

// Add styles for full screen preview
const panoramaStyle = document.createElement('style');
panoramaStyle.textContent = `
    .fullscreen-panorama {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .fullscreen-panorama img {
        max-width: 90%;
        max-height: 90%;
        border-radius: 5px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }
    
    .fullscreen-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(26, 26, 46, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .fullscreen-close:hover {
        background: var(--moon-accent);
        transform: scale(1.1);
    }
    
    .fullscreen-close i {
        color: white;
        font-size: 20px;
    }
`;
document.head.appendChild(panoramaStyle); 