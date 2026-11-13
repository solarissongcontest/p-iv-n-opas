import {useEffect,type CSSProperties} from "react";
import {ArrowLeft,BookOpen} from "lucide-react";
import type {LosBookDefinition} from "../catalog";
import {useLosChapterDraft} from "../studyState";
import {emptyLosLessonProgress,losLessonFinishTeacher,type LosLessonProgress} from "../lessonEngine";
import {TEACHER_L005} from "./content/l005";
import {initialTeacherProgress,teacherCurrentCompletion,type TeacherProgress} from "./core";
import {LosL005TeacherPlayer} from "./LosL005TeacherPlayer";
import "./lesson-shell.css";

const stamp=()=>new Date().toISOString();

/** Independent lesson view: no textbook sidebar and no 60-lesson picker.
 * Uses the exact same owner-scoped chapter draft as the legacy learning path. */
export function LosL005LessonShell({book}:{book:LosBookDefinition}){
 const {draft,update,saved}=useLosChapterDraft(1,"01");
 const progress=draft.lessonProgress?.["L005"]??emptyLosLessonProgress();
 const teacher=progress.teacher??initialTeacherProgress(TEACHER_L005);
 useEffect(()=>{
  try{sessionStorage.setItem("los1.selectedLesson","L005");}
  catch{/* Existing local draft continues to work without sessionStorage. */}
 },[]);
 const record=(fn:(current:LosLessonProgress)=>LosLessonProgress)=>{
  update(current=>{
   const old=current.lessonProgress?.["L005"]??emptyLosLessonProgress();
   return {...current,lessonProgress:{...current.lessonProgress,["L005"]:fn(old)}};
  });
 };
 const onChange=(next:TeacherProgress)=>{
  record(old=>({...old,startedAt:old.startedAt??stamp(),teacher:next}));
 };
 const visited=TEACHER_L005.scenes.filter(scene=>teacher.visited.includes(scene.id)).length;
 const currentCompleted=teacherCurrentCompletion(TEACHER_L005,teacher);
 const style={"--los-book-accent":book.accent,"--los-book-tint":book.tint} as CSSProperties;
 return <div className="los-teacher-shell" style={style}>
  <header className="los-teacher-shell-top">
   <a href="/los#/1/path" className="los-teacher-shell-back"><ArrowLeft size={18}/> Opiskelupolkuun</a>
   <span className="los-teacher-shell-brand" aria-label="LOS!">LOS<span aria-hidden="true">!</span></span>
   <span className="los-teacher-shell-tag">SAB31 · L005</span>
  </header>
  <main id="main-content" tabIndex={-1} className="los-teacher-shell-main">
   <div className="los-teacher-shell-heading">
    <p className="los-eyebrow">LOS! 1 / OPETUSTILA / L005</p>
    <h1>Kuuntele ja valitse tervehdys</h1>
    <p>Opettaja opettaa kuuntelun periaatteet ja näyttää mallin. Voit kuunnella oikean alkuperäisäänitteen tai käyttää sen tekstivastinetta. Pelkkää toiston käynnistymistä ei tulkita kuulluksi ymmärtämiseksi.</p>
    <div className="los-teacher-shell-progress">
     <span>Opetustilanteita katsottu {visited}/{TEACHER_L005.scenes.length}</span>
     <div role="progressbar" aria-label="L005:n opetuksen eteneminen" aria-valuemin={0}
      aria-valuemax={TEACHER_L005.scenes.length} aria-valuenow={visited}>
      <span style={{width:(visited/TEACHER_L005.scenes.length*100)+"%"}}/>
     </div>
    </div>
   </div>
   <p className="los-teacher-shell-save" role="status">{saved?
    "Opetuksen eteneminen tallentuu samaan LOS! 1:n opiskelutietoon kuin aiemmat tehtävät.":
    "Tallennus ei onnistunut. Tarkista varmuuskopio ennen sivun sulkemista."}</p>
   {progress.completedAt&&!currentCompleted&&
    <p className="los-teacher-shell-legacy" role="note">L005:stä on tallessa aiempi suoritus.
     Päivitetty opetus kirjataan erikseen, kun uudet harjoitukset on käsitelty.</p>}
   <LosL005TeacherPlayer progress={teacher} onChange={onChange}
    onFinish={()=>record(old=>losLessonFinishTeacher(TEACHER_L005,old,stamp()))}/>
   {currentCompleted&&<div className="los-teacher-shell-next">
     <a href="/los#/1/path" onClick={()=>{
       try{sessionStorage.setItem("los1.selectedLesson","L006");}catch{/* path remains available */}
     }}>Seuraava oppitunti: L006 · Harjoittele ja testaa C01</a>
   </div>}
   <nav className="los-teacher-shell-footer" aria-label="Oppitunnin muut materiaalit">
    <a href="/los#/1/path"><ArrowLeft size={16}/> Palaa 60 oppitunnin opiskelupolkuun</a>
    <a href="/los#/1/01/text-b?fromLesson=L005"><BookOpen size={16}/> Avaa oppikirjan Text B ja koko lähdeteksti</a>
   </nav>
  </main>
 </div>;
}
