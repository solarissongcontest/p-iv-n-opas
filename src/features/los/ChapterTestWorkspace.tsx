import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import type { Book, Exercise, ExerciseAnswer, HighlightRange } from "./model";
import type { ChapterTestDefinition, SpeechAssessment } from "./chapterTest";
import {
  emptyChapterTestRecord, gradeChapterTest, missingChapterTestAnswers,
  missingSpeechAssessments, restartChapterTest, selectedTestExercises, examScoreGroups,
} from "./chapterTest";
import { useLosRecord, losSyncMessage } from "./data/useLosRecord";
import { evaluateExercise } from "./exercises/evaluate";
import { formatExerciseAnswer } from "./exercises/formatAnswer";
import { SpeechRecorder } from "./SpeechRecorder";
import { Reader } from "./Reader";

function isMatchingAnswer(value: ExerciseAnswer): value is Record<string, string> {
  return value !== null && typeof value === "object" && !Array.isArray(value) && !("start" in value);
}
function isRangeAnswer(value: ExerciseAnswer): value is HighlightRange {
  return value !== null && typeof value === "object" && !Array.isArray(value) && "start" in value && "end" in value;
}
function ChapterTestQuestion({ exercise, number, answer, disabled, onAnswer }: {
  exercise: Exercise; number: number; answer: ExerciseAnswer; disabled: boolean;
  onAnswer: (value: ExerciseAnswer) => void;
}) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const id = "los-exam-question-" + exercise.id;
  const mapped = isMatchingAnswer(answer) ? answer : {};
  const selected = isRangeAnswer(answer) ? answer : null;
  return <fieldset className="los-exam-question" disabled={disabled} aria-labelledby={id}>
    <legend id={id} className="los-exam-question-title">{number}. {exercise.promptFi}</legend>
    {exercise.type === "single-choice" && <div className="los-options">
      {exercise.options.map(option => <label key={option.id} className="los-option">
        <input type="radio" name={"exam-" + exercise.id} value={option.id} checked={answer === option.id}
          onChange={() => onAnswer(option.id)}/>
        <span>{option.label}</span>
      </label>)}
    </div>}
    {exercise.type === "gap-fill" && <div className="los-gap">
      <p lang="de">{exercise.sentenceBefore} _____ {exercise.sentenceAfter}</p>
      <label htmlFor={"los-exam-input-" + exercise.id}>Puuttuva sana tai ilmaus</label>
      <input id={"los-exam-input-" + exercise.id} type="text" lang="de"
        autoComplete="off" autoCapitalize="none" spellCheck={false}
        value={typeof answer === "string" ? answer : ""} onChange={event => onAnswer(event.target.value)}/>
      <div className="los-umlauts" role="group" aria-label="Saksan erikoismerkit">
        {["ä", "ö", "ü", "ß"].map(letter => <button type="button" key={letter}
          onClick={() => onAnswer((typeof answer === "string" ? answer : "") + letter)}>{letter}</button>)}
      </div>
    </div>}
    {exercise.type === "matching" && <div className="los-matching">
      <div><h3>Saksaksi</h3>{exercise.left.map(item =>
        <button key={item.id} type="button" className="los-match-item"
          aria-pressed={selectedLeft === item.id} onClick={() => setSelectedLeft(item.id)}>
          {item.label}{mapped[item.id] && <span className="los-support">
            {" ↔ " + (exercise.right.find(right => right.id === mapped[item.id])?.label ?? "")}
          </span>}
        </button>)}</div>
      <div><h3>Suomeksi</h3>{exercise.right.map(item =>
        <button type="button" key={item.id} className="los-match-item"
          disabled={!selectedLeft} onClick={() => {
            if (!selectedLeft) return;
            const next = Object.fromEntries(Object.entries(mapped).filter(([left, right]) =>
              left !== selectedLeft && right !== item.id));
            onAnswer({ ...next, [selectedLeft]: item.id });
            setSelectedLeft(null);
          }}>{item.label}</button>)}</div>
    </div>}
    {exercise.type === "highlight" && <div className="los-highlight">
      <p className="los-support">Valitse ensimmäinen ja viimeinen sana. Valinta kattaa myös niiden välin.</p>
      <div className="los-tokens" role="group" aria-label="Valitse ilmauksen sanat">
        {Array.from(exercise.text.matchAll(/\S+/gu), token => ({
          label: token[0], start: token.index, end: token.index + token[0].length,
        })).map(token => <button type="button" key={token.start} className="los-token" lang="de"
          aria-pressed={Boolean(selected && token.start >= selected.start && token.end <= selected.end)}
          onClick={() => {
            if (!selected) { onAnswer({ start: token.start, end: token.end }); return; }
            if (token.start >= selected.start && token.end <= selected.end) {
              onAnswer({ start: token.start, end: token.end }); return;
            }
            onAnswer({ start: Math.min(selected.start, token.start), end: Math.max(selected.end, token.end) });
          }}>{token.label}</button>)}
      </div>
      <button type="button" className="los-text-action" disabled={!selected}
        onClick={() => onAnswer(null)}>Tyhjennä korostus</button>
    </div>}
  </fieldset>;
}

