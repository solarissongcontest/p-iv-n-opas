/** C08 reading is full, human-authored Wikibooks exercise 562;
 * text B/audio is still blocked. Routes accurately distinguish the two.
 */
import type {ChapterSection} from "./model";
import {emptyChapterSections} from "./chapterSections.ts";
import {LOS1_C08_PRACTICE_EXERCISES} from "./los1-c08-practice.ts";
import {LOS1_C08_SOURCE_EXERCISES} from "./los1-c08-source.ts";
import {LOS1_C08_EXAM_A} from "./los1-c08-test.ts";
import {LOS1_C08_OTTO_EXERCISES} from "./los1-c08-otto.ts";

export const LOS1_C08_SECTIONS:ChapterSection[]=emptyChapterSections().map(section=>{
 const blockIds:string[]=
   section.id==="aloita"?["los1-c08-intro","los1-c08-goals"]:
   section.id==="teksti-a"?["los1-c08-text-a-bridge","los1-c08-source-intro","los1-c08-wb-07-repeat-phrases","los1-c08-source-gloss","los1-c08-source-explanation","los1-c08-source-outro"]:
   section.id==="ymmarra"?["los1-c08-reading-strategy"]:
   section.id==="sanasto"?["los1-c08-words"]:
   section.id==="kielioppi"?["los1-c08-phrases","los1-c08-distinction","los1-c08-tutorial-scenarios"]:
   section.id==="teksti-b"?["los1-c08-text-b-bridge","los1-c08-otto-intro","los1-c08-otto-dialogue","los1-c08-otto-grammar","los1-c08-otto-source-note","los1-c08-otto-task-instructions"]:
   section.id==="harjoittele"?["los1-c08-practice-intro","los1-c08-tutorial-scenarios"]:
   section.id==="kayta"?["los1-c08-production-ask","los1-c08-production-speak"]:
   section.id==="kulttuuri"?["los1-c08-culture"]:
   section.id==="tarkista"?["los1-c08-test-intro"]:[];
 const exerciseIds=
   section.id==="aloita"?["los1-c08-intro-not-understand","los1-c08-intro-repeat","los1-c08-intro-slow","los1-c08-intro-meaning"]:
   section.id==="ymmarra"?LOS1_C08_SOURCE_EXERCISES.map(x=>x.id):
   section.id==="ymmarra"?LOS1_C08_OTTO_EXERCISES.map(x=>x.id):
   section.id==="teksti-b"?LOS1_C08_OTTO_EXERCISES.map(x=>x.id):
   section.id==="kielioppi"?LOS1_C08_PRACTICE_EXERCISES.filter(x=>x.id.includes("grammar-")||x.id.includes("meaning-")).map(x=>x.id):
   section.id==="harjoittele"?LOS1_C08_PRACTICE_EXERCISES.map(x=>x.id):
   section.id==="kulttuuri"?["los1-c08-culture-appropriate"]:
   section.id==="tarkista"?LOS1_C08_EXAM_A.map(x=>x.id):[];
 return {...section,blockIds,exerciseIds,
   publicationStatus:blockIds.length||exerciseIds.length?"preview":"planned"};
});
