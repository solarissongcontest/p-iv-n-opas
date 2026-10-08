import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Bar as RechartsBar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CapacityProfile, Exam, Mistake, PlanItem, PracticeAttempt, Session } from "@/lib/domain";
import {
  buildRecoveryQueue,
  calibration,
  deriveTopicLearningState,
  evidenceSummary,
  learningForecast,
  weeklyLearningReview,
} from "@/lib/learning-engine";
import {
  errorProfileV4,
  experimentInsightsV4,
  learningAchievementsV4,
  learningOsSelfCheckV4,
  masteryModelV4,
  personalLearningProfileV4,
  productMetricsV4,
  sessionFatigueV4,
  simulateLearningOsV4,
} from "@/lib/learning-os-v4";
import { studyDaysInWeek } from "@/lib/domain";
import { buildWeeklyStudyTruth, progressTimelineStart } from "@/lib/progress-analytics";
import {
  useProgressEvents,
  useUpsertWeeklyCheckin,
  useWeeklyCheckins,
} from "@/lib/data";
import { addDays, diffDays, fullDate, minutes, startOfWeek, today, weekNumber } from "@/lib/fi";
import {
  attemptOutcomeLabel,
  attemptTypeLabel,
  confidenceLabel,
  dimensionLabel,
  eventKindLabel,
  errorCategoryLabel,
  experimentStatusLabel,
  masteryLabelFi,
  simulationProfileLabel,
} from "@/lib/ui-fi";
import { V5LearningHealthPanel } from "@/components/LearningOSV5Panels";
import { ContrastiveErrorLab } from "@/components/ContrastiveErrorLab";
import { PlanAdherenceCard } from "@/features/progress/PlanAdherenceCard";
import {
  DataList,
  DataRow,
  Metric,
  MetricGroup,
  SectionCard,
  StatusBadge,
} from "@/components/surfaces";
import { InsightLayout } from "@/layouts";
import { Panel, button, secondary, type Base } from "@/features/shared/StudyViewPrimitives";

export type ProgressSection = "summary"|"mastery"|"analysis";

