import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";
import type { CapacityProfile, Mistake, PlanDraft, PlanItem, PracticeAttempt, PracticeTest } from "@/lib/domain";
import { capacityForDateV3 } from "@/lib/learning-engine";
import { applyImplementationIntentionsV5 } from "@/lib/learning-os-v5";
import { examMode, generatePlan } from "@/lib/domain";
import {
  isPlanSyncConflict,
  useCreateFrictionEvent,
  useFrictionEvents,
  useGeneratePlan,
  useImplementationIntentions,
  useMovePlanItem,
  usePlanStatus,
  usePreferences,
} from "@/lib/data";
import { addDays, addMonths, diffDays, fullDate, minutes, startOfWeek, today } from "@/lib/fi";
import { plannerModeLabel } from "@/lib/ui-fi";
import { V5PlannerPanel } from "@/components/LearningOSV5Panels";
import { EmptyState, Metric, MetricGroup, SectionCard, StatusBadge } from "@/components/surfaces";
import { PlannerCalendar } from "@/features/planner/PlannerCalendar";
import { PlannerLayout } from "@/layouts";
import { TaskForm } from "@/components/StudyDialogs";
import { button, secondary, type Base } from "@/features/shared/StudyViewPrimitives";
import { Dialog, input as dialogInput } from "@/features/shared/DialogPrimitives";

const skipReasonOptions = [
  ["no_time", "Ei aikaa"],
  ["forgot", "Unohdin"],
  ["too_tired", "Liian väsynyt"],
  ["too_hard", "Liian vaikea"],
  ["unclear_start", "En tiennyt mistä aloittaa"],
  ["plans_changed", "Suunnitelmat muuttuivat"],
  ["other", "Muu syy"],
] as const;
type SkipReason = (typeof skipReasonOptions)[number][0];

type PlannerMode = "päivä"|"viikko"|"kuukausi";

