import {
  LOS1_REVIEW_II_QUESTIONS, LOS1_REVIEW_II_WRITING_ID,
  losReviewIIReflectionId, type LosReviewIIGroupId,
} from "../content/los1ReviewII.ts";
import {
  LOS1_FINAL_AUDIO_SOURCES, LOS1_FINAL_QUESTIONS,
  LOS1_FINAL_WRITING_CHECK, LOS1_FINAL_VOICE_CHECK,
  LOS1_SUMMARY_CARDS, LOS1_SUMMARY_GOAL, LOS1_SUMMARY_REFLECTION,
} from "../content/los1FinalExam.ts";

/**
 * Strict, read-only reuse of the existing Review II / EX-FINAL / Summary draft.
 * Never generate answers, playback receipts, recordings or test submissions.
 * These flags show completed student workflow, not examiner-certified CEFR skill.
 */
export type TeacherBookEvidence =
  | {kind:"review-ii";group:LosReviewIIGroupId}
  | {kind:"final-exam"}
  | {kind:"final-summary"};

export type TeacherBookEvidenceInput = {
  practiceAnswers: Readonly<Record<string,string>>;
  practiceChecked:readonly string[];
  testAnswers:Readonly<Record<string,string>>;
  testSubmittedAt:string|null;
  applicationDraft:string;
  selfAssessment:string;
};
export type TeacherBookEvidenceResult={ready:boolean;done:number;total:number;missing:readonly string[]};

const validIso=(value:string|undefined|null)=>Boolean(value && /^\d{4}-\d{2}-\d{2}T/.test(value) && !Number.isNaN(Date.parse(value)));
const choice=(v:string|undefined)=>v==="a"||v==="b"||v==="c";
const rating=(v:string|undefined)=>v==="well"||v==="some"||v==="again";
const lines=(text:string)=>text.split(/\n/).map(x=>x.trim()).filter(Boolean).length;
const fulfilled=(checks:readonly {id:string;ok:boolean;message:string}[]):TeacherBookEvidenceResult=>{
  const missing=checks.filter(x=>!x.ok).map(x=>x.message);
  return {ready:missing.length===0,done:checks.length-missing.length,total:checks.length,missing};
};

export function teacherBookEvidenceStatus(kind:TeacherBookEvidence,input?:TeacherBookEvidenceInput):TeacherBookEvidenceResult{
  if(!input)return {ready:false,done:0,total:1,missing:["Kirjan suoritustietoja ei ole ladattu."]};
  const p=input.practiceAnswers,t=input.testAnswers;
  if(kind.kind==="review-ii"){
    const questions=LOS1_REVIEW_II_QUESTIONS.filter(x=>x.group===kind.group);
    const reflection=losReviewIIReflectionId(kind.group);
    const checks=[
      ...questions.map(q=>({id:q.id,ok:choice(p[q.id])&&input.practiceChecked.includes(q.id),
        message:q.id+": vastaa ja tarkista Kertaus II -sivulla"})),
      {id:reflection,ok:rating(p[reflection]),message:reflection+": merkitse oma arvio"},
    ];
    if(kind.group==="L058")checks.push({id:LOS1_REVIEW_II_WRITING_ID,
      ok:(p[LOS1_REVIEW_II_WRITING_ID]?.trim().length??0)>=80,
      message:"Kirjoita itse vähintään 80 merkin 5–7 lauseen esittely Kertaus II -sivulla"});
    return fulfilled(checks);
  }
  if(kind.kind==="final-exam"){
    const checks=[
      ...LOS1_FINAL_QUESTIONS.map(q=>({id:q.id,ok:q.choices.some(c=>c.id===t[q.id]),
        message:q.id+": vastaa alkuperäiseen loppukokeen tehtävään"})),
      ...LOS1_FINAL_AUDIO_SOURCES.map(src=>({id:src.id,
        ok:validIso(p["EX-FINAL-AUDIO-"+src.id]),
        message:src.id+": alkuperäisäänitteen toisto ei ole päättynyt selaimessa"})),
      {id:"test-submitted",ok:validIso(input.testSubmittedAt),message:"50 tehtävän koe on palautettava oikealla koesivulla"},
      {id:"writing",ok:input.applicationDraft.trim().length>=80&&lines(input.applicationDraft)>=5&&lines(input.applicationDraft)<=7,
        message:"Oma 5–7-rivinen, vähintään 80 merkin viesti puuttuu"},
      {id:"writing-reviewed",ok:p[LOS1_FINAL_WRITING_CHECK]==="written-and-reviewed",
        message:"Vahvista kirjoitusyritys kirjan tarkistuslistalla"},
      {id:"voice-download",ok:p[LOS1_FINAL_VOICE_CHECK]==="audio-download-started",
        message:"Puheäänitteen latausta ei ole käynnistetty kirjan tallennustoiminnolla"},
      {id:"dialogue-self",ok:rating(p["EX-FINAL-DIALOGUE-SELF"]),
        message:"Äänitetyn keskustelun oma arvio puuttuu"},
      {id:"self-assessment",ok:input.selfAssessment.trim().length>=15,
        message:"Kirjoita loppukokeen erillinen sanallinen itsearvio (vähintään 15 merkkiä)"},
    ];
    return fulfilled(checks);
  }
  const summaryChecks=[
    ...Array.from({length:10},(_,i)=>{
      const id="EX-SUMMARY-C"+String(i+1).padStart(2,"0");
      return {id,ok:Boolean(p[id]?.trim()),message:"Kappaleen "+(i+1)+" osaamistavoitetta ei ole vielä katselmoitu"};
    }),
    // The existing book summary confirms five actual reviewed card IDs before
    // issuing this receipt. Reuse the receipt, not a fabricated skill score.
    {id:"cards",ok:/^reviewed-(?:[5-9]|[1-9]\d+)$/.test(p[LOS1_SUMMARY_CARDS]??""),
      message:"Vahvista vähintään viiden sanakortin itsearvio kirjan yhteenvedossa"},
    {id:"goal",ok:(p[LOS1_SUMMARY_GOAL]?.trim().length??0)>=25,
      message:"Kirjoita vähintään 25 merkin seuraava tavoite"},
    {id:"goal-confirm",ok:p["EX-SUMMARY-GOAL-OK"]==="confirmed",
      message:"Vahvista seuraava tavoite erillisellä painikkeella"},
    {id:"reflection",ok:rating(p[LOS1_SUMMARY_REFLECTION]),message:"Oma kokonaisarvio puuttuu"},
  ];
  return fulfilled(summaryChecks);
}
