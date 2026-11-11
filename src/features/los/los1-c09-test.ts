/** C09: 14-point independent forms plus short ungraded calendar writing.
 * No source-audio questions until source and playback are reviewed.
 */
import type {Exercise} from "./model";
import type {ChapterTestDefinition} from "./chapterTest";
const base={version:"0.1.0",difficulty:"basic" as const,objectives:["L1-TIME-01"]};
type Form="a"|"b";
const choice=(form:Form,n:number,promptFi:string,labels:[string,string,string],right:0|1|2,explanationFi:string):Exercise=>({
 ...base,id:"los1-c09-exam-"+form+"-"+String(n).padStart(2,"0"),
 type:"single-choice",promptFi,
 options:labels.map((label,i)=>({id:"c"+i,label})),
 correctOptionId:"c"+right,explanationFi,
});
const gap=(form:Form,n:number,promptFi:string,before:string,after:string,correct:string,explanationFi:string):Exercise=>({
 ...base,id:"los1-c09-exam-"+form+"-"+String(n).padStart(2,"0"),
 type:"gap-fill",promptFi,sentenceBefore:before,sentenceAfter:after,
 acceptedAnswers:[correct],explanationFi,
});
export const LOS1_C09_EXAM_A:Exercise[]=[
 choice("a",1,"Mikä on maanantai saksaksi?",
  ["Montag","Sonntag","Donnerstag"],0,"Montag = maanantai."),
 choice("a",2,"Mikä on keskiviikko saksaksi?",
  ["Dienstag","Mittwoch","Freitag"],1,"Mittwoch = keskiviikko."),
 choice("a",3,"Mikä on sunnuntai saksaksi?",
  ["Samstag","Montag","Sonntag"],2,"Sonntag = sunnuntai."),
 choice("a",4,"Mitä am Freitag tarkoittaa?",
  ["perjantaina","kello viideltä","viikonloppuna"],0,"Am Freitag = perjantaina."),
 choice("a",5,"Mitä um drei Uhr tarkoittaa?",
  ["kolme päivää","kello kolmelta","kolmannella viikolla"],1,
  "Um kolme + Uhr on tasatunti."),
 choice("a",6,"Millä sanalla kysyt milloin?",
  ["Woher?","Wer?","Wann?"],2,"Wann? = milloin?"),
 choice("a",7,"Mikä ilmaus on kirjoitettu oikein?",
  ["am Montag um drei Uhr","um Montag am drei Uhr","am drei Uhr um Montag"],0,
  "Päivä tulee am-ilmauksella, kellonaika um-ilmauksella."),
 choice("a",8,"Mitä heute tarkoittaa?",
  ["eilen","huomenna","tänään"],2,"Heute = tänään."),
 choice("a",9,"Mitä morgen tarkoittaa tässä pienellä kirjoitettuna?",
  ["huomenna","aamu-substantiivi","viikonloppu"],0,
  "morgen = huomenna, Morgen on aamu."),
 choice("a",10,"Mitä am Wochenende tarkoittaa?",
  ["keskiviikkona","viikonloppuna","kello viideltä"],1,
  "Am Wochenende = viikonloppuna."),
 choice("a",11,"Mikä on saksan viikonpäivien oikea kirjoitustapa?",
  ["montag, dienstag","Montag, Dienstag","MONtag, DiENstag"],1,
  "Saksan viikonpäivät alkavat isolla kirjaimella."),
 gap("a",12,"Täydennä maanantaina.","","Montag","am","Am Montag."),
 gap("a",13,"Täydennä kello kuudelta.","","sechs Uhr","um","Um sechs Uhr."),
 gap("a",14,"Täydennä keskiviikon saksankielinen nimi.","am","um vier Uhr","Mittwoch",
  "Am Mittwoch um vier Uhr."),
];
export const LOS1_C09_EXAM_B:Exercise[]=[
 choice("b",1,"Mikä on viikon ensimmäinen päivä tässä kalenterissa?",
  ["Montag","Mittwoch","Samstag"],0,"Montag = maanantai."),
 choice("b",2,"Mikä viikonpäivä vastaa keskiviikkoa?",
  ["Freitag","Donnerstag","Mittwoch"],2,"Mittwoch = keskiviikko."),
 choice("b",3,"Mikä saksankielinen sana tarkoittaa sunnuntaita?",
  ["Sonntag","Samstag","Dienstag"],0,"Sonntag = sunnuntai."),
 choice("b",4,"Mitä tarkoittaa am Dienstag?",
  ["kello kaksi","tiistaina","huomenna"],1,"Am Dienstag = tiistaina."),
 choice("b",5,"Miten sanot kello neljältä?",
  ["am vier Uhr","um vier Uhr","um Freitag"],1,"Um vier Uhr = kello neljältä."),
 choice("b",6,"Kysyt opiskelukaverilta 'Milloin?'. Mikä kysymys on oikein?",
  ["Wann?","Wie alt?","Wie heißt du?"],0,"Wann? tarkoittaa milloin?"),
 choice("b",7,"Mikä ilmaus vastaa 'sunnuntaina kello yhdeltätoista'?",
  ["um Sonntag am elf Uhr","am Sonntag um elf Uhr","am Sonntag am elf"],1,
  "Am Sonntag + um elf Uhr."),
 choice("b",8,"Mikä tarkoittaa tänään?",
  ["heute","gestern","morgen"],0,"Heute = tänään."),
 choice("b",9,"Mikä sana tarkoittaa huomenna, kun se kirjoitetaan pienellä?",
  ["Morgen","morgen","Mittwoch"],1,
  "morgen pienellä = huomenna."),
 choice("b",10,"Mikä on 'viikonloppuna' saksaksi?",
  ["um Wochenende","am Montag","am Wochenende"],2,
  "Am Wochenende tarkoittaa viikonloppuna."),
 choice("b",11,"Mikä kirjoitusasu on oikea viikonpäivälle?",
  ["Freitag","freitag","fReitag"],0,
  "Viikonpäivät kirjoitetaan saksassa isolla alkukirjaimella."),
 gap("b",12,"Täydennä ilmaus sunnuntaina.","","Sonntag","am",
  "Am Sonntag."),
 gap("b",13,"Täydennä kellonaika kolmelta.","","drei Uhr","um",
  "Um drei Uhr."),
 gap("b",14,"Täydennä viikonpäivä sanassa torstaina.","am","um zehn Uhr","Donnerstag",
  "Am Donnerstag um zehn Uhr."),
];
export const LOS1_C09_TEST:ChapterTestDefinition={
 id:"los1-c09-chapter-test",chapterId:"C09",version:"0.1.0",
 title:"C09 · Am Montag um drei. · Kappaletesti",
 introductoryFi:"Vastaa kaikkiin neljääntoista pisteytettävään tasatunti- ja viikonpäivätehtävään. "
  +"Lisäksi kirjoita kuvitteellisesta viikkokalenterista lyhyt 2–4-rivinen viesti saksaksi. "
  +"Kirjoitelmaa ei arvioida koneellisesti, vaan vertailet sitä palautuksen jälkeen malliin. "
  +"Tämä EI ole alkuperäisen Franz–Greta-keskustelun ymmärtämis- tai kuuntelukoe.",
 exerciseIds:LOS1_C09_EXAM_A.map(e=>e.id),
 alternativeExerciseIds:LOS1_C09_EXAM_B.map(e=>e.id),
 selfAssessmentMode:"writing",
 writingPromptFi:"Kirjoita 2–4 riviä viestiksi kuvitteelliselle opiskelukaverille: "
  +"kerro minä viikonpäivänä ja mihin tasatuntiin tapaaminen ehdotetaan. "
  +"Voit käyttää esimerkiksi am Montag um drei Uhr. "
  +"Käytä keksittyä kalenteria, älä oikeita tapaamistietoja.",
 writingModelDe:"Hallo Mia!\nAm Montag um drei Uhr?\nBis Montag!",
 writingModelFi:"Hei Mia!\nMaanantaina kolmelta?\nNähdään maanantaina!",
 requiredWritingLines:2,
 maximumWritingLines:4,
 speechCriteria:[
  {id:"day",title:"Kirjoitin viikonpäivän saksaksi isolla alkukirjaimella."},
  {id:"am",title:"Käytin am-sanaa viikonpäivän edellä."},
  {id:"um",title:"Käytin um-sanaa tasatunnin edellä."},
  {id:"meaning",title:"Ymmärrän koko kirjoittamani viestin merkityksen."},
 ],
};
