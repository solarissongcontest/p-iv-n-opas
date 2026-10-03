import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Structure V4 uses real routes for the primary product surfaces", () => {
  for (const path of [
    "src/routes/today.tsx",
    "src/routes/plan/index.tsx",
    "src/routes/studies/index.tsx",
    "src/routes/practice/index.tsx",
    "src/routes/progress/index.tsx",
    "src/routes/exams/index.tsx",
    "src/routes/settings/index.tsx",
  ]) {
    assert.match(read(path), /createFileRoute/);
  }

  assert.match(read("src/routes/index.tsx"), /redirect\(\{ to: "\/today" \}\)/);
});

test("planner course progress settings exam and practice state have addressable deep links", () => {
  for (const path of [
    "src/routes/plan/day/$date.tsx",
    "src/routes/plan/week/$week.tsx",
    "src/routes/plan/month/$month.tsx",
    "src/routes/studies/$courseCode.tsx",
    "src/routes/studies/$courseCode/content.tsx",
    "src/routes/studies/$courseCode/history.tsx",
    "src/routes/studies/$courseCode/analysis.tsx",
    "src/routes/practice/$courseCode/$topicId.tsx",
    "src/routes/progress/mastery.tsx",
    "src/routes/progress/analysis.tsx",
    "src/routes/exams/$examId.tsx",
    "src/routes/settings/study.tsx",
    "src/routes/settings/notifications.tsx",
    "src/routes/settings/app.tsx",
  ]) {
    assert.match(read(path), /StudyAppRoot/);
  }
});

test("large UI monoliths are compatibility barrels rather than implementations", () => {
  const views = read("src/components/StudyViews.tsx");
  const practice = read("src/components/PracticeView.tsx");
  const dialogs = read("src/components/StudyDialogs.tsx");

  assert.equal(views.includes("function TodayView"), false);
  assert.equal(views.includes("function ProgressView"), false);
  assert.match(views, /features\/today\/TodayView/);
  assert.match(views, /features\/progress\/ProgressView/);

  assert.equal(practice.includes("function PracticeView"), false);
  assert.match(practice, /features\/practice\/PracticeView/);

  assert.equal(dialogs.includes("function SessionForm"), false);
  assert.match(dialogs, /features\/session\/SessionForm/);
});

test("mobile shell only reserves coach clearance when the coach exists", () => {
  const shell = read("src/app/AppShell.tsx");
  const styles = read("src/styles/shell.css");
  assert.match(shell, /app-main-has-context-action/);
  assert.match(styles, /\.app-main-has-context-action/);
  assert.match(styles, /\+ 1\.75rem/);
});

test("app shell centralizes navigation bottom interaction zone and accessible mobile sheet", () => {
  const shell = read("src/app/AppShell.tsx");
  const navigation = read("src/app/navigation.ts");
  assert.match(navigation, /primaryStudyNav/);
  assert.match(navigation, /desktopPlanningNav/);
  assert.match(shell, />Lisää<\/span>/);
  assert.match(shell, /Suunnitelma<\/b>/);
  assert.match(shell, /Kokeet<\/b>/);
  assert.match(shell, /BottomInteractionZone/);
  assert.match(shell, /bottom-context-action/);
  assert.match(shell, /aria-label="Mobiilinavigaatio"/);
  assert.match(shell, /role="dialog"/);
  assert.match(shell, /event\.key === "Escape"/);
  assert.match(shell, /previous\?\.focus\(\)/);
});

test("practice is a bounded setup active summary flow", () => {
  const practice = read("src/features/practice/PracticeView.tsx");
  assert.match(practice, /"setup"\|"active"\|"summary"/);
  assert.match(practice, /Aloita harjoittelu/);
  assert.match(practice, /Harjoittelu valmis tältä erää/);
  assert.match(practice, /practice-focus-toolbar/);
});

test("desktop workspace recenters on ultrawide displays", () => {
  const shell = read("src/styles/shell.css");
  assert.match(shell, /margin-left: max\(17rem, calc\(50vw \+ 8\.5rem - 720px\)\)/);
  assert.match(shell, /margin-right: auto/);
});

