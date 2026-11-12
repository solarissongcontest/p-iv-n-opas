/**
 * LOS! 1 self-rated spaced vocabulary recall.
 * Two independent directions: recognition (German -> Finnish) and active
 * recall (Finnish -> German). This is NOT an externally verified mastery grade.
 */
export type LosRecallDirection = "de-fi" | "fi-de";
export type LosRecallRating = "again" | "uncertain" | "remembered";
export type LosRecallCardState = {
  contentVersion: 1;
  level: number;
  nextDueAt: string;
  lastReviewedAt: string;
  lastRating: LosRecallRating;
};
export type LosRecallCard = {
  id: string;
  chapterId: string;
  german: string;
  finnish: string;
  direction: LosRecallDirection;
};
export const LOS_RECALL_DAYS = [1,3,7,14,30] as const;
const msPerDay = 86_400_000;
const validIso = (s:unknown):s is string =>
  typeof s==="string" && s.length<=40 && /^\d{4}-\d{2}-\d{2}T/.test(s) &&
  Number.isFinite(Date.parse(s));

export function losRecallKey(chapterId:string,german:string,direction:LosRecallDirection):string {
  const text=german.trim().normalize("NFC").replace(/\s+/g," ").toLocaleLowerCase("de");
  return chapterId+"|"+direction+"|"+text.slice(0,78);
}
export function losRecallFromVocabulary(chapterId:string,vocabulary:readonly string[]):LosRecallCard[]{
  const seen=new Set<string>();
  const result:LosRecallCard[]=[];
  for(const raw of vocabulary){
    const sep=raw.indexOf(" – ");
    if(sep<1)continue;
    const german=raw.slice(0,sep).trim();
    const finnish=raw.slice(sep+3).trim();
    if(!german||!finnish)continue;
    for(const direction of ["de-fi","fi-de"] as const){
      const id=losRecallKey(chapterId,german,direction);
      if(seen.has(id))continue;
      seen.add(id);
      result.push({id,chapterId,german,finnish,direction});
    }
  }
  return result;
}
export function losRecallReview(old:LosRecallCardState|undefined,rating:LosRecallRating,now:string):LosRecallCardState {
  if(!validIso(now))throw Error("Invalid review timestamp");
  const previous=old?.level??0;
  const level=rating==="remembered"?Math.min(5,previous+1):
    rating==="uncertain"?Math.max(0,previous-1):0;
  const days=rating==="remembered"?LOS_RECALL_DAYS[Math.min(level-1,4)]!:1;
  return {
    contentVersion:1,level,
    lastReviewedAt:now,
    nextDueAt:new Date(Date.parse(now)+days*msPerDay).toISOString(),
    lastRating:rating,
  };
}
export function losRecallIsDue(value:LosRecallCardState|undefined,now:string):boolean {
  return !value || (validIso(now) && Date.parse(value.nextDueAt)<=Date.parse(now));
}
export function validLosRecallCardMap(value:unknown):value is Record<string,LosRecallCardState> {
  if(!value||typeof value!=="object"||Array.isArray(value))return false;
  const entries=Object.entries(value);
  return entries.length<=200&&entries.every(([id,raw])=>{
    if(id.length>100||id.length<4||!raw||typeof raw!=="object"||Array.isArray(raw))return false;
    const item=raw as Partial<LosRecallCardState>;
    return item.contentVersion===1 && typeof item.level==="number"&&Number.isInteger(item.level)&&
      item.level>=0&&item.level<=5&&validIso(item.nextDueAt)&&validIso(item.lastReviewedAt)&&
      (item.lastRating==="again"||item.lastRating==="uncertain"||item.lastRating==="remembered");
  });
}
export function parseLosRecallCardMap(value:unknown):Record<string,LosRecallCardState> {
  if(!value||typeof value!=="object"||Array.isArray(value))return {};
  return Object.fromEntries(Object.entries(value).filter(([key,raw])=>
    validLosRecallCardMap({[key]:raw})
  ).slice(0,200)) as Record<string,LosRecallCardState>;
}
