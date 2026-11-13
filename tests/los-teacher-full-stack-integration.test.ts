import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonRegistry.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { LOS_EXERCISES } from "../src/features/los/exerciseBank.ts";

/**
 * Stack-only CI guard: run after every L001–L060 feature branch has been
 * merged into the disposable integration worktree, never on an isolated draft.
 * Passing unit tests in separate feature branches does not prove registry
 * reachability once their lesson/player edits have been reconciled.
 */
const ranges: Array<[number,number,string]> = [
  [1,6,"01"], [7,11,"02"], [12,16,"03"], [17,21,"04"],
  [22,26,"05"], [27,30,"91"], [31,35,"06"], [36,40,"07"],
  [41,45,"08"], [46,50,"09"], [51,55,"10"],
  [56,58,"92"], [59,60,"93"],
];

test("full LOS! 1 Teacher 2.0 stack registers precisely L001–L060 with original chapter boundaries",()=>{
  const entries=ranges.flatMap(([start,end,chapter])=>
    Array.from({length:end-start+1},(_,i)=>({
      id:"L"+String(start+i).padStart(3,"0"), chapter,
    })));
  assert.equal(entries.length,60);
  assert.equal(new Set(entries.map(x=>x.id)).size,60);

  const missing:string[]=[];
  for(const {id,chapter} of entries){
    const lesson=getLosTeacherLesson(id);
    if(!lesson){missing.push(id);continue;}
    assert.equal(lesson.id,id,id+" must resolve to its own manuscript");
    assert.equal(lesson.bookId,1,id+" must stay in LOS! 1");
    assert.equal(lesson.chapterId,chapter,id+" has the wrong original chapter");
    assert.ok(lesson.scenes.length>0,id+" must contain an actual instructional sequence");
    assert.equal(new Set(lesson.scenes.map(scene=>scene.id)).size,lesson.scenes.length,
      id+" must not have duplicate scene identifiers");
    assert.deepEqual(validateTeacherLesson(lesson),[],id+" manuscript validation");
  }
  assert.deepEqual(missing,[],"Every lesson must be accessible in the canonical Teacher registry");
  assert.equal(getLosTeacherLesson("L000"),undefined);
  assert.equal(getLosTeacherLesson("L061"),undefined);
});

test("StudyOS and LOS! library expose direct links without inflating approved learning claims",()=>{
  const shell=readFileSync("src/app/AppShell.tsx","utf8");
  const library=readFileSync("src/features/los/LosBook.tsx","utf8");
  const picker=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  const path=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.equal(shell.split('href="/los"').length-1,2,"Desktop and mobile have real LOS links");
  for(const [where,source] of [["reader",library],["chapter picker",picker],["study path",path]] as const){
    assert.ok(source.includes('from "./teacher/lessonRegistry";'),where+" must use the canonical lesson registry");
  }

  for(const destination of ["contents","path","dictionary","search","cards"]){
    assert.ok(library.includes('href="/los#/1/'+destination+'"'),destination+" must have a visible library shortcut");
  }
  assert.ok(library.includes("getLosTeacherLesson(lesson.id)"));
  assert.ok(path.includes("getLosTeacherLesson(lesson.id)"));
  assert.ok(library.includes("lopullinen hyväksyntä on kesken"));
});

