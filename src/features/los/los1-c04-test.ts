/** C04 chapter check: 12 machine-gradable items + two ungraded
 * independently produced mini-dialogues, one with du and one with Sie.
 * Original test questions are not copied from source's workbook.
 */
import type { Exercise } from "./model";
import type { ChapterTestDefinition } from "./chapterTest";
const base={version:"0.1.0",difficulty:"basic" as const,objectives:["L1-INT-04","L1-CULT-01"]};
const choice=(n:number,promptFi:string,options:[string,string,string],correctIndex:0|1|2,explanationFi:string):Exercise=>({
  ...base,id:"los1-c04-exam-"+String(n).padStart(2,"0"),
  type:"single-choice",promptFi,explanationFi,
  options:options.map((label,index)=>({id:"c-"+(index+1),label})),
  correctOptionId:"c-"+(correctIndex+1),
});
const gap=(n:number,promptFi:string,before:string,after:string,answer:string,explanationFi:string,
  caseSensitive=false):Exercise=>({
  ...base,id:"los1-c04-exam-"+String(n).padStart(2,"0"),
  type:"gap-fill",promptFi,sentenceBefore:before,sentenceAfter:after,
  acceptedAnswers:[answer],caseSensitive,explanationFi,
});
export const LOS1_C04_EXAM_EXERCISES:Exercise[]=[
  choice(1,"Millä kysyt vieraalta aikuiselta kohteliaasti hänen nimeään?",
    ["Wie heißt du?","Wie heißen Sie?","Wie kommst du?"],1,
    "Wie heißen Sie? on kohtelias nimikysymys."),
  choice(2,"Millä kysyt tuttavan nimeä?",
    ["Wie heißt du?","Wie heißen Sie?","Woher kommen Sie?"],0,
    "Wie heißt du? on tuttavallinen nimikysymys."),
  choice(3,"Valitse kohtelias alkuperäkysymys.",
    ["Woher kommst Sie?","Woher kommen Sie?","Woher kommt du?"],1,
    "Teitittelyssä verbi on kommen: Woher kommen Sie?."),
  choice(4,"Valitse tuttavallinen alkuperäkysymys.",
    ["Woher kommen Sie?","Woher kommt du?","Woher kommst du?"],2,
    "Sinämuoto on Woher kommst du?."),
  gap(5,"Kirjoita kohtelias pronomini oikealla alkukirjaimella.","Wie heißen","?", "Sie",
    "Kohtelias Sie kirjoitetaan isolla myös lauseen keskellä.",true),
  gap(6,"Täydennä kohtelias nimikysymys oikealla verbimuodolla.","Wie","Sie?", "heißen",
    "Wie heißen Sie? on oikein."),
  gap(7,"Täydennä kohtelias alkuperäkysymys oikealla verbillä.","Woher","Sie?", "kommen",
    "Woher kommen Sie? on oikein."),
  choice(8,"Mitä Wie geht es Ihnen? tarkoittaa?",
    ["Mitä teille kuuluu?","Mikä teidän nimenne on?","Mistä olette kotoisin?"],0,
    "Fraasi Wie geht es Ihnen? on kohtelias vointikysymys."),
  choice(9,"Ketkä puhuvat Wikibooksin koko Text A -dialogissa?",
    ["Franz ja Greta","Herr Schmidt ja Herr Standish","Lena ja Ben"],1,
    "Päätekstin puhujat ovat Herr Schmidt ja Herr Standish."),
  choice(10,"Mitä Herr Schmidt sanoo omasta voinnistaan?",
    ["Ich bin müde.","Ich bin glücklich.","Ich komme aus Finnland."],0,
    "Hän sanoo Ich bin müde. eli 'olen väsynyt'."),
  choice(11,"Mikä kohta Deutsch im Blick -alkuperäisessä kysymyslistassa on kohtelias nimikysymys?",
    ["Wie heißen Sie?","Wie heißt du?","Wie geht's dir?"],0,
    "Lähdelistassa esiintyy Wie heißen Sie?."),
  choice(12,"Millä perusteella du/Sie valitaan?",
    ["Ainoastaan puhuteltavan iän perusteella","Aina kaikkien kanssa samalla tavalla",
      "Tilanteen, suhteen ja käytäntöjen perusteella"],2,
    "Kohtelias puhuttelu riippuu tilanteesta ja suhteesta, ei vain iästä."),
];
export const LOS1_C04_TEST:ChapterTestDefinition={
  id:"los1-c04-chapter-test",
  chapterId:"C04",version:"0.1.0",
  title:"C04 · Du oder Sie? · Kappaletesti",
  introductoryFi:"Vastaa ensin 12 tarkistettavaan kohtaan ilman vinkkejä. "
    +"Kirjoita sen jälkeen kaksi erillistä lyhyttä kohtaamista, tuttu ja kohtelias. "
    +"Molemmat kirjalliset esimerkit ovat itsearviointia, eivät automaattisia pisteitä.",
  exerciseIds:LOS1_C04_EXAM_EXERCISES.map(item=>item.id),
  selfAssessmentMode:"writing",
  requiredWritingLines:2,
  writingPromptFi:"Kirjoita kaksi erillistä riviä. "
    +"Rivi 1: tervehdys ja nimikysymys tutulle du-muodossa. "
    +"Rivi 2: tervehdys ja nimikysymys vieraalle aikuiselle kohteliaalla Sie-muodolla. "
    +"Molemmissa kysy myös kotipaikkaa. Älä kirjoita oikeita yhteystietoja.",
  writingModelDe:"Hallo! Wie heißt du? Woher kommst du?\nGuten Tag! Wie heißen Sie? Woher kommen Sie?",
  writingModelFi:"Hei! Mikä sinun nimesi on? Mistä olet kotoisin?\nPäivää! Mikä teidän nimenne on? Mistä olette kotoisin?",
  speechCriteria:[
    {id:"first-du",title:"Kirjoitin ensimmäisen tilanteen tutulle, käyttäen du-muotoa."},
    {id:"first-verb",title:"Käytin tuttuja muotoja heißt du ja kommst du."},
    {id:"second-sie",title:"Kirjoitin toisen tilanteen vieraalle, käyttäen Sie-muotoa isolla S:llä."},
    {id:"second-verbs",title:"Käytin kohteliaita muotoja heißen Sie ja kommen Sie."},
  ],
};
