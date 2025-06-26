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

  // Language translations
  const translations = {
    en: {
      nav: ["Home", "About Me", "My Education", "My Projects", "My Certifications", "Contact Me"],
      heroDesc: "Welcome to my official<br>portfolio website!",
      resume: "Download My Resume",
      aboutTitle: "About Me",
      aboutSummary: "Summary",
      aboutText: `I'm an Information Systems developer with a specialization in Data Science, passionate about building solutions that combine clean user experience with powerful data capabilities.<br>I enjoy turning ideas into real, interactive tools that bring value to users.<br>I strongly believe in continuous learning, building with purpose, and combining technical depth with creative thinking.<br>I'm always open to feedback, collaboration, or connecting with like-minded people who are passionate about tech and innovation` ,
      educationTitle: "Education",
      education1: ["The Max Stern Yezreel Valley College", "2023 - current", "B.Sc. in Information Systems – Data Science specialization", "A multidisciplinary degree combining software development, databases, statistics, machine learning, and business insights.", "I gained hands-on experience in Python, Java, SQL, data analysis, and system design, with a strong focus on practical projects and real-world applications."],
      education2: ["Ort Rogozin Migdal HaEmek High School", "2016 - 2018", "Israeli Matriculation Certificate (Bagrut)", "Completed with a major in Computer Science, specializing in system design and programming.", "Studied and practiced languages including C#, MySQL, HTML, CSS, and JavaScript. This early exposure built a solid foundation in both front-end and back-end development."],
      projectsTitle: "My Projects",
      project1: ["PokemonAPI", "2025", "Collect and present Pokémon data with images, sounds, and advanced filtering.", "GitHub", "Live Demo"],
      project2: ["portfolioSite", "2025", "Personal portfolio website to showcase projects and contact me directly.", "GitHub", "Live Demo"],
      certificationsTitle: "My Certifications",
      cert1: ["Advanced Excel Course", "2024", "Completed the Advanced Excel course by Campus IL, focusing on data analysis, Pivot Tables, advanced functions (VLOOKUP, INDEX/MATCH, etc.), and efficient spreadsheet management. Gained hands-on experience through exercises and passed the final exam with certification."],
      contactTitle: "Contact Me",
      contactSubtitle: "Feel free to reach out!",
      form: ["Full Name", "Your name", "Email", "Your email", "Message", "Type your message...", "Send"],
      footer: "All rights reserved.",
      name: "Max Halfin"
    },
    he: {
      nav: ["דף הבית", "עליי", "השכלה", "הפרויקטים שלי", "הסמכות", "צור קשר"],
      heroDesc: "ברוכים הבאים לאתר הפורטפוליו הרשמי שלי!<br>",
      resume: "להורדת קורות חיים",
      aboutTitle: "עליי",
      aboutSummary: "תקציר",
      aboutText: `אני מפתח מערכות מידע עם התמחות במדעי הנתונים, נלהב לבנות פתרונות המשלבים חוויית משתמש נקייה עם יכולות נתונים מתקדמות.<br>אני נהנה להפוך רעיונות לכלים אינטראקטיביים שמביאים ערך למשתמשים.<br>מאמין בלמידה מתמדת, בנייה עם מטרה, ושילוב עומק טכני עם חשיבה יצירתית.<br>תמיד פתוח למשוב, שיתופי פעולה, או חיבור עם אנשים שאוהבים טכנולוגיה וחדשנות.` ,
      educationTitle: "השכלה",
      education1: ["המכללה האקדמית עמק יזרעאל ע\"ש מקס שטרן", "2023 - נוכחי", "B.Sc. במערכות מידע – התמחות במדעי הנתונים", "תואר רב-תחומי המשלב פיתוח תוכנה, מסדי נתונים, סטטיסטיקה, למידת מכונה ותובנות עסקיות.", "רכשתי ניסיון מעשי בפייתון, ג'אווה, SQL, ניתוח נתונים ותכנון מערכות, עם דגש על פרויקטים מעשיים ויישומים אמיתיים."],
      education2: ["אורט רוגוזין מגדל העמק", "2016 - 2018", "תעודת בגרות", "השלמתי מגמת מדעי המחשב, התמחות בתכנון מערכות ותכנות.", "למדתי ותרגלתי שפות כמו #C, MySQL, HTML, CSS, ו-JavaScript. חשיפה מוקדמת זו בנתה בסיס חזק לפיתוח צד לקוח ושרת."],
      projectsTitle: "הפרויקטים שלי",
      project1: ["PokemonAPI", "2025", "איסוף והצגת נתוני פוקימון עם תמונות, קולות וסינון מתקדם.", "גיטהאב", "הדגמה חיה"],
      project2: ["portfolioSite", "2025", "אתר פורטפוליו אישי להצגת פרויקטים ויצירת קשר ישיר.", "גיטהאב", "הדגמה חיה"],
      certificationsTitle: "הסמכות שלי",
      cert1: ["קורס אקסל מתקדם", "2024", "סיימתי קורס אקסל מתקדם בקמפוס IL, בדגש על ניתוח נתונים, טבלאות ציר, פונקציות מתקדמות (VLOOKUP, INDEX/MATCH ועוד), וניהול יעיל של גיליונות. רכשתי ניסיון מעשי ועמדתי בהצלחה במבחן הסיום."],
      contactTitle: "צור קשר",
      contactSubtitle: "מוזמן לפנות אליי!",
      form: ["שם מלא", "הזן שם", "אימייל", "הזן אימייל", "הודעה", "כתוב את הודעתך...", "שלח"],
      footer: "כל הזכויות שמורות.",
      name: "מקס חלפין"
    },
    ar: {
      nav: ["الصفحة الرئيسية", "عنّي", "تعليمي", "مشاريعي", "شهاداتي", "اتصل بي"],
      heroDesc: "مرحبًا بكم في موقعي الرسمي!<br>",
      resume: "تحميل السيرة الذاتية",
      aboutTitle: "عنّي",
      aboutSummary: "ملخص",
      aboutText: `أنا مطور نظم معلومات متخصص في علم البيانات، شغوف ببناء حلول تجمع بين تجربة مستخدم نظيفة وقدرات بيانات قوية.<br>أستمتع بتحويل الأفكار إلى أدوات تفاعلية تجلب قيمة للمستخدمين.<br>أؤمن بالتعلم المستمر، والبناء الهادف، والجمع بين العمق التقني والتفكير الإبداعي.<br>دائمًا منفتح على الملاحظات والتعاون أو التواصل مع أشخاص شغوفين بالتقنية والابتكار.` ,
      educationTitle: "تعليمي",
      education1: ["كلية يزرعيل فالي الأكاديمية - ماكس شترن", "2023 - الآن", "بكالوريوس نظم معلومات - تخصص علم البيانات", "درجة متعددة التخصصات تجمع بين تطوير البرمجيات، قواعد البيانات، الإحصاء، تعلم الآلة والرؤى التجارية.", "اكتسبت خبرة عملية في بايثون، جافا، SQL، تحليل البيانات وتصميم الأنظمة مع تركيز قوي على المشاريع العملية والتطبيقات الواقعية."],
      education2: ["مدرسة أورط روجوزين مجدال هعيمق الثانوية", "2016 - 2018", "شهادة بجروت إسرائيلية", "أنهيت تخصص علوم الحاسوب مع التركيز على تصميم الأنظمة والبرمجة.", "درست ومارست لغات مثل #C، MySQL، HTML، CSS، وJavaScript. هذا التعرض المبكر بنى أساسًا قويًا في تطوير الواجهة الأمامية والخلفية."],
      projectsTitle: "مشاريعي",
      project1: ["PokemonAPI", "2025", "جمع وعرض بيانات البوكيمون مع الصور والأصوات والتصفية المتقدمة.", "جيت هاب", "عرض مباشر"],
      project2: ["portfolioSite", "2025", "موقع بورتفوليو شخصي لعرض المشاريع والتواصل المباشر.", "جيت هاب", "عرض مباشر"],
      certificationsTitle: "شهاداتي",
      cert1: ["دورة إكسل متقدمة", "2024", "أنهيت دورة إكسل متقدمة في Campus IL، مع التركيز على تحليل البيانات، جداول Pivot، الدوال المتقدمة (VLOOKUP، INDEX/MATCH، إلخ)، وإدارة الجداول بكفاءة. اكتسبت خبرة عملية من خلال التمارين ونجحت في الامتحان النهائي."],
      contactTitle: "اتصل بي",
      contactSubtitle: "لا تتردد في التواصل!",
      form: ["الاسم الكامل", "أدخل اسمك", "البريد الإلكتروني", "أدخل بريدك الإلكتروني", "الرسالة", "اكتب رسالتك...", "إرسال"],
      footer: "جميع الحقوق محفوظة.",
      name: "ماكس حلڤين"
    }
  };

  function setLanguage(lang) {
    document.body.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
    // Nav
    document.querySelectorAll('.main-nav ul li a').forEach((el, i) => {
      el.innerHTML = translations[lang].nav[i];
    });
    // Hero
    document.querySelector('.hero-desc').innerHTML = translations[lang].heroDesc;
    document.querySelector('.resume-btn').innerHTML = translations[lang].resume;
    // Name (h1)
    const heroName = document.querySelector('.hero-content h1');
    if (heroName) heroName.innerHTML = translations[lang].name;
    // About
    document.querySelector('#about h2').innerHTML = translations[lang].aboutTitle;
    document.querySelector('#about h4').innerHTML = translations[lang].aboutSummary;
    document.querySelector('#about p').innerHTML = translations[lang].aboutText;
    // Education
    document.querySelector('#education h2').innerHTML = translations[lang].educationTitle;
    const eduCards = document.querySelectorAll('#education .project-card');
    if (eduCards.length === 2) {
      eduCards[0].querySelector('h3').innerHTML = translations[lang].education1[0];
      eduCards[0].querySelector('span').innerHTML = translations[lang].education1[1];
      eduCards[0].querySelector('strong').innerHTML = translations[lang].education1[2];
      eduCards[0].querySelectorAll('p')[1].innerHTML = translations[lang].education1[3];
      eduCards[0].querySelectorAll('p')[2].innerHTML = translations[lang].education1[4];
      eduCards[1].querySelector('h3').innerHTML = translations[lang].education2[0];
      eduCards[1].querySelector('span').innerHTML = translations[lang].education2[1];
      eduCards[1].querySelector('strong').innerHTML = translations[lang].education2[2];
      eduCards[1].querySelectorAll('p')[1].innerHTML = translations[lang].education2[3];
      eduCards[1].querySelectorAll('p')[2].innerHTML = translations[lang].education2[4];
    }
    // Projects
    document.querySelector('#projects h2').innerHTML = translations[lang].projectsTitle;
    const projCards = document.querySelectorAll('#projects .project-card');
    if (projCards.length === 2) {
      // Card 1
      projCards[0].querySelector('h3').innerHTML = translations[lang].project1[0];
      projCards[0].querySelector('span').innerHTML = translations[lang].project1[1];
      projCards[0].querySelectorAll('p')[0].innerHTML = translations[lang].project1[2];
      const btns1 = projCards[0].querySelectorAll('.btn');
      if (btns1.length >= 2) {
        btns1[0].innerHTML = translations[lang].project1[3];
        btns1[1].innerHTML = translations[lang].project1[4];
      }
      // Card 2
      projCards[1].querySelector('h3').innerHTML = translations[lang].project2[0];
      projCards[1].querySelector('span').innerHTML = translations[lang].project2[1];
      projCards[1].querySelectorAll('p')[0].innerHTML = translations[lang].project2[2];
      const btns2 = projCards[1].querySelectorAll('.btn');
      if (btns2.length >= 2) {
        btns2[0].innerHTML = translations[lang].project2[3];
        btns2[1].innerHTML = translations[lang].project2[4];
      }
    }
    // Certifications
    document.querySelector('#certifications h2').innerHTML = translations[lang].certificationsTitle;
    const certCard = document.querySelector('#certifications .project-card');
    certCard.querySelector('h3').innerHTML = translations[lang].cert1[0];
    certCard.querySelector('span').innerHTML = translations[lang].cert1[1];
    certCard.querySelectorAll('p')[0].innerHTML = translations[lang].cert1[2];
    // Contact
    document.querySelector('#contact h2').innerHTML = translations[lang].contactTitle;
    document.querySelector('.contact-subtitle').innerHTML = translations[lang].contactSubtitle;
    const form = document.getElementById('contactForm');
    form.querySelector('label[for="name"]').innerHTML = translations[lang].form[0];
    form.querySelector('#name').placeholder = translations[lang].form[1];
    form.querySelector('label[for="email"]').innerHTML = translations[lang].form[2];
    form.querySelector('#email').placeholder = translations[lang].form[3];
    form.querySelector('label[for="message"]').innerHTML = translations[lang].form[4];
    form.querySelector('#message').placeholder = translations[lang].form[5];
    form.querySelector('.send-btn').innerHTML = translations[lang].form[6];
    // Footer
    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
      if (lang === 'ar') {
        footerCopy.innerHTML = `&copy; 2025 ماكس حلڤين. ${translations[lang].footer}`;
      } else if (lang === 'he') {
        footerCopy.innerHTML = `&copy; 2025 מקס חלפין. ${translations[lang].footer}`;
      } else {
        footerCopy.innerHTML = `&copy; 2025 Max Halfin. ${translations[lang].footer}`;
      }
    }
    // Update main language icon
    const langIcon = document.getElementById('langSwitcherIcon');
    if (langIcon) {
      if (lang === 'he') {
        langIcon.src = 'assets/isr.png';
        langIcon.alt = 'עברית';
      } else if (lang === 'ar') {
        langIcon.src = 'assets/arab.png';
        langIcon.alt = 'العربية';
      } else {
        langIcon.src = 'assets/us.png';
        langIcon.alt = 'English';
      }
    }
  }

  // Language switcher UI logic
  const langBtn = document.getElementById('langSwitcherBtn');
  const langDropdown = document.getElementById('langDropdown');
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', e => {
      e.stopPropagation();
      langDropdown.style.display = langDropdown.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', () => {
      langDropdown.style.display = 'none';
    });
    langDropdown.addEventListener('click', e => {
      e.stopPropagation();
    });
    langDropdown.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', e => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
        localStorage.setItem('lang', lang);
        langDropdown.style.display = 'none';
      });
    });
  }

  // On page load, set language from localStorage if exists
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);
}); 