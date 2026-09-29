import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BookOpen, Brain, CalendarDays, ChartNoAxesCombined, Ellipsis, FlaskConical, Home, Plus, Search, Settings2, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import { LiquidGlass } from "@/components/LiquidGlass";
import { AICoach } from "@/components/AICoach";
import { ensureKe04ForCurrentUser, useCourses, useExams, useMistakes, usePlan, usePracticeAttempts, usePreferences, useSessions, useTests, useTopics } from "@/lib/data";
import { longDate, greeting, today } from "@/lib/fi";
import { CourseView, ExamsView, ProgressView, TodayView, PlanView, SettingsView } from "@/components/StudyViews";
import { PracticeView } from "@/components/PracticeView";
import { CourseForm, SessionForm, SearchPanel } from "@/components/StudyDialogs";
import { Onboarding } from "@/components/Onboarding";
import { pendingCount, setOfflineOwner, startSyncWatcher, subscribePending } from "@/lib/offline";
import { applyTheme, storedThemeIsDark } from "@/lib/theme";
import {
  type DeviceUser,
  getDeviceOwnerId,
  isTrustedArthurDevice,
  readDeviceSession,
  storeDeviceSession,
} from "@/lib/deviceSession";

type Page = "today" | "plan" | "courses" | "practice" | "progress" | "exams" | "settings";
const nav = [
  { id: "today", label: "Tänään", Icon: Home },
  { id: "plan", label: "Suunnitelma", Icon: CalendarDays },
  { id: "courses", label: "Opinnot", Icon: BookOpen },
  { id: "practice", label: "Harjoittelu", Icon: Brain },
  { id: "progress", label: "Edistyminen", Icon: ChartNoAxesCombined },
] as const;
export const Route = createFileRoute("/")({ component: App });

async function getArthurSession(previousOwnerId?: string | null): Promise<DeviceUser> {
  const response = await fetch("/api/device-auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Arthur",
      legacy_owner_id: previousOwnerId ?? undefined,
    }),
  });
  const payload = (await response.json().catch(() => ({}))) as {
    access_token?: string;
    user_id?: string;
    expires_at?: number;
    error?: string;
  };
  if (!response.ok || !payload.access_token || !payload.user_id || !payload.expires_at) {
    throw new Error(payload.error ?? "Arthur-laitetunnistuksen luominen epäonnistui.");
  }
  storeDeviceSession({
    accessToken: payload.access_token,
    userId: payload.user_id,
    expiresAt: payload.expires_at,
  });
  return { id: payload.user_id };
}


function App() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<DeviceUser | null | undefined>();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void (async () => {
      const existing = readDeviceSession();
      const rememberedOwnerId = existing?.user.id ?? getDeviceOwnerId();

      // Keep a valid cached session usable immediately, including offline.
      if (existing && active) setUser(existing.user);

      if (!existing && !isTrustedArthurDevice()) {
        if (active) setUser(null);
        return;
      }

      try {
        // Always ask the server for the canonical Arthur owner. This also
        // reconciles data left under an older device-specific owner id.
        const canonicalUser = await getArthurSession(rememberedOwnerId);
        if (!active) return;

        setAuthError(null);
        if (existing?.user.id && existing.user.id !== canonicalUser.id) {
          queryClient.clear();
        }
        setUser(canonicalUser);
      } catch (error) {
        if (!active) return;

        // A valid cached token still lets the app work offline. When the
        // connection returns, the next app open/focus will canonicalize it.
        if (existing) {
          setAuthError(error instanceof Error ? error.message : "Synkronoinnin tarkistus epäonnistui.");
          return;
        }
        setAuthError(error instanceof Error ? error.message : "Kirjautuminen epäonnistui.");
        setUser(null);
      }
    })();
    return () => { active = false; };
  }, [queryClient]);

  if (user === undefined) return <main className="grid min-h-screen place-items-center">Avataan opintopäiväkirjaa…</main>;
  if (!user) return <DeviceSignIn authError={authError} onSignedIn={setUser} />;
  return <StudyApp key={user.id} user={user} />;
}

