import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { draftIsEmpty, validateLosCloudDraft, validLosChapter } from "../src/features/los/cloudContract.ts";

const blank={
  version:1 as const,note:"",applicationDraft:"",bookmarked:false,
  practiceAnswers:{},practiceChecked:[],testAnswers:{},testSubmittedAt:null,
  selfAssessment:"",updatedAt:"",
};
test("LOS private cloud contract rejects oversized and corrupted payloads",()=>{
  assert.equal(validateLosCloudDraft(blank),true);
  assert.equal(validateLosCloudDraft({...blank,note:"n".repeat(8001)}),false);
  assert.equal(validateLosCloudDraft({...blank,applicationDraft:"x".repeat(5001)}),false);
  assert.equal(validateLosCloudDraft({...blank,practiceAnswers:{q:12}}),false);
  assert.equal(validateLosCloudDraft({...blank,practiceAnswers:{q:"a".repeat(501)}}),false);
  assert.equal(validateLosCloudDraft({...blank,practiceChecked:[42]}),false);
  assert.equal(validateLosCloudDraft({...blank,version:2}),false);
  assert.equal(draftIsEmpty(blank),true);
  assert.equal(draftIsEmpty({...blank,note:"Guten Tag!"}),false);
  // A chapter with only checked practice IDs is still user work: do not
  // drop it from JSON backup or overwrite it in a missing-only import.
  assert.equal(draftIsEmpty({...blank,practiceChecked:["C01-EX-01"]}),false);
});
test("LOS cloud keys are restricted to real book and chapter identifiers",()=>{
  assert.equal(validLosChapter(1,"01"),true);
  assert.equal(validLosChapter(8,"10"),true);
  assert.equal(validLosChapter(0,"01"),false);
  assert.equal(validLosChapter(9,"01"),false);
  assert.equal(validLosChapter(1,"../01"),false);
  assert.equal(validLosChapter(1,"1"),false);
  assert.equal(validLosChapter(1,"00"),false);
});
test("server blocks public device JWT alone and uses optimistic revisions",()=>{
  const route=readFileSync("src/routes/api.los-sync.ts","utf8");
  assert.match(route,/LOS_SYNC_PASSPHRASE/);
  assert.match(route,/timingSafeEqual/);
  assert.match(route,/verifyArthurDeviceToken/);
  assert.match(route,/\.eq\("owner_id",ownerId\)/);
  assert.match(route,/\.eq\("revision",body\.expected_revision\)/);
  assert.match(route,/return reply\(\{error:"Toinen laite on tallentanut uudemman version\.",record\},409\)/);
  assert.match(route,/if\(expected\.length<24\)/);
});
test("SQL table is browser-inaccessible even if a device token leaks",()=>{
  const sql=readFileSync("supabase/migrations/20261111133000_los_protected_chapter_drafts.sql","utf8").toLowerCase();
  assert.match(sql,/enable row level security/);
  assert.match(sql,/revoke all privileges.*from public, anon, authenticated/);
  assert.match(sql,/grant select, insert, update.*to service_role/);
  assert.doesNotMatch(sql,/create policy.*to authenticated/);
});
test("sync never silently overwrites divergent device edits",()=>{
  const code=readFileSync("src/features/los/LosCloudPanel.tsx","utf8");
  assert.match(code,/setHasConflict\(true\)/);
  assert.match(code,/keepLocal/);
  assert.match(code,/importRecord/);
  assert.match(code,/backupLosLocalDraft/);
  assert.match(code,/Synkronoi nyt/);
  assert.match(code,/manuaalinen/);
  const backup=readFileSync("src/features/los/localBackups.ts","utf8");
  assert.match(backup,/parseLosBookBackup/);
  assert.match(backup,/mode==="missing-only"/);
});
