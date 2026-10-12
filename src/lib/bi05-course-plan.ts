import type { PlanDraft, Topic } from "./domain.ts";
import type { CoursePlanOptions } from "./ke04-school-plan-core.ts";
import {
  BI05_CHAPTERS,
  BI05_EXAMS,
  BI05_EXAM_CHAPTERS,
} from "./bi05-iiris5.ts";
import { studyDatesBetween } from "./maa06a.ts";
import { today } from "./fi.ts";

const AUTUMN_BREAK_START = "2026-10-19";
const AUTUMN_BREAK_END = "2026-10-25";
const BI05_AUTUMN_BREAK_DATES = new Set([
  "2026-10-19",
  "2026-10-20",
  "2026-10-21",
  "2026-10-22",
  "2026-10-23",
  "2026-10-24",
  "2026-10-25",
]);

const BI05_EXAM1_REVIEW_BLOCKS = [
  { date: "2026-10-15", title: "BI05 koe 1 – luvut 1–3: aktiivinen palautus + käsitteet", minutes: 30 },
  { date: "2026-10-16", title: "BI05 koe 1 – luku 4 + luvut 1–4 sekakertaus", minutes: 35 },
  { date: "2026-10-17", title: "BI05 koe 1 – heikot kohdat: luvut 1–4", minutes: 30 },
  { date: "2026-10-18", title: "BI05 koe 1 – hermosolun rakenne + käsitteet", minutes: 30, topicCode: "3.1" },
  { date: "2026-10-20", title: "Syysloma · BI05 koe 1 – luku 7: aktiivinen palautus", minutes: 35 },
  { date: "2026-10-21", title: "Syysloma · BI05 koe 1 – sydämen rakenne + veren kulkureitti", minutes: 40, topicCode: "7.2" },
  { date: "2026-10-22", title: "Syysloma · BI05 koe 1 – hermosolun rakenne: nimeä osat ja yhdistä toimintaan", minutes: 35, topicCode: "3.1" },
  { date: "2026-10-23", title: "Syysloma · BI05 koe 1 – koko koealueen aktiivinen palautus: luvut 1–4 ja 7", minutes: 45 },
  { date: "2026-10-24", title: "Syysloma · BI05 koe 1 – heikot kohdat + käsitteet", minutes: 40 },
  { date: "2026-10-25", title: "Syysloma · BI05 koe 1 – harjoituskoe: 10 monivalintaa + 5 käsitettä + 2 × 10 p tehtävää", minutes: 75 },
] as const;

type Bi05PlanChapter = {
  number: number;
  title: string;
  subchapterCodes: string[];
  subchapterCount: number;
  knownRatio: number;
  schoolCoveredRatio: number;
};

export function isBi05TwoExamPlan(opts: Pick<CoursePlanOptions, "course">) {
  return opts.course.code.trim().toUpperCase() === "BI05" &&
    (!opts.course.start_date || opts.course.start_date === "2026-10-06");
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
  const busy = new Set(busyDates);
  const normal = studyDatesBetween(start, end, studyWeekdays, busyDates).filter((date) => !isAutumnBreak(date));
  const holiday = [...BI05_AUTUMN_BREAK_DATES].filter((date) => date >= start && date <= end && !busy.has(date));
  return [...new Set([...normal, ...holiday])].sort();
}

function topicCode(topic: Pick<Topic, "name">) {
  return topic.name.trim().match(/^(\d{1,2}\.\d+)/)?.[1] ?? null;
}

