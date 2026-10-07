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
  { name: "1728", width: 1728, height: 1117 },
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
        await expect(page.locator(".app-tabbar .app-tab")).toHaveCount(5);
        for (const label of ["Tänään", "Suunnitelma", "Opinnot", "Edistyminen", "Lisää"]) {
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
        if (viewport.width >= 1600) {
          const leftGap = geometry.main!.left - geometry.sidebar!.right;
          const rightGap = viewport.width - geometry.main!.right;
          expect(Math.abs(leftGap - rightGap)).toBeLessThanOrEqual(40);
        }
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

  // The sheet has a short entrance animation. Measure its settled geometry,
  // not an intermediate translateY frame that can temporarily extend a few
  // pixels below the viewport while the animation is still running.
  await expect.poll(async () => {
    const box = await sheet.boundingBox();
    return box ? box.y + box.height : Number.POSITIVE_INFINITY;
  }, { timeout: 2_000, intervals: [50, 100, 150] }).toBeLessThanOrEqual(845);

  const sheetBox = await sheet.boundingBox();
  expect(sheetBox).not.toBeNull();
  expect(sheetBox!.y).toBeGreaterThanOrEqual(-1);
  expect(sheetBox!.y + sheetBox!.height).toBeLessThanOrEqual(845);
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


test("desktop planner protects calendar width and keeps engine detail secondary", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await enterApp(page);
  await page.goto("/plan/week/2026-W41", { waitUntil: "domcontentloaded" });

  const inspector = page.locator(".planner-v5-inspector");
  const calendar = page.locator(".planner-v5-calendar");
  const week = page.locator(".planner-week");
  await expect(inspector).toBeVisible();
  await expect(calendar).toBeVisible();
  await expect(week).toBeVisible();

  const geometry = async () => page.evaluate(() => {
    const box = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return null;
      const rect = node.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width };
    };
    const dayWidths = Array.from(document.querySelectorAll<HTMLElement>(".planner-week-day"))
      .map((node) => node.getBoundingClientRect().width);
    return {
      calendar: box(".planner-v5-calendar"),
      inspector: box(".planner-v5-inspector"),
      minDayWidth: dayWidths.length ? Math.min(...dayWidths) : 0,
    };
  });

  const constrained = await geometry();
  expect(constrained.calendar).not.toBeNull();
  expect(constrained.inspector).not.toBeNull();
  expect(constrained.inspector!.top).toBeGreaterThanOrEqual(constrained.calendar!.bottom - 2);
  expect(constrained.minDayWidth).toBeGreaterThanOrEqual(105);

  await inspector.locator("summary").click();
  await expect(page.locator(".v5-planner-grid")).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.setViewportSize({ width: 1728, height: 1000 });
  await page.waitForTimeout(100);
  const wide = await geometry();
  expect(wide.calendar).not.toBeNull();
  expect(wide.inspector).not.toBeNull();
  expect(wide.minDayWidth).toBeGreaterThanOrEqual(115);
});
