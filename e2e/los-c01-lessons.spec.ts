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
