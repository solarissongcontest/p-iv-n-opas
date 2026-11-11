/** Original LOS! 1 C01 tasks and explanations.
 * They are newly authored Finnish teaching content, not claimed to be
 * human-originated authentic source texts or excerpts from external books.
 */
import type { ContentBlock, Exercise } from "./model";

export const LOS1_C01_APPLICATION_BLOCKS: ContentBlock[] = [
  {
    id: "los1-c01-application-intro", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Nyt käytät saksaa itse. Kuvittele, että tervehdit tuttavaa aamulla "
      + "ja hyvästelet hänet hetken päästä. Kirjoita kaksi tai kolme lyhyttä ilmausta. "
      + "Tässä ei vielä tarvitse esitellä itseäsi eikä taivuttaa saksan verbejä. "
      + "Tarkista lopuksi oma työsi mallin avulla.",
  },
  {
    id: "los1-c01-application-writing", version: "0.1.0", kind: "production",
    titleFi: "Oma tervehdys ja hyvästely",
    promptFi: "Kirjoita saksaksi aamun tervehdys ja yksi hyvästely. "
      + "Voit yhdistää kaksi fraasia esimerkiksi huutomerkeillä. "
      + "Tämän tehtävän vastauksen oikeellisuutta ei päätellä automaattisesti.",
    modelDe: "Guten Morgen! Bis später!",
    modelFi: "Hyvää huomenta! Nähdään myöhemmin!",
    criteriaFi: [
      "Kirjoitin yhden tilanteeseen sopivan tervehdyksen.",
      "Kirjoitin yhden tilanteeseen sopivan hyvästelyn.",
      "Tarkistin erikoismerkit, alkukirjaimet ja huutomerkit.",
    ],
  },
];

export const LOS1_C01_CULTURE_BLOCKS: ContentBlock[] = [
  {
    id: "los1-c01-culture-greetings", version: "0.1.0", kind: "paragraph", language: "fi",
    sourceId: "GOETHE-REGIONAL-GREETINGS-01",
    text: "Saksaa puhutaan monella alueella, eikä kaikkialla tervehditä samalla tavalla. "
      + "Pohjois-Saksassa kuulee usein Moin-tervehdyksen. Se ei tarkoita vain 'hyvää huomenta', "
      + "vaan sitä käytetään myös muina vuorokaudenaikoina. Etelä-Saksassa ja Itävallassa voi "
      + "kuulla esimerkiksi ilmauksen Grüß Gott tai Servus. Servus voi olla myös hyvästely. "
      + "Nämä ovat tunnistettavia alueellisia vaihtoehtoja, eivät C01-kappaleen pakollista "
      + "aktiivista sanastoa. Kun et tiedä, mikä alueellinen ilmaus sopisi, yleinen Guten Tag "
      + "tai tilanteesta riippuen Hallo on turvallinen alkeisvaiheen vaihtoehto.",
  },
  {
    id: "los1-c01-culture-comparison", version: "0.1.0", kind: "table",
    headers: ["Ilmaus", "Missä kuulet sitä?", "Opiskelutavoite"],
    rows: [
      ["Hallo", "Yleinen arkinen tervehdys", "Harjoittele käyttöä"],
      ["Guten Tag", "Yleinen päivätervehdys", "Harjoittele käyttöä"],
      ["Moin", "Lähtöisin Pohjois-Saksasta, nykyään muuallakin", "Riittää, että tunnistat"],
      ["Grüß Gott", "Etenkin Etelä-Saksa ja Itävalta", "Riittää, että tunnistat"],
      ["Servus", "Muun muassa Baijeri ja Itävalta", "Riittää, että tunnistat"],
    ],
  },
  {
    id: "los1-c01-culture-summary", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Kuuntelu B:ssä kuulet myös alueellisia tervehdyksiä. "
      + "Kappaleen ensimmäisessä testissä riittää tavallisten fraasien osaaminen; "
      + "alueelliset muodot jäävät toistaiseksi tunnistamisen tasolle. "
      + "Tämä suomenkielinen katsaus on LOS!:n oma selitys. "
      + "Sen alueellisuutta koskevat faktat on tarkistettu Goethe-Institutin kielimateriaalista.",
  },
];

