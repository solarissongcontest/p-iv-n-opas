/** Original LOS! learning tasks: no borrowed text, no external assessment. */
import type { Exercise } from "./model";
const base = {
  version: "0.1.0",
  objectives: ["L1-INT-01"],
  difficulty: "guided" as const,
};
export const LOS1_C01_INTERACTIVE_EXERCISES: Exercise[] = [
  {
    ...base, id: "los1-c01-multichoice-goodbyes", type: "multiple-choice",
    promptFi: "Valitse kaikki ilmaukset, joilla voi hyvästellä henkilön. Huomaa, että oikeita vastauksia on useita.",
    options: [
      { id: "bye", label: "Tschüss!" },
      { id: "day", label: "Guten Tag!" },
      { id: "later", label: "Bis später!" },
      { id: "formal", label: "Auf Wiedersehen!" },
    ],
    correctOptionIds: ["bye", "later", "formal"],
    explanationFi: "Tschüss!, Bis später! ja Auf Wiedersehen! ovat hyvästelyjä. Guten Tag! on tervehdys.",
  },
  {
    ...base, id: "los1-c01-truth-good-night", type: "true-false",
    promptFi: "Onko seuraava väite tosi vai epätosi?",
    statement: "Gute Nacht! on tavallinen tervehdys, kun tulet illalla kahvilaan.",
    correctValue: false,
    explanationFi: "Gute Nacht! toivotetaan yleensä nukkumaan mennessä. Illalla saapuessa käytetään esimerkiksi Guten Abend!.",
  },
  {
    ...base, id: "los1-c01-order-bis-spaeter", type: "word-order",
    promptFi: "Järjestä sanat: miten sanot saksaksi 'nähdään myöhemmin'?",
    tokens: [
      { id: "later", label: "später!" },
      { id: "bis", label: "Bis" },
    ],
    correctOrder: ["bis", "later"],
    explanationFi: "Bis später! tarkoittaa 'nähdään myöhemmin'.",
  },
  {
    ...base, id: "los1-c01-order-guten-morgen", type: "word-order",
    promptFi: "Järjestä sanat: miten toivotat saksaksi hyvää huomenta?",
    tokens: [
      { id: "morning", label: "Morgen!" },
      { id: "guten", label: "Guten" },
    ],
    correctOrder: ["guten", "morning"],
    explanationFi: "Guten Morgen! on aamulla sopiva tervehdys.",
  },
  {
    ...base, id: "los1-c01-categorize-situations", type: "categorize",
    promptFi: "Lajittele ilmaukset käyttötarkoituksensa mukaan.",
    items: [
      { id: "morning", label: "Guten Morgen!" },
      { id: "goodbye", label: "Tschüss!" },
      { id: "evening", label: "Guten Abend!" },
      { id: "later", label: "Bis später!" },
    ],
    categories: [
      { id: "morning", label: "Tervehdys aamulla" },
      { id: "evening", label: "Tervehdys illalla" },
      { id: "farewell", label: "Hyvästely" },
    ],
    assignments: [
      { itemId: "morning", categoryId: "morning" },
      { itemId: "goodbye", categoryId: "farewell" },
      { itemId: "evening", categoryId: "evening" },
      { itemId: "later", categoryId: "farewell" },
    ],
    explanationFi: "Guten Morgen on aamun tervehdys, Guten Abend illan tervehdys, ja Tschüss sekä Bis später sopivat hyvästelyyn.",
  },
];
