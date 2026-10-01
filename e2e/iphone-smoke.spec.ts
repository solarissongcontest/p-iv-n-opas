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
  await expect(page).toHaveURL(/\/today(?:\?|$)/);
}

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(overflow.width).toBeLessThanOrEqual(overflow.viewport + 1);
}

test("iPhone Study OS Structure V4 smoke", async ({ page }) => {
  await enterApp(page);

  for (const label of ["Tänään", "Suunnitelma", "Opinnot", "Harjoittelu", "Edistyminen"]) {
    await expect(page.getByRole("button", { name: label })).toBeVisible();
  }

  await page.getByRole("button", { name: "Suunnitelma" }).click();
  await expect(page).toHaveURL(/\/plan/);
  await expect(page.getByRole("heading", { name: "Suunnitelma" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "Opinnot" }).click();
  await expect(page).toHaveURL(/\/studies/);
  await expect(page.getByRole("heading", { name: "Opinnot" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "Harjoittelu" }).click();
  await expect(page).toHaveURL(/\/practice/);
  await expect(page.getByRole("heading", { name: "Harjoittelu" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "Edistyminen" }).click();
  await expect(page).toHaveURL(/\/progress/);
  await expect(page.getByRole("heading", { name: "Edistyminen" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "Lisää toimintoja" }).click();
  const sheet = page.getByRole("dialog", { name: "Lisää toimintoja" });
  await expect(sheet).toBeVisible();
  await expect(sheet.getByRole("button", { name: /Kokeet/ })).toBeVisible();
  await expect(sheet.getByRole("button", { name: /Kirjaa opiskelu/ })).toBeVisible();
  await expect(sheet.getByRole("button", { name: /Haku/ })).toBeVisible();
  await expect(sheet.getByRole("button", { name: /Asetukset/ })).toBeVisible();

  await sheet.getByRole("button", { name: /Kirjaa opiskelu/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sulje" })).toBeVisible();
  await page.getByRole("button", { name: "Sulje" }).click();

  await page.getByRole("button", { name: "Haku" }).click();
  const search = page.getByLabel("Hae");
  await expect(search).toBeVisible();
  await search.fill("KE04");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Escape");

  await expectNoHorizontalOverflow(page);
});

test("deep links survive reload and keep the correct information layer", async ({ page }) => {
  await enterApp(page);

  await page.goto("/progress/analysis", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("tab", { name: "Analyysi" })).toHaveAttribute("aria-selected", "true");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/progress\/analysis/);
  await expect(page.getByRole("tab", { name: "Analyysi" })).toHaveAttribute("aria-selected", "true");

  await page.goto("/settings/notifications", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("tab", { name: "Muistutukset" })).toHaveAttribute("aria-selected", "true");
  await expectNoHorizontalOverflow(page);
});
