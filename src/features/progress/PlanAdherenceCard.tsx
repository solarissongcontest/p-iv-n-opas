import { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PlanItem, Session } from "@/lib/domain";
import { useCourses } from "@/lib/data";
import { shortDate, today } from "@/lib/fi";
import {
  buildProgressTrajectory,
  pickTrajectoryCourse,
  type ProgressTrajectoryPoint,
  type ProgressTrajectorySummary,
} from "@/lib/progress-trajectory";
import { EmptyState, SectionCard, StatusBadge } from "@/components/surfaces";

function trajectoryStatus(summary: ProgressTrajectorySummary | null) {
  if (!summary || summary.deviationStudyDays == null) {
    return { label: "Ei vielä tarpeeksi dataa", tone: "neutral" as const, headline: "Ei vielä vertailtavaa" };
  }
  if (summary.deviationStudyDays >= 2) return { label: "Edellä", tone: "info" as const, headline: "Selvästi edellä" };
  if (summary.deviationStudyDays === 1) return { label: "Edellä", tone: "positive" as const, headline: "Hieman edellä" };
  if (summary.deviationStudyDays === 0) return { label: "Tahdissa", tone: "positive" as const, headline: "Tahdissa" };
  if (summary.deviationStudyDays === -1) return { label: "Hieman jäljessä", tone: "warning" as const, headline: "Hieman jäljessä" };
  return { label: "Jäljessä", tone: "warning" as const, headline: "Suunnitelmaa jäljessä" };
}

function dayDifferenceLabel(days: number | null) {
  if (days == null) return "Ei vielä päivävertailua";
  if (days === 0) return "Tämän päivän tavoitetasolla";
  const amount = Math.abs(days);
  return days > 0
    ? `${amount} opiskelupäivä${amount === 1 ? "" : "ä"} edellä`
    : `${amount} opiskelupäivä${amount === 1 ? "" : "ä"} jäljessä`;
}

function taskDifferenceLabel(summary: ProgressTrajectorySummary) {
  if (summary.behindTasks > 0) return `${summary.behindTasks} suunniteltua tehtävää vielä tekemättä`;
  if (summary.aheadTasks > 0) return `${summary.aheadTasks} tulevaa tehtävää tehty etuajassa`;
  return "Ei avoimia rästejä tähän päivään";
}

type TooltipRow = { payload?: ProgressTrajectoryPoint & { corridor?: [number, number] } };

function TrajectoryTooltip({ active, payload }: { active?: boolean; payload?: TooltipRow[] }) {
  if (!active || !payload?.length) return null;
  const point = payload.find(row => row.payload)?.payload;
  if (!point) return null;

  return <div className="max-w-[280px] rounded-xl border border-border bg-surface p-3 text-xs shadow-lg">
    <p className="font-semibold">{point.isToday ? `Tänään · ${point.label}` : point.label}</p>
    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
      <span className="text-muted-foreground">Suunnitelma</span><b>{Math.round(point.planned)} %</b>
      <span className="text-muted-foreground">Toteuma</span><b>{point.actual == null ? "—" : `${Math.round(point.actual)} %`}</b>
      <span className="text-muted-foreground">Opiskeltu</span><b>{point.studiedMinutesToday} min</b>
      {point.deviationStudyDays != null && <><span className="text-muted-foreground">Ero</span><b>{dayDifferenceLabel(point.deviationStudyDays)}</b></>}
    </div>
    {point.plannedTitles.length > 0 && <div className="mt-2 border-t border-border pt-2">
      <p className="font-medium">Suunniteltu tänään</p>
      {point.plannedTitles.slice(0, 4).map((title, index) => <p key={`${title}-${index}`} className="mt-1 text-muted-foreground">{title}</p>)}
    </div>}
    {point.completedTitles.length > 0 && <div className="mt-2 border-t border-border pt-2">
      <p className="font-medium">Valmistui tänään</p>
      {point.completedTitles.slice(0, 4).map((title, index) => <p key={`${title}-${index}`} className="mt-1 text-muted-foreground">{title}</p>)}
    </div>}
    {point.revised && <p className="mt-2 border-t border-border pt-2 text-muted-foreground">↻ Suunnitelmaa on mukautettu tämän päivän ympärillä.</p>}
  </div>;
}

