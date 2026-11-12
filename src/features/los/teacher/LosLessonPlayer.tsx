import { useEffect, useState, type CSSProperties } from "react";
import {
  ArrowLeft, BookOpen, Check, CheckCircle2, ChevronLeft, ChevronRight,
  CircleHelp, ExternalLink, Lightbulb, List,
} from "lucide-react";
import { useLosChapterDraft } from "../studyState";
import {
  confirmTeacherActivity, emptyTeacherSession, finishTeacherSession,
  independentTeacherEvidence, markTeacherHelp, moveTeacherScene,
  revealTeacherSolution, setTeacherAnswerDraft, submitTeacherAnswer,
  teacherCanFinish, teacherLatestAttempt, teacherWrongFeedback, type TeacherSession,
} from "./engine";
import { getLosTeacherLesson } from "./lessonL004";
import "./teacher.css";

const now = () => new Date().toISOString();
const bookHref = (lessonId: string, bookId: number, chapterId: string, section: string) =>
  "/los?lessonReturn=" + encodeURIComponent(lessonId) + "#/" + bookId + "/" + chapterId + "/" + section;

/** Dedicated no-AI lesson view. Legacy lessonProgress and book answers remain intact. */
export function LosLessonPlayer({ lessonId, onBack }: { lessonId: string; onBack: () => void }) {
  const lesson = getLosTeacherLesson(lessonId);
  const { draft, update, saved } = useLosChapterDraft(1, lesson?.chapterId ?? "01");
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [reteachOpen, setReteachOpen] = useState(false);
  const [boardStep, setBoardStep] = useState(0);

  const session: TeacherSession | null = lesson ?
    (draft.teacherSessions?.[lesson.id] ?? emptyTeacherSession(lesson, now())) : null;
  const scene = lesson?.scenes.find(item => item.id === session?.sceneId) ?? lesson?.scenes[0];
  const index = lesson && scene ? lesson.scenes.findIndex(item => item.id === scene.id) : 0;
  const visitedCurrent = Boolean(scene && session?.visitedIds.includes(scene.id));

  const record = (change: (current: TeacherSession) => TeacherSession) => {
    if (!lesson) return;
    update(current => {
      const original = current.teacherSessions?.[lesson.id] ?? emptyTeacherSession(lesson, now());
      return { ...current, teacherSessions: { ...current.teacherSessions, [lesson.id]: change(original) } };
    });
  };

  useEffect(() => {
    if (!lesson || !scene || visitedCurrent) return;
    update(current => {
      const original = current.teacherSessions?.[lesson.id] ?? emptyTeacherSession(lesson, now());
      const next = moveTeacherScene(original, lesson, scene.id, now());
      return { ...current, teacherSessions: { ...current.teacherSessions, [lesson.id]: next } };
    });
  }, [lesson, scene?.id, visitedCurrent, update]);

  useEffect(() => {
    setHelpOpen(false); setHintOpen(false); setReteachOpen(false);
    setBoardStep(0); setOutlineOpen(false);
  }, [scene?.id]);

  if (!lesson || !session || !scene) return <section className="los-teacher-missing">
    <h1>Oppituntia ei löydy</h1>
    <p>Opettajajohtoinen näkymä on toistaiseksi käytössä L004-mallioppitunnilla. Muut oppitunnit säilyvät nykyisessä opetuspolussa.</p>
    <button type="button" className="los-primary" onClick={onBack}>Palaa opetuspolkuun</button>
  </section>;

  const q = scene.question;
  const latest = teacherLatestAttempt(session, scene.id);
  const attempts = session.attempts.filter(item => item.sceneId === scene.id);
  const wrongCount = attempts.filter(item => !item.correct).length;
  const currentAnswer = session.draftAnswers[scene.id] ?? "";
  const seenCount = lesson.scenes.filter(item => session.visitedIds.includes(item.id)).length;
  const completedPractice = lesson.requiredPracticeIds.filter(id => Boolean(draft.practiceAnswers[id]?.trim()));
  const canFinish = teacherCanFinish(session, lesson, draft.practiceAnswers);
  const answered = lesson.requiredQuestionIds.filter(id => session.attempts.some(item => item.sceneId === id)).length;
  const activities = lesson.requiredActivityIds.filter(id => session.activityIds.includes(id)).length;

  const go = (id: string) => {
    record(current => moveTeacherScene(current, lesson, id, now()));
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };
  const submit = () => record(current => submitTeacherAnswer(current, lesson, scene.id, currentAnswer, now()));
  const openHelp = (kind: "hint" | "reteach") => {
    record(current => markTeacherHelp(current, scene.id, now()));
    if (kind === "hint") setHintOpen(true);
    if (kind === "reteach") setReteachOpen(true);
  };
  const missing = {
    scenes: lesson.scenes.length - seenCount,
    questions: lesson.requiredQuestionIds.length - answered,
    activities: lesson.requiredActivityIds.length - activities,
    practice: lesson.requiredPracticeIds.length - completedPractice.length,
  };

  return <div className="los-teacher" style={{
    "--los-book-accent": "#B7473C", "--los-book-tint": "#FCE8E5",
  } as CSSProperties}>
    <header className="los-teacher-top">
      <button type="button" className="los-teacher-back" onClick={onBack}><ArrowLeft size={18}/><span>Opetuspolku</span></button>
      <div className="los-teacher-identity"><strong>LOS! 1</strong> / {lesson.id} · Opettajan tunti</div>
      <button type="button" className="los-teacher-menu" onClick={() => setOutlineOpen(v => !v)}
        aria-expanded={outlineOpen} aria-controls="los-teacher-outline"><List size={18}/> Sisältö</button>
    </header>
    <div className="los-teacher-progress" role="progressbar" aria-label="Käydyt opetustilanteet"
      aria-valuemin={0} aria-valuemax={lesson.scenes.length} aria-valuenow={seenCount}>
      <span style={{width: (100 * seenCount / lesson.scenes.length) + "%"}}/>
    </div>
    <div className="los-teacher-shell">
      {outlineOpen && <nav id="los-teacher-outline" className="los-teacher-outline" aria-label="Oppitunnin rakenne">
        <div className="los-teacher-outline-head"><strong>Oppitunnin vaiheet</strong><button type="button" onClick={() => setOutlineOpen(false)}>Sulje</button></div>
        {lesson.scenes.map((item,i) => <button key={item.id} type="button"
          className={item.id === scene.id ? "is-current" : ""} onClick={() => go(item.id)}
          aria-current={item.id === scene.id ? "step" : undefined}>
          <span className="los-teacher-outline-index">{String(i+1).padStart(2,"0")}</span>
          <span>{item.title}</span>
          {session.visitedIds.includes(item.id) && <Check size={15} aria-label="Käyty"/>}
        </button>)}
      </nav>}
      <main id="main-content" className="los-teacher-main" tabIndex={-1}>
        <div className="los-teacher-intro">
          <div className="los-teacher-kicker">{lesson.id} · {scene.phase} · {index+1}/{lesson.scenes.length}</div>
          <h1>{scene.title}</h1>
          <p>{lesson.objective}</p>
        </div>
        <article className="los-teacher-paper">
          <div className="los-teacher-voice"><span className="los-teacher-mark">L!</span><strong>OPETTAJA</strong></div>
          <div className="los-teacher-explanation">
            {scene.paragraphs.map((paragraph,i) => <p key={i}>{paragraph}</p>)}
          </div>

          {scene.kind === "board" && scene.board && <section className="los-teacher-board" aria-label="Vaiheittainen opetustaulu">
            <div className="los-teacher-board-title"><BookOpen size={17}/> Opetustaulu</div>
            {scene.board.slice(0,boardStep+1).map((step,i) => <div className="los-teacher-board-row" key={i}>
              <span>{step.label}</span><strong lang="de">{step.german}</strong><span>{step.meaning}</span>
            </div>)}
            <div className="los-teacher-board-controls">
              <button type="button" disabled={boardStep === 0} onClick={() => setBoardStep(i => Math.max(0,i-1))}><ChevronLeft size={17}/>Edellinen</button>
              <span>Vaihe {boardStep+1}/{scene.board.length}</span>
              <button type="button" disabled={boardStep >= scene.board.length-1}
                onClick={() => setBoardStep(i => Math.min(scene.board!.length-1,i+1))}>Näytä seuraava<ChevronRight size={17}/></button>
            </div>
            {boardStep < scene.board.length-1 && <button type="button" className="los-teacher-show-all"
              onClick={() => setBoardStep(scene.board!.length-1)}>Näytä kaikki vaiheet</button>}
          </section>}

          {q && <section className="los-teacher-question" aria-labelledby="los-teacher-question-title">
            <span className="los-teacher-question-tag">HARJOITUS · {q.type==="choice"?"Valitse vastaus":"Kirjoita vastaus"}</span>
            <h2 id="los-teacher-question-title">{q.prompt}</h2>
            {q.type === "choice" ? <fieldset className="los-teacher-options" disabled={Boolean(session.completedAt)}>
              <legend className="sr-only">{q.prompt}</legend>
              {q.options?.map(option => <label key={option.id}>
                <input name={"los-teacher-"+scene.id} type="radio" value={option.id}
                  checked={currentAnswer===option.id}
                  onChange={() => record(current => setTeacherAnswerDraft(current,scene.id,option.id,now()))}/>
                <span>{option.label}</span>
              </label>)}
            </fieldset> : <label className="los-teacher-textanswer">
              <span className="sr-only">{q.prompt}</span>
              <input type="text" lang="de" autoComplete="off" spellCheck={false} maxLength={500}
                disabled={Boolean(session.completedAt)} value={currentAnswer} placeholder="Kirjoita saksaksi..."
                onChange={e => record(current => setTeacherAnswerDraft(current,scene.id,e.target.value,now()))}/>
            </label>}
            <div className="los-teacher-question-actions">
              <button type="button" className="los-teacher-submit"
                disabled={Boolean(session.completedAt) || !currentAnswer.trim() || Boolean(latest && latest.answer===currentAnswer)}
                onClick={submit}>Tarkista vastaus <ChevronRight size={17}/></button>
              <button type="button" onClick={() => openHelp("hint")}><Lightbulb size={16}/>Anna vihje</button>
            </div>
            {hintOpen && <p className="los-teacher-hint" role="status"><strong>Vihje:</strong> {q.hint}</p>}
            {latest && <div className={"los-teacher-feedback " + (latest.correct?"is-correct":"is-wrong")} role="status">
              <strong>{latest.correct?"Oikein!":"Tarkistetaan vielä."}</strong>
              <p>{latest.correct?q.success:teacherWrongFeedback(scene,latest.answer)}</p>
              {!latest.correct && <p>Voit kokeilla uudelleen. Uusi yritys ei poista aiempaa vastausta.</p>}
            </div>}
            {(wrongCount>=2 || reteachOpen) && <div className="los-teacher-reteach">
              <strong>Selitetään toisella tavalla</strong><p>{q.reteach}</p>
            </div>}
            <div className="los-teacher-secondary-help">
              <button type="button" onClick={() => openHelp("reteach")}>Selitä uudelleen</button>
              <button type="button" onClick={() => record(current => revealTeacherSolution(current,scene.id,now()))}>Näytä mallivastaus</button>
            </div>
            {session.revealedIds.includes(scene.id) && <div className="los-teacher-solution">
              <strong>Oikea vastaus: </strong><span lang="de">{q.type==="choice"
                ? q.options?.find(option=>option.id===q.correctOption)?.label : q.accepted?.[0]}</span>
              <p>Mallin katsominen on avun käyttöä, ei itsenäinen osaamisnäyttö.</p>
            </div>}
          </section>}

          {scene.bookLinks && <section className="los-teacher-books" aria-label="Oppikirjaviitteet">
            <h2>Siirry oppikirjaan</h2>
            {scene.bookLinks.map(link => <div className="los-teacher-book-link" key={link.section}>
              <div><strong>{link.label}</strong><p>{link.instruction}</p></div>
              <a href={bookHref(lesson.id,lesson.bookId,link.chapterId,link.section)}
                target="_blank" rel="noopener noreferrer"><BookOpen size={17}/> Avaa kirjassa <ExternalLink size={15}/></a>
            </div>)}
            <p className="los-teacher-book-note">Kirja avautuu erilliseen välilehteen. Oppitunti säilyy tässä. Kirjassa näkyy paluulinkki.</p>
            <div className="los-teacher-practice-count">
              <strong>Kirjan harjoitukset</strong>
              {lesson.requiredPracticeIds.map(id => <span key={id}>
                {draft.practiceAnswers[id]?.trim()?<CheckCircle2 size={16}/>:<span className="los-teacher-open-circle"/>}
                {id}: {draft.practiceAnswers[id]?.trim()?"vastaus tallennettu":"vastaus puuttuu"}
              </span>)}
              <small>Vastauksen tallentaminen ei vielä todista oikeaa osaamista.</small>
            </div>
          </section>}

          {scene.activityId && <section className="los-teacher-activity">
            <button type="button" disabled={session.activityIds.includes(scene.activityId) || Boolean(session.completedAt)}
              onClick={() => record(current => confirmTeacherActivity(current,lesson,scene.activityId!,now()))}>
              {session.activityIds.includes(scene.activityId)?<CheckCircle2 size={18}/>:<span className="los-teacher-check-square"/>}
              {session.activityIds.includes(scene.activityId)?"Harjoittelu merkitty tehdyksi":scene.activityLabel}
            </button>
            <small>Oma vahvistus ei ole automaattinen kielitaidon arvio.</small>
          </section>}

          {scene.kind === "summary" && <section className="los-teacher-end">
            <h2>Oppitunnin yhteenveto</h2>
            <dl>
              <div><dt>Opetustilanteet</dt><dd>{seenCount}/{lesson.scenes.length}</dd></div>
              <div><dt>Tarkistettavat kysymykset</dt><dd>{answered}/{lesson.requiredQuestionIds.length}</dd></div>
              <div><dt>Opiskeluteot</dt><dd>{activities}/{lesson.requiredActivityIds.length}</dd></div>
              <div><dt>Kirjan vastaukset</dt><dd>{completedPractice.length}/{lesson.requiredPracticeIds.length}</dd></div>
            </dl>
            <p>Itsenäisiä oikein ratkaistuja harjoitustilanteita: {independentTeacherEvidence(session)}. Kyse on harjoitteluhavainnosta, ei virallisesta taitotasosta.</p>
            {session.completedAt ? <div className="los-teacher-finished"><CheckCircle2 size={20}/> Oppitunti käsitelty {new Date(session.completedAt).toLocaleDateString("fi-FI")}.</div> : <>
              <button type="button" className="los-teacher-submit" disabled={!canFinish}
                onClick={() => record(current => finishTeacherSession(current,lesson,draft.practiceAnswers,now()))}>
                <CheckCircle2 size={18}/> Merkitse oppitunti käsitellyksi
              </button>
              {!canFinish && <p className="los-teacher-remaining" role="status">Jäljellä: {missing.scenes} opetustilannetta, {missing.questions} kysymystä, {missing.activities} omaa harjoitusta ja {missing.practice} kirjan vastausta. Voit palata kohtiin sisällysluettelosta.</p>}
            </>}
          </section>}
          <div className="los-teacher-help">
            <button type="button" aria-expanded={helpOpen} onClick={() => setHelpOpen(v=>!v)}><CircleHelp size={18}/> En ymmärrä / Lisäselitykset</button>
            {helpOpen && <div className="los-teacher-help-items">
              {scene.help?.length ? scene.help.map(item => <details key={item.title}>
                <summary>{item.title}</summary><p>{item.body}</p>
              </details>) : <p>Voit palata aiempaan opetustilanteeseen tai avata vastaavan kohdan kirjasta. Tähän kohtaan ei ole vielä erillistä hyväksyttyä lisäselitystä.</p>}
            </div>}
          </div>
        </article>
        <footer className="los-teacher-footer">
          <button type="button" disabled={index===0} onClick={() => go(lesson.scenes[index-1]!.id)}><ChevronLeft size={18}/> Edellinen</button>
          <span role="status">{saved?"Tallennettu paikallisesti":"Tallennus epäonnistui. Älä sulje oppituntia."}</span>
          <button type="button" disabled={index===lesson.scenes.length-1} onClick={() => go(lesson.scenes[index+1]!.id)}>Seuraava <ChevronRight size={18}/></button>
        </footer>
        <div className="los-teacher-disclaimer">L004-opetussisältö on esikatselu: kielentarkistus ja mahdolliset ihmisäänitteet ovat vielä kesken. Ei tekoälyä.</div>
      </main>
    </div>
  </div>;
}
