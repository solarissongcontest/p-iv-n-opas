import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Course, PlanItem, PracticeAttempt, Session } from "@/lib/domain";
import type { PlanItemEvent, TrajectoryMode } from "@/lib/progress-types";
import {
  buildProgressTrajectory,
  type ProgressRevision,
  type ProgressTrajectoryPoint,
  type ProgressTrajectorySummary,
} from "@/lib/progress-trajectory";
import { practiceEvidenceScore } from "@/lib/progress-data";
import { shortDate, today } from "@/lib/fi";
import { EmptyState, SectionCard, StatusBadge } from "@/components/surfaces";

export function trajectoryStatus(summary: ProgressTrajectorySummary | null) {
  if (!summary || summary.deviationStudyDays == null) {
    return { label: "Ei vielä tarpeeksi dataa", tone: "neutral" as const, headline: "Ei vielä vertailtavaa" };
  }
  if (summary.deviationStudyDays >= 2) return { label: "Edellä", tone: "info" as const, headline: "Selvästi edellä" };
  if (summary.deviationStudyDays === 1) return { label: "Edellä", tone: "positive" as const, headline: "Hieman edellä" };
  if (summary.deviationStudyDays === 0) return { label: "Tahdissa", tone: "positive" as const, headline: "Tahdissa" };
  if (summary.deviationStudyDays === -1) return { label: "Hieman jäljessä", tone: "warning" as const, headline: "Hieman jäljessä" };
  return { label: "Jäljessä", tone: "warning" as const, headline: "Suunnitelmaa jäljessä" };
}

