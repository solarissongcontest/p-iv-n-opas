/** C02 self-study test: fifteen original automatic questions + ungraded written
 * introduction. Grading uses the shared chapter-test engine.
 */
import type { Exercise } from "./model";
import type { ChapterTestDefinition } from "./chapterTest";

const base = {
  version: "0.1.0", difficulty: "basic" as const,
  objectives: ["L1-INT-02", "L1-GRA-01", "L1-READ-01"],
};
const choice=(n:number,promptFi:string,options:[string,string,string],correctIndex:0|1|2,explanationFi:string):Exercise=>({
  ...base, id:"los1-c02-exam-"+String(n).padStart(2,"0"), type:"single-choice",
  promptFi, explanationFi,
  options:options.map((label,index)=>({id:"c-"+(index+1),label})),
  correctOptionId:"c-"+(correctIndex+1),
});
const gap=(n:number,promptFi:string,sentenceBefore:string,sentenceAfter:string,expected:string,explanationFi:string):Exercise=>({
  ...base, id:"los1-c02-exam-"+String(n).padStart(2,"0"), type:"gap-fill",
  promptFi, sentenceBefore, sentenceAfter,
  acceptedAnswers:[expected], explanationFi,
});
export const LOS1_C02_EXAM_EXERCISES: Exercise[]=[
  choice(1,"Miten kysyt toisen nimeä sinutellen?",["Wie heißt du?","Wie alt bist du?","Guten Morgen!"],0,
    "Wie heißt du? on tavallinen nimikysymys."),
  choice(2,"Miten sanot 'Minun nimeni on Ben'?",["Du heißt Ben.","Ich heiße Ben.","Er heißt Ben."],1,
    "Ich heiße Ben. ilmaisee oman nimen."),
  choice(3,"Mitä ich tarkoittaa?",["hän","sinä","minä"],2,
    "Ich tarkoittaa 'minä'."),
  choice(4,"Mitä du tarkoittaa?",["sinä","me","hän"],0,
    "Du tarkoittaa 'sinä'."),
  choice(5,"Mikä verbi on lauseessa Ich heiße Lena?",["heißen","sein","kommen"],0,
    "Heiße on heißen-verbin minä-muoto."),
  choice(6,"Mikä lause tarkoittaa 'Minä olen Lena'?",["Du bist Lena.","Ich bin Lena.","Sie ist Lena."],1,
    "Ich bin Lena. on sein-verbin minä-muotoinen lause."),
  choice(7,"Kuka kysyy alkuperäisen LOS!-dialogin alussa Wie heißt du?",["Ben","Lena","Herr Weber"],1,
    "Lena esittää ensimmäisen nimikysymyksen."),
  choice(8,"Mikä henkilö mainitaan sanoin Das ist Herr Weber?",["Lena","Frau Weiß","Herr Weber"],2,
    "Ilmaus Das ist Herr Weber esittelee herra Weberin."),
  choice(9,"Mitä Wer ist das? tarkoittaa?",["Kuka tuo on?","Mikä sinun nimesi on?","Mistä olet kotoisin?"],0,
    "Wer on 'kuka'."),
  choice(10,"Mikä tunnistettava kolmannen persoonan muoto kuuluu hänestä sanottavaan lauseeseen?",["ich heiße","er heißt","du heißt"],1,
    "Er heißt tarkoittaa 'hänen nimensä on' miehestä puhuttaessa."),
  gap(11,"Täydennä oman nimen kertominen.","Ich","Lena.","heiße",
    "Ich heiße Lena. kertoo oman nimen."),
  gap(12,"Täydennä sinän nimen ilmaus.","Du","Ben.","heißt",
    "Du heißt Ben. kertoo sinän nimen."),
  gap(13,"Täydennä sein-verbin minä-muoto.","Ich","Lena.","bin",
    "Ich bin Lena. on olla-verbin minä-muoto."),
  gap(14,"Täydennä sein-verbin sinä-muoto.","Du","Ben.","bist",
    "Du bist Ben. tarkoittaa 'sinä olet Ben'."),
  gap(15,"Täydennä nimikysymyksen verbi.","Wie","du?","heißt",
    "Wie heißt du? on nimikysymys."),
];
export const LOS1_C02_TEST: ChapterTestDefinition={
  id:"los1-c02-chapter-test",
  chapterId:"C02",
  version:"0.1.0",
  title:"C02 · Ich heiße … · Kappaletesti",
  introductoryFi:"Vastaa kaikkiin viiteentoista kohtaan ilman vinkkejä ja palauta koko koe yhdellä kertaa. "
    +"Käytä lopuksi omia sanojasi lyhyessä kirjallisessa esittelyssä. "
    +"Kirjoitelma itsearvioidaan, eikä sitä lueta automaattisiin pisteisiin.",
  exerciseIds:LOS1_C02_EXAM_EXERCISES.map(item=>item.id),
  selfAssessmentMode:"writing",
  speechCriteria:[
    {id:"own-name",title:"Kirjoitin oman nimeni vähintään kerran lauseeseen Ich heiße … tai Ich bin …"},
    {id:"ask-name",title:"Kirjoitin toiselle kysymyksen Wie heißt du?"},
    {id:"punctuation",title:"Tarkistin heißen-muodon, ison alkukirjaimen ja kysymysmerkin."},
  ],
};
