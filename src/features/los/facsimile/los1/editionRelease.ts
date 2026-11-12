/**
 * LOS! 1 immutable facsimile release contract.
 *
 * RELEASED_LOS1_EDITION remains null until a separately reviewed,
 * rights-cleared, authenticated publication exists. A raw public URL,
 * 15-page C01 draft or passing PDF preflight is NOT approval.
 */
import {getLos1UnreadyChapterGates} from "./fullBookOutline.ts";

export type Los1ReleasedPage={
  pageId:string;
  title:string;
  pdfPageIndex:number;
  printedPageLabel:string|null;
  kind:"front-cover"|"inside-cover"|"front-matter"|"chapter-open"|
       "content"|"blank"|"appendix"|"back-matter"|"back-cover";
  physicalSide:"left"|"right"|"single";
  spreadId:string|null;
  chapterId:string|null;
  sectionId:string|null;
  contentBlockIds:readonly string[];
  exerciseIds:readonly string[];
  imageIds:readonly string[];
  mediaIds:readonly string[];
};
export type Los1PublicationReviews={
  allTenChaptersApproved:boolean;
  sourceRightsVerified:boolean;
  imageRightsVerified:boolean;
  audioVideoRightsVerified:boolean;
  languageAndPedagogyReviewed:boolean;
  accessibilityReviewed:boolean;
  fullPageVisualPreflight:boolean;
  mobileAndDesktopVerified:boolean;
  editionMetadataSignedOff:boolean;
};
/** A server-authorized, same-origin endpoint; NOT an asset under public/. */
export type Los1PublishedEdition={
  bookId:"los-1";
  editionId:string;
  contentReleaseId:string;
  pageMapVersion:string;
  sourceManifestVersion:string;
  publicationDate:string;
  publicationStatus:"published";
  format:"B5";
  trimMm:{width:176;height:250};
  screenPdf:{
    url:string;
    sha256:string;
    byteLength:number;
    pageCount:number;
  };
  reviews:Los1PublicationReviews;
  pages:readonly Los1ReleasedPage[];
};
export const LOS1_REQUIRED_REVIEWS:readonly (keyof Los1PublicationReviews)[]=[
  "allTenChaptersApproved","sourceRightsVerified","imageRightsVerified",
  "audioVideoRightsVerified","languageAndPedagogyReviewed",
  "accessibilityReviewed","fullPageVisualPreflight",
  "mobileAndDesktopVerified","editionMetadataSignedOff",
];
/**
 * There is no released LOS! 1 PDF today. This null is a deliberate
 * publish-blocking state, not a TODO that may be bypassed by changing UI.
 */
export const RELEASED_LOS1_EDITION:Los1PublishedEdition|null=null;
export function getPublishedLos1Edition():Los1PublishedEdition|null{
  return RELEASED_LOS1_EDITION;
}

