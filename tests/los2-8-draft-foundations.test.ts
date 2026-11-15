import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_BOOKS } from "../src/features/los/catalog.ts";
import { LOS_FUTURE_MANUSCRIPTS } from "../src/features/los/content/losFutureManuscripts.ts";
import { losFutureExercisesFor } from "../src/features/los/content/losFutureExercises.ts";
import { losFutureExercisesForSection } from "../src/features/los/content/losFutureExerciseSections.ts";
import { losFutureLessonOutline } from "../src/features/los/losFutureLessonOutline.ts";
import { getLosFutureLesson } from "../src/features/los/content/losFutureLessons.ts";

test("LOS! 2–8 has 70 accurately namespaced manuscript chapters", () => {
  assert.equal(LOS_BOOKS.length,8);
  const later=LOS_BOOKS.filter(book=>book.id>=2);
  assert.equal(later.length,7);
  assert.equal(later.reduce((sum,book)=>sum+book.chapters.length,0),70);
  for(const book of later){
    assert.deepEqual(book.chapters.map(ch=>ch.id),Array.from({length:10},(_,i)=>String(i+1).padStart(2,"0")));
    assert.equal(new Set(book.chapters.map(ch=>ch.title)).size,10);
    assert.equal(Object.keys(LOS_FUTURE_MANUSCRIPTS[book.id]??{}).length,10);
  }
});

test("all 70 manuscripts carry genuine sourced draft fields, not fake audio or exams", () => {
  let textACount=0,textBCount=0,dialogueCount=0,glossaryCount=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2)){
    const drafts=LOS_FUTURE_MANUSCRIPTS[book.id];
    assert.ok(drafts);
    for(const chapter of book.chapters){
      const data=drafts[chapter.id];
      assert.ok(data,`Missing chapter ${book.id}-${chapter.id}`);
      assert.equal(chapter.title,data.title);
      assert.equal(chapter.grammar,data.grammarTopic);
      assert.deepEqual(chapter.objectives,[data.objective]);
      assert.ok(data.textA.length>=200,`Short Text A in ${book.id}-${chapter.id}`);
      assert.ok(data.textB.length>=15,`Short Text B in ${book.id}-${chapter.id}`);
      assert.ok(data.intro.length>=100);
      assert.ok(data.grammarExplanation.length>=100);
      assert.ok(data.dialogue.length>=3);
      assert.ok(data.vocabulary.length>=10);
      assert.deepEqual(chapter.vocabulary,data.vocabulary.map(({de,fi})=>de+" – "+fi));
      assert.ok(data.vocabulary.every(v=>v.de && v.fi && !(v.de==="Suomi"&&v.fi==="Huomio")));
      textACount++;textBCount++;dialogueCount++;
      glossaryCount+=data.vocabulary.length;
    }
  }
  assert.equal(textACount,70);
  assert.equal(textBCount,70);
  assert.equal(dialogueCount,70);
  assert.equal(glossaryCount,1291);
});

test("later-book routing stays isolated from book 1's saved answers and study records", () => {
  const route=readFileSync("src/features/los/LosBook.tsx","utf8");
  const preview=readFileSync("src/features/los/LosFutureBookPreview.tsx","utf8");
  assert.ok(route.includes('const chapter = book !== null && /^(0[1-9]|10)$/.test'));
  assert.ok(route.includes('book.id !== 1 ? <LosFutureBookPreview'));
  assert.ok(route.includes('chapter && book.id===1 && <LosNotebook'));
  assert.ok(preview.includes("LosFutureExercises"));
  assert.doesNotMatch(preview,/losExercisesFor|useLosChapterDraft|LosChapterGrammar|LosAuthenticAudio/);
  assert.match(preview,/LOS_FUTURE_MANUSCRIPTS/);
});

test("LOS! 2–8 searchable texts remain explicitly labelled editorial drafts", () => {
  const search=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(search,/LOS_FUTURE_MANUSCRIPTS/);
  assert.match(search,/Harjoitusteksti/);
  assert.match(search,/textA/);
  assert.match(search,/textB/);
});

test("all 1,820 manuscript tasks have distinct book-qualified IDs, prompts and answer keys", () => {
  const ids=new Set<string>();
  let total=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2)){
    for(const chapter of book.chapters){
      const tasks=losFutureExercisesFor(book.id,chapter.id);
      assert.equal(tasks.length,26,`LOS${book.id} C${chapter.id}: unexpected task count`);
      assert.deepEqual(tasks.map(x=>x.id),
        [...Array.from({length:20},(_,i)=>`LOS${book.id}-C${chapter.id}-T${String(i+1).padStart(2,"0")}`),
         ...Array.from({length:6},(_,i)=>`LOS${book.id}-C${chapter.id}-R${String(i+1).padStart(2,"0")}`)]);
      for(const task of tasks){
        assert.equal(task.chapterId,chapter.id);
        assert.match(task.id,new RegExp(`^LOS${book.id}-C${chapter.id}-[TR]\\d{2}$`));
        assert.ok(task.prompt.length>5,task.id);
        assert.ok(task.answerKey.length>1,task.id);
        assert.ok(!ids.has(task.id),`Duplicate ID ${task.id}`);
        ids.add(task.id);
        total++;
      }
      assert.deepEqual(["understand","practice","apply"].map(mode =>
        losFutureExercisesForSection(tasks,mode as "understand"|"practice"|"apply").length),[9,14,3]);
      const assigned=["understand","practice","apply"].flatMap(mode =>
        losFutureExercisesForSection(tasks,mode as "understand"|"practice"|"apply").map(t=>t.id));
      assert.equal(new Set(assigned).size,26,"A task occurs in multiple sections");
      assert.deepEqual(new Set(assigned),new Set(tasks.map(t=>t.id)));
    }
  }
  assert.equal(total,1820);
  assert.equal(losFutureExercisesFor(1,"01").length,0,"LOS! 1 must never reuse manuscript exercises");
  assert.equal(losFutureExercisesFor(2,"11").length,0,"No invalid chapter data");
});

