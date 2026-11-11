import {dueDate,spacedDays} from './engine.ts';

/** Store due, but accept the earlier date field when parsing legacy cards. */
export type ReviewEntry={due:string;stage:number;source?:string};
const isoDay=(value:unknown):value is string=>typeof value==='string'&&
 /^\d{4}-\d{2}-\d{2}$/u.test(value)&&
 !Number.isNaN(Date.parse(value+'T12:00:00Z'))&&
 new Date(value+'T12:00:00Z').toISOString().slice(0,10)===value;

export function readReviewEntry(value:unknown):ReviewEntry|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const item=value as Record<string,unknown>;
 const due=isoDay(item['due'])?item['due']:isoDay(item['date'])?item['date']:null;
 if(!due)return null;
 const stage=typeof item['stage']==='number'&&Number.isInteger(item['stage'])?
  Math.max(0,Math.min(spacedDays.length-1,item['stage'])):0;
 return {due,stage,...(typeof item['source']==='string'?{source:item['source']}:{})};
}
export function createReviewEntry(now:Date=new Date(),source?:string):ReviewEntry{
 return {due:now.toISOString().slice(0,10),stage:0,...(source?{source}:{})};
}
export function scheduleReviewEntry(previous:unknown,success:boolean,now:Date=new Date()):ReviewEntry{
 const old=readReviewEntry(previous);
 const next=dueDate(now,success,old?.stage??0);
 return {due:next.date,stage:next.stage,...(old?.source?{source:old.source}:{})};
}
export function reviewIsDue(value:unknown,now:Date=new Date()):boolean{
 const entry=readReviewEntry(value);
 return Boolean(entry&&entry.due<=now.toISOString().slice(0,10));
}
