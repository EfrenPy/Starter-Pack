const navbarTranslations = {
    es: {
      menu_button: "☰ Menú",
      nav_home: "Inicio",
      nav_legal: "Ayuda Legal y Fiscal",
      nav_tech: "Ayuda Técnica para Herramientas del CERN"
    },
    en: {
      menu_button: "☰ Menu",
      nav_home: "Home",
      nav_legal: "Legal and Tax Help",
      nav_tech: "Tech Help for CERN Tools"
    }
  };
  
  function updateNavbarLanguage(lang) {
    const navbarEls = document.querySelectorAll("[data-i18n]");
    navbarEls.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (navbarTranslations[lang] && navbarTranslations[lang][key]) {
        el.textContent = navbarTranslations[lang][key];
      }
    });
  }
  
  document.querySelectorAll(".language-switch").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      updateNavbarLanguage(lang);
    });
  });
  