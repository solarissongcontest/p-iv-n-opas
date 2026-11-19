import {LOS1_EXECUTABLE_LESSONS,los1LessonDraftChapter} from "./guidedLessons.ts";
import {getLosTeacherLesson} from "./teacher/lessonRegistry.ts";
import {teacherSessionNeedsReview} from "./teacher/engine.ts";
import type {LosChapterDraft} from "./studyState.ts";
import type {LosResumeRecommendation} from "./losResumeRecommendation.ts";

/**
 * Teacher 2.0's own continuation is intentionally independent of the retired
 * guided runner's lessonProgress. A historical guided completion never grants
 * Teacher 2.0 completion or skips instruction.
 */
export function recommendLosTeacherResume(
 drafts:Readonly<Record<string,LosChapterDraft>>,
):LosResumeRecommendation {
 const records=LOS1_EXECUTABLE_LESSONS.map(item=>{
  const lesson=getLosTeacherLesson(item.id);
  const session=drafts[los1LessonDraftChapter(item.id)]?.teacherSessions?.[item.id];
  const current=Boolean(lesson&&session&&!teacherSessionNeedsReview(session,lesson));
  const completed=Boolean(current&&session?.completedAt);
  const started=Boolean(session&&(
   session.visitedIds.length>0||session.attempts.length>0||
   session.activityIds.length>0||session.completedAt||
   (session.draftAnswers&&Object.keys(session.draftAnswers).length>0)
  ));
  return {id:item.id,session,completed,started,
   time:started?Date.parse(session?.updatedAt??""):NaN};
 });
 const completed=records.filter(item=>item.completed).length;
 if(completed===records.length)
  return {lessonId:"L001",completed,available:records.length,action:"review"};
 const active=records.filter(item=>item.started&&!item.completed)
  .filter(item=>Number.isFinite(item.time)).sort((a,b)=>b.time-a.time)[0];
 const next=active?.id??records.find(item=>!item.completed)?.id??"L001";
 const hasWork=records.some(item=>item.started);
 return {lessonId:next,completed,available:records.length,action:hasWork?"continue":"start"};
}
