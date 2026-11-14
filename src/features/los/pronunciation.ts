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
  /** Evidence of qualified human review; optional on unapproved source entries. */
  ipaReviewedBy?: string;
  ipaReviewedAt?: string;
  audioAssets: readonly {
    id: string;
    sourceId: string;
    speakerType: "human" | "synthetic";
    url?: string;
    voiceLocale?: string;
    licenseId?: string;
    usageStatus: "ready" | "pending-review" | "unavailable";
    reviewedAt?: string;
    reviewedBy?: string;
  }[];
};

// German Wiktionary headword sources inspected 2026-11-12; separate
// bis and später entries additionally checked 2026-11-15. These are
// individual word pronunciations, NOT the full "Bis später!" phrase.
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
  bitte: { ipa: "ˈbɪtə", page: "bitte" },
  bis: { ipa: "bɪs", page: "bis" },
  später: { ipa: "ˈʃpɛːtɐ", page: "später" },
};

// These are standalone *phrase* entries in German Wiktionary, inspected
// 2026-11-12. Do not concatenate word IPAs: connected speech and stress vary.
// "bis später" has no sufficiently supported complete-phrase IPA yet.
const verifiedPhrases: Readonly<Record<string, {
  ipa: string; alternatives?: readonly string[]; page: string;
}>> = {
  "guten morgen": { ipa: "ˈɡuːtn̩ ˈmɔʁɡŋ̍",
    alternatives: ["ˈɡuːtn̩ ˈmɔʁɡn̩"], page: "guten_Morgen" },
  "guten tag": { ipa: "ˌɡutn̩ ˈtaːk", page: "guten_Tag" },
  "guten abend": { ipa: "ˌɡuːtən ˈaːbənt",
    alternatives: ["ˌɡuːtn̩ ˈaːbm̩t"], page: "guten_Abend" },
  "gute nacht": { ipa: "ˌɡutə ˈnaxt", page: "gute_Nacht" },
  "auf wiedersehen": { ipa: "aʊ̯f ˈviːdɐˌzeːən", page: "auf_Wiedersehen" },
  "bis bald": { ipa: "bɪs ˈbalt", page: "bis_bald" },
};

// Whole phrases remain unverified until a phrase-specific source is checked.
// No formula concatenates individual word IPAs into a fake phrase IPA.
function sourcedRecords(
  records: Readonly<Record<string, {
    ipa: string; alternatives?: readonly string[]; page: string;
  }>>,
  targetType: "lemma" | "phrase",
): LosPronunciation[] {
  return Object.entries(records).map(([target, record]) => ({
    id: "wiktionary-de-" + targetType + "-" + target,
    language: "de", region: "de-DE", targetType, target,
    ipa: record.ipa,
    ...(record.alternatives ? { alternatives: record.alternatives } : {}),
    ipaSourceId: "de.wiktionary:" + record.page,
    ipaSourceUrl: "https://de.wiktionary.org/wiki/" + encodeURIComponent(record.page),
    ipaReviewStatus: "source-verified",
    audioAssets: [],
  }));
}
export const LOS_PRONUNCIATIONS: readonly LosPronunciation[] = [
  ...sourcedRecords(verifiedWords, "lemma"),
  ...sourcedRecords(verifiedPhrases, "phrase"),
];

export const normalizeLosGermanHeadword = (word: string): string =>
  word.trim().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "")
    .replace(/\s+/gu, " ").toLocaleLowerCase("de");

export function getLosPronunciation(word: string): LosPronunciation | null {
  const normalized = normalizeLosGermanHeadword(word);
  return LOS_PRONUNCIATIONS.find(
    (entry) => entry.target === normalized &&
      entry.targetType === (normalized.includes(" ") ? "phrase" : "lemma"),
  ) ?? null;
}

/**
 * Optional word-by-word reference when an entire phrase lacks its own IPA.
 * Return *nothing* unless every word has a separately sourced lemma IPA.
 * Do not join IPA strings or present them as a connected-speech reading.
 */
export function getLosSourcedWordIpaParts(phrase:string):readonly {
  word:string; ipa:string; sourceUrl:string;
}[] {
  const words=phrase.trim().split(/\\s+/u).filter(Boolean);
  if(words.length<2)return [];
  const result:{word:string;ipa:string;sourceUrl:string}[]=[];
  for(const word of words){
    const pronunciation=getLosPronunciation(word);
    if(pronunciation?.targetType!=="lemma"||!pronunciation.ipa||!pronunciation.ipaSourceUrl)
      return [];
    result.push({word,ipa:pronunciation.ipa,sourceUrl:pronunciation.ipaSourceUrl});
  }
  return result;
}
