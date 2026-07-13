export function initNavbar() {
  const toggleButton = document.getElementById('menu-toggle');
  const menu = document.getElementById('topnav-menu') || document.getElementById('menu');

  if (!toggleButton || !menu) return;

  toggleButton.setAttribute('aria-expanded', 'false');

  function closeMobileMenu() {
    menu.classList.remove('show');
    toggleButton.setAttribute('aria-expanded', 'false');
  }

  toggleButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('show');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      // Move focus into the menu for keyboard users
      menu.querySelector('a, button')?.focus();
    }
  });

  // Language dropdown
  const langBtn = document.querySelector('.topnav__lang-btn');
  const langMenu = document.querySelector('.topnav__lang-menu');

  function closeLangMenu() {
    if (langMenu && langMenu.classList.contains('open')) {
      langMenu.classList.remove('open');
      langMenu.style.display = 'none';
      langBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (langBtn && langMenu) {
    const langLinks = () => Array.from(langMenu.querySelectorAll('a'));

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langMenu.classList.toggle('open');
      langMenu.style.display = isOpen ? 'block' : 'none';
      langBtn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) langLinks()[0]?.focus();
    });

    // Roving arrow-key navigation within the language menu
    langMenu.addEventListener('keydown', (e) => {
      const links = langLinks();
      const idx = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        links[(idx + 1) % links.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        links[(idx - 1 + links.length) % links.length]?.focus();
      }
    });

    // Save language preference on link click
    langMenu.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        const match = link.getAttribute('href').match(/^\/(\w{2})\//);
        if (match) try { localStorage.setItem('language', match[1]); } catch { /* storage unavailable */ }
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggleButton.contains(e.target)) {
      closeMobileMenu();
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
        closeMobileMenu();
        toggleButton.focus();
      }
      if (langMenu && langMenu.classList.contains('open')) {
        closeLangMenu();
        langBtn.focus();
      }
    }
  });

  // Navbar scroll effect
  const nav = document.querySelector('.topnav');
  if (nav) {
    const updateNavScroll = () => {
      if (window.scrollY > 20) {
        nav.classList.remove('topnav--at-top');
        nav.classList.add('topnav--scrolled');
      } else {
        nav.classList.add('topnav--at-top');
        nav.classList.remove('topnav--scrolled');
      }
    };
    updateNavScroll();
    window.addEventListener('scroll', updateNavScroll, { passive: true });
  }
}
