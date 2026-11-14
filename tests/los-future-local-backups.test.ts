import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import type {LosChapterDraft} from "../src/features/los/studyState.ts";
import {
  LOS_FUTURE_BACKUP_FORMAT,LOS_FUTURE_BACKUP_MAX_BYTES,
  createLosFutureBackup,parseLosFutureBackup,planLosFutureBackupImport,applyLosFutureBackup,
} from "../src/features/los/losFutureLocalBackups.ts";
import {losFuturePracticeDraftKey} from "../src/features/los/losFuturePracticeProgress.ts";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonRegistry.ts";
import {emptyTeacherSession} from "../src/features/los/teacher/engine.ts";

const owner="backup-test-owner";
const makeDraft=():LosChapterDraft=>({
  version:1,note:"",applicationDraft:"",bookmarked:false,
  practiceAnswers:{},practiceChecked:[],testAnswers:{},testSubmittedAt:null,
  selfAssessment:"",updatedAt:"2026-11-14T00:00:00.000Z",
});
class FakeStore {
  data=new Map<string,string>();
  failOnce:string|null=null;
  getItem(key:string){return this.data.get(key)??null;}
  setItem(key:string,value:string){
    if(key===this.failOnce){this.failOnce=null;throw Error("QuotaExceeded");}
    this.data.set(key,value);
  }
  removeItem(key:string){this.data.delete(key);}
}
const key=(bookId:number,id:string,who=owner)=>losFuturePracticeDraftKey(bookId,id,who);
const fixedDate=new Date("2026-11-14T00:00:00.000Z");

test("later books back up only their own authorized chapter drafts, including stage-only evidence",()=>{
  const store=new FakeStore();
  const stageOnly=makeDraft();
  stageOnly.practiceChecked=["los.future.guided:LOS2-L002:start"];
  store.setItem(key(2,"01"),JSON.stringify(stageOnly));
  const anotherBook=makeDraft();
  anotherBook.note="private in LOS! 3";
  store.setItem(key(3,"01"),JSON.stringify(anotherBook));
  const backup=createLosFutureBackup(2,owner,store,fixedDate);
  assert.equal(backup.format,LOS_FUTURE_BACKUP_FORMAT);
  assert.equal(backup.bookId,2);
  assert.deepEqual(Object.keys(backup.chapters),["01"]);
  assert.equal(backup.chapters["01"]?.practiceChecked.length,1);
  assert.equal(JSON.stringify(backup).includes(owner),false,"No owner ID must be exported");
  assert.equal(JSON.stringify(backup).includes("private in LOS! 3"),false);
  assert.deepEqual(Object.keys(createLosFutureBackup(3,owner,store,fixedDate).chapters),["01"]);
  assert.deepEqual(Object.keys(createLosFutureBackup(2,"other",store,fixedDate).chapters),[]);
});

test("authored tasks and lesson reflections transfer without test scores or cross-book IDs",()=>{
  const store=new FakeStore();
  const draft=makeDraft();
  draft.note="Harjoittelin saksan lauseita.";
  draft.practiceAnswers={
    "LOS2-C01-T01":"Richtig.",
    "LOS2-L002:own-reflection":"Kertaan persoonapäätteet.",
  };
  draft.practiceChecked=["LOS2-C01-T01","los.future.guided:LOS2-L002:tasks"];
  store.setItem(key(2,"01"),JSON.stringify(draft));
  const original=createLosFutureBackup(2,owner,store,fixedDate);
  const imported=parseLosFutureBackup(JSON.stringify(original));
  const other=new FakeStore();
  const result=applyLosFutureBackup(imported,2,"new-device-owner",other,"missing-only");
  assert.equal(result.imported,1);
  assert.equal(result.skipped,0);
  assert.equal(other.getItem(key(2,"01","new-device-owner"))?.includes("Kertaan persoonapäätteet."),true);
  assert.equal(other.getItem(key(2,"01",owner)),null);
  assert.equal(other.getItem(key(3,"01","new-device-owner")),null);
  const reread=createLosFutureBackup(2,"new-device-owner",other,fixedDate);
  assert.deepEqual(reread.chapters["01"]?.practiceChecked,draft.practiceChecked);
});

test("reject corrupt, future graded, mismatched and oversized backups before writing",()=>{
  const store=new FakeStore();
  const draft=makeDraft();
  draft.practiceAnswers={"LOS3-C01-T01":"wrong book"};
  store.setItem(key(2,"01"),JSON.stringify(draft));
  assert.throws(()=>createLosFutureBackup(2,owner,store),/Kappaleen 01 tietoja/);
  store.data.clear();
  const good=createLosFutureBackup(2,owner,store,fixedDate);
  const wrongIds={...good,chapters:{"01":draft}};
  assert.throws(()=>parseLosFutureBackup(JSON.stringify(wrongIds)),/väärään kirjaan/);
  const scores=makeDraft();scores.testAnswers={"unapproved":"999"};
  const badScores={...good,chapters:{"01":scores}};
  assert.throws(()=>parseLosFutureBackup(JSON.stringify(badScores)),/virheellinen/);
  assert.throws(()=>parseLosFutureBackup('{"format":"los-book-backup-v1","bookId":1}'),/kelvollinen/);
  assert.throws(()=>parseLosFutureBackup("{bad"),/JSON/);
  assert.throws(()=>parseLosFutureBackup("x".repeat(LOS_FUTURE_BACKUP_MAX_BYTES+1)),/liian suuri/);
  assert.throws(()=>applyLosFutureBackup(good,3,owner,store,"replace"),/Toisen kirjan/);
});

