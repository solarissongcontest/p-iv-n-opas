import type { LosChapterDraft } from "./studyState";
import { validateLosLessonProgressMap } from "./lessonEngine.ts";
import { validLosRecallCardMap } from "./recallEngine.ts";

export type LosCloudRecord = {
  revision: number;
  payload: LosChapterDraft;
  updated_at: string;
};
export type LosCloudResponse = {
  record: LosCloudRecord | null;
};
export const LOS_SYNC_MAX_BYTES = 65536;

const isStringRecord=(value:unknown):value is Record<string,string> =>
  value!==null && typeof value==="object" && !Array.isArray(value) &&
  Object.entries(value).length<=200 &&
  Object.entries(value).every(([key,entry])=>key.length<=100 && typeof entry==="string" && entry.length<=500);

export function validateLosCloudDraft(raw:unknown):raw is LosChapterDraft {
  if(raw===null || typeof raw!=="object" || Array.isArray(raw))return false;
  const d=raw as Partial<LosChapterDraft>;
  if(d.version!==1 || typeof d.note!=="string" || d.note.length>8000 ||
    typeof d.applicationDraft!=="string" || d.applicationDraft.length>5000 ||
    typeof d.selfAssessment!=="string" || d.selfAssessment.length>5000 ||
    typeof d.bookmarked!=="boolean")return false;
  if(!isStringRecord(d.practiceAnswers)||!isStringRecord(d.testAnswers))return false;
  if(d.readerMarks!==undefined && !isStringRecord(d.readerMarks))return false;
  if(d.lessonProgress!==undefined && !validateLosLessonProgressMap(d.lessonProgress))return false;
  if(d.recallCards!==undefined && !validLosRecallCardMap(d.recallCards))return false;
  if(!Array.isArray(d.practiceChecked)||d.practiceChecked.length>200 ||
    !d.practiceChecked.every(item=>typeof item==="string" && item.length<=100))return false;
  if(d.testSubmittedAt!==null && (typeof d.testSubmittedAt!=="string"||!isValidIso(d.testSubmittedAt)))return false;
  if(typeof d.updatedAt!=="string"||(d.updatedAt.length!==0&&!isValidIso(d.updatedAt)))return false;
  return new TextEncoder().encode(JSON.stringify(raw)).length<=LOS_SYNC_MAX_BYTES;
}
function isValidIso(value:string) {
  return value.length<=40 && Number.isFinite(Date.parse(value)) && /\d{4}-\d{2}-\d{2}T/.test(value);
}
export function validLosChapter(bookId:unknown,chapterId:unknown):bookId is number {
  return typeof bookId==="number" && Number.isInteger(bookId) && bookId>=1 && bookId<=8 &&
    typeof chapterId==="string" && /^\d{2}$/.test(chapterId) && Number(chapterId)>=1 && Number(chapterId)<=99;
}
export function draftIsEmpty(draft:LosChapterDraft) {
  return !draft.note.trim() && !draft.applicationDraft.trim() && !draft.bookmarked &&
    !Object.values(draft.practiceAnswers).some(Boolean) &&
    !(draft.readerMarks && Object.values(draft.readerMarks).some(Boolean)) &&
    !(draft.lessonProgress && Object.values(draft.lessonProgress).some(progress=>Boolean(progress.startedAt || progress.completedAt || progress.exitCheckedAt || progress.completedStepIds.length))) &&
    !(draft.recallCards && Object.keys(draft.recallCards).length>0) &&
    !Object.values(draft.testAnswers).some(Boolean) &&
    !draft.testSubmittedAt && !draft.selfAssessment.trim();
}
