import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

async function enterLocalBook(page:import("@playwright/test").Page){
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000199");
  });
  await page.goto("/los#/1/overview",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-book-workspace")).toBeVisible({timeout:30_000});
}
test("Teacher 2.0 L056–L060 open with their own review/final drafts, not C10 duplicate",async({page})=>{
  await enterLocalBook(page);
  for(const [id,title] of [
    ["L056","Luvut, tavaaminen ja viikonpäivät"],
    ["L057","Kaikkien 10 kappaleen taitosekoitus"],
    ["L058","Täydellinen esittelyharjoitus ilman vihjeitä"],
    ["L059","Koko kirjan loppukoe"],
    ["L060","Mitä osaan nyt saksaksi?"],
  ] as const){
    await page.goto("/los-lessons/"+id,{waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-teacher-sidebar h1")).toHaveText(title);
    await expect(page.locator(".los-teacher-paper h2")).toBeVisible();
    await expect(page.locator(".los-teacher-outline nav button").first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});
test("L056 uses the actual five checked Review II tasks and sees answers after returning from the book",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L056",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav button");
  await outline.filter({hasText:"Tarkista viisi oikeaa kertaustehtävää"}).click();
  const panel=page.locator('section[aria-label="Kirjan todelliset kertaus- ja arviointimerkinnät"]');
  await expect(panel).toContainText("0/6 vaadittua suoritusta");
  await expect(page.getByRole("link",{name:/Avaa kirjassa/}).last()).toHaveAttribute("href",/lessonReturn=L056.*#\/1\/review-ii$/);
  await page.goto("/los?lessonReturn=L056#/1/review-ii",{waitUntil:"domcontentloaded"});
  const group=page.locator("#los-review-L056");
  await expect(group).toBeVisible();
  const questions=group.locator(".los-exam-question");
  await expect(questions).toHaveCount(5);
  for(let i=0;i<5;i++){
    await questions.nth(i).locator('input[type="radio"]').first().check();
    await questions.nth(i).getByRole("button",{name:"Tarkista vastaus"}).click();
  }
  await expect(group).toContainText("5/5 tarkistettu");
  await page.goto("/los-lessons/L056",{waitUntil:"domcontentloaded"});
  await outline.filter({hasText:"Tarkista viisi oikeaa kertaustehtävää"}).click();
  await expect(panel).toContainText("5/6 vaadittua suoritusta");
  await expect(panel).toContainText("EX-REV2-SELF-056");
  await expectNoHorizontalOverflow(page);
});
test("L059 never fabricates final exam points, media playback or a downloaded recording",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L059",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav button");
  await outline.filter({hasText:"Tee oikea EX-FINAL-koe"}).click();
  const panel=page.locator('section[aria-label="Kirjan todelliset kertaus- ja arviointimerkinnät"]');
  await expect(panel).toContainText("0/58 vaadittua suoritusta");
  await expect(panel).toContainText("EX-FINAL-Q01");
  await expect(page.getByRole("link",{name:/Avaa kirjassa/})).toHaveAttribute("href",/lessonReturn=L059.*#\/1\/final$/);
  await outline.filter({hasText:"Loppukokeen todellinen suoritustilanne"}).click();
  await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
  await expectNoHorizontalOverflow(page);
});
test("L060 needs ten real goals, reviewed cards and explicit own goal, not the final score",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L060",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav button");
  await outline.filter({hasText:"Vahvista kirjan oikea yhteenveto"}).click();
  const panel=page.locator('section[aria-label="Kirjan todelliset kertaus- ja arviointimerkinnät"]');
  await expect(panel).toContainText("0/14 vaadittua suoritusta");
  await expect(panel).toContainText("Kappaleen 1 osaamistavoitetta");
  await expect(page.getByRole("link",{name:/Avaa kirjassa/})).toHaveAttribute("href",/lessonReturn=L060.*#\/1\/summary$/);
  await expectNoHorizontalOverflow(page);
});
