import {LOS1_EXECUTABLE_LESSONS,los1LessonDraftChapter} from "./guidedLessons.ts";
import type {LosChapterDraft} from "./studyState.ts";

export type LosResumeRecommendation={
  lessonId:string;
  completed:number;
  available:number;
  action:"start"|"continue"|"review";
};
/** The new Teacher 2.0 completion is not a synthetic old checklist completion. */
export function losLessonCompleted(draft:LosChapterDraft|undefined,lessonId:string):boolean{
  return Boolean(draft?.lessonProgress?.[lessonId]?.completedAt ||
    draft?.teacherSessions?.[lessonId]?.completedAt);
}
/**
 * The first visit starts L001. Return to the most recently started, unfinished
 * lesson; otherwise open the first unfinished lesson in book order.
 * Completion evidence is never changed by navigation.
 */
export function recommendLos1Resume(
  drafts:Readonly<Record<string,LosChapterDraft>>,
):LosResumeRecommendation{
  const rows=LOS1_EXECUTABLE_LESSONS;
  const status=rows.map(lesson=>{
    const draft=drafts[los1LessonDraftChapter(lesson.id)];
    return {id:lesson.id,progress:draft?.lessonProgress?.[lesson.id],
      teacher:draft?.teacherSessions?.[lesson.id],
      completed:losLessonCompleted(draft,lesson.id)};
  });
  const completed=status.filter(row=>row.completed).length;
  if(completed===status.length)return {lessonId:"L001",completed,available:status.length,action:"review"};
  const started=status.filter(row=>!row.completed)
    .map(row=>{
      const legacy=Date.parse(row.progress?.startedAt??"");
      const teacher=row.teacher&&(row.teacher.visitedIds.length||
        row.teacher.attempts.length||row.teacher.activityIds.length)
        ?Date.parse(row.teacher.updatedAt):NaN;
      return {id:row.id,time:Math.max(Number.isFinite(legacy)?legacy:0,
        Number.isFinite(teacher)?teacher:0)};
    })
    .filter(row=>row.time>0).sort((a,b)=>b.time-a.time);
  const next=started[0]?.id??status.find(row=>!row.completed)?.id??"L001";
  const hasWork=status.some(row=>Boolean(row.progress?.startedAt||row.completed||
    (row.teacher&&(row.teacher.visitedIds.length||row.teacher.attempts.length||
      row.teacher.activityIds.length))));
  return {lessonId:next,completed,available:status.length,action:hasWork?"continue":"start"};
}