const base = { version: "0.1.0", objectives: ["L1-INT-01"], difficulty: "guided" as const };

export const LOS1_C01_EXTRA_EXERCISES: Exercise[] = [
  {
    ...base, id: "los1-c01-read-speakers", type: "single-choice",
    promptFi: "Kuinka moni henkilö puhuu Text A:n alkuperäisessä keskustelussa?",
    options: [
      { id: "one", label: "Yksi" }, { id: "two", label: "Kaksi" }, { id: "three", label: "Kolme" },
    ],
    correctOptionId: "two",
    explanationFi: "Alkuperäisessä keskustelussa vuorottelevat Franz ja Jörg.",
  },
  {
    ...base, id: "los1-c01-read-last-speaker", type: "single-choice",
    promptFi: "Kumpi alkuperäisen Text A:n puhujista sanoo viimeisen hyvästelyn Tschüss?",
    options: [{ id: "franz", label: "Franz" }, { id: "joerg", label: "Jörg" }],
    correctOptionId: "joerg",
    explanationFi: "Jörg sanoo alkuperäisen keskustelun viimeisen repliikin Tschüss!.",
  },
  {
    ...base, id: "los1-c01-audio-last-expression", type: "single-choice",
    promptFi: "Mikä ilmaus on 28 sekunnin alkuperäisen Text B -äänitteen viimeisenä?",
    options: [
      { id: "nacht", label: "Gute Nacht!" },
      { id: "hallo", label: "Hallo!" },
      { id: "servus", label: "Servus!" },
    ],
    correctOptionId: "nacht",
    explanationFi: "Äänitteen viimeinen tervehdys- ja hyvästelyluettelon ilmaus on Gute Nacht!.",
  },
  {
    ...base, id: "los1-c01-audio-short-morning", type: "single-choice",
    promptFi: "Mikä on Text B -äänitteessä käytetty lyhyt muoto ilmauksesta Guten Morgen?",
    options: [
      { id: "tag", label: "Tag!" },
      { id: "morgen", label: "Morgen!" },
      { id: "tschuss", label: "Tschüss!" },
    ],
    correctOptionId: "morgen",
    explanationFi: "Äänitteessä on sekä Guten Morgen! että lyhyempi Morgen!.",
  },
  {
    ...base, id: "los1-c01-grammar-w", type: "single-choice",
    promptFi: "Mitä suomen äännettä saksan w yleensä muistuttaa?",
    options: [{ id: "v", label: "v" }, { id: "p", label: "p" }, { id: "ts", label: "ts" }],
    correctOptionId: "v",
    explanationFi: "Saksan w ääntyy tavallisesti suomen v-äänteen tapaan.",
  },
  {
    ...base, id: "los1-c01-grammar-ei", type: "single-choice",
    promptFi: "Minkä äänneyhdistelmän saksan ei yleensä muodostaa?",
    options: [{ id: "ii", label: "ii" }, { id: "ai", label: "ai" }, { id: "ei", label: "ei" }],
    correctOptionId: "ai",
    explanationFi: "Saksan ei ääntyy suunnilleen ai; esimerkiksi nein.",
  },
  {
    ...base, id: "los1-c01-grammar-ie", type: "single-choice",
    promptFi: "Millaisena saksan ie yleensä ääntyy?",
    options: [{ id: "long-i", label: "Pitkänä i-äänteenä" }, { id: "e", label: "e-äänteenä" }, { id: "ai", label: "ai-äänteenä" }],
    correctOptionId: "long-i",
    explanationFi: "Saksan ie ääntyy yleensä pitkänä i:nä; esimerkiksi Sie ja wie.",
  },
  {
    ...base, id: "los1-c01-grammar-ss", type: "single-choice",
    promptFi: "Mitä äännettä ß-kirjain vastaa?",
    options: [{ id: "ts", label: "ts" }, { id: "s", label: "Soinnitonta s-äännettä" }, { id: "v", label: "v" }],
    correctOptionId: "s",
    explanationFi: "ß edustaa soinnitonta s-äännettä.",
  },
  {
    ...base, id: "los1-c01-grammar-night", type: "single-choice",
    promptFi: "Onko Gute Nacht tavallinen tervehdys silloin, kun saavut iltavierailulle?",
    options: [
      { id: "yes", label: "Kyllä, se vastaa Guten Abend -tervehdystä." },
      { id: "no", label: "Ei. Se liittyy tavallisesti hyvän yön toivotukseen." },
    ],
    correctOptionId: "no",
    explanationFi: "Gute Nacht on hyvän yön toivotus. Saapuessasi illalla käytät tavallisesti Guten Abend!.",
  },
  {
    ...base, id: "los1-c01-practice-short", type: "gap-fill",
    promptFi: "Tervehdi tuttavaa arkisesti: kirjoita puuttuva sana.",
    sentenceBefore: "", sentenceAfter: "!", acceptedAnswers: ["Hallo"],
    explanationFi: "Hallo! on tavallinen epämuodollinen tervehdys.",
  },
  {
    ...base, id: "los1-c01-practice-formal", type: "single-choice",
    promptFi: "Olet hyvästelemässä opettajaa kohteliaasti. Mikä ilmaus sopii?",
    options: [
      { id: "nacht", label: "Gute Nacht!" },
      { id: "wiedersehen", label: "Auf Wiedersehen!" },
      { id: "morgen", label: "Guten Morgen!" },
    ],
    correctOptionId: "wiedersehen",
    explanationFi: "Auf Wiedersehen! on kohtelias hyvästely. Tschüss sopii tutumpaan tilanteeseen.",
  },
  {
    ...base, id: "los1-c01-practice-thanks", type: "matching",
    promptFi: "Yhdistä tavalliset alkeisilmaukset niiden merkityksiin.",
    left: [
      { id: "hallo", label: "Hallo" }, { id: "danke", label: "Danke" },
      { id: "bitte", label: "Bitte" }, { id: "ja", label: "Ja" },
    ],
    right: [
      { id: "yes", label: "Kyllä" }, { id: "please", label: "Ole hyvä" },
      { id: "hello", label: "Hei" }, { id: "thanks", label: "Kiitos" },
    ],
    pairs: [
      { leftId: "hallo", rightId: "hello" }, { leftId: "danke", rightId: "thanks" },
      { leftId: "bitte", rightId: "please" }, { leftId: "ja", rightId: "yes" },
    ],
    explanationFi: "Hallo = hei, Danke = kiitos, Bitte = ole hyvä ja Ja = kyllä.",
  },
  {
    ...base, id: "los1-c01-culture-moin", type: "single-choice",
    promptFi: "Missä Moin on erityisen perinteinen tervehdys?",
    options: [
      { id: "north", label: "Pohjois-Saksassa" },
      { id: "south", label: "Vain Etelä-Saksassa" },
      { id: "none", label: "Se ei ole saksankielinen ilmaus" },
    ],
    correctOptionId: "north",
    explanationFi: "Moin on perinteisesti pohjoissaksalainen tervehdys, nykyään tunnettu muuallakin.",
  },
  {
    ...base, id: "los1-c01-culture-servus", type: "single-choice",
    promptFi: "Mitä Servus voi tarkoittaa eri tilanteissa?",
    options: [
      { id: "both", label: "Sekä tervehdystä että hyvästelyä" },
      { id: "only-yes", label: "Vain sanaa kyllä" },
      { id: "only-night", label: "Vain hyvää yötä" },
    ],
    correctOptionId: "both",
    explanationFi: "Servus on muun muassa eteläisten saksankielisten alueiden tuttu tervehdys, joka voi tarkoittaa myös hyvästelyä.",
  },
];
