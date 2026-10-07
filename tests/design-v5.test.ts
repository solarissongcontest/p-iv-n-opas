import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("V5 navigation keeps the four recurring mobile destinations permanently reachable", () => {
  const navigation = read("src/app/navigation.ts");
  const shell = read("src/app/AppShell.tsx");

  assert.match(navigation, /mobilePrimaryNav/);
  assert.match(navigation, /studyNav\[0\]/);
  assert.match(navigation, /studyNav\[1\]/);
  assert.match(navigation, /studyNav\[2\]/);
  assert.match(navigation, /studyNav\[4\]/);
  assert.match(shell, /mobilePrimaryNav\.map/);
  assert.match(shell, /!grid-cols-5/);
  assert.match(shell, /<b>Harjoittelu<\/b>/);
  assert.match(shell, /<b>Kokeet<\/b>/);
});

test("V5 content uses a small canonical surface vocabulary", () => {
  const surfaces = read("src/components/surfaces/index.tsx");
  const styles = read("src/styles/surfaces.css");

  for (const component of [
    "PrimaryCard",
    "SectionCard",
    "MetricGroup",
    "Metric",
    "DataList",
    "DataRow",
    "StatusBadge",
    "InlineNotice",
    "Disclosure",
    "EmptyState",
  ]) assert.ok(surfaces.includes(`function ${component}`), component);

  for (const selector of [
    ".study-card-primary",
    ".study-card-section",
    ".study-metric-group",
    ".study-data-list",
    ".study-status",
    ".study-inline-notice",
    ".study-disclosure",
    ".study-empty-state",
  ]) assert.ok(styles.includes(selector), selector);
});

test("Today V5 preserves one dominant next action and separates context from support", () => {
  const today = read("src/features/today/TodayView.tsx");
  const styles = read("src/styles/today.css");

  assert.match(today, /today-v5-dashboard/);
  assert.match(today, /<PrimaryCard[^>]*title="Seuraavaksi"/);
  assert.match(today, /today-v5-context/);
  assert.match(today, /title="Tänään"/);
  assert.match(today, /title="Seuraava koe"/);
  assert.match(today, /title="Tämä viikko"/);
  assert.match(today, /<Disclosure summary="Miksi tätä ehdotetaan\?"/);
  assert.match(today, /<Disclosure summary="Muuta tämän päivän kuormaa"/);
  assert.match(styles, /grid-template-columns: minmax\(0, 1\.75fr\) minmax\(16\.5rem, 0\.8fr\)/);
  assert.match(styles, /@media \(max-width: 767px\)/);
});

test("Planner V5 puts the calendar before planning-engine detail", () => {
  const planner = read("src/features/planner/PlanView.tsx");
  const styles = read("src/styles/planner.css");

  assert.match(planner, /planner-v5-toolbar/);
  assert.match(planner, /planner-v5-summary/);
  assert.match(planner, /planner-v5-calendar/);
  assert.match(planner, /planner-v5-inspector/);
  assert.ok(planner.indexOf("planner-v5-calendar") < planner.indexOf("planner-v5-inspector"));
  assert.match(planner, /title=\{periodTitle\}/);
  assert.match(planner, /Kapasiteetti kunnossa/);
  assert.match(styles, /planner-v5 \.planner-week-grid/);
  assert.match(styles, /grid-template-columns: repeat\(7, minmax\(0, 1fr\)\)/);
  assert.match(styles, /min-width: 42rem/);
});

test("Studies V5 removes the permanent nested course sidebar and restores real content groups", () => {
  const course = read("src/features/studies/CourseView.tsx");
  const styles = read("src/styles/studies.css");

  assert.match(course, /course-detail-split/);
  assert.match(styles, /\.course-detail-sidebar\s*\{\s*display: none !important/);
  assert.match(styles, /\.course-overview > \.panel/);
  assert.match(styles, /border: 1px solid var\(--study-card-border\) !important/);
  assert.match(styles, /\.course-library-rows/);
});

test("Practice V5 becomes a bounded focus workspace once a session starts", () => {
  const practice = read("src/features/practice/PracticeView.tsx");
  const styles = read("src/styles/practice.css");

  assert.match(practice, /"setup"\|"active"\|"summary"/);
  assert.match(practice, /practice-focus-toolbar/);
  assert.match(practice, /practice-question-flow/);
  assert.match(styles, /\.practice-session-active \.practice-primary-surface/);
  assert.match(styles, /\.practice-session-active \.practice-support-grid/);
  assert.match(styles, /\.practice-question-flow/);
});

test("Progress V5 makes plan adherence a native first-class summary insight", () => {
  const progress = read("src/features/progress/ProgressView.tsx");
  const adherence = read("src/features/progress/PlanAdherenceCard.tsx");
  const styles = read("src/styles/progress.css");

  assert.match(progress, /<PlanAdherenceCard sessions=\{sessions\} plan=\{plan\}\/>/);
  assert.match(progress, /progress-summary-only/);
  assert.match(progress, /Hyvin hallussa/);
  assert.match(progress, /Kannattaa kerrata/);
  assert.match(progress, /Seuraava koe/);
  assert.match(adherence, /title="Suunnitelmassa pysyminen"/);
  assert.match(adherence, /ReferenceLine y=\{100\}/);
  assert.match(adherence, /8 viikon toteutumisaste/);
  assert.match(styles, /\.progress-v5-adherence-chart/);
  assert.match(styles, /\.progress-v5-heat-grid/);
});

test("Exams and Settings V5 restore intentional grouped surfaces", () => {
  const exams = read("src/styles/exams.css");
  const settings = read("src/styles/settings.css");

  assert.match(exams, /\.exam-list > button\.panel/);
  assert.match(exams, /border: 1px solid var\(--border\) !important/);
  assert.match(exams, /\.exams-view:not\(\.exam-list\) > \.panel/);
  assert.match(settings, /\.settings-view > \.panel/);
  assert.match(settings, /\.settings-section-tabs/);
  assert.match(settings, /@media \(max-width: 767px\)/);
});

test("Search and coach use the shared V5 overlay language", () => {
  const dialog = read("src/features/shared/DialogPrimitives.tsx");
  const search = read("src/features/search/SearchPanel.tsx");
  const overlays = read("src/styles/overlays.css");

  assert.match(dialog, /dialog-backdrop/);
  assert.match(dialog, /dialog-surface/);
  assert.match(search, /search-group-title/);
  assert.match(search, /search-result/);
  assert.match(overlays, /\.search-group/);
  assert.match(overlays, /\.coach-dialog/);
  assert.match(overlays, /@media \(max-width: 767px\)/);
});

test("V5 feature styles load after legacy layout styles", () => {
  const root = read("src/routes/__root.tsx");
  const order = [
    "layoutsCss",
    "surfacesCss",
    "todayCss",
    "plannerCss",
    "studiesCss",
    "progressCss",
    "practiceCss",
    "examsCss",
    "settingsCss",
    "overlaysCss",
  ];
  for (const name of order) assert.ok(root.includes(name), name);
  for (let index = 1; index < order.length; index += 1) {
    assert.ok(root.indexOf(order[index - 1]!) < root.indexOf(order[index]!));
  }
});