function canonicalChapters(opts: CoursePlanOptions, chapters: readonly number[]): Bi05PlanChapter[] {
  const topicsByCode = new Map<string, Topic>();
  for (const topic of opts.topics) {
    const code = topicCode(topic);
    if (code) topicsByCode.set(code, topic);
  }
  const wanted = new Set<number>(chapters);
  return BI05_CHAPTERS
    .filter((chapter) => wanted.has(chapter.number))
    .map((chapter) => {
      const codes = chapter.subchapters.map((subchapter) => subchapter.code);
      const matching = codes.map((code) => topicsByCode.get(code)).filter((topic): topic is Topic => Boolean(topic));
      const known = matching.filter((topic) => Number(topic.progress || 0) >= 10 || topic.last_review).length;
      const schoolCovered = matching.filter((topic) => topic.school_covered).length;
      return {
        number: chapter.number,
        title: chapter.title,
        subchapterCodes: codes,
        subchapterCount: codes.length,
        knownRatio: matching.length ? known / matching.length : 0,
        schoolCoveredRatio: matching.length ? schoolCovered / matching.length : 0,
      };
    });
}

function distribute<T>(items: T[], dates: string[]) {
  if (!items.length || !dates.length) return [] as Array<{ item: T; date: string }>;
  if (items.length === 1) return [{ item: items[0]!, date: dates[0]! }];
  return items.map((item, index) => ({
    item,
    date: dates[Math.round(index * (dates.length - 1) / (items.length - 1))]!,
  }));
}

function chapterMinutes(chapter: Bi05PlanChapter, date: string) {
  const base = chapter.subchapterCount >= 6 ? 45 : chapter.subchapterCount >= 4 ? 35 : 30;
  // On school-free holiday days the chapter block also contains a short recall
  // warm-up from earlier chapters. This replaces a separate second BI05 task.
  return isAutumnBreak(date) ? base + 10 : base;
}

function chapterDraft(opts: CoursePlanOptions, chapter: Bi05PlanChapter, date: string): PlanDraft {
  const reviewOnly = chapter.knownRatio >= 0.6 || chapter.schoolCoveredRatio >= 0.6;
  const first = chapter.subchapterCodes[0];
  const last = chapter.subchapterCodes[chapter.subchapterCodes.length - 1];
  const range = first && last ? ` (${first}–${last})` : "";
  const holidayRecall = isAutumnBreak(date) ? " + lyhyt aiemman aktiivinen palautus" : "";
  const target = chapterMinutes(chapter, date);
  return {
    course_id: opts.course.id,
    // BI05 school pace is chapter-level. A single subchapter id here would make
    // Practice incorrectly scope the whole block to only one child topic.
    topic_id: null,
    date,
    phase: reviewOnly ? "review" : "content",
    kind: reviewOnly ? "review" : "study",
    title: `${isAutumnBreak(date) ? "Syysloma · " : ""}Luku ${chapter.number}: ${chapter.title}${range}${holidayRecall}${reviewOnly ? " – vahvistus" : ""}`,
    min_minutes: Math.min(20, target),
    target_minutes: target,
    extra_minutes: 0,
    start_time: null,
  };
}

function topicIdForCode(opts: CoursePlanOptions, code: string | undefined) {
  if (!code) return null;
  return opts.topics.find((topic) => topicCode(topic) === code)?.id ?? null;
}

function reviewDraft(opts: CoursePlanOptions, date: string, title: string, minutes = 40, topicCodeValue?: string): PlanDraft {
  return {
    course_id: opts.course.id,
    topic_id: topicIdForCode(opts, topicCodeValue),
    date,
    phase: "review",
    kind: "review",
    title,
    min_minutes: Math.min(20, minutes),
    target_minutes: minutes,
    extra_minutes: 0,
    start_time: null,
  };
}

function examDraft(courseId: string, date: string, title: string, startTime: string | null = null): PlanDraft {
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
    start_time: startTime,
  };
}

/**
 * BI05 follows the teacher's real classroom granularity: roughly one major
 * textbook chapter per lesson, not one lesson per numbered subchapter. Child
 * topics remain the mastery/practice unit, while Planner uses the major chapter
 * as the default learning block.
 *
 * Exam 1 is now teacher-confirmed as chapters 1–4 and 7. Chapters 1–3 have
 * already been covered at school, so Planner does not re-teach them as new
 * content. It verifies them with retrieval, concepts and mixed practice instead.
 * Exam 2's chapter split remains provisional.
 */
