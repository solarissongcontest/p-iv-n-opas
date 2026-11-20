import type { Lesson } from "./EnglishMasterBook";
import { asTeacherLesson } from "./englishTeacherAdapter";
import { englishTeacherStorageKey } from "./englishTeacherBackup";
import { teacherSessionNeedsReview, validTeacherSession } from "../los/teacher/engine.ts";

/**
 * Uses real Teacher 2.0 sessions, never the retired completion marker.
 * A manuscript change cannot turn outdated answers into valid current mastery.
 * Follows the same "recent unfinished → first unfinished → review" order as LOS!.
 */
export type EnglishTeacherResume = {
  lessonId:string; title:string; completed:number; available:number;
  action:"start"|"continue"|"review"|"updated";
};
export function recommendEnglishTeacherResume(
  ownerId:string,lessons:readonly Lesson[],
):EnglishTeacherResume|null{
  if(!ownerId||!lessons.length||typeof window==="undefined")return null;
  let completed=0;
  const finished=new Set<string>();
  const active:Array<{id:string;title:string;time:number;updated:boolean}>=[];
  for(const lesson of lessons){
    try{
      const raw=localStorage.getItem(englishTeacherStorageKey(ownerId,lesson.content_id));
      if(!raw)continue;
      const session:unknown=JSON.parse(raw);
      if(!validTeacherSession(session)||session.lessonId!==lesson.content_id)continue;
      const outdated=teacherSessionNeedsReview(session,asTeacherLesson(lesson));
      const started=Boolean(session.visitedIds.length||session.attempts.length||
        session.activityIds.length||session.completedAt||
        Object.keys(session.draftAnswers).length);
      if(!outdated&&session.completedAt){
        finished.add(lesson.content_id);completed++;continue;
      }
      if(!started)continue;
      const time=Date.parse(session.updatedAt);
      active.push({id:lesson.content_id,title:lesson.title,
        time:Number.isFinite(time)?time:0,updated:outdated});
    }catch{
      // Invalid saved sessions are left untouched for backup/recovery.
      // They must not silently earn a completion badge.
    }
  }
  if(completed===lessons.length)return{
    lessonId:lessons[0]!.content_id,title:lessons[0]!.title,
    action:"review",completed,available:lessons.length,
  };
  active.sort((a,b)=>b.time-a.time);
  const recent=active[0];
  if(recent)return{
    lessonId:recent.id,title:recent.title,
    action:recent.updated?"updated":"continue",completed,available:lessons.length,
  };
  const first=lessons.find(lesson=>!finished.has(lesson.content_id))??lessons[0]!;
  return{lessonId:first.content_id,title:first.title,
    action:"start",completed,available:lessons.length};
}
