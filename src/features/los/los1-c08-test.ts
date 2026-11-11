/** C08 two authored 12-question forms for the same six elementary help strategies.
 * Neither form claims source-linked listening, reading or pronunciation grades.
 */
import type {Exercise} from "./model";
import type {ChapterTestDefinition} from "./chapterTest";
const base={version:"0.1.0",difficulty:"basic" as const,objectives:["L1-STRAT-01"]};
type Form="a"|"b";
const choice=(form:Form,n:number,promptFi:string,opts:[string,string,string],right:0|1|2,explanationFi:string):Exercise=>({
 ...base,id:"los1-c08-exam-"+form+"-"+String(n).padStart(2,"0"),
 type:"single-choice",promptFi,options:opts.map((label,i)=>({id:"c"+i,label})),
 correctOptionId:"c"+right,explanationFi,
});
const gap=(form:Form,n:number,promptFi:string,before:string,after:string,accepted:string,explanationFi:string):Exercise=>({
 ...base,id:"los1-c08-exam-"+form+"-"+String(n).padStart(2,"0"),
 type:"gap-fill",promptFi,sentenceBefore:before,sentenceAfter:after,
 acceptedAnswers:[accepted],explanationFi,
});
export const LOS1_C08_EXAM_A:Exercise[]=[
 choice("a",1,"Et ymmärrä tehtävänantoa. Mitä sanot?",
   ["Ich verstehe nicht.","Ich bin siebzehn.","Auf Wiedersehen."],0,
   "Ich verstehe nicht. tarkoittaa en ymmärrä."),
 choice("a",2,"Mikä lyhyt pyyntö tarkoittaa 'vielä kerran, kiitos'?",
   ["Bitte langsamer.","Noch einmal, bitte.","Wie alt bist du?"],1,
   "Noch einmal, bitte. pyytää toistoa."),
 choice("a",3,"Miten pyydät hitaampaa puhetta?",
   ["Bitte langsamer.","Gute Nacht.","Wie heißt du?"],0,
   "Bitte langsamer. = hitaammin, kiitos."),
 choice("a",4,"Mikä on sopiva kohtelias kokonainen toistopyyntö?",
   ["Du bist nett.","Was bedeutet das?","Können Sie das bitte wiederholen?"],2,
   "Können Sie das bitte wiederholen? sisältää kohteliaan Sie-puhuttelun."),
 choice("a",5,"Haluat kysyä, mitä sana tarkoittaa.",
   ["Was bedeutet das?","Wie schreibt man das?","Wann ist Montag?"],0,
   "Was bedeutet das? kysyy merkitystä."),
 choice("a",6,"Haluat kysyä, miten ilmaus sanotaan saksaksi.",
   ["Woher kommst du?","Wie sagt man das auf Deutsch?","Was kostet das?"],1,
   "Wie sagt man das auf Deutsch? kysyy saksankielistä ilmaisua."),
 choice("a",7,"Mitä wiederholen tarkoittaa?",
   ["laskea","toistaa","tavata"],1,
   "Wiederholen tarkoittaa toistaa."),
 choice("a",8,"Mitä langsamer tarkoittaa?",
   ["hitaammin","nopeammin","hiljaisemmin"],0,
   "Langsamer tarkoittaa hitaammin."),
 choice("a",9,"Mikä on 'sana' saksaksi?",
   ["die Schule","der Satz","das Wort"],2,
   "Das Wort tarkoittaa sanaa."),
 choice("a",10,"Mitä die Frage tarkoittaa?",
   ["vastaus","kysymys","tehtävä"],1,
   "Die Frage on kysymys, die Antwort on vastaus."),
 gap("a",11,"Täydennä ymmärtämisen vaikeus.","Ich verstehe"," .","nicht",
   "Ich verstehe nicht. on kokonainen ilmaus."),
 gap("a",12,"Täydennä kohtelias toistopyyntö.","Können Sie das bitte","?","wiederholen",
   "Können Sie das bitte wiederholen? on oikea kysymys."),
];
export const LOS1_C08_EXAM_B:Exercise[]=[
 choice("b",1,"Opettaja puhuu saksaksi etkä saa selvää. Valitse paras vastaus.",
   ["Ich komme aus Finnland.","Ich verstehe nicht.","Tschüss!"],1,
   "Ich verstehe nicht. kertoo, että et ymmärrä."),
 choice("b",2,"Millä pyydät yhden uuden toiston?",
   ["Noch einmal, bitte.","Guten Abend!","Wie geht es Ihnen?"],0,
   "Noch einmal, bitte. tarkoittaa vielä kerran, kiitos."),
 choice("b",3,"Puhuja on liian nopea. Minkä fraasin valitset?",
   ["Was bedeutet das?","Wie alt sind Sie?","Bitte langsamer."],2,
   "Bitte langsamer. = hitaammin, kiitos."),
 choice("b",4,"Tunnista teitittelevä pyyntö saada lause uudelleen.",
   ["Wie heißt du?","Können Sie das bitte wiederholen?","Wie geht's?"],1,
   "Kohteliaassa pyynnössä on isolla kirjoitettu Sie."),
 choice("b",5,"Taululla on sinulle vieras sana. Mikä kysymys sopii?",
   ["Was bedeutet das?","Woher kommst du?","Wie alt bist du?"],0,
   "Was bedeutet das? = mitä se tarkoittaa?"),
 choice("b",6,"Miten kysyt, miten tämän sanoisi saksaksi?",
   ["Was bedeutet das?","Können Sie das bitte wiederholen?","Wie sagt man das auf Deutsch?"],2,
   "Auf Deutsch tarkoittaa saksaksi."),
 choice("b",7,"Mikä sana tarkoittaa 'toistaa'?",
   ["wiederholen","sagen","schreiben"],0,
   "Wiederholen tarkoittaa toistaa."),
 choice("b",8,"Käännös sanalle 'hitaammin' on...",
   ["langsam","langsamer","schnell"],1,
   "Langsamer on hitaammin; langsam on hitaasti."),
 choice("b",9,"Mikä saksankielinen sana tarkoittaa yhtä sanaa?",
   ["das Wort","die Aufgabe","die Frage"],0,
   "Das Wort = sana."),
 choice("b",10,"Mitä sana die Antwort tarkoittaa?",
   ["kysymys","koulu","vastaus"],2,
   "Die Antwort = vastaus."),
 gap("b",11,"Täydennä tuttu 'en ymmärrä' -fraasi.","Ich","nicht.","verstehe",
   "Ich verstehe nicht. = en ymmärrä."),
 gap("b",12,"Täydennä kohtelias kysymys toistamisesta.","Können Sie das bitte","?","wiederholen",
   "Kohtelias toistopyyntö käyttää sanaa wiederholen."),
];
export const LOS1_C08_TEST:ChapterTestDefinition={
 id:"los1-c08-chapter-test",chapterId:"C08",version:"0.1.0",
 title:"C08 · Noch einmal, bitte! · Kappaletesti",
 introductoryFi:"Vastaa 12 itsenäiseen, tarkistettavaan fraasi- ja tilannetehtävään. "
  +"Kappaleen alkuperäislukuteksti ja oikea kuunteluaineisto ovat vielä tarkistuksessa, "
  +"joten näistä ei anneta lukemisen tai kuuntelun pisteitä. "
  +"Sano sen jälkeen kolme erilaista avunpyyntöä ääneen ja arvioi itse. "
  +"Ääntämistä ei pisteytetä automaattisesti. Ratkaisut näkyvät vasta palautuksen jälkeen.",
 exerciseIds:LOS1_C08_EXAM_A.map(ex=>ex.id),
 alternativeExerciseIds:LOS1_C08_EXAM_B.map(ex=>ex.id),
 selfAssessmentMode:"speech",
 speechExampleDe:"Ich verstehe nicht. Noch einmal, bitte. Bitte langsamer. Was bedeutet das?",
 speechPromptFi:"Esitä kolme erillistä avunpyyntöä ääneen: en ymmärrä, haluan kuulla uudelleen, haluan hitaammin. "
  +"Kokeile myös kysyä tuntemattoman sanan merkitystä. Äänittäminen on vapaaehtoista.",
 speechCriteria:[
  {id:"understood",title:"Osasin kertoa, etten ymmärrä."},
  {id:"repeat",title:"Osasin pyytää kohteliaasti toistamaan."},
  {id:"slow",title:"Osasin pyytää puhumaan hitaammin."},
  {id:"meaning",title:"Osasin kysyä sanan merkitystä."},
 ],
};