export function generateBi05TwoExamPlan(opts: CoursePlanOptions): PlanDraft[] {
  const startISO = opts.fromISO ?? today();
  const phases = [
    {
      exam: BI05_EXAMS[0],
      chapters: BI05_EXAM_CHAPTERS["exam-1"],
      contentStart: startISO,
      // Put the two genuinely new exam-1 chapters at opposite ends of the
      // pre-holiday runway: chapter 4 next, chapter 7 at the start of break.
      contentEnd: "2026-10-19",
      preExamReviews: [
        { date: "2026-10-26", title: "BI05 koe 1 – harjoituskokeen virheet ja epävarmat asiat", minutes: 35 },
        { date: "2026-10-27", title: "BI05 koe 1 – sekaharjoittelu + 5 käsitteen minikoe", minutes: 30 },
        { date: "2026-10-28", title: "BI05 koe 1 – kevyt viimeistely: sydän, hermosolu, käsitteet ja monivalinnat", minutes: 25 },
      ],
    },
    {
      exam: BI05_EXAMS[1],
      chapters: BI05_EXAM_CHAPTERS["exam-2"],
      contentStart: startISO > "2026-10-30" ? startISO : "2026-10-30",
      contentEnd: "2026-11-17",
      preExamReviews: [
        { date: "2026-11-15", title: "BI05 koe 2 – aktiivinen palautus: luvut 9–12", minutes: 30 },
        { date: "2026-11-17", title: "BI05 koe 2 – luvut 13–14 ja heikot kohdat", minutes: 20 },
        { date: "2026-11-19", title: "BI05 koe 2 – kevyt koko koealueen viimeistely", minutes: 20 },
      ],
    },
  ] as const;

  const drafts: PlanDraft[] = [];
  for (const phase of phases) {
    if (startISO > phase.exam.date) continue;
    const allPhaseChapters = canonicalChapters(opts, phase.chapters);
    // School coverage is not mastery, but it does mean "do not teach this from
    // scratch again". Those chapters re-enter through the fixed retrieval blocks.
    const phaseChapters = phase.exam.key === "exam-1"
      ? allPhaseChapters.filter((chapter) => chapter.schoolCoveredRatio < 0.6)
      : allPhaseChapters;
    const dates = bi05StudyDates(
      phase.contentStart,
      phase.contentEnd,
      opts.studyWeekdays,
      opts.capacity?.busyDates ?? [],
    );
    const assignments = distribute(phaseChapters, dates);
    const chapterDates = new Set(assignments.map((assignment) => assignment.date));

    for (const assignment of assignments) {
      drafts.push(chapterDraft(opts, assignment.item, assignment.date));
    }

    if (phase.exam.key === "exam-1") {
      for (const block of BI05_EXAM1_REVIEW_BLOCKS) {
        if (
          block.date >= startISO &&
          block.date < phase.exam.date &&
          !chapterDates.has(block.date) &&
          !(opts.capacity?.busyDates ?? []).includes(block.date)
        ) {
          drafts.push(reviewDraft(opts, block.date, block.title, block.minutes, "topicCode" in block ? block.topicCode : undefined));
        }
      }
    }

    for (const review of phase.preExamReviews) {
      if (review.date >= startISO && review.date < phase.exam.date && !(opts.capacity?.busyDates ?? []).includes(review.date)) {
        drafts.push(reviewDraft(opts, review.date, review.title, review.minutes));
      }
    }
    drafts.push(examDraft(opts.course.id, phase.exam.date, phase.exam.name, phase.exam.key === "exam-1" ? "08:00" : null));
  }
  return drafts.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}

export const BI05_AUTUMN_BREAK_STUDY_DATES = [...BI05_AUTUMN_BREAK_DATES];
