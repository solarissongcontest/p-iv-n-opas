import { TeacherTimeCalendar } from "./TeacherTimeCalendar.tsx";
import { Los1ChapterImage } from "../Los1ChapterImage.tsx";
import { LOS1_TEXT_B_SOURCES } from "../content/los1TextBAdditional.ts";
import { getLosOpenDialogue } from "../content/los1OpenDialogues.ts";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Check, CheckCircle2, HelpCircle } from "lucide-react";
import { readCachedDeviceUser } from "@/lib/deviceSession";
import { useLosChapterDraft, prepareLosTeacherVersionRestart } from "../studyState.ts";
import {
  emptyTeacherSession, markTeacherHelp, confirmTeacherActivity, teacherChapterAssessmentStatus, teacherMidtermAssessmentStatus,
  finishTeacherSession, independentTeacherEvidence, moveTeacherScene, revealTeacherSolution,
  setTeacherAnswerDraft, submitTeacherAnswer, toggleTeacherPause, teacherCanFinish, teacherCompletionBlockers, teacherNextIncompleteSceneId,
  teacherBuiltNumberCount, recoverTeacherSession, teacherSessionNeedsReview, type TeacherScene, type TeacherSession, isCorrectCalendarEntry,
} from "./engine.ts";
import { getLosTeacherLesson } from "./lessonRegistry.ts";
import { LosTeacherNumberBuilder } from "./LosTeacherNumberBuilder.tsx";
import { LosTeacherGreetingMedia } from "./LosTeacherGreetingMedia.tsx";
import { composeLosC10Dialogues, storeLosC10Dialogues } from "./c10ApplicationBridge.ts";
import { validateTeacherLesson } from "./validateContent.ts";
import { teacherExternalStatus } from "./externalEvidence.ts";
import { LosMasterySummary } from "../LosMasterySummary.tsx";
import {TeacherTopbar,TeacherProgressBar,TeacherSceneOutline,TeacherSceneNavigation,TeacherSceneQuestion,TeacherBoard} from "./Teacher2SharedUI.tsx";
import "../los-book.css";
import "./teacher.css";

const stamp = () => new Date().toISOString();
const bookUrl = (lessonId: string, bookId: number, chapterId: string, section: string) =>
  "/los?lessonReturn=" + encodeURIComponent(lessonId) + "#/" + bookId +
  (["review-ii","final","summary","midterm","review"].includes(section) ? "/" + section : "/" + chapterId + "/" + section);

function TeacherSource({ scene }: { scene: TeacherScene }) {
  const original = scene.sourceChapterId ? getLosOpenDialogue(scene.sourceChapterId) : undefined;
  const textB = scene.textBChapterId === "09" ? LOS1_TEXT_B_SOURCES["09"] : undefined;
  if (!original && !textB) return null;
  const lines = original?.originalLines ?? textB?.lines ?? [];
  return <section className="los-teacher-original" aria-label="Koko alkuperäinen lähdeteksti">
    <p className="los-teacher-original-label">
      {original ? original.sourceId + " · " + original.title : textB?.sourceId + " · " + textB?.title}
    </p>
    {lines.map(line=><div key={line.id} className="los-teacher-source-line">
      <strong>{line.speaker}</strong>
      <div><p lang="de">{line.text}</p><small>{line.meaning}</small></div>
    </div>)}
    <p className="los-teacher-original-credit">
      {original ? <>Wikibooks · versio {original.revision} ·
        <a href={original.licenseUrl ?? "https://creativecommons.org/licenses/by-sa/4.0/"} target="_blank" rel="noopener noreferrer">{original.licenseCode ?? "CC BY-SA 4.0"} -lisenssi</a> ·
        <a href={original.sourceUrl} target="_blank" rel="noopener noreferrer">Alkuperäinen teksti ja tekijähistoria</a></>
      : <>{textB?.attribution.author} ·
        <a href={textB?.attribution.licenseUrl} target="_blank" rel="noopener noreferrer">{textB?.attribution.license} -lisenssi</a> ·
        <a href={textB?.attribution.url} target="_blank" rel="noopener noreferrer">Alkuperäinen ihmisen äänittämä sanalista</a></>}
    </p>
    {textB && <p className="los-teacher-source-warning">Lähteen äänen laitetoistoa ei ole vahvistettu.
      Tämä näkymä näyttää aidon transkription. Tekstin lukeminen ei merkitse kuuntelua suoritetuksi.
      <a href="/los?lessonReturn=L049#/1/09/text-b" target="_blank" rel="noopener noreferrer">Avaa alkuperäinen Text B digikirjassa</a>
    </p>}
  </section>;
}