export function PlanAdherenceCard({ sessions, plan }: { sessions: Session[]; plan: PlanItem[] }) {
  const now = today();
  const coursesQuery = useCourses();
  const courses = coursesQuery.data ?? [];
  const suggestedCourse = useMemo(() => pickTrajectoryCourse(courses, plan, now), [courses, now, plan]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"daily" | "course">("daily");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedCourseId && courses.some(course => course.id === selectedCourseId && !course.archived)) return;
    setSelectedCourseId(suggestedCourse?.id ?? null);
  }, [courses, selectedCourseId, suggestedCourse?.id]);

  const selectedCourse = courses.find(course => course.id === selectedCourseId) ?? suggestedCourse ?? null;
  const trajectory = useMemo(
    () => selectedCourse ? buildProgressTrajectory({ course: selectedCourse, plan, sessions, now }) : null,
    [now, plan, selectedCourse, sessions],
  );
  const status = trajectoryStatus(trajectory);
  const options = courses.filter(course => !course.archived && plan.some(item => item.course_id === course.id));
  const chartData = trajectory?.points.map(point => ({ ...point, corridor: [point.corridorLower, point.corridorUpper] as [number, number] })) ?? [];
  const dailyWidth = Math.max(760, chartData.length * 52);
  const chartWidth: number | string = viewMode === "daily" ? dailyWidth : "100%";
  const todayIndex = chartData.findIndex(point => point.isToday);

  useEffect(() => {
    if (viewMode !== "daily" || todayIndex < 0 || !scrollRef.current || chartData.length < 2) return;
    const frame = window.requestAnimationFrame(() => {
      const element = scrollRef.current;
      if (!element) return;
      const ratio = todayIndex / Math.max(1, chartData.length - 1);
      element.scrollLeft = Math.max(0, ratio * element.scrollWidth - element.clientWidth * 0.45);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [chartData.length, selectedCourseId, todayIndex, viewMode]);

  return (
    <SectionCard
      className="progress-v5-adherence progress-summary-only"
      title="Suunnitelmassa pysyminen"
      action={<StatusBadge tone={status.tone}>{status.label}</StatusBadge>}
    >
      {!trajectory || !selectedCourse ? <EmptyState
        title="Käyrä muodostuu suunnitelmasta"
        body="Kun aktiivisella kurssilla on päivätty opiskelusuunnitelma, tähän muodostuu päivittäinen suunnitelma–toteuma-käyrä."
      /> : <>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{selectedCourse.code} · {selectedCourse.name}</p>
            <p className="mt-1 text-3xl font-semibold">{status.headline}</p>
            <p className="mt-1 text-sm text-muted-foreground">{dayDifferenceLabel(trajectory.deviationStudyDays)} · {taskDifferenceLabel(trajectory)}</p>
            <p className="mt-2 text-sm">
              <b>{trajectory.adherencePercent == null ? "—" : `${trajectory.adherencePercent} %`}</b>
              <span className="text-muted-foreground"> tähän päivään suunnitellusta työstä tehty</span>
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-2">
            {options.length > 1 && <label className="text-xs font-medium text-muted-foreground">Kurssi
              <select
                className="mt-1 block min-h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground"
                value={selectedCourse.id}
                onChange={event => setSelectedCourseId(event.target.value)}
              >
                {options.map(course => <option key={course.id} value={course.id}>{course.code} · {course.name}</option>)}
              </select>
            </label>}
            <div className="flex rounded-xl bg-muted p-1" aria-label="Kuvaajan tarkkuus">
              <button type="button" aria-pressed={viewMode === "daily"} onClick={() => setViewMode("daily")} className={`min-h-9 rounded-lg px-3 text-xs ${viewMode === "daily" ? "bg-surface font-semibold shadow-sm" : ""}`}>Päivittäin</button>
              <button type="button" aria-pressed={viewMode === "course"} onClick={() => setViewMode("course")} className={`min-h-9 rounded-lg px-3 text-xs ${viewMode === "course" ? "bg-surface font-semibold shadow-sm" : ""}`}>Koko kurssi</button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground" aria-label="Kuvaajan selite">
          <span className="flex items-center gap-2"><i className="h-0.5 w-6 bg-primary"/>Toteuma</span>
          <span className="flex items-center gap-2"><i className="h-0.5 w-6 border-t-2 border-dashed border-foreground/60"/>Suunnitelma</span>
          <span className="flex items-center gap-2"><i className="h-0.5 w-6 border-t-2 border-dashed border-primary/60"/>Ennuste</span>
          <span className="flex items-center gap-2"><i className="h-3 w-6 rounded bg-primary/10"/>Tavoitealue</span>
          <span className="font-medium text-foreground">Tänään {shortDate(now)}</span>
        </div>

        <div ref={scrollRef} className="mt-3 overflow-x-auto overscroll-x-contain pb-2">
          <div style={{ width: chartWidth, minWidth: viewMode === "daily" ? dailyWidth : 0, height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 22, right: 22, bottom: viewMode === "daily" ? 36 : 8, left: -8 }}>
                <CartesianGrid vertical={false} stroke="var(--hairline)" />
                <XAxis
                  dataKey="date"
                  interval={viewMode === "daily" ? 0 : "preserveStartEnd"}
                  tickFormatter={value => shortDate(String(value))}
                  tickLine={false}
                  axisLine={false}
                  angle={viewMode === "daily" ? -45 : 0}
                  textAnchor={viewMode === "daily" ? "end" : "middle"}
                  height={viewMode === "daily" ? 58 : 30}
                  minTickGap={viewMode === "daily" ? 0 : 24}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                />
                <YAxis domain={[0, 100]} width={42} tickLine={false} axisLine={false} tickFormatter={value => `${value}%`} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                <Tooltip content={<TrajectoryTooltip/>} cursor={{ stroke: "var(--muted-foreground)", strokeOpacity: 0.3 }} />
                <Area type="monotone" dataKey="corridor" stroke="none" fill="var(--primary)" fillOpacity={0.08} isAnimationActive={false} />
                <Line type="monotone" dataKey="planned" name="Suunnitelma" stroke="var(--foreground)" strokeOpacity={0.48} strokeWidth={2} strokeDasharray="6 5" dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="actual" name="Toteuma" stroke="var(--primary)" strokeWidth={3} dot={viewMode === "daily" ? { r: 2, fill: "var(--surface)", stroke: "var(--primary)", strokeWidth: 1.5 } : false} activeDot={{ r: 5 }} connectNulls={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="forecast" name="Ennuste" stroke="var(--primary)" strokeOpacity={0.62} strokeWidth={2} strokeDasharray="3 5" dot={false} connectNulls={false} isAnimationActive={false} />
                {chartData.some(point => point.isToday) && <ReferenceLine
                  x={now}
                  stroke="var(--foreground)"
                  strokeWidth={2}
                  strokeOpacity={0.7}
                  label={{ value: `TÄNÄÄN ${shortDate(now)}`, position: "insideTopRight", fill: "var(--foreground)", fontSize: 10, fontWeight: 700 }}
                />}
                <ReferenceLine x={trajectory.startDate} stroke="var(--muted-foreground)" strokeOpacity={0.25} />
                <ReferenceLine x={trajectory.endDate} stroke="var(--muted-foreground)" strokeOpacity={0.45} label={{ value: "KOE", position: "insideTopLeft", fill: "var(--muted-foreground)", fontSize: 10 }} />
                {chartData.filter(point => point.revised).slice(0, 12).map(point => <ReferenceLine key={`revision-${point.date}`} x={point.date} stroke="var(--muted-foreground)" strokeDasharray="2 5" strokeOpacity={0.28} />)}
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-1" style={{ width: chartWidth, minWidth: viewMode === "daily" ? dailyWidth : 0, height: 78 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 4, right: 22, bottom: 4, left: -8 }}>
                <CartesianGrid vertical={false} stroke="var(--hairline)" />
                <XAxis dataKey="date" hide />
                <YAxis width={42} tickLine={false} axisLine={false} allowDecimals={false} tick={{ fill: "var(--muted-foreground)", fontSize: 9 }} />
                <ReferenceLine y={0} stroke="var(--muted-foreground)" strokeOpacity={0.55} />
                <Bar dataKey="deviationStudyDays" fill="var(--primary)" fillOpacity={0.42} maxBarSize={18} isAnimationActive={false} />
                {chartData.some(point => point.isToday) && <ReferenceLine x={now} stroke="var(--foreground)" strokeOpacity={0.5} />}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-3 grid gap-3 rounded-2xl bg-muted/55 p-4 text-sm sm:grid-cols-3">
          <div><p className="text-xs text-muted-foreground">Kurssi</p><b>{shortDate(trajectory.startDate)} → {shortDate(trajectory.endDate)}</b></div>
          <div><p className="text-xs text-muted-foreground">Tänään</p><b>{trajectory.completedMinutesNow} / {trajectory.plannedMinutesNow} min suunnitellusta työstä</b></div>
          <div><p className="text-xs text-muted-foreground">Ennuste</p><b>{trajectory.hasForecast ? trajectory.forecastFinishDate ? `Nykyvauhdilla valmis ${shortDate(trajectory.forecastFinishDate)}` : `${Math.round(trajectory.projectedAtEnd ?? 0)} % koepäivään mennessä` : "Muodostuu vähintään kolmesta toteutuspäivästä"}</b></div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Jokainen kurssipäivä on mukana datassa. Päivittäin-näkymässä kaikki päivät ovat luettavissa vierittämällä; Koko kurssi tiivistää saman datan. Toteuma loppuu tähän päivään ja tulevaisuus näytetään vain erillisenä ennusteena.
        </p>

        <div className="sr-only">
          {trajectory.points.map(point => <p key={point.date}>
            {point.date}{point.isToday ? ", tänään" : ""}: suunnitelma {Math.round(point.planned)} prosenttia, toteuma {point.actual == null ? "ei vielä toteumaa" : `${Math.round(point.actual)} prosenttia`}{point.deviationStudyDays == null ? "" : `, ${dayDifferenceLabel(point.deviationStudyDays)}`}.
          </p>)}
        </div>
      </>}
    </SectionCard>
  );
}
