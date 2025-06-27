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
      education2: ["مدرسة أورط روجوزين مجدال هعيمق الثانوية", "2016 - 2018", "شهادة بجروت إسرائيلية", "أنهيت تخصص علوم الحاسوب مع التركيز على تصميم الأنظمة والبرمجة.", "درست ومارست لغات مثل #C, MySQL, HTML, CSS, وJavaScript. هذا التعرض المبكر بنى أساسًا قويًا في تطوير الواجهة الأمامية والخلفية."],
      projectsTitle: "مشاريعي",
      project1: ["PokemonAPI", "2025", "جمع وعرض بيانات البوكيمون مع الصور والأصوات والتصفية المتقدمة.", "جيت هاب", "عرض مباشر"],
      project2: ["portfolioSite", "2025", "موقع بورتفوليو شخصي لعرض المشاريع والتواصل المباشر.", "جيت هاب", "عرض مباشر"],
      certificationsTitle: "شهاداتي",
      cert1: ["دورة إكسل متقدمة", "2024", "أنهيت دورة إكسل متقدمة في Campus IL، مع التركيز على تحليل البيانات، جداول Pivot، الدوال المتقدمة (VLOOKUP, INDEX/MATCH، إلخ)، وإدارة الجداول بكفاءة. اكتسبت خبرة عملية من خلال التمارين ونجحت في الامتحان النهائي."],
      contactTitle: "اتصل بي",
      contactSubtitle: "لا تتردد في التواصل!",
      form: ["الاسم الكامل", "أدخل اسمك", "البريد الإلكتروني", "أدخل بريدك الإلكتروني", "الرسالة", "اكتب رسالتك...", "إرسال"],
      footer: "جميع الحقوق محفوظة.",
      name: "ماكس حلڤين"
    },
    ru: {
      nav: ["Главная", "Обо мне", "Образование", "Мои проекты", "Сертификаты", "Связаться"],
      heroDesc: "Добро пожаловать на мой официальный<br>сайт-портфолио!",
      resume: "Скачать резюме",
      aboutTitle: "Обо мне",
      aboutSummary: "Резюме",
      aboutText: `Я разработчик информационных систем со специализацией в Data Science, увлечён созданием решений, сочетающих чистый пользовательский опыт с мощными возможностями работы с данными.<br>Мне нравится воплощать идеи в реальные, интерактивные инструменты, приносящие пользу пользователям.<br>Я верю в постоянное обучение, создание с целью и сочетание технической глубины с креативным мышлением.<br>Открыт для обратной связи, сотрудничества и общения с единомышленниками, увлечёнными технологиями и инновациями.` ,
      educationTitle: "Образование",
      education1: ["Макс Штерн Езреельская академическая колледж", "2023 - настоящее время", "Бакалавр информационных систем – специализация Data Science", "Междисциплинарная программа, сочетающая разработку ПО, базы данных, статистику, машинное обучение и бизнес-аналитику.", "Я получил практический опыт в Python, Java, SQL, анализе данных и проектировании систем, с акцентом на реальные проекты и практические приложения."],
      education2: ["Средняя школа Орт Рогозин Мигдаль ха-Эмек", "2016 - 2018", "Израильский аттестат зрелости (Багрут)", "Окончил с уклоном в компьютерные науки, специализация — проектирование систем и программирование.", "Изучал и практиковал языки C#, MySQL, HTML, CSS и JavaScript. Этот ранний опыт заложил прочную основу для фронтенд- и бэкенд-разработки."],
      projectsTitle: "Мои проекты",
      project1: ["PokemonAPI", "2025", "Сбор и отображение данных о покемонах с изображениями, звуками и расширенной фильтрацией.", "GitHub", "Демо"],
      project2: ["portfolioSite", "2025", "Личный сайт-портфолио для демонстрации проектов и связи со мной.", "GitHub", "Демо"],
      certificationsTitle: "Сертификаты",
      cert1: ["Курс продвинутого Excel", "2024", "Прошел курс продвинутого Excel от Campus IL, с акцентом на анализ данных, сводные таблицы, продвинутые функции (VLOOKUP, INDEX/MATCH и др.) и эффективное управление таблицами. Получил практический опыт и успешно сдал итоговый экзамен."],
      contactTitle: "Связаться",
      contactSubtitle: "Не стесняйтесь обращаться!",
      form: ["ФИО", "Ваше имя", "Email", "Ваш email", "Сообщение", "Введите сообщение...", "Отправить"],
      footer: "Все права защищены.",
      name: "Макс Халфин"
    },
    am: {
      nav: ["መነሻ", "ስለ እኔ", "ትምህርት ቤት", "ፕሮጀክቶቼ", "ማረጋገጫዎች", "ያግኙኝ"],
      heroDesc: "ወደ የኔ መደበኛ<br>ፖርትፎሊዮ ድህረገፅ እንኳን በደህና መጡ!",
      resume: "የኔ ራዚዩሜ ያውርዱ",
      aboutTitle: "ስለ እኔ",
      aboutSummary: "ማጠቃለያ",
      aboutText: `እኔ የመረጃ ስርዓቶች አንደኛ አካል ነኝ፣ በውስጥ የዳታ ሳይንስ ስፔሻላይዝ ያለኝ፣ ንፁህ የተጠቃሚ ተሞክሮ ከብርቱ የውሂብ አቅም ጋር ለማዋሃድ መፍትሄዎችን ለመገንባት የተዋዋይ ነኝ።<br>ሃሳቦችን ወደ እውነተኛ፣ ተግባራዊ መሳሪያዎች ለመለወጥ እወዳለሁ።<br>በቀጣይ መማር፣ በዓላማ መገንባት እና የቴክኒክ ጥልቅነትን ከፈጠራ አስተሳሰብ ጋር ለማዋሃድ እምነት አለኝ።<br>አስተያየት፣ ትብብር ወይም ከቴክኖሎጂ እና አዲስነት የተዋዋይ ሰዎች ጋር መገናኘት ሁሌም ነፃ ነኝ።` ,
      educationTitle: "ትምህርት ቤት",
      education1: ["የማክስ ስተርን የይዝርኤል ሸርሽ ኮሌጅ", "2023 - አሁን", "የመረጃ ስርዓቶች ዲግሪ – የዳታ ሳይንስ ስፔሻላይዝ", "የብዙ አይነት ዲግሪ የሶፍትዌር ልማት፣ የውሂብ ጎታዎች፣ ስታቲስቲክስ፣ ማሽን ለርኒንግ እና የንግድ ግንዛቤዎችን ያያያዝ።", "በPython, Java, SQL, የውሂብ ትንተና እና የስርዓት ንድፍ ላይ በተግባር ልምድ ተገኝቻለሁ፣ በእውነተኛ ፕሮጀክቶች እና በተግባራዊ ስራዎች ላይ ትኩረት አድርጌ።"],
      education2: ["ኦርት ሮጎዚን ሚግዳል ሀኤሜክ ከፍተኛ ትምህርት ቤት", "2016 - 2018", "የእስራኤል ማትሪክሌሽን ማረጋገጫ (ባግሩት)", "በኮምፒውተር ሳይንስ ማዕከል ተጨማሪ በስርዓት ንድፍ እና በፕሮግራሚንግ ላይ ተማርኩ።", "C#, MySQL, HTML, CSS, እና JavaScript ቋንቋዎችን ተማርኩ እና ተግባራዊ ልምድ ተገኝቻለሁ። ይህ ቀደም ብሎ የተሰጠ ልምድ በፊትና በኋላ ልማት የተሻለ መሠረት አድርጎታል።"],
      projectsTitle: "ፕሮጀክቶቼ",
      project1: ["PokemonAPI", "2025", "የፖኬሞን ውሂብን ማሰባሰብ እና ማሳየት በምስሎች፣ ድምፆች እና የሚያስተላለፉ ማጣሪያዎች ጋር።", "GitHub", "ቀጥታ ማሳያ"],
      project2: ["portfolioSite", "2025", "የግል ፖርትፎሊዮ ድህረገፅ ፕሮጀክቶችን ለማሳየት እና ቀጥታ ለመገናኘት።", "GitHub", "ቀጥታ ማሳያ"],
      certificationsTitle: "ማረጋገጫዎች",
      cert1: ["የኤክሴል የተሻለ ኮርስ", "2024", "በCampus IL የተሻለ የኤክሴል ኮርስ ተጠናቅቋል፣ በውሂብ ትንተና፣ በPivot ሰንጠረዦች፣ በየተሻለ ተግባራት (VLOOKUP, INDEX/MATCH ወዘተ) እና በተሻለ የሰንጠረዥ አስተዳደር ላይ ትኩረት ተደርጓል። በተግባር ልምድ ተገኝቻለሁ እና የመጨረሻ ፈተና በተሳካ ሁኔታ ተሳክቷል።"],
      contactTitle: "ያግኙኝ",
      contactSubtitle: "እባክዎን ያግኙኝ!",
      form: ["ሙሉ ስም", "ስምዎን ያስገቡ", "ኢሜይል", "ኢሜይልዎን ያስገቡ", "መልእክት", "መልእክትዎን ያስገቡ...", "ላክ"],
      footer: "ሁሉም መብቶች የተጠበቁ ናቸው።",
      name: "ማክስ ሃልፊን"
    },
    fr: {
      nav: ["Accueil", "À propos", "Éducation", "Mes Projets", "Certifications", "Contact"],
      heroDesc: "Bienvenue sur mon site portfolio officiel !<br>",
      resume: "Télécharger mon CV",
      aboutTitle: "À propos de moi",
      aboutSummary: "Résumé",
      aboutText: `Je suis développeur de systèmes d'information spécialisé en Data Science, passionné par la création de solutions alliant expérience utilisateur soignée et puissance des données.<br>J'aime transformer des idées en outils interactifs concrets qui apportent de la valeur aux utilisateurs.<br>Je crois fermement à l'apprentissage continu, à la construction avec un but, et à la combinaison de la technique et de la créativité.<br>Je suis toujours ouvert aux retours, à la collaboration ou à l'échange avec des passionnés de tech et d'innovation.` ,
      educationTitle: "Éducation",
      education1: ["Collège Académique Max Stern Yezreel Valley", "2023 - présent", "Licence en Systèmes d'Information – spécialisation Data Science", "Un diplôme multidisciplinaire combinant développement logiciel, bases de données, statistiques, machine learning et analyse business.", "J'ai acquis une expérience pratique en Python, Java, SQL, analyse de données et conception de systèmes, avec un fort accent sur les projets concrets et les applications réelles."],
      education2: ["Lycée Ort Rogozin Migdal HaEmek", "2016 - 2018", "Baccalauréat israélien", "Spécialisation en informatique, conception de systèmes et programmation.", "Étude et pratique de langages comme C#, MySQL, HTML, CSS et JavaScript. Cette expérience précoce a posé une base solide pour le développement front-end et back-end."],
      projectsTitle: "Mes Projets",
      project1: ["PokemonAPI", "2025", "Collecte et présentation de données Pokémon avec images, sons et filtres avancés.", "GitHub", "Démo"],
      project2: ["portfolioSite", "2025", "Site portfolio personnel pour présenter mes projets et me contacter directement.", "GitHub", "Démo"],
      certificationsTitle: "Certifications",
      cert1: ["Cours Excel Avancé", "2024", "J'ai suivi le cours Excel Avancé de Campus IL, axé sur l'analyse de données, les tableaux croisés dynamiques, les fonctions avancées (VLOOKUP, INDEX/MATCH, etc.) et la gestion efficace des feuilles. Expérience pratique acquise et examen final réussi."],
      contactTitle: "Contact",
      contactSubtitle: "N'hésitez pas à me contacter !",
      form: ["Nom complet", "Votre nom", "Email", "Votre email", "Message", "Tapez votre message...", "Envoyer"],
      footer: "Tous droits réservés.",
      name: "Max Halfin"
    },
    es: {
      nav: ["Inicio", "Sobre mí", "Educación", "Mis Proyectos", "Certificaciones", "Contacto"],
      heroDesc: "¡Bienvenido a mi sitio web oficial de portafolio!<br>",
      resume: "Descargar mi CV",
      aboutTitle: "Sobre mí",
      aboutSummary: "Resumen",
      aboutText: `Soy un desarrollador de sistemas de información especializado en Ciencia de Datos, apasionado por crear soluciones que combinan una experiencia de usuario limpia con potentes capacidades de datos.<br>Disfruto convertir ideas en herramientas interactivas reales que aportan valor a los usuarios.<br>Creo firmemente en el aprendizaje continuo, construir con propósito y combinar profundidad técnica con pensiero creativo.<br>Siempre estoy abierto a comentarios, colaboración o conectar con personas apasionadas por la tecnología y la innovación.` ,
      educationTitle: "Educación",
      education1: ["Colegio Académico Max Stern Yezreel Valley", "2023 - actual", "Licenciatura en Sistemas de Información – especialización en Ciencia de Datos", "Un título multidisciplinario que combina desarrollo de software, bases de datos, estadística, aprendizaje automático y análisis empresarial.", "Adquirí experiencia práctica en Python, Java, SQL, análisis de datos y diseño de sistemas, con un fuerte enfoque en proyectos prácticos y aplicaciones reales."],
      education2: ["Escuela Secundaria Ort Rogozin Migdal HaEmek", "2016 - 2018", "Certificado de Bachillerato Israelí", "Completado con especialización en Ciencias de la Computación, diseño de sistemas y programación.", "Estudié y practiqué lenguajes como C#, MySQL, HTML, CSS y JavaScript. Esta experiencia temprana sentó una base sólida para el desarrollo tanto de frontend como de backend."],
      projectsTitle: "Mis Proyectos",
      project1: ["PokemonAPI", "2025", "Recopila y presenta datos de Pokémon con imágenes, sonidos y filtrado avanzado.", "GitHub", "Demo"],
      project2: ["portfolioSite", "2025", "Sitio web de portafolio personal para mostrar proyectos y contactarme directamente.", "GitHub", "Demo"],
      certificationsTitle: "Certificaciones",
      cert1: ["Curso Avanzado de Excel", "2024", "Completé el curso avanzado de Excel de Campus IL, enfocado en análisis de datos, tablas dinámicas, funciones avanzadas (VLOOKUP, INDEX/MATCH, etc.) y gestión eficiente de hojas de cálculo. Obtuve experiencia práctica y aprobé el examen final."],
      contactTitle: "Contacto",
      contactSubtitle: "¡No dudes en contactarme!",
      form: ["Nombre completo", "Tu nombre", "Correo electrónico", "Tu correo", "Mensaje", "Escribe tu mensaje...", "Enviar"],
      footer: "Todos los derechos reservados.",
      name: "Max Halfin"
    },
    de: {
      nav: ["Startseite", "Über mich", "Ausbildung", "Meine Projekte", "Zertifikate", "Kontakt"],
      heroDesc: "Willkommen auf meiner offiziellen Portfolio-Website!<br>",
      resume: "Lebenslauf herunterladen",
      aboutTitle: "Über mich",
      aboutSummary: "Zusammenfassung",
      aboutText: `Ich bin ein Entwickler für Informationssysteme mit Spezialisierung auf Data Science und leidenschaftlich daran interessiert, Lösungen zu schaffen, die eine saubere Benutzererfahrung mit leistungsstarken Datenfunktionen verbinden.<br>Ich genieße es, Ideen in echte, interaktive Werkzeuge umzusetzen, die den Nutzern einen Mehrwert bieten.<br>Ich glaube fest an kontinuierliches Lernen, zielgerichtetes Arbeiten und die Verbindung von technischer Tiefe mit kreativem Denken.<br>Ich bin immer offen für Feedback, Zusammenarbeit oder den Austausch mit Gleichgesinnten, die sich für Technik und Innovation begeistern.` ,
      educationTitle: "Ausbildung",
      education1: ["Max Stern Yezreel Valley College", "2023 - aktuell", "B.Sc. in Informationssystemen – Spezialisierung Data Science", "Ein multidisziplinärer Abschluss, der Softwareentwicklung, Datenbanken, Statistik, maschinelles Lernen und Business Insights kombiniert.", "Ich habe praktische Erfahrungen in Python, Java, SQL, Datenanalyse und Systemdesign gesammelt, mit starkem Fokus auf praxisnahe Projekte und reale Anwendungen."],
      education2: ["Ort Rogozin Migdal HaEmek Gymnasium", "2016 - 2018", "Israelisches Abitur (Bagrut)", "Abschluss mit Schwerpunkt Informatik, Systemdesign und Programmierung.", "Ich habe Sprachen wie C#, MySQL, HTML, CSS und JavaScript gelernt und angewendet. Diese frühe Erfahrung bildete eine solide Grundlage für die Frontend- und Backend-Entwicklung."],
      projectsTitle: "Meine Projekte",
      project1: ["PokemonAPI", "2025", "Sammeln und Präsentieren von Pokémon-Daten mit Bildern, Sounds und erweiterten Filtern.", "GitHub", "Demo"],
      project2: ["portfolioSite", "2025", "Persönliche Portfolio-Website zur Präsentation von Projekten und direkter Kontaktaufnahme.", "GitHub", "Demo"],
      certificationsTitle: "Zertifikate",
      cert1: ["Fortgeschrittener Excel-Kurs", "2024", "Ich habe den Fortgeschrittenen-Excel-Kurs von Campus IL abgeschlossen, mit Fokus auf Datenanalyse, Pivot-Tabellen, fortgeschrittene Funktionen (VLOOKUP, INDEX/MATCH usw.) und effizientes Tabellenmanagement. Praktische Erfahrung gesammelt und die Abschlussprüfung bestanden."],
      contactTitle: "Kontakt",
      contactSubtitle: "Kontaktieren Sie mich gerne!",
      form: ["Vollständiger Name", "Ihr Name", "E-Mail", "Ihre E-Mail", "Nachricht", "Ihre Nachricht...", "Senden"],
      footer: "Alle Rechte vorbehalten.",
      name: "Max Halfin"
    },
    it: {
      nav: ["Home", "Chi sono", "Formazione", "I miei progetti", "Certificazioni", "Contatti"],
      heroDesc: "Benvenuto nel mio sito portfolio ufficiale!<br>",
      resume: "Scarica il mio CV",
      aboutTitle: "Chi sono",
      aboutSummary: "Riassunto",
      aboutText: `Sono uno sviluppatore di sistemi informativi specializzato in Data Science, appassionato di creare soluzioni che uniscono un'esperienza utente pulita a potenti capacità di gestione dati.<br>Mi piace trasformare idee in strumenti interattivi reali che portano valore agli utenti.<br>Credo fortemente nell'apprendimento continuo, nel costruire con uno scopo e nel combinare profondità tecnica e pensiero creativo.<br>Sono sempre aperto a feedback, collaborazioni o a entrare in contatto con persone appassionate di tecnologia e innovazione.` ,
      educationTitle: "Formazione",
      education1: ["Max Stern Yezreel Valley College", "2023 - attuale", "Laurea in Sistemi Informativi – specializzazione Data Science", "Un titolo multidisciplinare che combina sviluppo software, database, statistica, machine learning e business insights.", "Ho acquisito esperienza pratica in Python, Java, SQL, analisi dei dati e progettazione di sistemi, con forte attenzione a progetti pratici e applicazioni reali."],
      education2: ["Liceo Ort Rogozin Migdal HaEmek", "2016 - 2018", "Diploma di maturità israeliano (Bagrut)", "Completato con specializzazione in informatica, progettazione di sistemi e programmazione.", "Ho studiato e praticato linguaggi come C#, MySQL, HTML, CSS e JavaScript. Questa esperienza precoce ha creato una solida base per lo sviluppo sia frontend che backend."],
      projectsTitle: "I miei progetti",
      project1: ["PokemonAPI", "2025", "Raccolta e presentazione di dati Pokémon con immagini, suoni e filtri avanzati.", "GitHub", "Demo"],
      project2: ["portfolioSite", "2025", "Sito portfolio personale per mostrare progetti e contattarmi direttamente.", "GitHub", "Demo"],
      certificationsTitle: "Certificazioni",
      cert1: ["Corso Excel Avanzato", "2024", "Ho completato il corso Excel Avanzato di Campus IL, focalizzato su analisi dati, tabelle pivot, funzioni avanzate (VLOOKUP, INDEX/MATCH, ecc.) e gestione efficiente dei fogli di calcolo. Ho acquisito esperienza pratica e superato l'esame finale."],
      contactTitle: "Contatti",
      contactSubtitle: "Sentiti libero di contattarmi!",
      form: ["Nome completo", "Il tuo nome", "Email", "La tua email", "Messaggio", "Scrivi il tuo messaggio...", "Invia"],
      footer: "Tutti i diritti riservati.",
      name: "Max Halfin"
    },
    zh: {
      nav: ["首页", "关于我", "教育", "我的项目", "证书", "联系我"],
      heroDesc: "欢迎来到我的官方作品集网站！<br>",
      resume: "下载我的简历",
      aboutTitle: "关于我",
      aboutSummary: "简介",
      aboutText: `我是一名专注于数据科学的信息系统开发者，热衷于构建将简洁用户体验与强大数据能力结合的解决方案。<br>我喜欢将想法变成真实、互动的工具，为用户带来价值。<br>我坚信持续学习、有目标地构建，并将技术深度与创造性思维结合。<br>我始终欢迎反馈、合作，或与热爱技术和创新的人交流。` ,
      educationTitle: "教育",
      education1: ["马克斯·斯特恩·耶兹雷尔山谷学院", "2023 - 现在", "信息系统学士 – 数据科学方向", "一门融合了软件开发、数据库、统计、机器学习和商业洞察的多学科学位。", "我获得了Python、Java、SQL、数据分析和系统设计的实践经验，注重实际项目和真实应用。"],
      education2: ["奥特·罗戈津·米格达尔哈埃梅克中学", "2016 - 2018", "以色列高中毕业证书（Bagrut）", "主修计算机科学，专注于系统设计和编程。", "学习并实践了C#、MySQL、HTML、CSS和JavaScript等语言。这段早期经历为前后端开发打下了坚实基础。"],
      projectsTitle: "我的项目",
      project1: ["PokemonAPI", "2025", "收集和展示宝可梦数据，包含图片、声音和高级筛选。", "GitHub", "演示"],
      project2: ["portfolioSite", "2025", "个人作品集网站，展示项目并可直接联系我。", "GitHub", "演示"],
      certificationsTitle: "证书",
      cert1: ["高级Excel课程", "2024", "完成了Campus IL的高级Excel课程，专注于数据分析、数据透视表、高级函数（VLOOKUP、INDEX/MATCH等）和高效表格管理。通过实际练习获得经验，并顺利通过了期末考试。"],
      contactTitle: "联系我",
      contactSubtitle: "欢迎随时联系！",
      form: ["全名", "您的名字", "邮箱", "您的邮箱", "留言", "请输入您的留言...", "发送"],
      footer: "版权所有。",
      name: "马克斯·哈芬"
    },
    ja: {
      nav: ["ホーム", "私について", "学歴", "プロジェクト", "認定資格", "お問い合わせ"],
      heroDesc: "私の公式ポートフォリオサイトへようこそ！<br>",
      resume: "履歴書をダウンロード",
      aboutTitle: "私について",
      aboutSummary: "概要",
      aboutText: `私はデータサイエンスを専門とする情報システム開発者であり、クリーンなユーザー体験と強力なデータ機能を組み合わせたソリューションの構築に情熱を持っています。<br>アイデアを実際のインタラクティブなツールに変えることが好きです。<br>継続的な学習、目的を持った開発、技術的な深さと創造的思考の融合を信じています。<br>フィードバックやコラボレーション、テクノロジーやイノベーションに情熱を持つ方との交流も大歓迎です。` ,
      educationTitle: "学歴",
      education1: ["マックス・スターン・イェズレエル・バレー・カレッジ", "2023年～現在", "情報システム学士 – データサイエンス専攻", "ソフトウェア開発、データベース、統計、機械学習、ビジネスインサイトを組み合わせた学際的な学位です。", "Python、Java、SQL、データ分析、システム設計の実践経験を積み、実際のプロジェクトや現場での応用に重点を置いています。"],
      education2: ["オルト・ロゴジン・ミグダル・ハエメク高校", "2016年～2018年", "イスラエル高校卒業証書（バグルート）", "コンピュータサイエンス専攻、システム設計とプログラミングに特化。", "C#、MySQL、HTML、CSS、JavaScriptなどの言語を学び、実践しました。この早期の経験がフロントエンドとバックエンド開発の基礎を築きました。"],
      projectsTitle: "プロジェクト",
      project1: ["PokemonAPI", "2025", "ポケモンのデータを画像・音声・高度なフィルタで収集・表示。", "GitHub", "デモ"],
      project2: ["portfolioSite", "2025", "プロジェクト紹介や直接連絡ができる個人ポートフォリオサイト。", "GitHub", "デモ"],
      certificationsTitle: "認定資格",
      cert1: ["上級Excelコース", "2024", "Campus ILの上級Excelコースを修了し、データ分析、ピボットテーブル、高度な関数（VLOOKUP, INDEX/MATCHなど）、効率的なシート管理に重点を置きました。実践的な演習を通じて経験を積み、最終試験にも合格しました。"],
      contactTitle: "お問い合わせ",
      contactSubtitle: "お気軽にご連絡ください！",
      form: ["氏名", "お名前", "メールアドレス", "メールアドレスを入力", "メッセージ", "メッセージを入力...", "送信"],
      footer: "全著作権所有。",
      name: "マックス・ハルフィン"
    },
    ro: {
      nav: ["Acasă", "Despre mine", "Educație", "Proiectele mele", "Certificări", "Contact"],
      heroDesc: "Bine ați venit pe site-ul meu oficial de portofoliu!<br>",
      resume: "Descarcă CV-ul meu",
      aboutTitle: "Despre mine",
      aboutSummary: "Rezumat",
      aboutText: `Sunt dezvoltator de sisteme informatice specializat în Data Science, pasionat de crearea de soluții care combină o experiență curată pentru utilizator cu capabilități puternice de date.<br>Îmi place să transform ideile în instrumente interactive reale care aduc valoare utilizatorilor.<br>Cred cu tărie în învățarea continuă, construirea cu scop și combinarea profunzimii tehnice cu gândirea creativă.<br>Sunt mereu deschis la feedback, colaborare sau conectare cu persoane pasionate de tehnologie și inovație.` ,
      educationTitle: "Educație",
      education1: ["Colegiul Academic Max Stern Yezreel Valley", "2023 - prezent", "Licență în Sisteme Informatice – specializare Data Science", "O diplomă multidisciplinară care combină dezvoltarea software, bazele de date, statistica, machine learning și perspective de business.", "Am dobândit experiență practică în Python, Java, SQL, analiză de date și proiectare de sisteme, cu accent pe proiecte practice și aplicații reale."],
      education2: ["Liceul Ort Rogozin Migdal HaEmek", "2016 - 2018", "Diplomă de Bacalaureat Israelian", "Absolvit cu specializare în Informatică, proiectare de sisteme și programare.", "Am studiat și practicat limbaje precum C#, MySQL, HTML, CSS și JavaScript. Această experiență timpurie a pus o bază solidă pentru dezvoltarea atât frontend, cât și backend."],
      projectsTitle: "Proiectele mele",
      project1: ["PokemonAPI", "2025", "Colectează și prezintă date Pokémon cu imagini, sunete și filtrare avansată.", "GitHub", "Demo"],
      project2: ["portfolioSite", "2025", "Site portofoliu personal pentru a prezenta proiecte și a mă contacta direct.", "GitHub", "Demo"],
      certificationsTitle: "Certificări",
      cert1: ["Curs Excel Avansat", "2024", "Am finalizat cursul Excel Avansat de la Campus IL, axat pe analiza datelor, tabele pivot, funcții avansate (VLOOKUP, INDEX/MATCH etc.) și gestionarea eficientă a foilor de calcul. Am dobândit experiență practică și am promovat examenul final."],
      contactTitle: "Contact",
      contactSubtitle: "Nu ezitați să mă contactați!",
      form: ["Nume complet", "Numele tău", "Email", "Emailul tău", "Mesaj", "Scrie mesajul tău...", "Trimite"],
      footer: "Toate drepturile rezervate.",
      name: "Max Halfin"
    }
  };

  function setLanguage(lang) {
    document.body.setAttribute('dir', (lang === 'he' || lang === 'ar' || lang === 'am') ? 'rtl' : 'ltr');
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
    // Card 1
    document.getElementById('edu1-title').innerHTML = translations[lang].education1[0];
    document.getElementById('edu1-years').innerHTML = translations[lang].education1[1];
    document.getElementById('edu1-degree').innerHTML = translations[lang].education1[2];
    document.getElementById('edu1-desc1').innerHTML = translations[lang].education1[3];
    document.getElementById('edu1-desc2').innerHTML = translations[lang].education1[4];
    // Card 2
    document.getElementById('edu2-title').innerHTML = translations[lang].education2[0];
    document.getElementById('edu2-years').innerHTML = translations[lang].education2[1];
    document.getElementById('edu2-degree').innerHTML = translations[lang].education2[2];
    document.getElementById('edu2-desc1').innerHTML = translations[lang].education2[3];
    document.getElementById('edu2-desc2').innerHTML = translations[lang].education2[4];
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
      } else if (lang === 'ru') {
        langIcon.src = 'assets/rus.png';
        langIcon.alt = 'Русский';
      } else if (lang === 'am') {
        langIcon.src = 'assets/eth.png';
        langIcon.alt = 'አማርኛ';
      } else if (lang === 'fr') {
        langIcon.src = 'assets/fra.png';
        langIcon.alt = 'Français';
      } else if (lang === 'es') {
        langIcon.src = 'assets/spa.png';
        langIcon.alt = 'Español';
      } else if (lang === 'de') {
        langIcon.src = 'assets/ger.png';
        langIcon.alt = 'Deutsch';
      } else if (lang === 'it') {
        langIcon.src = 'assets/ita.png';
        langIcon.alt = 'Italiano';
      } else if (lang === 'zh') {
        langIcon.src = 'assets/chi.png';
        langIcon.alt = '中文';
      } else if (lang === 'ja') {
        langIcon.src = 'assets/jap.png';
        langIcon.alt = '日本語';
      } else if (lang === 'ro') {
        langIcon.src = 'assets/rom.png';
        langIcon.alt = 'Română';
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
      // Set dropdown direction to match current body direction
      langDropdown.setAttribute('dir', document.body.getAttribute('dir') || 'ltr');
      // Fixed language order - positions will always be the same
      const langs = [
        { code: 'en', img: 'assets/us.png', alt: 'English' },
        { code: 'he', img: 'assets/isr.png', alt: 'עברית' },
        { code: 'ar', img: 'assets/arab.png', alt: 'العربية' },
        { code: 'ru', img: 'assets/rus.png', alt: 'Русский' },
        { code: 'am', img: 'assets/eth.png', alt: 'አማርኛ' },
        { code: 'fr', img: 'assets/fra.png', alt: 'Français' },
        { code: 'es', img: 'assets/spa.png', alt: 'Español' },
        { code: 'de', img: 'assets/ger.png', alt: 'Deutsch' },
        { code: 'it', img: 'assets/ita.png', alt: 'Italiano' },
        { code: 'zh', img: 'assets/chi.png', alt: '中文' },
        { code: 'ja', img: 'assets/jap.png', alt: '日本語' },
        { code: 'ro', img: 'assets/rom.png', alt: 'Română' }
      ];
      
      // Create 2 rows with 6 languages each - fixed positions
      const row1 = langs.slice(0, 6);
      const row2 = langs.slice(6, 12);
      
      // Create HTML for the grid layout - positions are always the same
      const gridHTML = [
        `<div class="lang-row" style="display: flex; gap: 0.3rem; justify-content: center; margin-bottom: 0.3rem;">
          ${row1.map(l => `<button class="lang-option" data-lang="${l.code}"><img src="${l.img}" alt="${l.alt}" /></button>`).join('')}
        </div>`,
        `<div class="lang-row" style="display: flex; gap: 0.3rem; justify-content: center;">
          ${row2.map(l => `<button class="lang-option" data-lang="${l.code}"><img src="${l.img}" alt="${l.alt}" /></button>`).join('')}
        </div>`
      ].join('');
      
      langDropdown.innerHTML = gridHTML;
      
      // Re-attach click listeners
      langDropdown.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', e => {
          const lang = btn.getAttribute('data-lang');
          setLanguage(lang);
          localStorage.setItem('lang', lang);
          langDropdown.style.display = 'none';
        });
      });
      langDropdown.style.display = langDropdown.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', () => {
      langDropdown.style.display = 'none';
    });
    langDropdown.addEventListener('click', e => {
      e.stopPropagation();
    });
  }

  // On page load, set language from localStorage if exists
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);
}); 