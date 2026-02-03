import { initNavbar } from './modules/navbar.js';
import { initTheme } from './modules/theme.js';
import { initScrollTop } from './modules/scroll-top.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initReadingProgress } from './modules/reading-progress.js';
import { initReadingTime } from './modules/reading-time.js';
import { initToc } from './modules/toc.js';
import { registerServiceWorker } from './modules/sw-register.js';

function init() {
  initNavbar();
  initTheme();
  initScrollTop();
  initScrollAnimations();

  // Only init article features on content pages (pages with an h1 inside main)
  const main = document.querySelector('main');
  const h1 = main?.querySelector('h1');
  if (h1 && !document.querySelector('.hero')) {
    initReadingProgress();
    initReadingTime();
    initToc();
  }

  registerServiceWorker();
}

document.addEventListener('DOMContentLoaded', init);
