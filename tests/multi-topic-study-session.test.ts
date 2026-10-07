import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration = readFileSync(new URL("../supabase/migrations/20261007195500_multi_topic_study_sessions.sql", import.meta.url), "utf8");
const data = readFileSync(new URL("../src/lib/data.ts", import.meta.url), "utf8");
const form = readFileSync(new URL("../src/features/session/SessionForm.tsx", import.meta.url), "utf8");
const exam = readFileSync(new URL("../src/components/ExamSimulationV5.tsx", import.meta.url), "utf8");
const bi05 = readFileSync(new URL("../supabase/migrations/20261007184500_bi05_iiris5_multi_exam.sql", import.meta.url), "utf8");

test("one study session can link to multiple topics without duplicating session minutes", () => {
  assert.match(migration, /create table if not exists public\.study_session_topics/i);
  assert.match(migration, /create or replace function public\.log_multi_topic_study_session/i);
  assert.match(migration, /v_base_minutes := p_minutes \/ v_topic_count/);
  assert.match(migration, /v_remainder := p_minutes % v_topic_count/);
  assert.match(migration, /study_minutes = v_topic\.study_minutes \+ v_allocated/);
  assert.doesNotMatch(migration, /study_minutes = v_topic\.study_minutes \+ p_minutes/);
});

test("quick study logging exposes and submits a multi-topic selection", () => {
  assert.match(data, /topic_ids\?: string\[\]/);
  assert.match(data, /log_multi_topic_study_session/);
  assert.match(data, /p_topic_ids: multiTopicIds/);
  assert.match(form, /selectedTopicIds/);
  assert.match(form, /type="checkbox"/);
  assert.match(form, /topic_ids: selectedTopicIds/);
  assert.match(form, /Opiskeluaika kirjataan vain kerran ja jaetaan valittujen kappaleiden kesken/);
});

test("question bank loading is large enough for KE04 and BI05 together", () => {
  assert.match(data, /\.limit\(5000\)/);
});

test("exam simulation drafts are bound to the exact exam", () => {
  assert.match(data, /exam_id: string \| null/);
  assert.match(data, /exam_id: input\.exam_id \?\? null/);
  assert.match(exam, /row\.exam_id===\(nextExam\?\.id\?\?null\)/);
  assert.match(exam, /exam_id:nextExam\?\.id\?\?null/);
});

test("BI05 exam relevance remains within the database 0..1 contract", () => {
  const matches = bi05.match(/case when b\.exam_eligible then 1 else 0 end/g) ?? [];
  assert.equal(matches.length, 2);
  assert.doesNotMatch(bi05, /greatest\(1, b\.importance\)/);
});
