import { injectAll } from '../modules/inject.js';
import { initNavbar } from '../modules/navbar.js';
import { initI18n } from '../modules/i18n.js';
import { initTheme } from '../modules/theme.js';
import { initScrollTop } from '../modules/scroll-top.js';
import { initScrollAnimations } from '../modules/scroll-animations.js';
import { initLiveSearch } from '../modules/live-search.js';
import { navbarTranslations } from '../modules/translations/navbar.js';
import { indexTranslations } from '../modules/translations/index.js';
import { footerTranslations } from '../modules/translations/footer.js';
import { registerServiceWorker } from '../modules/sw-register.js';

async function init() {
  try {
    await injectAll();
    initNavbar();
    initTheme();
    initI18n(navbarTranslations, indexTranslations, footerTranslations);
    initScrollTop();
    initScrollAnimations();
    initLiveSearch();
    registerServiceWorker();
  } catch (err) {
    console.error('init failed:', err);
  }
}

document.addEventListener('DOMContentLoaded', init);
