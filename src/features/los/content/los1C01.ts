/**
 * C01: complete eight-turn transcript accompanying M-COM-01.
 * Original: Xzapro4 and Erkan Yilmaz, 29 June 2008,
 * https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg
 * License: CC BY-SA 3.0, https://creativecommons.org/licenses/by-sa/3.0/
 * Original German dialogue is unabridged. Finnish explanations are LOS! additions;
 * the original dialogue/recording are not being claimed as two native speakers.
 * This is a rights-verified editorial preview, pending language and device QA.
 */
export const LOS1_C01_TEXT_VERSION = "1.0.0";
export const LOS1_C01_SOURCE_ID = "M-COM-01";
export const LOS1_C01_LINES = [
  { id: "u01", speaker: "Franz", text: "Hallo, wie heißt du?", meaning: "Hei, mikä sinun nimesi on?" },
  { id: "u02", speaker: "Jörg", text: "Hallo, ich heiße Jörg. Und du?", meaning: "Hei, nimeni on Jörg. Entä sinun?" },
  { id: "u03", speaker: "Franz", text: "Ich heiße Franz.", meaning: "Minun nimeni on Franz." },
  { id: "u04", speaker: "Jörg", text: "Wie alt bist du?", meaning: "Kuinka vanha olet?" },
  { id: "u05", speaker: "Franz", text: "Ich bin neunzehn Jahre alt, und du?", meaning: "Olen 19-vuotias, entä sinä?" },
  { id: "u06", speaker: "Jörg", text: "Ich bin zwanzig.", meaning: "Olen kaksikymmentävuotias." },
  { id: "u07", speaker: "Franz", text: "Gut. Bis später!", meaning: "Hyvä. Nähdään myöhemmin!" },
  { id: "u08", speaker: "Jörg", text: "Tschüss!", meaning: "Moikka!" },
] as const;

export type LosC01Line = typeof LOS1_C01_LINES[number];
export type LosC01Token = { id: string; index: number; display: string; word: string };

export function losC01Tokens(line: LosC01Line): LosC01Token[] {
  return (line.text.match(/\S+\s*/gu) ?? []).map((display, index) => ({
    id: `${LOS1_C01_SOURCE_ID}-${line.id}-t${index}`,
    index,
    display,
    word: display.trim().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").toLocaleLowerCase("de"),
  }));
}

/** Contextual learning aids, not a claim that all forms are active C01 vocabulary. */
export const LOS1_C01_GLOSS: Readonly<Record<string, string>> = {
  hallo: "hei",
  wie: "miten / kuinka; tässä kysymyksen aloittava sana",
  heißt: "olet nimeltäsi; heißen-verbin sinä-muoto (opitaan C02:ssa)",
  du: "sinä",
  ich: "minä",
  heiße: "olen nimeltäni; heißen-verbin minä-muoto (opitaan C02:ssa)",
  jörg: "Jörg, henkilön etunimi",
  franz: "Franz, henkilön etunimi",
  und: "ja; kysymyksessä Und du? = Entä sinä?",
  alt: "vanha; ikään liittyvä sana (opitaan C06:ssa)",
  bist: "olet; sein-verbin sinä-muoto (opitaan C02:ssa)",
  bin: "olen; sein-verbin minä-muoto (opitaan C02:ssa)",
  neunzehn: "yhdeksäntoista (vain tunnistettavaksi tässä)",
  jahre: "vuotta (vain tunnistettavaksi tässä)",
  zwanzig: "kaksikymmentä (vain tunnistettavaksi tässä)",
  gut: "hyvä / hyvin",
  bis: "asti; Bis später! = nähdään myöhemmin",
  später: "myöhemmin",
  tschüss: "moikka / hei hei",
};

export type LosC01Question = {
  id: string;
  prompt: string;
  options: readonly { id: string; text: string }[];
  correctId: string;
  feedback: string;
};
export const LOS1_C01_QUESTIONS: readonly LosC01Question[] = [
  {
    id: "C01-SOURCE-Q01", prompt: "Ketkä kaksi henkilöä keskustelevat?",
    options: [
      { id: "a", text: "Franz ja Jörg" }, { id: "b", text: "Franz ja Greta" },
      { id: "c", text: "Jörg ja Peter" },
    ], correctId: "a",
    feedback: "Puhujat ovat Franz ja Jörg. Nimet näkyvät vuorojen edessä.",
  },
  {
    id: "C01-SOURCE-Q02", prompt: "Millä sanalla keskustelu alkaa?",
    options: [
      { id: "a", text: "Danke" }, { id: "b", text: "Hallo" },
      { id: "c", text: "Guten Abend" },
    ], correctId: "b",
    feedback: "Franz aloittaa sanalla Hallo. Se on yleinen tervehdys.",
  },
  {
    id: "C01-SOURCE-Q03", prompt: "Mikä on keskustelun viimeinen hyvästely?",
    options: [
      { id: "a", text: "Guten Morgen!" }, { id: "b", text: "Danke!" },
      { id: "c", text: "Tschüss!" },
    ], correctId: "c",
    feedback: "Jörg sanoo viimeisessä puheenvuorossa Tschüss! Se on arkinen hyvästely.",
  },
  {
    id: "C01-SOURCE-Q04", prompt: "Mitä ilmaus Bis später! tarkoittaa tässä?",
    options: [
      { id: "a", text: "Nähdään myöhemmin!" },
      { id: "b", text: "Hyvää yötä!" },
      { id: "c", text: "Mikä sinun nimesi on?" },
    ], correctId: "a",
    feedback: "Bis später! tarkoittaa nähdään myöhemmin. Opettele ilmaus kokonaisena.",
  },
];
