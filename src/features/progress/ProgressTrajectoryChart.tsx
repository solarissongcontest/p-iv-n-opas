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
      {point.plannedTitles.slice(0, 4).map((title, index) => <p key={`${title}-${index}`} className="mt-1 text-muted-foreground">{title}</p>)}
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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const selectedIndex = Math.max(0, chartData.findIndex(point => point.date === selectedDate));
  const selectedPoint = chartData.find(point => point.date === selectedDate) ?? chartData[todayIndex >= 0 ? todayIndex : Math.max(0, chartData.length - 1)] ?? null;

  useEffect(() => {
    setSelectedDate(chartData[todayIndex >= 0 ? todayIndex : Math.max(0, chartData.length - 1)]?.date ?? null);
  }, [course.id, todayIndex, chartData.length]);

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
          {([[
            "progress", "Eteneminen"], ["workload", "Työmäärä"], ["mastery", "Osaaminen"]] as Array<[TrajectoryMode, string]>).map(([id, label]) => <button
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

    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground" aria-label="Kuvaajan selite">
      {mode === "progress" && <>
        <span className="flex items-center gap-2"><i className="h-0.5 w-6 bg-primary"/>Toteuma</span>
        <span className="flex items-center gap-2"><i className="h-0.5 w-6 border-t-2 border-dashed border-foreground/60"/>Suunnitelma</span>
        <span className="flex items-center gap-2"><i className="h-0.5 w-6 border-t-2 border-dashed border-primary/60"/>Ennuste</span>
        <span className="flex items-center gap-2"><i className="h-3 w-6 rounded bg-primary/10"/>Tavoitealue</span>
      </>}
      {mode === "workload" && <><span>Suunniteltu työ</span><span>Kirjattu opiskeluaika</span></>}
      {mode === "mastery" && <span>Harjoitusnäytön kehitys</span>}
      <span className="font-medium text-foreground">Tänään {shortDate(now)}</span>
    </div>

    <div ref={scrollRef} className="mt-3 overflow-x-auto overscroll-x-contain pb-2">
      <div style={{ width: chartWidth, minWidth: viewMode === "daily" ? dailyWidth : 0, height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 22, right: 22, bottom: viewMode === "daily" ? 36 : 8, left: -8 }}
            onClick={(state: any) => state?.activePayload?.[0]?.payload?.date && setSelectedDate(state.activePayload[0].payload.date)}
          >
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
            <YAxis domain={yMax == null ? [0, "auto"] : [0, yMax]} width={48} tickLine={false} axisLine={false} tickFormatter={value => mode === "progress" ? `${value}%` : String(value)} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
            <Tooltip content={<TrajectoryTooltip mode={mode}/>} cursor={{ stroke: "var(--muted-foreground)", strokeOpacity: 0.3 }} />
            {mode === "progress" && <>
              <Area type="monotone" dataKey="corridor" stroke="none" fill="var(--primary)" fillOpacity={0.08} isAnimationActive={false} />
              <Line type="monotone" dataKey="planned" name="Suunnitelma" stroke="var(--foreground)" strokeOpacity={0.48} strokeWidth={2} strokeDasharray="6 5" dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="actual" name="Toteuma" stroke="var(--primary)" strokeWidth={3} dot={viewMode === "daily" ? { r: 2, fill: "var(--surface)", stroke: "var(--primary)", strokeWidth: 1.5 } : false} activeDot={{ r: 5 }} connectNulls={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="forecast" name="Ennuste" stroke="var(--primary)" strokeOpacity={0.62} strokeWidth={2} strokeDasharray="3 5" dot={false} connectNulls={false} isAnimationActive={false} />
            </>}
            {mode === "workload" && <>
              <Line type="monotone" dataKey="plannedWork" name="Suunniteltu" stroke="var(--foreground)" strokeOpacity={0.52} strokeWidth={2} strokeDasharray="6 5" dot={false} isAnimationActive={false}/>
              <Line type="monotone" dataKey="actualWork" name="Opiskeltu" stroke="var(--primary)" strokeWidth={3} dot={viewMode === "daily" ? { r: 2 } : false} isAnimationActive={false}/>
            </>}
            {mode === "mastery" && <Line type="monotone" dataKey="evidence" name="Harjoitusnäyttö" stroke="var(--primary)" strokeWidth={3} dot={viewMode === "daily" ? { r: 2 } : false} connectNulls={false} isAnimationActive={false}/>} 
            {chartData.some(point => point.isToday) && <ReferenceLine x={now} stroke="var(--foreground)" strokeWidth={2} strokeOpacity={0.72} label={{ value: `TÄNÄÄN ${shortDate(now)}`, position: "insideTopRight", fill: "var(--foreground)", fontSize: 10, fontWeight: 700 }} />}
            <ReferenceLine x={trajectory.startDate} stroke="var(--muted-foreground)" strokeOpacity={0.25} label={{ value: "ALKU", position: "insideTopRight", fill: "var(--muted-foreground)", fontSize: 9 }} />
            <ReferenceLine x={trajectory.endDate} stroke="var(--muted-foreground)" strokeOpacity={0.45} label={{ value: "KOE", position: "insideTopLeft", fill: "var(--muted-foreground)", fontSize: 10 }} />
            {chartData.filter(point => point.revised).slice(0, 24).map(point => <ReferenceLine key={`revision-${point.date}`} x={point.date} stroke="var(--muted-foreground)" strokeDasharray="2 5" strokeOpacity={0.32} />)}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {mode === "progress" && <div className="mt-1" style={{ width: chartWidth, minWidth: viewMode === "daily" ? dailyWidth : 0, height: 78 }}>
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
