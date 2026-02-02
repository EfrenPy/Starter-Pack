export function initScrollTop() {
  const lang = document.documentElement.lang || 'en';
  const label = lang === 'es' ? 'Volver arriba' : 'Back to top';

  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', label);
  btn.hidden = true;
  btn.textContent = '\u2191';
  document.body.appendChild(btn);

  const navbar = document.getElementById('navbar-placeholder');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Print button handler (replaces inline onclick)
  const printBar = document.querySelector('.print-bar');
  if (printBar) {
    printBar.addEventListener('click', (e) => {
      if (e.target.closest('button')) window.print();
    });
  }
}
