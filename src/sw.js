const CACHE_NAME = 'cern-starter-pack-v6';
const OFFLINE_URL = '/offline.html';
const PRECACHE_URLS = [
  '/',
  OFFLINE_URL,
  '/site.webmanifest',
  '/images/favicon-32x32.png',
  '/images/favicon-16x16.png',
  '/images/apple-touch-icon.png',
  '/images/android-chrome-192x192.png',
  '/images/android-chrome-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests for same-origin
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;

  // Skip external resources (fonts, analytics, etc.)
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first for HTML pages (always try to get fresh content)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL)))
    );
    return;
  }

  // Stale-while-revalidate for all non-HTML assets (CSS, JS, images, data)
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      });
      return cached || fetchPromise;
    })
  );
});
