import { useEffect, useMemo, useRef, useState } from "react";
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
import { dayDifferenceLabel, trajectoryStatus } from "./ProgressTrajectoryChart";

type ViewMode = "daily" | "course";
type Row = ProgressTrajectoryPoint & { evidence: number | null };

const SVG_HEIGHT = 360;
const TOP = 30;
const BOTTOM = 52;
const LEFT = 52;
const RIGHT = 26;

function evidenceSeries(attempts: PracticeAttempt[], points: ProgressTrajectoryPoint[], courseId: string) {
  const courseAttempts = attempts
    .filter(attempt => attempt.course_id === courseId)
    .sort((a, b) => a.date.localeCompare(b.date) || a.created_at.localeCompare(b.created_at));
  return points.map(point => {
    const seen = courseAttempts.filter(attempt => attempt.date <= point.date).slice(-20);
    if (!seen.length) return { ...point, evidence: null as number | null };
    const weighted = seen.reduce((sum, attempt, index) => {
      const recency = 0.55 + ((index + 1) / seen.length) * 0.45;
      return sum + practiceEvidenceScore(attempt) * recency;
    }, 0);
    const weights = seen.reduce((sum, _attempt, index) => sum + 0.55 + ((index + 1) / seen.length) * 0.45, 0);
    return { ...point, evidence: Math.round(weighted / Math.max(1, weights)) };
  });
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
  const parts: string[] = [];
  if (oldDate && newDate && oldDate !== newDate) parts.push(`${shortDate(oldDate)} → ${shortDate(newDate)}`);
  if (oldMinutes != null && newMinutes != null && oldMinutes !== newMinutes) parts.push(`${oldMinutes} min → ${newMinutes} min`);
  return parts.join(" · ");
}

function taskDifferenceLabel(summary: ProgressTrajectorySummary) {
  if (summary.behindTasks > 0) return `${summary.behindTasks} suunniteltua tehtävää vielä tekemättä`;
  if (summary.aheadTasks > 0) return `${summary.aheadTasks} tulevaa tehtävää tehty etuajassa`;
  return "Ei avoimia rästejä tähän päivään";
}

function stepPath(points: Array<{ x: number; y: number }>) {
  if (!points.length) return "";
  let d = `M ${points[0]!.x.toFixed(2)} ${points[0]!.y.toFixed(2)}`;
  for (let index = 1; index < points.length; index += 1) {
    const point = points[index]!;
    d += ` H ${point.x.toFixed(2)} V ${point.y.toFixed(2)}`;
  }
  return d;
}

