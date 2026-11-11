import { LOS_C03_C06_EXERCISES } from "./exerciseBankExpanded.ts";
import { LOS_C07_C10_EXERCISES } from "./exerciseBankFinal.ts";

/**
 * LOS! 1:n rajatusti, yksiselitteisesti tarkistettavat alkeistehtävät.
 * Itse kirjoitettu opetusaineisto, ei alkuperäistekstin ymmärtämistehtävien
 * korvike. Kielioppivastaukset koskevat vain opetettuja muotoja.
 */
export type LosExercise = {
  id: string;
  chapterId: string;
  skill: "tervehtiminen" | "ääntäminen" | "sanasto" | "esittäytyminen" | "kielioppi" | "alkuperä" | "puhuttelu" | "kuulumiset" | "numerot" | "tavaaminen" | "selviytyminen" | "ajanilmaukset" | "kertaus";
  kind: "choice" | "fill";
  prompt: string;
  instruction: string;
  options?: readonly string[];
  correct: string;
  accepted: readonly string[];
  explanation: string;
};

export const LOS_EXERCISES: ReadonlyArray<LosExercise> = [
  {id:"C01-EX-01",chapterId:"01",skill:"tervehtiminen",kind:"choice",instruction:"Valitse sopiva saksankielinen tervehdys.",prompt:"Tapaat opettajan aamulla.",options:["Guten Abend!","Guten Morgen!","Tschüss!"],correct:"Guten Morgen!",accepted:["Guten Morgen!"],explanation:"Morgen tarkoittaa aamua. Guten Morgen! on aamun tervehdys."},
  {id:"C01-EX-02",chapterId:"01",skill:"tervehtiminen",kind:"choice",instruction:"Valitse sopiva saksankielinen tervehdys.",prompt:"Tulet koululle keskellä päivää.",options:["Gute Nacht!","Guten Tag!","Auf Wiedersehen!"],correct:"Guten Tag!",accepted:["Guten Tag!"],explanation:"Guten Tag! on yleinen päivätervehdys."},
  {id:"C01-EX-03",chapterId:"01",skill:"tervehtiminen",kind:"choice",instruction:"Valitse sopiva saksankielinen tervehdys.",prompt:"Saavut tapaamiseen illalla.",options:["Guten Abend!","Guten Morgen!","Tschüss!"],correct:"Guten Abend!",accepted:["Guten Abend!"],explanation:"Abend tarkoittaa iltaa."},
  {id:"C01-EX-04",chapterId:"01",skill:"tervehtiminen",kind:"choice",instruction:"Valitse sopiva hyvästely.",prompt:"Hyvästelet tutun ystävän rennosti.",options:["Guten Tag!","Tschüss!","Guten Morgen!"],correct:"Tschüss!",accepted:["Tschüss!"],explanation:"Tschüss! on tavallinen tuttavallinen hyvästely."},
  {id:"C01-EX-05",chapterId:"01",skill:"tervehtiminen",kind:"choice",instruction:"Valitse sopiva hyvästely.",prompt:"Hyvästelet kohteliaasti henkilön virallisessa tilanteessa.",options:["Auf Wiedersehen!","Hallo!","Gute Nacht!"],correct:"Auf Wiedersehen!",accepted:["Auf Wiedersehen!"],explanation:"Auf Wiedersehen! sopii erityisesti kohteliaaseen hyvästelyyn."},
  {id:"C01-EX-06",chapterId:"01",skill:"tervehtiminen",kind:"choice",instruction:"Valitse tilanteeseen sopiva ilmaus.",prompt:"Toivotat hyvää yötä nukkumaan menevälle.",options:["Guten Abend!","Guten Tag!","Gute Nacht!"],correct:"Gute Nacht!",accepted:["Gute Nacht!"],explanation:"Gute Nacht! on hyvän yön toivotus, ei tavallinen illalla tervehtiminen."},
  {id:"C01-EX-07",chapterId:"01",skill:"sanasto",kind:"choice",instruction:"Valitse oikea suomennos.",prompt:"Mitä Danke! tarkoittaa?",options:["Kiitos!","Näkemiin!","Anteeksi!"],correct:"Kiitos!",accepted:["Kiitos!"],explanation:"Danke! tarkoittaa kiitos."},
  {id:"C01-EX-08",chapterId:"01",skill:"sanasto",kind:"choice",instruction:"Valitse oikea suomennos.",prompt:"Mitä Bitte! voi tarkoittaa vastauksena kiitokseen?",options:["Ole hyvä!","Hyvää yötä!","Mistä olet?"],correct:"Ole hyvä!",accepted:["Ole hyvä!"],explanation:"Bitte! on monikäyttöinen fraasi. Kiitokseen vastatessa sen merkitys on ole hyvä."},
  {id:"C01-EX-09",chapterId:"01",skill:"ääntäminen",kind:"choice",instruction:"Valitse oikea ääntämissääntö.",prompt:"Miltä saksan kirjain w yleensä kuulostaa?",options:["Suomen v:ltä","Suomen h:lta","Suomen ts:ltä"],correct:"Suomen v:ltä",accepted:["Suomen v:ltä"],explanation:"Saksan w ääntyy tavallisesti kuten suomen v."},
  {id:"C01-EX-10",chapterId:"01",skill:"ääntäminen",kind:"choice",instruction:"Valitse oikea ääntämissääntö.",prompt:"Miten saksan kirjainyhdistelmä ei yleensä ääntyy?",options:["ii","ai","ei kuten suomessa"],correct:"ai",accepted:["ai"],explanation:"Saksan ei ääntyy tavallisesti ai, esimerkiksi mein."},
  {id:"C01-EX-11",chapterId:"01",skill:"tervehtiminen",kind:"fill",instruction:"Kirjoita puuttuva saksankielinen sana ilman valmiita vaihtoehtoja.",prompt:"Hyvää päivää! = Guten ____!",correct:"Tag",accepted:["Tag"],explanation:"Guten Tag! on päivätervehdys."},
  {id:"C01-EX-12",chapterId:"01",skill:"tervehtiminen",kind:"fill",instruction:"Kirjoita puuttuva saksankielinen sana ilman valmiita vaihtoehtoja.",prompt:"Näkemiin! = Auf ____!",correct:"Wiedersehen",accepted:["Wiedersehen"],explanation:"Ilmaus on Auf Wiedersehen!"},
  {id:"C02-EX-01",chapterId:"02",skill:"esittäytyminen",kind:"choice",instruction:"Valitse saksankielinen vastine.",prompt:"Nimeni on Greta.",options:["Du heißt Greta.","Ich heiße Greta.","Ich bist Greta."],correct:"Ich heiße Greta.",accepted:["Ich heiße Greta."],explanation:"Ich heiße … = nimeni on …"},
  {id:"C02-EX-02",chapterId:"02",skill:"esittäytyminen",kind:"choice",instruction:"Valitse oikea kysymys.",prompt:"Kysyt tuttavallisessa tilanteessa: Mikä sinun nimesi on?",options:["Wie heißt du?","Woher kommst du?","Wie alt bist du?"],correct:"Wie heißt du?",accepted:["Wie heißt du?"],explanation:"Wie heißt du? kysyy nimeä."},
  {id:"C02-EX-03",chapterId:"02",skill:"kielioppi",kind:"fill",instruction:"Täydennä oikea heißen-muoto.",prompt:"Ich ____ Max.",correct:"heiße",accepted:["heiße"],explanation:"Ich-persoonan muoto on heiße."},
  {id:"C02-EX-04",chapterId:"02",skill:"kielioppi",kind:"fill",instruction:"Täydennä oikea heißen-muoto.",prompt:"Du ____ Mia.",correct:"heißt",accepted:["heißt"],explanation:"Du-persoonan muoto on heißt. Ei *heißst."},
  {id:"C02-EX-05",chapterId:"02",skill:"kielioppi",kind:"fill",instruction:"Täydennä oikea sein-muoto.",prompt:"Ich ____ Greta.",correct:"bin",accepted:["bin"],explanation:"Sein-verbin ich-muoto on bin."},
  {id:"C02-EX-06",chapterId:"02",skill:"kielioppi",kind:"fill",instruction:"Täydennä oikea sein-muoto.",prompt:"Du ____ Max.",correct:"bist",accepted:["bist"],explanation:"Sein-verbin du-muoto on bist."},
  {id:"C02-EX-07",chapterId:"02",skill:"kielioppi",kind:"choice",instruction:"Valitse oikea pronomini.",prompt:"Mikä saksankielinen persoonapronomini tarkoittaa minää?",options:["du","ich","Sie"],correct:"ich",accepted:["ich"],explanation:"Ich tarkoittaa minä."},
  {id:"C02-EX-08",chapterId:"02",skill:"kielioppi",kind:"choice",instruction:"Valitse oikea pronomini.",prompt:"Mikä persoonapronomini tarkoittaa sinää?",options:["ich","er","du"],correct:"du",accepted:["du"],explanation:"Du tarkoittaa sinä."},
  {id:"C02-EX-09",chapterId:"02",skill:"kielioppi",kind:"choice",instruction:"Valitse oikein kirjoitettu muoto.",prompt:"Sinä olet nimeltäsi Mia.",options:["Du heißt Mia.","Du heißst Mia.","Du heissßt Mia."],correct:"Du heißt Mia.",accepted:["Du heißt Mia."],explanation:"Oikea muoto on du heißt, jossa on ß ja pääte -t."},
  {id:"C02-EX-10",chapterId:"02",skill:"esittäytyminen",kind:"choice",instruction:"Valitse oikea merkitys.",prompt:"Mitä Ich bin Greta. tarkoittaa?",options:["Sinun nimesi on Greta.","Minä olen Greta.","Mistä Greta on?"],correct:"Minä olen Greta.",accepted:["Minä olen Greta."],explanation:"Ich bin = minä olen."},
  {id:"C02-EX-11",chapterId:"02",skill:"esittäytyminen",kind:"fill",instruction:"Kirjoita puuttuva saksankielinen sana.",prompt:"Minä olen Max. = Ich ____ Max.",correct:"bin",accepted:["bin"],explanation:"Ich bin Max."},
  {id:"C02-EX-12",chapterId:"02",skill:"esittäytyminen",kind:"fill",instruction:"Kirjoita puuttuva saksankielinen sana.",prompt:"Nimeni on Mia. = Ich ____ Mia.",correct:"heiße",accepted:["heiße"],explanation:"Ich heiße Mia."},
  {id:"C02-EX-13",chapterId:"02",skill:"kielioppi",kind:"choice",instruction:"Valitse oikea kahden verbimuodon pari.",prompt:"Mitkä heißen-verbin muodot vastaavat ich ja du?",options:["heiße / heißt","heißen / heißt","heiße / bist"],correct:"heiße / heißt",accepted:["heiße / heißt"],explanation:"ich heiße, du heißt."},
  {id:"C02-EX-14",chapterId:"02",skill:"kielioppi",kind:"choice",instruction:"Valitse oikea kahden verbimuodon pari.",prompt:"Mitkä sein-verbin muodot vastaavat ich ja du?",options:["ist / sind","bin / bist","bist / bin"],correct:"bin / bist",accepted:["bin / bist"],explanation:"ich bin, du bist."},
  {id:"C02-EX-15",chapterId:"02",skill:"esittäytyminen",kind:"fill",instruction:"Kirjoita kysymyssana.",prompt:"____ heißt du? (Mikä sinun nimesi on?)",correct:"Wie",accepted:["Wie"],explanation:"Wie heißt du?"},
  ...LOS_C03_C06_EXERCISES,
  ...LOS_C07_C10_EXERCISES,
];

/** Sallitut vertailumuunnokset: välilyönnit ja loppupiste/-huuto-/kysymysmerkki.
 * ß, umlautit ja kaikki merkitykselliset kirjaimet säilyvät pakollisina.
 */
export function normalizeLosAnswer(text: string): string {
  return text.normalize("NFC").trim().replace(/\s+/g," ").replace(/[.!?]+$/u,"").trim().toLocaleLowerCase("de");
}
export function losIsCorrect(exercise: LosExercise, response: string): boolean {
  if (!response.trim()) return false;
  const answer = normalizeLosAnswer(response);
  return exercise.accepted.some(form => normalizeLosAnswer(form) === answer);
}
export function losExercisesFor(chapterId: string): ReadonlyArray<LosExercise> {
  return LOS_EXERCISES.filter(item=>item.chapterId===chapterId);
}
export function losScore(chapterId: string, answers: Record<string,string>) {
  const items=losExercisesFor(chapterId);
  return { correct: items.filter(item=>losIsCorrect(item,answers[item.id]??"")).length, total:items.length };
}
