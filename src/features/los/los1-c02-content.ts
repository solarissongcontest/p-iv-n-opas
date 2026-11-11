/** LOS! 1 chapter C02: editorially original introductory dialogue and learning.
 *
 * The six-replica Wikibooks M-WB-01 primary source is in the source manifest,
 * but its full quoted transcription has NOT been imported here. This Text A
 * is original LOS! content with other characters, NOT attributed to Wikibooks.
 * M-COM-02 is a separate complete 4-turn CC BY-SA 3.0 original by Ariser.
 * The lesson intentionally leaves "Wir kommen ...", nationality, and the
 * country grammar for C03; learners need only detect personal names in audio.
 */
import type { ContentBlock, Exercise } from "./model";
import { ariserTranscript } from "./los1-authentic-ariser.ts";

export const LOS1_C02_EDITORIAL_TURNS = [
  { speaker: "Lena", text: "Hallo! Ich heiße Lena. Wie heißt du?", translationFi: "Hei! Minun nimeni on Lena. Mikä sinun nimesi on?" },
  { speaker: "Ben", text: "Hallo, Lena. Ich heiße Ben.", translationFi: "Hei, Lena. Minun nimeni on Ben." },
  { speaker: "Lena", text: "Freut mich, Ben!", translationFi: "Hauska tutustua, Ben!" },
  { speaker: "Ben", text: "Freut mich auch. Wer ist das?", translationFi: "Samoin. Kuka tuo on?" },
  { speaker: "Lena", text: "Das ist Frau Weiß.", translationFi: "Tuo on rouva Weiß." },
  { speaker: "Ben", text: "Und wer ist das?", translationFi: "Ja kuka tuo on?" },
  { speaker: "Lena", text: "Das ist Herr Weber.", translationFi: "Tuo on herra Weber." },
  { speaker: "Ben", text: "Danke, Lena. Bis später!", translationFi: "Kiitos, Lena. Nähdään myöhemmin!" },
] as const;
export const LOS1_C02_EDITORIAL_TEXT = LOS1_C02_EDITORIAL_TURNS.map(turn => turn.text).join("\n");

