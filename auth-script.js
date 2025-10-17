// Authentication Page JavaScript

class AuthenticationManager {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.signupForm = document.getElementById('signupForm');
        this.loginFormElement = document.getElementById('loginFormElement');
        this.signupFormElement = document.getElementById('signupFormElement');
        this.showSignupBtn = document.getElementById('showSignup');
        this.showLoginBtn = document.getElementById('showLogin');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupAnimations();
    }

    setupEventListeners() {
        // Form switching
        this.showSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToSignup();
        });

        this.showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToLogin();
        });

        // Form submissions
        this.loginFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e);
        });

        this.signupFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup(e);
        });

        // Social login buttons
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleSocialLogin(e.target.closest('.social-btn'));
            });
        });

        // Real-time validation
        this.setupRealTimeValidation();
    }

    switchToSignup() {
        this.loginForm.classList.add('hidden');
        this.signupForm.classList.remove('hidden');
        this.animateFormSwitch();
    }

    switchToLogin() {
        this.signupForm.classList.add('hidden');
        this.loginForm.classList.remove('hidden');
        this.animateFormSwitch();
    }

    animateFormSwitch() {
        const authCard = document.querySelector('.auth-card');
        authCard.style.transform = 'scale(0.95)';
        authCard.style.opacity = '0.8';
        
        setTimeout(() => {
            authCard.style.transform = 'scale(1)';
            authCard.style.opacity = '1';
        }, 200);
    }

    setupFormValidation() {
        // Email validation
        this.setupEmailValidation();
        
        // Password validation
        this.setupPasswordValidation();
        
        // Confirm password validation
        this.setupConfirmPasswordValidation();
    }

    setupEmailValidation() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateEmail(input);
            });
        });
    }

    setupPasswordValidation() {
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            if (input.id === 'signupPassword') {
                input.addEventListener('input', () => {
                    this.validatePassword(input);
                });
            }
        });
    }

    setupConfirmPasswordValidation() {
        const confirmPassword = document.getElementById('confirmPassword');
        const signupPassword = document.getElementById('signupPassword');
        
        if (confirmPassword && signupPassword) {
            confirmPassword.addEventListener('input', () => {
                this.validateConfirmPassword(signupPassword, confirmPassword);
            });
        }
    }

    setupRealTimeValidation() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input.value);
        
        if (!isValid && input.value.length > 0) {
            this.showFieldError(input, 'Please enter a valid email address');
            return false;
        } else {
            this.clearFieldError(input);
            return true;
        }
    }

    validatePassword(input) {
        const password = input.value;
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        let errorMessage = '';
        
        if (password.length < minLength) {
            errorMessage = `Password must be at least ${minLength} characters long`;
        } else if (!hasUpperCase) {
            errorMessage = 'Password must contain at least one uppercase letter';
        } else if (!hasLowerCase) {
            errorMessage = 'Password must contain at least one lowercase letter';
        } else if (!hasNumbers) {
            errorMessage = 'Password must contain at least one number';
        } else if (!hasSpecialChar) {
            errorMessage = 'Password must contain at least one special character';
        }
        
        if (errorMessage) {
            this.showFieldError(input, errorMessage);
            return false;
        } else {
            this.clearFieldError(input);
            this.showPasswordStrength(input, this.calculatePasswordStrength(password));
            return true;
        }
    }

    validateConfirmPassword(passwordInput, confirmInput) {
        if (confirmInput.value !== passwordInput.value) {
            this.showFieldError(confirmInput, 'Passwords do not match');
            return false;
        } else {
            this.clearFieldError(confirmInput);
            return true;
        }
    }

    calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        return strength;
    }

    showPasswordStrength(input, strength) {
        let existingIndicator = input.parentNode.querySelector('.password-strength');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        const indicator = document.createElement('div');
        indicator.className = 'password-strength';
        
        const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
        
        indicator.innerHTML = `
            <div class="strength-bar">
                <div class="strength-fill" style="width: ${(strength / 5) * 100}%; background-color: ${strengthColors[strength - 1] || '#ef4444'}"></div>
            </div>
            <span class="strength-text">${strengthLevels[strength - 1] || 'Very Weak'}</span>
        `;
        
        input.parentNode.appendChild(indicator);
    }

    showFieldError(input, message) {
        this.clearFieldError(input);
        
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            animation: fadeInUp 0.3s ease;
        `;
        
        input.parentNode.appendChild(errorElement);
    }

    clearFieldError(input) {
        input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        input.style.boxShadow = 'none';
        
        const errorElement = input.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    handleLogin(event) {
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Validate form
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        
        let isValid = true;
        
        if (!this.validateEmail(emailInput)) {
            isValid = false;
        }
        
        if (!password) {
            this.showFieldError(passwordInput, 'Password is required');
            isValid = false;
        }
        
        if (isValid) {
            this.showLoadingState(event.target.querySelector('button[type="submit"]'));
            
            // Simulate API call
            setTimeout(() => {
                this.hideLoadingState(event.target.querySelector('button[type="submit"]'));
                this.showSuccessMessage('Login successful! Redirecting...');
                
                // Redirect to dashboard after successful login
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 2000);
        }
    }

    handleSignup(event) {
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        // Validate form
        const nameInput = document.getElementById('signupName');
        const emailInput = document.getElementById('signupEmail');
        const passwordInput = document.getElementById('signupPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        let isValid = true;
        
        if (!name.trim()) {
            this.showFieldError(nameInput, 'Full name is required');
            isValid = false;
        }
        
        if (!this.validateEmail(emailInput)) {
            isValid = false;
        }
        
        if (!this.validatePassword(passwordInput)) {
            isValid = false;
        }
        
        if (!this.validateConfirmPassword(passwordInput, confirmPasswordInput)) {
            isValid = false;
        }
        
        if (!agreeTerms) {
            this.showFieldError(document.getElementById('agreeTerms').parentNode, 'You must agree to the terms of service');
            isValid = false;
        }
        
        if (isValid) {
            this.showLoadingState(event.target.querySelector('button[type="submit"]'));
            
            // Simulate API call
            setTimeout(() => {
                this.hideLoadingState(event.target.querySelector('button[type="submit"]'));
                this.showSuccessMessage('Account created successfully! Redirecting to dashboard...');
                
                // Redirect to dashboard after successful signup
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 2000);
        }
    }

    handleSocialLogin(button) {
        const provider = button.classList.contains('google') ? 'Google' : 'GitHub';
        
        this.showLoadingState(button);
        
        // Simulate social login
        setTimeout(() => {
            this.hideLoadingState(button);
            this.showSuccessMessage(`${provider} login successful! Redirecting...`);
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }, 1500);
    }

    showLoadingState(button) {
        button.disabled = true;
        button.style.opacity = '0.7';
        button.innerHTML = '<span class="loading-spinner">⏳</span> Loading...';
    }

    hideLoadingState(button) {
        button.disabled = false;
        button.style.opacity = '1';
        
        if (button.classList.contains('social-btn')) {
            const isGoogle = button.classList.contains('google');
            button.innerHTML = `<span class="social-icon">${isGoogle ? '🌐' : '⚡'}</span> ${isGoogle ? 'Google' : 'GitHub'}`;
        } else if (button.closest('#loginForm')) {
            button.innerHTML = 'Sign In';
        } else {
            button.innerHTML = 'Create Account';
        }
    }

    showSuccessMessage(message) {
        // Remove existing messages
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = 'success-message';
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            top: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
            z-index: 1000;
            animation: slideInDown 0.5s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(messageElement);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.style.animation = 'slideOutUp 0.5s ease';
                setTimeout(() => {
                    messageElement.remove();
                }, 500);
            }
        }, 5000);
    }

    setupAnimations() {
        // Add CSS for additional animations
        const style = document.createElement('style');
        style.textContent = `
            .password-strength {
                margin-top: 0.5rem;
            }
            
            .strength-bar {
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 0.25rem;
            }
            
            .strength-fill {
                height: 100%;
                transition: all 0.3s ease;
                border-radius: 2px;
            }
            
            .strength-text {
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.8);
            }
            
            @keyframes slideInDown {
                from {
                    transform: translateX(-50%) translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutUp {
                from {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-50%) translateY(-100%);
                    opacity: 0;
                }
            }
            
            .loading-spinner {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialize authentication manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthenticationManager();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Floating animation for marine life
    const marineElements = document.querySelectorAll('.fish, .jellyfish');
    
    marineElements.forEach((element, index) => {
        element.addEventListener('mouseenter', () => {
            element.style.transform += ' scale(1.2)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = element.style.transform.replace(' scale(1.2)', '');
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.auth-btn, .social-btn');
    
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
                background: rgba(255, 255, 255, 0.3);
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
    
    // Add ripple animation CSS
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