test("missing-only import never overwrites existing work; replacement deliberately does",()=>{
  const store=new FakeStore();
  const old=makeDraft();old.note="my existing answer";
  store.setItem(key(2,"01"),JSON.stringify(old));
  const one=makeDraft();one.note="backup answer";
  const two=makeDraft();two.note="backup other chapter";
  const backup=parseLosFutureBackup(JSON.stringify({
    format:LOS_FUTURE_BACKUP_FORMAT,bookId:2,exportedAt:fixedDate.toISOString(),
    chapters:{"01":one,"02":two},
  }));
  const plan=planLosFutureBackupImport(backup,createLosFutureBackup(2,owner,store,fixedDate));
  assert.deepEqual(plan.conflicts,["01"]);
  assert.deepEqual(plan.missing,["02"]);
  const safe=applyLosFutureBackup(backup,2,owner,store,"missing-only");
  assert.equal(safe.imported,1);
  assert.equal(JSON.parse(store.getItem(key(2,"01"))!).note,"my existing answer");
  assert.equal(JSON.parse(store.getItem(key(2,"02"))!).note,"backup other chapter");
  const replace=applyLosFutureBackup(backup,2,owner,store,"replace");
  assert.equal(replace.imported,2);
  assert.equal(JSON.parse(store.getItem(key(2,"01"))!).note,"backup answer");
});

test("local storage quota failure rolls back every already-written chapter",()=>{
  const store=new FakeStore();
  const old=makeDraft();old.note="original";
  store.setItem(key(2,"01"),JSON.stringify(old));
  const first=makeDraft();first.note="replacement";
  const second=makeDraft();second.note="new chapter";
  const backup=parseLosFutureBackup(JSON.stringify({
    format:LOS_FUTURE_BACKUP_FORMAT,bookId:2,exportedAt:fixedDate.toISOString(),
    chapters:{"01":first,"02":second},
  }));
  store.failOnce=key(2,"02");
  assert.throws(()=>applyLosFutureBackup(backup,2,owner,store,"replace"),/palautettiin/);
  assert.equal(JSON.parse(store.getItem(key(2,"01"))!).note,"original");
  assert.equal(store.getItem(key(2,"02")),null);
});

test("LOS! 1's backup and lessons remain routed to their original implementation",()=>{
  const source=readFileSync("src/features/los/LosBackups.tsx","utf8");
  assert.match(source,/bookId!==1\)return <LosFutureBackups bookId=\{bookId\}\/>/);
  assert.match(source,/createLosBookBackup/);
  assert.match(source,/importLosBookBackup/);
});

test("PR #264 chapter cursor and unfinished Teacher answers round-trip in later-book backups",()=>{
  const store=new FakeStore();
  const draft=makeDraft();
  const lesson=getLosTeacherLesson("LOS2-L002");
  assert.ok(lesson);
  const session=emptyTeacherSession(lesson,"2026-11-14T00:00:00.000Z");
  session.sceneId=lesson.scenes[1]!.id;
  session.visitedIds=[lesson.scenes[0]!.id];
  session.draftAnswers={recall:"Ich kenne Hallo."};
  draft.teacherSessions={"LOS2-L002":session};
  draft.practiceAnswers={"los.future.guided:LOS2-L002:selectedStage":"3",
    "LOS2-C01-T06":JSON.stringify({version:1,meanings:["ystävä"],answers:["der Freund"]})};
  store.setItem(key(2,"01"),JSON.stringify(draft));
  const exported=createLosFutureBackup(2,owner,store,fixedDate);
  const checked=parseLosFutureBackup(JSON.stringify(exported));
  const restored=new FakeStore();
  const transfer=applyLosFutureBackup(checked,2,"second-owner",restored,"missing-only");
  assert.equal(transfer.imported,1);
  const data=JSON.parse(restored.getItem(key(2,"01","second-owner"))??"null");
  assert.equal(data.practiceAnswers["los.future.guided:LOS2-L002:selectedStage"],"3");
  assert.equal(data.teacherSessions["LOS2-L002"].draftAnswers.recall,"Ich kenne Hallo.");
  assert.equal(data.teacherSessions["LOS2-L002"].completedAt,null);
  assert.equal(data.practiceAnswers["LOS2-C01-T06"],draft.practiceAnswers["LOS2-C01-T06"]);
});

test("future-book backup rejects fabricated Teacher mastery and cross-book sessions",()=>{
  const store=new FakeStore();
  const lesson=getLosTeacherLesson("LOS2-L002");assert.ok(lesson);
  const session=emptyTeacherSession(lesson,"2026-11-14T00:00:00.000Z");
  const spoof=makeDraft();spoof.teacherSessions={"LOS2-L002":{...session,completedAt:"2026-11-14T00:00:00.000Z"}};
  store.setItem(key(2,"01"),JSON.stringify(spoof));
  assert.throws(()=>createLosFutureBackup(2,owner,store),/tietoja ei voitu tarkistaa/);
  const other=makeDraft();other.teacherSessions={"LOS3-L002":{...session,lessonId:"LOS3-L002"}};
  store.setItem(key(2,"01"),JSON.stringify(other));
  assert.throws(()=>createLosFutureBackup(2,owner,store),/tietoja ei voitu tarkistaa/);
  const badCursor=makeDraft();badCursor.practiceAnswers={"los.future.guided:LOS2-L002:selectedStage":"999"};
  store.setItem(key(2,"01"),JSON.stringify(badCursor));
  assert.throws(()=>createLosFutureBackup(2,owner,store),/tietoja ei voitu tarkistaa/);
});
