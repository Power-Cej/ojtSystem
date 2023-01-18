/* eslint-disable no-restricted-globals */

const key = 'site-static-v1.0.0';
const cache = new CacheStorage(key, 100);

self.addEventListener('install', event => {
    // console.log('service worker installed');
});

self.addEventListener('activate', event => {
    // console.log('service worker activated');
});

function getOrCache(request) {
    return Promise.resolve()
        .then(() => cache.get(request))
        .then(response => {
            return response || fetch(request)
                .then(response => {
                    cache.put(request, response.clone());
                    return response;
                })
        })
}

function getOrFallback(request) {
    return Promise.resolve()
        .then(() => cache.get(request))
        .then(response => {

        });
}

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    if (navigator.onLine) {
        // static cache
        if (url.origin === location.origin) {
            event.respondWith(getOrCache(event.request));
        }
    } else {
        event.respondWith(cache.get(url));
    }
});

function CacheStorage(name, limit = 50) {
    this.name = name;
    this.limit = limit;
    this.open = function () {
        if (this.openPromise) {
            return this.openPromise;
        }
        this.openPromise = caches.open(this.name)
            .then(cache => {
                this.cache = cache;
            });
        return this.openPromise;
    }
    this.add = function (request) {
        return this.open()
            .then(() => this.cache.keys())
            .then(keys => {
                if (keys.length > this.limit) {
                    return this.delete(keys[0]);
                }
            })
            .then(() => this.cache.add(request));
    }
    this.put = function (request, response) {
        return this.open()
            .then(() => this.cache.keys())
            .then(keys => {
                if (keys.length > this.limit) {
                    return this.delete(keys[0]);
                }
            })
            .then(() => this.cache.put(request, response));
    }
    this.get = function (request) {
        return caches.match(request);
    }
    this.delete = function (key) {
        return this.open()
            .then(() => this.cache.delete(key));
    }
    this.clear = function () {
        return caches.delete(this.name);
    }
}
