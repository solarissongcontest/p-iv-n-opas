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
    for (let step = 0; step < 3; step += 1) {
      const next = page.getByRole("button", { name: /Jatka/i });
      if (await next.isVisible().catch(() => false)) await next.click();
    }
    const openToday = page.getByRole("button", { name: /Avaa Tänään/i });
    if (await openToday.isVisible().catch(() => false)) await openToday.click();
  }

  await expect(page.getByRole("button", { name: "Tänään", exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/today(?:\?|$)/);
}

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(overflow.width).toBeLessThanOrEqual(overflow.viewport + 1);
}

async function openMore(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: "Lisää", exact: true }).click();
  const sheet = page.getByRole("dialog", { name: "Lisää toimintoja" });
  await expect(sheet).toBeVisible();
  return sheet;
}

test("iPhone Study OS primary flow uses four calm navigation destinations", async ({ page }) => {
  await enterApp(page);

  for (const label of ["Tänään", "Opinnot", "Edistyminen", "Lisää"]) {
    await expect(page.getByRole("button", { name: label, exact: true })).toBeVisible();
  }

  const sheet = await openMore(page);
  for (const label of ["Suunnitelma", "Harjoittelu", "Kokeet", "Kirjaa opiskelu", "Haku", "Asetukset"]) {
    await expect(sheet.getByRole("button", { name: new RegExp(label) })).toBeVisible();
  }

  await sheet.getByRole("button", { name: /Suunnitelma/ }).click();
  await expect(page).toHaveURL(/\/plan/);
  await expect(page.getByRole("heading", { name: "Suunnitelma" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "Opinnot", exact: true }).click();
  await expect(page).toHaveURL(/\/studies/);
  await expect(page.getByRole("heading", { name: "Opinnot" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "Edistyminen", exact: true }).click();
  await expect(page).toHaveURL(/\/progress/);
  await expect(page.getByRole("heading", { name: "Edistyminen" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const practiceSheet = await openMore(page);
  await practiceSheet.getByRole("button", { name: /Harjoittelu/ }).click();
  await expect(page).toHaveURL(/\/practice/);
  await expect(page.getByRole("heading", { name: "Harjoittelu" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "Aloita harjoittelu" }).click();
  await expect(page.locator(".practice-session-active")).toBeVisible();
  await expect(page.locator(".app-tabbar")).toBeHidden();
  await expect(page.locator(".app-mobile-header")).toBeHidden();
  await expect(page.getByRole("button", { name: "Lopeta" })).toBeVisible();
  await page.getByRole("button", { name: "Lopeta" }).click();
  await expect(page.getByText("Harjoittelu valmis tältä erää")).toBeVisible();
  await page.getByRole("button", { name: "Valmis" }).click();

  await page.getByRole("button", { name: "Tänään", exact: true }).click();
  const actionSheet = await openMore(page);
  await actionSheet.getByRole("button", { name: /Kirjaa opiskelu/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sulje" })).toBeVisible();
  await page.getByRole("button", { name: "Sulje" }).click();

  await page.getByRole("button", { name: "Haku", exact: true }).click();
  const search = page.getByLabel("Hae");
  await expect(search).toBeVisible();
  await search.fill("KE04");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Escape");

  await expectNoHorizontalOverflow(page);
});

test("Today always exposes Practice without requiring the More menu", async ({ page }) => {
  await enterApp(page);
  const practiceShortcut = page.getByRole("button", { name: /Harjoittele/ }).first();
  await expect(practiceShortcut).toBeVisible();
  await practiceShortcut.click();
  await expect(page).toHaveURL(/\/practice/);
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
  await expect(page.getByText("Hiljaiset tunnit")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
