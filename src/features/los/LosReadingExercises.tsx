import { useState } from "react";
import { useLosChapterDraft } from "./studyState";
import { losReadingQuestionCorrect, losReadingChoiceNeedsReview, losReadingLegacyAnswerKey, losReadingQuestions, type LosReadingItem, type LosReadingText } from "./content/los1ReadingBank";
import "./los-reading-exercises.css";

const sectionNames: Record<LosReadingText,string> = {
  A:"Text A · Päätekstin ymmärtäminen",
  B:"Text B · Sovella lukemaasi",
  C:"Text C · Tarkista ja vahvista",
};
const sectionDescriptions: Record<LosReadingText,string> = {
  A:"Ymmärrä henkilöt ja tapahtumat, poimi tekstistä ilmauksia ja perustele tulkintasi.",
  B:"Tunnista toisen tekstilajin tiedot, tarkista yksityiskohdat ja harjoittele lukemista.",
  C:"Varmista, että osaat hyödyntää tukitekstin tärkeimpiä ilmauksia.",
};
type ReadingController = ReturnType<typeof useLosChapterDraft>;

function ReadingQuestion({ question, index, draftController }: {
  question: LosReadingItem;
  index: number;
  draftController: ReadingController;
}) {
  const {draft,update,saved}=draftController;
  const answer = draft.practiceAnswers[question.id] ?? "";
  const retiredChoice = losReadingChoiceNeedsReview(question,answer);
  const checked = draft.practiceChecked.includes(question.id) && !retiredChoice;
  const correct = checked ? losReadingQuestionCorrect(question,answer) : null;
  const archivedAnswer = draft.practiceAnswers[losReadingLegacyAnswerKey(question.id)];
  const changeAnswer = (value: string) => {
    update(current => {
      const previous = current.practiceAnswers[question.id] ?? "";
      const archiveKey = losReadingLegacyAnswerKey(question.id);
      const archive = losReadingChoiceNeedsReview(question,previous) && !current.practiceAnswers[archiveKey]
        ? { [archiveKey]: previous } : {};
      return {
        ...current,
        practiceAnswers: { ...current.practiceAnswers, ...archive, [question.id]: value },
        practiceChecked: current.practiceChecked.filter(id => id !== question.id),
      };
    });
  };
  const checkAnswer = () => {
    if(!answer.trim() || !saved || retiredChoice)return;
    update(current=> ({
      ...current,
      practiceChecked: current.practiceChecked.includes(question.id)
        ? current.practiceChecked
        : [...current.practiceChecked,question.id],
    }));
  };
  return <li className="los-reading-question" id={question.id}>
    <div className="los-reading-question-meta">
      <span className="los-reading-question-index">{index+1}</span>
      <span>{question.kind==="choice"?"Valitse ja tarkista":"Vastaa omin sanoin"}</span>
    </div>
    <fieldset>
      <legend>{question.prompt}</legend>
      {question.kind==="choice" ? <div className="los-reading-options">
        {question.options.map((option,i)=><label key={i} className={answer===option?"is-selected":""}>
          <input type="radio" name={question.id} value={option} checked={answer===option} onChange={()=>changeAnswer(option)}/>
          <span>{option}</span>
        </label>)}
      </div> : <label className="los-reading-written">
        <span>Oma vastaus</span>
        <textarea rows={2} maxLength={600} spellCheck={false} value={answer}
          placeholder="Kirjoita vastaus tai poimi ilmaus tekstistä…"
          onChange={event=>changeAnswer(event.target.value)}/>
      </label>}
    </fieldset>
    {retiredChoice && <p className="los-reading-revision-note" role="status">
      <strong>Tehtävän vaihtoehdot ovat muuttuneet.</strong> Aiempi vastauksesi ”{answer}” on tallella.
      Sitä ei arvioida vääräksi. Valitse uusi vaihtoehto, jos haluat tarkistaa tehtävän uudelleen.
      Edellinen vastauksesi säilytetään vastausarkistossa.
    </p>}
    {archivedAnswer && !retiredChoice && <details className="los-reading-revision-history">
      <summary>Katso aiemman tehtäväversion vastaus</summary>
      <p>{archivedAnswer}</p>
    </details>}
    <div className="los-reading-question-actions">
      <button type="button" className="los-outline-button"
        disabled={!answer.trim() || !saved || checked || retiredChoice} onClick={checkAnswer}>
        {checked ? "Tarkistettu" : question.kind==="choice"?"Tarkista vastaus":"Näytä mallivastaus"}
      </button>
      {answer.trim() && checked && <span className="los-reading-result" role="status">
        {correct === null?"Itsearviointi":correct?"Oikein":"Korjattavaa"}
      </span>}
    </div>
    {checked && <div className={"los-reading-feedback "+(correct===true?"is-correct":correct===false?"is-incorrect":"")} role="status">
      {question.kind==="choice" ?
        <p><strong>{correct?"Oikein!":"Ei aivan."}</strong> {question.explanation}</p> :
        <><p><strong>Yksi mahdollinen mallivastaus:</strong> {question.modelAnswer}</p>
          <p>Avoin vastaus tarkistetaan itse. Muutkin asiallisesti oikein perustellut vastaukset kelpaavat.</p></>}
      {question.kind==="choice" && correct===false && <p><strong>Oikea vastaus:</strong> {question.options[question.answerIndex]}</p>}
      <details className="los-reading-evidence">
        <summary>Katso kohta Text A:sta, B:stä tai C:stä</summary>
        <blockquote>{question.evidence.replace(/\*\*/g,"")}</blockquote>
        <p>{question.explanation}</p>
      </details>
    </div>}
  </li>;
}

