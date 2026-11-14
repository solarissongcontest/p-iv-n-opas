import {useState} from "react";
import {ArrowRight, BookOpen, ClipboardCheck, RotateCcw, ShieldAlert} from "lucide-react";
import {useLosChapterDraft} from "./studyState.ts";
import {losFutureChapterCheckPlan} from "./losFutureChapterCheckPlan.ts";
import {readLosFutureChapterCheckAttempt,
  saveLosFutureChapterCheckAnswer,submitLosFutureChapterCheck,retakeLosFutureChapterCheck,
  LOS_FUTURE_CHAPTER_CHECK_MAX_ANSWER,LOS_FUTURE_CHAPTER_CHECK_MAX_WRITING}
  from "./losFutureChapterCheckState.ts";
import "./los-future-chapter-check.css";

export function LosFutureChapterCheck({bookId,chapterId}:{
  bookId:number;chapterId:string;
}){
  const plan=losFutureChapterCheckPlan(bookId,chapterId);
  if(!plan)return <div role="alert">Kappaleen alkuperäisen tehtäväpankin tarkistuspolku puuttuu.</div>;
  return <ChapterCheck key={plan.id} bookId={bookId} chapterId={chapterId} plan={plan}/>;
}
function ChapterCheck({bookId,chapterId,plan}:{
  bookId:number;chapterId:string;plan:NonNullable<ReturnType<typeof losFutureChapterCheckPlan>>;
}){
  const {draft,update,saved}=useLosChapterDraft(bookId,chapterId);
  const [confirmSubmit,setConfirmSubmit]=useState(false);
  const [confirmRetake,setConfirmRetake]=useState(false);
  const [error,setError]=useState("");
  const source=draft.practiceAnswers[plan.currentKey];
  const attempt=readLosFutureChapterCheckAttempt(source,plan);
  const submitted=Boolean(attempt?.submittedAt);
  const allPrevious=plan.previousKeys.map(key=>draft.practiceAnswers[key]);
  const historyInvalid=allPrevious.some(raw=>raw!==undefined&&
    readLosFutureChapterCheckAttempt(raw,plan,true)===null);
  const attempts=allPrevious.filter(raw=>raw!==undefined).length;
  const answered=plan.tasks.filter(task=>attempt?.answers[task.id]?.trim()).length;
  function safely(action:(current:typeof draft)=>typeof draft){
    try{update(action);setError("");}
    catch(e){setError(e instanceof Error?e.message:"Vastauksen tallennus epäonnistui.");}
  }
  function save(id:string,text:string){safely(current=>saveLosFutureChapterCheckAnswer(current,plan,id,text));}
  function submit(){
    if(!confirmSubmit||submitted||!attempt)return;
    safely(current=>submitLosFutureChapterCheck(current,plan));
    setConfirmSubmit(false);
  }
  function retake(){
    if(!confirmRetake||!submitted||historyInvalid)return;
    safely(current=>retakeLosFutureChapterCheck(current,plan));
    setConfirmRetake(false);
  }
  return <section className="los-future-chapter-check" aria-label={"Kappaleen "+Number(chapterId)+" oma tarkistus"}>
    <div className="los-future-check-heading">
      <ClipboardCheck size={26} aria-hidden="true"/>
      <div>
        <h2>Kappaleen {Number(chapterId)} oma tarkistus</h2>
        <p><strong>{plan.title}</strong> · {plan.objective}</p>
      </div>
    </div>
    <p className="los-future-check-warning" role="note">
      <ShieldAlert size={18} aria-hidden="true"/>
      Tässä on viisi alkuperäisestä harjoituskäsikirjoituksesta poimittua tehtävää, ei erillistä
      kielentarkistettua koepankkia. Vastaat niihin uudestaan ilman aiempien harjoitusvastausten
      näyttämistä. Vertailuvastaukset näkyvät vasta oman tarkistuksen palauttamisen jälkeen.
      Tämä on itsenäinen harjoitus, ei hyväksytty kappalekoe tai kielitaitotodistus.
    </p>
    <div className="los-future-check-status" role="status">
      <span>{answered}/{plan.tasks.length} vastattu</span>
      <span>{submitted?"Oma tarkistus palautettu":"Vastausluonnos"}</span>
      <span>{saved?"Tallennettu tähän selaimeen":"Tallennus epäonnistui"}</span>
      {attempts>0&&<span>Aiemmat yritykset: {attempts}</span>}
    </div>
    {attempt===null&&<p role="alert">
      Tallennettua vastausluonnosta ei voi lukea. Sitä ei poisteta tai korvata automaattisesti.
      Vie paikallinen varmuuskopio ennen korjaustoimia.</p>}
    {historyInvalid&&<p role="alert">
      Aiemmassa yrityksessä on ristiriitaisia tietoja. Uusinta on estetty, jotta vanhoja
      vastauksia ei vahingossa korvata.</p>}
    {attempt&&<>
      <details className="los-future-check-reading">
        <summary><BookOpen size={18} aria-hidden="true"/> Kappaleen Text A lukutehtävää varten</summary>
        <p lang="de">{plan.readingText}</p>
      </details>
      <div className="los-future-check-questions">
        {plan.tasks.map((task,index)=>{
          const long=task.id.endsWith("-T18");
          const value=attempt.answers[task.id]??"";
          const id="los-check-"+task.id;
          return <article className="los-future-check-question" key={task.id}>
            <p className="los-eyebrow">TEHTÄVÄ {index+1} / 5 · {task.id.split("-").at(-1)}</p>
            <label htmlFor={id}><strong>{task.title}</strong><span>{task.prompt}</span></label>
            {long?<textarea id={id} rows={6} lang="de" spellCheck={false}
              value={value} maxLength={LOS_FUTURE_CHAPTER_CHECK_MAX_WRITING}
              disabled={submitted} placeholder="Kirjoita oma vastauksesi..."
              onChange={event=>save(task.id,event.target.value)}/>:
              <textarea id={id} rows={2} lang={index===0?"fi":"de"}
                spellCheck={false} value={value} maxLength={LOS_FUTURE_CHAPTER_CHECK_MAX_ANSWER}
                disabled={submitted} placeholder="Oma vastauksesi..."
                onChange={event=>save(task.id,event.target.value)}/>}
            {submitted&&<div className="los-future-check-model">
              <strong>Lähdekäsikirjoituksen vastaus / tarkistusohje</strong>
              <p>{task.answerKey}</p>
              {task.feedback&&<p>{task.feedback}</p>}
              <p className="los-future-check-review">Vertaa omaa vastaustasi itse.
                Erilaiset mutta oikeat saksankieliset ilmaukset ovat mahdollisia,
                eikä ohjelma myönnä näille tehtäville automaattisia pisteitä.</p>
            </div>}
          </article>;
        })}
      </div>
      <div className="los-future-check-actions">
        {!submitted?<><label className="los-future-check-confirm">
            <input type="checkbox" checked={confirmSubmit} onChange={e=>setConfirmSubmit(e.target.checked)}/>
            Olen valmis vertaamaan vastauksiani. Palautus lukitsee tämän yrityksen
            ja avaa lähdekäsikirjoituksen tarkistusmallit.
          </label>
          <button type="button" disabled={!confirmSubmit||answered===0}
            onClick={submit}><ArrowRight size={17} aria-hidden="true"/> Palauta oma tarkistus</button>
        </>:<>
          <p>Olet palauttanut tämän harjoituskierroksen. Käy läpi kaikki viisi
            tarkistusmallia ja tee tarvittavat korjaukset erilliseen muistiinpanoosi.
            Automaattista koepistemäärää ei muodosteta.</p>
          <label className="los-future-check-confirm">
            <input type="checkbox" checked={confirmRetake}
              onChange={e=>setConfirmRetake(e.target.checked)}/>
            Tallenna koko nykyinen yritys historiaan ja aloita uudet vastaukset.
          </label>
          <button type="button" disabled={!confirmRetake||attempts>=3||historyInvalid}
            onClick={retake}><RotateCcw size={17} aria-hidden="true"/> Aloita uusi harjoituskierros</button>
          {attempts>=3&&<p>Kolme aiempaa yritystä on jo tallessa. Vie varmuuskopio ennen jatkamista.</p>}
        </>}
      </div>
    </>}
    {error&&<p role="alert" className="los-future-check-error">{error}</p>}
  </section>;
}
