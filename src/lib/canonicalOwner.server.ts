import type { SupabaseClient } from "@supabase/supabase-js";

type AdminClient = SupabaseClient<any>;

export type ArthurOwnerCandidate = {
  owner_id: string | null;
  onboarding_completed?: boolean | null;
  created_at?: string | null;
};

function isUuid(value: unknown): value is string {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function createdAtSortKey(value: string | null | undefined) {
  return typeof value === "string" && value.length > 0 ? value : "9999-12-31T23:59:59.999Z";
}

/**
 * Pick a stable canonical owner for the single-user Arthur installation.
 *
 * A provisional cached device owner is allowed to create seeded defaults while
 * the server is resolving the real owner. That provisional row must never steal
 * canonical status merely because it was updated most recently. Prefer a profile
 * that already finished onboarding, then keep the oldest such profile stable.
 */
export function pickCanonicalArthurOwner(
  candidates: ArthurOwnerCandidate[],
  legacyOwnerId?: string | null,
) {
  const valid = candidates
    .filter((candidate): candidate is ArthurOwnerCandidate & { owner_id: string } => isUuid(candidate.owner_id))
    .sort((a, b) => {
      const completionOrder = Number(Boolean(b.onboarding_completed)) - Number(Boolean(a.onboarding_completed));
      if (completionOrder !== 0) return completionOrder;

      const createdOrder = createdAtSortKey(a.created_at).localeCompare(createdAtSortKey(b.created_at));
      if (createdOrder !== 0) return createdOrder;

      return a.owner_id.localeCompare(b.owner_id);
    });

  return valid[0]?.owner_id ?? (isUuid(legacyOwnerId) ? legacyOwnerId : null);
}

export async function resolveCanonicalArthurOwner(
  admin: AdminClient,
  legacyOwnerId?: string | null,
) {
  const { data: preferences, error: preferencesError } = await admin
    .from("user_preferences")
    .select("owner_id,onboarding_completed,created_at")
    .eq("display_name", "Arthur")
    .not("owner_id", "is", null)
    .limit(100);

  if (preferencesError) {
    throw new Error(
      "Kanonisen Arthur-profiilin haku epäonnistui: " +
      (preferencesError.message ?? "tuntematon tietokantavirhe"),
    );
  }

  const preferenceOwner = pickCanonicalArthurOwner(
    (preferences ?? []) as ArthurOwnerCandidate[],
    null,
  );
  if (preferenceOwner) return preferenceOwner;

  // A very old installation can predate user_preferences. Keep that fallback
  // deterministic too: the oldest seeded KE04 owner wins, not the latest write.
  const { data: courses, error: coursesError } = await admin
    .from("courses")
    .select("owner_id,created_at")
    .eq("code", "KE04")
    .not("owner_id", "is", null)
    .order("created_at", { ascending: true })
    .limit(1);

  if (coursesError) {
    throw new Error(
      "Kanonisen Arthur-kurssin haku epäonnistui: " +
      (coursesError.message ?? "tuntematon tietokantavirhe"),
    );
  }

  const courseOwner = courses?.[0]?.owner_id;
  if (isUuid(courseOwner)) return courseOwner;
  return isUuid(legacyOwnerId) ? legacyOwnerId : null;
}
