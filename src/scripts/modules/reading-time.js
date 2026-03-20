export function initReadingTime() {
  const main = document.querySelector('main');
  const h1 = main?.querySelector('h1');
  if (!main || !h1) return;

  const text = main.textContent || '';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));

  const pathMatch = window.location.pathname.match(/^\/(es|en|it|fr)\//);
  const lang = pathMatch ? pathMatch[1] : 'en';
  const labels = {
    es: `${minutes} min de lectura`,
    en: `${minutes} min read`,
    it: `${minutes} min di lettura`,
    fr: `${minutes} min de lecture`
  };
  const label = labels[lang] || labels.en;

  const badge = document.createElement('span');
  badge.className = 'reading-time';
  badge.textContent = label;
  h1.after(badge);
}
