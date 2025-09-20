const CACHE_NAME = 'system-painel-v1';
const ASSETS = [
'./',
'./index.html',
'./manifest.webmanifest',
'./assets/system-logo.jpg',
'./assets/icons/icon-192.png',
'./assets/icons/icon-512.png'
];


self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
);
});


self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
);
});


self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then(resp => resp || fetch(event.request))
);
});
