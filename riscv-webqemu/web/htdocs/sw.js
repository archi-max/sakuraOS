// sw.js – minimal PWA service worker

const CACHE_NAME = "qemu-riscv-cache-v1";
const ASSETS = [
  "/",                 // your index.html
  "/manifest.webmanifest",
  "/sw.js",
  "/vendor/xterm.css",
  "/load.js",
  "/out.js",
  "/module.js",
  "/qemu-system-riscv64.data",
  "/qemu-system-riscv64.wasm",
  "/qemu-system-riscv64.worker.js",
  "/qemu-system-riscv64",
  "https://unpkg.com/xterm@5.3.0/lib/xterm.js",
  "https://unpkg.com/xterm-pty/index.js"
  // add any other static files your app needs to boot
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;

  // Simple cache-first for same-origin GETs
  if (req.method === "GET" && req.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req))
    );
  }
});