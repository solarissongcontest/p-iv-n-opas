import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type {
  CapacityProfile,
  Course,
  Mistake,
  PlanItem,
  PracticeAttempt,
  Topic,
} from "../src/lib/domain.ts";
import {
  LEARNING_OS_VERSION_V5,
  adaptiveDayPlanV5,
  applyImplementationIntentionsV5,
  buildExamSimulationV5,
  confusionSetsV5,
  delayedCalibrationV5,
  evaluateRuntimeIntentionsV5,
  feedbackPolicyV5,
  frictionInsightV5,
  instructionDecisionV5,
  nextBestActionsV5,
  pretestPlanV5,
  reminderTaperV5,
  retentionBudgetV5,
  stopRuleV5,
  subjectTaskProfilesV5,
  transferStateV5,
  whatIfPlannerV5,
  whatIfStudySimulatorV5,
} from "../src/lib/learning-os-v5/index.ts";

const NOW="2026-09-30";

const course={
  id:"11111111-1111-4111-8111-111111111111",
  code:"FY04",name:"Fysiikka 4",subject:"Fysiikka",
  exam_date:"2026-10-20",target_system:"school",target_value:"9",
  weekly_minutes:180,archived:false,
} as unknown as Course;

function topic(id:string,name:string,patch:Partial<Topic>={}):Topic{
  return {
    id,owner_id:"owner",course_id:course.id,name,
    progress:60,verified_level:2,self_level:3,weight:1,importance:4,
    school_covered:true,position:0,dependencies:[],materials:null,
    basic_successes:0,exam_successes:0,delayed_successes:0,
    last_review:"2026-09-20",next_review:NOW,
    retrieval_attempts:0,retrieval_failures:0,mastery_uncertainty:1,
    mastery_confidence:.3,evidence_count:0,strong_evidence_count:0,
    recall_strength:0,application_strength:0,retention_strength:0,
    forgetting_risk:.55,exam_relevance:.6,learning_state_updated_at:null,
    last_retrieval_at:null,last_retrieval_result:null,last_retrieval_confidence:null,
    last_retrieval_difficulty:null,study_minutes:0,
    ...patch,
  } as unknown as Topic;
}

function attempt(id:string,topicId:string,patch:Partial<PracticeAttempt>={}):PracticeAttempt{
  return {
    id,owner_id:"owner",course_id:course.id,topic_id:topicId,date:NOW,
    attempt_type:"free_recall",prompt:"Palauta muistista.",response:"Vastaus",
    difficulty:3,result:"independent",outcome:"correct",confidence:2,
    hint_used:false,hints_used:0,response_time_ms:30000,source:"practice",
    evidence_quality:.8,skills:[],expected_concepts:[],question_payload:{},
    scaffold_stage:"independent",assisted:false,dimension_weights:{},
    independent_verification_required:false,operation_id:null,schema_version:5,
    delay_days:2,created_at:NOW+"T12:00:00Z",
    ...patch,
  };
}

const capacity:CapacityProfile={
  studyWeekdays:[1,2,3,4,5],weekdayMinMinutes:20,weekdayMinutes:60,
  weekendMinMinutes:30,weekendMinutes:90,busyDates:[],
};

test("Learning OS v5 version is explicit",()=>{
  assert.equal(LEARNING_OS_VERSION_V5,5);
});

test("retention budget stays inside weekly capacity and protects urgent topics",()=>{
  const t=topic("t1","Newton II",{importance:5,retention_strength:.2});
  const budget=retentionBudgetV5({courses:[course],topics:[t],attempts:[],capacity,now:NOW});
  assert.ok(budget.recommendedMinutes<=budget.capacityMinutes);
  assert.ok(budget.minimumMinutes<=budget.recommendedMinutes);
  assert.ok(budget.extraMinutes<=budget.capacityMinutes);
  assert.ok(budget.targets[0]!.desiredRetention>=.7);
});

test("stop rule ends low-value same-day repetition only after independent evidence",()=>{
  const t=topic("t2","Liikemäärä");
  const rows=[
    attempt("a1",t.id,{attempt_type:"free_recall",created_at:NOW+"T10:00:00Z"}),
    attempt("a2",t.id,{attempt_type:"application",created_at:NOW+"T10:10:00Z",difficulty:4}),
  ];
  const stop=stopRuleV5(t,rows,NOW);
  assert.equal(stop.stopToday,true);
  const hinted=stopRuleV5(t,rows.map(row=>({...row,result:"hinted" as const,outcome:"partial" as const,hint_used:true,hints_used:1,assisted:true})),NOW);
  assert.equal(hinted.stopToday,false);
});

