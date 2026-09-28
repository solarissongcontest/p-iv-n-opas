import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, ChartNoAxesCombined, FlaskConical, Home, Plus, Search, Settings2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { LiquidGlass } from "@/components/LiquidGlass";
import { ensureKe04ForCurrentUser, useCourses, useExams, useMistakes, usePlan, usePreferences, useSessions, useTests, useTopics } from "@/lib/data";
import { longDate, greeting, today } from "@/lib/fi";
import { CourseView, ExamsView, ProgressView, TodayView, PlanView, SettingsView } from "@/components/StudyViews";
import { CourseForm, SessionForm, SearchPanel } from "@/components/StudyDialogs";
import { Onboarding } from "@/components/Onboarding";
import { pendingCount, setOfflineOwner, startSyncWatcher, subscribePending } from "@/lib/offline";

type Page = "today" | "plan" | "courses" | "exams" | "progress" | "settings";
const nav = [
  { id: "today", label: "Tänään", Icon: Home },
  { id: "plan", label: "Suunnitelma", Icon: CalendarDays },
  { id: "courses", label: "Kurssit", Icon: BookOpen },
  { id: "exams", label: "Kokeet", Icon: FlaskConical },
  { id: "progress", label: "Kehitys", Icon: ChartNoAxesCombined },
] as const;
export const Route = createFileRoute("/")({ component: App });

const DEVICE_AUTH_KEY = "opk.device-authorized";
const DEVICE_OWNER_KEY = "opk.owner-id";

async function getArthurSession() {
  const response = await fetch("/api/device-auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "Arthur" }),
  });
  const payload = (await response.json().catch(() => ({}))) as {
    access_token?: string;
    refresh_token?: string;
    user_id?: string;
    error?: string;
  };
  if (!response.ok || !payload.access_token || !payload.refresh_token) {
    throw new Error(payload.error ?? "Arthur-session luominen epäonnistui.");
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
  });
  if (error) throw error;
  if (!data.user) throw new Error("Supabase ei palauttanut käyttäjää.");
  return data.user;
}


function App() {
  const [user, setUser] = useState<User | null | undefined>();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ?? null);
    });

    void (async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (!active) return;

        if (sessionData.session?.user) {
          localStorage.setItem(DEVICE_AUTH_KEY, "Arthur");
          localStorage.setItem(DEVICE_OWNER_KEY, sessionData.session.user.id);
          setUser(sessionData.session.user);
          return;
        }

        const trustedDevice = localStorage.getItem(DEVICE_AUTH_KEY) === "Arthur";
        if (!trustedDevice) {
          setUser(null);
          return;
        }

        const restoredUser = await getArthurSession();
        localStorage.setItem(DEVICE_OWNER_KEY, restoredUser.id);
        if (active) {
          setAuthError(null);
          setUser(restoredUser);
        }
      } catch (error) {
        if (!active) return;
        const message = error instanceof Error ? error.message : "Kirjautuminen epäonnistui.";
        setAuthError(message);
        setUser(null);
      }
    })();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (user === undefined) return <main className="grid min-h-screen place-items-center">Avataan opintopäiväkirjaa…</main>;
  if (!user) return <DeviceSignIn authError={authError} onSignedIn={setUser} />;
  return <StudyApp user={user} />;
}

