import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { sendWebPush, type StoredPushSubscription } from "@/lib/serverPush";

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server environment variable: ${name}`);
  return value;
}

export const Route = createFileRoute("/api/push/test")({
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

          const admin = createClient(url, env("SUPABASE_SECRET_KEY"), {
            auth: { persistSession: false, autoRefreshToken: false },
          });
          const { data: subscriptions, error } = await admin
            .from("push_subscriptions")
            .select("id,subscription")
            .eq("owner_id", auth.user.id)
            .eq("active", true);
          if (error) throw error;
          if (!subscriptions?.length) {
            return Response.json({ error: "Tällä käyttäjällä ei ole aktiivista push-tilausta." }, { status: 404 });
          }

          let sent = 0;
          for (const row of subscriptions) {
            const response = await sendWebPush(row.subscription as StoredPushSubscription, {
              title: "Opintopäiväkirja toimii",
              body: "Tämä on oikea taustalta lähetetty Web Push -testimuistutus.",
              url: "/",
              tag: `test:${Date.now()}`,
            });

            if (response.ok) {
              sent += 1;
              await admin
                .from("push_subscriptions")
                .update({ last_success_at: new Date().toISOString() })
                .eq("id", row.id);
            } else if (response.status === 404 || response.status === 410) {
              await admin
                .from("push_subscriptions")
                .update({ active: false, updated_at: new Date().toISOString() })
                .eq("id", row.id);
            }
          }

          if (!sent) {
            return Response.json({ error: "Push-palvelu ei hyväksynyt testiviestiä." }, { status: 502 });
          }
          return Response.json({ ok: true, sent });
        } catch (error) {
          console.error("[push/test]", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Testimuistutus epäonnistui." },
            { status: 500 },
          );
        }
      },
    },
  },
});
