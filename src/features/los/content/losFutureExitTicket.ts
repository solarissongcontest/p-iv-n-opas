import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes.ts";

/** Source T20 explicitly asks two different questions. Preserve both answers in
 * the existing task ID and keep the German/Finnish prompts distinct. No scoring. */
export type LosFutureExitTicket = {questions:readonly [string,string]};
const promptPrefix="Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) ";
export function losFutureExitTicket(task:LosFutureExerciseDraft):LosFutureExitTicket|null{
  if(!/-T20$/.test(task.id)||task.title!=="Loppulappu ilman vihjeitä"
    ||!task.prompt.startsWith(promptPrefix))return null;
  const parts=task.prompt.slice(promptPrefix.length).split(" (2) ");
  if(parts.length!==2||parts.some(part=>!part.trim()))return null;
  return {questions:[parts[0]!,parts[1]!]};
}

/** A legacy free-text draft is never silently converted or overwritten.
 * The exact prompt binding protects saved answers from content renames. */
export function readLosFutureExitAnswer(value:string,ticket:LosFutureExitTicket):string[]|null{
  if(!value)return ["",""];
  try{
    const parsed:unknown=JSON.parse(value);
    if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return null;
    const row=parsed as {version?:unknown;questions?:unknown;answers?:unknown};
    if(row.version!==1||!Array.isArray(row.questions)||!Array.isArray(row.answers)
      ||row.questions.length!==2||row.answers.length!==2)return null;
    if(!ticket.questions.every((q,i)=>row.questions?.[i]===q))return null;
    if(!row.answers.every((answer:unknown)=>typeof answer==="string"&&answer.length<=400))return null;
    return [...row.answers] as string[];
  }catch{return null;}
}
export function writeLosFutureExitAnswer(ticket:LosFutureExitTicket,answers:readonly string[]):string{
  if(answers.length!==2||answers.some(answer=>answer.length>400))
    throw Error("Invalid LOS exit ticket draft");
  if(answers.every(answer=>!answer.trim()))return "";
  return JSON.stringify({version:1,questions:[...ticket.questions],answers:[...answers]});
}
