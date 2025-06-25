
self.addEventListener("install", function (event) {
  console.log("✅ Service Worker instalado.");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("✅ Service Worker ativado.");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cache => caches.delete(cache)));
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(fetch(event.request));
});
