import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

/**
 * C01 + L001-L006 browser acceptance coverage.
 * Runs under the existing desktop Chromium and iPhone WebKit projects.
 * Media playback on real devices remains a separate release gate.
 */
test("C01 authentic text, glossary and highlights survive a reload", async ({ page }) => {
  await enterApp(page);
  await page.goto("/los#/1/01/text", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".los-c01-turn")).toHaveCount(8);
  await expect(page.locator(".los-c01-attribution")).toContainText("Xzapro4 ja Erkan Yilmaz");

  await page.getByRole("button", { name: /hallo, selitys/i }).first().click();
  await expect(page.locator(".los-c01-gloss")).toContainText("hei");

  await page.getByRole("button", { name: "Korostustussi" }).click();
  await page.getByRole("button", { name: "Pinkki" }).click();
  await page.getByRole("button", { name: /hallo, korostuksen sana/i }).first().click();
  await page.getByRole("button", { name: /wie, korostuksen sana/i }).first().click();
  await expect(page.locator(".los-c01-turn").first().locator(".los-c01-mark-pink")).toHaveCount(2);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(".los-c01-turn").first().locator(".los-c01-mark-pink")).toHaveCount(2);
  await expectNoHorizontalOverflow(page);
});

test("L001 needs manual step confirmations and an exit check, then survives reload", async ({ page }) => {
  await enterApp(page);
  await page.goto("/los#/1/path", { waitUntil: "domcontentloaded" });
  const runner = page.locator("#los-lesson-runner");
  await expect(runner.getByRole("heading", { name: "Miten LOS! 1:llä opiskellaan?" })).toBeVisible();
  const finish = runner.getByRole("button", { name: "Merkitse oppitunti suoritetuksi" });
  await expect(finish).toBeDisabled();
  for (let i = 0; i < 3; i++) {
    await runner.getByRole("button", { name: "Tein tämän vaiheen" }).first().click();
  }
  await expect(finish).toBeDisabled();
  await runner.getByLabel("Napautan sanaa lukijassa.").check();
  await runner.getByRole("button", { name: "Palauta lopputarkistus" }).click();
  await expect(finish).toBeEnabled();
  await finish.click();
  await expect(runner.getByText("L001 suoritettu")).toBeVisible();
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("#los-lesson-runner").getByText("L001 suoritettu")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("L003 does not unlock until the real source questions are checked", async ({ page }) => {
  await enterApp(page);
  await page.goto("/los#/1/path", { waitUntil: "domcontentloaded" });
  const runner = page.locator("#los-lesson-runner");
  await runner.getByRole("group", { name: "Valitse oppitunti" }).getByRole("button", { name: /L003/ }).click();
  for (let i = 0; i < 3; i++) {
    await runner.getByRole("button", { name: "Tein tämän vaiheen" }).first().click();
  }
  await runner.getByLabel("Franz ja Jörg").check();
  await runner.getByRole("button", { name: "Palauta lopputarkistus" }).click();
  await expect(runner.getByRole("button", { name: "Merkitse oppitunti suoritetuksi" })).toBeDisabled();

  await page.goto("/los#/1/01/understand", { waitUntil: "domcontentloaded" });
  const questions = page.locator("fieldset.los-c01-question");
  await questions.nth(0).getByLabel("Franz ja Jörg").check();
  await questions.nth(0).getByRole("button", { name: "Tarkista vastaus" }).click();
  await questions.nth(1).getByLabel("Hallo").check();
  await questions.nth(1).getByRole("button", { name: "Tarkista vastaus" }).click();

  await page.goto("/los#/1/path", { waitUntil: "domcontentloaded" });
  await runner.getByRole("group", { name: "Valitse oppitunti" }).getByRole("button", { name: /L003/ }).click();
  await expect(runner.getByRole("button", { name: "Merkitse oppitunti suoritetuksi" })).toBeEnabled();
});


test("C02 unabridged dialogue, glossary, marks and source tasks survive navigation", async ({ page }) => {
  await enterApp(page);
  await page.goto("/los#/1/02/text", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".los-c01-turn")).toHaveCount(6);
  await expect(page.locator(".los-c01-attribution")).toContainText("CC BY-SA 4.0");
  await expect(page.locator(".los-c01-turn").last()).toContainText("Wiedersehen!");
  await page.getByRole("button", { name: /heiße, selitys/i }).first().click();
  await expect(page.locator(".los-c01-gloss")).toContainText("nimeltäni");
  await page.getByRole("button", { name: "Korostustussi" }).click();
  await page.getByRole("button", { name: "Vihreä" }).click();
  await page.getByRole("button", { name: /hallo, korostuksen sana/i }).first().click();
  await page.getByRole("button", { name: /ich, korostuksen sana/i }).first().click();
  await expect(page.locator(".los-c01-turn").first().locator(".los-c01-mark-green")).toHaveCount(2);
  await page.goto("/los#/1/02/understand", { waitUntil: "domcontentloaded" });
  const q = page.locator("fieldset.los-c01-question").first();
  await q.getByLabel("Ich heiße Greta.").check();
  await q.getByRole("button", { name: "Tarkista vastaus" }).click();
  await expect(q).toContainText("Oikein.");
  await page.goto("/los#/1/02/text", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".los-c01-turn").first().locator(".los-c01-mark-green")).toHaveCount(2);
  await expectNoHorizontalOverflow(page);
});


