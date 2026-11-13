import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow } from "./helpers";

/** Local offline-owner fixture, not a production auth or device test. */
async function enterLocalBook(page:import("@playwright/test").Page) {
 await page.addInitScript(()=>{
  if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
  window.localStorage.setItem("opk.device-authorized","Arthur");
  window.localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
 });
 await page.goto("/los#/1/08/text",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-book-workspace")).toBeVisible({timeout:30_000});
}

test("L041–L045 each opens the actual Teacher 2.0 player, on Chromium and WebKit",async({page})=>{
 await enterLocalBook(page);
 for(const [id,heading] of [
  ["L041","Saksa jatkuu"],["L042","Luetaan oikea"],["L043","Et tarvitse"],
  ["L044","Mitä tehdä"],["L045","Osoita"],
 ] as const){
  await page.goto("/los-lessons/"+id,{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText(heading);
  await expect(page.locator(".los-teacher-outline")).toBeVisible();
  await expectNoHorizontalOverflow(page);
 }
});

test("L041 scripted dialogue branches, feedback, help and progress persist after reload",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L041",{waitUntil:"domcontentloaded"});
 const outline=page.locator(".los-teacher-outline nav");
 await outline.getByRole("button",{name:/Et ymmärrä ohjetta/}).click();
 const paper=page.locator(".los-teacher-paper");
 await paper.locator(".los-teacher-option").filter({hasText:"Sehr gut!"}).click();
 await expect(paper.locator(".los-teacher-feedback")).toContainText("Opettaja:");
 await paper.locator(".los-teacher-option").filter({hasText:"Ich verstehe nicht."}).click();
 await expect(paper.locator(".los-teacher-feedback")).toContainText("Kein Problem.");
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(paper.locator(".los-teacher-feedback")).toContainText("Kein Problem.");
 await paper.getByRole("button",{name:/En ymmärrä \/ haluan lisäselityksen/}).click();
 await expect(paper.locator(".los-teacher-help-entries")).toBeVisible();
 await expectNoHorizontalOverflow(page);
});

test("L042 books link to all 26 original Schule units and preserves three checked questions",async({page})=>{
 await enterLocalBook(page);
 await expect(page.locator(".los-c01-turn")).toHaveCount(26);
 await expect(page.locator(".los-c01-attribution")).toContainText("CC BY-SA 4.0");
 await page.goto("/los-lessons/L042",{waitUntil:"domcontentloaded"});
 await page.locator(".los-teacher-outline nav").getByRole("button",{name:/Tarkista kolme alkuperäistä ymmärtämistehtävää/}).click();
 await expect(page.getByRole("link",{name:/Avaa kirjassa/}).first()).toHaveAttribute("href",/lessonReturn=L042.*understand/);
 await page.goto("/los#/1/08/understand",{waitUntil:"domcontentloaded"});
 const fieldsets=page.locator("fieldset.los-c01-question");
 await expect(fieldsets).toHaveCount(5);
 for(const [index,correctLabel] of [[0,"Matematiikkaa"],[1,"Guten Morgen!"],[2,"Musiikkiin"]] as const){
  const field=fieldsets.nth(index);
  await field.getByLabel(correctLabel,{exact:true}).check();
  await field.getByRole("button",{name:"Tarkista vastaus"}).click();
  await expect(field).toContainText("Oikein.");
 }
 await page.goto("/los-lessons/L042",{waitUntil:"domcontentloaded"});
 await page.locator(".los-teacher-outline nav").getByRole("button",{name:/Tarkista kolme alkuperäistä ymmärtämistehtävää/}).click();
 await expect(page.getByText(/C08-SCHOOL-Q03: Vastaus tallennettu/)).toBeVisible();
 await expectNoHorizontalOverflow(page);
});

test("L044 uses complete text-only Eva Text B with four real questions; L045 remains gated by chapter-test submission",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/08/text-b",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-secondary-source .los-c01-turn")).toHaveCount(8);
 await expect(page.locator(".los-secondary-source fieldset.los-c01-question")).toHaveCount(4);
 await expect(page.getByText("Haastattelun ääni ei ole vielä käytettävissä.")).toBeVisible();
 await page.goto("/los-lessons/L044",{waitUntil:"domcontentloaded"});
 await page.locator(".los-teacher-outline nav").getByRole("button",{name:/Kirjoita kaksi mahdollista keskustelupolkua/}).click();
 const own=page.locator(".los-teacher-reflection textarea");
 await own.fill("A: Ich verstehe nicht. B: Noch einmal, bitte. A: Danke! B: Was bedeutet Aufgabe? A: Das bedeutet tehtävä.");
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(own).toHaveValue(/Ich verstehe nicht/);
 await page.goto("/los-lessons/L045",{waitUntil:"domcontentloaded"});
 await page.locator(".los-teacher-outline nav").getByRole("button",{name:/C08:n oikea kappaletesti/}).click();
 await expect(page.locator(".los-teacher-assessment-status")).toContainText("Ei vielä palautettu");
 await page.locator(".los-teacher-outline nav").getByRole("button",{name:/Mitä osaat ja mitä vielä harjoittelet/}).click();
 await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
 await expectNoHorizontalOverflow(page);
});
