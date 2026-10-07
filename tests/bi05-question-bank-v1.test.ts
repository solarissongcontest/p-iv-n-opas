import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const bank = readFileSync(
  new URL("../supabase/migrations/20261007190300_bi05_question_bank_v1.sql", import.meta.url),
  "utf8",
);
const vocabulary = [1, 2, 3]
  .map((part) => readFileSync(
    new URL(`../supabase/migrations/20261007190${part - 1}00_bi05_core_vocabulary_${part}.sql`, import.meta.url),
    "utf8",
  ))
  .join("\n");

test("BI05 V1 bank maps exactly three curated concepts to every Iiris subchapter", () => {
  const mapSection = bank.match(/insert into _bi05_core_map\(code,canonical_name\) values([\s\S]*?);\n\nwith mapped/);
  assert.ok(mapSection);
  const rows = [...mapSection[1].matchAll(/\('(\d{1,2}\.\d+)'\s*,\s*'([^']+)'\)/g)];
  assert.equal(rows.length, 189);

  const perTopic = new Map<string, number>();
  for (const row of rows) perTopic.set(row[1]!, (perTopic.get(row[1]!) ?? 0) + 1);
  assert.equal(perTopic.size, 63);
  assert.ok([...perTopic.values()].every((count) => count === 3));
});

test("BI05 V1 bank is deterministic, LOPS21-scoped and protects chapter 5 from exams", () => {
  assert.match(bank, /'LOPS21','BI05'/);
  assert.match(bank, /'bi05-v1'/);
  assert.match(bank, /question_count<>630/);
  assert.match(bank, /chapter<>5,false,true/);
  assert.match(bank, /g\.chapter<>5,g\.chapter<>5,true/);
  assert.match(bank, /chapter 5 leaked into exam-eligible question bank/);
});

test("BI05 core vocabulary persists Iiris aliases and is protected by RLS", () => {
  assert.match(vocabulary, /create table if not exists public\.course_concepts/);
  assert.match(vocabulary, /enable row level security/);
  assert.match(vocabulary, /revoke all on table public\.course_concepts from anon/);
  assert.match(vocabulary, /'toimintajännite',ARRAY\['aktiopotentiaali','hermoimpulssi'\]/);
  assert.match(vocabulary, /'punasolu',ARRAY\['erytrosyytti'\]/);
  assert.match(vocabulary, /'rokotus',ARRAY\['aktiivinen immunisaatio'\]/);
});
