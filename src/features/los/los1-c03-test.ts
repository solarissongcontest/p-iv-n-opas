/** C03 source-aligned final chapter practice. The full human-written
 * authentic texts are in c03-source and los1-authentic-ariser; all questions
 * and explanations here are new original LOS! editorial materials.
 */
import type { Exercise } from "./model";
import type { ChapterTestDefinition } from "./chapterTest";
const common = { version: "0.1.0", difficulty: "basic" as const,
  objectives: ["L1-INT-03", "L1-READ-01", "L1-MED-01"] };
const choice = (n:number,promptFi:string,labels:[string,string,string],
  correctIndex:0|1|2,explanationFi:string): Exercise => ({
    ...common, id:"los1-c03-exam-"+String(n).padStart(2,"0"),
    type:"single-choice", promptFi, explanationFi,
    options:labels.map((label,index)=>({id:"option-"+(index+1),label})),
    correctOptionId:"option-"+(correctIndex+1),
  });
const gap = (n:number,promptFi:string,sentenceBefore:string,sentenceAfter:string,
  accepted:string,explanationFi:string):Exercise => ({
    ...common,id:"los1-c03-exam-"+String(n).padStart(2,"0"),
    type:"gap-fill",promptFi,sentenceBefore,sentenceAfter,
    acceptedAnswers:[accepted],explanationFi,
  });
export const LOS1_C03_EXAM_EXERCISES: Exercise[] = [
  choice(1,"Miten kysyt, mistä joku on kotoisin?",
    ["Wie heißt du?","Woher kommst du?","Wo bist du?"],1,
    "Woher kommst du? on alkuperäkysymys."),
  choice(2,"Valitse oikea esittelylause.",
    ["Ich kommst aus Finnland.","Ich komme aus Finnland.","Ich kommt aus Finnland."],1,
    "Kommen-verbin minämuoto on komme."),
  choice(3,"Mikä saksan muoto tarkoittaa 'sinä tulet'?",
    ["du kommst","du kommt","du kommen"],0,
    "Du kommst on saksan kieliopillinen sinämuoto."),
  choice(4,"Mistä maasta Berna kertoo olevansa kotoisin alkuperäisessä haastattelussa?",
    ["Österreich","die Schweiz","Deutschland"],2,
    "Bernan alkuperäisvastaus kuuluu Ich komme aus Deutschland."),
  choice(5,"Mistä kaupungista Berna kertoo olevansa kotoisin?",
    ["Kiel","Berlin","Kyoto"],0,
    "Haastattelussa Berna sanoo Ich komme aus Kiel."),
  choice(6,"Minkä kaupungin Takashi mainitsee Ariserin alkuperäisdialogissa?",
    ["Wien","Kyoto","Kiel"],1,
    "Takashi sanoo Ich komme aus Kyoto."),
  choice(7,"Mistä kaupungista Thomas ja Peter ovat kotoisin Ariserin dialogissa?",
    ["Berlin","Tallinn","Helsinki"],0,
    "Thomas käyttää lausetta Wir kommen aus Berlin."),
  choice(8,"Valitse Sveitsiä tarkoittava oikea lähtöpaikkailmaus.",
    ["aus die Schweiz","aus Schweiz","aus der Schweiz"],2,
    "Sveitsin kohdalla opetellaan poikkeus aus der Schweiz."),
  choice(9,"Kumpi kysymyssana tarkoittaa 'missä' nykyistä sijaintia kysyttäessä?",
    ["woher","wo","wer"],1,
    "Wo kysyy sijaintia; woher kysyy alkuperää."),
  choice(10,"Mikä maa on Itävallan länsipuolella ja Saksan eteläpuolella?",
    ["die Schweiz","Schweden","Finnland"],0,
    "Sveitsi sijaitsee Itävallan länsipuolella sekä Saksan eteläpuolella."),
  gap(11,"Täydennä Ich-lauseen taipunut verbi.","Ich","aus Deutschland.","komme",
    "Ich komme aus Deutschland on oikein."),
  gap(12,"Täydennä du-lauseen taipunut verbi.","Du","aus Finnland.","kommst",
    "Du kommst aus Finnland on oikein."),
  gap(13,"Täydennä alkuperäkysymyksen verbi.","Woher","du?","kommst",
    "Woher kommst du? kysyy alkuperää."),
  gap(14,"Täydennä maata edeltävä sana.","Ich komme","Österreich.","aus",
    "Ich komme aus Österreich ilmaisee lähtömaan."),
  gap(15,"Täydennä Sveitsi-ilmauksen artikkelin muoto.","Ich komme aus","Schweiz.","der",
    "Sveitsin yhteydessä käytetään ilmausta aus der Schweiz."),
];
export const LOS1_C03_TEST: ChapterTestDefinition = {
  id:"los1-c03-chapter-test",
  chapterId:"C03",
  version:"0.1.0",
  title:"C03 · Woher kommst du? · Kappaletesti",
  introductoryFi:"Vastaa kaikkiin 15 kysymykseen ilman tehtäväkohtaisia vihjeitä. "
    +"Lopuksi kirjoita omasta tai keksitystä lähtöpaikastasi lyhyt saksankielinen esittely "
    +"ja arvioi se itse. Kirjoittamista ei pisteytetä automaattisesti.",
  exerciseIds: LOS1_C03_EXAM_EXERCISES.map(item=>item.id),
  selfAssessmentMode:"writing",
  writingPromptFi:"Kirjoita saksaksi tervehdyksesi, nimesi ja kotimaasi tai kotikaupunkisi sekä kysy toiselta Woher kommst du?.",
  writingModelDe:"Hallo! Ich heiße Lena. Ich komme aus Finnland. Woher kommst du?",
  writingModelFi:"Hei! Minun nimeni on Lena. Olen kotoisin Suomesta. Mistä sinä olet kotoisin?",
  speechCriteria: [
    {id:"greet",title:"Kirjoitin saksaksi tervehdyksen ja nimeni."},
    {id:"origin",title:"Kerroin lähtömaan tai -kaupungin ilmauksella Ich komme aus …"},
    {id:"ask",title:"Kirjoitin kysymyksen Woher kommst du?"},
    {id:"article",title:"Tarkistin ison alkukirjaimen sekä tarvittaessa muodon aus der Schweiz."},
  ],
};
