/** C05 first chapter test form: twelve beginner-level automatic checks
 * plus non-scored pronunciation review; no false machine speech score.
 */
import type {Exercise} from "./model";
import type {ChapterTestDefinition} from "./chapterTest";
const b={version:"0.1.0",difficulty:"basic" as const,
  objectives:["L1-INT-05","L1-PROD-01","L1-READ-01"]};
const choice=(n:number,q:string,labels:[string,string,string],at:0|1|2,explanationFi:string):Exercise=>({
  ...b,id:"los1-c05-exam-"+String(n).padStart(2,"0"),type:"single-choice",
  promptFi:q,explanationFi,
  options:labels.map((label,i)=>({id:"c-"+(i+1),label})),
  correctOptionId:"c-"+(at+1),
});
const gap=(n:number,q:string,before:string,after:string,answer:string,explanationFi:string):Exercise=>({
  ...b,id:"los1-c05-exam-"+String(n).padStart(2,"0"),type:"gap-fill",
  promptFi:q,sentenceBefore:before,sentenceAfter:after,
  acceptedAnswers:[answer],explanationFi,
});
export const LOS1_C05_EXAM_EXERCISES:Exercise[]=[
  choice(1,"Mitä Wie geht's? tarkoittaa?",
    ["Mitä kuuluu?","Mikä nimesi on?","Mistä tulet?"],0,
    "Wie geht's? on lyhyt vointikysymys."),
  choice(2,"Kumpi kysyy tuttavalta vointia?",
    ["Wie geht es Ihnen?","Wie geht es dir?","Woher kommst du?"],1,
    "Wie geht es dir? on tuttavallinen kysymys."),
  choice(3,"Kumpi on kohtelias vointikysymys?",
    ["Wie geht es Ihnen?","Wie heißt du?","Wie geht es dir?"],0,
    "Wie geht es Ihnen? on kohtelias kysymys."),
  choice(4,"Mikä on sopiva lyhyt myönteinen vastaus?",
    ["Nicht so gut.","Gut, danke.","Woher kommen Sie?"],1,
    "Gut, danke. tarkoittaa 'Hyvää, kiitos'."),
  choice(5,"Mikä ilmaus tarkoittaa 'Ei kovin hyvin'?",
    ["Sehr gut.","Toll!","Nicht so gut."],2,
    "Nicht so gut. kertoo, ettei vointi ole kovin hyvä."),
  choice(6,"Mitä Und dir? tarkoittaa?",
    ["Entä sinulle?","Entä teille?","Entä missä?"],0,
    "Und dir? tarkoittaa 'Entä sinulle?'."),
  choice(7,"Mitä Und Ihnen? tarkoittaa?",
    ["Entä sinulle?","Entä teille?","Kuka te olette?"],1,
    "Und Ihnen? on kohtelias 'Entä teille?'."),
  choice(8,"Ketkä keskustelevat Wikibooksin Die Freunde -päätekstissä?",
    ["Heinrich ja Karl","Franz ja Greta","Thomas ja Takashi"],0,
    "C05:n Text A:ssa Heinrich ja Karl kysyvät toistensa vointia."),
  gap(9,"Täydennä kieltosana.","Es geht mir","so gut.","nicht",
    "Es geht mir nicht so gut. tarkoittaa, ettei vointi ole kovin hyvä."),
  gap(10,"Täydennä tuttu vastakysymys.","Und","?","dir",
    "Und dir? tarkoittaa 'Entä sinulle?'."),
  gap(11,"Täydennä kohtelias vastakysymys.","Und","?","Ihnen",
    "Und Ihnen? tarkoittaa 'Entä teille?'."),
  gap(12,"Täydennä fraasi oikealla pronominimuodolla.","Es geht","gut.","mir",
    "Es geht mir gut. on tavallinen vastaus vointikysymykseen."),
];
export const LOS1_C05_TEST:ChapterTestDefinition={
  id:"los1-c05-chapter-test",chapterId:"C05",version:"0.1.0",
  title:"C05 · Wie geht’s? · Kappaletesti",
  introductoryFi:"Vastaa kahteentoista automaattisesti tarkistettavaan kysymykseen. "
    +"Lausu sen jälkeen ääneen lyhyt vointikysymys, vastaus ja vastakysymys. "
    +"Mikrofonin käyttäminen on vapaaehtoista; ääni pysyy selaimen väliaikaisessa muistissa. "
    +"Puhe arvioidaan vain omalla tarkistuslistalla eikä lisää automaattisia pisteitä.",
  exerciseIds:LOS1_C05_EXAM_EXERCISES.map(row=>row.id),
  selfAssessmentMode:"speech",
  speechExampleDe:"Hallo! Wie geht es dir? Mir geht es gut. Und dir?",
  speechPromptFi:"Lausu ääneen vointikysymys, oma lyhyt vastaus ja kysymys takaisin. Voit keksiä tilanteen eikä sinun tarvitse kertoa oikeasta voinnistasi.",
  speechCriteria:[
    {id:"question",title:"Lausuin vointikysymyksen Wie geht's? tai Wie geht es dir?."},
    {id:"reply",title:"Lausuin ymmärrettävän myönteisen tai kielteisen vointivastauksen."},
    {id:"ask-back",title:"Kysyin takaisin Und dir? tai kohteliaasti Und Ihnen?."},
    {id:"register",title:"Yritin pitää tutun dir- ja kohteliaan Ihnen-muodon johdonmukaisina."},
  ],
};
