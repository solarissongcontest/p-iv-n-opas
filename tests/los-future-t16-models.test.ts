import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureRemainingTask,readLosFutureRemainingAnswer,writeLosFutureRemainingAnswer}
  from "../src/features/los/content/losFutureRemaining.ts";
import {LOS_FUTURE_T16_QUESTIONS,LOS_FUTURE_T16_SPECIAL_NOTES,losFutureT16Model}
  from "../src/features/los/content/losFutureT16Models.ts";

test("all 70 T16 tasks have chapter-specific source-compatible German question examples",()=>{
  let checked=0;
  const distinct=new Set<string>();
  for(const book of LOS_BOOKS.filter(item=>item.id>=2)){
    assert.equal(Object.keys(LOS_FUTURE_T16_QUESTIONS[book.id]??{}).length,10);
    for(const chapter of book.chapters){
      const source=losFutureExercisesFor(book.id,chapter.id).find(item=>item.id.endsWith("-T16"));
      assert.ok(source,book.id+"/"+chapter.id);
      const question=LOS_FUTURE_T16_QUESTIONS[book.id]?.[chapter.id];
      assert.ok(question,source.id);
      assert.match(question,/^[A-ZÄÖÜ].+\?$/u,source.id);
      const model=losFutureT16Model(book.id,chapter.id,source.prompt);
      assert.ok(model,source.id);
      assert.equal(source.answerKey,model,source.id);
      assert.ok(model.includes(question),source.id);
      assert.ok(model.includes("\nAnnettu lähtöilmaus: "),source.id);
      assert.ok(model.includes("ei vielä ulkopuolisen saksanopettajan tarkistama"),source.id);
      assert.ok(model.includes("ei automaattinen oikeellisuusarvio"),source.id);
      assert.ok(!model.includes("Avoin tehtävä. Tarkista kysymyksen mielekkyys"),source.id);
      const task=losFutureRemainingTask(source);
      assert.ok(task,source.id);
      assert.equal(task.kind,"question");
      assert.equal(task.prompt,source.prompt);
      assert.equal(task.sourceText.endsWith("."),true,source.id);
      const student=["Wie geht es dir?","Tarkistin kysymyssanan ja verbin paikan."];
      const saved=writeLosFutureRemainingAnswer(task,student);
      const restored=readLosFutureRemainingAnswer(saved,task);
      assert.ok(restored,source.id);
      assert.deepEqual(restored.answers,student,source.id);
      distinct.add(question);
      checked++;
    }
  }
  assert.equal(checked,70);
  assert.ok(distinct.size>50,"examples must not be generic repeated fillers");
});

test("six atypical T16 replies are explained as questions, requests, salutations, headlines or imperatives",()=>{
  const cases=[
    [2,"09","Wo ist der Bahnhof?"],
    [5,"10","Trink etwas Wasser!"],
    [7,"07","Sehr geehrte Frau Müller,"],
    [7,"08","Könnten Sie die Frage bitte wiederholen?"],
    [8,"03","Neue Regeln für Busse"],
    [8,"05","Lies den Artikel!"],
  ] as const;
  assert.deepEqual(Object.keys(LOS_FUTURE_T16_SPECIAL_NOTES).sort(),
    cases.map(([book,ch])=>book+"-"+ch).sort());
  for(const [book,ch,needle] of cases){
    const task=losFutureExercisesFor(book,ch).find(item=>item.id.endsWith("-T16"));
    assert.ok(task);
    assert.ok(task.prompt.includes(needle),task.id);
    assert.ok(task.answerKey.includes(needle),task.id);
    assert.ok(task.answerKey.includes(LOS_FUTURE_T16_SPECIAL_NOTES[book+"-"+ch]!),task.id);
  }
  assert.equal(losFutureT16Model(2,"01","completely unrelated prompt"),null);
});
