export function initScrollTop() {
  const lang = document.documentElement.lang || 'en';
  const labels = {
    es: 'Volver arriba',
    en: 'Back to top',
    it: 'Torna su',
    fr: 'Retour en haut'
  };
  const label = labels[lang] || labels.en;

  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', label);
  btn.hidden = true;
  btn.textContent = '\u2191';
  document.body.appendChild(btn);

  const navbar = document.querySelector('.topnav');
  if (navbar && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        btn.hidden = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(navbar);
  }

  btn.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  });

  // Print button handler (replaces inline onclick)
  const printBar = document.querySelector('.print-bar');
  if (printBar) {
    printBar.addEventListener('click', (e) => {
      if (e.target.closest('button')) window.print();
    });
  }
}