function DeviceSignIn({
  authError,
  onSignedIn,
}: {
  authError: string | null;
  onSignedIn: (user: User) => void;
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
          localStorage.setItem(DEVICE_AUTH_KEY, "Arthur");
          localStorage.setItem(DEVICE_OWNER_KEY, signedInUser.id);
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

function StudyApp({ user }: { user: User }) {
  setOfflineOwner(user.id);
  const [page, setPage] = useState<Page>("today");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [entry, setEntry] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState(false);
  const [pending, setPending] = useState(pendingCount());
  const [defaultsReady, setDefaultsReady] = useState(false);
  const [defaultsError, setDefaultsError] = useState<string | null>(null);
  const coursesQ = useCourses(), topicsQ = useTopics(), sessionsQ = useSessions(), examsQ = useExams(), planQ = usePlan(), testsQ = useTests(), mistakesQ = useMistakes(), preferencesQ = usePreferences();
  const courses = (coursesQ.data ?? []).filter(c => !c.archived), topics = topicsQ.data ?? [], sessions = sessionsQ.data ?? [], exams = examsQ.data ?? [], plan = planQ.data ?? [];
  const allQueries = [coursesQ, topicsQ, sessionsQ, examsQ, planQ, testsQ, mistakesQ, preferencesQ];
  const busy = !defaultsReady || allQueries.some(q => q.isPending);
  const queryError = allQueries.find(q => q.error)?.error;
  const error = defaultsError ?? (queryError instanceof Error ? queryError.message : queryError ? String(queryError) : null);
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
    const dark = localStorage.getItem("opk.theme") === "dark";
    document.documentElement.classList.toggle("dark", dark);
    const keys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); }
      if (e.key === "Escape") { setEntry(null); setSearch(false); setAdding(false); }
      if (!/input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? "") && !e.metaKey && !e.ctrlKey) {
        if (e.key.toLowerCase() === "n") setEntry("manual");
        if (e.key.toLowerCase() === "t") setPage("today");
      }
    };
    window.addEventListener("keydown", keys);
    return () => window.removeEventListener("keydown", keys);
  }, []);
  const go = (p: Page) => { setPage(p); setCourseId(null); };
  const selected = courses.find(c => c.id === courseId);
  const ke04 = courses.find(c => c.code === "KE04");
  const preferences = preferencesQ.data;

  if (!busy && !error && preferences && !preferences.onboarding_completed && ke04) {
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
    <LiquidGlass lensing as="aside" className="fixed inset-y-4 left-4 z-20 hidden w-60 flex-col rounded-3xl p-4 md:flex">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2 font-semibold"><span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground"><BookOpen size={20}/></span>Opintopäiväkirja</div>
      <nav aria-label="Päänavigaatio" className="space-y-1">{nav.map(({id,label,Icon}) => <button key={id} aria-current={page===id?"page":undefined} onClick={() => go(id)} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm ${page===id?"bg-accent font-semibold":"hover:bg-muted"}`}><Icon size={19}/>{label}</button>)}</nav>
      <button className="mt-6 min-h-11 rounded-xl bg-primary px-3 text-primary-foreground" onClick={() => setEntry("manual")}>+ Kirjaa opiskelu</button>
      <div className="mt-auto space-y-1"><button className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 hover:bg-muted" onClick={() => setSearch(true)}><Search size={19}/>Haku <kbd className="ml-auto text-xs">⌘ K</kbd></button><button className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 hover:bg-muted" onClick={() => go("settings")}><Settings2 size={19}/>Asetukset</button></div>
    </LiquidGlass>
    <main className="mx-auto max-w-[1240px] px-4 pb-28 pt-7 md:pl-[292px] md:pr-8 md:pb-12">
      <header className="mb-8 flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{longDate(today())}</p><h1 className="mt-1 text-3xl font-semibold">{selected?.code ?? (page==="today"?greeting():nav.find(n=>n.id===page)?.label ?? "Asetukset")}</h1></div><button aria-label="Haku" onClick={()=>setSearch(true)} className="grid size-11 place-items-center rounded-xl border md:hidden"><Search size={19}/></button></header>
      {pending>0 && <p role="status" className="mb-5 rounded-xl bg-accent p-3 text-sm">Tallennettu paikallisesti · {pending} muutosta synkataan yhteyden palattua.</p>}
      {error && <div role="alert" className="panel mb-5 p-4"><p className="font-medium">Tietojen lataus tai alustus epäonnistui.</p><p className="mt-1 text-sm text-muted-foreground">{String(error)}</p><button className="mt-2 underline" onClick={()=>{setDefaultsReady(false);setDefaultsError(null);void ensureKe04ForCurrentUser().then(()=>Promise.all([coursesQ.refetch(),topicsQ.refetch(),sessionsQ.refetch(),examsQ.refetch(),planQ.refetch(),testsQ.refetch(),mistakesQ.refetch(),preferencesQ.refetch()])).then(()=>setDefaultsReady(true)).catch(err=>{setDefaultsError(err instanceof Error?err.message:"Uudelleenyritys epäonnistui.");setDefaultsReady(true);});}}>Yritä uudelleen</button></div>}
      {busy ? <div className="space-y-4" aria-label="Ladataan"><div className="h-32 animate-pulse rounded-2xl bg-muted"/><div className="h-60 animate-pulse rounded-2xl bg-muted"/></div> :
      courses.length===0 ? <section className="panel p-6"><h2 className="text-xl font-semibold">Aloita ensimmäisestä kurssista</h2><p className="mt-2 text-muted-foreground">Lisää kurssi ja sen aiheet, jotta voit suunnitella ja kirjata opiskelua.</p><button onClick={()=>setAdding(true)} className="mt-5 min-h-11 rounded-xl bg-primary px-4 text-primary-foreground">Lisää kurssi</button></section> :
      page==="today" ? <TodayView courses={courses} topics={topics} sessions={sessions} exams={exams} plan={plan} tests={testsQ.data??[]} mistakes={mistakesQ.data??[]} onStart={setEntry} onGo={go}/> :
      page==="plan" ? <PlanView courses={courses} topics={topics} plan={plan} onStart={setEntry}/> :
      page==="courses" ? <CourseView courses={courses} topics={topics} sessions={sessions} exams={exams} plan={plan} tests={testsQ.data??[]} mistakes={mistakesQ.data??[]} selected={courseId} onSelect={setCourseId} onAdd={()=>setAdding(true)} onStart={()=>setEntry("manual")}/> :
      page==="exams" ? <ExamsView courses={courses} topics={topics} exams={exams} tests={testsQ.data??[]} mistakes={mistakesQ.data??[]} onCourse={id=>{setCourseId(id);setPage("courses");}}/> :
      page==="progress" ? <ProgressView courses={courses} topics={topics} sessions={sessions} plan={plan} onPlan={()=>go("plan")}/> :
      <SettingsView user={user}/>}
    </main>
    <LiquidGlass lensing as="nav" aria-label="Mobiilinavigaatio" className="fixed inset-x-3 bottom-3 z-20 flex h-[72px] items-center justify-around rounded-[25px] px-1 md:hidden">{[nav[0],nav[1]].map(({id,label,Icon})=><button key={id} aria-label={label} aria-current={page===id?"page":undefined} onClick={()=>go(id)} className={`grid min-h-11 min-w-12 place-items-center text-[10px] ${page===id?"text-primary":""}`}><Icon size={21}/>{label}</button>)}<button aria-label="Kirjaa opiskelu" onClick={()=>setEntry("manual")} className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground"><Plus/></button>{[nav[2],nav[4]].map(({id,label,Icon})=><button key={id} aria-label={label} aria-current={page===id?"page":undefined} onClick={()=>go(id)} className={`grid min-h-11 min-w-12 place-items-center text-[10px] ${page===id?"text-primary":""}`}><Icon size={21}/>{label}</button>)}</LiquidGlass>
    {entry && <SessionForm item={plan.find(p=>p.id===entry)??null} courses={courses} topics={topics} onClose={()=>setEntry(null)}/>}
    {adding && <CourseForm onClose={()=>setAdding(false)}/>}
    {search && <SearchPanel courses={courses} topics={topics} exams={exams} onClose={()=>setSearch(false)} onNavigate={p=>{go(p as Page);setSearch(false);}} onCourse={id=>{setCourseId(id);setPage("courses");setSearch(false);}} onLog={()=>{setSearch(false);setEntry("manual");}}/>}
    <Toaster richColors/>
  </div>;
}