test("all required workbook task IDs refer to real, unique book exercises",()=>{
  const byId=new Map(LOS_EXERCISES.map(exercise=>[exercise.id,exercise]));
  assert.equal(byId.size,LOS_EXERCISES.length,"The central exercise bank must not contain duplicate IDs");
  const missing:string[]=[];
  for(let n=1;n<=60;n++){
    const id="L"+String(n).padStart(3,"0");
    const lesson=getLosTeacherLesson(id);
    assert.ok(lesson,id+" must be reachable before checking its book tasks");
    for(const requiredId of lesson.requiredPracticeIds){
      const item=byId.get(requiredId);
      if(!item){missing.push(id+" requires missing "+requiredId);continue;}
      assert.equal(item.chapterId,requiredId.slice(1,3),
        id+" task "+requiredId+" must match the chapter where the book renders it");
    }
    for(const scene of lesson.scenes){
      for(const link of scene.bookLinks ?? []){
        const validChapter=/^(?:0[1-9]|10)$/.test(link.chapterId);
        const validAssessment=(
          (link.chapterId==="91" && ["review","midterm"].includes(link.section)) ||
          (link.chapterId==="92" && link.section==="review-ii") ||
          (link.chapterId==="93" && ["final","summary"].includes(link.section))
        );
        assert.ok(validChapter || validAssessment,
          id+" links to an invalid chapter/assessment route "+link.chapterId+"/"+link.section);
      }
    }
  }
  assert.deepEqual(missing,[],"A required task must exist; otherwise the guided lesson cannot be completed");
});

test("C03 fallback comprehension prompts refer to the active Lisa source, not the retired Berna text",()=>{
  const fallback=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
  assert.ok(fallback.includes("Mistä maasta Lisa sanoo olevansa kotoisin?"));
  assert.ok(fallback.includes("Missä kaupungissa Lisa kertoo asuvansa?"));
  assert.ok(!fallback.includes("Mistä maasta Berna sanoo olevansa kotoisin?"));
});

test("L031 teaches 0–6 before asking the first number-memory question",()=>{
  const lesson=getLosTeacherLesson("L031");
  assert.ok(lesson,"L031 must be registered");
  const ids=lesson.scenes.map(scene=>scene.id);
  assert.ok(ids.indexOf("zero-six") < ids.indexOf("recall"));
  assert.ok(ids.indexOf("board-first") < ids.indexOf("recall"));
  assert.ok(ids.indexOf("recall") < ids.indexOf("seven-twelve"));
  const recall=lesson.scenes.find(scene=>scene.id==="recall")!;
  assert.equal(recall.question?.prompt,"Kirjoita numeroin: eins");
  assert.deepEqual(recall.question?.accepted,["1"]);
  assert.match(recall.paragraphs.join(" "),/Näimme jo opetustaululla/);
  assert.match(recall.question?.hint??"",/Eins/);
  assert.match(recall.question?.genericWrong??"",/numeromerkki/);
});

test("L031 number mistakes receive concrete explanations for the asked answer direction",()=>{
  const lesson=getLosTeacherLesson("L031");
  assert.ok(lesson);
  for(const [id,word,expected] of [
    ["read-seven","Sieben","7"],
    ["write-eight","acht","acht"],
    ["write-eleven","elf","elf"],
    ["exit","zwölf","zwölf"],
  ] as const){
    const scene=lesson.scenes.find(item=>item.id===id);
    assert.ok(scene?.question,id+" must remain a real graded question");
    assert.equal(scene.question.type,"text");
    assert.equal(scene.question.accepted?.[0],expected);
    assert.match(scene.question.success,new RegExp(word,"i"),id+" should explain the actual word");
    assert.ok(!scene.question.reteach.includes("kysymyksen tai vastauksen muoto riippuu"),
      id+" cannot use the unrelated age-question boilerplate");
  }
});


