import { createFileRoute } from "@tanstack/react-router";
import { getVapidKeys } from "@/lib/serverPush";

export const Route = createFileRoute("/api/push/public-key")({
  server: {
    handlers: {
      GET: async () => {
        try {
          return Response.json({ publicKey: getVapidKeys().publicKeyBase64 });
        } catch (error) {
          console.error("[Opintopäiväkirja] push public key failed", error);
          return Response.json(
            { error: "Taustailmoituksia ei voitu valmistella." },
            { status: 500 },
          );
        }
      },
    },
  },
});
