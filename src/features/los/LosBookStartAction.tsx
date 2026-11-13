import { getLosTeacherLesson } from "./teacher/lessonL004";
import {ArrowRight} from "lucide-react";
import {useLosChapterDraft} from "./studyState";
import type {LosChapterDraft} from "./studyState";
import {recommendLos1Resume} from "./losResumeRecommendation";

/** Only mounted for LOS! 1. Keeps the approved V3.3 book cover and banner. */
export function LosBookStartAction({move}:{move:(chapter:string|null,section:"path")=>void}){
  const d01=useLosChapterDraft(1,"01");
  const d02=useLosChapterDraft(1,"02");
  const d03=useLosChapterDraft(1,"03");
  const d04=useLosChapterDraft(1,"04");
  const d05=useLosChapterDraft(1,"05");
  const d06=useLosChapterDraft(1,"06");
  const d07=useLosChapterDraft(1,"07");
  const d08=useLosChapterDraft(1,"08");
  const d09=useLosChapterDraft(1,"09");
  const d10=useLosChapterDraft(1,"10");
  const d91=useLosChapterDraft(1,"91");
  const d92=useLosChapterDraft(1,"92");
  const d93=useLosChapterDraft(1,"93");
  const drafts:Record<string,LosChapterDraft>={
    "01":d01.draft,
    "02":d02.draft,
    "03":d03.draft,
    "04":d04.draft,
    "05":d05.draft,
    "06":d06.draft,
    "07":d07.draft,
    "08":d08.draft,
    "09":d09.draft,
    "10":d10.draft,
    "91":d91.draft,
    "92":d92.draft,
    "93":d93.draft,
  };
  const recommendation=recommendLos1Resume(drafts);
  const label=recommendation.action==="start"?"Aloita nollasta":
    recommendation.action==="review"?"Kertaa kirja alusta":
      "Jatka oppituntia "+recommendation.lessonId;
  const open=()=>{
    try{sessionStorage.setItem("los1.selectedLesson",recommendation.lessonId);}
    catch{ /* The path still opens safely at its first lesson. */ }
    if (getLosTeacherLesson(recommendation.lessonId)) {
      window.location.assign("/los-lessons/" + recommendation.lessonId);
      return;
    }
    move(null,"path");
  };
  return <div className="los-front-resume">
    <button type="button" className="los-primary" onClick={open}>
      {label} <ArrowRight size={18}/>
    </button>
    <p className="los-front-resume-caption" role="status">
      {recommendation.action==="review"
        ?"Kaikki "+recommendation.available+" oppituntia on merkitty tehdyksi. Voit kerrata ne uudelleen."
        :recommendation.action==="start"
          ?"L001 opettaa kirjan käytön, aivan ensimmäiset saksan ilmaukset ja oppimisen työkalut."
          :recommendation.completed+"/"+recommendation.available+" oppituntia suoritettu. Jatko avaa sinulle valitun keskeneräisen tai seuraavan tunnin."}
    </p>
  </div>;
}
