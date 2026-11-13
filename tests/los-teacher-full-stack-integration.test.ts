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


test("C07 teaches the polite spelling request before assessing it and never leaks the L038 answer",()=>{
  const first=getLosTeacherLesson("L036");
  assert.ok(first,"L036 must remain in the shared lesson registry");
  const teachingIndex=first.scenes.findIndex(scene=>scene.id==="ask-to-spell");
  const applicationIndex=first.scenes.findIndex(scene=>scene.id==="application");
  assert.ok(teachingIndex>=0 && teachingIndex<applicationIndex,
    "Students must learn the request before they are graded on it");
  const instruction=first.scenes[teachingIndex]!;
  assert.equal(instruction.kind,"explanation");
  assert.match(instruction.paragraphs.join(" "),/Bitte buchstabieren Sie\./);
  assert.match(instruction.paragraphs.join(" "),/tavata kirjaimittain/i);
  assert.match(instruction.paragraphs.join(" "),/Wie heißt du\?/);
  assert.match(instruction.paragraphs.join(" "),/opetusesimerkki, ei C07:n alkuperäislähteen repliikki/);
  const question=first.scenes[applicationIndex]!.question!;
  assert.equal(question.type,"choice");
  assert.equal(question.options?.find(option=>option.id===question.correctOption)?.label,"Bitte buchstabieren Sie.");

  const second=getLosTeacherLesson("L038");
  assert.ok(second,"L038 must remain in the shared lesson registry");
  const independent=second.scenes.find(scene=>scene.id==="independent")?.question;
  assert.ok(independent,"L038 must contain the independent written test");
  assert.equal(independent.type,"text");
  assert.deepEqual(independent.accepted,["heißt"],"Do not change the correct German answer");
  assert.match(independent.prompt,/du \.\.\./);
  assert.doesNotMatch(independent.prompt,/heißt/i,"The question cannot display its own answer");
  assert.match(independent.reteach,/heißt/,"The explanation after trying can include the answer");
  assert.deepEqual(validateTeacherLesson(first),[],"The new teaching scene must pass manuscript validation");
  assert.deepEqual(validateTeacherLesson(second),[]);
});


test("all 60 independent German text checks avoid displaying a complete answer in their prompt",()=>{
  const leaked:string[]=[];
  const directionErrors:string[]=[];
  for(let n=1;n<=60;n++){
    const lessonId="L"+String(n).padStart(3,"0");
    const lesson=getLosTeacherLesson(lessonId);
    assert.ok(lesson,lessonId+" must remain registered");
    for(const scene of lesson.scenes){
      const q=scene.question;
      if(!q || q.type!=="text")continue;
      if(/^Kirjoita numeroin\b/i.test(q.prompt) &&
          !q.accepted?.every(answer=>/^\d+$/.test(answer.trim()))){
        directionErrors.push(lessonId+"/"+scene.id+" asks digits but accepts words");
      }
      if(/^Kirjoita saksaksi\b/i.test(q.prompt) &&
          q.accepted?.every(answer=>/^\d+$/.test(answer.trim()))){
        directionErrors.push(lessonId+"/"+scene.id+" asks German but only accepts digits");
      }
      if(!["independent","application","exit"].includes(q.evidenceRole??""))continue;
      const normalizedPrompt=q.prompt.toLocaleLowerCase("de");
      for(const accepted of q.accepted??[]){
        // Only exact literal exposure is a leak. Parsing M-I-A into Mia is an
        // intended transformation; punctuation and separators are not removed.
        const clean=accepted.trim().replace(/[.!?]+$/,"").toLocaleLowerCase("de");
        if(clean.length>=5 && normalizedPrompt.includes(clean)){
          leaked.push(lessonId+"/"+scene.id+": prompt contains accepted form "+JSON.stringify(accepted));
        }
      }
    }
  }
  assert.deepEqual(directionErrors,[],"Numeric and German answer formats must agree with their prompts");
  assert.deepEqual(leaked,[],"Independent writing tasks must never display the literal correct answer");
});

