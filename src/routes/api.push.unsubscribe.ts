import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server environment variable: ${name}`);
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
          const verifier = createClient(url, env("SUPABASE_PUBLISHABLE_KEY"), {
            auth: { persistSession: false, autoRefreshToken: false },
          });
          const { data: auth, error: authError } = await verifier.auth.getUser(bearer);
          if (authError || !auth.user) {
            return Response.json({ error: "Istunto ei ole voimassa." }, { status: 401 });
          }

          const body = await request.json() as { endpoint?: string };
          const admin = createClient(url, env("SUPABASE_SECRET_KEY"), {
            auth: { persistSession: false, autoRefreshToken: false },
          });

          if (body.endpoint) {
            const { error } = await admin
              .from("push_subscriptions")
              .update({ active: false, updated_at: new Date().toISOString() })
              .eq("owner_id", auth.user.id)
              .eq("endpoint", body.endpoint);
            if (error) throw error;
          } else {
            const { error } = await admin
              .from("push_subscriptions")
              .update({ active: false, updated_at: new Date().toISOString() })
              .eq("owner_id", auth.user.id);
            if (error) throw error;
          }

          await admin.from("user_preferences").upsert(
            { owner_id: auth.user.id, notifications_enabled: false },
            { onConflict: "owner_id" },
          );

          return Response.json({ ok: true });
        } catch (error) {
          console.error("[push/unsubscribe]", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Push-tilauksen poisto epäonnistui." },
            { status: 500 },
          );
        }
      },
    },
  },
});
