/** C09 formative practice: carefully limited to taught weekdays and whole hours.
 * All calendar entries are explicitly fictional and LOS!-authored.
 * Text A and the weekday audio are NOT yet complete or gradable.
 */
import type {Exercise} from "./model";
import {LOS1_C09_WEEKDAYS,LOS1_C09_CALENDAR_ENTRIES} from "./los1-c09-content.ts";
const base={version:"0.1.0",difficulty:"guided" as const,
 objectives:["L1-TIME-01"]};
const choice=(id:string,promptFi:string,options:[string,string,string],right:0|1|2,explanationFi:string):Exercise=>({
 ...base,id:"los1-c09-"+id,type:"single-choice",promptFi,
 options:options.map((label,i)=>({id:"o"+i,label})),correctOptionId:"o"+right,explanationFi,
});
const gap=(id:string,promptFi:string,before:string,after:string,answer:string,explanationFi:string,caseSensitive=false):Exercise=>({
 ...base,id:"los1-c09-"+id,type:"gap-fill",promptFi,sentenceBefore:before,sentenceAfter:after,
 acceptedAnswers:[answer],caseSensitive,explanationFi,
});
const order=(id:string,promptFi:string,parts:string[],correctOrder:string[],explanationFi:string):Exercise=>({
 ...base,id:"los1-c09-"+id,type:"word-order",promptFi,
 tokens:parts.map((label,i)=>({id:"p"+i,label})),
 correctOrder,explanationFi,
});
const dayFi=["maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai","sunnuntai"];
export const LOS1_C09_DAY_EXERCISES:Exercise[]=LOS1_C09_WEEKDAYS.map((day,i)=>
 gap("weekday-"+String(i+1).padStart(2,"0"),
  "Kirjoita viikonpäivä saksaksi: "+dayFi[i]+".",
  "Der Tag:", "", day,
  dayFi[i]+" on saksaksi "+day+". Viikonpäivä kirjoitetaan isolla alkukirjaimella opetustekstissä."));
export const LOS1_C09_CALENDAR_EXERCISES:Exercise[]=LOS1_C09_CALENDAR_ENTRIES.map((entry,i)=>
 gap("calendar-"+String(i+1).padStart(2,"0"),
  "Täydennä LOS!:n kuvitteellinen kalenterimerkintä: "+
    entry.day+", klo "+entry.hour+":00. Kirjoita vain tasatunnin saksankielinen lukusana.",
  "am "+entry.day+" um","Uhr",entry.time,
  "Tässä kuvitteellisessa tehtävässä oikea ilmaus on am "+entry.day+" um "+entry.time+" Uhr."));
