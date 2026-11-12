import {findLosSource,LOS1_CHAPTER_SOURCE_PLANS,validateLosSourceRegistry} from "./content/sourceRegistry.ts";
import {LOS1_EXECUTABLE_LESSONS} from "./guidedLessons.ts";
import {validateLosFinalBank} from "./content/los1FinalExam.ts";
import {validateLosTextB} from "./content/los1TextBAdditional.ts";

/**
 * LOS! 1 masterplan G1–G8 release criteria, FAIL-CLOSED.
 *
 * Executable guided lesson count is NOT a release readiness score.
 * An external runtime/CDN/browser check or native language review MUST NOT
 * be marked passed merely because source code compiles or the marker exists.
 * Manual records below have false until actual evidence has been collected.
 */
export type LosReleaseGateId="G1"|"G2"|"G3"|"G4"|"G5"|"G6"|"G7"|"G8";
export type LosReleaseGate={
 id:LosReleaseGateId;
 title:string;
 passed:boolean;
 detail:string;
 evidence:string|null;
};
type ManualSignoff={
 reviewed:boolean;
 evidence:string|null;
};
export const LOS1_MANUAL_RELEASE_EVIDENCE:Readonly<Record<"G4"|"G5"|"G6"|"G7"|"G8",ManualSignoff>>={
 G4:{reviewed:false,evidence:null}, // active glossary, part of speech, duplicates and inflection checked
 G5:{reviewed:false,evidence:null}, // all source-based question keys, human language review
 G6:{reviewed:false,evidence:null}, // real desktop/mobile e2e and deploy smoke
 G7:{reviewed:false,evidence:null}, // WCAG 2.2 usability, input/focus/touch/contrast audited
 G8:{reviewed:false,evidence:null}, // real two-device sync and outage recovery verified
};
export const LOS1_TEXT_B_PROVENANCE={
 "01":"M-COM-03",
 "02":"M-COM-02",
 "03":"M-COM-02",
 "04":"M-COM-03",
 "05":"M-COM-08",
 "06":"M-COM-01",
 "07":"M-COM-06",
 "08":null, // Eva/Jan Im Unterricht original media remains unavailable in reader
 "09":"M-COM-07",
 "10":"M-COM-02",
} as const;
const chapterIds=["01","02","03","04","05","06","07","08","09","10"] as const;
const manualPassed=(id:keyof typeof LOS1_MANUAL_RELEASE_EVIDENCE)=>{
 const record=LOS1_MANUAL_RELEASE_EVIDENCE[id];
 return record.reviewed && Boolean(record.evidence?.trim()) ? record.evidence! : null;
};
export type LosReleaseReadiness={
 lessons:{available:number;planned:60};
 textA:{rightsIntegrated:number;total:10;pendingReview:string[]};
 textB:{integrated:number;mediaDeviceTested:number;total:10;missing:string[]};
 gates:readonly LosReleaseGate[];
 ready:boolean;
 registryErrors:readonly string[];
};
export function getLosReleaseReadiness():LosReleaseReadiness{
 const registryErrors=[...validateLosSourceRegistry(),...validateLosFinalBank(),...validateLosTextB()];
 const texts=chapterIds.map(id=>{
  const plan=LOS1_CHAPTER_SOURCE_PLANS.find(p=>p.id==="C"+id);
  const source=plan?.primarySourceId?findLosSource(plan.primarySourceId):undefined;
  const textIntegrated=Boolean(source&&source.kind==="source"&&source.integrated&&
   source.licenseCode&&source.licenseUrl&&source.licenseEvidenceUrl&&
   ["rights-verified","language-reviewed","integrated","device-tested","published"].includes(source.stage));
  return {id,source,textIntegrated};
 });
 const rightsIntegrated=texts.filter(t=>t.textIntegrated).length;
 const pendingReview=texts.filter(t=>!t.source?.languageReviewed).map(t=>"C"+t.id);
 const b=chapterIds.map(id=>{
  const sourceId=LOS1_TEXT_B_PROVENANCE[id];
  const resource=sourceId?findLosSource(sourceId):undefined;
  return {id,sourceId,integrated:Boolean(resource&&resource.integrated),verified:Boolean(resource&&resource.integrated&&resource.mediaTested&&resource.deviceTested)};
 });
 const integrated=b.filter(x=>x.integrated).length;
 const mediaDeviceTested=b.filter(x=>x.verified).length;
 const missing=b.filter(x=>!x.integrated).map(x=>"C"+x.id);
 const g1=rightsIntegrated===10&&registryErrors.length===0;
 const g2=integrated===10&&mediaDeviceTested===10;
 const g3=pendingReview.length===0;
 const g4=manualPassed("G4"),g5=manualPassed("G5"),g6=manualPassed("G6"),g7=manualPassed("G7"),g8=manualPassed("G8");
 const gates:LosReleaseGate[]=[
  {id:"G1",title:"Kokonaiset luvalliset päätekstit",passed:g1,
   detail:rightsIntegrated+"/10 ensisijaista tekstiä lähde- ja lisenssimerkintöineen lukijassa; julkaisematon esikatselu ei tarkoita kokonaislaadun hyväksyntää.",evidence:g1?"Lähderekisterin tekninen validointi":null},
  {id:"G2",title:"Text B ja mediat",passed:g2,
   detail:integrated+"/10 Text B -aineistoa kirjan sisällä; "+mediaDeviceTested+"/10 oikeasti varmennettua audio-/media- ja laitetestiä. "+
    (missing.length?"Puuttuvat kokonaiset toiset aineistot: "+missing.join(", ")+".":"Kokonaiset toiset aineistot kytketty."),
   evidence:null},
  {id:"G3",title:"Saksan kieli ja opetustaso",passed:g3,
   detail:g3?"Kaikille pääteksteille on kirjattu hyväksytty saksan ja A1.1-tason arvio.":
     "Natiivin/pätevän tarkistajan kuittaus puuttuu: "+pendingReview.join(", ")+".",evidence:null},
  {id:"G4",title:"Sanaston tarkistus",passed:Boolean(g4),
   detail:"Aktiivisanaston deduplikointi, artikkelit, muodot ja käyttötilanteet vaativat erillisen katselmoinnin.",evidence:g4},
  {id:"G5",title:"Tehtävien laadunvarmistus",passed:Boolean(g5),
   detail:"Tehtävien avaimet, lähdevastaukset ja oikean vaikeustason ihmistarkistus on hyväksyttävä erikseen.",evidence:g5},
  {id:"G6",title:"Julkaisu ja E2E",passed:Boolean(g6),
   detail:"Automaattinen koodin build ei korvaa oikeita mobiili- ja desktop-käyttöpolkuja eikä Vercelin tuotantojulkaisun tarkistusta.",evidence:g6},
  {id:"G7",title:"Saavutettavuus",passed:Boolean(g7),
   detail:"Näppäimistö-, fokus-, kosketus-, ruudunluku- ja kontrastitestit on tehtävä todellisessa selaimessa.",evidence:g7},
  {id:"G8",title:"Kahden laitteen tietoturvallinen synkronointi",passed:Boolean(g8),
   detail:"JSON-varmuuskopio ei yksin todista turvallista kaksisuuntaista synkronointia, ristiriitoja tai verkkokatkosten palautumista.",evidence:g8},
 ];
 const ready=registryErrors.length===0&&LOS1_EXECUTABLE_LESSONS.length===60&&gates.every(g=>g.passed);
 return {lessons:{available:LOS1_EXECUTABLE_LESSONS.length,planned:60},
  textA:{rightsIntegrated,total:10,pendingReview},
  textB:{integrated,mediaDeviceTested,total:10,missing},
  gates,ready,registryErrors};
}
