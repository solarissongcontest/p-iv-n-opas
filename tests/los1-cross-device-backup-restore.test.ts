import {test} from "node:test";
import assert from "node:assert/strict";
import {
  createLosBookBackup,parseLosBookBackup,planLosBookImport,importLosBookBackup,
} from "../src/features/los/localBackups.ts";
import {emptyLosDraft,losDraftKey,type LosChapterDraft} from "../src/features/los/studyState.ts";

class FakeStore {
  readonly data=new Map<string,string>();
  failOnce:string|null=null;
  getItem(key:string){return this.data.get(key)??null;}
  setItem(key:string,value:string){
    if(key===this.failOnce){this.failOnce=null;throw new Error("QuotaExceededError");}
    this.data.set(key,value);
  }
  removeItem(key:string){this.data.delete(key);}
}
const initial=(note:string):LosChapterDraft=>({
  ...emptyLosDraft(),note,updatedAt:"2026-11-14T12:00:00.000Z",
});
const OWNER_KEY="opk.owner-id";
function prepare(store:FakeStore,owner:string){store.setItem(OWNER_KEY,owner);}
function setDraft(store:FakeStore,owner:string,ch:string,draft:LosChapterDraft){
  store.setItem(losDraftKey(1,ch,owner),JSON.stringify(draft));
}
function readDraft(store:FakeStore,owner:string,ch:string):LosChapterDraft|undefined{
  const raw=store.getItem(losDraftKey(1,ch,owner));
  return raw?JSON.parse(raw) as LosChapterDraft:undefined;
}
/** Local-only fixture; this does not contact Supabase or production devices. */
function inDevice<T>(store:FakeStore,fn:()=>T):T{
  const oldStorage=Object.getOwnPropertyDescriptor(globalThis,"localStorage");
  const oldWindow=Object.getOwnPropertyDescriptor(globalThis,"window");
  const oldCustomEvent=Object.getOwnPropertyDescriptor(globalThis,"CustomEvent");
  Object.defineProperty(globalThis,"localStorage",{
    configurable:true,writable:true,value:store,
  });
  Object.defineProperty(globalThis,"window",{
    configurable:true,writable:true,value:{dispatchEvent:()=>true},
  });
  if(typeof CustomEvent==="undefined"){
    class TestCustomEvent {
      constructor(public type:string,public init:unknown){}
    }
    Object.defineProperty(globalThis,"CustomEvent",{
      configurable:true,writable:true,value:TestCustomEvent,
    });
  }
  try{return fn();}
  finally{
    if(oldStorage)Object.defineProperty(globalThis,"localStorage",oldStorage);
    else Reflect.deleteProperty(globalThis,"localStorage");
    if(oldWindow)Object.defineProperty(globalThis,"window",oldWindow);
    else Reflect.deleteProperty(globalThis,"window");
    if(oldCustomEvent)Object.defineProperty(globalThis,"CustomEvent",oldCustomEvent);
    else Reflect.deleteProperty(globalThis,"CustomEvent");
  }
}

test("LOS! 1 backup round-trip between two isolated device stores preserves conflicts and exams",()=>{
  const first=new FakeStore();
  const second=new FakeStore();
  const ownerA="los-test-device-a",ownerB="los-test-device-b";
  prepare(first,ownerA);
  prepare(second,ownerB);
  setDraft(first,ownerA,"01",{
    ...initial("Ensimmäisen laitteen muistiinpano"),
    practiceAnswers:{"C01-EX-01":"Guten Morgen!"},
    readerMarks:{"M-COM-01-u01-t0":"yellow"},
  });
  setDraft(first,ownerA,"02",{
    ...initial("Ensimmäisen laitteen C02"),applicationDraft:"Ich heiße Mia.",
  });
  setDraft(first,ownerA,"93",{
    ...initial("Loppukokeen luonnos"),practiceAnswers:{"EX-SUMMARY-GOAL":"Kertaan nimet."},
  });
  setDraft(second,ownerB,"02",initial("Toisen laitteen oma tärkeä C02-teksti"));
  const exported=inDevice(first,()=>createLosBookBackup(1));
  assert.deepEqual(Object.keys(exported.chapters).sort(),["01","02","93"]);
  const transfer=parseLosBookBackup(JSON.stringify(exported));
  inDevice(second,()=>{
    const existing=createLosBookBackup(1);
    const plan=planLosBookImport(transfer,existing);
    assert.deepEqual(plan.conflicts,["02"]);
    assert.deepEqual(plan.newChapters.sort(),["01","93"]);
    assert.deepEqual(importLosBookBackup(transfer,"missing-only"),{imported:2,skipped:1});
  });
  assert.equal(readDraft(second,ownerB,"01")?.note,"Ensimmäisen laitteen muistiinpano");
  assert.equal(readDraft(second,ownerB,"01")?.practiceAnswers["C01-EX-01"],"Guten Morgen!");
  assert.equal(readDraft(second,ownerB,"02")?.note,"Toisen laitteen oma tärkeä C02-teksti");
  assert.equal(readDraft(second,ownerB,"93")?.practiceAnswers["EX-SUMMARY-GOAL"],"Kertaan nimet.");
  assert.equal(readDraft(first,ownerA,"02")?.note,"Ensimmäisen laitteen C02");
  const beforeReplace=inDevice(second,()=>createLosBookBackup(1));
  inDevice(second,()=>{
    assert.deepEqual(importLosBookBackup(transfer,"replace"),{imported:3,skipped:0});
  });
  assert.equal(readDraft(second,ownerB,"02")?.note,"Ensimmäisen laitteen C02");
  assert.equal(beforeReplace.chapters["02"]?.note,"Toisen laitteen oma tärkeä C02-teksti");
  assert.equal(readDraft(first,ownerA,"02")?.note,"Ensimmäisen laitteen C02");
});

test("failed second chapter write rolls back first chapter without wiping existing work",()=>{
  const source=new FakeStore(),target=new FakeStore();
  const from="los-test-rollback-from",to="los-test-rollback-to";
  prepare(source,from);prepare(target,to);
  setDraft(source,from,"01",initial("uusi C01"));
  setDraft(source,from,"02",initial("uusi C02"));
  setDraft(target,to,"01",initial("vanha C01 säilytettävä"));
  setDraft(target,to,"02",initial("vanha C02 säilytettävä"));
  const backup=inDevice(source,()=>parseLosBookBackup(JSON.stringify(createLosBookBackup(1))));
  target.failOnce=losDraftKey(1,"02",to);
  inDevice(target,()=>{
    assert.throws(()=>importLosBookBackup(backup,"replace"),/Aiemmat paikalliset tallennukset palautettiin/);
  });
  assert.equal(readDraft(target,to,"01")?.note,"vanha C01 säilytettävä");
  assert.equal(readDraft(target,to,"02")?.note,"vanha C02 säilytettävä");
  assert.equal(target.data.size,3,"No partial extra chapter key may remain");
});
