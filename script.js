// Performance optimized animations and interactions
class BioSphereXAnimations {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupParallaxScrolling();
        this.setupNavbarEffects();
        this.setupButtonAnimations();
        this.setupCardAnimations();
        this.setupTimelineAnimations();
        this.setupGlobeInteractions();
        this.initializeScrollAnimations();
        this.setupScrollProgress();
        this.setupParallaxEffects();
        this.setupAdvancedScrollEffects();

    }

    init() {
        // Initialize performance optimizations
        this.ticking = false;
        this.scrollY = 0;
        this.windowHeight = window.innerHeight;
        
        // Throttle resize events
        window.addEventListener('resize', this.throttle(() => {
            this.windowHeight = window.innerHeight;
        }, 100));
    }

    setupEventListeners() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll event with throttling
        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    this.updateNavbar();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    setupIntersectionObserver() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('feature-card')) {
                        this.animateFeatureCard(entry.target);
                    } else if (entry.target.classList.contains('timeline-step')) {
                        this.animateTimelineStep(entry.target);
                    } else if (entry.target.classList.contains('globe-3d')) {
                        this.animateGlobe(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.feature-card, .timeline-step, .globe-3d, .info-panel').forEach(el => {
            this.observer.observe(el);
        });
    }

    setupParallaxScrolling() {
        this.parallaxElements = [
            { element: document.querySelector('.ocean-background'), speed: 0.5 },
            { element: document.querySelector('.floating-particles'), speed: 0.3 },
            { element: document.querySelector('.hero-visual'), speed: 0.2 },
            { element: document.querySelector('.globe-3d'), speed: 0.1 }
        ].filter(item => item.element); // Filter out null elements
    }

    updateParallax() {
        this.parallaxElements.forEach(({ element, speed }) => {
            const yPos = -(this.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    setupNavbarEffects() {
        this.navbar = document.querySelector('.navbar');
    }

    updateNavbar() {
        if (this.scrollY > 100) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            this.navbar.style.boxShadow = 'none';
        }
    }

    setupButtonAnimations() {
        const ctaButton = document.getElementById('exploreBtn');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = ctaButton.querySelector('.button-ripple');
                ripple.style.width = '0';
                ripple.style.height = '0';
                
                setTimeout(() => {
                    ripple.style.width = '300px';
                    ripple.style.height = '300px';
                }, 10);

                // Scroll to features section
                setTimeout(() => {
                    document.getElementById('features').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 300);
            });

            // Hover effects
            ctaButton.addEventListener('mouseenter', () => {
                ctaButton.style.transform = 'translateY(-3px) scale(1.05)';
            });

            ctaButton.addEventListener('mouseleave', () => {
                ctaButton.style.transform = 'translateY(0) scale(1)';
            });
        }
    }

    setupCardAnimations() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
            // Stagger animation delays
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Floating animation on hover
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(14, 165, 233, 0.2)';
                
                // Animate icon
                const icon = card.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 30px rgba(14, 165, 233, 0.1)';
                
                // Reset icon
                const icon = card.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });

            // Click animation
            card.addEventListener('click', () => {
                card.style.transform = 'translateY(-10px) scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-15px) scale(1.02)';
                }, 150);
            });
        });
    }

    setupTimelineAnimations() {
        const timelineSteps = document.querySelectorAll('.timeline-step');
        
        timelineSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-50px)';
            
            // Alternate animation direction
            if (index % 2 === 1) {
                step.style.transform = 'translateX(50px)';
            }
        });
    }

    animateFeatureCard(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Animate elements inside the card
        const icon = card.querySelector('.feature-icon');
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(360deg)';
            }, 200);
        }
        
        if (title) {
            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (description) {
            setTimeout(() => {
                description.style.opacity = '1';
                description.style.transform = 'translateY(0)';
            }, 400);
        }
    }

    animateTimelineStep(step) {
        step.style.opacity = '1';
        step.style.transform = 'translateX(0)';
        
        // Animate step icon
        const icon = step.querySelector('.step-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }, 300);
        }
        
        // Animate connector line
        const connector = step.querySelector('.step-connector');
        if (connector) {
            setTimeout(() => {
                connector.style.height = '60px';
                connector.style.opacity = '1';
            }, 500);
        }
    }

    setupGlobeInteractions() {
        const hotspots = document.querySelectorAll('.hotspot');
        const globeSphere = document.querySelector('.globe-sphere');
        
        hotspots.forEach(hotspot => {
            hotspot.addEventListener('mouseenter', () => {
                hotspot.style.transform = 'scale(2)';
                hotspot.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.8)';
                
                // Show tooltip (you can enhance this)
                const region = hotspot.dataset.region;
                this.showTooltip(hotspot, `${region} Ocean Biodiversity Hotspot`);
            });
            
            hotspot.addEventListener('mouseleave', () => {
                hotspot.style.transform = 'scale(1)';
                hotspot.style.boxShadow = 'none';
                this.hideTooltip();
            });
        });
        
        // Globe rotation control
        if (globeSphere) {
            let isMouseDown = false;
            let mouseX = 0;
            let rotationSpeed = 1;
            
            globeSphere.addEventListener('mousedown', (e) => {
                isMouseDown = true;
                mouseX = e.clientX;
                globeSphere.style.cursor = 'grabbing';
            });
            
            document.addEventListener('mouseup', () => {
                isMouseDown = false;
                if (globeSphere) {
                    globeSphere.style.cursor = 'grab';
                }
            });
            
            document.addEventListener('mousemove', (e) => {
                if (isMouseDown) {
                    const deltaX = e.clientX - mouseX;
                    rotationSpeed += deltaX * 0.01;
                    mouseX = e.clientX;
                }
            });
        }
    }

    animateGlobe(globe) {
        globe.style.opacity = '1';
        globe.style.transform = 'scale(1)';
        
        // Animate hotspots
        const hotspots = globe.querySelectorAll('.hotspot');
        hotspots.forEach((hotspot, index) => {
            setTimeout(() => {
                hotspot.style.opacity = '1';
                hotspot.style.transform = 'scale(1)';
            }, index * 200);
        });
        
        // Animate rings
        const rings = globe.querySelectorAll('.ring');
        rings.forEach((ring, index) => {
            setTimeout(() => {
                ring.style.opacity = '1';
            }, index * 300);
        });
    }

    showTooltip(element, text) {
        // Remove existing tooltip
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
    }

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Counter animation for stats
    animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
        }, 16);
    }

    // Initialize counter animations when stats come into view
    setupStatsAnimation() {
        const stats = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = target.textContent.replace(/,/g, '');
                    
                    if (value.includes('%')) {
                        this.animateCounter(target, parseFloat(value), 1500);
                    } else {
                        this.animateCounter(target, parseInt(value), 2000);
                    }
                    
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Enhanced wave animation
    setupWaveAnimation() {
        const waves = document.querySelectorAll('.wave');
        
        waves.forEach((wave, index) => {
            let offset = index * 120; // Degree offset for each wave
            
            const animateWave = () => {
                offset += 0.5;
                const y = Math.sin(offset * Math.PI / 180) * 10;
                wave.style.transform = `translateX(-50%) translateY(${y}px) rotate(${offset}deg)`;
                requestAnimationFrame(animateWave);
            };
            
            animateWave();
        });
    }

    initializeScrollAnimations() {
        // Create Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all scroll-animate elements
        const animateElements = document.querySelectorAll(
            '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
        );
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }

    setupParallaxEffects() {
        const parallaxElements = {
            slow: document.querySelectorAll('.parallax-slow'),
            fast: document.querySelectorAll('.parallax-fast'),
            bg: document.querySelectorAll('.parallax-bg')
        };

        let ticking = false;

        const updateParallax = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Background parallax with constrained movement
            parallaxElements.bg.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = scrollTop + rect.top;
                const speed = 0.3;
                const maxMovement = 50; // Limit movement to 50px
                const yPos = Math.max(-maxMovement, Math.min(maxMovement, -(scrollTop * speed)));
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Slow parallax elements with section-relative movement
            parallaxElements.slow.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.bottom >= 0 && rect.top <= windowHeight) {
                    const parent = element.closest('section') || element.parentElement;
                    const parentRect = parent.getBoundingClientRect();
                    const elementCenter = rect.top + rect.height / 2;
                    const parentCenter = parentRect.top + parentRect.height / 2;
                    const relativePosition = (elementCenter - parentCenter) / parentRect.height;
                    const speed = 0.2;
                    const maxMovement = 30;
                    const yPos = Math.max(-maxMovement, Math.min(maxMovement, relativePosition * maxMovement * speed));
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });

            // Fast parallax elements with section-relative movement
            parallaxElements.fast.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.bottom >= 0 && rect.top <= windowHeight) {
                    const parent = element.closest('section') || element.parentElement;
                    const parentRect = parent.getBoundingClientRect();
                    const elementCenter = rect.top + rect.height / 2;
                    const parentCenter = parentRect.top + parentRect.height / 2;
                    const relativePosition = (elementCenter - parentCenter) / parentRect.height;
                    const speed = 0.4;
                    const maxMovement = 40;
                    const yPos = Math.max(-maxMovement, Math.min(maxMovement, relativePosition * maxMovement * speed));
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });

            ticking = false;
        };

        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        // Throttled scroll event for better performance
        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

        // Initial call
        updateParallax();
    }

    // Enhanced scroll-triggered animations for specific elements
    setupAdvancedScrollEffects() {
        // Staggered animation for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        const timelineSteps = document.querySelectorAll('.timeline-step');
        const stats = document.querySelectorAll('.stat');

        // Create observer for staggered animations
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 200); // 200ms delay between each element
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Apply staggered animations
        [...featureCards, ...timelineSteps, ...stats].forEach(element => {
            staggerObserver.observe(element);
        });

        // Counter animation for statistics
        const animateCounters = () => {
            stats.forEach(stat => {
                const numberElement = stat.querySelector('.stat-number');
                const finalNumber = numberElement.textContent;
                const isPercentage = finalNumber.includes('%');
                const isDecimal = finalNumber.includes('.');
                const hasPlus = finalNumber.includes('+');
                
                let numericValue = parseFloat(finalNumber.replace(/[^0-9.]/g, ''));
                
                if (numericValue) {
                    let currentNumber = 0;
                    const increment = numericValue / 60; // 60 frames for 1 second at 60fps
                    
                    const counter = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= numericValue) {
                            currentNumber = numericValue;
                            clearInterval(counter);
                        }
                        
                        let displayValue = Math.floor(currentNumber);
                        if (isDecimal && currentNumber === numericValue) {
                            displayValue = numericValue;
                        }
                        
                        let displayText = displayValue.toString();
                        if (isPercentage) displayText += '%';
                        if (hasPlus && currentNumber === numericValue) displayText += '+';
                        if (displayValue >= 1000) {
                            displayText = (displayValue / 1000).toFixed(1) + 'K';
                            if (hasPlus && currentNumber === numericValue) displayText += '+';
                        }
                        
                        numberElement.textContent = displayText;
                    }, 16); // ~60fps
                }
            });
        };

        // Trigger counter animation when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.data-stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    }


}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animations = new BioSphereXAnimations();
    
    // Setup stats animation
    animations.setupStatsAnimation();
    
    // Setup enhanced wave animation
    animations.setupWaveAnimation();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Preload critical resources
const preloadResources = () => {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Call preload on page load
window.addEventListener('load', preloadResources);

// Export for potential external use
window.BioSphereXAnimations = BioSphereXAnimations;