import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { verifyArthurDeviceToken } from "@/lib/deviceAuth.server";

/** U2 read-only dictionary. Only explicitly published datasets are searchable.
 * No raw dictionary file, service key, or student data reaches the browser.
 */
type LosDictionaryDirection = "de-fi" | "fi-de";
type SearchError = { error: string; status: "unavailable" | "invalid" };
function reply(body: unknown, status = 200) {
  return Response.json(body, {
    status, headers: {"Cache-Control":"no-store", "Vary":"Authorization"},
  });
}
function isDirection(value: string | null): value is LosDictionaryDirection {
  return value === "de-fi" || value === "fi-de";
}
function getSearchParams(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim().normalize("NFC");
  const direction = url.searchParams.get("direction");
  if (!isDirection(direction)) return null;
  if (!q || q.length > 80 || Array.from(q).some(char => { const code = char.charCodeAt(0); return code < 32 || code === 127; })) return null;
  const rawLimit = url.searchParams.get("limit") ?? "20";
  if (!/^\d{1,2}$/.test(rawLimit)) return null;
  const limit = Number(rawLimit);
  if (limit < 1 || limit > 20) return null;
  return { q, direction, limit };
}
function authenticate(request: Request, supabaseUrl: string, jwtSecret: string) {
  const origin = request.headers.get("origin");
  const url = new URL(request.url);
  if (origin && new URL(origin).origin !== url.origin) return false;
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Bearer ") || header.length > 8192) return false;
  try {
    const claims = verifyArthurDeviceToken(header.slice(7), jwtSecret);
    return claims.iss === supabaseUrl.replace(/\/$/, "") + "/auth/v1";
  } catch {
    return false;
  }
}
export const Route = createFileRoute("/api/los-dictionary")({
  server: {
    handlers: {
      GET: async ({request}) => {
        const parsed = getSearchParams(request);
        if (!parsed) return reply({
          error: "Anna enintään 80 merkkiä pitkä hakusana ja oikea hakusuunta (de-fi tai fi-de).",
          status:"invalid",
        } satisfies SearchError, 400);
        const supabaseUrl = process.env.SUPABASE_URL;
        const secret = process.env.SUPABASE_SECRET_KEY;
        const jwtSecret = process.env.SUPABASE_JWT_SECRET;
        if (!supabaseUrl || !secret || !jwtSecret) {
          return reply({error:"Sanakirjan hakupalvelua ei ole otettu käyttöön.",status:"unavailable"} satisfies SearchError,503);
        }
        if (!authenticate(request,supabaseUrl,jwtSecret)) {
          return reply({error:"Avaa Opintopäiväkirja kirjautuneena ja yritä uudelleen.",status:"unavailable"} satisfies SearchError,401);
        }
        const db = createClient(supabaseUrl,secret,{
          auth:{persistSession:false,autoRefreshToken:false},
        });
        try {
          const {count, error:sourceError} = await db.from("los_dictionary_sources")
            .select("source_id",{count:"exact",head:true}).eq("published",true);
          if (sourceError) throw sourceError;
          if (!count) {
            return reply({
              error:"Laajaa sanakirjaa ei ole vielä julkaistu tarkistetusta lähdeaineistosta.",
              status:"unavailable",
            } satisfies SearchError,503);
          }
          const {data,error} = await db.rpc("los_dictionary_search",{
            p_query:parsed.q,p_direction:parsed.direction,p_limit:parsed.limit,
          });
          if (error) throw error;
          return reply({
            status:"ready", query:parsed.q, direction:parsed.direction,
            limit:parsed.limit, sourcesPublished:count, results:data ?? [],
            note:"Merkitykset, IPA ja muodot näkyvät erillisten lähteiden tietoina; lähteen IPA-ehdotus ei ole asiantuntijatarkistus.",
          });
        } catch(error) {
          console.error("[LOS dictionary] query unavailable",error);
          return reply({
            error:"Sanakirjan haku ei juuri nyt toimi. Kappalesanastot säilyvät käytössä.",
            status:"unavailable",
          } satisfies SearchError,503);
        }
      },
    },
  },
});
