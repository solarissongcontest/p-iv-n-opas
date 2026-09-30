import { createFileRoute } from "@tanstack/react-router";
import { getVapidKeys } from "@/lib/serverPush";

export const Route = createFileRoute("/api/push/public-key")({
  server: {
    handlers: {
      GET: async () => {
        try {
          return Response.json({ publicKey: getVapidKeys().publicKeyBase64 });
        } catch (error) {
          console.error("[push/public-key]", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Taustailmoitusten palvelinavain puuttuu." },
            { status: 500 },
          );
        }
      },
    },
  },
});
