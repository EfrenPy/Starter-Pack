export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  // Whether a service worker already controls this page at load time. A later
  // controllerchange then means a *new* version has taken over (a deploy), so we
  // reload once to pick up the latest HTML/assets. First-time visitors start
  // uncontrolled, so they are skipped (no initial-load reload), and the `reloaded`
  // guard prevents any reload loop.
  const wasControlled = !!navigator.serviceWorker.controller;
  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloaded || !wasControlled) return;
    reloaded = true;
    window.location.reload();
  });

  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
