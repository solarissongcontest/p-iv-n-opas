import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {gunzipSync} from "node:zlib";
import {join} from "node:path";
import {asTeacherLesson} from "../src/features/english-master/englishTeacherAdapter.ts";
import type {Lesson} from "../src/features/english-master/EnglishMasterBook.ts";
import {
  emptyTeacherSession, teacherContentSignature, teacherCanFinish,
  submitTeacherAnswer, teacherSessionNeedsReview, teacherCompletionBlockers,
} from "../src/features/los/teacher/engine.ts";

const dir=join(process.cwd(),"public","english-master");
const manifest=JSON.parse(readFileSync(join(dir,"content.manifest.json"),"utf8")) as {
  size_bytes:number;sha256:string;parts:Array<{file:string;size:number}>;
};
const zipped=Buffer.concat(manifest.parts.map(part=>{
  const data=readFileSync(join(dir,part.file));
  assert.equal(data.length,part.size,"Split-part length "+part.file);
  return data;
}));
const payload=JSON.parse(gunzipSync(zipped).toString("utf8")) as {
  chapters:Record<string,{content_id:string}>;
  lessons:Record<string,Lesson>;lesson_count:number;
};
const lessons=Object.values(payload.lessons);
const now="2026-11-20T08:30:00.000Z";

test("Teacher 2.0 test audits the exact bundled English Master content (not a fake fixture)",()=>{
  assert.equal(zipped.byteLength,manifest.size_bytes);
  assert.equal(createHash("sha256").update(zipped).digest("hex"),manifest.sha256);
  assert.equal(lessons.length,192);
  assert.equal(payload.lesson_count,192);
  assert.equal(Object.keys(payload.chapters).length,122);
});

test("all 192 real English Master manuscripts convert safely into LOS! Teacher 2.0",()=>{
  const fail:string[]=[];
  for(const source of lessons){
    const lesson=asTeacherLesson(source);
    const ids=lesson.scenes.map(scene=>scene.id);
    const assessed=lesson.scenes.filter(scene=>scene.question);
    const manual=lesson.scenes.filter(scene=>scene.kind==="reflection");
    if(ids.length>80)fail.push(source.content_id+": too many scenes "+ids.length);
    if(new Set(ids).size!==ids.length)fail.push(source.content_id+": duplicated scene IDs");
    if(ids.some(id=>!/^[a-zA-Z0-9_.-]{1,70}$/.test(id)))fail.push(source.content_id+": invalid scene ID");
    if(assessed.length+manual.length!==(source.payload.tasks?.length??0))
      fail.push(source.content_id+": authored task was dropped");
    for(const scene of assessed){
      const q=scene.question!;
      if(q.type==="choice"&&(!q.correctOption||!q.options?.some(o=>o.id===q.correctOption)))
        fail.push(source.content_id+": unchecked choice "+scene.id);
      if(q.type==="text"&&!q.accepted?.some(v=>v.trim()))
        fail.push(source.content_id+": unchecked short answer "+scene.id);
    }
    for(const link of lesson.scenes.flatMap(scene=>scene.bookLinks??[])){
      if(!payload.chapters[link.chapterId])
        fail.push(source.content_id+": unknown chapter link "+link.chapterId);
    }
    const fresh=emptyTeacherSession(lesson,now);
    if(teacherSessionNeedsReview(fresh,lesson))
      fail.push(source.content_id+": new session incorrectly treated as stale");
    if(teacherCanFinish(fresh,lesson,{}))
      fail.push(source.content_id+": unvisited lesson marked complete");
    if(!teacherCompletionBlockers(fresh,lesson,{}).length)
      fail.push(source.content_id+": no completion requirements");
    if(!teacherContentSignature(lesson))
      fail.push(source.content_id+": missing content fingerprint");
  }
  assert.deepEqual(fail,[]);
});

test("real grammar, vocabulary, writing, reading, listening and review refs use the same chapter link adapter",()=>{
  const first=lessons[0]!;
  const categories=["G","V","W","R","L","S","M","Y"];
  const refs=categories.map(prefix=>
    Object.keys(payload.chapters).find(ch=>ch.startsWith(prefix))).filter(Boolean) as string[];
  assert.equal(refs.length,8,"Each book family must have a real chapter");
  const adapted=asTeacherLesson({...first,content_id:"EM-TEST-ALL",book_refs:refs});
  assert.deepEqual(adapted.scenes.flatMap(scene=>scene.bookLinks??[]).map(x=>x.chapterId),refs);
});

test("shared engine never awards English mastery from a hint or an unattempted textbook link",()=>{
  const source=lessons.find(l=>l.payload.tasks?.some(x=>x.format==="single_choice"&&x.correct_option))
    ??lessons[0]!;
  const lesson=asTeacherLesson(source);
  const question=lesson.scenes.find(x=>x.question?.type==="choice");
  if(!question) return;
  let session=emptyTeacherSession(lesson,now);
  assert.equal(teacherCanFinish(session,lesson,{}),false);
  session=submitTeacherAnswer(session,lesson,question.id,question.question!.correctOption!,now);
  assert.ok(session.attempts.some(a=>a.sceneId===question.id&&a.correct));
  assert.equal(teacherCanFinish(session,lesson,{}),false);
});