export function ProgressView({
  courses,
  topics,
  attempts,
  sessions,
  plan,
  exams,
  mistakes,
  capacity,
  onPlan,
  section="summary",
  onSectionChange,
}:Base&{
  attempts:PracticeAttempt[];
  sessions:Session[];
  plan:PlanItem[];
  exams:Exam[];
  mistakes:Mistake[];
  capacity:CapacityProfile;
  onPlan:()=>void;
  section?:ProgressSection | undefined;
  onSectionChange?:(section:ProgressSection)=>void;
}) {
  const now=today();
  const activeCourses=courses.filter(course=>!course.archived&&(!course.start_date||course.start_date<=now)&&(!course.exam_date||course.exam_date>=now));
  const startedCourses=courses.filter(course=>!course.archived&&(!course.start_date||course.start_date<=now));
  const startedCourseIds=new Set(startedCourses.map(course=>course.id));
  const timelineStart=progressTimelineStart({courses,plan,sessions,now});
  const from=addDays(now,-29);
  const recent=sessions.filter(session=>startedCourseIds.has(session.course_id)&&session.date>=from&&session.date<=now);
  const due=plan.filter(item=>startedCourseIds.has(item.course_id)&&item.date>=from&&item.date<=now&&item.kind!=="exam"&&item.status!=="skipped");
  const completed=due.filter(item=>item.status==="completed");
  const recentMinutes=recent.reduce((sum,session)=>sum+session.minutes,0);

  const weekly=buildWeeklyStudyTruth({courses,plan,sessions,now,maxWeeks:8});
  const currentWeekTruth=weekly.find(row=>row.isCurrent)??weekly.at(-1)??null;
  const defaultWeeklyTarget=currentWeekTruth?.planned??0;
  const actual=currentWeekTruth?.actual??0;

  const v4Analysis=useMemo(()=>{
    const rows=topics.map(topic=>{
      const course=courses.find(candidate=>candidate.id===topic.course_id);
      return {topic,model:masteryModelV4(topic,attempts,{now,examDate:course?.exam_date??null})};
    });
    return {
      v4Rows:rows,
      v4Groups:{
        strong:rows.filter(row=>row.model.label==="Strong"),
        secure:rows.filter(row=>row.model.label==="Secure"),
        developing:rows.filter(row=>row.model.label==="Developing"),
        learning:rows.filter(row=>row.model.label==="Learning"),
        atRisk:rows.filter(row=>row.model.label==="At risk"),
        unassessed:rows.filter(row=>row.model.label==="Not assessed"),
      },
      errors30:errorProfileV4(attempts,mistakes,{since:from}),
      fatigue:sessionFatigueV4(sessions,attempts),
      learningProfile:personalLearningProfileV4(sessions,attempts),
      experimentInsights:experimentInsightsV4(sessions,attempts),
      achievements:learningAchievementsV4(topics,attempts,mistakes,courses,now),
      productMetrics:productMetricsV4({courses,topics,attempts,mistakes,sessions,plan,now}),
      selfChecks:learningOsSelfCheckV4({courses,topics,plan,attempts,mistakes,capacity,now}),
      simulations:simulateLearningOsV4({courses,topics,plan,attempts,mistakes,capacity,days:60,start:now}),
    };
  },[attempts,capacity,courses,from,mistakes,now,plan,sessions,topics]);

  const {v4Rows,v4Groups,errors30,fatigue,learningProfile,experimentInsights,achievements,productMetrics,selfChecks,simulations}=v4Analysis;

  const learningRows=topics.map(topic=>{
    const course=courses.find(candidate=>candidate.id===topic.course_id);
    return {topic,state:deriveTopicLearningState(topic,attempts,{now,examDate:course?.exam_date??null})};
  });
  const groups={
    practice:learningRows.filter(row=>row.state.masteryLabel==="Aloita tästä"||row.state.masteryLabel==="Harjoittele"),
    developing:learningRows.filter(row=>row.state.masteryLabel==="Kehittyvä"),
    fairlySure:learningRows.filter(row=>row.state.masteryLabel==="Melko varma"),
    strong:learningRows.filter(row=>row.state.masteryLabel==="Vahva"),
    unassessed:learningRows.filter(row=>row.state.masteryLabel==="Ei vielä arvioitu"),
  };

  const checkins=useWeeklyCheckins();
  const events=useProgressEvents();
  const saveCheckin=useUpsertWeeklyCheckin();
  const week=startOfWeek(now);
  const existing=checkins.data?.find(row=>row.week_start===week);
  const [note,setNote]=useState("");
  const [planned,setPlanned]=useState<number>(defaultWeeklyTarget);
  const [adherence,setAdherence]=useState(3);
  const [hardest,setHardest]=useState("");
  const [wentWell,setWentWell]=useState("");
  const [nextFocus,setNextFocus]=useState("");
  const [load,setLoad]=useState<"light"|"good"|"heavy">("good");

  useEffect(()=>{
    if(!existing){setPlanned(defaultWeeklyTarget);return;}
    setNote(existing.note??"");
    setPlanned(existing.planned_minutes??defaultWeeklyTarget);
    setAdherence(existing.adherence??3);
    setHardest(existing.hardest_topic_id??"");
    setWentWell(existing.went_well??"");
    setNextFocus(existing.next_focus??"");
    setLoad(existing.load_rating??"good");
  },[existing,defaultWeeklyTarget]);

  const rollingHeatStart=addDays(now,-34);
  const heatStart=timelineStart>rollingHeatStart?timelineStart:rollingHeatStart;
  const heatLength=Math.max(1,diffDays(now,heatStart)+1);
  const heat=Array.from({length:heatLength},(_,index)=>{
    const date=addDays(heatStart,index);
    const mins=sessions.filter(session=>startedCourseIds.has(session.course_id)&&session.date===date).reduce((sum,session)=>sum+session.minutes,0);
    return {date,mins};
  });
  const review=weeklyLearningReview({courses,topics,attempts,sessions,plan,now});
  const calibrationData=calibration({attempts,window:30});
  const nextExam=exams.filter(exam=>exam.date>=now).sort((a,b)=>a.date.localeCompare(b.date))[0];
  const forecastCourse=nextExam?courses.find(course=>course.id===nextExam.course_id):courses[0];
  const forecast=forecastCourse?learningForecast({
    course:forecastCourse,
    topics:topics.filter(topic=>topic.course_id===forecastCourse.id),
    attempts:attempts.filter(attempt=>attempt.course_id===forecastCourse.id),
    sessions,
    plan,
    now,
  }):null;

  const nextWeekSuggestions=activeCourses.slice(0,6).map(course=>{
    const courseTopics=topics.filter(topic=>topic.course_id===course.id);
    const queue=buildRecoveryQueue({
      topics:courseTopics,
      attempts:attempts.filter(attempt=>attempt.course_id===course.id),
      courses:[course],
      now:addDays(now,7),
      capacityMinutes:20,
      maxItems:1,
    });
    const exam=exams.filter(candidate=>candidate.course_id===course.id&&candidate.date>=now).sort((a,b)=>a.date.localeCompare(b.date))[0];
    const strongShare=courseTopics.length
      ? courseTopics.filter(topic=>deriveTopicLearningState(topic,attempts,{now,examDate:course.exam_date}).masteryLevel>=4).length/courseTopics.length
      : 0;
    if(queue.items[0]) return course.code+": yksi kohdennettu muistista palauttaminen ("+queue.items[0].topic.name+")";
    if(exam&&diffDays(exam.date,now)<=21&&strongShare>=0.5) return course.code+": siirry vaihteleviin tehtäviin";
    return course.code+": suunnitelma ennallaan";
  });

  const healthyCount=v4Groups.strong.length+v4Groups.secure.length;
  const reviewCount=groups.practice.length+groups.developing.length;
  const completionRate=due.length?Math.round(completed.length/due.length*100):null;

  return <InsightLayout className={"progress-view progress-v5 progress-section-"+section}>
    <div role="tablist" aria-label="Edistymisen osiot" className="progress-section-tabs">
      {([
        ["summary","Yhteenveto"],
        ["mastery","Osaaminen"],
        ["analysis","Analyysi"],
      ] as Array<[ProgressSection,string]>).map(([id,label])=><button key={id} role="tab" aria-selected={section===id} className={section===id?"progress-section-tab progress-section-tab-active":"progress-section-tab"} onClick={()=>onSectionChange?.(id)}>{label}</button>)}
    </div>

    <p className="progress-summary-only progress-v5-intro">Yhteenveto näyttää vain päätösten kannalta tärkeimmät asiat. Tarkempi näyttö löytyy Osaaminen- ja Analyysi-osioista.</p>

    <PlanAdherenceCard sessions={sessions} plan={plan}/>

    <SectionCard className="progress-summary-only progress-v5-now" title="Tilanne nyt">
      <MetricGroup>
        <Metric label="Hyvin hallussa" value={healthyCount} detail="aihetta, joista on vahvaa näyttöä"/>
        <Metric label="Kannattaa kerrata" value={reviewCount} detail="aihetta tarvitsee vielä vahvistamista"/>
        <Metric
          label="Seuraava koe"
          value={nextExam?(courses.find(course=>course.id===nextExam.course_id)?.code??"Koe"):"—"}
          detail={nextExam?`${fullDate(nextExam.date)} · ${diffDays(nextExam.date,now)} pv`:"Ei merkittyä koetta"}
        />
      </MetricGroup>
      <button className={secondary+" mt-4"} onClick={()=>onSectionChange?.("mastery")}>Avaa osaamiskartta</button>
    </SectionCard>

    <SectionCard className="progress-summary-only progress-v5-week" title={"Viikkosi · viikko "+weekNumber(now)}>
      <div className="progress-v5-week-grid">
        <div>
          <h3>Vahvistui</h3>
          {review.strengthened.length?<DataList>{review.strengthened.map(row=><DataRow key={row.topic.id}>{courses.find(course=>course.id===row.topic.course_id)?.code} · {row.topic.name}</DataRow>)}</DataList>:<p>Ei vielä riittävästi uutta näyttöä tällä viikolla.</p>}
        </div>
        <div>
          <h3>Tarvitsee vielä kierroksen</h3>
          {review.needsRound.length?<DataList>{review.needsRound.map(row=><DataRow key={row.topic.id}>{courses.find(course=>course.id===row.topic.course_id)?.code} · {row.topic.name}</DataRow>)}</DataList>:<p>Kertausjono on tällä hetkellä hallinnassa.</p>}
        </div>
        <div className="progress-v5-plan-status">
          <h3>Suunnitelma</h3>
          <strong>{review.completed}/{review.planned}</strong>
          <span>tärkeästä tähän päivään mennessä toteutui</span>
        </div>
      </div>
      {nextWeekSuggestions.length>0&&<div className="progress-v5-next-week"><b>Ensi viikolle ehdotan</b>{nextWeekSuggestions.map((suggestion,index)=><p key={index}>{suggestion}</p>)}</div>}
      <button className={button+" mt-4"} onClick={onPlan}>Tarkista ja hyväksy suunnitelma</button>
    </SectionCard>

    {forecast&&forecastCourse&&<SectionCard className="progress-summary-only progress-v5-forecast" title="Aikatauluennuste" action={<StatusBadge tone={forecastCourse.exam_date&&forecast.latest>forecastCourse.exam_date?"warning":"positive"}>{forecastCourse.exam_date&&forecast.latest>forecastCourse.exam_date?"Tarkista suunnitelma":"Aikataulussa"}</StatusBadge>}>
      <p className="text-sm text-muted-foreground">{forecastCourse.code} · ensimmäinen sisältökierros</p>
      <p className="progress-v5-forecast-date">{fullDate(forecast.earliest)}–{fullDate(forecast.latest)}</p>
      <MetricGroup>
        <Metric label="Opiskelukertoja / vko" value={forecast.sessionsPerWeek.toFixed(1)}/>
        <Metric label="Toteutumisaste" value={`${Math.round(forecast.adherence*100)} %`}/>
        <Metric label="Sisältö" value={`${Math.round(forecast.coverage)} %`}/>
      </MetricGroup>
      <p className="mt-3 text-xs text-muted-foreground">{forecast.note}</p>
    </SectionCard>}

    <div className="progress-mastery-only"><V5LearningHealthPanel courses={courses} topics={topics} attempts={attempts}/></div>

    <SectionCard className="progress-mastery-only progress-v5-mastery" title="Osaamiskartta">
      <MetricGroup>
        <Metric label="Harjoittele seuraavaksi" value={groups.practice.length} detail={groups.practice.slice(0,2).map(row=>row.topic.name).join(", ")||"—"}/>
        <Metric label="Kehittyvä" value={groups.developing.length} detail={groups.developing.slice(0,2).map(row=>row.topic.name).join(", ")||"—"}/>
        <Metric label="Melko varma" value={groups.fairlySure.length} detail={groups.fairlySure.slice(0,2).map(row=>row.topic.name).join(", ")||"—"}/>
        <Metric label="Vahva" value={groups.strong.length} detail={groups.strong.slice(0,2).map(row=>row.topic.name).join(", ")||"—"}/>
        <Metric label="Ei vielä tarpeeksi näyttöä" value={groups.unassessed.length}/>
      </MetricGroup>
      <div className="progress-v5-mastery-list">
        {[...learningRows].sort((a,b)=>a.state.masteryLevel-b.state.masteryLevel||b.state.uncertainty-a.state.uncertainty).slice(0,18).map(row=><details key={row.topic.id}>
          <summary><span><b>{courses.find(course=>course.id===row.topic.course_id)?.code} · {row.topic.name}</b><small>{row.state.masteryLabel} · {row.state.masteryConfidence>=0.7?"näyttöä paljon":row.state.masteryConfidence>=0.45?"näyttöä jonkin verran":"näyttöä vielä vähän"}</small></span><span>Miksi?</span></summary>
          <div className="progress-v5-evidence"><p>{evidenceSummary(row.state,row.topic,attempts)}</p><p>Muistista palautus {Math.round(row.state.recallStrength*100)} · soveltaminen {Math.round(row.state.applicationStrength*100)} · säilyminen {Math.round(row.state.retentionStrength*100)} · epävarmuus {Math.round(row.state.uncertainty*100)}</p>{attempts.filter(attempt=>attempt.topic_id===row.topic.id).slice(0,4).map(attempt=><p key={attempt.id}>{fullDate(attempt.date)} · {attemptTypeLabel(attempt.attempt_type)} → {attemptOutcomeLabel(attempt.outcome??attempt.result)}{typeof attempt.hints_used==="number"?" · vihjeitä "+attempt.hints_used:""}</p>)}</div>
        </details>)}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">“Ei vielä tarpeeksi näyttöä” tarkoittaa, ettei järjestelmän pidä teeskennellä tietävänsä osaamistasoa ennen oikeaa näyttöä.</p>
    </SectionCard>

    <SectionCard className="progress-mastery-only progress-v5-dimensions" title="Tarkempi osaamisnäyttö">
      <div className="progress-v5-dimension-grid">
        {[
          ["Ei vielä arvioitu",v4Groups.unassessed],
          ["Harjoittele",v4Groups.learning],
          ["Kehittyvä",v4Groups.developing],
          ["Melko varma",v4Groups.secure],
          ["Vahva",v4Groups.strong],
          ["Riskissä",v4Groups.atRisk],
        ].map(([label,rows])=><div key={label as string}><small>{label as string}</small><strong>{(rows as typeof v4Rows).length}</strong></div>)}
      </div>
      <div className="progress-v5-mastery-list">
        {[...v4Rows].sort((a,b)=>a.model.level-b.model.level||b.model.uncertainty-a.model.uncertainty).slice(0,16).map(({topic,model})=><details key={topic.id}>
          <summary><span><b>{courses.find(course=>course.id===topic.course_id)?.code} · {topic.name}</b><small>{model.evidenceCount===0?"Ei vielä arvioitu · ei osaamisnäyttöä":masteryLabelFi(model.label)+" · näytön varmuus "+Math.round(model.confidence*100)+" %"+(model.blindSpot?" · mahdollinen sokea piste":"")}</small></span><strong>{model.evidenceCount===0?"—":model.score+" %"}</strong></summary>
          {model.evidenceCount===0?<div className="progress-v5-evidence"><p>Aiheesta ei ole vielä osaamisnäyttöä. Prosenttia ei lasketa ennen ensimmäistä oikeaa harjoitusyritystä.</p></div>:<div className="progress-v5-dimension-detail"><span>Muistista palautus <b>{model.dimensions.recall.score}%</b></span><span>Ymmärrys <b>{model.dimensions.understanding.score}%</b></span><span>Soveltaminen <b>{model.dimensions.application.score}%</b></span><span>Sujuvuus <b>{model.dimensions.fluency.score}%</b></span><span>Säilyminen <b>{model.dimensions.retention.score}%</b></span><span>Oman arvion tarkkuus <b>{model.dimensions.calibration.score}%</b></span><p>Heikoin osa-alue: {dimensionLabel(model.weakestDimension)}. Prosentit ovat näyttöön perustuvia arvioita, eivät todistuksen numeroita.</p></div>}
        </details>)}
      </div>
    </SectionCard>

    <SectionCard className="progress-analysis-only progress-v5-analysis-overview" title="30 päivän yhteenveto">
      <MetricGroup>
        <Metric label="Opiskeltu" value={minutes(recentMinutes)}/>
        <Metric label="Nykyisestä suunnitelmasta valmis" value={completionRate===null?"—":`${completionRate} %`} detail={`${completed.length}/${due.length} erääntynyttä tehtävää`}/>
        <Metric label="Oppimisen tehokkuus" value={productMetrics.studyEfficiency===null?"—":(Math.round(productMetrics.studyEfficiency*10)/10).toString()} detail="vakaat aiheet / tunti"/>
      </MetricGroup>
      <p className="mt-2 text-xs text-muted-foreground">Tehtäväprosentti perustuu nykyisen Plannerin viimeisen 30 päivän erääntyneisiin tehtäviin. Historiallinen suunnitelmassa pysyminen näkyy ylempänä päiväkohtaisessa käyrässä.</p>
    </SectionCard>

    <div className="progress-analysis-only"><ContrastiveErrorLab courses={courses} topics={topics} mistakes={mistakes}/></div>

    <div className="progress-analysis-only progress-v5-analysis-grid">
      <SectionCard title="Virheiden jakauma · 30 pv">
        {errors30.length?<DataList>{errors30.slice(0,6).map(row=><DataRow key={row.category}><div className="progress-v5-split-row"><span>{errorCategoryLabel(row.category)}</span><b>{Math.round(row.share*100)} %</b></div></DataRow>)}</DataList>:<p className="text-sm text-muted-foreground">Virhehavaintoja ei ole vielä tarpeeksi.</p>}
      </SectionCard>
      <SectionCard title="Opiskelukerran kuormitus">
        <p className="text-lg font-semibold">{fatigue.level==="high"?"Tauko- ja pituussignaali on selvä":fatigue.level==="watch"?"Pieni väsymissignaali":"Ei selvää väsymissignaalia"}</p>
        <p className="mt-2 text-sm text-muted-foreground">{fatigue.reason}</p>
        {fatigue.preferredSessionMinutes&&<p className="mt-3 text-sm">Nykyisissä havainnoissa noin <b>{fatigue.preferredSessionMinutes} min</b> opiskelukerrat näyttävät toimivan parhaiten.</p>}
      </SectionCard>
    </div>

    <div className="progress-analysis-only progress-v5-analysis-grid">
      <SectionCard title="Henkilökohtainen oppimisprofiili">
        {learningProfile.observations.length?<DataList>{learningProfile.observations.map((row,index)=><DataRow key={index}><p className="font-medium">{row.label}</p><p className="mt-1 text-xs text-muted-foreground">{row.evidence} · näytön varmuus {confidenceLabel(row.confidence)}</p></DataRow>)}</DataList>:<p className="text-sm text-muted-foreground">Profiili rakentuu käytöstä. Sovellus ei arvaa oppimistyyliä tyhjästä.</p>}
      </SectionCard>
      <SectionCard title="Henkilökohtaiset oppimiskokeilut">
        <DataList>{experimentInsights.map(row=><DataRow key={row.key}><div className="progress-v5-split-row"><b>{row.label}</b><span>{experimentStatusLabel(row.status)}</span></div><p className="mt-1 text-sm text-muted-foreground">{row.description}</p><p className="mt-1 text-xs text-muted-foreground">A: {row.sampleA} havaintoa · B: {row.sampleB} havaintoa</p></DataRow>)}</DataList>
        <p className="mt-3 text-xs text-muted-foreground">Johtopäätös tehdään myöhemmästä osaamisnäytöstä, ei siitä miltä opiskelukerta tuntui.</p>
      </SectionCard>
    </div>

    <SectionCard className="progress-analysis-only" title="Osaamisen virstanpylväät">
      <div className="progress-v5-achievements">{achievements.map(item=><div key={item.id} className={item.earned?"progress-v5-achievement progress-v5-achievement-earned":"progress-v5-achievement"}><div><b>{item.title}</b><span aria-label={item.earned?"saavutettu":"kesken"}>{item.earned?"✓":"○"}</span></div><p>{item.body}</p><div className="progress-v5-achievement-track"><div style={{width:Math.min(100,item.progress)+"%"}}/></div></div>)}</div>
      <p className="mt-3 text-xs text-muted-foreground">Ei kokemuspisteitä, tulostauluja tai päiväputkirangaistuksia. Edistyminen tarkoittaa osaamisen vahvistumista ja virheistä oppimista.</p>
    </SectionCard>

    <SectionCard className="progress-analysis-only" title="Oppimismittarit">
      <MetricGroup>
        <Metric label="Myöhempi muistaminen" value={productMetrics.delayedRecallRate===null?"—":Math.round(productMetrics.delayedRecallRate*100)+" %"}/>
        <Metric label="Itsenäinen onnistuminen" value={productMetrics.independentSuccessRate===null?"—":Math.round(productMetrics.independentSuccessRate*100)+" %"}/>
        <Metric label="Osaamisen vakaus" value={productMetrics.masteryStability===null?"—":Math.round(productMetrics.masteryStability*100)+" %"}/>
        <Metric label="Virheistä palautuminen" value={productMetrics.recoverySuccessRate===null?"—":Math.round(productMetrics.recoverySuccessRate*100)+" %"}/>
        <Metric label="Vakaat aiheet / tunti" value={productMetrics.studyEfficiency===null?"—":(Math.round(productMetrics.studyEfficiency*10)/10).toString()}/>
      </MetricGroup>
      <p className="mt-3 text-xs text-muted-foreground">Ruutuaikaa ei palkita. Mittarit kertovat muistamisesta, osaamisen vakaudesta, virheistä palautumisesta ja oppimisen tehokkuudesta.</p>
    </SectionCard>

    <details className="progress-analysis-only progress-v5-system-check study-card study-card-section">
      <summary>Järjestelmän tarkistus · 60 päivän arvio</summary>
      <div className="progress-v5-system-check-body">
        {selfChecks.map(check=><p key={check.id}>{check.ok?"✓":"⚠"} {check.message}</p>)}
        <div className="progress-v5-simulations">{simulations.map(sim=><div key={sim.profile}><b>{simulationProfileLabel(sim.profile)}</b><p>Osaaminen {sim.meanMastery} · varmuus {sim.meanConfidence}</p><small>{sim.completed} toimintoa · {sim.skipped} ohitettua · {sim.overloadDays} ylikuormapäivää</small></div>)}</div>
      </div>
    </details>

    {calibrationData&&<SectionCard className="progress-analysis-only" title="Varmuusarvion osumatarkkuus">
      <p className="text-lg font-semibold">{calibrationData.label}</p>
      <p className="mt-2 text-sm text-muted-foreground">Perustuu {calibrationData.count} harjoitusyritykseen, joissa annoit varmuusarvion ennen palautetta. Tämä ei ole pisteytys eikä sijoituslista.</p>
    </SectionCard>}

    <SectionCard className="progress-analysis-only progress-v5-heat" title="Opiskelurytmi">
      <div className="progress-v5-heat-grid">{heat.map(cell=>{const intensity=cell.mins===0?0:cell.mins<30?0.25:cell.mins<60?0.5:cell.mins<90?0.75:1;return <div key={cell.date} title={fullDate(cell.date)+" · "+minutes(cell.mins)} style={{opacity:intensity===0?0.07:intensity}}/>})}</div>
      <p className="mt-3 text-xs text-muted-foreground">Näytetään vain ajalta, jolloin vähintään yksi nykyinen kurssi on alkanut. Tummempi ruutu tarkoittaa kirjattuja opiskeluminuutteja; päiväputkia ei käytetä painostamiseen.</p>
    </SectionCard>

    <SectionCard className="progress-analysis-only" title="Viikoittainen työmäärä · nykyinen suunnitelma vs. toteutunut">
      <div className="progress-v5-weekly-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={weekly}><CartesianGrid vertical={false} stroke="var(--hairline)"/><XAxis dataKey="week" tickLine={false} axisLine={false}/><YAxis width={34} tickLine={false} axisLine={false}/><Tooltip formatter={(value)=>minutes(Number(value))}/><RechartsBar dataKey="planned" name="Nykyinen suunnitelma" fill="var(--muted-foreground)" fillOpacity={0.24}/><RechartsBar dataKey="actual" name="Toteutunut" fill="var(--primary)" fillOpacity={0.78}/></BarChart></ResponsiveContainer></div>
      <p className="mt-2 text-xs text-muted-foreground">Pylvään suunniteltu määrä tulee nykyisestä Plannerista ja toteutunut määrä kirjatuista opiskelukerroista. Historialliset suunnitelmamuutokset eivät kuulu tähän kuormakuvaajaan; ne näkyvät päiväkohtaisessa suunnitelma–toteuma-käyrässä.</p>
    </SectionCard>

    <SectionCard className="progress-analysis-only progress-v5-reflection" title={"Viikko "+weekNumber(now)+" · reflektio"}>
      <MetricGroup>
        <Metric label="Suunniteltu tälle viikolle" value={minutes(planned)}/>
        <Metric label="Toteutunut tähän mennessä" value={minutes(actual)}/>
        <Metric label="Opiskelupäivät" value={studyDaysInWeek(sessions)}/>
      </MetricGroup>
      <label className="progress-v5-field">Suunniteltu määrä minuutteina<input type="number" min="0" step="15" value={planned} onChange={event=>setPlanned(Number(event.target.value))}/></label>
      <p className="mt-1 text-xs text-muted-foreground">Oletusarvo tulee tämän viikon oikeista Planner-tehtävistä, ei kurssien yleisistä viikkobudjeteista.</p>
      <fieldset className="progress-v5-adherence-rating"><legend>Suunnitelmassa pysyminen 1–5</legend><div>{[1,2,3,4,5].map(value=><button key={value} type="button" aria-pressed={adherence===value} onClick={()=>setAdherence(value)}>{value}</button>)}</div></fieldset>
      <div className="progress-v5-form-grid">
        <label className="progress-v5-field">Vaikein aihe<select value={hardest} onChange={event=>setHardest(event.target.value)}><option value="">Ei valintaa</option>{topics.map(topic=><option key={topic.id} value={topic.id}>{courses.find(course=>course.id===topic.course_id)?.code} · {topic.name}</option>)}</select></label>
        <label className="progress-v5-field">Kuormitus<select value={load} onChange={event=>setLoad(event.target.value as "light"|"good"|"heavy")}><option value="light">Liian kevyt</option><option value="good">Sopiva</option><option value="heavy">Liian raskas</option></select></label>
      </div>
      <label className="progress-v5-field">Mikä meni hyvin?<textarea rows={2} value={wentWell} onChange={event=>setWentWell(event.target.value)}/></label>
      <label className="progress-v5-field">Seuraavan viikon painopiste<textarea rows={2} value={nextFocus} onChange={event=>setNextFocus(event.target.value)}/></label>
      <label className="progress-v5-field">Muut huomiot<textarea rows={3} value={note} onChange={event=>setNote(event.target.value)}/></label>
      <div className="progress-v5-form-actions"><button className={button} disabled={saveCheckin.isPending} onClick={()=>void saveCheckin.mutateAsync({week_start:week,note:note.trim()||null,planned_minutes:planned,actual_minutes:actual,adherence,hardest_topic_id:hardest||null,went_well:wentWell.trim()||null,next_focus:nextFocus.trim()||null,load_rating:load}).then(result=>toast.success(result==="queued"?"Reflektio tallennettu paikallisesti.":"Viikkopohdinta tallennettu.")).catch(()=>toast.error("Tallennus epäonnistui."))}>Tallenna viikkopohdinta</button><button className={secondary} onClick={onPlan}>Avaa ensi viikon suunnitelma</button></div>
    </SectionCard>

    <SectionCard className="progress-analysis-only" title="Osaamisen tapahtumat">
      {events.data?.length?<DataList>{events.data.slice(0,12).map(event=><DataRow key={event.id}><p className="font-medium">{event.detail??eventKindLabel(event.kind)}</p><p className="text-sm text-muted-foreground">{event.kind==="mastery"&&event.from_value!=null&&event.to_value!=null?"Osaaminen "+event.from_value+" → "+event.to_value:eventKindLabel(event.kind)} · {new Date(event.created_at).toLocaleDateString("fi-FI")}</p></DataRow>)}</DataList>:<p className="text-muted-foreground">Osaamisen muutokset ilmestyvät tähän harjoittelun myötä.</p>}
    </SectionCard>
  </InsightLayout>;
}
