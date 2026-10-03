import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

const VIEWPORTS = [
  { name: "320", width: 320, height: 800 },
  { name: "375", width: 375, height: 812 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1280", width: 1280, height: 900 },
  { name: "1440", width: 1440, height: 1000 },
] as const;

for (const viewport of VIEWPORTS) {
  test("responsive visual invariants at " + viewport.name + "px", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await enterApp(page);

    for (const route of ["/today", "/plan", "/studies", "/practice", "/progress", "/exams", "/settings/study"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expectNoHorizontalOverflow(page);
      await expect(page.locator("#main-content")).toBeVisible();

      const geometry = await page.evaluate(() => {
        const rect = (selector: string) => {
          const node = document.querySelector<HTMLElement>(selector);
          if (!node || getComputedStyle(node).display === "none") return null;
          const box = node.getBoundingClientRect();
          return { left: box.left, right: box.right, top: box.top, bottom: box.bottom, width: box.width, height: box.height };
        };
        return {
          viewport: { width: innerWidth, height: innerHeight },
          main: rect("#main-content"),
          tabbar: rect(".app-tabbar"),
          sidebar: rect(".desktop-sidebar"),
          coach: rect(".coach-trigger"),
        };
      });

      expect(geometry.main).not.toBeNull();
      expect(geometry.main!.left).toBeGreaterThanOrEqual(-1);
      expect(geometry.main!.right).toBeLessThanOrEqual(viewport.width + 1);

      if (viewport.width < 768) {
        expect(geometry.sidebar).toBeNull();
        expect(geometry.tabbar).not.toBeNull();
        expect(geometry.tabbar!.height).toBeGreaterThanOrEqual(44);
        if (geometry.coach) {
          const overlapsTabbar =
            geometry.coach.bottom > geometry.tabbar!.top &&
            geometry.coach.top < geometry.tabbar!.bottom;
          expect(overlapsTabbar).toBe(false);
        }
      } else {
        expect(geometry.sidebar).not.toBeNull();
      }
    }

    const screenshot = await page.screenshot({ fullPage: true, animations: "disabled" });
    await testInfo.attach("responsive-" + viewport.name + ".png", {
      body: screenshot,
      contentType: "image/png",
    });
  });
}
