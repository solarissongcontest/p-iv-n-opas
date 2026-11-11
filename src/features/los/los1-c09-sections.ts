/** C09 ten canonical routed study pages. Source-specific A reading and B audio
 * never become falsely published merely because another section is ready.
 */
import type {ChapterSection} from "./model";
import {emptyChapterSections} from "./chapterSections.ts";
import {LOS1_C09_PRACTICE_EXERCISES} from "./los1-c09-practice.ts";
import {LOS1_C09_SOURCE_EXERCISES} from "./los1-c09-source.ts";
import {LOS1_C09_EXAM_A} from "./los1-c09-test.ts";

const grammarItems=[
 "los1-c09-preposition-day","los1-c09-preposition-hour",
 "los1-c09-preposition-both","los1-c09-meaning-heute","los1-c09-meaning-morgen",
 "los1-c09-meaning-gestern","los1-c09-meaning-week",
 "los1-c09-meaning-uhr","los1-c09-grammar-day","los1-c09-grammar-hour",
 "los1-c09-grammar-when","los1-c09-grammar-three",
 "los1-c09-order-monday","los1-c09-order-tuesday",
];
export const LOS1_C09_SECTIONS:ChapterSection[]=emptyChapterSections().map(section=>{
 const blockIds:string[]=
  section.id==="aloita"?["los1-c09-intro","los1-c09-weekday-guide","los1-c09-weekdays-table"]:
  section.id==="teksti-a"?["los1-c09-text-a-pending","los1-c09-source-time-support"]:
  section.id==="ymmarra"?["los1-c09-source-reading-guide"]:
  section.id==="sanasto"?["los1-c09-words"]:
  section.id==="kielioppi"?["los1-c09-am-um","los1-c09-heute-morgen","los1-c09-source-time-support"]:
  section.id==="teksti-b"?["los1-c09-text-b-intro","los1-c09-wb-04-days","los1-c09-text-b-media-pending"]:
  section.id==="harjoittele"?["los1-c09-calendar-guide","los1-c09-calendar-table"]:
  section.id==="kayta"?["los1-c09-production-calendar","los1-c09-production-meeting"]:
  section.id==="kulttuuri"?["los1-c09-culture"]:
  section.id==="tarkista"?["los1-c09-test-intro"]:[];
 const exerciseIds=
  section.id==="aloita"?["los1-c09-intro-when","los1-c09-intro-day","los1-c09-intro-order","los1-c09-intro-weekend"]:
  section.id==="kielioppi"?grammarItems:
  section.id==="teksti-b"?LOS1_C09_SOURCE_EXERCISES.map(ex=>ex.id):
  section.id==="harjoittele"?LOS1_C09_PRACTICE_EXERCISES.map(ex=>ex.id):
  section.id==="kulttuuri"?["los1-c09-culture-format"]:
  section.id==="tarkista"?LOS1_C09_EXAM_A.map(ex=>ex.id):[];
 return {...section,blockIds,exerciseIds,
  publicationStatus:blockIds.length||exerciseIds.length?"preview":"planned"};
});
