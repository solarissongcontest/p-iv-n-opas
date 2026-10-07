import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

test.describe("Progress trajectory", () => {
  test("Progress exposes the daily trajectory, Today marker and all three views", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await enterApp(page);
    await page.goto("/progress", { waitUntil: "domcontentloaded" });

    await expect(page.getByText("Suunnitelmassa pysyminen", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Eteneminen", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Työmäärä", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Osaaminen", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Päivittäin", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Koko kurssi", exact: true })).toBeVisible();
    await expect(page.getByText(/Tänään \d{1,2}\.\d{1,2}\./).first()).toBeVisible();

    await page.getByRole("button", { name: "Työmäärä", exact: true }).click();
    await expect(page.getByText(/Suunniteltu työmäärä ja oikeasti kirjattu opiskeluaika/)).toBeVisible();
    await page.getByRole("button", { name: "Osaaminen", exact: true }).click();
    await expect(page.getByText(/Harjoitusnäyttö perustuu viimeisimpiin harjoitusyrityksiin/)).toBeVisible();

    await expect(page.getByRole("button", { name: "Edellinen päivä" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Seuraava päivä" })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("Course Analysis reuses the same canonical trajectory instead of the legacy corridor", async ({ page }) => {
    await enterApp(page);
    await page.goto("/studies", { waitUntil: "domcontentloaded" });

    const ke04 = page.getByText("KE04", { exact: true }).first();
    await expect(ke04).toBeVisible();
    await ke04.click();
    await page.getByRole("button", { name: "Tarkempi analyysi" }).click();

    await expect(page.getByText("Suunnitelma, toteuma ja ennuste", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Eteneminen", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Työmäärä", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Osaaminen", exact: true })).toBeVisible();
    await expect(page.getByText("Etenemiskäytävä ja ennuste", { exact: true })).toBeHidden();
  });
});
