import {LOS_1_LESSONS} from "./learningPath.ts";
import {LOS_EXERCISES} from "./exerciseBank.ts";
import {LOS1_CHAPTER_TESTS_V2} from "./los1ChapterExams.ts";
import {LOS1_READING_BANK} from "./content/los1ReadingBank.ts";

/** Traceability matrix for the 15 LO(S)1 skills from LOS_BOOK_01_SPEC.
 * Displaying instruction or submission does NOT validate actual language mastery.
 * Audio comprehension, independent writing and pronunciation require human-
 * observable/self-assessed evidence; never infer these from clicks.
 */
export type LosCompetency = {
 readonly id:string;
 readonly name:string;
 readonly chapter:string;
 readonly introducedIn:readonly string[];
 readonly practicedIn:readonly string[];
 readonly assessedIn:readonly string[];
 readonly mode:"objective"|"self-assessment"|"audio-observation";
 readonly verification:string;
};
const courseGoals:readonly LosCompetency[]=[
 {id:"L1-PHON-01",name:"Kirjaimet ja saksan ääntämisen alkeet",chapter:"01",
  introducedIn:["L002","L036"],practicedIn:["C01-EX-09","C01-EX-10"],
  assessedIn:[],mode:"audio-observation",verification:"C01:n ääntämisosiot ja C07:n kirjainharjoitus. Oikea ääntämisnäyttö edellyttää opiskelijan kuuntelemista ja oman ääntämisen vertaamista malliin."},
 {id:"L1-INT-01",name:"Tilanteeseen sopiva tervehdys ja hyvästely",chapter:"01",
  introducedIn:["L002","L003"],practicedIn:["C01-EX-01","C01-EX-04"],
  assessedIn:["C01-TEST-V2-01","C01-TEST-V2-05"],mode:"objective",verification:"Kappaletestin uudet kontekstit, ei harjoitustehtävien kopioita."},
 {id:"L1-INT-02",name:"Nimen kysyminen ja kertominen",chapter:"02",
  introducedIn:["L007","L008"],practicedIn:["C02-EX-01","C02-EX-02"],
  assessedIn:["C02-TEST-V2-01","C02-TEST-V2-02"],mode:"objective",verification:"Vapaasti tuotettu kahden repliikin keskustelu arvioidaan lisäksi itse."},
 {id:"L1-GRA-01",name:"Ich/du ja heißen, sein, kommen -muodot",chapter:"02",
  introducedIn:["L009","L014"],practicedIn:["C02-EX-03","C02-EX-04","C02-EX-05","C02-EX-06"],
  assessedIn:["C02-TEST-V2-03","C02-TEST-V2-04","C03-TEST-V2-12"],mode:"objective",verification:"Rajattu minä/sinä-rakenteen tarkistus. Verbin soveltamista tarkastellaan myös loppukokeessa."},
 {id:"L1-INT-03",name:"Kysy ja kerro lähtömaa",chapter:"03",
  introducedIn:["L012","L013"],practicedIn:["C03-EX-01"],
  assessedIn:["C03-TEST-V2-06","C03-TEST-V2-11"],mode:"objective",verification:"Uudet maat ja kotipaikkatilanteet erotetaan muistinvaraisesta alkuperäistekstistä."},
 {id:"L1-INT-04",name:"Du- ja Sie-puhuttelu",chapter:"04",
  introducedIn:["L017","L018"],practicedIn:["C04-EX-01"],
  assessedIn:["C04-TEST-V2-03","C04-TEST-V2-10"],mode:"objective",verification:"Vertaile muodollista ja epämuodollista puhuttelua."},
 {id:"L1-INT-05",name:"Kuulumisten kysyminen ja niihin vastaaminen",chapter:"05",
  introducedIn:["L022","L023"],practicedIn:["C05-EX-01"],
  assessedIn:["C05-TEST-V2-04","C05-TEST-V2-10"],mode:"objective",verification:"Luonteva lyhyt vuoropuhelu vahvistetaan myös itsearvioinnilla."},
 {id:"L1-NUM-01",name:"Numerot 0–20 sekä 21–100:n muodostus",chapter:"06",
  introducedIn:["L031","L033"],practicedIn:["C06-EX-01","C06-EX-02"],
  assessedIn:["C06-TEST-V2-04","C06-TEST-V2-05"],mode:"objective",verification:"Kirjoitettujen lukusanojen tarkistus on eri asia kuin kuullun numeron ymmärtäminen."},
 {id:"L1-INT-06",name:"Ikä, tavaaminen ja puhelinnumerot",chapter:"07",
  introducedIn:["L032","L036","L037"],practicedIn:["C07-EX-01","C07-EX-02"],
  assessedIn:["C07-TEST-V2-03","C07-TEST-V2-11"],mode:"self-assessment",verification:"Tavaamisen ja puhelinnumerosanelun kuultu/lausuttu suoritus vaatii oman tarkistuslistan; kirjoitusasu yksin ei todista kuulemista."},
 {id:"L1-STRAT-01",name:"Pyydä toistoa, hidastamista ja selitystä",chapter:"08",
  introducedIn:["L041","L043"],practicedIn:["C08-EX-01","C08-EX-02"],
  assessedIn:["C08-TEST-V2-03","C08-TEST-V2-07"],mode:"objective",verification:"Valitaan tilanteeseen sopiva strategia, ei vain fraasin suomennosta."},
 {id:"L1-TIME-01",name:"Viikonpäivät ja tapaamisaika",chapter:"09",
  introducedIn:["L046","L048"],practicedIn:["C09-EX-01"],
  assessedIn:["C09-TEST-V2-09","C09-TEST-V2-11"],mode:"objective",verification:"Viikonpäivän ja kellonajan erotus testataan uusilla tapaamisajoilla."},
 {id:"L1-MED-01",name:"Tuettu lyhyen puheen ymmärtäminen",chapter:"10",
  introducedIn:["L005","L042","L052"],practicedIn:[],
  assessedIn:[],mode:"audio-observation",verification:"Oikea kuullunymmärtäminen ei ole varmennettu pelkän tekstin tai selain-TTS-painikkeen avaamisesta. Loppukokeen kaksi oikeaa äänilähdettä vaativat toimivan toiston ja akustisen hyväksynnän."},
 {id:"L1-READ-01",name:"Poimi lyhyestä tekstistä ydintiedot",chapter:"01",
  introducedIn:["L003","L008","L013"],practicedIn:["LOS1-READ-V2-C01-A-01","LOS1-READ-V2-C02-A-01"],
  assessedIn:["LOS1-READ-V2-C10-A-01"],mode:"objective",verification:"Tekstinymmärtämisen väittämät tarkistetaan tehtävä- ja tekstikohtaisesti. Korostusten oikeellisuutta ei pisteytetä automaattisesti."},
 {id:"L1-PROD-01",name:"5–7 yksinkertaisen virkkeen oma esittely",chapter:"10",
  introducedIn:["L051","L054"],practicedIn:["C10-EX-01"],
  assessedIn:[],mode:"self-assessment",verification:"Vapaa kirjoitus ja puhe palautetaan erillisen mallin ja itsearvioinnin avulla, ei koneelliseen kielioppiprosenttiin."},
 {id:"L1-CULT-01",name:"Saksankieliset alueet sekä tervehdys- ja puhuttelukulttuuri",chapter:"03",
  introducedIn:["L012","L017"],practicedIn:["C04-EX-01"],
  assessedIn:["C04-TEST-V2-02"],mode:"self-assessment",verification:"Oppilas selittää myös suomeksi kulttuurieroja, joita rajattu monivalinta ei yksin mittaa."},
];

