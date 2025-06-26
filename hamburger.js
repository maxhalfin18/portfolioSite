const emailInput = document.getElementById('email');
const emailSuggestions = document.getElementById('emailSuggestions');
const emailDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'walla.co.il'];
if (emailInput && emailSuggestions) {
  emailInput.addEventListener('input', () => {
    const value = emailInput.value;
    emailSuggestions.innerHTML = '';
    if (!value.includes('@') && value.length > 0) {
      emailDomains.forEach(domain => {
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion';
        suggestion.textContent = value + '@' + domain;
        suggestion.style.padding = '8px';
        suggestion.style.cursor = 'pointer';
        suggestion.addEventListener('mouseover', () => suggestion.style.background = '#f0f0f0');
        suggestion.addEventListener('mouseout', () => suggestion.style.background = '#fff');
        suggestion.addEventListener('click', () => {
          emailInput.value = suggestion.textContent;
          emailSuggestions.style.display = 'none';
        });
        emailSuggestions.appendChild(suggestion);
      });
      emailSuggestions.style.display = 'block';
    } else {
      emailSuggestions.style.display = 'none';
    }
  });
  document.addEventListener('click', (e) => {
    if (!emailSuggestions.contains(e.target) && e.target !== emailInput) {
      emailSuggestions.style.display = 'none';
    }
  });
  // Keep suggestions under the input
  emailInput.addEventListener('focus', () => {
    if (emailInput.value && !emailInput.value.includes('@')) {
      emailSuggestions.style.display = 'block';
    }
  });
}
// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.onsubmit = function(e) {
    let valid = true;
    // Name validation
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (!name.value.trim().includes(' ') || name.value.trim().split(' ').length < 2) {
      nameError.textContent = 'Please enter your full name (at least two words).';
      nameError.style.display = 'block';
      valid = false;
    } else {
      nameError.style.display = 'none';
    }
    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    if (!email.value.includes('@')) {
      emailError.textContent = 'Please enter a valid email address (must contain @).';
      emailError.style.display = 'block';
      valid = false;
    } else {
      emailError.style.display = 'none';
    }
    // Message validation
    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (message.value.trim().length < 10) {
      messageError.textContent = 'Message must be at least 10 characters.';
      messageError.style.display = 'block';
      valid = false;
    } else {
      messageError.style.display = 'none';
    }
    if (!valid) {
      e.preventDefault();
    }
  };
}
// Always scroll to top on mobile refresh
if (window.innerWidth <= 900 && window.location.hash) {
  window.scrollTo(0, 0);
  if (window.location.hash !== '#top') {
    window.location.hash = '#top';
  }
}
// Modal logic for Excel image
const excelImg = document.querySelector('.excel-cert-img');
const modal = document.getElementById('excelModal');
const modalImg = document.getElementById('modalExcelImg');
const closeModal = document.getElementById('closeExcelModal');
if (excelImg && modal && closeModal) {
  excelImg.onclick = function() {
    modal.style.display = 'block';
  }
  closeModal.onclick = function() {
    modal.style.display = 'none';
  }
  modal.onclick = function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  }
}
const navToggle = document.getElementById('navToggle');
const navUl = document.querySelector('.main-nav ul');
const navOverlay = document.getElementById('navOverlay');
if (navToggle && navUl && navOverlay) {
  navToggle.onclick = function() {
    navUl.classList.toggle('open');
    navOverlay.classList.toggle('active');
  };
  navOverlay.onclick = function() {
    navUl.classList.remove('open');
    navOverlay.classList.remove('active');
  };
  navUl.querySelectorAll('a').forEach(link => {
    link.onclick = function() {
      navUl.classList.remove('open');
      navOverlay.classList.remove('active');
    };
  });
} 