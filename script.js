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
      name: "Max Halfin",
      project3: [
        "CollegeManager",
        "2025",
        "College Manager is a Java project simulating a college system, showcasing Object-Oriented Programming (OOP) with features for managing students, courses, instructors, and enrollments.",
        "GitHub"
      ]
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
      name: "מקס חלפין",
      project3: [
        "CollegeManager",
        "2025",
        "קולג' מנג'ר הוא פרויקט ב-Java המדמה מערכת מכללה, המדגים תכנות מונחה עצמים (OOP) עם יכולות לניהול סטודנטים, קורסים, מרצים והרשמות.",
        "גיטהאב"
      ]
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
      name: "ماكس حلڤين",
      project3: [
        "CollegeManager",
        "2025",
        "كلية مانجر هو مشروع جافا يحاكي نظام كلية، ويعرض البرمجة الكائنية (OOP) مع ميزات لإدارة الطلاب، الدورات، المحاضرين والتسجيلات.",
        "جيت هاب"
      ]
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
      name: "Макс Халфин",
      project3: [
        "CollegeManager",
        "2025",
        "College Manager — это проект на Java, моделирующий систему колледжа и демонстрирующий объектно-ориентированное программирование (OOP) с возможностями управления студентами, курсами, преподавателями и регистрациями.",
        "GitHub"
      ]
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
      name: "ማክስ ሃልፊን",
      project3: [
        "CollegeManager",
        "2025",
        "College Manager የጃቫ ፕሮጀክት ሲሆን የኮሌጅ ስርዓትን ይወክላል፣ የአባል አወዳድር (OOP) በተግባር ማሳየት እና የተማሪዎች፣ ኮርሶች፣ አስተማሪዎች እና ምዝገባዎችን ማስተናገድ ይችላል።",
        "GitHub"
      ]
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
      name: "Max Halfin",
      project3: [
        "CollegeManager",
        "2025",
        "College Manager est un projet Java simulant un système universitaire, mettant en avant la programmation orientée objet (POO) avec des fonctionnalités de gestion des étudiants, des cours, des enseignants et des inscriptions.",
        "GitHub"
      ]
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
      name: "Max Halfin",
      project3: [
        "CollegeManager",
        "2025",
        "College Manager es un proyecto en Java que simula un sistema universitario, mostrando Programación Orientada a Objetos (OOP) con funciones para gestionar estudiantes, cursos, instructores e inscripciones.",
        "GitHub"
      ]
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
      name: "Max Halfin",
      project3: [
        "CollegeManager",
        "2025",
        "College Manager ist ein Java-Projekt, das ein Hochschulsystem simuliert und objektorientierte Programmierung (OOP) mit Funktionen zur Verwaltung von Studierenden, Kursen, Dozenten und Einschreibungen demonstriert.",
        "GitHub"
      ]
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
      name: "Max Halfin",
      project3: [
        "CollegeManager",
        "2025",
        "College Manager è un progetto Java che simula un sistema universitario, mostrando la programmazione orientata agli oggetti (OOP) con funzionalità per la gestione di studenti, corsi, docenti e iscrizioni.",
        "GitHub"
      ]
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
      name: "马克斯·哈芬",
      project3: [
        "CollegeManager",
        "2025",
        "College Manager 是一个用 Java 编写的项目，模拟大学系统，展示了面向对象编程（OOP），并具备管理学生、课程、教师和注册的功能。",
        "GitHub"
      ]
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
      name: "マックス・ハルフィン",
      project3: [
        "CollegeManager",
        "2025",
        "College Managerは、大学システムをシミュレートするJavaプロジェクトで、学生、コース、講師、登録の管理機能を備えたオブジェクト指向プログラミング（OOP）を実演します。",
        "GitHub"
      ]
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
      name: "Max Halfin",
      project3: [
        "CollegeManager",
        "2025",
        "College Manager este un proiect Java care simulează un sistem universitar, demonstrând programarea orientată pe obiecte (OOP) cu funcționalități pentru gestionarea studenților, cursurilor, instructorilor și înscrierilor.",
        "GitHub"
      ]
    }
  };

  function setLanguage(lang) {
    console.log('Setting language to:', lang);
    // Check if translations object exists and has the required language
    if (!translations || !translations[lang]) {
      console.error('Translations not found for language:', lang);
      return;
    }
    document.body.setAttribute('dir', (lang === 'he' || lang === 'ar' || lang === 'am') ? 'rtl' : 'ltr');
    // Nav
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    if (navLinks.length && translations[lang].nav) {
      navLinks.forEach((el, i) => { if (translations[lang].nav[i]) el.innerHTML = translations[lang].nav[i]; });
    }
    // Hero
    const heroDesc = document.querySelector('.hero-desc');
    if (heroDesc) heroDesc.innerHTML = translations[lang].heroDesc;
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) resumeBtn.innerHTML = translations[lang].resume;
    // Name (h1)
    const heroName = document.querySelector('.hero-content h1');
    if (heroName) heroName.innerHTML = translations[lang].name;
    // About
    const aboutH2 = document.querySelector('#about h2');
    if (aboutH2) aboutH2.innerHTML = translations[lang].aboutTitle;
    const aboutH4 = document.querySelector('#about h4');
    if (aboutH4) aboutH4.innerHTML = translations[lang].aboutSummary;
    const aboutP = document.querySelector('#about p');
    if (aboutP) aboutP.innerHTML = translations[lang].aboutText;
    // Education
    const eduH2 = document.querySelector('#education h2');
    if (eduH2) eduH2.innerHTML = translations[lang].educationTitle;
    const edu1Title = document.getElementById('edu1-title');
    if (edu1Title) edu1Title.innerHTML = translations[lang].education1[0];
    const edu1Years = document.getElementById('edu1-years');
    if (edu1Years) edu1Years.innerHTML = translations[lang].education1[1];
    const edu1Degree = document.getElementById('edu1-degree');
    if (edu1Degree) edu1Degree.innerHTML = translations[lang].education1[2];
    const edu1Desc1 = document.getElementById('edu1-desc1');
    if (edu1Desc1) edu1Desc1.innerHTML = translations[lang].education1[3];
    const edu1Desc2 = document.getElementById('edu1-desc2');
    if (edu1Desc2) edu1Desc2.innerHTML = translations[lang].education1[4];
    const edu2Title = document.getElementById('edu2-title');
    if (edu2Title) edu2Title.innerHTML = translations[lang].education2[0];
    const edu2Years = document.getElementById('edu2-years');
    if (edu2Years) edu2Years.innerHTML = translations[lang].education2[1];
    const edu2Degree = document.getElementById('edu2-degree');
    if (edu2Degree) edu2Degree.innerHTML = translations[lang].education2[2];
    const edu2Desc1 = document.getElementById('edu2-desc1');
    if (edu2Desc1) edu2Desc1.innerHTML = translations[lang].education2[3];
    const edu2Desc2 = document.getElementById('edu2-desc2');
    if (edu2Desc2) edu2Desc2.innerHTML = translations[lang].education2[4];
    // Projects
    const projectsH2 = document.querySelector('#projects h2');
    if (projectsH2) projectsH2.innerHTML = translations[lang].projectsTitle;
    
    // Update all project cards in all slides
    const allProjCards = document.querySelectorAll('#projects .projects-slide .project-card');
    if (allProjCards.length >= 3) {
      // Card 1 (PokemonAPI) - in slide 0
      const p1h3 = allProjCards[0].querySelector('h3');
      if (p1h3) p1h3.innerHTML = translations[lang].project1[0];
      const p1span = allProjCards[0].querySelector('span');
      if (p1span) p1span.innerHTML = translations[lang].project1[1];
      const p1p = allProjCards[0].querySelectorAll('p')[0];
      if (p1p) p1p.innerHTML = translations[lang].project1[2];
      const btns1 = allProjCards[0].querySelectorAll('.btn');
      if (btns1.length >= 2) {
        if (translations[lang].project1[3]) btns1[0].innerHTML = translations[lang].project1[3];
        if (translations[lang].project1[4]) btns1[1].innerHTML = translations[lang].project1[4];
      }
      
      // Card 2 (portfolioSite) - in slide 0
      const p2h3 = allProjCards[1].querySelector('h3');
      if (p2h3) p2h3.innerHTML = translations[lang].project2[0];
      const p2span = allProjCards[1].querySelector('span');
      if (p2span) p2span.innerHTML = translations[lang].project2[1];
      const p2p = allProjCards[1].querySelectorAll('p')[0];
      if (p2p) p2p.innerHTML = translations[lang].project2[2];
      const btns2 = allProjCards[1].querySelectorAll('.btn');
      if (btns2.length >= 2) {
        if (translations[lang].project2[3]) btns2[0].innerHTML = translations[lang].project2[3];
        if (translations[lang].project2[4]) btns2[1].innerHTML = translations[lang].project2[4];
      }
      
      // Card 3 (CollegeManager) - in slide 1
      const p3h3 = allProjCards[2].querySelector('h3');
      if (p3h3) p3h3.innerHTML = translations[lang].project3[0];
      const p3span = allProjCards[2].querySelector('span');
      if (p3span) p3span.innerHTML = translations[lang].project3[1];
      const p3p = allProjCards[2].querySelectorAll('p')[0];
      if (p3p) p3p.innerHTML = translations[lang].project3[2];
      const btns3 = allProjCards[2].querySelectorAll('.btn');
      if (btns3.length >= 1) {
        if (translations[lang].project3[3]) btns3[0].innerHTML = translations[lang].project3[3];
      }
    }
    // Certifications
    const certH2 = document.querySelector('#certifications h2');
    if (certH2) certH2.innerHTML = translations[lang].certificationsTitle;
    const certCard = document.querySelector('#certifications .project-card');
    if (certCard) {
      const certH3 = certCard.querySelector('h3');
      if (certH3) certH3.innerHTML = translations[lang].cert1[0];
      const certSpan = certCard.querySelector('span');
      if (certSpan) certSpan.innerHTML = translations[lang].cert1[1];
      const certP = certCard.querySelectorAll('p')[0];
      if (certP) certP.innerHTML = translations[lang].cert1[2];
    }
    // Contact
    const contactH2 = document.querySelector('#contact h2');
    if (contactH2) contactH2.innerHTML = translations[lang].contactTitle;
    const contactSubtitle = document.querySelector('.contact-subtitle');
    if (contactSubtitle) contactSubtitle.innerHTML = translations[lang].contactSubtitle;
    const form = document.getElementById('contactForm');
    if (form) {
      const labelName = form.querySelector('label[for="name"]');
      if (labelName) labelName.innerHTML = translations[lang].form[0];
      const inputName = form.querySelector('#name');
      if (inputName) inputName.placeholder = translations[lang].form[1];
      const labelEmail = form.querySelector('label[for="email"]');
      if (labelEmail) labelEmail.innerHTML = translations[lang].form[2];
      const inputEmail = form.querySelector('#email');
      if (inputEmail) inputEmail.placeholder = translations[lang].form[3];
      const labelMsg = form.querySelector('label[for="message"]');
      if (labelMsg) labelMsg.innerHTML = translations[lang].form[4];
      const inputMsg = form.querySelector('#message');
      if (inputMsg) inputMsg.placeholder = translations[lang].form[5];
      const sendBtn = form.querySelector('.send-btn');
      if (sendBtn) sendBtn.innerHTML = translations[lang].form[6];
    }
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
    // Update project descriptions
    // const project1Desc = document.querySelector('.project-card p');
    // if (project1Desc && !project1Desc.id) {
    //   project1Desc.textContent = translations[lang].project1[2];
    // }
    //
    // const project2Desc = document.querySelectorAll('.project-card p')[1];
    // if (project2Desc && !project2Desc.id) {
    //   project2Desc.textContent = translations[lang].project2[2];
    // }
    //
    // const project3Desc = document.getElementById('project3-desc');
    // if (project3Desc) {
    //   project3Desc.textContent = translations[lang].project3[2];
    // }
    
    // Update navigation logic for RTL languages
    updateNavigationLogic();
    
    // Also update button states immediately
    setTimeout(() => {
      updateButtonStates();
    }, 100);

    // --- Projects Navigation Arrow Logic ---
    function updateProjectNavArrow() {
      const navArrow = document.getElementById('projectNavArrow');
      const navArrowSvg = document.getElementById('projectNavArrowSvg');
      if (!navArrow || !navArrowSvg) return;
      const dir = document.body.getAttribute('dir') || 'ltr';
      // LTR
      if (dir === 'ltr') {
        if (currentSlide === 0) {
          // חץ ימין (→)
          navArrow.style.right = '5px';
          navArrow.style.left = 'auto';
          navArrowSvg.innerHTML = '<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
          navArrow.disabled = false;
          navArrow.onclick = () => showSlide(1);
        } else {
          // חץ שמאל (←)
          navArrow.style.left = '5px';
          navArrow.style.right = 'auto';
          navArrowSvg.innerHTML = '<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
          navArrow.disabled = false;
          navArrow.onclick = () => showSlide(0);
        }
      } else { // RTL
        if (currentSlide === 0) {
          // חץ שמאל (←)
          navArrow.style.left = '5px';
          navArrow.style.right = 'auto';
          navArrowSvg.innerHTML = '<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
          navArrow.disabled = false;
          navArrow.onclick = () => showSlide(1);
        } else {
          // חץ ימין (→)
          navArrow.style.right = '5px';
          navArrow.style.left = 'auto';
          navArrowSvg.innerHTML = '<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
          navArrow.disabled = false;
          navArrow.onclick = () => showSlide(0);
        }
      }
    }
    // קרא לפונקציה הזו בכל showSlide, setLanguage, ו-init ראשוני
    // ... existing code ...
    // הוסף בסוף showSlide()
    updateProjectNavArrow();
    // הוסף בסוף setLanguage()
    setTimeout(updateProjectNavArrow, 100);
    // הוסף בסוף initializeProjectNavigation()
    updateProjectNavArrow();
    // ... existing code ...
  }

  // Language switcher UI logic
  const langBtn = document.getElementById('langSwitcherBtn');
  const langDropdown = document.getElementById('langDropdown');
  
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', e => {
      e.stopPropagation();
      
      // Simple toggle logic
      if (langDropdown.style.display === 'flex') {
        langDropdown.style.display = 'none';
      } else {
        // Show dropdown
        langDropdown.style.display = 'flex';
        
        // Generate content only if not already generated
        if (!langDropdown.querySelector('.lang-option')) {
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
        }
        
        // Position dropdown based on current language direction
        const currentDir = document.body.getAttribute('dir') || 'ltr';
        const buttonRect = langBtn.getBoundingClientRect();
        const dropdownWidth = 260; // Approximate dropdown width
        const screenWidth = window.innerWidth;
        const isMobile = screenWidth <= 600;
        
        if (currentDir === 'rtl') {
          // For RTL languages, position dropdown from right to left
          if (isMobile) {
            // On mobile, always position from right edge
            langDropdown.style.left = 'auto';
            langDropdown.style.right = '0';
            langDropdown.style.maxWidth = 'calc(100vw - 20px)';
          } else {
            // On desktop, check if dropdown would go outside right edge
            const rightEdge = buttonRect.right;
            if (rightEdge + dropdownWidth > screenWidth) {
              // Position it to the left of the button
              langDropdown.style.left = 'auto';
              langDropdown.style.right = '0';
            } else {
              // Position it to the right of the button
              langDropdown.style.left = 'auto';
              langDropdown.style.right = '0';
            }
          }
        } else {
          // For LTR languages, position dropdown from left to right
          if (isMobile) {
            // On mobile, always position from left edge
            langDropdown.style.left = '0';
            langDropdown.style.right = 'auto';
            langDropdown.style.maxWidth = 'calc(100vw - 20px)';
          } else {
            // On desktop, check if dropdown would go outside left edge
            const leftEdge = buttonRect.left;
            if (leftEdge + dropdownWidth > screenWidth) {
              // Position it to the right of the button
              langDropdown.style.left = 'auto';
              langDropdown.style.right = '0';
            } else {
              // Position it to the left of the button (default)
              langDropdown.style.left = '0';
              langDropdown.style.right = 'auto';
            }
          }
        }
      }
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
  console.log('Loading saved language:', savedLang);
  
  // Function to set language with retry
  function setLanguageWithRetry(lang, retries = 3) {
    if (retries <= 0) {
      console.error('Failed to set language after retries');
      return;
    }
    
    try {
      setLanguage(lang);
      console.log('Language set to:', lang);
    } catch (error) {
      console.log('Retrying language set, attempts left:', retries - 1);
      setTimeout(() => setLanguageWithRetry(lang, retries - 1), 200);
    }
  }
  
  // Ensure DOM is fully loaded before setting language
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        setLanguageWithRetry(savedLang);
      }, 100);
    });
  } else {
    setTimeout(() => {
      setLanguageWithRetry(savedLang);
    }, 100);
  }

  // Global variables for project navigation
  let currentSlide = 0;
  const totalSlides = 2; // 2 slides: slide 0 (2 projects) and slide 1 (1 project)
  let navigationInitialized = false; // Flag to prevent multiple initializations

  // Function to show a specific slide
  function showSlide(slideIndex) {
    console.log('Showing slide:', slideIndex);
    const slides = document.querySelectorAll('.projects-slide');
    const dots = document.querySelectorAll('.dot');
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    // Show the target slide
    if (slides[slideIndex]) {
      slides[slideIndex].classList.add('active');
    }
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === slideIndex);
    });
    // Update current slide variable
    currentSlide = slideIndex;
    // Update button states
    updateButtonStates();
    console.log('Slide shown successfully. Current slide:', currentSlide);

    // --- Projects Navigation Arrow Logic ---
    function updateProjectNavArrow() {
      const navArrow = document.getElementById('projectNavArrow');
      const navArrowSvg = document.getElementById('projectNavArrowSvg');
      if (!navArrow || !navArrowSvg) return;
      const dir = document.body.getAttribute('dir') || 'ltr';
      // LTR
      if (dir === 'ltr') {
        if (currentSlide === 0) {
          // חץ ימין (→)
          navArrow.style.right = '5px';
          navArrow.style.left = 'auto';
          navArrowSvg.innerHTML = '<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
          navArrow.disabled = false;
          navArrow.onclick = () => showSlide(1);
        } else {
          // חץ שמאל (←)
          navArrow.style.left = '5px';
          navArrow.style.right = 'auto';
          navArrowSvg.innerHTML = '<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
          navArrow.disabled = false;
          navArrow.onclick = () => showSlide(0);
        }
      } else { // RTL
        if (currentSlide === 0) {
          // חץ שמאל (←)
          navArrow.style.left = '5px';
          navArrow.style.right = 'auto';
          navArrowSvg.innerHTML = '<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
          navArrow.disabled = false;
          navArrow.onclick = () => showSlide(1);
        } else {
          // חץ ימין (→)
          navArrow.style.right = '5px';
          navArrow.style.left = 'auto';
          navArrowSvg.innerHTML = '<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
          navArrow.disabled = false;
          navArrow.onclick = () => showSlide(0);
        }
      }
    }
    // קרא לפונקציה הזו בכל showSlide, setLanguage, ו-init ראשוני
    // ... existing code ...
    // הוסף בסוף showSlide()
    updateProjectNavArrow();
    // הוסף בסוף setLanguage()
    setTimeout(updateProjectNavArrow, 100);
    // הוסף בסוף initializeProjectNavigation()
    updateProjectNavArrow();
    // ... existing code ...
  }

  // Function to go to next slide
  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      showSlide(currentSlide + 1);
    }
  }

  // Function to go to previous slide
  function prevSlide() {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
  }

  // Projects Navigation System
  let globalClickHandler = null; // Store reference to global click handler
  
  // Initialize navigation when DOM is ready
  function initializeProjectNavigation() {
    console.log('Initializing project navigation...');
    setTimeout(() => {
      const prevBtn = document.getElementById('prevProject');
      const nextBtn = document.getElementById('nextProject');
      const dots = document.querySelectorAll('.dot');
      // Always show arrows
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
      // Remove old listeners by cloning
      if (prevBtn) {
        const newPrev = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        newPrev.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('Left arrow clicked!');
          const dir = document.body.getAttribute('dir') || 'ltr';
          if (dir === 'rtl') {
            if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1);
          } else {
            if (currentSlide > 0) showSlide(currentSlide - 1);
          }
        });
      }
      if (nextBtn) {
        const newNext = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);
        newNext.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('Right arrow clicked!');
          const dir = document.body.getAttribute('dir') || 'ltr';
          if (dir === 'rtl') {
            if (currentSlide > 0) showSlide(currentSlide - 1);
          } else {
            if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1);
          }
        });
      }
      // Initialize first slide only if no slide is currently active
      const activeSlide = document.querySelector('.projects-slide.active');
      if (!activeSlide) {
        showSlide(0);
      } else {
        // Update button states for current slide
        updateButtonStates();
      }
      navigationInitialized = true;
      console.log('Navigation initialization complete (restored version)');
    }, 500);
  }

  // Manual initialization function
  window.initializeProjectNavigation = initializeProjectNavigation;

  // Test function to check navigation elements
  window.testNavigation = function() {
    console.log('Testing navigation elements...');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.projects-slide');
    
    console.log('prevBtn exists:', !!prevBtn);
    console.log('nextBtn exists:', !!nextBtn);
    console.log('dots count:', dots.length);
    console.log('slides count:', slides.length);
    
    if (prevBtn) {
      console.log('prevBtn styles:', window.getComputedStyle(prevBtn));
      console.log('prevBtn position:', prevBtn.getBoundingClientRect());
      // Force make it visible
      prevBtn.style.display = 'flex';
      prevBtn.style.background = 'red';
      prevBtn.style.zIndex = '9999';
    }
    
    if (nextBtn) {
      console.log('nextBtn styles:', window.getComputedStyle(nextBtn));
      console.log('nextBtn position:', nextBtn.getBoundingClientRect());
      // Force make it visible
      nextBtn.style.display = 'flex';
      nextBtn.style.background = 'blue';
      nextBtn.style.zIndex = '9999';
    }
    
    // Try to click next button
    if (nextBtn) {
      console.log('Attempting to click next button...');
      nextBtn.click();
    }
  };

  // Initialize navigation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initializeProjectNavigation, 500);
    });
  } else {
    // DOM is already loaded
    setTimeout(initializeProjectNavigation, 500);
  }

  // Manual slide switching function
  window.manualNextSlide = function() {
    console.log('Manually triggering next slide...');
    nextSlide();
  };

  window.manualPrevSlide = function() {
    console.log('Manually triggering prev slide...');
    prevSlide();
  };

  // Initialize navigation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initializeProjectNavigation, 500);
    });
  } else {
    // DOM is already loaded
    setTimeout(initializeProjectNavigation, 500);
  }

  // Update button states based on current language and slide
  function updateButtonStates() {
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    const currentDir = document.body.getAttribute('dir') || 'ltr';
    
    if (prevBtn && nextBtn) {
      if (currentDir === 'rtl') {
        // In RTL: left arrow goes to next, right arrow goes to previous
        prevBtn.disabled = currentSlide === totalSlides - 1; // Left arrow disabled when on last slide
        nextBtn.disabled = currentSlide === 0; // Right arrow disabled when on first slide
      } else {
        // In LTR: left arrow goes to previous, right arrow goes to next
        prevBtn.disabled = currentSlide === 0; // Left arrow disabled when on first slide
        nextBtn.disabled = currentSlide === totalSlides - 1; // Right arrow disabled when on last slide
      }
      
      console.log('Button states updated for language change - RTL:', currentDir === 'rtl', 'Slide:', currentSlide);
      console.log('Left arrow disabled:', prevBtn.disabled);
      console.log('Right arrow disabled:', nextBtn.disabled);
    }
  }

  // Update navigation logic when language changes
  function updateNavigationLogic() {
    console.log('Updating navigation logic for language change...');
    const currentDir = document.body.getAttribute('dir') || 'ltr';
    console.log('Current direction:', currentDir);
    console.log('Current slide before language change:', currentSlide);
    
    // Store current slide to preserve it
    const preservedSlide = currentSlide;
    
    // Reset the flag to allow reinitialization
    navigationInitialized = false;
    
    // Update button states immediately
    updateButtonStates();
    
    // Re-initialize navigation completely but preserve current slide
    setTimeout(() => {
      // Temporarily set currentSlide to preserved value
      currentSlide = preservedSlide;
      initializeProjectNavigation();
      
      // After initialization, show the preserved slide
      setTimeout(() => {
        showSlide(preservedSlide);
        console.log('Restored to slide:', preservedSlide);
      }, 100);
    }, 200);
  }

  // Test RTL navigation
  window.testRTLNavigation = function() {
    console.log('=== RTL Navigation Test ===');
    const currentDir = document.body.getAttribute('dir') || 'ltr';
    console.log('Current direction:', currentDir);
    console.log('Current slide:', currentSlide);
    console.log('Total slides:', totalSlides);
    
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    
    console.log('Prev button exists:', !!prevBtn);
    console.log('Next button exists:', !!nextBtn);
    
    if (prevBtn) {
      console.log('Prev button disabled:', prevBtn.disabled);
      console.log('Prev button styles:', window.getComputedStyle(prevBtn));
    }
    
    if (nextBtn) {
      console.log('Next button disabled:', nextBtn.disabled);
      console.log('Next button styles:', window.getComputedStyle(nextBtn));
    }
    
    // Test clicking prev button
    if (prevBtn) {
      console.log('Testing prev button click...');
      prevBtn.click();
    }
    
    // Test clicking next button after a delay
    setTimeout(() => {
      if (nextBtn) {
        console.log('Testing next button click...');
        nextBtn.click();
      }
    }, 1000);
  };

  // Force navigation function
  window.forceNavigation = function(direction) {
    console.log('Force navigation:', direction);
    const currentDir = document.body.getAttribute('dir') || 'ltr';
    console.log('Current direction:', currentDir);
    console.log('Current slide:', currentSlide);
    
    if (direction === 'left') {
      if (currentDir === 'rtl') {
        console.log('RTL: Left arrow = Next slide');
        if (currentSlide < totalSlides - 1) {
          showSlide(currentSlide + 1);
        }
      } else {
        console.log('LTR: Left arrow = Previous slide');
        if (currentSlide > 0) {
          showSlide(currentSlide - 1);
        }
      }
    } else if (direction === 'right') {
      if (currentDir === 'rtl') {
        console.log('RTL: Right arrow = Previous slide');
        if (currentSlide > 0) {
          showSlide(currentSlide - 1);
        }
      } else {
        console.log('LTR: Right arrow = Next slide');
        if (currentSlide < totalSlides - 1) {
          showSlide(currentSlide + 1);
        }
      }
    }
  };

  // Reset navigation flag
  window.resetNavigationFlag = function() {
    navigationInitialized = false;
    console.log('Navigation flag reset');
  };

  // Check button states
  window.checkButtonStates = function() {
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    const currentDir = document.body.getAttribute('dir') || 'ltr';
    
    console.log('=== Button States Check ===');
    console.log('Current direction:', currentDir);
    console.log('Current slide:', currentSlide);
    console.log('Total slides:', totalSlides);
    
    if (prevBtn) {
      console.log('Left arrow (prevBtn):');
      console.log('  - Exists:', !!prevBtn);
      console.log('  - Disabled:', prevBtn.disabled);
      console.log('  - Visible:', window.getComputedStyle(prevBtn).display !== 'none');
      console.log('  - Opacity:', window.getComputedStyle(prevBtn).opacity);
    }
    
    if (nextBtn) {
      console.log('Right arrow (nextBtn):');
      console.log('  - Exists:', !!nextBtn);
      console.log('  - Disabled:', nextBtn.disabled);
      console.log('  - Visible:', window.getComputedStyle(nextBtn).display !== 'none');
      console.log('  - Opacity:', window.getComputedStyle(nextBtn).opacity);
    }
    
    // Expected states
    if (currentDir === 'rtl') {
      console.log('Expected RTL states:');
      console.log('  - Left arrow should be disabled when slide =', totalSlides - 1);
      console.log('  - Right arrow should be disabled when slide = 0');
    } else {
      console.log('Expected LTR states:');
      console.log('  - Left arrow should be disabled when slide = 0');
      console.log('  - Right arrow should be disabled when slide =', totalSlides - 1);
    }
  };

  // Check current slide state
  window.checkCurrentSlide = function() {
    const activeSlide = document.querySelector('.projects-slide.active');
    const activeDot = document.querySelector('.dot.active');
    
    console.log('=== Current Slide State ===');
    console.log('Current slide variable:', currentSlide);
    console.log('Active slide element:', activeSlide ? activeSlide.className : 'None');
    console.log('Active dot element:', activeDot ? activeDot.getAttribute('data-slide') : 'None');
    
    const slides = document.querySelectorAll('.projects-slide');
    slides.forEach((slide, index) => {
      console.log(`Slide ${index}:`, slide.classList.contains('active') ? 'ACTIVE' : 'inactive');
    });
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      console.log(`Dot ${index}:`, dot.classList.contains('active') ? 'ACTIVE' : 'inactive');
    });
  };

  // בדיקת לחיצת כפתור prevProject ב-RTL
  document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prevProject');
    if (prevBtn) {
      prevBtn.style.background = 'orange'; // צבע לבדיקה
      prevBtn.addEventListener('click', function() {
        alert('נלחץ חץ שמאלי!');
        console.log('נלחץ חץ שמאלי!');
      });
    }
  });

  setLanguage(currentLang);
  // בדיקה: האם האלמנט edu1-degree קיים ומה התוכן שלו
  const edu1DegreeTest = document.getElementById('edu1-degree');
  if (edu1DegreeTest) {
    console.log('edu1-degree נמצא! התוכן:', edu1DegreeTest.innerHTML);
  } else {
    console.warn('edu1-degree לא נמצא בדף!');
  }

  // Footer links hover effects
  document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to footer links
    const footerLinks = document.querySelectorAll('.footer-copy a[href*=".html"]');
    
    footerLinks.forEach(link => {
      // Add hover effects
      link.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(110, 193, 228, 0.1)';
        this.style.borderColor = '#6ec1e4';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 8px rgba(110, 193, 228, 0.2)';
      });
      
      link.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.borderColor = 'transparent';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
      
      link.addEventListener('focus', function() {
        this.style.outline = '2px solid #6ec1e4';
        this.style.outlineOffset = '2px';
      });
      
      link.addEventListener('blur', function() {
        this.style.outline = 'none';
      });
      
      // Debug: log to console to make sure links are found
      console.log('Found footer link:', link.href);
    });
    
    // Also add a simple test to make sure the links are visible
    setTimeout(() => {
      const testLinks = document.querySelectorAll('.footer-copy a[href*=".html"]');
      console.log('Total footer links found:', testLinks.length);
      testLinks.forEach((link, index) => {
        console.log(`Link ${index + 1}:`, link.textContent, link.href);
      });
    }, 1000);
  });
}); 

window.onload = function() { window.scrollTo(0, 0); }; 