/** All questions are returned together. Self-assessed speech stays outside
 * the automatically graded denominator and is never falsely audio-verified.
 */
export function ChapterTestWorkspace({ book, definition, onReturned }: {
  book: Book; definition: ChapterTestDefinition; onReturned?: () => void;
}) {
  const { value: state, update, status } = useLosRecord(
    book.id, "exercise", definition.id, definition.version, emptyChapterTestRecord(definition),
  );
  const attemptNumber = state.attemptNumber ?? 0;
  const exercises = selectedTestExercises(definition, book.exercises, attemptNumber);
  const writingMode = definition.selfAssessmentMode === "writing";
  const writtenLines = (state.writtenResponse ?? "").split(/\r?\n/u).filter(line => line.trim().length > 0).length;
  const secondWrittenLines = (state.secondWrittenResponse ?? "").split(/\r?\n/u).filter(line => line.trim().length > 0).length;
  const missingSecondWriting = writingMode && definition.secondWritingPromptFi !== undefined &&
    (secondWrittenLines < (definition.requiredSecondWritingLines ?? 1) ||
      (definition.maximumSecondWritingLines !== undefined &&
       secondWrittenLines > definition.maximumSecondWritingLines));
  const listeningBlocks = (definition.listeningBlockIds ?? []).flatMap(id => {
    const block = book.blocks.find(item => item.id === id);
    return block?.kind === "media" && book.sources.some(source =>
      source.id === block.sourceId && source.permittedMode === "embed") ? [block] : [];
  });
  const listeningUnavailable = Boolean(definition.listeningBlockIds?.length) &&
    listeningBlocks.length !== definition.listeningBlockIds?.length;
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [restartVisible, setRestartVisible] = useState(false);
  const isReturned = Boolean(state.submission);
  const returnTimestamp = state.submission?.submittedAt;
  useEffect(() => {
    if (returnTimestamp) onReturned?.();
  }, [returnTimestamp, onReturned]);

  const setAnswer = (exerciseId: string, answer: ExerciseAnswer) => {
    if (isReturned) return;
    update(previous => ({ ...previous, answers: { ...previous.answers, [exerciseId]: answer } }));
    setSubmitError(null);
  };
  const setAssessment = (id: string, assessment: SpeechAssessment) => {
    if (isReturned) return;
    update(previous => ({
      ...previous, selfAssessment: { ...previous.selfAssessment, [id]: assessment },
    }));
    setSubmitError(null);
  };
  const missingAnswers = missingChapterTestAnswers(definition, exercises, state);
  const missingSpeech = missingSpeechAssessments(definition, state);
  const completeCount = exercises.length - missingAnswers.length;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading" || isReturned) return;
    if (missingAnswers.length > 0 || missingSpeech.length > 0 || (writingMode && (writtenLines < (definition.requiredWritingLines ?? 1) || (definition.maximumWritingLines !== undefined && writtenLines > definition.maximumWritingLines) || missingSecondWriting)) || listeningUnavailable) {
      setSubmitError("Vastaa kaikkiin " + definition.exerciseIds.length +
        " tarkistettavaan kohtaan ja tee " + (writingMode ?
          "kirjallinen osuus (" + (definition.requiredWritingLines ?? 1) + (definition.maximumWritingLines ? "–" + definition.maximumWritingLines : "+") + " erillistä riviä)" +
          (definition.secondWritingPromptFi ? " ja toinen kirjoitustehtävä (" +
           (definition.requiredSecondWritingLines ?? 1) + "–" +
           (definition.maximumSecondWritingLines ?? "∞") + " repliikkiä)" : "") + " sekä niiden" :
          "puheen") + " itsearviointi.");
      return;
    }
    const submittedAt = new Date().toISOString();
    update(previous => {
      const report = gradeChapterTest(definition, exercises, previous, submittedAt);
      if (!report) return previous;
      return { ...previous, submission: report };
    });
    setSubmitError(null);
  };

  if (listeningUnavailable)
    return <section className="los-empty"><h2>Kokeen kuuntelulähteet puuttuvat</h2>
      <p>Harjoituskoetta ei aloiteta, jos jokin valittu alkuperäinen äänitiedosto ei ole hyväksytty käytettäväksi oppikirjassa.</p>
    </section>;

  if (exercises.length !== definition.exerciseIds.length)
    return <section className="los-empty"><h2>Kokeen tehtävät ovat keskeneräisiä</h2>
      <p>Kaikkia kokeeseen määriteltyjä tehtäviä ei löytynyt. Arviointia ei aloiteta puutteellisesta paketista.</p>
    </section>;

  return <article className="los-chapter-test">
    <p className="los-eyebrow">LOS! · {definition.examType === "midterm" ? "VÄLIKOE" : definition.examType === "final" ? "LOPPUKOE" : "KAPPALEEN ITSEARVIOINTI"}</p>
    <h2>{definition.title}</h2>
    <p className="los-intro">{definition.introductoryFi}</p>
    <p className="los-notice">Tämä on {definition.examType === "midterm" ? "kappaleiden 1–5 välikoe" : definition.examType === "final" ? "kirjan loppukoe" : definition.chapterId + ":n harjoituskoe"}, ei virallinen kurssikoe tai julkaistun oppikirjan lopullisesti hyväksytty arviointi. {definition.alternativeExerciseIds?.length ? "Uusintayritys käyttää myös uusia tehtävävaihtoehtoja." : "Uusintayrityksessä kysymykset pysyvät tässä versiossa samoina."} {writingMode ? "Kirjoitusosuus itsearvioidaan eikä lisää pisteitä." : "Puheäänitys on vapaaehtoinen ja pysyy vain tällä laitteella."}</p>
    <div className="los-exam-meta">
      <span>Yritys {attemptNumber + 1} · {isReturned ? "Palautettu" : "Vastattu " + completeCount + " / " + exercises.length}</span>
      <span>{definition.speechCriteria.length} {writingMode ? "kirjallisen tuotoksen" : "puheen"} itsearviointia · ei pisteitä</span>
    </div>
    <p className="los-storage-state" role="status">{losSyncMessage(status)}</p>
    {!!listeningBlocks.length && <section className="los-exam-listening" aria-label="Kokeen alkuperäiset kuuntelulähteet">
      <h3>Kuuntelu · oikeiden ihmisten alkuperäiset äänitteet</h3>
      <p>Toista alla olevat alkuperäiset äänitteet ennen kuunteluryhmän tehtäviä. Ne ovat samoja hyväksyttyjä lähdetiedostoja kuin aiemmissa oppitunneissa, eivät tietokoneella luotuja lisäkatkelmia. Kuuntelun todellinen toimivuus omalla laitteellasi pitää silti varmistaa. Jos jokin soitin ei toimi, älä arvaa vastausta äläkä pidä kuuntelutulosta luotettavana.</p>
      <Reader book={book} blocks={listeningBlocks} title="Kuuntelutekstit" />
    </section>}
    <form onSubmit={submit}>
      <div className="los-exam-questions">{exercises.map((exercise, index) =>
        <div key={exercise.id}>
          <ChapterTestQuestion exercise={exercise} number={index + 1}
            answer={state.answers[exercise.id] ?? null} disabled={isReturned || status === "loading"}
            onAnswer={answer => setAnswer(exercise.id, answer)}/>
          {state.submission && <div className={"los-exam-feedback " +
            (state.submission.outcomes[index]?.correct ? "is-correct" : "is-incorrect")}>
            <strong>{state.submission.outcomes[index]?.correct ? "Oikein · 1 p" : "Ei oikein · 0 p"}</strong>
            <p>{state.submission.outcomes[index]?.explanationFi}</p>
          </div>}
        </div>)}</div>
      <section className="los-exam-speech" aria-label={writingMode ? "Kirjallisen tuotoksen itsearviointi" : "Puheen itsearviointi"}>
        <h3>{writingMode ? "Kirjoita oma dialogi · ei automaattisia pisteitä" : "Puhe · oma arvio, ei automaattisia pisteitä"}</h3>
        {writingMode ? <>
          <p>{definition.writingPromptFi ?? "Kirjoita lyhyt saksankielinen esittely oppimiesi rakenteiden avulla."} Vastauksesi tallennetaan koesuorituksen yhteyteen, mutta sitä ei arvioida automaattisesti.</p>
          <label htmlFor={"los-exam-writing-" + definition.id}>{definition.secondWritingPromptFi ? "Oma viesti saksaksi" : "Oma teksti saksaksi"}</label>
          <textarea id={"los-exam-writing-" + definition.id} rows={4} lang="de"
            autoCapitalize="none" spellCheck={false} disabled={isReturned || status === "loading"}
            value={state.writtenResponse ?? ""}
            onChange={event => {
              update(previous => ({ ...previous, writtenResponse: event.target.value }));
              setSubmitError(null);
            }}/>
          {definition.secondWritingPromptFi && <>
            <h4>Toinen erillinen kirjoitustehtävä · ei pisteitä</h4>
            <p>{definition.secondWritingPromptFi}</p>
            <label htmlFor={"los-exam-writing-second-" + definition.id}>Oma keskustelu (yksi repliikki per rivi)</label>
            <textarea id={"los-exam-writing-second-" + definition.id} rows={8} lang="de"
              autoCapitalize="none" spellCheck={false} disabled={isReturned || status === "loading"}
              value={state.secondWrittenResponse ?? ""}
              onChange={event => {
                update(previous => ({...previous,secondWrittenResponse:event.target.value}));
                setSubmitError(null);
              }}/>
          </>}
          {definition.speechPromptFi && <div className="los-exam-optional-speaking">
            <h4>Harjoittele lisäksi ääneen · ei pisteitä</h4>
            <p>{definition.speechPromptFi}</p>
            <SpeechRecorder key={definition.id + ":" + attemptNumber}
              title="Vapaaehtoinen oma ääni" exampleDe={definition.speechExampleDe}/>
          </div>}
        </> : <>
          <p>{definition.speechPromptFi ?? "Lausu ääneen kappaleen keskeinen kysymys ja vastaus."} Voit äänittää harjoituksesi vapaaehtoisesti ja kuunnella sen ennen itsearviointia. Sovellus ei automaattisesti arvioi ääntämistäsi.</p>
          <SpeechRecorder key={definition.id + ":" + attemptNumber} title="Kuuntele omaa ääntämistäsi" exampleDe={definition.speechExampleDe}/>
        </>}
        {definition.speechCriteria.map(item => <fieldset key={item.id}
          disabled={isReturned || status === "loading"} className="los-exam-speech-criterion">
          <legend>{item.title}</legend>
          <label><input type="radio" name={"speech-" + definition.id + "-" + item.id}
            checked={state.selfAssessment[item.id] === "onnistui"}
            onChange={() => setAssessment(item.id, "onnistui")}/> Onnistui omasta mielestäni</label>
          <label><input type="radio" name={"speech-" + definition.id + "-" + item.id}
            checked={state.selfAssessment[item.id] === "harjoiteltavaa"}
            onChange={() => setAssessment(item.id, "harjoiteltavaa")}/> Tarvitsen harjoitusta</label>
        </fieldset>)}
      </section>
      {submitError && <p className="los-feedback is-incorrect" role="alert">{submitError}</p>}
      {!isReturned && <button type="submit" className="los-button los-button-primary"
        disabled={status === "loading"}>Palauta koe ja näytä ratkaisut</button>}
    </form>
    {state.submission && <section className="los-exam-result" role="status" aria-live="polite">
      <div><CheckCircle2 size={22}/><h3>Koe palautettu</h3></div>
      <p className="los-exam-score">{state.submission.score} / {state.submission.maximum} pistettä</p>
      {definition.scoreGroups && <section className="los-exam-breakdown" aria-label="Osa-aluekohtaiset pisteet">
        <h4>Osa-alueet · pisteet</h4>
        <ul>{examScoreGroups(definition, state.submission).map(group =>
          <li key={group.id}><span>{group.titleFi}</span><strong>{group.score} / {group.maximum} p</strong></li>)}</ul>
      </section>}
      <p>Automaattisesti tarkistettiin {state.submission.maximum} osatehtävää. {writingMode ? "Kirjalliset tuotokset" : "Puhe"} itsearvioitiin erikseen, eikä niistä lisätty pisteitä. Voit lukea jokaisen kohdan perustelun ylempänä.</p>
      {writingMode && <div className="los-exam-writing-return"><h4>Oma kirjallinen vastauksesi · itsearviointi</h4><p lang="de" style={{whiteSpace:"pre-wrap"}}>{state.submission.writtenResponse ?? ""}</p><details><summary>Avaa LOS!:n oma mallivastaus</summary><p lang="de" style={{whiteSpace:"pre-wrap"}}>{definition.writingModelDe ?? "Hallo! Ich heiße Lena. Wie heißt du?"}</p>{definition.writingModelFi && <p style={{whiteSpace:"pre-wrap"}}>{definition.writingModelFi}</p>}</details>
        {definition.secondWritingPromptFi && <div className="los-exam-second-result">
          <h4>Oma keskustelu · itsearviointi</h4>
          <p lang="de" style={{whiteSpace:"pre-wrap"}}>{state.submission.secondWrittenResponse ?? ""}</p>
          <details><summary>Avaa keskustelun mallivastaus</summary>
            <p lang="de" style={{whiteSpace:"pre-wrap"}}>{definition.secondWritingModelDe}</p>
            {definition.secondWritingModelFi && <p style={{whiteSpace:"pre-wrap"}}>{definition.secondWritingModelFi}</p>}
          </details>
        </div>}
      </div>}
      <p className="los-support">Tulos kuvaa vain tätä {definition.examType === "midterm" ? "LOS! 1:n välikoetta" : definition.chapterId + ":n tehtäväsarjaa"}. Se ei ole kurssin arvosana eikä CEFR-tason arvio.</p>
      {!restartVisible ? <button type="button" className="los-button los-button-secondary"
        onClick={() => setRestartVisible(true)}><RotateCcw size={17}/> Tee uusi yritys</button>
        : <div className="los-exam-confirm">
          <p>Edellinen pistetulos säilyy yrityshistoriassa. Uusi yritys tyhjentää vain nykyiset vastaukset.</p>
          <button type="button" className="los-button los-button-primary" onClick={() => {
            update(previous => restartChapterTest(previous));
            setRestartVisible(false);
          }}>Aloita uusi yritys</button>
          <button type="button" className="los-button los-button-secondary"
            onClick={() => setRestartVisible(false)}>Peruuta</button>
        </div>}
    </section>}
    {!!state.previousResults.length && <details className="los-exam-history">
      <summary>Edelliset yritykset ({state.previousResults.length})</summary>
      <ol>{state.previousResults.map((result, index) => <li key={result.submittedAt + ":" + index}>
        <strong>Yritys {(result.attemptNumber ?? index) + 1}</strong> · {new Date(result.submittedAt).toLocaleDateString("fi-FI")} · {result.score} / {result.maximum} p
        {result.writtenResponse && <p lang="de" className="los-exam-past-writing" style={{whiteSpace:"pre-wrap"}}>{result.writtenResponse}</p>}
        {result.secondWrittenResponse && <p lang="de" className="los-exam-past-writing" style={{whiteSpace:"pre-wrap"}}>{result.secondWrittenResponse}</p>}
        {!!result.outcomes?.length && <details className="los-exam-past-report">
          <summary>Tarkista aiemmat vastaukset ja perustelut</summary>
          <ol>{result.outcomes.map((item, index2) => <li key={item.exerciseId}>
            <strong>{index2 + 1}. {item.correct ? "Oikein" : "Ei oikein"}</strong>
            <p>{item.explanationFi}</p>
            <p className="los-support">Oma vastaus: {formatExerciseAnswer(
              book.exercises.find(exercise => exercise.id === item.exerciseId),
              result.answers?.[item.exerciseId] ?? null,
            )}</p>
          </li>)}</ol>
        </details>}
      </li>)}</ol>
    </details>}
  </article>;
}
