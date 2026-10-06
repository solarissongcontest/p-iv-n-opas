import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usePlan, useSessions } from "@/lib/data";
import { weeklyStudySeries } from "@/lib/domain";
import { today } from "@/lib/fi";
import { Panel } from "@/features/shared/StudyViewPrimitives";

type AdherencePoint = {
  week: string;
  planned: number;
  actual: number;
  adherence: number | null;
};

export function buildPlanAdherenceSeries(
  rows: Array<{ week: string; planned: number; actual: number }>,
): AdherencePoint[] {
  return rows.map(row => ({
    ...row,
    adherence: row.planned > 0 ? Math.round((row.actual / row.planned) * 100) : null,
  }));
}

function PlanAdherenceCard() {
  const sessionsQ = useSessions();
  const planQ = usePlan();
  const sessions = sessionsQ.data ?? [];
  const plan = planQ.data ?? [];

  const series = useMemo(
    () => buildPlanAdherenceSeries(weeklyStudySeries(sessions, plan, 8, today())),
    [plan, sessions],
  );

  const totals = series.reduce(
    (sum, row) => ({
      planned: sum.planned + row.planned,
      actual: sum.actual + row.actual,
    }),
    { planned: 0, actual: 0 },
  );
  const overall = totals.planned > 0 ? Math.round((totals.actual / totals.planned) * 100) : null;
  const hasTrend = series.some(row => row.adherence !== null);

  return (
    <Panel className="progress-adherence" title="Suunnitelmassa pysyminen">
      <div className="progress-adherence-headline">
        <div>
          <p className="progress-adherence-value tabular">{overall === null ? "—" : `${overall} %`}</p>
          <p className="mt-2 text-sm text-muted-foreground">8 viikon toteutumisaste</p>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Käyrä näyttää toteutuneen opiskelun suhteessa suunniteltuun viikko viikolta. Tämä on suunnittelun palautetta, ei arvosana sinusta opiskelijana.
        </p>
      </div>

      {hasTrend ? (
        <>
          <div
            className="progress-adherence-chart"
            role="img"
            aria-label="Suunnitelmassa pysymisen prosenttiosuus viimeisen kahdeksan viikon aikana"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={series} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
                <CartesianGrid vertical={false} stroke="var(--hairline)" />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <YAxis
                  domain={[0, "auto"]}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                  tickFormatter={value => `${value}%`}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <Tooltip
                  formatter={value => [value == null ? "—" : `${Number(value)} %`, "Toteutumisaste"]}
                  labelFormatter={label => `Viikko ${String(label)}`}
                  contentStyle={{
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    background: "var(--surface)",
                    color: "var(--foreground)",
                  }}
                />
                <ReferenceLine
                  y={100}
                  stroke="var(--muted-foreground)"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                />
                <Area
                  type="monotone"
                  dataKey="adherence"
                  stroke="none"
                  fill="var(--primary)"
                  fillOpacity={0.1}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="adherence"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ r: 3, fill: "var(--surface)", stroke: "var(--primary)", strokeWidth: 2 }}
                  activeDot={{ r: 5 }}
                  connectNulls={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="progress-adherence-legend" aria-hidden="true">
            <span><i />Toteutumisaste</span>
            <span><i />100 % = suunniteltu määrä</span>
          </div>
          <div className="sr-only">
            {series.map(row => (
              <p key={row.week}>Viikko {row.week}: {row.adherence === null ? "ei suunniteltua opiskelua" : `${row.adherence} prosenttia`}.</p>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
          Käyrä alkaa muodostua, kun suunnitelmassa on opiskelukertoja ja niitä on kirjattu toteutuneiksi.
        </div>
      )}
    </Panel>
  );
}

export function PlanAdherencePortal() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const resolveTarget = () => {
      const next = document.querySelector<HTMLElement>(".progress-view");
      setTarget(current => (current === next ? current : next));
    };

    resolveTarget();
    const observer = new MutationObserver(resolveTarget);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return target ? createPortal(<PlanAdherenceCard />, target) : null;
}
