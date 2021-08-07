var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
    './',
    './images',
    './manifest.json'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
  );
});
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function (event) {
    console.log(event.request);
    event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
});