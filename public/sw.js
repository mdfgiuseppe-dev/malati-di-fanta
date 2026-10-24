const CACHE_NAME = 'malati-di-fanta-' + Math.random() + '-v4';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(names.map(name => caches.delete(name)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .catch(() => caches.match('/index.html'))
  );
});
