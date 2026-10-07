import { useMemo, useState } from "react";
import { BookOpen, ChevronLeft, ExternalLink, Search, Star } from "lucide-react";
import { toast } from "sonner";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Course, Topic } from "@/lib/domain";
import {
  useCourseExerciseAttempts,
  useCourseExerciseGoal,
  useCourseExercises,
  usePreferences,
  useRecordCourseExerciseAttempt,
} from "@/lib/data";
import {
  exerciseDisplayLabel,
  exerciseSourceLabel,
  maa06aPace,
  maa06aProgress,
  maa06aTrajectory,
  recommendMaa06aExercises,
  type CourseExercise,
  type CourseExerciseAttempt,
  type CourseExerciseResult,
} from "@/lib/maa06a";
import {
  parseManualMaa06aCodes,
  type ManualMaa06aSource,
} from "@/lib/maa06a-manual";
import { useRecordManualMaa06aExercises } from "@/lib/maa06a-manual-entry";
import { dateWithWeekday, diffDays, fullDate, today } from "@/lib/fi";
import { DEFAULT_STUDY_WEEKDAYS } from "@/lib/studyDefaults";
import { DataList, DataRow, EmptyState, Metric, MetricGroup, SectionCard, StatusBadge } from "@/components/surfaces";
import { Bar, button, secondary } from "@/features/shared/StudyViewPrimitives";
import { LibraryDetailLayout } from "@/layouts";

const resultLabels: Array<{ result: CourseExerciseResult; label: string; title: string }> = [
  { result: "independent", label: "Oikein", title: "Oikein itsenäisesti" },
  { result: "helped", label: "Avulla", title: "Tehty avun kanssa" },
  { result: "incorrect", label: "Väärin", title: "Kunnollinen yritys, mutta vastaus väärin" },
  { result: "class", label: "Tunnilla", title: "Tehtiin tunnilla" },
  { result: "solution_only", label: "Ratkaisu", title: "Katsoin ratkaisun ilman varsinaista yritystä" },
  { result: "skipped", label: "Ohita", title: "Jätetään myöhemmäksi" },
];

const manualResultOptions: Array<{ result: CourseExerciseResult; label: string }> = [
  { result: "independent", label: "Oikein itsenäisesti" },
  { result: "class", label: "Tehtiin tunnilla" },
  { result: "helped", label: "Tehty avun kanssa" },
  { result: "incorrect", label: "Yritetty, mutta väärin" },
];

const manualSourceOptions: Array<{ source: ManualMaa06aSource; label: string; example: string }> = [
  { source: "textbook", label: "Kirjan kappaletehtävät", example: "2.15, 2.16, 2.17" },
  { source: "textbook_review", label: "Kirjan K/A/B-kertaus", example: "K12, A5, B7" },
  { source: "review_worksheet", label: "Kertausmoniste", example: "1, 2, 3" },
];

function useModel(course: Course) {
  const exercisesQ = useCourseExercises(course.id);
  const attemptsQ = useCourseExerciseAttempts(course.id);
  const goalQ = useCourseExerciseGoal(course.id);
  const preferencesQ = usePreferences();
  const exercises = exercisesQ.data ?? [];
  const attempts = attemptsQ.data ?? [];
  const goal = goalQ.data ?? null;
  const studyWeekdays = preferencesQ.data?.study_weekdays ?? [...DEFAULT_STUDY_WEEKDAYS];
  const busyDates = preferencesQ.data?.busy_dates ?? [];
  const progress = goal ? maa06aProgress(exercises, attempts, goal.target_count) : null;
  const pace = goal && progress ? maa06aPace({
    startDate: course.start_date ?? "2026-10-06",
    today: today(), goal, completed: progress.uniqueCompleted, studyWeekdays, busyDates,
  }) : null;
  const recommendation = goal ? recommendMaa06aExercises({
    exercises, attempts, goal, startDate: course.start_date ?? "2026-10-06",
    today: today(), studyWeekdays, busyDates,
  }) : null;
  return { exercisesQ, goalQ, exercises, attempts, goal, progress, pace, recommendation, studyWeekdays, busyDates };
}

function latestAttempt(attempts: CourseExerciseAttempt[], exerciseId: string) {
  return attempts.filter((a) => a.exercise_id === exerciseId).sort((a, b) => b.attempted_at.localeCompare(a.attempted_at))[0];
}

