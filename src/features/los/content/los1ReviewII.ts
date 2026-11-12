/**
 * LOS! 1 Review II (L056-L058): original mixed-skills tasks.
 * No prerecorded listening claims and no third-party original-text substitutes.
 * Each of three review lessons has five distinct, manually checked items.
 */
export type LosReviewIIGroupId="L056"|"L057"|"L058";
export type LosReviewIIQuestion={
  id:string;group:LosReviewIIGroupId;prompt:string;
  answers:readonly {id:"a"|"b"|"c";text:string}[];
  correctId:"a"|"b"|"c";explanation:string;
};
const make=(group:LosReviewIIGroupId,n:number,prompt:string,answers:[string,string,string],correctId:"a"|"b"|"c",explanation:string):LosReviewIIQuestion=>({
  id:"EX-REV2-Q"+String(n).padStart(2,"0"),group,prompt,
  answers:answers.map((text,i)=>({id:(["a","b","c"] as const)[i]!,text})),
  correctId,explanation
});
export const LOS1_REVIEW_II_QUESTIONS:readonly LosReviewIIQuestion[]=[
  make("L056",1,"Mikä on saksaksi seitsemäntoista?",["siebzehn","siebenzehn","siebzig"],"a","Saksan 17 on siebzehn, jossa sieben lyhenee."),
  make("L056",2,"Miten sanot saksaksi luvun 21?",["zwanzigeins","einundzwanzig","einszwanzig"],"b","Einundzwanzig rakentuu ykköset + und + kymmenet."),
  make("L056",3,"Miten nimi Mia tavataan kirjainmerkeillä?",["M – E – A","M – I – E","M – I – A"],"c","Mia kirjoitetaan M, I ja A. Kirjaimet eivät yksin kuvaa saksalaisia kirjainnimiä."),
  make("L056",4,"Miten merkitset maanantaina kello kolmelta?",["am Montag um drei Uhr","um Montag am drei Uhr","in Montag drei Uhr"],"a","Am ilmaisee viikonpäivän ja um kellonajan."),
  make("L056",5,"Mikä viikonpäivä on Mittwoch?",["maanantai","keskiviikko","perjantai"],"b","Mittwoch tarkoittaa keskiviikkoa."),
  make("L057",6,"Mikä on kohtelias nimikysymys?",["Wie heißt du?","Wie heiße Sie?","Wie heißen Sie?"],"c","Sie-puhuttelun kanssa käytetään muotoa heißen."),
  make("L057",7,"Miten kerrot olevasi Suomesta?",["Ich komme aus Finnland.","Ich komme in Finnland.","Ich kommst aus Finnland."],"a","Ich komme aus Finnland ilmaisee alkuperämaan."),
  make("L057",8,"Kuinka kerrot olevasi 19-vuotias?",["Ich habe neunzehn Jahre alt.","Ich bin neunzehn Jahre alt.","Du bin neunzehn alt."],"b","Saksaksi ikä ilmaistaan sein-verbillä: Ich bin ... Jahre alt."),
  make("L057",9,"Miten pyydät, että puhutaan hitaammin?",["Wie heißt du?","Wie spät ist es?","Bitte langsamer."],"c","Bitte langsamer on lyhyt selviytymisfraasi."),
  make("L057",10,"Miten kysyt Mitä kuuluu? tuttavalta?",["Wie geht's?","Woher kommst du?","Wie alt bist du?"],"a","Wie geht's? on tuttu kuulumiskysymys."),
  make("L058",11,"Mikä esittely aloittaa luontevasti tuttavallisen kohtaamisen?",["Wie heißt Sie?","Hallo! Ich heiße Nora.","Ich sind Nora."],"b","Hallo! Ich heiße Nora. on luonteva esittäytymisen alku."),
  make("L058",12,"Mikä on oikea kysymys toisen lähtömaasta?",["Wo kommst Sie?","Was heißen du?","Woher kommst du?"],"c","Woher kommst du? kysyy epämuodollisesti lähtömaata."),
  make("L058",13,"Miten esittelet kuvitteellisen mieshenkilön Saksasta?",["Er kommt aus Deutschland.","Er kommst aus Deutschland.","Du kommt aus Deutschland."],"a","Kolmannessa persoonassa käytetään Er kommt aus Deutschland."),
  make("L058",14,"Miten sanot kohteliaasti Nähdään / Näkemiin?",["Gute Nacht!","Auf Wiedersehen!","Guten Morgen!"],"b","Auf Wiedersehen! on kohtelias hyvästely."),
  make("L058",15,"Mikä vastaa kysymykseen Wie geht's? luontevasti?",["Woher kommst du?","Ich heißt Leo.","Gut, danke. Und dir?"],"c","Gut, danke. Und dir? vastaa kuulumisiin ja kysyy vastakysymyksen."),
] as const;
export const LOS1_REVIEW_II_GROUPS=[
  {id:"L056" as const,title:"Luvut, tavaaminen ja viikonpäivät",description:"C06:n lukujen, C07:n tavauksen ja C09:n ajanilmausten yhdistäminen."},
  {id:"L057" as const,title:"Kaikkien 10 kappaleen taitosekoitus",description:"Tervehdykset, esittäytyminen, ikä, alkuperä, kohteliaisuus ja avunpyyntöfraasit."},
  {id:"L058" as const,title:"Täydellinen esittelyharjoitus ilman vihjeitä",description:"Kokoaminen yhdeksi keskusteluksi sekä 5 tarkistettavaa kertaustehtävää. Puhuminen ja oma teksti itsearvioidaan erikseen."},
] as const;
export const losReviewIIQuestionsFor=(id:LosReviewIIGroupId):readonly LosReviewIIQuestion[]=>
  LOS1_REVIEW_II_QUESTIONS.filter(q=>q.group===id);
export const losReviewIIReflectionId=(id:LosReviewIIGroupId)=>
  "EX-REV2-SELF-"+id.slice(1);
export function validateLosReviewIIQuestions():string[]{
  const issues:string[]=[];
  if(LOS1_REVIEW_II_QUESTIONS.length!==15)issues.push("Kertauksessa II pitää olla 15 tarkistettavaa tehtävää.");
  if(new Set(LOS1_REVIEW_II_QUESTIONS.map(q=>q.id)).size!==15)issues.push("Kaksinkertainen tehtävätunnus.");
  for(const group of LOS1_REVIEW_II_GROUPS){
    if(losReviewIIQuestionsFor(group.id).length!==5)issues.push(group.id+": pitää sisältää viisi tehtävää.");
  }
  for(const question of LOS1_REVIEW_II_QUESTIONS){
    if(question.answers.length!==3 || !question.answers.some(a=>a.id===question.correctId) ||
       !question.prompt.trim() || !question.explanation.trim())issues.push(question.id+" virheellinen.");
  }
  return issues;
}
