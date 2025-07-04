
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("currency-tool-v1").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "app.js",
        "manifest.json",
        "icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => {
      return resp || fetch(e.request);
    })
  );
});