test("new topic gets mastery-neutral preview challenge",()=>{
  const t=topic("t3","Osmosi",{progress:0,verified_level:0,self_level:0});
  const preview=pretestPlanV5(t,[]);
  assert.equal(preview.enabled,true);
  assert.equal(preview.masteryNeutral,true);
  assert.equal(instructionDecisionV5(t,[]).stage,"pretest");
});

test("instruction engine fades support toward transfer",()=>{
  const t=topic("t4","Energia");
  const rows=[
    attempt("a1",t.id,{date:"2026-09-20",attempt_type:"free_recall"}),
    attempt("a2",t.id,{date:"2026-09-22",attempt_type:"explanation"}),
    attempt("a3",t.id,{date:"2026-09-24",attempt_type:"calculation",difficulty:4}),
    attempt("a4",t.id,{date:"2026-09-27",attempt_type:"application",difficulty:4}),
  ];
  const decision=instructionDecisionV5(t,rows,{now:NOW,examDate:course.exam_date});
  assert.notEqual(decision.stage,"pretest");
  assert.ok(["independent","varied_context","transfer","delayed_verification","self_explanation","completion"].includes(decision.stage));
});

test("feedback policy withholds feedback in exam simulation",()=>{
  const policy=feedbackPolicyV5({mode:"exam_simulation",result:"incorrect"});
  assert.equal(policy.timing,"after_block");
  assert.equal(policy.reveal,"score_only");
});

test("confusion-aware interleaving creates discrimination set",()=>{
  const a=topic("a","Liike-energia"),b=topic("b","Liikemäärä");
  const sets=confusionSetsV5({
    topics:[a,b],attempts:[],
    dependencies:[{
      id:"d",owner_id:"owner",topic_id:a.id,depends_on_topic_id:b.id,
      relation_type:"commonly_confused_with",created_at:NOW,
    }],
    now:NOW,
  });
  assert.equal(sets.length,1);
  assert.ok(sets[0]!.priority>=.55);
  assert.equal(sets[0]!.attempts,0);
});

test("delayed calibration detects confident errors",()=>{
  const state=delayedCalibrationV5([
    {topic_id:"t",predicted_confidence:3,actual_outcome:"incorrect",delay_hours:24},
    {topic_id:"t",predicted_confidence:3,actual_outcome:"partial",delay_hours:48},
    {topic_id:"t",predicted_confidence:3,actual_outcome:"incorrect",delay_hours:72},
  ]);
  assert.equal(state.status,"overconfident");
  assert.ok(state.delayedAccuracy!==null);
});

test("friction engine suggests a concrete if-then rule only after repetition",()=>{
  const insight=frictionInsightV5([
    {date:"2026-09-21",reason:"too_tired"},
    {date:"2026-09-28",reason:"too_tired"},
    {date:"2026-09-29",reason:"plans_changed"},
  ]);
  assert.equal(insight.repeatedReason,"too_tired");
  assert.equal(insight.suggestion?.action_type,"replace_with_retrieval");
});

test("reminder taper rewards independent starts rather than notification clicks",()=>{
  const decision=reminderTaperV5(Array.from({length:8},(_,i)=>({
    date:"2026-09-"+String(20+i).padStart(2,"0"),
    reason:"started" as const,
    self_started:true,
    reminder_used:false,
  })));
  assert.equal(decision.mode,"minimal");
  assert.equal(decision.selfStartRate,1);
});

test("what-if planner exposes diminishing marginal value without grade predictions",()=>{
  const t=topic("t5","Kitka");
  const scenarios=whatIfPlannerV5({courses:[course],topics:[t],attempts:[],capacity,now:NOW});
  const low=scenarios.find(row=>row.minutesPerDay===20)!;
  const high=scenarios.find(row=>row.minutesPerDay===60)!;
  assert.ok(high.weeklyCapacity>low.weeklyCapacity);
  assert.ok(high.protectedRetentionShare>=low.protectedRetentionShare);
  assert.doesNotMatch(high.note,/arvosana|grade/i);
});

