import { expect, type Page } from "@playwright/test";

type AppEntryState = "app" | "login" | "onboarding";

export async function waitForAppShell(page: Page, timeout = 30_000) {
  await expect(page.getByRole("button", { name: "Tänään", exact: true })).toBeVisible({ timeout });
}

async function waitForEntryState(page: Page): Promise<AppEntryState> {
  const today = page.getByRole("button", { name: "Tänään", exact: true });
  const username = page.getByLabel("Käyttäjänimi");
  const onboarding = page.getByRole("heading", { name: /Tervetuloa, Arthur/i });

  return Promise.any([
    today.waitFor({ state: "visible", timeout: 30_000 }).then(() => "app" as const),
    username.waitFor({ state: "visible", timeout: 30_000 }).then(() => "login" as const),
    onboarding.waitFor({ state: "visible", timeout: 30_000 }).then(() => "onboarding" as const),
  ]);
}

async function finishOnboarding(page: Page) {
  const onboardingHeading = page.getByRole("heading", { name: /Tervetuloa, Arthur/i });
  if (!(await onboardingHeading.isVisible().catch(() => false))) return;

  for (let step = 0; step < 3; step += 1) {
    const next = page.getByRole("button", { name: /Jatka/i });
    await expect(next).toBeVisible({ timeout: 15_000 });
    await next.click();
  }

  const openToday = page.getByRole("button", { name: /Avaa Tänään/i });
  await expect(openToday).toBeVisible({ timeout: 15_000 });
  await openToday.click();
}

export async function enterApp(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  let state = await waitForEntryState(page);
  if (state === "login") {
    const username = page.getByLabel("Käyttäjänimi");
    await username.fill("Arthur");
    await page.getByRole("button", { name: "Jatka" }).click();

    state = await Promise.any([
      page.getByRole("button", { name: "Tänään", exact: true })
        .waitFor({ state: "visible", timeout: 30_000 })
        .then(() => "app" as const),
      page.getByRole("heading", { name: /Tervetuloa, Arthur/i })
        .waitFor({ state: "visible", timeout: 30_000 })
        .then(() => "onboarding" as const),
    ]);
  }

  if (state === "onboarding") {
    await finishOnboarding(page);
  }

  await waitForAppShell(page);
  await expect(page).toHaveURL(/\/today(?:\?|$)/);
}

export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const width = document.documentElement.scrollWidth;
    const viewport = window.innerWidth;
    if (width <= viewport + 1) return {width, viewport, offenders: [] as string[]};
    const offenders = [...document.querySelectorAll<HTMLElement>("*")]
      .map(el => {
        const rect = el.getBoundingClientRect();
        const name = el.tagName.toLowerCase() + (typeof el.className === "string" && el.className
          ? "." + el.className.trim().replace(/\s+/g, ".").slice(0,110) : "");
        return {name, right: Math.round(rect.right), left: Math.round(rect.left), width: Math.round(rect.width)};
      })
      .filter(item => item.width > 0 && item.right > viewport + 1)
      .sort((a,b) => b.right-a.right)
      .slice(0,14)
      .map(item => `${item.name}: left=${item.left}, right=${item.right}, width=${item.width}`);
    return {width, viewport, offenders};
  });
  expect(overflow.width, "Horizontal overflow details: " + JSON.stringify(overflow))
    .toBeLessThanOrEqual(overflow.viewport + 1);
}