export const LOS1_COMPETENCIES:readonly LosCompetency[]=courseGoals;
export function validateLos1Competencies():string[]{
 const issues:string[]=[];
 const lessons=new Set(LOS_1_LESSONS.map(x=>"L"+String(x.number).padStart(3,"0")));
 const training=new Set(LOS_EXERCISES.map(x=>x.id));
 const exams=new Set(LOS1_CHAPTER_TESTS_V2.map(x=>x.id));
 const reading=new Set(Object.values(LOS1_READING_BANK).flatMap(group=>Object.values(group).flatMap(items=>items.map(x=>x.id))));
 const available=new Set([...training,...exams,...reading]);
 if(courseGoals.length!==15)issues.push("15 osaamistavoitetta ei löydy.");
 if(new Set(courseGoals.map(x=>x.id)).size!==15)issues.push("Osaamistavoitteiden tunnisteita toistuu.");
 for(const goal of courseGoals){
   if(!/^L1-(?:PHON|INT|GRA|NUM|STRAT|TIME|MED|READ|PROD|CULT)-\d{2}$/.test(goal.id))
     issues.push(goal.id+" virheellinen tavoitetunniste.");
   if(!/^0[1-9]$|^10$/.test(goal.chapter))issues.push(goal.id+" virheellinen kappale.");
   if(!goal.introducedIn.length)issues.push(goal.id+" opetuskappale puuttuu.");
   for(const id of goal.introducedIn)if(!lessons.has(id))issues.push(goal.id+" olematon oppitunti "+id);
   for(const id of [...goal.practicedIn,...goal.assessedIn])
     if(!available.has(id))issues.push(goal.id+" olematon harjoitus/koe "+id);
   if(goal.mode==="audio-observation"&&goal.assessedIn.length)
     issues.push(goal.id+" kuuntelutavoitteella on automaattiseksi väitetty arviointi.");
   if(!goal.verification.trim())issues.push(goal.id+" tarkistustapa puuttuu.");
 }
 return issues;
}
