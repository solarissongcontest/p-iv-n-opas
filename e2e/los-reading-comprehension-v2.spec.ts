import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

/** Loopback owner-cache fixture only, not a production auth test. */
async function enterLocalLos(page:import("@playwright/test").Page){
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/1/01/understand",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-reading-understanding")).toBeVisible({timeout:30000});
}
const chapters=Array.from({length:10},(_,i)=>String(i+1).padStart(2,"0"));

test("Ten chapters have 8 A, 5 B and 2 C questions both in Ymmärrä and by text",async({page})=>{
  await enterLocalLos(page);
  for(const chapter of chapters){
    await page.goto("/los#/1/"+chapter+"/understand",{waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-reading-understanding .los-reading-exercises").first().locator(".los-reading-question")).toHaveCount(8);
    await page.locator(".los-reading-extra-group > summary").first().click();
    await expect(page.locator(".los-reading-extra-group").first().locator(".los-reading-question")).toHaveCount(5);
    await page.locator(".los-reading-extra-group > summary").last().click();
    await expect(page.locator(".los-reading-extra-group").last().locator(".los-reading-question")).toHaveCount(2);
    await page.goto("/los#/1/"+chapter+"/text-b",{waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-revised-page .los-reading-question")).toHaveCount(5);
    await page.goto("/los#/1/"+chapter+"/text-c",{waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-revised-support .los-reading-question")).toHaveCount(2);
    await expectNoHorizontalOverflow(page);
  }
});

test("Text A MC answer feedback and local persistence are correct",async({page})=>{
  await enterLocalLos(page);
  const first=page.locator("#LOS1-READ-V2-C01-A-01");
  await expect(first).toBeVisible();
  await expect(first.locator(".los-reading-feedback")).toHaveCount(0);
  await first.getByLabel("Saksan kurssia").check();
  await first.getByRole("button",{name:"Tarkista vastaus"}).click();
  await expect(first.locator(".los-reading-feedback")).toContainText("Oikein!");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(first.getByLabel("Saksan kurssia")).toBeChecked();
  await expect(first.locator(".los-reading-feedback")).toContainText("Oikein!");
  await first.getByLabel("Junaa").check();
  await expect(first.locator(".los-reading-feedback")).toHaveCount(0);
  await first.getByRole("button",{name:"Tarkista vastaus"}).click();
  await expect(first.locator(".los-reading-feedback")).toContainText("Oikea vastaus: Saksan kurssia");
});

test("Open responses stay self assessed and C model is not shown immediately",async({page})=>{
  await enterLocalLos(page);
  const open=page.locator("#LOS1-READ-V2-C01-A-06");
  await expect(open.locator(".los-reading-feedback")).toHaveCount(0);
  await open.getByPlaceholder("Kirjoita vastaus tai poimi ilmaus tekstistä…").fill("Ist hier der Deutschkurs?");
  await open.getByRole("button",{name:"Näytä mallivastaus"}).click();
  await expect(open.locator(".los-reading-feedback")).toContainText("Yksi mahdollinen mallivastaus");
  await page.goto("/los#/1/01/text-c",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"So begrüßt man sich!"})).toBeVisible();
  await expect(page.locator(".los-revised-support-content details.los-revised-answer")).toHaveCount(1);
  await expect(page.locator(".los-revised-support-content details.los-revised-answer")).not.toHaveAttribute("open");
});
