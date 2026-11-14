import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

test("C08 shows four ungraded reading stages before the complete source in book",async({page})=>{
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","los-c08-reading-fixture");
  });
  await page.goto("/los#/1/08/text",{waitUntil:"domcontentloaded"});
  const paper=page.locator(".los-book-paper");
  await expect(paper).toBeVisible();
  const guide=paper.locator(".los-c08-reading-guide");
  await expect(guide.getByRole("heading",{name:"Lue pitkä alkuperäisteksti neljässä osassa"})).toBeVisible();
  await expect(guide.locator("ol > li")).toHaveCount(4);
  await expect(paper.locator(".los-c01-reader .los-c01-turn")).toHaveCount(26);
  await expect(paper.locator(".los-c01-reader")).toContainText("M-WB-08");
  const first=guide.locator("ol > li").first();
  await first.locator("details > summary").first().click();
  await expect(first).toContainText("Mikä oppiaine on meneillään?");
  await expect(first).not.toContainText("Torsten kertoo tehneensä tehtävät bussissa");
  await first.getByText("Paljasta vastausesimerkki oman yrityksen jälkeen").click();
  await expect(first).toContainText("Torsten kertoo tehneensä tehtävät bussissa");
  await expectNoHorizontalOverflow(page);
});