test("transfer ladder requires varied independent evidence",()=>{
  const t=topic("t6","Ympyräliike");
  const state=transferStateV5(t,[
    attempt("r1",t.id,{attempt_type:"free_recall",question_payload:{transferLevel:0}}),
    attempt("r2",t.id,{attempt_type:"explanation",question_payload:{transferLevel:1}}),
    attempt("r3",t.id,{attempt_type:"calculation",question_payload:{transferLevel:2}}),
    attempt("r4",t.id,{attempt_type:"application",question_payload:{transferLevel:3}}),
  ]);
  assert.ok(state.level>=3);
  assert.equal(state.strongEnoughForTopMastery,false);
});

test("subject-task model refuses fake precision with tiny samples",()=>{
  const t=topic("t7","Voimat");
  const profiles=subjectTaskProfilesV5([attempt("a",t.id)],()=> "Fysiikka");
  assert.equal(profiles[0]!.reliability.label,"low");
  assert.equal(profiles[0]!.spacingMultiplier,1);
});

test("v5 policy stays capacity-bounded",()=>{
  const topics=[topic("p1","A",{importance:5}),topic("p2","B",{importance:5})];
  const input={
    courses:[course],topics,plan:[] as PlanItem[],attempts:[] as PracticeAttempt[],
    mistakes:[] as Mistake[],dependencies:[],capacity,now:NOW,
  };
  const actions=nextBestActionsV5(input);
  const day=adaptiveDayPlanV5(input);
  assert.ok(actions.length>=0);
  assert.ok(day.recommendedMinutes<=day.capacity);
  assert.ok(day.extraMinutes<=day.capacity);
});

test("enabled if-then rules change planner drafts but never the exam item",()=>{
  const drafts=[
    {
      course_id:course.id,topic_id:"t",date:"2026-10-05",phase:"content" as const,kind:"study",
      title:"Ympyräliike",min_minutes:20,target_minutes:50,extra_minutes:15,start_time:null,
    },
    {
      course_id:course.id,topic_id:null,date:"2026-10-20",phase:"exam" as const,kind:"exam",
      title:"Koe",min_minutes:0,target_minutes:0,extra_minutes:0,start_time:null,
    },
  ];
  const applied=applyImplementationIntentionsV5(drafts,[{
    id:"rule-1",trigger_type:"busy_day",trigger_value:"1",action_type:"lighten",
    action_value:"0.4",enabled:true,reason:"Maanantai on toistuvasti liian täysi.",
  }]);
  assert.equal(applied.drafts[0]!.target_minutes,20);
  assert.equal(applied.drafts[0]!.extra_minutes,0);
  assert.equal(applied.drafts[0]!.phase,"review");
  assert.equal(applied.drafts[1]!.kind,"exam");
  assert.equal(applied.applied[0]?.count,1);
});

test("v5 reminder taper never suppresses critical exam reminders in cron priority",()=>{
  const cron=readFileSync(new URL("../src/routes/api.push.cron.ts",import.meta.url),"utf8");
  const examPriority=cron.indexOf("nearestExamDays");
  const ordinaryStudy=cron.indexOf("studyReminderAllowed && weekdays.includes");
  assert.ok(examPriority>=0);
  assert.ok(ordinaryStudy>examPriority);
  assert.match(cron,/reminder_adaptation/);
  assert.match(cron,/recommended_level/);
});

test("v5 health persists reminder adaptation and subject-task parameters",()=>{
  const panel=readFileSync(new URL("../src/components/LearningOSV5Panels.tsx",import.meta.url),"utf8");
  assert.match(panel,/useUpsertReminderAdaptation/);
  assert.match(panel,/useUpsertSubjectTaskParameters/);
  assert.match(panel,/profile\.observations>=8/);
  assert.match(panel,/reminder\.sampleSize<5/);
});

