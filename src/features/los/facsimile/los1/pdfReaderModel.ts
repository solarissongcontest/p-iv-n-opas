import {LOS1_C01_FACSIMILE_PAGES,LOS1_FACSIMILE_FORMAT} from "./c01Pilot.ts";

/** Local C01 PDF is never an approved edition. */
export const LOS1_C01_PDF_CONTRACT={
  kind:"local-only-draft" as const,
  pageCount:LOS1_C01_FACSIMILE_PAGES.length,
  widthPt:LOS1_FACSIMILE_FORMAT.widthMm*72/25.4,
  heightPt:LOS1_FACSIMILE_FORMAT.heightMm*72/25.4,
  maxBytes:35*1024*1024,
  textAPdfPage:LOS1_C01_FACSIMILE_PAGES.findIndex(p=>p.pageId==="c01-text-a")+1,
  sourceTokens:["Franz","Jörg"] as const,
};

export type PdfFacsimileMode="auto"|"single"|"spread";

/** Zero-based page index. Cover and inside-cover are deliberately single pages. */
export function visiblePdfLeaves(index:number,pageCount:number,spread:boolean):number[]{
  if(!Number.isInteger(index)||index<0||index>=pageCount)return [];
  if(!spread||index<2)return [index];
  const start=index%2===0?index:index-1;
  return [start,start+1].filter(i=>i<pageCount);
}
export function turnPdfLeaf(index:number,pageCount:number,spread:boolean,direction:-1|1):number{
  if(pageCount<=0)return 0;
  const current=Math.max(0,Math.min(pageCount-1,index));
  const visible=visiblePdfLeaves(current,pageCount,spread);
  const next=direction===1?Math.max(...visible)+1:Math.min(...visible)-1;
  return Math.max(0,Math.min(pageCount-1,next));
}
export function validatePdfGeometry(widthPt:number,heightPt:number,pageCount:number):string|null{
  if(pageCount!==LOS1_C01_PDF_CONTRACT.pageCount)
    return "PDF:n sivumäärä on "+pageCount+". C01-pilotissa pitää olla täsmälleen "+LOS1_C01_PDF_CONTRACT.pageCount+" sivua.";
  if(!Number.isFinite(widthPt)||!Number.isFinite(heightPt)||
    Math.abs(widthPt-LOS1_C01_PDF_CONTRACT.widthPt)>1.5||
    Math.abs(heightPt-LOS1_C01_PDF_CONTRACT.heightPt)>1.5)
    return "PDF:n sivukoko ei ole C01-pilotin B5 (176 × 250 mm).";
  return null;
}
export function validateC01TextALayer(items:string[]):string|null{
  const text=items.join(" ").normalize("NFC").toLocaleLowerCase("fi");
  return LOS1_C01_PDF_CONTRACT.sourceTokens.every(token=>text.includes(token.toLocaleLowerCase("fi")))
    ? null : "PDF:n Text A -sivulta ei löydy vaadittua alkuperäistä keskustelua tekstikerroksena.";
}
