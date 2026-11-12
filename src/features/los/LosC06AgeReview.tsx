import { useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { LosOriginalDialogue } from "./LosOriginalDialogue";
import { LosAuthenticAudio } from "./LosReferenceTools";
import { useLosChapterDraft } from "./studyState";
import { LOS1_C01_LINES } from "./content/los1C01";
import {
  LOS1_C06_REVIEW_GLOSS, LOS1_C06_REVIEW_SOURCE_ID, LOS1_C06_REVIEW_VERSION,
  LOS1_C06_REVIEW_QUESTIONS, LOS1_C06_REVIEW_EVIDENCE_ID, LOS1_C06_REVIEW_EVIDENCE_CORRECT,
} from "./content/los1C06Review";

/** A contextual second reading of C01's full human-recorded dialogue.
 * C06's own primary Text A is still a separate editorial requirement.
 */
export function LosC06AgeReview() {
  return <div className="los-c06-review">
    <p className="los-page-intro">Kertaa Franzin ja Jörgin jo kappaleessa 1 esiintynyt kokonainen alkuperäiskeskustelu. Nyt keskitymme eri asiaan: ikäkysymykseen sekä lukuihin 19 ja 20. Tämä on oikean ihmisen tuottamaa aiemman tekstin kertausaineistoa, <strong>ei uusi itsenäinen C06:n Text A</strong>.</p>
    <LosAuthenticAudio chapterId="06" source="A"/>
    <LosOriginalDialogue
      chapterId="06"
      sourceId={LOS1_C06_REVIEW_SOURCE_ID}
      version={LOS1_C06_REVIEW_VERSION}
      lines={LOS1_C01_LINES}
      glossary={LOS1_C06_REVIEW_GLOSS}
      heading="Franz ja Jörg: ikäfraasien kertaus"
      usageLabel="ORIGINALTEXT · AIEMMAN TEKSTIN KERTAUS C01:STÄ"
      guidance="Lue kaikki kahdeksan alkuperäistä puheenvuoroa ja keskity erityisesti neljänteen, viidenteen ja kuudenteen repliikkiin. Jörg kysyy Franzilta ikää, minkä jälkeen he kertovat 19 ja 20 vuoden iät. Yritä tunnistaa ilmaukset myös ilman suomennosta."
      author="Xzapro4 ja Erkan Yilmaz (2008)"
      sourceTitle="GesprächVorstellung.ogg, Wikimedia Commons"
      sourceUrl="https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg"
      license="CC BY-SA 3.0"
      licenseUrl="https://creativecommons.org/licenses/by-sa/3.0/"
      sourceDetail="Alkuperäinen kahdeksan repliikin keskustelu on sama, johon tutustuttiin C01:ssä. Se ei korvaa C06:n puuttuvaa itsenäistä päätekstiä. Äänityksessä ei ole kahta todennettua äidinkielistä puhujaa, eikä toistoa ole laitetestattu."
    />
  </div>;
}

export function LosC06AgeUnderstanding({goToText}:{goToText:()=>void}) {
  const {draft,update,saved}=useLosChapterDraft(1,"06");
  const [showTranslation,setShowTranslation]=useState(false);
  const ids=[...LOS1_C06_REVIEW_QUESTIONS.map(q=>q.id),LOS1_C06_REVIEW_EVIDENCE_ID];
  const checked=draft.practiceChecked;
  const answers=draft.practiceAnswers;
  const checkedCount=ids.filter(id=>checked.includes(id)).length;
  const answered=ids.filter(id=>Boolean(answers[id])).length;
  const correct=LOS1_C06_REVIEW_QUESTIONS.filter(q=>checked.includes(q.id)&&answers[q.id]===q.correctId).length+
    (checked.includes(LOS1_C06_REVIEW_EVIDENCE_ID)&&answers[LOS1_C06_REVIEW_EVIDENCE_ID]===LOS1_C06_REVIEW_EVIDENCE_CORRECT?1:0);
  const change=(id:string,value:string)=>update(old=>({
    ...old,
    practiceAnswers:{...old.practiceAnswers,[id]:value},
    practiceChecked:old.practiceChecked.filter(key=>key!==id),
  }));
  const check=(id:string)=>{
    if(!answers[id])return;
    update(old=>({...old,practiceChecked:Array.from(new Set([...old.practiceChecked,id]))}));
  };
  return <section className="los-inner-page los-understanding" aria-label="C06 alkuperäistekstin ikäkertauksen ymmärtäminen">
    <p className="los-eyebrow">VERSTEHEN / KAPITEL 06 / KERTAUSTEKSTI</p>
    <h1>Ymmärrä ikäkeskustelu</h1>
    <p className="los-page-intro">Kysymykset perustuvat samaan kahdeksan repliikin alkuperäiseen Franz–Jörg-keskusteluun kuin C01:ssä, mutta arvioivat nyt lukusanojen ja ikäfraasien ymmärtämistä. Tämä ei vielä ole itsenäinen uusi C06:n pääteksti.</p>
    <button className="los-outline-button" type="button" onClick={goToText}><BookOpen size={17}/> Avaa koko alkuperäiskeskustelu <ArrowRight size={16}/></button>
    <div className="los-c01-questions">
      {LOS1_C06_REVIEW_QUESTIONS.map((q,index)=><fieldset className="los-c01-question" key={q.id}>
        <legend><span>{index+1}.</span> {q.prompt}</legend>
        <div className="los-c01-options">
          {q.answers.map(answer=><label key={answer.id} className={answers[q.id]===answer.id?"is-selected":""}>
            <input type="radio" name={q.id} value={answer.id} checked={answers[q.id]===answer.id} onChange={()=>change(q.id,answer.id)}/>
            <span>{answer.text}</span>
          </label>)}
        </div>
        <button type="button" className="los-exercise-check" onClick={()=>check(q.id)} disabled={!answers[q.id]}>Tarkista vastaus</button>
        {checked.includes(q.id)&&<p className="los-c01-feedback" role="status">
          <strong>{answers[q.id]===q.correctId?"Oikein.":"Tarkista ikä tekstistä."}</strong> {q.explanation}
        </p>}
      </fieldset>)}
      <fieldset className="los-c01-question">
        <legend><span>{LOS1_C06_REVIEW_QUESTIONS.length+1}.</span> Missä alkuperäisen tekstin puheenvuorossa Franz sanoo olevansa 19-vuotias?</legend>
        <div className="los-c01-evidence">
          {LOS1_C01_LINES.map(line=><label key={line.id} className={answers[LOS1_C06_REVIEW_EVIDENCE_ID]===line.id?"is-selected":""}>
            <input type="radio" name={LOS1_C06_REVIEW_EVIDENCE_ID} value={line.id}
              checked={answers[LOS1_C06_REVIEW_EVIDENCE_ID]===line.id}
              onChange={()=>change(LOS1_C06_REVIEW_EVIDENCE_ID,line.id)}/>
            <span lang="de"><strong>{line.speaker}:</strong> {line.text}</span>
          </label>)}
        </div>
        <button type="button" className="los-exercise-check" onClick={()=>check(LOS1_C06_REVIEW_EVIDENCE_ID)} disabled={!answers[LOS1_C06_REVIEW_EVIDENCE_ID]}>Tarkista tekstikohta</button>
        {checked.includes(LOS1_C06_REVIEW_EVIDENCE_ID)&&<p className="los-c01-feedback" role="status">
          <strong>{answers[LOS1_C06_REVIEW_EVIDENCE_ID]===LOS1_C06_REVIEW_EVIDENCE_CORRECT?"Oikein.":"Etsi uudelleen."}</strong> Franz kertoo 19 vuoden iän viidennessä repliikissä.
        </p>}
      </fieldset>
    </div>
    <div className="los-c01-understanding-summary">
      <p><CheckCircle2 size={19}/> <strong>{checkedCount}/{ids.length} tarkistettu</strong> · {correct}/{checkedCount} oikein tarkistetuista · {answered}/{ids.length} vastattu</p>
      <button type="button" className="los-outline-button" aria-pressed={showTranslation} onClick={()=>setShowTranslation(v=>!v)}>{showTranslation?"Piilota koko tekstin suomennos":"Näytä koko tekstin suomennos"}</button>
      {showTranslation&&<ol className="los-c01-translations">
        {LOS1_C01_LINES.map(line=><li key={line.id}><strong>{line.speaker}:</strong> {line.meaning}</li>)}
      </ol>}
      <p className="los-c01-saved" role="status">{saved?"Vastaukset on tallennettu C06:n omaan paikalliseen varmuuskopioitavaan tilaan.":"Tallennus epäonnistui. Kopioi vastauksesi talteen."}</p>
      <p className="los-c01-source-version">Alkuperäislähde: {LOS1_C06_REVIEW_SOURCE_ID} (sama kuin C01) · Sisältöversio {LOS1_C06_REVIEW_VERSION} · C06:n uusi itsenäinen pääteksti on vielä kesken.</p>
    </div>
  </section>;
}
