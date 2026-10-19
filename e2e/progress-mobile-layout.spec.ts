import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

test("mobile progress charts stay separated and clear of the floating tab bar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await enterApp(page);
  await page.goto("/progress", { waitUntil: "domcontentloaded" });

  const mainPlot = page.locator('[data-testid="trajectory-main-plot"]').first();
  const deviationPlot = page.locator('[data-testid="trajectory-deviation-plot"]').first();
  await expect(mainPlot).toBeVisible();
  await expect(deviationPlot).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const geometry = await page.evaluate(() => {
    const main = document.querySelector<HTMLElement>('[data-testid="trajectory-main-plot"]');
    const deviation = document.querySelector<HTMLElement>('[data-testid="trajectory-deviation-plot"]');
    if (!main || !deviation) return null;

    const deviationSection = deviation.parentElement;
    const heading = deviationSection?.firstElementChild as HTMLElement | null;
    const mainBox = main.getBoundingClientRect();
    const deviationBox = deviation.getBoundingClientRect();
    const sectionBox = deviationSection?.getBoundingClientRect() ?? null;
    const headingBox = heading?.getBoundingClientRect() ?? null;

    return {
      viewportWidth: innerWidth,
      mainBottom: mainBox.bottom,
      deviationTop: deviationBox.top,
      deviationWidth: deviationBox.width,
      sectionWidth: sectionBox?.width ?? 0,
      headingBottom: headingBox?.bottom ?? 0,
    };
  });

  expect(geometry).not.toBeNull();
  expect(geometry!.deviationTop).toBeGreaterThanOrEqual(geometry!.mainBottom + 8);
  expect(geometry!.headingBottom).toBeLessThanOrEqual(geometry!.deviationTop + 1);
  expect(geometry!.deviationWidth).toBeLessThanOrEqual(geometry!.viewportWidth + 1);
  expect(geometry!.sectionWidth).toBeLessThanOrEqual(geometry!.viewportWidth + 1);

  // The selected-day summary is the panel containing the previous/next day controls.
  // It is a real visible layout surface, but it is not an aria-live region. The old
  // selector accidentally asserted an accessibility implementation detail that the
  // canonical trajectory component has never required, so the release gate could
  // fail even while the entire progress UI rendered correctly.
  const selectedDay = page
    .getByRole("button", { name: "Seuraava päivä" })
    .locator("xpath=../../..");
  const tabbar = page.locator(".app-tabbar");
  await expect(selectedDay.getByText("Valittu päivä", { exact: true })).toBeVisible();
  await expect(selectedDay).toBeVisible();
  await expect(tabbar).toBeVisible();

  await selectedDay.evaluate((node) => node.scrollIntoView({ block: "end" }));
  const overlap = await selectedDay.evaluate((selected) => {
    const nav = document.querySelector<HTMLElement>(".app-tabbar");
    if (!nav) return null;
    const selectedBox = selected.getBoundingClientRect();
    const navBox = nav.getBoundingClientRect();
    return selectedBox.bottom - navBox.top;
  });

  expect(overlap).not.toBeNull();
  expect(overlap!).toBeLessThanOrEqual(1);
});
