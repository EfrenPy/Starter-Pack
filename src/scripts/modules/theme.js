export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const cycle = ['system', 'light', 'dark'];

  updateToggleLabel(toggle);

  toggle.addEventListener('click', () => {
    const current = localStorage.getItem('theme') || 'system';
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];
    localStorage.setItem('theme', next);

    if (next === 'system') {
      const resolved = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', resolved);
    } else {
      document.documentElement.setAttribute('data-theme', next);
    }

    updateToggleLabel(toggle);
  });

  matchMedia('(prefers-color-scheme:dark)').addEventListener('change', (e) => {
    if ((localStorage.getItem('theme') || 'system') === 'system') {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      updateToggleLabel(toggle);
    }
  });
}

function updateToggleLabel(toggle) {
  const mode = localStorage.getItem('theme') || 'system';
  const lang = document.documentElement.lang || 'en';
  const icon = toggle.querySelector('.theme-toggle__icon');

  const labels = {
    en: { light: 'Switch to dark mode', dark: 'Switch to system mode', system: 'Switch to light mode' },
    es: { light: 'Cambiar a modo oscuro', dark: 'Cambiar a modo sistema', system: 'Cambiar a modo claro' },
    it: { light: 'Passa a modalità scura', dark: 'Passa a modalità sistema', system: 'Passa a modalità chiara' },
    fr: { light: 'Passer en mode sombre', dark: 'Passer en mode système', system: 'Passer en mode clair' }
  };

  const l = labels[lang] || labels.en;
  toggle.setAttribute('aria-label', l[mode]);
  if (icon) icon.setAttribute('data-mode', mode);
}
