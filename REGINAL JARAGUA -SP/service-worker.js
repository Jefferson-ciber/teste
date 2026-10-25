const CACHE_NAME = 'regional-jaragua-pwa-v1';
const APP_ROOT = self.registration.scope;
const APP_FILES = [
  APP_ROOT,
  new URL('index.html', APP_ROOT).href,
  new URL('manifest.webmanifest', APP_ROOT).href,
  new URL('assets/css/styles.css', APP_ROOT).href,
  new URL('assets/js/app.js', APP_ROOT).href,
  new URL('assets/images/icon-192.png', APP_ROOT).href,
  new URL('assets/images/icon-512.png', APP_ROOT).href,
  new URL('assets/images/apple-touch-icon.png', APP_ROOT).href,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('regional-jaragua-pwa-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(APP_ROOT)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch {
      const cached = await cache.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') {
        return (await cache.match(new URL('index.html', APP_ROOT).href)) || (await cache.match(APP_ROOT));
      }
      return Response.error();
    }
  })());
});