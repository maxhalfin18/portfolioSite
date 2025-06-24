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
}); 