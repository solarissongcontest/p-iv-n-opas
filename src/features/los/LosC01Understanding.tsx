import { useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { LOS1_C01_LINES, LOS1_C01_QUESTIONS, LOS1_C01_TEXT_VERSION } from "./content/los1C01";
import { useLosChapterDraft } from "./studyState";

/**
 * Extra source-based tasks. These do not replace the existing 12
 * chapter grammar/phrase exercise items or claim a finished chapter test.
 */
const evidenceId="C01-SOURCE-EVIDENCE-01";
const evidencePrompt="Mikä repliikki sisältää ilmauksen Bis später?";
const evidenceCorrect="u07";
export function LosC01Understanding({goToText}:{goToText:()=>void}) {
  const {draft,update,saved}=useLosChapterDraft(1,"01");
  const [showTranslation,setShowTranslation]=useState(false);
  const responseIds=[...LOS1_C01_QUESTIONS.map(q=>q.id),evidenceId];
  const checked= draft.practiceChecked;
  const values=draft.practiceAnswers;
  const answered=responseIds.filter(id=>Boolean(values[id]));
  const checkedResponses=responseIds.filter(id=>checked.includes(id));
  const score=LOS1_C01_QUESTIONS.filter(q=>checked.includes(q.id)&&values[q.id]===q.correctId).length+
    (checked.includes(evidenceId)&&values[evidenceId]===evidenceCorrect?1:0);
  const setAnswer=(id:string,value:string)=>{
    update(current=>({...current,
      practiceAnswers:{...current.practiceAnswers,[id]:value},
      practiceChecked:current.practiceChecked.filter(item=>item!==id),
    }));
  };
  const check=(id:string)=>{
    if(!values[id])return;
    update(current=>({...current,practiceChecked:Array.from(new Set([...current.practiceChecked,id]))}));
  };
  return <section className="los-inner-page los-understanding">
    <p className="los-eyebrow">VERSTEHEN / KAPITEL 1 / ORIGINALTEXT</p>
    <h1>Ymmärrä keskustelu</h1>
    <p className="los-page-intro">Nämä viisi tehtävää perustuvat Franzin ja Jörgin koko oikeaan keskusteluun. Kysymykset koskevat jo tunnistettavia tervehdyksiä, nimiä ja hyvästelyjä. Ikää koskevat muodot opitaan tarkemmin vasta kappaleessa 6.</p>
    <button className="los-outline-button" type="button" onClick={goToText}><BookOpen size={17}/> Avaa alkuperäinen keskustelu <ArrowRight size={16}/></button>
    <div className="los-c01-questions">
      {LOS1_C01_QUESTIONS.map((q,index)=>{
        const answer=values[q.id]??"";
        const isChecked=checked.includes(q.id);
        return <fieldset className="los-c01-question" key={q.id}>
          <legend><span>{index+1}.</span> {q.prompt}</legend>
          <div className="los-c01-options">
            {q.options.map(option=><label key={option.id} className={answer===option.id?"is-selected":""}>
              <input type="radio" name={q.id} value={option.id} checked={answer===option.id} onChange={()=>setAnswer(q.id,option.id)}/>
              <span>{option.text}</span>
            </label>)}
          </div>
          <button type="button" className="los-exercise-check" onClick={()=>check(q.id)} disabled={!answer}>Tarkista vastaus</button>
          {isChecked&&<p className="los-c01-feedback" role="status"><strong>{answer===q.correctId?"Oikein.":"Kokeile uudelleen."}</strong> {q.feedback}</p>}
        </fieldset>;
      })}
      <fieldset className="los-c01-question">
        <legend><span>5.</span> {evidencePrompt}</legend>
        <p>Valitse yksi alkuperäisen tekstin kahdeksasta puheenvuorosta. Tämä on tekstikohdan paikantamistehtävä, ei pelkkä sanastokysymys.</p>
        <div className="los-c01-evidence">
          {LOS1_C01_LINES.map(line=><label key={line.id} className={values[evidenceId]===line.id?"is-selected":""}>
            <input type="radio" name={evidenceId} value={line.id} checked={values[evidenceId]===line.id} onChange={()=>setAnswer(evidenceId,line.id)}/>
            <span lang="de"><strong>{line.speaker}:</strong> {line.text}</span>
          </label>)}
        </div>
        <button type="button" className="los-exercise-check" onClick={()=>check(evidenceId)} disabled={!values[evidenceId]}>Tarkista tekstikohta</button>
        {checked.includes(evidenceId)&&<p className="los-c01-feedback" role="status"><strong>{values[evidenceId]===evidenceCorrect?"Oikein.":"Etsi uudelleen."}</strong> Franz sanoo Bis später! keskustelun seitsemännessä repliikissä.</p>}
      </fieldset>
    </div>
    <div className="los-c01-understanding-summary">
      <p><CheckCircle2 size={19}/> <strong>{checkedResponses.length}/5 tarkistettu</strong> · {score}/{checkedResponses.length} oikein tarkistetuista · {answered.length}/5 vastattu</p>
      <p>Tämä on alkuperäistekstin harjoitus, ei kappaletesti eikä lopullinen kielitaidon arvosana.</p>
      <button type="button" className="los-outline-button" aria-pressed={showTranslation} onClick={()=>setShowTranslation(v=>!v)}>{showTranslation?"Piilota tekstin suomennos":"Näytä koko tekstin suomennos"}</button>
      {showTranslation&&<ol className="los-c01-translations">
        {LOS1_C01_LINES.map(line=><li key={line.id}><strong>{line.speaker}:</strong> {line.meaning}</li>)}
      </ol>}
      <p className="los-c01-saved" role="status">{saved?"Vastaukset tallennettu tähän selaimeen ja varmuuskopioitavissa.":"Tallennus epäonnistui. Vastauksia ei ole varmistettu."}</p>
      <p className="los-c01-source-version">Alkuperäisteksti: M-COM-01 · Sisältöversio {LOS1_C01_TEXT_VERSION}.</p>
    </div>
  </section>;
}
