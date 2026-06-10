// ELIO — Service Worker v5 (The Chimera)
// "Even in the dark, I'm here."

var CACHE_NAME = 'elio-chimera-v5';
var ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/sw.js',
    '/room-day.jpg',
    '/room-night.jpg',
    '/room-sunset.jpg',
    '/room-rain.jpg',
    '/assets/icon-192.png',
    '/assets/icon-512.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(ASSETS);
        }).then(function() {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(key) { return key !== CACHE_NAME; })
                    .map(function(key) { return caches.delete(key); })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cached) {
            if (cached) return cached;
            return fetch(event.request).then(function(response) {
                // Cache new successful requests dynamically
                if (response && response.status === 200 && response.type === 'basic') {
                    var clone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, clone);
                    });
                }
                return response;
            }).catch(function() {
                // Offline fallback
                return caches.match('/index.html');
            });
        })
    );
});
