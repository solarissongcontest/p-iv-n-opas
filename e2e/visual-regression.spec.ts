import { expect, test } from "@playwright/test";
import { enterApp } from "./helpers";

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

test("mobile shell chrome stays visually stable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
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
  await enterApp(page);
  await hideVolatileUi(page);

  await expect(page.locator(".desktop-sidebar")).toHaveScreenshot("desktop-sidebar-1440.png", {
    animations: "disabled",
  });

  const main = page.locator("#main-content");
  await expect(main).toHaveScreenshot("desktop-today-workspace-1440.png", {
    animations: "disabled",
    mask: [
      main.locator(".today-primary"),
      main.locator(".today-context"),
      main.locator(".today-support-section"),
      main.locator(".today-practice-shortcut"),
    ],
  });
});

test("month grid structure stays visually stable", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await enterApp(page);
  await page.goto("/plan/month/2026-10", { waitUntil: "domcontentloaded" });
  await hideVolatileUi(page);

  const month = page.locator(".planner-month");
  await expect(month).toBeVisible();
  await expect(month).toHaveScreenshot("planner-month-1280.png", {
    animations: "disabled",
    mask: [month.locator(".planner-task")],
  });
});

test("active Practice focus shell stays visually stable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await enterApp(page);
  await page.goto("/practice", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Aloita harjoittelu" }).click();
  await hideVolatileUi(page);

  const focus = page.locator(".practice-session-active");
  await expect(focus).toBeVisible();
  await expect(focus).toHaveScreenshot("mobile-practice-focus-390.png", {
    animations: "disabled",
    mask: [
      focus.locator("textarea"),
      focus.locator("[contenteditable='true']"),
      focus.locator(".practice-question"),
    ],
  });
});
