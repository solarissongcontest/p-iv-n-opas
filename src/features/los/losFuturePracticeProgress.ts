import type { LosBookDefinition } from "./catalog.ts";
import { losFutureLessonOutline } from "./losFutureLessonOutline.ts";
import { losFutureExercisesFor } from "./content/losFutureExercises.ts";
import { getLosFutureLesson } from "./content/losFutureLessons.ts";

/** Reads only safe practice evidence from the existing v1 chapter draft format.
 * This pure parser must agree with studyState.ts, but never imports React,
 * device-auth or private user information into the analytics unit tests. */
type PracticeEvidence={practiceAnswers:Record<string,string>;practiceChecked:string[]};
const EMPTY_PRACTICE:PracticeEvidence={practiceAnswers:{},practiceChecked:[]};
function isStringRecord(value:unknown):value is Record<string,string>{
  return Boolean(value&&typeof value==="object"&&!Array.isArray(value)
    &&Object.values(value).every(item=>typeof item==="string"));
}
export function parseLosFuturePracticeEvidence(raw:string|null):PracticeEvidence {
  if(!raw)return EMPTY_PRACTICE;
  try{
    const input=JSON.parse(raw) as Record<string,unknown>;
    if(!input||input.version!==1||!isStringRecord(input.practiceAnswers)
      ||!isStringRecord(input.testAnswers))return EMPTY_PRACTICE;
    return {
      practiceAnswers:input.practiceAnswers,
      practiceChecked:Array.isArray(input.practiceChecked)
        ? input.practiceChecked.filter((value):value is string=>typeof value==="string")
        : [],
    };
  }catch{return EMPTY_PRACTICE;}
}
export function losFuturePracticeDraftKey(bookId:number,chapterId:string,ownerId:string):string{
  return `los.local.v1.${ownerId}.${bookId}.${chapterId}`;
}

export const LOS_FUTURE_STAGE_IDS=["start","model","guide","attempt","tasks","check"] as const;
export type LosFutureStageId=typeof LOS_FUTURE_STAGE_IDS[number];

export type LosFutureLessonPractice={
  number:number;
  id:string;
  chapterId:string;
  chapterTitle:string;
  attemptedStages:number;
  totalStages:6;
  answeredTasks:number;
  totalTasks:number;
  comparedTasks:number;
  hasReflection:boolean;
  nextStageIndex:number;
};
export type LosFutureChapterPractice={
  chapterId:string;
  title:string;
  stagesTried:number;
  totalStages:30;
  answers:number;
  totalExercises:26;
  compared:number;
  touchedLessons:number;
};
export type LosFutureBookPractice={
  bookId:number;
  chapterLessons:LosFutureLessonPractice[];
  chapters:LosFutureChapterPractice[];
  attemptedStages:number;
  totalStages:300;
  answeredTasks:number;
  totalExercises:260;
  comparedTasks:number;
  lessonsTouched:number;
  lessonsAllStagesTried:number;
  resume:{number:number;stageIndex:number}|null;
};

/** Raw local draft reader is injected so tests don't need a DOM. Only attempts,
 * not language proficiency or approved lesson completions, are measured. */
export function calculateLosFutureBookPractice(
  book:LosBookDefinition,
  ownerId:string|null,
  read:(key:string)=>string|null,
):LosFutureBookPractice {
  const source=losFutureLessonOutline(book);
  const chapterDrafts=new Map<string,PracticeEvidence>();
  for(const chapter of book.chapters){
    const key=ownerId?losFuturePracticeDraftKey(book.id,chapter.id,ownerId):null;
    let raw:string|null=null;
    if(key){try{raw=read(key);}catch{/* storage access denied: use an empty draft */}}
    chapterDrafts.set(chapter.id,parseLosFuturePracticeEvidence(raw));
  }

  const chapterLessons:LosFutureLessonPractice[]=source.flatMap(slot=>{
    if(!slot.chapterId)return [];
    const chapterId=slot.chapterId;
    const draft=chapterDrafts.get(chapterId)!;
    const script=getLosFutureLesson(book.id,slot.number);
    if(!script||script.kind!=="chapter")return [];
    const stageDone=LOS_FUTURE_STAGE_IDS.map(stageId=>
      draft.practiceChecked.includes(`los.future.guided:${script.id}:${stageId}`));
    const answered=script.exerciseIds.filter(id=>Boolean(draft.practiceAnswers[id]?.trim())).length;
    const compared=script.exerciseIds.filter(id=>draft.practiceChecked.includes(id)).length;
    const nextStage=stageDone.findIndex(value=>!value);
    return [{
      number:slot.number,id:script.id,chapterId,
      chapterTitle:slot.chapterTitle??"",
      attemptedStages:stageDone.filter(Boolean).length,totalStages:6 as const,
      answeredTasks:answered,totalTasks:script.exerciseIds.length,
      comparedTasks:compared,
      hasReflection:Boolean(draft.practiceAnswers[`${script.id}:own-reflection`]?.trim()),
      nextStageIndex:nextStage<0?5:nextStage,
    }];
  });

  const chapters:LosFutureChapterPractice[]=book.chapters.map(chapter=>{
    const draft=chapterDrafts.get(chapter.id)!;
    const lessons=chapterLessons.filter(item=>item.chapterId===chapter.id);
    const exercises=losFutureExercisesFor(book.id,chapter.id);
    return {
      chapterId:chapter.id,title:chapter.title,
      stagesTried:lessons.reduce((sum,item)=>sum+item.attemptedStages,0),
      totalStages:30 as const,
      answers:exercises.filter(item=>Boolean(draft.practiceAnswers[item.id]?.trim())).length,
      totalExercises:26 as const,
      compared:exercises.filter(item=>draft.practiceChecked.includes(item.id)).length,
      touchedLessons:lessons.filter(item=>item.attemptedStages>0).length,
    };
  });
  // An interrupted lesson takes priority over untouched ones. All six checkmarks
  // only reflect the student's own actions, never an endorsed course completion.
  const resumeLesson=chapterLessons.find(l=>l.attemptedStages>0&&l.attemptedStages<6)
    ??chapterLessons.find(l=>l.attemptedStages<6)
    ??null;
  return {
    bookId:book.id,chapterLessons,chapters,
    attemptedStages:chapters.reduce((sum,item)=>sum+item.stagesTried,0),
    totalStages:300,
    answeredTasks:chapters.reduce((sum,item)=>sum+item.answers,0),
    totalExercises:260,
    comparedTasks:chapters.reduce((sum,item)=>sum+item.compared,0),
    lessonsTouched:chapterLessons.filter(item=>item.attemptedStages>0).length,
    lessonsAllStagesTried:chapterLessons.filter(item=>item.attemptedStages===6).length,
    resume:resumeLesson?{number:resumeLesson.number,stageIndex:resumeLesson.nextStageIndex}:null,
  };
}
