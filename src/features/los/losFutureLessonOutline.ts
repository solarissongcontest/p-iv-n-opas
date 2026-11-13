import type { LosBookDefinition } from "./catalog";
import type { LosDestination } from "./LosReferenceTools";

export type LosFutureLessonOutline={
  id:string;
  number:number;
  chapterId:string|null;
  chapterTitle:string|null;
  title:string;
  destination:LosDestination|null;
  phase:"chapter"|"review";
  estimatedMinutes:30;
  status:"outline-only";
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

/** LOS! 2–8:n v1.0-käsikirjoitusten ohjauksen numeroitu RAKENNE:
 * 5 oppituntia/kappale, 10 kirjanlaajuista tuntia. Vain navigaatiorunko,
 * ei oppituntien opettajasisältöjä eikä arvioitavia koesuorituksia. */
export function losFutureLessonOutline(book:LosBookDefinition):LosFutureLessonOutline[]{
  if(book.id<2||book.id>8||book.chapters.length!==10)return [];
  const out:LosFutureLessonOutline[]=[];
  for(let n=1;n<=60;n++){
    const title=reviewStages[n];
    if(title){
      out.push({id:`LOS${book.id}-L${String(n).padStart(3,"0")}`,
        number:n,chapterId:null,chapterTitle:null,title,
        destination:null,phase:"review",estimatedMinutes:30,status:"outline-only"});
      continue;
    }
    const chapterIndex=n<=26?Math.floor((n-2)/5):5+Math.floor((n-31)/5);
    const stageIndex=n<=26?(n-2)%5:(n-31)%5;
    const chapter=book.chapters[chapterIndex];
    const stage=chapterStages[stageIndex];
    if(!chapter||!stage)throw new Error(`Invalid LOS! ${book.id} lesson mapping: ${n}`);
    out.push({id:`LOS${book.id}-L${String(n).padStart(3,"0")}`,
      number:n,chapterId:chapter.id,chapterTitle:chapter.title,
      title:stage.title,destination:stage.destination,phase:"chapter",
      estimatedMinutes:30,status:"outline-only"});
  }
  return out;
}
