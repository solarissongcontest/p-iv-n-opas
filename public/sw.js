const SHELL_CACHE = "opk-shell-v3";
const RUNTIME_CACHE = "opk-runtime-v3";
const SHELL_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/app-icon-180.png",
  "/app-icon-512.jpg",
];

const OPTIONAL_STUDY_ASSETS = [
  "https://unpkg.com/rich-text-editor@8.13.0/dist/rich-text-editor-bundle.js",
  "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js",
];

function isApprovedStudyCdnAsset(url) {
  return (
    (url.origin === "https://unpkg.com" &&
      url.pathname.startsWith("/rich-text-editor@8.13.0/")) ||
    (url.origin === "https://cdn.jsdelivr.net" &&
      url.pathname.startsWith("/npm/mathjax@3.2.2/"))
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(async (cache) => {
      await Promise.allSettled(
        [...SHELL_ASSETS, ...OPTIONAL_STUDY_ASSETS].map((asset) => cache.add(asset)),
      );
    }),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    void self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("opk-") && key !== SHELL_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key)),
        ),
      ),
      self.clients.claim(),
    ]),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const approvedStudyCdn = isApprovedStudyCdnAsset(url);
  if (!sameOrigin && !approvedStudyCdn) return;
  if (sameOrigin && url.pathname.startsWith("/api/")) return;

  if (sameOrigin && request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok || response.type === "opaque") {
            const copy = response.clone();
            event.waitUntil(caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy)));
          }
          return response;
        })
        .catch(async () => {
          return (
            (await caches.match(request)) ||
            (await caches.match("/")) ||
            new Response(
              "<!doctype html><html lang=\"fi\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Opintopäiväkirja</title><body><main><h1>Opintopäiväkirja</h1><p>Sovellusta ei saatu avattua ilman verkkoyhteyttä.</p></main></body></html>",
              { headers: { "Content-Type": "text/html; charset=utf-8" } },
            )
          );
        }),
    );
    return;
  }

  const isStaticAsset =
    approvedStudyCdn ||
    ["script", "style", "font", "image"].includes(request.destination) ||
    /\.(?:js|css|woff2?|png|jpe?g|svg|ico|webp)$/i.test(url.pathname);

  if (!isStaticAsset) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            event.waitUntil(caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy)));
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    }),
  );
});

self.addEventListener("push", (event) => {
  let data = {
    title: "Opintopäiväkirja",
    body: "Sinulla on opiskelumuistutus.",
    url: "/",
    tag: "opintopaivakirja",
  };

  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {
    if (event.data) data.body = event.data.text();
  }

  let safeUrl = "/";
  try {
    const candidate = new URL(data.url || "/", self.location.origin);
    if (candidate.origin === self.location.origin) {
      safeUrl = candidate.pathname + candidate.search + candidate.hash;
    }
  } catch {
    safeUrl = "/";
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      tag: data.tag || "opintopaivakirja",
      icon: "/app-icon-180.png",
      badge: "/favicon.ico",
      data: { url: safeUrl },
      renotify: true,
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  let targetUrl;
  try {
    targetUrl = new URL(event.notification.data?.url || "/", self.location.origin);
  } catch {
    targetUrl = new URL("/", self.location.origin);
  }
  if (targetUrl.origin !== self.location.origin) {
    targetUrl = new URL("/", self.location.origin);
  }
  if (targetUrl.pathname === "/" && !targetUrl.searchParams.has("source")) {
    targetUrl.searchParams.set("source", "push");
  }
  const target = targetUrl.href;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      for (const client of windows) {
        if ("focus" in client) {
          client.navigate(target);
          return client.focus();
        }
      }
      return clients.openWindow ? clients.openWindow(target) : undefined;
    }),
  );
});
