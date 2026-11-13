import type { LosBookDefinition } from "./catalog";
import type { LosDestination } from "./LosReferenceTools";
import { getLosFutureLesson } from "./content/losFutureLessons.ts";

export type LosFutureLessonOutline={
  id:string;
  number:number;
  chapterId:string|null;
  chapterTitle:string|null;
  title:string;
  destination:LosDestination|null;
  phase:"chapter"|"review";
  estimatedMinutes:number;
  status:"manuscript-draft";
};

const chapterStages:{title:string;destination:LosDestination}[]=[
  {title:"Aloita ja ennakoi",destination:"chapter"},
  {title:"Lue ja tulkitse",destination:"text"},
  {title:"Ymmärrä rakenne",destination:"grammar"},
  {title:"Harjoittele ilman mallia",destination:"practice"},
  {title:"Käytä saksaa",destination:"apply"},
];
const reviewStages:Record<number,string>={
  1:"Alkukartoitus",
  27:"Ensimmäinen kertaus",
  28:"Kielioppikertaus",
  29:"Itsenäinen soveltaminen",
  30:"Välikoe",
  56:"Sanasto- ja tekstikertaus",
  57:"Yhdistävä kielioppikertaus",
  58:"Viestintätehtävät",
  59:"Loppukoe",
  60:"Osaamisen yhteenveto",
};

/** 5 kirjakohtaista ohjattua tuntia/kappale + 10 kertaus- ja koetunnin käsikirjoitusta.\n * Koko sisältö on näkyvissä oppikirjassa mutta ei arviointi-/julkaisuhyväksytty. */
export function losFutureLessonOutline(book:LosBookDefinition):LosFutureLessonOutline[]{
  if(book.id<2||book.id>8||book.chapters.length!==10)return [];
  const out:LosFutureLessonOutline[]=[];
  for(let n=1;n<=60;n++){
    const script=getLosFutureLesson(book.id,n);
    if(!script)throw new Error(`Missing sourced LOS! ${book.id} lesson ${n}`);
    const reviewTitle=reviewStages[n];
    const estimate=script.kind==="chapter"
      ? script.timings.reduce((sum,step)=>sum+step.minutes,0)
      : (script.reviewTiming.match(/\\d+\\s*min/g)??[]).reduce((sum,part)=>sum+Number(part.match(/\\d+/)?.[0]??0),0);
    if(reviewTitle){
      if(script.kind!=="review")throw new Error(`Wrong source phase for ${script.id}`);
      out.push({id:`LOS${book.id}-L${String(n).padStart(3,"0")}`,
        number:n,chapterId:null,chapterTitle:null,title:script.title,
        destination:null,phase:"review",estimatedMinutes:estimate||30,status:"manuscript-draft"});
      continue;
    }
    const chapterIndex=n<=26?Math.floor((n-2)/5):5+Math.floor((n-31)/5);
    const stageIndex=n<=26?(n-2)%5:(n-31)%5;
    const chapter=book.chapters[chapterIndex];
    const stage=chapterStages[stageIndex];
    if(!chapter||!stage||script.kind!=="chapter")throw new Error(`Invalid LOS! ${book.id} lesson mapping: ${n}`);
    out.push({id:`LOS${book.id}-L${String(n).padStart(3,"0")}`,
      number:n,chapterId:chapter.id,chapterTitle:chapter.title,
      title:script.title,destination:stage.destination,phase:"chapter",
      estimatedMinutes:estimate||30,status:"manuscript-draft"});
  }
  return out;
}
