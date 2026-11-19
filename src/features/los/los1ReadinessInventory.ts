import {LOS_BOOKS} from "./catalog.ts";
import {LOS1_REVISED_AB} from "./content/los1RevisedAB.ts";
import {LOS1_REVISED_C} from "./content/los1RevisedC.ts";
import {LOS1_EXECUTABLE_LESSONS} from "./guidedLessons.ts";
import {LOS1_MIDTERM_QUESTIONS,validateLosMidtermBank} from "./content/los1Exams.ts";
import {LOS1_FINAL_QUESTIONS,validateLosFinalBank} from "./content/los1FinalExam.ts";
import {LOS1_CHAPTER_TESTS_V2,validateLosChapterExams} from "./los1ChapterExams.ts";
import {validateLos1Canonical} from "./los1Canonical.ts";
import {validateLos1CanonicalLessons} from "./los1CanonicalLessons.ts";
import {LOS1_CORE_SOURCE_POLICY,los1SupplementalSourceAudit} from "./los1SupplementalAudit.ts";
import {los1AudioInventory,los1IPAAudit} from "./los1QualityAudit.ts";

/**
 * Code-derived structural inventory, NOT an invented linguistic/acoustic certification.
 * Never use this structural check as evidence of a physical device test.
 * The 18 Nov 2026 decision makes LOS-authored Text A/B/C and German browser TTS the core.
 */
export function los1CurrentReadinessInventory(){
 const book=LOS_BOOKS.find(book=>book.id===1);
 const audio=los1AudioInventory();
 const ipa=los1IPAAudit();
 const supplements=los1SupplementalSourceAudit();
 const lessonIds=LOS1_EXECUTABLE_LESSONS.map(l=>l.id);
 const chapters=Array.from({length:10},(_,index)=>{
  const id=String(index+1).padStart(2,"0");
  const canonical=LOS1_REVISED_AB.chapters.find(c=>c.chapterId==="C"+id);
  const help=LOS1_REVISED_C.chapters.find(c=>c.chapterId===id);
  const catalog=book?.chapters.find(c=>c.id===id);
  const sounds=audio.items.filter(item=>item.chapterId===id);
  const wordCount=catalog?.vocabulary.length??0;
  const linesA=canonical?.textA.blocks.filter(b=>b.kind==="prose"&&Boolean(b.text?.trim())).length??0;
  const linesB=canonical?.textB.blocks.filter(b=>b.kind==="prose"&&Boolean(b.text?.trim())).length??0;
  return {
   id:"C"+id,
   textA:{present:linesA>0,spokenLines:linesA,kind:"los-authored" as const},
   textB:{present:linesB>0,spokenLines:linesB,kind:"los-authored" as const},
   textC:{present:Boolean(help?.contentMarkdown?.trim()),speechSegments:sounds.find(x=>x.kind==="C")?.segmentCount??0,kind:"los-authored" as const},
   vocabulary:{count:wordCount,route:"device-german-tts" as const,independentIpaReview:false},
   browserSpeech:{
    scripts:sounds.filter(item=>item.segmentCount>0).length,
    needsGermanVoice:true,
    prerecordedAudioRequired:false,
   },
   authenticSupplementGate:"optional-separate-license-review" as const,
  };
 });
 const issues=[
  ...validateLos1Canonical(),
  ...validateLos1CanonicalLessons(LOS1_EXECUTABLE_LESSONS),
  ...validateLosChapterExams(),
  ...validateLosMidtermBank(),
  ...validateLosFinalBank(),
 ];
 for(const chapter of chapters){
  if(!chapter.textA.present)issues.push(chapter.id+" Text A puuttuu");
  if(!chapter.textB.present)issues.push(chapter.id+" Text B puuttuu");
  if(!chapter.textC.present)issues.push(chapter.id+" Text C puuttuu");
  if(chapter.textC.speechSegments===0)issues.push(chapter.id+" Text C TTS puuttuu");
  if(chapter.browserSpeech.scripts!==3)issues.push(chapter.id+" Text A/B/C TTS-puhejaksoja puuttuu");
  if(chapter.vocabulary.count===0)issues.push(chapter.id+" sanasto puuttuu");
 }
 if(book?.chapters.length!==10)issues.push("Ei tasan kymmentä kappaletta");
 if(lessonIds.length!==60||new Set(lessonIds).size!==60)issues.push("Ei tasan 60 uniikkia oppituntia");
 if(LOS1_MIDTERM_QUESTIONS.length!==25)issues.push("Välikokeessa ei ole 25 kysymystä");
 if(LOS1_FINAL_QUESTIONS.length!==50)issues.push("Loppukokeessa ei ole 50 kysymystä");
 if(LOS1_CHAPTER_TESTS_V2.length!==120)issues.push("Kappaletestipankissa ei ole 120 kysymystä");
 return {
  schema:"los1-readiness-inventory-v1",
  policy:LOS1_CORE_SOURCE_POLICY,
  audioPolicy:"browser-german-tts-accepted-no-prerecorded-text-a-b-c-requirement" as const,
  reviewerPolicy:"systematic-editorial-review-no-external-human-gate" as const,
  structural:{complete:issues.length===0,issues},
  totals:{chapters:chapters.length,lessons:lessonIds.length,
   lessonIds,courseVocabulary:chapters.reduce((n,c)=>n+c.vocabulary.count,0),
   browserTtsTexts:audio.withSpeech,prerecordedTextAudio:audio.recorded,
   midtermQuestions:LOS1_MIDTERM_QUESTIONS.length,
   finalQuestions:LOS1_FINAL_QUESTIONS.length,
   chapterTestQuestions:LOS1_CHAPTER_TESTS_V2.length,
   ipa:{total:ipa.total,editorial:ipa.editorial,machineCandidates:ipa.synthetic,missing:ipa.missing},
   optionalAuthenticSources:{registered:supplements.total,approved:supplements.published}},
  chapters,
  limitations:{
   linguisticHumanExpertReviewClaimed:false,
   physicalDeviceListeningVerified:false,
   physicalTwoDeviceSyncVerified:false,
   browserTtsAvailability:"device-dependent" as const,
   ipaGeneratedProposalsAreCertified:false,
  },
 };
}
