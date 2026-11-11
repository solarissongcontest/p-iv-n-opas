/** Human-original main Text A for LOS! 1 C03: the entire Berna "Wer bin ich?"
 * Q&A transcription from COERLL's openly licensed Deutsch im Blick.
 * Source: https://coerll.utexas.edu/dib/vidt.php?f=01_15_int_bg_who
 * COERLL confirms project licensing CC BY (the 2017 textbook states CC BY 4.0):
 * https://coerll.utexas.edu/coerll/oer/deutsch-im-blick/
 * https://creativecommons.org/licenses/by/4.0/
 * The transcript preserves all 6 questions and 6 answer positions. Only the
 * person's published phone number is deliberately REDACTED; that modification
 * is explicitly signposted both here and in LOS!'s source attribution.
 * Finnish translations and vocabulary notes were independently added.
 * The source video itself is NOT hosted or embedded while asset rights, URL,
 * availability and user-facing playback have not been independently checked.
 */
import type { ContentBlock, Exercise } from "./model";

export const LOS1_C03_BERNA_TURNS = [
  { speaker: "Haastattelija", text: "Wie heißt du?", translationFi: "Mikä sinun nimesi on?" },
  { speaker: "Berna", text: "Ich heiße Berna.", translationFi: "Minun nimeni on Berna." },
  { speaker: "Haastattelija", text: "Woher kommst du?", translationFi: "Mistä olet kotoisin?" },
  { speaker: "Berna", text: "Ich komme aus Deutschland.", translationFi: "Olen kotoisin Saksasta." },
  { speaker: "Haastattelija", text: "Und wo in Deutschland?", translationFi: "Entä mistä päin Saksaa?" },
  { speaker: "Berna", text: "Ich komme aus Kiel. Das ist in Schleswig-Holstein, ganz im Norden.", translationFi: "Olen kotoisin Kielistä. Se sijaitsee Schleswig-Holsteinissa aivan pohjoisessa." },
  { speaker: "Haastattelija", text: "Wie alt bist du?", translationFi: "Kuinka vanha olet?" },
  { speaker: "Berna", text: "Ich bin 30 Jahre alt.", translationFi: "Olen 30-vuotias. (Tämä on alkuperäisen haastattelun aikainen tieto.)" },
  { speaker: "Haastattelija", text: "Was ist deine Telefonnummer?", translationFi: "Mikä on puhelinnumerosi? Tätä kysymystä ei tarvitse opetella C03:ssa." },
  { speaker: "Berna", text: "Meine Telefonnummer [Telefonnummer aus Datenschutzgründen entfernt].", translationFi: "Puhelinnumeroni [numero poistettu yksityisyydensuojan vuoksi]." },
  { speaker: "Haastattelija", text: "Was ist deine Lieblingsfarbe und warum?", translationFi: "Mikä on lempivärisi ja miksi? Ei vielä aktiivinen oppimistavoite." },
  { speaker: "Berna", text: "Meine Lieblingsfarbe ist, glaube ich, rot. Und rot, weil... [das] ist halt eine sehr temperamentvolle Farbe und hat viel Feuer und Leidenschaft.", translationFi: "Lempivärini on kai punainen. Punainen, koska se on hyvin temperamenttinen väri, jossa on tulta ja intohimoa. (Teksti jätetään muuten alkuperäiseen asuunsa.)" },
] as const;
export const LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION =
  LOS1_C03_BERNA_TURNS.map(turn => turn.text).join("\n");

