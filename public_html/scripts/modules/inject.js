import { fetchHTML } from './fetcher.js';

export async function injectComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const html = await fetchHTML('/components/' + file);
  if (html) {
    el.innerHTML = html;
    el.classList.remove('component-loading');
    el.classList.add('component-loaded');
  } else {
    el.classList.remove('component-loading');
    el.innerHTML = '<div class="component-error"><a href="/">Home</a></div>';
  }
}

export async function injectAll() {
  // Try footer-placeholder first, fall back to coffee-placeholder for backward compat
  const footerEl = document.getElementById('footer-placeholder') || document.getElementById('coffee-placeholder');
  const footerId = footerEl ? footerEl.id : 'footer-placeholder';

  await Promise.all([
    injectComponent('navbar-placeholder', 'navbar.html'),
    injectComponent(footerId, 'footer.html'),
  ]);
}