test("styles are layered and responsive page families remain explicit", () => {
  const root = read("src/routes/__root.tsx");
  for (const layer of ["foundationsCss", "glassCss", "shellCss", "layoutsCss"]) {
    assert.ok(root.includes(layer), layer);
  }

  const layouts = read("src/styles/layouts.css");
  for (const token of [
    ".layout-action-dashboard",
    ".layout-planner",
    ".layout-library-detail",
    ".layout-focus",
    ".layout-insights",
    ".bottom-interaction-zone",
    ".course-detail-split",
    ".progress-section-tabs",
    ".settings-section-tabs",
  ]) {
    assert.ok(layouts.includes(token), token);
  }
});


test("course Continue opens the next planned item before falling back to manual logging", () => {
  const app = read("src/app/StudyApp.tsx");
  const course = read("src/features/studies/CourseView.tsx");
  assert.match(app, /const continueCourse = \(id: string \| null\)/);
  assert.match(app, /setEntry\(nextItem\?\.id \?\? "manual"\)/);
  assert.match(app, /onStart=\{\(\)=>continueCourse\(courseId\)\}/);
  assert.match(course, />Aloita seuraava<\/button>/);
});

test("destructive actions use in-app confirmation and course archive is undoable", () => {
  const course = read("src/features/studies/CourseView.tsx");
  const settings = read("src/features/settings/SettingsView.tsx");
  assert.equal(course.includes("window.confirm"), false);
  assert.equal(settings.includes("window.confirm"), false);
  assert.match(course, /title="Arkistoi kurssi"/);
  assert.match(course, /label:"Kumoa"/);
  assert.match(settings, /title="Unohda tämä laite"/);
});

test("Progress and course detail keep advanced analysis secondary", () => {
  const progress = read("src/features/progress/ProgressView.tsx");
  const course = read("src/features/studies/CourseView.tsx");
  const onboarding = read("src/components/Onboarding.tsx");
  assert.match(progress, /Hyvin hallussa/);
  assert.match(progress, /Kannattaa kerrata/);
  assert.match(progress, /Seuraava koe/);
  assert.match(course, /Tarkempi analyysi/);
  assert.match(onboarding, /Useimpina päivinä sinun tarvitsee vain avata Tänään ja painaa Aloita\./);
});

