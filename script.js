window.addEventListener('load', () => window.scrollTo(0, 0));
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.smooth-scroll').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId === '#top' || targetId === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const res = await fetch('/', { method: 'POST', body: formData });
      msg.textContent = res.ok ? 'Message sent!' : 'Failed to send.';
      msg.className = res.ok ? 'form-message success' : 'form-message error';
      msg.style.display = 'block';
      if (res.ok) form.reset();
    } catch {
      msg.textContent = 'Server error. Please try again later.';
      msg.className = 'form-message error';
      msg.style.display = 'block';
    }
    setTimeout(() => msg.style.display = 'none', 4000);
  });

  // Reveal on scroll animation
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for old browsers
    revealEls.forEach(el => el.classList.add('active'));
  }

  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeIcon = document.getElementById('darkModeIcon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  function setDarkMode(on) {
    document.body.classList.toggle('dark-mode', on);
    if (darkModeIcon) darkModeIcon.src = on ? 'assets/light.png' : 'assets/moon.png';
    localStorage.setItem('darkMode', on ? '1' : '0');
  }
  if (darkModeToggle && darkModeIcon) {
    // Load preference
    const saved = localStorage.getItem('darkMode');
    if (saved === '1' || (saved === null && prefersDark)) setDarkMode(true);
    darkModeToggle.onclick = () => setDarkMode(!document.body.classList.contains('dark-mode'));
  }

  // Hamburger menu logic
  const navToggle = document.getElementById('navToggle');
  const navUl = document.querySelector('.main-nav ul');
  const navOverlay = document.getElementById('navOverlay');
  if (navToggle && navUl && navOverlay) {
    navToggle.onclick = function() {
      navUl.classList.toggle('open');
      navOverlay.classList.toggle('active');
      navToggle.classList.toggle('active');
    };
    navOverlay.onclick = function() {
      navUl.classList.remove('open');
      navOverlay.classList.remove('active');
      navToggle.classList.remove('active');
    };
    navUl.querySelectorAll('a').forEach(link => {
      link.onclick = function() {
        navUl.classList.remove('open');
        navOverlay.classList.remove('active');
        navToggle.classList.remove('active');
      };
    });
  }
}); 