export function LosReadingExercises({chapterId,text,compact=false}: {chapterId:string;text:LosReadingText;compact?:boolean}) {
  const [questionIndex,setQuestionIndex]=useState(0);
  const controller=useLosChapterDraft(1,chapterId);
  const questions=losReadingQuestions(chapterId,text);
  if(!questions.length)return <p role="status">Tämän tekstin ymmärtämistehtävät puuttuvat.</p>;
  const answered=questions.filter(q=>Boolean(controller.draft.practiceAnswers[q.id]?.trim())).length;
  const isCurrentChecked=(q:LosReadingItem)=>controller.draft.practiceChecked.includes(q.id) &&
    !losReadingChoiceNeedsReview(q,controller.draft.practiceAnswers[q.id]??"");
  const checked=questions.filter(isCurrentChecked).length;
  const correct=questions.filter(q=>{
    if(!isCurrentChecked(q))return false;
    return losReadingQuestionCorrect(q,controller.draft.practiceAnswers[q.id]??"")===true;
  }).length;
  const objectiveChecked=questions.filter(q=>q.kind==="choice"&&isCurrentChecked(q)).length;
  return <section className="los-reading-exercises" aria-label={sectionNames[text]}>
    <header className="los-reading-exercises-head">
      <div>
        <p className="los-overline">TEKSTI {text} · LUKEMISEN HARJOITUKSET</p>
        <h2>{sectionNames[text]}</h2>
        <p>{sectionDescriptions[text]}</p>
      </div>
      <div className="los-reading-counter" aria-label={checked+" tehtävää tarkistettu "+questions.length+" tehtävästä"}>
        <strong>{checked}/{questions.length}</strong><span>tarkistettu</span>
      </div>
    </header>
    <p className="los-reading-exercise-status">
      {answered} vastattu · {objectiveChecked ? correct+"/"+objectiveChecked+" automaattisesti oikein · " : ""}
      Avoimet vastaukset arvioidaan itse.
    </p>
    {compact&&<nav className="los-reading-compact-nav" aria-label="Siirry tekstitehtävästä toiseen">
      <button type="button" disabled={questionIndex<=0} onClick={()=>setQuestionIndex(n=>Math.max(0,n-1))}>Edellinen</button>
      <span>Tehtävä {questionIndex+1} / {questions.length}</span>
      <button type="button" disabled={questionIndex>=questions.length-1}
        onClick={()=>setQuestionIndex(n=>Math.min(questions.length-1,n+1))}>Seuraava</button>
    </nav>}
    <ol className="los-reading-question-list" start={compact?questionIndex+1:1}>
      {questions.map((question,index)=>compact&&index!==questionIndex?null:
        <ReadingQuestion key={question.id} question={question} index={index} draftController={controller}/>)}
    </ol>
    <p className={"los-save-state "+(controller.saved?"":"is-error")} role="status">
      {controller.saved ? "Vastaukset tallennetaan automaattisesti oman laitteen paikalliseen LOS!-opiskelutilaan." :
        "Tallennus epäonnistui. Tarkista selaimen tallennustila ennen jatkamista."}
    </p>
  </section>;
}

export function LosReadingUnderstanding({chapterId,navigate}:{
  chapterId:string;
  navigate?: (section:"text"|"text-b"|"text-c")=>void;
}) {
  return <section className="los-inner-page los-reading-understanding">
    <p className="los-eyebrow">VERSTEHEN / KAPITEL {Number(chapterId)}</p>
    <h1>Ymmärrä A, B ja C</h1>
    <p className="los-page-intro">Tässä kappaleessa on yhteensä 15 suoraan uusien tekstien tapahtumiin ja ilmauksiin perustuvaa tehtävää. Aloita Text A:sta, ja jatka Text B:hen sekä Text C:hen. Oikeita vastauksia ei näytetä ennen omaa yritystä.</p>
    {navigate&&<nav className="los-reading-source-nav" aria-label="Avaa lukuteksti">
      <button onClick={()=>navigate("text")} type="button">Avaa Text A</button>
      <button onClick={()=>navigate("text-b")} type="button">Avaa Text B</button>
      <button onClick={()=>navigate("text-c")} type="button">Avaa Text C</button>
    </nav>}
    <LosReadingExercises chapterId={chapterId} text="A"/>
    <details className="los-reading-extra-group">
      <summary>Text B:n ymmärtämistehtävät · 5 tehtävää</summary>
      <LosReadingExercises chapterId={chapterId} text="B"/>
    </details>
    <details className="los-reading-extra-group">
      <summary>Text C:n tukitehtävät · 2 tehtävää</summary>
      <LosReadingExercises chapterId={chapterId} text="C"/>
    </details>
  </section>;
}
