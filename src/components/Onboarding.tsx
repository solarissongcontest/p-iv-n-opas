import { useMemo, useState } from "react";
import { BookOpen, CalendarDays, Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { Course, PlanItem, Topic } from "@/lib/domain";
import { generatePlan } from "@/lib/domain";
import {
  useGeneratePlan,
  useUpdateCourse,
  useUpdatePreferences,
  type UserPreferences,
} from "@/lib/data";
import { fullDate, minutes } from "@/lib/fi";

const primary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-medium text-primary-foreground disabled:opacity-50";
const secondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 font-medium hover:bg-muted";

const weekdays = [
  [1, "Ma"], [2, "Ti"], [3, "Ke"], [4, "To"], [5, "Pe"], [6, "La"], [7, "Su"],
] as const;

export function Onboarding({
  course,
  topics,
  plan,
  preferences,
  onComplete,
}: {
  course: Course;
  topics: Topic[];
  plan: PlanItem[];
  preferences: UserPreferences;
  onComplete: () => void;
}) {
  const [step,setStep]=useState(0);
  const [target,setTarget]=useState(course.target_value??"10");
  const [studyWeekdays,setStudyWeekdays]=useState<number[]>(
    preferences.study_weekdays?.length ? preferences.study_weekdays : [1,2,3,4,5],
  );
  const [finishing,setFinishing]=useState(false);
  const updatePreferences=useUpdatePreferences(),updateCourse=useUpdateCourse(),generate=useGeneratePlan();
  const timezone=useMemo(()=>Intl.DateTimeFormat().resolvedOptions().timeZone||"Europe/Helsinki",[]);
  const preview=course.exam_date?generatePlan({
    course:{...course,target_system:"school",target_value:target},
    topics,
    examDate:course.exam_date,
    studyWeekdays,
    weeklyMinutes:course.weekly_minutes,
  }).filter(x=>x.kind!=="exam").slice(0,5):[];

  async function finish(){
    setFinishing(true);
    try{
      await updateCourse.mutateAsync({id:course.id,target_system:"school",target_value:target});
      await updatePreferences.mutateAsync({
        display_name:"Arthur",
        study_weekdays:studyWeekdays,
        timezone,
        onboarding_completed:true,
      });
      if(course.exam_date){
        const drafts=generatePlan({
          course:{...course,target_system:"school",target_value:target},
          topics,
          examDate:course.exam_date,
          studyWeekdays,
          weeklyMinutes:course.weekly_minutes,
        });
        if(drafts.length) await generate.mutateAsync({courseId:course.id,drafts});
      }
      onComplete();
    }catch(error){
      toast.error(error instanceof Error?error.message:"Käyttöönottoa ei voitu viimeistellä.");
    }finally{setFinishing(false);}
  }

  return <main className="min-h-screen px-4 py-6 sm:grid sm:place-items-center">
    <section className="panel mx-auto w-full max-w-2xl overflow-hidden">
      <div className="border-b border-border px-5 py-4 sm:px-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground"><BookOpen size={20}/></span><div><p className="font-semibold">Opintopäiväkirja</p><p className="text-xs text-muted-foreground">Ensimmäinen käyttöönotto</p></div></div>
          <span className="text-sm text-muted-foreground">{step+1} / 4</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{width:`${((step+1)/4)*100}%`}}/></div>
      </div>

      <div className="min-h-[380px] p-5 sm:p-8">
        {step===0&&<div className="space-y-5"><span className="grid size-14 place-items-center rounded-2xl bg-accent text-primary"><Sparkles/></span><div><h1 className="text-3xl font-semibold">Tervetuloa, Arthur.</h1><p className="mt-3 text-muted-foreground">Asetetaan ensimmäinen kurssi ja suunnitelma. Sen jälkeen sovellus vie suoraan Tänään-näkymään. Ei seitsemän dian tuote-esittelyä, koska elämä on rajallinen resurssi.</p></div><div className="grid gap-3 sm:grid-cols-3">{[["Suunnittele","Koepäivästä taaksepäin."],["Opiskele","Yksi selkeä seuraava tehtävä."],["Mukauta","Osaaminen, virheet ja kertaukset muuttavat suunnitelmaa."]].map(([a,b])=><div key={a} className="rounded-2xl bg-muted/60 p-4"><p className="font-medium">{a}</p><p className="mt-1 text-sm text-muted-foreground">{b}</p></div>)}</div></div>}

        {step===1&&<div className="space-y-5"><div><p className="text-sm font-medium text-primary">Kurssi</p><h1 className="mt-1 text-3xl font-semibold">Ensimmäinen kurssi</h1></div><div className="rounded-3xl border border-border p-5"><p className="text-sm font-semibold text-primary">{course.code}</p><h2 className="mt-1 text-2xl font-semibold">{course.name}</h2><p className="mt-2 text-muted-foreground">{course.subject} · {topics.length} aihetta · {minutes(course.weekly_minutes)}/vko</p>{course.exam_date&&<p className="mt-2 text-sm text-muted-foreground">Koe {fullDate(course.exam_date)}</p>}</div><p className="text-sm text-muted-foreground">Kurssia, aiheita ja materiaaleja voi muokata myöhemmin Kurssit-näkymässä.</p></div>}

        {step===2&&<div className="space-y-6"><div><p className="text-sm font-medium text-primary">Koe ja tavoite</p><h1 className="mt-1 text-3xl font-semibold">Tavoite ja opiskelupäivät</h1><p className="mt-2 text-muted-foreground">{course.exam_date?`Koe ${fullDate(course.exam_date)}.`:"Koepäivä voidaan lisätä myöhemmin."} Tavoite ohjaa mastery-riskiä, ei arvosanaennustetta.</p></div><div className="grid grid-cols-4 gap-2 sm:grid-cols-7">{["10","9","8","7","6","5","4"].map(v=><button type="button" key={v} aria-pressed={target===v} onClick={()=>setTarget(v)} className={`min-h-12 rounded-xl border font-semibold ${target===v?"border-primary bg-accent text-primary":"border-border"}`}>{v}</button>)}</div><div><p className="mb-2 text-sm font-medium">Opiskelupäivät</p><div className="grid grid-cols-4 gap-2 sm:grid-cols-7">{weekdays.map(([day,label])=>{const active=studyWeekdays.includes(day);return <button type="button" key={day} aria-pressed={active} onClick={()=>setStudyWeekdays(cur=>active?(cur.length>1?cur.filter(x=>x!==day):cur):[...cur,day].sort())} className={`min-h-12 rounded-xl border font-semibold ${active?"border-primary bg-accent text-primary":"border-border"}`}>{label}</button>})}</div></div></div>}

        {step===3&&<div className="space-y-5"><span className="grid size-14 place-items-center rounded-2xl bg-accent text-primary"><Check/></span><div><p className="text-sm font-medium text-primary">Ensimmäinen suunnitelma</p><h1 className="mt-1 text-3xl font-semibold">Valmis aloittamaan.</h1><p className="mt-2 text-muted-foreground">Suunnitelma rytmitetään valituille päiville. Sitä mukautetaan myöhemmin osaamisen, koulun etenemisen, virheiden, kertausvelan ja muiden kurssien kuorman mukaan.</p></div><div className="space-y-2">{preview.length?preview.map((p,i)=><div key={i} className="flex items-center justify-between rounded-xl bg-muted/60 p-3 text-sm"><span>{fullDate(p.date)} · {p.title}</span><span className="text-muted-foreground">{minutes(p.target_minutes)}</span></div>):<p className="text-sm text-muted-foreground">Suunnitelma muodostuu, kun koepäivä on asetettu.</p>}</div></div>}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4 sm:px-8">
        <button type="button" className={secondary} disabled={step===0||finishing} onClick={()=>setStep(v=>Math.max(0,v-1))}><ChevronLeft size={17}/>Takaisin</button>
        {step<3?<button type="button" className={primary} onClick={()=>setStep(v=>v+1)}>Jatka<ChevronRight size={17}/></button>:<button type="button" disabled={finishing} className={primary} onClick={()=>void finish()}><CalendarDays size={17}/>{finishing?"Viimeistellään…":"Avaa Tänään"}</button>}
      </div>
    </section>
  </main>;
}
