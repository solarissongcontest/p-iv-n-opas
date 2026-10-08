import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

test.describe("Progress trajectory desktop containment", () => {
  test("whole-course summary stays inside the desktop content column and daily mode only scrolls locally", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await enterApp(page);
    await page.goto("/progress", { waitUntil: "domcontentloaded" });

    const card = page.locator(".progress-trajectory-card").first();
    await expect(card).toBeVisible();
    await expect(page.getByRole("button", { name: "Koko kurssi", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expectNoHorizontalOverflow(page);

    await page.getByRole("button", { name: "Päivittäin", exact: true }).click();
    const geometry = await page.evaluate(() => {
      const card = document.querySelector<HTMLElement>(".progress-trajectory-card");
      const scroller = card?.querySelector<HTMLElement>(".overflow-x-auto") ?? null;
      return {
        viewportWidth: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        cardWidth: card?.getBoundingClientRect().width ?? 0,
        scrollerClientWidth: scroller?.clientWidth ?? 0,
        scrollerScrollWidth: scroller?.scrollWidth ?? 0,
      };
    });

    expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
    expect(geometry.scrollerClientWidth).toBeLessThanOrEqual(geometry.cardWidth + 1);
    expect(geometry.scrollerScrollWidth).toBeGreaterThanOrEqual(geometry.scrollerClientWidth);
    await expectNoHorizontalOverflow(page);
  });
});