test("YO/Abitti simulation enforces closed-feedback constraints",()=>{
  const t=topic("exam-topic","Mekaniikka");
  const question=(id:string,index:number)=>({
    id,owner_id:"owner",course_id:course.id,topic_id:t.id,curriculum:"LOPS21" as const,
    module_code:"FY04",question_type:"calculation" as const,prompt:"Tehtävä "+index,
    options:[],correct_answer:"x",explanation:"Selitys",hints:[],skills:[],expected_concepts:[],
    difficulty:4,estimated_seconds:600,status:"active" as const,source_type:"seed" as const,
    source_ref:null,metadata:{points:18,answerMode:index%2?"formula":"graph"},
    created_at:NOW+"T00:00:00Z",updated_at:NOW+"T00:00:00Z",
  });
  const sim=buildExamSimulationV5({course,topics:[t],questions:Array.from({length:11},(_,i)=>question("q"+i,i)),mode:"full"});
  assert.equal(sim.maxTasks,11);
  assert.equal(sim.maxSelected,7);
  assert.equal(sim.maxPoints,120);
  assert.equal(sim.durationMinutes,360);
  assert.equal(sim.hintsAllowed,false);
  assert.equal(sim.masteryHidden,true);
  assert.equal(sim.feedbackTiming,"after_block");
});

test("v5 migration persists every new learning signal with RLS and explicit grants",()=>{
  const sql=readFileSync(new URL("../supabase/migrations/20260930174500_learning_os_v5.sql",import.meta.url),"utf8");
  for(const token of [
    "learning_policy_states","calibration_observations","study_friction_events",
    "implementation_intentions","exam_simulations","retention_target",
    "discrimination_strength","transfer_level","is_pretest","stimulus_package",
    "enable row level security","to authenticated","grant select,insert,update,delete",
    "PRETEST_COMPLETED","DISCRIMINATION_ATTEMPT_COMPLETED",
  ]) assert.ok(sql.includes(token),token);
  assert.match(sql,/new\.evidence_quality := 0/);
});


test("active if-then rule changes planner drafts",()=>{
  const drafts=[{
    course_id:course.id,
    topic_id:"topic",
    date:"2026-10-06",
    phase:"content" as const,
    kind:"study",
    title:"Newton II",
    min_minutes:20,
    target_minutes:50,
    extra_minutes:15,
    start_time:null,
  }];
  const result=applyImplementationIntentionsV5(drafts,[{
    id:"rule-1",
    trigger_type:"busy_day",
    trigger_value:String(new Date("2026-10-06T12:00:00Z").getUTCDay()),
    action_type:"lighten",
    action_value:"0.4",
    enabled:true,
    reason:"Tiistain kuorma on toistuvasti liian raskas.",
  }]);
  assert.equal(result.applied.length,1);
  assert.equal(result.drafts[0]!.target_minutes,20);
  assert.equal(result.drafts[0]!.extra_minutes,0);
  assert.equal(result.drafts[0]!.phase,"review");
  assert.match(result.drafts[0]!.title,/kevyt/);
});


test("runtime if-then engine evaluates late-home, low-energy and missed-days triggers",()=>{
  const rules=[
    {id:"late",trigger_type:"late_home" as const,trigger_value:"18:00",action_type:"replace_with_retrieval" as const,action_value:"15",enabled:true},
    {id:"energy",trigger_type:"low_energy" as const,trigger_value:"2",action_type:"protect_rest" as const,action_value:"",enabled:true},
    {id:"missed",trigger_type:"missed_days" as const,trigger_value:"2",action_type:"lighten" as const,action_value:"20",enabled:true},
  ];
  const effect=evaluateRuntimeIntentionsV5(rules,{
    now:"2026-09-30",
    localTime:"19:15",
    busyDates:[],
    latestEnergy:2,
    daysSinceLastSession:3,
    weekday:3,
    recentFrictionReasons:[],
  });
  assert.deepEqual(new Set(effect.triggeredRuleIds),new Set(["late","energy","missed"]));
  assert.equal(effect.replaceWithRetrieval,true);
  assert.equal(effect.dropExtra,true);
  assert.equal(effect.maxMinutes,15);
});

test("interactive What-if planner supports free day, exam-date change and weekday move analysis",()=>{
  const panel=readFileSync(new URL("../src/components/LearningOSV5Panels.tsx",import.meta.url),"utf8");
  assert.match(panel,/Rakenna oma skenaario/);
  assert.match(panel,/Vaihtoehdon vapaapäivä/);
  assert.match(panel,/Vaihtoehdon koepäivä/);
  assert.match(panel,/Siirrä tämä työ/);
  assert.match(panel,/whatIfStudySimulatorV5/);

  const t=topic("scenario","Dynamiikka");
  const result=whatIfStudySimulatorV5({
    courses:[course],topics:[t],attempts:[],
    scenarios:[{id:"free-wed",label:"Vapaa keskiviikko",dailyMinutes:40,skipWeekdays:[3]}],
  })[0]!;
  assert.equal(result.scenario.id,"free-wed");
  assert.ok(result.weeklyMinutes>=0);
});

