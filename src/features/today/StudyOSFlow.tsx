import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import type {
  CapacityProfile,
  Course,
  Exam,
  Mistake,
  PlanItem,
  PracticeAttempt,
  PracticeTest,
  Session,
  Topic,
} from "@/lib/domain";
import { findNextStudyDate } from "@/lib/domain";
import { capacityForDateV3 } from "@/lib/learning-engine";
import { adaptiveDayPlanV5 } from "@/lib/learning-os-v5";
import {
  isPlanSyncConflict,
  useCreateFrictionEvent,
  useFrictionEvents,
  useImplementationIntentions,
  useMovePlanItem,
  useTopicDependencies,
  useUpsertPlanItem,
} from "@/lib/data";
import { addDays, diffDays, fullDate, longDate, minutes, today } from "@/lib/fi";
import { Dialog } from "@/features/shared/DialogPrimitives";

const frictionReasons = [
  ["no_time", "Ei aikaa"],
  ["forgot", "Unohdin"],
  ["too_tired", "Liian väsynyt"],
  ["too_hard", "Liian vaikea"],
  ["unclear_start", "En tiedä mistä aloittaa"],
  ["plans_changed", "Suunnitelmat muuttuivat"],
  ["other", "Muu syy"],
] as const;

type FrictionReason = (typeof frictionReasons)[number][0];
type LoadMode = "minimum" | "recommended" | "extra";

type Props = {
  courses: Course[];
  topics: Topic[];
  sessions: Session[];
  exams: Exam[];
  plan: PlanItem[];
  tests: PracticeTest[];
  attempts: PracticeAttempt[];
  mistakes: Mistake[];
  capacity: CapacityProfile;
  onStart: (id: string) => void;
  onGo: (page: "plan" | "exams" | "practice") => void;
  onPractice?: (courseId: string, topicId?: string) => void;
};

function greetingForTime() {
  const hour = new Date().getHours();
  if (hour < 11) return "Huomenta.";
  if (hour < 17) return "Hyvää päivää.";
  return "Hyvää iltaa.";
}

