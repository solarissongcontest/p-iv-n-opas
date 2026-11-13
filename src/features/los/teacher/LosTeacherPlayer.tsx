import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronLeft, ChevronRight, HelpCircle, RotateCcw } from "lucide-react";
import { readCachedDeviceUser } from "@/lib/deviceSession";
import { useLosChapterDraft } from "../studyState.ts";
import {
  emptyTeacherSession, markTeacherHelp, confirmTeacherActivity,
  finishTeacherSession, independentTeacherEvidence, moveTeacherScene, revealTeacherSolution,
  setTeacherAnswerDraft, submitTeacherAnswer, teacherCanFinish, teacherLatestAttempt,
  teacherWrongFeedback, type TeacherScene, type TeacherSession,
} from "./engine.ts";
import { getLosTeacherLesson } from "./lessonL004.ts";
import { validateTeacherLesson } from "./validateContent.ts";
import "../los-book.css";
import "./teacher.css";

const stamp = () => new Date().toISOString();
const bookUrl = (lessonId: string, chapterId: string, section: string) =>
  "/los?lessonReturn=" + encodeURIComponent(lessonId) + "#/1/" + chapterId + "/" + section;

function SceneQuestion({ scene, session, submit, saveDraft, requestHint, reveal }: {
  scene: TeacherScene;
  session: TeacherSession;
  submit: (value: string) => void;
  saveDraft: (value: string) => void;
  requestHint: () => void;
  reveal: () => void;
}) {
  const q = scene.question;
  if (!q) return null;
  const latest = teacherLatestAttempt(session, scene.id);
  const attempts = session.attempts.filter(item => item.sceneId === scene.id);
  const succeeded = attempts.some(item => item.correct);
  const helped = session.helpedIds.includes(scene.id);
  const solutionVisible = session.revealedIds.includes(scene.id);
  const drafted = session.draftAnswers[scene.id] ?? "";
  const solution = q.type === "choice"
    ? q.options?.find(opt => opt.id === q.correctOption)?.label ?? ""
    : q.accepted?.[0] ?? "";
  return <div className="los-teacher-question">
    <h3>{q.prompt}</h3>
    {q.type === "choice" ? <div className="los-teacher-options" role="group" aria-label={q.prompt}>
      {q.options?.map(option => <button key={option.id} type="button"
        className={"los-teacher-option" + (latest?.answer === option.id ? " is-selected" : "")}
        disabled={succeeded || Boolean(session.completedAt)} onClick={() => submit(option.id)}>
        <span className="los-teacher-option-letter">{option.id.toUpperCase()}</span>
        <span lang="de">{option.label}</span>
        {latest?.answer === option.id && latest.correct && <Check size={18} aria-hidden="true" />}
      </button>)}
    </div> : <form className="los-teacher-form" onSubmit={event => {
      event.preventDefault();
      if (drafted.trim() && !succeeded) submit(drafted);
    }}>
      <label htmlFor="los-teacher-answer">Vastauksesi saksaksi</label>
      <div className="los-teacher-input-row">
        <input id="los-teacher-answer" lang="de" autoComplete="off" spellCheck={false}
          value={drafted} maxLength={500} disabled={succeeded || Boolean(session.completedAt)}
          onChange={event => saveDraft(event.target.value)}
          placeholder="Kirjoita saksaksi..." />
        <button type="submit" disabled={!drafted.trim() || succeeded || Boolean(session.completedAt)}>Tarkista</button>
      </div>
    </form>}
    {latest && <div className={"los-teacher-feedback " + (latest.correct ? "is-right" : "is-wrong")}
      role="status" aria-live="polite">
      <strong>{latest.correct ? "Oikein" : "Katsotaan tätä vielä"}</strong>
      <p>{latest.correct ? q.success : teacherWrongFeedback(scene, latest.answer)}</p>
      {!latest.correct && attempts.length >= 2 && <p>{q.reteach}</p>}
      {latest.correct && !latest.independent &&
        <p>Tämä oli harjoittelussa oikein. Täysin itsenäinen näyttö arvioidaan erikseen.</p>}
    </div>}
    {!succeeded && !session.completedAt && <div className="los-teacher-question-tools">
      <button type="button" onClick={requestHint}><HelpCircle size={16}/> Tarvitsen vihjeen</button>
      {helped && <p className="los-teacher-hint">{q.hint}</p>}
      {attempts.length >= 2 && !solutionVisible && <button type="button" onClick={reveal}>
        <BookOpen size={16} /> Näytä mallivastaus
      </button>}
      {solutionVisible && <p className="los-teacher-solution">Mallivastaus: <strong lang="de">{solution}</strong></p>}
    </div>}
    {succeeded && <p className="los-teacher-ready"><CheckCircle2 size={17}/> Tehtävä tarkistettu. Voit jatkaa.</p>}
  </div>;
}
function TeacherBoard({ scene }: { scene: TeacherScene }) {
  const [visible, setVisible] = useState(1);
  const board = scene.board ?? [];
  return <div className="los-teacher-board">
    <div className="los-teacher-board-label">OPETUSTAULU · {Math.min(visible, board.length)}/{board.length}</div>
    <div className="los-teacher-board-grid">
      {board.slice(0, visible).map((item, index) => <div className="los-teacher-board-item" key={index}>
        <span>{item.label}</span>
        <strong lang="de">{item.german}</strong>
        <small>{item.meaning}</small>
      </div>)}
    </div>
    <div className="los-teacher-board-actions">
      <button type="button" disabled={visible <= 1} onClick={() => setVisible(n => n - 1)}>
        <ChevronLeft size={17}/> Edellinen
      </button>
      <button type="button" onClick={() => setVisible(n => n >= board.length ? 1 : n + 1)}>
        {visible < board.length ? "Näytä seuraava" : "Aloita alusta"}
        <RotateCcw size={16}/>
      </button>
      {visible < board.length && <button type="button" onClick={() => setVisible(board.length)}>Näytä kaikki</button>}
    </div>
  </div>;
}

