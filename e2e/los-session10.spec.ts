import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { expectNoHorizontalOverflow } from "./helpers";
import { LOS1_FINAL_QUESTIONS } from "../src/features/los/content/los1FinalExam";

/**
 * This suite runs with the existing offline device-owner fixture on loopback.
 * Audio "ended" events below exercise the EX-FINAL client gating and persisted
 * state only. They DO NOT certify that the real Wikimedia media played on a
 * physical iPhone. That remains a separate release gate.
 */
async function enterLocalLos(page:import("@playwright/test").Page) {
  await page.addInitScript(() => {
    if (!["localhost","127.0.0.1"].includes(location.hostname)) return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/1/review-ii",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-book-workspace")).toBeVisible();
}
const draftKey=(chapter:string)=>"los.local.v1.00000000-0000-4000-8000-000000000195.1."+chapter;
const simulateCompletedAudio=async(page:import("@playwright/test").Page)=>{
  const audio=page.locator(".los-exam-listening audio");
  await expect(audio).toHaveCount(2);
  for(let i=0;i<2;i++)await audio.nth(i).evaluate(node=>node.dispatchEvent(new Event("ended")));
};
async function answerExam(page:import("@playwright/test").Page,oneWrong=false){
  for(let index=0;index<LOS1_FINAL_QUESTIONS.length;index++){
    const q=LOS1_FINAL_QUESTIONS[index]!;
    const choice=oneWrong&&index===0 ? q.choices.find(c=>c.id!==q.correctId)!.id : q.correctId;
    await page.locator('input[name="'+q.id+'"][value="'+choice+'"]').check();
  }
}

