import { useRef, useState } from "react";
import type { BookId, Exercise, ExerciseAnswer, ExerciseAttempt, HighlightRange } from "../model";
import { evaluateExercise, type Evaluation } from "./evaluate";
import { useLosRecord, losSyncMessage } from "../data/useLosRecord";

type Props = { bookId: BookId; exercise: Exercise; mode?: "practice" | "exam"; onChecked?: (correct: boolean) => void };
const isRange = (value: ExerciseAnswer): value is HighlightRange =>
  !!value && typeof value === "object" && "start" in value && "end" in value;

function HighlightPicker({ exercise, value, onChange }: {
  exercise: Extract<Exercise, { type: "highlight" }>;
  value: ExerciseAnswer;
  onChange: (next: ExerciseAnswer) => void;
}) {
  const text = exercise.text;
  const range = isRange(value) ? value : null;
  const rootRef = useRef<HTMLParagraphElement>(null);
  const [previous, setPrevious] = useState<HighlightRange | null>(null);
  const [wordMode, setWordMode] = useState(false);
  const tokens = Array.from(text.matchAll(/\S+/gu), match => ({
    word: match[0], start: match.index, end: match.index + match[0].length,
  }));
  const select = (next: HighlightRange | null) => {
    setPrevious(range);
    onChange(next);
  };
  const fromNativeSelection = () => {
    const root = rootRef.current;
    const selection = window.getSelection();
    if (!root || !selection || selection.isCollapsed || selection.rangeCount === 0) return;
    const selected = selection.getRangeAt(0);
    if (!root.contains(selected.startContainer) || !root.contains(selected.endContainer)) return;
    const prefix = selected.cloneRange();
    prefix.selectNodeContents(root);
    prefix.setEnd(selected.startContainer, selected.startOffset);
    const start = prefix.toString().length;
    const end = start + selected.toString().length;
    if (end > start) select({ start, end });
    selection.removeAllRanges();
  };
  const chooseToken = (token: { start: number; end: number }) => {
    if (!range) return select({ start: token.start, end: token.end });
    if (token.start >= range.start && token.end <= range.end) {
      return select(range.start === token.start && range.end === token.end ? null : { start: token.start, end: token.end });
    }
    select({ start: Math.min(range.start, token.start), end: Math.max(range.end, token.end) });
  };
  return <div className="los-highlight">
    <p className="los-support">Maalaa kohta hiirellä tai tekstivalinnalla. Kosketus- ja näppäimistövaihtoehto löytyy kohdasta Valitse sanoin.</p>
    <p ref={rootRef} lang="de" className="los-highlight-text" onMouseUp={fromNativeSelection} onTouchEnd={fromNativeSelection}>
      {range && range.start >= 0 && range.end <= text.length ? <>
        {text.slice(0, range.start)}<mark className="los-marker">{text.slice(range.start, range.end)}</mark>{text.slice(range.end)}
      </> : text}
    </p>
    <div className="los-actions">
      <button type="button" className="los-button los-button-secondary" aria-expanded={wordMode} onClick={() => setWordMode(v => !v)}>
        {wordMode ? "Sulje sanavalinta" : "Valitse sanoin"}
      </button>
      <button type="button" className="los-button los-button-secondary" disabled={!previous} onClick={() => { onChange(previous); setPrevious(null); }}>Kumoa</button>
      <button type="button" className="los-button los-button-secondary" disabled={!range} onClick={() => select(null)}>Tyhjennä</button>
    </div>
    {wordMode && <div className="los-token-picker" role="group" aria-label="Valitse korostettava tekstijakso">
      <p className="los-support">Napauta ensimmäistä ja viimeistä sanaa. Valinta kattaa myös niiden välin.</p>
      <div className="los-tokens">{tokens.map(token => <button
        key={token.start}
        type="button"
        className="los-token"
        lang="de"
        aria-pressed={!!range && token.start >= range.start && token.end <= range.end}
        onClick={() => chooseToken(token)}
      >{token.word}</button>)}</div>
    </div>}
  </div>;
}

