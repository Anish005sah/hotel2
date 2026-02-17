/* ========================================
   THE GRAND PALATIAL - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollToTop();
    initSmoothScroll();
    initMenuTabs();
    initBookingForm();
    initContactForm();
    initScrollAnimations();
    initCounterAnimation();
});

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// Scroll to Top Button
// ========================================
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Smooth Scroll for Navigation
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Menu Tabs Functionality
// ========================================
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all menu contents
            menuContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected menu content
            const tabId = this.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ========================================
// Booking Form Handling
// ========================================
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            const room = document.getElementById('room').value;
            
            // Validate
            if (!checkin || !checkout || !guests || !room) {
                alert('Please fill in all fields');
                return;
            }
            
            // Validate dates
            const checkInDate = new Date(checkin);
            const checkOutDate = new Date(checkout);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (checkInDate < today) {
                alert('Check-in date cannot be in the past');
                return;
            }
            
            if (checkOutDate <= checkInDate) {
                alert('Check-out must be after check-in');
                return;
            }
            
            // Calculate nights
            const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
            
            // Get room price
            let pricePerNight = 0;
            if (room === 'deluxe') pricePerNight = 250;
            else if (room === 'executive') pricePerNight = 450;
            else if (room === 'penthouse') pricePerNight = 999;
            
            const totalPrice = nights * pricePerNight;
            
            // Show success message
            alert(`Booking Confirmed!\n\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nNights: ${nights}\nRoom: ${room.charAt(0).toUpperCase() + room.slice(1)}\nGuests: ${guests}\n\nTotal: $${totalPrice}\n\nThank you for choosing The Grand Palatial!`);
            
            // Reset form
            form.reset();
        });
        
        // Set minimum date to today
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        
        if (checkinInput && checkoutInput) {
            const today = new Date().toISOString().split('T')[0];
            checkinInput.min = today;
            checkoutInput.min = today;
            
            checkinInput.addEventListener('change', function() {
                checkoutInput.min = this.value;
            });
        }
    }
}

// ========================================
// Contact Form Handling
// ========================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validate
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message
            alert(`Thank you, ${name}!\n\nYour message has been received. We will contact you at ${email} shortly.\n\nThe Grand Palatial Team`);
            
            // Reset form
            this.reset();
        });
    }
}

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature items
    const featureItems = document.querySelectorAll('.feature-item, .room-card, .menu-card, .amenity-card');
    
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = (index * 0.1) + 's';
        
        observer.observe(item);
    });
}

// ========================================
// Counter Animation for Stats
// ========================================
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat h3');
    
    if (stats.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation to stats
                    entry.target.style.animation = 'fadeInUp 1s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
}

// ========================================
// Room Card Button Click Handler
// ========================================
document.querySelectorAll('.room-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const roomName = this.closest('.room-card').querySelector('h3').textContent;
        const price = this.closest('.room-card').querySelector('.price').textContent;
        
        // Scroll to booking form
        document.querySelector('.booking').scrollIntoView({ behavior: 'smooth' });
        
        // Auto-select the room
        const roomSelect = document.getElementById('room');
        if (roomSelect) {
            if (roomName.includes('Deluxe')) roomSelect.value = 'deluxe';
            else if (roomName.includes('Executive')) roomSelect.value = 'executive';
            else if (roomName.includes('Penthouse')) roomSelect.value = 'penthouse';
        }
    });
});

// ========================================
// Header Animation on Load
// ========================================
window.addEventListener('load', function() {
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ========================================
// Add CSS for loaded state
// ========================================
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

