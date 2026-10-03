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


test("Today keeps one obvious next action and hides load controls behind disclosure", () => {
  const today = read("src/features/today/TodayView.tsx");
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

test("final release workflow is valid on push and does not require Gemini", () => {
  const workflow = read(".github/workflows/iphone-e2e.yml");
  assert.equal(workflow.includes("${{ inputs."), false);
  assert.match(workflow, /github\.event\.inputs\.base_url/);
  assert.match(workflow, /REQUIRE_GEMINI: "false"/);
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
