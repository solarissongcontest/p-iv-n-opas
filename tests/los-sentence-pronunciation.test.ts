import {test} from "node:test";
import assert from "node:assert/strict";
import {losSpeechSentenceSegments,losSpeechSegments} from "../src/features/los/losSpeech.ts";
import {LOS1_REVISED_AB} from "../src/features/los/content/los1RevisedAB.ts";
import {LOS1_C_SPEECH_BLOCKS} from "../src/features/los/content/los1SupportSpeech.ts";

test("spoken German turns split into replayable sentences without losing any words",()=>{
 const input="Hallo! Ich heiße Aino. Woher kommst du? Ich komme aus Finnland.";
 assert.deepEqual(losSpeechSentenceSegments(input),[
  "Hallo!","Ich heiße Aino.","Woher kommst du?","Ich komme aus Finnland.",
 ]);
 assert.deepEqual(losSpeechSentenceSegments("   "),[]);
 assert.deepEqual(losSpeechSentenceSegments("Noch einmal, bitte!"),["Noch einmal, bitte!"]);
 assert.deepEqual(losSpeechSentenceSegments("A, I, N, O."),["A, I, N, O."]);
 assert.deepEqual(losSpeechSentenceSegments("Guten Morgen!   Guten Tag!"),["Guten Morgen!","Guten Tag!"]);
});
test("every LOS1 Text A/B/C has individually listenable German sentence units",()=>{
 for(let n=1;n<=10;n++){
  const id=String(n).padStart(2,"0");
  const ch=LOS1_REVISED_AB.chapters.find(x=>x.chapterId==="C"+id);
  assert.ok(ch,"missing chapter "+id);
  for(const [kind,blocks] of [
   ["A",ch.textA.blocks],["B",ch.textB.blocks],["C",LOS1_C_SPEECH_BLOCKS[id]??[]]
  ] as const){
   const turns=losSpeechSegments(blocks,id,kind);
   const sentences=turns.flatMap(x=>losSpeechSentenceSegments(x.text));
   assert.ok(turns.length>0,id+kind+" has turns");
   assert.ok(sentences.length>=turns.length,id+kind+" has per-sentence segments");
   assert.ok(sentences.every(x=>x.trim().length>0),id+kind+" has no empty sentence");
  }
 }
});
