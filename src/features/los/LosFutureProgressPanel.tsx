import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpenCheck, CircleAlert, RotateCcw } from "lucide-react";
import { getDeviceOwnerId } from "@/lib/deviceSession";
import type { LosBookDefinition } from "./catalog";
import { calculateLosFutureBookPractice } from "./losFuturePracticeProgress";
import "./los-future-progress.css";

export function LosFutureProgressPanel({book,onResume}:{
  book:LosBookDefinition;
  onResume:(number:number,stageIndex:number)=>void;
}) {
  const ownerId=getDeviceOwnerId();
  const [revision,setRevision]=useState(0);
  useEffect(()=>{
    if(!ownerId)return;
    const prefix=`los.local.v1.${ownerId}.${book.id}.`;
    const onLocal=(event:Event)=>{
      const key=(event as CustomEvent<{key?:string}>).detail?.key;
      if(key?.startsWith(prefix))setRevision(n=>n+1);
    };
    const onStorage=(event:StorageEvent)=>{
      if(event.key===null||event.key.startsWith(prefix))setRevision(n=>n+1);
    };
    window.addEventListener("los:draft-change",onLocal);
    window.addEventListener("storage",onStorage);
    return ()=>{
      window.removeEventListener("los:draft-change",onLocal);
      window.removeEventListener("storage",onStorage);
    };
  },[ownerId,book.id]);
  const progress=useMemo(()=>calculateLosFutureBookPractice(book,ownerId,key=>{
    if(typeof localStorage==="undefined")return null;
    return localStorage.getItem(key);
  }),[book,ownerId,revision]);
  const percent=Math.round(progress.attemptedStages/progress.totalStages*100);
  const [showChapters,setShowChapters]=useState(false);
  const resume=progress.resume;
  return <section className="los-future-progress" aria-label="Harjoittelun paikallinen tilanne">
    <div className="los-future-progress-header">
      <div>
        <p className="los-eyebrow">OMA HARJOITTELU · VAIN TÄMÄ SELAIN</p>
        <h2>Missä jäit?</h2>
      </div>
      <BookOpenCheck size={24} aria-hidden="true"/>
    </div>
    <div className="los-future-progress-metrics">
      <div><strong>{progress.lessonsTouched}/50</strong><span>tunnin vaiheita kokeiltu</span></div>
      <div><strong>{progress.attemptedStages}/300</strong><span>ohjausvaihetta merkitty</span></div>
      <div><strong>{progress.answeredTasks}/260</strong><span>tehtävään vastattu</span></div>
      <div><strong>{progress.comparedTasks}/260</strong><span>vastausta verrattu</span></div>
    </div>
    <label className="los-future-progress-meter">
      <span>Itse merkityt ohjausvaiheet <strong>{percent} %</strong></span>
      <progress value={progress.attemptedStages} max={progress.totalStages}/>
    </label>
    <p className="los-future-progress-caveat"><CircleAlert size={15} aria-hidden="true"/>
      Numerot kuvaavat ainoastaan omaa harjoittelua, eivät oppituntien hyväksyttyjä
      suorituksia, arvosanoja tai osoitettua kielitaitoa. Väli- ja loppukoetunteja
      ei lasketa harjoituskertymään.</p>
    <div className="los-future-progress-actions">
      {resume?<button type="button" className="los-future-progress-continue"
        onClick={()=>onResume(resume.number,resume.stageIndex)}>
        <ArrowRight size={16} aria-hidden="true"/>
        Jatka oppitunnista {String(resume.number).padStart(3,"0")}
      </button>:<p>Kaikkien 50 kappaletunnin kuusi vaihetta on merkitty kokeilluksi.
        Voit kerrata opetusta koska tahansa. Tämä ei tarkoita hyväksyttyä suoritusta.</p>}
      <button type="button" onClick={()=>setShowChapters(v=>!v)}
        aria-expanded={showChapters} aria-controls="los-future-progress-chapters">
        {showChapters?"Piilota kappalekohtainen tilanne":"Näytä kappaleittain"}
      </button>
    </div>
    {showChapters&&<ol id="los-future-progress-chapters" className="los-future-progress-chapters">
      {progress.chapters.map(chapter=>{
        const next=progress.chapterLessons.find(l=>l.chapterId===chapter.chapterId&&l.attemptedStages<6)
          ??progress.chapterLessons.find(l=>l.chapterId===chapter.chapterId);
        return <li key={chapter.chapterId}>
          <span className="los-future-progress-chapter-id">{chapter.chapterId}</span>
          <div className="los-future-progress-chapter-details">
            <strong lang="de">{chapter.title}</strong>
            <small>{chapter.stagesTried}/30 vaihetta · {chapter.answers}/26 vastausta · {chapter.compared}/26 verrattu</small>
            <progress value={chapter.stagesTried} max={chapter.totalStages}/>
          </div>
          {next&&<button type="button" onClick={()=>onResume(next.number,next.nextStageIndex)}
            aria-label={`Avaa kappale ${Number(chapter.chapterId)} opetuspolussa`}>
            <RotateCcw size={15} aria-hidden="true"/>
          </button>}
        </li>;
      })}
    </ol>}
  </section>;
}
