import { expect, test } from "@playwright/test";
import { enterApp } from "./helpers";

test("real Web Push provider accepts one test notification", async ({ page }) => {
  test.skip(process.env.SEND_PUSH_TEST !== "true", "Real device push is opt-in because it produces an actual notification.");

  await enterApp(page);

  const result = await page.evaluate(async () => {
    const token = localStorage.getItem("opk.device-token");
    if (!token) throw new Error("device token missing");

    const response = await fetch("/api/push/test", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return {
      status: response.status,
      payload: await response.json(),
    };
  });

  expect(result.status).toBe(200);
  expect(result.payload.ok).toBe(true);
  expect(Number(result.payload.sent ?? 0)).toBeGreaterThan(0);
});
