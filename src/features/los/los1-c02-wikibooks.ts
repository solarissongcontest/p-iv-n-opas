/** LOS! 1 C02 Text A: exact six-replica source dialogue Franz–Greta.
 *
 * Original human-edited text: Wikibooks German/Level I/Wie heißt du? (1. Teil)
 * Fixed page revision oldid 4430449, last edit 2024-09-02.
 * https://en.wikibooks.org/w/index.php?title=German/Level_I/Wie_heißt_du&oldid=4430449
 * Licensed CC BY-SA 4.0; German dialogue is reproduced intact in source order.
 * https://creativecommons.org/licenses/by-sa/4.0/
 * Finnish line translations, teaching instructions and exercises are added
 * here, not copied from the English Wikibooks teaching instructions.
 *
 * Separate audio: original Human Robot recording, Commons file "Dialogue
 * franz greta 1.ogg", public domain, 20 seconds. Audio player uses Wikimedia
 * server; playback and MP3 direct URL require real-device verification.
 * https://commons.wikimedia.org/wiki/File:Dialogue_franz_greta_1.ogg
 */
import type { ContentBlock, Exercise } from "./model";

export const LOS1_C02_WB_ORIGINAL_TURNS = [
  { speaker: "Franz", text: "Hallo, ich bin Franz. Wie heißt du?", translationFi: "Hei, minä olen Franz. Mikä sinun nimesi on?" },
  { speaker: "Greta", text: "Hallo, Franz. Ich heiße Greta. Wie geht's?", translationFi: "Hei, Franz. Minun nimeni on Greta. Mitä kuuluu?" },
  { speaker: "Franz", text: "Es geht mir gut. Kennst du den Lehrer?", translationFi: "Minulle kuuluu hyvää. Tunnetko opettajan?" },
  { speaker: "Greta", text: "Ja, er heißt Herr Weiß.", translationFi: "Kyllä, hänen nimensä on herra Weiß." },
  { speaker: "Franz", text: "Oh, danke, Greta. Bis dann!", translationFi: "Kiitos, Greta. Nähdään sitten!" },
  { speaker: "Greta", text: "Wiedersehen!", translationFi: "Näkemiin!" },
] as const;
export const LOS1_C02_WB_ORIGINAL_TEXT = LOS1_C02_WB_ORIGINAL_TURNS.map(row => row.text).join("\n");
const quote = "Ich heiße Greta.";
const quoteStart = LOS1_C02_WB_ORIGINAL_TEXT.indexOf(quote);

export const LOS1_C02_WB_BLOCKS: ContentBlock[] = [
  {
    id: "los1-c02-wb-original-intro", version: "1.0.0", kind: "paragraph", language: "fi",
    text: "Lue nyt oikeiden ihmisten Wikibooksiin kirjoittama Franzin ja Gretan kuuden repliikin keskustelu kokonaisena. "
      + "Saksan alkuperäisteksti on kopioitu muuttamattomana. Yksittäisten repliikkien "
      + "suomennokset, selitykset ja tehtävät ovat LOS!:n itse lisäämiä. "
      + "Kuuntele alkuperäinen 20 sekunnin ääni ensin ilman tekstiä, jos se toimii laitteellasi. "
      + "Etsi Wie heißt du?, Ich heiße Greta. ja er heißt Herr Weiß. "
      + "Ilmausten Wie geht's?, Es geht mir gut. ja Kennst du den Lehrer? "
      + "koko kielioppi opetetaan vasta myöhemmin; nyt riittää, että avaat niiden suomennokset.",
  },
  {
    id: "los1-c02-wb-original-audio", version: "1.0.0", kind: "media", mediaType: "audio",
    title: "Franz ja Greta · aito Wikibooks-äänite (20 s)",
    sourceId: "M-COM-04",
    embedUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Dialogue_franz_greta_1.ogg",
    mp3Url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/20/Dialogue_franz_greta_1.ogg/Dialogue_franz_greta_1.ogg.mp3",
  },
  {
    id: "los1-c02-wb-original-dialogue", version: "1.0.0", kind: "dialogue",
    sourceId: "M-WB-01", turns: LOS1_C02_WB_ORIGINAL_TURNS.map(row => ({ ...row })),
  },
  {
    id: "los1-c02-wb-original-followup", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Greta kertoo oman nimensä lauseessa Ich heiße Greta. "
      + "Lisäksi hän sanoo er heißt Herr Weiß, 'hänen nimensä on herra Weiß'. "
      + "Franz kysyy nimeä muodolla Wie heißt du?, ja hyvästely on Bis dann! "
      + "Alkuperäinen teksti sisältää myös vointikysymyksen ja opettajan tuntemista koskevan kysymyksen. "
      + "Älä yritä opetella niitä vielä itsenäiseen tuottamiseen. "
      + "Kirjassa voi tutkia myös Lenan ja Benin erillistä LOS!:n omaa opetuskeskustelua, "
      + "mutta se ei ole tämä alkuperäislähde.",
  },
];

const starter={version:"0.1.0",difficulty:"guided" as const,
  objectives:["L1-INT-02","L1-READ-01"]};
export const LOS1_C02_WB_EXERCISES: Exercise[] = [
  {
    ...starter,id:"los1-c02-wb-greta-name",type:"single-choice",
    promptFi:"Mitä Greta kertoo alkuperäisen dialogin toisessa repliikissä?",
    options:[
      {id:"greta",label:"Hänen nimensä on Greta."},
      {id:"franz",label:"Hänen nimensä on Franz."},
      {id:"peter",label:"Hänen nimensä on Peter."},
    ],
    correctOptionId:"greta",
    explanationFi:"Greta sanoo Ich heiße Greta.",
  },
  {
    ...starter,id:"los1-c02-wb-teacher",type:"single-choice",
    promptFi:"Kuka on alkuperäisen Franz–Greta-tekstin opettaja?",
    options:[
      {id:"weisz",label:"Herr Weiß"},
      {id:"weber",label:"Herr Weber"},
      {id:"schwarz",label:"Herr Schwarz"},
    ],
    correctOptionId:"weisz",
    explanationFi:"Greta sanoo Ja, er heißt Herr Weiß. ",
  },
  {
    ...starter,id:"los1-c02-wb-farewell",type:"single-choice",
    promptFi:"Minkä hyvästelyn Franz sanoo alkuperäisessä Franz–Greta-dialogissa?",
    options:[
      {id:"bis-dann",label:"Bis dann!"},
      {id:"gute-nacht",label:"Gute Nacht!"},
      {id:"bis-gleich",label:"Bis gleich!"},
    ],
    correctOptionId:"bis-dann",
    explanationFi:"Franz sanoo Bis dann! ja Greta vastaa Wiedersehen!",
  },
  {
    ...starter,id:"los1-c02-wb-highlight",type:"highlight",
    blockId:"los1-c02-wb-original-dialogue",
    promptFi:"Korosta koko alkuperäisestä dialogista lause Ich heiße Greta.",
    text: LOS1_C02_WB_ORIGINAL_TEXT,
    acceptedRanges:[{start:quoteStart,end:quoteStart+quote.length}],
    explanationFi:"Lause Ich heiße Greta. on Gretan oman nimen kertova repliikki.",
  },
];