test("L033 feedback respects the answer direction for every numeric checkpoint",()=>{
  const lesson=getLosTeacherLesson("L033");
  assert.ok(lesson);
  const expectations=[
    ["recall","zwanzig","20","tasakymmen"],
    ["write21","einundzwanzig","21","ein"],
    ["write32","zweiunddreißig","32","dreißig"],
    ["read47","47","siebenundvierzig","numeromerkintää"],
    ["exit","dreißig","30","tasakymmen"],
  ] as const;
  for(const [id,accepted,promptValue,keyword] of expectations){
    const item=lesson.scenes.find(scene=>scene.id===id);
    assert.ok(item?.question, id+" must have an actual question");
    assert.equal(item.question.type,"text");
    assert.deepEqual(item.question.accepted,[accepted]);
    assert.ok(item.question.prompt.includes(promptValue), id+" must still ask the original value");
    const feedback=[item.question.hint,item.question.reteach,item.question.genericWrong].join(" ");
    assert.match(feedback,new RegExp(keyword,"i"),id+" needs task-specific feedback");
    assert.ok(!item.question.hint.includes("Hajota luku yksiköihin"),id+" must not reuse the generic mixed-number hint");
    assert.ok(!item.question.reteach.includes("Luvussa 21 käytetään ein, ei eins. 30"),id+" must not reuse a mismatched rule");
  }
  const read47=lesson.scenes.find(scene=>scene.id==="read47")!.question!;
  assert.match(read47.genericWrong,/numeromerkintää/);
  assert.ok(!read47.genericWrong.includes("ß ei muutu"),"Writing rules are not feedback for a digits-only question");
  for(const id of ["recall","exit"]){
    const scene=lesson.scenes.find(item=>item.id===id)!;
    assert.match(scene.question!.reteach,/ei (?:ole|käytetä) und/);
  }
});


test("L035 review and chapter test feedback stays specific to the requested answer",()=>{
  const lesson=getLosTeacherLesson("L035");
  assert.ok(lesson);
  const cases=[
    {id:"recall",prompt:"Kirjoita numeroin: zwölf",answer:"12",marker:"Zwölf",word:"numeromerkintä"},
    {id:"write-17",prompt:"Kirjoita saksaksi: 17",answer:"siebzehn",marker:"siebzehn",word:"sieben"},
    {id:"write-32",prompt:"Kirjoita saksaksi: 32",answer:"zweiunddreißig",marker:"dreißig",word:"ß"},
    {id:"application",prompt:"Kirjoita saksaksi täydellinen lause: Olen 20-vuotias.",answer:"Ich bin zwanzig Jahre alt.",marker:"Ich bin",word:"bin"},
    {id:"exit",prompt:"Kirjoita saksaksi: 30",answer:"dreißig",marker:"dreißig",word:"tasakymmen"},
  ] as const;
  for(const {id,prompt,answer,marker,word} of cases){
    const scene=lesson.scenes.find(item=>item.id===id);
    assert.ok(scene?.question,id+" needs a real question");
    assert.equal(scene.question.prompt,prompt);
    assert.deepEqual(scene.question.accepted,[answer],"Existing answer key may not change");
    const feedback=[scene.question.success,scene.question.hint,scene.question.reteach,scene.question.genericWrong].join(" ");
    assert.ok(feedback.toLocaleLowerCase("fi").includes(marker.toLocaleLowerCase("fi")),id+" must explain the target word");
    assert.ok(feedback.toLocaleLowerCase("fi").includes(word.toLocaleLowerCase("fi")),id+" must give task-relevant guidance");
    assert.ok(!scene.question.hint.includes("Muista ikäfraasin bin ja lukujen yksiköt"),id+" must not have unrelated generic hint");
    assert.ok(!scene.question.reteach.includes("Kolmekymmentä on dreißig."),id+" must not have unrelated copy/paste reteach");
  }
  const numberAnswer=lesson.scenes.find(item=>item.id==="recall")!.question!;
  assert.match(numberAnswer.genericWrong,/numeroa|numeromerkintää/);
  const age=lesson.scenes.find(item=>item.id==="application")!.question!;
  assert.match(age.reteach,/Ich bin zwanzig Jahre alt/);
  assert.ok(!age.hint.includes("und"),"The number twenty contains no und");
});


