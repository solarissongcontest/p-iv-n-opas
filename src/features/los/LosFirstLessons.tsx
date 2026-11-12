import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Check, CheckCircle2, Circle, RotateCcw } from "lucide-react";
import type { LosNavigate } from "./LosReferenceTools";
import { useLosChapterDraft } from "./studyState";
import {
  emptyLosLessonProgress, losLessonCanComplete, losLessonEvidenceMet,
  losLessonFinish, losLessonMarkStep, losLessonSubmitCheck,
  type LosLessonProgress,
} from "./lessonEngine";
import { LOS1_EXECUTABLE_LESSONS, los1LessonDraftChapter } from "./guidedLessons";
import "./los-lessons.css";

const ALL_LESSONS = LOS1_EXECUTABLE_LESSONS;
const lessonChapter = los1LessonDraftChapter;

const stamp = () => new Date().toISOString();

/**
 * First executable lessons use the same chapter texts, understanding questions,
 * practice answers and test as the free textbook mode.
 * No duplicate answer state or new owner identification is introduced.
 */
export function LosFirstLessons({ selectedId, onSelect, move }: {
  selectedId: string;
  onSelect: (id: string) => void;
  move: LosNavigate;
}) {
  const c01 = useLosChapterDraft(1, "01");
  const c02 = useLosChapterDraft(1, "02");
  const c03 = useLosChapterDraft(1, "03");
  const c04 = useLosChapterDraft(1, "04");
  const c05 = useLosChapterDraft(1, "05");
  const c06 = useLosChapterDraft(1, "06");
  const c07 = useLosChapterDraft(1, "07");
  const c09 = useLosChapterDraft(1, "09");
  const chapterDraft = (id: string) => {
    const chapter = lessonChapter(id);
    return chapter === "09" ? c09 : chapter === "07" ? c07 :
      chapter === "06" ? c06 : chapter === "05" ? c05 : chapter === "04" ? c04 :
      chapter === "03" ? c03 : chapter === "02" ? c02 : c01;
  };
  const lesson = ALL_LESSONS.find(item => item.id === selectedId) ?? ALL_LESSONS[0]!;
  const chapterId = lessonChapter(lesson.id);
  const { draft, update, saved } = chapterDraft(lesson.id);
  const [pendingAnswer, setPendingAnswer] = useState("");
  const progress = draft.lessonProgress?.[lesson.id] ?? emptyLosLessonProgress();
  useEffect(() => { setPendingAnswer(progress.exitAnswer ?? ""); }, [lesson.id, progress.exitAnswer]);
  const record = (action: (current: LosLessonProgress) => LosLessonProgress) => {
    update(current => {
      const old = current.lessonProgress?.[lesson.id] ?? emptyLosLessonProgress();
      return { ...current, lessonProgress: {
        ...current.lessonProgress,
        [lesson.id]: action(old),
      } };
    });
  };
  const completeCount = ALL_LESSONS.filter(item =>
    Boolean(chapterDraft(item.id).draft.lessonProgress?.[item.id]?.completedAt)).length;
  const stepCount = lesson.steps.filter(item => progress.completedStepIds.includes(item.id)).length;
  const evidenceReady = losLessonEvidenceMet(lesson, draft);
  const ready = losLessonCanComplete(lesson, progress, draft);
  const nextIndex = ALL_LESSONS.findIndex(item => item.id === lesson.id) + 1;
  const next = ALL_LESSONS[nextIndex];
  const skipsUnfinishedLessons = Boolean(next && Number(next.id.slice(1)) > Number(lesson.id.slice(1)) + 1);
  const isComplete = Boolean(progress.completedAt);
  return <section className="los-lesson-program" id="los-lesson-runner" aria-label="Toteutetut LOS! 1 -oppitunnit">
    <div className="los-lesson-program-head">
      <p className="los-overline">OHJATTU OPETUS · {ALL_LESSONS.length} TUNTIA</p>
      <h2>Opiskele vaihe vaiheelta</h2>
      <p>Oppikirjassa on {ALL_LESSONS.length} suoritettavaa oppituntia. C01–C07:n ja C09:n vaiheita voi harjoitella. Välikoe, C08 ja C10 sekä niiden lähteet ovat osittain kesken, eikä keskeneräisiä tunteja merkitä valmiiksi. Niissä käytetään kirjan oikeita sivuja ja samoja tallennettuja vastauksia. Oppitunnin suoritus kertoo työvaiheiden tekemisestä, ei vielä todennetusta kielitaidosta.</p>
      <p className="los-lesson-save" role="status">{saved ? `Oppituntitiedot tallennetaan paikalliseen LOS!-varmuuskopioon. Valinnainen pilvisynkronointi tehdään kappaleen ${Number(chapterId)} muistiinpanojen kautta.` : "Tallennus epäonnistui. Älä sulje sivua ennen varmuuskopion tekemistä."}</p>
      <div className="los-lesson-progress" aria-label="Toteutettujen oppituntien edistyminen">
        <strong>{completeCount}/{ALL_LESSONS.length} suoritettu</strong>
        <div role="progressbar" aria-label="Oppituntien eteneminen" aria-valuemin={0} aria-valuemax={ALL_LESSONS.length} aria-valuenow={completeCount}>
          <span style={{ width: String(completeCount / ALL_LESSONS.length * 100) + "%" }} />
        </div>
      </div>
    </div>
    <div className="los-lesson-picker" role="group" aria-label="Valitse oppitunti">
      {ALL_LESSONS.map(item => {
        const done = Boolean(chapterDraft(item.id).draft.lessonProgress?.[item.id]?.completedAt);
        return <button key={item.id} type="button" aria-pressed={item.id === lesson.id} onClick={() => onSelect(item.id)}
          className={item.id === lesson.id ? "is-active" : ""}>
          {done ? <CheckCircle2 size={17} /> : <Circle size={17} />}
          <span>{item.id}</span>
        </button>;
      })}
    </div>
    <article className="los-lesson-detail" key={lesson.id}>
      <p className="los-overline">{lesson.id} · NOIN {lesson.estimatedMinutes} MIN · {lesson.id === "L001" ? "KIRJAN ALOITUS" : `C${chapterId}`}</p>
      <h3>{lesson.title}</h3>
      <p className="los-lesson-objective"><strong>Tavoite:</strong> {lesson.objective}</p>
      <p className="los-lesson-status">{isComplete ? "Oppitunti suoritettu. Voit silti avata aineistot uudelleen." :
        progress.startedAt ? "Oppitunti kesken" : "Oppituntia ei ole vielä aloitettu"} · {stepCount}/{lesson.steps.length} vaihetta merkitty tehdyksi.</p>
      <ol className="los-lesson-steps">
        {lesson.steps.map((step, index) => {
          const done = progress.completedStepIds.includes(step.id);
          return <li key={step.id} className={done ? "is-done" : ""}>
            <div className="los-lesson-step-title">
              {done ? <CheckCircle2 size={20} /> : <span className="los-lesson-step-count">{index + 1}</span>}
              <div><strong>{step.label}</strong><small>Ohjeellinen kesto {step.minutes} min</small></div>
            </div>
            <p>{step.instruction}</p>
            <div className="los-lesson-step-actions">
              <button type="button" onClick={() => move(step.chapter, step.section)}>
                <BookOpen size={16} /> Avaa oppikirjan sivu <ArrowRight size={15} />
              </button>
              <button type="button" disabled={done || isComplete} onClick={() => record(old => losLessonMarkStep(lesson, old, step.id, stamp()))}>
                {done ? <><Check size={16} /> Vaihe tehty</> : "Tein tämän vaiheen"}
              </button>
            </div>
          </li>;
        })}
      </ol>
      {lesson.evidence.length > 0 && <div className="los-lesson-evidence">
        <h4>Tarkistettavat opiskeluteot</h4>
        {lesson.evidence.map((item, i) => <p key={i}>{evidenceReady ? <CheckCircle2 size={16} /> : <Circle size={16} />}
          <span>{item.label}</span></p>)}
        {!evidenceReady && <small>Suorita nämä varsinaisella oppikirjasivulla. Pelkkä siirtyminen sivulle ei riitä. Oikein vastaamista ei edellytetä oppitunnin suoritusmerkintään.</small>}
      </div>}
      <fieldset className="los-lesson-exit">
        <legend>Lopputarkistus</legend>
        <p>{lesson.check.question}</p>
        {lesson.check.answers.map(option => <label key={option.id}>
          <input type="radio" name={"los-exit-" + lesson.id} value={option.id} checked={pendingAnswer === option.id}
            disabled={isComplete || Boolean(progress.exitCheckedAt)} onChange={() => setPendingAnswer(option.id)} />
          <span>{option.text}</span>
        </label>)}
        <button type="button" className="los-lesson-submit" disabled={!pendingAnswer || isComplete || Boolean(progress.exitCheckedAt)}
          onClick={() => record(old => losLessonSubmitCheck(lesson, old, pendingAnswer, stamp()))}>
          Palauta lopputarkistus
        </button>
        {progress.exitCheckedAt && <div className="los-lesson-feedback" role="status">
          <strong>{progress.exitAnswer === lesson.check.correctId ? "Oikein!" : "Tämä kohta kannattaa kerrata."}</strong>
          <p>{lesson.check.explanation}</p>
          <p>Lopputarkistus on palautettu. Sen tulos ei yksin ratkaise oppitunnin suoritusta.</p>
        </div>}
      </fieldset>
      <div className="los-lesson-finish">
        {!isComplete ? <>
          <button type="button" className="los-primary" disabled={!ready}
            onClick={() => record(old => losLessonFinish(lesson, old, draft, stamp()))}>
            <CheckCircle2 size={17} /> Merkitse oppitunti suoritetuksi
          </button>
          {!ready && <p role="status">Suoritus avautuu, kun kaikki vaiheet on kuitattu, tarvittavat tehtävävastaukset tallennettu ja lopputarkistus palautettu.</p>}
        </> : <div className="los-lesson-done">
          <CheckCircle2 size={22} /><strong>{lesson.id} suoritettu</strong>
          <small>Merkintä tallennettu {progress.completedAt ? new Date(progress.completedAt).toLocaleString("fi-FI") : ""}. Osaaminen arvioidaan erikseen.</small>
        </div>}
        {isComplete && next && <>
          {skipsUnfinishedLessons && <p className="los-lesson-skip-notice" role="note">Tuntien {`L${String(Number(lesson.id.slice(1)) + 1).padStart(3,"0")}`}–{`L${String(Number(next.id.slice(1)) - 1).padStart(3,"0")}`} suoritus ei ole vielä käytössä. Siirtyminen seuraavaan käytettävissä olevaan tuntiin ei merkitse niitä suoritetuiksi.</p>}
          <button type="button" className="los-lesson-next" onClick={() => onSelect(next.id)}>{skipsUnfinishedLessons ? "Seuraava käytettävissä oleva" : "Seuraava"}: {next.id} · {next.title} <ArrowRight size={17} /></button>
        </>}
      </div>
      {progress.exitCheckedAt && !isComplete && <button type="button" className="los-lesson-retry" onClick={() => record(old => ({
        ...old, exitAnswer: null, exitCheckedAt: null,
      }))}><RotateCcw size={15} /> Tee lopputarkistus uudelleen</button>}
    </article>
  </section>;
}
