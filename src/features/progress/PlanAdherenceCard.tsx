import { useEffect, useMemo, useState } from "react";
import type { PlanItem, Session } from "@/lib/domain";
import { useCourses, usePracticeAttempts } from "@/lib/data";
import { usePlanItemEvents } from "@/lib/progress-data";
import { buildProgressTrajectory, pickTrajectoryCourse } from "@/lib/progress-trajectory";
import { today } from "@/lib/fi";
import { EmptyState } from "@/components/surfaces";
import { ProgressTrajectoryChart, dayDifferenceLabel, trajectoryStatus } from "@/features/progress/ProgressTrajectoryChart";

export function PlanAdherenceCard({ sessions, plan }: { sessions: Session[]; plan: PlanItem[] }) {
  const now = today();
  const coursesQuery = useCourses();
  const attemptsQuery = usePracticeAttempts();
  const historyQuery = usePlanItemEvents(plan);
  const courses = coursesQuery.data ?? [];
  const attempts = attemptsQuery.data ?? [];
  const events = historyQuery.data ?? [];
  const suggestedCourse = useMemo(
    () => pickTrajectoryCourse(courses, plan, now, events),
    [courses, events, now, plan],
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCourseId && courses.some(course => course.id === selectedCourseId && !course.archived)) return;
    setSelectedCourseId(suggestedCourse?.id ?? null);
  }, [courses, selectedCourseId, suggestedCourse?.id]);

  const selectedCourse = courses.find(course => course.id === selectedCourseId) ?? suggestedCourse ?? null;
  const options = courses.filter(course => !course.archived && (plan.some(item => item.course_id === course.id) || events.some(event => event.course_id === course.id)));
  const statuses = options.map(course => {
    const trajectory = buildProgressTrajectory({ course, plan, sessions, events, now });
    return { course, trajectory, status: trajectoryStatus(trajectory) };
  });

  if (!selectedCourse) return <div className="progress-summary-only"><EmptyState
    title="Käyrä muodostuu suunnitelmasta"
    body="Kun aktiivisella kurssilla on päivätty opiskelusuunnitelma, tähän muodostuu päivittäinen suunnitelma–toteuma-käyrä."
  /></div>;

  return <div className="progress-summary-only space-y-3">
    <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-border bg-surface p-3">
      <label className="text-xs font-medium text-muted-foreground">Näytettävä kurssi
        <select
          className="mt-1 block min-h-11 min-w-[220px] rounded-xl border border-border bg-surface px-3 text-sm text-foreground"
          value={selectedCourse.id}
          onChange={event => setSelectedCourseId(event.target.value)}
        >
          {options.map(course => <option key={course.id} value={course.id}>{course.code} · {course.name}</option>)}
        </select>
      </label>
      <p className="text-xs text-muted-foreground">Sama laskentamalli on käytössä myös kurssin Tarkemmassa analyysissä.</p>
    </div>

    <ProgressTrajectoryChart
      course={selectedCourse}
      plan={plan}
      sessions={sessions}
      events={events}
      attempts={attempts}
    />

    {statuses.length > 1 && <div className="rounded-2xl border border-border bg-surface p-3" aria-label="Aktiivisten kurssien tilanne">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Kurssit yhdellä vilkaisulla</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {statuses.map(({ course, trajectory, status }) => <button
          type="button"
          key={course.id}
          onClick={() => setSelectedCourseId(course.id)}
          className={`min-h-14 rounded-xl border px-3 py-2 text-left ${course.id === selectedCourse.id ? "border-primary bg-primary/5" : "border-border bg-background hover:bg-muted"}`}
        >
          <span className="flex items-center justify-between gap-2"><b>{course.code}</b><span className="text-xs">{status.label}</span></span>
          <span className="mt-1 block text-xs text-muted-foreground">{trajectory ? dayDifferenceLabel(trajectory.deviationStudyDays) : "Ei vielä vertailtavaa"}</span>
        </button>)}
      </div>
    </div>}
  </div>;
}
