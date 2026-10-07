import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const v1 = readFileSync(
  new URL("../supabase/migrations/20261007190300_bi05_question_bank_v1.sql", import.meta.url),
  "utf8",
);
const v2 = readFileSync(
  new URL("../supabase/migrations/20261007190400_bi05_question_bank_v2.sql", import.meta.url),
  "utf8",
);

test("BI05 V1 writes PostgreSQL arrays to array columns instead of JSON", () => {
  assert.match(v1, /array\[topic_name,canonical_name\]::text\[\]/i);
  assert.match(v1, /array_prepend\(canonical_name,aliases\)::text\[\]/i);
  assert.match(v1, /array\[g\.topic_name,g\.correct\]::text\[\]/i);
  assert.match(v1, /'\{\}'::text\[\],'\{\}'::text\[\]/);
  assert.doesNotMatch(v1, /jsonb_build_array\(topic_name,canonical_name\),to_jsonb\(array_prepend/);
});

test("BI05 V2 retires the recall-heavy bank and activates exactly 630 balanced tasks", () => {
  assert.match(v2, /seed_version='bi05-v1'/);
  assert.match(v2, /set status='retired'/);
  assert.match(v2, /'bi05-v2'/);
  assert.match(v2, /active_count<>630/);

  for (const family of [
    "recall",
    "recognition",
    "multiple_choice",
    "matching",
    "compare",
    "error_detection",
    "source_analysis",
    "concept_map",
    "synthesis",
    "transfer_or_research",
  ]) assert.match(v2, new RegExp(`'${family}'`));
});

test("BI05 V2 includes visual, source-analysis, transfer and research practice while keeping chapter 5 out of exams", () => {
  assert.match(v2, /'concept_map','explanation'.*?'diagram'/s);
  assert.match(v2, /'source_analysis','application'/);
  assert.match(v2, /'transfer_or_research','application'/);
  assert.match(v2, /array\[5,6,7,8,9,11\]/);
  assert.match(v2, /research_count<>27/);
  assert.match(v2, /diagram_count<>63/);
  assert.match(v2, /matching_count<>63/);
  assert.match(v2, /application_count<>126/);
  assert.match(v2, /chapter<>5,\(reserve_for_exam and chapter<>5\)/);
  assert.match(v2, /chapter 5 leaked into exam bank/);
});

test("BI05 V2 keeps long answers source-grounded and research prompts non-invasive", () => {
  assert.match(v2, /Älä lisää sellaista yhtäläisyyttä tai syy-yhteyttä, jota määritelmät eivät tue/);
  assert.match(v2, /turvallinen ja ei-invasiivinen koulututkimus/);
  assert.match(v2, /ei saa edellyttää lääkityksen muuttamista, biologisten näytteiden ottamista tai muuta terveydellistä riskiä/);
  assert.match(v2, /sourceScope','Iiris 5 käsiteluettelo'/);
});