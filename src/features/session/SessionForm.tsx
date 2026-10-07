import { useEffect, useRef, useState } from "react";
import { Check, Pause, Play, X } from "lucide-react";
import { toast } from "sonner";
import { AbittiAnswerEditor, answerHasContent } from "@/components/AbittiAnswerEditor";
import {
  useLogSession,
  usePreferences,
  usePatchActiveStudySession,
  useSetActiveStudySessionRunning,
  useClearActiveStudySession,
  type ActiveStudySession,
} from "@/lib/data";
import type { Course, PlanItem, PracticeAttempt, Session, Topic } from "@/lib/domain";
import { today } from "@/lib/fi";
import { experimentVariantV4, sessionFatigueV4 } from "@/lib/learning-os-v4";
import { runOrQueue } from "@/lib/offline";
import { Dialog, button, input, secondary } from "@/features/shared/DialogPrimitives";

export function SessionForm({
  item,
  activeSession = null,
  courses,
  topics,
  sessions = [],
  attempts = [],
  presentation = "dialog",
  onClose,
}: {
  item: PlanItem | null;
  activeSession?: ActiveStudySession | null;
  courses: Course[];
  topics: Topic[];
  sessions?: Session[];
  attempts?: PracticeAttempt[];
  presentation?: "dialog" | "focus";
  onClose: () => void;
}) {
  const initialCourse = activeSession?.course_id ?? item?.course_id ?? courses[0]?.id ?? "";
  const initialTopic = activeSession?.topic_id ?? item?.topic_id ?? "";
  const hasGuidedSession = Boolean(item || activeSession);
  const initialTargetMinutes = activeSession?.target_minutes ?? item?.target_minutes ?? 30;
  const initialRunning = activeSession ? activeSession.status === "running" : Boolean(item);
  const initialElapsed = activeSession?.effective_elapsed_seconds ?? 0;

  const [guided, setGuided] = useState(hasGuidedSession);
  const [step, setStep] = useState(activeSession?.phase ?? (item ? 1 : 0));
  const [courseId, setCourseId] = useState(initialCourse);
  const [topicId, setTopicId] = useState(initialTopic);
  const [seconds, setSeconds] = useState(initialElapsed);
  const [running, setRunning] = useState(initialRunning);
  const runStartedAt = useRef<number | null>(initialRunning ? Date.now() : null);
  const accumulatedSeconds = useRef(initialElapsed);
  const hydratedActiveId = useRef<string | null>(null);
  const [timerMode, setTimerMode] = useState<"none" | "20" | "30" | "custom">(
    !hasGuidedSession ? "none" : initialTargetMinutes === 20 ? "20" : initialTargetMinutes === 30 ? "30" : "custom",
  );
  const [customMinutes, setCustomMinutes] = useState(initialTargetMinutes);
  const [actualMinutes, setActualMinutes] = useState(initialTargetMinutes);
  const [objective, setObjective] = useState(activeSession?.objective || item?.title || "");
  const [recall, setRecall] = useState(activeSession?.recall ?? "");
  const [retrievalCheck, setRetrievalCheck] = useState(activeSession?.retrieval_check ?? "");
  const [retrievalResult, setRetrievalResult] = useState<"independent" | "hinted" | "not_yet" | null>(activeSession?.retrieval_result ?? null);
  const [retrievalConfidence, setRetrievalConfidence] = useState<number | null>(activeSession?.retrieval_confidence ?? null);
  const [outcome, setOutcome] = useState<"yes" | "partial" | "not_yet" | null>(
    activeSession?.retrieval_result === "independent"
      ? "yes"
      : activeSession?.retrieval_result === "hinted"
        ? "partial"
        : activeSession?.retrieval_result === "not_yet"
          ? "not_yet"
          : null,
  );
  const [competence, setCompetence] = useState(
    activeSession?.retrieval_result === "independent" ? 4 : activeSession?.retrieval_result === "hinted" ? 3 : activeSession?.retrieval_result === "not_yet" ? 2 : 3,
  );
  const [did, setDid] = useState(activeSession?.did ?? "");
  const [unclear, setUnclear] = useState(activeSession?.unclear ?? "");
  const [note, setNote] = useState(activeSession?.note ?? "");
  const [method, setMethod] = useState(activeSession?.method || "tehtävät");
  const [tasks, setTasks] = useState(activeSession?.tasks ?? "");

  const log = useLogSession();
  const preferences = usePreferences();
  const patchActive = usePatchActiveStudySession();
  const setActiveRunning = useSetActiveStudySessionRunning();
  const clearActive = useClearActiveStudySession();
  const experimentApplied = useRef(false);

  // A form can mount while course queries are still hydrating from the local
  // snapshot/network. A controlled <select> can visually show its first option
  // even while React state still contains an empty value. Keep the canonical
  // state aligned with the visible choice so save never becomes a silent no-op.
  useEffect(() => {
    if (courseId && courses.some((course) => course.id === courseId)) return;
    const fallbackCourseId = activeSession?.course_id ?? item?.course_id ?? courses[0]?.id ?? "";
    if (!fallbackCourseId) return;
    setCourseId(fallbackCourseId);
    setTopicId((currentTopicId) =>
      currentTopicId && topics.some((topic) => topic.id === currentTopicId && topic.course_id === fallbackCourseId)
        ? currentTopicId
        : "",
    );
  }, [activeSession?.course_id, courseId, courses, item?.course_id, topics]);

  const course = courses.find((candidate) => candidate.id === courseId);
  const topic = topics.find((candidate) => candidate.id === topicId);
  const fatigue = sessionFatigueV4(sessions, attempts);
  const sessionVariant = experimentVariantV4("session_length", today(), `${courseId}:${topicId || "general"}`);
  const experimentMinutes = sessionVariant === "A" ? 25 : 40;
  const targetMinutes = timerMode === "20" ? 20 : timerMode === "30" ? 30 : timerMode === "custom" ? customMinutes : actualMinutes;
  const phaseGoal = item?.phase === "review"
    ? "Palauta ydinasia muistista ilman materiaalia."
    : item?.phase === "practice"
      ? "Ratkaise koetasoinen tehtävä ilman malliratkaisua."
      : "Pysty opiskelukerran jälkeen selittämään tai ratkaisemaan tavoite ilman mallia.";
  const retrievalPrompt = topic
    ? `Sulje materiaalit. Selitä tai ratkaise omin sanoin, mitä osaat nyt aiheesta “${topic.name}”.`
    : "Sulje materiaalit. Kirjoita tärkeimmät asiat, jotka pystyt nyt palauttamaan muistista.";

  useEffect(() => {
    if (experimentApplied.current || preferences.data?.personal_experiments_enabled !== true || item || activeSession) return;
    setTimerMode("custom");
    setCustomMinutes(experimentMinutes);
    experimentApplied.current = true;
  }, [activeSession, experimentMinutes, item, preferences.data?.personal_experiments_enabled]);

  useEffect(() => {
    if (!activeSession) return;

    const canonicalElapsed = Math.max(0, activeSession.effective_elapsed_seconds);
    accumulatedSeconds.current = canonicalElapsed;
    runStartedAt.current = activeSession.status === "running" ? Date.now() : null;
    setSeconds(canonicalElapsed);
    setRunning(activeSession.status === "running");

    if (hydratedActiveId.current === activeSession.id) return;
    hydratedActiveId.current = activeSession.id;
    setGuided(true);
    setStep(activeSession.phase);
    setCourseId(activeSession.course_id);
    setTopicId(activeSession.topic_id ?? "");
    setCustomMinutes(activeSession.target_minutes);
    setActualMinutes(activeSession.target_minutes);
    setTimerMode(activeSession.target_minutes === 20 ? "20" : activeSession.target_minutes === 30 ? "30" : "custom");
    setObjective(activeSession.objective);
    setRecall(activeSession.recall);
    setRetrievalCheck(activeSession.retrieval_check);
    setRetrievalResult(activeSession.retrieval_result);
    setRetrievalConfidence(activeSession.retrieval_confidence);
    setDid(activeSession.did);
    setUnclear(activeSession.unclear);
    setNote(activeSession.note);
    setMethod(activeSession.method || "tehtävät");
    setTasks(activeSession.tasks);
    if (activeSession.retrieval_result === "independent") {
      setOutcome("yes");
      setCompetence(4);
    } else if (activeSession.retrieval_result === "hinted") {
      setOutcome("partial");
      setCompetence(3);
    } else if (activeSession.retrieval_result === "not_yet") {
      setOutcome("not_yet");
      setCompetence(2);
    }
  }, [activeSession]);

  useEffect(() => {
    if (!activeSession?.id || hydratedActiveId.current !== activeSession.id) return;
    const timeout = window.setTimeout(() => {
      patchActive.mutate({
        id: activeSession.id,
        patch: {
          phase: step,
          objective,
          recall,
          did,
          retrieval_check: retrievalCheck,
          retrieval_result: retrievalResult,
          retrieval_confidence: retrievalConfidence,
          unclear,
          note,
          method,
          tasks,
        },
      });
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [activeSession?.id, did, method, note, objective, recall, retrievalCheck, retrievalConfidence, retrievalResult, step, tasks, unclear]);

  function currentElapsedSeconds() {
    const live = runStartedAt.current === null ? 0 : Math.max(0, Math.floor((Date.now() - runStartedAt.current) / 1000));
    return accumulatedSeconds.current + live;
  }

  function pauseTimer() {
    const next = currentElapsedSeconds();
    accumulatedSeconds.current = next;
    runStartedAt.current = null;
    setSeconds(next);
    setRunning(false);
    if (activeSession?.id) {
      void setActiveRunning.mutateAsync({ id: activeSession.id, running: false })
        .catch((error) => console.error("[Opintopäiväkirja] Active session pause sync failed", error));
    }
  }

  function resumeTimer() {
    if (runStartedAt.current === null) runStartedAt.current = Date.now();
    setRunning(true);
    if (activeSession?.id) {
      void setActiveRunning.mutateAsync({ id: activeSession.id, running: true })
        .catch((error) => console.error("[Opintopäiväkirja] Active session resume sync failed", error));
    }
  }

  function toggleTimer() {
    if (running) pauseTimer();
    else resumeTimer();
  }

  function persistActivePhase(nextStep: number) {
    if (!activeSession?.id) return;
    patchActive.mutate({
      id: activeSession.id,
      patch: {
        phase: nextStep,
        objective,
        recall,
        did,
        retrieval_check: retrievalCheck,
        retrieval_result: retrievalResult,
        retrieval_confidence: retrievalConfidence,
        unclear,
        note,
        method,
        tasks,
      },
    });
  }

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const live = runStartedAt.current === null ? 0 : Math.max(0, Math.floor((Date.now() - runStartedAt.current) / 1000));
      setSeconds(accumulatedSeconds.current + live);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("focus", tick);
    };
  }, [running]);

  const timerTargetSeconds = timerMode === "20"
    ? 20 * 60
    : timerMode === "30"
      ? 30 * 60
      : timerMode === "custom"
        ? Math.max(1, customMinutes) * 60
        : null;
  const timerReached = timerTargetSeconds != null && seconds >= timerTargetSeconds;
  const fatigueThresholdMinutes = fatigue.preferredSessionMinutes ?? 35;
  const liveFatigueNudge = running && fatigue.level !== "none" && seconds >= fatigueThresholdMinutes * 60;

  function changeMode(next: boolean) {
    pauseTimer();
    setGuided(next);
    setStep(next && item ? 1 : 0);
  }

  function chooseRetrievalResult(value: "independent" | "hinted" | "not_yet") {
    setRetrievalResult(value);
    if (value === "independent") {
      setOutcome("yes");
      setCompetence(4);
    } else if (value === "hinted") {
      setOutcome("partial");
      setCompetence(3);
    } else {
      setOutcome("not_yet");
      setCompetence(2);
    }
  }

  function resolvedCourseId() {
    return courseId || activeSession?.course_id || item?.course_id || courses[0]?.id || "";
  }

  function resolvedTopicId(selectedCourseId: string) {
    return topicId && topics.some((candidate) => candidate.id === topicId && candidate.course_id === selectedCourseId)
      ? topicId
      : null;
  }

  async function persistLog(inputValue: Parameters<typeof log.mutateAsync>[0]) {
    // TanStack normally runs these mutations in `networkMode: always`, but a
    // direct offline path makes the durability contract independent of query
    // client hydration. The write reaches localStorage synchronously before the
    // dialog closes and is replayed by the existing sync watcher.
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      return runOrQueue<string>("logSession", inputValue);
    }
    return log.mutateAsync(inputValue);
  }

  async function submitManual(e: React.FormEvent) {
    e.preventDefault();
    const selectedCourseId = resolvedCourseId();
    if (!selectedCourseId) {
      toast.error("Valitse kurssi ennen tallennusta.");
      return;
    }
    try {
      const result = await persistLog({
        course_id: selectedCourseId,
        topic_id: resolvedTopicId(selectedCourseId),
        minutes: Math.max(1, actualMinutes),
        planned_minutes: item?.target_minutes ?? actualMinutes,
        kind: activeSession?.kind ?? (item?.kind === "review" ? "review" : item?.kind === "test" ? "test" : "study"),
        competence,
        did,
        unclear,
        note,
        focus: null,
        energy: null,
        method,
        tasks,
        plan_item_id: item?.id ?? activeSession?.plan_item_id ?? null,
      });
      toast.success(result === "queued" ? "Tallennettu paikallisesti · synkataan myöhemmin." : "Opiskelu kirjattu.");
      onClose();
    } catch {
      toast.error("Tallennus epäonnistui. Tiedot eivät katoa, jos yhteys katkesi.");
    }
  }

  async function submitGuided() {
    const selectedCourseId = resolvedCourseId();
    if (!selectedCourseId || !objective.trim() || !retrievalCheck.trim() || !retrievalResult) {
      toast.error("Täytä tavoite, tee muistista palauttamisen tarkistus ja merkitse miten se onnistui.");
      return;
    }
    const finalOutcome = outcome ?? (retrievalResult === "independent" ? "yes" : retrievalResult === "hinted" ? "partial" : "not_yet");
    const minutesUsed = timerMode === "none" ? Math.max(1, actualMinutes) : Math.max(1, Math.ceil(currentElapsedSeconds() / 60));
    try {
      const result = await persistLog({
        course_id: selectedCourseId,
        topic_id: resolvedTopicId(selectedCourseId),
        minutes: minutesUsed,
        planned_minutes: item?.target_minutes ?? targetMinutes,
        kind: activeSession?.kind ?? (item?.kind === "review" ? "review" : item?.kind === "test" ? "test" : "study"),
        competence,
        did,
        unclear,
        note,
        focus: null,
        energy: null,
        method: method || "ohjattu opiskelukerta",
        tasks,
        plan_item_id: item?.id ?? activeSession?.plan_item_id ?? null,
        objective: objective.trim(),
        recall: recall.trim() || null,
        retrieval_check: retrievalCheck.trim(),
        retrieval_result: retrievalResult,
        retrieval_confidence: retrievalConfidence,
        outcome: finalOutcome,
      });
      if (activeSession?.id && result !== "queued") {
        await clearActive.mutateAsync(activeSession.id).catch(() => undefined);
      }
      toast.success(result === "queued" ? "Opiskelukerta tallennettu paikallisesti." : "Opiskelukerta tallennettu.");
      onClose();
    } catch {
      toast.error("Opiskelukertaa ei voitu tallentaa. Tiedot eivät katoa, jos yhteys katkesi.");
    }
  }

  const timerDisplay = `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor(seconds / 60) % 60).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const body = <>
    {presentation === "dialog" && <div className="mb-5 flex rounded-xl bg-muted p-1">
      <button type="button" onClick={() => changeMode(true)} className={`min-h-11 flex-1 rounded-lg px-3 text-sm ${guided ? "bg-surface font-semibold shadow-sm" : ""}`}>Ohjattu opiskelukerta</button>
      <button type="button" onClick={() => changeMode(false)} className={`min-h-11 flex-1 rounded-lg px-3 text-sm ${!guided ? "bg-surface font-semibold shadow-sm" : ""}`}>Nopea kirjaus</button>
    </div>}

    {!guided ? <form onSubmit={submitManual} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">Kurssi
          <select className={input} value={courseId} onChange={(e) => { setCourseId(e.target.value); setTopicId(""); }}>
            {courses.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.code} · {candidate.name}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Aihe
          <select className={input} value={topicId} onChange={(e) => setTopicId(e.target.value)}>
            <option value="">Yleinen opiskelu</option>
            {topics.filter((candidate) => candidate.course_id === courseId).map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium">Todellinen kesto minuutteina<input type="number" min="1" max="1440" required value={actualMinutes} onChange={(e) => setActualMinutes(Number(e.target.value))} className={input}/></label>
      <label className="block text-sm font-medium">Mitä teit?<textarea className={input} rows={2} value={did} onChange={(e) => setDid(e.target.value)}/></label>
      <fieldset><legend className="mb-2 text-sm font-medium">Oma arvio osaamisesta 1–5 <span className="font-normal text-foreground">(ei nosta osaamistasoa)</span></legend><div className="flex gap-2">{[1, 2, 3, 4, 5].map((n) => <button type="button" key={n} aria-pressed={competence === n} onClick={() => setCompetence(n)} className={`grid size-11 place-items-center rounded-xl border ${competence === n ? "border-primary bg-accent font-semibold" : "border-border"}`}>{n}</button>)}</div></fieldset>
      <label className="block text-sm font-medium">Mikä jäi epäselväksi?<textarea className={input} rows={2} value={unclear} onChange={(e) => setUnclear(e.target.value)}/></label>
      <details className="rounded-2xl border border-border p-4"><summary className="cursor-pointer text-sm font-medium">Lisätiedot</summary><div className="mt-4 space-y-4"><label className="block text-sm font-medium">Menetelmä<select className={input} value={method} onChange={(e) => setMethod(e.target.value)}><option value="tehtävät">Tehtävät</option><option value="aktiivinen palautus">Aktiivinen palautus</option><option value="muistiinpanot">Muistiinpanot</option><option value="lukeminen">Lukeminen</option><option value="harjoituskoe">Harjoituskoe</option><option value="muu">Muu</option></select></label><label className="block text-sm font-medium">Tehtävät<input className={input} value={tasks} onChange={(e) => setTasks(e.target.value)}/></label><label className="block text-sm font-medium">Muistiinpano<textarea className={input} rows={3} value={note} onChange={(e) => setNote(e.target.value)}/></label></div></details>
      <button type="submit" disabled={log.isPending} className={`${button} w-full`}><Check size={18}/>{log.isPending ? "Tallennetaan…" : "Tallenna"}</button>
    </form> : <div className="space-y-5">
      {step > 0 && <div className="flex items-center gap-2" aria-label="Opiskelukerran vaiheet">{["Muista", "Opiskele", "Tarkista"].map((label, index) => { const visibleStep = step <= 1 ? 0 : step === 2 ? 1 : 2; return <div key={label} className="flex-1"><div className={`h-1.5 rounded-full ${index <= visibleStep ? "bg-primary" : "bg-muted"}`}/><span className="mt-1 hidden text-[10px] text-muted-foreground sm:block">{label}</span></div>; })}</div>}
      {timerMode !== "none" && step > 0 && <div className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2 text-xs"><span className="font-medium">{running ? "Aika käynnissä" : "Ajastin tauolla"}</span><span className="tabular-nums text-muted-foreground">{timerDisplay}</span></div>}

      {step === 0 && <>
        {item && <div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-primary">{course?.code} · {item.target_minutes} min</p><h3 className="mt-1 text-lg font-semibold">{item.title || topic?.name || "Opiskelu"}</h3><p className="mt-1 text-sm text-muted-foreground">{phaseGoal}</p></div>}
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-medium">Kurssi<select disabled={!!item} className={input} value={courseId} onChange={(e) => { setCourseId(e.target.value); setTopicId(""); }}>{courses.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.code} · {candidate.name}</option>)}</select></label><label className="text-sm font-medium">Aihe<select disabled={!!item?.topic_id} className={input} value={topicId} onChange={(e) => setTopicId(e.target.value)}><option value="">Yleinen opiskelu</option>{topics.filter((candidate) => candidate.course_id === courseId).map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}</select></label></div>
        <label className="block text-sm font-medium">Opiskelukerran tavoite<textarea rows={2} className={input} value={objective} onChange={(e) => setObjective(e.target.value)} placeholder={phaseGoal}/></label>
        <div><p className="mb-2 text-sm font-medium">Ajastin</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{([["none", "Ei ajastinta"], ["20", "20 min"], ["30", "30 min"], ["custom", "Oma aika"]] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={timerMode === value} onClick={() => setTimerMode(value)} className={timerMode === value ? button : secondary}>{label}</button>)}</div>{timerMode === "custom" && <label className="mt-3 block text-sm font-medium">Oma aika<input type="number" min="5" max="240" className={input} value={customMinutes} onChange={(e) => setCustomMinutes(Number(e.target.value))}/></label>}</div>
      </>}

      {step === 1 && <div className="space-y-4"><div><p className="text-sm font-medium text-primary">Muista</p><h3 className="mt-1 text-xl font-semibold">Mitä muistat jo?</h3><p className="mt-2 text-sm text-muted-foreground">Kirjoita muutama asia ilman materiaalia. Täydellistä vastausta ei tarvita.</p></div><AbittiAnswerEditor autoFocus label="Muistista palautus" value={recall} onChange={setRecall} placeholder="Mitä muistat ilman muistiinpanoja?" minHeight={170}/></div>}

      {step === 2 && <div className="space-y-4"><div><p className="text-sm font-medium text-primary">Opiskele ja harjoittele</p><h3 className="mt-1 text-xl font-semibold">{objective || phaseGoal}</h3><p className="mt-2 text-sm text-muted-foreground">Opiskele, ratkaise tehtäviä ja käytä materiaalia normaalisti. Aika kirjataan automaattisesti; laita ajastin tauolle vain oikean tauon ajaksi.</p></div>{timerMode !== "none" ? <div className="rounded-2xl bg-muted p-5 text-center"><p role="timer" className="text-5xl font-semibold tabular-nums">{timerDisplay}</p><p className="mt-2 text-sm text-muted-foreground">Tavoite {timerMode === "custom" ? customMinutes : Number(timerMode)} min{timerReached ? " · tavoiteaika täynnä, voit jatkaa" : ""}</p>{preferences.data?.personal_experiments_enabled && timerMode === "custom" && customMinutes === experimentMinutes && <p className="mt-1 text-xs text-muted-foreground">Oppimiskokeilu · tämän päivän vaihtoehto {experimentMinutes} min</p>}{liveFatigueNudge && <div className="mt-4 rounded-xl border border-border bg-surface p-3 text-left text-sm"><b>Hyvä kohta tauolle tai muistista palauttamisen tarkistukseen.</b><p className="mt-1 text-muted-foreground">{fatigue.reason}</p>{fatigue.suggestedBreakMinutes > 0 && <small className="mt-1 block text-muted-foreground">Ehdotettu tauko noin {fatigue.suggestedBreakMinutes} min.</small>}</div>}<button type="button" className={`${secondary} mt-4`} onClick={toggleTimer}>{running ? <><Pause size={17}/>Tauko</> : <><Play size={17}/>Jatka ajastinta</>}</button></div> : <label className="block text-sm font-medium">Todellinen kesto minuutteina<input type="number" min="1" max="240" className={input} value={actualMinutes} onChange={(e) => setActualMinutes(Number(e.target.value))}/></label>}<label className="block text-sm font-medium">Mitä teit?<textarea rows={3} className={input} value={did} onChange={(e) => setDid(e.target.value)} placeholder="Esim. tehtävät 4.12–4.18"/></label></div>}

      {step === 3 && <div className="space-y-4"><div><p className="text-sm font-medium text-primary">Muistista palauttamisen tarkistus</p><h3 className="mt-1 text-xl font-semibold">Sulje materiaali</h3><p className="mt-2 text-sm text-muted-foreground">{retrievalPrompt}</p></div><AbittiAnswerEditor autoFocus label="Vastaus muistista" value={retrievalCheck} onChange={setRetrievalCheck} placeholder="Vastaa muistista…" minHeight={170}/><p className="text-xs text-muted-foreground">Älä arvioi vielä omaa varmuuttasi. Tee ensin yritys, sitten merkitse miten se onnistui.</p></div>}

      {step === 4 && <div className="space-y-5"><div><p className="text-sm font-medium text-primary">Tarkista</p><h3 className="mt-1 text-xl font-semibold">Miten meni?</h3><p className="mt-2 text-sm text-muted-foreground">Valitse vain se, miten hyvin sait asian takaisin mieleen ilman materiaalia.</p></div>
        <fieldset><legend className="mb-2 text-sm font-medium">Muistista palauttaminen</legend><div className="grid gap-2 sm:grid-cols-3">{([["independent", "Osasin itse"], ["hinted", "Vihjeellä"], ["not_yet", "En vielä"]] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={retrievalResult === value} onClick={() => chooseRetrievalResult(value)} className={retrievalResult === value ? button : secondary}>{label}</button>)}</div></fieldset>
        <label className="block text-sm font-medium">Mikä jäi epäselväksi? <span className="font-normal text-muted-foreground">(valinnainen)</span><textarea rows={2} className={input} value={unclear} onChange={(e) => setUnclear(e.target.value)}/></label>
        <details className="rounded-2xl border border-border p-4"><summary className="min-h-11 cursor-pointer list-none py-2 text-sm font-medium">Lisäarvio</summary><fieldset className="mt-3"><legend className="mb-2 text-sm font-medium">Kuinka varma olit?</legend><div className="grid grid-cols-3 gap-2">{[[1, "Epävarma"], [2, "Melko varma"], [3, "Varma"]].map(([value, label]) => <button type="button" key={value} aria-pressed={retrievalConfidence === value} onClick={() => setRetrievalConfidence(Number(value))} className={retrievalConfidence === value ? button : secondary}>{label}</button>)}</div></fieldset></details>
        <button type="button" disabled={log.isPending || !retrievalResult || !answerHasContent(retrievalCheck)} className={`${button} w-full`} onClick={() => void submitGuided()}><Check size={18}/>{log.isPending ? "Tallennetaan…" : "Valmis"}</button>
      </div>}

      <div className="flex items-center justify-between gap-3 border-t border-border pt-4">{step > 0 ? <button type="button" className={secondary} onClick={() => { const next = Math.max(0, step - 1); if (step === 1) pauseTimer(); if (step === 4 && timerMode !== "none") resumeTimer(); setStep(next); persistActivePhase(next); }}>Takaisin</button> : <span/>}{step < 4 && <button type="button" className={button} disabled={step === 0 && !objective.trim() || step === 3 && !answerHasContent(retrievalCheck)} onClick={() => { const next = Math.min(4, step + 1); if ((step === 0 || step === 1) && timerMode !== "none" && !running) resumeTimer(); if (step === 3) pauseTimer(); setStep(next); persistActivePhase(next); }}>Jatka</button>}</div>
    </div>}
  </>;

  const title = guided ? "Ohjattu opiskelukerta" : "Kirjaa opiskelu";
  if (presentation === "focus") {
    return <div className="study-session-focus" data-focus-workspace="study-session">
      <header className="study-session-focus-header">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{course?.code ?? "Opiskelukerta"}</p>
          <h1 className="mt-1 truncate text-xl font-semibold">{item?.title || topic?.name || title}</h1>
        </div>
        <button type="button" className={`${secondary} shrink-0`} onClick={() => { persistActivePhase(step); onClose(); }}><X size={17}/>Sulje näkymä</button>
      </header>
      <main className="study-session-focus-main">{body}</main>
    </div>;
  }

  return <Dialog title={title} onClose={onClose}>{body}</Dialog>;
}
