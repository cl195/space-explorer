/* 
 * Sun Page JavaScript - Contains all interactive functionality for the Sun page
 * This script handles animations, interactive elements, and dynamic content related to the Sun
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sun page script initialized');
    
    // Initialize all Sun page specific functionality
    initSunPage();
});

/**
 * Initializes all Sun page specific functionality
 * Sets up animations, interactions, and dynamic content
 */
function initSunPage() {
    // Setup composition chart animations
    setupCompositionCharts();
    
    // Initialize interactive elements
    setupInteractiveElements();
    
    // Setup sun animation enhancements
    enhanceSunAnimation();
}

/**
 * Sets up the composition charts with animated loading on scroll
 * Charts show percentages of different elements in the Sun
 */
function setupCompositionCharts() {
    const chartBars = document.querySelectorAll('.bar-fill');
    
    // Reset all bars to 0 width initially
    chartBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        
        // Store target width as data attribute
        bar.dataset.targetWidth = targetWidth;
    });
    
    // Set up scroll observer to animate bars when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                // Animate to target width
                setTimeout(() => {
                    bar.style.width = bar.dataset.targetWidth;
                }, 200);
                // Stop observing after animation
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each chart bar
    chartBars.forEach(bar => {
        observer.observe(bar);
    });
    
    console.log('Composition charts initialized');
}

/**
 * Sets up interactive elements on the Sun page
 * Includes hover effects, tooltips, and click interactions
 */
function setupInteractiveElements() {
    // Add click event listeners to fact items for enhanced interaction
    const factItems = document.querySelectorAll('.fact-item');
    factItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
        });
    });
    
    // Set up portal link hover effects
    const portalLinks = document.querySelectorAll('.portal-link');
    portalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Add custom hover effect
            this.classList.add('hover-effect');
        });
        
        link.addEventListener('mouseleave', function() {
            // Remove custom hover effect
            this.classList.remove('hover-effect');
        });
    });
    
    console.log('Interactive elements initialized');
}

/**
 * Enhances the Sun animation with additional dynamic effects
 * Adds particle effects, flares, and responsive behavior
 */
function enhanceSunAnimation() {
    const sunCore = document.querySelector('.sun-core');
    const sunRays = document.querySelector('.sun-rays');
    
    if (!sunCore || !sunRays) {
        console.warn('Sun animation elements not found');
        return;
    }
    
    // Add random flare effect occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            sunCore.classList.add('flare');
            setTimeout(() => {
                sunCore.classList.remove('flare');
            }, 500);
        }
    }, 3000);
    
    // Add responsive behavior to sun animation
    window.addEventListener('resize', adjustSunSize);
    adjustSunSize(); // Initial adjustment
    
    console.log('Sun animation enhancements applied');
}

/**
 * Adjusts the sun size based on viewport dimensions
 * Ensures the sun appears properly on different screen sizes
 */
function adjustSunSize() {
    const sunAnimation = document.querySelector('.sun-animation');
    if (!sunAnimation) return;
    
    const viewportWidth = window.innerWidth;
    
    // Adjust size based on viewport width
    if (viewportWidth < 768) {
        // Mobile size
        sunAnimation.style.width = '280px';
        sunAnimation.style.height = '280px';
    } else if (viewportWidth < 1200) {
        // Tablet size
        sunAnimation.style.width = '400px';
        sunAnimation.style.height = '400px';
    } else {
        // Desktop size - reset to default
        sunAnimation.style.width = '550px';
        sunAnimation.style.height = '550px';
    }
} 