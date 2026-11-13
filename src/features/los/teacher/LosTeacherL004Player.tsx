import {useEffect,useState} from "react";
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2,HelpCircle,RefreshCcw} from "lucide-react";
import {getDeviceOwnerId} from "@/lib/deviceSession";
import {LOS1_L004_TEACHER_LESSON as lesson} from "./content/L004.ts";
import {
  canCoverTeacherLesson,emptyTeacherProgress,parseTeacherProgress,
  teacherAnswer,teacherIndependentAnswers,teacherMarkCovered,
  teacherRequestHelp,teacherRevealSolution,teacherSelectScene,
  type TeacherProgress,
} from "./core.ts";
import "./teacher-player.css";

/** An independent lesson view. Nothing here calls an AI model or marks legacy
 * L004 completion or CEFR mastery. Books open separately to preserve the scene.
 */
export function LosTeacherL004Player({onExit}:{onExit:()=>void}){
  const ownerId=typeof window==="undefined"?null:getDeviceOwnerId();
  const storageKey=ownerId? `los.teacher.v2.${ownerId}.1.L004` : null;
  const [progress,setProgress]=useState<TeacherProgress>(()=>{
    if(!storageKey||typeof localStorage==="undefined")return emptyTeacherProgress(lesson);
    try{return parseTeacherProgress(localStorage.getItem(storageKey),lesson);}
    catch{return emptyTeacherProgress(lesson);}
  });
  const [saved,setSaved]=useState(Boolean(storageKey));
  const [helpMode,setHelpMode]=useState<"simpler"|"example"|"why"|null>(null);
  const [boardStep,setBoardStep]=useState(0);
  useEffect(()=>{
    if(!storageKey){setSaved(false);return;}
    try {setProgress(parseTeacherProgress(localStorage.getItem(storageKey),lesson));setSaved(true);}
    catch {setSaved(false);}
    const sync=(event:StorageEvent)=>{
      if(event.key===storageKey){
        setProgress(parseTeacherProgress(event.newValue,lesson));setSaved(true);
      }
    };
    window.addEventListener("storage",sync);
    return ()=>window.removeEventListener("storage",sync);
  },[storageKey]);
  const sceneIndex=Math.max(0,lesson.scenes.findIndex(s=>s.id===progress.sceneId));
  const scene=lesson.scenes[sceneIndex]!;
  const question=scene.question;
  const answer=question?progress.answers[question.id]:undefined;
  const apply=(update:(current:TeacherProgress)=>TeacherProgress)=>{
    const next=update(progress);
    if(next===progress)return;
    setProgress(next);
    if(!storageKey){setSaved(false);return;}
    try{localStorage.setItem(storageKey,JSON.stringify(next));setSaved(true);}
    catch{setSaved(false);}
  };
  const selectScene=(id:string)=>{
    apply(current=>teacherSelectScene(current,lesson,id));
    setHelpMode(null);setBoardStep(0);
    if(typeof window!=="undefined")window.scrollTo({top:0,behavior:"instant"});
  };
  const openHelp=(mode:"simpler"|"example"|"why")=>{
    setHelpMode(mode);
    if(question)apply(current=>teacherRequestHelp(current,lesson));
  };
  const currentBoard=scene.board??[];
  const independent=teacherIndependentAnswers(progress,lesson);
  const allCovered=canCoverTeacherLesson(progress,lesson);
  const isRecorded=Boolean(progress.coveredAt);
  const correct=question?.options.find(o=>o.id===question.correctId);
  return <section className="los-teacher-player" id="los-teacher-player"
    aria-label="LOS Teacher Experience 2.0, mallikohde L004">
    <header className="los-teacher-toolbar">
      <button type="button" onClick={onExit} className="los-teacher-back">
        <ArrowLeft size={17}/> Takaisin opiskelupolkuun
      </button>
      <span className="los-teacher-brand">LOS! · OPETTAJA 2.0</span>
      <span className="los-teacher-position">L004 · {sceneIndex+1}/{lesson.scenes.length}</span>
    </header>
    <div className="los-teacher-progress" role="progressbar"
      aria-label="Opetustilanteiden sijainti, ei osaamistaso"
      aria-valuemin={1} aria-valuemax={lesson.scenes.length} aria-valuenow={sceneIndex+1}>
      <span style={{width:(sceneIndex+1)/lesson.scenes.length*100+"%"}}/>
    </div>
    <div className="los-teacher-info">
      <p className="los-overline">LOS! 1 · C01 · L004 · {lesson.estimatedMinutes} MIN (ARVIO)</p>
      <h1>{lesson.title}</h1>
      <p><strong>Tavoite:</strong> {lesson.objective}</p>
      <p className="los-teacher-save-state" role="status">
        {saved?"Oppimistilanne tallennetaan tällä laitteella.":"Tallennusta ei ole vahvistettu. Älä luota siihen, että eteneminen säilyy sivun sulkemisen jälkeen."}
      </p>
      <details className="los-teacher-toc">
        <summary>Oppitunnin sisällysluettelo</summary>
        <ol>{lesson.scenes.map((item,index)=><li key={item.id}>
          <button type="button" aria-current={item.id===scene.id?"step":undefined}
            onClick={()=>selectScene(item.id)}>
            <span>{index+1}. {item.heading}</span>
            {progress.visitedSceneIds.includes(item.id)?<small>Käyty</small>:<small>Ei vielä käyty</small>}
          </button>
        </li>)}</ol>
        <p>Voit siirtyä vapaasti, mutta pelkkä selaaminen ei osoita osaamista.</p>
      </details>
    </div>
    <article className="los-teacher-scene" key={scene.id}>
      <div className="los-teacher-scene-heading">
        <p className="los-overline">{scene.phase.toUpperCase()} · VAIHE {sceneIndex+1}</p>
        <h2>{scene.heading}</h2>
      </div>
      <div className="los-teacher-explanation">
        {scene.paragraphs.map((p,i)=><p key={i}>{p}</p>)}
      </div>
      {scene.board&&<div className="los-teacher-board" aria-label="Opettajan vaiheittainen mallisuoritus">
        <h3>Opetustaulu</h3>
        <ol>{currentBoard.slice(0,boardStep).map((step,i)=><li key={i}>
          <strong lang={step.text.includes("Guten")?"de":undefined}>{step.text}</strong>
          <p>{step.note}</p>
        </li>)}</ol>
        <div className="los-teacher-board-actions">
          <button type="button" disabled={boardStep>=currentBoard.length}
            onClick={()=>setBoardStep(n=>Math.min(currentBoard.length,n+1))}>
            Näytä seuraava vaihe
          </button>
          <button type="button" onClick={()=>setBoardStep(0)}>
            <RefreshCcw size={16}/> Näytä alusta
          </button>
          <button type="button" onClick={()=>setBoardStep(currentBoard.length)}>Näytä koko malli</button>
        </div>
      </div>}
      {scene.example&&<aside className="los-teacher-example">
        <p className="los-overline">MALLIESIMERKKI</p>
        <p className="los-teacher-example-de" lang="de">{scene.example.de}</p>
        <p className="los-teacher-example-fi">{scene.example.fi}</p>
        <p>{scene.example.commentary}</p>
      </aside>}
      {question&&<fieldset className="los-teacher-question">
        <legend>Harjoitus · {question.mode==="activation"?"muistelu":
          question.mode==="guided"?"ohjattu":
          question.mode==="independent"?"itsenäinen":"soveltava"}</legend>
        <p className="los-teacher-question-prompt">{question.prompt}</p>
        <div className="los-teacher-options">
          {question.options.map(option=><button type="button" key={option.id}
            disabled={answer?.status==="correct"||answer?.status==="solution"}
            aria-pressed={answer?.lastOption===option.id}
            onClick={()=>apply(current=>teacherAnswer(current,lesson,question.id,option.id))}>
            <span lang="de">{option.de}</span>{option.fi&&<small>{option.fi}</small>}
          </button>)}
        </div>
        {answer&&answer.status!=="unanswered"&&<div className="los-teacher-feedback" role="status">
          <strong>{answer.status==="hint"?"Kokeile uudelleen":
            answer.status==="remediation"?"Selitetään toisella tavalla":
            answer.status==="correct"?"Oikein":"Katsotaan malliratkaisu"}</strong>
          <p>{answer.status==="hint"?question.hint:
            answer.status==="remediation"?question.secondExplanation:
            question.correctExplanation}</p>
          {answer.status==="solution"&&<p><strong>Oikea vastaus: <span lang="de">{correct?.de}</span></strong>
            {" "}Tämä harjoitus ei nyt anna itsenäisen osaamisen näyttöä.</p>}
          {answer.status==="correct"&&<p>{answer.independentCorrect?
            "Oikein ensimmäisellä yrityksellä ilman apua. Tämä on rajattu valintatehtävän näyttö, ei vielä kielitaidon todistus.":
            "Ratkaisit tehtävän harjoitellen. Se ei ole sama asia kuin itsenäinen ensiyrityksen onnistuminen."}</p>}
        </div>}
        {answer?.status!=="correct"&&answer?.status!=="solution"&&
          <button type="button" className="los-teacher-reveal"
            onClick={()=>apply(current=>teacherRevealSolution(current,lesson))}>
            Näytä oikea vastaus ja jatka ilman osaamismerkintää
          </button>}
      </fieldset>}
      <div className="los-teacher-help">
        <button type="button" onClick={()=>setHelpMode(m=>m===null?"simpler":null)}
          aria-expanded={helpMode!==null}>
          <HelpCircle size={17}/> En ymmärrä · pyydä lisäselitys
        </button>
        {helpMode!==null&&<div className="los-teacher-help-content">
          <div className="los-teacher-help-options" role="group" aria-label="Valitse opetuksen lisäselitys">
            <button type="button" aria-pressed={helpMode==="simpler"} onClick={()=>openHelp("simpler")}>Selitä yksinkertaisemmin</button>
            <button type="button" aria-pressed={helpMode==="example"} onClick={()=>openHelp("example")}>Näytä toinen esimerkki</button>
            <button type="button" aria-pressed={helpMode==="why"} onClick={()=>openHelp("why")}>Miksi tätä käytetään?</button>
          </div>
          <p>{helpMode==="simpler"?scene.help.simpler:
            helpMode==="example"?scene.help.anotherExample:scene.help.why}</p>
          {question&&<small>Vihje tai lisäselitys tekee tästä harjoituksesta tuetun, ei itsenäisen ensiyrityksen näytön.</small>}
        </div>}
      </div>
      {scene.bookRef&&<aside className="los-teacher-bookref">
        <p>Haluatko kerrata samaa asiaa oppikirjasta? Kirja avautuu erilliseen välilehteen eikä sulje oppituntia.</p>
        <a href={`/los#/${scene.bookRef.bookId}/${scene.bookRef.chapterId}/${scene.bookRef.section}`}
          target="_blank" rel="noopener noreferrer">
          <BookOpen size={17}/>{scene.bookRef.label}<ArrowRight size={16}/>
        </a>
      </aside>}
      {scene.phase==="summary"&&<div className="los-teacher-summary">
        <h3>Oppimisen tilanne</h3>
        <p><strong>{independent}/2</strong> itsenäisen ensiyrityksen valintatehtävää oikein (enintään kaksi uutta tilannetta).
          Tämä ei tarkoita automaattisesti osoitettua tai vahvistettua kielitaitoa.</p>
        <p>{allCovered?"Olet käynyt kaikki opetustilanteet ja käsitellyt tehtävät.":"Osa opetustilanteista tai kysymyksistä on vielä käsittelemättä. Voit palata sisällysluettelosta."}</p>
        {isRecorded?<p role="status"><CheckCircle2 size={18}/> Opetussisältö käsitelty ja merkitty paikallisesti. Osaaminen arvioidaan erikseen.</p>:
          <button type="button" disabled={!allCovered}
            onClick={()=>apply(current=>teacherMarkCovered(current,lesson,new Date().toISOString()))}>
            <CheckCircle2 size={18}/> Merkitse opetussisältö käsitellyksi
          </button>}
        <p className="los-teacher-warning">Vanhaa L004-suoritusmerkintää ei ole poistettu eikä muunnettu automaattiseksi osaamisnäytöksi.
          Tämä pilotti ei muuta muiden 59 oppitunnin suoritusdataa.</p>
      </div>}
    </article>
    <footer className="los-teacher-controls">
      <button type="button" disabled={sceneIndex===0}
        onClick={()=>selectScene(lesson.scenes[sceneIndex-1]?.id??scene.id)}>
        <ArrowLeft size={18}/> Edellinen
      </button>
      <span aria-live="polite">{sceneIndex+1}/{lesson.scenes.length}</span>
      {sceneIndex<lesson.scenes.length-1?
        <button type="button" className="los-teacher-next"
          onClick={()=>selectScene(lesson.scenes[sceneIndex+1]!.id)}>
          Seuraava <ArrowRight size={18}/>
        </button>:
        <button type="button" className="los-teacher-next" onClick={onExit}>
          Takaisin opetuspolkuun <ArrowRight size={18}/>
        </button>}
    </footer>
  </section>;
}