function ResultBadge({ result }: { result?: CourseExerciseResult | undefined }) {
  if (!result) return null;
  if (result === "independent" || result === "class") return <StatusBadge tone="positive">{result === "class" ? "Tunnilla" : "Oikein"}</StatusBadge>;
  if (result === "helped" || result === "incorrect") return <StatusBadge tone="warning">{result === "helped" ? "Avulla" : "Väärin"}</StatusBadge>;
  return <StatusBadge tone="neutral">{result === "solution_only" ? "Ratkaisu katsottu" : "Ohitettu"}</StatusBadge>;
}

function ExerciseRow({ courseId, exercise, attempts }: { courseId: string; exercise: CourseExercise; attempts: CourseExerciseAttempt[] }) {
  const record = useRecordCourseExerciseAttempt();
  const latest = latestAttempt(attempts, exercise.id);
  async function mark(result: CourseExerciseResult) {
    try {
      const response = await record.mutateAsync({
        course_id: courseId,
        exercise_id: exercise.id,
        result,
        attempted_at: new Date().toISOString(),
      });
      if (response === "queued") toast.success("Tallennettu laitteelle. Synkronoidaan verkon palatessa.");
      else if (result === "solution_only" || result === "skipped") toast.info("Kirjattu, mutta tämä ei kasvata 130-laskuria.");
      else toast.success(`${exerciseDisplayLabel(exercise)} kirjattu.`);
    } catch {
      toast.error("Tehtävän merkintää ei voitu tallentaa.");
    }
  }
  return <DataRow>
    <div className="w-full py-1">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <b>{exerciseDisplayLabel(exercise)}</b>
            {exercise.teacher_recommended ? <span className="inline-flex items-center gap-1 text-xs font-medium"><Star size={13} fill="currentColor"/>Opettajan suositus</span> : null}
            {exercise.level ? <span className="text-xs text-muted-foreground">Taso {exercise.level}</span> : null}
            {!exercise.level && exercise.source === "textbook" ? <span className="text-xs text-muted-foreground">ei tasoluokitusta</span> : null}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{exerciseSourceLabel(exercise)}{exercise.section_code ? ` · ${exercise.section_code}` : ""}{exercise.chapter ? ` · kappale ${exercise.chapter}` : ""}</p>
        </div>
        <ResultBadge result={latest?.result}/>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {resultLabels.map((item) => <button key={item.result} type="button" title={item.title} disabled={record.isPending} onClick={() => void mark(item.result)} className="min-h-9 rounded-lg border border-border bg-surface px-2.5 text-xs font-medium hover:bg-muted disabled:opacity-50">{item.label}</button>)}
      </div>
    </div>
  </DataRow>;
}

