import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, CircleHelp, RotateCcw } from "lucide-react";
import { useLosChapterDraft } from "./studyState";
import { losFutureExercisesFor } from "./content/losFutureExercises";
import { losFutureExercisesForSection, type LosFutureExerciseMode } from "./content/losFutureExerciseSections";
import { losFutureMatchingPairs, readLosFutureMatchingAnswer, writeLosFutureMatchingAnswer } from "./content/losFutureMatching";
import { losFutureGapParts } from "./content/losFutureGap.ts";
import { losFutureRecallPairs, readLosFutureRecallAnswer, writeLosFutureRecallAnswer } from "./content/losFutureRecall.ts";
import { losFutureExitTicket, readLosFutureExitAnswer, writeLosFutureExitAnswer } from "./content/losFutureExitTicket.ts";
import {losFutureTwoPartTask,readLosFutureTwoPartAnswer,writeLosFutureTwoPartAnswer} from "./content/losFutureTwoPart.ts";
import {losFutureEvidenceTask,losFutureEvidenceExcerptInSource,readLosFutureEvidenceAnswer,writeLosFutureEvidenceAnswer} from "./content/losFutureEvidence.ts";
import {losFutureReasoningTask,readLosFutureReasoningAnswer,writeLosFutureReasoningAnswer} from "./content/losFutureReasoning.ts";
import {losFutureSpanGenreTask,readLosFutureSpanGenreAnswer,losFutureSpanGenreComplete} from "./content/losFutureSpanGenre.ts";
import {LosFutureSpanGenreFields} from "./LosFutureSpanGenreFields.tsx";
import {losFutureRemainingTask,readLosFutureRemainingAnswer,losFutureRemainingComplete} from "./content/losFutureRemaining.ts";
import {LosFutureRemainingFields} from "./LosFutureRemainingFields.tsx";
import {losFutureFourTurnTask,readLosFutureFourTurnAnswer,writeLosFutureFourTurnAnswer} from "./content/losFutureFourTurn.ts";
import { losFutureShortAnswer } from "./content/losFutureShortAnswer.ts";
import { losFutureOrderingTiles, readLosFutureOrderingAnswer, writeLosFutureOrderingAnswer } from "./content/losFutureOrdering.ts";
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
  const fourTurn=task ? losFutureFourTurnTask(task) : null;
  const fourAnswers=fourTurn && task
    ? readLosFutureFourTurnAnswer(draft.practiceAnswers[task.id]??"",fourTurn) : null;
  const remaining=task ? losFutureRemainingTask(task) : null;
  const remainingAnswers=remaining && task
    ? readLosFutureRemainingAnswer(draft.practiceAnswers[task.id]??"",remaining) : null;
  const spanGenre=task ? losFutureSpanGenreTask(task) : null;
  const spanGenreAnswer=spanGenre && task
    ? readLosFutureSpanGenreAnswer(draft.practiceAnswers[task.id]??"",spanGenre) : null;
  const reasoning=task ? losFutureReasoningTask(task) : null;
  const reasoningAnswers=reasoning && task
    ? readLosFutureReasoningAnswer(draft.practiceAnswers[task.id]??"",reasoning) : null;
  const evidenceTask=task ? losFutureEvidenceTask(task) : null;
  const evidenceAnswers=evidenceTask && task
    ? readLosFutureEvidenceAnswer(draft.practiceAnswers[task.id]??"",evidenceTask) : null;
  const twoPart=task ? losFutureTwoPartTask(task) : null;
  const twoAnswers=twoPart && task
    ? readLosFutureTwoPartAnswer(draft.practiceAnswers[task.id]??"",twoPart) : null;
  const shortAnswer=task ? losFutureShortAnswer(task) : null;
  const exitTicket=task ? losFutureExitTicket(task) : null;
  const exitAnswers=exitTicket && task
    ? readLosFutureExitAnswer(draft.practiceAnswers[task.id]??"",exitTicket) : null;
  const recallPairs=task ? losFutureRecallPairs(task) : null;
  const recallSelection=recallPairs && task
    ? readLosFutureRecallAnswer(draft.practiceAnswers[task.id]??"",recallPairs) : null;
  const matchingPairs=task ? losFutureMatchingPairs(task) : null;
  const matchingSelection=matchingPairs && task
    ? readLosFutureMatchingAnswer(draft.practiceAnswers[task.id]??"",matchingPairs) : null;
  const gapParts=task ? losFutureGapParts(task) : null;
  const orderingTiles=task ? losFutureOrderingTiles(task) : null;
  const orderingSelection=orderingTiles && task
    ? readLosFutureOrderingAnswer(draft.practiceAnswers[task.id]??"",orderingTiles) : null;
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
        <h2 id="los-future-exercise-title">{task.title==="sentence-order"?"Järjestä tekstin sanat":task.title}</h2>
        <p className="los-future-exercise-question">
          {orderingTiles && task.id.endsWith("-R02")
            ? "Järjestä sanapalat oikeaan järjestykseen. Tarkista sitten kielioppi ja välimerkit mallivastauksesta."
            : twoPart?.kind==="text-b"
              ? "Lue alla oleva Text B ja kirjoita kaksi perusteltua havaintoa suomeksi. Huomaa myös tekstin tarkoitus ja ilmaisutapa."
              : remaining?.kind==="pronunciation"
                ? "Lue alla olevat kaksi saksankielistä lausetta ääneen kahdesti. Kirjaa havaintosi ja tarkista sanapainot vain luotettavasta lähteestä."
                : task.prompt}
        </p>
        {exitTicket && exitAnswers ? <fieldset className="los-future-exit-ticket">
          <legend>Kaksi itsenäistä lopputarkistusta</legend>
          <p>Vastaa molempiin kysymyksiin ensin muistista. Malli avataan vasta oman
            yrityksen jälkeen. Tehtävä on itsearviointia, ei automaattinen koe.</p>
          {exitTicket.questions.map((question,index)=><label key={index} className="los-future-exit-row">
            <span lang="fi">{index+1}. {question}</span>
            <textarea rows={2} autoComplete="off" spellCheck={false}
              lang={index===0?"de":"fi"} maxLength={400}
              aria-label={`Kysymyksen ${index+1} oma vastauksesi`}
              value={exitAnswers[index]??""}
              onChange={event=>{
                const next=[...exitAnswers];
                next[index]=event.target.value;
                changeAnswer(task.id,writeLosFutureExitAnswer(exitTicket,next));
              }}/>
          </label>)}
        </fieldset> : remaining && remainingAnswers ? <LosFutureRemainingFields
          task={remaining} answer={remainingAnswers} onChange={raw=>changeAnswer(task.id,raw)}/>
          : spanGenre && spanGenreAnswer ? <LosFutureSpanGenreFields
          task={spanGenre} answer={spanGenreAnswer} onChange={raw=>changeAnswer(task.id,raw)}/>
          : fourTurn && fourAnswers ? <fieldset className="los-future-four-turn">
          <legend>Kirjoita itse neljän vuoron keskustelu</legend>
          <p>Keksi kahdelle henkilölle luonteva keskustelu tehtävän tilanteeseen.
            Käytä kappaleen sanastoa ja rakennetta, mutta älä kopioi mallia.
            Puheharjoituksen äänentunnistusta tai pisteytystä ei ole käytössä.</p>
          {fourTurn.labels.map((label,index)=><label key={index} className="los-future-four-turn-row">
            <span>{index+1}. {label}</span>
            <textarea rows={2} lang="de" spellCheck={false} autoComplete="off"
              maxLength={450} aria-label={`Puheenvuoro ${index+1}: ${label}`}
              value={fourAnswers[index]??""}
              onChange={event=>{
                const next=[...fourAnswers];next[index]=event.target.value;
                changeAnswer(task.id,writeLosFutureFourTurnAnswer(fourTurn,next));
              }} />
          </label>)}
        </fieldset> : reasoning && reasoningAnswers ? <fieldset className="los-future-reasoning">
          <legend>{reasoning.kind==="grammar"?"Selitä, näytä ja perustele kielioppisääntö":
            "Kolme tekstiväitettä ja jokaisen lähdetodiste"}</legend>
          <p>Jokainen vastaus tallennetaan saman lähdetehtävän omiin kenttiin.
            Kirjoita kaikki kohdat ennen ratkaisuohjeen avaamista. Tehtävää ei pisteytetä automaattisesti.</p>
          <details className="los-future-reasoning-source" open={reasoning.kind==="claims"}>
            <summary>{reasoning.sourceTitle}</summary>
            <p lang={reasoning.kind==="grammar"?"fi":"de"}>{reasoning.sourceText}</p>
          </details>
          {reasoning.parts.map((part,index)=><label key={index} className="los-future-reasoning-row">
            <span>{index+1}. {part.label}</span>
            <textarea rows={2} spellCheck={false} autoComplete="off" maxLength={350}
              lang={part.lang} aria-label={`Tehtävän ${index+1}. vastaus: ${part.label}`}
              value={reasoningAnswers[index]??""}
              onChange={event=>{
                const next=[...reasoningAnswers];next[index]=event.target.value;
                changeAnswer(task.id,writeLosFutureReasoningAnswer(reasoning,next));
              }} />
          </label>)}
        </fieldset> : evidenceTask && evidenceAnswers ? <fieldset className="los-future-evidence">
          <legend>{evidenceTask.kind==="dialogue"?"Tulkitse puheenvuoroja":"Etsi tekstistä näyttöä"}</legend>
          <p>Vastaa ensin kumpaankin osaan omin sanoin. Lähdeteksti on tässä, jotta
            perustelusi voi tarkistaa oikeasta tekstikohdasta.
            Automaattista pisteytystä ei tehdä.</p>
          <blockquote lang="de" className="los-future-evidence-source">{evidenceTask.sourceText}</blockquote>
          {evidenceTask.questions.map((question,index)=><label key={index} className="los-future-evidence-row">
            <span>{index+1}. {question}</span>
            <textarea rows={index===1?3:2} spellCheck={false} autoComplete="off"
              lang={evidenceTask.languages[index]} maxLength={700}
              aria-label={`Lähdetehtävän osan ${index+1} vastaus: ${question}`}
              value={evidenceAnswers[index]??""}
              onChange={event=>{
                const next=[...evidenceAnswers];
                next[index]=event.target.value;
                changeAnswer(task.id,writeLosFutureEvidenceAnswer(evidenceTask,next));
              }} />
            {evidenceTask.kind==="text-evidence"&&index===0&&Boolean(evidenceAnswers[0]?.trim())&&
              <span className="los-future-exercise-hint" role="status">
                {losFutureEvidenceExcerptInSource(evidenceTask,evidenceAnswers[0]!)
                  ?"Kopioimasi teksti löytyy Text A:sta. Tarkista itse, onko se kokonainen virke ja osoittaako se lähtötilanteen."
                  :"Kopioimaasi tekstikohtaa ei löydy Text A:sta täsmälleen näin. Tarkista lainaus, välimerkit ja sanamuodot."}
              </span>}
          </label>)}
        </fieldset> : twoPart && twoAnswers ? <fieldset className="los-future-two-part">
          <legend>{twoPart.kind==="correction"
            ? (twoPart.styleOnly?"Hio ilmaus ja perustele":"Korjaa lause ja perustele")
            : "Tutki Text B:tä: kaksi erillistä havaintoa"}</legend>
          <p>Kirjoita kumpikin vastaus itse ennen vertailumallin avaamista.
            Tämä on harjoittelua, ei automaattinen arvosana.</p>
          <blockquote lang="de" className="los-future-two-part-source">{twoPart.readingText}</blockquote>
          {twoPart.questions.map((question,index)=><label key={index} className="los-future-two-part-row">
            <span>{index+1}. {question}</span>
            <textarea rows={2} maxLength={600} autoComplete="off" spellCheck={false}
              lang={twoPart.languages[index]}
              aria-label={`Osan ${index+1} vastaus: ${question}`}
              value={twoAnswers[index]??""}
              onChange={event=>{
                const next=[...twoAnswers];
                next[index]=event.target.value;
                changeAnswer(task.id,writeLosFutureTwoPartAnswer(twoPart,next));
              }} />
          </label>)}
        </fieldset> : shortAnswer ? <div className="los-future-short-answer">
          <label htmlFor="los-future-short-input">
            {shortAnswer.kind==="reading"?"Vastaa Text A:n sisältökysymykseen suomeksi":
              shortAnswer.kind==="translation"?"Kirjoita saksankielinen käännös":"Kirjoita kielioppitehtävän vastauksesi"}
          </label>
          <input id="los-future-short-input" type="text" spellCheck={false} autoCapitalize="off"
            autoComplete="off" maxLength={300} lang={shortAnswer.language}
            value={draft.practiceAnswers[task.id]??""}
            onChange={event=>changeAnswer(task.id,event.target.value)}
            placeholder={shortAnswer.kind==="reading"?"Kirjoita tekstistä löytämäsi vastaus…":
              shortAnswer.kind==="translation"?"Kirjoita lause saksaksi…":"Kirjoita oma korjauksesi tai vastauksesi…"} />
          <p className="los-future-exercise-hint">Kirjoita vastaus itse. {shortAnswer.kind==="reading"
            ?"Perustele mielessäsi, mistä Text A:n kohdasta löysit tiedon. "
            :"Muista tarkistaa oppimasi rakenne. "}
            Vertaa omaa vastaustasi käsikirjoituksen malliin vasta yrityksen jälkeen.
            Eri oikeita ilmaisuja ei pisteytetä automaattisesti.</p>
        </div> : recallPairs && recallSelection ? <fieldset className="los-future-recall">
          <legend>Palauta kuusi sanaa muistista</legend>
          <p>Kirjoita saksankielinen sana tai ilmaus jokaisen suomennoksen perusteella.
            Voit tarkistaa vastaukset vasta oman yrityksesi jälkeen. Tehtävä ei anna konearvosanaa.</p>
          {recallPairs.map((pair,index)=><label key={index} className="los-future-recall-row">
            <span lang="fi">{index+1}. {pair.fi}</span>
            <input type="text" lang="de" autoComplete="off" autoCapitalize="off" spellCheck={false}
              maxLength={100} aria-label={`Saksaksi: ${pair.fi}, kohta ${index+1}`}
              value={recallSelection[index]??""}
              onChange={event=>{
                const next=[...recallSelection];
                next[index]=event.target.value;
                changeAnswer(task.id,writeLosFutureRecallAnswer(recallPairs,next));
              }} />
          </label>)}
        </fieldset> : matchingPairs && matchingSelection ? <fieldset className="los-future-matching">
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
              {[...new Set([...matchingPairs.slice(1),...matchingPairs.slice(0,1)].map(option=>option.fi))].map(fi=>
                <option key={fi} value={fi}>{fi}</option>)}
            </select>
          </label>)}
        </fieldset> : orderingTiles && orderingSelection ? <div className="los-future-ordering">
          <p><strong>Rakenna lause.</strong> Valitse sanapalat oikeassa järjestyksessä.
            Tämä on oma harjoitus, ei tarkistettu pisteytettävä koe.</p>
          <div role="group" aria-label="Lauseen rakennuspalat" className="los-future-ordering-pieces">
            {orderingTiles.map(tile=><button type="button" key={tile.index}
              disabled={orderingSelection.includes(tile.index)}
              onClick={()=>changeAnswer(task.id,writeLosFutureOrderingAnswer(orderingTiles,[...orderingSelection,tile.index]))}>
              <span lang="de">{tile.word}</span>
            </button>)}
          </div>
          <div className="los-future-ordering-built">
            <strong>Rakentamasi lause</strong>
            <output lang="de" className="los-future-ordering-answer">
              {draft.practiceAnswers[task.id] || "Valitse ensimmäinen sanapala"}
            </output>
          </div>
          <div className="los-future-ordering-actions">
            <button type="button" disabled={orderingSelection.length===0}
              onClick={()=>changeAnswer(task.id,writeLosFutureOrderingAnswer(orderingTiles,orderingSelection.slice(0,-1)))}>
              Poista viimeinen
            </button>
            <button type="button" disabled={orderingSelection.length===0}
              onClick={()=>changeAnswer(task.id,"")}>Aloita alusta</button>
          </div>
          <p className="los-future-exercise-hint">Välimerkit perustuvat vastausluonnokseen ja vaativat vielä kielentarkistuksen.
            Näytä mallivastaus vasta oman yrityksen jälkeen.</p>
        </div> : gapParts ? <div className="los-future-gap">
          <label htmlFor="los-future-gap-input">Täydennä saksankielinen lause</label>
          <p lang="de" className="los-future-gap-sentence">
            <span>{gapParts.before}</span>
            <input id="los-future-gap-input" type="text" autoComplete="off"
              autoCapitalize="off" spellCheck={false} maxLength={100}
              aria-label="Puuttuva saksankielinen sana tai ilmaus"
              value={draft.practiceAnswers[task.id]??""}
              onChange={e=>changeAnswer(task.id,e.target.value)}/>
            <span>{gapParts.after}</span>
          </p>
          <p className="los-future-exercise-hint">Kirjoita sana tai ilmaus itse, myös välimerkki tarvittaessa.
            Vastaus tallentuu luonnoksena; mallin avaaminen on itsevertailua, ei koneellinen arvosana.</p>
        </div> : <label className="los-future-exercise-answer" htmlFor="los-future-exercise-input">
          <span>Oma vastauksesi</span>
          {orderingTiles && orderingSelection===null && draft.practiceAnswers[task.id]?.trim()&&
            <span className="los-future-exercise-hint" role="status">
              Sanajärjestystehtävän lähdevirkettä on voitu korjata. Aiempi vastauksesi on
              säilytetty tässä tekstinä, koska sitä ei voi turvallisesti muuttaa uuden
              tehtävän sanapalajonoksi.
            </span>}
          <textarea id="los-future-exercise-input" rows={4} spellCheck={false}
            value={draft.practiceAnswers[task.id]??""} maxLength={5000}
            onChange={e=>changeAnswer(task.id,e.target.value)}
            placeholder="Kirjoita ensin oma vastauksesi tähän…" />
        </label>}
        <div className="los-future-exercise-actions">
          <button type="button" className="los-future-exercise-primary"
            aria-expanded={showAnswer} aria-controls="los-future-exercise-key"
            disabled={!draft.practiceAnswers[task.id]?.trim()
              ||(Boolean(exitTicket)&&(exitAnswers
              ? exitAnswers.some(answer=>!answer.trim())
              : !draft.practiceAnswers[task.id]?.trim()))
              ||(Boolean(shortAnswer)&&!draft.practiceAnswers[task.id]?.trim())
              ||(Boolean(twoPart)&&Boolean(twoAnswers)&&twoAnswers!.some(answer=>!answer.trim()))
              ||(Boolean(evidenceTask)&&Boolean(evidenceAnswers)&&evidenceAnswers!.some(answer=>!answer.trim()))
              ||(Boolean(reasoning)&&Boolean(reasoningAnswers)&&reasoningAnswers!.some(answer=>!answer.trim()))
              ||(Boolean(fourTurn)&&Boolean(fourAnswers)&&fourAnswers!.some(answer=>!answer.trim()))
              ||(Boolean(spanGenre)&&Boolean(spanGenreAnswer)&&!losFutureSpanGenreComplete(spanGenre!,spanGenreAnswer!))
              ||(Boolean(remaining)&&Boolean(remainingAnswers)&&!losFutureRemainingComplete(remaining!,remainingAnswers!))}
            onClick={()=>setShowAnswer(v=>!v)}>
            <CircleHelp size={16} aria-hidden="true"/>
            {showAnswer?"Piilota vastausluonnos":"Näytä vastausluonnos"}
          </button>
          {draft.practiceChecked.includes(task.id)&&
            <span className="los-future-exercise-checked"><CheckCircle2 size={16}/> Verrattu</span>}
          {!draft.practiceAnswers[task.id]?.trim()&&!exitTicket&&!shortAnswer&&!twoPart&&
            !evidenceTask&&!reasoning&&!fourTurn&&!spanGenre&&!remaining&&
            <span className="los-future-exercise-hint" role="status">
              Kokeile tehtävää ensin itse ennen vastausluonnoksen avaamista.
            </span>}
          {exitTicket && exitAnswers?.some(answer=>!answer.trim())&&
            <span className="los-future-exercise-hint">Vastaa ensin molempiin loppukysymyksiin.</span>}
          {twoPart && twoAnswers?.some(answer=>!answer.trim())&&
            <span className="los-future-exercise-hint">Vastaa ensin molempiin tehtävän osiin.</span>}
          {evidenceTask && evidenceAnswers?.some(answer=>!answer.trim())&&
            <span className="los-future-exercise-hint">Kirjoita sekä tekstin havainto että oma perustelusi.</span>}
          {reasoning && reasoningAnswers?.some(answer=>!answer.trim())&&
            <span className="los-future-exercise-hint">Täydennä kaikki selitykset ja lähdetodisteet ennen itsevertailua.</span>}
          {fourTurn && fourAnswers?.some(answer=>!answer.trim())&&
            <span className="los-future-exercise-hint">Kirjoita neljä erillistä puheenvuoroa ennen itsevertailua.</span>}
          {spanGenre && spanGenreAnswer && !losFutureSpanGenreComplete(spanGenre,spanGenreAnswer)&&
            <span className="los-future-exercise-hint">Valitse tekstinäyttö ja täydennä molemmat vastaukset.</span>}
          {remaining && remainingAnswers && !losFutureRemainingComplete(remaining,remainingAnswers)&&
            <span className="los-future-exercise-hint">Täytä tehtävän vaaditut osat ennen itsevertailua.</span>}
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
