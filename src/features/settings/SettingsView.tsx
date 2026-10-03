import { useEffect, useMemo, useState } from "react";
import { Archive, Bell, ChevronLeft, ChevronRight, Pencil, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  Area,
  Bar as RechartsBar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CapacityProfile, Course, Exam, Mistake, PlanDraft, PlanItem, PracticeAttempt, PracticeTest, Session, Topic } from "@/lib/domain";
import {
  buildRecoveryQueue,
  calibration,
  capacityForDateV3,
  deriveTopicLearningState,
  evidenceSummary,
  examBuffer,
  examStage,
  learningForecast,
  todayPriority,
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
  yoOverviewV4,
} from "@/lib/learning-os-v4";
import { adaptiveDayPlanV5, applyImplementationIntentionsV5 } from "@/lib/learning-os-v5";
import {
  corridor,
  corridorAdvice,
  courseBuffers,
  effectivePlanStatus,
  examMode,
  examPhaseStatus,
  generatePlan,
  findNextStudyDate,
  masteryEvidence,
  masteryMismatch,
  masterySummary,
  MASTERY_LABELS,
  rankTodayTasks,
  readiness,
  recoveryQueue,
  returnFromBreak,
  reviewDebt,
  risks,
  todayTaskReason,
  schoolCoverage,
  targetMastery,
  weightedCoverage,
  weightedMastery,
  weekMinutes,
  studyDaysInWeek,
  studyEfficiency,
  weeklyStudySeries,
} from "@/lib/domain";
import {
  useArchiveCourse,
  useCourses,
  useCreateFrictionEvent,
  useFrictionEvents,
  useAdvanceMistake,
  useGeneratePlan,
  useImplementationIntentions,
  useMovePlanItem,
  usePlanStatus,
  usePreferences,
  useProgressEvents,
  useSettings,
  useResolveMistake,
  useTopicDependencies,
  useUpdatePreferences,
  useApplyStudyWeekdays,
  useUpdateSettings,
  useUpdateTopic,
  useUpsertPlanItem,
  useUpsertWeeklyCheckin,
  useWeeklyCheckins,
} from "@/lib/data";
import { addDays, dateWithWeekday, diffDays, fullDate, minutes, shortDate, startOfWeek, today, weekNumber } from "@/lib/fi";
import { disableBackgroundPush, enableBackgroundPush, pushIsEnabledOnDevice, pushSupported, sendTestPush } from "@/lib/push";
import { applyTheme, storedThemeIsDark } from "@/lib/theme";
import { clearDeviceSession, type DeviceUser } from "@/lib/deviceSession";
import { clearOfflineSnapshots } from "@/lib/offlineSnapshot";
import {
  attemptOutcomeLabel,
  attemptTypeLabel,
  confidenceLabel,
  dimensionLabel,
  eventKindLabel,
  errorCategoryLabel,
  experimentStatusLabel,
  masteryLabelFi,
  planPhaseLabel,
  plannerModeLabel,
  simulationProfileLabel,
  yoPhaseLabel,
} from "@/lib/ui-fi";
import { KnowledgeGraphEditor, MaterialImporter } from "@/components/CourseLearningTools";
import { answerPlainText } from "@/components/AbittiAnswerEditor";
import { V5LearningHealthPanel, V5PlannerPanel } from "@/components/LearningOSV5Panels";
import { ExamSimulationV5 } from "@/components/ExamSimulationV5";
import { ContrastiveErrorLab } from "@/components/ContrastiveErrorLab";
import { PlannerCalendar } from "@/features/planner/PlannerCalendar";
import { GroupedSurface } from "@/components/surfaces";
import {
  ActionDashboardLayout,
  PlannerLayout,
  LibraryDetailLayout,
  InsightLayout,
  SettingsLayout,
} from "@/layouts";
import {
  CourseEditForm,
  ExamForm,
  MistakeForm,
  PracticeTestForm,
  TaskForm,
  TopicForm,
} from "@/components/StudyDialogs";

import { Bar, Panel, button, secondary, type Base } from "@/features/shared/StudyViewPrimitives";
import { Dialog } from "@/features/shared/DialogPrimitives";