function ManualExerciseLogger({ courseId }: { courseId: string }) {
  const mutation = useRecordManualMaa06aExercises();
  const [source, setSource] = useState<ManualMaa06aSource>("textbook");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<CourseExerciseResult>("independent");
  const parsed = useMemo(() => parseManualMaa06aCodes(value, source), [value, source]);
  const sourceOption = manualSourceOptions.find((option) => option.source === source)!;

  async function submit() {
    if (parsed.invalid.length) {
      toast.error(`Tarkista tehtävänumerot: ${parsed.invalid.join(", ")}`);
      return;
    }
    if (!parsed.codes.length) {
      toast.info("Kirjoita ensin vähintään yksi tehtävänumero.");
      return;
    }
    try {
      await mutation.mutateAsync({ courseId, source, codes: parsed.codes, result });
      toast.success(`${parsed.codes.length} tehtävää kirjattu 130-tavoitteeseen.`);
      setValue("");
    } catch {
      toast.error("Tehtäviä ei voitu kirjata. Jos olet offline, kokeile uudelleen verkon palattua.");
    }
  }

  return <SectionCard title="Kirjaa itse tekemäsi tehtävät" action={<StatusBadge>nopea kirjaus</StatusBadge>}>
    <p className="text-sm leading-6 text-muted-foreground">
      Et ole sidottu päivän suosituksiin. Kirjaa tähän mikä tahansa oikeasti tekemäsi MAA06A-tehtävä, myös sellainen jota opettajan valintataulukossa ei ole, kuten <b className="text-foreground">2.15</b>.
    </p>

    <div className="mt-4 grid gap-3 lg:grid-cols-[1.2fr_1fr]">
      <label className="grid gap-1.5 text-sm font-medium">
        Mistä tehtävä on?
        <select value={source} onChange={(event) => { setSource(event.target.value as ManualMaa06aSource); setValue(""); }} className="min-h-11 rounded-xl border border-border bg-surface px-3 text-sm">
          {manualSourceOptions.map((option) => <option key={option.source} value={option.source}>{option.label}</option>)}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Miten tehtävät menivät?
        <select value={result} onChange={(event) => setResult(event.target.value as CourseExerciseResult)} className="min-h-11 rounded-xl border border-border bg-surface px-3 text-sm">
          {manualResultOptions.map((option) => <option key={option.result} value={option.result}>{option.label}</option>)}
        </select>
      </label>
    </div>

    <label className="mt-3 grid gap-1.5 text-sm font-medium">
      Tehtävänumerot
      <textarea value={value} onChange={(event) => setValue(event.target.value)} rows={3} placeholder={`Esim. ${sourceOption.example}`} className="min-h-24 resize-y rounded-xl border border-border bg-surface px-3 py-2.5 text-base sm:text-sm"/>
    </label>

    {value.trim() ? <div className="mt-3 rounded-xl border border-border bg-muted/30 p-3">
      {parsed.codes.length ? <div className="flex flex-wrap gap-2">{parsed.codes.map((code) => <span key={code} className="rounded-lg bg-surface px-2.5 py-1 text-sm font-medium">{code}</span>)}</div> : null}
      {parsed.invalid.length ? <p className="mt-2 text-sm text-destructive">En tunnista: {parsed.invalid.join(", ")}</p> : null}
    </div> : null}

    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs leading-5 text-muted-foreground">Oikein, tunnilla, avulla ja kunnollinen väärä yritys kasvattavat 130-laskuria. Sama tehtävä lasketaan vain kerran.</p>
      <button type="button" className={button} disabled={mutation.isPending || !parsed.codes.length || parsed.invalid.length > 0} onClick={() => void submit()}>{mutation.isPending ? "Kirjataan…" : `Kirjaa ${parsed.codes.length || ""} tehtävää`}</button>
    </div>
  </SectionCard>;
}

function GoalCard({ course, compact = false }: { course: Course; compact?: boolean }) {
  const model = useModel(course);
  if (model.exercisesQ.isPending || model.goalQ.isPending || !model.goal || !model.progress) return <SectionCard title="MAA06A · 130 tehtävän tavoite"><p className="text-sm text-muted-foreground">Ladataan tehtäväseurantaa…</p></SectionCard>;
  if (!model.exercises.length) return <SectionCard title="MAA06A · 130 tehtävän tavoite"><p className="text-sm text-muted-foreground">Tehtäväpankki odottaa tietokantapäivitystä. Se korjataan automaattisesti seuraavalla latauksella.</p></SectionCard>;
  const { goal, progress, pace } = model;
  const delta = pace?.delta ?? 0;
  const status = progress.remaining === 0 ? "Tavoite täynnä" : delta > 0 ? `${delta} tehtävää edellä` : delta < 0 ? `${Math.abs(delta)} tehtävää jäljessä` : "Tavoitevauhdissa";
  return <SectionCard title="MAA06A · 130 tehtävän tavoite" action={<StatusBadge tone={progress.remaining === 0 || delta >= -3 ? "positive" : "warning"}>{status}</StatusBadge>}>
    <div className="flex items-end justify-between gap-4"><div><p className={`${compact ? "text-2xl" : "text-4xl"} font-semibold`}>{progress.goalCompleted} / {goal.target_count}</p><p className="mt-1 text-sm text-muted-foreground">130 tehtävää → enintään +8 p kokeeseen</p></div>{!compact ? <div className="text-right text-sm"><b>{progress.remaining}</b> jäljellä<br/><span className="text-muted-foreground">deadline {fullDate(goal.deadline)}</span></div> : null}</div>
    <div className="mt-4"><Bar value={(progress.goalCompleted / goal.target_count) * 100}/></div>
    {progress.extraCompleted ? <p className="mt-2 text-xs text-muted-foreground">Lisäksi {progress.extraCompleted} ylimääräistä tehtävää. Päämittari pysyy 130/130:ssa.</p> : null}
  </SectionCard>;
}

