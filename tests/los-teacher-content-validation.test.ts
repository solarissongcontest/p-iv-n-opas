import test from "node:test";
import assert from "node:assert/strict";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { LOS1_L004_TEACHER } from "../src/features/los/teacher/lessonL004.ts";

test("L004's full scripted teaching material has internally consistent references", () => {
  assert.deepEqual(validateTeacherLesson(LOS1_L004_TEACHER), []);
});

test("rejects duplicate teaching-scene IDs and missing assessed questions", () => {
  const scenes = LOS1_L004_TEACHER.scenes.map(item => ({ ...item }));
  scenes[1] = { ...scenes[1]!, id: scenes[0]!.id };
  const issues = validateTeacherLesson({ ...LOS1_L004_TEACHER, scenes,
    requiredQuestionIds: [...LOS1_L004_TEACHER.requiredQuestionIds, "missing-question"] });
  assert.ok(issues.some(issue => issue.location === "scenes"));
  assert.ok(issues.some(issue => issue.location === "requiredQuestionIds"));
});

test("rejects a textbook link that cannot open a real book section", () => {
  const scenes = LOS1_L004_TEACHER.scenes.map(item =>
    item.kind === "book" ? { ...item, bookLinks: [
      { label: "Kirja", instruction: "Avaa", chapterId: "01", section: "not-a-section" },
    ] } : item);
  const issues = validateTeacherLesson({ ...LOS1_L004_TEACHER, scenes });
  assert.ok(issues.some(issue => issue.problem.includes("Oppikirjaviite")));
});

test("requires an unambiguous answer and a feedback strategy", () => {
  const scenes = LOS1_L004_TEACHER.scenes.map(item =>
    item.id === "recall" ? { ...item, question: {
      ...item.question!, correctOption: "missing", genericWrong: "",
    } } : item);
  const issues = validateTeacherLesson({ ...LOS1_L004_TEACHER, scenes });
  assert.ok(issues.some(issue => issue.problem.includes("Monivalinnassa")));
  assert.ok(issues.some(issue => issue.problem.includes("korjaava palaute")));
});

test("no book task may be counted unless its content ID matches the expected format", () => {
  const issues = validateTeacherLesson({
    ...LOS1_L004_TEACHER,
    requiredPracticeIds: ["C01-EX-01", "bad-book-task"],
  });
  assert.ok(issues.some(issue => issue.location === "requiredPracticeIds"));
});