export type SettingsSection = "study"|"notifications"|"app";

export function SettingsView({user:_user,section="study",onSectionChange}:{user:DeviceUser;section?:SettingsSection | undefined;onSectionChange?:(section:SettingsSection)=>void}) {
  const [dark,setDark]=useState(typeof window!=="undefined"?storedThemeIsDark():false);
  const [pushEnabled,setPushEnabled]=useState(false);
  const [pushBusy,setPushBusy]=useState(false);
  const [forgetDeviceOpen,setForgetDeviceOpen]=useState(false);
  const preferences=usePreferences(),prefs=preferences.data,updatePreferences=useUpdatePreferences(),applyStudyWeekdays=useApplyStudyWeekdays();
  const [studyWeekdaysDraft,setStudyWeekdaysDraft]=useState<number[]>([]);
  const [weekdayMinCapacity,setWeekdayMinCapacity]=useState(30),[weekdayCapacity,setWeekdayCapacity]=useState(60),[weekendMinCapacity,setWeekendMinCapacity]=useState(60),[weekendCapacity,setWeekendCapacity]=useState(120),[busyDate,setBusyDate]=useState("");
  const settingsQ=useSettings(),settings=settingsQ.data,updateSettings=useUpdateSettings();
  const allCourses=useCourses(),archiveCourse=useArchiveCourse();
  const archived=(allCourses.data??[]).filter(c=>c.archived);
  const weekdayOptions=[[1,"Ma"],[2,"Ti"],[3,"Ke"],[4,"To"],[5,"Pe"],[6,"La"],[7,"Su"]] as const;
  const notificationOptions=[
    ["study_sessions","Opiskelukerrat","Päivän suunnitellut opiskelut ja erääntyvät kertaukset"],
    ["exams","Kokeet","Lähestyvät kokeet"],
    ["plan_changes","Suunnitelmamuutokset","Myöhässä oleva työ ja tarve mukauttaa suunnitelmaa"],
    ["weekly_summary","Viikkoyhteenveto","Rauhallinen yhteenveto viikon opiskelusta"],
  ] as const;

  useEffect(()=>{
    let active=true;
    void pushIsEnabledOnDevice().then(enabled=>{if(active)setPushEnabled(enabled);}).catch(()=>{if(active)setPushEnabled(false);});
    return()=>{active=false;};
  },[]);
  useEffect(()=>{
    if(!prefs)return;
    setStudyWeekdaysDraft((prefs.study_weekdays?.length?prefs.study_weekdays:[1,2,3,4,5]).slice().sort((a,b)=>a-b));
    setWeekdayMinCapacity(prefs.weekday_capacity_min_minutes??30);
    setWeekdayCapacity(prefs.weekday_capacity_minutes??60);
    setWeekendMinCapacity(prefs.weekend_capacity_min_minutes??60);
    setWeekendCapacity(prefs.weekend_capacity_minutes??120);
  },[prefs?.study_weekdays?.join(","),prefs?.weekday_capacity_min_minutes,prefs?.weekday_capacity_minutes,prefs?.weekend_capacity_min_minutes,prefs?.weekend_capacity_minutes]);

  async function togglePush(){
    setPushBusy(true);
    try{
      if(pushEnabled){
        await disableBackgroundPush();
        await updatePreferences.mutateAsync({notifications_enabled:false});
        setPushEnabled(false);
        toast.success("Taustamuistutukset poistettu käytöstä.");
      }else{
        await enableBackgroundPush();
        await updatePreferences.mutateAsync({notifications_enabled:true});
        setPushEnabled(true);
        toast.success("Taustamuistutukset käytössä.");
      }
    }catch{
      toast.error("Ilmoitusasetusta ei voitu muuttaa. Tarkista yhteys ja yritä uudelleen.");
    }finally{
      setPushBusy(false);
    }
  }

  function toggleWeekday(day:number){
    setStudyWeekdaysDraft(current=>{
      const base=current.length?current:[1,2,3,4,5];
      const selected=base.includes(day);
      if(selected&&base.length===1){toast.error("Valitse vähintään yksi opiskelupäivä.");return base;}
      return (selected?base.filter(x=>x!==day):[...base,day]).sort((a,b)=>a-b);
    });
  }

  async function saveStudyWeekdays(){
    if(!prefs||!studyWeekdaysDraft.length)return;
    try{
      const result=await applyStudyWeekdays.mutateAsync({
        studyWeekdays:studyWeekdaysDraft,
        capacity:{
          studyWeekdays:studyWeekdaysDraft,
          weekdayMinMinutes:prefs.weekday_capacity_min_minutes??30,
          weekdayMinutes:prefs.weekday_capacity_minutes??60,
          weekendMinMinutes:prefs.weekend_capacity_min_minutes??60,
          weekendMinutes:prefs.weekend_capacity_minutes??120,
          busyDates:prefs.busy_dates??[],
        },
      });
      if(result.unmoved>0){
        toast.warning(`Opiskelupäivät tallennettu. ${result.moved} tulevaa tehtävää siirrettiin, mutta ${result.unmoved} tehtävää ei mahtunut ennen koetta valituille päiville.`);
      }else if(result.moved>0){
        toast.success(`Opiskelupäivät tallennettu. ${result.moved} tulevaa tehtävää siirrettiin valituille päiville.`);
      }else{
        toast.success("Opiskelupäivät tallennettu.");
      }
    }catch(error){
      toast.error(error instanceof Error?error.message:"Opiskelupäiviä ei voitu tallentaa.");
    }
  }

  return <SettingsLayout className={"settings-view settings-section-"+section+" space-y-6"}>
    <div role="tablist" aria-label="Asetusten osiot" className="settings-section-tabs">
      {([
        ["study","Opiskelu"],
        ["notifications","Muistutukset"],
        ["app","Sovellus"],
      ] as Array<[SettingsSection,string]>).map(([id,label])=><button key={id} role="tab" aria-selected={section===id} className={section===id?"settings-section-tab settings-section-tab-active":"settings-section-tab"} onClick={()=>onSectionChange?.(id)}>{label}</button>)}
    </div>
    <Panel className="settings-app-only" title="Profiili"><p className="text-2xl font-semibold">{prefs?.display_name||"Arthur"}</p><p className="mt-2 text-sm text-muted-foreground">Tämä laite on yhdistetty Opintopäiväkirja-tiliisi.</p></Panel>

    <Panel className="settings-study-only" title="Opiskelurytmi ja kapasiteetti">
      <p className="mb-3 text-sm text-muted-foreground">Suunnittelutoiminto käyttää näitä rajoina. Väliin jäänyttä työmäärää ei työnnetä seuraavan päivän kapasiteetin yli.</p>
      <div className="flex flex-wrap gap-2">{weekdayOptions.map(([day,label])=>{const active=(studyWeekdaysDraft.length?studyWeekdaysDraft:(prefs?.study_weekdays??[1,2,3,4,5])).includes(day);return <button key={day} type="button" aria-pressed={active} onClick={()=>toggleWeekday(day)} className={`grid size-11 place-items-center rounded-xl border text-sm font-semibold ${active?"border-primary bg-accent text-primary":"border-border bg-surface"}`}>{label}</button>;})}</div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button className={button} disabled={!prefs||applyStudyWeekdays.isPending||studyWeekdaysDraft.length===0} onClick={()=>void saveStudyWeekdays()}>{applyStudyWeekdays.isPending?"Päivitetään…":"Tallenna opiskelupäivät"}</button>
        <p className="text-xs text-muted-foreground">Tallennus siirtää myös tulevat suunnitellut tehtävät pois päiviltä, joita et ole valinnut.</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><label className="text-sm font-medium">Arjen vähimmäisaika<input type="number" min="0" max="360" step="10" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2.5" value={weekdayMinCapacity} onChange={e=>setWeekdayMinCapacity(Number(e.target.value))}/></label><label className="text-sm font-medium">Arjen enimmäisaika<input type="number" min="15" max="360" step="10" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2.5" value={weekdayCapacity} onChange={e=>setWeekdayCapacity(Number(e.target.value))}/></label><label className="text-sm font-medium">Viikonlopun vähimmäisaika<input type="number" min="0" max="480" step="10" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2.5" value={weekendMinCapacity} onChange={e=>setWeekendMinCapacity(Number(e.target.value))}/></label><label className="text-sm font-medium">Viikonlopun enimmäisaika<input type="number" min="15" max="480" step="10" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2.5" value={weekendCapacity} onChange={e=>setWeekendCapacity(Number(e.target.value))}/></label></div>
      <p className="mt-2 text-xs text-muted-foreground">Esimerkiksi arki 30–60 min tarkoittaa: suunnittelutoiminto voi tehdä kevyen 30 min päivän, mutta ei täytä päivää yli 60 minuutin.</p>
      <button className={secondary+" mt-3"} disabled={!prefs||updatePreferences.isPending} onClick={()=>{if(weekdayMinCapacity>weekdayCapacity||weekendMinCapacity>weekendCapacity){toast.error("Minimikapasiteetti ei voi olla maksimia suurempi.");return;}void updatePreferences.mutateAsync({weekday_capacity_min_minutes:Math.max(0,weekdayMinCapacity),weekday_capacity_minutes:Math.max(15,weekdayCapacity),weekend_capacity_min_minutes:Math.max(0,weekendMinCapacity),weekend_capacity_minutes:Math.max(15,weekendCapacity)}).then(()=>toast.success("Kapasiteettivälit tallennettu.")).catch(()=>toast.error("Kapasiteettia ei voitu tallentaa."));}}>Tallenna kapasiteetti</button>
      <div className="mt-5 border-t border-border pt-4"><p className="text-sm font-medium">Kiireiset päivät</p><p className="mt-1 text-xs text-muted-foreground">Kiireisenä päivänä suunnittelutoiminto varaa vain kevyen ylläpitokuorman.</p><div className="mt-3 flex flex-wrap gap-2"><input type="date" className="min-h-11 rounded-xl border bg-surface px-3" value={busyDate} onChange={e=>setBusyDate(e.target.value)}/><button className={secondary} disabled={!prefs||!busyDate} onClick={()=>{if(!prefs||!busyDate)return;const next=[...new Set([...(prefs.busy_dates??[]),busyDate])].sort();void updatePreferences.mutateAsync({busy_dates:next}).then(()=>{setBusyDate("");toast.success("Kiireinen päivä lisätty.");}).catch(()=>toast.error("Päivää ei voitu tallentaa."));}}>Merkitse kiireiseksi</button></div><div className="mt-3 flex flex-wrap gap-2">{(prefs?.busy_dates??[]).filter(d=>d>=today()).slice(0,12).map(date=><button key={date} className="min-h-11 rounded-full bg-muted px-3 text-xs" title="Poista kiireinen päivä" onClick={()=>prefs&&void updatePreferences.mutateAsync({busy_dates:prefs.busy_dates.filter(d=>d!==date)})}>{fullDate(date)} ×</button>)}</div></div>
    </Panel>

    <Panel className="settings-study-only" title="Suunnittelutapa">
      <p className="text-sm text-muted-foreground">Valitse, kuinka paljon Opintopäiväkirja saa muuttaa tulevaa suunnitelmaa puolestasi.</p>
      <div className="mt-3 grid gap-2">
        {([
          ["assisted","Sovellus ehdottaa, minä hyväksyn","Suositus. Näet muutokset ennen kuin ne tallennetaan."],
          ["autopilot","Sovellus saa mukauttaa automaattisesti","Tulevaa suunnitelmaa voidaan keventää ja järjestää kapasiteetin mukaan."],
          ["manual","Haluan suunnitella itse","Sovellus antaa edelleen oppimisehdotuksia, mutta ei muuta kalenteria puolestasi."],
        ] as const).map(([mode,label,description])=><button key={mode} className={"min-h-14 rounded-xl border px-4 py-3 text-left "+((prefs?.planner_mode??"assisted")===mode?"border-primary bg-accent":"border-border bg-surface")} onClick={()=>void updatePreferences.mutateAsync({planner_mode:mode}).then(()=>toast.success("Suunnittelutapa tallennettu.")).catch(()=>toast.error("Suunnittelutilaa ei voitu tallentaa."))}><b className="block text-sm">{label}</b><small className="mt-1 block text-muted-foreground">{description}</small></button>)}
      </div>
      <details className="mt-5 border-t border-border pt-4">
        <summary className="min-h-11 cursor-pointer list-none py-2 text-sm font-semibold">Lisäasetukset · oppimismoottori</summary>
        <p className="mb-3 text-xs text-muted-foreground">Näitä ei tarvitse normaalisti muuttaa. Oletusarvot on valittu niin, että järjestelmä toimii ilman tämän osion tuntemista.</p>
        <label className="flex min-h-14 items-center justify-between gap-4 border-t border-border py-3"><span><b>Henkilökohtaiset oppimiskokeilut</b><small className="block text-muted-foreground">Vertaa pieniä turvallisia variaatioita vasta myöhemmän muistissa säilymisen perusteella.</small></span><input type="checkbox" className="size-5 accent-primary" checked={prefs?.personal_experiments_enabled??true} onChange={e=>void updatePreferences.mutateAsync({personal_experiments_enabled:e.target.checked}).catch(()=>toast.error("Kokeiluasetusta ei voitu tallentaa."))}/></label>
        <div className="divide-y divide-border">
          {([
            ["retention_budget_enabled","Mukautuva kertausbudjetti","Suojaa tärkein muistaminen käytettävissä olevan ajan sisällä."],
            ["pretest_enabled","Ennakkotesti","Kartoita uusi aihe ennakkotestillä, joka ei muuta osaamistasoa."],
            ["feedback_policy_enabled","Mukautuva palaute","Ajoita palaute eri tavalla uuden oppimisen, muistista palauttamisen ja koeharjoituksen mukaan."],
            ["friction_learning_enabled","Opiskelun esteiden tunnistus","Tunnista, miksi opiskelukertoja jää väliin, ja ehdota kevyitä jos–niin-sääntöjä."],
            ["reminder_taper_enabled","Muistutusten vähentäminen","Vähennä tavallisia muistutuksia, kun opiskelu käynnistyy jo itsenäisesti."],
            ["abitti_simulation_enabled","YO / Abitti 2 -vastaavuus","Käytä tehtävävalintaa, lähdeaineistoa, piirrosvastauksia ja viivästettyä palautetta koeharjoituksissa."],
          ] as const).map(([key,label,description])=><label key={key} className="flex min-h-14 items-center justify-between gap-4 py-3"><span><b>{label}</b><small className="block text-muted-foreground">{description}</small></span><input type="checkbox" className="size-5 accent-primary" checked={prefs?.[key]??true} onChange={e=>void updatePreferences.mutateAsync({[key]:e.target.checked}).catch(()=>toast.error("Mukautuva opiskelun asetusta ei voitu tallentaa."))}/></label>)}
        </div>
      </details>
    </Panel>

    <Panel className="settings-notifications-only" title="Hiljaiset tunnit">
      <p className="text-sm text-muted-foreground">Tavallisia opiskelumuistutuksia ei lähetetä tämän aikavälin aikana.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">Alkaa<input type="time" className="mt-1 min-h-11 w-full rounded-xl border bg-surface px-3" value={prefs?.quiet_hours_start?.slice(0,5)??"21:30"} onChange={e=>void updatePreferences.mutateAsync({quiet_hours_start:e.target.value}).catch(()=>toast.error("Hiljaisia tunteja ei voitu tallentaa."))}/></label>
        <label className="text-sm font-medium">Päättyy<input type="time" className="mt-1 min-h-11 w-full rounded-xl border bg-surface px-3" value={prefs?.quiet_hours_end?.slice(0,5)??"07:00"} onChange={e=>void updatePreferences.mutateAsync({quiet_hours_end:e.target.value}).catch(()=>toast.error("Hiljaisia tunteja ei voitu tallentaa."))}/></label>
      </div>
    </Panel>

    <Panel className="settings-notifications-only" title="Taustamuistutukset" action={<button disabled={pushBusy||!pushSupported()} className={secondary+" !min-h-11"} onClick={()=>void togglePush()}><Bell size={15}/>{pushBusy?"Päivitetään…":pushEnabled?"Poista käytöstä":"Ota käyttöön"}</button>}>
      <p className="text-sm text-muted-foreground">{pushSupported()?pushEnabled?"Taustailmoitukset ovat käytössä tällä laitteella. Muistutukset voivat saapua myös sovelluksen ollessa suljettu.":"Ota taustailmoitukset käyttöön, jos haluat muistutuksia sovelluksen ollessa suljettu.":"Tämä selain ei tue taustailmoituksia."}</p>
      {settings?<div className="mt-4 divide-y divide-border">{notificationOptions.map(([key,label,description])=><label key={key} className="flex min-h-14 items-center justify-between gap-4 py-2"><span><span className="block text-sm font-medium">{label}</span><span className="block text-xs text-muted-foreground">{description}</span></span><input type="checkbox" className="size-5 accent-primary" checked={settings[key]} onChange={e=>void updateSettings.mutateAsync({id:settings.id,[key]:e.target.checked}).catch(()=>toast.error("Ilmoitusasetusta ei voitu tallentaa."))}/></label>)}</div>:<p className="mt-4 text-sm text-muted-foreground">Ilmoitusasetuksia ladataan…</p>}
      <p className="mt-3 text-xs text-muted-foreground">Muistutukset ovat tarkoituksella rauhallisia. Saman aiheen turhaa pommitusta ei lähetetä.</p>
      {pushEnabled&&<button className={secondary+" mt-4 !min-h-11"} onClick={()=>void sendTestPush().then(()=>toast.success("Testimuistutus lähetettiin palvelimelta.")).catch(error=>toast.error(error instanceof Error?error.message:"Testimuistutus epäonnistui."))}>Lähetä testimuistutus</button>}
    </Panel>

    <Panel className="settings-app-only" title="Ulkoasu"><label className="flex min-h-11 items-center justify-between">Tumma tila<input type="checkbox" className="size-5 accent-primary" checked={dark} onChange={e=>{const next=e.target.checked;setDark(next);localStorage.setItem("opk.theme",next?"dark":"light");applyTheme(next);}}/></label></Panel>

    {archived.length>0&&<Panel className="settings-app-only" title="Arkistoidut kurssit">{archived.map(c=><div key={c.id} className="flex min-h-12 items-center justify-between gap-3 border-b border-border"><span><b>{c.code}</b> · {c.name}</span><button className={secondary+" !min-h-11"} onClick={()=>void archiveCourse.mutateAsync({id:c.id,archived:false}).then(()=>toast.success("Kurssi palautettu.")).catch(()=>toast.error("Palautus epäonnistui."))}>Palauta</button></div>)}</Panel>}

    <Panel className="settings-app-only" title="Laite"><p className="mb-3 text-sm text-muted-foreground">Normaalisti kirjautumista ei enää kysytä tällä selaimella. Tämän painikkeen käyttö poistaa muistamisen ja paikallisen istunnon, mutta Arthur-tili ja opiskelutiedot säilyvät palvelimella.</p><button className={secondary} onClick={()=>setForgetDeviceOpen(true)}><RotateCcw size={16}/>Unohda tämä laite</button></Panel>
    {forgetDeviceOpen&&<Dialog title="Unohda tämä laite" onClose={()=>setForgetDeviceOpen(false)}>
      <p className="text-sm text-muted-foreground">Tämä poistaa vain tämän selaimen paikallisen kirjautumisen. Kurssit, opiskeluhistoria ja muut palvelimelle synkronoidut tiedot säilyvät.</p>
      <div className="mt-5 flex justify-end gap-2">
        <button className={secondary} onClick={()=>setForgetDeviceOpen(false)}>Peruuta</button>
        <button className={button} onClick={()=>void clearOfflineSnapshots().finally(()=>{clearDeviceSession();location.reload();})}>Unohda laite</button>
      </div>
    </Dialog>}
  </SettingsLayout>;
}
