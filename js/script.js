// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initDropdownMenus();
    initScrollEffects();
});

// Mobile Menu Functionality
function initMobileMenu() {
    // Create mobile menu toggle button
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create hamburger menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;
    
    // Add mobile menu styles
    const mobileMenuStyles = `
        <style>
        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .hamburger-line {
            width: 25px;
            height: 3px;
            background: #333;
            margin: 3px 0;
            transition: 0.3s;
            border-radius: 2px;
        }
        
        .mobile-menu-btn.active .hamburger-line:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu-btn.active .hamburger-line:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active .hamburger-line:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex;
            }
            
            .nav-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: #fff;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                transition: left 0.3s ease;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                padding-top: 2rem;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-item {
                margin: 1rem 0;
            }
            
            .dropdown-menu {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                box-shadow: none;
                background: #f8f9fa;
                margin-top: 0.5rem;
            }
        }
        </style>
    `;
    
    // Add styles to head
    document.head.insertAdjacentHTML('beforeend', mobileMenuStyles);
    
    // Insert mobile menu button
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show success message
                showFormMessage('Thank you for your message! We will contact you within 24 hours.', 'success');
                
                // Reset form
                this.reset();
                
                // In a real application, you would send the data to a server
                console.log('Form submitted:', formObject);
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (errors.length > 0) {
        showFormMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone Validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return cleanPhone.length >= 10 && phoneRegex.test(cleanPhone);
}

// Show Form Messages
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = message;
    
    // Add message styles
    const messageStyles = `
        <style>
        .form-message {
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            font-weight: bold;
        }
        
        .form-message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .form-message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        </style>
    `;
    
    if (!document.querySelector('style[data-form-messages]')) {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-form-messages', 'true');
        styleElement.textContent = messageStyles.replace(/<\/?style>/g, '');
        document.head.appendChild(styleElement);
    }
    
    // Insert message
    const form = document.getElementById('contactForm');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }
}

// Animation on Scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .location-card, .feature-item, .area-card');
    
    // Add fade-in class to elements
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Dropdown Menu Functionality
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Handle mouse events for desktop
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
            }
        });
        
        // Handle click events for mobile
        const dropdownLink = dropdown.querySelector('.nav-link');
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add header background on scroll
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Add transition to header
    header.style.transition = 'transform 0.3s ease, background 0.3s ease';
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Phone Number Formatting
function formatPhoneNumber(input) {
    const phoneInput = input.target;
    let value = phoneInput.value.replace(/\D/g, '');
    
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    
    phoneInput.value = value;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', formatPhoneNumber);
    });
});

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    // Add back to top styles
    const backToTopStyles = `
        <style>
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #e74c3c;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: #c0392b;
            transform: translateY(-2px);
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', backToTopStyles);
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', initBackToTop);

// Loading Animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
        <p>Loading...</p>
    `;
    
    const loaderStyles = `
        <style>
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .loader-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #e74c3c;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', loaderStyles);
    document.body.appendChild(loader);
    
    // Remove loader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.remove();
        }, 500);
    });
}

// Initialize loading animation
if (document.readyState === 'loading') {
    showLoading();
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', loadTime + 'ms');
        }, 0);
    });
}