export function Maa06aTodayCard({ course }: { course: Course }) {
  const model = useModel(course);
  if (!model.goal || !model.progress || !model.exercises.length) return <GoalCard course={course} compact/>;
  const plannedDate = model.recommendation?.scheduledDate;
  const tasks = model.recommendation?.exercises ?? [];
  return <div className="mb-4 space-y-3">
    <GoalCard course={course} compact/>
    <SectionCard title={plannedDate === today() ? "MAA06A tänään" : "Seuraava MAA06A-kerta"} action={plannedDate ? <span className="text-xs text-muted-foreground">{dateWithWeekday(plannedDate)}</span> : undefined}>
      {model.progress.remaining === 0 ? <p className="text-sm">130/130 on täynnä. Käytä MAA06A-aika sekakertaukseen ja koetehtäviin.</p> : tasks.length ? <><p className="mb-3 text-sm text-muted-foreground">{tasks.length} suositeltua tehtävää. Voit aina tehdä myös muita tehtäviä ja kirjata ne MAA06A-kurssisivulta.</p><DataList>{tasks.map((exercise) => <ExerciseRow key={exercise.id} courseId={course.id} exercise={exercise} attempts={model.attempts}/>)}</DataList></> : <EmptyState title="Ei valittavia tehtäviä" body="Tehtäväpankissa ei ole juuri nyt sopivaa tekemätöntä tehtävää."/>}
    </SectionCard>
  </div>;
}

export function Maa06aPlannerCard({ course }: { course: Course }) {
  const model = useModel(course);
  if (!model.goal || !model.progress || !model.pace) return <GoalCard course={course} compact/>;
  const { goal, pace } = model;
  const tasks = model.recommendation?.exercises ?? [];
  return <div className="mb-4 grid gap-4 lg:grid-cols-2">
    <GoalCard course={course} compact/>
    <SectionCard title="MAA06A:n tehtävätahti" action={<StatusBadge tone={pace.delta >= -3 ? "positive" : "warning"}>{pace.delta >= 0 ? "Suunnitelmassa" : "Mukautetaan"}</StatusBadge>}>
      <MetricGroup><Metric label="Seuraava opiskelukerta" value={pace.nextStudyDate ? dateWithWeekday(pace.nextStudyDate) : "—"}/><Metric label="Tavoite / opiskelupäivä" value={pace.perStudyDay ? `${pace.perStudyDay} tehtävää` : "Valmis"}/><Metric label="Opiskelupäiviä jäljellä" value={pace.remainingStudyDays}/></MetricGroup>
      {tasks.length ? <div className="mt-4 flex flex-wrap gap-2">{tasks.map((exercise) => <span key={exercise.id} className="rounded-lg border border-border px-2.5 py-1 text-sm">{exercise.teacher_recommended ? "⭐ " : ""}{exerciseDisplayLabel(exercise)}</span>)}</div> : null}
      <p className="mt-3 text-xs leading-5 text-muted-foreground">Tavoite pyritään täyttämään {fullDate(pace.plannedFinish)}, jotta {fullDate(goal.deadline)} jää bufferiksi. Ei murto-osia kappaleista, vaan oikeita tehtävänumeroita.</p>
    </SectionCard>
  </div>;
}

type Filter = "recommended" | "unfinished" | "review" | "all";

