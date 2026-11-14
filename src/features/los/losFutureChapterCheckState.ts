import type {LosChapterDraft} from "./studyState.ts";
import type {LosFutureChapterCheckPlan} from "./losFutureChapterCheckPlan.ts";

/** Formative chapter self-check only: no grades, no claimed exam security.
 * A failed parse must never silently clear an existing student answer. */
export type LosFutureChapterCheckAttempt={
  version:1;
  answers:Record<string,string>;
  submittedAt:string|null;
};
export const LOS_FUTURE_CHAPTER_CHECK_MAX_ANSWER=300;
export const LOS_FUTURE_CHAPTER_CHECK_MAX_WRITING=1400;
export const LOS_FUTURE_CHAPTER_CHECK_MAX_HISTORY=3;
const isRecord=(v:unknown):v is Record<string,unknown>=>Boolean(v)&&typeof v==="object"&&!Array.isArray(v);
export function emptyLosFutureChapterCheckAttempt():LosFutureChapterCheckAttempt{
  return {version:1,answers:{},submittedAt:null};
}
function validTimestamp(value:unknown):value is string {
  return typeof value==="string"&&value.length<=40&&/^\d{4}-\d{2}-\d{2}T/.test(value)&&Number.isFinite(Date.parse(value));
}
export function readLosFutureChapterCheckAttempt(
  raw:string|undefined,plan:LosFutureChapterCheckPlan,
  requireSubmitted=false,
):LosFutureChapterCheckAttempt|null {
  if(raw===undefined)return requireSubmitted?null:emptyLosFutureChapterCheckAttempt();
  try{
    if(raw.length>4900)return null;
    const value:unknown=JSON.parse(raw);
    if(!isRecord(value)||value["version"]!==1||!isRecord(value["answers"]))return null;
    if(value["submittedAt"]!==null&&!validTimestamp(value["submittedAt"]))return null;
    if(requireSubmitted&&!value["submittedAt"])return null;
    const answers=value["answers"] as Record<string,unknown>;
    const allowed=new Set(plan.tasks.map(task=>task.id));
    if(Object.entries(answers).some(([id,answer])=>
      !allowed.has(id)||typeof answer!=="string"||
      answer.length>(id.endsWith("-T18")?LOS_FUTURE_CHAPTER_CHECK_MAX_WRITING:LOS_FUTURE_CHAPTER_CHECK_MAX_ANSWER)))return null;
    return value as LosFutureChapterCheckAttempt;
  }catch{return null;}
}
function serialized(snapshot:LosFutureChapterCheckAttempt):string {
  const raw=JSON.stringify(snapshot);
  if(raw.length>4900)throw Error("Vastausta ei voi tallentaa turvallisesti. Ota varmuuskopio.");
  return raw;
}
export function saveLosFutureChapterCheckAnswer(
  draft:LosChapterDraft,plan:LosFutureChapterCheckPlan,id:string,answer:string,
):LosChapterDraft {
  const attempt=readLosFutureChapterCheckAttempt(draft.practiceAnswers[plan.currentKey],plan);
  if(!attempt)throw Error("Vanhaa kappaletestin vastausta ei voi lukea. Varmuuskopioi tiedot ensin.");
  if(attempt.submittedAt)throw Error("Palautettua yritystä ei voi muokata.");
  const task=plan.tasks.find(task=>task.id===id);
  if(!task)throw Error("Tehtävän lähdetunniste ei kuulu tähän kappaleeseen.");
  const limit=id.endsWith("-T18")?LOS_FUTURE_CHAPTER_CHECK_MAX_WRITING:LOS_FUTURE_CHAPTER_CHECK_MAX_ANSWER;
  const next={...attempt,answers:{...attempt.answers,[id]:answer.slice(0,limit)}};
  return {...draft,practiceAnswers:{...draft.practiceAnswers,[plan.currentKey]:serialized(next)}};
}
export function submitLosFutureChapterCheck(
  draft:LosChapterDraft,plan:LosFutureChapterCheckPlan,now=new Date(),
):LosChapterDraft{
  const attempt=readLosFutureChapterCheckAttempt(draft.practiceAnswers[plan.currentKey],plan);
  if(!attempt)throw Error("Vastausluonnos on vioittunut. Sitä ei ylikirjoiteta.");
  if(attempt.submittedAt)throw Error("Tämä oma harjoitusversio on jo palautettu.");
  if(!plan.tasks.some(task=>attempt.answers[task.id]?.trim()))throw Error("Kirjoita vähintään yksi vastaus.");
  const next={...attempt,submittedAt:now.toISOString()};
  return {...draft,practiceAnswers:{...draft.practiceAnswers,[plan.currentKey]:serialized(next)}};
}
/** Save the entire previous response before clearing current. One atomic draft
 * update means the old answers cannot be lost between two storage writes. */
export function retakeLosFutureChapterCheck(
  draft:LosChapterDraft,plan:LosFutureChapterCheckPlan,
):LosChapterDraft{
  const current=readLosFutureChapterCheckAttempt(draft.practiceAnswers[plan.currentKey],plan,true);
  if(!current)throw Error("Palautettua yritystä ei voi lukea. Varmuuskopioi tiedot ensin.");
  for(const key of plan.previousKeys){
    const oldRaw=draft.practiceAnswers[key];
    if(oldRaw!==undefined&&!readLosFutureChapterCheckAttempt(oldRaw,plan,true))
      throw Error("Vanha yrityshistoria on vioittunut. Tietoja ei ylikirjoiteta.");
  }
  const emptyKey=plan.previousKeys.find(key=>draft.practiceAnswers[key]===undefined);
  if(!emptyKey)throw Error("Kolme aiempaa yritystä on jo tallessa. Vie varmuuskopio ennen jatkamista.");
  return {...draft,practiceAnswers:{
    ...draft.practiceAnswers,[emptyKey]:serialized(current),
    [plan.currentKey]:serialized(emptyLosFutureChapterCheckAttempt()),
  }};
}
