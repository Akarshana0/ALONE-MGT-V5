// ============================================================
// ALONE MANAGEMENT - Service Worker (Offline PWA)
// ============================================================

const CACHE_NAME = 'alone-mgt-v5-cache';
const CDN_CACHE  = 'alone-mgt-cdn-cache';

const APP_SHELL = ['./', './index.html', './icon.jpg', './manifest.json'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME && k !== CDN_CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const url = event.request.url;

    // Local app files → Cache First
    if (url.includes('/index.html') || url.includes('/icon.jpg') || url.includes('/manifest.json') || url.endsWith('/')) {
        event.respondWith(
            caches.match(event.request).then(cached =>
                cached || fetch(event.request).then(res => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
                    return res;
                })
            )
        );
        return;
    }

    // CDN assets → Stale-While-Revalidate (cache first, update in background)
    const isCDN = url.includes('cdn.tailwindcss.com') || url.includes('cdn.jsdelivr.net') ||
                  url.includes('cdnjs.cloudflare.com') || url.includes('unpkg.com') ||
                  url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com');

    if (isCDN) {
        event.respondWith(
            caches.open(CDN_CACHE).then(cache =>
                cache.match(event.request).then(cached => {
                    const fetchPromise = fetch(event.request).then(res => {
                        if (res && res.status === 200) cache.put(event.request, res.clone());
                        return res;
                    }).catch(() => null);
                    return cached || fetchPromise;
                })
            )
        );
        return;
    }

    // Everything else → Network with cache fallback
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
