import {strict as assert} from "node:assert";
import {test} from "node:test";
import {findLosGermanVoice} from "../src/features/los/pronunciationVoices.ts";

function voice(lang:string):SpeechSynthesisVoice {
  return {name:lang,lang,voiceURI:"synthetic-"+lang,default:false,localService:true};
}

test("LOS de-DE TTS selects the German Germany voice rather than the first German locale",()=>{
  const selected=findLosGermanVoice([
    voice("de-AT"),voice("de-CH"),voice("en-US"),voice("de-DE"),
  ]);
  assert.equal(selected?.lang,"de-DE");
});

test("LOS de-DE TTS does not mislabel de-AT, de-CH or generic de as de-DE",()=>{
  assert.equal(findLosGermanVoice([voice("de-AT"),voice("de-CH"),voice("de")]),null);
});

test("LOS de-DE TTS is unavailable without matching voice and accepts case-normalized locale",()=>{
  assert.equal(findLosGermanVoice([voice("en-US"),voice("fi-FI")]),null);
  assert.equal(findLosGermanVoice([]),null);
  assert.equal(findLosGermanVoice([voice("DE-de")])?.lang,"DE-de");
});
