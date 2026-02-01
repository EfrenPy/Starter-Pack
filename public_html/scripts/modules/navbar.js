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
}
