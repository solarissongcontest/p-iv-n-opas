import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";
import {LOS1_MIDTERM_QUESTIONS} from "../src/features/los/content/los1Exams";

/** Browser integration on Chromium and simulated iPhone WebKit.
 * Actual human-audio playback and real-device Safari remain release gates.
 * Uses the same LOCAL ONLY owner fixture as los-full-book.spec.ts, never
 * misrepresents an unavailable remote login service as an exam failure.
 */
async function enterLocalLos(page:import("@playwright/test").Page){
  await page.addInitScript(() => {
    if (!["localhost","127.0.0.1"].includes(window.location.hostname)) return;
    window.localStorage.setItem("opk.device-authorized","Arthur");
    window.localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/1/01/chapter",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-book-workspace")).toBeVisible({timeout:30_000});
}
test("EX-MID saves 25 responses, hides keys until submission and archives own text on retake",async({page})=>{
  await enterLocalLos(page);
  await page.goto("/los#/1/midterm",{waitUntil:"domcontentloaded"});
  const questions=page.locator(".los-exam-question");
  await expect(questions).toHaveCount(25);
  await expect(page.locator(".los-exam-feedback")).toHaveCount(0);
  for(const [index,q] of LOS1_MIDTERM_QUESTIONS.entries()){
    await questions.nth(index).locator('input[value="'+q.correctId+'"]').check();
  }
  await page.getByLabel("Oma keskustelu tai muistiinpanot (vapaaehtoinen)").fill("A: Hallo! B: Guten Tag! A: Wie heißen Sie? B: Ich heiße Mia.");
  await page.getByLabel("Mitä osasin ja mitä harjoittelen vielä?").fill("Harjoittelen vielä Sie-muotoa.");
  await page.locator('input[name="EX-MID-DIALOGUE-SELF"][value="some"]').check();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(questions).toHaveCount(25);
  await expect(questions.nth(0).locator('input[value="'+LOS1_MIDTERM_QUESTIONS[0]!.correctId+'"]')).toBeChecked();
  await expect(page.locator(".los-exam-feedback")).toHaveCount(0);
  await page.getByRole("button",{name:/Palauta välikoe · 25\/25/}).click();
  await expect(page.locator(".los-exam-results").first()).toContainText("25 / 25 pistettä");
  await expect(page.locator(".los-exam-feedback")).toHaveCount(25);
  await page.locator(".los-exam-retake input[type=checkbox]").check();
  await page.getByRole("button",{name:/Arkistoi tulos ja aloita uusinta/}).click();
  await expect(page.getByRole("heading",{name:"Aiempien yritysten arkisto"})).toBeVisible();
  await page.reload({waitUntil:"domcontentloaded"});
  await page.getByRole("summary",{name:"Oma keskusteluteksti ja itsearviointi"}).click();
  await expect(page.locator(".los-exam-own-text").first()).toContainText("Ich heiße Mia");
  await expect(page.locator(".los-exam-own-text").nth(1)).toContainText("Sie-muotoa");
  await expect(page.locator(".los-exam-question").first().locator("input:checked")).toHaveCount(0);
  await expect(page.getByLabel("Oma keskustelu tai muistiinpanot (vapaaehtoinen)")).toHaveValue("");
  await expect(page.getByLabel("Mitä osasin ja mitä harjoittelen vielä?")).toHaveValue("");
  await expect(page.locator('input[name="EX-MID-DIALOGUE-SELF"]:checked')).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});

test("L030 Teacher uses the same submitted EX-MID state and resumes after reload",async({page})=>{
  await enterLocalLos(page);
  await page.goto("/los#/1/midterm",{waitUntil:"domcontentloaded"});
  const questions=page.locator(".los-exam-question");
  for(const [index,q] of LOS1_MIDTERM_QUESTIONS.entries())await questions.nth(index).locator('input[value="'+q.correctId+'"]').check();
  await page.locator('input[name="EX-MID-DIALOGUE-SELF"][value="well"]').check();
  await page.getByLabel("Mitä osasin ja mitä harjoittelen vielä?").fill("Puhuin ääneen neljä repliikkiä ja kertaan vielä vointia.");
  await page.getByRole("button",{name:/Palauta välikoe/}).click();
  await page.goto("/los-lessons/L030",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Välikoe: kappaleet 1–5"})).toBeVisible();
  const nav=page.getByRole("navigation",{name:"Oppitunnin opetustilanteet"});
  const sceneButtons=nav.getByRole("button");
  const count=await sceneButtons.count();
  for(let i=0;i<count;i++)await sceneButtons.nth(i).click();
  await expect(page.getByText("25/25 kelvollista vastausta")).toBeVisible();
  const finish=page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"});
  await expect(finish).toBeEnabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeEnabled();
  await finish.click();
  await expect(page.getByText("Oppitunti merkitty suoritetuksi. Osaamista seurataan erikseen.")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("L029 fallback is explicitly textual and never awards listening points",async({page})=>{
  await enterLocalLos(page);
  await page.goto("/los-lessons/L029",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Autenttisen keskustelun kertauskuuntelu"})).toBeVisible();
  const nav=page.getByRole("navigation",{name:"Oppitunnin opetustilanteet"});
  await nav.getByRole("button",{name:/Avaa C01:n autenttinen dialogi ja soitin/}).click();
  await expect(page.getByText(/ei merkitä kuuntelupisteitä/i)).toBeVisible();
  await expect(page.locator(".los-teacher-book-link").filter({hasText:"C01 · Franz ja Jörg, koko Text A"}).locator("a")).toHaveAttribute("href",/\/01\/text/);
  await expectNoHorizontalOverflow(page);
});
