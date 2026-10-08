import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const chart = readFileSync(new URL("../src/features/progress/ProgressTrajectoryChart.tsx", import.meta.url), "utf8");
const progressCard = readFileSync(new URL("../src/features/progress/PlanAdherenceCard.tsx", import.meta.url), "utf8");
const courseView = readFileSync(new URL("../src/features/studies/CourseView.tsx", import.meta.url), "utf8");
const engine = readFileSync(new URL("../src/lib/progress-trajectory.ts", import.meta.url), "utf8");
const migration = readFileSync(new URL("../supabase/migrations/20261007184746_progress_trajectory_history.sql", import.meta.url), "utf8");

test("shared chart exposes the complete progress UX", () => {
  assert.match(chart, /Eteneminen/);
  assert.match(chart, /Työmäärä/);
  assert.match(chart, /Osaaminen/);
  assert.match(chart, /TÄNÄÄN/);
  assert.match(chart, /Päivittäin/);
  assert.match(chart, /Koko kurssi/);
  assert.match(chart, /Suunnitelman muutos/);
  assert.match(chart, /Edellinen päivä/);
  assert.match(chart, /Seuraava päivä/);
  assert.match(chart, /Historia säilyttää sen suunnitelman/);
});

test("Progress and Course Analysis use one canonical trajectory component", () => {
  assert.match(progressCard, /ProgressTrajectoryChart/);
  assert.match(courseView, /ProgressTrajectoryChart/);
  assert.match(courseView, /course-analysis-v2/);
  assert.match(progressCard, /Kurssit yhdellä vilkaisulla/);
});

test("trajectory engine consumes immutable plan events instead of rewriting history", () => {
  assert.match(engine, /PlanItemEvent/);
  assert.match(engine, /stateAtDate/);
  assert.match(engine, /revisionsByDate/);
  assert.match(engine, /completed_at/);
  assert.doesNotMatch(engine, /weeklyStudySeries/);
});

test("database migration provides canonical completion time and immutable RLS history", () => {
  assert.match(migration, /add column if not exists completed_at timestamptz/);
  assert.match(migration, /create table if not exists public\.plan_item_events/);
  assert.match(migration, /enable row level security/);
  assert.match(migration, /grant select on table public\.plan_item_events to authenticated/);
  assert.match(migration, /security definer/);
  assert.match(migration, /plan_items_capture_history/);
  assert.match(migration, /study_sessions_plan_item_id_idx/);
});
