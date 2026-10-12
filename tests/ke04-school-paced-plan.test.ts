import test from "node:test";
import assert from "node:assert/strict";
import type { Course, Topic } from "../src/lib/domain.ts";
import { generatePlan } from "../src/lib/domain.ts";
import {
  generateCoursePlan,
  isKe04Psa2026Plan,
  KE04_PSA_2026_SCHOOL_SCHEDULE,
  KE04_PSA_2026_TOPIC_ANCHORS,
} from "../src/lib/ke04-school-plan.ts";

const COURSE_ID = "11111111-1111-4111-8111-111111111111";
const NAMES = [
  "1.1 Reaktioyhtälön kirjoittaminen ja tasapainottaminen",
  "1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto",
  "1.3 Reaktion rajoittava tekijä",
  "1.4 Kaasureaktioiden stoikiometria – ideaalikaasun tilanyhtälö",
  "2.1 Reaktiotyypit",
  "3.1 Substituutioreaktio",
  "3.2 Additio- ja eliminaatioreaktio",
  "3.3 Kondensaatio- ja hydrolyysireaktio",
  "4.1 Polymeerit ja polymeroitumisreaktiot",
  "4.2 Muovit ja tekokuidut ovat polymeerien ja lisäaineiden seoksia",
  "5.1 Hiilihydraatit",
  "5.2 Aminohapot ja proteiinit",
  "5.3 Nukleiinihapot",
  "5.4 Lipidit",
];
const WEIGHTS = [8, 18, 9, 8, 17, 5, 10, 10, 5, 3, 2, 2, 1, 2];

function topic(index: number): Topic {
  return {
    id: `22222222-2222-4222-8222-${String(index + 1).padStart(12, "0")}`,
    course_id: COURSE_ID,
    name: NAMES[index],
    position: index + 1,
    weight: WEIGHTS[index],
    importance: index < 5 ? 5 : 3,
    progress: index === 0 ? 17 : 0,
    verified_level: 0,
    self_level: 0,
    next_review: index === 0 ? "2026-10-07" : null,
    last_review: index === 0 ? "2026-10-06" : null,
    school_covered: index === 0,
    dependencies: [],
    basic_successes: 0,
    exam_successes: 0,
    delayed_successes: 0,
    retrieval_attempts: index === 0 ? 3 : 0,
    retrieval_failures: 0,
    mastery_uncertainty: 1,
    mastery_confidence: 0,
    evidence_count: 0,
    strong_evidence_count: 0,
    recall_strength: 0,
    application_strength: 0,
    retention_strength: 0,
    forgetting_risk: 0,
    exam_relevance: 0,
    learning_state_updated_at: null,
    last_retrieval_at: index === 0 ? "2026-10-06" : null,
    last_retrieval_result: index === 0 ? "independent" : null,
    last_retrieval_confidence: null,
    last_retrieval_difficulty: null,
  } as unknown as Topic;
}

function course(code = "KE04"): Course {
  return {
    id: COURSE_ID,
    code,
    name: code === "KE04" ? "Kemialliset reaktiot" : "Testikurssi",
    subject: "Kemia",
    start_date: "2026-10-05",
    exam_date: "2026-11-23",
    weekly_minutes: 195,
  } as unknown as Course;
}

function schoolPlan() {
  return generateCoursePlan({
    course: course(),
    topics: NAMES.map((_, index) => topic(index)),
    examDate: "2026-11-23",
    studyWeekdays: [2, 4, 5, 6, 7],
    weeklyMinutes: 195,
    fromISO: "2026-10-08",
  });
}

test("KE04 PSA 2026 schedule is selected only for the matching course run", () => {
  assert.equal(isKe04Psa2026Plan({ course: course(), examDate: "2026-11-23" }), true);
  assert.equal(isKe04Psa2026Plan({ course: course("KE05"), examDate: "2026-11-23" }), false);
  assert.equal(isKe04Psa2026Plan({ course: course(), examDate: "2027-11-23" }), false);
  assert.ok(KE04_PSA_2026_SCHOOL_SCHEDULE.some((event) => event.date === "2026-10-30" && event.topicKeys.includes("2.1")));
});