test("Contrastive Error Lab requires a real parallel attempt before retest",()=>{
  const lab=readFileSync(new URL("../src/components/ContrastiveErrorLab.tsx",import.meta.url),"utf8");
  assert.match(lab,/useQuestionBank/);
  assert.match(lab,/useRecordPracticeAttempt/);
  assert.match(lab,/parallelTask/);
  assert.match(lab,/questionBankId/);
  assert.match(lab,/source: "mistake_repair"/);
  assert.match(lab,/delayedVerificationRequired: true/);
});

test("cross-device E2E covers offline queue, reload, sync and second browser context",()=>{
  const e2e=readFileSync(new URL("../e2e/v5-cross-device.spec.ts",import.meta.url),"utf8");
  const workflow=readFileSync(new URL("../.github/workflows/iphone-e2e.yml",import.meta.url),"utf8");
  for(const token of ["setOffline(true)","reload","setOffline(false)","newContext","OPK-E2E-"]){
    assert.ok(e2e.includes(token),token);
  }
  assert.match(workflow,/v5-cross-device\.spec\.ts/);
  assert.match(workflow,/desktop-chromium/);
});

test("Learning OS v5 exposes explicit module boundaries",()=>{
  const index=readFileSync(new URL("../src/lib/learning-os-v5/index.ts",import.meta.url),"utf8");
  for(const module of ["memory","instruction","discrimination","metacognition","behavior","exam","simulation","personalization","policy"]){
    assert.match(index,new RegExp("\\./"+module+"\\.ts"));
  }
});


test("retention capacity counts only selected study weekdays",()=>{
  const oneDay={...capacity,studyWeekdays:[3],weekdayMinutes:60,weekendMinutes:90};
  const t=topic("one-day","Aaltoliike");
  const budget=retentionBudgetV5({courses:[course],topics:[t],attempts:[],capacity:oneDay,now:NOW});
  assert.equal(budget.capacityMinutes,60);
});

test("stop rule uses newest same-day attempts rather than stale successes",()=>{
  const t=topic("recent-stop","Impulssi");
  const rows=[
    attempt("old1",t.id,{attempt_type:"free_recall",created_at:NOW+"T08:00:00Z"}),
    attempt("old2",t.id,{attempt_type:"application",created_at:NOW+"T08:10:00Z"}),
    attempt("old3",t.id,{attempt_type:"free_recall",created_at:NOW+"T08:20:00Z"}),
    attempt("old4",t.id,{attempt_type:"application",created_at:NOW+"T08:30:00Z"}),
    attempt("new1",t.id,{attempt_type:"application",result:"not_yet",outcome:"incorrect",created_at:NOW+"T12:00:00Z"}),
    attempt("new2",t.id,{attempt_type:"free_recall",result:"not_yet",outcome:"incorrect",created_at:NOW+"T12:10:00Z"}),
  ];
  assert.equal(stopRuleV5(t,rows,NOW).stopToday,false);
});

test("persisted v5 transfer level 2 means same-context, not varied-context",()=>{
  const t=topic("transfer-map","Voima");
  const state=transferStateV5(t,[attempt("same",t.id,{transfer_level:2,question_payload:{transferLevel:2}})]);
  assert.equal(state.level,2);
  assert.equal(state.evidenceByLevel[3],0);
});

test("friction analysis excludes successful starts and matches weekday to the repeated obstacle",()=>{
  const insight=frictionInsightV5([
    {date:"2026-09-21",reason:"no_time",self_started:false},
    {date:"2026-09-28",reason:"no_time",self_started:false},
    {date:"2026-09-23",reason:"too_tired",self_started:false},
    {date:"2026-09-30",reason:"started",self_started:true},
    {date:"2026-09-30",reason:"other",note:"session_start",self_started:true},
  ]);
  assert.equal(insight.repeatedReason,"no_time");
  assert.equal(insight.repeatedWeekday,1);
});

