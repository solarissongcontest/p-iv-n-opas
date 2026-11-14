/**
 * C02 Text A. Six-turn dialogue, unchanged from the Wikibooks source.
 * Page revision 4430449 (2 Sep 2024):
 * https://en.wikibooks.org/w/index.php?title=German/Level_I/Wie_heißt_du&oldid=4430449
 * Contributors: Wikibooks contributors. Text: CC BY-SA 4.0.
 * https://creativecommons.org/licenses/by-sa/4.0/
 * The Finnish translations, token explanations and questions are new LOS! material.
 * Sound recordings on the linked page are NOT included or relicensed here.
 * Editorial language review, source QA and device tests remain pending.
 */
export const LOS1_C02_TEXT_VERSION = "1.0.0";
export const LOS1_C02_SOURCE_REVISION = "4430449";
export const LOS1_C02_SOURCE_ID = "M-WB-01";
export const LOS1_C02_LINES = [
  { id: "u01", speaker: "Franz", text: "Hallo, ich bin Franz. Wie heißt du?", meaning: "Hei, olen Franz. Mikä sinun nimesi on?" },
  { id: "u02", speaker: "Greta", text: "Hallo, Franz. Ich heiße Greta. Wie geht's?", meaning: "Hei, Franz. Minun nimeni on Greta. Mitä kuuluu?" },
  { id: "u03", speaker: "Franz", text: "Es geht mir gut. Kennst du den Lehrer?", meaning: "Minulle kuuluu hyvää. Tunnetko opettajan?" },
  { id: "u04", speaker: "Greta", text: "Ja, er heißt Herr Weiß.", meaning: "Kyllä, häntä kutsutaan herra Weißiksi." },
  { id: "u05", speaker: "Franz", text: "Oh, danke, Greta. Bis dann!", meaning: "Ai, kiitos, Greta. Nähdään!" },
  { id: "u06", speaker: "Greta", text: "Wiedersehen!", meaning: "Näkemiin!" },
] as const;

export type LosC02Line = typeof LOS1_C02_LINES[number];
export function losC02Tokens(line: LosC02Line) {
  return (line.text.match(/\S+\s*/gu) ?? []).map((display, index) => ({
    id: LOS1_C02_SOURCE_ID + "-" + line.id + "-t" + index,
    index, display,
    word: display.trim().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,"").toLocaleLowerCase("de"),
  }));
}

/** Passive supporting vocabulary is not a claim that every form is taught in C02. */
export const LOS1_C02_GLOSS: Readonly<Record<string,string>> = {
  hallo: "hei, tavallinen tervehdys",
  ich: "minä",
  bin: "olen; sein-verbin minä-muoto: ich bin",
  franz: "Franz, henkilön etunimi",
  wie: "miten; tässä nimi- tai vointikysymyksen alussa",
  heißt: "on nimeltään / olet nimeltäsi; heißen-verbin sinä- tai hän-muoto asiayhteydestä",
  du: "sinä",
  greta: "Greta, henkilön etunimi",
  heiße: "olen nimeltäni; ich heiße = nimeni on",
  "geht's": "lyhenne sanasta geht es; Wie geht's? = mitä kuuluu?",
  es: "se; Es geht mir gut on kiinteä alkeisilmaus",
  geht: "menee / sujuu; tässä osana vointifraasia",
  mir: "minulle; tunnistustasolla, sijamuotoja ei opeteta tässä",
  gut: "hyvä / hyvin",
  kennst: "tunnet / tiedät; ylimääräinen tukimuoto, ei C02:n aktiivikielioppia",
  den: "määräisen artikkelin muoto; vain tunnistettava tässä",
  lehrer: "opettaja, miespuolista opettajaa tarkoittava sana; der Lehrer",
  ja: "kyllä",
  er: "hän (mies)",
  herr: "herra, sukunimen edellä kohtelias puhuttelu",
  weiß: "Weiß, henkilön sukunimi; myös sana weiß voi tarkoittaa tiedän tai valkoinen muissa yhteyksissä",
  oh: "ai / voi",
  danke: "kiitos",
  bis: "asti; Bis dann! on kokonainen hyvästely",
  dann: "sitten; Bis dann! = nähdään!",
  wiedersehen: "(Auf) Wiedersehen! = näkemiin; alkuperäisen tekstin lyhyt muoto säilytetty",
};
export type LosC02Question = {
  id: string;
  prompt: string;
  options: readonly { id:string; text:string }[];
  correctId: string;
  feedback: string;
};
export const LOS1_C02_QUESTIONS: readonly LosC02Question[] = [
  {
    id:"C02-SOURCE-Q01", prompt:"Miten Greta kertoo nimensä?",
    options:[{id:"a",text:"Ich heiße Greta."},{id:"b",text:"Du bist Greta."},{id:"c",text:"Sie heißt Franz."}],
    correctId:"a",feedback:"Greta sanoo Ich heiße Greta. Heiße on heißen-verbin minä-muoto.",
  },
  {
    id:"C02-SOURCE-Q02", prompt:"Mitä Franz kysyy esittäydyttyään?",
    options:[{id:"a",text:"Kuinka vanha olet?"},{id:"b",text:"Mikä sinun nimesi on?"},{id:"c",text:"Mistä tulet?"}],
    correctId:"b",feedback:"Wie heißt du? tarkoittaa Mikä sinun nimesi on?",
  },
  {
    id:"C02-SOURCE-Q03", prompt:"Mikä on tekstissä mainitun opettajan sukunimi?",
    options:[{id:"a",text:"Weiß"},{id:"b",text:"Greta"},{id:"c",text:"Schmidt"}],
    correctId:"a",feedback:"Greta sanoo er heißt Herr Weiß. Herr on kohtelias puhuttelu ennen sukunimeä.",
  },
  {
    id:"C02-SOURCE-Q04", prompt:"Miten Franz hyvästelee Gretan?",
    options:[{id:"a",text:"Gute Nacht!"},{id:"b",text:"Bis dann!"},{id:"c",text:"Guten Morgen!"}],
    correctId:"b",feedback:"Bis dann! tarkoittaa nähdään. Ilmausta ei tarvitse vielä analysoida sanasta sanaan.",
  },
];