test("L032 teaching feedback distinguishes 12, 16, 17 and reading seventeen as digits",()=>{
  const lesson=getLosTeacherLesson("L032");
  assert.ok(lesson);
  const cases=[
    ["recall","Kirjoita saksaksi: 12","zwölf","ö-kirjain"],
    ["sixteen","Kirjoita saksaksi: 16","sechzehn","sechs"],
    ["seventeen","Kirjoita saksaksi: 17","siebzehn","sieben"],
    ["exit","Kirjoita numeroin: siebzehn","17","numeromerkintää"],
  ] as const;
  for(const [id,prompt,answer,keyword] of cases){
    const scene=lesson.scenes.find(item=>item.id===id);
    assert.ok(scene?.question,id+" must remain a real assessment");
    assert.equal(scene.question.prompt,prompt);
    assert.deepEqual(scene.question.accepted,[answer]);
    const guidance=[scene.question.success,scene.question.hint,scene.question.reteach,scene.question.genericWrong].join(" ");
    assert.ok(guidance.includes(keyword),id+" must mention the actual word or answer direction");
    assert.ok(!scene.question.reteach.includes("kysymyksen tai vastauksen muoto riippuu"),
      id+" must not explain unrelated age-phrase grammar");
    assert.ok(!scene.question.hint.includes("Vertaa etenkin sanan loppua ja erikoismerkkejä."),
      id+" needs a concrete hint rather than a generic checklist");
  }
  const exit=lesson.scenes.find(scene=>scene.id==="exit")!.question!;
  assert.match(exit.genericWrong,/numeromerkintää/);
  assert.ok(!exit.genericWrong.includes("ß- tai umlaut"),"Digits-only tasks cannot demand spelling symbols");
});


test("L034 age-dialogue questions give source-grounded numbers and format-specific feedback",()=>{
  const lesson=getLosTeacherLesson("L034");
  assert.ok(lesson);
  const cases=[
    ["recall","Kirjoita numeroin: neunzehn","19","neunzehn","numeroin"],
    ["franz","Kirjoita numeroin: Franzin neunzehn","19","Franz","numeroin"],
    ["application-one","Mia on kuvitteellisesti 17-vuotias. Kirjoita täydellinen vastaus: Olen 17-vuotias.","Ich bin siebzehn Jahre alt.","siebzehn","kokonaisena"],
    ["application-two","Leo on kuvitteellisesti 20-vuotias. Kirjoita lyhyt vastaus ilman Jahre alt -osaa: Olen 20-vuotias.","Ich bin zwanzig.","zwanzig","lyhyen"],
    ["exit","Kirjoita numeroin: zwanzig","20","Zwanzig","numeroin"],
  ] as const;
  for(const [id,prompt,answer,keyword,style] of cases){
    const scene=lesson.scenes.find(item=>item.id===id);
    assert.ok(scene?.question,id+" is required in the real lesson");
    assert.equal(scene.question.type,"text");
    assert.equal(scene.question.prompt,prompt);
    assert.deepEqual(scene.question.accepted,[answer],"Do not change the original correct answer");
    const explanation=[
      ...scene.paragraphs,scene.question.success,scene.question.hint,
      scene.question.reteach,scene.question.genericWrong,
    ].join(" ");
    assert.ok(explanation.toLocaleLowerCase("fi").includes(keyword.toLocaleLowerCase("fi")),
      id+" must explain its specific target word or speaker");
    assert.ok(explanation.toLocaleLowerCase("fi").includes(style.toLocaleLowerCase("fi")),
      id+" must explain the requested answer format");
    assert.ok(!scene.question.hint.includes("Wie alt bist du? = kuinka vanha olet"),
      id+" must not repeat an unrelated age-phrase hint");
    assert.ok(!scene.question.genericWrong.includes("Tarkista ikä, henkilö, bin-muoto"),
      id+" must not use the generic source/grammar warning");
  }
  for(const id of ["recall","franz","exit"]){
    const question=lesson.scenes.find(scene=>scene.id===id)!.question!;
    assert.ok(!question.genericWrong.includes("bin-muoto"),"Digits-only questions cannot require German verbs");
  }
  const short=lesson.scenes.find(scene=>scene.id==="application-two")!.question!;
  assert.match(short.reteach,/Täysi Ich bin zwanzig Jahre alt\. on myös oikeaa saksaa/);
  assert.deepEqual(lesson.requiredCheckedIds,["C06-TEXTB-Q01","C06-TEXTB-Q02"]);
  assert.equal(lesson.requiredActivityIds[0],"text-b-studied");
});
