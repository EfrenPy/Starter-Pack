// i18n.js
window.i18nContent = {
  en: {
    title: "Guide for Spanish Nationals Starting Work at CERN",
    header: "Guide for Spanish Nationals Starting Work at CERN (Social Security & Taxation)",
    legalNotice: "This guide provides informal advice and is not a legally binding document. Please consult with official sources for formal requirements.",
    intro: "This guide helps Spanish nationals preparing to work at CERN navigate the administrative procedures involving social security, health insurance, and taxation.",
    "beforeMove.title": "Before Moving to Switzerland",
    "beforeMove.description": "Things to do in Spain before relocating:",
    "beforeMove.registerConsulate": "Register at the Spanish Consulate in Geneva.",
    "beforeMove.convenioEspecialIntro": "Consider subscribing to the ‘Convenio Especial’ with Social Security for coverage during your CERN employment.",
    "beforeMove.coverage": "Provides continued access to the Spanish public health system.",
    "beforeMove.cost": "Costs approximately €60–€160 per month depending on contributions.",
    "beforeMove.signup": "To subscribe, prepare:",
    "beforeMove.dni": "Copy of your DNI or NIE.",
    "beforeMove.proofResidence": "Proof of your Spanish residence.",
    "beforeMove.proofEmployment": "Employment confirmation from CERN.",
    "beforeMove.socialSecurityNum": "Spanish Social Security number.",
    "beforeMove.effect": "Takes effect the month after approval.",
    "beforeMove.notSigning": "If not signed, you may lose entitlements in Spain.",
    "beforeMove.shortVsLong": "Better suited for short-term contracts at CERN.",
    "whenInSwitzerland.title": "When in Switzerland",
    "whenInSwitzerland.residencePermit": "You don’t need a Swiss residence permit as a CERN staff member.",
    "whenInSwitzerland.localTaxes": "You are exempt from Swiss taxes if paid directly by CERN.",
    "whenInSwitzerland.insurance": "You must be covered by CHIS (CERN’s health insurance).",
    "taxation.title": "Taxation Matters",
    "taxation.taxResidence": "Declare yourself as non-tax resident in Spain if applicable.",
    "taxation.mutualAgreement": "Spain and Switzerland have a tax agreement to avoid double taxation.",
    "taxation.localExemptions": "Income paid by CERN is exempt from national taxes but not local taxes in some cases.",
    "taxation.consultation": "Consult a tax advisor for your specific situation.",
    "returningToSpain.title": "Returning to Spain",
    "returningToSpain.unemployment": "CERN time does not count toward Spanish unemployment benefits unless you subscribed to the Convenio Especial.",
    "returningToSpain.movingBack": "Notify the Social Security office and re-register for benefits.",
    "contacts.title": "Useful Contacts",
    "contacts.cernContact": "CERN HR department – for employment matters.",
    "contacts.socialSecurity": "Social Security office in Spain – for Convenio Especial inquiries.",
    "contacts.taxAdvisor": "A tax advisor – for personal taxation analysis.",
    "contacts.consulate": "Spanish Consulate in Geneva – for administrative registration."
  },
  es: {
    title: "Guide for Spanish Nationals Starting Work at CERN",
    header: "Guide for Spanish Nationals Starting Work at CERN (Social Security & Taxation)",
    legalNotice: "This guide provides informal advice and is not a legally binding document. Please consult with official sources for formal requirements.",
    intro: "This guide helps Spanish nationals preparing to work at CERN navigate the administrative procedures involving social security, health insurance, and taxation.",
    "beforeMove.title": "Before Moving to Switzerland",
    "beforeMove.description": "Things to do in Spain before relocating:",
    "beforeMove.registerConsulate": "Register at the Spanish Consulate in Geneva.",
    "beforeMove.convenioEspecialIntro": "Consider subscribing to the ‘Convenio Especial’ with Social Security for coverage during your CERN employment.",
    "beforeMove.coverage": "Provides continued access to the Spanish public health system.",
    "beforeMove.cost": "Costs approximately €60–€160 per month depending on contributions.",
    "beforeMove.signup": "To subscribe, prepare:",
    "beforeMove.dni": "Copy of your DNI or NIE.",
    "beforeMove.proofResidence": "Proof of your Spanish residence.",
    "beforeMove.proofEmployment": "Employment confirmation from CERN.",
    "beforeMove.socialSecurityNum": "Spanish Social Security number.",
    "beforeMove.effect": "Takes effect the month after approval.",
    "beforeMove.notSigning": "If not signed, you may lose entitlements in Spain.",
    "beforeMove.shortVsLong": "Better suited for short-term contracts at CERN.",
    "whenInSwitzerland.title": "When in Switzerland",
    "whenInSwitzerland.residencePermit": "You don’t need a Swiss residence permit as a CERN staff member.",
    "whenInSwitzerland.localTaxes": "You are exempt from Swiss taxes if paid directly by CERN.",
    "whenInSwitzerland.insurance": "You must be covered by CHIS (CERN’s health insurance).",
    "taxation.title": "Taxation Matters",
    "taxation.taxResidence": "Declare yourself as non-tax resident in Spain if applicable.",
    "taxation.mutualAgreement": "Spain and Switzerland have a tax agreement to avoid double taxation.",
    "taxation.localExemptions": "Income paid by CERN is exempt from national taxes but not local taxes in some cases.",
    "taxation.consultation": "Consult a tax advisor for your specific situation.",
    "returningToSpain.title": "Returning to Spain",
    "returningToSpain.unemployment": "CERN time does not count toward Spanish unemployment benefits unless you subscribed to the Convenio Especial.",
    "returningToSpain.movingBack": "Notify the Social Security office and re-register for benefits.",
    "contacts.title": "Useful Contacts",
    "contacts.cernContact": "CERN HR department – for employment matters.",
    "contacts.socialSecurity": "Social Security office in Spain – for Convenio Especial inquiries.",
    "contacts.taxAdvisor": "A tax advisor – for personal taxation analysis.",
    "contacts.consulate": "Spanish Consulate in Geneva – for administrative registration."
  },

};

  function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const keys = el.getAttribute('data-i18n').split('.');
      let translation = translations[lang];
      for (let key of keys) {
        translation = translation?.[key];
      }
      if (translation) {
        el.textContent = translation;
      }
    });
    localStorage.setItem('language', lang);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const defaultLang = localStorage.getItem('language') || 'en';
    setLanguage(defaultLang);
  });
  