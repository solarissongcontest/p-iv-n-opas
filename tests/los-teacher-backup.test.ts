import test from "node:test";
import assert from "node:assert/strict";
import { draftIsEmpty, validateLosCloudDraft } from "../src/features/los/cloudContract.ts";
import { emptyTeacherSession, restartUpdatedTeacherSession } from "../src/features/los/teacher/engine.ts";
import { parseLosDraft, prepareLosTeacherVersionRestart } from "../src/features/los/studyState.ts";
import { parseLosBookBackup } from "../src/features/los/localBackups.ts";
import { LOS1_L004_TEACHER } from "../src/features/los/teacher/lessonL004.ts";

const emptyDraft = () => ({
  version: 1 as const, note: "", applicationDraft: "", bookmarked: false,
  practiceAnswers: {}, practiceChecked: [], testAnswers: {},
  testSubmittedAt: null, selfAssessment: "", updatedAt: "",
});

test("a chapter containing only Teacher 2.0 activity is not omitted from backups", () => {
  const session = emptyTeacherSession(LOS1_L004_TEACHER, "2026-11-12T20:00:00.000Z");
  const draft = { ...emptyDraft(), teacherSessions: { L004: session } };
  assert.equal(draftIsEmpty(draft), false);
  assert.equal(validateLosCloudDraft(draft), true);
});

test("cloud and import validation reject malformed Teacher 2.0 progress", () => {
  const session = emptyTeacherSession(LOS1_L004_TEACHER, "2026-11-12T20:00:00.000Z");
  assert.equal(validateLosCloudDraft({ ...emptyDraft(), teacherSessions: { L004: session } }), true);
  assert.equal(validateLosCloudDraft({ ...emptyDraft(), teacherSessions: {
    L004: { ...session, lessonId: "L999" },
  } }), false);
  assert.equal(validateLosCloudDraft({ ...emptyDraft(), teacherSessions: { L004: {
    ...session, attempts: [{ sceneId: "guided", answer: "x", correct: "yes", independent: false, at: "2026-11-12T20:00:00.000Z" }],
  } } }), false);
});


test("version history is preserved in local draft JSON and whole-book backups",()=>{
  const at="2026-11-12T20:00:00.000Z";
  const saved=emptyTeacherSession(LOS1_L004_TEACHER,at);
  const legacy=JSON.parse(JSON.stringify({...saved,contentSignature:undefined,
    draftAnswers:{independent:"Guten Abend!"},attempts:[
      {sceneId:"independent",answer:"Guten Abend!",correct:true,independent:true,at},
    ],completedAt:at,
  })) as typeof saved;
  const restarted=restartUpdatedTeacherSession(legacy,LOS1_L004_TEACHER,{},at);
  assert.ok(restarted);
  const draft={...emptyDraft(),teacherSessions:{L004:restarted.current},
    teacherSessionHistory:restarted.history};
  assert.equal(validateLosCloudDraft(draft),true);
  const parsed=parseLosDraft(JSON.stringify(draft));
  assert.deepEqual(parsed.teacherSessionHistory,restarted.history);
  assert.deepEqual(parsed.teacherSessions?.L004?.attempts,[]);
  const onlyHistory={...emptyDraft(),teacherSessionHistory:restarted.history};
  assert.equal(draftIsEmpty(onlyHistory),false,
    "Even an archive without current answers is irreplaceable learner work");
  const raw=JSON.stringify({format:"los-book-backup-v1",bookId:1,
    exportedAt:at,chapters:{"01":draft}});
  const backup=parseLosBookBackup(raw);
  assert.deepEqual(backup.chapters["01"]?.teacherSessionHistory?.L004?.[0]?.draftAnswers,
    {independent:"Guten Abend!"});
  assert.equal(backup.chapters["01"]?.teacherSessions?.L004?.attempts.length,0);
});

test("malformed archives are rejected at the cloud and import boundaries",()=>{
  const at="2026-11-12T20:00:00.000Z";
  const original=emptyTeacherSession(LOS1_L004_TEACHER,at);
  const bogus={...emptyDraft(),teacherSessionHistory:{L004:[{...original,lessonId:"L999"}]}};
  assert.equal(validateLosCloudDraft(bogus),false);
  assert.deepEqual(parseLosDraft(JSON.stringify(bogus)).teacherSessionHistory,{});
  const payload={format:"los-book-backup-v1",bookId:1,exportedAt:at,
    chapters:{"01":bogus}};
  assert.throws(()=>parseLosBookBackup(JSON.stringify(payload)),/virheellisiä tietoja/);
});


test("version restart is atomic and refuses chapter drafts failing backup validation",()=>{
  const at="2026-11-12T20:00:00.000Z";
  const old={...emptyTeacherSession(LOS1_L004_TEACHER,at),contentSignature:undefined,
    attempts:[{sceneId:"independent",answer:"Guten Abend!",correct:true,independent:true,at}],
  };
  const draft={...emptyDraft(),teacherSessions:{L004:old}};
  const current=prepareLosTeacherVersionRestart(draft,LOS1_L004_TEACHER,at);
  assert.ok(current);
  assert.equal(validateLosCloudDraft(current),true);
  assert.deepEqual(current.teacherSessionHistory?.L004,[old]);
  assert.deepEqual(current.teacherSessions?.L004?.attempts,[]);
  assert.deepEqual(draft.teacherSessions.L004,old,"Never mutate the source draft");
  assert.deepEqual(prepareLosTeacherVersionRestart(current,LOS1_L004_TEACHER,at),null);
  const unsafe={...draft,note:"x".repeat(8001)};
  assert.equal(prepareLosTeacherVersionRestart(unsafe,LOS1_L004_TEACHER,at),null);
  assert.deepEqual(unsafe.teacherSessions.L004,old,"Rejected drafts retain the original work");
});
