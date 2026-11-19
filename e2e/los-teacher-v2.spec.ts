import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

async function openTeacher(page:import("@playwright/test").Page){
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("button",{name:"Avaa L004:n Lesson Player"})).toBeVisible({timeout:30000});
  await page.getByRole("button",{name:"Avaa L004:n Lesson Player"}).click();
  await expect(page).toHaveURL(/\/los#\/1\/lessons\/L004$/);
  await expect(page.locator(".los-teacher-v2")).toBeVisible();
}

test("LOS Teacher Experience 2.0 has a real route and distinct single-scene player",async({page},testInfo)=>{
 await page.setViewportSize({width:1440,height:900});
 await openTeacher(page);
 await expect(page.getByRole("heading",{name:"Tervehdykset muistista"})).toBeVisible();
 await expect(page.getByRole("heading",{name:"Tänään tervehdit oikeassa tilanteessa"})).toBeVisible();
 await expect(page.locator(".los-lesson-steps")).toHaveCount(0);
 await expect(page.locator(".los-teacher-menu li")).toHaveCount(11);
 await expectNoHorizontalOverflow(page);
 await page.screenshot({path:testInfo.outputPath("los-teacher2-desktop-intro.png"),fullPage:false,animations:"disabled"});
 await page.locator(".los-teacher-bottom .los-teacher-next").click();
 await expect(page.getByRole("heading",{name:"Mitä muistat ennestään?"})).toBeVisible();
 await page.getByRole("radio",{name:"Guten Abend!"}).check();
 await page.getByRole("button",{name:"Tarkista vastaus"}).click();
 await expect(page.locator(".los-teacher-feedback")).toContainText("Kokeillaan uudelleen");
 await expect(page.locator(".los-teacher-feedback")).toContainText("Morgen");
 await page.getByRole("button",{name:/Yritä uudelleen/}).click();
 await page.getByRole("radio",{name:"Guten Morgen!"}).check();
 await page.getByRole("button",{name:"Tarkista vastaus"}).click();
 await expect(page.locator(".los-teacher-feedback")).toContainText("Oikein");
 await page.reload();
 await expect(page.getByRole("heading",{name:"Mitä muistat ennestään?"})).toBeVisible();
 await expect(page.locator(".los-teacher-feedback")).toContainText("Oikein");
 await expectNoHorizontalOverflow(page);
});

test("LOS Teacher 2.0 board, extra help and book references preserve the session",async({page},testInfo)=>{
 await page.setViewportSize({width:390,height:844});
 await openTeacher(page);
 await page.locator(".los-teacher-menu summary").click();
 await page.getByRole("button",{name:/04 Rakenna tervehdykset taululla/}).click();
 await expect(page.locator(".los-teacher-board-german")).toContainText("Guten Morgen");
 await page.getByRole("button",{name:/Seuraava esimerkki/}).click();
 await expect(page.locator(".los-teacher-board-german")).toContainText("Guten Tag");
 await page.getByRole("button",{name:"Selitä yksinkertaisemmin"}).click();
 await expect(page.locator(".los-teacher-help-answer")).toBeVisible();
 await expectNoHorizontalOverflow(page);
 await page.screenshot({path:testInfo.outputPath("los-teacher2-mobile-board.png"),fullPage:false,animations:"disabled"});
 await page.locator(".los-teacher-menu summary").click();
 await page.getByRole("button",{name:/07 Käytä myös oikeaa oppikirjaa/}).click();
 const link=page.getByRole("link",{name:/Avaa C01:n sanasto/});
 await expect(link).toHaveAttribute("target","_blank");
 await expect(link).toHaveAttribute("href","/los#/1/01/vocabulary");
 await expect(page.locator(".los-teacher-v2")).toBeVisible();
 await page.reload();
 await expect(page.getByRole("heading",{name:"Käytä myös oikeaa oppikirjaa"})).toBeVisible();
});

test("LOS Teacher 2.0 has usable 320px layout and avoids fake completion",async({page},testInfo)=>{
 await page.setViewportSize({width:320,height:780});
 await openTeacher(page);
 await expectNoHorizontalOverflow(page);
 await page.screenshot({path:testInfo.outputPath("los-teacher2-mobile320-intro.png"),animations:"disabled",fullPage:false});
 await page.locator(".los-teacher-menu summary").click();
 await page.getByRole("button",{name:/11 Mitä opit/}).click();
 await expect(page.getByRole("button",{name:"Päätä opetuskerta"})).toBeDisabled();
 await expect(page.locator(".los-teacher-end")).toContainText("0 tarkistettavaa harjoitusta");
 await expectNoHorizontalOverflow(page);
 await page.getByRole("button",{name:/Opetuspolkuun/}).click();
 await expect(page).toHaveURL(/\/los#\/1\/path$/);
 await expect(page.getByRole("button",{name:"Avaa L004:n Lesson Player"})).toBeVisible();
});
