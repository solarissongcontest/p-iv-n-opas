/**
 * Complete 20-item transcript in source order of the human-spoken
 * Wikimedia Commons recording "German Vocabulary - Greetings.ogg".
 *
 * German Men92 at English Wikibooks; dedicated to the public domain.
 * Source: https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Greetings.ogg
 * Original file: https://upload.wikimedia.org/wikipedia/commons/b/bb/German_Vocabulary_-_Greetings.ogg
 * The 2011 volume-enhanced version on Commons is the upstream media asset;
 * LOS! does not copy, alter, replace or claim to host it.
 * Finnish glosses / pedagogical notes were added by LOS! editorial writing.
 * This is a list of individual spoken expressions, NOT an invented dialogue.
 */
import type { ContentBlock, Exercise } from "./model";

export const LOS1_C01_GREETING_AUDIO_LINES = [
  { de: "Hallo!", fi: "Hei!" },
  { de: "Servus!", fi: "Hei!", noteFi: "Alueellinen tervehdys, yleinen esimerkiksi Itävallassa ja Etelä-Saksassa." },
  { de: "Moin!", fi: "Moi!", noteFi: "Pohjoissaksalainen tervehdys." },
  { de: "Moin Moin!", fi: "Moi moi!", noteFi: "Pohjoissaksalainen tervehdysmuoto." },
  { de: "Guten Morgen!", fi: "Hyvää huomenta!" },
  { de: "Morgen!", fi: "Huomenta!" },
  { de: "Guten Tag!", fi: "Hyvää päivää!" },
  { de: "Tag!", fi: "Päivää!" },
  { de: "Guten Abend!", fi: "Hyvää iltaa!" },
  { de: "Grüß Gott!", fi: "Päivää!", noteFi: "Alueellinen tervehdys, tyypillinen esimerkiksi Etelä-Saksassa ja Itävallassa." },
  { de: "Auf Wiedersehen!", fi: "Näkemiin!" },
  { de: "Wiedersehen!", fi: "Näkemiin!" },
  { de: "Tschüss!", fi: "Hei hei!" },
  { de: "Tschau!", fi: "Moikka!" },
  { de: "Servus!", fi: "Hei hei!", noteFi: "Servus voi tilanteesta riippuen tarkoittaa myös hyvästelyä." },
  { de: "Bis später!", fi: "Nähdään myöhemmin!" },
  { de: "Bis dann!", fi: "Nähdään sitten!" },
  { de: "Bis bald!", fi: "Nähdään pian!" },
  { de: "Bis gleich!", fi: "Nähdään kohta!" },
  { de: "Gute Nacht!", fi: "Hyvää yötä!", noteFi: "Sanotaan esimerkiksi nukkumaan mentäessä, ei tavallisena iltatervehdyksenä." },
] as const;

export const LOS1_C01_GREETING_AUDIO_BLOCKS: ContentBlock[] = [
  {
    id: "los1-c01-text-b-guide", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Kuuntele nyt toinen aito saksankielinen äänite. Se on ihmisen lukema tervehdysten "
      + "ja hyvästelyjen luettelo, ei keskustelu. Kuuntele kerran ilman tekstiä ja avaa vasta "
      + "sitten alla oleva koko 20 ilmauksen alkuperäinen luettelo. Vain C01:ssa opetetut "
      + "perusfraasit kuuluvat tämän kappaleen testiin. Alueelliset sanat kuten Moin ja "
      + "Grüß Gott ovat lisätietoa, eivät opeteltavaa koesanastoa.",
  },
  {
    id: "los1-c01-m-com-03-audio", version: "1.0.0", kind: "media", mediaType: "audio",
    title: "German Vocabulary – Greetings · alkuperäinen ääni (28 s)",
    sourceId: "M-COM-03",
    embedUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bb/German_Vocabulary_-_Greetings.ogg",
    mp3Url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/bb/German_Vocabulary_-_Greetings.ogg/German_Vocabulary_-_Greetings.ogg.mp3",
  },
  {
    id: "los1-c01-m-com-03-transcript", version: "1.0.0", kind: "transcript",
    sourceId: "M-COM-03",
    lines: LOS1_C01_GREETING_AUDIO_LINES.map(line => ({ ...line })),
  },
  {
    id: "los1-c01-text-b-reflection", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Kuuntele uudelleen ja etsi järjestyksessä Morgen, Tschüss ja Gute Nacht. "
      + "On täysin normaalia, ettet vielä tunnista kaikkia alueellisia tervehdyksiä. "
      + "Kertaa ensin tavalliset tervehdykset ja niiden tilanteet.",
  },
];

export const LOS1_C01_AUDIO_COMPREHENSION_EXERCISES: Exercise[] = [
  {
    id: "los1-c01-audio-list-morning", version: "1.0.0", type: "single-choice",
    promptFi: "Mikä näistä äänitteen ilmauksista tarkoittaa 'hyvää huomenta'?",
    objectives: ["L1-LISTEN-01"], difficulty: "guided",
    options: [
      { id: "guten-morgen", label: "Guten Morgen!" },
      { id: "guten-abend", label: "Guten Abend!" },
      { id: "gute-nacht", label: "Gute Nacht!" },
    ],
    correctOptionId: "guten-morgen",
    explanationFi: "Guten Morgen tarkoittaa hyvää huomenta. Äänitteessä puhuja sanoo myös lyhyemmän Morgen!-tervehdyksen.",
  },
  {
    id: "los1-c01-audio-list-parting", version: "1.0.0", type: "single-choice",
    promptFi: "Mikä äänitteen fraasi tarkoittaa 'nähdään pian'?",
    objectives: ["L1-LISTEN-01"], difficulty: "basic",
    options: [
      { id: "bis-bald", label: "Bis bald!" },
      { id: "bis-spater", label: "Bis später!" },
      { id: "bis-gleich", label: "Bis gleich!" },
    ],
    correctOptionId: "bis-bald",
    explanationFi: "Bis bald! tarkoittaa 'nähdään pian'. Bis gleich on 'nähdään kohta' ja Bis später 'nähdään myöhemmin'.",
  },
];
