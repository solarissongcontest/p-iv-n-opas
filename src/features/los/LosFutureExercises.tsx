import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, CircleHelp, RotateCcw } from "lucide-react";
import { useLosChapterDraft } from "./studyState";
import { losFutureExercisesFor } from "./content/losFutureExercises";
import { losFutureExercisesForSection, type LosFutureExerciseMode } from "./content/losFutureExerciseSections";
import { losFutureMatchingPairs, readLosFutureMatchingAnswer, writeLosFutureMatchingAnswer } from "./content/losFutureMatching";
import "./los-future-exercises.css";

type FutureExerciseDisplayMode = LosFutureExerciseMode | "guided";
const modeTitle:Record<FutureExerciseDisplayMode,string>={
  understand:"Ymmärrä tekstiä",practice:"Harjoittele",apply:"Käytä saksaa",guided:"Oppitunnin omat tehtävät",
};
const modeIntro:Record<FutureExerciseDisplayMode,string>={
  understand:"Tee luetun ymmärtämisen ja sanaston tehtävät. Palaa tarvittaessa Text A- ja Text B -sivuille.",
  practice:"Harjoittele rakenteita ja uuden tekstin ymmärtämistä. Kokeile itse ennen ratkaisuavaimen avaamista.",
  apply:"Tuota omaa saksaa, keskustelua tai tekstiä. Avoimissa tehtävissä vastausavaimessa on vain arviointiohje tai esimerkki.",
  guided:"Tämä tehtävälista on poimittu juuri kyseisen oppitunnin käsikirjoituksesta. Samat vastaukset ovat käytössä kappaleen harjoitussivuilla.",
};

/** Päiväkirjan olemassa oleva useLosChapterDraft erottaa omistajan, kirjan ja kappaleen.
 * Ei automaattista pisteytystä eikä itsenäistä paikallisen käyttäjän tunnistusavainta. */
