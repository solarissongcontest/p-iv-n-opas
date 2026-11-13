import {useState} from "react";
import {
  TEACHER_L004
} from "./content/l004.ts";
import {
  answerTeacher,hintTeacher,initialTeacherProgress,pauseTeacher,revealTeacher,
  selectTeacherScene,teacherEvidence,teacherCanComplete,openTeacherHelp,
  draftTeacherWritten,answerTeacherWritten,revealTeacherWritten,normalizeTeacherWritten,type TeacherProgress
} from "./core.ts";
import "./teacher.css";
import {L004_BOARDS} from "./content/l004Boards.ts";
import {LosTeachingBoard} from "./boards/LosTeachingBoard.tsx";

/**
 * First working Teacher Experience 2.0 lesson. Text-only by design until
 * licensed human audio has been reviewed. No TTS, AI or speech recognition.
 * State is provided by the existing owner-scoped chapter draft.
 */
export function LosL004TeacherPlayer({
 progress,onChange,onFinish
}:{progress:TeacherProgress|undefined;onChange:(next:TeacherProgress)=>void;onFinish:()=>void}){
 const p=progress??initialTeacherProgress(TEACHER_L004);
 const scene=TEACHER_L004.scenes.find(s=>s.id===p.scene)??TEACHER_L004.scenes[0]!;
 const index=TEACHER_L004.scenes.indexOf(scene);
 const result=p.answers[scene.id];
 const writtenResult=p.answers[scene.id+"-written"];
 const writtenDraft=p.writtenDrafts?.[scene.id]??"";
 const hintOpen=p.hints.includes(scene.id);
 const [showMap,setShowMap]=useState(false);
 const [helpForScene,setHelpForScene]=useState<string|null>(null);
 const helpOpen=helpForScene===scene.id&&!p.paused;
 const selectedHelp=scene.help?.find(h=>h.id===p.helpSelections?.[scene.id]);
 const teachingBoard=scene.id==="rule"?L004_BOARDS.rule:scene.id==="model"?L004_BOARDS.model:null;
 const evidence=teacherEvidence(TEACHER_L004,p);
 const canFinish=teacherCanComplete(TEACHER_L004,p);
 const go=(i:number)=>{
  const target=TEACHER_L004.scenes[i];
  if(target)onChange(selectTeacherScene(TEACHER_L004,p,target.id));
 };
 const feedback=scene.question?.choices.find(c=>c.id===result?.answer)?.feedback;
 const writtenFeedback=scene.written?.mistakes?.find(m=>
  normalizeTeacherWritten(m.answer)===normalizeTeacherWritten(writtenResult?.answer??""))?.feedback
  ??scene.written?.wrongFeedback;
 return <section className="los-teacher" aria-label="L004: opettajajohtoinen opetus">
  <div className="los-teacher-top">
   <div><p className="los-teacher-eyebrow">LOS TEACHER EXPERIENCE 2.0 · L004</p>
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
   <button type="button" aria-controls="los-teacher-help-panel" aria-expanded={helpOpen}
    disabled={p.paused} onClick={()=>setHelpForScene(helpOpen?null:scene.id)}>En ymmärrä</button>
   {p.paused?
    <button type="button" onClick={()=>onChange(selectTeacherScene(TEACHER_L004,p,scene.id))}>Jatka opetusta</button>:
    <button type="button" onClick={()=>onChange(pauseTeacher(p))}>Keskeytä</button>}
  </div>
  {showMap&&<nav id="los-teacher-map" aria-label="L004 opetustilanteet" className="los-teacher-map">
   {TEACHER_L004.scenes.map((item,i)=><button type="button" key={item.id}
     aria-current={item.id===scene.id?"step":undefined}
     onClick={()=>go(i)}>{i+1}. {item.title}</button>)}
  </nav>}
  <div id="los-teacher-help-panel" className="los-teacher-help-panel" hidden={!helpOpen}>
   <h5>Autetaan ymmärtämään: {scene.title}</h5>
   <p>Valitse tarvitsemasi selitys. Jos katsot apua ennen vastaamista, kyseistä vastausta ei lasketa itsenäiseksi ensiyritykseksi.</p>
   <div className="los-teacher-help-options" role="group" aria-label="Valitse lisäselitys">
    {(scene.help??[]).map(option=><button type="button" key={option.id}
      aria-pressed={selectedHelp?.id===option.id}
      onClick={()=>onChange(openTeacherHelp(TEACHER_L004,p,option.id))}>{option.label}</button>)}
   </div>
   {selectedHelp&&<div className="los-teacher-help-result" role="status">
    <strong>{selectedHelp.label}</strong>
    {selectedHelp.paragraphs.map((item,i)=><p key={i}>{item}</p>)}
   </div>}
  </div>
  {p.paused?<p className="los-teacher-paused" role="status">
   Opetus on keskeytetty. Aktiivinen kohta ja harjoitusvastaukset pysyvät tallessa.
  </p>:<article className="los-teacher-scene" aria-live="polite">
   <p className="los-teacher-phase">{scene.phase.replaceAll("-"," ")}</p>
   <h5>{scene.title}</h5>
   {scene.explanation.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
   {teachingBoard&&<LosTeachingBoard key={teachingBoard.id} board={teachingBoard}/>}
   {scene.example&&<div className="los-teacher-example">
    <p lang="de"><strong>{scene.example.german}</strong></p>
    <p>{scene.example.finnish}</p>
    <p><small>{scene.example.why}</small></p>
   </div>}
   {scene.written&&<form className="los-teacher-written" onSubmit={event=>{
    event.preventDefault();
    onChange(answerTeacherWritten(TEACHER_L004,p,writtenDraft,new Date().toISOString()));
   }}>
    <p className="los-teacher-written-heading">Kirjoita ensin muistista</p>
    <label htmlFor={"los-teacher-written-"+scene.id}>{scene.written.prompt}</label>
    <div className="los-teacher-written-entry">
     <input id={"los-teacher-written-"+scene.id} lang="de" autoComplete="off"
      autoCapitalize="none" spellCheck={false} maxLength={40}
      placeholder="Kirjoita saksaksi"
      value={writtenDraft}
      disabled={Boolean(writtenResult?.correct||writtenResult?.revealed)}
      onChange={event=>onChange(draftTeacherWritten(TEACHER_L004,p,event.currentTarget.value))}/>
     <button type="submit" disabled={Boolean(writtenResult?.correct||writtenResult?.revealed)||
        !normalizeTeacherWritten(writtenDraft)}>Tarkista kirjoittamani</button>
    </div>
    <p className="los-teacher-written-note">Vastaus tallentuu kirjoittaessasi. Pienet kirjainkoko- ja loppuvälimerkkierot sallitaan;
     tämä ei arvioi ääntämistä eikä kaikkia oikeinkirjoituksen yksityiskohtia.</p>
    {writtenResult&&<div className="los-teacher-feedback" role="status">
      {writtenResult.revealed?
       <p>Mallivastaus näytetty: <strong lang="de">{scene.written.accepted.join(" / ")}</strong>.
        Näyttö ei ole itsenäinen suoritus.</p>:
       <>
        <p><strong>{writtenResult.correct?scene.written.success:writtenFeedback}</strong></p>
        {writtenResult.correct&&<p>{writtenResult.independent?
          "Tuotit ilmauksen oikein ensimmäisellä yrityksellä ilman vihjettä.":
          "Oikein harjoitellen. Tämä ei ollut itsenäinen ensiyritys."}</p>}
        {!writtenResult.correct&&writtenResult.count>=2&&<p>{scene.written.alternative}</p>}
       </>}
    </div>}
    {writtenResult&&!writtenResult.correct&&!writtenResult.revealed&&writtenResult.count>=2&&
     <button type="button" className="los-teacher-help" onClick={()=>
       onChange(revealTeacherWritten(TEACHER_L004,p,new Date().toISOString()))}>
      Näytä mallivastaus ja jatka
     </button>}
   </form>}
   {scene.question&&(!scene.written||Boolean(writtenResult?.correct||writtenResult?.revealed||(writtenResult?.count??0)>=2||result))&&<div className="los-teacher-question">
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
      Näytä tehtävän vihje
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
  <div className="los-teacher-evidence" role="status">
   <p>Muistista kirjoitettu oikein ensimmäisellä yrityksellä ilman vihjettä:
    {" "}{evidence.writtenIndependent.length}/{evidence.writtenRequired} avointa tehtävää.</p>
   <p>Monivalinnat oikein ensiyrityksellä ilman vihjettä:
    {" "}{evidence.independent.length}/{evidence.required}. Kumpikaan mittari ei ole kielitaidon arvosana.</p>
  </div>
  <div className="los-teacher-completion">
   <p>Opetustilanteita käsitelty: {TEACHER_L004.scenes.filter(s=>p.visited.includes(s.id)).length}/{TEACHER_L004.scenes.length}.
    {" "}Käy jokainen kohta läpi ja kokeile sekä avoimia että valintatehtäviä. Väärä vastaus ei estä oppitunnin päättämistä.</p>
   {p.completedAt?
    <p role="status"><strong>Opetuskokonaisuus käyty läpi.</strong> Suoritus tallennettu.
      {TEACHER_L004.scenes.some(s=>s.written&&!p.answers[s.id+"-written"])?
       " Merkintä on aiemmalta versiolta; uudet avoimet harjoitukset voi tehdä erikseen.":
       " Tämä ei tarkoita, että kielitaito olisi vahvistettu."}</p>:
    <button type="button" onClick={onFinish} disabled={!canFinish}>
     Merkitse opetuskokonaisuus käsitellyksi
    </button>}
  </div>
  <p className="los-teacher-book-link">
   <a className="los-teacher-book-desktop" href="/los#/1/01/vocabulary?fromLesson=L004"
      target="_blank" rel="noopener noreferrer">
    Avaa LOS! 1:n kappaleen 1 sanasto uuteen välilehteen
   </a>
   <a className="los-teacher-book-mobile" href="/los#/1/01/vocabulary?fromLesson=L004">
    Avaa LOS! 1:n kappaleen 1 sanasto
   </a>
  </p>
  <p className="los-teacher-book-note">Kirjan avaaminen ei sulje oppitunnin opetustilaa eikä merkitse tehtävää suoritetuksi.
   Alempana olevat vanhat kirjatyöt ja lopputarkistus säilyvät käytössä siirtymävaiheessa.</p>
 </section>;
}
