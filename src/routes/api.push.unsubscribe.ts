import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error("Palvelimen taustailmoitusasetus puuttuu.");
  return value;
}

export const Route = createFileRoute("/api/push/unsubscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
          if (!bearer) return Response.json({ error: "Kirjautuminen puuttuu." }, { status: 401 });

          const url = env("SUPABASE_URL");
          const { verifyArthurDeviceToken } = await import("@/lib/deviceAuth.server");
          const auth = verifyArthurDeviceToken(bearer);

          const body = await request.json() as { endpoint?: string };
          const admin = createClient(url, env("SUPABASE_SECRET_KEY"), {
            auth: { persistSession: false, autoRefreshToken: false },
          });

          if (body.endpoint) {
            const { error } = await admin
              .from("push_subscriptions")
              .update({ active: false, updated_at: new Date().toISOString() })
              .eq("owner_id", auth.sub)
              .eq("endpoint", body.endpoint);
            if (error) throw error;
          } else {
            const { error } = await admin
              .from("push_subscriptions")
              .update({ active: false, updated_at: new Date().toISOString() })
              .eq("owner_id", auth.sub);
            if (error) throw error;
          }

          await admin.from("user_preferences").upsert(
            { owner_id: auth.sub, notifications_enabled: false },
            { onConflict: "owner_id" },
          );

          return Response.json({ ok: true });
        } catch (error) {
          console.error("[push/unsubscribe]", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Taustailmoitustilauksen poisto epäonnistui." },
            { status: 500 },
          );
        }
      },
    },
  },
});