test("LOS! 2–8 answers use existing owner + book + chapter draft storage, with no false grading", () => {
  const exerciseUI=readFileSync("src/features/los/LosFutureExercises.tsx","utf8");
  const state=readFileSync("src/features/los/studyState.ts","utf8");
  assert.match(exerciseUI,/useLosChapterDraft\(bookId,chapterId\)/);
  assert.match(exerciseUI,/practiceAnswers:\{\.\.\.current\.practiceAnswers/);
  assert.match(exerciseUI,/practiceChecked:/);
  assert.match(exerciseUI,/ei tarkistettu automaattinen arvostelu/);
  assert.doesNotMatch(exerciseUI,/losScore\(|testSubmittedAt:\s*new Date/);
  assert.ok(state.includes("${ownerId}.${bookId}.${chapterId}"));
});

test("all seven 60-slot lesson paths expose 350 chapter scripts and 70 review and exam briefs", () => {
  let total=0;
  for(const book of LOS_BOOKS.filter(x=>x.id>=2)){
    const slots=losFutureLessonOutline(book);
    assert.equal(slots.length,60);
    assert.deepEqual(slots.map(x=>x.number),Array.from({length:60},(_,i)=>i+1));
    assert.deepEqual(slots.filter(x=>x.phase==="review").map(x=>x.number),[1,27,28,29,30,56,57,58,59,60]);
    assert.equal(slots.filter(x=>x.phase==="chapter").length,50);
    assert.ok(slots.every(x=>x.status==="manuscript-draft"));
    assert.ok(slots.filter(x=>x.phase==="review").every(x=>x.chapterId===null&&x.destination===null));
    for(const chapter of book.chapters){
      const list=slots.filter(x=>x.chapterId===chapter.id);
      assert.equal(list.length,5);
      assert.deepEqual(list.map(x=>x.destination),["chapter","text","grammar","practice","apply"]);
      assert.ok(list.every(x=>x.chapterTitle===chapter.title));
    }
    assert.equal(new Set(slots.map(x=>x.id)).size,60);
    assert.match(slots[0]?.id??"",new RegExp(`^LOS${book.id}-L001$`));
    total+=slots.length;
  }
  assert.equal(total,420);
  assert.equal(losFutureLessonOutline(LOS_BOOKS[0]!).length,0);
  assert.equal(getLosFutureLesson(1,1),null);
  assert.equal(getLosFutureLesson(8,61),null);
  const viewer=readFileSync("src/features/los/LosFutureLearningPath.tsx","utf8");
  assert.match(viewer,/0 valmiiksi hyväksyttyä ohjattua oppituntia/);
  assert.match(viewer,/Pelkkä siirtymä sisältösivulle/);
});

test("all 420 manuscript scripts have source-grounded teaching content and safe exercise refs",()=>{
  let lessons=0,chapters=0,reviews=0,taskLinks=0;
  for(const book of LOS_BOOKS.filter(x=>x.id>=2)){
    const outline=losFutureLessonOutline(book);
    for(const slot of outline){
      const script=getLosFutureLesson(book.id,slot.number);
      assert.ok(script,slot.id);
      assert.equal(script.id,slot.id);
      assert.equal(script.title,slot.title);
      assert.equal(script.kind,slot.phase);
      assert.ok(script.intro.length>70,script.id);
      if(script.kind==="chapter"){
        chapters++;
        assert.ok(script.objective.length>10,script.id);
        assert.ok(script.model.length>70,script.id);
        assert.ok(script.guidance.length>70,script.id);
        assert.ok(script.attempt.length>25,script.id);
        assert.ok(script.exitCheck.length>60,script.id);
        assert.equal(script.timings.length,5,script.id);
        assert.equal(script.timings.reduce((sum,s)=>sum+s.minutes,0),30,script.id);
        assert.equal(slot.estimatedMinutes,30,script.id);
        assert.ok(script.exerciseIds.length>=3,script.id);
        const chapterTasks=losFutureExercisesFor(book.id,slot.chapterId!);
        const knownIds=new Set(chapterTasks.map(x=>x.id));
        for(const taskId of script.exerciseIds){
          assert.ok(knownIds.has(taskId),`Broken task reference in ${script.id}: ${taskId}`);
          taskLinks++;
        }
      }else{
        reviews++;
        assert.ok(script.reviewTeaching.length>45,script.id);
        assert.ok(script.reviewTask.length>40,script.id);
        assert.ok(script.reviewTiming.includes("min"),script.id);
        assert.ok(script.reviewRule.length>40,script.id);
        assert.equal(script.exerciseIds.length,0,script.id);
        if(script.number===30||script.number===59){
          assert.ok(slot.estimatedMinutes>=55,`Exam duration must not be silently shortened: ${script.id}`);
        }
      }
      lessons++;
    }
  }
  assert.equal(lessons,420);
  assert.equal(chapters,350);
  assert.equal(reviews,70);
  assert.ok(taskLinks>1500);
  const runner=readFileSync("src/features/los/LosFutureLessonRunner.tsx","utf8");
  assert.match(runner,/mode="guided" taskIds=\{script\.exerciseIds\}/);
  assert.match(runner,/useLosChapterDraft\(bookId,chapterId\)/);
  assert.doesNotMatch(runner,/completedAt:\s*new Date|losScore\(/);
});
