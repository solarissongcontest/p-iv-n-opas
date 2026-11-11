/** C10 ten routable textbook sections with BOTH complete real interviews.
 * No simulated audio or undisclosed source paraphrases.
 */
import type {ChapterSection} from "./model";
import {emptyChapterSections} from "./chapterSections.ts";
import {LOS1_C10_PRACTICE_EXERCISES} from "./los1-c10-practice.ts";
import {LOS1_C10_SOURCE_EXERCISES} from "./los1-c10-source.ts";
import {LOS1_C10_EXAM_A} from "./los1-c10-test.ts";
import {LOS1_C10_CONTRAST_BLOCKS,LOS1_C10_CONTRAST_EXERCISES} from "./los1-c10-listen.ts";

export const LOS1_C10_SECTIONS:ChapterSection[]=emptyChapterSections().map(section=>{
 const blockIds:string[]=
   section.id==="aloita"?["los1-c10-intro","los1-c10-goals"]:
   section.id==="teksti-a"?["los1-c10-text-a-intro","los1-c10-m-dib-02-harald","los1-c10-harald-support"]:
   section.id==="ymmarra"?["los1-c10-reading-plan","los1-c10-source-comparison",
    ...LOS1_C10_CONTRAST_BLOCKS.map(b=>b.id),"los1-c01-m-com-01-audio"]:
   section.id==="sanasto"?["los1-c10-vocabulary"]:
   section.id==="kielioppi"?["los1-c10-first-person-third","los1-c10-verb-table","los1-c10-sie-clarification","los1-c10-we-intro"]:
   section.id==="teksti-b"?["los1-c10-text-b-intro","los1-c10-m-dib-01-berna","los1-c10-berna-support"]:
   section.id==="harjoittele"?["los1-c10-practice-guide","los1-c10-scaffold"]:
   section.id==="kayta"?["los1-c10-production-third","los1-c10-production-meeting"]:
   section.id==="kulttuuri"?["los1-c10-culture"]:
   section.id==="tarkista"?["los1-c10-test-intro"]:[];
 const exerciseIds=
   section.id==="aloita"?[
     "los1-c10-intro-who","los1-c10-intro-her","los1-c10-intro-him","los1-c10-intro-pleasure",
   ]:
   section.id==="ymmarra"?[...LOS1_C10_SOURCE_EXERCISES,...LOS1_C10_CONTRAST_EXERCISES].map(ex=>ex.id):
   section.id==="kielioppi"?LOS1_C10_PRACTICE_EXERCISES.filter(ex=>
     ex.id.includes("grammar-")||ex.id.includes("vocab-")||ex.id.includes("gap-")||
     ex.id.includes("order-")||ex.id.includes("categorize-")).map(ex=>ex.id):
   section.id==="harjoittele"?LOS1_C10_PRACTICE_EXERCISES.map(ex=>ex.id):
   section.id==="kulttuuri"?["los1-c10-culture-sie","los1-c10-source-not-new"]:
   section.id==="tarkista"?LOS1_C10_EXAM_A.map(ex=>ex.id):[];
 return {...section,blockIds,exerciseIds,
  publicationStatus:blockIds.length||exerciseIds.length?"preview":"planned"};
});
