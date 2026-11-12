import {LOS1_C01_LINES,LOS1_C01_GLOSS} from "./los1C01.ts";
import {LOS1_M_COM_02_LINES,LOS1_M_COM_02_GLOSS} from "./los1MCom02.ts";

export type LosTextBChapter="04"|"06"|"07"|"10";
type Question={id:string;prompt:string;options:readonly {id:"a"|"b"|"c";text:string}[];correctId:"a"|"b"|"c";explanation:string};
const question=(ch:LosTextBChapter,n:number,prompt:string,choices:[string,string,string],correctId:"a"|"b"|"c",explanation:string):Question=>({
 id:"C"+ch+"-TEXTB-Q"+String(n).padStart(2,"0"),prompt,
 options:choices.map((text,i)=>({id:(["a","b","c"] as const)[i]!,text})),correctId,explanation,
});
/**
 * Text B must be an ENTIRE verified human-made audio/text resource and NOT
 * another AI-made faux-authentic dialogue. Original transcripts are from the
 * publishers. Alphabet learner aid is explicitly NOT a verbatim transcript.
 *
 * These older resources are deliberately reused in a new learning context,
 * which is disclosed to the student; reuse is not a new distinct source.
 * None has undergone iOS/desktop playback QA.
 */
const greetingTranscript=[
 "Hallo!","Servus!","Moin!","Moin Moin!","Guten Morgen!","Morgen!",
 "Guten Tag!","Tag!","Guten Abend!","Grüß Gott!","Auf Wiedersehen!",
 "Wiedersehen!","Tschüss!","Tschau!","Servus!","Bis später!",
 "Bis dann!","Bis bald!","Bis gleich!","Gute Nacht!",
] as const;
const greetingsMeaning=[
 "Hei!","Hei! (alueellinen)","Hei! (Pohjois-Saksa)","Hei hei! (Pohjois-Saksa)",
 "Hyvää huomenta!","Huomenta!","Hyvää päivää!","Päivää!","Hyvää iltaa!",
 "Hyvää päivää! (erityisesti Etelä-Saksa ja Itävalta)","Näkemiin!",
 "Näkemiin! (lyhentynyt)","Moikka!","Moikka!","Hei! (alueellinen)",
 "Nähdään myöhemmin!","Nähdään sitten!","Nähdään pian!","Nähdään kohta!","Hyvää yötä!",
] as const;
const c04Lines=greetingTranscript.map((text,i)=>({
 id:"u"+String(i+1).padStart(2,"0"),speaker:"Puhuja",text,meaning:greetingsMeaning[i]!,
}));
export const LOS1_TEXT_B_SOURCES={
 "04":{
  sourceId:"M-COM-03",title:"Tervehdysten rekisterit eri tilanteissa",
  summary:"Koko 28 sekunnin autenttinen tervehdys- ja hyvästelylista. Sama lähde oli myös C01:n Text B:ssä, mutta tässä verrataan tuttavallista ja kohteliasta rekisteriä. Tämä ei ole kahden henkilön dialogi.",
  transcriptIsExact:true,lines:c04Lines,
  glossary:{
   hallo:"hei",servus:"hei/moikka (alueellinen)",moin:"hei (Pohjois-Saksa)",
   guten:"hyvää; esimerkiksi Guten Tag",morgen:"huomenta / aamu",tag:"päivä",
   abend:"ilta",grüß:"tervehdysmuoto",gott:"Jumala; tässä osa vakiintunutta tervehdystä",
   auf:"Auf Wiedersehen -ilmauksen osa",wiedersehen:"näkemiin",
   tschüss:"moikka",tschau:"moikka",bis:"asti; Bis später! = nähdään myöhemmin",
   später:"myöhemmin",dann:"sitten",bald:"pian",gleich:"kohta",gute:"hyvää",
   nacht:"yö",
  },
  attribution:{author:"German Men92",title:"German Vocabulary - Greetings.ogg",url:"https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Greetings.ogg",license:"Public domain",licenseUrl:"https://creativecommons.org/publicdomain/mark/1.0/"},
  questions:[
   question("04",1,"Mikä luettelon ilmaus sopii kohteliaaseen päiväsaikaiseen tervehdykseen?",["Guten Tag!","Tschüss!","Gute Nacht!"],"a","Guten Tag! on päivätervehdys. Tschüss! on hyvästely."),
   question("04",2,"Mikä luettelon ilmaus on selkeä kohtelias hyvästely?",["Moin Moin!","Auf Wiedersehen!","Guten Morgen!"],"b","Auf Wiedersehen! on tavallinen kohtelias hyvästely."),
   question("04",3,"Mikä on luettelon arkipäiväinen hyvästely?",["Guten Abend!","Grüß Gott!","Tschüss!"],"c","Tschüss! on tuttavallinen moikka."),
   question("04",4,"Mikä ilmauksista tarkoittaa nähdään pian?",["Bis bald!","Bis gleich!","Bis später!"],"a","Bis bald! = nähdään pian. Bis gleich on nähdään kohta."),
  ],
 },
 "06":{
  sourceId:"M-COM-01",title:"Franz ja Jörg: ikäkeskustelun kertaus",
  summary:"Koko alkuperäinen kahdeksan repliikin keskustelu, joka nähtiin jo C01:ssä. Tässä sitä harjoitellaan eri tarkoituksessa: etsitään ikää ja numeroita. Äänitteessä ei ole kahta saksaa äidinkielenään puhuvaa henkilöä.",
  transcriptIsExact:true,lines:LOS1_C01_LINES,glossary:LOS1_C01_GLOSS,
  attribution:{author:"Xzapro4 ja Erkan Yilmaz (2008)",title:"GesprächVorstellung.ogg",url:"https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg",license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"},
  questions:[
   question("06",1,"Kumpi kysyy: Wie alt bist du?",["Franz","Jörg","Peter"],"b","Jörg kysyy toisen ikää neljännessä repliikissä."),
   question("06",2,"Minkä ikäinen Franz on?",["19-vuotias","20-vuotias","17-vuotias"],"a","Franz sanoo neunzehn Jahre alt."),
   question("06",3,"Minkä ikäinen Jörg on?",["19-vuotias","17-vuotias","20-vuotias"],"c","Jörg vastaa Ich bin zwanzig."),
   question("06",4,"Mitä Jörg sanoo viimeiseksi?",["Tschüss!","Guten Morgen!","Gute Nacht!"],"a","Jörgin viimeinen repliikki on Tschüss!"),
  ],
 },
 "07":{
  sourceId:"M-COM-06",title:"Saksan aakkosten alkuperäinen äänite",
  summary:"Noin minuutin kokonainen ihmisen äänittämä aakkostallenne. Alla oleva kirjainrivi on LOS!:n oma harjoittelutuki, ei sanatarkaksi vahvistettu äänitteen litteraatti. Toista kirjaimet itse ääneen. Äänentoisto ja tarkka lausuntajärjestys odottavat vielä laitetarkistusta.",
  transcriptIsExact:false,lines:[] as const,glossary:{} as Readonly<Record<string,string>>,
  attribution:{author:"endymi0n (äänite); German Men92 (Wikibooks-julkaisu)",title:"German Grammar - The Alphabet.ogg",url:"https://commons.wikimedia.org/wiki/File:German_Grammar_-_The_Alphabet.ogg",license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"},
  questions:[
   question("07",1,"Mikä kirjoitusasu kuuluu saksan aakkosiin myös erikoiskirjaimena?",["Å","ß","Ø"],"b","Saksan erikoismerkkejä ovat ä, ö, ü ja ß."),
   question("07",2,"Mikä vastaa peruskirjainta Ä, kun kaksi pistettä puuttuu näppäimistöltä?",["Ae","Ou","Ss"],"a","Ä voidaan tarvittaessa kirjoittaa Ae, erityisesti teknisissä merkintätilanteissa."),
   question("07",3,"Mikä on kirjaimen ß tavallinen varakirjoitus?",["zz","bb","ss"],"c","ß-kirjainta vastaa usein ss, mutta oikeinkirjoituksen säännöt ratkaisevat käytön."),
   question("07",4,"Mitä tarkoittaa Bitte buchstabieren Sie?",["Vielä kerran, kiitos","Olkaa hyvä ja tavatkaa","Mikä ikänne on?"],"b","Bitte buchstabieren Sie pyytää kohteliaasti tavaamaan."),
  ],
 },
 "10":{
  sourceId:"M-COM-02",title:"Thomas ja Takashi: kolmannen henkilön esittely",
  summary:"Koko neljän repliikin autenttinen esittelydialogi; sitä käytettiin myös C02:ssa ja C03:ssa. Nyt etsi erityisesti Das ist Peter ja wir kommen aus -ilmaisu. Äänitteen toisto on vielä testaamatta iPhonella ja tietokoneella.",
  transcriptIsExact:true,lines:LOS1_M_COM_02_LINES,glossary:LOS1_M_COM_02_GLOSS,
  attribution:{author:"Ariser (2011)",title:"Deutsch Dialog . Ich bin Peter.ogg",url:"https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg",license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"},
  questions:[
   question("10",1,"Kuka aloittaa esittelykeskustelun?",["Thomas","Takashi","Peter"],"a","Thomas kysyy Wie heißt du?"),
   question("10",2,"Kenen Thomas esittelee sanomalla Das ist ...?",["Franzin","Peterin","Jörgin"],"b","Das ist Peter esittelee kolmannen henkilön."),
   question("10",3,"Mistä Thomas ja Peter sanovat tulevansa?",["Kyotosta","Münchenistä","Berliinistä"],"c","Thomas sanoo Wir kommen aus Berlin."),
   question("10",4,"Mistä Takashi kertoo olevansa?",["Kiotosta","Berliinistä","Kielistä"],"a","Takashi kertoo Ich komme aus Kyoto."),
  ],
 },
} as const;
export function isLosTextBChapter(id:string):id is LosTextBChapter{return id in LOS1_TEXT_B_SOURCES;}
export function validateLosTextB():string[]{
 const errors:string[]=[];
 for(const chapterId of ["04","06","07","10"] as const){
  const resource=LOS1_TEXT_B_SOURCES[chapterId];
  if(resource.questions.length!==4)errors.push("C"+chapterId+" requires four checks");
  if(new Set(resource.questions.map(q=>q.id)).size!==4)errors.push("C"+chapterId+" duplicate question IDs");
  for(const q of resource.questions)
   if(!q.options.some(a=>a.id===q.correctId)||q.options.length!==3||!q.explanation)errors.push(q.id);
  if(resource.transcriptIsExact&&!resource.lines.length)errors.push("C"+chapterId+" exact text missing");
  if(!resource.attribution.url.startsWith("https://commons.wikimedia.org/wiki/File:"))errors.push("C"+chapterId+" missing source page");
 }
 return errors;
}
