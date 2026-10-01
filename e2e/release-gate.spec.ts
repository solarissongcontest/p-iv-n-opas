import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

const ROUTES = ["/today", "/plan", "/studies", "/practice", "/progress", "/settings/study"];

test.describe("Final release gate", () => {
  test("primary routes load, stay keyboard reachable and have no serious WCAG violations", async ({ page }) => {
    await enterApp(page);

    for (const route of ROUTES) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("#main-content")).toBeVisible();
      await expectNoHorizontalOverflow(page);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const blocking = results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );
      expect(
        blocking,
        route + " sisältää vakavia saavutettavuusvirheitä: " +
          blocking.map((violation) => violation.id + ": " + violation.help).join("; "),
      ).toEqual([]);

      await page.keyboard.press("Tab");
      const focusVisible = await page.evaluate(() => {
        const active = document.activeElement;
        return active instanceof HTMLElement && active !== document.body;
      });
      expect(focusVisible).toBe(true);
    }
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

    await expect(page.getByText(/Gemini-yhteys määritetty|Gemini käytössä/)).toBeVisible({ timeout: 20_000 });

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
