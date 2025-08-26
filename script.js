// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    // Close menu when clicking on a nav link
    navLinksAll.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle) {
                menuToggle.checked = false;
            }
        });
    });
});

// Initialize ScrollReveal animations
ScrollReveal().reveal('.hero-left', { origin: 'left', distance: '50px', duration: 1000, delay: 300 });
ScrollReveal().reveal('.hero-right', { origin: 'right', distance: '50px', duration: 1000, delay: 500 });
ScrollReveal().reveal('.navbar', { origin: 'top', distance: '20px', duration: 800, delay: 200 });

ScrollReveal().reveal('.about-img', {
  origin: 'left',
  distance: '50px',
  duration: 1000,
  delay: 200
});
ScrollReveal().reveal('.about-content', {
  origin: 'right',
  distance: '50px',
  duration: 1000,
  delay: 300
});


ScrollReveal().reveal('.contact-section', {
  origin: 'bottom',
  distance: '60px',
  duration: 1000,
  delay: 300,
});

// Animate skill cards on scroll (Intersection Observer)
(function() {
  const skillCards = document.querySelectorAll('.animated-skill');
  if ('IntersectionObserver' in window && skillCards.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Staggered animation
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 120);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    skillCards.forEach(card => observer.observe(card));
  } else {
    // Fallback: show all if IntersectionObserver not supported
    skillCards.forEach(card => card.classList.add('visible'));
  }
})();

// Contact Form Functionality with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    // Initialize EmailJS
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Replace with your actual EmailJS public key
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading notification
            showNotification('Sending message...', 'info');
            
            // Check if using Formspree (has action attribute)
            if (contactForm.action && contactForm.action.includes('formspree.io')) {
                // Use Formspree
                const formDataObj = new FormData(contactForm);
                
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formDataObj,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        showNotification('Message sent successfully! You will receive a confirmation email.', 'success');
                        contactForm.reset();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showNotification('Failed to send message. Please try again later.', 'error');
                });
            } else {
                // Use EmailJS
                // Prepare email template parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_name: "Vishal Bhaliya", // Website owner name
                    to_email: "krunalchristian23@gmail.com", // Website owner email
                    reply_to: email
                };
                
                // Send email to website owner
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Send confirmation email to form submitter
                        const confirmationParams = {
                            to_name: name,
                            to_email: email,
                            from_name: "Vishal Bhaliya",
                            from_email: "krunalchristian23@gmail.com",
                            subject: "Thank you for contacting me!",
                            message: `Hi ${name},\n\nThank you for reaching out to me! I have received your message and will get back to you soon.\n\nYour message:\nSubject: ${subject}\nMessage: ${message}\n\nBest regards,\nVishal Bhaliya`
                        };
                        
                        return emailjs.send('YOUR_SERVICE_ID', 'YOUR_CONFIRMATION_TEMPLATE_ID', confirmationParams);
                    })
                    .then(function(response) {
                        console.log('CONFIRMATION SENT!', response.status, response.text);
                        showNotification('Message sent successfully! Check your email for confirmation.', 'success');
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.log('FAILED...', error);
                        showNotification('Failed to send message. Please try again later.', 'error');
                    });
            }
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }
        
        .notification-message {
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Form field animations
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
        
        // Add floating label effect
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Skill Card Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillPopup = document.getElementById('skillPopup');
    const skillPopupClose = document.getElementById('skillPopupClose');
    
    // Skill descriptions for the popup
    const skillDescriptions = {
        'HTML': 'HyperText Markup Language - The standard markup language for creating web pages and web applications.',
        'CSS': 'Cascading Style Sheets - Used for styling and layout of web pages, making them visually appealing.',
        'JavaScript': 'A programming language that enables interactive web pages and is an essential part of web applications.',
        'React': 'A JavaScript library for building user interfaces, particularly single-page applications.',
        'Bootstrap': 'A free and open-source CSS framework directed at responsive, mobile-first front-end web development.',

        'Java': 'A high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible.',
        'Spring Boot': 'An open-source Java-based framework used to create a microservice with Spring Framework.',
        'Hibernate': 'An object-relational mapping framework for the Java language, providing a framework for mapping an object-oriented domain model.',
        'Git & GitHub': 'Version control system for tracking changes in source code during software development.',
        'MySQL': 'An open-source relational database management system based on SQL.',
        'PostgreSQL': 'A powerful, open source object-relational database system with over 30 years of active development.',
        'Flutter': 'Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.',
        'PHP': 'A popular general-purpose scripting language that is especially suited to web development and server-side programming.'
    };
    
    // Animate progress bars when skill cards come into view
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.skill-progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    };
    
    // Initialize progress bar animations
    animateProgressBars();
    
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get skill information from the card
            const skillIcon = this.querySelector('.skill-icon').src;
            const skillTitle = this.querySelector('h4').textContent;
            const skillLevel = this.querySelector('.level-label').textContent;
            const skillKnowledge = this.querySelector('.knowledge-percentage').textContent;
            const skillDescription = skillDescriptions[skillTitle] || 'A valuable skill in my technical toolkit.';
            
            // Populate popup content
            document.getElementById('skillPopupIcon').src = skillIcon;
            document.getElementById('skillPopupIcon').alt = skillTitle;
            document.getElementById('skillPopupTitle').textContent = skillTitle;``
            document.getElementById('skillPopupKnowledge').textContent = skillKnowledge;
            document.getElementById('skillPopupLevel').textContent = skillLevel;
            document.getElementById('skillPopupDescription').textContent = skillDescription;
            
            // Show popup
            skillPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close popup when close button is clicked
    skillPopupClose.addEventListener('click', function() {
        skillPopup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close popup when clicking outside the content
    skillPopup.addEventListener('click', function(event) {
        if (event.target === skillPopup) {
            skillPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && skillPopup.classList.contains('active')) {
            skillPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Enhanced hover effects for skill cards
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle pulse animation
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // Add pulse animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Close click effect when clicking outside skill cards
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.skill-card')) {
            skillCards.forEach(card => {
                card.classList.remove('clicked');
            });
        }
    });
});


