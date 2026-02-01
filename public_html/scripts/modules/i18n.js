export function applyTranslations(lang, translations) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    // Try flat key first, then nested lookup
    let value = t[key];
    if (value === undefined && key.includes('.')) {
      value = t;
      for (const k of key.split('.')) {
        value = value?.[k];
      }
    }
    if (value !== undefined && value !== null) {
      // Use innerHTML for keys that contain HTML (e.g. coffee_support with <strong>)
      if (typeof value === 'string' && value.includes('<')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    }
  });

  // Update href attributes (links/forms that change per language)
  document.querySelectorAll('[data-i18n-href]').forEach((el) => {
    const key = el.getAttribute('data-i18n-href');
    if (t[key]) {
      el.setAttribute('href', t[key]);
    }
  });
  document.querySelectorAll('[data-i18n-action]').forEach((el) => {
    const key = el.getAttribute('data-i18n-action');
    if (t[key]) {
      el.setAttribute('action', t[key]);
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  // Update page title
  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-i18n');
    let value = t[key];
    if (value === undefined && key.includes('.')) {
      value = t;
      for (const k of key.split('.')) {
        value = value?.[k];
      }
    }
    if (value) {
      titleEl.textContent = value;
    }
  }

  localStorage.setItem('language', lang);
}

export function initI18n(...translationSets) {
  // Merge all translation sets into one
  const merged = { es: {}, en: {} };
  for (const set of translationSets) {
    for (const lang of ['es', 'en']) {
      if (set[lang]) {
        Object.assign(merged[lang], set[lang]);
      }
    }
  }

  // Apply saved or default language
  const savedLang = localStorage.getItem('language') || 'es';
  applyTranslations(savedLang, merged);

  // Delegate language switch clicks
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.language-switch');
    if (btn) {
      const lang = btn.getAttribute('data-lang');
      if (!lang) return;

      // If we're on a language-specific page (/en/ or /es/), navigate to the equivalent page
      const path = window.location.pathname;
      const match = path.match(/^\/(en|es)\/(.*)/);
      if (match) {
        const currentLang = match[1];
        if (currentLang === lang) return; // Already on this language
        const rest = match[2];
        localStorage.setItem('language', lang);
        window.location.href = '/' + lang + '/' + rest;
        return;
      }

      // Root pages: just apply translations in place
      applyTranslations(lang, merged);
    }
  });
}
