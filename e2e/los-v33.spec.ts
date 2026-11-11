import { expect, test, type Page } from "@playwright/test";

/** Local-only test identity. This does not create a session on the server. */
async function enterLos(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("opk.device-authorized", "Arthur");
    localStorage.setItem("opk.owner-id", "00000000-0000-4000-8000-000000000001");
  });
  await page.goto("/los", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".los-library-shelf")).toBeVisible();
}

async function openFirstBook(page: Page) {
  await enterLos(page);
  await page.locator(".los-shelf-book").first().click();
  await expect(page.locator(".los-book-workspace")).toBeVisible();
}

test("all eight LOS! books remain available; book 1 has an uncropped approved-banner slot", async ({ page }) => {
  await enterLos(page);
  await expect(page.locator(".los-shelf-book")).toHaveCount(8);
  await page.locator(".los-shelf-book").first().click();
  await expect(page).toHaveURL(/#\/1\/overview$/);
  await expect(page.locator(".los-v33-banner")).toBeVisible();
  await expect.poll(() => page.locator(".los-v33-banner img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".los-front-v33 .los-primary")).toContainText("Aloita kappaleesta 1");
  await page.getByRole("button", { name: "Takaisin kirjasarjaan" }).click();
  await page.locator(".los-shelf-book").nth(1).click();
  await expect(page).toHaveURL(/#\/2\/overview$/);
  await expect(page.locator(".los-v33-banner")).toHaveCount(0);
});

test("TOC opens sections, filters chapters and deep-links to a real task", async ({ page }) => {
  await openFirstBook(page);
  const tree = page.locator(".los-v33-sidebar");
  const search = tree.getByRole("searchbox", { name: "Suodata kappaleita" });
  await search.fill("ich heiße");
  await expect(tree.locator(".los-v33-toc-chapter")).toHaveCount(1);
  await search.fill("");
  await expect(tree.locator(".los-v33-toc-chapter")).toHaveCount(10);
  await tree.locator(".los-v33-chapter-link", { hasText: "Ich heiße" }).click();
  await expect(page).toHaveURL(/#\/1\/02\/chapter$/);
  const chapter = tree.locator(".los-v33-toc-chapter").filter({ hasText: "Ich heiße" });
  await expect(chapter.locator(".los-v33-task-link")).toHaveCount(15);
  await chapter.locator(".los-v33-task-link").first().click();
  await expect(page).toHaveURL(/#\/1\/02\/practice$/);
  await expect(page.locator("#C02-EX-01")).toBeVisible();
});

test("practice answers survive split view, section navigation and return", async ({ page }) => {
  await openFirstBook(page);
  const tree = page.locator(".los-v33-sidebar");
  await tree.locator(".los-v33-chapter-link", { hasText: "Ich heiße" }).click();
  await tree.locator(".los-v33-toc-chapter").filter({ hasText: "Ich heiße" })
    .locator(".los-v33-task-link").first().click();
  const firstChoice = page.locator("#C02-EX-01 input[type=radio]").first();
  await firstChoice.check();
  await expect(firstChoice).toBeChecked();
  await page.locator(".los-v33-view-toggle button").click();
  await expect(page.locator(".los-v33-split")).toBeVisible();
  await expect(page.locator(".los-v33-exercise-column #C02-EX-01 input[type=radio]").first()).toBeChecked();
  await page.locator(".los-v33-view-toggle button").click();
  await expect(page.locator("#C02-EX-01 input[type=radio]").first()).toBeChecked();
  await page.locator(".los-v33-section-pager button").last().click();
  await expect(page).toHaveURL(/#\/1\/02\/apply$/);
  await page.locator(".los-section-nav").getByRole("button", { name: "Harjoittele" }).click();
  await expect(page.locator("#C02-EX-01 input[type=radio]").first()).toBeChecked();
});

test("grammar and exercise panes use the existing book pages, not duplicate answers", async ({ page }) => {
  await openFirstBook(page);
  await page.locator(".los-v33-sidebar .los-v33-chapter-link", { hasText: "Ich heiße" }).click();
  await page.locator(".los-section-nav").getByRole("button", { name: "Kielioppi" }).click();
  await expect(page).toHaveURL(/#\/1\/02\/grammar$/);
  await page.locator(".los-v33-view-toggle button").click();
  await expect(page.locator(".los-v33-text-column")).toContainText("heißen");
  await expect(page.locator(".los-v33-exercise-column #C02-EX-01")).toBeVisible();
  await expect(page.locator(".los-v33-split > div")).toHaveCount(2);
});

test("mobile drawer traps focus, closes on Escape and does not overflow horizontally", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openFirstBook(page);
  await expect(page.locator(".los-v33-sidebar")).toBeHidden();
  await page.locator(".los-top-toc").click();
  const drawer = page.getByRole("dialog", { name: "Kirjan sisällysluettelo" });
  await expect(drawer).toBeVisible();
  await expect(drawer.locator(".los-v33-close")).toBeFocused();
  await expect(page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(page.locator(".los-v33-sidebar")).toBeHidden();
  await expect(page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  await page.locator(".los-top-toc").click();
  await page.locator(".los-toc-backdrop").click({ position: { x: 10, y: 100 } });
  await expect(page.locator(".los-v33-sidebar")).toBeHidden();
  const overflow = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }));
  expect(overflow.scroll).toBeLessThanOrEqual(overflow.viewport + 1);
});
