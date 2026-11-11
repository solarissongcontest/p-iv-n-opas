import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Book, Lesson, LessonProgress, ResumeBookmark } from "./model";
import { Reader } from "./Reader";
import { ExerciseEngine } from "./exercises/ExerciseEngine";
import { useLosRecord, losSyncMessage } from "./data/useLosRecord";

export function LessonRunner({ book, lesson }: { book: Book; lesson: Lesson }) {
  const { value: progress, update: setProgress, status: saveStatus } = useLosRecord<LessonProgress>(
    book.id, "lesson", lesson.id, lesson.version, {
      lessonId: lesson.id, lessonVersion: lesson.version, completedStepIds: [], status: "not-started", updatedAt: "",
    },
  );
  const { value: reflections, update: updateReflections, status: reflectionSaveStatus } =
    useLosRecord<Record<string, string>>(book.id, "notes", "lesson-reflections-" + lesson.id, lesson.version, {});
  const { update: saveResume } = useLosRecord<ResumeBookmark | null>(
    book.id, "bookmark", "resume-lesson", book.contentVersion, null,
  );
  const [index, setIndex] = useState(0);
  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);
  const restoredLesson = useRef<string | null>(null);
  useEffect(() => {
    // Do not bounce the learner backwards on every asynchronous autosave.
    if (saveStatus === "loading" || restoredLesson.current === lesson.id) return;
    restoredLesson.current = lesson.id;
    const firstUnfinished = lesson.steps.findIndex(step => !progress.completedStepIds.includes(step.id));
    setIndex(firstUnfinished < 0 ? Math.max(0, lesson.steps.length - 1) : firstUnfinished);
  }, [lesson.id, lesson.steps, saveStatus, progress.completedStepIds]);
  const step = lesson.steps[index];
  const required = lesson.steps.filter(item => item.required);
  const completedCount = required.filter(item => progress.completedStepIds.includes(item.id)).length;
  const advance = () => {
    if (!step || (step.exerciseId && !checkedSteps.includes(step.id)) ||
      (step.reflectionPromptFi && !(reflections[step.id] ?? "").trim())) return;
    setProgress(previous => {
      const completedStepIds = Array.from(new Set([...previous.completedStepIds, step.id]));
      const isDone = required.every(item => completedStepIds.includes(item.id));
      return {
        lessonId: lesson.id, lessonVersion: lesson.version, completedStepIds,
        status: isDone ? "completed" : "in-progress", updatedAt: new Date().toISOString(),
      };
    });
    saveResume({
      lessonId: lesson.id, lessonVersion: lesson.version, updatedAt: new Date().toISOString(),
    });
    setIndex(current => Math.min(current + 1, lesson.steps.length - 1));
  };
  if (!step) return <div className="los-empty"><h2>Oppitunnissa ei ole vielä vaiheita</h2><p>Opetusmateriaali julkaistaan tähän myöhemmin.</p></div>;
  const block = step.blockId ? book.blocks.find(item => item.id === step.blockId) : undefined;
  const exercise = step.exerciseId ? book.exercises.find(item => item.id === step.exerciseId) : undefined;
  return <section className="los-lesson">
    <div className="los-lesson-heading"><p className="los-eyebrow">OPPITUNTI {lesson.sequence} · NOIN {lesson.estimatedMinutes} MIN</p><h1>{lesson.title}</h1>
      <p>{lesson.objectives.join(" · ")}</p>
      {lesson.publicationStatus === "preview" && <p className="los-notice">Harjoitusversio: tämän tunnin alkuperäisteksti ja rajatut harjoitukset ovat käytettävissä. Täysimittainen 30 minuutin opetus ja arviointi ovat vielä toimitettavana.</p>}
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
      {exercise && <ExerciseEngine key={exercise.id} bookId={book.id} exercise={exercise} onChecked={() => setCheckedSteps(previous => Array.from(new Set([...previous, step.id])))}/>}
      {step.reflectionPromptFi && <div className="los-lesson-reflection">
        <label htmlFor={"los-reflection-" + step.id}>{step.reflectionPromptFi}</label>
        <textarea id={"los-reflection-" + step.id} rows={4}
          value={reflections[step.id] ?? ""}
          onChange={event => updateReflections(previous => ({ ...previous, [step.id]: event.target.value }))}/>
        <p className="los-storage-state" role="status">{losSyncMessage(reflectionSaveStatus)}</p>
      </div>}
      {!block && !exercise && !step.reflectionPromptFi &&
        <p className="los-notice">Tämän vaiheen materiaalia ei ole vielä julkaistu.</p>}
    </section>
    <div className="los-actions los-step-controls">
      <button type="button" className="los-button los-button-secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}><ArrowLeft size={17}/> Edellinen</button>
      <button type="button" className="los-button los-button-primary" disabled={(!block && !exercise && !step.reflectionPromptFi) ||
          (!!exercise && !checkedSteps.includes(step.id)) ||
          (!!step.reflectionPromptFi && !(reflections[step.id] ?? "").trim())}
        onClick={advance}>{index < lesson.steps.length - 1 ? "Merkitse käsitellyksi ja jatka" : "Päätä oppitunti"} <ArrowRight size={17}/></button>
    </div>
    {exercise && !checkedSteps.includes(step.id) && <p className="los-support">Tarkista tehtävä ennen kuin merkitset tämän vaiheen käsitellyksi. Oikeaa vastausta ei vaadita.</p>}
    <p className="los-storage-state">{losSyncMessage(saveStatus)}</p>
    {progress.status === "completed" && <p className="los-feedback is-correct" role="status">Tämän harjoitusversion kaikki pakolliset vaiheet käsitelty. Tämä ei ole virallinen kurssisuoritus.</p>}
  </section>;
}
