import type { LosBookDefinition } from "./catalog.ts";
import type { LosChapterDraft } from "./studyState.ts";
import { losScore } from "./exerciseBank.ts";
import { LOS1_EXECUTABLE_LESSONS,isLos1ExecutableLesson,los1LessonDraftChapter } from "./guidedLessons.ts";
import { LOS_1_LESSONS } from "./learningPath.ts";
import { losExamScore, LOS1_MIDTERM_QUESTIONS } from "./content/los1Exams.ts";
import { getLosChapterSourceGate } from "./content/sourceRegistry.ts";
import { losRecallFromVocabulary,losRecallIsDue } from "./recallEngine.ts";

type ChapterProgress={
  id:string; title:string; completed:number; available:number;
  scored:{correct:number;total:number}|null;
  reviewSelf:number; pendingScheduled:number; newCards:number;
  sourceReady:boolean;
};
export type LosStudyProgressSnapshot={
  available:number;completed:number;planned:number;
  correct:number;total:number;scoredChapters:number;
  delayedSelfRemembered:number;pendingScheduled:number;newCards:number;
  midterm:{correct:number;total:number}|null;
  chapters:ChapterProgress[];
  unfinished:{id:string;title:string}[];
};
/** Computes only evidence supported by locally stored answers and stage flags.
 * A self-rated flashcard is NOT an objectively verified language achievement.
 */
export function getLosStudyProgressSnapshot(book:LosBookDefinition,drafts:Readonly<Record<string,LosChapterDraft>>,now:string):LosStudyProgressSnapshot {
  const chapterStatuses:ChapterProgress[]=book.chapters.map(ch=>{
    const d=drafts[ch.id];
    const actual=LOS1_EXECUTABLE_LESSONS.filter(lesson=>los1LessonDraftChapter(lesson.id)===ch.id);
    const completed=actual.filter(l=>Boolean(d?.lessonProgress?.[l.id]?.completedAt)).length;
    const scored=d?.testSubmittedAt?losScore(ch.id,d.testAnswers):null;
    const cards=losRecallFromVocabulary(ch.id,ch.vocabulary);
    const states=d?.recallCards??{};
    const reviewed=cards.filter(card=>Boolean(states[card.id]));
    return {
      id:ch.id,title:ch.title,completed,available:actual.length,
      scored:scored?{correct:scored.correct,total:scored.total}:null,
      reviewSelf:reviewed.filter(card=>states[card.id]!.level>=2&&states[card.id]!.lastRating==="remembered").length,
      pendingScheduled:reviewed.filter(card=>losRecallIsDue(states[card.id],now)).length,
      newCards:cards.length-reviewed.length,
      sourceReady:getLosChapterSourceGate(ch.id).ready,
    };
  });
  const mid=drafts["91"];
  const midterm=mid?.testSubmittedAt?
    (()=>{const result=losExamScore(LOS1_MIDTERM_QUESTIONS,mid.testAnswers);return {correct:result.correct,total:result.total};})():null;
  const completed=LOS1_EXECUTABLE_LESSONS.filter(l=>{
    const d=drafts[los1LessonDraftChapter(l.id)];
    return Boolean(d?.lessonProgress?.[l.id]?.completedAt);
  }).length;
  const scored=chapterStatuses.filter(ch=>Boolean(ch.scored));
  const done=LOS_1_LESSONS.filter(l=>!isLos1ExecutableLesson("L"+String(l.number).padStart(3,"0")))
    .map(l=>({id:"L"+String(l.number).padStart(3,"0"),title:l.title}));
  return {
    available:LOS1_EXECUTABLE_LESSONS.length,completed,planned:LOS_1_LESSONS.length,
    correct:scored.reduce((sum,c)=>sum+(c.scored?.correct??0),0),
    total:scored.reduce((sum,c)=>sum+(c.scored?.total??0),0),
    scoredChapters:scored.length,
    delayedSelfRemembered:chapterStatuses.reduce((sum,c)=>sum+c.reviewSelf,0),
    pendingScheduled:chapterStatuses.reduce((sum,c)=>sum+c.pendingScheduled,0),
    newCards:chapterStatuses.reduce((sum,c)=>sum+c.newCards,0),
    midterm,chapters:chapterStatuses,unfinished:done,
  };
}
