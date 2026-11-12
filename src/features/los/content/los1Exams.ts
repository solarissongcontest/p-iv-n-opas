/**
 * Original LOS! 1 self-study assessment items. These are NOT copied from the
 * source dialogue or a third-party exercise bank. One point per objective item.
 * The 25-item midterm follows the LOS! 1 book contract exactly: 5+7+5+4+4.
 * Test answers never appear in the UI before explicit submission.
 */
export type LosExamChoice = { id: "a" | "b" | "c"; text: string };
export type LosExamQuestion = {
  id: string;
  section: "greetings" | "names" | "origin" | "politeness" | "wellbeing";
  prompt: string;
  choices: readonly LosExamChoice[];
  correctId: LosExamChoice["id"];
  explanation: string;
};
export const LOS1_MIDTERM_SECTION_TITLES: Readonly<Record<LosExamQuestion["section"],string>> = {
  greetings:"Tervehdykset ja hyvästelyt",
  names:"Nimet ja verbit",
  origin:"Alkuperä ja paikat",
  politeness:"Du vai Sie?",
  wellbeing:"Kuulumiset",
};
const q=(section:LosExamQuestion["section"],number:number,prompt:string,options:[string,string,string],correctId:LosExamChoice["id"],explanation:string):LosExamQuestion=>({
  id:"EX-MID-Q"+String(number).padStart(2,"0"), section,prompt,
  choices:options.map((text,index)=>({id:(["a","b","c"] as const)[index]!,text})),
  correctId,explanation,
});
export const LOS1_MIDTERM_QUESTIONS: readonly LosExamQuestion[] = [
  q("greetings",1,"Tapaat koulutoverin aamulla. Mikä tervehdys sopii tilanteeseen?",["Gute Nacht!","Guten Morgen!","Auf Wiedersehen!"],"b","Guten Morgen! on aamun tervehdys. Gute Nacht! sanotaan tavallisesti nukkumaan mennessä."),
  q("greetings",2,"Mitä sana Hallo! tarkoittaa?",["Hei!","Kiitos!","Näkemiin!"],"a","Hallo! on tavallinen tervehdys."),
  q("greetings",3,"Haluat hyvästellä ystävän rennosti. Mitä sanot?",["Guten Morgen!","Wie heißt du?","Tschüss!"],"c","Tschüss! on epämuodollinen hyvästely."),
  q("greetings",4,"Mikä on luonteva illan tervehdys?",["Guten Abend!","Gute Nacht!","Guten Morgen!"],"a","Guten Abend! on illan tervehdys; Gute Nacht! toivottaa hyvää yötä."),
  q("greetings",5,"Mitä Bis später! tarkoittaa?",["Anteeksi!","Nähdään myöhemmin!","Hauska tutustua!"],"b","Bis später! tarkoittaa nähdään myöhemmin."),
  q("names",6,"Täydennä: Ich ___ Emil.",["heißt","heißen","heiße"],"c","Ich-persoonan muoto on heiße."),
  q("names",7,"Täydennä: Wie ___ du?",["heißt","heiße","heißen"],"a","Du-persoonassa sanotaan Wie heißt du?"),
  q("names",8,"Valitse oikea: Minä olen Mia.",["Ich bist Mia.","Ich bin Mia.","Du bin Mia."],"b","Ich bin tarkoittaa minä olen."),
  q("names",9,"Täydennä: Du ___ Anna.",["bin","ist","bist"],"c","Sein-verbin du-muoto on bist."),
  q("names",10,"Mikä kysymys tarkoittaa Mikä sinun nimesi on?",["Wie heißt du?","Wie geht's?","Woher kommst du?"],"a","Wie heißt du? kysyy nimeä."),
  q("names",11,"Kuvitteellinen henkilö vastaa Ich heiße Leo. Mitä hän kertoo?",["Kotimaansa","Nimensä","Ikänsä"],"b","Ich heiße Leo tarkoittaa Nimeni on Leo."),
  q("names",12,"Mikä on oikein kirjoitettu saksan minä-sana?",["ich","Ih","isch"],"a","Saksaksi minä on ich. Virkkeen alussa kirjoitetaan Ich."),
  q("origin",13,"Mitä Deutschland tarkoittaa?",["Itävalta","Saksa","Sveitsi"],"b","Deutschland on Saksa."),
  q("origin",14,"Mikä on saksaksi Suomi?",["Finnland","Frankreich","Deutschland"],"a","Finnland tarkoittaa Suomea."),
  q("origin",15,"Mikä kysymys tarkoittaa Mistä olet kotoisin?",["Wie alt bist du?","Wie heißt du?","Woher kommst du?"],"c","Woher kommst du? on tuttavallinen kysymys alkuperästä."),
  q("origin",16,"Täydennä: Ich ___ aus Finnland.",["kommst","komme","kommt"],"b","Ich-persoonan muoto on komme."),
  q("origin",17,"Valitse oikea: Olen kotoisin Itävallasta.",["Ich komme aus Österreich.","Ich komme in Österreich.","Du kommst aus Österreich."],"a","Aus ilmaisee lähtömaan: Ich komme aus Österreich."),
  q("politeness",18,"Mikä on kohtelias nimikysymys tuntemattomalle?",["Wie heißt du?","Wie heißen Sie?","Wie heiße Sie?"],"b","Kohteliaassa Sie-puhuttelussa käytetään verbiä heißen."),
  q("politeness",19,"Mikä pronomini kirjoitetaan isolla kohteliaassa Te-puhuttelussa?",["Sie","sie","du"],"a","Kohtelias Sie kirjoitetaan isolla myös virkkeen keskellä."),
  q("politeness",20,"Täydennä kohtelias kysymys: Woher ___ Sie?",["kommst","kommt","kommen"],"c","Kohteliaan Sie-pronominin kanssa sanotaan Woher kommen Sie?"),
  q("politeness",21,"Puhut tutulle ystävälle. Mikä on luonteva nimikysymys?",["Wie heißen Sie?","Wie heißt du?","Wie heiße ich?"],"b","Tutun henkilön kanssa voi käyttää du-puhuttelua."),
  q("wellbeing",22,"Mitä Wie geht's? tarkoittaa?",["Mikä nimesi on?","Kuinka vanha olet?","Mitä kuuluu?"],"c","Wie geht's? on arkipäiväinen kuulumiskysymys."),
  q("wellbeing",23,"Valitse lyhyt myönteinen vastaus kuulumiskysymykseen.",["Gut, danke.","Guten Abend.","Wie heißen Sie?"],"a","Gut, danke. tarkoittaa Hyvää, kiitos."),
  q("wellbeing",24,"Mitä Nicht so gut. tarkoittaa?",["Erinomaista.","Ei kovin hyvää.","Hyvää huomenta."],"b","Nicht so gut. ilmaisee, ettei kuulu kovin hyvää."),
  q("wellbeing",25,"Mikä vastakysymys sopii, kun kysyt ystävältä Entä sinulle?",["Und Ihnen?","Woher kommst du?","Und dir?"],"c","Und dir? on tuttavallinen vastakysymys; Und Ihnen? on kohtelias."),
] as const;

