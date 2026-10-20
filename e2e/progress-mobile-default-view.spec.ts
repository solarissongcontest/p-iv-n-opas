import { expect, test } from "@playwright/test";
import { enterApp } from "./helpers";

test("progress summary opens the uncompressed daily timeline on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await enterApp(page);
  await page.goto("/progress", { waitUntil: "domcontentloaded" });

  const precision = page.locator('[aria-label="Kuvaajan tarkkuus"]').first();
  const daily = precision.getByRole("button", { name: "Päivittäin" });
  const course = precision.getByRole("button", { name: "Koko kurssi" });

  await expect(daily).toHaveAttribute("aria-pressed", "true");
  await expect(course).toHaveAttribute("aria-pressed", "false");

  const mainPlot = page.locator('[data-testid="trajectory-main-plot"]').first();
  await expect(mainPlot).toBeVisible();

  const geometry = await mainPlot.evaluate((node) => {
    const viewport = node.parentElement;
    const svg = node.querySelector<SVGElement>("svg");
    const nodeBox = node.getBoundingClientRect();
    const svgBox = svg?.getBoundingClientRect() ?? null;
    return {
      plotWidth: nodeBox.width,
      plotHeight: nodeBox.height,
      svgWidth: svgBox?.width ?? 0,
      svgHeight: svgBox?.height ?? 0,
      viewportWidth: viewport?.clientWidth ?? 0,
      scrollWidth: viewport?.scrollWidth ?? 0,
    };
  });

  expect(geometry.plotHeight).toBeGreaterThanOrEqual(340);
  expect(geometry.svgHeight).toBeGreaterThanOrEqual(340);
  expect(geometry.plotWidth).toBeGreaterThan(geometry.viewportWidth);
  expect(geometry.svgWidth).toBeGreaterThan(geometry.viewportWidth);
  expect(geometry.scrollWidth).toBeGreaterThan(geometry.viewportWidth);
});
