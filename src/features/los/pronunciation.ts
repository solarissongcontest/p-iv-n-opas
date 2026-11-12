/**
 * LOS! U1.0 pronunciation registry.
 * Source-verified = transcribed from the named entry, NOT reviewed by a
 * qualified German language editor or tested as a listening model.
 * Keep form/phrase records separate: a lemma's IPA is not its phrase's IPA.
 */
export type LosPronunciation = {
  id: string;
  language: "de";
  region: "de-DE" | "de-AT" | "de-CH" | "unspecified";
  targetType: "lemma" | "form" | "phrase" | "sentence";
  target: string;
  ipa: string | null;
  alternatives?: readonly string[];
  ipaSourceId?: string;
  ipaSourceUrl?: string;
  ipaReviewStatus: "reviewed" | "source-verified" | "candidate" | "unavailable";
  audioAssets: readonly {
    id: string;
    sourceId: string;
    speakerType: "human" | "synthetic";
    url?: string;
    voiceLocale?: string;
    licenseId?: string;
    usageStatus: "ready" | "pending-review" | "unavailable";
    reviewedAt?: string;
  }[];
};

// The following German-language Wiktionary entries were inspected 2026-11-12.
// No separate spoken-word audio has yet passed LOS! device + licence QA.
const verifiedWords: Readonly<Record<string, { ipa: string; alternatives?: readonly string[]; page: string }>> = {
  hallo: { ipa: "ˈhalo", alternatives: ["haˈloː"], page: "hallo" },
  tschüss: { ipa: "t͡ʃʏs", page: "tschüss" },
  danke: { ipa: "ˈdaŋkə", page: "danke" },
  ja: { ipa: "jaː", page: "ja" },
  nein: { ipa: "naɪ̯n", page: "nein" },
  ich: { ipa: "ɪç", page: "ich" },
  du: { ipa: "duː", page: "du" },
  wie: { ipa: "viː", page: "wie" },
};

// Whole phrases remain unverified until a phrase-specific source is checked.
// No formula concatenates individual word IPAs into a fake phrase IPA.
export const LOS_PRONUNCIATIONS: readonly LosPronunciation[] =
  Object.entries(verifiedWords).map(([target, record]) => ({
    id: "wiktionary-de-" + target,
    language: "de",
    region: "de-DE",
    targetType: "lemma",
    target,
    ipa: record.ipa,
    alternatives: record.alternatives,
    ipaSourceId: "de.wiktionary:" + record.page,
    ipaSourceUrl: "https://de.wiktionary.org/wiki/" + encodeURIComponent(record.page),
    ipaReviewStatus: "source-verified",
    audioAssets: [],
  }));

export const normalizeLosGermanHeadword = (word: string): string =>
  word.trim().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").toLocaleLowerCase("de");

export function getLosPronunciation(word: string): LosPronunciation | null {
  const normalized = normalizeLosGermanHeadword(word);
  return LOS_PRONUNCIATIONS.find(
    (entry) => entry.targetType === "lemma" && entry.target === normalized,
  ) ?? null;
}
