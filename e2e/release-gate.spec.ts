import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

const ROUTES = [
  "/today",
  "/plan",
  "/plan/month/2026-10",
  "/studies",
  "/practice",
  "/progress",
  "/exams",
  "/settings/study",
  "/settings/notifications",
  "/settings/app",
];

async function expectNoBlockingAxe(page: import("@playwright/test").Page, label: string) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const blocking = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(
    blocking,
    label + " sisältää vakavia saavutettavuusvirheitä: " +
      blocking.map((violation) => violation.id + ": " + violation.help).join("; "),
  ).toEqual([]);
}

test.describe("Final release gate", () => {
  test("primary routes load, stay keyboard reachable and have no serious WCAG violations", async ({ page }) => {
    await enterApp(page);

    for (const route of ROUTES) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("#main-content")).toBeVisible();
      await expectNoHorizontalOverflow(page);

      await expectNoBlockingAxe(page, route);

      await page.keyboard.press("Tab");
      const focusVisible = await page.evaluate(() => {
        const active = document.activeElement;
        return active instanceof HTMLElement && active !== document.body;
      });
      expect(focusVisible).toBe(true);
    }
  });

  test("active Practice and modal workspaces stay accessible and distraction free", async ({ page }) => {
    await enterApp(page);

    await page.goto("/practice", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Aloita harjoittelu" }).click();
    await expect(page.locator(".practice-session-active")).toBeVisible();
    await expect(page.locator(".desktop-sidebar")).toBeHidden();
    await expectNoBlockingAxe(page, "aktiivinen harjoittelu");

    await page.goto("/today", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Kirjaa opiskelu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expectNoBlockingAxe(page, "opiskelukerran dialogi");
    await page.getByRole("button", { name: "Sulje" }).click();
  });

  test("Today becomes usable within a bounded production navigation budget", async ({ page }) => {
    const started = Date.now();
    await enterApp(page);
    await page.goto("/today", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#main-content")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Seuraavaksi")).toBeVisible({ timeout: 10_000 });
    expect(Date.now() - started).toBeLessThan(15_000);

    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      return nav ? nav.domContentLoadedEventEnd - nav.startTime : null;
    });
    if (timing !== null) expect(timing).toBeLessThan(10_000);
  });

  test("device session renews before expiry without a reload or focus event", async ({ page }) => {
    let authCalls = 0;
    let forcedExpiry = 0;

    await page.route("**/api/device-auth", async (route) => {
      authCalls += 1;
      const response = await route.fetch();
      if (authCalls !== 1) {
        await route.fulfill({ response });
        return;
      }

      const payload = await response.json() as {
        access_token?: string;
        user_id?: string;
        expires_at?: number;
        error?: string;
      };
      forcedExpiry = Date.now() + 65_000;
      await route.fulfill({
        response,
        json: { ...payload, expires_at: forcedExpiry },
      });
    });

    await enterApp(page);
    expect(forcedExpiry).toBeGreaterThan(0);

    await expect.poll(() => authCalls, { timeout: 20_000 }).toBeGreaterThanOrEqual(2);
    await expect.poll(
      () => page.evaluate(() => Number(localStorage.getItem("opk.device-token-expires") ?? "0")),
      { timeout: 20_000, intervals: [250, 500, 1000] },
    ).toBeGreaterThan(forcedExpiry);
    await page.unrouteAll({ behavior: "ignoreErrors" });
  });

  test("production release identity is available and uncached", async ({ request, baseURL }) => {
    expect(baseURL).toBeTruthy();
    const response = await request.get(new URL("/api/release-info", baseURL).toString());
    expect(response.ok()).toBe(true);
    expect(response.headers()["cache-control"]).toContain("no-store");
    const payload = await response.json() as { commit?: string | null; environment?: string | null };
    expect(payload.environment).toBeTruthy();
  });

  test("Gemini production provider is configured and can choose a tutoring tactic", async ({ page }) => {
    test.skip(process.env.REQUIRE_GEMINI !== "true", "Gemini provider verification is enabled only in the production release gate.");

    await enterApp(page);
    const trigger = page.getByRole("button", { name: /Miksi tämä\?|Ohjaaja|Vihje|Selitä/ }).first();
    await trigger.click();

    await expect(page.getByText(/Tekoälyohjaus saatavilla|Tekoälyohjaus käytössä/)).toBeVisible({ timeout: 20_000 });

    const courseId = await page.getByLabel("Kurssi").inputValue();
    expect(courseId).not.toBe("");

    const result = await page.evaluate(async (id) => {
      const token = localStorage.getItem("opk.device-token");
      if (!token) throw new Error("device token missing");
      const response = await fetch("/api/ai/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          mode: "help",
          message: "Ratkaise yhtälö 2x + 4 = 10. Älä kerro lopputulosta.",
          attempt: "Aloittaisin vähentämällä neljä molemmilta puolilta.",
          courseId: id,
          hintLevel: 0,
          practiceIndex: 0,
          remoteConsent: true,
        }),
      });
      return { statusCode: response.status, payload: await response.json() };
    }, courseId);

    expect(result.statusCode).toBe(200);
    expect(result.payload.source).toBe("gemini");
    expect(result.payload.status).toBe("ready");
    expect(String(result.payload.message ?? "")).not.toMatch(/x\s*=\s*3/i);
  });

  test("push backend exposes its VAPID key and protects the cron endpoint", async ({ request, baseURL }) => {
    expect(baseURL).toBeTruthy();

    const keyResponse = await request.get(new URL("/api/push/public-key", baseURL).toString());
    expect(keyResponse.ok()).toBe(true);
    const keyPayload = await keyResponse.json() as { publicKey?: string };
    expect(keyPayload.publicKey?.length ?? 0).toBeGreaterThan(20);

    const cronResponse = await request.get(new URL("/api/push/cron", baseURL).toString());
    expect(cronResponse.status()).toBe(401);
  });
});
