/** C05 chapter navigation: all ten required sections in LOS! 1.
 * Authentic human text never masquerades as a synthesized recording.
 */
import type {ChapterSection} from "./model";
import {emptyChapterSections} from "./chapterSections.ts";
import {LOS1_C05_EXAM_EXERCISES} from "./los1-c05-test.ts";

export const LOS1_C05_SECTIONS:ChapterSection[]=emptyChapterSections().map(section=>{
  const content:Partial<Pick<ChapterSection,"blockIds"|"exerciseIds">>=
    section.id==="aloita"?{
      blockIds:["los1-c05-intro","los1-c05-grammar-how"],
      exerciseIds:["los1-c05-intro-meaning","los1-c05-intro-reply"],
    }:
    section.id==="teksti-a"?{
      blockIds:["los1-c05-text-a-guide","los1-c05-wb-05-dialogue","los1-c05-text-a-support"],
    }:
    section.id==="ymmarra"?{
      exerciseIds:["los1-c05-source-people","los1-c05-source-question",
        "los1-c05-source-feeling","los1-c05-source-reaction","los1-c05-source-highlight"],
    }:
    section.id==="sanasto"?{
      blockIds:["los1-c05-words"],
    }:
    section.id==="kielioppi"?{
      blockIds:["los1-c05-grammar-how","los1-c05-grammar-reply",
        "los1-c05-grammar-negation","los1-c05-grammar-compare"],
      exerciseIds:["los1-c05-grammar-nicht-gap","los1-c05-grammar-sehr",
        "los1-c05-grammar-mir","los1-c05-grammar-dir","los1-c05-grammar-ihnen",
        "los1-c05-grammar-gehts","los1-c05-grammar-contrast","los1-c05-grammar-formal"],
    }:
    section.id==="teksti-b"?{
      blockIds:["los1-c05-text-b-intro","los1-c05-dib-05-lines","los1-c05-text-b-followup",
        "los1-c05-audio-guide","los1-c05-m-com-05-pronunciation"],
      exerciseIds:["los1-c05-mood-positive","los1-c05-mood-negative","los1-c05-mood-tired",
        "los1-c05-mood-very-good","los1-c05-mood-recognize",
        "los1-c05-audio-native-question","los1-c05-audio-meaning"],
    }:
    section.id==="harjoittele"?{
      exerciseIds:["los1-c05-context-01","los1-c05-context-02","los1-c05-context-03",
        "los1-c05-context-04","los1-c05-context-05","los1-c05-context-06",
        "los1-c05-order-mood","los1-c05-order-question",
        "los1-c05-classify-reactions","los1-c05-choice-reactions","los1-c05-true-nicht"],
    }:
    section.id==="kayta"?{
      blockIds:["los1-c05-application-intro","los1-c05-production"],
    }:
    section.id==="kulttuuri"?{
      blockIds:["los1-c05-culture","los1-c05-culture-table"],
      exerciseIds:["los1-c05-culture-true","los1-c05-culture-best"],
    }:
    section.id==="tarkista"?{
      exerciseIds:LOS1_C05_EXAM_EXERCISES.map(item=>item.id),
    }:{};
  return {...section,...content,
    publicationStatus:content.blockIds?.length||content.exerciseIds?.length?"preview":"planned"};
});
