import { expect, test, type Page } from "@playwright/test";
import { expectNoHorizontalOverflow } from "./helpers";

/**
 * This file exists only on the independent integration-QA branch.
 * CI merges every lesson PR into a disposable runner before launching browsers.
 * The local storage fixture never supplies a server access token and must not
 * be described as evidence of production login or real-device testing.
 */
async function enterLocalTeacherFixture(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("opk.device-authorized", "LOS Stack QA");
    localStorage.setItem("opk.owner-id", "los-integrated-stack-e2e");
  });
}

test("all sixty merged Teacher 2.0 lessons open a real scene", async ({ page }) => {
  test.setTimeout(360_000);
  await enterLocalTeacherFixture(page);
  for (let number = 1; number <= 60; number += 1) {
    const id = "L" + String(number).padStart(3, "0");
    await page.goto("/los-lessons/" + id, { waitUntil: "domcontentloaded" });
    const sidebar = page.locator(".los-teacher-sidebar");
    await expect(sidebar, id + " must be registered, valid, and visible").toBeVisible();
    await expect(sidebar.locator("h1"), id + " must have an actual title").not.toBeEmpty();
    await expect(page.locator(".los-teacher-paper h2"), id + " must render a teaching scene").toBeVisible();
    await expect(page.locator(".los-teacher-status"), id + " must not display a fallback/error").toHaveCount(0);
    if (number === 1 || number % 5 === 0) await expectNoHorizontalOverflow(page);
  }
});

test("C06 number activity persists while switching to final review and back", async ({ page }) => {
  await enterLocalTeacherFixture(page);
  await page.goto("/los-lessons/L033", { waitUntil: "domcontentloaded" });
  await page.locator(".los-teacher-outline").getByRole("button", { name: /Rakenna itse numeroita/ }).click();
  const builder = page.getByRole("region", { name: "Interaktiivinen saksan numeroiden rakennustaulu" });
  await builder.getByLabel("Valitse kymmenet").selectOption("30");
  await builder.getByLabel("Valitse yksiköt").selectOption("2");
  await expect(builder).toContainText("zweiunddreißig");

  await page.goto("/los-lessons/L056", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".los-teacher-sidebar h1")).toBeVisible();
  await expect(page.locator(".los-teacher-paper h2")).toBeVisible();

  await page.goto("/los-lessons/L033", { waitUntil: "domcontentloaded" });
  await page.locator(".los-teacher-outline").getByRole("button", { name: /Rakenna itse numeroita/ }).click();
  await expect(builder.getByLabel("Valitse kymmenet")).toHaveValue("30");
  await expect(builder.getByLabel("Valitse yksiköt")).toHaveValue("2");
  await expect(builder).toContainText("zweiunddreißig");
  await expectNoHorizontalOverflow(page);
});
