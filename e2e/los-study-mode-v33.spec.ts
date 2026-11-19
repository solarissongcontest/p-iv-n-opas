import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

async function enter(page:import("@playwright/test").Page){
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
    localStorage.setItem("opk.device-authorized","Local test learner");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000319");
    localStorage.removeItem("los1.reader.split");
  });
  await page.goto("/los#/1/01/text",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-revised-page")).toBeVisible({timeout:30000});
}
test("Book + exercises shows exactly one live question, preserves answers after layout switches",async({page})=>{
  await enter(page);
  await expect(page.locator(".los-revised-page .los-reading-question")).toHaveCount(8);
  await page.getByRole("combobox",{name:"Opiskelutila"}).selectOption("split");
  await expect(page.locator(".los-study-layout")).toHaveClass(/is-split/);
  await expect(page.locator(".los-study-questions .los-reading-question")).toHaveCount(1);
  const first=page.locator("#LOS1-READ-V2-C01-A-01");
  await first.getByLabel("Saksan kurssia").check();
  await first.getByRole("button",{name:"Tarkista vastaus"}).click();
  await expect(first.locator(".los-reading-feedback")).toContainText("Oikein!");
  await page.getByRole("combobox",{name:"Opiskelutila"}).selectOption("book");
  await expect(page.locator(".los-study-layout")).not.toHaveClass(/is-split/);
  await expect(page.locator(".los-revised-page .los-reading-question")).toHaveCount(8);
  await expect(page.locator("#LOS1-READ-V2-C01-A-01 .los-reading-feedback")).toContainText("Oikein!");
  await page.getByRole("combobox",{name:"Opiskelutila"}).selectOption("split");
  await page.locator(".los-reading-compact-nav button").last().click();
  await expect(page.locator(".los-study-questions .los-reading-question")).toHaveCount(1);
  await expectNoHorizontalOverflow(page);
});
test("Hierarchical TOC contains all ten sections, 15 reading tasks and chapter exercises",async({page})=>{
  await enter(page);
  const sidebar=page.locator(".los-book-sidebar");
  const first=sidebar.locator(".los-sidebar-chapter-group").first();
  await expect(first.locator(".los-sidebar-chapter-children")).toBeVisible();
  await first.locator(".los-sidebar-task-group").first().locator("summary").click();
  await expect(first.locator(".los-sidebar-task-group").first().locator("button")).toHaveCount(15);
  await first.locator(".los-sidebar-task-group").last().locator("summary").click();
  await expect(first.locator(".los-sidebar-task-group").last().locator("button")).toHaveCount(12);
  await first.locator(".los-sidebar-task-group").last().getByRole("button",{name:/Harjoitus 1 /}).click();
  await expect(page.locator("#C01-EX-01")).toBeVisible();
  await sidebar.locator(".los-sidebar-tree-search input").fill("Woher");
  await expect(sidebar.locator(".los-sidebar-chapter-group")).toHaveCount(1);
  await expectNoHorizontalOverflow(page);
});
