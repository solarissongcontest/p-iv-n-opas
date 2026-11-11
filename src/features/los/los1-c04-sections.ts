/** C04 all ten chapter sections connected to genuine published sources,
 * explanation, deliberate written production and complete-submit test.
 */
import type {ChapterSection} from "./model";
import {emptyChapterSections} from "./chapterSections.ts";
import {LOS1_C04_EXAM_EXERCISES} from "./los1-c04-test.ts";
const situational = Array.from({length:8},(_,index)=>
  "los1-c04-situation-"+String(index+1).padStart(2,"0"));
const capitalization = Array.from({length:6},(_,index)=>
  "los1-c04-capital-"+String(index+1).padStart(2,"0"));
export const LOS1_C04_SECTIONS:ChapterSection[]=emptyChapterSections().map(section=>{
  const content:Partial<Pick<ChapterSection,"blockIds"|"exerciseIds">>=
    section.id==="aloita"?{
      blockIds:["los1-c04-orientation","los1-c04-grammar-pronouns"],
      exerciseIds:["los1-c04-intro-du","los1-c04-intro-sie"],
    }:
    section.id==="teksti-a"?{
      blockIds:["los1-c04-text-a-guide","los1-c04-wb-06-dialogue","los1-c04-text-a-followup"],
    }:
    section.id==="ymmarra"?{
      exerciseIds:["los1-c04-source-pair","los1-c04-source-formal","los1-c04-source-tired",
        "los1-c04-source-goodbye","los1-c04-source-highlight"],
    }:
    section.id==="sanasto"?{
      blockIds:["los1-c04-vocabulary","los1-c04-review-words"],
    }:
    section.id==="kielioppi"?{
      blockIds:["los1-c04-grammar-pronouns","los1-c04-grammar-verbs",
        "los1-c04-grammar-table","los1-c04-grammar-ihnen"],
      exerciseIds:[...capitalization,"los1-c04-verb-heissen","los1-c04-verb-kommen",
        "los1-c04-verb-du-heisst","los1-c04-verb-du-kommst",
        "los1-c04-compare-du","los1-c04-compare-sie"],
    }:
    section.id==="teksti-b"?{
      blockIds:["los1-c04-text-b-guide","los1-c04-dib-07-list",
        "los1-c04-greetings-audio-guide","los1-c04-greetings-audio","los1-c04-greetings-raw"],
      exerciseIds:["los1-c04-dib-formal","los1-c04-dib-origin","los1-c04-greeting-audio"],
    }:
    section.id==="harjoittele"?{
      exerciseIds:[...situational,"los1-c04-categories",
        "los1-c04-order-formal","los1-c04-order-origin"],
    }:
    section.id==="kayta"?{
      blockIds:["los1-c04-application-guide","los1-c04-production-du","los1-c04-production-sie"],
    }:
    section.id==="kulttuuri"?{
      blockIds:["los1-c04-culture","los1-c04-culture-summary"],
      exerciseIds:["los1-c04-culture-truth","los1-c04-culture-in-school"],
    }:
    section.id==="tarkista"?{
      exerciseIds:LOS1_C04_EXAM_EXERCISES.map(item=>item.id),
    }:{};
  return {...section,...content,
    publicationStatus:content.blockIds?.length||content.exerciseIds?.length?"preview":"planned"};
});
