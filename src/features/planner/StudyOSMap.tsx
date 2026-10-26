import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarPlus, Play, X } from "lucide-react";
import { toast } from "sonner";
import type {
  CapacityProfile,
  Course,
  Mistake,
  PlanItem,
  PracticeAttempt,
  PracticeTest,
  Topic,
} from "@/lib/domain";
import { capacityForDateV3 } from "@/lib/learning-engine";
import { useExams, useMovePlanItem } from "@/lib/data";
import { addDays, diffDays, fullDate, minutes, startOfWeek, today } from "@/lib/fi";
import { TaskForm } from "@/components/StudyDialogs";

export type StudyOSMapMode = "week" | "course" | "term";

type LegacyPlannerMode = "päivä" | "viikko" | "kuukausi";

type Props = {
  courses: Course[];
  topics: Topic[];
  plan: PlanItem[];
  tests: PracticeTest[];
  mistakes: Mistake[];
  attempts: PracticeAttempt[];
  capacity: CapacityProfile;
  onStart: (id: string) => void;
  initialMode?: LegacyPlannerMode;
  initialAnchor?: string;
  onPeriodChange?: (mode: LegacyPlannerMode, anchor: string) => void;
};

function fiWeekday(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("fi-FI", { weekday: "short" }).replace(".", "");
}

function dayNumber(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("fi-FI", { day: "numeric", month: "numeric" });
}

function mapModeFromLegacy(mode: LegacyPlannerMode | undefined): StudyOSMapMode {
  if (mode === "kuukausi") return "term";
  if (mode === "päivä") return "course";
  return "week";
}

