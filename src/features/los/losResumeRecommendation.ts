import {LOS1_EXECUTABLE_LESSONS,los1LessonDraftChapter} from "./guidedLessons.ts";
import type {LosChapterDraft} from "./studyState.ts";

export type LosResumeRecommendation={
  lessonId:string;
  completed:number;
  available:number;
  action:"start"|"continue"|"review";
};
/**
 * The first visit starts L001. Return to the most recently started, unfinished
 * lesson; otherwise open the first unfinished lesson in book order.
 * Completion evidence is never changed by navigation.
 */
export function recommendLos1Resume(
  drafts:Readonly<Record<string,LosChapterDraft>>,
):LosResumeRecommendation{
  const rows=LOS1_EXECUTABLE_LESSONS;
  const status=rows.map(lesson=>({
    id:lesson.id,
    progress:drafts[los1LessonDraftChapter(lesson.id)]?.lessonProgress?.[lesson.id],
  }));
  const completed=status.filter(row=>Boolean(row.progress?.completedAt)).length;
  if(completed===status.length)return {lessonId:"L001",completed,available:status.length,action:"review"};
  const started=status.filter(row=>row.progress?.startedAt&&!row.progress.completedAt)
    .map(row=>({id:row.id,time:Date.parse(row.progress!.startedAt??"")}))
    .filter(row=>Number.isFinite(row.time))
    .sort((a,b)=>b.time-a.time);
  const active=started[0]?.id;
  const next=active??status.find(row=>!row.progress?.completedAt)?.id??"L001";
  const hasWork=status.some(row=>Boolean(row.progress?.startedAt||row.progress?.completedAt));
  return {lessonId:next,completed,available:status.length,action:hasWork?"continue":"start"};
}