test("settings keep the learning engine behind advanced disclosure", () => {
  const settings = read("src/features/settings/SettingsView.tsx");
  assert.match(settings, /title="Suunnittelutapa"/);
  assert.match(settings, /Sovellus ehdottaa, minä hyväksyn/);
  assert.match(settings, /Lisäasetukset · oppimismoottori/);
  assert.match(settings, /settings-notifications-only" title="Hiljaiset tunnit"/);
  assert.match(settings, /settings-notifications-only" title="Taustamuistutukset"/);
});

test("simplified mobile navigation still keeps Practice directly reachable", () => {
  const shell = read("src/app/AppShell.tsx");
  const today = read("src/features/today/TodayView.tsx");
  assert.match(shell, /<b>Harjoittelu<\/b>/);
  assert.match(today, />Harjoittele<\/b>/);
  assert.match(today, /onGo\("practice"\)/);
});

test("Today never uses browser prompts for missed-study handling", () => {
  const today = read("src/features/today/TodayView.tsx");
  assert.equal(today.includes("window.prompt"), false);
  assert.match(today, /title="En ehdi tänään"/);
  assert.match(today, /Siirrä seuraavaan sopivaan päivään/);
});

test("Today keeps one obvious next action and hides load controls behind disclosure", () => {
  const today = read("src/features/today/TodayView.tsx");
  assert.ok(today.indexOf('title="Seuraavaksi"') < today.indexOf('title="Tervetuloa takaisin"'));
  assert.ok(today.indexOf('title="Seuraavaksi"') < today.indexOf('title={mode.finalStretch'));
  assert.match(today, /title="Seuraavaksi"/);
  assert.match(today, /Miksi tätä ehdotetaan\?/);
  assert.match(today, /Muuta tämän päivän kuormaa/);
  assert.equal(today.includes("Suosituksen varmuus:"), false);
  assert.equal(today.includes("Seuraava ehdotus"), false);
});

test("planner uses calendar-safe month movement and avoids browser prompts", () => {
  const planner = read("src/features/planner/PlanView.tsx");
  const fi = read("src/lib/fi.ts");
  const calendar = read("src/features/planner/PlannerCalendar.tsx");
  assert.match(fi, /export function addMonths/);
  assert.match(planner, /addMonths\(anchor,direction\)/);
  assert.equal(planner.includes("window.prompt"), false);
  assert.equal(planner.includes('prompt("Uusi päivä'), false);
  assert.match(calendar, /planner-month-weekdays/);
  assert.match(calendar, /mondayOffset/);
});

test("final release workflow keeps the production identity wait and fails fast on Vercel rejection", () => {
  const workflow = read(".github/workflows/iphone-e2e.yml");
  assert.match(workflow, /INPUT_BASE_URL: \$\{\{ github\.event\.inputs\.base_url/);
  assert.match(workflow, /Wait for this exact commit to reach production/);
  assert.match(workflow, /\/api\/release-info/);
  assert.match(workflow, /statuses: read/);
  assert.match(workflow, /VERCEL_STATE/);
  assert.match(workflow, /Vercel deployment status is/);
  assert.match(workflow, /Failing immediately instead of polling stale production/);
  assert.match(workflow, /REQUIRE_GEMINI: "false"/);
});

test("planner writes use optimistic concurrency and offline conflicts cannot block sync forever", () => {
  const data = read("src/lib/data.ts");
  const offline = read("src/lib/offline.ts");
  const planner = read("src/features/planner/PlanView.tsx");
  const today = read("src/features/today/TodayView.tsx");
  const migration = read("supabase/migrations/20261003190500_plan_item_concurrency.sql");
  assert.match(data, /expected_updated_at/);
  assert.match(data, /expected_status/);
  assert.match(data, /expected_target_minutes/);
  assert.match(data, /\.eq\("date", p\.from\)/);
  assert.match(data, /SYNC_CONFLICT:/);
  assert.match(planner, /expected_updated_at:shiftTarget\.updated_at/);
  assert.match(today, /expected_updated_at:next\.updated_at/);
  assert.match(offline, /conflicts \+= 1/);
  assert.match(offline, /continue;/);
  assert.match(migration, /before update on public\.plan_items/);
});

test("offline queue survives malformed storage and deduplicates operation ids", () => {
  const offline = read("src/lib/offline.ts");
  assert.match(offline, /Array\.isArray\(parsed\)/);
  assert.match(offline, /seen\.has\(candidate\.id\)/);
  assert.match(offline, /items\.some\(\(item\) => item\.id === id\)/);
});

test("long-lived PWA notices a local calendar day rollover even while offline", () => {
  const app = read("src/app/StudyApp.tsx");
  assert.match(app, /dayRef = useRef\(today\(\)\)/);
  assert.match(app, /nextDay !== dayRef\.current/);
  assert.match(app, /setDayRevision/);
  const dayCheck = app.indexOf("const nextDay = today()");
  const networkGuard = app.indexOf("!navigator.onLine", dayCheck);
  assert.ok(dayCheck >= 0 && networkGuard > dayCheck);
});

test("device session refreshes immediately when the network returns", () => {
  const app = read("src/app/StudyApp.tsx");
  assert.match(app, /addEventListener\("online", verifyCanonicalOwner\)/);
  assert.match(app, /removeEventListener\("online", verifyCanonicalOwner\)/);
});

test("AI coach keeps provider diagnostics out of the normal student UI", () => {
  const coach = read("src/components/AICoach.tsx");
  assert.match(coach, /Tekoälyohjaus ei ole juuri nyt käytettävissä\./);
  assert.match(coach, /Paikallinen ohjaus käytössä/);
  assert.equal(coach.includes("Gemini-avain hylättiin"), false);
  assert.equal(coach.includes("Gemini hylkäsi yhteyspyynnön"), false);
});

test("raw backend errors never render in the normal app shell", () => {
  const app = read("src/app/StudyApp.tsx");
  assert.equal(app.includes("{String(error)}"), false);
  assert.match(app, /Tietoja ei saatu ladattua\. Yritä uudelleen\./);
  assert.match(app, /Verkkoyhteyttä ei ole\./);
});

test("PWA worker registers for every user and updates only after explicit approval", () => {
  const root = read("src/routes/__root.tsx");
  const prompt = read("src/components/PwaUpdatePrompt.tsx");
  const sw = read("public/sw.js");
  const shell = read("src/styles/shell.css");
  assert.match(root, /<PwaUpdatePrompt \/>/);
  assert.match(prompt, /serviceWorker[\s\S]*\.register\("\/sw\.js"/);
  assert.match(prompt, /Päivitä nyt/);
  assert.match(prompt, /SKIP_WAITING/);
  assert.match(sw, /event\.data\?\.type === "SKIP_WAITING"/);
  assert.match(shell, /body:has\(\.exam-simulation-running\) \.pwa-update-prompt/);
});

test("core study data has an owner-scoped IndexedDB fallback for cold offline starts", () => {
  const snapshots = read("src/lib/offlineSnapshot.ts");
  const data = read("src/lib/data.ts");
  const settings = read("src/features/settings/SettingsView.tsx");
  assert.match(snapshots, /indexedDB\.open/);
  assert.match(snapshots, /ownerId/);
  assert.match(snapshots, /isNetworkFailure/);
  assert.match(data, /offlineQuery\("courses", listCourses\)/);
  assert.match(data, /offlineQuery\("plan", listPlan\)/);
  assert.match(data, /offlineQuery\("preferences", getPreferences\)/);
  assert.match(settings, /clearOfflineSnapshots\(\)/);
});

test("service worker caches only pinned study-editor CDN dependencies", () => {
  const sw = read("public/sw.js");
  assert.match(sw, /rich-text-editor@8\.13\.0/);
  assert.match(sw, /mathjax@3\.2\.2/);
  assert.match(sw, /isApprovedStudyCdnAsset/);
  assert.match(sw, /url\.pathname\.startsWith\("\/rich-text-editor@8\.13\.0\/"\)/);
  assert.match(sw, /url\.pathname\.startsWith\("\/npm\/mathjax@3\.2\.2\/"\)/);
  assert.equal(sw.includes('url.origin === "https://unpkg.com" || true'), false);
});

test("service worker supports offline cold starts without caching API responses", () => {
  const sw = read("public/sw.js");
  assert.match(sw, /addEventListener\("install"/);
  assert.match(sw, /addEventListener\("activate"/);
  assert.match(sw, /addEventListener\("fetch"/);
  assert.match(sw, /request\.mode === "navigate"/);
  assert.match(sw, /url\.pathname\.startsWith\("\/api\/"\)/);
  assert.match(sw, /candidate\.origin === self\.location\.origin/);
});

test("active practice suppresses competing app chrome", () => {
  const layouts = read("src/styles/layouts.css");
  assert.match(layouts, /:has\(\.practice-session-active\)/);
});

test("planned study sessions and running exams suppress competing chrome", () => {
  const app = read("src/app/StudyApp.tsx");
  const session = read("src/features/session/SessionForm.tsx");
  const exam = read("src/components/ExamSimulationV5.tsx");
  const layouts = read("src/styles/layouts.css");

  assert.match(app, /presentation="focus"/);
  assert.match(session, /study-session-focus/);
  assert.ok(exam.includes('"exam-simulation exam-simulation-"+phase'));
  assert.match(exam, /Lopeta koe/);
  assert.match(layouts, /:has\(\.exam-simulation-running\)/);
  assert.match(layouts, /\.study-session-focus/);
});
