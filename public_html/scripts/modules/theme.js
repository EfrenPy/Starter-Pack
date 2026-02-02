export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  updateToggleLabel(toggle);

  toggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleLabel(toggle);
  });
}

function updateToggleLabel(toggle) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const lang = window.location.pathname.includes('/es/') ? 'es' : 'en';

  if (lang === 'es') {
    toggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  } else {
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}
