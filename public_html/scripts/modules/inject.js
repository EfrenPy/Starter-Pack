import { fetchHTML } from './fetcher.js';

export async function injectComponent(id, file) {
  const html = await fetchHTML('/components/' + file);
  const el = document.getElementById(id);
  if (el && html) {
    el.innerHTML = html;
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
