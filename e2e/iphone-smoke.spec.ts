import { expect, test } from "@playwright/test";

async function enterApp(page: import("@playwright/test").Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const username = page.getByLabel("Käyttäjänimi");
  if (await username.isVisible().catch(() => false)) {
    await username.fill("Arthur");
    await page.getByRole("button", { name: "Jatka" }).click();
  }

  const onboardingHeading = page.getByRole("heading", { name: /Tervetuloa, Arthur/i });
  if (await onboardingHeading.isVisible().catch(() => false)) {
    await page.getByRole("button", { name: /Jatka/i }).click();
    await page.getByRole("button", { name: /Jatka/i }).click();
    await page.getByRole("button", { name: /Jatka/i }).click();
    await page.getByRole("button", { name: /Avaa Tänään/i }).click();
  }

  await expect(page.getByRole("button", { name: "Tänään" })).toBeVisible();
}

test("iPhone Study OS smoke", async ({ page }) => {
  await enterApp(page);

  await expect(page.getByRole("button", { name: "Tänään" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Suunnitelma" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Kirjaa opiskelu" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Kurssit" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Lisää" })).toBeVisible();

  await page.getByRole("button", { name: "Suunnitelma" }).click();
  await expect(page.getByRole("heading", { name: "Suunnitelma" })).toBeVisible();

  await page.getByRole("button", { name: "Kirjaa opiskelu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sulje" })).toBeVisible();
  await page.getByRole("button", { name: "Sulje" }).click();

  await page.getByRole("button", { name: "Lisää" }).click();
  await expect(page.getByRole("dialog", { name: "Lisää toimintoja" })).toBeVisible();
  await expect(page.getByText("Kokeet", { exact: true })).toBeVisible();
  await expect(page.getByText("Kehitys", { exact: true })).toBeVisible();
  await expect(page.getByText("Haku", { exact: true })).toBeVisible();
  await expect(page.getByText("Asetukset", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: /Haku/ }).click();
  const search = page.getByLabel("Hae");
  await expect(search).toBeVisible();
  await search.fill("KE04");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Escape");

  const overflow = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(overflow.width).toBeLessThanOrEqual(overflow.viewport + 1);
});
