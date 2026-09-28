import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, ChartNoAxesCombined, FlaskConical, Home, Plus, Search, Settings2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { LiquidGlass } from "@/components/LiquidGlass";
import { useCourses, useExams, useMistakes, usePlan, useSessions, useTests, useTopics } from "@/lib/data";
import { longDate, greeting, today } from "@/lib/fi";
import { CourseView, ExamsView, ProgressView, TodayView, PlanView, SettingsView } from "@/components/StudyViews";
import { CourseForm, SessionForm, SearchPanel } from "@/components/StudyDialogs";
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

function App() {
  const [user, setUser] = useState<User | null | undefined>();
  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data }) => { if (active) setUser(data.user); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { if (active) setUser(session?.user ?? null); });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  if (user === undefined) return <main className="grid min-h-screen place-items-center">Avataan opintopäiväkirjaa…</main>;
  if (!user) return <SignIn />;
  return <StudyApp user={user} />;
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  return <main className="grid min-h-screen place-items-center p-4"><section className="panel w-full max-w-md space-y-5 p-8">
    <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground"><BookOpen /></div>
    <h1 className="text-3xl font-semibold">Opintopäiväkirja</h1>
    <p className="text-muted-foreground">Suunnittele opiskelu ja seuraa omaa kehitystäsi.</p>
    {sent ? <p role="status" className="rounded-xl bg-accent p-4">Kirjautumislinkki lähetettiin osoitteeseen {email}. Avaa linkki tällä laitteella.</p> :
      <form onSubmit={async e => { e.preventDefault(); setBusy(true); const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } }); setBusy(false); if (error) toast.error(error.message); else setSent(true); }} className="space-y-3">
        <label htmlFor="email" className="block text-sm font-medium">Sähköposti</label>
        <input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl border bg-surface px-3 py-3" />
        <button disabled={busy} className="min-h-11 w-full rounded-xl bg-primary px-4 text-primary-foreground">{busy ? "Lähetetään…" : "Lähetä kirjautumislinkki"}</button>
      </form>}
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
  const coursesQ = useCourses(), topicsQ = useTopics(), sessionsQ = useSessions(), examsQ = useExams(), planQ = usePlan(), testsQ = useTests(), mistakesQ = useMistakes();
  const courses = (coursesQ.data ?? []).filter(c => !c.archived), topics = topicsQ.data ?? [], sessions = sessionsQ.data ?? [], exams = examsQ.data ?? [], plan = planQ.data ?? [];
  const busy = [coursesQ, topicsQ, sessionsQ, examsQ, planQ].some(q => q.isPending);
  const error = [coursesQ, topicsQ, sessionsQ, examsQ, planQ].find(q => q.error)?.error;
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
      {error && <div role="alert" className="panel mb-5 p-4">Tietojen lataus epäonnistui. Tarkista yhteys. <button className="underline" onClick={()=>{void coursesQ.refetch();void topicsQ.refetch();void sessionsQ.refetch();void examsQ.refetch();void planQ.refetch();}}>Yritä uudelleen</button></div>}
      {busy ? <div className="space-y-4" aria-label="Ladataan"><div className="h-32 animate-pulse rounded-2xl bg-muted"/><div className="h-60 animate-pulse rounded-2xl bg-muted"/></div> :
      courses.length===0 ? <section className="panel p-6"><h2 className="text-xl font-semibold">Aloita ensimmäisestä kurssista</h2><p className="mt-2 text-muted-foreground">Lisää kurssi ja sen aiheet, jotta voit suunnitella ja kirjata opiskelua.</p><button onClick={()=>setAdding(true)} className="mt-5 min-h-11 rounded-xl bg-primary px-4 text-primary-foreground">Lisää kurssi</button></section> :
      page==="today" ? <TodayView courses={courses} topics={topics} sessions={sessions} exams={exams} plan={plan} onStart={setEntry} onGo={go}/> :
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
