/**
 * Fail closed when the C01 print draft doesn't have exactly 15 searchable B5 leaves.
 * Uses Poppler pdfinfo / pdftotext, available via poppler-utils in GitHub Actions.
 */
import {execFileSync} from "node:child_process";
import path from "node:path";
import {fileURLToPath} from "node:url";

export const LOS1_C01_DRAFT_PDF_SPECS={
  leaves:15,
  widthMm:176,
  heightMm:250,
  requiredTexts:["Franz","Jörg","Hallo","Wortschatz","Grammatik"],
};

export function parsePdfInfo(value){
  const pages=Number(value.match(/^Pages:\s*(\d+)/m)?.[1]??NaN);
  const match=value.match(/^Page size:\s*([\d.]+)\s*x\s*([\d.]+)\s*pts/m);
  return {pages,widthPts:match?Number(match[1]):NaN,heightPts:match?Number(match[2]):NaN};
}

export function inspectDraftPdf({info,text,spec=LOS1_C01_DRAFT_PDF_SPECS}){
  const errors=[];
  const data=parsePdfInfo(info);
  if(data.pages!==spec.leaves)errors.push(
    `Sivumäärä ${data.pages}, odotettu ${spec.leaves}. Tarkista turhat tulostussivut ja ylivuodot.`);
  const targetWidth=spec.widthMm*72/25.4;
  const targetHeight=spec.heightMm*72/25.4;
  if(!Number.isFinite(data.widthPts)||Math.abs(data.widthPts-targetWidth)>1||
     !Number.isFinite(data.heightPts)||Math.abs(data.heightPts-targetHeight)>1){
    errors.push(`Sivukoko ${data.widthPts} x ${data.heightPts} pt, odotettu B5 176 x 250 mm.`);
  }
  const normalize=value=>value.normalize("NFC").replace(/\s+/g," ").toLocaleLowerCase("fi");
  const normalized=normalize(text);
  for(const phrase of spec.requiredTexts){
    if(!normalized.includes(normalize(phrase))){
      errors.push(`Valittavasta PDF-tekstikerroksesta puuttuu: ${phrase}`);
    }
  }
  if(text.trim().length<1200)errors.push("PDF:n valittava tekstisisältö on epäilyttävän lyhyt.");
  return {ok:errors.length===0,errors,pages:data.pages,
    pageSizePt:[data.widthPts,data.heightPts],textLength:text.length};
}

function runCli(){
  const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
  const filename=path.resolve(process.argv[2]||
    path.join(root,".artifacts/los1/LOS1_C01_B5_TAITTOLUONNOS.pdf"));
  const info=execFileSync("pdfinfo",[filename],{encoding:"utf8"});
  const text=execFileSync("pdftotext",["-enc","UTF-8",filename,"-"],{encoding:"utf8"});
  const result=inspectDraftPdf({info,text});
  process.stdout.write(JSON.stringify({file:filename,...result},null,2)+"\n");
  if(!result.ok)process.exitCode=1;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{runCli();}catch(error){console.error(error);process.exitCode=1;}
}
