/** Full authentic human-recorded dialogue from M-COM-01.
 * Authors: Xzapro4 and Erkan Yilmaz, 29 June 2008.
 * Source: https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg
 * License: Creative Commons Attribution-ShareAlike 3.0 Unported:
 * https://creativecommons.org/licenses/by-sa/3.0/
 * Transcription and original OGG are reproduced without altering German wording.
 * Finnish translations and teaching prompts are separately authored annotations
 * to aid A1.1 understanding; adaptations are identified in the attribution UI.
 * The audio is played from the publisher's Wikimedia file endpoint, NOT copied
 * to the app or claimed as offline media.
 */
import type { ContentBlock, Exercise } from "./model";

export const LOS1_C01_DIALOGUE_TURNS = [
  { speaker: "Franz", text: "Hallo, wie heißt du?", translationFi: "Hei, mikä sinun nimesi on?" },
  { speaker: "Jörg", text: "Hallo, ich heiße Jörg. Und du?", translationFi: "Hei, minun nimeni on Jörg. Entä sinun?" },
  { speaker: "Franz", text: "Ich heiße Franz.", translationFi: "Minun nimeni on Franz." },
  { speaker: "Jörg", text: "Wie alt bist du?", translationFi: "Kuinka vanha olet?" },
  { speaker: "Franz", text: "Ich bin neunzehn Jahre alt, und du?", translationFi: "Olen 19-vuotias. Entä sinä?" },
  { speaker: "Jörg", text: "Ich bin zwanzig.", translationFi: "Olen kaksikymmentä." },
  { speaker: "Franz", text: "Gut. Bis später!", translationFi: "Hyvä. Nähdään myöhemmin!" },
  { speaker: "Jörg", text: "Tschüss!", translationFi: "Hei hei!" },
] as const;

export const LOS1_C01_AUTHENTIC_TEXT = LOS1_C01_DIALOGUE_TURNS.map(turn => turn.text).join("\n");
const greeting = "Hallo";
const greetingStart = LOS1_C01_AUTHENTIC_TEXT.indexOf(greeting);

export const LOS1_C01_SOURCE_BLOCKS: ContentBlock[] = [
  {
    id: "los1-c01-source-intro", version: "1.0.0", kind: "paragraph", language: "fi",
    text: "Lue Franzin ja Jörgin kahdeksan repliikin alkuperäinen keskustelu kokonaan. "
      + "Etsi ensin tutut sanat Hallo ja Tschüss. Nimien ja iän kysymykset tulevat tarkemmin myöhemmissä kappaleissa. "
      + "Voit avata jokaisen repliikin suomennoksen tarvittaessa.",
  },
  {
    id: "los1-c01-m-com-01-audio", version: "1.0.0", kind: "media", mediaType: "audio",
    title: "Franz ja Jörg · alkuperäinen äänite (14 s)",
    sourceId: "M-COM-01",
    embedUrl: "https://upload.wikimedia.org/wikipedia/commons/1/11/Gespr%C3%A4chVorstellung.ogg",
  },
  {
    id: "los1-c01-m-com-01-dialogue", version: "1.0.0", kind: "dialogue",
    sourceId: "M-COM-01", turns: LOS1_C01_DIALOGUE_TURNS.map(turn => ({ ...turn })),
  },
  {
    id: "los1-c01-reading-followup", version: "1.0.0", kind: "paragraph", language: "fi",
    text: "Kuuntele keskustelu vielä kerran ja seuraa samalla alkuperäistä tekstiä. "
      + "Tässä kappaleessa ei tarvitse osata taivuttaa heißen- ja sein-verbejä. "
      + "Tavoitteena on tunnistaa aloitus ja hyvästely ilman tekstin suomennosta.",
  },
];

export const LOS1_C01_SOURCE_EXERCISES: Exercise[] = [
  {
    id: "los1-c01-text-a-highlight-greeting", version: "1.0.0", type: "highlight",
    promptFi: "Korosta Franzin ensimmäisestä repliikistä sana, jolla hän tervehtii Jörgiä.",
    objectives: ["L1-INT-01", "L1-READ-01"], difficulty: "guided",
    blockId: "los1-c01-m-com-01-dialogue", text: LOS1_C01_AUTHENTIC_TEXT,
    acceptedRanges: [{ start: greetingStart, end: greetingStart + greeting.length }],
    hintFi: "Tervehdys on keskustelun aivan ensimmäinen sana.",
    explanationFi: "Franz aloittaa sanalla Hallo. Sen suomenkielinen vastine on hei.",
  },
  {
    id: "los1-c01-text-a-choice-goodbye", version: "1.0.0", type: "single-choice",
    promptFi: "Millä ilmauksella Jörg päättää alkuperäisen keskustelun?",
    objectives: ["L1-INT-01", "L1-READ-01"], difficulty: "guided",
    options: [
      { id: "tschuss", label: "Tschüss!" },
      { id: "morgen", label: "Guten Morgen!" },
      { id: "tag", label: "Guten Tag!" },
    ],
    correctOptionId: "tschuss",
    hintFi: "Katso keskustelun viimeistä repliikkiä.",
    explanationFi: "Jörg sanoo lopuksi Tschüss! eli hei hei.",
  },
  {
    id: "los1-c01-text-a-gap-goodbye", version: "1.0.0", type: "gap-fill",
    promptFi: "Täydennä Franzin hyvästely. Kirjoita vain puuttuva sana.",
    objectives: ["L1-INT-01", "L1-READ-01"], difficulty: "basic",
    sentenceBefore: "Bis", sentenceAfter: "!",
    acceptedAnswers: ["später"],
    hintFi: "Lauseen kokonaisuus tarkoittaa 'Nähdään myöhemmin!'.",
    explanationFi: "Bis später! tarkoittaa 'Nähdään myöhemmin!'.",
  },
];