export const LOS1_C02_BLOCKS: ContentBlock[] = [
  {
    id: "los1-c02-intro", kind: "paragraph", version: "0.1.0", language: "fi",
    text: "Osaat jo tervehtiä ja hyvästellä. Seuraava askel on kertoa oma nimi ja kysyä toisen nimi. "
      + "Tämän kappaleen tavoitteet ovat Wie heißt du?, Ich heiße … sekä minä–sinä-muodot ich bin ja du bist. "
      + "Kuuntelutekstistä saat etsiä tuttuja nimiä, vaikka kaikkia muita sanoja ei vielä opeteta.",
  },
  {
    id: "los1-c02-text-a-guide", kind: "paragraph", version: "0.1.0", language: "fi",
    text: "Lue nyt lisäksi LOS!:n oma kahdeksan repliikin opetuskeskustelu. "
      + "Se on toimituksen kirjoittama lisäesimerkki, ei Wikibooksin alkuperäinen kuuden repliikin pääteksti. "
      + "Avaa suomennokset vain silloin, kun niitä tarvitset. Etsi erityisesti ich heiße, wie heißt du ja das ist.",
  },
  {
    id: "los1-c02-text-a-editorial", kind: "dialogue", version: "0.1.0",
    sourceId: "LOS-EDITORIAL-C02",
    turns: LOS1_C02_EDITORIAL_TURNS.map(turn => ({ ...turn })),
  },
  {
    id: "los1-c02-source-status", kind: "paragraph", version: "0.1.0", language: "fi",
    text: "Wikibooksin Franzin ja Gretan aito kuusirepliikkinen päädialogi on nyt kokonaan "
      + "saksaksi sekä erillisellä public domain -äänitteellä kappaleen alussa. "
      + "Tämä Lenan ja Benin lisäteksti on LOS!:n itse kirjoittama opetuskeskustelu. "
      + "Kummankin lähteen alkuperä ja käyttöoikeudet näytetään erikseen kirjan Lähteet-osiossa.",
  },
  {
    id: "los1-c02-grammar-heissen", kind: "grammar", version: "0.1.0",
    title: "Wie heißt du? · Nimen kysyminen",
    explanationFi: "Saksan heißen tarkoittaa tässä yhteydessä 'olla nimeltään'. "
      + "Ich heiße on 'minun nimeni on', du heißt on 'sinun nimesi on'. "
      + "Kysymys Wie heißt du? tarkoittaa 'mikä sinun nimesi on?'. "
      + "Huomaa, että kysymyksessä wie tulee ensin, sitten heißt ja lopuksi du. "
      + "Ich bin Lena tarkoittaa 'olen Lena' ja Ich heiße Lena 'nimeni on Lena'. "
      + "Kumpikin voi esitellä puhujan, mutta verbien merkitykset eivät ole samat. "
      + "Er heißt ja sie heißt riittää tässä vaiheessa vain tunnistaa. "
      + "Älä vielä opettele kaikkia persoonataivutuksia.",
    examples: [
      { de: "Ich heiße Lena.", fi: "Minun nimeni on Lena." },
      { de: "Wie heißt du?", fi: "Mikä sinun nimesi on?" },
      { de: "Du heißt Ben.", fi: "Sinun nimesi on Ben." },
      { de: "Er heißt Ben.", fi: "Hänen nimensä on Ben (miehestä)." },
      { de: "Sie heißt Lena.", fi: "Hänen nimensä on Lena (naisesta)." },
    ],
  },
  {
    id: "los1-c02-grammar-sein", kind: "grammar", version: "0.1.0",
    title: "Ich bin, du bist · Olen ja olet",
    explanationFi: "Sein on saksan olla-verbi. Sen kaksi ensimmäistä persoonamuotoa ovat "
      + "ich bin (minä olen) ja du bist (sinä olet). "
      + "Er ist ja sie ist ('hän on') opetellaan nyt vain tunnistamaan. "
      + "Lauseen tavallinen perusrakenne on subjekti + taipunut verbi: Ich bin Ben. "
      + "Kysymyksessä verbi voi tulla ensimmäiseksi: Bist du Ben? "
      + "Myös nimi voidaan kysyä tutulla ilmauksella Wie heißt du?",
    examples: [
      { de: "Ich bin Lena.", fi: "Minä olen Lena." },
      { de: "Du bist Ben.", fi: "Sinä olet Ben." },
      { de: "Bist du Ben?", fi: "Oletko sinä Ben?" },
      { de: "Das ist Frau Weiß.", fi: "Tuo on rouva Weiß." },
      { de: "Er ist Ben.", fi: "Hän on Ben." },
    ],
  },
  {
    id: "los1-c02-grammar-mini-table", kind: "table", version: "0.1.0",
    headers: ["Persoona", "heißen", "sein", "Tavoite"],
    rows: [
      ["ich", "heiße", "bin", "Käytä itse"],
      ["du", "heißt", "bist", "Käytä itse"],
      ["er / sie", "heißt", "ist", "Tunnista tekstistä"],
    ],
  },
  {
    id: "los1-c02-words", kind: "vocabulary", version: "0.1.0",
    entries: ([
      ["heißen", "olla nimeltään", "perusmuoto, nimiä kysyttäessä"],
      ["ich heiße", "minun nimeni on", "aktiivinen ilmaus"],
      ["du heißt", "sinun nimesi on", "aktiivinen ilmaus"],
      ["wie heißt du?", "mikä sinun nimesi on?", "tuttu puhekielen kysymys"],
      ["mein Name", "minun nimeni", "tunnista, älä vielä taivuta"],
      ["der Name", "nimi", "substantiivi, alkuun riittää tunnistaa"],
      ["bin", "olen", "ich bin"],
      ["bist", "olet", "du bist"],
      ["ist", "on", "er / sie / das ist, tunnista"],
      ["das ist …", "tuo on …", "esittelyfraasi"],
      ["und", "ja", "liittää asioita"],
      ["wer", "kuka", "kysymyksissä"],
      ["wer ist das?", "kuka tuo on?", "tunnista ja kokeile"],
      ["freut mich", "hauska tutustua", "fraasi kokonaisuutena"],
      ["der Herr", "herra", "esimerkiksi Herr Weber"],
      ["die Frau", "rouva / nainen", "esimerkiksi Frau Weiß"],
    ] as const).map(([de, fi, note], index) => ({
      id: "los1-c02-word-" + String(index + 1).padStart(2, "0"), de, fi, note,
    })),
  },
  {
    id: "los1-c02-text-b-guide", kind: "paragraph", version: "0.1.0", language: "fi",
    text: "Kuuntele 12 sekunnin aito dialogi. Ariserin äänessä Thomas, Takashi ja Peter mainitaan nimeltä. "
      + "Sinulle riittää tässä kappaleessa nimien tunnistaminen ja ilmausten Wie heißt du? sekä Ich heiße … "
      + "poimiminen. Äänitteessä puhutaan myös Berliinistä, Kiotosta ja kansallisuudesta: "
      + "ne opitaan vasta C03:ssa. Tämän äänitteen tarkka lisenssi on CC BY-SA 3.0. "
      + "Äänite toistetaan suoraan Wikimedia Commonsista. Verkkotoistoa oikeilla laitteilla ei ole vielä testattu.",
  },
  {
    id: "los1-c02-commons-02-audio", kind: "media", version: "0.1.0",
    mediaType: "audio",
    sourceId: "M-COM-02",
    title: "Thomas, Takashi ja Peter · alkuperäisäänite (12 s)",
    embedUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Deutsch_Dialog_._Ich_bin_Peter.ogg",
  },
  ariserTranscript("los1-c02-m-com-02-dialogue"),
  {
    id: "los1-c02-text-b-support", kind: "paragraph", version: "0.2.0", language: "fi",
    text: "Koko Ariserin nelirepliikkinen alkuperäinen saksankielinen keskustelu on nyt luettavissa yllä, "
      + "myös sen repliikkikohtaiset suomennokset. C02:n tavoitteena on vielä tunnistaa nimet ja kysymys "
      + "Wie heißt du?. Ich komme aus Kyoto ja Wir kommen aus Berlin liittyvät seuraavan C03-kappaleen "
      + "kotipaikka- ja alkuperäilmaisuun, eivät C02:n pakolliseen kielioppiosaamiseen.",
  },
  {
    id: "los1-c02-application-guide", kind: "paragraph", version: "0.1.0", language: "fi",
    text: "Kerro oma nimesi. Voit käyttää nimeäsi tai keksittyä nimeä. "
      + "Kirjoita kaksi lyhyttä lausetta ja yksi nimikysymys. "
      + "LOS! säilyttää oman tekstisi, mutta sen oikeellisuutta ei pisteytetä automaattisesti. "
      + "Tutki mallia vasta oman yrityksen jälkeen.",
  },
  {
    id: "los1-c02-production", kind: "production", version: "0.1.0",
    titleFi: "Esittele itsesi ja kysy toisen nimi",
    promptFi: "Kirjoita vähintään kaksi lausetta ja yksi kysymys. "
      + "Esimerkiksi aloita tervehdyksellä, kerro nimesi ja kysy toisen nimeä.",
    modelDe: "Hallo! Ich heiße Lena. Ich bin Lena. Wie heißt du?",
    modelFi: "Hei! Minun nimeni on Lena. Minä olen Lena. Mikä sinun nimesi on?",
    criteriaFi: [
      "Kirjoitin tervehdyksen ja lauseen Ich heiße … tai Ich bin …",
      "Kysyin toisen nimeä: Wie heißt du?",
      "Tarkistin pienet ja isot kirjaimet, heißen-muodon ja kysymysmerkin.",
    ],
  },
  {
    id: "los1-c02-culture", kind: "paragraph", version: "0.1.0", language: "fi",
    text: "Saksaksi nimikysymys käyttää tavallisesti heißen-verbiä: Wie heißt du? "
      + "Sen suora sanasanainen käännös ei ole suomen 'mikä sinun nimesi on?', "
      + "vaikka se tarkoittaa juuri sitä. Saksaksi myös Ich bin … toimii esittäytymisessä. "
      + "Herr ja Frau tulevat sukunimen eteen esimerkiksi Herr Weber tai Frau Weiß. "
      + "Frau ei saksan nykykäytössä tarkoita automaattisesti avioliitossa olevaa naista. "
      + "Tässä kappaleessa vain tunnistetaan kohtelias puhuttelu; sinuttelun du ja "
      + "teitittelyn Sie täysi ero opetetaan C04:ssa.",
  },
];