export function StudyOSMap(props: Props) {
  const {
    courses,
    topics,
    plan,
    capacity,
    onStart,
    initialAnchor,
    onPeriodChange,
  } = props;
  const examsQ = useExams();
  const move = useMovePlanItem();
  const [mode, setMode] = useState<StudyOSMapMode>(() => mapModeFromLegacy(props.initialMode));
  const [anchor, setAnchor] = useState(initialAnchor ?? today());
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id ?? "");
  const [selectedItem, setSelectedItem] = useState<PlanItem | null>(null);
  const [shiftDate, setShiftDate] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setMode(mapModeFromLegacy(props.initialMode));
  }, [props.initialMode]);
  useEffect(() => {
    if (initialAnchor) setAnchor(initialAnchor);
  }, [initialAnchor]);
  useEffect(() => {
    if (!selectedCourseId || !courses.some((course) => course.id === selectedCourseId)) {
      setSelectedCourseId(courses[0]?.id ?? "");
    }
  }, [courses, selectedCourseId]);

  const weekStart = startOfWeek(anchor);
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const exams = examsQ.data ?? [];
  const activePlan = plan.filter((item) => item.status !== "skipped");

  const selectedCourse = courses.find((course) => course.id === selectedCourseId) ?? courses[0];
  const selectedCourseItems = selectedCourse
    ? activePlan.filter((item) => item.course_id === selectedCourse.id && item.date >= addDays(today(), -7))
      .sort((a, b) => a.date.localeCompare(b.date) || (a.start_time ?? "").localeCompare(b.start_time ?? ""))
    : [];

  const termStart = startOfWeek(today());
  const termEnd = addDays(termStart, 41);
  const termDays = 42;

  const plannedByDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of activePlan) {
      if (item.kind === "exam") continue;
      map.set(item.date, (map.get(item.date) ?? 0) + Math.max(0, item.target_minutes));
    }
    return map;
  }, [activePlan]);

  function changeMode(next: StudyOSMapMode) {
    setMode(next);
    const legacy: LegacyPlannerMode = next === "term" ? "kuukausi" : next === "course" ? "päivä" : "viikko";
    onPeriodChange?.(legacy, anchor);
  }

  function shiftWeek(direction: -1 | 1) {
    const next = addDays(anchor, direction * 7);
    setAnchor(next);
    onPeriodChange?.("viikko", next);
  }

  function openItem(item: PlanItem) {
    setSelectedItem(item);
    setShiftDate(item.date);
  }

  async function confirmShift() {
    if (!selectedItem || !/^\d{4}-\d{2}-\d{2}$/.test(shiftDate)) return;
    try {
      await move.mutateAsync({
        id: selectedItem.id,
        date: shiftDate,
        from: selectedItem.date,
        expected_updated_at: selectedItem.updated_at,
        expected_status: selectedItem.status,
      });
      toast.success(`Siirretty päivälle ${fullDate(shiftDate)}.`);
      setSelectedItem(null);
    } catch {
      toast.error("Siirtoa ei voitu tallentaa. Päivitä Map ja yritä uudelleen.");
    }
  }

  const title = mode === "week" ? "Tämä viikko" : mode === "course" ? "Kurssipolku" : "Seuraavat kuusi viikkoa";

  return <div className="studyos-map">
    <header className="studyos-map-hero">
      <div>
        <p>Map · näe kokonaisuus ilman dashboardia</p>
        <h1>{title}</h1>
      </div>
      <div className="studyos-map-switch" role="group" aria-label="Mapin näkymä">
        <button aria-pressed={mode === "week"} onClick={() => changeMode("week")}>Viikko</button>
        <button aria-pressed={mode === "course"} onClick={() => changeMode("course")}>Kurssi</button>
        <button aria-pressed={mode === "term"} onClick={() => changeMode("term")}>Jakso</button>
      </div>
    </header>

    {mode === "week" ? <WeekMap
      courses={courses}
      topics={topics}
      plan={activePlan}
      exams={exams}
      days={weekDays}
      capacity={capacity}
      plannedByDate={plannedByDate}
      onItem={openItem}
      onPrevious={() => shiftWeek(-1)}
      onNext={() => shiftWeek(1)}
      onAdd={() => setAdding(true)}
    /> : null}

    {mode === "course" ? <CourseMap
      courses={courses}
      topics={topics}
      items={selectedCourseItems}
      selectedCourseId={selectedCourse?.id ?? ""}
      exams={exams}
      onSelectCourse={setSelectedCourseId}
      onItem={openItem}
    /> : null}

    {mode === "term" ? <TermMap
      courses={courses}
      plan={activePlan}
      exams={exams}
      start={termStart}
      end={termEnd}
      totalDays={termDays}
      onItem={openItem}
    /> : null}

    {adding ? <TaskForm courses={courses} topics={topics} date={anchor} onClose={() => setAdding(false)} /> : null}

    {selectedItem ? <div className="studyos-map-detail-backdrop" role="presentation" onClick={() => setSelectedItem(null)}>
      <aside className="studyos-map-detail" role="dialog" aria-modal="true" aria-label="Opiskelujakson tiedot" onClick={(event) => event.stopPropagation()}>
        <button className="studyos-map-detail-close" onClick={() => setSelectedItem(null)} aria-label="Sulje"><X size={18} /></button>
        <p className="studyos-kicker">{courses.find((course) => course.id === selectedItem.course_id)?.code ?? "Opiskelu"}</p>
        <h2>{selectedItem.title || topics.find((topic) => topic.id === selectedItem.topic_id)?.name || "Opiskelujakso"}</h2>
        <p className="studyos-map-detail-meta">{fullDate(selectedItem.date)} · {minutes(selectedItem.target_minutes)} · {selectedItem.kind === "review" ? "kertaus" : selectedItem.kind === "test" ? "koeharjoittelu" : "opiskelu"}</p>
        <button className="studyos-start" onClick={() => { const id = selectedItem.id; setSelectedItem(null); onStart(id); }}><Play size={17} /> Aloita</button>
        <div className="studyos-map-shift">
          <label htmlFor="studyos-shift-date">Siirrä päivälle</label>
          <div><input id="studyos-shift-date" type="date" value={shiftDate} onChange={(event) => setShiftDate(event.target.value)} /><button disabled={move.isPending || shiftDate === selectedItem.date} onClick={() => void confirmShift()}>Siirrä</button></div>
        </div>
      </aside>
    </div> : null}
  </div>;
}

