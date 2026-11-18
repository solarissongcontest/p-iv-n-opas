import type {LosLessonBlueprint, LosLessonStep} from "./lessonEngine.ts";
import {LOS1_READING_BANK} from "./content/los1ReadingBank.ts";
import {LOS_1_LESSONS} from "./learningPath.ts";

/** Reconnect the existing 60 executable lessons to the new, canonical Text A/B/C.
 * The original L001-L060 and step IDs are retained. Historical drafts survive.
 * Old authentic dialogues remain optional reading, never a required new-text gate.
 */
const chapterFocus: Readonly<Record<string,{main:string;practice:string;support:string;newWords:string}>>={
 "01":{main:"Ainon ja Leonin tervehdykset sekä aamun vuorokaudenaika",practice:"Guten Morgen, Guten Abend, Tschüss ja Auf Wiedersehen",support:"vuorokaudenajan mukaan valittava tervehdys",newWords:"tervehdykset ja hyvästelyt"},
 "02":{main:"Ainon ja Noran nimikysymykset",practice:"Wie heißt du, Ich heiße ja Ich bin",support:"heißen ja sein -verbin minä- ja sinämuodot",newWords:"nimen kysyminen ja esittäytyminen"},
 "03":{main:"Ainon, Selman ja Leonin alkuperä sekä asuinpaikka",practice:"Woher kommst du ja Ich komme aus",support:"woher- ja wo-kysymyksen ero",newWords:"maat, alkuperä ja asuinpaikka"},
 "04":{main:"Ainon ja Herr Weberin kohtelias puhuttelu",practice:"du, Sie ja Wie heißen Sie",support:"sinuttelu ja teitittely eri tilanteissa",newWords:"kohtelias puhuttelu"},
 "05":{main:"Leonin ja Ainon kuulumiset",practice:"Wie geht's, gut, nicht so gut ja müde",support:"kuulumiskysymyksen eri vastaukset",newWords:"kuulumiset ja vointi"},
 "06":{main:"Ainon, Noran, Leonin ja Selman iät",practice:"numerot 0–20 ja ikälause",support:"lukusanat 21–100 ja iän kertominen",newWords:"numerot ja ikä"},
 "07":{main:"Ainon nimen A-I-N-O oikea kirjoitusasu",practice:"Wie schreibt man das ja Bitte buchstabieren Sie",support:"nimien kirjain kirjaimelta tavaaminen",newWords:"aakkoset ja tavaaminen"},
 "08":{main:"Ainon ja Selman selityspyynnöt",practice:"Ich verstehe nicht ja Bitte langsamer",support:"toiston, hitaamman puheen ja selityksen pyytäminen",newWords:"selviytymisfraasit"},
 "09":{main:"Ainon ja hänen ystäviensä tapaamisajan sopiminen",practice:"am Donnerstag ja um vier Uhr",support:"viikonpäivät, am ja um",newWords:"viikonpäivät ja kellonajat"},
 "10":{main:"uuden opiskelijan Milan esittäytyminen",practice:"kertaus: nimi, alkuperä, ikä ja tapaaminen",support:"oman lyhyen keskustelun rakentaminen",newWords:"kokonainen esittäytymiskeskustelu"},
};
const oldNames=/Franz|Jörg|Greta|Lisa Müller|Herr Schmidt|Herr Standish|Heinrich|Karl\b|Thomas|Takashi|Peter|Harald|Bernan\b|Berna\b|Eva\/Jan|Mia\b|Nicos Weg|Sport und Zeit/i;
const obsoleteTaskId=/C\d{2}-(?:SOURCE|MCOM02)-Q\d{2}/i;
function readingTask(id:string, kind:"A"|"B",index:number) {
  return LOS1_READING_BANK[id]?.[kind].filter(q=>q.kind==="choice")[index] ?? LOS1_READING_BANK[id]?.A[0];
}
function forBookChapter(lessonId:string) {
  const number=Number(lessonId.slice(1));
  const plan=LOS_1_LESSONS[number-1];
  const chapter=plan?.chapter;
  return chapter && /^\d{2}$/.test(chapter)?chapter:null;
}
function mappedCheck(lesson:LosLessonBlueprint,chapterId:string,phase:number) {
  const item=readingTask(chapterId, "A", phase);
  if(!item || item.kind!=="choice")return lesson.check;
  return {question:item.prompt,answers:item.options.map((text,i)=>({id:String.fromCharCode(97+i),text})),
    correctId:String.fromCharCode(97+item.answerIndex),explanation:item.explanation};
}
const readingLessonNumbers=new Set([3,8,13,18,23,32,37,42,47,52]);

