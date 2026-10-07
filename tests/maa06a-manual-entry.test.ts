import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { parseManualMaa06aCodes } from "../src/lib/maa06a-manual.ts";

test("manual MAA06A logger accepts textbook tasks missing from the teacher selection table", () => {
  assert.deepEqual(parseManualMaa06aCodes("2.15, 2.16 2.17", "textbook"), {
    codes: ["2.15", "2.16", "2.17"],
    invalid: [],
  });
});

test("manual MAA06A logger normalizes K/A/B review codes and removes duplicates", () => {
  assert.deepEqual(parseManualMaa06aCodes("k12, A5; b7 K12", "textbook_review"), {
    codes: ["K12", "A5", "B7"],
    invalid: [],
  });
});

test("manual MAA06A logger rejects impossible source formats instead of silently misfiling them", () => {
  assert.deepEqual(parseManualMaa06aCodes("2.15 K4 nope", "textbook"), {
    codes: ["2.15"],
    invalid: ["K4", "nope"],
  });
  assert.deepEqual(parseManualMaa06aCodes("1 15 16", "review_worksheet"), {
    codes: ["1", "15"],
    invalid: ["16"],
  });
});

test("MAA06A course UI exposes quick logging and search for arbitrary completed tasks", () => {
  const source = readFileSync("src/features/maa06a/Maa06aPanels.tsx", "utf8");
  assert.match(source, /Kirjaa itse tekemäsi tehtävät/);
  assert.match(source, /2\.15/);
  assert.match(source, /Hae esim\. 2\.15, K27 tai B7/);
  assert.match(source, /Nämä ovat ehdotuksia, eivät ainoa sallittu tehtävälista/);
});
