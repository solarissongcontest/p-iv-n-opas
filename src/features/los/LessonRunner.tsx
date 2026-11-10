import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Book, Lesson, LessonProgress } from "./model";
import { Reader } from "./Reader";
import { ExerciseEngine } from "./exercises/ExerciseEngine";
import { getDeviceOwnerId } from "@/lib/deviceSession";

function lessonKey(lesson: Lesson) {
  const owner = getDeviceOwnerId();
  return owner ? ["opk", "los", owner, lesson.bookId, lesson.id, lesson.version, "progress"].join(":") : null;
}
function readLesson(lesson: Lesson): LessonProgress | null {
  try { const key = lessonKey(lesson); return key ? JSON.parse(localStorage.getItem(key) ?? "null") as LessonProgress | null : null; }
  catch { return null; }
}
function saveLesson(lesson: Lesson, value: LessonProgress) {
  try { const key = lessonKey(lesson); if (!key) return false; localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}
export function LessonRunner({ book, lesson }: { book: Book; lesson: Lesson }) {
  const [progress, setProgress] = useState<LessonProgress>({
    lessonId: lesson.id, lessonVersion: lesson.version, completedStepIds: [], status: "not-started", updatedAt: "",
  });
  const [index, setIndex] = useState(0);
  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const restored = readLesson(lesson);
    if (restored) {
      setProgress(restored);
      const firstUnfinished = lesson.steps.findIndex(step => !restored.completedStepIds.includes(step.id));
      setIndex(firstUnfinished < 0 ? Math.max(0, lesson.steps.length - 1) : firstUnfinished);
    }
    setLoaded(true);
  }, [lesson]);
  useEffect(() => { if (loaded && progress.updatedAt) setSaved(saveLesson(lesson, progress)); }, [lesson, progress, loaded]);
  const step = lesson.steps[index];
  const required = lesson.steps.filter(item => item.required);
  const completedCount = required.filter(item => progress.completedStepIds.includes(item.id)).length;
  const advance = () => {
    if (!step || (step.exerciseId && !checkedSteps.includes(step.id))) return;
    const completedStepIds = Array.from(new Set([...progress.completedStepIds, step.id]));
    const isDone = required.every(item => completedStepIds.includes(item.id));
    setProgress({
      lessonId: lesson.id, lessonVersion: lesson.version, completedStepIds,
      status: isDone ? "completed" : "in-progress", updatedAt: new Date().toISOString(),
    });
    if (index < lesson.steps.length - 1) setIndex(index + 1);
  };
  if (!step) return <div className="los-empty"><h2>Oppitunnissa ei ole vielä vaiheita</h2><p>Opetusmateriaali julkaistaan tähän myöhemmin.</p></div>;
  const block = step.blockId ? book.blocks.find(item => item.id === step.blockId) : undefined;
  const exercise = step.exerciseId ? book.exercises.find(item => item.id === step.exerciseId) : undefined;
  return <section className="los-lesson">
    <div className="los-lesson-heading"><p className="los-eyebrow">OPPITUNTI {lesson.sequence} · NOIN {lesson.estimatedMinutes} MIN</p><h1>{lesson.title}</h1>
      <p>{lesson.objectives.join(" · ")}</p>
      <div className="los-progress-heading"><span>Pakolliset vaiheet</span><span>{completedCount} / {required.length}</span></div>
      <progress value={completedCount} max={Math.max(1, required.length)} />
    </div>
    <ol className="los-step-list" aria-label="Oppitunnin vaiheet">{lesson.steps.map((item, stepIndex) =>
      <li key={item.id}>
        <button type="button" className={stepIndex === index ? "is-active" : ""}
          aria-current={stepIndex === index ? "step" : undefined} onClick={() => setIndex(stepIndex)}>
          {progress.completedStepIds.includes(item.id) ? <CheckCircle2 size={16} /> : <span>{stepIndex + 1}</span>} {item.title}
        </button>
      </li>)}</ol>
    <section className="los-lesson-step" aria-labelledby="los-step-title"><h2 id="los-step-title">{step.title}</h2>
      {block && <Reader book={book} title={step.title} blocks={[block]} />}
      {exercise && <ExerciseEngine key={exercise.id} exercise={exercise} onChecked={() => setCheckedSteps(previous => Array.from(new Set([...previous, step.id])))}/>}
      {!block && !exercise && <p className="los-notice">Tämän vaiheen materiaalia ei ole vielä julkaistu.</p>}
    </section>
    <div className="los-actions los-step-controls">
      <button type="button" className="los-button los-button-secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}><ArrowLeft size={17}/> Edellinen</button>
      <button type="button" className="los-button los-button-primary" disabled={(!block && !exercise) || (!!exercise && !checkedSteps.includes(step.id))}
        onClick={advance}>{index < lesson.steps.length - 1 ? "Merkitse käsitellyksi ja jatka" : "Päätä oppitunti"} <ArrowRight size={17}/></button>
    </div>
    {exercise && !checkedSteps.includes(step.id) && <p className="los-support">Tarkista tehtävä ennen kuin merkitset tämän vaiheen käsitellyksi. Oikeaa vastausta ei vaadita.</p>}
    <p className="los-storage-state">{saved ? "Vaihetiedot tallennettu tälle laitteelle · ei synkronoitu" : "Vaihetiedoille ei ole vielä vahvistettua pilvitallennusta"}</p>
    {progress.status === "completed" && <p className="los-feedback is-correct" role="status">Kaikki pakolliset vaiheet käsitelty tällä laitteella. Tämä ei ole virallinen kurssisuoritus.</p>}
  </section>;
}
