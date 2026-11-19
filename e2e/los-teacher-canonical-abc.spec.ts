import {expect,test,type Page} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

async function withLocalOwner(page:Page){
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
}
test("the primary LOS path opens original Teacher 2.0, not the retired guided runner",async({page},info)=>{
  await withLocalOwner(page);
  await page.setViewportSize({width:390,height:844});
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Oma saksanopettajasi oppikirjan sisällä"})).toBeVisible();
  const start=page.getByRole("link",{name:/Aloita Opetuspolku 2.0/});
  await expect(start).toHaveAttribute("href","/los-lessons/L001");
  await start.click();
  await expect(page).toHaveURL(/\/los-lessons\/L001$/);
  await expect(page.locator(".los-teacher-paper h2")).toBeVisible();
  await expect(page.locator(".los-teacher-sidebar")).toContainText("L001");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({path:info.outputPath("teacher20-390-first-lesson.png"),animations:"disabled"});
});
test("canonical L003 teaches current C01 Text A/B/C, including Hilfstext",async({page},info)=>{
  await withLocalOwner(page);
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/los-lessons/L003",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-sidebar")).toContainText("L003");
  await expect(page.locator(".los-teacher-sidebar")).toContainText("Lue ja ymmärrä");
  await page.locator(".los-teacher-outline").getByRole("button",{name:/Text C: So begrüßt man sich!/}).click();
  await expect(page.locator(".los-teacher-paper h2")).toContainText("Text C:");
  await expect(page.locator(".los-teacher-book-links")).toContainText("Text C");
  await expect(page.locator(".los-teacher-book-links a").first()).toHaveAttribute("href",/\/01\/text-c$/);
  await expect(page.locator(".los-teacher-paper")).not.toContainText("Franzin ja Jörgin keskustelu");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({path:info.outputPath("teacher20-desktop-current-text-c.png"),animations:"disabled"});
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper h2")).toContainText("Text C:");
  await page.goto("/los#/1/01/text-c",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-revised-support h1")).toContainText("So begrüßt man sich!");
  await expect(page.locator(".los-revised-support-content")).toBeVisible();
});
test("320px Teacher 2.0 preserves canonical Text C and safe versioned progress",async({page},info)=>{
  await withLocalOwner(page);
  await page.setViewportSize({width:320,height:780});
  await page.goto("/los-lessons/L008",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-sidebar")).toContainText("L008");
  await expect(page.locator(".los-teacher-outline")).toContainText("Text C");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({path:info.outputPath("teacher20-mobile320-current-C02.png"),animations:"disabled"});
  await page.locator(".los-teacher-outline summary").click();
  await page.locator(".los-teacher-outline nav button").last().click();
  await expect(page.locator(".los-teacher-paper .los-teacher-summary")).toBeVisible();
  const finish=page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"});
  await expect(finish).toBeDisabled();
});
