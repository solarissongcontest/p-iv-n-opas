import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

/** C05 integration tests reused verbatim from PR #224, with the same local-only browser fixture. */
async function enterLocalBook(page:import("@playwright/test").Page){
 await page.addInitScript(()=>{
  if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
  window.localStorage.setItem("opk.device-authorized","Arthur");
  window.localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
 });
 await page.goto("/los#/1/01/chapter",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-book-workspace")).toBeVisible({timeout:30_000});
}
const openChapter=async(page:import("@playwright/test").Page,ch:string,section:string)=>{
 await page.goto("/los#/1/"+ch+"/"+section,{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-book-paper")).toBeVisible();
};

test("C05 Teacher 2.0 five lessons open, provide contextual help and stay readable on phone and desktop",async({page})=>{
 await enterLocalBook(page);
 for(const id of ["L022","L023","L024","L025","L026"]){
  await page.goto("/los-lessons/"+id,{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-sidebar h1")).toBeVisible();
  await expect(page.locator(".los-teacher-paper h2")).toBeVisible();
  await page.getByRole("button",{name:"En ymmärrä / haluan lisäselityksen"}).click();
  await expect(page.locator(".los-teacher-help-entries")).toBeVisible();
  await expectNoHorizontalOverflow(page);
 }
});

test("C05 Teacher scene and attempts survive pause, refresh, and resume",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L024",{waitUntil:"domcontentloaded"});
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Mihin nicht kuuluu?"}).click();
 await expect(page.locator(".los-teacher-paper h2")).toContainText("Mihin nicht kuuluu?");
 await page.locator(".los-teacher-option").first().click();
 await expect(page.locator(".los-teacher-feedback.is-wrong")).toContainText("nicht");
 await page.getByRole("button",{name:"Keskeytä oppitunti"}).click();
 await expect(page.locator(".los-teacher-paused")).toBeVisible();
 await expect(outline.first()).toBeDisabled();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-paused")).toBeVisible();
 await page.getByRole("button",{name:"Jatka opetusta"}).last().click();
 await expect(page.locator(".los-teacher-paper h2")).toContainText("Mihin nicht kuuluu?");
 await expect(page.locator(".los-teacher-feedback.is-wrong")).toBeVisible();
 await expectNoHorizontalOverflow(page);
});

test("C05 Text B presents its own real candidate audio and written fallback with no listening-score claim",async({page})=>{
 await enterLocalBook(page);
 await openChapter(page,"05","text-b");
 await expect(page.locator(".los-secondary-source .los-c01-turn")).toHaveCount(6);
 await expect(page.locator('.los-secondary-source audio[src*="Dialogue_franz_greta_1.ogg"]')).toBeVisible();
 await expect(page.locator(".los-secondary-source fieldset.los-c01-question")).toHaveCount(4);
 await expect(page.locator(".los-secondary-source")).toContainText("eivät automaattiseen kuuntelupisteytykseen");
 await expectNoHorizontalOverflow(page);
});

test("C05 L023 and L026 link original source and the single existing chapter test",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L023",{waitUntil:"domcontentloaded"});
 let outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Kolme tarkistettavaa Text A -kysymystä"}).click();
 for(const id of ["C05-SOURCE-Q01","C05-SOURCE-Q02","C05-SOURCE-Q03"]){
  await expect(page.locator(".los-teacher-paper")).toContainText(id+": Vastaus vielä puuttuu");
 }
 await expect(page.locator(".los-teacher-paper a[href*='/05/understand']")).toHaveCount(1);
 await page.goto("/los-lessons/L026",{waitUntil:"domcontentloaded"});
 outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Palauta C05:n varsinainen 12 tehtävän testi"}).click();
 await expect(page.locator(".los-teacher-assessment-status")).toContainText("Kappaletesti: 0/12 vastattu");
 await expect(page.locator(".los-teacher-paper a[href*='/05/test']")).toHaveCount(1);
 await expectNoHorizontalOverflow(page);
});


test("C05 full chapter retake preserves original 12/12 result, self-assessment and written answers",async({page})=>{
 test.setTimeout(120_000);
 await enterLocalBook(page);
 await openChapter(page,"05","test");
 const answers=[
  {id:"C05-EX-01",option:0},{id:"C05-EX-02",option:0},{id:"C05-EX-03",option:0},
  {id:"C05-EX-04",option:1},{id:"C05-EX-05",option:1},{id:"C05-EX-06",option:0},
  {id:"C05-EX-07",option:1},{id:"C05-EX-08",option:0},{id:"C05-EX-09",option:1},
  {id:"C05-EX-10",text:"gut"},{id:"C05-EX-11",text:"Nicht"},{id:"C05-EX-12",option:0},
 ] as const;
 await expect(page.locator(".los-workbook-question")).toHaveCount(12);
 for(const item of answers){
  const field=page.locator("#"+item.id);
  if("option" in item) await field.locator('input[type="radio"]').nth(item.option).check();
  else await field.locator('input[type="text"]').fill(item.text);
 }
 await page.getByRole("button",{name:"Palauta testi · 12/12"}).click();
 await expect(page.locator(".los-test-result h2").first()).toHaveText("12 / 12 oikein");
 await page.locator("#los-self-05").fill("Osaan kysyä kuulumisia. Kertaan vielä nicht-sanan paikan.");
 await page.getByRole("button",{name:"Arkistoi tulos ja aloita uusinta"}).click();
 const archived=page.locator('[aria-label="Kappaletestin aiemmat yritykset"]');
 await expect(archived).toContainText("Yritys 1:");
 await expect(archived).toContainText("12/12 pistettä");
 await expect(page.getByRole("button",{name:"Palauta testi · 0/12"})).toBeDisabled();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(archived).toContainText("12/12 pistettä");
 await page.goto("/los-lessons/L026",{waitUntil:"domcontentloaded"});
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Palauta C05:n varsinainen 12 tehtävän testi"}).click();
 await expect(page.locator(".los-teacher-assessment-status")).toContainText("Kappaletesti: 0/12 vastattu");
 await page.goto("/los#/1/05/test",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("button",{name:"Palauta testi · 0/12"})).toBeDisabled();
 for(const item of answers){
  const field=page.locator("#"+item.id);
  if("option" in item) await field.locator('input[type="radio"]').first().check();
  else await field.locator('input[type="text"]').fill("test");
 }
 await page.getByRole("button",{name:"Palauta testi · 12/12"}).click();
 await expect(archived).toContainText("12/12 pistettä");
 await expect(page.locator("#los-self-05")).toHaveValue("Osaan kysyä kuulumisia. Kertaan vielä nicht-sanan paikan.");
 await expectNoHorizontalOverflow(page);
});

test("C05 L023 real Text A comprehension links, checks, and returns to Teacher with saved evidence",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L023",{waitUntil:"domcontentloaded"});
 await page.locator(".los-teacher-outline nav button").filter({hasText:"Kolme tarkistettavaa Text A -kysymystä"}).click();
 await expect(page.locator(".los-teacher-paper a[href*='/05/understand']")).toBeVisible();
 await page.goto("/los?lessonReturn=L023#/1/05/understand",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("heading",{name:"Ymmärrä alkuperäisteksti"})).toBeVisible();
 for(const [id,correct] of [["C05-SOURCE-Q01","a"],["C05-SOURCE-Q02","b"],["C05-SOURCE-Q03","a"]] as const){
  const field=page.locator('fieldset.los-c01-question').filter({has:page.locator('input[name="'+id+'"]')});
  await field.locator('input[value="'+correct+'"]').check();
  await field.getByRole("button",{name:"Tarkista vastaus"}).click();
  await expect(field.getByRole("status")).toContainText("Oikein.");
 }
 await page.getByRole("link",{name:"Palaa oppitunnille L023"}).click();
 await expect(page).toHaveURL(/\/los-lessons\/L023$/);
 await page.locator(".los-teacher-outline nav button").filter({hasText:"Kolme tarkistettavaa Text A -kysymystä"}).click();
 for(const id of ["C05-SOURCE-Q01","C05-SOURCE-Q02","C05-SOURCE-Q03"]){
  await expect(page.locator(".los-teacher-paper")).toContainText(id+": Vastaus tallennettu ja tarvittaessa tarkistettu");
 }
 await expectNoHorizontalOverflow(page);
});

test("C05 L025 real Text B checks persist without any listening-completion evidence",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los?lessonReturn=L025#/1/05/text-b",{waitUntil:"domcontentloaded"});
 for(const [id,correct] of [["C05-TEXTB-Q01","a"],["C05-TEXTB-Q02","b"]] as const){
  const field=page.locator('fieldset.los-c01-question').filter({has:page.locator('input[name="'+id+'"]')});
  await field.locator('input[value="'+correct+'"]').check();
  await field.getByRole("button",{name:"Tarkista vastaus"}).click();
  await expect(field.getByRole("status")).toContainText("Oikein.");
 }
 await page.getByRole("link",{name:"Palaa oppitunnille L025"}).click();
 await page.locator(".los-teacher-outline nav button").filter({hasText:"Tee ja tarkista Text B:n kysymykset 1 ja 2"}).click();
 for(const id of ["C05-TEXTB-Q01","C05-TEXTB-Q02"]){
  await expect(page.locator(".los-teacher-paper")).toContainText(id+": Vastaus tallennettu ja tarvittaessa tarkistettu");
 }
 await expect(page.locator(".los-teacher-paper")).not.toContainText("Kuuntelukoe suoritettu");
 await expectNoHorizontalOverflow(page);
});
