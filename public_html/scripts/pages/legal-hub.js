import { injectAll } from '../modules/inject.js';
import { initNavbar } from '../modules/navbar.js';
import { initI18n } from '../modules/i18n.js';
import { initTheme } from '../modules/theme.js';
import { initScrollTop } from '../modules/scroll-top.js';
import { initReadingProgress } from '../modules/reading-progress.js';
import { initScrollAnimations } from '../modules/scroll-animations.js';
import { navbarTranslations } from '../modules/translations/navbar.js';
import { legalHubTranslations } from '../modules/translations/legal-hub.js';
import { footerTranslations } from '../modules/translations/footer.js';

async function init() {
  try {
    await injectAll();
    initNavbar();
    initTheme();
    initI18n(navbarTranslations, legalHubTranslations, footerTranslations);
    initScrollTop();
    initReadingProgress();
    initScrollAnimations();
  } catch (err) {
    console.error('init failed:', err);
  }
}

document.addEventListener('DOMContentLoaded', init);
