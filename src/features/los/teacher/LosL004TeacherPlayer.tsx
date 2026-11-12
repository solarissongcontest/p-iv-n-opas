import {useState} from "react";
import {
  TEACHER_L004
} from "./content/l004.ts";
import {
  answerTeacher,hintTeacher,initialTeacherProgress,pauseTeacher,revealTeacher,
  selectTeacherScene,teacherEvidence,type TeacherProgress
} from "./core.ts";
import "./teacher.css";

/**
 * First working Teacher Experience 2.0 lesson. Text-only by design until
 * licensed human audio has been reviewed. No TTS, AI or speech recognition.
 * State is provided by the existing owner-scoped chapter draft.
 */
export function LosL004TeacherPlayer({
 progress,onChange
}:{progress:TeacherProgress|undefined;onChange:(next:TeacherProgress)=>void}){
 const p=progress??initialTeacherProgress(TEACHER_L004);
 const scene=TEACHER_L004.scenes.find(s=>s.id===p.scene)??TEACHER_L004.scenes[0]!;
 const index=TEACHER_L004.scenes.indexOf(scene);
 const result=p.answers[scene.id];
 const hintOpen=p.hints.includes(scene.id);
 const [showMap,setShowMap]=useState(false);
 const evidence=teacherEvidence(TEACHER_L004,p);
 const go=(i:number)=>{
  const target=TEACHER_L004.scenes[i];
  if(target)onChange(selectTeacherScene(TEACHER_L004,p,target.id));
 };
 const feedback=scene.question?.choices.find(c=>c.id===result?.answer)?.feedback;
 return <section className="los-teacher" aria-label="L004: opettajajohtoinen opetus">
  <div className="los-teacher-top">
   <div><p className="los-overline">LOS TEACHER EXPERIENCE 2.0 · L004</p>
    <h4>Tervehdykset muistista</h4>
    <p>{TEACHER_L004.objective}</p>
   </div>
   <span className="los-teacher-step">Kohta {index+1}/{TEACHER_L004.scenes.length}</span>
  </div>
  <p className="los-teacher-draft">Opetuskäsikirjoitus on vielä kieli- ja pedagogisen tarkistuksen luonnos.
   Harjoitukset eivät ole virallinen kielitaitoarvio.</p>
  <div className="los-teacher-toolbar">
   <button type="button" onClick={()=>setShowMap(x=>!x)}
    aria-expanded={showMap} aria-controls="los-teacher-map">Opetuksen sisällysluettelo</button>
   {p.paused?
    <button type="button" onClick={()=>onChange(selectTeacherScene(TEACHER_L004,p,scene.id))}>Jatka opetusta</button>:
    <button type="button" onClick={()=>onChange(pauseTeacher(p))}>Keskeytä</button>}
  </div>
  {showMap&&<nav id="los-teacher-map" aria-label="L004 opetustilanteet" className="los-teacher-map">
   {TEACHER_L004.scenes.map((item,i)=><button type="button" key={item.id}
     aria-current={item.id===scene.id?"step":undefined}
     onClick={()=>go(i)}>{i+1}. {item.title}</button>)}
  </nav>}
  {p.paused?<p className="los-teacher-paused" role="status">
   Opetus on keskeytetty. Aktiivinen kohta ja harjoitusvastaukset pysyvät tallessa.
  </p>:<article className="los-teacher-scene" aria-live="polite">
   <p className="los-teacher-phase">{scene.phase.replaceAll("-"," ")}</p>
   <h5>{scene.title}</h5>
   {scene.explanation.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
   {scene.example&&<div className="los-teacher-example">
    <p lang="de"><strong>{scene.example.german}</strong></p>
    <p>{scene.example.finnish}</p>
    <p><small>{scene.example.why}</small></p>
   </div>}
   {scene.question&&<div className="los-teacher-question">
    <fieldset disabled={Boolean(result?.correct||result?.revealed)}>
     <legend>{scene.question.prompt}</legend>
     <div className="los-teacher-choices">
      {scene.question.choices.map(option=><button key={option.id} type="button"
       aria-pressed={result?.answer===option.id}
       onClick={()=>onChange(answerTeacher(TEACHER_L004,p,option.id,new Date().toISOString()))}>
        {option.label}
      </button>)}
     </div>
    </fieldset>
    {scene.hint&&!hintOpen&&!result?.correct&&!result?.revealed&&
     <button className="los-teacher-help" type="button" onClick={()=>onChange(hintTeacher(TEACHER_L004,p))}>
      En ymmärrä · näytä vihje
     </button>}
    {hintOpen&&<p className="los-teacher-help-text" role="note">{scene.hint}</p>}
    {result&&<div className="los-teacher-feedback" role="status">
     {result.revealed?
      <p>Ratkaisu näytetty: <strong lang="de">{scene.question.choices.find(c=>c.id===scene.question?.correctId)?.label}</strong>. Tätä ei merkitä osaamisnäytöksi.</p>:
      <>
       <p><strong>{feedback}</strong></p>
       {result.correct&&<p>{result.independent?
        "Oikein ensimmäisellä yrityksellä ilman vihjettä. Tämä on yksi rajattu itsenäinen harjoitusnäyttö.":
        "Oikein harjoitellen. Vihje tai aiempi yritys tarkoittaa, ettei tämä ole ensiyrityksen itsenäinen näyttö."}</p>}
       {!result.correct&&result.count>=2&&<p>{scene.question.alternative}</p>}
      </>}
    </div>}
    {!result?.correct&&!result?.revealed&&result?.count!==undefined&&result.count>=2&&
     <button type="button" className="los-teacher-help" onClick={()=>onChange(revealTeacher(TEACHER_L004,p,new Date().toISOString()))}>
      Näytä oikea vastaus ja jatka
     </button>}
   </div>}
  </article>}
  <div className="los-teacher-controls">
   <button type="button" disabled={index===0} onClick={()=>go(index-1)}>Edellinen</button>
   <button type="button" disabled={index===TEACHER_L004.scenes.length-1}
    onClick={()=>go(index+1)}>Seuraava</button>
  </div>
  <p className="los-teacher-evidence" role="status">
   Ensiyrityksellä ja ilman vihjettä oikein: {evidence.independent.length}/{evidence.required}
   {" "}soveltavaa kysymystä. Tämä ei ole kielitaidon arvosana.
  </p>
  <p className="los-teacher-book-link">
   <a href="/los#/1/01/vocabulary" target="_blank" rel="noopener noreferrer">
    Avaa LOS! 1:n kappaleen 1 sanasto uuteen välilehteen
   </a>
  </p>
  <p className="los-teacher-book-note">Kirjan avaaminen ei sulje oppitunnin opetustilaa eikä merkitse tehtävää suoritetuksi.
   Alempana olevat vanhat kirjatyöt ja lopputarkistus säilyvät käytössä siirtymävaiheessa.</p>
 </section>;
}