test("revised PSA anchors match the changed October-November school schedule", () => {
  assert.equal(KE04_PSA_2026_TOPIC_ANCHORS["1.3"]?.schoolDate, "2026-10-12");
  assert.equal(KE04_PSA_2026_TOPIC_ANCHORS["1.4"]?.schoolDate, "2026-10-14");
  assert.equal(KE04_PSA_2026_TOPIC_ANCHORS["3.1"]?.schoolDate, "2026-10-26");
  assert.equal(KE04_PSA_2026_TOPIC_ANCHORS["3.2"]?.schoolDate, "2026-11-02");
  assert.equal(KE04_PSA_2026_TOPIC_ANCHORS["3.3"]?.schoolDate, "2026-11-04");
  assert.equal(KE04_PSA_2026_TOPIC_ANCHORS["4.1"]?.schoolDate, "2026-11-06");

  const idealGasLab = KE04_PSA_2026_SCHOOL_SCHEDULE.find((event) => event.date === "2026-10-16");
  assert.equal(idealGasLab?.type, "lab");
  assert.match(idealGasLab?.label ?? "", /ideaalikaasun/i);
  const ketcherLab = KE04_PSA_2026_SCHOOL_SCHEDULE.find((event) => event.date === "2026-11-11");
  assert.equal(ketcherLab?.type, "lab");
  assert.match(ketcherLab?.label ?? "", /Ketcher/i);
});

test("autumn break is intentionally a seven-day KE04 study week", () => {
  const dates = new Set(schoolPlan().filter((item) => item.kind !== "exam").map((item) => item.date));
  for (const day of ["19", "20", "21", "22", "23", "24", "25"]) {
    assert.ok(dates.has(`2026-10-${day}`), `autumn-break date 2026-10-${day} should contain study work`);
  }
});

test("KE04 previews useful material without racing several school lessons ahead", () => {
  const topics = NAMES.map((_, index) => topic(index));
  const byId = new Map(topics.map((item) => [item.id, item]));
  const plan = generateCoursePlan({
    course: course(),
    topics,
    examDate: "2026-11-23",
    studyWeekdays: [2, 4, 5, 6, 7],
    weeklyMinutes: 195,
    fromISO: "2026-10-08",
  });

  const topicDates = (key: string) => plan
    .filter((item) => item.topic_id && byId.get(item.topic_id)?.name.startsWith(key))
    .map((item) => item.date)
    .sort();

  assert.ok(topicDates("2.1").some((date) => date === "2026-10-22"), "2.1 should be previewed during autumn break");
  assert.ok(topicDates("3.1").some((date) => date === "2026-10-20" || date === "2026-10-24"), "3.1 should be previewed before its 26.10 lesson");
  assert.ok(topicDates("3.2").every((date) => date >= "2026-10-31"), "3.2 must stay close to its 2.11 school lesson");
  assert.ok(topicDates("3.3").every((date) => date >= "2026-11-03"), "3.3 must stay close to its 4.11 school lesson");
  assert.ok(topicDates("4.1").every((date) => date >= "2026-11-05"), "4.1 must stay close to its 6.11 school lesson");
  assert.ok(topicDates("5.1").every((date) => date >= "2026-11-15"), "biomolecules must not be speed-run weeks early");
});

test("KE04 follows the new pre-break order instead of the obsolete lab schedule", () => {
  const plan = schoolPlan();
  const oct13 = plan.find((item) => item.date === "2026-10-13" && item.kind === "study");
  const oct15 = plan.find((item) => item.date === "2026-10-15" && item.kind === "study");
  const oct16 = plan.find((item) => item.date === "2026-10-16" && item.kind === "study");

  assert.match(oct13?.title ?? "", /1\.3|Rajoittava/);
  assert.match(oct15?.title ?? "", /1\.4|Kaasureaktiot/);
  assert.match(oct16?.title ?? "", /Ideaalikaasun/);
  assert.ok(!plan.some((item) => /saanto.*12\.10.*laboratorio/i.test(item.title)), "obsolete 12.10 yield-lab preview must be gone");
});

test("KE04 ends with a full mock exam, targeted review and the real exam", () => {
  const plan = schoolPlan();
  const mock = plan.find((item) => item.date === "2026-11-21" && item.kind === "test");
  const repair = plan.find((item) => item.date === "2026-11-22" && item.kind === "review");
  const exam = plan.find((item) => item.date === "2026-11-23" && item.kind === "exam");

  assert.ok(mock);
  assert.match(mock.title, /harjoituskoe/i);
  assert.ok(repair);
  assert.match(repair.title, /virheet|täsmäkertaus/i);
  assert.ok(exam);
});

test("other courses still use the generic planner unchanged", () => {
  const topics = NAMES.map((_, index) => topic(index));
  const opts = {
    course: course("KE05"),
    topics,
    examDate: "2026-11-23",
    studyWeekdays: [2, 4, 5, 6, 7],
    weeklyMinutes: 195,
    fromISO: "2026-10-08",
  };
  assert.deepEqual(generateCoursePlan(opts), generatePlan(opts));
});
