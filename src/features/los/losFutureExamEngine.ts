import type { LosChapterDraft } from "./studyState.ts";
import type { LosFutureExam } from "./content/losFutureExams.ts";

/** These are formative LOCAL exam drafts, never certified grades.
 * Only single-token source-authored grammar gaps can be exact-checked.
 * Finnish comprehension, variants and writing require human interpretation. */
export function futureExamAnchor(kind:LosFutureExam["kind"]):"05"|"10"{
  return kind==="midterm"?"05":"10";
}
export function futureExamQuestionIds(exam:LosFutureExam):string[]{
  return [...exam.questions.map(q=>q.id),exam.writing.id];
}
export function futureExamNormalize(value:string):string{
  return value.normalize("NFC").trim().replace(/\s+/g," ").replace(/[.!?]+$/u,"").toLocaleLowerCase("de");
}
export function futureExamAutoResult(exam:LosFutureExam,answers:Record<string,string>){
  const checked=exam.questions.filter(question=>
    /-G\d{2}$/.test(question.id) &&
    /^Täydennä:/u.test(question.prompt) &&
    /^[\p{L}äöüÄÖÜß-]+$/u.test(question.answerKey.trim()));
  return {
    possible:checked.reduce((sum,q)=>sum+q.points,0),
    awarded:checked.reduce((sum,q)=>{
      const written=answers[q.id]??"";
      return sum+(written.trim()&&futureExamNormalize(written)===futureExamNormalize(q.answerKey)?q.points:0);
    },0),
    checkedIds:checked.map(q=>q.id),
    restRequiresReview:35-checked.reduce((sum,q)=>sum+q.points,0),
  };
}
export const LOS_FUTURE_EXAM_HISTORY_LIMIT=10;
export const futureExamHistoryKey=(exam:LosFutureExam)=>exam.id+":history";
export type FutureExamSnapshot={submittedAt:string;answers:Record<string,string>};
export function readFutureExamHistory(raw:string|undefined,exam:LosFutureExam):FutureExamSnapshot[]|null{
  if(!raw)return [];
  try {
    const data:unknown=JSON.parse(raw);
    if(!Array.isArray(data)||data.length>LOS_FUTURE_EXAM_HISTORY_LIMIT)return null;
    const allowed=new Set(futureExamQuestionIds(exam));
    if(!data.every((record:unknown)=>{
      if(!record||typeof record!=="object"||Array.isArray(record))return false;
      const item=record as Record<string,unknown>;
      const submittedAt=item["submittedAt"], answers=item["answers"];
      if(typeof submittedAt!=="string"||!Number.isFinite(Date.parse(submittedAt)))return false;
      if(!answers||typeof answers!=="object"||Array.isArray(answers))return false;
      return Object.entries(answers).every(([k,v])=>allowed.has(k)&&typeof v==="string"&&v.length<=3000);
    }))return null;
    return data as FutureExamSnapshot[];
  } catch{return null;}
}
/** No history deletion: refuse a retake once the configured safe bound is hit.
 * The entire snapshot and cleared answer map form one chapter-draft write. */
export function beginFutureExamRetake(current:LosChapterDraft,exam:LosFutureExam):LosChapterDraft{
  if(!current.testSubmittedAt)throw Error("Koetta ei ole vielä palautettu.");
  const past=readFutureExamHistory(current.testAnswers[futureExamHistoryKey(exam)],exam);
  if(!past)throw Error("Kokeen aiempaa yrityshistoriaa ei voi tarkistaa, eikä sitä ylikirjoiteta.");
  if(past.length>=LOS_FUTURE_EXAM_HISTORY_LIMIT)throw Error("Yrityshistoria on täynnä: ota varmuuskopio ennen jatkamista.");
  const ids=futureExamQuestionIds(exam);
  const existing=Object.fromEntries(ids.filter(id=>current.testAnswers[id]!==undefined)
    .map(id=>[id,current.testAnswers[id]!]));
  const stored=[...past,{submittedAt:current.testSubmittedAt,answers:existing}];
  const packed=JSON.stringify(stored);
  if(packed.length>120_000)throw Error("Yrityshistoria on liian suuri turvalliseen tallennukseen.");
  const allowed=new Set(ids);
  return {...current,testSubmittedAt:null,testAnswers:{
    ...Object.fromEntries(Object.entries(current.testAnswers).filter(([id])=>!allowed.has(id)&&id!==futureExamHistoryKey(exam))),
    [futureExamHistoryKey(exam)]:packed,
  }};
}
