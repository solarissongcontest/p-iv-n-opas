/**
 * The 16 exercise render/evaluation contracts from the LOS! masterplan.
 * Every runnable example is an original LOS! beginner exercise grounded in
 * material already present inside LOS! 1. Video is a supported but explicitly
 * GATED type until a verified, playable source/timecode is approved.
 */
export const LOS_RICH_TYPES=[
 "highlight-span","single-choice","true-false","fill-gap","match-pairs",
 "word-order","translation-restricted","locate-evidence","listen-select",
 "listen-type","video-comprehension","article-sort","inflection-grid",
 "correct-error","guided-writing","record-and-reflect",
] as const;
export type LosRichType=typeof LOS_RICH_TYPES[number];
type Pair={id:string;left:string;right:string};
export type LosRichTask={
 id:string;chapterId:string;type:LosRichType;prompt:string;hint:string;explanation:string;
 sourceId?:string;options?:readonly {id:string;label:string}[];
 accepted?:readonly string[];tokens?:readonly {id:string;text:string}[];
 pairs?:readonly Pair[];grid?:readonly Pair[];audio?:{src:string;sourceUrl:string;license:string;sourceId:string};
 video?:{officialUrl:string;embedUrl:string;verified:boolean;timestampSeconds:number};
 minLength?:number;
};
const opt=(...items:[string,string][]):{id:string;label:string}[]=>items.map(([id,label])=>({id,label}));
const commons=(file:string)=>"https://commons.wikimedia.org/wiki/";
export const LOS1_RICH_TASKS:readonly LosRichTask[]=[
 {id:"RICH-C01-HIGHLIGHT",chapterId:"01",type:"highlight-span",
  prompt:"Korosta lähteen tervehdysluettelosta täsmälleen sana Moin!",
  hint:"Napauta alkuperäisestä kolmesta ilmauksesta oikea. Sanavalinta tallentuu tunnisteen, ei pikselisijainnin perusteella.",
  sourceId:"M-COM-03",tokens:[{id:"u01-t01",text:"Hallo!"},{id:"u01-t02",text:"Servus!"},{id:"u01-t03",text:"Moin!"}],
  accepted:["u01-t03"],explanation:"Moin! on kolmas tervehdys Commonsin alkuperäisen luettelon alussa."},
 {id:"RICH-C01-CHOICE",chapterId:"01",type:"single-choice",
  prompt:"Mikä sopii, kun tervehdit aamulla?",
  hint:"Morgen = aamu.",options:opt(["a","Guten Abend!"],["b","Guten Morgen!"],["c","Tschüss!"]),
  accepted:["b"],explanation:"Guten Morgen! on aamun tervehdys."},
 {id:"RICH-C01-DICTATION",chapterId:"01",type:"listen-type",
  prompt:"Kuuntele koko tervehdysluettelo ja kirjoita sen ensimmäinen tervehdys.",
  hint:"Käytä vain ihmisen alkuperäistä äänitettä. Älä arvaa äänitteen perusteella ennen toistoa.",
  sourceId:"M-COM-03",audio:{src:commons("Special:Redirect/file/German_Vocabulary_-_Greetings.ogg"),
   sourceUrl:commons("File:German_Vocabulary_-_Greetings.ogg"),license:"Public domain",sourceId:"M-COM-03"},
  accepted:["Hallo","Hallo!"],explanation:"Alkuperäisen tervehdyksen ensimmäinen sana on Hallo!"},
 {id:"RICH-C02-TRUE",chapterId:"02",type:"true-false",
  prompt:"Väite: Du bist Anna. on oikein muodostettu lause.",
  hint:"Sein-verbin muoto on du bist.",options:opt(["true","Totta"],["false","Epätotta"]),
  accepted:["true"],explanation:"Du bist Anna. on oikein. Du bin Anna. olisi väärin."},
 {id:"RICH-C02-MATCH",chapterId:"02",type:"match-pairs",
  prompt:"Yhdistä kolme saksankielistä ilmausta oikeaan suomennokseen.",
  hint:"Käytä alasvetovalikoita, yksi suomennos kullekin ilmaukselle.",
  pairs:[{id:"a",left:"Wie heißt du?",right:"Mikä sinun nimesi on?"},
   {id:"b",left:"Ich heiße Mia.",right:"Minun nimeni on Mia."},
   {id:"c",left:"Das ist Leo.",right:"Tämä on Leo."}],
  explanation:"Wie heißt du? kysyy nimeä; Ich heiße ... kertoo oman nimen; Das ist ... esittelee toisen."},
 {id:"RICH-C03-FILL",chapterId:"03",type:"fill-gap",
  prompt:"Täydennä yhdellä sanalla: Ich ___ aus Finnland.",
  hint:"Kommen-verbin ich-muoto.",accepted:["komme"],
  explanation:"Ich komme aus Finnland. = Olen kotoisin Suomesta."},
 {id:"RICH-C03-TRANSLATE",chapterId:"03",type:"translation-restricted",
  prompt:"Käännä saksaksi: Olen kotoisin Suomesta.",
  hint:"Aloita Ich, käytä kommen-verbin ich-muotoa ja aus-prepositiota.",
  accepted:["Ich komme aus Finnland.","Ich komme aus Finnland"],
  explanation:"Ich komme aus Finnland. on täsmällinen, opetettuihin muotoihin perustuva käännös. Vapaata käännöstä ei automaattisesti pisteytetä."},
 {id:"RICH-C04-ORDER",chapterId:"04",type:"word-order",
  prompt:"Järjestä nämä sanat kohteliaaksi nimikysymykseksi: Sie? / Wie / heißen",
  hint:"Kysymyssana tulee alkuun ja verbi sen jälkeen.",
  accepted:["Wie heißen Sie?"],tokens:[{id:"w1",text:"Sie?"},{id:"w2",text:"Wie"},{id:"w3",text:"heißen"}],
  explanation:"Wie heißen Sie? on kohtelias nimikysymys."},
 {id:"RICH-C05-CORRECT",chapterId:"05",type:"correct-error",
  prompt:"Korjaa virke: Mir geht ich gut.",
  hint:"Oikea kokonainen opittu vointifraasi alkaa Es geht ...",
  accepted:["Es geht mir gut.","Es geht mir gut"],
  explanation:"Es geht mir gut. on oikea kiinteä vointifraasi."},
 {id:"RICH-C06-EVIDENCE",chapterId:"06",type:"locate-evidence",
  prompt:"Minkä alkuperäistekstin rivin lapsi sanoo olevansa jo 12-vuotias?",
  hint:"Avaa C06:n Text A ja etsi zwölf Jahre alt.",
  sourceId:"M-ZPE-01",options:opt(["u02","u02 · Ich bin fünf."],
   ["u08","u08 · Ich bin schon zwölf Jahre alt."],["u10","u10 · Wir sind 10."]),
  accepted:["u08"],explanation:"C06:n lähteen dialogin toinen vastaaja sanoo u08: Ich bin schon zwölf Jahre alt."},
 {id:"RICH-C07-ARTICLES",chapterId:"07",type:"article-sort",
  prompt:"Valitse kolmelle kappaleen sanalle oikea artikkeli.",
  hint:"Tarkista ensin C07:n sanasto: der Buchstabe, die Nummer, das Handy.",
  grid:[{id:"b",left:"Buchstabe",right:"der"},
   {id:"n",left:"Nummer",right:"die"},{id:"h",left:"Handy",right:"das"}],
  explanation:"der Buchstabe, die Nummer ja das Handy ovat sanaston oppimistavoitteeseen kuuluvat artikkelit."},
 {id:"RICH-C08-VIDEO",chapterId:"08",type:"video-comprehension",
  prompt:"Mitä opiskelija esittää opettajalle virallisessa videotilanteessa?",
  hint:"Älä vastaa katsomatta oikeaa, hyväksyttyä videota. Tämän lähteen oikeus ja toisto ovat vielä tarkistamatta.",
  sourceId:"V-DIB-01",video:{officialUrl:"https://www.coerll.utexas.edu/dib/vid.php?f=01_29_sik_student-id",
   embedUrl:"",verified:false,timestampSeconds:0},options:opt(["a","Henkilökortin"],
   ["b","Opiskelijakortin"],["c","Passin"]),accepted:["b"],
  explanation:"Oikea lähde on Der Studentenausweis, mutta vastaus aktivoidaan vasta, kun media ja aikakohta on vahvistettu."},
 {id:"RICH-C09-LISTEN",chapterId:"09",type:"listen-select",
  prompt:"Kuuntele koko seitsemän viikonpäivän alkuperäisäänite. Mikä on listan ensimmäinen päivä?",
  hint:"Kuuntele äänen koko 15 sekunnin luettelo ennen valintaa.",
  sourceId:"M-COM-07",audio:{src:commons("Special:Redirect/file/German_Vocabulary_-_Days.ogg"),
   sourceUrl:commons("File:German_Vocabulary_-_Days.ogg"),license:"CC BY-SA 3.0",sourceId:"M-COM-07"},
  options:opt(["a","Sonntag"],["b","Montag"],["c","Freitag"]),accepted:["b"],
  explanation:"Listan ensimmäinen päivä on Montag, jonka jälkeen tulee Dienstag."},
 {id:"RICH-C10-INFLECT",chapterId:"10",type:"inflection-grid",
  prompt:"Täytä kommen-verbin kolme opittua persoonamuotoa.",
  hint:"Ich komme, du kommst, er kommt.",
  grid:[{id:"ich",left:"ich",right:"komme"},{id:"du",left:"du",right:"kommst"},{id:"er",left:"er",right:"kommt"}],
  explanation:"Kommen taipuu tässä ich komme, du kommst ja er kommt."},
 {id:"RICH-C10-WRITE",chapterId:"10",type:"guided-writing",
  prompt:"Kirjoita omia saksankielisiä lauseita kuvitteellisesta ystävästäsi. Kerro nimi, ikä, alkuperä ja hyvästely.",
  hint:"Tee vähintään 80 merkin teksti. Vahvista itse, että käytit opittuja kolmannen persoonan muotoja.",
  minLength:80,explanation:"Tämä on itsearvioitava kirjoitustyö, ei automaattinen kielioppiarvosana."},
 {id:"RICH-C10-VOICE",chapterId:"10",type:"record-and-reflect",
  prompt:"Äänitä kuvitteellisen henkilön esittely ja kirjaa, mitä sait sanottua ilman mallia.",
  hint:"Tee paikallinen äänitys itse, käynnistä tiedoston lataus ja kirjaa vähintään 15 merkin oma arvio.",
  minLength:15,explanation:"Puhetta ei pisteytetä. Äänite ei siirry palvelimelle eikä varmuuskopioon; vain oma arvio ja latausyrityksen tieto säilyvät."},
] as const;