export function PlanView({courses,topics,plan,tests,mistakes,attempts,capacity,onStart,initialMode="viikko",initialAnchor,onPeriodChange}:Base&{
  plan:PlanItem[];
  tests:PracticeTest[];
  mistakes:Mistake[];
  attempts:PracticeAttempt[];
  capacity:CapacityProfile;
  onStart:(id:string)=>void;
  initialMode?:PlannerMode | undefined;
  initialAnchor?:string | undefined;
  onPeriodChange?:(mode:PlannerMode,anchor:string)=>void;
}) {
  const preferences=usePreferences();
  const intentions=useImplementationIntentions();
  const frictionHistory=useFrictionEvents();
  const plannerMode=preferences.data?.planner_mode??"assisted";
  const [mode,setMode]=useState<PlannerMode>(initialMode);
  const [anchor,setAnchor]=useState(initialAnchor??today());
  const [creating,setCreating]=useState(false);
  const [adding,setAdding]=useState(false);
  const [choice,setChoice]=useState(courses[0]?.id??"");
  const [proposal,setProposal]=useState<PlanDraft[]|null>(null);
  const [editingProposal,setEditingProposal]=useState(false);
  const [shiftTarget,setShiftTarget]=useState<PlanItem|null>(null);
  const [shiftDate,setShiftDate]=useState("");
  const [skipTarget,setSkipTarget]=useState<PlanItem|null>(null);
  const [skipReason,setSkipReason]=useState<SkipReason>("no_time");
  const move=useMovePlanItem(),status=usePlanStatus(),generate=useGeneratePlan(),friction=useCreateFrictionEvent();

  const first=mode==="viikko"?startOfWeek(anchor):mode==="kuukausi"?anchor.slice(0,7)+"-01":anchor;
  const last=mode==="viikko"?addDays(first,6):mode==="kuukausi"?addDays(addDays(first,32).slice(0,7)+"-01",-1):anchor;
  const days=Array.from({length:Math.max(1,diffDays(last,first)+1)},(_,index)=>addDays(first,index));
  const selectedCourse=courses.find(course=>course.id===choice);
  const selectedMode=examMode(selectedCourse?.exam_date??null);

  const periodItems=plan.filter(item=>item.date>=first&&item.date<=last&&item.kind!=="exam");
  const plannedItems=periodItems.filter(item=>item.status!=="skipped");
  const plannedMinutes=plannedItems.reduce((sum,item)=>sum+Math.max(0,item.target_minutes),0);
  const completedItems=periodItems.filter(item=>item.status==="completed");
  const activeDays=new Set(plannedItems.map(item=>item.date)).size;
  const periodCapacity=days.reduce((sum,date)=>sum+Math.max(0,capacityForDateV3(capacity,date)),0);
  const capacityStatus=plannedMinutes<=periodCapacity
    ? {label:"Kapasiteetti kunnossa",tone:"positive" as const}
    : {label:"Kuormitus tarkistettava",tone:"warning" as const};
  const periodTitle=mode==="päivä"?"Tämä päivä":mode==="viikko"?"Tämä viikko":"Tämä kuukausi";

  useEffect(()=>{setMode(initialMode);},[initialMode]);
  useEffect(()=>{if(initialAnchor)setAnchor(initialAnchor);},[initialAnchor]);
  useEffect(()=>{
    if(choice&&courses.some(course=>course.id===choice))return;
    setChoice(courses[0]?.id??"");
  },[choice,courses]);

  const changePeriod=(nextMode:PlannerMode,nextAnchor:string)=>{
    setMode(nextMode);
    setAnchor(nextAnchor);
    onPeriodChange?.(nextMode,nextAnchor);
  };

  const movePeriod=(direction:-1|1)=>{
    const next=mode==="kuukausi"
      ? addMonths(anchor,direction)
      : addDays(anchor,direction*(mode==="päivä"?1:7));
    changePeriod(mode,next);
  };

  function requestShift(item:PlanItem){setShiftTarget(item);setShiftDate(item.date);}

  async function confirmShift(){
    if(!shiftTarget||!/^\d{4}-\d{2}-\d{2}$/.test(shiftDate))return;
    try{
      await move.mutateAsync({id:shiftTarget.id,date:shiftDate,from:shiftTarget.date,expected_updated_at:shiftTarget.updated_at,expected_status:shiftTarget.status});
      setShiftTarget(null);
      toast.success("Tehtävä siirretty.");
    }catch(error){
      toast.error(isPlanSyncConflict(error)?"Tehtävää muutettiin toisella laitteella. Uusin versio ladattiin.":"Siirto epäonnistui.");
    }
  }

  function requestSkip(item:PlanItem){setSkipTarget(item);setSkipReason("no_time");}

  async function confirmSkip(){
    if(!skipTarget)return;
    try{
      await status.mutateAsync({id:skipTarget.id,status:"skipped",expected_updated_at:skipTarget.updated_at,expected_status:skipTarget.status});
      void friction.mutateAsync({date:today(),plan_item_id:skipTarget.id,course_id:skipTarget.course_id,reason:skipReason,self_started:false,reminder_used:false}).catch(()=>undefined);
      setSkipTarget(null);
      toast.success("Tehtävä ohitettu. Suunnitelma mukautuu ilman lisävelkaa.");
    }catch(error){
      toast.error(isPlanSyncConflict(error)?"Tehtävää muutettiin toisella laitteella. Uusin versio ladattiin.":"Muutos epäonnistui.");
    }
  }

  async function makeProposal(){
    const course=courses.find(candidate=>candidate.id===choice);
    if(!course?.exam_date){toast.error("Kurssilla ei ole koepäivää.");return;}
    const baseDrafts=generatePlan({
      course,
      topics:topics.filter(topic=>topic.course_id===course.id),
      examDate:course.exam_date,
      studyWeekdays:capacity.studyWeekdays,
      weeklyMinutes:course.weekly_minutes,
      mistakes:mistakes.filter(mistake=>mistake.course_id===course.id),
      tests:tests.filter(test=>test.course_id===course.id),
      capacity,
    });
    const adapted=applyImplementationIntentionsV5(baseDrafts,intentions.data??[],frictionHistory.data??[]);
    const drafts=adapted.drafts;
    if(!drafts.length){toast.error("Koe on jo mennyt.");return;}
    if(adapted.applied.length){
      const count=adapted.applied.reduce((sum,row)=>sum+row.count,0);
      toast.info(`Jos–niin-säännöt mukauttivat ${count} ehdotettua opiskelukertaa.`);
    }
    if(plannerMode==="autopilot"){
      try{
        await generate.mutateAsync({courseId:course.id,drafts,capacity});
        setCreating(false);
        toast.success("Suunnitelma päivitettiin kapasiteetin ja koetilanteen perusteella.");
      }catch{toast.error("Suunnitelmaa ei voitu päivittää.");}
      return;
    }
    setProposal(drafts);
    setEditingProposal(false);
  }

  async function acceptProposal(){
    const course=courses.find(candidate=>candidate.id===choice);
    if(!course||!proposal?.length)return;
    try{
      await generate.mutateAsync({courseId:course.id,drafts:proposal,capacity});
      setProposal(null);
      setEditingProposal(false);
      setCreating(false);
      toast.success("Suunnitelma hyväksytty.");
    }catch{toast.error("Suunnitelmaa ei voitu tallentaa.");}
  }

  return <>
    <PlannerLayout className="planner-view planner-v5">
      <div className="planner-v5-toolbar">
        <div className="planner-v5-period-nav">
          <button className={secondary+" !px-3"} aria-label="Edellinen" onClick={()=>movePeriod(-1)}><ChevronLeft size={18}/></button>
          <span>{fullDate(first)}{first!==last&&` – ${fullDate(last)}`}</span>
          <button className={secondary+" !px-3"} aria-label="Seuraava" onClick={()=>movePeriod(1)}><ChevronRight size={18}/></button>
        </div>
        <div className="planner-v5-mode" role="group" aria-label="Suunnitelman näkymä">
          {(["päivä","viikko","kuukausi"] as const).map(item=><button key={item} aria-pressed={mode===item} onClick={()=>changePeriod(item,anchor)}>{item}</button>)}
        </div>
      </div>

      <div className="planner-v5-actions">
        <button className={button} onClick={()=>setAdding(true)}><Plus size={17}/>Lisää tehtävä</button>
        <button className={secondary} onClick={()=>setCreating(value=>!value)}>Luo suunnitelma</button>
      </div>

      <SectionCard className="planner-v5-summary" title={periodTitle} action={<StatusBadge tone={capacityStatus.tone}>{capacityStatus.label}</StatusBadge>}>
        <MetricGroup>
          <Metric label="Suunniteltu" value={minutes(plannedMinutes)} detail={periodCapacity>0?`kapasiteetti noin ${minutes(periodCapacity)}`:"ei opiskelukapasiteettia"}/>
          <Metric label="Opiskelupäiviä" value={activeDays} detail={`${plannedItems.length} tehtävää`}/>
          <Metric label="Valmiina" value={`${completedItems.length}/${periodItems.length}`} detail="tämän jakson tehtävistä"/>
        </MetricGroup>
      </SectionCard>

      {adding&&<TaskForm courses={courses} topics={topics} date={anchor} onClose={()=>setAdding(false)}/>}

      {creating&&<SectionCard className="planner-v5-create" title="Adaptiivinen suunnitelma koetta varten">
        <p className="planner-v5-readable">Suunnitelma huomioi aiheen tärkeyden, esitiedot, osaamisnäytön, kertaukset, virheet, koepäivän ja muiden kurssien kuorman. Tila: <b>{plannerModeLabel(plannerMode)}</b>.</p>
        <label className="planner-v5-course-field">Kurssi
          <select value={choice} onChange={event=>setChoice(event.target.value)}>{courses.map(course=><option key={course.id} value={course.id}>{course.code} · {course.name}</option>)}</select>
        </label>
        {selectedMode.active&&<p className="planner-v5-exam-notice">Koemoodi on aktiivinen: {selectedMode.days} päivää kokeeseen. Uusi sisältö väistyy tarvittaessa koetason harjoittelun, virheiden ja kertauksen tieltä.</p>}
        <button disabled={generate.isPending} className={button} onClick={()=>void makeProposal()}>{plannerMode==="autopilot"?"Mukauta suunnitelma nyt":"Luo ehdotus"}</button>

        {proposal&&<div className="planner-v5-proposal">
          <div className="planner-v5-proposal-header">
            <div><p className="font-semibold">Ehdotan muutosta suunnitelmaan</p><p>Mikään ei muutu ennen hyväksyntää.</p></div>
            <span>{proposal.filter(item=>item.kind!=="exam").length} opiskelukertaa</span>
          </div>
          <div className="planner-v5-proposal-list">{proposal.filter(item=>item.kind!=="exam").slice(0,18).map((item,index)=><div key={`${item.date}-${item.topic_id??index}`} className="planner-v5-proposal-row">
            <span>{item.title}</span>
            {editingProposal?<>
              <input aria-label={"Päivä: "+item.title} type="date" value={item.date} onChange={event=>setProposal(current=>current?.map(candidate=>candidate===item?{...candidate,date:event.target.value}:candidate)??null)}/>
              <input aria-label={"Minuutit: "+item.title} type="number" min={item.min_minutes} max="240" step="5" value={item.target_minutes} onChange={event=>setProposal(current=>current?.map(candidate=>candidate===item?{...candidate,target_minutes:Math.max(candidate.min_minutes,Number(event.target.value)||candidate.min_minutes)}:candidate)??null)}/>
            </>:<><span>{fullDate(item.date)}</span><span>{minutes(item.target_minutes)}</span></>}
          </div>)}</div>
          <div className="planner-v5-proposal-actions">
            <button disabled={generate.isPending} className={button} onClick={()=>void acceptProposal()}>Hyväksy</button>
            <button className={secondary} onClick={()=>setEditingProposal(value=>!value)}>{editingProposal?"Valmis muokkauksesta":"Muokkaa"}</button>
            <button className={secondary} onClick={()=>{setProposal(null);setEditingProposal(false);}}>Pidä nykyinen</button>
          </div>
        </div>}
      </SectionCard>}

      {plan.length===0&&<SectionCard title="Suunnitelma on vielä tyhjä"><EmptyState title="Ei tehtäviä vielä" body="Luo ensimmäinen suunnitelma tai lisää yksittäinen tehtävä." action={<button className={button} onClick={()=>setAdding(true)}>Lisää tehtävä</button>}/></SectionCard>}

      <div className="planner-v5-calendar">
        <PlannerCalendar
          mode={mode}
          days={days}
          plan={plan}
          courses={courses}
          topics={topics}
          onStart={onStart}
          onMove={(item,date)=>void move.mutateAsync({id:item.id,date,from:item.date,expected_updated_at:item.updated_at,expected_status:item.status}).then(()=>toast.success("Tehtävä siirretty.")).catch(error=>toast.error(isPlanSyncConflict(error)?"Tehtävää muutettiin toisella laitteella. Uusin versio ladattiin.":"Siirto epäonnistui."))}
          onShift={requestShift}
          onSkip={requestSkip}
        />
      </div>

      <details className="planner-v5-inspector study-card study-card-section">
        <summary><span>Suunnitelman tiedot</span><span>Perustelut ja kuormitus</span></summary>
        <div className="planner-v5-inspector-body">
          <V5PlannerPanel courses={courses} topics={topics} attempts={attempts} capacity={capacity} plan={plan}/>
        </div>
      </details>
    </PlannerLayout>

    {shiftTarget&&<Dialog title="Siirrä tehtävä" onClose={()=>setShiftTarget(null)}>
      <label className="block text-sm font-medium">Uusi päivä
        <input type="date" value={shiftDate} onChange={event=>setShiftDate(event.target.value)} className={dialogInput}/>
      </label>
      <div className="mt-5 flex justify-end gap-2">
        <button className={secondary} onClick={()=>setShiftTarget(null)}>Peruuta</button>
        <button className={button} disabled={!/^\d{4}-\d{2}-\d{2}$/.test(shiftDate)||move.isPending} onClick={()=>void confirmShift()}>{move.isPending?"Siirretään…":"Siirrä"}</button>
      </div>
    </Dialog>}

    {skipTarget&&<Dialog title="Miksi jätät tämän väliin?" onClose={()=>setSkipTarget(null)}>
      <div className="grid gap-2">
        {skipReasonOptions.map(([value,label])=><button key={value} type="button" aria-pressed={skipReason===value} onClick={()=>setSkipReason(value)} className={"min-h-11 rounded-xl border px-4 text-left text-sm "+(skipReason===value?"border-primary bg-accent font-semibold":"border-border bg-surface")}>{label}</button>)}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Ohitus ei muutu lisävelaksi. Syy auttaa sovellusta tekemään seuraavasta suunnitelmasta realistisemman.</p>
      <div className="mt-5 flex justify-end gap-2">
        <button className={secondary} onClick={()=>setSkipTarget(null)}>Peruuta</button>
        <button className={button} disabled={status.isPending} onClick={()=>void confirmSkip()}>{status.isPending?"Tallennetaan…":"Ohita tältä päivältä"}</button>
      </div>
    </Dialog>}
  </>;
}
