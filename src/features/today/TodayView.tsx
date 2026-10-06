import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import { toast } from "sonner";
import type { CapacityProfile, Exam, Mistake, PlanItem, PracticeAttempt, PracticeTest, Session } from "@/lib/domain";
import { buildRecoveryQueue, capacityForDateV3, examStage } from "@/lib/learning-engine";
import { adaptiveDayPlanV5 } from "@/lib/learning-os-v5";
import { examMode, findNextStudyDate, returnFromBreak, weekMinutes } from "@/lib/domain";
import {
  isPlanSyncConflict,
  useCreateFrictionEvent,
  useFrictionEvents,
  useImplementationIntentions,
  useMovePlanItem,
  useTopicDependencies,
  useUpsertPlanItem,
} from "@/lib/data";
import { diffDays, fullDate, minutes, today } from "@/lib/fi";
import {
  DataList,
  DataRow,
  Disclosure,
  EmptyState,
  InlineNotice,
  Metric,
  MetricGroup,
  PrimaryCard,
  SectionCard,
  StatusBadge,
} from "@/components/surfaces";
import { ActionDashboardLayout } from "@/layouts";
import { Bar, button, secondary, type Base } from "@/features/shared/StudyViewPrimitives";
import { Dialog } from "@/features/shared/DialogPrimitives";

const todayFrictionReasons = [
  ["no_time", "Ei aikaa"],
  ["forgot", "Unohdin"],
  ["too_tired", "Liian väsynyt"],
  ["too_hard", "Liian vaikea"],
  ["unclear_start", "En tiedä mistä aloittaa"],
  ["plans_changed", "Suunnitelmat muuttuivat"],
  ["other", "Muu syy"],
] as const;
type TodayFrictionReason = (typeof todayFrictionReasons)[number][0];

