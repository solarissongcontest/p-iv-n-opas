import {
  LOS_READER_COLORS,type LosReaderAnnotation,type LosReaderColor,
} from "./content/c01Annotations.ts";
import {
  appendLosReaderRange,losReaderTokenColor,parseLosReaderAnnotation,
} from "./content/readerAnnotations.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "./content/losFutureManuscripts.ts";

export type LosFutureReaderSource="text-a"|"text-b"|"dialogue";
const sections=["text-a","text-b","dialogue"] as const;
/** Stable ID per owner/book/chapter/source; never reuses LOS! 1's annotation key. */
export function losFutureReaderMarkKey(bookId:number,chapterId:string,source:LosFutureReaderSource):string{
  if(!Number.isInteger(bookId)||bookId<2||bookId>8||
    !/^(0[1-9]|10)$/.test(chapterId)||!sections.includes(source))
    throw Error("Invalid LOS later-book reader identity");
  return `los-future-${bookId}-${chapterId}-${source}`;
}
/** Version markers are derived from the exact text, not the book's mutable
 * title. Changes invalidate visual offsets without deleting earlier notes. */
export function losFutureReaderTextVersion(text:string):string{
  let digest=2166136261;
  for(let i=0;i<text.length;i++){
    digest=Math.imul(digest^text.charCodeAt(i),16777619)>>>0;
  }
  return "source-"+digest.toString(16).padStart(8,"0")+"-"+text.length;
}
export function losFutureReaderText(bookId:number,chapterId:string,source:LosFutureReaderSource):string{
  const manuscript=LOS_FUTURE_MANUSCRIPTS[bookId]?.[chapterId];
  if(!manuscript)return "";
  return source==="text-a"?manuscript.textA:
    source==="text-b"?manuscript.textB:manuscript.dialogue.join("\n");
}
export function losFutureReaderWords(text:string):Array<{value:string;index:number|null}>{
  const chunks=text.match(/\s+|\S+/gu)??[];
  let index=0;
  return chunks.map(chunk=>/\s/u.test(chunk)
    ? {value:chunk,index:null}
    : {value:chunk,index:index++});
}
export function losFutureReaderAppend(
  raw:string|undefined,text:string,start:number,end:number,color:LosReaderColor,
):string|null{
  const version=losFutureReaderTextVersion(text);
  const current=parseLosReaderAnnotation(raw,version);
  if(current.contentVersion!==version)return null;
  const count=losFutureReaderWords(text).filter(x=>x.index!==null).length;
  const next=appendLosReaderRange(current,start,end,color,count,version);
  return JSON.stringify(next);
}
export function losFutureReaderColor(raw:string|undefined,text:string,index:number):LosReaderColor|null{
  const version=losFutureReaderTextVersion(text);
  return losReaderTokenColor(parseLosReaderAnnotation(raw,version),index,version);
}
export function validLosFutureReaderMarks(value:unknown,bookId:number,chapterId:string):boolean{
  if(!value||typeof value!=="object"||Array.isArray(value))return false;
  const marks=value as Record<string,unknown>;
  const allowed=new Set(sections.map(section=>losFutureReaderMarkKey(bookId,chapterId,section)));
  const entries=Object.entries(marks);
  if(entries.length>sections.length)return false;
  return entries.every(([id,raw])=>{
    if(!allowed.has(id)||typeof raw!=="string"||raw.length>500)return false;
    let parsed:unknown;
    try{parsed=JSON.parse(raw);}catch{return false;}
    if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return false;
    const data=parsed as Partial<LosReaderAnnotation>;
    if(Object.keys(data).sort().join(",")!=="contentVersion,ranges"||
      typeof data.contentVersion!=="string"||
      !/^source-[0-9a-f]{8}-\d{1,5}$/.test(data.contentVersion)||
      !Array.isArray(data.ranges)||data.ranges.length>8)return false;
    return data.ranges.every(range=>{
      if(!range||typeof range!=="object"||Array.isArray(range))return false;
      if(Object.keys(range).sort().join(",")!=="color,endToken,startToken")return false;
      const item=range as {startToken:unknown;endToken:unknown;color:unknown};
      return typeof item.startToken==="number"&&Number.isInteger(item.startToken)&&
        item.startToken>=0&&item.startToken<=3000&&typeof item.endToken==="number"&&
        Number.isInteger(item.endToken)&&item.endToken>=item.startToken&&
        item.endToken<=3000&&LOS_READER_COLORS.some(c=>c===item.color);
    });
  });
}
