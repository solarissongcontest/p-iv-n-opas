import { useState } from "react";
import { BookOpen, CheckCircle2, FileCheck2, RotateCcw, ShieldAlert } from "lucide-react";
import { useLosChapterDraft } from "./studyState.ts";
import { getLosFutureExam, type LosFutureExam } from "./content/losFutureExams.ts";
import { beginFutureExamRetake, futureExamAnchor, futureExamAutoResult,
  futureExamHistoryKey,readFutureExamHistory } from "./losFutureExamEngine.ts";

/** The source papers can now be used as private, offline practice exams.
 * The 35-point source rubric remains explicitly ungraded until human review.
 * No microphone/TTS demo is mistaken for a licensed listening assessment. */
export function LosFutureExamPractice({bookId,kind}:{
  bookId:number;kind:LosFutureExam["kind"];
}){
  const exam=getLosFutureExam(bookId,kind);
  if(!exam)return <p role="alert">Kokeen käsikirjoitusta ei löydy.</p>;
  return <ExamSession key={exam.id} exam={exam}/>;
}
function ExamSession({exam}:{exam:LosFutureExam}){
  const {draft,update,saved}=useLosChapterDraft(exam.bookId,futureExamAnchor(exam.kind));
  const [confirmed,setConfirmed]=useState(false);
  const [confirmRetake,setConfirmRetake]=useState(false);
  const [error,setError]=useState("");
  const submitted=Boolean(draft.testSubmittedAt);
  const attempts=readFutureExamHistory(draft.testAnswers[futureExamHistoryKey(exam)],exam);
  const answerIds=[...exam.questions.map(q=>q.id),exam.writing.id];
  const answered=answerIds.filter(id=>draft.testAnswers[id]?.trim()).length;
  const auto=submitted?futureExamAutoResult(exam,draft.testAnswers):null;
  function write(id:string,value:string){
    if(submitted)return;
    update(current=>current.testSubmittedAt?current:{
      ...current,testAnswers:{...current.testAnswers,[id]:value.slice(0,3000)},
    });
  }
  function submit(){
    if(!confirmed||answered===0||submitted)return;
    update(current=>current.testSubmittedAt?current:{
      ...current,testSubmittedAt:new Date().toISOString(),
    });
    setConfirmed(false);
  }
  function retake(){
    if(!confirmRetake||!submitted)return;
    try{
      const next=beginFutureExamRetake(draft,exam);
      update(current=>beginFutureExamRetake(current,exam));
      if(next){setError("");setConfirmRetake(false);setConfirmed(false);}
    }catch(e){setError(e instanceof Error?e.message:"Uusinnan turvallinen tallennus epäonnistui.");}
  }
  const title=exam.kind==="midterm"?"Välikoe":"Loppukoe";
  return <section className="los-future-exam" aria-label={title+" LOS! "+exam.bookId}>
    <div className="los-future-exam-header">
      <FileCheck2 size={24} aria-hidden="true"/>
      <div><h3>{title} · LOS! {exam.bookId}</h3>
      <p>Alkuperäisen käsikirjoituksen 35 pisteen kirjallinen koeaineisto. Toimituksellinen, yksityinen harjoituskoe.</p></div>
    </div>
    <p className="los-future-exam-warning" role="note"><ShieldAlert size={19} aria-hidden="true"/>
      Tämä ei ole vielä hyväksytty arviointikoe. Avoimia vastauksia tai kirjoitusta ei arvioida
      pelkällä merkkijonovertaamisella. Kuuntelu ei ole käytettävissä ilman hyväksyttyä ääntä.
      Vastausavaimet näytetään vasta oman koeversion palauttamisen jälkeen.</p>
    <div className="los-future-exam-progress" role="status">
      <span>{answered}/{answerIds.length} vastauskohtaa täytetty</span>
      <span>{submitted?"Harjoituskoe palautettu":"Vastaukset säilyvät paikallisesti"}</span>
      <span>{saved?"Tallennus OK":"Tallennus epäonnistui"}</span>
    </div>
    <section className="los-future-exam-reading" aria-label="Kokeen lukuteksti">
      <h4><BookOpen size={18} aria-hidden="true"/> Lukuteksti</h4>
      <p lang="de">{exam.readingText}</p>
    </section>
    {(["R","G","V"] as const).map((group,index)=><section key={group}
      aria-label={["Luetun ymmärtäminen","Kielioppi","Sanasto"][index]}
      className="los-future-exam-group">
      <h4>{["Luetun ymmärtäminen","Kielioppi","Sanasto"][index]}</h4>
      {exam.questions.filter(question=>new RegExp("-"+group+"\\d{2}$").test(question.id))
        .map(question=><div className="los-future-exam-question" key={question.id}>
          <label htmlFor={question.id}><strong>{question.id.split("-").at(-1)} · {question.points} p</strong>{" "}
            {question.prompt}</label>
          {group==="R"?<textarea id={question.id} rows={2}
              value={draft.testAnswers[question.id]??""} disabled={submitted}
              spellCheck={false} maxLength={3000}
              onChange={event=>write(question.id,event.target.value)}
              placeholder="Kirjoita oma vastauksesi tähän"/>:
            <input id={question.id} type="text" autoComplete="off" spellCheck={false}
              value={draft.testAnswers[question.id]??""} disabled={submitted}
              maxLength={3000} onChange={event=>write(question.id,event.target.value)}
              placeholder="Oma vastauksesi"/>}
          {submitted&&<div className="los-future-exam-model">
            <strong>Käsikirjoituksen vastausavain:</strong> {question.answerKey}
            <p>{auto?.checkedIds.includes(question.id)
              ?"Tämä yksiselitteinen aukko tarkistettiin täsmällistä lähdemuotoa vasten."
              :"Vertaa vastausta itse. Synonyymit ja ilmaisuvaihtoehdot vaativat ihmisen tarkistuksen."}</p>
          </div>}
        </div>)}
    </section>)}
    <section className="los-future-exam-group" aria-label="Kirjoitustehtävä">
      <h4>Kirjoitustehtävä · 10 p</h4>
      <label className="los-future-exam-writing">
        <strong>{exam.writing.prompt}</strong>
        <textarea id={exam.writing.id} rows={9} lang="de" spellCheck={false} maxLength={3000}
          disabled={submitted} value={draft.testAnswers[exam.writing.id]??""}
          onChange={e=>write(exam.writing.id,e.target.value)}
          placeholder="Kirjoita oma saksankielinen tekstisi tähän"/>
      </label>
      <p>Sanamäärä: {(draft.testAnswers[exam.writing.id]??"").trim()
        .split(/\s+/u).filter(Boolean).length}. Ei automaattista kirjoitustaidon arvosanaa.</p>
      {submitted&&<div className="los-future-exam-model">
        <h5>Kirjoittamisen arviointimatriisi, ei konepisteitä</h5><p>{exam.writing.rubric}</p>
      </div>}
    </section>
    <section className="los-future-exam-actions">
      {!submitted ? <>
        <label className="los-future-exam-confirm"><input type="checkbox"
          checked={confirmed} onChange={event=>setConfirmed(event.target.checked)}/>
          Ymmärrän, että palauttamisen jälkeen vastauksia ei voi enää muokata tässä yrityksessä.
          Vastausavaimet avautuvat palautuksen jälkeen.</label>
        <button type="button" disabled={!confirmed||answered===0} onClick={submit}>
          <CheckCircle2 size={17} aria-hidden="true"/> Palauta harjoituskoe
        </button>
      </> : <>
        <h4>Palautetun harjoituskokeen yhteenveto</h4>
        <p>Koneellisesti tarkistettava rajattu osa: <strong>{auto?.awarded}/{auto?.possible} pistettä</strong>.
          Muut {auto?.restRequiresReview} pistettä edellyttävät sisällön ja
          kieliasun arviointia. Näistä luvuista ei voi laskea luotettavaa kokonaisarvosanaa.</p>
        <p>Kuunteluosuutta ei sisällytetty 35 pisteeseen. Tämän yrityksen tallennusaika:
          {" "}{draft.testSubmittedAt}. Aiemmin talletettuja yrityksiä: {attempts?.length??"tuntematon"}.</p>
        <label className="los-future-exam-confirm"><input type="checkbox"
          checked={confirmRetake} onChange={event=>setConfirmRetake(event.target.checked)}/>
          Aloita uusinta. Tallennan nykyisen yritykseni vastaushistoriaan enkä hävitä sitä.</label>
        <button type="button" disabled={!confirmRetake||attempts===null}
          onClick={retake}><RotateCcw size={17} aria-hidden="true"/> Aloita uusi yritys</button>
        {error&&<p role="alert">{error}</p>}
      </>}
    </section>
  </section>;
}
