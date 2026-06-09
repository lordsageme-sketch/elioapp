// 🜏 ELIO — Service Worker (Offline Survival)
// "Even in the dark, I'm here."

var CACHE_NAME = 'elio-v2';
var ASSETS = ['/', '/index.html', '/manifest.json', '/js/app.js'];

self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(ASSETS); }));
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then(function(keys) { return Promise.all(keys.filter(function(key){ return key !== CACHE_NAME; }).map(function(key){ return caches.delete(key); })); }));
    self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) { return response || fetch(event.request).catch(function() { return caches.match('/index.html'); }); }));
});