function linePath(points: Array<{ x: number; y: number }>) {
  if (!points.length) return "";
  return points.map((point, index) => `${index ? "L" : "M"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
}

function polygonPoints(points: Array<{ x: number; y: number }>) {
  return points.map(point => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
}

function formatProgress(value: number | null) {
  return value == null ? "—" : `${Math.round(value)} %`;
}

export function ReliableProgressTrajectoryChart({
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
  defaultView?: ViewMode;
}) {
  const now = today();
  const [viewMode, setViewMode] = useState<ViewMode>(defaultView);
  const [mode, setMode] = useState<TrajectoryMode>("progress");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trajectory = useMemo(
    () => buildProgressTrajectory({ course, plan, sessions, events, now }),
    [course, events, now, plan, sessions],
  );
  const rows: Row[] = useMemo(
    () => trajectory ? evidenceSeries(attempts, trajectory.points, course.id) : [],
    [attempts, course.id, trajectory],
  );
  const status = trajectoryStatus(trajectory);
  const todayIndex = rows.findIndex(point => point.isToday);
  const fallbackIndex = rows.reduce((best, point, index) => point.date <= now ? index : best, 0);
  const currentIndex = todayIndex >= 0 ? todayIndex : Math.max(0, fallbackIndex);
  const currentPoint = rows[currentIndex] ?? null;
  const selectedIndex = Math.max(0, rows.findIndex(point => point.date === selectedDate));
  const selectedPoint = rows.find(point => point.date === selectedDate) ?? currentPoint;

  useEffect(() => {
    setSelectedDate(rows[currentIndex]?.date ?? null);
  }, [course.id, currentIndex, rows.length]);

  useEffect(() => {
    if (viewMode !== "daily" || currentIndex < 0 || !scrollRef.current || rows.length < 2) return;
    const frame = requestAnimationFrame(() => {
      const element = scrollRef.current;
      if (!element) return;
      const ratio = currentIndex / Math.max(1, rows.length - 1);
      element.scrollLeft = Math.max(0, ratio * element.scrollWidth - element.clientWidth * 0.38);
    });
    return () => cancelAnimationFrame(frame);
  }, [course.id, currentIndex, rows.length, viewMode]);

  if (!trajectory) return <SectionCard title={title}><EmptyState
    title="Käyrä muodostuu suunnitelmasta"
    body="Kun kurssilla on päivätty opiskelusuunnitelma, tähän muodostuu päivittäinen suunnitelma–toteuma-käyrä."
  /></SectionCard>;

  const width = viewMode === "daily" ? Math.max(760, rows.length * 52) : 1000;
  const plotWidth = Math.max(1, width - LEFT - RIGHT);
  const plotHeight = SVG_HEIGHT - TOP - BOTTOM;
  const x = (index: number) => LEFT + (rows.length <= 1 ? plotWidth / 2 : (index / (rows.length - 1)) * plotWidth);
  const progressY = (value: number) => TOP + ((105 - value) / 110) * plotHeight;
  const evidenceY = progressY;
  const workloadMax = Math.max(30, ...rows.flatMap(row => viewMode === "daily"
    ? [row.plannedMinutesToday, row.studiedMinutesToday]
    : [row.plannedMinutesCumulative, row.studiedMinutesCumulative]));
  const workloadY = (value: number) => TOP + ((workloadMax - value) / workloadMax) * plotHeight;
  const y = (value: number) => mode === "workload" ? workloadY(value) : progressY(value);

  const actualPoints = rows
    .map((row, index) => row.actual == null ? null : ({ x: x(index), y: progressY(row.actual), index, value: row.actual }))
    .filter((point): point is { x: number; y: number; index: number; value: number } => point != null);
  const planPoints = rows.map((row, index) => ({ x: x(index), y: progressY(row.planned), index, value: row.planned }));
  const forecastRows = rows
    .map((row, index) => row.forecast == null ? null : ({ x: x(index), y: progressY(row.forecast), index, value: row.forecast }))
    .filter((point): point is { x: number; y: number; index: number; value: number } => point != null);
  if (forecastRows.length && currentPoint?.actual != null) {
    forecastRows.unshift({ x: x(currentIndex), y: progressY(currentPoint.actual), index: currentIndex, value: currentPoint.actual });
  }
  const upper = rows.map((row, index) => ({ x: x(index), y: progressY(row.corridorUpper) }));
  const lower = [...rows].reverse().map((row, reverseIndex) => {
    const index = rows.length - 1 - reverseIndex;
    return { x: x(index), y: progressY(row.corridorLower) };
  });
  const firstScheduledIndex = rows.findIndex(row => row.plannedMinutesToday > 0);
  const firstScheduled = firstScheduledIndex >= 0 ? rows[firstScheduledIndex] : null;
  const progressGap = currentPoint?.actual == null ? null : Math.round(currentPoint.actual - currentPoint.planned);
  const latestEvidence = [...rows].reverse().find(row => row.evidence != null)?.evidence ?? null;
  const primaryValue = mode === "progress"
    ? status.headline
    : mode === "workload"
      ? `${selectedPoint?.studiedMinutesCumulative ?? 0} min opiskeltu`
      : latestEvidence == null ? "Ei vielä harjoitusnäyttöä" : `${latestEvidence} / 100`;

  const pickDay = (index: number) => {
    const point = rows[Math.max(0, Math.min(rows.length - 1, index))];
    if (point) setSelectedDate(point.date);
  };

  const tickIndexes = viewMode === "daily"
    ? rows.map((_row, index) => index)
    : [...new Set([0, currentIndex, rows.length - 1, ...rows.map((_row, index) => index).filter(index => index % Math.max(1, Math.ceil(rows.length / 7)) === 0)])].sort((a, b) => a - b);

  const yTicks = mode === "workload" ? [0, Math.round(workloadMax / 2), workloadMax] : [0, 25, 50, 75, 100];
  const deviationMax = Math.max(1, ...rows.map(row => Math.abs(row.deviationStudyDays ?? 0)));

  return <SectionCard className="progress-trajectory-card min-w-0 max-w-full" title={title} action={mode === "progress" ? <StatusBadge tone={status.tone}>{status.label}</StatusBadge> : undefined}>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">{course.code} · {course.name}</p>
      <p className="mt-1 text-2xl font-semibold sm:text-3xl">{primaryValue}</p>
      {mode === "progress" && <>
        <p className="mt-1 text-sm text-muted-foreground">{dayDifferenceLabel(trajectory.deviationStudyDays)} · {taskDifferenceLabel(trajectory)}</p>
        <p className="mt-2 text-sm"><b>{trajectory.adherencePercent == null ? "—" : `${trajectory.adherencePercent} %`}</b><span className="text-muted-foreground"> tähän päivään suunnitellusta työstä tehty</span></p>
        {currentPoint?.planned === 0 && firstScheduled && firstScheduled.date > now && <p className="mt-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm">
          Ensimmäinen suunniteltu opiskelupäivä on <b>{shortDate(firstScheduled.date)}</b>. Suunnitelmakäyrä alkaa nousta siitä eteenpäin.
        </p>}
      </>}
    </div>

    <div className="mt-4 flex min-w-0 flex-wrap gap-2">
      <div className="flex max-w-full flex-wrap rounded-xl bg-muted p-1" aria-label="Kuvaajan sisältö">
        {(["progress", "workload", "mastery"] as TrajectoryMode[]).map(value => <button
          type="button" key={value} aria-pressed={mode === value} onClick={() => setMode(value)}
          className={`min-h-10 rounded-lg px-3 text-sm ${mode === value ? "bg-surface font-semibold shadow-sm" : "text-muted-foreground"}`}
        >{value === "progress" ? "Eteneminen" : value === "workload" ? "Työmäärä" : "Osaaminen"}</button>)}
      </div>
      <div className="flex max-w-full flex-wrap rounded-xl bg-muted p-1" aria-label="Kuvaajan tarkkuus">
        {(["daily", "course"] as ViewMode[]).map(value => <button
          type="button" key={value} aria-pressed={viewMode === value} onClick={() => setViewMode(value)}
          className={`min-h-10 rounded-lg px-3 text-sm ${viewMode === value ? "bg-surface font-semibold shadow-sm" : "text-muted-foreground"}`}
        >{value === "daily" ? "Päivittäin" : "Koko kurssi"}</button>)}
      </div>
    </div>

    {mode === "progress" && <div className="mt-4 grid gap-2 sm:grid-cols-3" aria-label="Etenemisen luvut">
      <div className="rounded-xl border border-border bg-background/60 px-3 py-2"><p className="text-xs text-muted-foreground">Suunnitelma nyt</p><p className="mt-0.5 text-lg font-semibold">{formatProgress(currentPoint?.planned ?? null)}</p></div>
      <div className="rounded-xl border border-border bg-background/60 px-3 py-2"><p className="text-xs text-muted-foreground">Toteuma nyt</p><p className="mt-0.5 text-lg font-semibold text-primary">{formatProgress(currentPoint?.actual ?? null)}</p></div>
      <div className="rounded-xl border border-border bg-background/60 px-3 py-2"><p className="text-xs text-muted-foreground">Ero suunnitelmaan</p><p className="mt-0.5 text-lg font-semibold">{progressGap == null ? "—" : `${progressGap > 0 ? "+" : ""}${progressGap} %-yks.`}</p></div>
    </div>}

    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground" aria-label="Kuvaajan selite">
      {mode === "progress" && <>
        <span className="flex items-center gap-2"><i className="h-0.5 w-6 bg-chart-1"/>Toteuma</span>
        <span className="flex items-center gap-2"><i className="h-0.5 w-6 border-t-2 border-dashed border-chart-2"/>Suunnitelma</span>
        <span className="flex items-center gap-2"><i className="h-0.5 w-6 border-t-2 border-dashed border-chart-3"/>Ennuste</span>
        <span className="flex items-center gap-2"><i className="h-3 w-6 rounded bg-chart-2/10"/>Tavoitealue</span>
      </>}
      {mode === "workload" && <><span>Suunniteltu työ</span><span>Kirjattu opiskeluaika</span></>}
      {mode === "mastery" && <span>Harjoitusnäytön kehitys</span>}
      <span className="font-medium text-foreground">Tänään {shortDate(now)}</span>
    </div>

    <div ref={scrollRef} className="mt-3 max-w-full overflow-x-auto overscroll-x-contain pb-2">
      <div data-testid="trajectory-main-plot" style={{ width: viewMode === "daily" ? width : "100%", minWidth: viewMode === "daily" ? width : 0 }}>
        <svg
          role="img"
          aria-label={`${course.code} ${mode === "progress" ? "suunnitelma ja toteuma" : mode === "workload" ? "työmäärä" : "osaaminen"}`}
          viewBox={`0 0 ${width} ${SVG_HEIGHT}`}
          width={viewMode === "daily" ? width : "100%"}
          height={SVG_HEIGHT}
          className="block max-w-none rounded-2xl border border-border bg-background/45"
          preserveAspectRatio="none"
        >
          {yTicks.map(value => <g key={`y-${value}`}>
            <line x1={LEFT} x2={width - RIGHT} y1={y(value)} y2={y(value)} stroke="var(--hairline)" strokeDasharray="3 5"/>
            <text x={LEFT - 8} y={y(value) + 4} textAnchor="end" fontSize="10" fill="var(--muted-foreground)">{mode === "progress" ? `${value}%` : value}</text>
          </g>)}

          {mode === "progress" && <>
            <polygon data-trajectory-series="corridor" points={polygonPoints([...upper, ...lower])} fill="var(--chart-2)" fillOpacity="0.10"/>
            {actualPoints.length > 0 && <polygon points={polygonPoints([
              ...actualPoints.map(point => ({ x: point.x, y: point.y })),
              { x: actualPoints.at(-1)!.x, y: progressY(0) },
              { x: actualPoints[0]!.x, y: progressY(0) },
            ])} fill="var(--chart-1)" fillOpacity="0.08"/>}
            <path data-trajectory-series="actual" d={stepPath(actualPoints)} fill="none" stroke="var(--chart-1)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path data-trajectory-series="plan" d={stepPath(planPoints)} fill="none" stroke="var(--chart-2)" strokeWidth="2.6" strokeDasharray="8 5" strokeLinecap="round" strokeLinejoin="round"/>
            {forecastRows.length > 1 && <path data-trajectory-series="forecast" d={linePath(forecastRows)} fill="none" stroke="var(--chart-3)" strokeWidth="2.4" strokeDasharray="4 5" strokeLinecap="round"/>}
            {rows.map((row, index) => (row.plannedMinutesToday > 0 || row.isToday || row.isExam || row.isCourseStart) && <circle key={`plan-dot-${row.date}`} cx={x(index)} cy={progressY(row.planned)} r={row.isToday ? 4 : 2.5} fill="var(--surface)" stroke="var(--chart-2)" strokeWidth="2" data-trajectory-dot="planned"/>)}
            {actualPoints.map(point => {
              const row = rows[point.index]!;
              if (!row.isToday && row.completedMinutesToday <= 0 && !row.isCourseStart) return null;
              return <circle key={`actual-dot-${row.date}`} cx={point.x} cy={point.y} r={row.isToday ? 4.5 : 3} fill="var(--surface)" stroke="var(--chart-1)" strokeWidth="2.4" data-trajectory-dot="actual"/>;
            })}
          </>}

          {mode === "workload" && viewMode === "daily" && rows.map((row, index) => {
            const cx = x(index);
            const barWidth = Math.min(16, plotWidth / Math.max(1, rows.length) * 0.32);
            const plannedTop = workloadY(row.plannedMinutesToday);
            const actualTop = workloadY(row.studiedMinutesToday);
            return <g key={`work-${row.date}`}>
              <rect x={cx - barWidth - 1} y={plannedTop} width={barWidth} height={Math.max(0, workloadY(0) - plannedTop)} rx="3" fill="var(--chart-2)" fillOpacity="0.35"/>
              <rect x={cx + 1} y={actualTop} width={barWidth} height={Math.max(0, workloadY(0) - actualTop)} rx="3" fill="var(--chart-1)" fillOpacity="0.78"/>
            </g>;
          })}
          {mode === "workload" && viewMode === "course" && <>
            <path d={stepPath(rows.map((row, index) => ({ x: x(index), y: workloadY(row.studiedMinutesCumulative) })))} fill="none" stroke="var(--chart-1)" strokeWidth="3.2"/>
            <path d={stepPath(rows.map((row, index) => ({ x: x(index), y: workloadY(row.plannedMinutesCumulative) })))} fill="none" stroke="var(--chart-2)" strokeWidth="2.4" strokeDasharray="8 5"/>
          </>}
          {mode === "mastery" && <path data-trajectory-series="mastery" d={linePath(rows.map((row, index) => row.evidence == null ? null : ({ x: x(index), y: evidenceY(row.evidence) })).filter((point): point is { x: number; y: number } => point != null))} fill="none" stroke="var(--chart-4)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>}

          {rows.map((row, index) => row.revised && <line key={`revision-${row.date}`} x1={x(index)} x2={x(index)} y1={TOP} y2={TOP + plotHeight} stroke="var(--muted-foreground)" strokeOpacity="0.35" strokeDasharray="2 5"/>)}
          {todayIndex >= 0 && <g><line x1={x(todayIndex)} x2={x(todayIndex)} y1={TOP} y2={TOP + plotHeight} stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.75"/><text x={x(todayIndex) + 5} y={TOP + 11} fontSize="10" fontWeight="700" fill="var(--foreground)">TÄNÄÄN {shortDate(now)}</text></g>}
          <text x={x(0) + 3} y={TOP + 24} fontSize="9" fill="var(--muted-foreground)">ALKU</text>
          <text x={x(rows.length - 1) - 3} y={TOP + 24} textAnchor="end" fontSize="10" fill="var(--muted-foreground)">KOE</text>

          {tickIndexes.map(index => <text key={`x-${rows[index]!.date}`} x={x(index)} y={SVG_HEIGHT - 18} textAnchor="end" transform={`rotate(-45 ${x(index)} ${SVG_HEIGHT - 18})`} fontSize="9" fill="var(--muted-foreground)">{shortDate(rows[index]!.date)}</text>)}
          {rows.map((row, index) => <rect key={`hit-${row.date}`} x={Math.max(LEFT, x(index) - 18)} y={TOP} width="36" height={plotHeight} fill="transparent" tabIndex={0} aria-label={`${row.label}: valitse päivä`} onMouseEnter={() => setSelectedDate(row.date)} onFocus={() => setSelectedDate(row.date)} onClick={() => setSelectedDate(row.date)}/>) }
        </svg>
      </div>

      {mode === "progress" && <div className="mt-3" style={{ width: viewMode === "daily" ? width : "100%", minWidth: viewMode === "daily" ? width : 0 }}>
        <div className="mb-1 flex items-center justify-between gap-3 text-xs text-muted-foreground"><span className="font-medium text-foreground">Opiskelupäivien ero</span><span>ylös = edellä · alas = jäljessä</span></div>
        <svg data-testid="trajectory-deviation-plot" viewBox={`0 0 ${width} 92`} width={viewMode === "daily" ? width : "100%"} height="92" className="block rounded-xl border border-border bg-background/35" preserveAspectRatio="none">
          <line x1={LEFT} x2={width - RIGHT} y1="46" y2="46" stroke="var(--muted-foreground)" strokeOpacity="0.65"/>
          {rows.map((row, index) => {
            const value = row.deviationStudyDays ?? 0;
            const amplitude = Math.min(34, Math.abs(value) / deviationMax * 32);
            const yTop = value >= 0 ? 46 - amplitude : 46;
            return <rect key={`dev-${row.date}`} x={x(index) - 5} y={yTop} width="10" height={Math.max(1, amplitude)} rx="2" fill={value > 0 ? "var(--status-done)" : value < 0 ? "var(--status-overdue)" : "var(--muted-foreground)"} fillOpacity={value === 0 ? 0.22 : 0.6}/>;
          })}
          {todayIndex >= 0 && <line x1={x(todayIndex)} x2={x(todayIndex)} y1="7" y2="85" stroke="var(--foreground)" strokeOpacity="0.55"/>}
        </svg>
      </div>}
    </div>

    <div className="mt-3 rounded-2xl border border-border bg-muted/35 p-3">
      <div className="flex items-center justify-between gap-3"><div><p className="text-xs text-muted-foreground">Valittu päivä</p><p className="font-semibold">{selectedPoint?.isToday ? `Tänään · ${selectedPoint.label}` : selectedPoint?.label ?? "—"}</p></div><div className="flex gap-2"><button type="button" className="min-h-10 min-w-10 rounded-xl border border-border" aria-label="Edellinen päivä" onClick={() => pickDay(selectedIndex - 1)}>←</button><button type="button" className="min-h-10 min-w-10 rounded-xl border border-border" aria-label="Seuraava päivä" onClick={() => pickDay(selectedIndex + 1)}>→</button></div></div>
      {selectedPoint && <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {mode === "progress" && <><p><span className="text-muted-foreground">Suunnitelma / toteuma</span><br/><b>{Math.round(selectedPoint.planned)} % / {selectedPoint.actual == null ? "—" : `${Math.round(selectedPoint.actual)} %`}</b></p><p><span className="text-muted-foreground">Työmäärä tänään</span><br/><b>{selectedPoint.studiedMinutesToday} / {selectedPoint.plannedMinutesToday} min</b></p><p><span className="text-muted-foreground">Ero</span><br/><b>{dayDifferenceLabel(selectedPoint.deviationStudyDays)}</b></p></>}
        {mode === "workload" && <><p><span className="text-muted-foreground">Suunniteltu</span><br/><b>{viewMode === "daily" ? selectedPoint.plannedMinutesToday : selectedPoint.plannedMinutesCumulative} min</b></p><p><span className="text-muted-foreground">Opiskeltu</span><br/><b>{viewMode === "daily" ? selectedPoint.studiedMinutesToday : selectedPoint.studiedMinutesCumulative} min</b></p></>}
        {mode === "mastery" && <p><span className="text-muted-foreground">Harjoitusnäyttö</span><br/><b>{selectedPoint.evidence == null ? "Ei vielä näyttöä" : `${selectedPoint.evidence} / 100`}</b></p>}
      </div>}
      {selectedPoint?.plannedTitles.length ? <div className="mt-3 border-t border-border pt-2 text-sm"><b>Suunniteltu tälle päivälle</b>{selectedPoint.plannedTitles.slice(0,5).map((itemTitle, index) => <p key={`${itemTitle}-${index}`} className="mt-1 text-muted-foreground">{itemTitle}</p>)}</div> : null}
      {selectedPoint?.revisions.length ? <div className="mt-3 border-t border-border pt-2 text-sm"><b>Suunnitelman muutokset</b>{selectedPoint.revisions.slice(0,5).map(revision => <p key={revision.id} className="mt-1 text-muted-foreground">{eventLabel(revision)}{revisionDetail(revision) ? ` · ${revisionDetail(revision)}` : ""}</p>)}</div> : null}
    </div>

    <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
      <div className="rounded-xl border border-border p-3"><span className="text-muted-foreground">Kurssin aikajana</span><br/><b>{shortDate(trajectory.startDate)} → {shortDate(trajectory.endDate)}</b></div>
      <div className="rounded-xl border border-border p-3"><span className="text-muted-foreground">Tähän päivään</span><br/><b>{trajectory.completedMinutesNow} / {trajectory.plannedMinutesNow} min suunnitellusta työstä</b></div>
      <div className="rounded-xl border border-border p-3"><span className="text-muted-foreground">Ennuste</span><br/><b>{trajectory.hasForecast ? trajectory.forecastFinishDate ? `Valmistuu arviolta ${shortDate(trajectory.forecastFinishDate)}` : `Koepäivänä noin ${Math.round(trajectory.projectedAtEnd ?? 0)} %` : "Muodostuu 3 toteutuneen opiskelupäivän jälkeen"}</b></div>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">Historia säilyttää sen suunnitelman, joka oli oikeasti voimassa kyseisenä päivänä. Myöhempi mukautus ei kirjoita mennyttä uusiksi.</p>
  </SectionCard>;
}