const base = { version: "0.1.0", difficulty: "guided" as const, objectives: ["L1-INT-02", "L1-GRA-01"] };
export const LOS1_C02_EXERCISES: Exercise[] = [
  {
    ...base, id: "los1-c02-start-name", type: "single-choice",
    promptFi: "Mitä Wie heißt du? tarkoittaa?",
    options: [
      { id: "name", label: "Mikä sinun nimesi on?" },
      { id: "age", label: "Kuinka vanha olet?" },
      { id: "place", label: "Mistä tulet?" },
    ],
    correctOptionId: "name",
    explanationFi: "Wie heißt du? on tavallinen sinuttelumuotoinen nimikysymys.",
  },
  {
    ...base, id: "los1-c02-start-answer", type: "single-choice",
    promptFi: "Miten vastaat, jos nimesi on Lena?",
    options: [
      { id: "lena", label: "Ich heiße Lena." },
      { id: "du", label: "Du heißt Lena." },
      { id: "question", label: "Wie heißt Lena?" },
    ],
    correctOptionId: "lena",
    explanationFi: "Ich heiße Lena. tarkoittaa 'minun nimeni on Lena'.",
  },
  {
    ...base, id: "los1-c02-read-name", type: "single-choice",
    promptFi: "Mikä on Lenan keskustelukumppanin nimi LOS!:n Text A:ssa?",
    options: [{ id: "ben", label: "Ben" }, { id: "peter", label: "Peter" }, { id: "greta", label: "Greta" }],
    correctOptionId: "ben",
    explanationFi: "Lenan kanssa keskustelee Ben.",
  },
  {
    ...base, id: "los1-c02-read-teacher", type: "single-choice",
    promptFi: "Kenen Lena sanoo olevan Frau Weiß?",
    options: [{ id: "ben", label: "Ben" }, { id: "frau", label: "Frau Weiß" }, { id: "herr", label: "Herr Weber" }],
    correctOptionId: "frau",
    explanationFi: "Lena sanoo 'Das ist Frau Weiß'.",
  },
  {
    ...base, id: "los1-c02-read-highlight", type: "highlight",
    blockId: "los1-c02-text-a-editorial",
    promptFi: "Korosta LOS!:n omasta Text A -keskustelusta ensimmäinen 'Wie heißt du?'.",
    text: LOS1_C02_EDITORIAL_TEXT,
    acceptedRanges: [{
      start: LOS1_C02_EDITORIAL_TEXT.indexOf("Wie heißt du?"),
      end: LOS1_C02_EDITORIAL_TEXT.indexOf("Wie heißt du?") + "Wie heißt du?".length,
    }],
    explanationFi: "Wie heißt du? kysyy toisen nimeä. Ensimmäinen kysymys on Lenan ensimmäisessä repliikissä.",
  },
  {
    ...base, id: "los1-c02-name-gap", type: "gap-fill",
    promptFi: "Täydennä minä-muotoinen esittely yhden sanan avulla.",
    sentenceBefore: "Ich", sentenceAfter: "Lena.",
    acceptedAnswers: ["heiße"],
    explanationFi: "Ich heiße Lena. Minun nimeni on Lena.",
  },
  {
    ...base, id: "los1-c02-you-gap", type: "gap-fill",
    promptFi: "Täydennä sinä-muotoinen ilmaus yhden sanan avulla.",
    sentenceBefore: "Du", sentenceAfter: "Ben.",
    acceptedAnswers: ["heißt"],
    explanationFi: "Du heißt Ben. Sinun nimesi on Ben.",
  },
  {
    ...base, id: "los1-c02-bin-gap", type: "gap-fill",
    promptFi: "Täydennä olla-verbi minä-muodossa.",
    sentenceBefore: "Ich", sentenceAfter: "Lena.",
    acceptedAnswers: ["bin"],
    explanationFi: "Ich bin Lena. Minä olen Lena.",
  },
  {
    ...base, id: "los1-c02-bist-gap", type: "gap-fill",
    promptFi: "Täydennä olla-verbi sinä-muodossa.",
    sentenceBefore: "Du", sentenceAfter: "Ben.",
    acceptedAnswers: ["bist"],
    explanationFi: "Du bist Ben. Sinä olet Ben.",
  },
  {
    ...base, id: "los1-c02-verb-choice", type: "single-choice",
    promptFi: "Kumpi vastaa suomen lausetta 'minä olen Lena'?",
    options: [
      { id: "ich-bin", label: "Ich bin Lena." },
      { id: "du-bist", label: "Du bist Lena." },
      { id: "du-heisst", label: "Du heißt Lena." },
    ],
    correctOptionId: "ich-bin",
    explanationFi: "Ich bin Lena. käyttää sein-verbin minä-muotoa.",
  },
  {
    ...base, id: "los1-c02-order-question", type: "word-order",
    promptFi: "Järjestä sanat kysymykseksi: mikä sinun nimesi on?",
    tokens: [
      { id: "du", label: "du?" }, { id: "wie", label: "Wie" }, { id: "heisst", label: "heißt" },
    ],
    correctOrder: ["wie", "heisst", "du"],
    explanationFi: "Nimikysymyksessä järjestys on Wie heißt du?",
  },
  {
    ...base, id: "los1-c02-match-names", type: "matching",
    promptFi: "Yhdistä esittelylauseet niiden merkityksiin.",
    left: [
      { id: "ich-name", label: "Ich heiße Lena." },
      { id: "du-name", label: "Du heißt Ben." },
      { id: "das-ist", label: "Das ist Frau Weiß." },
    ],
    right: [
      { id: "that", label: "Tuo on rouva Weiß." },
      { id: "i", label: "Minun nimeni on Lena." },
      { id: "you", label: "Sinun nimesi on Ben." },
    ],
    pairs: [
      { leftId: "ich-name", rightId: "i" },
      { leftId: "du-name", rightId: "you" },
      { leftId: "das-ist", rightId: "that" },
    ],
    explanationFi: "Ich heiße = minun nimeni on, du heißt = sinun nimesi on, das ist = tuo on.",
  },
  {
    ...base, id: "los1-c02-audio-question", type: "single-choice",
    promptFi: "Mitä kysymystä Ariserin kuunteludialogin alussa käytetään?",
    options: [
      { id: "name", label: "Wie heißt du?" },
      { id: "time", label: "Wie spät ist es?" },
      { id: "age", label: "Wie alt bist du?" },
    ],
    correctOptionId: "name",
    explanationFi: "Kuunteludialogi alkaa nimikysymyksellä Wie heißt du?",
  },
  {
    ...base, id: "los1-c02-audio-person", type: "single-choice",
    promptFi: "Mitkä kolme nimeä esiintyvät Ariserin alkuperäisäänitteessä?",
    options: [
      { id: "correct", label: "Thomas, Takashi ja Peter" },
      { id: "wrong1", label: "Lena, Ben ja Greta" },
      { id: "wrong2", label: "Franz, Jörg ja Herr Weiß" },
    ],
    correctOptionId: "correct",
    explanationFi: "Ariserin alkuperäisessä dialogissa mainitaan Thomas, Takashi ja Peter.",
  },
  {
    ...base, id: "los1-c02-audio-select", type: "multiple-choice",
    promptFi: "Valitse kaikki Ariserin dialogissa esiintyvät nimet.",
    options: [
      { id: "takashi", label: "Takashi" }, { id: "franz", label: "Franz" },
      { id: "thomas", label: "Thomas" }, { id: "peter", label: "Peter" },
    ],
    correctOptionIds: ["takashi", "thomas", "peter"],
    explanationFi: "Tässä äänitteessä nimet ovat Takashi, Thomas ja Peter.",
  },
  {
    ...base, id: "los1-c02-culture-true", type: "true-false",
    promptFi: "Onko seuraava väite tosi vai epätosi?",
    statement: "Saksan Frau voi olla naisen puhuttelumuoto riippumatta avioliitosta.",
    correctValue: true,
    explanationFi: "Frau sopii esimerkiksi sukunimen kanssa riippumatta naisen siviilisäädystä.",
  },
  {
    ...base, id: "los1-c02-practice-order", type: "word-order",
    promptFi: "Järjestä lause 'Minun nimeni on Lena'.",
    tokens: [{ id: "lena", label: "Lena." }, { id: "ich", label: "Ich" }, { id: "heisse", label: "heiße" }],
    correctOrder: ["ich", "heisse", "lena"],
    explanationFi: "Ich heiße Lena. on saksankielinen esittely.",
  },
  {
    ...base, id: "los1-c02-practice-category", type: "categorize",
    promptFi: "Lajittele verbin muodot minun ja sinun muotoon.",
    items: [
      { id: "heisse", label: "heiße" }, { id: "bist", label: "bist" },
      { id: "bin", label: "bin" }, { id: "heisst", label: "heißt" },
    ],
    categories: [{ id: "ich", label: "ich" }, { id: "du", label: "du" }],
    assignments: [
      { itemId: "heisse", categoryId: "ich" },
      { itemId: "bist", categoryId: "du" },
      { itemId: "bin", categoryId: "ich" },
      { itemId: "heisst", categoryId: "du" },
    ],
    explanationFi: "ich heiße, ich bin; du heißt, du bist.",
  },
  {
    ...base, id: "los1-c02-name-question", type: "gap-fill",
    promptFi: "Kirjoita nimen kysymisen puuttuva verbi.",
    sentenceBefore: "Wie", sentenceAfter: "du?",
    acceptedAnswers: ["heißt"],
    explanationFi: "Wie heißt du? on nimikysymys.",
  },
];
