
import { useMemo } from "react";
import { toast } from "sonner";
import type { CapacityProfile, Course, PracticeAttempt, Topic } from "@/lib/domain";
import {
  adaptiveRetentionBudgetV5,
  confusionAwareInterleavingV5,
  delayedCalibrationV5,
  frictionInsightsV5,
  implementationIntentionV5,
  reminderTaperingV5,
  subjectTaskProfilesV5,
  transferLadderV5,
  whatIfStudySimulatorV5,
  type StudyFrictionEvent,
} from "@/lib/learning-os-v5";
import {
  useFrictionEvents,
  useImplementationIntentions,
  useTopicDependencies,
  useUpsertImplementationIntention,
} from "@/lib/data";
import { today } from "@/lib/fi";

const secondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm hover:bg-muted disabled:opacity-50";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="panel p-4 sm:p-6"><h2 className="mb-4 text-base font-semibold sm:text-lg">{title}</h2>{children}</section>;
}

export function WhatIfPlannerV5Panel({
  courses,
  topics,
  attempts,
}: {
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
}) {
  const rows = useMemo(
    () => whatIfStudySimulatorV5({ courses, topics, attempts }),
    [attempts, courses, topics],
  );
  return <Panel title="What-if Planner · Learning OS v5">
    <p className="mb-4 text-sm text-muted-foreground">
      Vertaa kuormaa ennen kuin muutat kalenteria. Arviot koskevat kertausjonoa, vakautta ja kuormitusta, eivät arvosanaa.
    </p>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {rows.map((row) => <div key={row.scenario.id} className="rounded-xl border border-border bg-muted/40 p-3">
        <div className="flex items-start justify-between gap-2"><b>{row.scenario.label}</b><span className="text-xs text-muted-foreground">{row.weeklyMinutes} min/vko</span></div>
        <p className="mt-2 text-sm">Vakaita aiheita <b>{row.stableTopics}</b> · riskissä <b>{row.atRiskTopics}</b></p>
        <p className="mt-1 text-xs text-muted-foreground">Kertauspaine {row.estimatedReviewBacklog} · ylikuormitus {Math.round(row.overloadRisk*100)} %</p>
        <p className="mt-2 text-xs text-muted-foreground">{row.note}</p>
      </div>)}
    </div>
  </Panel>;
}

function mapFriction(rows: ReturnType<typeof useFrictionEvents>["data"]): StudyFrictionEvent[] {
  return (rows ?? []).filter((row) => row.reason !== "started").map((row) => ({
    date: row.date,
    weekday: new Date(row.date+"T12:00:00").getDay(),
    reason:
      row.reason === "too_hard" ? "too_large" :
      row.reason === "other" ? "plans_changed" :
      row.reason,
    plannedMinutes: 0,
    courseId: row.course_id ?? null,
  }));
}

