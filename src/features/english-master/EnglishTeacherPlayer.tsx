import {useEffect,useMemo,useState} from "react";
import {ArrowRight,BookOpen,CheckCircle2,HelpCircle} from "lucide-react";
import type {Lesson} from "./EnglishMasterBook";
import {asTeacherLesson} from "./englishTeacherAdapter";
import {englishTeacherStorageKey} from "./englishTeacherBackup";
import {
  confirmTeacherActivity,emptyTeacherSession,finishTeacherSession,independentTeacherEvidence,
  markTeacherHelp,moveTeacherScene,recoverTeacherSession,revealTeacherSolution,
  setTeacherAnswerDraft,submitTeacherAnswer,teacherCompletionBlockers,
  teacherNextIncompleteSceneId,teacherSessionNeedsReview,toggleTeacherPause,validTeacherSession,
  type TeacherLesson,type TeacherScene,type TeacherSession,
} from "../los/teacher/engine.ts";
import {
  TeacherBoard,TeacherProgressBar,TeacherSceneNavigation,TeacherSceneOutline,
  TeacherSceneQuestion,TeacherTopbar,
} from "../los/teacher/Teacher2SharedUI.tsx";
import "../los/teacher/teacher.css";
import "./english-teacher.css";

/**
 * English Master runs the SAME LOS! Teacher 2.0 state machine and visual
 * components. Only the authored English manuscript / book storage are adapters.
 * It never borrows German course answers, assessment evidence or progress.
 */
