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

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      tag: data.tag || "opintopaivakirja",
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      data: { url: data.url || "/" },
      renotify: true,
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || "/", self.location.origin);
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