test("L056 real review flow accepts wrong checked answers and persists Teacher completion on desktop/iPhone",async({page})=>{
  test.setTimeout(180_000);
  await enterLocalLos(page);
  const review=page.locator("#los-review-L056");
  await expect(review.locator("li.los-exam-question")).toHaveCount(5);
  for(const question of await review.locator("li.los-exam-question").all()){
    await question.locator("input[type=radio]").first().check();
    await question.getByRole("button",{name:"Tarkista vastaus"}).click();
  }
  await review.locator('input[name="EX-REV2-SELF-056"][value="some"]').check();
  await page.goto("/los-lessons/L056",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav button");
  await expect(outline).toHaveCount(6);
  for(let index=0;index<6;index++){
    await outline.nth(index).click();
    if(index===3)await page.locator(".los-teacher-option").filter({hasText:"Bitte buchstabieren Sie. Am Montag."}).click();
  }
  await expect(page.getByText("5/5 tarkistettu")).toBeVisible();
  const finish=page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"});
  await expect(finish).toBeEnabled();
  await finish.click();
  await expect(page.getByText("Oppitunti merkitty suoritetuksi")).toBeVisible();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.getByText("Oppitunti merkitty suoritetuksi")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("L058 tracks model use before writing, but does not certify ungraded German production",async({page})=>{
  await enterLocalLos(page);
  const review=page.locator("#los-review-L058");
  await expect(review).toBeVisible();
  await review.getByRole("button",{name:"Näytä tarkistusmalli oman yrityksen jälkeen"}).click();
  await expect(review.getByText(/Tarkistusmalli on avattu/)).toBeVisible();
  const key=draftKey("92");
  const snapshot=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)??"{}"),key);
  expect(snapshot.teacherSessions.L058.helpedIds).toContain("writing-assisted");
  await review.locator("textarea#los-review-ii-writing").fill("Hallo!\nIch heiße Mia.\nIch komme aus Finnland.\nIch bin siebzehn Jahre alt.\nDas ist Leo.\nBis morgen!");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(review.getByText(/Tarkistusmalli on avattu/)).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("L058 finished writing stays self-produced until edited after viewing the model",async({page})=>{
  await enterLocalLos(page);
  const review=page.locator("#los-review-L058");
  const writing=review.locator("#los-review-ii-writing");
  const initial="Hallo!\\nIch heiße Mia.\\nIch komme aus Finnland.\\nIch bin siebzehn Jahre alt.\\nDas ist Leo.\\nBis morgen!".replaceAll("\\n","\n");
  await writing.fill(initial);
  await review.getByRole("button",{name:"Näytä tarkistusmalli oman yrityksen jälkeen"}).click();
  const key=draftKey("92");
  const before=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)??"{}"),key);
  expect(before.teacherSessions.L058.helpedIds).toContain("writing-model");
  expect(before.teacherSessions.L058.helpedIds).not.toContain("writing-assisted");
  await writing.fill(initial+"\\nIch lerne Deutsch.".replaceAll("\\n","\n"));
  const after=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)??"{}"),key);
  expect(after.teacherSessions.L058.helpedIds).toContain("writing-assisted");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(review.getByText(/kirjoitusyritys on merkitty avustetuksi/)).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("L060 counts five distinct real rated words, not both directions of three words",async({page})=>{
  await enterLocalLos(page);
  await page.goto("/los#/1/summary",{waitUntil:"domcontentloaded"});
  await expect(page.getByText(/Olet arvioinut 0 eri sanaa/)).toBeVisible();
  const confirm=page.getByRole("button",{name:"Vahvista vähintään viisi arvioitua sanaa"});
  await expect(confirm).toBeDisabled();
  await page.getByRole("button",{name:"Avaa sanakortit"}).click();
  await expect(page.locator(".los-recall-card")).toBeVisible();

  async function reviewThree(){
    for(let i=0;i<3;i++){
      await page.getByRole("button",{name:"Näytä vastaus"}).click();
      await page.getByRole("button",{name:"Muistin oikein"}).click();
    }
  }
  await reviewThree();
  await page.getByRole("button",{name:"Suomi → saksa"}).click();
  await reviewThree(); // The same three words in the reverse direction.
  await page.goto("/los#/1/summary",{waitUntil:"domcontentloaded"});
  await expect(page.getByText(/Olet arvioinut 3 eri sanaa/)).toBeVisible();
  await expect(confirm).toBeDisabled();

  await page.getByRole("button",{name:"Avaa sanakortit"}).click();
  for(let i=0;i<2;i++){
    await page.getByRole("button",{name:"Näytä vastaus"}).click();
    await page.getByRole("button",{name:"Muistin oikein"}).click();
  }
  await page.goto("/los#/1/summary",{waitUntil:"domcontentloaded"});
  await expect(page.getByText(/Olet arvioinut 5 eri sanaa/)).toBeVisible();
  await expect(confirm).toBeEnabled();
  await confirm.click();
  await expect(page.getByText("Kertausvahvistus kirjattu. Korttien osaaminen on käyttäjän itse arvioimaa.")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});


test("corrupted current EX-FINAL marker never leaks answers and can be repaired without losing work",async({page})=>{
  test.setTimeout(210_000);
  await enterLocalLos(page);
  const key=draftKey("93");
  const stamp="2026-11-13T12:00:00.000Z";
  await page.evaluate(({key,stamp})=>{
    const current=JSON.parse(localStorage.getItem(key)??JSON.stringify({
      version:1,note:"",applicationDraft:"",bookmarked:false,practiceAnswers:{},
      practiceChecked:[],testAnswers:{},testSubmittedAt:null,selfAssessment:"",updatedAt:stamp,
    }));
    current.testSubmittedAt=stamp;
    current.testAnswers={"EX-FINAL-Q01":"a","EX-FINAL-Q02":"b"};
    current.practiceAnswers={...current.practiceAnswers,
      "EX-FINAL-AUDIO-M-COM-01":"yes","EX-FINAL-AUDIO-M-COM-02":""};
    current.applicationDraft="Oma teksti säilyy";
    localStorage.setItem(key,JSON.stringify(current));
  },{key,stamp});
  await page.goto("/los#/1/final",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Palautusmerkintä on ristiriitainen"})).toBeVisible();
  await expect(page.getByText("2/50 vastattu")).toBeVisible();
  await expect(page.locator(".los-exam-feedback")).toHaveCount(0);
  await expect(page.locator(".los-exam-results").filter({hasText:"pistettä"})).toHaveCount(0);
  await expect(page.locator('input[name="EX-FINAL-Q01"][value="a"]')).toBeChecked();
  await expect(page.getByRole("button",{name:/Palauta loppukoe ·/})).toBeDisabled();
  await page.goto("/los#/1/summary",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-exam-overview")).toContainText("ei vielä palautettu");
  await page.goto("/los#/1/final",{waitUntil:"domcontentloaded"});
  await page.getByRole("button",{name:"Korjaa palautusmerkintä ja jatka luonnosta"}).click();
  const repaired=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)??"{}"),key);
  expect(repaired.testSubmittedAt).toBeNull();
  expect(repaired.testAnswers["EX-FINAL-Q01"]).toBe("a");
  expect(repaired.applicationDraft).toBe("Oma teksti säilyy");
  await answerExam(page);
  await expect(page.getByRole("button",{name:/Palauta loppukoe ·/})).toBeDisabled();
  await simulateCompletedAudio(page);
  await page.getByRole("button",{name:/Palauta loppukoe ·/}).click();
  await expect(page.locator(".los-exam-results h2").first()).toHaveText("50/50 pistettä");
  const after=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)??"{}"),key);
  const audioAt=after.practiceAnswers["EX-FINAL-AUDIO-M-COM-01"];
  await page.locator(".los-exam-listening audio").first().evaluate(el=>el.dispatchEvent(new Event("ended")));
  const afterReplay=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)??"{}"),key);
  expect(afterReplay.practiceAnswers["EX-FINAL-AUDIO-M-COM-01"]).toBe(audioAt);
  await page.goto("/los#/1/summary",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-exam-overview")).toContainText("50/50");
  await expectNoHorizontalOverflow(page);
});