export function expectedLos1PdfPath(editionId:string):string{
  return "/api/los1/facsimile/editions/"+editionId+"/screen.pdf";
}
export function validateLos1EditionRelease(
  edition:Los1PublishedEdition,
  unresolvedChapterSourceIssues:readonly string[]=getLos1UnreadyChapterGates()
    .map(ch=>ch.chapterId+": "+ch.issues.join("; ")),
):string[]{
  const problems:string[]=[];
  if(edition.bookId!=="los-1"||edition.publicationStatus!=="published")
    problems.push("Väärä kirja tai hyväksymätön julkaisutila.");
  if(!/^[a-z0-9][a-z0-9-]{5,63}$/.test(edition.editionId))
    problems.push("Painostunnus on virheellinen.");
  for(const key of ["contentReleaseId","pageMapVersion","sourceManifestVersion"] as const)
    if(!edition[key]||edition[key].trim().length<3)problems.push("Puuttuva julkaisutieto: "+key);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(edition.publicationDate))
    problems.push("Julkaisupäivä puuttuu tai on virheellinen.");
  if(edition.format!=="B5"||edition.trimMm.width!==176||edition.trimMm.height!==250)
    problems.push("Väärä kirjan koko, odotettu 176 × 250 mm.");
  for(const name of LOS1_REQUIRED_REVIEWS){
    if(!edition.reviews[name])problems.push("Puuttuva toimituksellinen hyväksyntä: "+name);
  }
  if(unresolvedChapterSourceIssues.length)
    problems.push("Kappaleiden julkaisuportteja on auki: "+unresolvedChapterSourceIssues.join(" | "));
  const pdf=edition.screenPdf;
  if(pdf.url!==expectedLos1PdfPath(edition.editionId))
    problems.push("PDF:n osoite ei ole painoskohtainen, omistajasuojattu API-reitti.");
  if(!/^[a-f0-9]{64}$/.test(pdf.sha256))
    problems.push("PDF:n 64-merkkinen SHA-256-tiiviste puuttuu.");
  if(!Number.isSafeInteger(pdf.byteLength)||pdf.byteLength<1024||
     pdf.byteLength>200*1024*1024)
    problems.push("PDF:n tiedostokoko puuttuu tai ylittää 200 Mt.");
  if(!Number.isSafeInteger(pdf.pageCount)||pdf.pageCount<1||
     pdf.pageCount!==edition.pages.length)
    problems.push("PDF:n sivumäärä ei vastaa sivukarttaa.");

  const seenPageIds=new Set<string>();
  const spreadGroups=new Map<string,Array<Los1ReleasedPage>>();
  const chapters=new Set<string>();
  for(let i=0;i<edition.pages.length;i++){
    const page=edition.pages[i]!;
    if(page.pdfPageIndex!==i)problems.push("Sivukartan indeksit eivät ole katkeamaton 0…N−1-jono: "+page.pageId);
    if(!page.pageId.trim()||seenPageIds.has(page.pageId))
      problems.push("Puuttuva tai toistuva sivutunnus: "+page.pageId);
    seenPageIds.add(page.pageId);
    if(page.physicalSide==="single"&&page.spreadId!==null)
      problems.push("Yksittäinen sivu ei voi kuulua aukeamaan: "+page.pageId);
    if(page.physicalSide!=="single"&&!page.spreadId)
      problems.push("Aukeamasivulta puuttuu spreadId: "+page.pageId);
    if(page.spreadId)
      spreadGroups.set(page.spreadId,[...(spreadGroups.get(page.spreadId)??[]),page]);
    if(page.chapterId){
      if(!/^\d{2}$/.test(page.chapterId)||Number(page.chapterId)>10||
         Number(page.chapterId)<1)
        problems.push("Virheellinen kappaletunnus: "+page.pageId);
      chapters.add(page.chapterId);
    }
    if(page.kind==="content"&&!page.chapterId)
      problems.push("Sisältösivulta puuttuu kappaletunnus: "+page.pageId);
    if(page.kind==="content"&&!/^\d+$/.test(page.printedPageLabel??""))
      problems.push("Varsinaiselta sisältösivulta puuttuu painettu sivunumero: "+page.pageId);
  }
  for(const [spreadId,pages] of spreadGroups){
    if(pages.length!==2||pages[0]?.physicalSide!=="left"||
       pages[1]?.physicalSide!=="right"||
       pages[1].pdfPageIndex!==pages[0].pdfPageIndex+1)
      problems.push("Virheellinen aukeama: "+spreadId);
  }
  for(let n=1;n<=10;n++){
    const id=String(n).padStart(2,"0");
    if(!chapters.has(id))problems.push("Kappaleen PDF-sivut puuttuvat: C"+id);
  }
  if(edition.pages[0]?.kind!=="front-cover")
    problems.push("Painoksen etukansi puuttuu PDF:n alusta.");
  const blockIds=new Set(edition.pages.flatMap(page=>page.contentBlockIds));
  if(blockIds.size===0)problems.push("Sisältöankkurit puuttuvat sivukartasta.");
  return problems;
}
/**
 * A published page map owns the actual left/right spread pairing.
 * Never infer a real book's parity from PDF file indices.
 */
export function visibleReleasedPages(
  pages:readonly Los1ReleasedPage[],index:number,spread:boolean,
):number[]{
  if(!Number.isInteger(index)||index<0||index>=pages.length)return [];
  const current=pages[index]!;
  if(!spread||current.spreadId===null)return [index];
  return pages.flatMap((page,i)=>page.spreadId===current.spreadId?[i]:[]);
}
export function turnReleasedPage(
  pages:readonly Los1ReleasedPage[],index:number,spread:boolean,
  direction:-1|1,
):number{
  if(!pages.length)return 0;
  const current=Math.min(pages.length-1,Math.max(0,index));
  const visible=visibleReleasedPages(pages,current,spread);
  const next=direction===1?Math.max(...visible)+1:Math.min(...visible)-1;
  return Math.max(0,Math.min(pages.length-1,next));
}
export async function loadVerifiedLos1Pdf(edition:Los1PublishedEdition,
  requester:typeof fetch=fetch):Promise<ArrayBuffer>{
  const issues=validateLos1EditionRelease(edition);
  if(issues.length)throw Error("LOS! 1:n julkaisua ei ole hyväksytty: "+issues.join(" | "));
  // Auth is a SERVER responsibility. Same-origin path validation alone
  // does not protect resources if an API endpoint is public.
  const response=await requester(edition.screenPdf.url,{
    credentials:"include",cache:"no-store",redirect:"error",
    headers:{Accept:"application/pdf"},
  });
  if(!response.ok)throw Error("Painoksen avaaminen epäonnistui: HTTP "+response.status);
  const mime=response.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  if(mime!=="application/pdf")throw Error("Palvelin ei palauttanut PDF-tiedostoa.");
  const bytes=await response.arrayBuffer();
  if(bytes.byteLength!==edition.screenPdf.byteLength)
    throw Error("Julkaistun PDF:n koko ei vastaa hyväksyttyä painosta.");
  if(typeof crypto==="undefined"||!crypto.subtle)
    throw Error("Turvallista SHA-256-tarkistusta ei voi suorittaa tällä laitteella.");
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",bytes)))
    .map(byte=>byte.toString(16).padStart(2,"0")).join("");
  if(digest!==edition.screenPdf.sha256)
    throw Error("PDF:n SHA-256-tiiviste ei täsmää hyväksyttyyn julkaisuversioon.");
  return bytes;
}
