# Vishal Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and contact information.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Interactive Skill Cards**: Hover effects and detailed popups with knowledge percentages
- **Project Showcase**: Featured projects with GitHub links
- **Contact Form**: Functional contact form with email notifications
- **Smooth Animations**: ScrollReveal animations throughout the site
- **Modern UI**: Clean, professional design with hover effects

## Contact Form Email Setup

The contact form is configured to send emails to both the form submitter and the website owner. Here's how to set it up:

### Option 1: EmailJS (Recommended)

1. **Sign up for EmailJS**:
   - Go to [EmailJS](https://www.emailjs.com/)
   - Create a free account
   - Add your email service (Gmail, Outlook, etc.)

2. **Create Email Templates**:
   - Create a template for receiving messages from visitors
   - Create a template for sending confirmation emails to visitors

3. **Update Configuration**:
   - Replace `YOUR_EMAILJS_PUBLIC_KEY` in `script.js` with your actual public key
   - Replace `YOUR_SERVICE_ID` with your EmailJS service ID
   - Replace `YOUR_TEMPLATE_ID` with your main template ID
   - Replace `YOUR_CONFIRMATION_TEMPLATE_ID` with your confirmation template ID

### Option 2: Formspree (Alternative)

If you prefer a simpler setup, you can use Formspree:

1. Go to [Formspree](https://formspree.io/)
2. Create a free account
3. Get your form endpoint
4. Update the form action in `index.html`:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## File Structure

- `index.html` - Main HTML structure
- `style.css` - All styling and animations
- `script.js` - JavaScript functionality and interactions
- `README.md` - This documentation

## Technologies Used

- HTML5
- CSS3 (with advanced animations and effects)
- JavaScript (ES6+)
- EmailJS for email functionality
- ScrollReveal for animations

## Setup Instructions

1. Clone or download the repository
2. Set up email functionality (see Contact Form Email Setup above)
3. Open `index.html` in a web browser
4. Customize content, colors, and styling as needed

## Customization

- **Colors**: Update CSS variables in `style.css`
- **Content**: Modify text in `index.html`
- **Projects**: Add/remove project cards in the projects section
- **Skills**: Update skill cards with your own skills and percentages
- **Contact Info**: Update contact details and social links

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.