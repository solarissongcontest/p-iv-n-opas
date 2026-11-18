import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS1_REVISED_AB} from "../src/features/los/content/los1RevisedAB.ts";
import {LOS1_C_AUDIO_EXAMPLES} from "../src/features/los/content/los1SupportSpeech.ts";
import {los1CourseGlossary} from "../src/features/los/los1CourseGlossary.ts";

function words(text:string):string[]{
 return (text.match(/[\\p{L}]+/gu)??[]).map(x=>x.toLocaleLowerCase("de"));
}
test("Every word in twenty canonical German A/B texts has a German-Finnish study explanation",()=>{
 const glossary=los1CourseGlossary("10");
 const missing=new Set<string>();
 let total=0;
 for(const chapter of LOS1_REVISED_AB.chapters){
  for(const part of [chapter.textA,chapter.textB]){
   for(const block of part.blocks){
    if(block.kind!=="prose"||!("text" in block))continue;
    for(const word of words(block.text)){total++;if(!glossary[word])missing.add(word);}
   }
  }
 }
 assert.ok(total>650);
 assert.deepEqual([...missing].sort(),[]);
});
test("Every German Text C listening-script word has a dictionary gloss",()=>{
 const glossary=los1CourseGlossary("10");
 const missing=new Set<string>();
 for(const examples of Object.values(LOS1_C_AUDIO_EXAMPLES))
  for(const example of examples)
   for(const word of words(example))if(!glossary[word])missing.add(word);
 assert.deepEqual([...missing].sort(),[]);
});