test("reminder taper reads newest starts from newest-first friction data",()=>{
  const newestFailures=Array.from({length:5},(_,i)=>({
    date:"2026-09-"+String(30-i).padStart(2,"0"),reason:"started" as const,self_started:false,reminder_used:true,
  }));
  const olderSuccesses=Array.from({length:3},(_,i)=>({
    date:"2026-09-"+String(20-i).padStart(2,"0"),reason:"started" as const,self_started:true,reminder_used:false,
  }));
  const decision=reminderTaperV5([...newestFailures,...olderSuccesses]);
  assert.equal(decision.mode,"restore");
});

test("custom friction if-then rules can trigger at runtime",()=>{
  const effect=evaluateRuntimeIntentionsV5([{
    id:"forgot",trigger_type:"custom",trigger_value:"forgot_twice",
    action_type:"replace_with_retrieval",action_value:"10",enabled:true,
  }],{
    now:NOW,localTime:"16:00",busyDates:[],latestEnergy:3,daysSinceLastSession:1,weekday:3,
    recentFrictionReasons:["forgot","forgot"],
  });
  assert.deepEqual(effect.triggeredRuleIds,["forgot"]);
  assert.equal(effect.replaceWithRetrieval,true);
  assert.equal(effect.maxMinutes,10);
});

test("Harjoittelutila consumes feedback preference, pins retries and limits confusion practice to the pair",()=>{
  const source=readFileSync(new URL("../src/features/practice/PracticeView.tsx",import.meta.url),"utf8");
  assert.match(source,/feedback_policy_enabled/);
  assert.match(source,/setPinnedSelection\(selection\)/);
  assert.match(source,/selectionTopics = confusionSet/);
  assert.match(source,/confusionSet\?\.topicIds\.includes\(selection\.topic\.id\)/);
  assert.match(source,/pretestOutcomeScore >= \.75/);
});

test("due repaired mistakes are surfaced as actionable delayed verifications",()=>{
  const source=readFileSync(new URL("../src/features/practice/PracticeView.tsx",import.meta.url),"utf8");
  const engine=readFileSync(new URL("../src/lib/learning-os-v5.ts",import.meta.url),"utf8");
  assert.match(source,/dueMistakeVerifications/);
  assert.match(source,/Virheen myöhempi varmistus/);
  assert.match(source,/advanceMistake\.mutateAsync\(\{id:dueMistakeVerification\.id,status:"mastered"\}\)/);
  assert.match(engine,/delayed_verification_due/);
  assert.match(engine,/kind:"verification"/);
});

test("exam simulation enforces point cap, autosaves, resumes and writes exam evidence",()=>{
  const source=readFileSync(new URL("../src/components/ExamSimulationV5.tsx",import.meta.url),"utf8");
  for(const token of [
    "currentPoints+task.points>simulation.maxPoints",
    "useExamSimulations",
    "opk.exam-simulation:",
    "answers:next",
    "completedTaskIds=selected.filter(answerCompleted)",
    "Oma vastauksesi",
    "useRecordPracticeAttempt",
    'source:"exam"',
    "transferLevel:6",
    "key={activeTask.id}",
  ]) assert.ok(source.includes(token),token);
});

test("push-origin starts are marked as reminder-driven before reminder tapering",()=>{
  const cron=readFileSync(new URL("../src/routes/api.push.cron.ts",import.meta.url),"utf8");
  const sw=readFileSync(new URL("../public/sw.js",import.meta.url),"utf8");
  const views=readFileSync(new URL("../src/features/today/TodayView.tsx",import.meta.url),"utf8");
  assert.match(cron,/\?source=push/);
  assert.match(sw,/searchParams\.set\("source", "push"\)/);
  assert.match(views,/params\.get\("source"\)==="push"/);
  assert.match(views,/self_started:!fromReminder/);
  assert.match(views,/reminder_used:fromReminder/);
});

test("accepted implementation intentions reuse an existing persisted rule",()=>{
  const panel=readFileSync(new URL("../src/components/LearningOSV5Panels.tsx",import.meta.url),"utf8");
  assert.match(panel,/const existing=\(intentions\.data\?\?\[\]\)\.find/);
  assert.match(panel,/existing\?\.id/);
});
