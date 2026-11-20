import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L001_TEACHER } from "../src/features/los/teacher/lessonL001.ts";
import { LOS1_L004_TEACHER } from "../src/features/los/teacher/lessonL004.ts";

test("L004 activates prior L001 knowledge before teaching new daytime greetings", () => {
  const prior = LOS1_L001_TEACHER.scenes.flatMap(s => s.paragraphs).join(" ");
  assert.match(prior, /Hallo!/);
  assert.match(prior, /Danke!/);
  assert.match(prior, /Tschüss!/);
  const recall = LOS1_L004_TEACHER.scenes.find(s => s.id === "recall")!;
  assert.deepEqual(recall.question?.options.map(option => option.label), ["Danke!", "Hallo!", "Tschüss!"]);
  assert.equal(recall.question?.correctOption, "b");
  const taught = LOS1_L004_TEACHER.scenes.find(s => s.id === "situations")!;
  assert.match(taught.paragraphs.join(" "), /Guten Morgen!/);
  assert.match(taught.paragraphs.join(" "), /Guten Abend!/);
});
