import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

async function hideVolatileUi(page: import("@playwright/test").Page) {
  await page.addStyleTag({
    content: `
      .pwa-update-prompt,
      .coach-trigger,
      [data-sonner-toaster] {
        visibility: hidden !important;
      }
    `,
  });
}

async function freezeShellClock(page: import("@playwright/test").Page) {
  await page.clock.setFixedTime(new Date("2026-10-03T18:00:00.000Z"));
}

test("mobile shell chrome stays visually stable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await freezeShellClock(page);
  await enterApp(page);
  await hideVolatileUi(page);

  await expect(page.locator(".app-mobile-header")).toHaveScreenshot("mobile-header-390.png", {
    animations: "disabled",
  });
  await expect(page.locator(".app-tabbar")).toHaveScreenshot("mobile-tabbar-390.png", {
    animations: "disabled",
  });

  await page.getByRole("button", { name: "Lisää", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Lisää toimintoja" })).toHaveScreenshot(
    "mobile-more-sheet-390.png",
    { animations: "disabled" },
  );
});

test("tablet icon sidebar stays visually stable", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await enterApp(page);
  await hideVolatileUi(page);

  await expect(page.locator(".desktop-sidebar")).toHaveScreenshot("tablet-sidebar-768.png", {
    animations: "disabled",
  });
});

test("desktop sidebar and workspace alignment stay visually stable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await freezeShellClock(page);
  await enterApp(page);
  await hideVolatileUi(page);

  await expect(page.locator(".desktop-sidebar")).toHaveScreenshot("desktop-sidebar-1440.png", {
    animations: "disabled",
  });

  const main = page.locator("#main-content");
  await expect(main).toHaveScreenshot("desktop-today-workspace-1440.png", {
    animations: "disabled",
    mask: [
      main.locator(".today-v5-primary"),
      main.locator(".today-v5-context"),
      main.locator(".today-v5-support"),
    ],
  });
});

test("month grid structure stays visually stable without snapshotting personal plan content", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await enterApp(page);
  await page.goto("/plan/month/2026-10", { waitUntil: "domcontentloaded" });
  await hideVolatileUi(page);
  await expectNoHorizontalOverflow(page);

  const month = page.locator(".planner-month");
  const weekdays = page.locator(".planner-month-weekdays");
  const grid = page.locator(".planner-month-grid");
  await expect(month).toBeVisible();
  await expect(weekdays).toBeVisible();
  await expect(weekdays.locator(":scope > span")).toHaveCount(7);
  await expect(page.locator(".planner-month-day")).toHaveCount(31);
  await expect(page.locator(".planner-month-spacer")).toHaveCount(3);

  const geometry = await page.evaluate(() => {
    const month = document.querySelector<HTMLElement>(".planner-month");
    const weekdays = document.querySelector<HTMLElement>(".planner-month-weekdays");
    const grid = document.querySelector<HTMLElement>(".planner-month-grid");
    const days = Array.from(document.querySelectorAll<HTMLElement>(".planner-month-day"));
    const primary = Array.from(document.querySelectorAll<HTMLElement>(".planner-month-primary"));
    if (!month || !weekdays || !grid) return null;
    const monthBox = month.getBoundingClientRect();
    const weekdayBox = weekdays.getBoundingClientRect();
    const dayWidths = days.map((node) => node.getBoundingClientRect().width);
    const tasksStayInsideCells = primary.every((task) => {
      const taskBox = task.getBoundingClientRect();
      const cell = task.closest<HTMLElement>(".planner-month-day");
      if (!cell) return false;
      const cellBox = cell.getBoundingClientRect();
      return taskBox.left >= cellBox.left - 1 && taskBox.right <= cellBox.right + 1;
    });
    return {
      monthWidth: monthBox.width,
      weekdayWidth: weekdayBox.width,
      columns: getComputedStyle(grid).gridTemplateColumns.trim().split(/\s+/).filter(Boolean).length,
      minDayWidth: dayWidths.length ? Math.min(...dayWidths) : 0,
      maxDayWidth: dayWidths.length ? Math.max(...dayWidths) : 0,
      tasksStayInsideCells,
    };
  });

  expect(geometry).not.toBeNull();
  expect(geometry!.monthWidth).toBeGreaterThanOrEqual(850);
  expect(geometry!.monthWidth).toBeLessThanOrEqual(1000);
  expect(Math.abs(geometry!.monthWidth - geometry!.weekdayWidth)).toBeLessThanOrEqual(2);
  expect(geometry!.columns).toBe(7);
  expect(geometry!.minDayWidth).toBeGreaterThanOrEqual(110);
  expect(geometry!.maxDayWidth - geometry!.minDayWidth).toBeLessThanOrEqual(2);
  expect(geometry!.tasksStayInsideCells).toBe(true);

  await testInfo.attach("planner-month-1280" + ".png", {
    body: await month.screenshot({ animations: "disabled" }),
    contentType: "image/png",
  });
});

test("active Practice focus shell stays bounded while adaptive content is allowed to change", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await enterApp(page);
  await page.goto("/practice", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Aloita harjoittelu" }).click();
  await hideVolatileUi(page);

  const focus = page.locator(".practice-session-active");
  const surface = page.locator(".practice-primary-surface");
  await expect(focus).toBeVisible();
  await expect(surface).toBeVisible();
  await expect(page.locator(".app-tabbar")).toBeHidden();
  await expect(page.locator(".app-mobile-header")).toBeHidden();
  await expect(page.getByRole("button", { name: "Lopeta", exact: true })).toBeVisible();
  await expect(page.getByText("Harjoittelutila", { exact: true })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const geometry = await page.evaluate(() => {
    const focus = document.querySelector<HTMLElement>(".practice-session-active");
    const surface = document.querySelector<HTMLElement>(".practice-primary-surface");
    if (!focus || !surface) return null;
    const focusBox = focus.getBoundingClientRect();
    const surfaceBox = surface.getBoundingClientRect();
    const interactive = Array.from(focus.querySelectorAll<HTMLElement>("button, textarea, input, select, [contenteditable='true']"));
    const interactiveInsideViewport = interactive.every((node) => {
      const box = node.getBoundingClientRect();
      return box.left >= -1 && box.right <= innerWidth + 1;
    });
    return {
      viewportWidth: innerWidth,
      focusLeft: focusBox.left,
      focusRight: focusBox.right,
      focusWidth: focusBox.width,
      surfaceLeft: surfaceBox.left,
      surfaceRight: surfaceBox.right,
      surfaceWidth: surfaceBox.width,
      interactiveInsideViewport,
    };
  });

  expect(geometry).not.toBeNull();
  expect(geometry!.focusLeft).toBeGreaterThanOrEqual(0);
  expect(geometry!.focusRight).toBeLessThanOrEqual(geometry!.viewportWidth + 1);
  expect(geometry!.focusWidth).toBeGreaterThanOrEqual(340);
  expect(Math.abs(geometry!.surfaceLeft - geometry!.focusLeft)).toBeLessThanOrEqual(2);
  expect(Math.abs(geometry!.surfaceRight - geometry!.focusRight)).toBeLessThanOrEqual(2);
  expect(Math.abs(geometry!.surfaceWidth - geometry!.focusWidth)).toBeLessThanOrEqual(2);
  expect(geometry!.interactiveInsideViewport).toBe(true);

  await testInfo.attach("mobile-practice-focus-390" + ".png", {
    body: await focus.screenshot({ animations: "disabled" }),
    contentType: "image/png",
  });
});
