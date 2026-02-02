export function initNavbar() {
  const toggleButton = document.getElementById('menu-toggle');
  const menu = document.getElementById('topnav-menu') || document.getElementById('menu');

  if (!toggleButton || !menu) return;

  toggleButton.setAttribute('aria-expanded', 'false');

  toggleButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('show');
    menu.classList.toggle('hidden', !isOpen);
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggleButton.contains(e.target)) {
      menu.classList.remove('show');
      menu.classList.add('hidden');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Highlight the active nav link based on current URL
  highlightActiveLink();

  // Highlight the current language button
  highlightActiveLanguage();

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('show')) {
      menu.classList.remove('show');
      menu.classList.add('hidden');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
}

function highlightActiveLanguage() {
  const lang = document.documentElement.lang || 'en';
  const buttons = document.querySelectorAll('.topnav__lang button.language-switch');
  buttons.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

function highlightActiveLink() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.topnav__links a');

  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    // Match exact path or if current page starts with the hub path
    const isActive =
      (href === '/' && (path === '/' || path.endsWith('/index.html'))) ||
      (href !== '/' && path.includes(href.replace(/^\//, '').replace(/\.html$/, '')));

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    }
  });
}
