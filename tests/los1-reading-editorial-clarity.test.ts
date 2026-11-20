import test from "node:test";
import assert from "node:assert/strict";
import {losReadingQuestions,losReadingQuestionCorrect,losReadingChoiceNeedsReview,losReadingLegacyAnswerKey,validateLos1ReadingBank} from "../src/features/los/content/los1ReadingBank.ts";
import {LOS1_REVISED_AB} from "../src/features/los/content/los1RevisedAB.ts";
import {LOS1_REVISED_C} from "../src/features/los/content/los1RevisedC.ts";

function choice(chapter: string, text: "A" | "B" | "C", index: number) {
  const item = losReadingQuestions(chapter,text)[index];
  assert.ok(item,"Expected reading item "+chapter+text+String(index+1));
  assert.equal(item.kind,"choice");
  if (item.kind!=="choice") throw new Error("Expected multiple-choice reading item");
  return item;
}

test("C08 understands not understanding without inventing mistakes",()=>{
  const item=choice("08","B",2);
  const source=LOS1_REVISED_AB.chapters.find(c=>c.chapterId==="C08");
  assert.ok(source);
  const text=JSON.stringify(source.textB.blocks);
  assert.match(text,/Ich verstehe nicht immer alles/);
  assert.match(item.prompt,/ettei ymmärrä aina kaikkea/);
  assert.doesNotMatch(item.prompt,/virhei/);
  assert.equal(item.options[item.answerIndex],"Se ei haittaa");
  assert.equal(losReadingQuestionCorrect(item,"Se ei haittaa"),true);
});

test("C09 only assesses the appointment clock time actually stated in Text A",()=>{
  const item=choice("09","A",4);
  const source=LOS1_REVISED_AB.chapters.find(c=>c.chapterId==="C09");
  assert.ok(source);
  assert.match(JSON.stringify(source.textA.blocks),/Donnerstag, vier Uhr/);
  assert.match(item.prompt,/Mille päivälle ja kellonajalle/);
  assert.equal(item.options[item.answerIndex],"Torstai kello neljä");
  assert.doesNotMatch(item.options.join(" "),/kello 16/);
  assert.match(item.explanation,/4\.00 vai 16\.00/);
  assert.equal(losReadingQuestionCorrect(item,"Torstai kello neljä"),true);
});

test("C09 free-day question acknowledges both weekend days shown in Text B",()=>{
  const item=choice("09","B",2);
  const source=LOS1_REVISED_AB.chapters.find(c=>c.chapterId==="C09");
  assert.ok(source);
  const timetable=JSON.stringify(source.textB.blocks);
  assert.match(timetable,/Samstag.*frei/);
  assert.match(timetable,/Sonntag.*frei/);
  assert.match(item.prompt,/vaihtoehdoissa mainituista/);
  assert.match(item.explanation,/Myös lauantai/);
  assert.equal(item.options[item.answerIndex],"Sonntag");
  assert.equal(losReadingQuestionCorrect(item,"Sonntag"),true);
});

test("editorial clarifications preserve all 150 reader IDs and source evidence checks",()=>{
  assert.deepEqual(validateLos1ReadingBank(),[]);
  const items=Array.from({length:10},(_,i)=>String(i+1).padStart(2,"0"))
    .flatMap(chapter=>["A","B","C"].flatMap(kind=>losReadingQuestions(chapter,kind as "A"|"B"|"C")));
  assert.equal(items.length,150);
  assert.equal(new Set(items.map(x=>x.id)).size,150);
});

test("C02 Text C points to the first actual Mein Name ist example in C03 Text B",()=>{
  const c02=LOS1_REVISED_C.chapters.find(ch=>ch.chapterId==="02");
  const textB02=LOS1_REVISED_AB.chapters.find(ch=>ch.chapterId==="C02");
  const textB03=LOS1_REVISED_AB.chapters.find(ch=>ch.chapterId==="C03");
  assert.ok(c02 && textB02 && textB03);
  const b02=JSON.stringify(textB02.textB.blocks);
  const b03=JSON.stringify(textB03.textB.blocks);
  assert.doesNotMatch(b02,/Mein Name ist/);
  assert.match(b03,/Mein Name ist/);
  assert.match(c02.contentMarkdown,/C03:n Text B:n henkilöesittelyissä/);
  assert.doesNotMatch(c02.contentMarkdown,/tunnistaa Text B:n viesteissä/);
});

test("Legacy reading choices remain reviewable without being marked wrong",()=>{
  const q=choice("09","A",4);
  assert.equal(q.id,"LOS1-READ-V2-C09-A-05");
  for(const previous of ["Torstai kello 16","Keskiviikko kello 15","Tiistai kello 14"]){
    assert.equal(losReadingChoiceNeedsReview(q,previous),true);
    assert.equal(losReadingQuestionCorrect(q,previous),null);
  }
  assert.equal(losReadingChoiceNeedsReview(q,""),false);
  assert.equal(losReadingChoiceNeedsReview(q,"Torstai kello neljä"),false);
  assert.equal(losReadingQuestionCorrect(q,"Torstai kello neljä"),true);
  assert.equal(losReadingQuestionCorrect(q,"Tiistai kello kaksi"),false);
  assert.equal(losReadingLegacyAnswerKey(q.id),"LOS1-READ-LEGACY-LOS1-READ-V2-C09-A-05");
});

test("Unmodified choices and open tasks retain their established grading rules",()=>{
  const normal=choice("01","A",0);
  assert.equal(losReadingChoiceNeedsReview(normal,"Saksan kurssia"),false);
  assert.equal(losReadingQuestionCorrect(normal,"Saksan kurssia"),true);
  assert.equal(losReadingQuestionCorrect(normal,"Junaa"),false);
  const writing=losReadingQuestions("09","A").find(q=>q.kind==="open");
  assert.ok(writing);
  assert.equal(losReadingChoiceNeedsReview(writing,"Oma vastaus"),false);
  assert.equal(losReadingQuestionCorrect(writing,"Oma vastaus"),null);
});