function DeviceSignIn({
  authError,
  onSignedIn,
}: {
  authError: string | null;
  onSignedIn: (user: DeviceUser) => void;
}) {
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(authError);

  return <main className="grid min-h-screen place-items-center p-4"><section className="panel w-full max-w-md space-y-5 p-8">
    <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground"><BookOpen /></div>
    <div>
      <h1 className="text-3xl font-semibold">Opintopäiväkirja</h1>
      <p className="mt-2 text-muted-foreground">Tunnista tämä laite kerran. Sen jälkeen Opintopäiväkirja avautuu suoraan.</p>
    </div>
    {errorMessage && <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
      {errorMessage}
    </p>}
    <form
      onSubmit={async e => {
        e.preventDefault();
        setErrorMessage(null);

        if (username.trim().toLowerCase() !== "arthur") {
          setErrorMessage("Käyttäjänimeä ei tunnistettu.");
          return;
        }

        setBusy(true);
        try {
          const signedInUser = await getArthurSession();
          onSignedIn(signedInUser);
        } catch (error) {
          setErrorMessage(error instanceof Error ? error.message : "Kirjautuminen epäonnistui.");
        } finally {
          setBusy(false);
        }
      }}
      className="space-y-3"
    >
      <label htmlFor="username" className="block text-sm font-medium">Käyttäjänimi</label>
      <input
        id="username"
        type="text"
        autoComplete="username"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Arthur"
        className="w-full rounded-xl border bg-surface px-3 py-3"
      />
      <button disabled={busy} className="min-h-11 w-full rounded-xl bg-primary px-4 text-primary-foreground">
        {busy ? "Avataan…" : "Jatka"}
      </button>
    </form>
    <p className="text-xs leading-5 text-muted-foreground">
      Tämä laite muistetaan selaimessa. Selaustietojen tyhjentäminen tai yksityinen selaus poistaa muistamisen.
    </p>
  </section><Toaster richColors /></main>;
}

