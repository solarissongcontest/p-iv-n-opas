/**
 * Original LOS! 1 Review II practice: L056–L058.
 * These 15 authored review questions are NOT authentic source texts and NOT
 * part of the 50-point EX-FINAL. Checks record an attempt, not mastery.
 * None of these questions purports to assess actual audio comprehension.
 */
export type LosReviewIIGroupId = "L056" | "L057" | "L058";
export type LosReviewIIQuestion = {
  id:string;
  group:LosReviewIIGroupId;
  prompt:string;
  answers:readonly {id:"a"|"b"|"c";text:string}[];
  correctId:"a"|"b"|"c";
  explanation:string;
};
const question=(group:LosReviewIIGroupId,n:number,prompt:string,options:[string,string,string],
  correctId:"a"|"b"|"c",explanation:string):LosReviewIIQuestion=>({
    id:"EX-REV2-Q"+String(n).padStart(2,"0"),
    group,prompt,answers:options.map((text,i)=>({id:(["a","b","c"] as const)[i]!,text})),
    correctId,explanation,
});
export const LOS1_REVIEW_II_QUESTIONS:readonly LosReviewIIQuestion[]=[
  question("L056",1,"Mikä on luvun 16 oikea kirjoitusasu?",["sechszehn","sechzehn","sechszig"],"b","Luvussa 16 kirjoitetaan sechzehn. Sechs-sanan loppu-s jää pois."),
  question("L056",2,"Täydennä: Ich bin ___ Jahre alt. (17)",["siebzehn","siebenzehn","siebzig"],"a","Siebzehn tarkoittaa 17: seitsemän-sanan en-pääte lyhenee."),
  question("L056",3,"Miten sanot luvun 21?",["zwanzigeins","einzwanzig","einundzwanzig"],"c","Saksaksi ykköset tulevat ennen kymmeniä: ein-und-zwanzig."),
  question("L056",4,"Kumpi kysyy toisen ikää sinutellen?",["Wie alt bist du?","Woher kommst du?","Wie heißt du?"],"a","Wie alt bist du? kysyy ikää. Woher kysyy alkuperää."),
  question("L056",5,"Mikä vastaa lukua 32?",["dreiundzwanzig","zweiunddreißig","dreizehn"],"b","32 on zweiunddreißig: kaksi ja kolmekymmentä."),
  question("L057",6,"Mikä tarkoittaa keskiviikkoa?",["Freitag","Montag","Mittwoch"],"c","Mittwoch on keskiviikko."),
  question("L057",7,"Miten sanot maanantaina?",["am Montag","um Montag","im Montag"],"a","Viikonpäivän yhteydessä käytetään am: am Montag."),
  question("L057",8,"Miten sanot kello kolmelta?",["am drei Uhr","um drei Uhr","in drei Uhr"],"b","Kellonajan edessä käytetään um: um drei Uhr."),
  question("L057",9,"Miten pyydät toistamaan?",["Ich heiße Anna.","Ich komme aus Finnland.","Noch einmal, bitte."],"c","Noch einmal, bitte. tarkoittaa Vielä kerran, kiitos."),
  question("L057",10,"Miten pyydät kohteliaasti tavaamaan nimen?",["Bitte buchstabieren Sie.","Wie geht es dir?","Bis morgen!"],"a","Bitte buchstabieren Sie. on kohtelias tavaamispyyntö."),
  question("L058",11,"Tapaat aikuisen tuntemattoman. Mikä nimikysymys sopii?",["Wie heißt du?","Wie heißen Sie?","Wie heiße ich?"],"b","Tuntematonta aikuista voi kohteliaasti puhutella Sie-muodolla: Wie heißen Sie?"),
  question("L058",12,"Kysyt ystävältä lähtömaata. Mikä lause on oikein?",["Woher kommen du?","Wie alt bist du?","Woher kommst du?"],"c","Du-pronominin kanssa kommen taipuu kommst."),
  question("L058",13,"Vastaat kohteliaaseen kuulumiskysymykseen myönteisesti.",["Gut, danke. Und Ihnen?","Ich heißt Leo.","Guten Morgen. Tschüss."],"a","Gut, danke. Und Ihnen? vastaa ja kysyy kohteliaasti takaisin."),
  question("L058",14,"Esittelet kuvitteellisen ystävän nimeltä Mia. Mikä on oikein?",["Sie heiße Mia.","Sie heißt Mia.","Du heißt Mia."],"b","Kolmannessa persoonassa: Sie heißt Mia. Tässä sie tarkoittaa häntä."),
  question("L058",15,"Miten hyvästelet ystävän ja sovit näkeväsi huomenna?",["Gute Nacht, Herr Müller.","Wie geht's?","Bis morgen!"],"c","Bis morgen! tarkoittaa Huomiseen!"),
] as const;
export const LOS1_REVIEW_II_GROUPS=[
  {id:"L056" as const,title:"Kertaus II · Numerot ja ikä",description:"Lukusanat, iän kertominen ja saksankielisten numeroiden kirjoitusasu.",sourceChapter:"06"},
  {id:"L057" as const,title:"Kertaus II · Tavaaminen ja tapaaminen",description:"Viikonpäivät, ajanilmaukset, tavaaminen ja selviytymisfraasit.",sourceChapter:"09"},
  {id:"L058" as const,title:"Kertaus II · Kokoava esittely",description:"Yhdistä LOS! 1:n alkeisfraasit ja kirjoita oma 5–7 lauseen kuvitteellinen esittely. Ei puheen konearviointia.",sourceChapter:"10"},
] as const;
export const LOS1_REVIEW_II_DRAFT_CHAPTER="92"; // Reserved assessment storage slot, not C92.
export const LOS1_REVIEW_II_WRITING_ID="EX-REV2-WRITING-058";
export const losReviewIIQuestionsFor=(id:LosReviewIIGroupId)=>LOS1_REVIEW_II_QUESTIONS.filter(q=>q.group===id);
export const losReviewIIReflectionId=(id:LosReviewIIGroupId)=>"EX-REV2-SELF-"+id.slice(1);
export function validateLosReviewIIQuestions():string[]{
  const errors:string[]=[];
  if(LOS1_REVIEW_II_QUESTIONS.length!==15)errors.push("Kertaus II:ssa pitää olla 15 tehtävää.");
  if(new Set(LOS1_REVIEW_II_QUESTIONS.map(q=>q.id)).size!==15)errors.push("Tehtävätunnukset eivät ole yksilöllisiä.");
  for(const group of LOS1_REVIEW_II_GROUPS){
    if(losReviewIIQuestionsFor(group.id).length!==5)errors.push(group.id+"-osiossa pitää olla viisi tehtävää.");
  }
  for(const item of LOS1_REVIEW_II_QUESTIONS){
    if(item.answers.length!==3||new Set(item.answers.map(a=>a.id)).size!==3||
      !item.answers.some(a=>a.id===item.correctId)||!item.prompt||!item.explanation){
      errors.push(item.id+" on virheellinen.");
    }
  }
  return errors;
}
