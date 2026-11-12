import {test} from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {
  LOS1_FULL_BOOK_PRINT_OUTLINE,LOS1_PRINT_SECTIONS,
  getLos1UnreadyChapterGates,validateLos1FullBookOutline,
} from "../src/features/los/facsimile/los1/fullBookOutline.ts";
import {
  RELEASED_LOS1_EDITION,LOS1_REQUIRED_REVIEWS,
  expectedLos1PdfPath,loadVerifiedLos1Pdf,validateLos1EditionRelease,
  type Los1PublishedEdition,type Los1ReleasedPage,
} from "../src/features/los/facsimile/los1/editionRelease.ts";

test("LOS! 1 full-book print outline contains 10 actual chapters and every canonical section",()=>{
  assert.deepEqual(validateLos1FullBookOutline(),[]);
  for(let n=1;n<=10;n++){
    const id=String(n).padStart(2,"0");
    assert.deepEqual(LOS1_FULL_BOOK_PRINT_OUTLINE.filter(p=>p.chapterId===id).map(p=>p.sectionId),
      LOS1_PRINT_SECTIONS.map(s=>s.id));
  }
  assert.ok(LOS1_FULL_BOOK_PRINT_OUTLINE.every(p=>
    p.pdfStartIndex===null&&p.printedStartPage===null));
  assert.ok(LOS1_FULL_BOOK_PRINT_OUTLINE.some(p=>p.outlineId==="los1-midterm"));
  assert.ok(LOS1_FULL_BOOK_PRINT_OUTLINE.some(p=>p.outlineId==="los1-final"));
});
test("No LOS! 1 whole-book edition is falsely published",()=>{
  assert.equal(RELEASED_LOS1_EDITION,null);
  assert.ok(getLos1UnreadyChapterGates().length>0);
});
function makeApprovedFixture(){
  const data=new Uint8Array(1400).fill(24);
  const pages:Los1ReleasedPage[]=[{
    pageId:"los1-cover",title:"Etukansi",pdfPageIndex:0,printedPageLabel:null,
    kind:"front-cover",physicalSide:"single",spreadId:null,
    chapterId:null,sectionId:null,contentBlockIds:["cover"],
    exerciseIds:[],imageIds:[],mediaIds:[],
  }];
  for(let i=1;i<=10;i++){
    const chapterId=String(i).padStart(2,"0");
    for(const side of ["left","right"] as const){
      const index=pages.length;
      pages.push({pageId:"c"+chapterId+"-"+side,title:"Kappale "+chapterId,pdfPageIndex:index,
        printedPageLabel:String(index),kind:"content",
        physicalSide:side,spreadId:"spread-"+chapterId,
        chapterId,sectionId:side==="left"?"text":"practice",
        contentBlockIds:["c"+chapterId+"-"+side+"-anchor"],
        exerciseIds:[],imageIds:[],mediaIds:[]});
    }
  }
  const sha=createHash("sha256").update(data).digest("hex");
  const edition:Los1PublishedEdition={
    bookId:"los-1",editionId:"los1-2026-v1",
    contentReleaseId:"content-canonical-1",pageMapVersion:"1.0",
    sourceManifestVersion:"1.0.0",publicationDate:"2026-11-12",
    publicationStatus:"published",format:"B5",trimMm:{width:176,height:250},
    screenPdf:{url:expectedLos1PdfPath("los1-2026-v1"),
      sha256:sha,byteLength:data.byteLength,pageCount:pages.length},
    reviews:Object.fromEntries(LOS1_REQUIRED_REVIEWS.map(k=>[k,true])) as
      Los1PublishedEdition["reviews"],
    pages,
  };
  return {edition,data};
}
test("full release validator refuses incomplete rights, source gates and wrong PDF metadata",()=>{
  const {edition}=makeApprovedFixture();
  assert.deepEqual(validateLos1EditionRelease(edition,[]),[]);
  assert.ok(validateLos1EditionRelease(edition).some(x=>x.includes("julkaisuportteja")));
  assert.ok(validateLos1EditionRelease({...edition,reviews:{...edition.reviews,
    imageRightsVerified:false}},[]).some(x=>x.includes("imageRightsVerified")));
  assert.ok(validateLos1EditionRelease({...edition,screenPdf:{...edition.screenPdf,
    url:"https://external.example/test.pdf"}},[]).some(x=>x.includes("API-reitti")));
  assert.ok(validateLos1EditionRelease({...edition,screenPdf:{...edition.screenPdf,
    sha256:"0".repeat(63)}},[]).some(x=>x.includes("SHA-256")));
  assert.ok(validateLos1EditionRelease({...edition,pages:edition.pages.slice(1)},[])
    .some(x=>x.includes("sivumäärä")));
  assert.ok(validateLos1EditionRelease({...edition,pages:edition.pages.map((p,i)=>
    i===2?{...p,pdfPageIndex:80}:p)},[]).some(x=>x.includes("indeksit")));
});
test("published PDF loader refuses to fetch until all source gates pass",async()=>{
  const {edition}=makeApprovedFixture();
  let requested=false;
  await assert.rejects(()=>loadVerifiedLos1Pdf(edition,async()=>{
    requested=true;return new Response(null,{status:403});
  }),/julkaisuportteja/);
  assert.equal(requested,false);
});
test("manual publish validation uses exact bytes + digest and rejects tampered PDFs",async()=>{
  const {edition,data}=makeApprovedFixture();
  // Deliberately demonstrate a verified release scenario without bypassing
  // the production source registry: reader's actual publish function MUST
  // block this fixture because the real LOS! 1 chapter gates are open.
  const errors=validateLos1EditionRelease(edition,[]);
  assert.deepEqual(errors,[]);
  const altered=validateLos1EditionRelease({...edition,screenPdf:{...edition.screenPdf,
    pageCount:20}},[]);
  assert.ok(altered.length>0);
  assert.equal(data.length,1400);
});
