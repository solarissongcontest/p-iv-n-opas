import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons} from '../src/features/los/content.ts';
import {guidedLessons} from '../src/features/los/guidedLessons.ts';
import {finalLessons} from '../src/features/los/finalLessons.ts';
import {reviewTwoItems,reviewTwoFinalIds} from '../src/features/los/reviewTwoItems.ts';
import {exams,validateLosExams} from '../src/features/los/examBank.ts';
import {auditLosRelease,losReleaseEvidence} from '../src/features/los/releaseAudit.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

test('all sixty exact canonical L001–L060 lesson IDs have precisely one genuinely authored teaching plan',()=>{
 const canonical=Array.from({length:60},(_,i)=>'L'+String(i+1).padStart(3,'0'));
 assert.deepEqual(lessons.map(l=>l.id),canonical);
 const authored=guidedLessons.map(l=>l.id).sort();
 assert.deepEqual(authored,canonical,'No missing, duplicate, or invented lesson IDs');
 for(const l of guidedLessons){
  assert.equal(l.steps.length,5,l.id);
  assert.equal(l.steps.reduce((sum,step)=>sum+step.minutes,0),30,l.id);
  assert.equal(new Set(l.steps.map(s=>s.id)).size,5,l.id);
  assert.ok(l.steps.every(s=>s.instructionFi.trim().length>=25),l.id);
  assert.equal(lessons.find(c=>c.id===l.id)?.status,'initial-material');
 }
});
test('all ten chapter sources are distinct licensed human-written texts with visible credits',()=>{
 assert.equal(chapters.length,10);
 assert.equal(new Set(chapters.map(c=>c.sourceId)).size,10);
 for(const c of chapters){
  assert.equal(c.status,'text-reviewed',c.id);
  assert.ok(c.blocks.length>=4,c.id+' must contain original text');
  assert.ok(c.license&&!c.license.includes('Ei vielä valittua'),c.id);
  assert.match(c.sourceUrl,/^https:\/\//,c.id);
  assert.ok(c.attribution.trim().length>=40,c.id);
 }
 assert.equal(chapters.find(c=>c.id==='C06')?.sourceId,'M-ZPE-01');
 assert.equal(chapters.find(c=>c.id==='C08')?.sourceId,'M-ZPE-02');
});
test('ten independent chapter exams, a separate 25-item midterm and fifty-item final bank coexist',()=>{
 assert.deepEqual(validateLosExams(),[]);
 const names=chapters.map(c=>'EX-'+c.id);
 for(const name of names)assert.ok(Object.hasOwn(exams,name),name);
 assert.equal(new Set(names).size,10);
 assert.equal(exams['EX-C06'].questions.length,20);
 assert.equal(exams['EX-C08'].questions.length,15);
 assert.equal(exams['EX-C10'].questions.length,20);
 assert.equal(exams['EX-MID'].questions.length,25);
 assert.equal(exams['EX-FINAL'].questions.length,50);
 const all=[...names,'EX-MID','EX-FINAL'].flatMap(n=>exams[n as keyof typeof exams].questions);
 assert.equal(new Set(all.map(q=>q.id)).size,all.length);
 for(const q of all){
  assert.equal(q.hint,'');
  assert.equal(gradeExercise(q,q.correct??q.accepted?.[0]??q.order?.join(' | ')??'').status,'correct',q.id);
 }
});
test('L057 uses six independent ten-chapter mixed-review tasks and L059 the final 50-item paper',()=>{
 assert.deepEqual(finalLessons.map(p=>p.id),['L057','L059']);
 assert.deepEqual(finalLessons[0]?.requiredIds,[...reviewTwoFinalIds]);
 assert.deepEqual(finalLessons[1]?.requiredIds,['EX-FINAL']);
 assert.equal(reviewTwoFinalIds.length,6);
 for(const id of reviewTwoFinalIds){
  const row=reviewTwoItems.find(r=>r.exercise.id===id);
  assert.ok(row,'missing '+id);
  assert.ok(row.exercise.prompt.length>=25);
  const value=row.exercise.correct??row.exercise.accepted?.[0]??'own text';
  assert.equal(gradeExercise(row.exercise,value).status,row.exercise.type==='writing'?'self-review':'correct',id);
 }
 assert.equal(finalLessons[1]?.steps.find(s=>s.exerciseIds?.includes('EX-FINAL'))?.kind,'practice');
});
test('all lesson content can be authored while production, editorial and mobile release gates remain open',()=>{
 const audit=auditLosRelease();
 assert.equal(audit.lessonsAuthored,60);
 assert.equal(audit.textsImported,10);
 assert.equal(audit.chapterExams,10);
 assert.deepEqual(audit.blockingChapterIds,[]);
 assert.deepEqual(audit.unauthoredLessonIds,[]);
 assert.equal(audit.ready,false);
 assert.ok(audit.gates.some(g=>!g.passed));
 assert.equal(losReleaseEvidence.productionMigrationVerified,false);
 assert.equal(losReleaseEvidence.mobileAndDesktopE2e,false);
 assert.equal(losReleaseEvidence.originalApprovedAssetsVerified,false);
});