test("C10 lessons L051–L055 show task-specific written correction instead of one generic grammar warning",()=>{
  const oldChoice="Tarkista, kuka puhuu, mitä kysytään ja mikä verbimuoto kuuluu persoonalle.";
  const oldText="Vertaa lauseen tekijää ja verbimuotoa. Tarkista myös sanajärjestys, paikannimi ja välilyönnit.";
  let checked=0;
  for(let n=51;n<=55;n++){
    const lesson=getLosTeacherLesson("L"+String(n).padStart(3,"0"));
    assert.ok(lesson);
    for(const scene of lesson.scenes){
      if(!scene.question)continue;
      checked++;
      assert.notEqual(scene.question.genericWrong,oldChoice,lesson.id+"/"+scene.id);
      assert.notEqual(scene.question.genericWrong,oldText,lesson.id+"/"+scene.id);
      assert.ok(scene.question.genericWrong.trim().length>12);
    }
  }
  assert.ok(checked>=20,"The audit must cover C10's five teaching lessons, not a sample");
});


test("C08 L043 explicitly teaches the acknowledgement before the independent response",()=>{
  const lesson=getLosTeacherLesson("L043");
  assert.ok(lesson);
  const ids=lesson.scenes.map(scene=>scene.id);
  const teaching=ids.indexOf("acknowledge"),assessment=ids.indexOf("independent");
  assert.ok(teaching>ids.indexOf("strategy-board") && teaching<assessment,
    "The learner must meet the phrase before independently choosing it");
  const teach=lesson.scenes[teaching]!;
  assert.equal(teach.kind,"explanation");
  const body=teach.paragraphs.join(" ");
  assert.match(body,/Danke, jetzt verstehe ich\./);
  assert.match(body,/Kiitos, nyt ymmärrän/);
  assert.match(body,/opetustilanne eikä alkuperäisen lähdetekstin repliikki/);
  const answer=lesson.scenes[assessment]!;
  assert.equal(answer.phase,"Itsenäinen valinta 4/4");
  assert.match(answer.paragraphs.join(" "),/selittää suomeksi/);
  assert.equal(answer.question?.options?.find(opt=>opt.id===answer.question?.correctOption)?.label,
    "Danke, jetzt verstehe ich.");
  assert.deepEqual(validateTeacherLesson(lesson),[]);
});

test("C09 clock lessons distinguish inferred afternoon context from explicit German time",()=>{
  const source=getLosTeacherLesson("L047");
  const calendar=getLosTeacherLesson("L049");
  assert.ok(source && calendar);
  const text=source.scenes.find(scene=>scene.id==="full-dialogue");
  assert.ok(text);
  assert.match(text.paragraphs.join(" "),/ei yksin kerro/);
  assert.match(text.paragraphs.join(" "),/02\.45/);
  assert.match(text.paragraphs.join(" "),/14\.45/);
  const clockBoard=source.scenes.find(scene=>scene.id==="timeline")!;
  assert.ok(clockBoard.board?.some(row=>row.german.includes("Viertel vor drei") && row.meaning.includes("tulkinta")));
  assert.match(source.scenes.find(scene=>scene.id==="guided-time")!.question!.success,/iltapäiväoletuksella/);
  const availability=calendar.scenes.find(scene=>scene.id==="availability")!;
  assert.match(availability.question?.reteach??"",/um siebzehn Uhr/);
  assert.match(availability.question?.reteach??"",/asiayhteyttä/);
  assert.deepEqual(validateTeacherLesson(source),[]);
  assert.deepEqual(validateTeacherLesson(calendar),[]);
});