export function TodayView({courses,topics,sessions,exams,plan,tests,attempts,mistakes,capacity,onStart,onGo,onPractice}:Base&{
  sessions:Session[];
  exams:Exam[];
  plan:PlanItem[];
  tests:PracticeTest[];
  attempts:PracticeAttempt[];
  mistakes:Mistake[];
  capacity:CapacityProfile;
  onStart:(id:string)=>void;
  onGo:(page:"plan"|"exams"|"practice")=>void;
  onPractice?:(courseId:string,topicId?:string)=>void;
}) {
  const now=today();
  const move=useMovePlanItem(),upsert=useUpsertPlanItem();
  const graph=useTopicDependencies(),friction=useCreateFrictionEvent(),frictionEvents=useFrictionEvents(),intentions=useImplementationIntentions();
  const [taskIndex,setTaskIndex]=useState(0);
  const [loadMode,setLoadMode]=useState<"minimum"|"recommended"|"extra">("recommended");
  const [localTime,setLocalTime]=useState("00:00");
  const [cannotTodayOpen,setCannotTodayOpen]=useState(false);
  const [todayFrictionReason,setTodayFrictionReason]=useState<TodayFrictionReason>("no_time");

  useEffect(()=>{
    const update=()=>setLocalTime(new Date().toLocaleTimeString("fi-FI",{hour:"2-digit",minute:"2-digit",hour12:false}));
    update();
    const timer=window.setInterval(update,60_000);
    return()=>window.clearInterval(timer);
  },[]);

  const adaptiveDay=adaptiveDayPlanV5({
    courses,topics,plan,attempts,mistakes,capacity,dependencies:graph.data??[],now,
    intentions:intentions.data??[],sessions,frictionEvents:frictionEvents.data??[],localTime,
  });
  const actions=adaptiveDay[loadMode];
  useEffect(()=>{if(taskIndex>=actions.length)setTaskIndex(0);},[actions.length,taskIndex]);

  const nextAction=actions[taskIndex]??actions[0];
  const next=nextAction?.planItem??null;
  const later=actions.filter(action=>action.id!==nextAction?.id).slice(0,3);
  const upcoming=exams.filter(exam=>exam.date>=now).sort((a,b)=>a.date.localeCompare(b.date))[0];
  const goal=courses.reduce((sum,course)=>sum+course.weekly_minutes,0);
  const done=weekMinutes(sessions,now);
  const last=sessions.find(session=>session.note||session.unclear);
  const dayCapacity=capacityForDateV3(capacity,now);
  const recovery=buildRecoveryQueue({topics,attempts,courses,now,capacityMinutes:Math.min(20,dayCapacity),maxItems:3});
  const comeback=returnFromBreak({sessions,topics,now,days:7});
  const todayMinutes=actions.reduce((sum,item)=>sum+item.minutes,0);
  const examCourse=upcoming?courses.find(course=>course.id===upcoming.course_id):undefined;
  const mode=examMode(upcoming?.date??null,now);
  const examTopics=examCourse?topics.filter(topic=>topic.course_id===examCourse.id):[];
  const examPrep=examCourse?examStage({
    topics:examTopics,
    attempts:attempts.filter(attempt=>attempt.course_id===examCourse.id),
    tests:tests.filter(test=>test.course_id===examCourse.id),
    mistakes:mistakes.filter(mistake=>mistake.course_id===examCourse.id),
    course:examCourse,
  }):null;
  const openMistakes=examCourse?mistakes.filter(mistake=>mistake.course_id===examCourse.id&&mistake.status!=="mastered").length:0;
  const reason=nextAction?.reason??"";
  const dayStatus=actions.length===0
    ? {label:"Vapaa päivä",tone:"neutral" as const}
    : todayMinutes<=dayCapacity
      ? {label:"Kapasiteettiin sopiva",tone:"positive" as const}
      : {label:"Kuormitus tarkistettava",tone:"warning" as const};

  function startChosen(action:(typeof actions)[number]){
    const params=new URLSearchParams(window.location.search);
    const fromReminder=params.get("source")==="push";
    void friction.mutateAsync({
      date:now,
      plan_item_id:action.planItem?.id??null,
      course_id:action.course.id,
      reason:"started",
      note:fromReminder?"session_start_from_push":"session_start",
      self_started:!fromReminder,
      reminder_used:fromReminder,
    }).catch(()=>undefined);
    if(fromReminder){
      params.delete("source");
      const query=params.toString();
      window.history.replaceState(null,"",window.location.pathname+(query?"?"+query:""));
    }
    if(action.planItem)onStart(action.planItem.id);
    else if(onPractice)onPractice(action.course.id,action.topic?.id);
    else onGo("practice");
  }

  async function makeLight(){
    if(!next)return;
    const light=Math.max(5,next.min_minutes||Math.round(next.target_minutes*0.5));
    try{
      await upsert.mutateAsync({
        id:next.id,
        course_id:next.course_id,
        date:next.date,
        target_minutes:light,
        extra_minutes:0,
        expected_updated_at:next.updated_at,
        expected_status:next.status,
        expected_target_minutes:next.target_minutes,
      });
      toast.success(`Tehtävä kevennettiin: ${minutes(light)}.`);
    }catch(error){
      toast.error(isPlanSyncConflict(error)?"Tehtävää muutettiin toisella laitteella. Uusin versio ladattiin.":"Tehtävää ei voitu keventää.");
    }
  }

  function cannotToday(){
    if(!next)return;
    setTodayFrictionReason("no_time");
    setCannotTodayOpen(true);
  }

  async function confirmCannotToday(){
    if(!next)return;
    const course=courses.find(candidate=>candidate.id===next.course_id);
    const date=findNextStudyDate({
      plan,
      fromISO:now,
      studyWeekdays:capacity.studyWeekdays,
      minutes:next.target_minutes,
      ignoreItemId:next.id,
      latestDate:course?.exam_date??null,
      capacity,
    });
    if(!date){
      setCannotTodayOpen(false);
      toast.error("En löytänyt ennen koetta järkevää vapaata opiskelupäivää. Avaa suunnitelma ja valitse päivä.");
      onGo("plan");
      return;
    }
    try{
      await move.mutateAsync({id:next.id,date,from:next.date,expected_updated_at:next.updated_at,expected_status:next.status});
      setCannotTodayOpen(false);
      setTaskIndex(0);
      void friction.mutateAsync({date:now,plan_item_id:next.id,course_id:next.course_id,reason:todayFrictionReason,self_started:false,reminder_used:false}).catch(()=>undefined);
      toast.success(`Tehtävä siirrettiin päivälle ${fullDate(date)}. Tälle päivälle ei synny lisävelkaa.`);
    }catch(error){
      toast.error(isPlanSyncConflict(error)?"Tehtävää muutettiin toisella laitteella. Uusin versio ladattiin.":"Muutos epäonnistui.");
    }
  }

  return <>
    <ActionDashboardLayout className="today-view today-v5">
      <div className="today-v5-dashboard">
        <div className="today-v5-main">
          <PrimaryCard className="today-v5-primary" title="Seuraavaksi" eyebrow={nextAction?`${nextAction.course.code} · ${minutes(nextAction.minutes)}`:"Tämän päivän tilanne"}>
            {nextAction?<>
              <h3 className="today-v5-next-title">{nextAction.title}</h3>
              <p className="today-v5-next-summary">Yksi selkeä seuraava askel. Aloita tästä ja anna suunnitelman huolehtia lopusta.</p>

              <div className="today-v5-primary-actions">
                <button className={button} onClick={()=>startChosen(nextAction)}>{nextAction.planItem?"Aloita opiskelu":"Aloita harjoittelu"}</button>
                {next&&<button disabled={move.isPending} className={secondary} onClick={cannotToday}>En ehdi tänään</button>}
              </div>

              <Disclosure summary="Miksi tätä ehdotetaan?" className="today-v5-disclosure">
                <p>Koska {reason}.</p>
                {adaptiveDay.stoppedForLowMarginalGain&&<p className="mt-2">Tähän on hyvä lopettaa tältä erää: seuraavasta tehtävästä arvioidaan saatavan selvästi vähemmän hyötyä käytettyyn aikaan nähden.</p>}
              </Disclosure>

              <Disclosure summary="Muuta tämän päivän kuormaa" className="today-v5-disclosure">
                <div className="today-v5-load-options">
                  <button aria-pressed={loadMode==="minimum"} onClick={()=>{setLoadMode("minimum");setTaskIndex(0);}}>Kevyt<span>{adaptiveDay.minimumMinutes} min</span></button>
                  <button aria-pressed={loadMode==="recommended"} onClick={()=>{setLoadMode("recommended");setTaskIndex(0);}}>Suositeltu<span>{adaptiveDay.recommendedMinutes} min</span></button>
                  <button aria-pressed={loadMode==="extra"} onClick={()=>{setLoadMode("extra");setTaskIndex(0);}}>Enemmän<span>{adaptiveDay.extraMinutes} min</span></button>
                </div>
                <p className="mt-3 text-xs">Lisäharjoittelu ei muutu myöhemmin korvattavaksi velaksi.</p>
                {next&&<button className={secondary+" mt-3"} disabled={upsert.isPending} onClick={()=>void makeLight()}>Kevennä tätä tehtävää</button>}
              </Disclosure>
            </>:<EmptyState
              title="Ei pakollista itsenäistä opiskelua tänään"
              body="Tämän päivän tärkeimmät oppimistarpeet ovat hallinnassa. Tyhjä päivä on sallittu osa suunnitelmaa."
              action={<button className={secondary} onClick={()=>onGo("plan")}>Avaa suunnitelma</button>}
            />}
          </PrimaryCard>

          {later.length>0&&<SectionCard className="today-v5-later" title="Myöhemmin tänään" action={<span className="text-xs text-muted-foreground">{later.length} seuraavaa</span>}>
            <DataList>
              {later.map(action=><DataRow key={action.id}>
                <button className="today-v5-action-row" onClick={()=>startChosen(action)}>
                  <span className="min-w-0"><b>{action.course.code}</b><span>{action.title}</span></span>
                  <span>{minutes(action.minutes)}</span>
                </button>
              </DataRow>)}
            </DataList>
          </SectionCard>}
        </div>

        <aside className="today-v5-context" aria-label="Tämän päivän tilanne">
          <SectionCard title="Tänään">
            <div className="today-v5-context-head">
              <strong>{minutes(todayMinutes)}</strong>
              <StatusBadge tone={dayStatus.tone}>{dayStatus.label}</StatusBadge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{actions.length?`${actions.length} toimintoa · päivän kapasiteetti noin ${minutes(dayCapacity)}`:"Suunnitelmassa ei ole pakollista työtä tälle päivälle."}</p>
          </SectionCard>

          <SectionCard title="Seuraava koe">
            {upcoming?<>
              <p className="font-semibold">{examCourse?.code??"Kurssi"} · {upcoming.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{fullDate(upcoming.date)} · {diffDays(upcoming.date,now)} päivää</p>
              <button className="today-v5-text-action" onClick={()=>onGo("exams")}>Avaa kokeet</button>
            </>:<p className="text-sm text-muted-foreground">Ei lähestyviä kokeita.</p>}
          </SectionCard>

          <SectionCard title="Tämä viikko">
            <p className="today-v5-week-value">{minutes(done)} <span>/ noin {minutes(goal)}</span></p>
            <Bar value={goal?done/goal*100:0}/>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Aika kertoo kuormasta. Osaamista arvioidaan harjoitusnäytön perusteella.</p>
          </SectionCard>
        </aside>
      </div>

      {comeback&&<SectionCard className="today-v5-support" title="Tervetuloa takaisin">
        <p className="text-sm text-muted-foreground">Edellisestä opiskelumerkinnästä on {comeback.awayDays} päivää. Kaikkea väliin jäänyttä ei tuoda kerralla tälle päivälle.</p>
        <p className="mt-2 font-medium">Aloitetaan {comeback.items.length} tärkeimmästä asiasta · noin {minutes(comeback.estimatedMinutes)}.</p>
        <DataList className="mt-3">{comeback.items.map(topic=><DataRow key={topic.id}><b>{courses.find(course=>course.id===topic.course_id)?.code}</b> · {topic.name}</DataRow>)}</DataList>
        <div className="mt-4 flex flex-wrap gap-2"><button className={button} onClick={()=>onGo("practice")}>Tee kevyt paluu</button><button className={secondary} onClick={()=>onGo("plan")}>Tarkista suunnitelma</button></div>
      </SectionCard>}

      {mode.active&&examCourse&&<SectionCard className="today-v5-support" title={mode.finalStretch?"Koemoodi · loppusuora":"Koemoodi · 14 päivää"}>
        <MetricGroup>
          <Metric label={examCourse.code} value={`${mode.days} pv`} detail="kokeeseen" />
          <Metric label="Valmistautumisvaihe" value={examPrep?.stages[examPrep.index]?.label??"—"} detail={examPrep?`Vaihe ${examPrep.index+1}/6`:"Ei vaihetta"} />
          <Metric label="Avoimet virheet" value={openMistakes} detail={mode.finalStretch?"Pidä kuorma kevyenä":"Painota koetason tehtäviä ja kertausta"} />
        </MetricGroup>
      </SectionCard>}

      {adaptiveDay.runtimeIntentions.triggeredRuleIds.length>0&&<InlineNotice className="today-v5-notice">
        <strong>Suunnitelmaa mukautettiin tälle päivälle.</strong>
        <p className="mt-1">{adaptiveDay.runtimeIntentions.notes.join(" ")||"Aktiivinen jos–niin-sääntö kevensi tämän päivän kuormaa."}</p>
      </InlineNotice>}

      <button type="button" className="today-v5-practice-shortcut" onClick={()=>onGo("practice")}>
        <span className="today-v5-practice-icon"><Brain size={19}/></span>
        <span className="min-w-0"><b>Harjoittele</b><small>Lyhyt tehtäväkierros ilman suunnitelman rakentamista.</small></span>
        <span aria-hidden="true">›</span>
      </button>

      {recovery.items.length>0&&<SectionCard className="today-v5-support" title="Kertaa seuraavaksi" action={<span className="text-sm text-muted-foreground">noin {minutes(recovery.estimatedMinutes)}</span>}>
        <DataList>
          {recovery.items.map(row=><DataRow key={row.topic.id}>
            <div className="today-v5-recovery-row">
              <span><b>{courses.find(course=>course.id===row.topic.course_id)?.code}</b> · {row.topic.name}<small>{row.reason}</small></span>
              <span>{row.state.masteryLabel}</span>
            </div>
          </DataRow>)}
        </DataList>
        <p className="mt-3 text-sm text-muted-foreground">{recovery.hiddenCount>0?`Näytetään tämän päivän kapasiteettiin sopivat tärkeimmät kertaukset. ${recovery.hiddenCount} muuta odottaa myöhempää vuoroa.`:"Nämä ovat ajankohtaisimmat kertaukset."}</p>
        <button className={secondary+" mt-3"} onClick={()=>onGo("practice")}>Avaa harjoittelu</button>
      </SectionCard>}

      {last&&<SectionCard className="today-v5-support" title="Viimeisin huomio">
        <p>{last.note||last.unclear}</p>
        <p className="mt-2 text-xs text-muted-foreground">{fullDate(last.date)} · {courses.find(course=>course.id===last.course_id)?.code}</p>
      </SectionCard>}
    </ActionDashboardLayout>

    {cannotTodayOpen&&<Dialog title="En ehdi tänään" onClose={()=>setCannotTodayOpen(false)}>
      <p className="text-sm text-muted-foreground">Valitse syy. Opintopäiväkirja siirtää tehtävän seuraavaan järkevään opiskelupäivään eikä tee siitä rästiä.</p>
      <div className="mt-4 grid gap-2">
        {todayFrictionReasons.map(([value,label])=><button key={value} type="button" aria-pressed={todayFrictionReason===value} onClick={()=>setTodayFrictionReason(value)} className={"min-h-11 rounded-xl border px-4 text-left text-sm "+(todayFrictionReason===value?"border-primary bg-accent font-semibold":"border-border bg-surface")}>{label}</button>)}
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <button className={secondary} onClick={()=>setCannotTodayOpen(false)}>Peruuta</button>
        <button className={button} disabled={move.isPending} onClick={()=>void confirmCannotToday()}>{move.isPending?"Siirretään…":"Siirrä seuraavaan sopivaan päivään"}</button>
      </div>
    </Dialog>}
  </>;
}
