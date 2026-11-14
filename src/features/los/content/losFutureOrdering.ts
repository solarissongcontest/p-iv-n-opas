import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes.ts";

/** Author-indexed ordering tiles, corrected only where the manuscript model
 * unambiguously identifies the punctuation of the same German word.
 * This uses existing practiceAnswers[task.id] strings, never a second progress store.
 */
export type LosFutureOrderingTile={index:number;word:string};
const normalize=(text:string)=>text.normalize("NFC").toLocaleLowerCase("de")
  .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,"");
export function losFutureOrderingTiles(task:LosFutureExerciseDraft):LosFutureOrderingTile[]|null {
  // All 70 R02 source prompts incorrectly expose the complete answer while
  // describing words as shuffled. Hide that source prompt in the UI and provide
  // a deterministic shuffled version of its exact original model words.
  if(/-R02$/.test(task.id) && task.title==="sentence-order"){
    const prefix="Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: ";
    if(!task.prompt.startsWith(prefix) || task.prompt.slice(prefix.length)!==task.answerKey)return null;
    const words=task.answerKey.trim().split(/\s+/u);
    if(words.length<3 || words.length>40)return null;
    const offset=Math.floor(words.length/2);
    const indices=words.map((_,i)=>i);
    const rotated=[...indices.slice(offset),...indices.slice(0,offset)];
    return rotated.map((sourceIndex,index)=>({index,word:words[sourceIndex]!}));
  }
  const prefix="Järjestä nämä osat oikeaksi lauseeksi: ";
  if(!/-T08$/.test(task.id) || task.title!=="Rakenna lause" ||
    !task.prompt.startsWith(prefix))return null;
  const pieces=task.prompt.slice(prefix.length).split(" / ").map(p=>p.trim());
  const words=task.answerKey.trim().split(/\s+/u);
  if(pieces.length<3 || pieces.length>12 || pieces.length!==words.length ||
    pieces.some(p=>!normalize(p)))return null;
  const used=new Set<number>();
  const tiles:LosFutureOrderingTile[]=[];
  for(let i=0;i<pieces.length;i++){
    const match=words.findIndex((word,index)=>!used.has(index)&&normalize(word)===normalize(pieces[i]!));
    if(match<0)return null;
    used.add(match);
    tiles.push({index:i,word:words[match]!});
  }
  return tiles;
}
/** Retain already written prose if it does not map exactly to one tile sequence. */
export function readLosFutureOrderingAnswer(answer:string,tiles:readonly LosFutureOrderingTile[]):number[]|null {
  if(!answer.trim())return [];
  const words=answer.trim().split(/\s+/u),selected:number[]=[];
  if(words.length>tiles.length)return null;
  for(const word of words){
    const tile=tiles.find(item=>item.word===word&&!selected.includes(item.index));
    if(!tile)return null;
    selected.push(tile.index);
  }
  return selected;
}
export function writeLosFutureOrderingAnswer(tiles:readonly LosFutureOrderingTile[],selected:readonly number[]):string {
  return selected.map(index=>tiles.find(t=>t.index===index)?.word??"").filter(Boolean).join(" ");
}
