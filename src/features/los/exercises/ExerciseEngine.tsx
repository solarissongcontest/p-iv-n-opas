import { useEffect, useRef, useState } from "react";
import type { Exercise, ExerciseAnswer, HighlightRange } from "../model";
import { evaluateExercise, type Evaluation } from "./evaluate";
import { getDeviceOwnerId } from "@/lib/deviceSession";

type Props = { exercise: Exercise; mode?: "practice" | "exam"; onChecked?: (correct: boolean) => void };
const isRange = (value: ExerciseAnswer): value is HighlightRange =>
  !!value && typeof value === "object" && "start" in value && "end" in value;

function draftKey(exercise: Exercise) {
  const owner = getDeviceOwnerId();
  return owner ? ["opk", "los", owner, exercise.id, exercise.version, "draft"].join(":") : null;
}
function readDraft(exercise: Exercise): ExerciseAnswer {
  try {
    const key = draftKey(exercise);
    if (!key) return null;
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as ExerciseAnswer) : null;
  } catch { return null; }
}
function persistDraft(exercise: Exercise, answer: ExerciseAnswer): boolean {
  try {
    const key = draftKey(exercise);
    if (!key) return false;
    localStorage.setItem(key, JSON.stringify(answer));
    return true;
  } catch { return false; }
}
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

export function ExerciseEngine({ exercise, mode = "practice", onChecked }: Props) {
  const [answer, setAnswer] = useState<ExerciseAnswer>(null);
  const [ready, setReady] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);
  const [checked, setChecked] = useState<Evaluation | null>(null);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [hintShown, setHintShown] = useState(false);

  useEffect(() => {
    setAnswer(readDraft(exercise));
    setReady(true);
  }, [exercise]);
  useEffect(() => {
    if (!ready) return;
    setSavedLocally(persistDraft(exercise, answer));
  }, [exercise, answer, ready]);
  const change = (next: ExerciseAnswer) => { setAnswer(next); setChecked(null); };
  const matches = exercise.type === "matching" && answer && typeof answer === "object" && !isRange(answer)
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
      <button type="button" className="los-button los-button-primary" disabled={!ready || answer === null || (typeof answer === "string" && !answer.trim())}
        onClick={() => {
          const result = evaluateExercise(exercise, answer);
          setChecked(result);
          if (result) onChecked?.(result.correct);
        }}>Tarkista vastaus</button>
    </div>
    {hintShown && mode === "practice" && <p className="los-notice">{exercise.hintFi}</p>}
    {checked && <div role="status" aria-live="polite" className={"los-feedback " + (checked.correct ? "is-correct" : "is-incorrect")}>
      <b>{checked.correct ? "Oikein" : "Ei vielä oikein"}</b>
      {mode === "practice" && <p>{checked.explanationFi}</p>}
      {!checked.correct && mode === "practice" && <button type="button" className="los-text-action" onClick={() => setChecked(null)}>Yritä uudelleen</button>}
    </div>}
    <p className="los-storage-state" role="status">{savedLocally ? "Luonnos tällä laitteella · ei pilvisynkronointia" : "Luonnosta ei ole voitu tallentaa laitteelle"}</p>
  </section>;
}
