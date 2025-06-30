const indexTranslations = {
    es: {
      page_title: "Bienvenido al Starter Pack",
      main_heading: "Bienvenido al Starter Pack",
      intro_text: "¡Hola! Bienvenido al Starter Pack. Este sitio está diseñado para ayudar a los recién llegados y a las personas que trabajan en el CERN, ya sea desde España u otros países. Aquí encontrarás información útil y recursos en dos áreas principales:",
      menu_legal: "Ayuda Legal y Fiscal",
      menu_tech: "Ayuda Técnica para Herramientas del CERN",
      search_intro: "Para comenzar, puedes utilizar la barra de búsqueda a continuación para encontrar artículos relevantes sobre temas legales y fiscales, o cualquier otra consulta relacionada con tu trabajo en el CERN.",
      search_heading: "🔎 Búsqueda de Artículos",
      search_description: "Introduce tu consulta en el campo de búsqueda para encontrar artículos relevantes.",
      search_placeholder: "Buscar artículos...",
      search_button: "Buscar",
    },
    en: {
      page_title: "Welcome to the Starter Pack",
      main_heading: "Welcome to the Starter Pack",
      intro_text: "Hello! Welcome to the Starter Pack. This site is designed to help newcomers and people working at CERN, whether from Spain or other countries. Here you will find useful information and resources in two main areas:",
      menu_legal: "Legal and Tax Help",
      menu_tech: "Technical Help for CERN Tools",
      search_intro: "To get started, use the search bar below to find relevant articles on legal and tax topics, or any other queries related to your work at CERN.",
      search_heading: "🔎 Search Articles",
      search_description: "Enter your query in the search field to find relevant articles.",
      search_placeholder: "Search articles...",
      search_button: "Search",
    }
  };
  
  function updateIndexLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (indexTranslations[lang] && indexTranslations[lang][key]) {
        el.textContent = indexTranslations[lang][key];
      }
    });
  
    const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (indexTranslations[lang] && indexTranslations[lang][key]) {
        el.placeholder = indexTranslations[lang][key];
      }
    });
  
    // Update <title>
    const titleEl = document.querySelector("title[data-i18n]");
    if (titleEl && indexTranslations[lang].page_title) {
      titleEl.textContent = indexTranslations[lang].page_title;
    }
  }
  
  // Bind to global switcher
  document.querySelectorAll(".language-switch").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      updateIndexLanguage(lang);
    });
  });
  