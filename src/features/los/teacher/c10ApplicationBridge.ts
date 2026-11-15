/**
 * A deliberate bridge between Teacher L054's self-reviewed dialogue drafts
 * and the canonical C10 "Käytä saksaa" applicationDraft field.
 *
 * No AI language grading, automatic migration or overwrite of existing work.
 * The third-person introduction must still be written/reviewed by the student.
 */
export const LOS_C10_DIALOGUE_MIN_LENGTH = 90;

export function composeLosC10Dialogues(du: string, sie: string): string | null {
  const first = du.trim();
  const second = sie.trim();
  if (first.length < LOS_C10_DIALOGUE_MIN_LENGTH ||
      second.length < LOS_C10_DIALOGUE_MIN_LENGTH) return null;
  return [
    "A · Kaksi uutta tuttavaa (du)",
    first,
    "",
    "B · Opiskelija ja opettaja (Sie)",
    second,
    "",
    "Kolmas henkilö · Täydennä tähän neljä helppoa virkettä:",
    "",
  ].join("\n");
}

/** Return the original draft unchanged unless the learner chose an empty target. */
export function storeLosC10Dialogues<T extends {applicationDraft:string}>(
  current:T, prepared:string|null,
):T {
  if (!prepared || current.applicationDraft.trim()) return current;
  return {...current,applicationDraft:prepared.slice(0,5000)};
}