function retargetStep(step:LosLessonStep, chapterId:string, isReading:boolean,index:number):LosLessonStep {
  const actual=step.chapter && chapterFocus[step.chapter] ? step.chapter : chapterId;
  const focus=chapterFocus[actual]??chapterFocus[chapterId]!;
  // All Text A/B/C instructions must refer to the currently visible LOS!-authored teaching text.
  if(isReading) {
    const kinds:[LosLessonStep["section"],string,string][]=[
      ["text","Lue uusi Text A","Lue koko Text A ja tunnista "+focus.main+". Kuuntele halutessasi saksankielinen TTS. Etsi ja selitä vähintään kaksi keskeistä ilmausta."],
      ["understand","Tee uudet tekstitehtävät","Vastaa uuden Text A:n ymmärtämistehtäviin 1 ja 2 Ymmärrä-osiossa. Perustele vastauksesi tekstissä näkyvillä sanoilla ja tarkista molemmat."],
      ["text-c","Vahvista asia Text C:n avulla","Lue Text C -tukiteksti: "+focus.support+". Kuuntele sen saksankieliset esimerkit ja yritä tuottaa yksi oma lause."],
    ];
    const [section,label,instruction]=kinds[Math.min(index,2)]!;
    return {...step,chapter:chapterId,section,label,instruction};
  }
  if(step.section==="text"||step.section==="text-b"||step.section==="text-c") {
    const kind=step.section==="text"?"Text A":step.section==="text-b"?"Text B":"Text C";
    const context=step.section==="text"?"Etsi kappaleen tarinasta "+focus.main:
      step.section==="text-b"?"Etsi vaihtoehtoisesta tekstilajista samat pääilmaukset kuin Text A:ssa":
      "Vahvista "+focus.support;
    return {...step,chapter:actual,label:kind+": "+focus.newWords,
      instruction:"Avaa kappaleen "+kind+". "+context+". Tarvittavat tekstit ovat kokonaisuudessaan LOS!:n sisällä. Vanhat autenttiset aineistot ovat vapaaehtoisia lisälukemistoja."};
  }
  if(step.section==="understand")return {...step,chapter:actual,
    instruction:"Avaa Ymmärrä. Vastaa uusiin Text A:n tehtäviin 1 ja 2, ja tarvittaessa Text B:n tai C:n tehtäviin. Tarkista ja etsi perustelut nimenomaan nykyisistä teksteistä."};
  // Non-reading exercises/grammar stay intact unless the old named dialogue is still in instructions.
  if(oldNames.test(step.instruction)||obsoleteTaskId.test(step.instruction)){
    return {...step,instruction:"Harjoittele kappaleessa "+actual+" tätä taitoa: "+focus.practice+
      ". Käytä uusia Text A–C -tekstejä ja kirjan nykyisiä harjoituksia. Aiempaa lisätekstiä ei tarvitse suorittaa."};
  }
  return step;
}

export function canonicalizeLos1Lessons(original:readonly LosLessonBlueprint[]):LosLessonBlueprint[] {
  return original.map(lesson=>{
    const number=Number(lesson.id.slice(1)),chapterId=forBookChapter(lesson.id);
    if(!chapterId||!chapterFocus[chapterId])return lesson; // Reviews & exams retain their own dedicated gates.
    const focus=chapterFocus[chapterId]!;
    const isReading=readingLessonNumbers.has(number);
    const phase=(number-2)%5;
    const rawSteps=lesson.steps.map((step,index)=>retargetStep(step,chapterId,isReading,index));
    // Avoid changing IDs for existing step completion and user backups.
    const steps=rawSteps;
    const evidence=lesson.evidence.map(e=>{
      if(e.kind!=="checked-source" && !e.ids?.some(id=>obsoleteTaskId.test(id)))return e;
      const oldJoined=(e.ids??[]).join(" ");
      const kind=/-MCOM02-/i.test(oldJoined)?"B":"A";
      const questions=LOS1_READING_BANK[chapterId]?.[kind];
      return {...e,kind:"checked-source" as const,ids:questions?.slice(0,2).map(item=>item.id)??[],
        label:"Uuden Text "+kind+":n kaksi ensimmäistä ymmärtämistehtävää vastattu ja tarkistettu."};
    });
    if(isReading&&!evidence.some(item=>item.kind==="checked-source")){
      evidence.push({kind:"checked-source",ids:LOS1_READING_BANK[chapterId]?.A.slice(0,2).map(x=>x.id)??[],
        label:"Text A:n kaksi ensimmäistä ymmärtämistehtävää vastattu ja tarkistettu."});
    }
    const title=LOS_1_LESSONS[number-1]?.title??lesson.title;
    const check=isReading || oldNames.test(lesson.check.question+" "+lesson.check.explanation)
      ?mappedCheck(lesson,chapterId,Math.max(0,phase)):lesson.check;
    return {...lesson,title,objective:isReading?"Ymmärrän kappaleen "+chapterId+" uuden Text A:n ja osaan käyttää Text C:n tukea.":lesson.objective,
      steps,evidence,check};
  });
}

export function validateLos1CanonicalLessons(lessons:readonly LosLessonBlueprint[]):string[]{
  const issues:string[]=[];
  if(lessons.length!==60)issues.push("Oppitunteja tulee olla 60, saatiin "+lessons.length);
  if(new Set(lessons.map(x=>x.id)).size!==60)issues.push("Toistuvia oppituntitunnisteita.");
  for(const lesson of lessons){
    if(!lesson.steps.length||!lesson.check.answers.some(a=>a.id===lesson.check.correctId))
      issues.push(lesson.id+" virheellinen rakenne.");
    for(const step of lesson.steps){
      if(oldNames.test(step.instruction))issues.push(lesson.id+" vanhan hahmon ohje: "+step.id);
      if(obsoleteTaskId.test(step.instruction))issues.push(lesson.id+" vanha tekstitehtävä: "+step.id);
    }
    if(oldNames.test(lesson.title+" "+lesson.check.question))
      issues.push(lesson.id+" vanha nimi otsikossa tai lopputarkistuksessa.");
    for(const e of lesson.evidence)if(e.kind==="checked-source"){
      for(const id of e.ids??[]){
        if(!/^LOS1-READ-V2-C\d{2}-[AB]-\d{2}$/.test(id))
          issues.push(lesson.id+" vanha tekstitehtävävaatimus: "+id);
      }
    }
  }
  return issues;
}