export function Maa06aCourseView({ course, topics, onBack, onStart }: { course: Course; topics: Topic[]; onBack: () => void; onStart: () => void }) {
  const model = useModel(course);
  const [filter, setFilter] = useState<Filter>("unfinished");
  const [limit, setLimit] = useState(60);
  const [search, setSearch] = useState("");
  if (!model.goal || !model.progress) return <LibraryDetailLayout className="course-detail"><button className={secondary} onClick={onBack}><ChevronLeft size={17}/>Kaikki kurssit</button><GoalCard course={course}/></LibraryDetailLayout>;
  const { goal, progress, pace } = model;
  const completed = progress.completedExerciseIds;
  const normalizedSearch = search.trim().toUpperCase();
  const allFiltered = model.exercises.filter((exercise) => {
    const matchesFilter = filter === "recommended" ? exercise.teacher_recommended : filter === "unfinished" ? !completed.has(exercise.id) : filter === "review" ? exercise.source !== "textbook" : true;
    if (!matchesFilter) return false;
    if (!normalizedSearch) return true;
    return exercise.code.toUpperCase().includes(normalizedSearch) || exerciseSourceLabel(exercise).toUpperCase().includes(normalizedSearch);
  });
  const shown = allFiltered.slice(0, limit);
  const trajectory = maa06aTrajectory({ exercises: model.exercises, attempts: model.attempts, goal, startDate: course.start_date ?? "2026-10-06", studyWeekdays: model.studyWeekdays, busyDates: model.busyDates, throughDate: goal.deadline });
  const ticks = trajectory.filter((_point, index) => index % 7 === 0 || index === trajectory.length - 1).map((point) => point.date);
  const courseTopics = topics.filter((topic) => topic.course_id === course.id);
  const recommended = model.recommendation?.exercises ?? [];

  return <LibraryDetailLayout className="course-detail space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-2"><button className={secondary} onClick={onBack}><ChevronLeft size={17}/>Kaikki kurssit</button><a className={secondary} href={goal.resource_url ?? "#"} target="_blank" rel="noreferrer"><ExternalLink size={16}/>Kurssisivusto</a></div>
    <section className="course-hero"><div><p className="text-sm font-semibold text-primary">MAA06A</p><h2 className="mt-1 text-2xl font-semibold sm:text-3xl">Derivaatta · alkuosa</h2><p className="mt-2 text-sm text-muted-foreground">6.10.–27.11. · 130 tehtävän deadline 26.11. · koe 27.11.</p></div><button className={button} onClick={onStart}>Aloita opiskelu</button></section>
    <GoalCard course={course}/>
    <ManualExerciseLogger courseId={course.id}/>

    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Mistä tehtävät koostuvat"><MetricGroup><Metric label="Kappaletehtävät" value={progress.bySource.textbook}/><Metric label="Kirjan K/A/B" value={progress.bySource.textbook_review}/><Metric label="Kertausmoniste" value={progress.bySource.review_worksheet}/></MetricGroup><p className="mt-3 text-xs text-muted-foreground">Kaikki kolme lähdettä kasvattavat samaa 130-laskuria. Sama tehtävä lasketaan vain kerran.</p></SectionCard>
      <SectionCard title="Opettajan suosittelemat" action={<b>{progress.recommendedCompleted}/{progress.recommendedTotal}</b>}><p className="text-sm">Alleviivatut tehtävät priorisoidaan, mutta ne eivät lukitse 130-tavoitetta.</p><div className="mt-4"><Bar value={progress.recommendedTotal ? progress.recommendedCompleted / progress.recommendedTotal * 100 : 0}/></div></SectionCard>
    </div>

    <SectionCard title={model.recommendation?.scheduledDate === today() ? "Tämän päivän suositus" : "Seuraavan opiskelukerran suositus"} action={model.recommendation?.scheduledDate ? <StatusBadge>{dateWithWeekday(model.recommendation.scheduledDate)}</StatusBadge> : undefined}>{recommended.length ? <><p className="mb-3 text-sm text-muted-foreground">Nämä ovat ehdotuksia, eivät ainoa sallittu tehtävälista.</p><DataList>{recommended.map((exercise) => <ExerciseRow key={exercise.id} courseId={course.id} exercise={exercise} attempts={model.attempts}/>)}</DataList></> : <EmptyState title="130/130 tai ei valittavaa" body="Kun tavoite on täynnä, jatka koekertauksella."/>}</SectionCard>

    <SectionCard title="Suunnitelmassa pysyminen" action={pace ? <StatusBadge tone={pace.delta >= -3 ? "positive" : "warning"}>{pace.delta > 0 ? `${pace.delta} edellä` : pace.delta < 0 ? `${Math.abs(pace.delta)} jäljessä` : "Tavoitevauhdissa"}</StatusBadge> : undefined}>
      <div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={trajectory}><XAxis dataKey="date" ticks={ticks} tickFormatter={(value) => String(value).slice(5)} fontSize={11}/><YAxis domain={[0, goal.target_count]} width={36} fontSize={11}/><Tooltip labelFormatter={(value) => fullDate(String(value))}/><Line type="monotone" dataKey="planned" stroke="var(--muted-foreground)" strokeDasharray="5 5" dot={false} name="Tavoite"/><Line type="monotone" dataKey="actual" stroke="var(--primary)" strokeWidth={3} dot={false} name="Tehty"/></LineChart></ResponsiveContainer></div>
      <p className="mt-3 text-xs text-muted-foreground">Tavoite pyritään täyttämään {pace ? fullDate(pace.plannedFinish) : "24.11.2026"}; kova deadline {fullDate(goal.deadline)}.</p>
    </SectionCard>

    <div className="grid gap-4 lg:grid-cols-2">
      <SectionCard title="Suoritusten laatu"><MetricGroup><Metric label="Oikein" value={progress.byResult.independent}/><Metric label="Avulla" value={progress.byResult.helped}/><Metric label="Väärin, mutta tehty" value={progress.byResult.incorrect}/><Metric label="Tunnilla" value={progress.byResult.class}/></MetricGroup><p className="mt-3 text-xs text-muted-foreground">Väärä kunnollinen yritys ja tunnilla tehty lasketaan. Pelkkä malliratkaisu tai ohitus ei.</p></SectionCard>
      <SectionCard title="Kurssin rakenne"><DataList>{courseTopics.map((topic) => { const taskList = model.exercises.filter((exercise) => exercise.topic_id === topic.id); const done = taskList.filter((exercise) => completed.has(exercise.id)).length; return <DataRow key={topic.id}><div className="flex w-full justify-between gap-3"><span><small className="mr-2 text-muted-foreground">{topic.materials}</small><b>{topic.name}</b></span><span className="text-sm text-muted-foreground">{done}/{taskList.length}</span></div></DataRow>; })}</DataList></SectionCard>
    </div>

    <SectionCard title="Tehtäväselain" action={<span className="text-xs text-muted-foreground">{model.exercises.length} tunnettua tehtävää</span>}>
      <p className="mb-3 text-sm text-muted-foreground">Tässä näkyvät opettajan taulukosta tunnetut tehtävät ja itse lisäämäsi tehtävät. Jos esimerkiksi 2.15 ei vielä näy, kirjaa se yllä olevalla pikakirjauksella.</p>
      <label className="relative mb-3 block">
        <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
        <input value={search} onChange={(event) => { setSearch(event.target.value); setLimit(60); }} placeholder="Hae esim. 2.15, K27 tai B7" className="min-h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-base sm:text-sm"/>
      </label>
      <div className="mb-4 flex flex-wrap gap-2">{([['recommended','⭐ Suositellut'],['unfinished','Tekemättä'],['review','Kertaus'],['all','Kaikki']] as const).map(([value,label]) => <button key={value} aria-pressed={filter === value} onClick={() => { setFilter(value); setLimit(60); }} className={filter === value ? button : secondary}>{label}</button>)}</div>
      {shown.length ? <DataList>{shown.map((exercise) => <ExerciseRow key={exercise.id} courseId={course.id} exercise={exercise} attempts={model.attempts}/>)}</DataList> : <EmptyState title="Ei osumia" body={search ? "Jos tehtävä on kirjassa mutta ei vielä pankissa, lisää se yllä pikakirjauksella." : "Vaihda suodatinta nähdäksesi muita tehtäviä."}/>}
      {shown.length < allFiltered.length ? <button className={secondary + " mt-4"} onClick={() => setLimit((value) => value + 60)}>Näytä lisää</button> : null}
    </SectionCard>

    <SectionCard title="Kurssimateriaali"><a className="flex min-h-11 items-center justify-between rounded-xl border border-border px-4 py-3 hover:bg-muted" href={goal.resource_url ?? "#"} target="_blank" rel="noreferrer"><span className="flex items-center gap-3"><BookOpen size={18}/><span><b>MAA6 alkuosa</b><small className="block text-muted-foreground">Toni's matikkamaailma</small></span></span><ExternalLink size={17}/></a></SectionCard>
    {diffDays(goal.deadline, today()) <= 14 && progress.remaining > 0 ? <SectionCard title="Koekertaus on aktiivinen"><p className="text-sm text-muted-foreground">K/A/B-kertaustehtäviä ja kertausmonistetta sekoitetaan nyt mukaan. Ne kasvattavat samalla 130-laskuria.</p></SectionCard> : null}
  </LibraryDetailLayout>;
}
