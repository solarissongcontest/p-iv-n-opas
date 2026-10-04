// Production rerun after schema-compatible KE04 deploy
import { expect, test } from "@playwright/test";
import { enterApp } from "./helpers";

test("diagnose live KE04 V3 seed endpoint", async ({ page }) => {
  test.setTimeout(90_000);
  await enterApp(page);
  await page.goto("/practice", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Harjoittelu" })).toBeVisible({ timeout: 30_000 });

  const courseSelect = page.getByLabel("Kurssi");
  await expect.poll(async () => {
    const options = await courseSelect.locator("option").evaluateAll((nodes) =>
      nodes.map((node) => ({ value: (node as HTMLOptionElement).value, text: node.textContent ?? "" })),
    );
    return options.some((option) => /\bKE04\b/.test(option.text));
  }, { timeout: 60_000, intervals: [500, 1000, 2000] }).toBe(true);

  const options = await courseSelect.locator("option").evaluateAll((nodes) =>
    nodes.map((node) => ({ value: (node as HTMLOptionElement).value, text: node.textContent ?? "" })),
  );
  const ke04 = options.find((option) => /\bKE04\b/.test(option.text));
  expect(ke04).toBeTruthy();

  const result = await page.evaluate(async (courseId) => {
    const token = localStorage.getItem("opk.device-token");
    const response = await fetch("/api/questions/seed-ke04", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ courseId }),
    });
    return {
      status: response.status,
      body: await response.text(),
      hasToken: Boolean(token),
    };
  }, ke04!.value);

  console.log("KE04_SEED_DIAGNOSTIC", JSON.stringify(result));
  expect(result.hasToken).toBe(true);
  expect(result.status, result.body).toBe(200);
});
