/** C07's ten independent, routable book sections.
 * All textual source content is INSIDE LOS!, without link-only chapters.
 */
import type {ChapterSection} from "./model";
import {emptyChapterSections} from "./chapterSections.ts";
import {LOS1_C07_PRACTICE_EXERCISES} from "./los1-c07-practice.ts";
import {LOS1_C07_EXAM_A} from "./los1-c07-test.ts";
const practice=LOS1_C07_PRACTICE_EXERCISES.map(item=>item.id);
export const LOS1_C07_SECTIONS:ChapterSection[]=emptyChapterSections().map(section=>{
  const content:Partial<Pick<ChapterSection,"blockIds"|"exerciseIds">>=
    section.id==="aloita"?{
      blockIds:["los1-c07-intro","los1-c07-basic-alphabet","los1-c07-alphabet-table"],
      exerciseIds:["los1-c07-intro-alphabet","los1-c07-intro-pronunciation"],
    }:
    section.id==="teksti-a"?{
      blockIds:["los1-c07-text-a-intro","los1-c07-wb-02-dialogue",
        "los1-c07-text-a-spelling-table","los1-c07-text-a-support"],
    }:
    section.id==="ymmarra"?{
      exerciseIds:["los1-c07-source-call","los1-c07-source-name","los1-c07-source-city",
        "los1-c07-source-request","los1-c07-source-repeat","los1-c07-source-phone",
        "los1-c07-source-highlight","los1-c07-source-highlight-name"],
    }:
    section.id==="sanasto"?{
      blockIds:["los1-c07-words","los1-c07-fictitious-spelling-guide",
        "los1-c07-fictional-names-table"],
    }:
    section.id==="kielioppi"?{
      blockIds:["los1-c07-spelling-grammar","los1-c07-letter-vs-sound","los1-c07-alphabet-table"],
      exerciseIds:["los1-c07-meaning-write","los1-c07-meaning-spell","los1-c07-meaning-again",
        "los1-c07-meaning-slow","los1-c07-meaning-polite","los1-c07-meaning-letter",
        "los1-c07-grammar-man","los1-c07-grammar-bitte","los1-c07-grammar-nochmal",
        "los1-c07-grammar-langsam"],
    }:
    section.id==="teksti-b"?{
      blockIds:["los1-c07-text-b-intro","los1-c07-dib-06-alphabet",
        "los1-c07-audio-intro","los1-c07-m-com-07-alphabet-audio"],
      exerciseIds:["los1-c07-coerll-list-umlaut","los1-c07-coerll-letter-b",
        "los1-c07-audioguide-reality","los1-c07-name-j","los1-c07-name-v",
        "los1-c07-name-w","los1-c07-name-z","los1-c07-name-y","los1-c07-name-ss"],
    }:
    section.id==="harjoittele"?{
      blockIds:["los1-c07-fictitious-spelling-guide","los1-c07-fictional-names-table",
        "los1-c07-number-guide","los1-c07-numbers-table"],
      exerciseIds:practice,
    }:
    section.id==="kayta"?{
      blockIds:["los1-c07-form-guide","los1-c07-production-form","los1-c07-production-phone"],
    }:
    section.id==="kulttuuri"?{
      blockIds:["los1-c07-culture"],
      exerciseIds:["los1-c07-culture-respect","los1-c07-culture-numbers"],
    }:
    section.id==="tarkista"?{
      exerciseIds:LOS1_C07_EXAM_A.map(item=>item.id),
    }:{};
  return {...section,...content,
    publicationStatus:content.blockIds?.length||content.exerciseIds?.length?"preview":"planned"};
});
