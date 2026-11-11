import { useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import {
  LOS1_C02_LINES, LOS1_C02_QUESTIONS, LOS1_C02_TEXT_VERSION,
} from "./content/los1C02";
import { useLosChapterDraft } from "./studyState";

const evidenceId="C02-SOURCE-EVIDENCE-01";
const evidencePrompt="Missä repliikissä Greta kertoo opettajan sukunimen?";
const evidenceCorrect="u04";

/** Understanding questions based exclusively on the unchanged source dialogue. */
export function LosC02Understanding({goToText}:{goToText:()=>void}) {
  const {draft,update,saved}=useLosChapterDraft(1,"02");
  const [showTranslation,setShowTranslation]=useState(false);
  const questions=[...LOS1_C02_QUESTIONS.map(q=>q.id), evidenceId];
  const answers=draft.practiceAnswers;
  const checked=draft.practiceChecked;
  const scored=questions.filter(id=>checked.includes(id)).length;
  const correct=LOS1_C02_QUESTIONS.filter(q=>checked.includes(q.id)&&answers[q.id]===q.correctId).length +
    (checked.includes(evidenceId)&&answers[evidenceId]===evidenceCorrect?1:0);
  const answered=questions.filter(id=>Boolean(answers[id])).length;
  const change=(id:string,value:string)=>update(current=>({...current,
    practiceAnswers:{...current.practiceAnswers,[id]:value},
    practiceChecked:current.practiceChecked.filter(item=>item!==id),
  }));
  const check=(id:string)=>{if(answers[id])update(current=>({...current,
    practiceChecked:Array.from(new Set([...current.practiceChecked,id])),
  }));};
  return <section className="los-inner-page los-understanding">
    <p className="los-eyebrow">VERSTEHEN / KAPITEL 2 / ORIGINALTEXT</p>
    <h1>Ymmärrä nimikeskustelu</h1>
    <p className="los-page-intro">Tutki kuutta julkaistua Franzin ja Gretan repliikkiä. Tärkeintä ovat <span lang="de">ich heiße</span>, <span lang="de">Wie heißt du?</span> sekä puhutun kielen ymmärtäminen tekstin avulla. Tekstin vaikeat rakenteet eivät ole vielä aktiivisen kieliopin koeainesta.</p>
    <button className="los-outline-button" type="button" onClick={goToText}><BookOpen size={17}/> Takaisin alkuperäistekstiin <ArrowRight size={16}/></button>
    <div className="los-c01-questions">
      {LOS1_C02_QUESTIONS.map((q,index)=><fieldset className="los-c01-question" key={q.id}>
        <legend><span>{index+1}.</span> {q.prompt}</legend>
        <div className="los-c01-options">
          {q.options.map(option=><label key={option.id} className={answers[q.id]===option.id?"is-selected":""}>
            <input type="radio" name={q.id} value={option.id} checked={answers[q.id]===option.id}
              onChange={()=>change(q.id,option.id)}/><span>{option.text}</span>
          </label>)}
        </div>
        <button className="los-exercise-check" type="button" disabled={!answers[q.id]} onClick={()=>check(q.id)}>Tarkista vastaus</button>
        {checked.includes(q.id)&&<p className="los-c01-feedback" role="status">
          <strong>{answers[q.id]===q.correctId?"Oikein.":"Tarkista tekstistä."}</strong> {q.feedback}
        </p>}
      </fieldset>)}
      <fieldset className="los-c01-question">
        <legend><span>5.</span> {evidencePrompt}</legend>
        <p>Paikanna oikea repliikki alkuperäisestä kuusivuoroisesta dialogista. Henkilönimen oikeinkirjoitus säilyy sellaisena kuin lähteessä.</p>
        <div className="los-c01-evidence">
          {LOS1_C02_LINES.map(line=><label key={line.id} className={answers[evidenceId]===line.id?"is-selected":""}>
            <input type="radio" name={evidenceId} value={line.id} checked={answers[evidenceId]===line.id}
              onChange={()=>change(evidenceId,line.id)}/>
            <span lang="de"><strong>{line.speaker}:</strong> {line.text}</span>
          </label>)}
        </div>
        <button className="los-exercise-check" type="button" disabled={!answers[evidenceId]} onClick={()=>check(evidenceId)}>Tarkista tekstikohta</button>
        {checked.includes(evidenceId)&&<p className="los-c01-feedback" role="status">
          <strong>{answers[evidenceId]===evidenceCorrect?"Oikein.":"Etsi uudelleen."}</strong> Greta kertoo sukunimen tekstin neljännessä puheenvuorossa: Herr Weiß.
        </p>}
      </fieldset>
    </div>
    <div className="los-c01-understanding-summary">
      <p><CheckCircle2 size={19}/> <strong>{scored}/5 tarkistettu</strong> · {correct}/{scored} oikein tarkistetuista · {answered}/5 vastattu</p>
      <p>Harjoitusten tilat tallennetaan olemassa olevaan kappaleluonnokseen. Tämä ei ole valmis C02-kappaletesti.</p>
      <button type="button" className="los-outline-button" aria-pressed={showTranslation}
        onClick={()=>setShowTranslation(value=>!value)}>{showTranslation?"Piilota koko tekstin suomennos":"Näytä koko tekstin suomennos"}</button>
      {showTranslation&&<ol className="los-c01-translations">
        {LOS1_C02_LINES.map(line=><li key={line.id}><strong>{line.speaker}:</strong> {line.meaning}</li>)}
      </ol>}
      <p className="los-c01-saved" role="status">{saved?"Vastaukset tallennettu paikallisesti ja sisältyvät JSON-varmuuskopioon.":"Tallennus epäonnistui. Ota vastaukset talteen ennen sivun sulkemista."}</p>
      <p className="los-c01-source-version">Alkuperäisteksti: M-WB-01 · Sisältöversio {LOS1_C02_TEXT_VERSION}.</p>
    </div>
  </section>;
}
