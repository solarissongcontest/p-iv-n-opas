import { useEffect, useState } from "react";
import { getDeviceOwnerId } from "@/lib/deviceSession";
import { losFutureLessonCursorKey,losFutureStageCursorKey } from "./losFutureSessionKeys.ts";
import { ArrowRight, BookOpen, ClipboardList, LockKeyhole } from "lucide-react";
import type { LosBookDefinition } from "./catalog";
import type { LosNavigate } from "./LosReferenceTools";
import { LosFutureLessonRunner } from "./LosFutureLessonRunner";
import { LosFutureProgressPanel } from "./LosFutureProgressPanel";
import { getLosFutureLesson } from "./content/losFutureLessons.ts";
import { losFutureLessonOutline, type LosFutureLessonOutline } from "./losFutureLessonOutline";
import "./los-future-path.css";
import "./los-future-lesson-runner.css";

const groups=[
  {title:"Alkukartoitus",min:1,max:1},
  {title:"Kappaleet 1–5 · ensimmäinen puolisko",min:2,max:26},
  {title:"Kertaus ja välikoe",min:27,max:30},
  {title:"Kappaleet 6–10 · toinen puolisko",min:31,max:55},
  {title:"Loppukertaus ja osaamisen arviointi",min:56,max:60},
] as const;

function LessonItem({lesson,selected,onSelect}:{
  lesson:LosFutureLessonOutline;selected:boolean;onSelect:(n:number)=>void;
}) {
  const isExam=lesson.number===30||lesson.number===59;
  return <li key={lesson.id}>
    <button type="button"
      className={selected?"is-selected":undefined}
      aria-pressed={selected}
      onClick={()=>onSelect(lesson.number)}
      aria-label={`Tunti ${lesson.number}: ${lesson.title}. Avaa ${lesson.phase==="review"?"kertaus- tai kokeen ohjeteksti":"ohjattu oppitunti"}`}>
      <span className="los-path-number">{String(lesson.number).padStart(2,"0")}</span>
      <span className="los-path-copy">
        <strong>{lesson.title}</strong>
        <small>{lesson.chapterId
          ? `Kappale ${Number(lesson.chapterId)} · ${lesson.chapterTitle} · ${lesson.estimatedMinutes} min · käsikirjoitusluonnos`
          : `${isExam?"Kokeen ohje, ei toimiva koe":"Kertauksen käsikirjoitus"} · ${lesson.estimatedMinutes} min`}</small>
      </span>
      {isExam?<LockKeyhole size={17} aria-hidden="true"/>:
        lesson.phase==="review"?<ClipboardList size={17} aria-hidden="true"/>:
          <ArrowRight size={18} aria-hidden="true"/>}
    </button>
  </li>;
}

/** Kirjakohtainen valinta sessionStorageen on vain lukijan sijainti, ei suoritustieto.
 * Lähdeaineiston 420 käsikirjoitusta näkyvät ilman ulkoisia linkkejä. */
export function LosFutureLearningPath({book,move}:{
  book:LosBookDefinition;move:LosNavigate;
}) {
  const lessons=losFutureLessonOutline(book);
  const [selectedNumber,setSelectedNumber]=useState(1);
  const [runnerRevision,setRunnerRevision]=useState(0);
  const ownerId=getDeviceOwnerId();
  const storageKey=losFutureLessonCursorKey(ownerId,book.id);
  useEffect(()=>{
    if(!storageKey){setSelectedNumber(1);return;}
    try {
      const n=Number(sessionStorage.getItem(storageKey));
      setSelectedNumber(Number.isInteger(n)&&n>=1&&n<=60?n:1);
    }catch{setSelectedNumber(1);}
  },[storageKey]);
  function selectLesson(n:number){
    setSelectedNumber(n);
    try{if(storageKey)sessionStorage.setItem(storageKey,String(n));}catch{/* valinta toimii myös ilman sessionStoragea */}
    if(typeof document!=="undefined"){
      requestAnimationFrame(()=>document.getElementById("los-future-lesson-runner")?.scrollIntoView({behavior:"smooth",block:"start"}));
    }
  }
  function resumeLesson(number:number,stageIndex:number){
    const script=getLosFutureLesson(book.id,number);
    if(!script||script.kind!=="chapter")return;
    const stageKey=losFutureStageCursorKey(ownerId,script.id);
    try{
      if(stageKey)sessionStorage.setItem(stageKey,
        String(Math.min(5,Math.max(0,stageIndex))));
    }catch{/* opetuspolku toimii ilman sessionStoragea */}
    setRunnerRevision(n=>n+1);
    selectLesson(number);
  }
  const active=lessons.find(lesson=>lesson.number===selectedNumber)??lessons[0];
  return <section className="los-inner-page los-learning-path">
    <p className="los-eyebrow">OHJATTU OPETUSPOLKU / {book.code}</p>
    <h1>Opetuspolku</h1>
    <p className="los-page-intro">{book.title} sisältää 60 käsikirjoitettua oppituntia
      sisältöineen ja kirjakohtaisine tehtäväviittauksineen. Tavallisia kappaletunteja
      on 50 ja kirjanlaajuisia kertaus-, välikoe-, loppukoe- ja yhteenvetotunteja 10.
      Jokainen ohje on luettavissa tämän LOS!-kirjan sisällä.</p>
    <div className="los-path-notice" role="status">
      <BookOpen size={20} aria-hidden="true"/>
      <p><strong>60 sisällöltään käsikirjoitettua tuntia, 0 valmiiksi hyväksyttyä ohjattua oppituntia.</strong>{" "}
        Kaikkien 50 kappaletunnin aloitus, mallin purku, vaiheittainen ohjaus, käytännön
        tehtävät ja itsekorjaus ovat nyt esikatseltavissa. Opettajasisältö, kielellinen oikeellisuus,
        äänitteet, lopputarkistuksen luotettavuus ja koko tuntien suorituskriteeristö odottavat hyväksyntää.
        Kokeita ei käynnistetä pelkistä koetuntien ohjeista. Pelkkä siirtymä sisältösivulle
        ei muuta oppituntia suoritetuksi.</p>
    </div>
    <LosFutureProgressPanel book={book} onResume={resumeLesson}/>
    {active&&<LosFutureLessonRunner key={`${book.id}-${ownerId??"device-unknown"}-${active.id}-${runnerRevision}`}
      bookId={book.id} number={active.number} chapterId={active.chapterId} move={move}/>}
    <h2>Kaikki kirjan 60 oppituntia</h2>
    {groups.map((bucket,i)=>{
      const items=lessons.filter(x=>x.number>=bucket.min&&x.number<=bucket.max);
      return <details key={bucket.title} className="los-future-path-group" open={i<=1?true:undefined}>
        <summary><span>{bucket.title}</span><small>{items.length} tuntia</small></summary>
        <div className="los-path-group">
          <ol>{items.map(lesson=><LessonItem key={lesson.id} lesson={lesson}
            selected={lesson.number===selectedNumber} onSelect={selectLesson}/>)}</ol>
        </div>
      </details>;
    })}
    <p className="los-page-intro">Tehtävien vastaukset ja oma vaiheen kokeilumerkintä
      tallentuvat käyttäjän, kirjan ja kappaleen mukaan vain tähän selaimeen.
      Lukijan ohjaus ei korvaa kielentarkistusta, tarkastettuja koemateriaaleja
      eikä hyväksyttyä osaamis- tai suoritusarviointia.</p>
  </section>;
}
