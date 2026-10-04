import { expect, test } from "@playwright/test";
import { enterApp } from "./helpers";

test("live production exposes the full curated KE04 V3 bank", async ({ page }) => {
  test.setTimeout(180_000);
  await enterApp(page);
  await page.goto("/practice", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { name: "Harjoittelu" })).toBeVisible({ timeout: 30_000 });
  const courseSelect = page.getByLabel("Kurssi");
  await expect(courseSelect).toBeVisible();

  const options = await courseSelect.locator("option").evaluateAll((nodes) =>
    nodes.map((node) => ({
      value: (node as HTMLOptionElement).value,
      text: node.textContent ?? "",
    })),
  );
  const ke04 = options.find((option) => /\bKE04\b/.test(option.text));
  expect(ke04, "KE04 course must exist").toBeTruthy();
  await courseSelect.selectOption(ke04!.value);

  const bankStatus = page.getByText(/Pankissa \d+ tehtävää/);
  await expect(bankStatus).toBeVisible({ timeout: 30_000 });
  await expect.poll(async () => {
    const text = await bankStatus.textContent();
    return Number(text?.match(/(\d+)/)?.[1] ?? 0);
  }, { timeout: 120_000, intervals: [1000, 2000, 5000] }).toBeGreaterThanOrEqual(780);

  const topicSelect = page.getByLabel("Aloitusaihe");
  await expect(topicSelect.locator("option")).toHaveCount(15, { timeout: 30_000 });

  await page.getByRole("button", { name: "Aloita harjoittelu" }).click();
  await expect(page.locator(".practice-session-active")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText("LOPS21-tehtäväpankki")).toBeVisible({ timeout: 30_000 });
});