test("L059 writing model is gated behind own draft and later edits are visibly assisted",async({page})=>{
  test.setTimeout(180_000);
  await enterLocalLos(page);
  await page.goto("/los#/1/final",{waitUntil:"domcontentloaded"});
  const writing=page.locator("#los-final-writing");
  const model=page.locator(".los-exam-writing-model");
  await expect(model).toHaveCount(0);
  await answerExam(page);
  await simulateCompletedAudio(page);
  await page.getByRole("button",{name:/Palauta loppukoe ·/}).click();
  await expect(model).toContainText("malliviesti avautuu vasta", {ignoreCase:true});
  await expect(model.locator("details")).toHaveCount(0);
  const own="Hallo!\nIch heiße Lara.\nIch komme aus Schweden.\nIch bin siebzehn Jahre alt.\nDas ist mein Freund Tom.\nWir sehen uns am Montag.";
  await writing.fill(own);
  await expect(model.locator("details")).toHaveCount(0);
  await page.getByRole("button",{name:"Vahvista kirjoitusyritys tarkistuslistalla"}).click();
  await expect(model.locator("details")).toHaveCount(1);
  await model.locator("summary").click();
  await expect(model.getByText(/Malli on LOS!:n itse laatima/)).toBeVisible();
  const key=draftKey("93");
  await expect.poll(async()=>page.evaluate(k=>Boolean(JSON.parse(localStorage.getItem(k)??"{}").practiceAnswers?.["EX-FINAL-WRITING-MODEL-OPENED"]),key)).toBe(true);
  let record=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)??"{}"),key);
  expect(record.practiceAnswers["EX-FINAL-WRITING-ASSISTED"]).toBeUndefined();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(model).toContainText("Malliviesti on avattu");
  await writing.fill(own.replace("Schweden","Finnland"));
  record=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)??"{}"),key);
  expect(record.practiceAnswers["EX-FINAL-WRITING-ASSISTED"]).toBe("edited-after-model");
  expect(record.practiceAnswers["EX-FINAL-WRITING-CHECK"]).toBe("");
  await expect(model.locator("details")).toHaveCount(0);
  await page.getByRole("button",{name:"Vahvista kirjoitusyritys tarkistuslistalla"}).click();
  await page.goto("/los#/1/summary",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-mastery")).toContainText("avustettu kirjoitusyritys");
  await expect(page.locator(".los-mastery")).toContainText("CEFR-tasotodistus");
  await expectNoHorizontalOverflow(page);
});