function WeekMap({
  courses,
  topics,
  plan,
  exams,
  days,
  capacity,
  plannedByDate,
  onItem,
  onPrevious,
  onNext,
  onAdd,
}: {
  courses: Course[];
  topics: Topic[];
  plan: PlanItem[];
  exams: Array<{ id: string; course_id: string; date: string; name: string }>;
  days: string[];
  capacity: CapacityProfile;
  plannedByDate: Map<string, number>;
  onItem: (item: PlanItem) => void;
  onPrevious: () => void;
  onNext: () => void;
  onAdd: () => void;
}) {
  return <>
    <div className="studyos-map-toolbar">
      <div className="studyos-map-period">
        <button onClick={onPrevious} aria-label="Edellinen viikko"><ArrowLeft size={17} /></button>
        <span>{fullDate(days[0])} – {fullDate(days[6])}</span>
        <button onClick={onNext} aria-label="Seuraava viikko"><ArrowRight size={17} /></button>
      </div>
      <button className="studyos-map-add" onClick={onAdd}><CalendarPlus size={16} /> Lisää</button>
    </div>

    <div className="studyos-map-grid" role="table" aria-label="Viikon opiskelukartta">
      <div className="studyos-map-row" role="row">
        <div className="studyos-map-cell studyos-map-day" role="columnheader">Kurssi</div>
        {days.map((day) => <div key={day} className="studyos-map-cell studyos-map-day" role="columnheader"><span>{fiWeekday(day)}</span><b>{dayNumber(day)}</b></div>)}
      </div>

      {courses.map((course) => <div key={course.id} className="studyos-map-row" role="row">
        <div className="studyos-map-cell studyos-map-course" role="rowheader"><b>{course.code}</b><small>{course.name}</small></div>
        {days.map((day) => {
          const items = plan.filter((item) => item.course_id === course.id && item.date === day && item.kind !== "exam");
          const exam = exams.find((candidate) => candidate.course_id === course.id && candidate.date === day);
          return <div key={day} className="studyos-map-cell" role="cell">
            {items.map((item) => <button key={item.id} className={"studyos-map-event " + (item.status === "completed" ? "is-done" : "")} onClick={() => onItem(item)}>
              <b>{item.start_time ? item.start_time.slice(0, 5) : minutes(item.target_minutes)}</b>
              <span>{item.title || topics.find((topic) => topic.id === item.topic_id)?.name || "Opiskelu"}</span>
            </button>)}
            {exam ? <div className="studyos-map-event studyos-map-exam"><b>◆ KOE</b><span>{exam.name}</span></div> : null}
          </div>;
        })}
      </div>)}

      <div className="studyos-map-load" aria-label="Päivien kuormitus">
        <div><strong>Kuorma</strong><span>suunniteltu / kapasiteetti</span></div>
        {days.map((day) => {
          const planned = plannedByDate.get(day) ?? 0;
          const cap = Math.max(1, capacityForDateV3(capacity, day));
          const ratio = Math.min(1.2, planned / cap);
          return <div key={day}><strong>{planned} / {cap} min</strong><div className="studyos-load-bar"><span style={{ width: `${Math.min(100, ratio * 100)}%` }} /></div></div>;
        })}
      </div>
    </div>
  </>;
}

