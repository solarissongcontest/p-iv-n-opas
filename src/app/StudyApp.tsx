import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { toast, Toaster } from "sonner";
import { AICoach } from "@/components/AICoach";
import { AppShell } from "@/app/AppShell";
import { coachTriggerLabel, studyNav, type StudyPage } from "@/app/navigation";
import { isoWeekFromDate } from "@/features/planner/routeDate";
import { ensureKe04ForCurrentUser, useCourses, useExams, useMistakes, usePlan, usePracticeAttempts, usePreferences, useSessions, useTests, useTopics } from "@/lib/data";
import { longDate, greeting, today } from "@/lib/fi";
import { CourseView, ExamsView, ProgressView, TodayView, PlanView, SettingsView, type CourseTab, type ProgressSection } from "@/components/StudyViews";
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
    throw new Error(payload.error ?? "Laitteen kirjautumisen käyttöönotto epäonnistui.");
  }
  storeDeviceSession({
    accessToken: payload.access_token,
    userId: payload.user_id,
    expiresAt: payload.expires_at,
  });
  return { id: payload.user_id };
}


export function StudyAppRoot({ initialPage, courseCode, courseTab, examId, progressSection, planMode, planAnchor }: { initialPage: StudyPage; courseCode?: string; courseTab?:CourseTab; examId?:string; progressSection?:ProgressSection; planMode?:"päivä"|"viikko"|"kuukausi"; planAnchor?:string }) {
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

  useEffect(() => {
    if (!user) return;

    let active = true;
    const verifyCanonicalOwner = () => {
      if (document.visibilityState !== "visible") return;
      const previousOwnerId = getDeviceOwnerId() ?? user.id;
      void getArthurSession(previousOwnerId)
        .then((canonicalUser) => {
          if (!active || canonicalUser.id === user.id) return;
          queryClient.clear();
          setUser(canonicalUser);
        })
        .catch(() => {
          // Keep the current cached session. A later focus/online startup retries.
        });
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") verifyCanonicalOwner();
    };
    window.addEventListener("focus", verifyCanonicalOwner);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      active = false;
      window.removeEventListener("focus", verifyCanonicalOwner);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [queryClient, user]);

  if (user === undefined) return <main className="grid min-h-screen place-items-center">Avataan opintopäiväkirjaa…</main>;
  if (!user) return <DeviceSignIn authError={authError} onSignedIn={setUser} />;
  return <StudyApp key={user.id + ":" + initialPage + ":" + (courseCode ?? "") + ":" + (courseTab ?? "") + ":" + (examId ?? "") + ":" + (progressSection ?? "") + ":" + (planMode ?? "") + ":" + (planAnchor ?? "")} user={user} initialPage={initialPage} courseCode={courseCode} courseTab={courseTab} examId={examId} progressSection={progressSection} planMode={planMode} planAnchor={planAnchor} />;
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

function StudyApp({ user, initialPage, courseCode, courseTab, examId, progressSection, planMode, planAnchor }: { user: DeviceUser; initialPage: StudyPage; courseCode?: string; courseTab?:CourseTab; examId?:string; progressSection?:ProgressSection; planMode?:"päivä"|"viikko"|"kuukausi"; planAnchor?:string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  setOfflineOwner(user.id);
  const page = initialPage;
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
    let refreshing = false;
    const refresh = async () => {
      if (refreshing || document.visibilityState !== "visible" || !navigator.onLine) return;
      refreshing = true;
      try {
        // Cross-device source of truth is Supabase. Force every currently
        // mounted study query to re-read it instead of trusting a warm PWA cache.
        await queryClient.refetchQueries({ type: "active" });
      } finally {
        refreshing = false;
      }
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    const onOnline = () => void refresh();

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    window.addEventListener("online", onOnline);

    // iOS installed PWAs can stay foregrounded for a long time without
    // producing a reliable focus event. A restrained foreground refresh keeps
    // phone and computer values convergent without turning the UI into polling soup.
    const timer = window.setInterval(() => void refresh(), 30_000);
    void refresh();

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
      window.removeEventListener("online", onOnline);
      window.clearInterval(timer);
    };
  }, [queryClient, user.id]);
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

  useEffect(() => {
    const stop = subscribePending(setPending);
    const sync = startSyncWatcher(n => {
      toast.success(`Synkronoitiin ${n} merkintää.`);
      // Offline writes may have changed sessions, plan state, mastery and
      // recovery scheduling. Re-read all active views after the queue commits.
      void queryClient.refetchQueries({ type: "active" });
    });
    return () => { stop(); sync(); };
  }, [queryClient, user.id]);
  const go = (target: StudyPage) => {
    localStorage.setItem("opk.last-page", target);
    setMoreOpen(false);
    switch (target) {
      case "today": void navigate({ to: "/today" }); break;
      case "plan": void navigate({ to: "/plan" }); break;
      case "courses": void navigate({ to: "/studies" }); break;
      case "practice": void navigate({ to: "/practice" }); break;
      case "progress": void navigate({ to: "/progress" }); break;
      case "exams": void navigate({ to: "/exams" }); break;
      case "settings": void navigate({ to: "/settings" }); break;
    }
  };

  const goCourse = (id: string) => {
    const target = courses.find((course) => course.id === id);
    setMoreOpen(false);
    if (!target) {
      void navigate({ to: "/studies" });
      return;
    }
    void navigate({
      to: "/studies/$courseCode",
      params: { courseCode: target.code.toLowerCase() },
    });
  };

  useEffect(() => {
    if (!courseCode) {
      setCourseId(null);
      return;
    }
    const match = courses.find((course) => course.code.toLowerCase() === courseCode.toLowerCase());
    setCourseId(match?.id ?? null);
  }, [courseCode, courses]);

  useEffect(() => {
    applyTheme(storedThemeIsDark());
    const keys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); }
      if (e.key === "Escape") { setEntry(null); setSearch(false); setAdding(false); setMoreOpen(false); }
      if (!/input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? "") && !e.metaKey && !e.ctrlKey) {
        if (e.key.toLowerCase() === "n") setEntry("manual");
        if (e.key.toLowerCase() === "t") go("today");
      }
    };
    window.addEventListener("keydown", keys);
    return () => window.removeEventListener("keydown", keys);
  }, []);
  const selected = courses.find(c => c.id === courseId);
  const pageTitle =
    selected?.code ??
    (page==="today" ? greeting() : studyNav.find(n=>n.id===page)?.label ?? (page==="exams" ? "Kokeet" : "Asetukset"));
  const pageEyebrow =
    selected?.name ??
    (page==="today" ? longDate(today()) :
      page==="plan" ? "Aikataulu ja kuormitus" :
      page==="courses" ? "Kurssit ja osaaminen" :
      page==="practice" ? "Yksi tehtävä kerrallaan" :
      page==="progress" ? "Osaaminen ja seuraavat tarpeet" :
      page==="exams" ? "Kokeisiin valmistautuminen" :
      "Sovelluksen asetukset");
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

  const contextualCoach = !busy && !error && !entry && !adding && !search && !moreOpen && page !== "settings" ? (
    <AICoach
      data={{ courses, topics, sessions, exams, plan, mistakes: mistakesQ.data ?? [] }}
      selectedCourseId={courseId}
      weekdays={preferences?.study_weekdays ?? [1, 2, 3, 4, 5]}
      triggerLabel={coachTriggerLabel(page)}
      onLog={() => setEntry("manual")}
      onPractice={() => go("practice")}
    />
  ) : null;

  return <>
    <AppShell
      page={page}
      pageTitle={pageTitle}
      pageEyebrow={pageEyebrow}
      moreOpen={moreOpen}
      onMoreOpenChange={setMoreOpen}
      onNavigate={go}
      onLog={() => { setMoreOpen(false); setEntry("manual"); }}
      onSearch={() => { setMoreOpen(false); setSearch(true); }}
      contextualAction={contextualCoach}
    >
      {pending>0 && <p role="status" className="mb-5 rounded-xl bg-accent p-3 text-sm">Tallennettu paikallisesti · {pending} muutosta synkronoidaan yhteyden palattua.</p>}
      {error && <div role="alert" className="panel mb-5 p-4"><p className="font-medium">{pending>0?"Kaikkea ei voitu vielä synkronoida.":"Tietojen lataus tai alustus epäonnistui."}</p>{pending>0&&<p className="mt-1 text-sm text-muted-foreground">Syöttämäsi tiedot ovat tallessa tässä laitteessa ja synkronoidaan yhteyden palattua.</p>}<p className="mt-1 text-sm text-muted-foreground">{String(error)}</p><button className="mt-2 underline" onClick={()=>{setDefaultsReady(false);setDefaultsError(null);void ensureKe04ForCurrentUser().then(()=>Promise.all([coursesQ.refetch(),topicsQ.refetch(),sessionsQ.refetch(),examsQ.refetch(),planQ.refetch(),testsQ.refetch(),attemptsQ.refetch(),mistakesQ.refetch(),preferencesQ.refetch()])).then(()=>setDefaultsReady(true)).catch(err=>{setDefaultsError(err instanceof Error?err.message:"Uudelleenyritys epäonnistui.");setDefaultsReady(true);});}}>Yritä uudelleen</button></div>}

      <section className={`page-content page-content-${page}`} data-page={page}>
        {busy ? (showSkeleton ? <div className="space-y-4" aria-label="Ladataan"><div className="h-32 animate-pulse rounded-2xl bg-muted"/><div className="h-60 animate-pulse rounded-2xl bg-muted"/></div> : null) :
        courses.length===0 ? <section className="panel p-6"><h2 className="text-xl font-semibold">Aloita ensimmäisestä kurssista</h2><p className="mt-2 text-muted-foreground">Lisää kurssi ja sen aiheet, jotta voit suunnitella ja kirjata opiskelua.</p><button onClick={()=>setAdding(true)} className="mt-5 min-h-11 rounded-xl bg-primary px-4 text-primary-foreground">Lisää kurssi</button></section> :
        page==="today" ? <TodayView courses={courses} topics={topics} sessions={sessions} exams={exams} plan={plan} tests={testsQ.data??[]} attempts={attemptsQ.data??[]} mistakes={mistakesQ.data??[]} capacity={capacity} onStart={setEntry} onGo={go}/> :
        page==="plan" ? <PlanView
          courses={courses}
          topics={topics}
          plan={plan}
          tests={testsQ.data??[]}
          mistakes={mistakesQ.data??[]}
          attempts={attemptsQ.data??[]}
          capacity={capacity}
          onStart={setEntry}
          initialMode={planMode}
          initialAnchor={planAnchor}
          onPeriodChange={(mode,anchor)=>{
            if(mode==="päivä") void navigate({to:"/plan/day/$date",params:{date:anchor}});
            else if(mode==="viikko") void navigate({to:"/plan/week/$week",params:{week:isoWeekFromDate(anchor)}});
            else void navigate({to:"/plan/month/$month",params:{month:anchor.slice(0,7)}});
          }}
        /> :
        page==="courses" ? <CourseView
          courses={courses}
          topics={topics}
          sessions={sessions}
          exams={exams}
          plan={plan}
          tests={testsQ.data??[]}
          mistakes={mistakesQ.data??[]}
          selected={courseId}
          initialTab={courseTab}
          onTabChange={(tab)=>{
            const current=courses.find(course=>course.id===courseId);
            if(!current)return;
            const code=current.code.toLowerCase();
            if(tab==="Yleiskuva") void navigate({to:"/studies/$courseCode",params:{courseCode:code}});
            else if(tab==="Sisältö") void navigate({to:"/studies/$courseCode/content",params:{courseCode:code}});
            else if(tab==="Historia") void navigate({to:"/studies/$courseCode/history",params:{courseCode:code}});
            else void navigate({to:"/studies/$courseCode/analysis",params:{courseCode:code}});
          }}
          onSelect={(id)=>id?goCourse(id):go("courses")}
          onAdd={()=>setAdding(true)}
          onStart={()=>setEntry("manual")}
        /> :
        page==="practice" ? <PracticeView courses={courses} topics={topics} attempts={attemptsQ.data??[]} tests={testsQ.data??[]} mistakes={mistakesQ.data??[]}/> :
        page==="exams" ? <ExamsView
          courses={courses}
          topics={topics}
          exams={exams}
          tests={testsQ.data??[]}
          attempts={attemptsQ.data??[]}
          mistakes={mistakesQ.data??[]}
          sessions={sessions}
          plan={plan}
          onCourse={goCourse}
          initialExamId={examId}
          onExamChange={(id)=>id?void navigate({to:"/exams/$examId",params:{examId:id}}):void navigate({to:"/exams"})}
        /> :
        page==="progress" ? <ProgressView
          courses={courses}
          topics={topics}
          attempts={attemptsQ.data??[]}
          sessions={sessions}
          plan={plan}
          exams={exams}
          mistakes={mistakesQ.data??[]}
          capacity={capacity}
          section={progressSection}
          onSectionChange={(section)=>{
            if(section==="summary") void navigate({to:"/progress"});
            else if(section==="mastery") void navigate({to:"/progress/mastery"});
            else void navigate({to:"/progress/analysis"});
          }}
          onPlan={()=>go("plan")}
        /> :
        <SettingsView user={user}/>}
      </section>
    </AppShell>

    {entry && <SessionForm item={plan.find(p=>p.id===entry)??null} courses={courses} topics={topics} sessions={sessions} attempts={attemptsQ.data??[]} onClose={()=>setEntry(null)}/>}
    {adding && <CourseForm onClose={()=>setAdding(false)}/>}
    {search && <SearchPanel courses={courses} topics={topics} exams={exams} sessions={sessions} onClose={()=>setSearch(false)} onNavigate={p=>{go(p as StudyPage);setSearch(false);}} onCourse={id=>{goCourse(id);setSearch(false);}} onLog={()=>{setSearch(false);setEntry("manual");}}/>}
    <Toaster richColors/>
  </>;
}
