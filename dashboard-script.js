// Dashboard JavaScript - Interactive Functionality

class Dashboard {
    constructor() {
        this.currentPage = 'overview';
        this.charts = {};
        this.animationObserver = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.initializeCharts();
        this.startCounterAnimations();
        this.setupSmoothTransitions();
        this.initializeNotifications();
    }

    setupEventListeners() {
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Sidebar toggle for mobile
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }

        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Time filter for charts
        const timeFilter = document.querySelector('.time-filter');
        if (timeFilter) {
            timeFilter.addEventListener('change', (e) => {
                this.updateChartData(e.target.value);
            });
        }

        // Upload zone
        const uploadZone = document.querySelector('.upload-zone');
        if (uploadZone) {
            uploadZone.addEventListener('click', () => {
                this.handleFileUpload();
            });

            uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadZone.style.borderColor = '#00bcd4';
                uploadZone.style.background = 'rgba(0, 188, 212, 0.1)';
            });

            uploadZone.addEventListener('dragleave', () => {
                uploadZone.style.borderColor = 'rgba(0, 188, 212, 0.3)';
                uploadZone.style.background = 'rgba(255, 255, 255, 0.8)';
            });

            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.handleFileDrop(e.dataTransfer.files);
            });
        }

        // Notification button
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.showNotifications();
            });
        }

        // User profile dropdown
        const userProfile = document.querySelector('.user-profile');
        if (userProfile) {
            userProfile.addEventListener('click', () => {
                this.showUserMenu();
            });
        }
    }

    navigateToPage(page) {
        // Update active navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-page="${page}"]`).closest('.nav-item');
        activeNavItem.classList.add('active');

        // Hide current page
        const currentPageElement = document.querySelector('.page.active');
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
        }

        // Show new page with animation
        setTimeout(() => {
            const newPageElement = document.getElementById(`${page}-page`);
            if (newPageElement) {
                newPageElement.classList.add('active');
                this.currentPage = page;
                
                // Trigger page-specific animations
                this.triggerPageAnimations(page);
            }
        }, 150);
    }

    triggerPageAnimations(page) {
        if (page === 'overview') {
            this.startCounterAnimations();
            this.animateCards();
        }
    }

    setupIntersectionObserver() {
        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all cards and sections
        const observeElements = document.querySelectorAll('.stat-card, .chart-card, .activity-card, .hotspots-card, .ai-insights-card');
        observeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            this.animationObserver.observe(el);
        });
    }

    startCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            // Start animation with delay
            setTimeout(() => {
                updateCounter();
            }, Math.random() * 500);
        });
    }

    animateCards() {
        const cards = document.querySelectorAll('.stat-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.opacity = '1';
            }, index * 100);
        });
    }

    initializeCharts() {
        this.initBiodiversityChart();
        this.initSpeciesChart();
    }

    initBiodiversityChart() {
        const ctx = document.getElementById('biodiversityChart');
        if (!ctx) return;

        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(0, 188, 212, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 188, 212, 0.05)');

        this.charts.biodiversity = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Species Detected',
                    data: [1180, 1205, 1230, 1247],
                    borderColor: '#00bcd4',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00bcd4',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }, {
                    label: 'Novel Taxa',
                    data: [82, 85, 87, 89],
                    borderColor: '#009688',
                    backgroundColor: 'rgba(0, 150, 136, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#009688',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Inter'
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 188, 212, 0.1)'
                        },
                        ticks: {
                            font: {
                                family: 'Inter'
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    initSpeciesChart() {
        const ctx = document.getElementById('speciesChart');
        if (!ctx) return;

        this.charts.species = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Fish', 'Coral', 'Mollusks', 'Crustaceans', 'Other'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        '#00bcd4',
                        '#009688',
                        '#4caf50',
                        '#8bc34a',
                        '#cddc39'
                    ],
                    borderWidth: 0,
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    updateChartData(timeRange) {
        // Simulate data update based on time range
        const biodiversityData = {
            '7d': {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                species: [1240, 1242, 1245, 1243, 1246, 1245, 1247],
                taxa: [87, 87, 88, 88, 89, 89, 89]
            },
            '30d': {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                species: [1180, 1205, 1230, 1247],
                taxa: [82, 85, 87, 89]
            },
            '90d': {
                labels: ['Month 1', 'Month 2', 'Month 3'],
                species: [1120, 1180, 1247],
                taxa: [75, 82, 89]
            },
            '1y': {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                species: [980, 1050, 1150, 1247],
                taxa: [65, 70, 78, 89]
            }
        };

        const data = biodiversityData[timeRange];
        if (data && this.charts.biodiversity) {
            this.charts.biodiversity.data.labels = data.labels;
            this.charts.biodiversity.data.datasets[0].data = data.species;
            this.charts.biodiversity.data.datasets[1].data = data.taxa;
            this.charts.biodiversity.update('active');
        }
    }

    setupSmoothTransitions() {
        // Add smooth hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.stat-card, .chart-card, .activity-card, .nav-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    handleSearch(query) {
        // Simulate search functionality
        if (query.length > 2) {
            console.log(`Searching for: ${query}`);
            // In a real application, this would filter data or make API calls
        }
    }

    handleFileUpload() {
        // Create file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.accept = '.csv,.xlsx,.json';
        
        fileInput.addEventListener('change', (e) => {
            this.processFiles(e.target.files);
        });
        
        fileInput.click();
    }

    handleFileDrop(files) {
        this.processFiles(files);
    }

    processFiles(files) {
        Array.from(files).forEach(file => {
            console.log(`Processing file: ${file.name}`);
            // Simulate file processing
            this.showNotification(`File "${file.name}" uploaded successfully`, 'success');
        });
    }

    showNotifications() {
        // Create notification dropdown
        const notifications = [
            {
                title: 'New Analysis Complete',
                message: 'Coral reef biodiversity analysis for sector 7-A is ready',
                time: '5 minutes ago',
                type: 'success'
            },
            {
                title: 'Data Upload Warning',
                message: 'Large dataset detected. Processing may take longer than usual',
                time: '1 hour ago',
                type: 'warning'
            },
            {
                title: 'System Update',
                message: 'AI analysis engine updated to version 2.1.3',
                time: '2 hours ago',
                type: 'info'
            }
        ];

        // In a real application, this would show a dropdown with notifications
        console.log('Notifications:', notifications);
    }

    showUserMenu() {
        // Create user menu dropdown
        const menuItems = [
            { label: 'Profile Settings', action: () => this.navigateToPage('settings') },
            { label: 'Account Preferences', action: () => console.log('Account preferences') },
            { label: 'Help & Support', action: () => console.log('Help & support') },
            { label: 'Sign Out', action: () => this.signOut() }
        ];

        // In a real application, this would show a dropdown menu
        console.log('User menu:', menuItems);
    }

    signOut() {
        // Handle sign out
        if (confirm('Are you sure you want to sign out?')) {
            window.location.href = 'auth.html';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 188, 212, 0.2);
            border-radius: 12px;
            padding: 1rem 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    initializeNotifications() {
        // Add notification styles to head
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            .notification {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex: 1;
            }
            
            .notification-content i {
                font-size: 1.25rem;
            }
            
            .notification-success .notification-content i {
                color: #22c55e;
            }
            
            .notification-warning .notification-content i {
                color: #fbbf24;
            }
            
            .notification-info .notification-content i {
                color: #00bcd4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #94a3b8;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: #64748b;
            }
        `;
        document.head.appendChild(notificationStyles);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

// Add some additional interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('button, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(0, 188, 212, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dashboard;
}