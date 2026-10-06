import { useMemo } from "react";
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
import type { PlanItem, Session } from "@/lib/domain";
import { weeklyStudySeries } from "@/lib/domain";
import { today } from "@/lib/fi";
import { EmptyState, SectionCard, StatusBadge } from "@/components/surfaces";

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

function adherenceStatus(value: number | null) {
  if (value === null) return { label: "Ei vielä tarpeeksi dataa", tone: "neutral" as const };
  if (value >= 85 && value <= 115) return { label: "Melko tasainen", tone: "positive" as const };
  if (value > 115) return { label: "Yli suunnitellun", tone: "info" as const };
  if (value >= 65) return { label: "Hieman alle suunnitelman", tone: "warning" as const };
  return { label: "Suunnitelmaa kannattaa keventää", tone: "warning" as const };
}

export function PlanAdherenceCard({ sessions, plan }: { sessions: Session[]; plan: PlanItem[] }) {
  const series = useMemo(
    () => buildPlanAdherenceSeries(weeklyStudySeries(sessions, plan, 8, today())),
    [plan, sessions],
  );

  const totals = series.reduce(
    (sum, point) => ({ planned: sum.planned + point.planned, actual: sum.actual + point.actual }),
    { planned: 0, actual: 0 },
  );
  const overall = totals.planned > 0 ? Math.round((totals.actual / totals.planned) * 100) : null;
  const latest = [...series].reverse().find(point => point.adherence !== null)?.adherence ?? null;
  const status = adherenceStatus(latest);
  const hasTrend = series.some(point => point.adherence !== null);

  return (
    <SectionCard
      className="progress-v5-adherence progress-summary-only"
      title="Suunnitelmassa pysyminen"
      action={<StatusBadge tone={status.tone}>{status.label}</StatusBadge>}
    >
      <div className="progress-v5-adherence-head">
        <div>
          <p className="progress-v5-adherence-value">{overall === null ? "—" : `${overall} %`}</p>
          <p className="progress-v5-adherence-label">8 viikon toteutumisaste</p>
        </div>
        <p className="progress-v5-adherence-explanation">
          Käyrä vertaa toteutunutta opiskelua suunniteltuun viikko viikolta. Se kertoo suunnitelman realismista, ei siitä kuinka hyvä opiskelija olet.
        </p>
      </div>

      {hasTrend ? <>
        <div
          className="progress-v5-adherence-chart"
          role="img"
          aria-label="Suunnitelmassa pysymisen prosenttiosuus viimeisen kahdeksan viikon aikana"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={series} margin={{top:8,right:8,bottom:0,left:-8}}>
              <CartesianGrid vertical={false} stroke="var(--hairline)" />
              <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{fill:"var(--muted-foreground)",fontSize:11}} />
              <YAxis domain={[0,"auto"]} width={45} tickLine={false} axisLine={false} tickFormatter={value=>`${value}%`} tick={{fill:"var(--muted-foreground)",fontSize:11}} />
              <Tooltip
                formatter={(value)=>[value==null?"—":`${Number(value)} %`,"Toteutumisaste"]}
                labelFormatter={label=>`Viikko ${String(label)}`}
                contentStyle={{border:"1px solid var(--border)",borderRadius:"12px",background:"var(--surface)",color:"var(--foreground)"}}
              />
              <ReferenceLine y={100} stroke="var(--muted-foreground)" strokeDasharray="4 4" strokeOpacity={0.55} />
              <Area type="monotone" dataKey="adherence" stroke="none" fill="var(--primary)" fillOpacity={0.09} connectNulls={false} />
              <Line type="monotone" dataKey="adherence" stroke="var(--primary)" strokeWidth={3} dot={{r:3,fill:"var(--surface)",stroke:"var(--primary)",strokeWidth:2}} activeDot={{r:5}} connectNulls={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="progress-v5-adherence-legend" aria-hidden="true">
          <span><i className="progress-v5-adherence-line"/>Toteutumisaste</span>
          <span><i className="progress-v5-adherence-reference"/>100 % = suunniteltu määrä</span>
        </div>
        <div className="sr-only">
          {series.map(point=><p key={point.week}>Viikko {point.week}: {point.adherence===null?"ei suunniteltua opiskelua":`${point.adherence} prosenttia`}.</p>)}
        </div>
      </>:<EmptyState
        title="Käyrä muodostuu opiskelun myötä"
        body="Kun suunnitelmassa on opiskelukertoja ja niitä kirjataan toteutuneiksi, tähän ilmestyy kahdeksan viikon trendi."
      />}
    </SectionCard>
  );
}