function StudyApp({ user }: { user: DeviceUser }) {
  setOfflineOwner(user.id);
  const [page, setPage] = useState<Page>("today");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [entry, setEntry] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [pending, setPending] = useState(pendingCount());
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [defaultsReady, setDefaultsReady] = useState(false);
  const [defaultsError, setDefaultsError] = useState<string | null>(null);
  const coursesQ = useCourses(), topicsQ = useTopics(), sessionsQ = useSessions(), examsQ = useExams(), planQ = usePlan(), testsQ = useTests(), attemptsQ = usePracticeAttempts(), mistakesQ = useMistakes(), preferencesQ = usePreferences();
  const courses = (coursesQ.data ?? []).filter(c => !c.archived), topics = topicsQ.data ?? [], sessions = sessionsQ.data ?? [], exams = examsQ.data ?? [], plan = planQ.data ?? [];
  const allQueries = [coursesQ, topicsQ, sessionsQ, examsQ, planQ, testsQ, attemptsQ, mistakesQ, preferencesQ];
  const busy = !defaultsReady || allQueries.some(q => q.isPending);
  const queryError = allQueries.find(q => q.error)?.error;
  const error = defaultsError ?? (queryError instanceof Error ? queryError.message : queryError ? String(queryError) : null);

  useEffect(() => {
    if (!busy) {
      setShowSkeleton(false);
      return;
    }
    const timer = window.setTimeout(() => setShowSkeleton(true), 180);
    return () => window.clearTimeout(timer);
  }, [busy]);

  useEffect(() => {
    const saved = localStorage.getItem("opk.last-page") as Page | null;
    if (saved && ["today","plan","courses","practice","exams","progress","settings"].includes(saved)) {
      setPage(saved);
    }
  }, []);

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      void Promise.all([
        coursesQ.refetch(),
        topicsQ.refetch(),
        sessionsQ.refetch(),
        examsQ.refetch(),
        planQ.refetch(),
        testsQ.refetch(),
        attemptsQ.refetch(),
        mistakesQ.refetch(),
        preferencesQ.refetch(),
      ]);
    };
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);
  useEffect(() => {
    let active = true;
    void ensureKe04ForCurrentUser()
      .then(async () => {
        await Promise.all([coursesQ.refetch(), topicsQ.refetch(), examsQ.refetch(), preferencesQ.refetch()]);
        if (active) {
          setDefaultsError(null);
          setDefaultsReady(true);
        }
      })
      .catch((err) => {
        if (!active) return;
        setDefaultsError(err instanceof Error ? err.message : "KE04:n alustaminen epäonnistui.");
        setDefaultsReady(true);
      });
    return () => { active = false; };
  }, [user.id]);

  useEffect(() => { const stop = subscribePending(setPending); const sync = startSyncWatcher(n => toast.success(`Synkattiin ${n} merkintää.`)); return () => { stop(); sync(); }; }, []);
  useEffect(() => {
    applyTheme(storedThemeIsDark());
    const keys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); }
      if (e.key === "Escape") { setEntry(null); setSearch(false); setAdding(false); setMoreOpen(false); }
      if (!/input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? "") && !e.metaKey && !e.ctrlKey) {
        if (e.key.toLowerCase() === "n") setEntry("manual");
        if (e.key.toLowerCase() === "t") setPage("today");
      }
    };
    window.addEventListener("keydown", keys);
    return () => window.removeEventListener("keydown", keys);
  }, []);
  const go = (p: Page) => { setPage(p); localStorage.setItem("opk.last-page", p); setCourseId(null); setMoreOpen(false); };
  const selected = courses.find(c => c.id === courseId);
  const ke04 = courses.find(c => c.code === "KE04");
  const preferences = preferencesQ.data;
  const capacity = {
    studyWeekdays: preferences?.study_weekdays ?? [1,2,3,4,5],
    weekdayMinMinutes: preferences?.weekday_capacity_min_minutes ?? 30,
    weekdayMinutes: preferences?.weekday_capacity_minutes ?? 60,
    weekendMinMinutes: preferences?.weekend_capacity_min_minutes ?? 60,
    weekendMinutes: preferences?.weekend_capacity_minutes ?? 120,
    busyDates: preferences?.busy_dates ?? [],
  };
  const hasUserData =
    sessions.length > 0 ||
    plan.some(p => p.status === "completed" || p.status === "in_progress") ||
    courses.some(c => c.code !== "KE04");

  if (!busy && !error && preferences && !preferences.onboarding_completed && !hasUserData && ke04) {
    return <>
      <Onboarding
        course={ke04}
        topics={topics.filter(t => t.course_id === ke04.id)}
        plan={plan}
        preferences={preferences}
        onComplete={() => {
          void Promise.all([
            preferencesQ.refetch(),
            coursesQ.refetch(),
            planQ.refetch(),
          ]);
        }}
      />
      <Toaster richColors />
    </>;
  }

  return <div className="min-h-screen">
    <LiquidGlass lensing as="aside" className="desktop-sidebar fixed inset-y-4 left-4 z-20 hidden w-60 flex-col rounded-3xl p-4 md:flex">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2 font-semibold"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><BookOpen size={20}/></span><span className="sidebar-label">Opintopäiväkirja</span></div>
      <nav aria-label="Päänavigaatio" className="space-y-1">{nav.map(({id,label,Icon}) => <button key={id} aria-label={label} aria-current={page===id?"page":undefined} onClick={() => go(id)} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm ${page===id?"bg-accent font-semibold":"hover:bg-muted"}`}><Icon className="shrink-0" size={19}/><span className="sidebar-label">{label}</span></button>)}</nav>
      <button aria-label="Kirjaa opiskelu" className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-3 text-primary-foreground" onClick={() => setEntry("manual")}><Plus size={18}/><span className="sidebar-label">Kirjaa opiskelu</span></button>
      <div className="mt-auto space-y-1"><button aria-label="Haku" className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 hover:bg-muted" onClick={() => setSearch(true)}><Search className="shrink-0" size={19}/><span className="sidebar-label">Haku</span><kbd className="sidebar-label ml-auto text-xs">⌘ K</kbd></button><button aria-label="Asetukset" className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 hover:bg-muted" onClick={() => go("settings")}><Settings2 className="shrink-0" size={19}/><span className="sidebar-label">Asetukset</span></button></div>
    </LiquidGlass>
    <main id="main-content" tabIndex={-1} className="app-main app-desktop-main px-4">
      <header className="mb-8 hidden items-center justify-between pt-7 md:flex"><div><p className="text-sm text-muted-foreground">{longDate(today())}</p><h1 className="mt-1 text-3xl font-semibold">{selected?.code ?? (page==="today"?greeting():nav.find(n=>n.id===page)?.label ?? "Asetukset")}</h1></div></header>
      <header className="app-mobile-header md:hidden">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{longDate(today())}</p>
          <h1 className="mt-0.5 truncate text-[28px] font-semibold leading-tight">{selected?.code ?? (page==="today"?greeting():nav.find(n=>n.id===page)?.label ?? "Asetukset")}</h1>
        </div>
        <div className="flex gap-1">
          <button aria-label="Haku" onClick={()=>setSearch(true)} className="app-icon-button"><Search size={20}/></button>
          <button aria-label="Lisää toimintoja" aria-expanded={moreOpen} onClick={()=>setMoreOpen(v=>!v)} className="app-icon-button"><Ellipsis size={21}/></button>
        </div>
      </header>
      {pending>0 && <p role="status" className="mb-5 rounded-xl bg-accent p-3 text-sm">Tallennettu paikallisesti · {pending} muutosta synkataan yhteyden palattua.</p>}
      {error && <div role="alert" className="panel mb-5 p-4"><p className="font-medium">{pending>0?"Kaikkea ei voitu synkata vielä.":"Tietojen lataus tai alustus epäonnistui."}</p>{pending>0&&<p className="mt-1 text-sm text-muted-foreground">Syöttämäsi tiedot ovat tallessa tässä laitteessa ja synkataan yhteyden palattua.</p>}<p className="mt-1 text-sm text-muted-foreground">{String(error)}</p><button className="mt-2 underline" onClick={()=>{setDefaultsReady(false);setDefaultsError(null);void ensureKe04ForCurrentUser().then(()=>Promise.all([coursesQ.refetch(),topicsQ.refetch(),sessionsQ.refetch(),examsQ.refetch(),planQ.refetch(),testsQ.refetch(),attemptsQ.refetch(),mistakesQ.refetch(),preferencesQ.refetch()])).then(()=>setDefaultsReady(true)).catch(err=>{setDefaultsError(err instanceof Error?err.message:"Uudelleenyritys epäonnistui.");setDefaultsReady(true);});}}>Yritä uudelleen</button></div>}
      {busy ? (showSkeleton ? <div className="space-y-4" aria-label="Ladataan"><div className="h-32 animate-pulse rounded-2xl bg-muted"/><div className="h-60 animate-pulse rounded-2xl bg-muted"/></div> : null) :
      courses.length===0 ? <section className="panel p-6"><h2 className="text-xl font-semibold">Aloita ensimmäisestä kurssista</h2><p className="mt-2 text-muted-foreground">Lisää kurssi ja sen aiheet, jotta voit suunnitella ja kirjata opiskelua.</p><button onClick={()=>setAdding(true)} className="mt-5 min-h-11 rounded-xl bg-primary px-4 text-primary-foreground">Lisää kurssi</button></section> :
      page==="today" ? <TodayView courses={courses} topics={topics} sessions={sessions} exams={exams} plan={plan} tests={testsQ.data??[]} attempts={attemptsQ.data??[]} mistakes={mistakesQ.data??[]} capacity={capacity} onStart={setEntry} onGo={go}/> :
      page==="plan" ? <PlanView courses={courses} topics={topics} plan={plan} tests={testsQ.data??[]} mistakes={mistakesQ.data??[]} capacity={capacity} onStart={setEntry}/> :
      page==="courses" ? <CourseView courses={courses} topics={topics} sessions={sessions} exams={exams} plan={plan} tests={testsQ.data??[]} mistakes={mistakesQ.data??[]} selected={courseId} onSelect={setCourseId} onAdd={()=>setAdding(true)} onStart={()=>setEntry("manual")}/> :
      page==="practice" ? <PracticeView courses={courses} topics={topics} attempts={attemptsQ.data??[]} tests={testsQ.data??[]} mistakes={mistakesQ.data??[]}/> :
      page==="exams" ? <ExamsView courses={courses} topics={topics} exams={exams} tests={testsQ.data??[]} attempts={attemptsQ.data??[]} mistakes={mistakesQ.data??[]} sessions={sessions} plan={plan} onCourse={id=>{setCourseId(id);setPage("courses");localStorage.setItem("opk.last-page","courses");}}/> :
      page==="progress" ? <ProgressView courses={courses} topics={topics} attempts={attemptsQ.data??[]} sessions={sessions} plan={plan} exams={exams} mistakes={mistakesQ.data??[]} capacity={capacity} onPlan={()=>go("plan")}/> :
      <SettingsView user={user}/>}
    </main>
    <LiquidGlass lensing as="nav" aria-label="Mobiilinavigaatio" className="app-tabbar md:hidden">
      <button aria-label="Tänään" aria-current={page==="today"?"page":undefined} onClick={()=>go("today")} className={`app-tab ${page==="today"?"app-tab-active":""}`}><Home size={21}/><span>Tänään</span></button>
      <button aria-label="Suunnitelma" aria-current={page==="plan"?"page":undefined} onClick={()=>go("plan")} className={`app-tab ${page==="plan"?"app-tab-active":""}`}><CalendarDays size={21}/><span>Suunnitelma</span></button>
      <button aria-label="Opinnot" aria-current={page==="courses"?"page":undefined} onClick={()=>go("courses")} className={`app-tab ${page==="courses"?"app-tab-active":""}`}><BookOpen size={21}/><span>Opinnot</span></button>
      <button aria-label="Harjoittelu" aria-current={page==="practice"?"page":undefined} onClick={()=>go("practice")} className={`app-tab ${page==="practice"?"app-tab-active":""}`}><Brain size={21}/><span>Harjoittelu</span></button>
      <button aria-label="Edistyminen" aria-current={page==="progress"?"page":undefined} onClick={()=>go("progress")} className={`app-tab ${page==="progress"?"app-tab-active":""}`}><ChartNoAxesCombined size={21}/><span>Edistyminen</span></button>
    </LiquidGlass>
    {moreOpen&&<div className="app-sheet-backdrop md:hidden" role="presentation" onClick={()=>setMoreOpen(false)}>
      <LiquidGlass lensing as="aside" role="dialog" aria-modal="true" aria-label="Lisää toimintoja" className="app-sheet" onClick={e=>e.stopPropagation()}>
        <div className="app-sheet-handle" aria-hidden="true"/>
        <div className="mb-4 flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Opintopäiväkirja</p><h2 className="text-xl font-semibold">Lisää</h2></div><button className="app-icon-button" aria-label="Sulje" onClick={()=>setMoreOpen(false)}><X size={20}/></button></div>
        <div className="grid grid-cols-2 gap-3">
          <button className={`app-sheet-action ${page==="exams"?"app-sheet-action-active":""}`} onClick={()=>go("exams")}><FlaskConical size={22}/><span><b>Kokeet</b><small>Exam Mode ja valmius</small></span></button>
          <button className="app-sheet-action" onClick={()=>{setMoreOpen(false);setEntry("manual");}}><Plus size={22}/><span><b>Kirjaa opiskelu</b><small>Nopea jälkikirjaus</small></span></button>
          <button className="app-sheet-action" onClick={()=>{setMoreOpen(false);setSearch(true);}}><Search size={22}/><span><b>Haku</b><small>Kurssit, aiheet ja toiminnot</small></span></button>
          <button className={`app-sheet-action ${page==="settings"?"app-sheet-action-active":""}`} onClick={()=>go("settings")}><Settings2 size={22}/><span><b>Asetukset</b><small>Kapasiteetti ja muistutukset</small></span></button>
        </div>
      </LiquidGlass>
    </div>}
    {entry && <SessionForm item={plan.find(p=>p.id===entry)??null} courses={courses} topics={topics} sessions={sessions} attempts={attemptsQ.data??[]} onClose={()=>setEntry(null)}/>} 
    {adding && <CourseForm onClose={()=>setAdding(false)}/>}
    {search && <SearchPanel courses={courses} topics={topics} exams={exams} sessions={sessions} onClose={()=>setSearch(false)} onNavigate={p=>{go(p as Page);setSearch(false);}} onCourse={id=>{setCourseId(id);setPage("courses");localStorage.setItem("opk.last-page","courses");setSearch(false);}} onLog={()=>{setSearch(false);setEntry("manual");}}/>}
    {!busy && !error && !entry && !adding && !search && !moreOpen && (
      <AICoach
        data={{ courses, topics, sessions, exams, plan, mistakes: mistakesQ.data ?? [] }}
        selectedCourseId={courseId}
        weekdays={preferences?.study_weekdays ?? [1, 2, 3, 4, 5]}
        onLog={() => setEntry("manual")}
        onPractice={() => go("practice")}
      />
    )}
    <Toaster richColors/>
  </div>;
}
