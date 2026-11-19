import type { TeacherLesson } from "./engine.ts";
import {canonicalizeLosTeacherLesson} from "./canonicalTeacherLessons.ts";
import { getLosTeacherLesson as getEarlierLesson } from "./lessonL004.ts";
import { LOS1_L031_TEACHER } from "./lessonL031.ts";
import { LOS1_L032_TEACHER } from "./lessonL032.ts";
import { LOS1_L033_TEACHER } from "./lessonL033.ts";
import { LOS1_L034_TEACHER } from "./lessonL034.ts";
import { LOS1_L035_TEACHER } from "./lessonL035.ts";

/** Single shared Teacher 2.0 lookup. Never modify another session's lesson manuscript. */
const c06Lessons: readonly TeacherLesson[] = [
  LOS1_L031_TEACHER, LOS1_L032_TEACHER, LOS1_L033_TEACHER,
  LOS1_L034_TEACHER, LOS1_L035_TEACHER,
];
/** Historical authored manuscript lookup for regression tests and audit only.
 * Never use this method to present the student's live lessons, as it contains
 * references to former textbook editions. All UI uses getLosTeacherLesson.
 */
export function getOriginalLosTeacherLesson(id: string): TeacherLesson | undefined {
  return c06Lessons.find(lesson => lesson.id === id) ?? getEarlierLesson(id);
}
/** Runtime always binds the original authored teaching to the current textbook. */
export function getLosTeacherLesson(id: string): TeacherLesson | undefined {
  const original=getOriginalLosTeacherLesson(id);
  return original?canonicalizeLosTeacherLesson(original):undefined;
}
