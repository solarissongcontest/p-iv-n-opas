import {test,expect} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

test("Focused LOS! reader hides navigation but keeps text and annotation tools; Escape restores sidebar",async({page})=>{
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
    localStorage.setItem("opk.device-authorized","Local test learner");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000922");
  });
  await page.goto("/los#/1/01/text",{waitUntil:"domcontentloaded"});
  const reader=page.locator(".los-revised-page");
  await expect(reader).toBeVisible({timeout:30000});
  await page.getByRole("button",{name:"Avaa rauhallinen lukutila"}).click();
  await expect(reader).toHaveClass(/is-focus-reader/);
  await expect(page.locator(".los-book-sidebar")).toBeHidden();
  await expect(page.locator(".los-study-questions")).toBeHidden();
  await expect(page.locator(".los-c01-turns").first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(reader).not.toHaveClass(/is-focus-reader/);
  await expect(page.locator(".los-study-questions")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
