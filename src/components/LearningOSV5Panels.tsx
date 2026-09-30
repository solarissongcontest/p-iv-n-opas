import { useMemo } from "react";
import { toast } from "sonner";
import type { CapacityProfile, Course, PracticeAttempt, Topic } from "@/lib/domain";
import {
  useCalibrationObservations,
  useFrictionEvents,
  useImplementationIntentions,
  usePreferences,
  useUpdatePreferences,
  useUpsertImplementationIntention,
} from "@/lib/data";
import {
  delayedCalibrationV5,
  frictionInsightV5,
  reminderTaperV5,
  retentionBudgetV5,
  subjectTaskProfilesV5,
  whatIfPlannerV5,
} from "@/lib/learning-os-v5";

const button="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50";
const secondary="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm disabled:opacity-50";
const pct=(value:number)=>Math.round(value*100)+" %";

function Panel({title,children,action}:{title:string;children:React.ReactNode;action?:React.ReactNode}) {
  return <section className="panel p-4 sm:p-6">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-base font-semibold sm:text-lg">{title}</h2>{action}</div>
    {children}
  </section>;
}

export function V5PlannerPanel({courses,topics,attempts,capacity}:{courses:Course[];topics:Topic[];attempts:PracticeAttempt[];capacity:CapacityProfile}) {
  const budget=useMemo(()=>retentionBudgetV5({courses,topics,attempts,capacity}),[courses,topics,attempts,capacity]);
  const scenarios=useMemo(()=>whatIfPlannerV5({courses,topics,attempts,capacity}),[courses,topics,attempts,capacity]);
  const names=new Map(topics.map(t=>[t.id,t.name]));
  return <div className="grid gap-4 lg:grid-cols-2">
    <Panel title="Retention Budget v5">
      <div className="grid grid-cols-3 gap-2">
        {[["Minimi",budget.minimumMinutes],["Suositus",budget.recommendedMinutes],["Extra",budget.extraMinutes]].map(([label,value])=><div key={String(label)} className="rounded-xl bg-muted/50 p-3"><small className="text-muted-foreground">{label}</small><p className="mt-1 text-xl font-semibold">{value} min</p></div>)}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Budjetti optimoi säilymistä suhteessa käytettävissä olevaan aikaan, ei ruutuajan määrää.</p>
      <div className="mt-4 space-y-2">{budget.targets.filter(r=>r.recommendedMinutes>0).slice(0,6).map(row=><div key={row.topicId} className="rounded-xl border border-border p-3 text-sm">
        <div className="flex justify-between gap-3"><b>{names.get(row.topicId)??"Aihe"}</b><span>{row.recommendedMinutes} min</span></div>
        <p className="mt-1 text-xs text-muted-foreground">säilyminen {pct(row.currentRetention)} → tavoite {pct(row.desiredRetention)} · varmuus {row.confidence.label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{row.reason}</p>
      </div>)}</div>
      <p className="mt-3 text-xs text-muted-foreground">Rajahyöty alkaa pienentyä noin {budget.marginalGainLowAfterMinutes} minuutin jälkeen. Extra ei muutu velaksi.</p>
    </Panel>
    <Panel title="What-if Planner">
      <p className="mb-3 text-sm text-muted-foreground">Vertaa kuormaa ennen suunnitelman muuttamista. Tämä ei ole arvosanaennuste.</p>
      <div className="space-y-2">{scenarios.map(s=><div key={s.id} className="rounded-xl border border-border p-3">
        <div className="flex justify-between gap-3"><b>{s.label}</b><span className="text-sm">{s.weeklyCapacity} min / vko</span></div>
        <p className="mt-2 text-xs text-muted-foreground">retention-suoja {pct(s.protectedRetentionShare)} · backlog {s.projectedBacklogMinutes} min · ylikuormitus {s.overloadRisk} · rajahyöty {s.marginalValue}</p>
        <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
      </div>)}</div>
    </Panel>
  </div>;
}

export function V5LearningHealthPanel({courses,attempts}:{courses:Course[];topics:Topic[];attempts:PracticeAttempt[]}) {
  const calibration=useCalibrationObservations();
  const friction=useFrictionEvents();
  const intentions=useImplementationIntentions();
  const preferences=usePreferences();
  const saveIntention=useUpsertImplementationIntention();
  const updatePreferences=useUpdatePreferences();
  const calibrationState=delayedCalibrationV5(calibration.data??[]);
  const frictionState=frictionInsightV5(friction.data??[]);
  const reminder=reminderTaperV5(friction.data??[]);
  const profiles=useMemo(()=>subjectTaskProfilesV5(attempts,id=>courses.find(c=>c.id===id)?.subject??"Muu"),[attempts,courses]);

  async function accept(){
    if(!frictionState.suggestion)return;
    try{await saveIntention.mutateAsync({...frictionState.suggestion,enabled:true});toast.success("If-then-sääntö otettiin käyttöön.");}
    catch{toast.error("Sääntöä ei voitu tallentaa.");}
  }

  return <div className="space-y-4">
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Delayed Calibration">
        <p className="text-xl font-semibold">{calibrationState.status==="well_calibrated"?"Hyvin kalibroitu":calibrationState.status==="overconfident"?"Liikaa varmuutta":calibrationState.status==="underconfident"?"Liikaa epävarmuutta":"Kerätään näyttöä"}</p>
        <p className="mt-2 text-sm text-muted-foreground">{calibrationState.recommendation}</p>
        <p className="mt-3 text-xs text-muted-foreground">{calibrationState.observations} havaintoa{calibrationState.delayedAccuracy==null?"":" · viivekalibrointi "+pct(calibrationState.delayedAccuracy)}</p>
      </Panel>
      <Panel title="Friction learning">
        <p className="text-lg font-semibold">{frictionState.summary}</p>
        {frictionState.suggestion?<><p className="mt-2 text-sm text-muted-foreground">{frictionState.suggestion.reason}</p><button className={button+" mt-4"} disabled={saveIntention.isPending} onClick={()=>void accept()}>Käytä ehdotettua if-then-sääntöä</button></>:<p className="mt-2 text-sm text-muted-foreground">Järjestelmä ei muuta suunnitelmaa yhden huonon päivän perusteella.</p>}
        {(intentions.data??[]).filter(x=>x.enabled).length>0&&<p className="mt-3 text-xs text-muted-foreground">{(intentions.data??[]).filter(x=>x.enabled).length} aktiivista if-then-sääntöä.</p>}
      </Panel>
      <Panel title="Reminder Tapering" action={<button className={secondary+" !min-h-9 !px-3"} onClick={()=>void updatePreferences.mutateAsync({reminder_taper_enabled:!(preferences.data?.reminder_taper_enabled??true)})}>{(preferences.data?.reminder_taper_enabled??true)?"Päällä":"Pois"}</button>}>
        <p className="text-lg font-semibold">{reminder.mode==="minimal"?"Vain kriittiset":reminder.mode==="taper"?"Vähennä asteittain":reminder.mode==="restore"?"Palauta yksi muistutus":"Nykyinen taso"}</p>
        <p className="mt-2 text-sm text-muted-foreground">{reminder.recommendation}</p>
        <p className="mt-3 text-xs text-muted-foreground">{reminder.sampleSize} aloitushavaintoa{reminder.selfStartRate==null?"":" · itsenäisiä "+pct(reminder.selfStartRate)}</p>
      </Panel>
    </div>
    <Panel title="Subject × task -personalisointi">
      <p className="mb-3 text-sm text-muted-foreground">Parametreja personoidaan vasta, kun näyttöä on tarpeeksi. Pienestä datasta ei tehdä muka-tarkkaa profiilia.</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{profiles.slice(0,9).map(p=><div key={p.key} className="rounded-xl bg-muted/50 p-3 text-sm"><b>{p.subject} · {p.attemptType.replaceAll("_"," ")}</b><p className="mt-1 text-xs text-muted-foreground">{p.observations} havaintoa · onnistuminen {pct(p.successRate)}</p><p className="mt-1 text-xs text-muted-foreground">spacing × {p.spacingMultiplier.toFixed(2)} · evidenssi {p.reliability.label}</p></div>)}{!profiles.length&&<p className="text-sm text-muted-foreground">Dataa ei ole vielä tarpeeksi.</p>}</div>
    </Panel>
  </div>;
}
