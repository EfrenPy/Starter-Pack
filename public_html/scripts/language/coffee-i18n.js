const coffeeTranslations = {
    es: {
      coffee_support: "☕ <strong>Si encontraste útil esta información, ¡considera comprarme un café!</strong>",
      contact_heading: "Contacto",
      contact_text: "¿Tienes dudas, sugerencias o comentarios? Puedes escribirme directamente por correo:",
      footer_note: "Este es un sitio personal, no oficial del CERN."
    },
    en: {
      coffee_support: "☕ <strong>If you found this helpful, consider buying me a coffee!</strong>",
      contact_heading: "Contact",
      contact_text: "Got questions, suggestions, or feedback? Feel free to email me:",
      footer_note: "This is a personal site, not officially affiliated with CERN."
    }
  };
  
  function updateCoffeeLanguage(lang) {
    const coffeeEls = document.querySelectorAll("[data-i18n]");
    coffeeEls.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (coffeeTranslations[lang] && coffeeTranslations[lang][key]) {
        el.innerHTML = coffeeTranslations[lang][key];
      }
    });
  }
  
  // Optional: hook into global language switch
  document.querySelectorAll(".language-switch").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      updateCoffeeLanguage(lang);
    });
  });
  