// Force a fresh chapter-scoped draft on lesson or chapter changes. This keeps
// C01/C02/C03 data isolated even during same-route navigation without a reload.
export function LosTeacherPlayer({ lessonId }: { lessonId: string }) {
  const lesson = getLosTeacherLesson(lessonId);
  return <LosTeacherScreen key={`${lesson?.bookId ?? 1}:${lesson?.chapterId ?? "01"}:${lessonId}`} lessonId={lessonId}/>;
}
function LosTeacherScreen({ lessonId }: { lessonId: string }) {
  const lesson = getLosTeacherLesson(lessonId);
  const { draft, update, saved } = useLosChapterDraft(lesson?.bookId ?? 1, lesson?.chapterId ?? "01");
  // Existing draft hooks, read-only for skill evidence; no copy of answers or exam history.
  const evidence01=useLosChapterDraft(1,"01").draft;
  const evidence02=useLosChapterDraft(1,"02").draft;
  const evidence03=useLosChapterDraft(1,"03").draft;
  const evidence04=useLosChapterDraft(1,"04").draft;
  const evidence05=useLosChapterDraft(1,"05").draft;
  const evidence06=useLosChapterDraft(1,"06").draft;
  const evidence07=useLosChapterDraft(1,"07").draft;
  const evidence08=useLosChapterDraft(1,"08").draft;
  const evidence09=useLosChapterDraft(1,"09").draft;
  const evidence10=useLosChapterDraft(1,"10").draft;
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [helpSelection, setHelpSelection] = useState<string | null>(null);
  const [replayKey, setReplayKey] = useState(0);
  const [outlineOpen,setOutlineOpen]=useState(false);
  useEffect(()=>{
    const media=window.matchMedia("(min-width: 821px)");
    const onSize=()=>setOutlineOpen(media.matches);
    onSize();
    media.addEventListener("change",onSize);
    return ()=>media.removeEventListener("change",onSize);
  },[]);
  // Reject malformed manuscripts, not merely broken React props.
  const contentValid = lesson ? validateTeacherLesson(lesson).length === 0 : false;
  const storedSession = lesson && contentValid
    ? draft.teacherSessions?.[lessonId] ?? emptyTeacherSession(lesson, stamp())
    : null;
  const session = lesson && storedSession ? recoverTeacherSession(storedSession, lesson) : null;
  const recoveredNavigation = Boolean(storedSession && session && storedSession.sceneId !== session.sceneId);
  const olderContentVersion = Boolean(lesson && session && teacherSessionNeedsReview(session,lesson));
  const archivedVersions = draft.teacherSessionHistory?.[lessonId] ?? [];
  const canArchive = Boolean(lesson && session && olderContentVersion && saved &&
    prepareLosTeacherVersionRestart(draft,lesson,stamp()));
  const scene = lesson?.scenes.find(item => item.id === session?.sceneId) ?? lesson?.scenes[0];
  const sceneIndex = lesson?.scenes.findIndex(item => item.id === scene?.id) ?? 0;
  const external = lesson ? teacherExternalStatus(lesson,draft,{
    "01":evidence01,"02":evidence02,"03":evidence03,"04":evidence04,"05":evidence05,
    "06":evidence06,"07":evidence07,"08":evidence08,"09":evidence09,"10":evidence10,
  }) : {ready:true,lines:[]};
  const available = Boolean(!olderContentVersion && saved && session && lesson && teacherCanFinish(session, lesson, draft.practiceAnswers, draft.practiceChecked, draft, external.ready));
  const blockers = lesson && session ? teacherCompletionBlockers(session, lesson, draft.practiceAnswers, draft.practiceChecked, draft, external.ready) : [];
  const completed = Boolean(session?.completedAt && !olderContentVersion);
  const isPaused = Boolean(session?.paused);
  const nextIncompleteSceneId = lesson && session ? teacherNextIncompleteSceneId(session, lesson, draft.practiceAnswers, draft.practiceChecked) : undefined;
  const c10Dialogues = lesson?.id === "L054" ? composeLosC10Dialogues(
    session?.draftAnswers["dialogue-du"] ?? "", session?.draftAnswers["dialogue-sie"] ?? "") : null;

  useEffect(() => { setAuthorized(Boolean(readCachedDeviceUser())); }, []);
  useEffect(() => { setShowHelp(false); setHelpSelection(null); }, [scene?.id]);
  useEffect(() => {
    if (!lesson) return;
    document.title = lesson.title + " · LOS! Opetustila";
    return () => { document.title = "StudyOS"; };
  }, [lesson]);

  const persist = (transform: (current: TeacherSession) => TeacherSession) => {
    if (!lesson || olderContentVersion) return;
    update(current => {
      const old = recoverTeacherSession(current.teacherSessions?.[lessonId] ?? emptyTeacherSession(lesson, stamp()), lesson);
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
  const togglePause = () => persist(old => toggleTeacherPause(old, stamp()));
  const markActivity = (id: string) => {
    if (!lesson) return;
    persist(old => confirmTeacherActivity(old, lesson, id, stamp()));
  };
  const transferC10Dialogues = () => {
    if (lesson?.id !== "L054" || !saved || !c10Dialogues) return;
    update(current => storeLosC10Dialogues(current, c10Dialogues));
  };
  const finish = () => {
    if (!lesson || !saved || olderContentVersion) return;
    update(current => {
      const now = stamp();
      const old = recoverTeacherSession(current.teacherSessions?.[lessonId] ?? emptyTeacherSession(lesson, now), lesson);
      const next = finishTeacherSession(old, lesson, current.practiceAnswers, now, current.practiceChecked, current, external.ready);
      if (next === old) return current;
      // Teacher 2.0 completion is a distinct learning event. Never manufacture
      // legacy lesson steps or an exit answer that the student never submitted.
      return { ...current, teacherSessions: { ...current.teacherSessions, [lessonId]: next } };
    });
  };

  const restartUpdatedLesson=()=>{
    if(!lesson || !session || !saved || !olderContentVersion)return;
    update(current=>prepareLosTeacherVersionRestart(current,lesson,stamp())??current);
  };

    return <main id="main-content" className="los-app los-teacher-app">
    <TeacherTopbar brand="LOS!" context="LOS! 1 · SAB31" href={"/los#/" + (lesson?.bookId ?? 1) + "/path"}/>
    {authorized === null ? <div className="los-teacher-status">Avataan oppituntia…</div> :
      !authorized ? <section className="los-teacher-status">
        <h1>Kirjaudu ensin Opintopäiväkirjaan</h1>
        <p>Opetustila käyttää samaa opiskelijakohtaista tallennusta kuin LOSin oppikirja.</p>
        <a href="/today">Avaa Opintopäiväkirja</a>
      </section> :
      !lesson || !session || !scene ? <section className="los-teacher-status">
        <h1>Oppitunnin opetusmateriaali ei ole vielä valmis</h1>
        <p>Teacher 2.0 on nyt käytössä oppitunneilla L001–L060. Muut oppitunnit toimivat edelleen nykyisessä Opetuspolussa.</p>
        <a href={"/los#/" + (lesson?.bookId ?? 1) + "/path"}>Palaa Opetuspolkuun</a>
      </section> :
      <>
        <TeacherProgressBar value={sceneIndex+1} max={lesson.scenes.length}/>
        <div className="los-teacher-layout">
          <aside className="los-teacher-sidebar">
            <p className="los-teacher-eyebrow">OPETUSPOLKU · {lesson.id}</p>
            <h1>{lesson.title}</h1>
            <p className="los-teacher-sidebar-copy">{lesson.objective}</p>
            <p className="los-teacher-small">{completed ? "Oppitunti suoritettu" :
              "Oppitunti " + (sceneIndex + 1) + "/" + lesson.scenes.length + " · suunnitteluarvio " + lesson.estimatedMinutes + " min (ei mitattu)"}</p>
            {!completed && !olderContentVersion && <button className="los-teacher-pause" type="button" onClick={togglePause}>
              {session.paused ? "Jatka opetusta" : "Keskeytä oppitunti"}
            </button>}
            <TeacherSceneOutline scenes={lesson.scenes} currentId={scene.id}
              visitedIds={session.visitedIds} disabled={olderContentVersion}
              onSelect={navigate} open={outlineOpen} onToggle={setOutlineOpen}/>
            {archivedVersions.length>0 && <details className="los-teacher-session-history">
              <summary>Aiemmat oppituntiversiot ({archivedVersions.length})</summary>
              <p>Vanhoja vastauksia ei lasketa nykyisen oppitunnin osaamisnäytöiksi.</p>
              {archivedVersions.map((previous,index)=><details key={index}>
                <summary>Versio {previous.contentVersion} · {previous.completedAt?"suoritettu":"keskeneräinen"}</summary>
                <p>Viimeksi tallennettu: {previous.updatedAt}. Osaamispisteitä ei arvioida uudelleen.</p>
                <p>Vastausyrityksiä {previous.attempts.length}, harjoittelumerkintöjä {previous.activityIds.length}.</p>
                {previous.attempts.length>0 && <ul>
                  {previous.attempts.map((attempt,i)=><li key={i}>
                    {attempt.sceneId}: {attempt.answer} · {attempt.correct?"oikein":"väärin"}
                  </li>)}
                </ul>}
                {Object.keys(previous.draftAnswers).length>0 && <details>
                  <summary>Vanhat kirjoitusluonnokset</summary>
                  <ul>{Object.entries(previous.draftAnswers).map(([id,value])=>
                    <li key={id}>{id}: {value}</li>)}</ul>
                </details>}
              </details>)}
            </details>}
          </aside>
          {olderContentVersion ? <section className="los-teacher-paused los-teacher-version-review" role="status">
            <h2>Oppitunnin sisältö on päivittynyt</h2>
            <p>Tämä tallenne on tehty vanhan tai tunnistamattoman käsikirjoitusversion perusteella.
              Vanhat vastaukset, yritykset ja mahdollinen loppumerkintä pysyvät historiassa.</p>
            {recoveredNavigation && <p>Aiempi opetustilanne ei enää ole käytössä nykyisessä käsikirjoituksessa.</p>}
            <p>Jotta muuttuneista tehtävistä ei synny virheellisiä osaamismerkintöjä,
              aloita päivitetty oppitunti uutena suorituksena. Tämä ei poista vanhaa työtä.</p>
            {session.completedAt && <p>Aiempi suoritusmerkintä säilyy historiallisena: {session.completedAt}.</p>}
            <button type="button" onClick={restartUpdatedLesson} disabled={!canArchive}>
              Arkistoi vanha suoritus ja aloita päivitetty oppitunti
            </button>
            {!canArchive && <p>Uuden version aloittaminen ei onnistunut turvallisesti.
              Varmista ensin tallennus ja vie LOS! 1:n varmuuskopio kirjan Liitteet-sivulta.
              Vanhaa suoritusta ei poisteta.</p>}
            <p>Aiempia tallennettuja versioita: {archivedVersions.length}.</p>
          </section> : isPaused ? <section className="los-teacher-paused" role="status">
            <h2>Oppitunti keskeytetty</h2><p>Opetustilanne ja vastaukset ovat tallessa. Jatka omassa tahdissasi.</p>
            <button type="button" onClick={togglePause}>Jatka opetusta</button>
          </section> : <article className="los-teacher-paper" key={scene.id + "-" + replayKey}>
            <div className="los-teacher-scene-kicker">{scene.phase} · {sceneIndex + 1}/{lesson.scenes.length}</div>
            <h2>{scene.title}</h2>
            {(recoveredNavigation || olderContentVersion) && <p className="los-teacher-hint" role="status">
              Oppitunnin käsikirjoitusta on päivitetty. {recoveredNavigation
                ? "Aiempi opetustilanne ei enää ole käytössä. Jatkaminen ohjataan seuraavaan keskeneräiseen vaiheeseen. "
                : ""}
              Aiemmat vastaukset ja luonnokset säilyvät tallessa. Sovellus ei kuitenkaan vertaa vanhoja vastauksia
              uuden käsikirjoituksen mahdollisesti muuttuneisiin tehtävänantoihin.
              {completed ? "Oppitunnin aiempi loppumerkintä säilyy historiassa. Kertaa muuttuneet kohdat tarvittaessa." :
                "Käy päivitetyt kohdat läpi ennen oppitunnin loppumerkintää."}
            </p>}
            <div className="los-teacher-prose">
              {scene.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
            {scene.kind === "board" && <TeacherBoard key={scene.id} scene={scene}/>}
            {lesson.id === "L005" && (scene.id === "source-list" || scene.id === "audio-choice") &&
              <LosTeacherGreetingMedia/>}
            {scene.numberBuilder && <LosTeacherNumberBuilder
              value={session.draftAnswers[scene.id]}
              historyCount={teacherBuiltNumberCount(session, scene.id)}
              onChange={value => persist(old => {
                const now = stamp();
                const key = scene.id + "-history";
                const history = (old.draftAnswers[key] ?? "").split(",").filter(Boolean);
                if (!history.includes(String(value))) history.push(String(value));
                const withValue = setTeacherAnswerDraft(old, scene.id, String(value), now);
                return setTeacherAnswerDraft(withValue, key, history.join(","), now);
              })}
            />}
            {scene.kind === "form" && scene.form && <section className="los-teacher-form-fields" aria-label="Kirjallinen harjoituslomake">
              <p className="los-teacher-small"><strong>Kirjallinen harjoituslomake.</strong> Kentät eivät perustu varmentamattomaan kuunteluun, eikä niistä lasketa kuuntelupisteitä.</p>
              {scene.form.map(field => {
                const key = scene.id + "." + field.id;
                return <div className="los-teacher-form-field" key={key}>
                  <label htmlFor={"los-teacher-form-" + key}>{field.label}</label>
                  <input id={"los-teacher-form-" + key} type="text" autoComplete="off"
                    value={session.draftAnswers[key] ?? ""} maxLength={100}
                    placeholder={field.placeholder} disabled={completed}
                    onChange={event => persist(old => setTeacherAnswerDraft(old, key, event.target.value, stamp()))}/>
                </div>;
              })}
              <details className="los-teacher-form-model">
                <summary>Näytä mallilomake oman yrityksen jälkeen</summary>
                {scene.form.map(field => <p key={field.id}><strong>{field.label}:</strong> {field.sampleAnswer}</p>)}
                <p>Vertaa kirjoitusasua itse. Tämä ei ole koneellinen ääntämis- tai kuunteluarvio.</p>
              </details>
            </section>}
            {scene.chapterPhoto && <Los1ChapterImage chapterId={lesson.chapterId} variant="learning"/>}
            {(scene.sourceChapterId || scene.textBChapterId) && <TeacherSource scene={scene}/>}
            {scene.calendar && <TeacherTimeCalendar scene={scene}
              value={session.draftAnswers[scene.id] ?? ""}
              disabled={completed}
              onChange={value => persist(old => setTeacherAnswerDraft(old, scene.id, value, stamp()))}
            />}
            {scene.question && <TeacherSceneQuestion
              scene={scene} session={session}
              submit={submit}
              saveDraft={value => persist(old => setTeacherAnswerDraft(old, scene.id, value, stamp()))}
              requestHint={markHelp}
              reveal={() => persist(old => revealTeacherSolution(old, scene.id, stamp()))}
            />}
            {scene.bookLinks && <div className="los-teacher-book-links">
              {scene.bookLinks.map(link => <div key={link.chapterId + "-" + link.section + "-" + link.label} className="los-teacher-book-link">
                <div><strong>{link.label}</strong><p>{link.instruction}</p></div>
                <a href={bookUrl(lessonId, lesson.bookId, link.chapterId, link.section)} target="_blank" rel="noopener noreferrer">
                  <BookOpen size={17}/> Avaa kirjassa <ArrowRight size={16}/>
                </a>
              </div>)}
              <p className="los-teacher-small">Kirja avautuu erilliseen välilehteen. Kun palaat, oppitunti jatkuu samasta kohdasta. Pelkkä avaaminen ei ole suoritusmerkintä.</p>
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
            {lesson.id === "L054" && (scene.id === "dialogue-sie" || scene.kind === "summary") &&
              <section className="los-teacher-activity" aria-label="Siirrä kaksi keskustelua oppikirjaan">
                <h3>Tallenna keskustelut myös oppikirjan sovellustehtävään</h3>
                <p>Molemmat keskustelut säilyvät tässä oppitunnissa. Voit siirtää ne yhdellä painalluksella C10:n
                  nykyiseen Käytä saksaa -luonnokseen. Siirto ei tarkista kielioppia eikä korvaa jo kirjoittamaasi tekstiä.</p>
                <button type="button" onClick={transferC10Dialogues}
                  disabled={!c10Dialogues || Boolean(draft.applicationDraft.trim()) || !saved}>
                  <BookOpen size={17}/> Siirrä kaksi keskustelua Käytä saksaa -sivulle
                </button>
                {!c10Dialogues && <p>Kirjoita ensin molemmat keskustelut, vähintään 90 merkkiä kumpaankin.</p>}
                {draft.applicationDraft.trim() && <p role="status">Kirjan sovellusluonnoksessa on jo tekstiä.
                  Sitä ei korvata. Avaa sivu jatkaaksesi tai täydentääksesi vastausta.</p>}
                <a href={bookUrl(lessonId, lesson.bookId, "10", "apply")} target="_blank" rel="noopener noreferrer">
                  Avaa C10:n Käytä saksaa -sivu <ArrowRight size={16}/>
                </a>
                <p>Lisää kirjassa vielä erikseen neljä lausetta kolmannesta henkilöstä.
                  Tarkista molempien keskustelujen 6–8 puheenvuoroa ja neljä esittelylausetta itse.</p>
              </section>}
            {scene.activityId && <div className="los-teacher-activity">
              <button type="button"
                disabled={session.activityIds.includes(scene.activityId) || completed ||
                  Boolean(scene.reflection && (session.draftAnswers[scene.id]?.trim().length ?? 0) < scene.reflection.minLength) ||
                  Boolean(scene.numberBuilder && teacherBuiltNumberCount(session, scene.id) < 4) ||
                  Boolean(scene.form && scene.form.some(field => !(session.draftAnswers[scene.id + "." + field.id]?.trim()))) ||
                  Boolean(scene.calendar && !isCorrectCalendarEntry(scene, session.draftAnswers[scene.id] ?? ""))}
                onClick={() => markActivity(scene.activityId!)}>
                {session.activityIds.includes(scene.activityId) ? <CheckCircle2 size={18}/> : <Check size={18}/>}
                {session.activityIds.includes(scene.activityId) ? "Harjoittelu vahvistettu" : scene.activityLabel}
              </button>
              <p>Tämä on oma vahvistuksesi, ei automaattinen kielitaidon arvio.</p>
            </div>}
            {lesson.id !== "L059" && <div className="los-teacher-help">
              <button type="button" aria-expanded={showHelp} onClick={() => { setShowHelp(v => !v); setHelpSelection(null); markHelp(); }}>
                <HelpCircle size={18}/> En ymmärrä / haluan lisäselityksen
              </button>
              {showHelp && <div className="los-teacher-help-entries">
                {scene.help?.length ? <>
                  <p>Valitse, mikä selitys auttaisi sinua juuri nyt:</p>
                  <div className="los-teacher-help-choices" role="group" aria-label="Valitse lisäselityksen tapa">
                    {scene.help.map(entry => <button key={entry.title} type="button"
                      aria-pressed={helpSelection === entry.title}
                      onClick={() => setHelpSelection(entry.title)}>
                      {entry.title}
                    </button>)}
                  </div>
                  {scene.help.filter(entry => entry.title === helpSelection).map(entry => <section key={entry.title}>
                    <h3>{entry.title}</h3><p>{entry.body}</p>
                  </section>)}
                </> : <section>
                  <h3>Kokeile tätä</h3>
                  <p>{scene.question?.reteach ??
                    (scene.kind === "board" ? "Käy opetustaulun vaiheet läpi yksi kerrallaan. Vertaa saksankielistä ilmausta sen suomenkieliseen merkitykseen." :
                      scene.kind === "book" ? "Avaa oppikirjan sanasto ja harjoitukset erilliseen välilehteen. Palaa oppitunnille, kun olet tutustunut materiaaliin." :
                      "Palaa tarvittaessa edelliseen opetustilanteeseen sisällysluettelosta ja kertaa siinä annettu esimerkki. Voit edetä omassa tahdissasi.")}</p>
                </section>}
              </div>}
            </div>}
            {lesson.chapterAssessment && (scene.kind === "book" || scene.kind === "summary") && <section className="los-teacher-assessment-status" aria-label="Kappaletestin ja itsearvioinnin tilanne">
              <h3>Kirjan todellinen suoritustilanne</h3>
              {(() => {
                const progress = teacherChapterAssessmentStatus(lesson, draft);
                return <>
                  <p>Kappaletesti: {progress.answered}/{progress.expected} vastattu · {progress.submitted ? "Palautettu" : "Ei vielä palautettu"}.</p>
                  <p>Oma sovellus: {progress.applicationDone ? "Teksti tallennettu" : "Teksti vielä puuttuu"}. Tätä ei pisteytetä automaattisesti.</p>
                  <p>Itsearviointi: {progress.reflectionDone ? "Kirjattu" : "Puuttuu"}. Sisältöä ei arvioida koneellisesti.</p>
                  <p>{progress.ready ? "Kirjan sovitut suoritukset ovat tallessa." : "Avaa kirjan testisivu, palauta kaikki osatehtävät ja kirjoita oma itsearviointi. Pelkkä sivun avaaminen ei riitä."}</p>
                </>;
              })()}
            </section>}
            {lesson.examAssessment?.id === "EX-MID" && (scene.kind === "book" || scene.kind === "summary") && <section className="los-teacher-assessment-status" aria-label="Välikokeen todellinen tila">
              {(() => {
                const progress = teacherMidtermAssessmentStatus(lesson, draft, draft.practiceAnswers);
                return <>
                  <h3>EX-MID · oikean kokeen tilanne</h3>
                  <p>{progress.answered}/{progress.expected} kelvollista vastausta · {progress.submitted ? "Palautettu" : "Ei palautettu"}.</p>
                  <p>Oma keskusteluarvio: {progress.selfReviewed ? "Kirjattu" : "Puuttuu"}.</p>
                  <p>Kuullunymmärtämisen tai puheen pisteitä ei muodosteta tästä merkinnästä.</p>
                </>;
              })()}
            </section>}
            {lesson.mediaGate && !lesson.mediaGate.approved && <section className="los-teacher-assessment-status" role="status" aria-label="Kuuntelumedian hyväksyntäportti">
              <h3>Kuuntelun suoritus odottaa hyväksyttyä mediaa</h3>
              <p>{lesson.mediaGate.reason}</p>
              <p>Lähdetunnus: {lesson.mediaGate.sourceId}. Alkuperäistekstin lukemista ei lasketa hyväksytyksi kuunteluksi.</p>
            </section>}
            {scene.kind === "summary" && lesson.externalCheck && <section className="los-teacher-assessment-status" aria-label="Tallennettujen koetehtävien todellinen tilanne">
              <h3>Kirjan oman tallennuksen näytöt</h3>
              {external.lines.map((line,i)=><p key={i}>{line}</p>)}
              {!external.ready && <p>Kirjan sovitut tehtävät tai itsearviot ovat vielä kesken. Palaa kirjan sivulle, jatka tallennettua työtä ja tarkista tila uudelleen.</p>}
            </section>}
            {lesson.id === "L060" && scene.kind === "summary" && <LosMasterySummary/>}
            {scene.kind === "summary" && <section className="los-teacher-summary">
              <h3>Oppitunnin tilanne</h3>
              <p>Itsenäisesti oikein ratkaistuja eri tarkistuksia: <strong>{independentTeacherEvidence(session, lesson)}</strong>. Tämä luku ei ole kielitaitoprosentti.</p>
              <p>{available ? "Kaikki sovitut opiskeluteot on tallennettu." :
                "Oppituntia ei voi vielä merkitä läpikäydyksi. Alla näet täsmälleen, mitä pitää vielä tehdä."}</p>
              {!available && <ul className="los-teacher-completion-checklist" aria-label="Oppitunnin puuttuvat suoritukset">
                {!saved && <li>Tallennus ei ole onnistunut. Varmista tietojesi tallentuminen ennen loppumerkintää.</li>}
                {blockers.map((reason, i) => <li key={i}>{reason}</li>)}
              </ul>}
              {!completed && !available && nextIncompleteSceneId && nextIncompleteSceneId !== scene.id &&
                <button type="button" className="los-teacher-next-incomplete"
                  onClick={() => navigate(nextIncompleteSceneId)}>
                  Siirry seuraavaan keskeneräiseen vaiheeseen <ArrowRight size={17}/>
                </button>}
              {!completed ? <button type="button" className="los-teacher-primary"
                disabled={!available} onClick={finish}>Merkitse oppitunti läpikäydyksi</button> :
                <p className="los-teacher-done"><CheckCircle2 size={19}/> Oppitunti merkitty suoritetuksi. Osaamista seurataan erikseen.</p>}
            </section>}
            <TeacherSceneNavigation onReplay={() => setReplayKey(x => x+1)}
              onPrevious={() => navigate(lesson.scenes[sceneIndex-1]!.id)}
              onNext={() => navigate(lesson.scenes[sceneIndex+1]!.id)}
              disablePrevious={sceneIndex===0}
              last={sceneIndex===lesson.scenes.length-1}
              returnHref={"/los#/" + lesson.bookId + "/path"}/>
            <p className={"los-teacher-save" + (!saved ? " is-error" : "")} role="status">
              {saved ? "Opiskelutiedot tallentuvat tämän laitteen LOS-varmuuskopioon." :
                "Tallennus epäonnistui. Älä sulje näkymää ennen kuin olet varmistanut tiedot."}
            </p>
          </article>}
        </div>
      </>}
  </main>;
}
