import type { TeacherLesson } from "./engine.ts";
import { getLosFutureTeacherLesson } from "./futureTeacherAdapter.ts";
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
export function getLosTeacherLesson(id: string): TeacherLesson | undefined {
  return c06Lessons.find(lesson => lesson.id === id) ?? getEarlierLesson(id) ?? getLosFutureTeacherLesson(id);
}
