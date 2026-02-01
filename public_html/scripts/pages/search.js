import { injectAll } from '../modules/inject.js';
import { initNavbar } from '../modules/navbar.js';
import { initI18n } from '../modules/i18n.js';
import { initSearch } from '../modules/search.js';
import { navbarTranslations } from '../modules/translations/navbar.js';
import { footerTranslations } from '../modules/translations/footer.js';

async function init() {
  await injectAll();
  initNavbar();
  initI18n(navbarTranslations, footerTranslations);
  await initSearch();
}

document.addEventListener('DOMContentLoaded', init);
