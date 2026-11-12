/** U2 server dictionary requests: bounded, unicode-aware, no browser raw data. */
export type LosDictionaryLanguage = "de" | "fi";
export type LosDictionaryQuery = {
  term: string;
  normalized: string;
  direction: "de-fi" | "fi-de";
  language: LosDictionaryLanguage;
  targetLanguage: LosDictionaryLanguage;
  limit: number;
};

const allowedQuery = /^[\p{L}\p{N} .'-]+$/u;

export function parseLosDictionaryQuery(url: URL): LosDictionaryQuery {
  const term = (url.searchParams.get("q") ?? "").normalize("NFC").trim();
  const direction = url.searchParams.get("direction") ?? "de-fi";
  if (direction !== "de-fi" && direction !== "fi-de") {
    throw new Error("Valitse saksa–suomi tai suomi–saksa.");
  }
  if (term.length < 1 || term.length > 60 || !allowedQuery.test(term)) {
    throw new Error("Hakusanassa on oltava 1–60 kirjainta tai tavallista merkkiä.");
  }
  const language: LosDictionaryLanguage = direction === "de-fi" ? "de" : "fi";
  const targetLanguage: LosDictionaryLanguage = language === "de" ? "fi" : "de";
  const rawLimit = Number(url.searchParams.get("limit") ?? 20);
  const limit = Number.isSafeInteger(rawLimit) ? Math.max(1, Math.min(20, rawLimit)) : 20;
  return { term, normalized: term.toLocaleLowerCase(language === "de" ? "de" : "fi"),
    direction, language, targetLanguage, limit };
}

export function losDictionarySearchAliases(term: string, language: LosDictionaryLanguage): string[] {
  const normalized = term.normalize("NFC").toLocaleLowerCase(language);
  if (language === "fi") return [normalized];
  return [...new Set([
    normalized,
    normalized.replace(/ß/g, "ss"),
    normalized.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue"),
  ])];
}
