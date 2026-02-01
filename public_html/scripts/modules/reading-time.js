export function initReadingTime() {
  const main = document.querySelector('main');
  const h1 = main?.querySelector('h1');
  if (!main || !h1) return;

  const text = main.textContent || '';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));

  const isSpanish = window.location.pathname.includes('/es/');
  const label = isSpanish ? `${minutes} min de lectura` : `${minutes} min read`;

  const badge = document.createElement('span');
  badge.className = 'reading-time';
  badge.textContent = label;
  h1.after(badge);
}