export type LosRichOutcome="unanswered"|"right"|"wrong"|"self-assessed"|"media-unavailable"|"requires-audio";
const norm=(text:string)=>text.normalize("NFC").trim().replace(/\s+/g," ");
const parseGrid=(answer:string):Record<string,string>|null=>{
 try{
  const value=JSON.parse(answer) as unknown;
  if(!value||typeof value!=="object"||Array.isArray(value))return null;
  if(!Object.values(value).every(x=>typeof x==="string"))return null;
  return value as Record<string,string>;
 }catch{return null;}
};
export function gradeLosRichTask(task:LosRichTask,response:string,
 flags?:{audioFinished?:boolean;selfReviewed?:boolean;recordDownloadStarted?:boolean},
):LosRichOutcome{
 if(task.type==="video-comprehension"&&!task.video?.verified)return "media-unavailable";
 if(task.audio&&!flags?.audioFinished)return "requires-audio";
 if(task.type==="guided-writing")return norm(response).length>=(task.minLength??80)&&
  flags?.selfReviewed?"self-assessed":"unanswered";
 if(task.type==="record-and-reflect")return norm(response).length>=(task.minLength??15)&&
  flags?.selfReviewed&&flags.recordDownloadStarted?"self-assessed":"unanswered";
 if(!response.trim())return "unanswered";
 if(task.type==="match-pairs"||task.type==="article-sort"||task.type==="inflection-grid"){
  const map=parseGrid(response),items=task.pairs??task.grid??[];
  if(!map||items.length===0||items.some(row=>!map[row.id]))return "unanswered";
  return items.every(row=>norm(map[row.id]??"")===norm(row.right))?"right":"wrong";
 }
 if(task.type==="highlight-span"){
  const expected=(task.accepted??[]).join(",");
  return response===expected?"right":"wrong";
 }
 const accepted=task.accepted??[];
 return accepted.some(value=>norm(value)===norm(response))?"right":"wrong";
}
export const losRichTasksFor=(chapterId:string):readonly LosRichTask[]=>
 LOS1_RICH_TASKS.filter(task=>task.chapterId===chapterId);
export function validateLosRichBank():string[]{
 const errors:string[]=[];
 if(LOS1_RICH_TASKS.length!==16)errors.push("16 unique authentic-content task examples required");
 if(new Set(LOS1_RICH_TASKS.map(x=>x.id)).size!==LOS1_RICH_TASKS.length)errors.push("Duplicate ids");
 if(new Set(LOS1_RICH_TASKS.map(x=>x.type)).size!==LOS_RICH_TYPES.length)errors.push("Not all 16 supported types represented");
 for(const task of LOS1_RICH_TASKS){
  if(!/^\d{2}$/.test(task.chapterId)||!task.prompt||!task.explanation||!task.hint)errors.push(task.id+" metadata");
  if(["match-pairs","article-sort","inflection-grid"].includes(task.type)&&
    !(task.pairs??task.grid)?.length)errors.push(task.id+" structured rows");
  if(["listen-select","listen-type"].includes(task.type)&&!task.audio?.sourceUrl)errors.push(task.id+" authentic audio");
  if(task.type==="video-comprehension"&&task.video?.verified)errors.push(task.id+" unverified source cannot be enabled");
 }
 return errors;
}