export function ExerciseEngine({ bookId, exercise, mode = "practice", onChecked }: Props) {
  const { value: attempt, update: updateAttempt, status: saveStatus } = useLosRecord<ExerciseAttempt>(
    bookId, "exercise", exercise.id, exercise.version,
    { id: exercise.id, exerciseId: exercise.id, exerciseVersion: exercise.version,
      answer: null, checkedAt: null, status: "draft", updatedAt: "" },
  );
  const answer = attempt.answer;
  const [checked, setChecked] = useState<Evaluation | null>(null);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const change = (next: ExerciseAnswer) => {
    updateAttempt(previous => ({ ...previous, answer: next, status: "draft",
      checkedAt: null, updatedAt: new Date().toISOString() }));
    setChecked(null);
    setExamSubmitted(false);
  };
  const matches = exercise.type === "matching" && answer && typeof answer === "object" && !Array.isArray(answer) && !isRange(answer)
    ? answer as Record<string, string> : {};
  return <section className="los-exercise" aria-labelledby={"los-prompt-" + exercise.id}>
    <div className="los-exercise-meta">HARJOITUS · {exercise.id} <span>{mode === "exam" ? "Koetila" : "Harjoitustila"}</span></div>
    <h3 id={"los-prompt-" + exercise.id} className="los-exercise-prompt">{exercise.promptFi}</h3>
    {exercise.type === "single-choice" && <fieldset className="los-options">
      <legend className="sr-only">Valitse yksi vastaus</legend>
      {exercise.options.map(option => <label className="los-option" key={option.id}>
        <input type="radio" name={"los-" + exercise.id} value={option.id}
          checked={answer === option.id} onChange={() => change(option.id)} />
        <span>{option.label}</span>
      </label>)}
    </fieldset>}
    {exercise.type === "multiple-choice" && <fieldset className="los-options">
      <legend className="sr-only">Voit valita useita vaihtoehtoja</legend>
      <p className="los-support">Valitse kaikki sopivat vaihtoehdot. Niitä voi olla useampi kuin yksi.</p>
      {exercise.options.map(option => <label className="los-option" key={option.id}>
        <input type="checkbox" checked={Array.isArray(answer) && answer.includes(option.id)}
          onChange={event => {
            const selected = Array.isArray(answer) ? answer : [];
            change(event.target.checked ? [...selected, option.id] : selected.filter(id => id !== option.id));
          }}/>
        <span>{option.label}</span>
      </label>)}
    </fieldset>}
    {exercise.type === "true-false" && <fieldset className="los-options">
      <legend>{exercise.statement}</legend>
      {[{ id: "true", text: "Totta" }, { id: "false", text: "Epätotta" }].map(option =>
        <label className="los-option" key={option.id}>
          <input type="radio" name={"los-truth-" + exercise.id} value={option.id}
            checked={answer === option.id} onChange={() => change(option.id)}/>
          <span>{option.text}</span>
        </label>)}
    </fieldset>}
    {exercise.type === "word-order" && <div className="los-word-order">
      <p className="los-support">Napauta sanoja siinä järjestyksessä kuin ne kuuluvat lauseeseen. Voit poistaa valitun sanan napauttamalla sitä uudelleen.</p>
      <div className="los-order-selected" role="group" aria-label="Oma sanajärjestys">
        {Array.isArray(answer) && answer.length ? answer.map((id, index) =>
          <button type="button" className="los-token is-selected" key={id}
            aria-label={"Poista sana sijalta " + (index + 1)}
            onClick={() => change(answer.filter(value => value !== id))}>
            {exercise.tokens.find(token => token.id === id)?.label ?? id} <span aria-hidden="true">×</span>
          </button>) : <p className="los-support">Valitut sanat näkyvät tässä.</p>}
      </div>
      <div className="los-tokens" role="group" aria-label="Käytettävissä olevat sanat">
        {exercise.tokens.map(token => <button type="button" key={token.id}
          className="los-token" disabled={Array.isArray(answer) && answer.includes(token.id)}
          onClick={() => change([...(Array.isArray(answer) ? answer : []), token.id])}>{token.label}</button>)}
      </div>
    </div>}
    {exercise.type === "categorize" && <div className="los-categorize">
      <p className="los-support">Valitse jokaiselle ilmaukselle sopiva ryhmä.</p>
      {exercise.items.map(item => <div className="los-categorize-row" key={item.id}>
        <label htmlFor={"los-cat-" + exercise.id + "-" + item.id} lang="de">{item.label}</label>
        <select id={"los-cat-" + exercise.id + "-" + item.id}
          value={answer && typeof answer === "object" && !Array.isArray(answer) && !isRange(answer)
            ? (answer as Record<string, string>)[item.id] ?? "" : ""}
          onChange={event => {
            const previous = answer && typeof answer === "object" && !Array.isArray(answer) && !isRange(answer)
              ? answer as Record<string, string> : {};
            const next = { ...previous };
            if (event.target.value) next[item.id] = event.target.value;
            else delete next[item.id];
            change(next);
          }}>
          <option value="">Valitse ryhmä…</option>
          {exercise.categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>)}
        </select>
      </div>)}
    </div>}
    {exercise.type === "gap-fill" && <div className="los-gap">
      <div lang="de">{exercise.sentenceBefore} <span aria-hidden="true">_____</span> {exercise.sentenceAfter}</div>
      <label htmlFor={"los-answer-" + exercise.id}>Täydennä puuttuva sana tai ilmaus</label>
      <input id={"los-answer-" + exercise.id} lang="de" type="text" autoComplete="off"
        value={typeof answer === "string" ? answer : ""} onChange={event => change(event.target.value)} />
      <div className="los-umlauts" aria-label="Saksan erikoismerkit">
        {["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"].map(letter => <button key={letter} type="button"
          onClick={() => {
            const input = document.getElementById("los-answer-" + exercise.id) as HTMLInputElement | null;
            const current = typeof answer === "string" ? answer : "";
            const start = input?.selectionStart ?? current.length;
            const end = input?.selectionEnd ?? current.length;
            change(current.slice(0, start) + letter + current.slice(end));
            requestAnimationFrame(() => { input?.focus(); input?.setSelectionRange(start + 1, start + 1); });
          }}>{letter}</button>)}
      </div>
    </div>}
    {exercise.type === "matching" && <div className="los-matching">
      <div><h4>Deutsch</h4>{exercise.left.map(item => <button
        key={item.id} type="button" className="los-match-item"
        aria-pressed={selectedLeft === item.id}
        onClick={() => setSelectedLeft(item.id)}>
        {item.label} {matches[item.id] && <span className="los-support">↔ {exercise.right.find(right => right.id === matches[item.id])?.label}</span>}
      </button>)}</div>
      <div><h4>Suomi</h4>{exercise.right.map(item => <button key={item.id} type="button"
        className="los-match-item" disabled={!selectedLeft}
        onClick={() => {
          if (!selectedLeft) return;
          const updated = Object.fromEntries(Object.entries(matches).filter(([left, right]) => left !== selectedLeft && right !== item.id));
          change({ ...updated, [selectedLeft]: item.id });
          setSelectedLeft(null);
        }}>{item.label}</button>)}</div>
    </div>}
    {exercise.type === "highlight" && <HighlightPicker exercise={exercise} value={answer} onChange={change} />}
    <div className="los-actions los-exercise-bottom">
      {mode === "practice" && exercise.hintFi && <button type="button" className="los-button los-button-secondary" onClick={() => setHintShown(v => !v)} aria-expanded={hintShown}>Vihje</button>}
      <button type="button" className="los-button los-button-primary" disabled={saveStatus === "loading" || evaluateExercise(exercise, answer) === null}
        onClick={() => {
          if (mode === "exam") {
            // In exam mode an individual task may only submit its answer.
            // Never leak correctness or a solution before the entire exam is returned.
            updateAttempt(previous => ({ ...previous, checkedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString() }));
            setExamSubmitted(true);
            return;
          }
          const result = evaluateExercise(exercise, answer);
          setChecked(result);
          if (result) {
            updateAttempt(previous => ({ ...previous, status: result.correct ? "correct" : "incorrect",
              checkedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
            onChecked?.(result.correct);
          }
        }}>Tarkista vastaus</button>
    </div>
    {hintShown && mode === "practice" && <p className="los-notice">{exercise.hintFi}</p>}
    {examSubmitted && <p className="los-notice" role="status">Vastaus merkitty koetilaan. Tallennuksen tila näkyy alla; oikeellisuutta ei näytetä ennen koko kokeen palauttamista.</p>}
    {checked && <div role="status" aria-live="polite" className={"los-feedback " + (checked.correct ? "is-correct" : "is-incorrect")}>
      <b>{checked.correct ? "Oikein" : "Ei vielä oikein"}</b>
      {mode === "practice" && <p>{checked.explanationFi}</p>}
      {!checked.correct && mode === "practice" && <button type="button" className="los-text-action" onClick={() => setChecked(null)}>Yritä uudelleen</button>}
    </div>}
    <p className="los-storage-state" role="status">{losSyncMessage(saveStatus)}</p>
  </section>;
}
