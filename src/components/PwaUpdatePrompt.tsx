import { useEffect, useRef, useState } from "react";

export function PwaUpdatePrompt() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const reloadOnControllerChange = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let active = true;
    let registration: ServiceWorkerRegistration | null = null;

    const inspect = (next: ServiceWorkerRegistration) => {
      registration = next;
      if (next.waiting && navigator.serviceWorker.controller && active) {
        setWaiting(next.waiting);
        setDismissed(false);
      }

      next.addEventListener("updatefound", () => {
        const installing = next.installing;
        if (!installing) return;
        installing.addEventListener("statechange", () => {
          if (
            installing.state === "installed" &&
            navigator.serviceWorker.controller &&
            active
          ) {
            setWaiting(next.waiting ?? installing);
            setDismissed(false);
          }
        });
      });
    };

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(inspect)
      .catch((error) => console.error("[PWA] Service worker registration failed", error));

    const checkForUpdate = () => {
      if (!navigator.onLine) return;
      void registration?.update().catch(() => undefined);
    };
    window.addEventListener("focus", checkForUpdate);
    window.addEventListener("online", checkForUpdate);

    const onControllerChange = () => {
      if (reloadOnControllerChange.current) window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    return () => {
      active = false;
      window.removeEventListener("focus", checkForUpdate);
      window.removeEventListener("online", checkForUpdate);
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  if (!waiting || dismissed) return null;

  return (
    <div className="pwa-update-prompt" role="status" aria-live="polite">
      <div>
        <b>Uusi versio on valmis</b>
        <p>Päivitä sopivassa kohdassa. Keskeneräinen opiskelukerta ei päivity itsestään.</p>
      </div>
      <div className="pwa-update-actions">
        <button type="button" onClick={() => setDismissed(true)}>Myöhemmin</button>
        <button
          type="button"
          className="pwa-update-primary"
          onClick={() => {
            reloadOnControllerChange.current = true;
            waiting.postMessage({ type: "SKIP_WAITING" });
          }}
        >
          Päivitä nyt
        </button>
      </div>
    </div>
  );
}