test("EX-FINAL: 50 decisions, submit, 49/50 feedback, reload, retake archive, 50/50 and JSON backup on both layouts",async({page})=>{
  test.setTimeout(240_000);
  await enterLocalLos(page);
  await page.goto("/los#/1/final",{waitUntil:"domcontentloaded"});
  const submit=page.getByRole("button",{name:/Palauta loppukoe ·/});
  await expect(submit).toBeDisabled();
  await answerExam(page,true);
  await expect(submit).toBeDisabled(); // authentic audio play-completion gate
  await simulateCompletedAudio(page);
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.locator(".los-exam-results").first()).toContainText("49/50 pistettä");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-exam-results").first()).toContainText("49/50 pistettä");
  await page.getByLabel(/Voin tehdä JSON-varmuuskopion/).check();
  await page.getByRole("button",{name:"Arkistoi ja aloita uusi koeyritys"}).click();
  await expect(page.getByText("Aiempien loppukokeiden arkisto")).toBeVisible();
  await expect(page.locator(".los-exam-results").last()).toContainText("49/50");
  await expect(submit).toBeDisabled();
  await answerExam(page);
  await simulateCompletedAudio(page);
  await submit.click();
  await expect(page.locator(".los-exam-results").first()).toContainText("50/50 pistettä");
  await page.goto("/los#/1/appendix",{waitUntil:"domcontentloaded"});
  const dl=page.waitForEvent("download");
  await page.getByRole("button",{name:"Vie koko LOS! 1:n varmuuskopio"}).click();
  const downloaded=await dl;
  const downloadedPath=await downloaded.path();
  expect(downloadedPath).toBeTruthy();
  const backup=JSON.parse(readFileSync(downloadedPath!,"utf8"));
  expect(backup.chapters["93"].testSubmittedAt).toBeTruthy();
  expect(Object.keys(backup.chapters["93"].practiceAnswers)).toContain("EX-FINAL-ARCHIVE-01");
  expect(backup.chapters["93"].testAnswers["EX-FINAL-Q01"]).toBeTruthy();
  await expectNoHorizontalOverflow(page);
});

test("L059 completion and L060 show real evidence with missing skills after exam scoring, on mobile too",async({page})=>{
  await enterLocalLos(page);
  const key=draftKey("93");
  // Fixture contains a fully submitted EX-FINAL and separate self-reviewed work.
  // We do not fake a live microphone recording in a browser test.
  const bank=Object.fromEntries(LOS1_FINAL_QUESTIONS.map(q=>[q.id,q.correctId]));
  await page.evaluate(({key,bank})=>{
    const now="2026-11-13T12:00:00.000Z";
    const previous=localStorage.getItem(key);
    const d=previous?JSON.parse(previous):{
      version:1,note:"",applicationDraft:"",bookmarked:false,practiceAnswers:{},
      practiceChecked:[],testAnswers:{},testSubmittedAt:null,selfAssessment:"",updatedAt:now,
    };
    d.testAnswers=bank;
    d.testSubmittedAt=now;
    d.applicationDraft="Hallo!\nIch heiße Mia.\nIch komme aus Finnland.\nIch bin siebzehn Jahre alt.\nDas ist Leo.\nBis morgen!";
    d.selfAssessment="Kirjoittaminen sujui, mutta haluan vielä harjoitella ääneen.";
    d.practiceAnswers={...d.practiceAnswers,
      "EX-FINAL-AUDIO-M-COM-01":now,"EX-FINAL-AUDIO-M-COM-02":now,
      "EX-FINAL-WRITING-CHECK":"written-and-reviewed",
      "EX-FINAL-VOICE-CHECK":"audio-download-started",
      "EX-FINAL-DIALOGUE-SELF":"some"};
    localStorage.setItem(key,JSON.stringify(d));
  },{key,bank});
  await page.goto("/los-lessons/L059",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav button");
  for(let i=0;i<4;i++)await outline.nth(i).click();
  await expect(page.getByText("EX-FINAL: 50/50 pistettä")).toBeVisible();
  await page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"}).click();
  await expect(page.getByText("Oppitunti merkitty suoritetuksi")).toBeVisible();
  await page.goto("/los#/1/summary",{waitUntil:"domcontentloaded"});
  const mastery=page.getByRole("region",{name:"Tallennuksiin perustuva LOS! 1:n osaamisyhteenveto"});
  await expect(mastery).toContainText("50/50");
  await expect(mastery).toContainText("Ei myönteistä tarkistettua näyttöä");
  await expect(mastery).toContainText("CEFR-tasotodistus");
  await expect(mastery).toContainText("0/15");
  await expectNoHorizontalOverflow(page);
});
