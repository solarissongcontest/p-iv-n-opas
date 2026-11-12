/**
 * 15 original LOS! 1 review exercises, separate from the 25-point EX-MID.
 * A review item may be checked multiple times. Its completion is an attempt,
 * not a guaranteed correct result. Reflection is subjective and ungraded.
 */
export type LosReviewGroupId = "L027" | "L028" | "L029";
export type LosReviewQuestion = {
  id: string;
  group: LosReviewGroupId;
  prompt: string;
  answers: readonly { id:"a"|"b"|"c"; text:string }[];
  correctId:"a"|"b"|"c";
  explanation:string;
};
const question=(group:LosReviewGroupId,n:number,prompt:string,a:[string,string,string],correctId:"a"|"b"|"c",explanation:string):LosReviewQuestion=>({
  id:"EX-REV1-Q"+String(n).padStart(2,"0"),
  group,prompt,answers:a.map((text,i)=>({id:(["a","b","c"] as const)[i]!,text})),
  correctId,explanation,
});
export const LOS1_REVIEW_I_QUESTIONS:readonly LosReviewQuestion[]=[
  question("L027",1,"Mikä tervehdys sopii aamulla?",["Guten Morgen!","Gute Nacht!","Tschüss!"],"a","Guten Morgen! on aamun tervehdys."),
  question("L027",2,"Miten hyvästelet ystävän rennosti?",["Guten Tag!","Tschüss!","Hallo!"],"b","Tschüss! on epämuodollinen hyvästely."),
  question("L027",3,"Täydennä Ich ___ Anna.",["heißt","heißen","heiße"],"c","Ich-persoonan muoto on heiße."),
  question("L027",4,"Kumpi kysyy nimeä sinutellen?",["Wie heißt du?","Wie heißen Sie?","Wie geht's?"],"a","Wie heißt du? kysyy tutun henkilön nimeä."),
  question("L027",5,"Valitse oikea esittäytyminen.",["Ich bist Leo.","Ich bin Leo.","Du bin Leo."],"b","Ich bin tarkoittaa minä olen."),
  question("L028",6,"Millä pronominilla puhuttelet kohteliaasti tuntematonta henkilöä?",["du","ich","Sie"],"c","Kohtelias puhuttelu on Sie."),
  question("L028",7,"Mikä kysymys on kohtelias lähtömaan kysyminen?",["Woher kommen Sie?","Woher kommst du?","Woher komme ich?"],"a","Sie-puhuttelussa käytetään muotoa kommen."),
  question("L028",8,"Mikä on kohtelias vointikysymys?",["Wie geht es dir?","Wie geht es Ihnen?","Wie heißt du?"],"b","Ihnen liittyy kohteliaaseen vointikysymykseen."),
  question("L028",9,"Miten kysyt ystävältä Entä sinulle?",["Und dir?","Und Ihnen?","Wie alt?"],"a","Und dir? sopii epämuodolliseen tilanteeseen."),
  question("L028",10,"Mitä Nicht so gut. tarkoittaa?",["Ihan mahtavaa.","Ei kovin hyvää.","Mikä sinun nimesi on?"],"b","Nicht so gut. on lievästi kielteinen vastaus kuulumiskysymykseen."),
  question("L029",11,"Miten Franz aloittaa keskustelun Jörgin kanssa?",["Auf Wiedersehen!","Guten Abend!","Hallo, wie heißt du?"],"c","Franz aloittaa tervehdyksellä ja nimikysymyksellä."),
  question("L029",12,"Kuka kysyy alkuperäisessä keskustelussa Wie alt bist du?",["Jörg","Franz","Greta"],"a","Jörg esittää ikäkysymyksen neljännessä repliikissä."),
  question("L029",13,"Kuinka vanha Franz sanoo olevansa?",["20-vuotias","19-vuotias","18-vuotias"],"b","Franz sanoo olevansa neunzehn Jahre alt eli 19-vuotias."),
  question("L029",14,"Kuinka vanha Jörg sanoo olevansa?",["19-vuotias","21-vuotias","20-vuotias"],"c","Jörg vastaa Ich bin zwanzig eli 20-vuotias."),
  question("L029",15,"Mikä on alkuperäisen keskustelun viimeinen hyvästely?",["Tschüss!","Bis später!","Guten Morgen!"],"a","Jörg sanoo viimeisessä repliikissä Tschüss!"),
] as const;
export const LOS1_REVIEW_I_GROUPS=[
  {id:"L027" as const,title:"Kertaus I · Tervehtiminen ja esittäytyminen",description:"Kappaleiden 1 ja 2 tervehdykset, nimikysymykset sekä ich- ja du-muodot.",sourceChapter:"01"},
  {id:"L028" as const,title:"Kertaus I · Vointi ja kohteliaisuus",description:"Kappaleiden 4 ja 5 du/Sie-tilanteet ja kuulumisten kertominen.",sourceChapter:"04"},
  {id:"L029" as const,title:"Kertaus I · Alkuperäiskeskustelu",description:"Franz–Jörg-keskustelu luetaan kokonaisena ja voidaan kuunnella, jos alkuperäisäänite toimii. Ääntä ei koneellisesti arvioida.",sourceChapter:"01"},
] as const;
export const losReviewIQuestionsFor=(id:LosReviewGroupId)=>LOS1_REVIEW_I_QUESTIONS.filter(q=>q.group===id);
export const losReviewIReflectionId=(id:LosReviewGroupId)=>"EX-REV1-SELF-"+id.slice(1);
export function validateLosReviewIQuestions():string[]{
  const errors:string[]=[];
  if(LOS1_REVIEW_I_QUESTIONS.length!==15)errors.push("Kertauksen tulee sisältää 15 osatehtävää.");
  if(new Set(LOS1_REVIEW_I_QUESTIONS.map(q=>q.id)).size!==15)errors.push("Tunnukset eivät ole yksilöllisiä.");
  for(const group of LOS1_REVIEW_I_GROUPS){
    if(losReviewIQuestionsFor(group.id).length!==5)errors.push(group.id+" tehtävien määrä ei ole viisi.");
  }
  for(const item of LOS1_REVIEW_I_QUESTIONS){
    if(item.answers.length!==3||!item.answers.some(a=>a.id===item.correctId)||!item.explanation)errors.push(item.id+" virheellinen.");
  }
  return errors;
}
