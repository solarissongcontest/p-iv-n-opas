import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS1_REVISED_AB} from "../src/features/los/content/los1RevisedAB.ts";
import {LOS1_REVISED_C} from "../src/features/los/content/los1RevisedC.ts";
import {LOS1_C_AUDIO_EXAMPLES,LOS1_C_SPEECH_BLOCKS} from "../src/features/los/content/los1SupportSpeech.ts";
import {losGermanVoices,losSpeakerSlot,losSpeechSegments} from "../src/features/los/losSpeech.ts";
import {validateLos1ReadingBank} from "../src/features/los/content/los1ReadingBank.ts";

test("all ten updated Text A and B dialogues have clean playable German speech segments",()=>{
  assert.equal(LOS1_REVISED_AB.chapters.length,10);
  let germanSentences=0;
  for(const chapter of LOS1_REVISED_AB.chapters){
    const id=chapter.chapterId.slice(1);
    for(const kind of ["A","B"] as const){
      const text=kind==="A"?chapter.textA:chapter.textB;
      const segments=losSpeechSegments(text.blocks,id,kind);
      assert.ok(segments.length>=3,chapter.chapterId+kind);
      assert.ok(segments.every(line=>line.text.length>0));
      assert.ok(segments.every(line=>!line.text.startsWith("Suomalainen Aino")&&!line.text.startsWith("Kurssin jälkeen")), "Finnish stage prose must not be narrated as German");
      assert.ok(segments.every(line=>!line.text.includes("**")));
      assert.ok(text.audio.mode==="browser-de-DE-speechSynthesis");
      assert.equal(text.audio.generated,false);
      assert.equal(text.audio.verified,false);
      germanSentences+=segments.length;
    }
  }
  assert.ok(germanSentences>150);
});

test("German letter chains are spoken letter-by-letter, but normal words are unchanged",()=>{
  const c07=LOS1_REVISED_AB.chapters.find(ch=>ch.chapterId==="C07");
  assert.ok(c07);
  const a=losSpeechSegments(c07.textA.blocks,"07","A");
  assert.ok(a.some(line=>line.text.includes("A, I, N, O.")));
  assert.ok(a.some(line=>line.text.includes("E, I, N, O?")));
  assert.ok(a.some(line=>line.text.includes("L, A, I, N, E")));
  const b=losSpeechSegments(c07.textB.blocks,"07","B");
  assert.ok(b.some(line=>line.text.includes("E-Mail-Adresse:")));
  assert.ok(b.some(line=>line.text.includes("A, I, N, O")));
});

test("C07 Text C keeps spelling TTS optional and separates letter names without promising acoustic approval",()=>{
  const chapter=LOS1_REVISED_C.chapters.find(ch=>ch.chapterId==="07");
  assert.ok(chapter);
  assert.match(chapter.contentMarkdown,/Jos laitteellasi on saksankielinen puheääni/);
  assert.match(chapter.contentMarkdown,/puhesynteesin todellista ääntämistä ei ole hyväksytty/);
  assert.doesNotMatch(chapter.contentMarkdown,/kuuntele aakkosäänite erikseen/i);
  const speech=losSpeechSegments(LOS1_C_SPEECH_BLOCKS["07"]??[],"07","C");
  assert.ok(speech.some(line=>line.text==="A, I, N, O"));
  assert.ok(speech.some(line=>line.text==="L, A, I, N, E"));
  assert.ok(speech.some(line=>line.text==="B, E, C, K"));
  assert.ok(speech.some(line=>line.text==="Bitte langsam!"));
  assert.ok(speech.every(line=>line.rateFactor===1));
});

test("C08 TTS explicitly slows the teacher's response after a slow-down request",()=>{
  const ch=LOS1_REVISED_AB.chapters.find(ch=>ch.chapterId==="C08");
  assert.ok(ch);
  const speech=losSpeechSegments(ch.textA.blocks,"08","A");
  const after=speech.findIndex(line=>line.speaker==="Selma"&&line.text==="Bitte langsamer!");
  assert.ok(after>=0);
  assert.equal(speech[after+1]?.speaker,"Frau Berger");
  assert.equal(speech[after+1]?.rateFactor,0.72);
  assert.ok(ch.textA.blocks.some(b=>b.kind==="stage"&&b.text?.includes("hitaammin")));
});

test("voice selection uses only de-DE/de-* voices and stable speaking roles",()=>{
  const voices=[
    {name:"English",lang:"en-US",localService:true},
    {name:"German internet",lang:"de-DE",localService:false},
    {name:"German Swiss",lang:"de-CH",localService:true},
    {name:"Deutsch Lokal",lang:"de-DE",localService:true},
    {name:"Finnish",lang:"fi-FI",localService:true},
  ];
  const eligible=losGermanVoices(voices);
  assert.equal(eligible.length,3);
  assert.deepEqual(eligible.map(x=>x.name),["Deutsch Lokal","German Swiss","German internet"]);
  assert.equal(losSpeakerSlot("Aino",3),losSpeakerSlot("Aino Laine",3));
  assert.equal(losSpeakerSlot("Leon",3),losSpeakerSlot("Leon",3));
  assert.notEqual(losSpeakerSlot("Aino",3),losSpeakerSlot("Leon",3));
  assert.equal(losGermanVoices([{name:"English",lang:"en-US"}]).length,0);
});

test("all Text C pages have distinct curated German-only examples",()=>{
  assert.equal(LOS1_REVISED_C.chapters.length,10);
  assert.equal(Object.keys(LOS1_C_AUDIO_EXAMPLES).length,10);
  for(const chapter of LOS1_REVISED_C.chapters){
    const lines=LOS1_C_AUDIO_EXAMPLES[chapter.chapterId];
    assert.ok(lines&&lines.length>=7,chapter.chapterId);
    const blocks=LOS1_C_SPEECH_BLOCKS[chapter.chapterId];
    assert.ok(blocks);
    assert.equal(blocks?.length,lines?.length);
    const speech=losSpeechSegments(blocks!,"01","C");
    assert.equal(speech.length,lines?.length);
    assert.ok(speech.every(segment=>!/(tukiteksti|tarkista ymmärrys|vastaus:)/i.test(segment.text)));
  }
});

test("editorial review status is transparent, without fabricated native or acoustic verification",()=>{
  assert.equal(LOS1_REVISED_AB.reviewedByNativeGermanSpeaker,false);
  assert.equal(LOS1_REVISED_AB.audioProduced,false);
  assert.equal(LOS1_REVISED_AB.independentNativeReviewStatus,"not-completed");
  assert.equal(LOS1_REVISED_C.independentNativeReviewStatus,"not-completed");
  assert.deepEqual(validateLos1ReadingBank(),[]);
});
