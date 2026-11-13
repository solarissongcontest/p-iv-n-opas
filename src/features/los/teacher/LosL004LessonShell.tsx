import {useEffect,type CSSProperties} from "react";
import {ArrowLeft,BookOpen} from "lucide-react";
import type {LosBookDefinition} from "../catalog";
import {useLosChapterDraft} from "../studyState";
import {emptyLosLessonProgress,losLessonFinishTeacher,type LosLessonProgress} from "../lessonEngine";
import {TEACHER_L004} from "./content/l004";
import {initialTeacherProgress,type TeacherProgress} from "./core";
import {LosL004TeacherPlayer} from "./LosL004TeacherPlayer";
import "./lesson-shell.css";

const stamp=()=>new Date().toISOString();

/** Independent lesson view: no textbook sidebar and no 60-lesson picker.
 * Uses the exact same owner-scoped chapter draft as the legacy learning path. */
export function LosL004LessonShell({book}:{book:LosBookDefinition}){
 const {draft,update,saved}=useLosChapterDraft(1,"01");
 const progress=draft.lessonProgress?.["L004"]??emptyLosLessonProgress();
 const teacher=progress.teacher??initialTeacherProgress(TEACHER_L004);
 useEffect(()=>{
  try{sessionStorage.setItem("los1.selectedLesson","L004");}
  catch{/* Existing local draft continues to work without sessionStorage. */}
 },[]);
 const record=(fn:(current:LosLessonProgress)=>LosLessonProgress)=>{
  update(current=>{
   const old=current.lessonProgress?.["L004"]??emptyLosLessonProgress();
   return {...current,lessonProgress:{...current.lessonProgress,["L004"]:fn(old)}};
  });
 };
 const onChange=(next:TeacherProgress)=>{
  record(old=>({...old,startedAt:old.startedAt??stamp(),teacher:next}));
 };
 const visited=TEACHER_L004.scenes.filter(scene=>teacher.visited.includes(scene.id)).length;
 const style={"--los-book-accent":book.accent,"--los-book-tint":book.tint} as CSSProperties;
 return <div className="los-teacher-shell" style={style}>
  <header className="los-teacher-shell-top">
   <a href="/los#/1/path" className="los-teacher-shell-back"><ArrowLeft size={18}/> Opiskelupolkuun</a>
   <span className="los-teacher-shell-brand" aria-label="LOS!">LOS<span aria-hidden="true">!</span></span>
   <span className="los-teacher-shell-tag">SAB31 · L004</span>
  </header>
  <main id="main-content" tabIndex={-1} className="los-teacher-shell-main">
   <div className="los-teacher-shell-heading">
    <p className="los-eyebrow">LOS! 1 / OPETUSTILA / L004</p>
    <h1>Tervehdykset muistista</h1>
    <p>Opettaja selittää ja näyttää mallin. Harjoittelet omaan tahtiin, ja voit palata oppikirjaan tai jatkaa viimeisestä opetustilanteesta.</p>
    <div className="los-teacher-shell-progress">
     <span>Opetustilanteita katsottu {visited}/{TEACHER_L004.scenes.length}</span>
     <div role="progressbar" aria-label="L004:n opetuksen eteneminen" aria-valuemin={0}
      aria-valuemax={TEACHER_L004.scenes.length} aria-valuenow={visited}>
      <span style={{width:(visited/TEACHER_L004.scenes.length*100)+"%"}}/>
     </div>
    </div>
   </div>
   <p className="los-teacher-shell-save" role="status">{saved?
    "Opetuksen eteneminen tallentuu samaan LOS! 1:n opiskelutietoon kuin aiemmat tehtävät.":
    "Tallennus ei onnistunut. Tarkista varmuuskopio ennen sivun sulkemista."}</p>
   {progress.completedAt&&!teacher.completedAt&&
    <p className="los-teacher-shell-legacy" role="note">Olet jo suorittanut L004:n aikaisemmalla mallilla.
     Merkintäsi säilyy, mutta uusi opetuskäsikirjoitus on erillinen harjoittelu.</p>}
   <LosL004TeacherPlayer progress={teacher} onChange={onChange}
    onFinish={()=>record(old=>losLessonFinishTeacher(TEACHER_L004,old,stamp()))}/>
   {teacher.completedAt&&<div className="los-teacher-shell-next">
     <a href="/los#/1/path" onClick={()=>{
       try{sessionStorage.setItem("los1.selectedLesson","L005");}catch{/* path remains available */}
     }}>Seuraava oppitunti: L005 · Kuuntele ja valitse tervehdys</a>
   </div>}
   <nav className="los-teacher-shell-footer" aria-label="Oppitunnin muut materiaalit">
    <a href="/los#/1/path"><ArrowLeft size={16}/> Palaa 60 oppitunnin opiskelupolkuun</a>
    <a href="/los#/1/01/practice"><BookOpen size={16}/> Harjoittele kirjan C01-tehtävillä</a>
   </nav>
  </main>
 </div>;
}