export function StudyOSFlow({
  courses,
  topics,
  sessions,
  exams,
  plan,
  attempts,
  mistakes,
  capacity,
  onStart,
  onGo,
  onPractice,
}: Props) {
  const now = today();
  const graph = useTopicDependencies();
  const intentions = useImplementationIntentions();
  const frictionEvents = useFrictionEvents();
  const move = useMovePlanItem();
  const upsert = useUpsertPlanItem();
  const friction = useCreateFrictionEvent();
  const [loadMode, setLoadMode] = useState<LoadMode>("recommended");
  const [localTime, setLocalTime] = useState("00:00");
  const [cannotTodayOpen, setCannotTodayOpen] = useState(false);
  const [frictionReason, setFrictionReason] = useState<FrictionReason>("no_time");

  useEffect(() => {
    const update = () => setLocalTime(new Date().toLocaleTimeString("fi-FI", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const adaptiveDay = adaptiveDayPlanV5({
    courses,
    topics,
    plan,
    attempts,
    mistakes,
    capacity,
    dependencies: graph.data ?? [],
    now,
    intentions: intentions.data ?? [],
    sessions,
    frictionEvents: frictionEvents.data ?? [],
    localTime,
  });

  const actions = adaptiveDay[loadMode];
  const nextAction = actions[0] ?? null;
  const later = actions.slice(1, 4);
  const next = nextAction?.planItem ?? null;
  const dayMinutes = actions.reduce((sum, action) => sum + action.minutes, 0);
  const dayCapacity = capacityForDateV3(capacity, now);
  const upcomingExam = exams
    .filter((exam) => exam.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  const upcomingExamCourse = upcomingExam
    ? courses.find((course) => course.id === upcomingExam.course_id)
    : undefined;

  const tomorrow = addDays(now, 1);
  const tomorrowItems = useMemo(() => plan
    .filter((item) => item.date === tomorrow && item.kind !== "exam" && !["completed", "skipped"].includes(item.status))
    .sort((a, b) => (a.start_time ?? "99:99").localeCompare(b.start_time ?? "99:99"))
    .slice(0, 4), [plan, tomorrow]);

  function startChosen(action: (typeof actions)[number]) {
    const params = new URLSearchParams(window.location.search);
    const fromReminder = params.get("source") === "push";
    void friction.mutateAsync({
      date: now,
      plan_item_id: action.planItem?.id ?? null,
      course_id: action.course.id,
      reason: "started",
      note: fromReminder ? "session_start_from_push" : "session_start",
      self_started: !fromReminder,
      reminder_used: fromReminder,
    }).catch(() => undefined);

    if (fromReminder) {
      params.delete("source");
      const query = params.toString();
      window.history.replaceState(null, "", window.location.pathname + (query ? `?${query}` : ""));
    }

    if (action.planItem) onStart(action.planItem.id);
    else if (onPractice) onPractice(action.course.id, action.topic?.id);
    else onGo("practice");
  }

  async function makeLight() {
    if (!next) return;
    const light = Math.max(5, next.min_minutes || Math.round(next.target_minutes * 0.5));
    try {
      await upsert.mutateAsync({
        id: next.id,
        course_id: next.course_id,
        date: next.date,
        target_minutes: light,
        extra_minutes: 0,
        expected_updated_at: next.updated_at,
        expected_status: next.status,
        expected_target_minutes: next.target_minutes,
      });
      toast.success(`Opiskelujakso kevennettiin: ${minutes(light)}.`);
    } catch (error) {
      toast.error(isPlanSyncConflict(error)
        ? "Jaksoa muutettiin toisella laitteella. Uusin versio ladattiin."
        : "Jaksoa ei voitu keventää.");
    }
  }

  async function confirmCannotToday() {
    if (!next) return;
    const course = courses.find((candidate) => candidate.id === next.course_id);
    const date = findNextStudyDate({
      plan,
      fromISO: now,
      studyWeekdays: capacity.studyWeekdays,
      minutes: next.target_minutes,
      ignoreItemId: next.id,
      latestDate: course?.exam_date ?? null,
      capacity,
    });

    if (!date) {
      setCannotTodayOpen(false);
      toast.error("En löytänyt ennen koetta järkevää vapaata opiskelupäivää. Avaa Map ja valitse päivä.");
      onGo("plan");
      return;
    }

    try {
      await move.mutateAsync({
        id: next.id,
        date,
        from: next.date,
        expected_updated_at: next.updated_at,
        expected_status: next.status,
      });
      void friction.mutateAsync({
        date: now,
        plan_item_id: next.id,
        course_id: next.course_id,
        reason: frictionReason,
        self_started: false,
        reminder_used: false,
      }).catch(() => undefined);
      setCannotTodayOpen(false);
      toast.success(`Siirretty päivälle ${fullDate(date)}. Tästä ei tehdä rästiä.`);
    } catch (error) {
      toast.error(isPlanSyncConflict(error)
        ? "Jaksoa muutettiin toisella laitteella. Uusin versio ladattiin."
        : "Siirto epäonnistui.");
    }
  }

  return <>
    <div className="studyos-flow">
      <header className="studyos-flow-head">
        <p className="studyos-flow-date">{longDate(now)}</p>
        <h1 className="studyos-flow-greeting">{greetingForTime()}</h1>
        <p className="studyos-flow-summary">
          {actions.length
            ? `Tälle päivälle noin ${minutes(dayMinutes)} tarkoituksellista opiskelua. StudyOS näyttää vain seuraavan järkevän askeleen kerrallaan.`
            : "Tänään ei ole pakollista itsenäistä opiskelua. Tyhjä päivä on sallittu osa hyvää suunnitelmaa."}
        </p>
      </header>

      {nextAction ? <section className="studyos-next" aria-labelledby="studyos-next-title">
        <p className="studyos-kicker">Nyt</p>
        <span className="studyos-next-course"><span className="studyos-course-dot" />{nextAction.course.code}</span>
        <h2 id="studyos-next-title">{nextAction.title}</h2>
        <p className="studyos-next-meta">
          {minutes(nextAction.minutes)} · {nextAction.planItem?.kind === "review" ? "kertaus" : nextAction.planItem?.kind === "test" ? "koeharjoittelu" : "opiskelu"}
        </p>
        <p className="studyos-next-reason">{nextAction.reason}.</p>

        <div className="studyos-next-actions">
          <button className="studyos-start" onClick={() => startChosen(nextAction)}>
            {nextAction.planItem ? "Aloita" : "Harjoittele"}<ArrowRight size={18} />
          </button>
          {next ? <button className="studyos-quiet-button" onClick={() => { setFrictionReason("no_time"); setCannotTodayOpen(true); }}>
            En ehdi tänään
          </button> : null}
        </div>

        <details className="studyos-inline-disclosure">
          <summary>Miksi tämä nyt?</summary>
          <div>
            <p>StudyOS nosti tämän ensimmäiseksi, koska {nextAction.reason}.</p>
            {adaptiveDay.stoppedForLowMarginalGain ? <p>Tämän päivän listaa on myös rajattu, koska lisätehtävistä arvioidaan saatavan selvästi vähemmän hyötyä käytettyyn aikaan nähden.</p> : null}
          </div>
        </details>

        <details className="studyos-inline-disclosure">
          <summary>Muuta tämän päivän kuormaa</summary>
          <div>
            <p>Valitse vain tarvittaessa. Lisäharjoittelu ei muutu myöhemmin korvattavaksi velaksi.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["minimum", "recommended", "extra"] as const).map((mode) => (
                <button
                  key={mode}
                  className="studyos-quiet-button"
                  aria-pressed={loadMode === mode}
                  onClick={() => setLoadMode(mode)}
                >
                  {mode === "minimum" ? `Kevyt · ${adaptiveDay.minimumMinutes} min` : mode === "recommended" ? `Suositeltu · ${adaptiveDay.recommendedMinutes} min` : `Enemmän · ${adaptiveDay.extraMinutes} min`}
                </button>
              ))}
            </div>
            {next ? <button className="studyos-quiet-button" disabled={upsert.isPending} onClick={() => void makeLight()}>Kevennä nykyistä jaksoa</button> : null}
          </div>
        </details>
      </section> : <section className="studyos-flow-empty">
        <p className="studyos-kicker">Tänään</p>
        <h2>Päivä on vapaa.</h2>
        <p>StudyOS ei täytä tyhjää aikaa tehtävillä vain näyttääkseen ahkeralta. Voit levätä tai tehdä vapaaehtoisen retrieval-kierroksen.</p>
        <div className="studyos-next-actions">
          <button className="studyos-start" onClick={() => onGo("practice")}>Harjoittele vapaaehtoisesti <ArrowRight size={18} /></button>
          <button className="studyos-quiet-button" onClick={() => onGo("plan")}>Avaa Map</button>
        </div>
      </section>}

      {later.length ? <section className="studyos-flow-section" aria-labelledby="later-heading">
        <div className="studyos-flow-section-head"><h3 id="later-heading">Myöhemmin</h3><span>{later.length} seuraavaa</span></div>
        <div className="studyos-flow-list">
          {later.map((action) => <button key={action.id} className="studyos-flow-row" onClick={() => startChosen(action)}>
            <span className="studyos-flow-row-course">{action.course.code}</span>
            <span className="min-w-0">
              <span className="studyos-flow-row-title">{action.title}</span>
              <span className="studyos-flow-row-note">{action.planItem?.kind === "review" ? "Kertaus" : "Opiskelu"}</span>
            </span>
            <span className="studyos-flow-row-time">{minutes(action.minutes)} <ChevronRight size={14} className="inline" /></span>
          </button>)}
        </div>
      </section> : null}

      <section className="studyos-flow-section" aria-labelledby="tomorrow-heading">
        <div className="studyos-flow-section-head"><h3 id="tomorrow-heading">Huomenna</h3><span>{fullDate(tomorrow)}</span></div>
        {tomorrowItems.length ? <div className="studyos-flow-list">
          {tomorrowItems.map((item) => {
            const course = courses.find((candidate) => candidate.id === item.course_id);
            const topic = topics.find((candidate) => candidate.id === item.topic_id);
            return <button key={item.id} className="studyos-flow-row" onClick={() => onGo("plan")}>
              <span className="studyos-flow-row-course">{course?.code ?? "—"}</span>
              <span className="min-w-0">
                <span className="studyos-flow-row-title">{item.title || topic?.name || "Opiskelujakso"}</span>
                <span className="studyos-flow-row-note">{item.start_time ? `alkaen ${item.start_time.slice(0, 5)}` : "Joustava aika"}</span>
              </span>
              <span className="studyos-flow-row-time">{minutes(item.target_minutes)}</span>
            </button>;
          })}
        </div> : <p className="text-sm text-muted-foreground">Huomiselle ei ole vielä pakollista itsenäistä opiskelua.</p>}
      </section>

      <section className="studyos-flow-section" aria-label="Tilanne">
        <div className="studyos-flow-status">
          <span><b>{minutes(dayMinutes)}</b> tänään</span>
          <span><b>{minutes(dayCapacity)}</b> kapasiteetti</span>
          {upcomingExam ? <button className="inline-flex items-center gap-1" onClick={() => onGo("exams")}>
            <CalendarDays size={13} /> <b>{upcomingExamCourse?.code ?? "Koe"}</b> {diffDays(upcomingExam.date, now)} pv
          </button> : <span>Ei lähestyviä kokeita</span>}
        </div>
      </section>

      {adaptiveDay.runtimeIntentions.triggeredRuleIds.length ? <div className="studyos-flow-notice" role="status">
        <b>Suunnitelmaa mukautettiin tälle päivälle.</b> {adaptiveDay.runtimeIntentions.notes.join(" ") || "Aktiivinen jos–niin-sääntö kevensi kuormaa."}
      </div> : null}
    </div>

    {cannotTodayOpen ? <Dialog title="En ehdi tänään" onClose={() => setCannotTodayOpen(false)}>
      <p className="text-sm text-muted-foreground">Valitse syy. StudyOS etsii seuraavan järkevän opiskelupäivän eikä tee siirrosta rästiä.</p>
      <div className="mt-4 grid gap-2">
        {frictionReasons.map(([value, label]) => <button
          key={value}
          type="button"
          aria-pressed={frictionReason === value}
          onClick={() => setFrictionReason(value)}
          className={"min-h-11 rounded-xl border px-4 text-left text-sm " + (frictionReason === value ? "border-primary bg-accent font-semibold" : "border-border bg-surface")}
        >{label}</button>)}
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <button className="studyos-quiet-button" onClick={() => setCannotTodayOpen(false)}>Peruuta</button>
        <button className="studyos-start" disabled={move.isPending} onClick={() => void confirmCannotToday()}>
          {move.isPending ? "Siirretään…" : "Siirrä seuraavaan sopivaan päivään"}
        </button>
      </div>
    </Dialog> : null}
  </>;
}
