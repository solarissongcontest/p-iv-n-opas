/** C06 20 precisely graded numeric tasks plus TWO separate written
 * fictitious du/Sie age dialogues. Written content is NEVER auto-scored.
 */
import type {Exercise} from "./model";
import type {ChapterTestDefinition} from "./chapterTest";
import {germanCardinal} from "./numbers.ts";
const base={version:"0.1.0",difficulty:"basic" as const,
  objectives:["L1-NUM-01","L1-INT-06"]};
const numeric=[0,1,5,10,11,12,13,16,17,18,19,20,21,27,32] as const;
const digits:Exercise[]=numeric.map((n,index)=>({
  ...base,id:"los1-c06-exam-"+String(index+1).padStart(2,"0"),
  type:"gap-fill",promptFi:"Kirjoita numero "+n+" saksaksi. Käytä saksan erikoismerkkejä.",
  sentenceBefore:String(n)+" =",sentenceAfter:"",
  acceptedAnswers:[germanCardinal(n)],
  explanationFi:"Numeron "+n+" saksankielinen sana on "+germanCardinal(n)+".",
}));
const choice=(n:number,promptFi:string,labels:[string,string,string],
  answer:0|1|2,explanationFi:string):Exercise=>({
  ...base,id:"los1-c06-exam-"+String(n).padStart(2,"0"),
  type:"single-choice",promptFi,explanationFi,
  options:labels.map((label,index)=>({id:"ans-"+String(index+1),label})),
  correctOptionId:"ans-"+String(answer+1),
});
export const LOS1_C06_EXAM_EXERCISES:Exercise[]=[
  ...digits,
  choice(16,"Mitä lukua kolmeakymmentä tarkoittava sana dreißig vastaa?",
    ["13","30","3"],1,"Dreißig on 30."),
  choice(17,"Mitä lukua sana sechzig tarkoittaa?",
    ["16","6","60"],2,"Sechzig on 60. Sechzehn on 16."),
  choice(18,"Mitä lukua sana siebzig tarkoittaa?",
    ["70","17","7"],0,"Siebzig on 70. Siebzehn on 17."),
  choice(19,"Minkä ikäinen Franz on aidossa Franz–Jörg-dialogissa?",
    ["19","20","18"],0,
    "Franz sanoo Ich bin neunzehn Jahre alt."),
  choice(20,"Mitä Haraldin alkuperäislause Ich bin jetzt so um die fünfzig tarkoittaa?",
    ["Hän on tarkalleen 15.","Hän on suunnilleen viisikymppinen.","Hän on tarkalleen 50."],1,
    "Harald arvioi olevansa noin 50-vuotias. Tarkkaa ikää ei sanota."),
];
export const LOS1_C06_TEST:ChapterTestDefinition={
  id:"los1-c06-chapter-test",chapterId:"C06",version:"0.1.0",
  title:"C06 · Wie alt bist du? · Kappaletesti",
  introductoryFi:"Vastaa kaikkiin 20 automaattisesti pisteytettävään numerokohtaan. "
    +"Kirjoita sen jälkeen vähintään kaksi erillistä kuvitteellista ikädialogia, "
    +"ensin tuttavallinen ja sitten kohtelias. "
    +"Kirjoitus on pakollinen itsearvioitava osuus, mutta ei lisää automaattisia pisteitä. "
    +"Älä käytä oikeita syntymäpäiviä, puhelinnumeroita tai henkilötietoja.",
  exerciseIds:LOS1_C06_EXAM_EXERCISES.map(x=>x.id),
  selfAssessmentMode:"writing",
  requiredWritingLines:2,
  writingPromptFi:"Kirjoita kaksi erillistä riviä. "
    +"Rivi 1: tuttavallinen ikäkysymys ja keksitty vastaus esimerkiksi 17 vuoden iästä. "
    +"Rivi 2: kohtelias ikäkysymys ja keksitty vastaus esimerkiksi 30 vuoden iästä. "
    +"Tarkista itse luvun kirjoitusasu sekä sind Sie / bist du.",
  writingModelDe:"A: Wie alt bist du? B: Ich bin siebzehn Jahre alt.\nA: Wie alt sind Sie? B: Ich bin dreißig Jahre alt.",
  writingModelFi:"A: Kuinka vanha olet? B: Olen seitsemäntoistavuotias.\nA: Kuinka vanha olette? B: Olen kolmekymmentävuotias.",
  speechCriteria:[
    {id:"du",title:"Kirjoitin yhdelle riville tutun muodon Wie alt bist du?."},
    {id:"du-answer",title:"Tuttavallisen tilanteen vastaus käyttää Ich bin … Jahre alt."},
    {id:"sie",title:"Kirjoitin toiselle riville kohteliaan muodon Wie alt sind Sie?."},
    {id:"sie-answer",title:"Tarkistin lukujen ja isolla kirjoitettavan Sie-muodon oikeinkirjoituksen."},
  ],
};