export const LOS1_MIDTERM_ID = "EX-MID";
export const LOS1_MIDTERM_DRAFT_CHAPTER = "91"; // reserved private assessment slot, not C91

export function losExamScore(questions:readonly LosExamQuestion[],answers:Readonly<Record<string,string>>) {
  const groups=Array.from(new Set(questions.map(q=>q.section)));
  const perSection=groups.map(section=>{
    const subset=questions.filter(q=>q.section===section);
    return {section,title:LOS1_MIDTERM_SECTION_TITLES[section]!,total:subset.length,correct:subset.filter(q=>answers[q.id]===q.correctId).length};
  });
  return {correct:perSection.reduce((sum,s)=>sum+s.correct,0),total:questions.length,perSection};
}
export function losExamReadyToSubmit(questions:readonly LosExamQuestion[],answers:Readonly<Record<string,string>>) {
  return questions.length>0 && questions.every(q=>q.choices.some(choice=>choice.id===answers[q.id]));
}
export function validateLosMidtermBank() {
  const questions=LOS1_MIDTERM_QUESTIONS;
  const errors:string[]=[];
  if(questions.length!==25)errors.push("Välikokeessa pitää olla 25 tehtävää.");
  const count:Record<string,number>={greetings:5,names:7,origin:5,politeness:4,wellbeing:4};
  if(new Set(questions.map(q=>q.id)).size!==25)errors.push("Välikokeen tehtävätunnukset eivät ole yksilöllisiä.");
  for(const [section,expected] of Object.entries(count)){
    if(questions.filter(q=>q.section===section).length!==expected)errors.push(section+"-osion tehtävämäärä on väärä.");
  }
  for(const q of questions){
    if(q.choices.length!==3 || new Set(q.choices.map(a=>a.id)).size!==3 ||
       !q.choices.some(a=>a.id===q.correctId)||!q.prompt||!q.explanation)errors.push(q.id+" on virheellinen.");
  }
  return errors;
}
