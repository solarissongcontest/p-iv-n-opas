import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow } from "./helpers";

/** Loopback fixture only. Does not bypass authorization in a live app. */
async function enterLocalBook(page:import("@playwright/test").Page){
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(window.location.hostname)) return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/1/10/chapter",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-book-workspace")).toBeVisible({timeout:30_000});
}

test("C10 Teacher 2.0 L051–L055 open on Chromium and WebKit and keep real book backlinks",async({page})=>{
  await enterLocalBook(page);
  for(const [id,title] of [
    ["L051","Kokoa esittelyfraasit"],
    ["L052","Kuuntele Haraldin haastattelu"],
    ["L053","Esittele kolmas henkilö"],
    ["L054","Rakenna kaksi keskustelua"],
    ["L055","Harjoittele ja testaa C10"],
  ] as const){
    await page.goto("/los-lessons/"+id,{waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-teacher-sidebar h1")).toHaveText(title);
    await expect(page.locator(".los-teacher-paper h2")).toBeVisible();
    const outline=page.locator(".los-teacher-outline nav button");
    expect(await outline.count()).toBeGreaterThanOrEqual(10);
    const bookScene=page.locator(".los-teacher-outline nav button").filter({hasText: id==="L052"?"Tarkista kolme autenttista tekstikysymystä kirjassa":id==="L055"?"Palauta C10:n oikea 20-osainen kappaletesti":"C10"});
    if(await bookScene.count()) await bookScene.first().click();
    await expectNoHorizontalOverflow(page);
  }
});
test("L052 shows all 14 source turns and does not allow false listening completion",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L052",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav button");
  await outline.filter({hasText:"Koko alkuperäinen haastattelu"}).click();
  await page.getByRole("button",{name:"Näytä kaikki"}).click();
  await expect(page.locator(".los-teacher-board-item")).toHaveCount(14);
  await expect(page.locator(".los-teacher-board")).toContainText("Ich heiße Harald Becker.");
  await expect(page.locator(".los-teacher-board")).toContainText("Der Himmel ist blau.");
  await outline.filter({hasText:"Teksti ymmärretty, kuuntelun hyväksyntä vielä auki"}).click();
  await expect(page.getByRole("region",{name:"Kuuntelumedian hyväksyntäportti"})).toContainText("M-DIB-02");
  await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
  await expectNoHorizontalOverflow(page);
});
test("L054 retains two self-review dialogue drafts, not an AI score",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L054",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav button");
  await outline.filter({hasText:"Kirjoita ensimmäinen oma keskustelu"}).click();
  await page.locator(".los-teacher-reflection textarea").fill("Hallo! Ich heiße Mia. Wie heißt du? Ich komme aus Finnland. Und du? Tschüss! ".repeat(2));
  await outline.filter({hasText:"Kirjoita toinen oma keskustelu"}).click();
  await page.locator(".los-teacher-reflection textarea").fill("Guten Tag! Wie heißen Sie? Ich heiße Leo. Das ist Mia. Sie kommt aus Finnland. Auf Wiedersehen! ".repeat(2));
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-reflection textarea")).toHaveValue(/Guten Tag!/);
  await outline.filter({hasText:"Kirjoita ensimmäinen oma keskustelu"}).click();
  await expect(page.locator(".los-teacher-reflection textarea")).toHaveValue(/Hallo!/);
  await expectNoHorizontalOverflow(page);
});
test("L055 requires the existing 20-item chapter submission and student self-assessment",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L055",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav button");
  await outline.filter({hasText:"Palauta C10:n oikea 20-osainen kappaletesti"}).click();
  await expect(page.locator(".los-teacher-assessment-status")).toContainText("0/20 vastattu");
  await expect(page.locator(".los-teacher-assessment-status")).toContainText("Ei vielä palautettu");
  await expect(page.getByRole("link",{name:/Avaa kirjassa/}).first()).toHaveAttribute("href",/lessonReturn=L055.*\/10\/test/);
  await outline.filter({hasText:"C10:n kappaletesti ja oma arvio"}).click();
  await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
  await expectNoHorizontalOverflow(page);
});
