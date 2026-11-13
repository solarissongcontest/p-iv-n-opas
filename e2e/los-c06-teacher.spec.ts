import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

/**
 * Teacher C06 browser acceptance. Runs under existing desktop Chromium and
 * iPhone WebKit configurations; does not pretend to test physical device audio.
 */
test("L033 builds numbers interactively, persists selection on reload and fits mobile",async ({page})=>{
  await enterApp(page);
  await page.goto("/los-lessons/L033",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Numerot 21–100: rakenne"})).toBeVisible();
  await page.locator(".los-teacher-outline").getByRole("button",{name:/Rakenna itse numeroita/}).click();
  const board=page.getByRole("region",{name:"Interaktiivinen saksan numeroiden rakennustaulu"});
  await expect(board).toBeVisible();
  await expect(board).toContainText("einundzwanzig");
  const tens=board.getByLabel("Valitse kymmenet");
  const units=board.getByLabel("Valitse yksiköt");
  await tens.selectOption("30");
  await units.selectOption("2");
  await expect(board).toContainText("zweiunddreißig");
  await units.selectOption("7");
  await expect(board).toContainText("siebenunddreißig");
  await tens.selectOption("70");
  await units.selectOption("1");
  await expect(board).toContainText("einundsiebzig");
  await expect(board).toContainText(/[4-9]\/4/);
  const confirm=page.getByRole("button",{name:"Rakensin taululla vähintään neljä eri lukua"});
  await expect(confirm).toBeEnabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline").getByRole("button",{name:/Rakenna itse numeroita/}).click();
  await expect(board).toContainText("einundsiebzig");
  await expect(board).toContainText(/[4-9]\/4/);
  await expectNoHorizontalOverflow(page);
});

test("L032 uses actual four Text A source dialogues and requires checked evidence",async ({page})=>{
  await enterApp(page);
  await page.goto("/los-lessons/L032",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Numerot 13–20 ja ikä"})).toBeVisible();
  await page.locator(".los-teacher-outline").getByRole("button",{name:/Lue koko Text A/}).click();
  await expect(page.getByRole("link",{name:/Avaa kirjassa/}).first()).toBeVisible();
  await expect(page.locator(".los-teacher-evidence")).toHaveCount(7);
  await expect(page.locator(".los-teacher-evidence")).toContainText(["C06-EX-09","C06-EX-10","C06-EX-11","C06-EX-12","C06-ZPE-Q01","C06-ZPE-Q02","C06-ZPE-Q03"]);
  await page.goto("/los#/1/06/text",{waitUntil:"domcontentloaded"});
  // C06 Text A also contains the collapsed C01 review (8 hidden turns).
  await expect(page.locator(".los-c01-turn:visible")).toHaveCount(12);
  await expect(page.locator(".los-c01-turns:visible")).toContainText("Ich bin schon zwölf Jahre alt.");
  await expectNoHorizontalOverflow(page);
});

test("L034 uses original C06 Text B and L035 links to actual submitted chapter test",async ({page})=>{
  await enterApp(page);
  await page.goto("/los-lessons/L034",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Kuuntele ikähaastattelu"})).toBeVisible();
  await page.locator(".los-teacher-outline").getByRole("button",{name:/Koko kahdeksan repliikin Text B/}).click();
  await expect(page.locator(".los-teacher-paper")).toContainText("M-COM-01");
  await expect(page.locator(".los-teacher-paper")).toContainText("ei ole vielä hyväksytty");
  await page.goto("/los#/1/06/text-b",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-c01-turn")).toHaveCount(8);
  await expect(page.locator("fieldset.los-c01-question")).toHaveCount(4);
  await page.goto("/los-lessons/L035",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline").getByRole("button",{name:/Palauta oikea C06:n 20 tehtävän kappaletesti/}).click();
  await expect(page.locator(".los-teacher-assessment-status")).toContainText("0/20 vastattu");
  await expect(page.locator(".los-teacher-assessment-status")).toContainText("Ei vielä palautettu");
  await page.goto("/los#/1/06/test",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-workbook-question")).toHaveCount(20);
  await expect(page.getByRole("button",{name:/Palauta testi/})).toBeDisabled();
  await expectNoHorizontalOverflow(page);
});