export function dayDifferenceLabel(days: number | null) {
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

function eventLabel(revision: ProgressRevision) {
  const labels: Record<ProgressRevision["eventType"], string> = {
    created: "Lisätty",
    moved: "Siirretty",
    resized: "Työmäärää muutettu",
    completed: "Valmistui",
    reopened: "Avattu uudelleen",
    skipped: "Ohitettu",
    status_changed: "Tila muuttui",
    edited: "Muokattu",
    deleted: "Poistettu",
  };
  return labels[revision.eventType];
}

function revisionDetail(revision: ProgressRevision) {
  const oldDate = revision.oldSnapshot?.date;
  const newDate = revision.newSnapshot?.date;
  const oldMinutes = revision.oldSnapshot?.target_minutes;
  const newMinutes = revision.newSnapshot?.target_minutes;
  const oldStatus = revision.oldSnapshot?.status;
  const newStatus = revision.newSnapshot?.status;
  const pieces: string[] = [];
  if (oldDate && newDate && oldDate !== newDate) pieces.push(`${shortDate(oldDate)} → ${shortDate(newDate)}`);
  if (oldMinutes != null && newMinutes != null && oldMinutes !== newMinutes) pieces.push(`${oldMinutes} min → ${newMinutes} min`);
  if (oldStatus && newStatus && oldStatus !== newStatus) pieces.push(`${oldStatus} → ${newStatus}`);
  return pieces.join(" · ");
}

function evidenceSeries(attempts: PracticeAttempt[], points: ProgressTrajectoryPoint[], courseId: string) {
  const courseAttempts = attempts
    .filter(attempt => attempt.course_id === courseId)
    .sort((a, b) => a.date.localeCompare(b.date) || a.created_at.localeCompare(b.created_at));

  return points.map(point => {
    const seen = courseAttempts.filter(attempt => attempt.date <= point.date).slice(-20);
    if (!seen.length || point.actual == null) return { ...point, evidence: null as number | null };
    const weighted = seen.reduce((sum, attempt, index) => {
      const recency = 0.55 + (index + 1) / seen.length * 0.45;
      return sum + practiceEvidenceScore(attempt) * recency;
    }, 0);
    const weights = seen.reduce((sum, _attempt, index) => sum + 0.55 + (index + 1) / seen.length * 0.45, 0);
    return { ...point, evidence: Math.round(weighted / Math.max(1, weights)) };
  });
}

type ChartRow = ProgressTrajectoryPoint & {
  corridor: [number, number];
  plannedWork: number;
  actualWork: number;
  evidence: number | null;
};

type TooltipPayload = { payload?: ChartRow };

type DotProps = {
  cx?: number;
  cy?: number;
  value?: number | null;
  payload?: ChartRow;
};

function ActualDot({ cx, cy, value, payload }: DotProps) {
  if (cx == null || cy == null || value == null || !payload) return null;
  const important = payload.isToday || payload.completedMinutesToday > 0 || payload.revised || payload.isCourseStart;
  if (!important) return null;
  return <circle
    cx={cx}
    cy={cy}
    r={payload.isToday ? 4.5 : 2.8}
    fill="var(--surface)"
    stroke="var(--chart-1)"
    strokeWidth={payload.isToday ? 2.5 : 1.8}
    data-trajectory-dot="actual"
  />;
}

function PlanDot({ cx, cy, value, payload }: DotProps) {
  if (cx == null || cy == null || value == null || !payload) return null;
  const important = payload.isToday || payload.plannedMinutesToday > 0 || payload.isCourseStart || payload.isExam || payload.revised;
  if (!important) return null;
  return <circle
    cx={cx}
    cy={cy}
    r={payload.isToday ? 3.8 : 2.3}
    fill="var(--surface)"
    stroke="var(--chart-2)"
    strokeWidth={1.7}
    data-trajectory-dot="planned"
  />;
}

function TrajectoryTooltip({ active, payload, mode }: { active?: boolean; payload?: TooltipPayload[]; mode: TrajectoryMode }) {
  if (!active || !payload?.length) return null;
  const point = payload.find(row => row.payload)?.payload;
  if (!point) return null;

  return <div className="max-w-[300px] rounded-xl border border-border bg-surface p-3 text-xs shadow-lg">
    <p className="font-semibold">{point.isToday ? `Tänään · ${point.label}` : point.label}</p>
    {mode === "progress" && <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
      <span className="text-muted-foreground">Suunnitelma</span><b>{Math.round(point.planned)} %</b>
      <span className="text-muted-foreground">Toteuma</span><b>{point.actual == null ? "—" : `${Math.round(point.actual)} %`}</b>
      <span className="text-muted-foreground">Opiskeltu</span><b>{point.studiedMinutesToday} min</b>
      {point.deviationStudyDays != null && <><span className="text-muted-foreground">Ero</span><b>{dayDifferenceLabel(point.deviationStudyDays)}</b></>}
    </div>}
    {mode === "workload" && <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
      <span className="text-muted-foreground">Suunniteltu työ</span><b>{point.plannedWork} min</b>
      <span className="text-muted-foreground">Opiskeltu</span><b>{point.actualWork} min</b>
      <span className="text-muted-foreground">Päivän suunnitelma</span><b>{point.plannedMinutesToday} min</b>
      <span className="text-muted-foreground">Päivän toteuma</span><b>{point.studiedMinutesToday} min</b>
    </div>}
    {mode === "mastery" && <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
      <span className="text-muted-foreground">Harjoitusnäyttö</span><b>{point.evidence == null ? "—" : `${point.evidence} / 100`}</b>
    </div>}
    {point.plannedTitles.length > 0 && <div className="mt-2 border-t border-border pt-2">
      <p className="font-medium">Suunniteltu tänään</p>
      {point.plannedTitles.slice(0, 4).map((itemTitle, index) => <p key={`${itemTitle}-${index}`} className="mt-1 text-muted-foreground">{itemTitle}</p>)}
    </div>}
    {point.revisions.length > 0 && <div className="mt-2 border-t border-border pt-2">
      <p className="font-medium">Suunnitelman muutokset</p>
      {point.revisions.slice(0, 4).map(revision => <p key={revision.id} className="mt-1 text-muted-foreground">
        {eventLabel(revision)}{revisionDetail(revision) ? ` · ${revisionDetail(revision)}` : ""}
      </p>)}
    </div>}
  </div>;
}

export function ProgressTrajectoryChart({
  course,
  plan,
  sessions,
  events,
  attempts,
  title = "Suunnitelmassa pysyminen",
  defaultView = "daily",
}: {
  course: Course;
  plan: PlanItem[];
  sessions: Session[];
  events: PlanItemEvent[];
  attempts: PracticeAttempt[];
  title?: string;
  defaultView?: "daily" | "course";
}) {
  const now = today();
  const visualId = useId().replace(/:/g, "");
  const [viewMode, setViewMode] = useState<"daily" | "course">(defaultView);
  const [mode, setMode] = useState<TrajectoryMode>("progress");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trajectory = useMemo(
    () => buildProgressTrajectory({ course, plan, sessions, events, now }),
    [course, events, now, plan, sessions],
  );
  const status = trajectoryStatus(trajectory);
  const evidence = useMemo(
    () => trajectory ? evidenceSeries(attempts, trajectory.points, course.id) : [],
    [attempts, course.id, trajectory],
  );
  const evidenceByDate = new Map(evidence.map(point => [point.date, point.evidence]));
  const chartData: ChartRow[] = trajectory?.points.map(point => ({
    ...point,
    corridor: [point.corridorLower, point.corridorUpper],
    plannedWork: viewMode === "daily" ? point.plannedMinutesToday : point.plannedMinutesCumulative,
    actualWork: viewMode === "daily" ? point.studiedMinutesToday : point.studiedMinutesCumulative,
    evidence: evidenceByDate.get(point.date) ?? null,
  })) ?? [];

  const dailyWidth = Math.max(760, chartData.length * 52);
  const chartWidth: number | string = viewMode === "daily" ? dailyWidth : "100%";
  const todayIndex = chartData.findIndex(point => point.isToday);
  const fallbackIndex = chartData.reduce((best, point, index) => point.date <= now ? index : best, 0);
  const currentIndex = todayIndex >= 0 ? todayIndex : Math.max(0, fallbackIndex);
  const currentPoint = chartData[currentIndex] ?? null;
  const latestActualPoint = [...chartData].reverse().find(point => point.actual != null) ?? null;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const selectedIndex = Math.max(0, chartData.findIndex(point => point.date === selectedDate));
  const selectedPoint = chartData.find(point => point.date === selectedDate) ?? currentPoint;
  const actualPointCount = chartData.filter(point => point.actual != null).length;
  const progressGap = currentPoint?.actual == null ? null : Math.round(currentPoint.actual - currentPoint.planned);
  const deviationMax = Math.max(1, ...chartData.map(point => Math.abs(point.deviationStudyDays ?? 0)));

  useEffect(() => {
    setSelectedDate(chartData[currentIndex]?.date ?? null);
  }, [course.id, currentIndex, chartData.length]);

  useEffect(() => {
    if (viewMode !== "daily" || todayIndex < 0 || !scrollRef.current || chartData.length < 2) return;
    const frame = window.requestAnimationFrame(() => {
      const element = scrollRef.current;
      if (!element) return;
      const ratio = todayIndex / Math.max(1, chartData.length - 1);
      element.scrollLeft = Math.max(0, ratio * element.scrollWidth - element.clientWidth * 0.45);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [chartData.length, course.id, todayIndex, viewMode]);

  if (!trajectory) return <SectionCard title={title}><EmptyState
    title="Käyrä muodostuu suunnitelmasta"
    body="Kun kurssilla on päivätty opiskelusuunnitelma, tähän muodostuu päivittäinen suunnitelma–toteuma-käyrä."
  /></SectionCard>;

  const latestEvidence = [...chartData].reverse().find(point => point.evidence != null)?.evidence ?? null;
  const yMax = mode === "workload" ? undefined : 100;
  const primaryValue = mode === "progress"
    ? status.headline
    : mode === "workload"
      ? `${selectedPoint?.studiedMinutesCumulative ?? 0} min opiskeltu`
      : latestEvidence == null ? "Ei vielä harjoitusnäyttöä" : `${latestEvidence} / 100`;

  const pickDay = (nextIndex: number) => {
    const point = chartData[Math.max(0, Math.min(chartData.length - 1, nextIndex))];
    if (point) setSelectedDate(point.date);
  };

  return <SectionCard
    className="progress-trajectory-card"
    title={title}
    action={mode === "progress" ? <StatusBadge tone={status.tone}>{status.label}</StatusBadge> : undefined}
  >
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{course.code} · {course.name}</p>
        <p className="mt-1 text-3xl font-semibold">{primaryValue}</p>
        {mode === "progress" && <>
          <p className="mt-1 text-sm text-muted-foreground">{dayDifferenceLabel(trajectory.deviationStudyDays)} · {taskDifferenceLabel(trajectory)}</p>
          <p className="mt-2 text-sm"><b>{trajectory.adherencePercent == null ? "—" : `${trajectory.adherencePercent} %`}</b><span className="text-muted-foreground"> tähän päivään suunnitellusta työstä tehty</span></p>
        </>}
        {mode === "workload" && <p className="mt-1 text-sm text-muted-foreground">Suunniteltu työmäärä ja oikeasti kirjattu opiskeluaika pidetään erillään etenemisestä.</p>}
        {mode === "mastery" && <p className="mt-1 text-sm text-muted-foreground">Harjoitusnäyttö perustuu viimeisimpiin harjoitusyrityksiin. Se ei ole arvosana- tai osaamisprosentti.</p>}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl bg-muted p-1" aria-label="Kuvaajan sisältö">
          {([["progress", "Eteneminen"], ["workload", "Työmäärä"], ["mastery", "Osaaminen"]] as Array<[TrajectoryMode, string]>).map(([id, label]) => <button
            key={id}
            type="button"
            aria-pressed={mode === id}
            onClick={() => setMode(id)}
            className={`min-h-10 rounded-lg px-3 text-xs ${mode === id ? "bg-surface font-semibold shadow-sm" : ""}`}
          >{label}</button>)}
        </div>
        <div className="flex rounded-xl bg-muted p-1" aria-label="Kuvaajan tarkkuus">
          <button type="button" aria-pressed={viewMode === "daily"} onClick={() => setViewMode("daily")} className={`min-h-10 rounded-lg px-3 text-xs ${viewMode === "daily" ? "bg-surface font-semibold shadow-sm" : ""}`}>Päivittäin</button>
          <button type="button" aria-pressed={viewMode === "course"} onClick={() => setViewMode("course")} className={`min-h-10 rounded-lg px-3 text-xs ${viewMode === "course" ? "bg-surface font-semibold shadow-sm" : ""}`}>Koko kurssi</button>
        </div>
      </div>
    </div>

    {mode === "progress" && <div className="mt-4 grid gap-2 sm:grid-cols-3" aria-label="Etenemisen luvut">
      <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
        <p className="text-xs text-muted-foreground">Suunnitelma nyt</p>
        <p className="mt-0.5 text-lg font-semibold">{currentPoint ? `${Math.round(currentPoint.planned)} %` : "—"}</p>
      </div>
      <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
        <p className="text-xs text-muted-foreground">Toteuma nyt</p>
        <p className="mt-0.5 text-lg font-semibold text-primary">{currentPoint?.actual == null ? "—" : `${Math.round(currentPoint.actual)} %`}</p>
      </div>
      <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
        <p className="text-xs text-muted-foreground">Ero suunnitelmaan</p>
        <p className="mt-0.5 text-lg font-semibold">{progressGap == null ? "—" : progressGap === 0 ? "0 %-yks." : `${progressGap > 0 ? "+" : ""}${progressGap} %-yks.`}</p>
      </div>
    </div>}

    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground" aria-label="Kuvaajan selite">
      {mode === "progress" && <>
        <span className="flex items-center gap-2"><i className="h-0.5 w-6 bg-chart-1"/>Toteuma</span>
        <span className="flex items-center gap-2"><i className="h-0.5 w-6 border-t-2 border-dashed border-chart-2"/>Suunnitelma</span>
        <span className="flex items-center gap-2"><i className="h-0.5 w-6 border-t-2 border-dashed border-chart-3"/>Ennuste</span>
        <span className="flex items-center gap-2"><i className="h-3 w-6 rounded bg-chart-2/10"/>Tavoitealue</span>
      </>}
      {mode === "workload" && <><span className="flex items-center gap-2"><i className="h-3 w-4 rounded-sm bg-chart-2/35"/>Suunniteltu työ</span><span className="flex items-center gap-2"><i className="h-3 w-4 rounded-sm bg-chart-1/70"/>Kirjattu opiskeluaika</span></>}
      {mode === "mastery" && <span className="flex items-center gap-2"><i className="h-0.5 w-6 bg-chart-4"/>Harjoitusnäytön kehitys</span>}
      <span className="font-medium text-foreground">Tänään {shortDate(now)}</span>
    </div>

    <div ref={scrollRef} className="mt-3 overflow-x-auto overscroll-x-contain pb-2">
      <div
        data-testid="trajectory-main-plot"
        className="rounded-2xl border border-border bg-background/45 px-1 pt-2"
        style={{ width: chartWidth, minWidth: viewMode === "daily" ? dailyWidth : 0, height: 360 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 26, right: 22, bottom: viewMode === "daily" ? 36 : 8, left: -4 }}
            onClick={(state: any) => state?.activePayload?.[0]?.payload?.date && setSelectedDate(state.activePayload[0].payload.date)}
          >
            <defs>
              <linearGradient id={`${visualId}-actual-fill`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.2}/>
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.015}/>
              </linearGradient>
              <linearGradient id={`${visualId}-mastery-fill`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-4)" stopOpacity={0.18}/>
                <stop offset="100%" stopColor="var(--chart-4)" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--hairline)" strokeDasharray="3 5" />
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
            <YAxis
              domain={yMax == null ? [0, "auto"] : [0, yMax]}
              {...(mode === "workload" ? {} : { ticks: [0, 25, 50, 75, 100] })}
              width={52}
              tickLine={false}
              axisLine={false}
              tickFormatter={value => mode === "progress" ? `${value}%` : String(value)}
              tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
            />
            <Tooltip content={<TrajectoryTooltip mode={mode}/>} cursor={{ stroke: "var(--muted-foreground)", strokeOpacity: 0.3 }} />

            {mode === "progress" && <>
              <Area type="monotone" dataKey="corridor" stroke="none" fill="var(--chart-2)" fillOpacity={0.1} isAnimationActive={false} />
              <Area type="monotone" dataKey="actual" stroke="none" fill={`url(#${visualId}-actual-fill)`} isAnimationActive={false} />
              <Line
                className="trajectory-actual-line"
                type="monotone"
                dataKey="actual"
                name="Toteuma"
                stroke="var(--chart-1)"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={(props: DotProps) => <ActualDot {...props}/>}
                activeDot={{ r: 5.5, fill: "var(--surface)", stroke: "var(--chart-1)", strokeWidth: 2.5 }}
                connectNulls={false}
                isAnimationActive={false}
              />
              <Line
                className="trajectory-plan-line"
                type="monotone"
                dataKey="planned"
                name="Suunnitelma"
                stroke="var(--chart-2)"
                strokeOpacity={0.95}
                strokeWidth={2.4}
                strokeDasharray="7 5"
                strokeLinecap="round"
                dot={(props: DotProps) => <PlanDot {...props}/>}
                activeDot={{ r: 4.5, fill: "var(--surface)", stroke: "var(--chart-2)", strokeWidth: 2 }}
                isAnimationActive={false}
              />
              <Line
                className="trajectory-forecast-line"
                type="monotone"
                dataKey="forecast"
                name="Ennuste"
                stroke="var(--chart-3)"
                strokeOpacity={0.9}
                strokeWidth={2.2}
                strokeDasharray="3 5"
                strokeLinecap="round"
                dot={false}
                connectNulls={false}
                isAnimationActive={false}
              />
              {latestActualPoint?.actual != null && <ReferenceDot
                x={latestActualPoint.date}
                y={latestActualPoint.actual}
                r={5}
                fill="var(--surface)"
                stroke="var(--chart-1)"
                strokeWidth={2.5}
                isFront
              />}
              {currentPoint && <ReferenceDot
                x={currentPoint.date}
                y={currentPoint.planned}
                r={3.8}
                fill="var(--surface)"
                stroke="var(--chart-2)"
                strokeWidth={2}
                isFront
              />}
            </>}

            {mode === "workload" && viewMode === "daily" && <>
              <Bar dataKey="plannedWork" name="Suunniteltu" fill="var(--chart-2)" fillOpacity={0.3} radius={[4, 4, 0, 0]} maxBarSize={20} isAnimationActive={false}/>
              <Bar dataKey="actualWork" name="Opiskeltu" fill="var(--chart-1)" fillOpacity={0.78} radius={[4, 4, 0, 0]} maxBarSize={20} isAnimationActive={false}/>
            </>}
            {mode === "workload" && viewMode === "course" && <>
              <Area type="monotone" dataKey="actualWork" stroke="none" fill={`url(#${visualId}-actual-fill)`} isAnimationActive={false}/>
              <Line type="monotone" dataKey="actualWork" name="Opiskeltu" stroke="var(--chart-1)" strokeWidth={3.2} dot={false} isAnimationActive={false}/>
              <Line type="monotone" dataKey="plannedWork" name="Suunniteltu" stroke="var(--chart-2)" strokeWidth={2.3} strokeDasharray="7 5" dot={false} isAnimationActive={false}/>
            </>}

            {mode === "mastery" && <>
              <Area type="monotone" dataKey="evidence" stroke="none" fill={`url(#${visualId}-mastery-fill)`} isAnimationActive={false}/>
              <Line
                type="monotone"
                dataKey="evidence"
                name="Harjoitusnäyttö"
                stroke="var(--chart-4)"
                strokeWidth={3.2}
                strokeLinecap="round"
                dot={{ r: 2.8, fill: "var(--surface)", stroke: "var(--chart-4)", strokeWidth: 1.8 }}
                activeDot={{ r: 5 }}
                connectNulls={false}
                isAnimationActive={false}
              />
            </>}

            {chartData.some(point => point.isToday) && <ReferenceLine x={now} stroke="var(--foreground)" strokeWidth={2} strokeOpacity={0.72} label={{ value: `TÄNÄÄN ${shortDate(now)}`, position: "insideTopRight", fill: "var(--foreground)", fontSize: 10, fontWeight: 700 }} />}
            <ReferenceLine x={trajectory.startDate} stroke="var(--muted-foreground)" strokeOpacity={0.3} label={{ value: "ALKU", position: "insideTopRight", fill: "var(--muted-foreground)", fontSize: 9 }} />
            <ReferenceLine x={trajectory.endDate} stroke="var(--muted-foreground)" strokeOpacity={0.5} label={{ value: "KOE", position: "insideTopLeft", fill: "var(--muted-foreground)", fontSize: 10 }} />
            {chartData.filter(point => point.revised).slice(0, 24).map(point => <ReferenceLine key={`revision-${point.date}`} x={point.date} stroke="var(--muted-foreground)" strokeDasharray="2 5" strokeOpacity={0.36} />)}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {mode === "progress" && actualPointCount <= 1 && <div className="mt-2 rounded-xl border border-border bg-muted/45 px-3 py-2 text-xs text-muted-foreground">
        Toteumakäyrä on vasta alussa. Ensimmäinen piste näkyy silti, ja käyrä yhdistyy automaattisesti sitä mukaa kun opiskelupäiviä kertyy.
      </div>}

      {mode === "progress" && <div className="mt-3" style={{ width: chartWidth, minWidth: viewMode === "daily" ? dailyWidth : 0 }}>
        <div className="mb-1 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Opiskelupäivien ero</span>
          <span>ylös = edellä · alas = jäljessä</span>
        </div>
        <div className="h-[92px] rounded-xl border border-border bg-background/35 px-1 pt-1" data-testid="trajectory-deviation-plot">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 4, right: 22, bottom: 4, left: -4 }}>
              <CartesianGrid vertical={false} stroke="var(--hairline)" strokeDasharray="3 5" />
              <XAxis dataKey="date" hide />
              <YAxis domain={[-deviationMax, deviationMax]} width={44} tickLine={false} axisLine={false} allowDecimals={false} tick={{ fill: "var(--muted-foreground)", fontSize: 9 }} />
              <ReferenceLine y={0} stroke="var(--muted-foreground)" strokeOpacity={0.65} />
              <Bar dataKey="deviationStudyDays" maxBarSize={18} isAnimationActive={false}>
                {chartData.map(point => <Cell
                  key={`deviation-${point.date}`}
                  fill={(point.deviationStudyDays ?? 0) > 0 ? "var(--status-done)" : (point.deviationStudyDays ?? 0) < 0 ? "var(--status-overdue)" : "var(--muted-foreground)"}
                  fillOpacity={(point.deviationStudyDays ?? 0) === 0 ? 0.22 : 0.55}
                />)}
              </Bar>
              {chartData.some(point => point.isToday) && <ReferenceLine x={now} stroke="var(--foreground)" strokeOpacity={0.55} />}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>}
    </div>

    {selectedPoint && <div className="mt-3 rounded-2xl bg-muted/55 p-4" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <div><p className="text-xs font-medium text-muted-foreground">Valittu päivä</p><p className="font-semibold">{selectedPoint.isToday ? "Tänään · " : ""}{selectedPoint.label}</p></div>
        <div className="flex gap-1">
          <button type="button" className="min-h-11 min-w-11 rounded-xl border border-border bg-surface px-3" onClick={() => pickDay(selectedIndex - 1)} disabled={selectedIndex <= 0} aria-label="Edellinen päivä">←</button>
          <button type="button" className="min-h-11 min-w-11 rounded-xl border border-border bg-surface px-3" onClick={() => pickDay(selectedIndex + 1)} disabled={selectedIndex >= chartData.length - 1} aria-label="Seuraava päivä">→</button>
        </div>
      </div>
      <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
        <div><p className="text-xs text-muted-foreground">Suunnitelma / toteuma</p><p className="font-semibold">{Math.round(selectedPoint.planned)} % / {selectedPoint.actual == null ? "—" : `${Math.round(selectedPoint.actual)} %`}</p></div>
        <div><p className="text-xs text-muted-foreground">Työmäärä tänään</p><p className="font-semibold">{selectedPoint.plannedMinutesToday} / {selectedPoint.studiedMinutesToday} min</p></div>
        <div><p className="text-xs text-muted-foreground">Ero</p><p className="font-semibold">{dayDifferenceLabel(selectedPoint.deviationStudyDays)}</p></div>
      </div>
      {selectedPoint.revisions.length > 0 && <div className="mt-3 border-t border-border pt-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Suunnitelman muutos</p>
        {selectedPoint.revisions.map(revision => <p key={revision.id} className="mt-1 text-sm"><b>{eventLabel(revision)}</b>{revisionDetail(revision) ? ` · ${revisionDetail(revision)}` : ""}</p>)}
      </div>}
    </div>}

    <div className="mt-3 grid gap-3 rounded-2xl bg-muted/35 p-4 text-sm sm:grid-cols-3">
      <div><p className="text-xs text-muted-foreground">Kurssin aikajana</p><p className="font-semibold">{shortDate(trajectory.startDate)} → {shortDate(trajectory.endDate)}</p></div>
      <div><p className="text-xs text-muted-foreground">Tähän päivään</p><p className="font-semibold">{trajectory.completedMinutesNow} / {trajectory.plannedMinutesNow} min suunnitellusta työstä</p></div>
      <div><p className="text-xs text-muted-foreground">Ennuste</p><p className="font-semibold">{trajectory.hasForecast ? trajectory.forecastFinishDate ? `Valmis noin ${shortDate(trajectory.forecastFinishDate)}` : `${Math.round(trajectory.projectedAtEnd ?? 0)} % kokeeseen mennessä` : "Muodostuu 3 toteutuneen opiskelupäivän jälkeen"}</p></div>
    </div>

    <p className="mt-3 text-xs text-muted-foreground">Historia säilyttää sen suunnitelman, joka oli oikeasti voimassa kyseisenä päivänä. Myöhempi mukautus ei kirjoita mennyttä uusiksi.</p>
    <div className="sr-only">
      {chartData.map(point => <p key={point.date}>{point.date}: suunnitelma {Math.round(point.planned)} prosenttia, toteuma {point.actual == null ? "ei vielä" : `${Math.round(point.actual)} prosenttia`}, suunniteltu työ {point.plannedMinutesToday} minuuttia, opiskeltu {point.studiedMinutesToday} minuuttia.</p>)}
    </div>
  </SectionCard>;
}