export function LosTeacherPlayer({ lessonId }: { lessonId: string }) {
  const lesson = getLosTeacherLesson(lessonId);
  // Remount on chapter or lesson change so C01 state can never be painted or
  // written into a C02 session during the chapter transition.
  return <LosTeacherScreen key={`${lesson?.bookId ?? 1}:${lesson?.chapterId ?? "01"}:${lessonId}`} lessonId={lessonId}/>;
}
function LosTeacherScreen({ lessonId }: { lessonId: string }) {
  const lesson = getLosTeacherLesson(lessonId);
  const { draft, update, saved } = useLosChapterDraft(lesson?.bookId ?? 1, lesson?.chapterId ?? "01");
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  // Reject malformed manuscripts, not merely broken React props.
  const contentValid = lesson ? validateTeacherLesson(lesson).length === 0 : false;
  const session = lesson && contentValid
    ? draft.teacherSessions?.[lessonId] ?? emptyTeacherSession(lesson, stamp())
    : null;
  const scene = lesson?.scenes.find(item => item.id === session?.sceneId) ?? lesson?.scenes[0];
  const sceneIndex = lesson?.scenes.findIndex(item => item.id === scene?.id) ?? 0;
  const available = Boolean(session && lesson && teacherCanFinish(session, lesson, draft.practiceAnswers, draft.practiceChecked, draft));
  const completed = Boolean(session?.completedAt);

  useEffect(() => { setAuthorized(Boolean(readCachedDeviceUser())); }, []);
  useEffect(() => { setShowHelp(false); }, [scene?.id]);
  useEffect(() => {
    if (!lesson) return;
    document.title = lesson.title + " · LOS! Opetustila";
    return () => { document.title = "StudyOS"; };
  }, [lesson]);

  const persist = (transform: (current: TeacherSession) => TeacherSession) => {
    if (!lesson) return;
    update(current => {
      const old = current.teacherSessions?.[lessonId] ?? emptyTeacherSession(lesson, stamp());
      return {
        ...current,
        teacherSessions: { ...current.teacherSessions, [lessonId]: transform(old) },
      };
    });
  };
  const navigate = (target: string) => {
    if (!lesson || !scene) return;
    persist(old => {
      const now = stamp();
      const marked = moveTeacherScene(old, lesson, scene.id, now);
      return moveTeacherScene(marked, lesson, target, now);
    });
  };
  const submit = (answer: string) => {
    if (!lesson || !scene) return;
    persist(old => submitTeacherAnswer(old, lesson, scene.id, answer, stamp()));
  };
  const markHelp = () => {
    if (!scene) return;
    persist(old => markTeacherHelp(old, scene.id, stamp()));
  };
  const markActivity = (id: string) => {
    if (!lesson) return;
    persist(old => confirmTeacherActivity(old, lesson, id, stamp()));
  };
  const finish = () => {
    if (!lesson) return;
    update(current => {
      const now = stamp();
      const old = current.teacherSessions?.[lessonId] ?? emptyTeacherSession(lesson, now);
      const next = finishTeacherSession(old, lesson, current.practiceAnswers, now, current.practiceChecked, current);
      if (next === old) return current;
      // Teacher 2.0 completion is a distinct learning event. Never manufacture
      // legacy lesson steps or an exit answer that the student never submitted.
      return { ...current, teacherSessions: { ...current.teacherSessions, [lessonId]: next } };
    });
  };

    return <main id="main-content" className="los-app los-teacher-app">
    <header className="los-teacher-top">
      <a className="los-teacher-back" href="/los#/1/path"><ArrowLeft size={18}/> Opetuspolku</a>
      <div className="los-teacher-brand"><span className="los-teacher-logo">LOS!</span><span>Opetustila</span></div>
      <span className="los-teacher-book">LOS! 1 · SAB31</span>
    </header>
    {authorized === null ? <div className="los-teacher-status">Avataan oppituntia…</div> :
      !authorized ? <section className="los-teacher-status">
        <h1>Kirjaudu ensin Opintopäiväkirjaan</h1>
        <p>Opetustila käyttää samaa opiskelijakohtaista tallennusta kuin LOSin oppikirja.</p>
        <a href="/today">Avaa Opintopäiväkirja</a>
      </section> :
      !lesson || !session || !scene ? <section className="los-teacher-status">
        <h1>Oppitunnin opetusmateriaali ei ole vielä valmis</h1>
        <p>Teacher 2.0 on nyt käytössä oppitunneilla L001–L007. Muut oppitunnit toimivat edelleen nykyisessä Opetuspolussa.</p>
        <a href="/los#/1/path">Palaa Opetuspolkuun</a>
      </section> :
      <>
        <div className="los-teacher-progress" role="progressbar" aria-label="Oppitunnin opetustilanteet"
          aria-valuemin={0} aria-valuemax={lesson.scenes.length} aria-valuenow={sceneIndex + 1}>
          <span style={{ width: ((sceneIndex + 1) / lesson.scenes.length * 100) + "%" }}/>
        </div>
        <div className="los-teacher-layout">
          <aside className="los-teacher-sidebar">
            <p className="los-teacher-eyebrow">OPETUSPOLKU · {lesson.id}</p>
            <h1>{lesson.title}</h1>
            <p className="los-teacher-sidebar-copy">{lesson.objective}</p>
            <p className="los-teacher-small">{completed ? "Oppitunti suoritettu" :
              "Oppitunti " + (sceneIndex + 1) + "/" + lesson.scenes.length + " · noin " + lesson.estimatedMinutes + " min"}</p>
            <details className="los-teacher-outline" open>
              <summary>Oppitunnin sisältö</summary>
              <nav aria-label="Oppitunnin opetustilanteet">
                {lesson.scenes.map((item, i) => <button key={item.id} type="button"
                  aria-current={scene.id === item.id ? "step" : undefined}
                  className={scene.id === item.id ? "is-active" : ""}
                  onClick={() => navigate(item.id)}>
                  <span>{session.visitedIds.includes(item.id) ? <Check size={15}/> : String(i + 1)}</span>
                  <span>{item.title}</span>
                </button>)}
              </nav>
            </details>
          </aside>
          <article className="los-teacher-paper" key={scene.id}>
            <div className="los-teacher-scene-kicker">{scene.phase} · {sceneIndex + 1}/{lesson.scenes.length}</div>
            <h2>{scene.title}</h2>
            <div className="los-teacher-prose">
              {scene.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
            {scene.kind === "board" && <TeacherBoard scene={scene}/>}
            {scene.question && <SceneQuestion
              scene={scene} session={session}
              submit={submit}
              saveDraft={value => persist(old => setTeacherAnswerDraft(old, scene.id, value, stamp()))}
              requestHint={markHelp}
              reveal={() => persist(old => revealTeacherSolution(old, scene.id, stamp()))}
            />}
            {scene.bookLinks && <div className="los-teacher-book-links">
              {scene.bookLinks.map(link => <div key={link.section} className="los-teacher-book-link">
                <div><strong>{link.label}</strong><p>{link.instruction}</p></div>
                <a href={bookUrl(lessonId, link.chapterId, link.section)} target="_blank" rel="noopener noreferrer">
                  <BookOpen size={17}/> Avaa kirjassa <ArrowRight size={16}/>
                </a>
              </div>)}
              <p className="los-teacher-small">Kirja avautuu erilliseen välilehteen. Kun palaat, oppitunti jatkuu samasta kohdasta. Pelkkä avaaminen ei ole suoritusmerkintä.</p>
              {lesson.requiredChapterEvidence?.map(kind => {
                const done = kind === "application-written" ? Boolean(draft.applicationDraft.trim()) :
                  kind === "test-submitted" ? Boolean(draft.testSubmittedAt) :
                  kind === "self-assessment" ? Boolean(draft.selfAssessment.trim()) : false;
                const label = kind === "application-written" ? "Oma kirjan soveltamisteksti" :
                  kind === "test-submitted" ? "C" + lesson.chapterId + "-kappaletesti palautettu" : "Oma itsearviointi kirjoitettu";
                return <p key={kind} className="los-teacher-evidence">
                  {done ? <CheckCircle2 size={17}/> : <HelpCircle size={17}/>}
                  {label}: {done ? "Tallennettu" : "Puuttuu vielä kirjan suorituksesta"}
                </p>;
              })}
              {[...lesson.requiredPracticeIds,...(lesson.requiredCheckedIds??[])].map(id => {
                const answered=Boolean(draft.practiceAnswers[id]?.trim());
                const mustCheck=Boolean(lesson.requiredCheckedIds?.includes(id));
                const checked=!mustCheck||draft.practiceChecked.includes(id);
                return <p key={id} className="los-teacher-evidence">
                  {answered&&checked?<CheckCircle2 size={17}/>:<HelpCircle size={17}/>}
                  {id}: {answered&&checked?"Vastaus tallennettu ja tarvittaessa tarkistettu":
                    !answered?"Vastaus vielä puuttuu":"Vastaus on tallennettu, mutta se pitää vielä tarkistaa kirjassa"}
                </p>;
              })}
            </div>}
            {scene.reflection && <div className="los-teacher-reflection">
              <label htmlFor={"los-teacher-reflection-" + scene.id}>{scene.reflection.prompt}</label>
              <textarea id={"los-teacher-reflection-" + scene.id}
                rows={4} maxLength={500}
                placeholder={scene.reflection.placeholder}
                value={session.draftAnswers[scene.id] ?? ""}
                disabled={completed}
                onChange={event => persist(old => setTeacherAnswerDraft(old, scene.id, event.target.value, stamp()))}
              />
              <small role="status">
                {(session.draftAnswers[scene.id]?.trim().length ?? 0) >= scene.reflection.minLength
                  ? "Tavoite tallennettu. Voit vahvistaa sen alla."
                  : "Kirjoita vähintään " + scene.reflection.minLength + " merkkiä. Tekstisi tallentuu automaattisesti."}
              </small>
            </div>}
            {scene.activityId && <div className="los-teacher-activity">
              <button type="button"
                disabled={session.activityIds.includes(scene.activityId) || completed ||
                  Boolean(scene.reflection && (session.draftAnswers[scene.id]?.trim().length ?? 0) < scene.reflection.minLength)}
                onClick={() => markActivity(scene.activityId!)}>
                {session.activityIds.includes(scene.activityId) ? <CheckCircle2 size={18}/> : <Check size={18}/>}
                {session.activityIds.includes(scene.activityId) ? "Harjoittelu vahvistettu" : scene.activityLabel}
              </button>
              <p>Tämä on oma vahvistuksesi, ei automaattinen kielitaidon arvio.</p>
            </div>}
            <div className="los-teacher-help">
              <button type="button" aria-expanded={showHelp} onClick={() => { setShowHelp(v => !v); markHelp(); }}>
                <HelpCircle size={18}/> En ymmärrä / haluan lisäselityksen
              </button>
              {showHelp && <div className="los-teacher-help-entries">
                {scene.help?.length ? scene.help.map(entry => <section key={entry.title}>
                  <h3>{entry.title}</h3><p>{entry.body}</p>
                </section>) : <section>
                  <h3>Kokeile tätä</h3>
                  <p>{scene.question?.reteach ??
                    (scene.kind === "board" ? "Käy opetustaulun vaiheet läpi yksi kerrallaan. Vertaa saksankielistä ilmausta sen suomenkieliseen merkitykseen." :
                      scene.kind === "book" ? "Avaa oppikirjan sanasto ja harjoitukset erilliseen välilehteen. Palaa oppitunnille, kun olet tutustunut materiaaliin." :
                      "Palaa tarvittaessa edelliseen opetustilanteeseen sisällysluettelosta ja kertaa siinä annettu esimerkki. Voit edetä omassa tahdissasi.")}</p>
                </section>}
              </div>}
            </div>
            {scene.kind === "summary" && <section className="los-teacher-summary">
              <h3>Oppitunnin tilanne</h3>
              <p>Itsenäisesti oikein ratkaistuja eri tarkistuksia: <strong>{independentTeacherEvidence(session, lesson)}</strong>. Tämä luku ei ole kielitaitoprosentti.</p>
              <p>{available ? "Kaikki sovitut opiskeluteot on tallennettu." :
                "Vielä puuttuu yksi tai useampi opetustilanne, harjoitus, kirjan vastaus tai oma harjoitteluvahvistus."}</p>
              {!completed ? <button type="button" className="los-teacher-primary"
                disabled={!available} onClick={finish}>Merkitse oppitunti läpikäydyksi</button> :
                <p className="los-teacher-done"><CheckCircle2 size={19}/> Oppitunti merkitty suoritetuksi. Osaamista seurataan erikseen.</p>}
            </section>}
            <div className="los-teacher-navigation">
              <button type="button" disabled={sceneIndex === 0}
                onClick={() => navigate(lesson.scenes[sceneIndex - 1]!.id)}>
                <ChevronLeft size={18}/> Edellinen
              </button>
              {sceneIndex < lesson.scenes.length - 1 &&
                <button type="button" className="los-teacher-primary"
                  onClick={() => navigate(lesson.scenes[sceneIndex + 1]!.id)}>
                  Seuraava <ChevronRight size={18}/>
                </button>}
              {sceneIndex === lesson.scenes.length - 1 && <a href="/los#/1/path">Takaisin Opetuspolkuun <ArrowRight size={17}/></a>}
            </div>
            <p className={"los-teacher-save" + (!saved ? " is-error" : "")} role="status">
              {saved ? "Opiskelutiedot tallentuvat tämän laitteen LOS-varmuuskopioon." :
                "Tallennus epäonnistui. Älä sulje näkymää ennen kuin olet varmistanut tiedot."}
            </p>
          </article>
        </div>
      </>}
  </main>;
}
