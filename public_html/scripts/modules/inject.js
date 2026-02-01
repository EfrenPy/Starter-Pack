import { fetchHTML } from './fetcher.js';

/**
 * Resolve the base path for component files (navbar.html, footer.html).
 * Components live in the language folder root (/, /en/, /es/), so for
 * deeper pages like /en/technical/vscode-remote.html we need to go up.
 */
function getBasePath() {
  const path = window.location.pathname;
  // Match /en/ or /es/ at the start
  const match = path.match(/^(\/(?:en|es)\/)/);
  if (match) return match[1]; // e.g. "/en/"
  return '/'; // root pages
}

export async function injectComponent(id, file) {
  const base = getBasePath();
  const html = await fetchHTML(base + file);
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