test("L057 review instructions match both accepted greeting punctuation variants",()=>{
  const lesson=getLosTeacherLesson("L057");
  assert.ok(lesson);
  const transfer=lesson.scenes.find(scene=>scene.id==="transfer");
  assert.ok(transfer?.question);
  assert.match(transfer.title,/tervehdys, nimi ja lähtömaa/);
  assert.match(transfer.question.prompt,/Tervehdyksen voi erottaa huutomerkillä tai pilkulla/);
  assert.doesNotMatch(transfer.question.prompt,/kolme lausetta/i);
  assert.deepEqual(transfer.question.accepted,[
    "Hallo! Ich heiße Mia. Ich komme aus Finnland.",
    "Hallo, ich heiße Mia. Ich komme aus Finnland.",
  ]);
  assert.match(transfer.question.genericWrong,/Sisällytä tervehdys, nimi ja lähtömaa/);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
});


test("every LOS 1 lesson stages instruction or source reading before scored application",()=>{
  const missingFoundation:string[]=[];
  const badBoundaries:string[]=[];
  for(let i=1;i<=60;i++){
    const id="L"+String(i).padStart(3,"0");
    const lesson=getLosTeacherLesson(id);
    assert.ok(lesson);
    if(lesson.scenes[0]?.kind!=="introduction")badBoundaries.push(id+" must begin with an introduction");
    if(lesson.scenes.at(-1)?.kind!=="summary")badBoundaries.push(id+" must end with a summary");
    let taught=false;
    for(const scene of lesson.scenes){
      if(["explanation","board","book","source"].includes(scene.kind))taught=true;
      if(["independent","application","exit"].includes(scene.question?.evidenceRole??"") && !taught)
        missingFoundation.push(id+"/"+scene.id+" has no earlier model, teaching or original text");
    }
  }
  assert.deepEqual(badBoundaries,[],"Every session needs a clear beginning and summary");
  assert.deepEqual(missingFoundation,[],"Do not grade transfer before showing any relevant material");
});

test("Teacher 2.0 chooses the actual lesson chapter for every learning illustration",()=>{
  const teacher=readFileSync("src/features/los/teacher/LosTeacherPlayer.tsx","utf8");
  assert.ok(teacher.includes('<Los1ChapterImage chapterId={lesson.chapterId} variant="learning"/>'));
  assert.ok(!teacher.includes('<Los1ChapterImage chapterId="09" variant="learning"/>'));
});


test("C08 options provide Finnish or German language metadata for accessible pronunciation",()=>{
  const finnishAnswers=[
    ["L042","recall","Lopetan, koska en ymmärrä heti."],
    ["L042","guided","Historia"],
    ["L042","independent","Laskee neljä laskua taululla"],
    ["L042","exit","Opettaja ja luokka tervehtivät aamulla toisiaan."],
    ["L044","guided","Toistavan oman nimensä"],
  ] as const;
  for(const [lessonId,sceneId,optionLabel] of finnishAnswers){
    const lesson=getLosTeacherLesson(lessonId);
    assert.ok(lesson);
    const scene=lesson.scenes.find(item=>item.id===sceneId);
    assert.ok(scene?.question?.options);
    assert.equal(scene.question.options.find(option=>option.label===optionLabel)?.lang,"fi");
    assert.ok(scene.question.options.every(option=>option.lang==="fi"),
      lessonId+"/"+sceneId+" has Finnish-language answer options");
  }
  for(const [lessonId,sceneId,answer] of [
    ["L041","recall","Noch einmal, bitte."],
    ["L043","guided","Bitte langsamer."],
    ["L044","application","Was bedeutet Eintritt?"],
    ["L045","exit","Was bedeutet Aufgabe?"],
  ] as const){
    const scene=getLosTeacherLesson(lessonId)?.scenes.find(item=>item.id===sceneId);
    assert.ok(scene?.question?.options,lessonId+"/"+sceneId);
    assert.equal(scene.question.options.find(option=>option.label===answer)?.lang,"de");
    assert.ok(scene.question.options.every(option=>option.lang==="de"),
      lessonId+"/"+sceneId+" is a German-language dialogue");
  }
  const player=readFileSync("src/features/los/teacher/LosTeacherPlayer.tsx","utf8");
  assert.ok(player.includes('<span lang={option.lang ?? "de"}>{option.label}</span>'));
  assert.ok(!player.includes('<span lang="de">{option.label}</span>'));
});
