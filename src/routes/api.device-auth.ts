import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

const ARTHUR_EMAIL = "arthur@opintopaivakirja.invalid";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server environment variable: ${name}`);
  return value;
}

function arthurPassword(secretKey: string) {
  return (
    createHash("sha256")
      .update(`opintopaivakirja:arthur:${secretKey}`)
      .digest("base64url") + "aA1!"
  );
}

export const Route = createFileRoute("/api/device-auth")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const origin = request.headers.get("origin");
          const requestUrl = new URL(request.url);
          if (origin && new URL(origin).host !== requestUrl.host) {
            return Response.json({ error: "Virheellinen alkuperä." }, { status: 403 });
          }

          const body = (await request.json().catch(() => ({}))) as { username?: string };
          if (body.username?.trim().toLowerCase() !== "arthur") {
            return Response.json({ error: "Käyttäjänimeä ei tunnistettu." }, { status: 401 });
          }

          const supabaseUrl = required("SUPABASE_URL");
          const secretKey = required("SUPABASE_SECRET_KEY");
          const publishableKey = required("SUPABASE_PUBLISHABLE_KEY");
          const password = arthurPassword(secretKey);

          const admin = createClient(supabaseUrl, secretKey, {
            auth: { persistSession: false, autoRefreshToken: false },
          });

          const { data: usersData, error: listError } = await admin.auth.admin.listUsers({
            page: 1,
            perPage: 1000,
          });
          if (listError) throw listError;

          let arthur = usersData.users.find(
            (candidate) => candidate.email?.toLowerCase() === ARTHUR_EMAIL,
          );

          if (!arthur) {
            const { data, error } = await admin.auth.admin.createUser({
              email: ARTHUR_EMAIL,
              password,
              email_confirm: true,
              user_metadata: { display_name: "Arthur", app: "opintopaivakirja" },
            });
            if (error) throw error;
            arthur = data.user;
          } else {
            const { data, error } = await admin.auth.admin.updateUserById(arthur.id, {
              password,
              email_confirm: true,
              user_metadata: {
                ...(arthur.user_metadata ?? {}),
                display_name: "Arthur",
                app: "opintopaivakirja",
              },
            });
            if (error) throw error;
            arthur = data.user;
          }

          // Generate and redeem an admin-created one-time token instead of using
          // email/password sign-in. This keeps the one-device username flow
          // independent of the public Email Auth provider toggle.
          const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
            type: "magiclink",
            email: ARTHUR_EMAIL,
          });
          if (linkError) throw linkError;

          const tokenHash = linkData.properties?.hashed_token;
          if (!tokenHash) {
            throw new Error("Supabase ei palauttanut kertakäyttöistä tunnistustunnusta.");
          }

          const authClient = createClient(supabaseUrl, publishableKey, {
            auth: { persistSession: false, autoRefreshToken: false },
          });
          const { data: sessionData, error: verifyError } = await authClient.auth.verifyOtp({
            token_hash: tokenHash,
            type: "email",
          });
          if (verifyError) throw verifyError;
          if (!sessionData.session) throw new Error("Supabase ei palauttanut sessiota.");

          return Response.json({
            access_token: sessionData.session.access_token,
            refresh_token: sessionData.session.refresh_token,
            user_id: sessionData.user?.id ?? arthur.id,
          });
        } catch (error) {
          console.error("[device-auth]", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Kirjautuminen epäonnistui." },
            { status: 500 },
          );
        }
      },
    },
  },
});
