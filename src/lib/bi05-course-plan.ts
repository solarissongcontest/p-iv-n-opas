import type { PlanDraft, Topic } from "./domain.ts";
import type { CoursePlanOptions } from "./ke04-school-plan-core.ts";
import {
  BI05_EXAMS,
  BI05_IIRIS5_TOPICS,
  BI05_PROVISIONAL_EXAM_CHAPTERS,
} from "./bi05-iiris5.ts";
import { studyDatesBetween } from "./maa06a.ts";
import { today } from "./fi.ts";

const AUTUMN_BREAK_START = "2026-10-19";
const AUTUMN_BREAK_END = "2026-10-25";
const BI05_AUTUMN_BREAK_DATES = new Set(["2026-10-20", "2026-10-22", "2026-10-24"]);

export function isBi05TwoExamPlan(opts: Pick<CoursePlanOptions, "course">) {
  return opts.course.code.trim().toUpperCase() === "BI05" &&
    (!opts.course.start_date || opts.course.start_date === "2026-10-06");
}

function topicChapter(topic: Pick<Topic, "name">) {
  const match = /^(\d{1,2})\./.exec(topic.name.trim());
  return match ? Number(match[1]) : null;
}

function isAutumnBreak(date: string) {
  return date >= AUTUMN_BREAK_START && date <= AUTUMN_BREAK_END;
}

function bi05StudyDates(
  start: string,
  end: string,
  studyWeekdays: number[],
  busyDates: string[],
) {
  return studyDatesBetween(start, end, studyWeekdays, busyDates).filter((date) =>
    !isAutumnBreak(date) || BI05_AUTUMN_BREAK_DATES.has(date),
  );
}

function distribute(topics: Topic[], dates: string[]) {
  if (!topics.length || !dates.length) return [] as Array<{ topic: Topic; date: string }>;
  return topics.map((topic, index) => ({
    topic,
    date: dates[Math.min(dates.length - 1, Math.floor(index * dates.length / topics.length))]!,
  }));
}

function topicDraft(opts: CoursePlanOptions, topic: Topic, date: string): PlanDraft {
  const canonical = BI05_IIRIS5_TOPICS.find((row) => topic.name.startsWith(`${row.code} `));
  const known = Boolean(topic.school_covered || Number(topic.progress || 0) > 0 || topic.last_review);
  const estimate = canonical?.estimatedMinutes ?? 30;
  const target = Math.max(18, Math.min(24, Math.round(estimate * 0.55)));
  return {
    course_id: opts.course.id,
    topic_id: topic.id,
    date,
    phase: known ? "review" : "content",
    kind: known ? "review" : "study",
    title: `${isAutumnBreak(date) ? "Syysloma · " : ""}${topic.name}${known ? " – vahvistus" : ""}`,
    min_minutes: Math.min(15, target),
    target_minutes: target,
    extra_minutes: 0,
    start_time: null,
  };
}

function reviewDraft(courseId: string, date: string, title: string): PlanDraft {
  return {
    course_id: courseId,
    topic_id: null,
    date,
    phase: "review",
    kind: "review",
    title,
    min_minutes: 20,
    target_minutes: 40,
    extra_minutes: 0,
    start_time: null,
  };
}

function examDraft(courseId: string, date: string, title: string): PlanDraft {
  return {
    course_id: courseId,
    topic_id: null,
    date,
    phase: "exam",
    kind: "exam",
    title,
    min_minutes: 0,
    target_minutes: 0,
    extra_minutes: 0,
    start_time: null,
  };
}

/**
 * BI05 has two confirmed exam dates. The chapter split is explicitly provisional,
 * so this is exam-paced rather than school-paced: it never invents lesson dates.
 * Chapter 5 is excluded from both exams and therefore absent from exam preparation.
 * During autumn break BI05 uses Tue/Thu/Sat while MAA06A gets the alternating days,
 * preventing three live courses from piling onto every school-free day.
 */
export function generateBi05TwoExamPlan(opts: CoursePlanOptions): PlanDraft[] {
  const startISO = opts.fromISO ?? today();
  const byChapter = new Map<number, Topic[]>();
  for (const topic of [...opts.topics].sort((a, b) => a.position - b.position)) {
    const chapter = topicChapter(topic);
    if (!chapter) continue;
    byChapter.set(chapter, [...(byChapter.get(chapter) ?? []), topic]);
  }

  const phases = [
    {
      exam: BI05_EXAMS[0],
      chapters: BI05_PROVISIONAL_EXAM_CHAPTERS["exam-1"],
      contentStart: startISO,
      contentEnd: "2026-10-25",
      reviewDate: "2026-10-27",
    },
    {
      exam: BI05_EXAMS[1],
      chapters: BI05_PROVISIONAL_EXAM_CHAPTERS["exam-2"],
      contentStart: startISO > "2026-10-30" ? startISO : "2026-10-30",
      contentEnd: "2026-11-17",
      reviewDate: "2026-11-19",
    },
  ] as const;

  const drafts: PlanDraft[] = [];
  for (const phase of phases) {
    if (startISO > phase.exam.date) continue;
    const phaseTopics = phase.chapters.flatMap((chapter) => byChapter.get(chapter) ?? []);
    const dates = bi05StudyDates(
      phase.contentStart,
      phase.contentEnd,
      opts.studyWeekdays,
      opts.capacity?.busyDates ?? [],
    );
    for (const assignment of distribute(phaseTopics, dates)) {
      drafts.push(topicDraft(opts, assignment.topic, assignment.date));
    }
    if (phase.reviewDate >= startISO && phase.reviewDate < phase.exam.date) {
      drafts.push(reviewDraft(
        opts.course.id,
        phase.reviewDate,
        `${phase.exam.name} – sekakertaus ja heikoimmat koealueen kohdat`,
      ));
    }
    drafts.push(examDraft(opts.course.id, phase.exam.date, phase.exam.name));
  }
  return drafts.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}

export const BI05_AUTUMN_BREAK_STUDY_DATES = [...BI05_AUTUMN_BREAK_DATES];