export const LOS1_C09_PRACTICE_EXERCISES:Exercise[]=[
 choice("intro-when","Miten kysyt saksaksi 'milloin'?",
   ["Wer?","Wann?","Woher?"],1,"Wann? tarkoittaa milloin?"),
 choice("intro-day","Mikä viikonpäivä vastaa suomen maanantaita?",
   ["Montag","Mittwoch","Freitag"],0,"Montag = maanantai."),
 choice("intro-order","Mikä päivä on saksankielisessä maanantaista alkavassa viikossa ensimmäinen?",
   ["Sonntag","Samstag","Montag"],2,"Tässä oppikirjan kalenterissa viikko alkaa maanantaista."),
 choice("intro-weekend","Mitä am Wochenende tarkoittaa?",
   ["keskiviikkona","viikonloppuna","huomenna"],1,"Am Wochenende = viikonloppuna."),
 choice("preposition-day","Mikä on oikein: maanantaina?",
   ["um Montag","am Montag","an drei Uhr"],1,"Viikonpäivässä am Montag."),
 choice("preposition-hour","Mikä on oikein: kello kolmelta?",
   ["um drei Uhr","am drei Uhr","um Montag"],0,"Tasatunnin edellä käytetään um."),
 choice("preposition-both","Mikä on oikein: maanantaina kello kolmelta?",
   ["um Montag am drei Uhr","Montag Uhr um drei","am Montag um drei Uhr"],2,
   "Päivä: am Montag. Tasatunti: um drei Uhr."),
 choice("meaning-heute","Mitä heute tarkoittaa?",
   ["huomenna","tänään","eilen"],1,"Heute = tänään."),
 choice("meaning-morgen","Mitä morgen tarkoittaa pienellä alkukirjaimella?",
   ["huomenna","aamu (substantiivi)","viikko"],0,
   "morgen pienellä tarkoittaa huomenna; der Morgen isolla on aamu."),
 choice("meaning-gestern","Mitä gestern tarkoittaa?",
   ["eilen","maanantaina","tänään"],0,"Gestern = eilen."),
 choice("meaning-week","Mitä die Woche tarkoittaa?",
   ["kello","viikko","kuukausi"],1,"Die Woche = viikko."),
 choice("meaning-uhr","Mitä Uhr tarkoittaa ajanilmauksessa?",
   ["minuutit","tasatunnin yhteydessä kello","huomenna"],1,
   "Um drei Uhr on kello kolmelta."),
 choice("source-list-kind","Mitä Wikibooksin Geburtstag-lähteestä on julkaistu C09:n Text B:ssä?",
   ["Koko äänitetty puhelinkeskustelu.","Seitsemän kirjoitetun viikonpäivän luettelo.",
    "Uusi itse tehty haastattelu."],1,
   "Text B sisältää koko valitun autenttisen viikonpäiväluettelon, ei ääntä."),
 choice("advanced-recognition","Mitä lähteen ajanilmaus Viertel vor drei tarkoittaa?",
   ["2.45","3.15","3.45"],0,
   "Viertel vor drei = varttia vaille kolme = 2.45. Tämä on tunnistettava lisämuoto, ei aktiivisen tuotoksen vaatimus."),
 choice("culture-format","Mikä pitää paikkansa kalenterimerkinnässä am Dienstag?",
   ["Dienstag aloitetaan isolla.","Viikonpäivät kirjoitetaan saksassa pienellä.",
    "Am tarkoittaa aina kellonaikaa."],0,
   "Viikonpäivät ovat saksassa substantiiveja ja alkavat isolla."),
 gap("grammar-day","Täydennä ilmaus maanantaina.","","Montag","am",
   "Am Montag = maanantaina."),
 gap("grammar-hour","Täydennä ilmaus kello viideltä.","","fünf Uhr","um",
   "Um fünf Uhr tarkoittaa kello viideltä."),
 gap("grammar-when","Täydennä kysymyssana.","","? – Am Montag um drei Uhr.","Wann",
   "Wann? – Milloin?"),
 gap("grammar-three","Täydennä tasatunnin lukusana.","am Montag um","Uhr","drei",
   "Drei on kolme."),
 order("order-monday","Järjestä opittu päivä ja tasatunti.",
   ["um","drei","am Montag","Uhr"],["p2","p0","p1","p3"],
   "Am Montag um drei Uhr."),
 order("order-tuesday","Järjestä tiistain tasatunti.",
   ["Uhr","um","am Dienstag","vier"],["p2","p1","p3","p0"],
   "Am Dienstag um vier Uhr."),
 {
  ...base,id:"los1-c09-match-days",type:"matching",
  promptFi:"Yhdistä viisi viikonpäivää suomennoksiin.",
  left:[
   {id:"mo",label:"Montag"},{id:"mi",label:"Mittwoch"},{id:"fr",label:"Freitag"},
   {id:"sa",label:"Samstag"},{id:"so",label:"Sonntag"},
  ],
  right:[
   {id:"s",label:"sunnuntai"},{id:"k",label:"keskiviikko"},{id:"m",label:"maanantai"},
   {id:"l",label:"lauantai"},{id:"p",label:"perjantai"},
  ],
  pairs:[
   {leftId:"mo",rightId:"m"},{leftId:"mi",rightId:"k"},{leftId:"fr",rightId:"p"},
   {leftId:"sa",rightId:"l"},{leftId:"so",rightId:"s"},
  ],
  explanationFi:"Montag–maanantai, Mittwoch–keskiviikko, Freitag–perjantai, Samstag–lauantai, Sonntag–sunnuntai.",
 },
 {
  ...base,id:"los1-c09-calendar-meaning",type:"true-false",
  promptFi:"Totta vai tarua?",statement:"Ilmaus am Freitag um sechs Uhr tarkoittaa perjantaina kello kuudelta.",
  correctValue:true,explanationFi:"Am Freitag = perjantaina ja um sechs Uhr = kuudelta.",
 },
 {
  ...base,id:"los1-c09-recognition-not-required",type:"true-false",
  promptFi:"Totta vai tarua?",statement:"C09:ssa sinun täytyy osata tuottaa itsenäisesti kaikki Viertel vor/nach -kellonajat.",
  correctValue:false,
  explanationFi:"C09:n aktiivinen tavoite on tasatunti; varttia vaille -muoto on lähdetekstin tukitieto.",
 },
 {
  ...base,id:"los1-c09-categorize-time",type:"categorize",
  promptFi:"Lajittele sanoja: viikonpäivä, tasatunti vai aikamääre.",
  items:[
   {id:"montag",label:"Montag"},{id:"freitag",label:"Freitag"},
   {id:"umvier",label:"um vier Uhr"},{id:"umzehn",label:"um zehn Uhr"},
   {id:"heute",label:"heute"},{id:"gestern",label:"gestern"},
  ],
  categories:[
   {id:"day",label:"Viikonpäivä"},{id:"hour",label:"Tasatunti"},{id:"relative",label:"Tänään/eilen-tyyppinen ajanmääre"},
  ],
  assignments:[
   {itemId:"montag",categoryId:"day"},{itemId:"freitag",categoryId:"day"},
   {itemId:"umvier",categoryId:"hour"},{itemId:"umzehn",categoryId:"hour"},
   {itemId:"heute",categoryId:"relative"},{itemId:"gestern",categoryId:"relative"},
  ],
  explanationFi:"Montag/Freitag ovat viikonpäiviä; um + tasatunti on kellonaika; heute/gestern suhteutuvat nykyhetkeen.",
 },
 ...LOS1_C09_DAY_EXERCISES,
 ...LOS1_C09_CALENDAR_EXERCISES,
];
