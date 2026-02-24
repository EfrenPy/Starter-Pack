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

  // Language dropdown
  const langBtn = document.querySelector('.topnav__lang-btn');
  const langMenu = document.querySelector('.topnav__lang-menu');

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langMenu.classList.toggle('open');
      langMenu.style.display = isOpen ? 'block' : 'none';
      langBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Save language preference on link click
    langMenu.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        const match = link.getAttribute('href').match(/^\/(\w{2})\//);
        if (match) localStorage.setItem('language', match[1]);
      }
    });
  }

  function closeLangMenu() {
    if (langMenu && langMenu.classList.contains('open')) {
      langMenu.classList.remove('open');
      langMenu.style.display = 'none';
      langBtn.setAttribute('aria-expanded', 'false');
    }
  }

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggleButton.contains(e.target)) {
      menu.classList.remove('show');
      menu.classList.add('hidden');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
    // Close language dropdown on click outside
    if (langBtn && !langBtn.contains(e.target) && langMenu && !langMenu.contains(e.target)) {
      closeLangMenu();
    }
  });

  // Close mobile menu and language dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        menu.classList.add('hidden');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
      closeLangMenu();
    }
  });
}
