/** C06 chapter: ten usable preview areas. Source integrity and review gates
 * are visible. The full 37-second audio is not sliced into invented clips.
 */
import type {ChapterSection} from "./model";
import {emptyChapterSections} from "./chapterSections.ts";
import {
  LOS1_C06_NUMBER_0_TO_20,LOS1_C06_NUMBER_21_TO_99,LOS1_C06_TENS,
} from "./los1-c06-practice.ts";
import {LOS1_C06_EXAM_EXERCISES} from "./los1-c06-test.ts";

const profiles=["lena","ben","mila","paul","eva","jonas"].map(x=>"los1-c06-profile-"+x);
export const LOS1_C06_SECTIONS:ChapterSection[]=emptyChapterSections().map(section=>{
  const content:Partial<Pick<ChapterSection,"blockIds"|"exerciseIds">>=
    section.id==="aloita"?{
      blockIds:["los1-c06-intro","los1-c06-intro-zeros","los1-c06-zero-twelve-table"],
      exerciseIds:["los1-c06-intro-meaning","los1-c06-intro-answer"],
    }:
    section.id==="teksti-a"?{
      blockIds:["los1-c06-text-a-intro","los1-c06-m-com-01-audio",
        "los1-c06-m-com-01-dialogue","los1-c06-text-a-followup"],
    }:
    section.id==="ymmarra"?{
      exerciseIds:["los1-c06-text-a-people","los1-c06-text-a-franz","los1-c06-text-a-joerg",
        "los1-c06-text-a-highlight-age","los1-c06-text-a-highlight-question"],
    }:
    section.id==="sanasto"?{
      blockIds:["los1-c06-vocabulary","los1-c06-zero-twelve-table",
        "los1-c06-teens-table","los1-c06-tens-table"],
    }:
    section.id==="kielioppi"?{
      blockIds:["los1-c06-teen-grammar","los1-c06-age-grammar","los1-c06-compare-age",
        "los1-c06-compound-grammar","los1-c06-compound-table"],
      exerciseIds:["los1-c06-formal-question","los1-c06-one-year","los1-c06-plural-years",
        "los1-c06-sixteen-spelling","los1-c06-seventeen-spelling",
        "los1-c06-twenty-one-spelling","los1-c06-twenty-seven-spelling",
        "los1-c06-thirty-spelling","los1-c06-sixty-spelling",
        "los1-c06-seventy-spelling","los1-c06-hundred-spelling"],
    }:
    section.id==="teksti-b"?{
      blockIds:["los1-c06-text-b-intro","los1-c06-m-dib-02-dialogue",
        "los1-c06-text-b-followup","los1-c06-audio-guide",
        "los1-c06-m-com-06-numbers-audio","los1-c06-m-com-06-transcript"],
      exerciseIds:["los1-c06-text-b-name","los1-c06-text-b-place",
        "los1-c06-text-b-age","los1-c06-text-b-highlight",
        "los1-c06-audio-first","los1-c06-audio-after-ten",
        "los1-c06-audio-last","los1-c06-audio-not-present",
        "los1-c06-audio-recognition"],
    }:
    section.id==="harjoittele"?{
      blockIds:["los1-c06-profile-guide","los1-c06-profile-table"],
      exerciseIds:[...LOS1_C06_NUMBER_0_TO_20.map(x=>x.id),
        ...LOS1_C06_NUMBER_21_TO_99.map(x=>x.id),...LOS1_C06_TENS.map(x=>x.id),
        ...profiles,"los1-c06-order-age","los1-c06-match-numbers","los1-c06-categorize-age"],
    }:
    section.id==="kayta"?{
      blockIds:["los1-c06-apply-guide","los1-c06-production-du","los1-c06-production-sie"],
    }:
    section.id==="kulttuuri"?{
      blockIds:["los1-c06-culture","los1-c06-culture-table"],
      exerciseIds:["los1-c06-culture-age","los1-c06-culture-privacy"],
    }:
    section.id==="tarkista"?{
      exerciseIds:LOS1_C06_EXAM_EXERCISES.map(x=>x.id),
    }:{};
  return {...section,...content,
    publicationStatus:content.blockIds?.length||content.exerciseIds?.length?"preview":"planned"};
});
