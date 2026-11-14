import { useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { LosOriginalDialogue } from "./LosOriginalDialogue";
import { LosC08ReadingGuide } from "./LosC08ReadingGuide";
import { useLosChapterDraft } from "./studyState";
import { getLosOpenDialogue, type LosOpenText } from "./content/los1OpenDialogues";

export function LosOpenTextPage({ chapterId }: { chapterId:string }) {
  const text=getLosOpenDialogue(chapterId);
  if(!text)return null;
  return <>
    {text.chapterId==="08" && <LosC08ReadingGuide />}
    <LosOriginalDialogue
    chapterId={text.chapterId}
    sourceId={text.sourceId}
    version="1.0.0"
    lines={text.originalLines}
    glossary={text.glossary}
    heading={text.heading}
    guidance={text.guidance}
    author={text.author ?? "Wikibooksin kirjoittajat"}
    sourceTitle={text.title}
    sourceUrl={text.sourceUrl}
    license={text.licenseCode ?? "CC BY-SA 4.0"}
    licenseUrl={text.licenseUrl ?? "https://creativecommons.org/licenses/by-sa/4.0/"}
    sourceDetail={text.sourceDetail ?? ("Lähdesivun pysyvä versio "+text.revision+". Puheäänitteiden yksilöllistä lisenssiä tai toimivuutta ei ole vahvistettu.")}
    />
  </>;
}

/**
 * Shared comprehension exercise surface for the additional four real texts.
 * Only manually checked responses are counted; no lesson score is inferred.
 */
export function LosOpenTextUnderstanding({ chapterId, goToText }: { chapterId:string; goToText:()=>void }) {
  const text=getLosOpenDialogue(chapterId);
  if(!text)return null;
  return <LosOpenComprehension key={text.chapterId} text={text} goToText={goToText}/>;
}
function LosOpenComprehension({ text, goToText }: { text:LosOpenText; goToText:()=>void }) {
  const {draft,update,saved}=useLosChapterDraft(1,text.chapterId);
  const [showTranslation,setShowTranslation]=useState(false);
  const evidenceId="C"+text.chapterId+"-SOURCE-EVIDENCE-01";
  const ids=[...text.questions.map(q=>q.id),evidenceId];
  const answers=draft.practiceAnswers;
  const checked=draft.practiceChecked;
  const checkedCount=ids.filter(id=>checked.includes(id)).length;
  const correct=text.questions.filter(q=>checked.includes(q.id)&&answers[q.id]===q.correctId).length+
    (checked.includes(evidenceId)&&answers[evidenceId]===text.evidenceLineId?1:0);
  const filled=ids.filter(id=>Boolean(answers[id])).length;
  const change=(id:string,value:string)=>update(current=>({...current,
    practiceAnswers:{...current.practiceAnswers,[id]:value},
    practiceChecked:current.practiceChecked.filter(item=>item!==id),
  }));
  const check=(id:string)=>{
    if(!answers[id])return;
    update(current=>({...current,practiceChecked:Array.from(new Set([...current.practiceChecked,id]))}));
  };
  return <section className="los-inner-page los-understanding">
    <p className="los-eyebrow">VERSTEHEN / KAPITEL {Number(text.chapterId)} / ORIGINALTEXT</p>
    <h1>Ymmärrä alkuperäisteksti</h1>
    <p className="los-page-intro">Nämä tehtävät perustuvat koko julkaistuun keskusteluun. Vieraammat verbimuodot ovat tässä vain tekstin ymmärtämisen tukea, eivät osoitus siitä, että kaikki kielioppi olisi jo opetettu.</p>
    <button className="los-outline-button" type="button" onClick={goToText}>
      <BookOpen size={17}/> Avaa koko alkuperäisteksti <ArrowRight size={16}/>
    </button>
    <div className="los-c01-questions">
      {text.questions.map((question,index)=><fieldset className="los-c01-question" key={question.id}>
        <legend><span>{index+1}.</span> {question.prompt}</legend>
        <div className="los-c01-options">
          {question.answers.map(answer=><label key={answer.id} className={answers[question.id]===answer.id?"is-selected":""}>
            <input type="radio" name={question.id} value={answer.id} checked={answers[question.id]===answer.id}
              onChange={()=>change(question.id,answer.id)}/><span>{answer.text}</span>
          </label>)}
        </div>
        <button type="button" className="los-exercise-check" disabled={!answers[question.id]} onClick={()=>check(question.id)}>Tarkista vastaus</button>
        {checked.includes(question.id)&&<p role="status" className="los-c01-feedback"><strong>{answers[question.id]===question.correctId?"Oikein.":"Palaa tekstiin."}</strong> {question.explanation}</p>}
      </fieldset>)}
      <fieldset className="los-c01-question">
        <legend><span>{text.questions.length+1}.</span> {text.evidenceQuestion}</legend>
        <p>Valitse suoraan lähdetekstistä puheenvuoro. Vastaus liittyy koko alkuperäiseen dialogiin, ei irrotettuun sanastoluetteloon.</p>
        <div className="los-c01-evidence">
          {text.originalLines.map(line=><label key={line.id} className={answers[evidenceId]===line.id?"is-selected":""}>
            <input type="radio" name={evidenceId} value={line.id} checked={answers[evidenceId]===line.id}
              onChange={()=>change(evidenceId,line.id)}/>
            <span lang="de"><strong>{line.speaker}:</strong> {line.text}</span>
          </label>)}
        </div>
        <button type="button" className="los-exercise-check" disabled={!answers[evidenceId]} onClick={()=>check(evidenceId)}>Tarkista tekstikohta</button>
        {checked.includes(evidenceId)&&<p role="status" className="los-c01-feedback">
          <strong>{answers[evidenceId]===text.evidenceLineId?"Oikein.":"Etsi uudelleen."}</strong> {text.evidenceExplanation}
        </p>}
      </fieldset>
    </div>
    <div className="los-c01-understanding-summary">
      <p><CheckCircle2 size={19}/> <strong>{checkedCount}/{ids.length} tarkistettu</strong> · {correct}/{checkedCount} oikein tarkistetuista · {filled}/{ids.length} vastattu</p>
      <p>Tämä on tekstinymmärtämisen harjoitus. Kappaletestin pisteet ja puheen itsenäinen arviointi käsitellään erikseen.</p>
      <button className="los-outline-button" type="button" aria-pressed={showTranslation}
        onClick={()=>setShowTranslation(v=>!v)}>{showTranslation?"Piilota tekstin suomennos":"Näytä koko tekstin suomennos"}</button>
      {showTranslation&&<ol className="los-c01-translations">
        {text.originalLines.map(line=><li key={line.id}><strong>{line.speaker}:</strong> {line.meaning}</li>)}
      </ol>}
      <p role="status" className="los-c01-saved">{saved?"Vastaukset tallennettu tähän selaimeen, mukana JSON-varmuuskopiossa.":"Tallennus epäonnistui. Älä sulje sivua ennen vastauksien talteenottoa."}</p>
      <p className="los-c01-source-version">Alkuperäisteksti: {text.sourceId} · Sisältöversio 1.0.0.</p>
    </div>
  </section>;
}
