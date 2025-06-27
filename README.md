# Max Halfin Portfolio Website

This is my personal portfolio site designed to showcase selected projects, certifications, and education, and allow visitors to get in touch directly.

## Features

- **Modern, responsive web design** using HTML, CSS, and JavaScript
- **Multi-language support** with 12 languages:
  - English, Hebrew, Arabic, Russian, Amharic
  - French, Spanish, German, Italian, Chinese, Japanese, Romanian
  - Automatic RTL support for Hebrew and Arabic
  - Language persistence using localStorage
  - Flag-based language switcher with dropdown
- **Dark/Light mode toggle** with automatic preference detection and persistence
- **Project presentation section** with images, live GitHub links, years, and hover effects
- **Certifications section** with styled cards and images (including modal popup for certificate images)
- **Education section** with styled cards and institution logos
- **Contact form** with advanced validation:
  - Full Name: must contain at least two words
  - Email: must contain '@' and offers smart autocomplete for common domains (gmail, walla, etc.)
  - Message: must be at least 10 characters
  - Inline error messages for each field
- **Custom email autocomplete**: Suggests common domains as you type your email
- **Social links** with custom icons (Facebook, Instagram, GitHub, LinkedIn)
- **Favicon** (tab logo) using `assets/tab.png`
- **Open Graph & Twitter Card meta tags** for beautiful link previews when sharing
- **Smooth scroll navigation** with animated offset for sticky header
- **Mobile-first and fully responsive** (breakpoints for 900px, 600px, 400px, including landscape support)
- **Hamburger menu** for mobile navigation with scrollable menu and overlay
- **Download Resume** button in hero section
- **Accessibility**: Keyboard navigation, accessible labels, and ARIA attributes
- **Reveal animations** on scroll for enhanced user experience

## Technologies Used

- HTML5, CSS3, JavaScript (Vanilla)
- Node.js + Express (for backend/contact form, if needed)
- Hosted assets (images, profile, project banners, language flags)

## File Structure

```
├── index.html          # Main portfolio page
├── style.css           # Styling for all components
├── script.js           # All JavaScript (navigation, form, language switcher, dark mode)
├── hamburger.js        # Mobile navigation logic
├── nagishli.js         # Accessibility plugin
├── server.js           # Express server (optional)
├── /assets             # Profile images, logos, banners, favicon, certificates, language flags
├── /files              # Downloadable files (e.g., resume)
├── /docs               # Documentation files
├── /nl-files           # Accessibility plugin assets
└── README.md           # Project documentation
```

## Main Sections

- **Hero**: Name, welcome message, download resume button, profile image
- **About Me**: Short summary and philosophy
- **Education**: Cards for academic background with years and institution logos
- **My Projects**: Cards for each project, with year, description, image, and GitHub link
- **My Certifications**: Cards for certifications, with year, description, and certificate image (click to enlarge)
- **Contact Me**: Form with validation and error messages

## Language Support

The website supports 12 languages with automatic translation of all content:
- **English** (default)
- **Hebrew** (עברית) - RTL support
- **Arabic** (العربية) - RTL support
- **Russian** (Русский)
- **Amharic** (አማርኛ)
- **French** (Français)
- **Spanish** (Español)
- **German** (Deutsch)
- **Italian** (Italiano)
- **Chinese** (中文)
- **Japanese** (日本語)
- **Romanian** (Română)

## Dark Mode

- Toggle between light and dark themes
- Automatic detection of system preference
- Persistence of user choice using localStorage
- Smooth transitions between themes

## Deployment & Hosting

- The domain is managed via GoDaddy.
- The site is hosted and deployed using [Netlify](https://www.netlify.com/).
- The contact form uses **Netlify Forms** for serverless form handling and submissions.

No backend server setup is required for the contact form – submissions are managed directly by Netlify.

## Open Graph & Social Preview

The site includes Open Graph and Twitter Card meta tags for beautiful previews when sharing links (WhatsApp, Facebook, etc.), using `assets/s1.png` as the preview image.

## Favicon

The favicon (tab logo) is set to `assets/tab.png`.

## Accessibility

- Full keyboard navigation support
- ARIA labels and attributes
- Screen reader compatibility
- High contrast mode support
- Responsive design for all screen sizes

## Author

Max Halfin  
[GitHub Profile](https://github.com/maxhalfin18)
