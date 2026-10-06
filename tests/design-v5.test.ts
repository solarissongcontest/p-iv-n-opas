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

test("V5 feature styles load after legacy layout styles", () => {
  const root = read("src/routes/__root.tsx");
  const order = ["layoutsCss", "surfacesCss", "todayCss", "plannerCss"];
  for (const name of order) assert.ok(root.includes(name), name);
  for (let index = 1; index < order.length; index += 1) {
    assert.ok(root.indexOf(order[index - 1]!) < root.indexOf(order[index]!));
  }
});
