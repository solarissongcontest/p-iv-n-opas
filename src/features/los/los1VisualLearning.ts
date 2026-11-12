/** LOS! 1 source-faithful photo prompts. Every German expression must occur
 * in the existing chapter vocabulary verbatim; this module does not invent
 * dialogue, attribute speech to people in photos, or award study points.
 */
import {LOS_BOOKS} from "./catalog.ts";
export type VisualPlacement="vocabulary"|"culture";
export type Los1VisualLesson={
  chapterId:string;
  placement:VisualPlacement;
  question:string;
  note:string;
  phraseKeys:readonly [string,string,string];
};
export const LOS1_VISUAL_LESSONS:Readonly<Record<string,Los1VisualLesson>>={
 "01":{
  chapterId:"01",placement:"vocabulary",
  question:"Kuvittele, että tapaat tutun. Millä ilmauksella voit tervehtiä ja myöhemmin hyvästellä?",
  note:"Kuvan henkilöt eivät ole oppikirjan Franz ja Jörg. Ilmaukset ovat harjoitusmalleja.",
  phraseKeys:["Hallo!","Guten Tag!","Tschüss!"],
 },
 "02":{
  chapterId:"02",placement:"vocabulary",
  question:"Kuvittele, että esittäydyt uudelle tuttavalle. Miten kysyt hänen nimeään?",
  note:"Kuvan henkilön nimi ei ole tiedossa. Käytä harjoituksessa kuvitteellista nimeä.",
  phraseKeys:["ich heiße","Wie heißt du?","Das ist …"],
 },
 "03":{
  chapterId:"03",placement:"culture",
  question:"Kuvassa on Berliinin katunäkymä. Mitkä tutut sanat liittyvät maahan, kaupunkiin ja paikkaan?",
  note:"Berliini on yksi Saksan kaupungeista. Kuva ei esitä koko DACH-alueen kulttuureja.",
  phraseKeys:["Deutschland","die Stadt","hier"],
 },
 "04":{
  chapterId:"04",placement:"culture",
  question:"Kuva esittää virallista kohtaamista. Miten voisi tervehtiä ja kysyä nimeä kohteliaasti?",
  note:"Kättelystä ei voi päätellä puhuttelutapaa. Malli on yksi mahdollinen kielenkäyttötilanne.",
  phraseKeys:["Sie","Wie heißen Sie?","Guten Tag!"],
 },
 "05":{
  chapterId:"05",placement:"vocabulary",
  question:"Kuvittele ystävien keskustelua. Miten kuulumisia kysytään ja miten kysymys palautetaan?",
  note:"Kuvasta ei voi päätellä kenenkään todellista vointia. Harjoitellaan vain sanoja.",
  phraseKeys:["Wie geht's?","sehr gut","Und dir?"],
 },
 "06":{
  chapterId:"06",placement:"vocabulary",
  question:"Harjoittele kuvitteellisen henkilön iästä kysymistä ja vastaamista.",
  note:"Kuvassa näkyvien henkilöiden ikiä ei päätellä eikä heidän tietojaan kerätä.",
  phraseKeys:["Wie alt bist du?","siebzehn","Ich bin … Jahre alt."],
 },
 "07":{
  chapterId:"07",placement:"culture",
  question:"Kuvassa kirjoitetaan muistikirjaan. Millä sanoilla kysyt kirjoitusasusta ja tavaamisesta?",
  note:"Saksan ä, ö, ü ja ß ovat oikeinkirjoituksessa merkityksellisiä, mutta kuva ei esitä saksankielistä tekstiä.",
  phraseKeys:["schreiben","buchstabieren","der Buchstabe"],
 },
 "08":{
  chapterId:"08",placement:"vocabulary",
  question:"Kuvittele, että asioit tai opiskelet vieraalla kielellä. Mitä sanot, kun et ymmärrä?",
  note:"Tämä on harjoitustilanne. Kuvan ihmiset eivät esitä kirjan alkuperäisdialogia.",
  phraseKeys:["Ich verstehe nicht.","langsamer","Was bedeutet …?"],
 },
 "09":{
  chapterId:"09",placement:"culture",
  question:"Kuva esittää kalenteria. Miten ilmaiset saksaksi päivän ja kellonajan?",
  note:"Mallifraaseja ei ole otettu kuvan kalenterimerkinnöistä. Käytä kuvitteellista tapaamisaikaa.",
  phraseKeys:["Montag","am Montag","um drei Uhr"],
 },
 "10":{
  chapterId:"10",placement:"vocabulary",
  question:"Kuvittele uusi tuttavuus ryhmässä. Miten tutustut ja esittelet toisen henkilön?",
  note:"Kuvan ihmiset eivät ole kirjan lähdetekstin henkilöitä. Esimerkit ovat yleisiä käyttöfraaseja.",
  phraseKeys:["Schön, dich kennenzulernen!","Das ist …","Freut mich!"],
 },
};
export function getLos1VisualPhrases(chapterId:string):readonly {de:string;fi:string}[]{
 const lesson=LOS1_VISUAL_LESSONS[chapterId];
 const chapter=LOS_BOOKS.find(book=>book.id===1)?.chapters.find(ch=>ch.id===chapterId);
 if(!lesson||!chapter)return [];
 return lesson.phraseKeys.flatMap(phrase=>{
  const entry=chapter.vocabulary.find(v=>v.split(" – ")[0]===phrase);
  if(!entry)return [];
  const [de,fi]=entry.split(" – ");
  return [{de:phrase,fi:fi??""}];
 });
}
export function validateLos1VisualLessons():string[]{
 const errors:string[]=[];
 const chapterIds=LOS_BOOKS.find(book=>book.id===1)?.chapters.map(c=>c.id)??[];
 if(chapterIds.length!==10)errors.push("LOS! 1:n kymmenen kappaletta puuttuvat.");
 for(const id of chapterIds){
  const lesson=LOS1_VISUAL_LESSONS[id];
  if(!lesson){errors.push("Kuvaharjoitus puuttuu kappaleelta "+id);continue;}
  if(lesson.chapterId!==id)errors.push("Virheellinen kappaletunnus: "+id);
  if(!["culture","vocabulary"].includes(lesson.placement))
   errors.push("Kuvaharjoituksen sijoittelu virheellinen: "+id);
  if(!lesson.note||!lesson.question||lesson.phraseKeys.length!==3)
   errors.push("Kuvaharjoituksen teksti puuttuu: "+id);
  const phrases=getLos1VisualPhrases(id);
  if(phrases.length!==3||new Set(phrases.map(x=>x.de)).size!==3)
   errors.push("Kuvan mallifraasit eivät vastaa kappaleen aktiivisanastoa: "+id);
 }
 if(Object.keys(LOS1_VISUAL_LESSONS).length!==chapterIds.length)
  errors.push("Ylimääräisiä kuvaharjoituksia olemattomille kappaleille.");
 return errors;
}
