import { injectAll } from '../modules/inject.js';
import { initNavbar } from '../modules/navbar.js';
import { initI18n } from '../modules/i18n.js';
import { initTheme } from '../modules/theme.js';
import { initScrollTop } from '../modules/scroll-top.js';
import { initScrollAnimations } from '../modules/scroll-animations.js';
import { navbarTranslations } from '../modules/translations/navbar.js';
import { footerTranslations } from '../modules/translations/footer.js';
import { registerServiceWorker } from '../modules/sw-register.js';

const notFoundTranslations = {
  es: {
    '404_page_title': 'Pagina no encontrada - CERN Starter Pack',
    '404_heading': 'Pagina no encontrada',
    '404_message': 'Lo sentimos, la pagina que buscas no existe o ha sido movida.',
    '404_search_title': 'Buscar en el sitio',
    '404_home_title': 'Inicio',
    '404_home_desc': 'Volver a la pagina principal.',
    '404_legal_desc': 'Guias legales y fiscales.',
    '404_tech_desc': 'Tutoriales y herramientas tecnicas.',
    search_placeholder: 'Buscar articulos...',
    search_button: 'Buscar',
    search_action: '/es/search.html',
  },
  en: {
    '404_page_title': 'Page not found - CERN Starter Pack',
    '404_heading': 'Page not found',
    '404_message': 'Sorry, the page you are looking for does not exist or has been moved.',
    '404_search_title': 'Search the site',
    '404_home_title': 'Home',
    '404_home_desc': 'Go back to the home page.',
    '404_legal_desc': 'Legal and tax guides.',
    '404_tech_desc': 'Tutorials and technical tools.',
    search_placeholder: 'Search articles...',
    search_button: 'Search',
    search_action: '/en/search.html',
  },
};

async function init() {
  try {
    await injectAll();
    initNavbar();
    initTheme();
    initI18n(navbarTranslations, footerTranslations, notFoundTranslations);
    initScrollTop();
    initScrollAnimations();
    registerServiceWorker();
  } catch (err) {
    console.error('init failed:', err);
  }
}

document.addEventListener('DOMContentLoaded', init);
