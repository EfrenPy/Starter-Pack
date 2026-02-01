import { injectAll } from '../modules/inject.js';
import { initNavbar } from '../modules/navbar.js';
import { initI18n } from '../modules/i18n.js';
import { initTheme } from '../modules/theme.js';
import { initScrollTop } from '../modules/scroll-top.js';
import { initScrollAnimations } from '../modules/scroll-animations.js';
import { initCostCalculator } from '../modules/cost-calculator.js';
import { navbarTranslations } from '../modules/translations/navbar.js';
import { footerTranslations } from '../modules/translations/footer.js';
import { costCalculatorTranslations } from '../modules/translations/cost-calculator.js';

async function init() {
  try {
    await injectAll();
    initNavbar();
    initTheme();
    initI18n(navbarTranslations, footerTranslations, costCalculatorTranslations);
    initScrollTop();
    initScrollAnimations();
    initCostCalculator();
  } catch (err) {
    console.error('init failed:', err);
  }
}

document.addEventListener('DOMContentLoaded', init);
