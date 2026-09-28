import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server environment variable: ${name}`);
  return value;
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
          const jwtSecret = required("SUPABASE_JWT_SECRET");
          const admin = createClient(supabaseUrl, secretKey, {
            auth: { persistSession: false, autoRefreshToken: false },
          });

          let ownerId: string | null = null;

          const { data: preferences } = await admin
            .from("user_preferences")
            .select("owner_id")
            .eq("display_name", "Arthur")
            .not("owner_id", "is", null)
            .limit(1);
          ownerId = preferences?.[0]?.owner_id ?? null;

          if (!ownerId) {
            const { data: courses } = await admin
              .from("courses")
              .select("owner_id")
              .eq("code", "KE04")
              .not("owner_id", "is", null)
              .limit(1);
            ownerId = courses?.[0]?.owner_id ?? null;
          }

          if (!ownerId) {
            const { data: users } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
            const arthur = users.users.find(
              (candidate) =>
                candidate.user_metadata?.display_name === "Arthur" ||
                candidate.user_metadata?.app === "opintopaivakirja" ||
                candidate.email?.toLowerCase() === "arthur@opintopaivakirja.invalid",
            );
            ownerId = arthur?.id ?? null;
          }

          ownerId ??= randomUUID();

          const { signArthurDeviceToken } = await import("@/lib/deviceAuth.server");
          const signed = signArthurDeviceToken({ ownerId, supabaseUrl, jwtSecret });

          return Response.json({
            access_token: signed.token,
            user_id: ownerId,
            expires_at: signed.expiresAt,
          });
        } catch (error) {
          console.error("[device-auth]", error);
          return Response.json(
            {
              error:
                error instanceof Error
                  ? error.message
                  : "Arthur-laitetunnistuksen luominen epäonnistui.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
