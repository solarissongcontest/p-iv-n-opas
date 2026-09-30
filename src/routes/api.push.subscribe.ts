import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error("Palvelimen taustailmoitusasetus puuttuu.");
  return value;
}

export const Route = createFileRoute("/api/push/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
          if (!bearer) return Response.json({ error: "Kirjautuminen puuttuu." }, { status: 401 });

          const url = env("SUPABASE_URL");
          const secret = env("SUPABASE_SECRET_KEY");
          const { verifyArthurDeviceToken } = await import("@/lib/deviceAuth.server");
          const auth = verifyArthurDeviceToken(bearer);

          const body = await request.json() as {
            subscription?: { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
          };
          const subscription = body.subscription;
          if (
            !subscription?.endpoint ||
            !subscription.keys?.p256dh ||
            !subscription.keys?.auth
          ) {
            return Response.json({ error: "Virheellinen taustailmoitustilaus." }, { status: 400 });
          }

          const admin = createClient(url, secret, {
            auth: { persistSession: false, autoRefreshToken: false },
          });
          const { error } = await admin.from("push_subscriptions").upsert(
            {
              owner_id: auth.sub,
              endpoint: subscription.endpoint,
              subscription,
              user_agent: request.headers.get("user-agent"),
              active: true,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "owner_id,endpoint" },
          );
          if (error) throw error;

          await admin.from("user_preferences").upsert(
            {
              owner_id: auth.sub,
              notifications_enabled: true,
            },
            { onConflict: "owner_id" },
          );

          return Response.json({ ok: true });
        } catch (error) {
          console.error("[push/subscribe]", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Taustailmoitustilauksen tallennus epäonnistui." },
            { status: 500 },
          );
        }
      },
    },
  },
});