test("C04, C05, C07 and C09 original published dialogues are readable, annotatable and linked to source exercises", async ({ page }) => {
  await enterApp(page);
  for (const [chapter,turns,phrase] of [
    ["04",8,"Wie geht es Ihnen?"],
    ["05",4,"Wie geht es dir?"],
    ["07",5,"Bitte buchstabieren Sie."],
    ["09",7,"Wie spät ist es?"],
  ] as const) {
    await page.goto("/los#/1/"+chapter+"/text", { waitUntil:"domcontentloaded" });
    await expect(page.locator(".los-c01-turn")).toHaveCount(turns);
    await expect(page.locator(".los-c01-turns")).toContainText(phrase);
    await expect(page.locator(".los-c01-attribution")).toContainText("CC BY-SA 4.0");
    await expectNoHorizontalOverflow(page);
    await page.goto("/los#/1/"+chapter+"/understand", { waitUntil:"domcontentloaded" });
    await expect(page.locator("fieldset.los-c01-question")).toHaveCount(5);
    await expect(page.getByRole("button",{name:"Näytä koko tekstin suomennos"})).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});


test("C02 and C03 include the complete Ariser four-turn second dialogue and its original audio player", async ({ page }) => {
  await enterApp(page);
  for(const chapter of ["02","03"]) {
    await page.goto("/los#/1/"+chapter+"/text-b", {waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-c01-turn")).toHaveCount(4);
    await expect(page.locator(".los-c01-turns")).toContainText("Wir kommen aus Berlin.");
    await expect(page.locator(".los-c01-attribution")).toContainText("Ariser");
    await expect(page.locator(".los-c01-attribution")).toContainText("CC BY-SA 3.0");
    await expect(page.locator("audio")).toHaveCount(1);
    await expect(page.locator("fieldset.los-c01-question")).toHaveCount(4);
    await expectNoHorizontalOverflow(page);
  }
});


test("C03 Lisa Müller has its own complete licensed Text A without private phone-number exercises", async ({ page }) => {
  await enterApp(page);
  await page.goto("/los#/1/03/text", {waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-c01-turn")).toHaveCount(8);
  await expect(page.locator(".los-c01-turns")).toContainText("ich komme aus Deutschland");
  await expect(page.locator(".los-c01-turns")).toContainText("wohne hier in Bern");
  await expect(page.locator(".los-c01-attribution")).toContainText("CC BY-SA 4.0");
  await expect(page.locator(".los-c01-attribution")).toContainText("Wikibooks");
  await expect(page.locator(".los-c01-turns")).not.toContainText(/Telefonnummer|telephone number/i);
  await page.goto("/los#/1/03/understand", {waitUntil:"domcontentloaded"});
  await expect(page.locator("fieldset.los-c01-question")).toHaveCount(5);
  const first=page.locator("fieldset.los-c01-question").first();
  await first.getByLabel("Saksasta").check();
  await first.getByRole("button",{name:"Tarkista vastaus"}).click();
  await expect(first).toContainText("Oikein.");
  await expectNoHorizontalOverflow(page);
});
