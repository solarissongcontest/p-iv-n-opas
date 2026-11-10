/** Editorially authored teaching examples and tasks, not authentic source texts.
 * C01 remains PLANNED until M-COM-01 full transcript + audio passes publication QA.
 * These examples deliberately do not pretend to be a real conversational source.
 */
import type { ContentBlock, Exercise } from "./model";

export const LOS1_C01_PREVIEW_BLOCKS: ContentBlock[] = [
  {
    id: "los1-c01-orientation", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Saksa alkaa tässä aivan alusta. Opettele ensin tunnistamaan muutama tervehdys, "
      + "niiden käyttötilanne sekä saksan tutut ja vieraat kirjainäänteet. "
      + "Sinun ei tarvitse osata saksaa ennen tätä kappaletta.",
  },
  {
    id: "los1-c01-phonetics", version: "0.1.0", kind: "grammar",
    title: "Ensimmäiset saksan äänteet",
    explanationFi: "Saksan kirjoitus ja ääntäminen eroavat välillä suomesta. W lausutaan usein suomen v:n tapaan. "
      + "Z äännetään ts, ei–kirjainyhdistelmä muistuttaa ai:ta ja ie pitkää i:tä. "
      + "Sch äännetään š-äänteenä. Ä, ö ja ü ovat omia kirjaimiaan; ß vastaa soinnitonta s-äännettä. "
      + "Ch:lla on eri ääntämistapoja, joita harjoitellaan myöhemmin. Tässä vaiheessa riittää erojen tunnistaminen.",
    examples: [
      { de: "wie", fi: "miten: w ääntyy v:n kaltaisesti" },
      { de: "zehn", fi: "kymmenen: z ääntyy ts" },
      { de: "nein", fi: "ei: ei ääntyy ai" },
      { de: "Sie", fi: "te: ie ääntyy pitkänä i:nä" },
      { de: "schön", fi: "kaunis: sch ääntyy š" },
    ],
  },
  {
    id: "los1-c01-greetings", version: "0.1.0", kind: "grammar",
    title: "Tervehdi tilanteen mukaan",
    explanationFi: "Hallo sopii tavalliseen epämuodolliseen tervehdykseen. "
      + "Guten Morgen sanotaan aamulla, Guten Tag päivällä ja Guten Abend illalla. "
      + "Tschüss on arkinen hyvästely; Auf Wiedersehen on muodollisempi. "
      + "Gute Nacht liittyy nukkumaan menoon eikä ole tavallinen iltatervehdys. "
      + "Tässä harjoitellaan fraaseja kokonaisuuksina, ei sanojen taivuttamista.",
    examples: [
      { de: "Hallo!", fi: "Hei!" },
      { de: "Guten Morgen!", fi: "Hyvää huomenta!" },
      { de: "Guten Tag!", fi: "Hyvää päivää!" },
      { de: "Guten Abend!", fi: "Hyvää iltaa!" },
      { de: "Tschüss!", fi: "Hei hei!" },
      { de: "Auf Wiedersehen!", fi: "Näkemiin!" },
    ],
  },
  {
    id: "los1-c01-core-words", version: "0.1.0", kind: "vocabulary",
    entries: [
      ["hallo", "hei", "tavallinen tervehdys"],
      ["guten Morgen", "hyvää huomenta", "aamulla"],
      ["guten Tag", "hyvää päivää", "päivällä"],
      ["guten Abend", "hyvää iltaa", "illalla"],
      ["gute Nacht", "hyvää yötä", "nukkumaan mennessä"],
      ["tschüss", "hei hei", "epämuodollinen hyvästely"],
      ["auf Wiedersehen", "näkemiin", "muodollisempi hyvästely"],
      ["bis bald", "nähdään pian", ""],
      ["bis später", "nähdään myöhemmin", ""],
      ["danke", "kiitos", ""],
      ["bitte", "ole hyvä", "myös pyynnöissä"],
      ["ja", "kyllä", ""],
      ["nein", "ei", ""],
      ["ich", "minä", "opetellaan tarkemmin C02:ssa"],
      ["du", "sinä", "opetellaan tarkemmin C02:ssa"],
      ["wie", "miten", "opetellaan tarkemmin C02:ssa"],
    ].map(([de, fi, note], index) => ({
      id: "los1-c01-word-" + String(index + 1).padStart(2, "0"),
      de, fi, note,
    })),
  },
];

const base = {
  version: "0.1.0", difficulty: "guided" as const, objectives: ["L1-INT-01"],
};
const highlightText = "Guten Morgen! Guten Tag! Guten Abend!";
const target = "Guten Abend";
const start = highlightText.indexOf(target);
export const LOS1_C01_PREVIEW_EXERCISES: Exercise[] = [
  {
    ...base, id: "los1-c01-ex-greeting-choice", type: "single-choice",
    promptFi: "Mikä ilmaus sopii tilanteeseen, jossa tervehdit aamulla?",
    options: [
      { id: "morning", label: "Guten Morgen!" },
      { id: "night", label: "Gute Nacht!" },
      { id: "bye", label: "Tschüss!" },
    ],
    correctOptionId: "morning",
    hintFi: "Morgen tarkoittaa aamua.",
    explanationFi: "Guten Morgen tarkoittaa hyvää huomenta. Gute Nacht tarkoittaa hyvää yötä.",
  },
  {
    ...base, id: "los1-c01-ex-greeting-gap", type: "gap-fill",
    promptFi: "Täydennä saksankielinen aamun tervehdys yhdellä sanalla.",
    sentenceBefore: "Guten", sentenceAfter: "!",
    acceptedAnswers: ["Morgen"],
    hintFi: "Sana alkaa M-kirjaimella.",
    explanationFi: "Guten Morgen! on aamun tervehdys.",
  },
  {
    ...base, id: "los1-c01-ex-greeting-pairs", type: "matching",
    promptFi: "Yhdistä saksankielinen tervehdys sen suomenkieliseen merkitykseen.",
    left: [
      { id: "morgen", label: "Guten Morgen" },
      { id: "abend", label: "Guten Abend" },
      { id: "tag", label: "Guten Tag" },
      { id: "tschuess", label: "Tschüss" },
    ],
    right: [
      { id: "bye", label: "Hei hei" },
      { id: "day", label: "Hyvää päivää" },
      { id: "evening", label: "Hyvää iltaa" },
      { id: "morning", label: "Hyvää huomenta" },
    ],
    pairs: [
      { leftId: "morgen", rightId: "morning" },
      { leftId: "abend", rightId: "evening" },
      { leftId: "tag", rightId: "day" },
      { leftId: "tschuess", rightId: "bye" },
    ],
    explanationFi: "Morgen = aamu, Tag = päivä ja Abend = ilta. Tschüss on arkinen hyvästely.",
  },
  {
    ...base, id: "los1-c01-ex-marker-demo", type: "highlight",
    blockId: "los1-c01-ex-marker-demo-source",
    promptFi: "Korosta harjoitusrivistä ilmaus, joka tarkoittaa 'hyvää iltaa'. Tämä on oma harjoitusrivi, ei autenttinen lähdeteksti.",
    text: highlightText,
    acceptedRanges: [{ start, end: start + target.length }],
    hintFi: "Abend tarkoittaa iltaa.",
    explanationFi: "Guten Abend! tarkoittaa hyvää iltaa. Läpikuultava väri merkitsee valittua tekstijaksoa.",
  },
];
