import {useEffect,useState} from "react";
import {ArrowLeft,ArrowRight,BookOpen,Check,ChevronLeft,ChevronRight,
  CircleHelp,GraduationCap,List,RotateCcw} from "lucide-react";
import {useLosChapterDraft} from "../studyState.ts";
import {LOS_L004_V2} from "./content/l004.ts";
import {emptyTeacherSession,finishTeacherSession,markTeacherHelp,submitTeacherAnswer,
  teacherEvidenceSummary,teacherNext,teacherPhase,teacherPrevious,
  type TeacherSession} from "./core.ts";
import "./teacher.css";

const scenes=LOS_L004_V2;
const stamp=()=>new Date().toISOString();

/** One scene at a time. Book references use another LOS tab, not navigation
 * that destroys this lesson. Only actually submitted answers count as evidence.
 */
export function LosTeacherPlayerV2({onBack}:{onBack:()=>void}){
  const {draft,update,saved}=useLosChapterDraft(1,"01");
  const session=draft.teacherV2Sessions?.['L004']??emptyTeacherSession();
  const index=Math.min(scenes.length-1,Math.max(0,session.scene));
  const scene=scenes[index]!;
  const latest=session.attempts[scene.id];
  const [value,setValue]=useState(latest?.answer??"");
  const [help,setHelp]=useState<"simple"|"comparison"|"steps"|null>(null);
  const [outlineOpen,setOutlineOpen]=useState(false);
  useEffect(()=>{setValue(session.attempts[scene.id]?.answer??"");setHelp(null);},[scene.id]);
  const persist=(fn:(current:TeacherSession)=>TeacherSession)=>{
    update(current=>{
      const previous=current.teacherV2Sessions?.['L004']??emptyTeacherSession();
      return {...current,teacherV2Sessions:{...current.teacherV2Sessions,L004:fn(previous)}};
    });
  };
  const go=(target:number)=>{
    persist(previous=>({...previous,scene:Math.max(0,Math.min(scenes.length-1,target)),
      boardStep:0,updatedAt:stamp()}));
    setOutlineOpen(false);
  };
  const submit=()=>{if(!value.trim()||!scene.task)return;persist(s=>submitTeacherAnswer(s,scene,value,stamp()));};
  const openHelp=(kind:"simple"|"comparison"|"steps")=>{
    setHelp(current=>current===kind?null:kind);
    if(help!==kind)persist(s=>markTeacherHelp(s,scene.id,stamp()));
  };
  const feedback=teacherPhase(scene,latest);
  const progress=teacherEvidenceSummary(session);
  const isFinal=index===scenes.length-1;
  const task=scene.task;
  const teacherOutcome=session.completedAt!==null;
  const helpContent=help==="simple"?scene.simple:
    help==="comparison"?scene.comparison:
    scene.board?scene.board.steps.map(step=>step.heading+": "+step.german+" ("+step.finnish+")").join(" · "):
    scene.example?scene.example.reason:
    scene.explanation;
  return <div className="los-teacher-v2">
    <header className="los-teacher-top">
      <button type="button" className="los-teacher-back" onClick={onBack}>
        <ArrowLeft size={18} aria-hidden="true"/> Opetuspolkuun
      </button>
      <div className="los-teacher-brand"><strong>LOS!</strong><span>OPETUSPOLKU 2.0</span></div>
      <span className="los-teacher-top-index">L004 · {index+1}/{scenes.length}</span>
    </header>
    <div className="los-teacher-progress" role="progressbar" aria-label="Opetustilanteiden eteneminen"
      aria-valuemin={0} aria-valuemax={scenes.length} aria-valuenow={index+1}>
      <span style={{width:`${(index+1)/scenes.length*100}%`}}/>
    </div>
    <div className="los-teacher-body">
      <div className="los-teacher-pagehead">
        <p className="los-teacher-eyebrow">LOS! 1 · SAB31 · L004</p>
        <h1>Tervehdykset muistista</h1>
        <p>Opettajajohtoinen malliläksy · noin 30 minuuttia · eteneminen tallentuu</p>
      </div>
      <aside className="los-teacher-menu">
        <details open={outlineOpen} onToggle={event=>setOutlineOpen(event.currentTarget.open)}>
          <summary><List size={17} aria-hidden="true"/> Oppitunnin rakenne <span>{index+1} / {scenes.length}</span></summary>
          <ol>{scenes.map((item,i)=><li key={item.id}>
            <button type="button" className={i===index?"is-active":""}
              aria-current={i===index?"step":undefined}
              onClick={()=>go(i)}>
              <span>{String(i+1).padStart(2,"0")}</span>{item.title}
              {session.attempts[item.id]?.correct&&<Check size={15} aria-label="Harjoiteltu oikein"/>}
            </button>
          </li>)}</ol>
          <p>Selaaminen ei merkitse tehtäviä suoritetuiksi. Palaa vapaasti aiempiin kohtiin.</p>
        </details>
      </aside>
      <main className="los-teacher-scene" aria-labelledby="los-teacher-scene-title">
        <p className="los-teacher-scene-kicker">{String(index+1).padStart(2,"0")} / {String(scenes.length).padStart(2,"0")} · {scene.kicker}</p>
        <h2 id="los-teacher-scene-title">{scene.title}</h2>
        <p className="los-teacher-intro">{scene.intro}</p>
        {scene.explanation&&<div className="los-teacher-explanation"><p>{scene.explanation}</p></div>}
        {scene.board&&<section className="los-teacher-board" aria-label="Vaiheittainen opetustaulu">
          <div className="los-teacher-board-top"><span>OPETUSTAULU</span><span>Vaihe {session.boardStep+1}/{scene.board.steps.length}</span></div>
          <p className="los-teacher-board-title">{scene.board.steps[session.boardStep]?.heading}</p>
          <p lang="de" className="los-teacher-board-german">{scene.board.steps[session.boardStep]?.german}</p>
          <p className="los-teacher-board-finnish">{scene.board.steps[session.boardStep]?.finnish}</p>
          <p>{scene.board.steps[session.boardStep]?.explanation}</p>
          <div className="los-teacher-board-controls">
            <button type="button" disabled={session.boardStep===0}
              onClick={()=>persist(s=>({...s,boardStep:Math.max(0,s.boardStep-1),updatedAt:stamp()}))}>Edellinen esimerkki</button>
            <button type="button" disabled={session.boardStep===scene.board!.steps.length-1}
              onClick={()=>persist(s=>({...s,boardStep:Math.min(scene.board!.steps.length-1,s.boardStep+1),updatedAt:stamp()}))}>Seuraava esimerkki <ArrowRight size={15}/></button>
          </div>
        </section>}
        {scene.example&&<div className="los-teacher-example">
          <span className="los-teacher-label">ESIMERKKI</span>
          <strong lang="de">{scene.example.german}</strong>
          <span>{scene.example.finnish}</span>
          <p>{scene.example.reason}</p>
        </div>}
        {task&&<section className="los-teacher-task" aria-label="Opiskelijan tehtävä">
          <span className="los-teacher-label">KOKEILE ITSE</span>
          <fieldset>
            <legend>{task.prompt}</legend>
            {task.kind==="choice"?
              <div className="los-teacher-options">
                {task.options?.map(option=><label key={option.id} className={value===option.id?"is-selected":""}>
                  <input type="radio" name={"teacher-"+scene.id} checked={value===option.id}
                    onChange={()=>setValue(option.id)} disabled={Boolean(latest?.correct)}/>
                  <span lang="de">{option.label}</span>
                </label>)}
              </div>
              :<label className="los-teacher-input-label">
                 <span>Kirjoita vastaus saksaksi</span>
                 <input type="text" lang="de" autoComplete="off" spellCheck={false}
                   value={value} onChange={event=>setValue(event.target.value)}
                   disabled={Boolean(latest?.correct)} placeholder="Kirjoita saksaksi…"/>
               </label>}
          </fieldset>
          <div className="los-teacher-task-actions">
            <button className="los-teacher-check" type="button" disabled={!value.trim()||Boolean(latest?.correct)} onClick={submit}>
              {latest?.correct?"Vastaus tarkistettu":"Tarkista vastaus"}
            </button>
            {latest&&!latest.correct&&<button type="button" className="los-teacher-retry"
              onClick={()=>{setValue("");setHelp(null);}}>Yritä uudelleen <RotateCcw size={15}/></button>}
          </div>
          {latest&&<div className={"los-teacher-feedback "+(latest.correct?"is-right":"is-retry")} role="status">
            <strong>{latest.correct?"Oikein!":latest.count===1?"Kokeillaan uudelleen":"Harjoitellaan tätä vielä"}</strong>
            <p>{latest.correct?task.correctFeedback:latest.count>=2?task.remedial:task.wrongFeedback+" "+task.hint}</p>
            {!latest.correct&&latest.count>=2&&<p>Ratkaisu: <b lang="de">{task.kind==="choice"?task.options?.find(o=>o.id===task.answer)?.label:task.answer}</b>. Voit jatkaa ilman itsenäistä osaamismerkintää.</p>}
            {latest.correct&&latest.helped&&<small>Ratkaisit tehtävän apua käyttäen. Tämä on harjoittelua, ei itsenäinen taitonäyttö.</small>}
          </div>}
        </section>}
        {scene.book&&<div className="los-teacher-booklink">
          <BookOpen size={20} aria-hidden="true"/>
          <div><b>Kirjan vastaava kohta</b><p>Oppikirja avautuu uuteen välilehteen. Opetustila jää auki.</p>
          <a href={"/los"+scene.book.hash} target="_blank" rel="noopener noreferrer">
            {scene.book.label} <ArrowRight size={16} aria-hidden="true"/>
          </a></div>
        </div>}
        <section className="los-teacher-help" aria-label="Opettajan lisäapu">
          <div className="los-teacher-help-header"><CircleHelp size={19}/><strong>En ymmärrä</strong><span>Valitse sopiva apu</span></div>
          <div className="los-teacher-help-choices">
            <button type="button" aria-pressed={help==="simple"} onClick={()=>openHelp("simple")}>Selitä yksinkertaisemmin</button>
            {(scene.comparison||scene.example)&&<button type="button" aria-pressed={help==="comparison"} onClick={()=>openHelp("comparison")}>Näytä toinen näkökulma</button>}
            {(scene.board||scene.explanation)&&<button type="button" aria-pressed={help==="steps"} onClick={()=>openHelp("steps")}>Näytä vaiheittain</button>}
          </div>
          {help&&<p className="los-teacher-help-answer" role="status">{helpContent||"Tähän opetustilanteeseen ei ole erillistä lisäselitystä. Voit palata aiempaan esimerkkiin."}</p>}
        </section>
        {isFinal&&<div className="los-teacher-end">
          <h3>Oma oppimisesi tällä kerralla</h3>
          <p>Teit {progress.attempted} tarkistettavaa harjoitusta ja ratkaisit {progress.correct} oikein. Ensimmäisellä yrityksellä ilman apua onnistuneita: {progress.independent}. Näistä ei tehdä automaattista kielitaitotasoa.</p>
          {progress.needsPractice>0&&<p>{progress.needsPractice} harjoituksen viimeisin vastaus oli väärin. Voit palata niihin oppitunnin sisältöluettelosta.</p>}
          <button type="button" disabled={progress.attempted<3||teacherOutcome}
            onClick={()=>persist(s=>finishTeacherSession(s,stamp()))}>
            <GraduationCap size={18}/>{teacherOutcome?"Opetuskerta merkitty tehdyksi":"Päätä opetuskerta"}
          </button>
          {progress.attempted<3&&<p className="los-teacher-requirement">Kokeile vähintään kolmea harjoitusta ennen kuin voit päättää opetuskerran. Osaamista ei silti merkitä automaattisesti hallituksi.</p>}
          {teacherOutcome&&<p role="status">Opetuskerta kirjattu. Voit kerrata sisällöt ja jatkaa tavallisiin harjoituksiin.</p>}
        </div>}
        <footer className="los-teacher-bottom">
          <button type="button" onClick={()=>persist(s=>teacherPrevious(s,stamp()))} disabled={index===0}>
            <ChevronLeft size={18}/> Edellinen
          </button>
          <span className="los-teacher-save-status" role="status">{saved?"Tallennettu paikalliseen opiskelutilaan":"Tallennus epäonnistui"}</span>
          {isFinal?<button type="button" onClick={onBack}>Palaa opetuspolkuun <ArrowRight size={18}/></button>:
            <button type="button" className="los-teacher-next" onClick={()=>persist(s=>teacherNext(s,scenes.length,stamp()))}>
              {task&&!latest?"Jatka ilman vastausta":task&&!latest?.correct?"Jatka ilman osaamismerkintää":"Seuraava"}
              <ChevronRight size={18}/>
            </button>}
        </footer>
      </main>
    </div>
  </div>;
}
