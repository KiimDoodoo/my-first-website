// Softly service worker: app-shell caching so the app opens offline.
// All user data lives in localStorage, so caching pages is enough.
const CACHE_NAME = "softly-v6";

const APP_SHELL = [
  "/",
  "/onboarding",
  "/checkin",
  "/breathe",
  "/moments",
  "/today",
  "/summary",
  "/event",
  "/records",
  "/safety",
  "/settings",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-maskable.png",
  "/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Next.js client-navigation payloads (?_rsc=… / RSC header) must be
  // network-first too — cache-first would pin users to a stale version
  // after every deploy.
  const isRsc =
    url.searchParams.has("_rsc") || request.headers.get("RSC") === "1";

  if (request.mode === "navigate" || isRsc) {
    // Pages: network first so updates arrive, cache as offline fallback.
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match("/")),
        ),
    );
    return;
  }

  // Static assets (hashed by Next): cache first, fill cache on miss.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