export function LosFutureExercises({bookId,chapterId,mode,taskIds}:{
  bookId:number;
  chapterId:string;
  mode:FutureExerciseDisplayMode;
  taskIds?:readonly string[];
}) {
  const {draft,update,saved}=useLosChapterDraft(bookId,chapterId);
  const sourceTasks=losFutureExercisesFor(bookId,chapterId);
  const tasks=mode==="guided" ? sourceTasks.filter(task=>taskIds?.includes(task.id)) : losFutureExercisesForSection(sourceTasks,mode);
  const [selected,setSelected]=useState(0);
  const [showAnswer,setShowAnswer]=useState(false);
  const [showAll,setShowAll]=useState(false);
  const safeIndex=Math.min(selected,Math.max(0,tasks.length-1));
  const task=tasks[safeIndex];
  const matchingPairs=task ? losFutureMatchingPairs(task) : null;
  const matchingSelection=matchingPairs && task
    ? readLosFutureMatchingAnswer(draft.practiceAnswers[task.id]??"",matchingPairs) : null;
  const filled=tasks.filter(t=>Boolean(draft.practiceAnswers[t.id]?.trim())).length;
  const checked=tasks.filter(t=>draft.practiceChecked.includes(t.id)).length;
  function select(index:number){
    setSelected(Math.min(Math.max(index,0),tasks.length-1));
    setShowAnswer(false);
  }
  function changeAnswer(id:string,value:string){
    update(current=>({
      ...current,
      practiceAnswers:{...current.practiceAnswers,[id]:value.slice(0,5000)},
      practiceChecked:current.practiceChecked.filter(item=>item!==id),
    }));
    setShowAnswer(false);
  }
  function markChecked(id:string){
    update(current=>({
      ...current,
      practiceChecked:Array.from(new Set([...current.practiceChecked,id])),
    }));
  }
  return <div className="los-future-exercises">
    <p className="los-page-intro">{modeIntro[mode]}</p>
    <div className="los-future-exercise-notice" role="note">
      <strong>Toimituksellinen harjoitusversio.</strong> Tehtävät ja vastausluonnokset on tuotu
      kyseisen kirjan käsikirjoituksesta, mutta kielellinen ja arvioinnin tarkistus on kesken.
      Avaamasi ratkaisu on vertailuapua, ei tarkistettu automaattinen arvostelu.
      Suoritusmerkinnät tarkoittavat vain omaa vastaustarkistustasi.
    </div>
    <div className="los-future-exercise-summary">
      <span><strong>{tasks.length}</strong> tehtävää</span>
      <span>{filled} vastattu</span>
      <span>{checked} verrattu vastausluonnokseen</span>
      <span className={saved?"is-saved":"is-unsaved"} role="status">
        {saved?"Vastaukset tallennettu paikallisesti":"Tallennus ei onnistunut"}
      </span>
    </div>
    {tasks.length>0&&<div className="los-future-exercise-picker">
      <label htmlFor="los-future-exercise-choice">Valitse tehtävä</label>
      <div className="los-future-exercise-select">
        <select id="los-future-exercise-choice" value={safeIndex}
          onChange={e=>select(Number(e.target.value))}>
          {tasks.map((item,i)=><option key={item.id} value={i}>
            {item.id.split("-").at(-1)} · {item.title}{draft.practiceChecked.includes(item.id)?" ✓":draft.practiceAnswers[item.id]?.trim()?" •":""}
          </option>)}
        </select>
        <ChevronDown size={16} aria-hidden="true"/>
      </div>
    </div>}
    {!task ? <p>Tässä osiossa ei ole vielä tuotuja tehtäviä.</p> : <>
      <article className="los-future-exercise-card" aria-labelledby="los-future-exercise-title">
        <div className="los-future-exercise-topline">
          <span>LOS! {bookId} · {chapterId} · {task.id.split("-").at(-1)}</span>
          <span>{safeIndex+1} / {tasks.length}</span>
        </div>
        <h2 id="los-future-exercise-title">{task.title}</h2>
        <p className="los-future-exercise-question">{task.prompt}</p>
        {matchingPairs && matchingSelection ? <fieldset className="los-future-matching">
          <legend>Yhdistä saksan sana ja sen merkitys</legend>
          <p>Valitse jokaiselle sanalle suomennos. Vastaukset tallentuvat samaan tehtäväluonnokseen.
            Tämä on itsenäistä harjoittelua, ei automaattisesti pisteytettävä koe.</p>
          {matchingPairs.map((pair,index)=><label key={pair.de} className="los-future-match-row">
            <span lang="de">{pair.de}</span>
            <select aria-label={`Suomennos sanalle ${pair.de}`}
              value={matchingSelection[index]??""}
              onChange={event=>{
                const next=[...matchingSelection];
                next[index]=event.target.value;
                changeAnswer(task.id,writeLosFutureMatchingAnswer(matchingPairs,next));
              }}>
              <option value="">Valitse merkitys</option>
              {[...matchingPairs.slice(1),...matchingPairs.slice(0,1)].map(option=>
                <option key={option.fi} value={option.fi}>{option.fi}</option>)}
            </select>
          </label>)}
        </fieldset> : <label className="los-future-exercise-answer" htmlFor="los-future-exercise-input">
          <span>Oma vastauksesi</span>
          <textarea id="los-future-exercise-input" rows={4} spellCheck={false}
            value={draft.practiceAnswers[task.id]??""} maxLength={5000}
            onChange={e=>changeAnswer(task.id,e.target.value)}
            placeholder="Kirjoita ensin oma vastauksesi tähän…" />
        </label>}
        <div className="los-future-exercise-actions">
          <button type="button" className="los-future-exercise-primary"
            aria-expanded={showAnswer} aria-controls="los-future-exercise-key"
            onClick={()=>setShowAnswer(v=>!v)}>
            <CircleHelp size={16} aria-hidden="true"/>
            {showAnswer?"Piilota vastausluonnos":"Näytä vastausluonnos"}
          </button>
          {draft.practiceChecked.includes(task.id)&&
            <span className="los-future-exercise-checked"><CheckCircle2 size={16}/> Verrattu</span>}
        </div>
        {showAnswer&&<div id="los-future-exercise-key" className="los-future-exercise-solution">
          <h3>Alkuperäisen käsikirjoituksen ratkaisu tai arviointiohje</h3>
          <p>{task.answerKey}</p>
          {task.feedback&&<p><strong>Palauteluonnos:</strong> {task.feedback}</p>}
          <button type="button" disabled={!draft.practiceAnswers[task.id]?.trim()}
            onClick={()=>markChecked(task.id)}>
            <CheckCircle2 size={16} aria-hidden="true"/> Olen verrannut vastaukseni
          </button>
          {!draft.practiceAnswers[task.id]?.trim()&&<p className="los-future-exercise-hint">Kirjoita ensin oma vastauksesi, jotta voit merkitä vertailun tehdyksi.</p>}
        </div>}
      </article>
      <div className="los-future-exercise-nav">
        <button type="button" disabled={safeIndex===0} onClick={()=>select(safeIndex-1)}>
          <ArrowLeft size={17} aria-hidden="true"/> Edellinen
        </button>
        <button type="button" disabled={safeIndex>=tasks.length-1} onClick={()=>select(safeIndex+1)}>
          Seuraava <ArrowRight size={17} aria-hidden="true"/>
        </button>
      </div>
      <details className="los-future-exercise-overview" open={showAll}
        onToggle={event=>setShowAll(event.currentTarget.open)}>
        <summary><RotateCcw size={15} aria-hidden="true"/> Kaikki tämän osion tehtävät ({tasks.length})</summary>
        <ol>
          {tasks.map((item,i)=><li key={item.id}>
            <button type="button" onClick={()=>select(i)} aria-current={safeIndex===i?"true":undefined}>
              <span>{item.id.split("-").at(-1)} · {item.title}</span>
              <span>{draft.practiceChecked.includes(item.id)?"Verrattu":draft.practiceAnswers[item.id]?.trim()?"Vastattu":"Aloittamatta"}</span>
            </button>
          </li>)}
        </ol>
      </details>
    </>}
    <p className="los-future-exercise-footer"><strong>{modeTitle[mode]}:</strong> tähän tallentuvat vain
      omat vastausluonnokset ja oman vertailun merkinnät tässä selaimessa. Vain
      erikseen toteutettu ja vahvistettu pilvisynkronointi siirtää tietoja laitteiden välillä.</p>
  </div>;
}