export function LearningHealthV5Panels({
  courses,
  topics,
  attempts,
  capacity,
}: {
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
  capacity: CapacityProfile;
}) {
  const deps = useTopicDependencies();
  const frictionQ = useFrictionEvents();
  const intentionsQ = useImplementationIntentions();
  const saveIntention = useUpsertImplementationIntention();
  const weekday = new Date(today()+"T12:00:00").getDay();
  const dayCapacity = capacity.busyDates.includes(today())
    ? Math.min(20,capacity.weekdayMinutes)
    : weekday===0||weekday===6 ? capacity.weekendMinutes : capacity.weekdayMinutes;
  const retention = useMemo(
    () => adaptiveRetentionBudgetV5({ courses, topics, attempts, capacityMinutes: dayCapacity }),
    [attempts, courses, dayCapacity, topics],
  );
  const confusion = useMemo(
    () => confusionAwareInterleavingV5(topics, deps.data ?? [], attempts),
    [attempts, deps.data, topics],
  );
  const calibration = useMemo(
    () => topics
      .map((topic) => ({ topic, insight: delayedCalibrationV5(topic, attempts) }))
      .filter((row) => row.insight.sampleSize > 0)
      .sort((a,b) => b.insight.sampleSize-a.insight.sampleSize),
    [attempts, topics],
  );
  const transfers = useMemo(
    () => topics.map((topic)=>({topic,ladder:transferLadderV5(topic,attempts)})),
    [attempts,topics],
  );
  const profiles = useMemo(() => subjectTaskProfilesV5(courses, attempts), [attempts,courses]);
  const friction = useMemo(() => frictionInsightsV5(mapFriction(frictionQ.data)), [frictionQ.data]);
  const independentStarts=(frictionQ.data??[]).filter(row=>row.self_started===true).length;
  const knownStarts=(frictionQ.data??[]).filter(row=>typeof row.self_started==="boolean").length;
  const missed=(frictionQ.data??[]).filter(row=>row.self_started===false).length;
  const reminders=reminderTaperingV5({plannedStarts:knownStarts,independentStarts,missedStarts:missed});
  const topFriction=friction[0];
  const suggested=topFriction?implementationIntentionV5(topFriction):null;
  const alreadySaved=(intentionsQ.data??[]).some(row=>row.reason===topFriction?.recommendation);

  return <div className="space-y-4">
    <Panel title="Adaptive Retention Budget">
      <div className="grid grid-cols-3 gap-3">
        <div><small className="text-muted-foreground">Minimi</small><p className="text-xl font-semibold">{retention.minimumMinutes} min</p></div>
        <div><small className="text-muted-foreground">Suositus</small><p className="text-xl font-semibold">{retention.recommendedMinutes} min</p></div>
        <div><small className="text-muted-foreground">Kapasiteetti</small><p className="text-xl font-semibold">{retention.capacityMinutes} min</p></div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{retention.note}</p>
      <div className="mt-4 divide-y divide-border">
        {retention.items.slice(0,6).map((item)=><div key={item.topic.id} className="flex items-center justify-between gap-3 py-3 text-sm"><span><b>{item.course.code} · {item.topic.name}</b><small className="mt-1 block text-muted-foreground">{item.reason} · suosituksen varmuus {item.confidence}</small></span><span className="whitespace-nowrap font-semibold">{item.recommendedMinutes} min</span></div>)}
      </div>
    </Panel>

    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Delayed Calibration">
        {calibration.length?calibration.slice(0,6).map(({topic,insight})=><div key={topic.id} className="border-b border-border py-3 text-sm"><div className="flex justify-between gap-3"><b>{topic.name}</b><span>{insight.score}/100</span></div><p className="mt-1 text-xs text-muted-foreground">{insight.reason} · {insight.delayedSampleSize} viivehavaintoa</p></div>):<p className="text-sm text-muted-foreground">Kalibrointi alkaa näkyä, kun varmuusarvioita on tehty ennen myöhempää retrievalia.</p>}
      </Panel>
      <Panel title="Confusion-aware interleaving">
        {confusion.length?confusion.slice(0,6).map((set)=><div key={set.id} className="border-b border-border py-3 text-sm"><b>{set.topics.map(t=>t.name).join(" vs. ")}</b><p className="mt-1 text-xs text-muted-foreground">{set.reason} · discrimination strength {Math.round(set.strength*100)} %</p></div>):<p className="text-sm text-muted-foreground">Knowledge Graphissa ei ole vielä commonly_confused_with-pareja.</p>}
      </Panel>
    </div>

    <Panel title="Transfer Ladder">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {transfers.sort((a,b)=>a.ladder.completed.length-b.ladder.completed.length).slice(0,9).map(({topic,ladder})=><div key={topic.id} className="rounded-xl bg-muted/50 p-3 text-sm"><b>{courses.find(c=>c.id===topic.course_id)?.code} · {topic.name}</b><p className="mt-1 text-xs text-muted-foreground">Korkein näyttö: {ladder.highestReliableLevel.replaceAll("_"," ")}{ladder.nextTarget?" · seuraava: "+ladder.nextTarget.replaceAll("_"," "):""}</p><p className="mt-2 text-xs">{ladder.strongEligible?"✓ transfer tukee korkeaa masteryä":"○ tarvitsee vielä vaihtelevaa/uutta kontekstia"}</p></div>)}
      </div>
    </Panel>

    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Subject × task -personalisointi">
        {profiles.length?profiles.slice(0,8).map((profile)=><div key={profile.key} className="flex justify-between gap-3 border-b border-border py-2 text-sm"><span><b>{profile.key}</b><small className="block text-muted-foreground">{profile.sampleSize} havaintoa · spacing {profile.preferredSpacingDays} pv</small></span><span className={profile.active?"text-primary":"text-muted-foreground"}>{profile.active?"aktiivinen":profile.confidence}</span></div>):<p className="text-sm text-muted-foreground">Parametrit aktivoituvat vasta riittävän datan jälkeen.</p>}
      </Panel>
      <Panel title="Behavior Engine">
        <p className="text-sm">{topFriction?.recommendation ?? "Toistuvaa opiskelun kitkaa ei ole vielä havaittu."}</p>
        <p className="mt-2 text-xs text-muted-foreground">Reminder tapering: <b>{reminders.level}</b> · {reminders.reason}</p>
        {suggested&&!alreadySaved&&<button className={secondary+" mt-3"} disabled={saveIntention.isPending} onClick={()=>void saveIntention.mutateAsync({
          trigger_type:suggested.trigger==="two_missed_days"?"missed_days":suggested.trigger==="low_energy"?"low_energy":"busy_day",
          trigger_value:String(suggested.parameter),
          action_type:suggested.action==="switch_to_retrieval"?"replace_with_retrieval":suggested.action==="move_heavy_work"?"move":suggested.action==="protect_minimum"?"protect_rest":"lighten",
          action_value:String(suggested.parameter),
          enabled:true,
          suggested:true,
          reason:topFriction?.recommendation??suggested.label,
        }).then(()=>toast.success("If-Then-sääntö tallennettu.")).catch(()=>toast.error("Sääntöä ei voitu tallentaa."))}>Hyväksy ehdotettu If-Then-sääntö</button>}
        {(intentionsQ.data??[]).filter(row=>row.enabled).slice(0,4).map(row=><p key={row.id} className="mt-2 rounded-lg bg-muted/50 p-2 text-xs">Jos {row.trigger_type.replaceAll("_"," ")} → {row.action_type.replaceAll("_"," ")} {row.action_value}</p>)}
      </Panel>
    </div>
  </div>;
}
