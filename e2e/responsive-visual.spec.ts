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

const ROUTES = [
  { name: "today", path: "/today" },
  { name: "plan", path: "/plan" },
  { name: "month", path: "/plan/month/2026-10" },
  { name: "studies", path: "/studies" },
  { name: "practice", path: "/practice" },
  { name: "progress", path: "/progress" },
  { name: "exams", path: "/exams" },
  { name: "settings", path: "/settings/study" },
] as const;

for (const viewport of VIEWPORTS) {
  test("responsive layout evidence at " + viewport.name + "px", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await enterApp(page);

    for (const route of ROUTES) {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
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
        await expect(page.locator(".app-tabbar .app-tab")).toHaveCount(4);
        for (const label of ["Tänään", "Opinnot", "Edistyminen", "Lisää"]) {
          await expect(page.getByRole("button", { name: label, exact: true })).toBeVisible();
        }
        if (geometry.coach) {
          const overlapsTabbar =
            geometry.coach.bottom > geometry.tabbar!.top &&
            geometry.coach.top < geometry.tabbar!.bottom;
          expect(overlapsTabbar).toBe(false);
        }
      } else {
        expect(geometry.sidebar).not.toBeNull();
        await expect(page.locator(".desktop-sidebar").getByRole("button", { name: "Suunnitelma" })).toBeVisible();
        await expect(page.locator(".desktop-sidebar").getByRole("button", { name: "Kokeet" })).toBeVisible();
      }

      if (route.name === "month") {
        await expect(page.locator(".planner-month-weekdays")).toBeVisible();
        await expect(page.locator(".planner-month-weekdays > span")).toHaveCount(7);
      }

      const screenshot = await page.screenshot({ fullPage: true, animations: "disabled" });
      await testInfo.attach(`responsive-${viewport.name}-${route.name}.png`, {
        body: screenshot,
        contentType: "image/png",
      });
    }
  });
}

test("mobile More sheet and active Practice remain bounded", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await enterApp(page);

  await page.getByRole("button", { name: "Lisää", exact: true }).click();
  const sheet = page.getByRole("dialog", { name: "Lisää toimintoja" });
  await expect(sheet).toBeVisible();
  await expectNoHorizontalOverflow(page);
  const sheetBox = await sheet.boundingBox();
  expect(sheetBox).not.toBeNull();
  expect(sheetBox!.bottom).toBeLessThanOrEqual(845);
  await testInfo.attach("mobile-more-sheet.png", {
    body: await page.screenshot({ fullPage: true, animations: "disabled" }),
    contentType: "image/png",
  });

  await sheet.getByRole("button", { name: /Harjoittelu/ }).click();
  await page.getByRole("button", { name: "Aloita harjoittelu" }).click();
  await expect(page.locator(".practice-session-active")).toBeVisible();
  await expect(page.locator(".app-tabbar")).toBeHidden();
  await expect(page.locator(".app-mobile-header")).toBeHidden();
  await expectNoHorizontalOverflow(page);
  await testInfo.attach("mobile-practice-focus.png", {
    body: await page.screenshot({ fullPage: true, animations: "disabled" }),
    contentType: "image/png",
  });
});