function CourseMap({
  courses,
  topics,
  items,
  selectedCourseId,
  exams,
  onSelectCourse,
  onItem,
}: {
  courses: Course[];
  topics: Topic[];
  items: PlanItem[];
  selectedCourseId: string;
  exams: Array<{ id: string; course_id: string; date: string; name: string }>;
  onSelectCourse: (id: string) => void;
  onItem: (item: PlanItem) => void;
}) {
  const course = courses.find((candidate) => candidate.id === selectedCourseId);
  const exam = exams.filter((candidate) => candidate.course_id === selectedCourseId && candidate.date >= today()).sort((a, b) => a.date.localeCompare(b.date))[0];
  const grouped = items.reduce<Record<string, PlanItem[]>>((acc, item) => {
    (acc[item.date] ??= []).push(item);
    return acc;
  }, {});

  return <div className="studyos-course-map">
    <label className="studyos-map-course-select">Kurssi
      <select value={selectedCourseId} onChange={(event) => onSelectCourse(event.target.value)}>{courses.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.code} · {candidate.name}</option>)}</select>
    </label>

    <div className="studyos-course-path-head">
      <div><span>{course?.code}</span><h2>{course?.name}</h2></div>
      {exam ? <p><b>◆ {exam.name}</b><span>{fullDate(exam.date)} · {diffDays(exam.date, today())} pv</span></p> : null}
    </div>

    <div className="studyos-course-path">
      {Object.entries(grouped).map(([date, dateItems]) => <div key={date} className="studyos-course-path-stop">
        <div className="studyos-course-path-date">{fullDate(date)}</div>
        <div className="studyos-course-path-node" aria-hidden="true" />
        <div className="studyos-course-path-items">
          {dateItems.map((item) => <button key={item.id} onClick={() => onItem(item)} className={item.status === "completed" ? "is-done" : ""}>
            <b>{item.title || topics.find((topic) => topic.id === item.topic_id)?.name || "Opiskelujakso"}</b>
            <span>{minutes(item.target_minutes)} · {item.kind === "review" ? "kertaus" : "opiskelu"}</span>
          </button>)}
        </div>
      </div>)}
      {!items.length ? <p className="text-sm text-muted-foreground">Kurssille ei ole vielä tulevia opiskelujaksoja.</p> : null}
    </div>
  </div>;
}

function TermMap({
  courses,
  plan,
  exams,
  start,
  end,
  totalDays,
  onItem,
}: {
  courses: Course[];
  plan: PlanItem[];
  exams: Array<{ id: string; course_id: string; date: string; name: string }>;
  start: string;
  end: string;
  totalDays: number;
  onItem: (item: PlanItem) => void;
}) {
  return <div className="studyos-term-map">
    <div className="studyos-term-axis"><span>{fullDate(start)}</span><span>{fullDate(addDays(start, 14))}</span><span>{fullDate(addDays(start, 28))}</span><span>{fullDate(end)}</span></div>
    {courses.map((course) => {
      const items = plan.filter((item) => item.course_id === course.id && item.date >= start && item.date <= end && item.kind !== "exam");
      const courseExams = exams.filter((exam) => exam.course_id === course.id && exam.date >= start && exam.date <= end);
      return <div key={course.id} className="studyos-term-lane">
        <div className="studyos-term-label"><b>{course.code}</b><span>{course.name}</span></div>
        <div className="studyos-term-track">
          <div className="studyos-term-line" />
          {items.map((item) => {
            const offset = Math.max(0, Math.min(totalDays - 1, diffDays(item.date, start)));
            return <button key={item.id} className={"studyos-term-node " + (item.status === "completed" ? "is-done" : "")} style={{ left: `${(offset / (totalDays - 1)) * 100}%` }} onClick={() => onItem(item)} aria-label={`${course.code}, ${item.title || "opiskelu"}, ${fullDate(item.date)}`} />;
          })}
          {courseExams.map((exam) => {
            const offset = Math.max(0, Math.min(totalDays - 1, diffDays(exam.date, start)));
            return <span key={exam.id} className="studyos-term-exam" style={{ left: `${(offset / (totalDays - 1)) * 100}%` }} title={`${exam.name} ${fullDate(exam.date)}`}>◆</span>;
          })}
        </div>
      </div>;
    })}
  </div>;
}