export const LOS1_C03_SOURCE_BLOCKS: ContentBlock[] = [
  {
    id: "los1-c03-berna-intro", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Tässä on oikean saksankielisen puhujan Bernan kokonainen kuusi kysymystä ja kuusi vastausta "
      + "sisältävä alkuperäinen haastattelulitteraatti, ei LOS!:n keksimä keskustelu. "
      + "Se on peräisin Texasin yliopiston avoimesta Deutsch im Blick -oppimateriaalista. "
      + "Yksi henkilön puhelinnumero on poistettu näkyvästi yksityisyydensuojan vuoksi; "
      + "muut vastaukset ovat kokonaisina alkuperäisellä saksalla. "
      + "Sinun tehtäväsi on tunnistaa Berna, Deutschland ja Kiel. Ikä, puhelin ja lempiväri "
      + "ovat ylemmän tason tekstiä: älä yritä opetella niiden kielioppia tässä kappaleessa.",
  },
  {
    id: "los1-c03-berna-dialogue", version: "1.0.0", kind: "dialogue", sourceId: "M-DIB-01",
    turns: LOS1_C03_BERNA_TURNS.map(turn => ({ ...turn })),
  },
  {
    id: "los1-c03-berna-followup", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Lue haastattelu uudestaan ja etsi yksi kysymys Woher kommst du? ja kaksi vastausta "
      + "Ich komme aus Deutschland. sekä Ich komme aus Kiel. "
      + "Kiel on kaupunki Saksassa, ja Schleswig-Holstein on Saksan osavaltio, ei erillinen maa. "
      + "Nimitiedot ovat osa lähteen alkuperäistä julkista haastattelua. "
      + "Kun kohtaat liian vaikean repliikin, voit avata vain sen suomennoksen ja siirtyä eteenpäin.",
  },
];

const base = {
  version: "0.1.0", difficulty: "guided" as const,
  objectives: ["L1-INT-03", "L1-READ-01"],
};
const firstWoher = LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION.indexOf("Woher kommst du?");
const deutschland = LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION.indexOf("Ich komme aus Deutschland.");
const kiel = LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION.indexOf("Ich komme aus Kiel.");
export const LOS1_C03_SOURCE_EXERCISES: Exercise[] = [
  {
    ...base, id: "los1-c03-berna-who", type: "single-choice",
    promptFi: "Mikä Bernan oma nimi on tässä alkuperäisessä haastattelussa?",
    options: [{ id: "berna", label: "Berna" }, { id: "eva", label: "Eva" }, { id: "lena", label: "Lena" }],
    correctOptionId: "berna", explanationFi: "Haastattelun ensimmäinen vastaus on Ich heiße Berna.",
  },
  {
    ...base, id: "los1-c03-berna-country", type: "single-choice",
    promptFi: "Mistä maasta Berna kertoo olevansa kotoisin?",
    options: [{ id: "de", label: "Saksasta" }, { id: "at", label: "Itävallasta" }, { id: "ch", label: "Sveitsistä" }],
    correctOptionId: "de",
    explanationFi: "Lähteessä Berna sanoo Ich komme aus Deutschland.",
  },
  {
    ...base, id: "los1-c03-berna-city", type: "single-choice",
    promptFi: "Mistä kaupungista Berna kertoo olevansa kotoisin?",
    options: [{ id: "kiel", label: "Kiel" }, { id: "berlin", label: "Berlin" }, { id: "wien", label: "Wien" }],
    correctOptionId: "kiel",
    explanationFi: "Berna sanoo Ich komme aus Kiel. Kiel sijaitsee Schleswig-Holsteinissa Saksassa.",
  },
  {
    ...base, id: "los1-c03-berna-highlight-question", type: "highlight",
    blockId: "los1-c03-berna-dialogue",
    promptFi: "Korosta alkuperäisen litteraatin ensimmäinen kysymys Woher kommst du?.",
    text: LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION,
    acceptedRanges: [{ start: firstWoher, end: firstWoher + "Woher kommst du?".length }],
    explanationFi: "Woher kommst du? kysyy lähtöpaikkaa.",
  },
  {
    ...base, id: "los1-c03-berna-highlight-country", type: "highlight",
    blockId: "los1-c03-berna-dialogue",
    promptFi: "Korosta Bernan vastaus Ich komme aus Deutschland. litteraatista.",
    text: LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION,
    acceptedRanges: [{ start: deutschland, end: deutschland + "Ich komme aus Deutschland.".length }],
    explanationFi: "Lause Ich komme aus Deutschland tarkoittaa 'Olen kotoisin Saksasta'.",
  },
  {
    ...base, id: "los1-c03-berna-highlight-city", type: "highlight",
    blockId: "los1-c03-berna-dialogue",
    promptFi: "Korosta Bernan oman kaupungin kertova lyhyt lause.",
    text: LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION,
    acceptedRanges: [{ start: kiel, end: kiel + "Ich komme aus Kiel.".length }],
    explanationFi: "Ich komme aus Kiel. kertoo kaupungin.",
  },
];
