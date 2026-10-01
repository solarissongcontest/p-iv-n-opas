import { expect, type Page } from "@playwright/test";

export async function enterApp(page: Page) {
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

  await expect(page.getByRole("button", { name: "Tänään" })).toBeVisible({ timeout: 30_000 });
}

export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(overflow.width).toBeLessThanOrEqual(overflow.viewport + 1);
}
