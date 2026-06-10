// ELIO — Service Worker v6 (The Chimera)
// "Even in the dark, I'm here."

var CACHE_NAME = 'elio-chimera-v9';
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
    // Network-first for HTML, cache-first for assets
    if (event.request.mode === 'navigate' || event.request.url.indexOf('index.html') >= 0) {
        event.respondWith(
            fetch(event.request).then(function(response) {
                var clone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
                return response;
            }).catch(function() {
                return caches.match('/index.html');
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(function(cached) {
                if (cached) return cached;
                return fetch(event.request).then(function(response) {
                    if (response && response.status === 200) {
                        var clone = response.clone();
                        caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
                    }
                    return response;
                }).catch(function() {
                    return caches.match('/index.html');
                });
            })
        );
    }
});