type Props={
  lesson:Lesson;ownerId:string;previouslyCompleted:boolean;
  onBack:()=>void;onComplete:(checked:number)=>void;
};
const stamp=()=>new Date().toISOString();
function safeReadSession(key:string,lesson:TeacherLesson):TeacherSession {
  try{
    const parsed:unknown=JSON.parse(localStorage.getItem(key)??"null");
    if(validTeacherSession(parsed)&&parsed.lessonId===lesson.id)
      return recoverTeacherSession(parsed,lesson);
  }catch{/* A corrupted cache must not create an artificial completion. */}
  return emptyTeacherSession(lesson,stamp());
}
function safeReadHistory(key:string,id:string):TeacherSession[]{
  try{
    const value:unknown=JSON.parse(localStorage.getItem(key)??"[]");
    return Array.isArray(value)?value.filter(item=>
      validTeacherSession(item)&&item.lessonId===id).slice(-8):[];
  }catch{return [];}
}
function TeacherReflection({scene,session,onChange,completed}:{
  scene:TeacherScene;session:TeacherSession;onChange:(value:string)=>void;completed:boolean;
}){
  if(!scene.reflection)return null;
  const value=session.draftAnswers[scene.id]??"";
  return <section className="los-teacher-reflection">
    <label htmlFor={"em-teacher-reflection-"+scene.id}>{scene.reflection.prompt}</label>
    <textarea id={"em-teacher-reflection-"+scene.id} rows={5}
      value={value} disabled={completed} maxLength={500}
      placeholder={scene.reflection.placeholder}
      onChange={event=>onChange(event.target.value)} />
    <small role="status">{value.trim().length>=scene.reflection.minLength
      ?"Oma vastaus tallennettu. Tämä on itsearviointia, ei automaattisesti todettua osaamista."
      :"Kirjoita vähintään "+scene.reflection.minLength+" merkki."}</small>
  </section>;
}
export function EnglishTeacherPlayer({lesson:source,ownerId,previouslyCompleted,onBack,onComplete}:Props){
  const lesson=useMemo(()=>asTeacherLesson(source),[source]);
  const storageKey=englishTeacherStorageKey(ownerId,lesson.id);
  const archiveKey=storageKey+"-archive";
  const [session,setSession]=useState<TeacherSession>(()=>safeReadSession(storageKey,lesson));
  const [archives,setArchives]=useState<TeacherSession[]>(()=>safeReadHistory(archiveKey,lesson.id));
  const [saved,setSaved]=useState(false);
  const [showHelp,setShowHelp]=useState(false);
  const [replay,setReplay]=useState(0);
  const [outlineOpen,setOutlineOpen]=useState(false);
  useEffect(()=>{
    const media=window.matchMedia("(min-width:821px)");
    const onSize=()=>setOutlineOpen(media.matches);
    onSize();
    media.addEventListener("change",onSize);
    return ()=>media.removeEventListener("change",onSize);
  },[]);
  useEffect(()=>{
    try{localStorage.setItem(storageKey,JSON.stringify(session));setSaved(true);}
    catch{setSaved(false);}
  },[session,storageKey]);
  const current=lesson.scenes.find(item=>item.id===session.sceneId)??lesson.scenes[0]!;
  const position=Math.max(0,lesson.scenes.findIndex(item=>item.id===current.id));
  const stale=teacherSessionNeedsReview(session,lesson);
  const checkedCount=lesson.scenes.filter(scene=>scene.question&&
    session.attempts.some(attempt=>attempt.sceneId===scene.id)).length;
  const blockers=teacherCompletionBlockers(session,lesson,{});
  const ready=!stale&&!session.completedAt&&saved&&blockers.length===0;
  const nextIncomplete=teacherNextIncompleteSceneId(session,lesson,{});
  const completed=Boolean(session.completedAt&&!stale);
  const independentCount=independentTeacherEvidence(session,lesson);
  useEffect(()=>{setShowHelp(false);},[session.sceneId]);
  const update=(fn:(current:TeacherSession)=>TeacherSession)=>setSession(old=>fn(old));
  const navigate=(id:string)=>{update(old=>{
    const now=stamp();
    return moveTeacherScene(moveTeacherScene(old,lesson,current.id,now),lesson,id,now);
  });window.scrollTo(0,0);};
  const pause=()=>update(old=>toggleTeacherPause(old,stamp()));
  const saveDraft=(id:string,value:string)=>update(old=>setTeacherAnswerDraft(old,id,value,stamp()));
  const markHelp=()=>update(old=>markTeacherHelp(old,current.id,stamp()));
  const reveal=()=>update(old=>revealTeacherSolution(old,current.id,stamp()));
  const submit=(answer:string)=>update(old=>submitTeacherAnswer(old,lesson,current.id,answer,stamp()));
  const confirm=()=>{if(current.activityId)update(old=>confirmTeacherActivity(old,lesson,current.activityId!,stamp()));};
  const restart=()=>{
    if(!stale||!saved||archives.length>=8)return;
    const revised=[...archives,session];
    const fresh=emptyTeacherSession(lesson,stamp());
    try {
      // Write archive first. If writing a new session fails, the original
      // session remains available and was not destroyed.
      localStorage.setItem(archiveKey,JSON.stringify(revised));
      localStorage.setItem(storageKey,JSON.stringify(fresh));
      setArchives(revised);setSession(fresh);setSaved(true);
    }catch{setSaved(false);}
  };
  const finish=()=>{
    if(!ready||!saved)return;
    const finished=finishTeacherSession(session,lesson,{},stamp());
    if(!finished.completedAt)return;
    try{
      localStorage.setItem(storageKey,JSON.stringify(finished));
      setSession(finished);
      onComplete(checkedCount);
    }catch{setSaved(false);}
  };
  const onAnswerChange=(v:string)=>saveDraft(current.id,v);

  return <main className="los-app los-teacher-app em-teacher-app" id="main-content" tabIndex={-1}>
    <TeacherTopbar brand="ENGLISH MASTER" context="Pitkä englanti · ENA" onBack={onBack}/>
    <TeacherProgressBar value={position+1} max={lesson.scenes.length}/>
    <div className="los-teacher-layout">
      <aside className="los-teacher-sidebar">
        <p className="los-teacher-eyebrow">OPETUSPOLKU · {lesson.id}</p>
        <h1>{lesson.title}</h1>
        <p className="los-teacher-sidebar-copy">{lesson.objective}</p>
        <p className="los-teacher-small">{completed?"Oppitunti käyty läpi":
          "Oppitunti "+(position+1)+"/"+lesson.scenes.length}
          {" · "}{checkedCount}/{lesson.requiredQuestionIds.length} kysymystä vastattu
          {" · "}{independentCount} itsenäistä oikeaa harjoitusvastausta
        </p>
        {!completed&&!stale&&<button type="button" className="los-teacher-pause" onClick={pause}>
          {session.paused?"Jatka opetusta":"Keskeytä oppitunti"}
        </button>}
        <TeacherSceneOutline scenes={lesson.scenes} currentId={current.id}
          visitedIds={session.visitedIds} disabled={stale}
          onSelect={navigate} open={outlineOpen} onToggle={setOutlineOpen}/>
        {archives.length>0&&<details className="los-teacher-session-history">
          <summary>Aiemmat oppituntiversiot ({archives.length})</summary>
          <p>Vanhoista vastauksista ei muodosteta nykyisen oppitunnin osaamisnäyttöä.</p>
          {archives.map((old,i)=><details key={i}>
            <summary>Versio {old.contentVersion} · {old.completedAt?"suoritettu":"keskeneräinen"}</summary>
            <p>{old.updatedAt} · {old.attempts.length} vastausyritystä.</p>
          </details>)}
        </details>}
        <p className={"los-teacher-save"+(!saved?" is-error":"")} role="status">
          {saved?"Opetustilanteet ja vastaukset tallentuvat tälle laitteelle.":
            "Tallennus epäonnistui. Älä sulje oppituntia ennen kuin varmistat tiedot."}
        </p>
      </aside>
      {stale?<section className="los-teacher-paused los-teacher-version-review" role="status">
        <h2>Oppitunnin sisältö on päivittynyt</h2>
        <p>Vanhoja vastauksia ei verrata uuden version tehtäviin eikä tulkita automaattisesti oikeiksi.</p>
        <p>Aiemmat yritykset ja luonnokset säilyvät arkistossa. Aloita päivitetty oppitunti uutena harjoitteluna.</p>
        <button type="button" onClick={restart} disabled={!saved||archives.length>=8}>
          Arkistoi vanha suoritus ja aloita päivitetty oppitunti
        </button>
      </section>:session.paused?<section className="los-teacher-paused" role="status">
        <h2>Oppitunti keskeytetty</h2>
        <p>Opetustilanne ja vastaukset ovat tallessa. Jatka omassa tahdissasi.</p>
        <button type="button" onClick={pause}>Jatka opetusta</button>
      </section>:<article key={current.id+"-"+replay} className="los-teacher-paper em-teacher-paper">
        <div className="los-teacher-scene-kicker">{current.phase} · {position+1}/{lesson.scenes.length}</div>
        <h2>{current.title}</h2>
        <div className="los-teacher-prose">{current.paragraphs.map((paragraph,i)=>
          <p key={i}>{paragraph}</p>)}</div>
        {current.board?.length?
          <TeacherBoard scene={current} language="en"/>:null}
        {current.bookLinks?.length?<div className="los-teacher-book-links">
          {current.bookLinks.map(link=><div key={link.chapterId} className="los-teacher-book-link">
            <div><strong>{link.label}</strong><p>{link.instruction}</p></div>
            <a href={"/english-master?lessonReturn="+encodeURIComponent(lesson.id)+"#/book/"+encodeURIComponent(link.chapterId)}
              target="_blank" rel="noopener noreferrer">
              <BookOpen size={17}/> Avaa kirjassa <ArrowRight size={16}/>
            </a>
          </div>)}
          <p className="los-teacher-small">Kirja avautuu erilliseen välilehteen. Palattuasi oppitunti jatkuu samasta vaiheesta. Pelkkä avaaminen ei ole suoritusmerkintä.</p>
        </div>:null}
        {current.question&&<TeacherSceneQuestion scene={current} session={session}
          language="en" submit={submit} saveDraft={onAnswerChange}
          requestHint={markHelp} reveal={reveal}/>}
        {current.reflection&&<TeacherReflection scene={current} session={session}
          onChange={onAnswerChange} completed={completed}/>}
        {current.activityId&&<section className="los-teacher-activity">
          <button type="button" onClick={confirm} disabled={completed}>
            <CheckCircle2 size={18}/> {session.activityIds.includes(current.activityId)
              ?"Harjoitteluvaihe vahvistettu":"Vahvista tämän vaiheen harjoittelu"}
          </button>
          <p>Vahvistus kertoo harjoittelusta. Se ei ole itsenäinen kielitaidon arviointi.</p>
        </section>}
        {current.kind==="reflection"&&source.payload.tasks&&(()=>{
          const index=Number(current.id.replace("reflection-",""));
          const task=source.payload.tasks[index];
          const value=session.draftAnswers[current.id]??"";
          return task&&value.trim()?<details className="los-teacher-help">
            <summary>Näytä malli omaan vastaukseesi vertaamista varten</summary>
            <p lang="en">{task.model_answer_en??task.acceptable_answers?.[0]??"Vertaa omaa vastausta tehtävän arviointikriteereihin."}</p>
            {task.criteria_fi&&<p>{task.criteria_fi}</p>}
          </details>:null;
        })()}
        {(current.help?.length||source.payload.alternative_explanation_fi)&&<section className="los-teacher-help">
          <button type="button" onClick={()=>{setShowHelp(v=>!v);markHelp();}}
            aria-expanded={showHelp}><HelpCircle size={17}/>
            {showHelp?"Piilota toinen selitys":"En ymmärrä · Näytä toinen selitys"}
          </button>
          {showHelp&&<div className="los-teacher-help-entries">
            {current.help?.map((entry,i)=><section key={i}><h3>{entry.title}</h3><p>{entry.body}</p></section>)}
            {source.payload.alternative_explanation_fi&&<p>{source.payload.alternative_explanation_fi}</p>}
          </div>}
        </section>}
        {current.kind==="summary"&&<section className="los-teacher-summary">
          <h3>Oppitunnin todellinen harjoittelutilanne</h3>
          <p>{checkedCount}/{lesson.requiredQuestionIds.length} kysymyksessä vähintään yksi vastausyritys.</p>
          <p>{independentCount} itsenäistä oikeaa vastausta harjoituksissa. Tämä ei yksin osoita kielitaidon hallintaa.</p>
          {blockers.length>0&&<ul className="los-teacher-completion-checklist"
            aria-label="Oppitunnin puuttuvat suoritukset">
            {blockers.map((reason,i)=><li key={i}>{reason}</li>)}
          </ul>}
          {!completed&&nextIncomplete&&nextIncomplete!==current.id&&
            <button type="button" className="los-teacher-next-incomplete"
              onClick={()=>navigate(nextIncomplete)}>
              Siirry seuraavaan keskeneräiseen vaiheeseen <ArrowRight size={17}/>
            </button>}
          {!completed?<button type="button" className="los-teacher-primary" disabled={!ready}
            onClick={finish}>Merkitse oppitunti läpikäydyksi</button>:
            <p className="los-teacher-done"><CheckCircle2 size={17}/>
              Oppitunti merkitty suoritetuksi. Osaamista seurataan erikseen.</p>}
          {previouslyCompleted&&!completed&&
            <p className="los-teacher-small">Vanha oppitunnin harjoittelumerkintä säilyy erillisenä. Teacher 2.0:n uusi näyttö tallennetaan erikseen.</p>}
        </section>}
        <TeacherSceneNavigation onReplay={()=>setReplay(n=>n+1)}
          onPrevious={()=>navigate(lesson.scenes[position-1]!.id)}
          onNext={()=>navigate(lesson.scenes[position+1]!.id)}
          disablePrevious={position===0}
          last={position===lesson.scenes.length-1}
          onReturn={onBack}/>
      </article>}
    </div>
  </main>;
}
