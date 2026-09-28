import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server environment variable: ${name}`);
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
          const publishable = env("SUPABASE_PUBLISHABLE_KEY");
          const secret = env("SUPABASE_SECRET_KEY");
          const verifier = createClient(url, publishable, {
            auth: { persistSession: false, autoRefreshToken: false },
          });
          const { data: auth, error: authError } = await verifier.auth.getUser(bearer);
          if (authError || !auth.user) {
            return Response.json({ error: "Istunto ei ole voimassa." }, { status: 401 });
          }

          const body = await request.json() as {
            subscription?: { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
          };
          const subscription = body.subscription;
          if (
            !subscription?.endpoint ||
            !subscription.keys?.p256dh ||
            !subscription.keys?.auth
          ) {
            return Response.json({ error: "Virheellinen push-tilaus." }, { status: 400 });
          }

          const admin = createClient(url, secret, {
            auth: { persistSession: false, autoRefreshToken: false },
          });
          const { error } = await admin.from("push_subscriptions").upsert(
            {
              owner_id: auth.user.id,
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
              owner_id: auth.user.id,
              notifications_enabled: true,
            },
            { onConflict: "owner_id" },
          );

          return Response.json({ ok: true });
        } catch (error) {
          console.error("[push/subscribe]", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Push-tilauksen tallennus epäonnistui." },
            { status: 500 },
          );
        }
      },
    },
  },
});
