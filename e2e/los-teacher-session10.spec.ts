import {expect,test} from "@playwright/test";
import {readFileSync} from "node:fs";
import {expectNoHorizontalOverflow} from "./helpers";
import {LOS1_FINAL_QUESTIONS} from "../src/features/los/content/los1FinalExam.ts";

const owner="00000000-0000-4000-8000-000000000195";
const slot=(chapter:string)=>"los.local.v1."+owner+".1."+chapter;
async function enter(page:import("@playwright/test").Page){
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-lesson-program")).toBeVisible();
}
async function fillFinal(page:import("@playwright/test").Page,correctCount:number){
  for(const [index,q] of LOS1_FINAL_QUESTIONS.entries()){
    const chosen=index<correctCount?q.correctId:q.choices.find(c=>c.id!==q.correctId)!.id;
    await page.locator('input[name="'+q.id+'"][value="'+chosen+'"]').check();
  }
}
async function simulatedAudioEnd(page:import("@playwright/test").Page){
  // Browser event simulation ONLY. This does not verify real audio playback.
  await page.locator(".los-exam-listening audio").evaluateAll(elements=>
    elements.forEach(element=>element.dispatchEvent(new Event("ended",{bubbles:true}))));
}
test("Teacher session 10 opens L056–L060 and persists reading position on desktop and iPhone",async({page})=>{
  await enter(page);
  for(const id of ["L056","L057","L058","L059","L060"]){
    await page.goto("/los-lessons/"+id,{waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-teacher-sidebar h1")).toBeVisible();
    await expect(page.locator(".los-teacher-paper h2")).toBeVisible();
    const outline=page.locator(".los-teacher-outline nav button");
    await outline.nth(1).click();
    const sceneBefore=await page.locator(".los-teacher-paper h2").innerText();
    await page.reload({waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-teacher-paper h2")).toHaveText(sceneBefore);
    await expectNoHorizontalOverflow(page);
  }
});
test("L056 remains finishable with checked incorrect review tasks and honest self-assessment",async({page})=>{
  await enter(page);
  await page.goto("/los#/1/review-ii",{waitUntil:"domcontentloaded"});
  const group=page.locator("#los-review-L056");
  await expect(group).toBeVisible();
  // Persist each checked answer before advancing to the next row, as the real UI does.
  for(const item of await group.locator("ol > li.los-exam-question").all()){
    await item.locator("input[type=radio]").first().check();
    await item.getByRole("button",{name:"Tarkista vastaus"}).click();
  }
  await group.locator('input[name="EX-REV2-SELF-056"][value="some"]').check();
  await page.goto("/los-lessons/L056",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav button");
  for(let i=0;i<await outline.count();i++){
    await outline.nth(i).click();
    if(await page.locator(".los-teacher-question").isVisible().catch(()=>false)){
      await page.locator(".los-teacher-option").first().click();
    }
  }
  await expect(page.locator(".los-teacher-assessment-status")).toContainText("5/5 tarkistettu");
  await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeEnabled();
  await page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"}).click();
  await expect(page.getByText(/Oppitunti merkitty suoritetuksi/)).toBeVisible();
});
test("EX-FINAL hides answers until submission, scores 50/50, archives retake and survives backup",async({page})=>{
  test.setTimeout(180_000);
  await enter(page);
  await page.goto("/los#/1/final",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Koko kirjan loppukoe"})).toBeVisible();
  await expect(page.locator(".los-exam-feedback")).toHaveCount(0);
  await expect(page.getByRole("button",{name:/Palauta loppukoe/})).toBeDisabled();
  await fillFinal(page,50);
  await expect(page.getByRole("button",{name:/Palauta loppukoe/})).toBeDisabled();
  await simulatedAudioEnd(page);
  await expect(page.getByRole("button",{name:/Palauta loppukoe/})).toBeEnabled();
  await page.getByRole("button",{name:/Palauta loppukoe/}).click();
  await expect(page.locator(".los-exam-results h2").first()).toHaveText("50/50 pistettä");
  await expect(page.locator(".los-exam-feedback")).toHaveCount(50);
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-exam-results h2").first()).toHaveText("50/50 pistettä");
  await page.locator(".los-exam-retake input[type=checkbox]").check();
  await page.getByRole("button",{name:/Arkistoi ja aloita uusi koeyritys/}).click();
  await expect(page.locator(".los-exam-results").filter({hasText:"Aiempien loppukokeiden arkisto"})).toContainText("50/50 pistettä");
  await fillFinal(page,49);
  await simulatedAudioEnd(page);
  await page.getByRole("button",{name:/Palauta loppukoe/}).click();
  await expect(page.locator(".los-exam-results h2").first()).toHaveText("49/50 pistettä");
  await page.goto("/los#/1/appendix",{waitUntil:"domcontentloaded"});
  const [download]=await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button",{name:"Vie koko LOS! 1:n varmuuskopio"}).click(),
  ]);
  const raw=readFileSync(await download.path()!,"utf8");
  const backup=JSON.parse(raw) as {chapters:Record<string,{practiceAnswers:Record<string,string>;testAnswers:Record<string,string>}>};
  expect(backup.chapters["93"]?.testAnswers["EX-FINAL-Q01"]).toBeTruthy();
  expect(backup.chapters["93"]?.practiceAnswers["EX-FINAL-ARCHIVE-01"]).toBeTruthy();
  await page.reload({waitUntil:"domcontentloaded"});
  await page.goto("/los#/1/final",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-exam-results h2").first()).toHaveText("49/50 pistettä");
  await expectNoHorizontalOverflow(page);
});
test("L059 uses only existing submitted EX-FINAL; L060 visibly distinguishes missing proof from its score",async({page})=>{
  await enter(page);
  await page.goto("/los-lessons/L059",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Koko kirjan loppukoe"}).first()).toBeVisible();
  await page.locator(".los-teacher-outline nav button").last().click();
  await expect(page.getByText(/ei vielä palautettua 50 tehtävän yritystä/)).toBeVisible();
  await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
  await page.goto("/los-lessons/L060",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline nav button").last().click();
  await expect(page.getByRole("heading",{name:"Osaaminen todellisten tallennusten perusteella"})).toBeVisible();
  await expect(page.getByText("Ei myönteistä tarkistettua näyttöä").first()).toBeVisible();
  await expect(page.getByText(/CEFR-tasotodistus/)).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
