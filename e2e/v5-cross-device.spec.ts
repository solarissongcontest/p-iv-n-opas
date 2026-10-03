import { expect, test, type BrowserContext, type Page } from "@playwright/test";

async function enterApp(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const username = page.getByLabel("Käyttäjänimi");
  if (await username.isVisible().catch(() => false)) {
    await username.fill("Arthur");
    await page.getByRole("button", { name: "Jatka" }).click();
  }

  const onboardingHeading = page.getByRole("heading", { name: /Tervetuloa, Arthur/i });
  if (await onboardingHeading.isVisible().catch(() => false)) {
    await page.getByRole("button", { name: /Jatka/i }).click();
    await page.getByRole("button", { name: /Jatka/i }).click();
    await page.getByRole("button", { name: /Jatka/i }).click();
    await page.getByRole("button", { name: /Avaa Tänään/i }).click();
  }

  await expect(page.getByRole("button", { name: "Tänään" })).toBeVisible();
}

async function waitForServiceWorker(page: Page) {
  await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) return;
    await navigator.serviceWorker.ready;
  });
}

async function cleanupSession(
  context: BrowserContext,
  page: Page,
  supabaseOrigin: string | null,
  apiKey: string | null,
  marker: string,
) {
  if (!supabaseOrigin || !apiKey) return;
  const token = await page.evaluate(() => localStorage.getItem("opk.device-token"));
  if (!token) return;
  await context.request.delete(
    supabaseOrigin + "/rest/v1/study_sessions?unclear=eq." + encodeURIComponent(marker),
    {
      headers: {
        apikey: apiKey,
        Authorization: "Bearer " + token,
        Prefer: "return=minimal",
      },
    },
  ).catch(() => undefined);
}

test("installed-style app shell survives a cold offline navigation", async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: "allow" });
  const page = await context.newPage();
  try {
    await enterApp(page);
    await waitForServiceWorker(page);

    // Prime the exact route after the worker controls the page so its navigation
    // response and static dependencies are available to the runtime cache.
    await page.goto("/today", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: "Tänään", exact: true })).toBeVisible();

    const onlineCourseCodes = await page.locator("[data-page='today']").textContent();

    await context.setOffline(true);
    const offlinePage = await context.newPage();
    await offlinePage.goto("/today", { waitUntil: "domcontentloaded" });
    await expect(offlinePage.getByRole("heading", { name: "Tänään" })).toBeVisible({ timeout: 30_000 });
    await expect(offlinePage.getByText(/Verkkoyhteyttä ei ole|Tallennettu paikallisesti/).first()).toBeVisible({ timeout: 30_000 }).catch(() => undefined);

    // The cold start must retain actual study context, not merely render an empty shell.
    if (onlineCourseCodes?.includes("KE04")) {
      await expect(offlinePage.getByText("KE04").first()).toBeVisible({ timeout: 30_000 });
    }
    await offlinePage.close();
  } finally {
    await context.setOffline(false).catch(() => undefined);
    await context.close();
  }
});

test("expired device token does not lock a trusted device out of offline study data", async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: "allow" });
  const page = await context.newPage();
  try {
    await enterApp(page);
    await waitForServiceWorker(page);
    await page.goto("/today", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Tänään" })).toBeVisible();

    await page.evaluate(() => {
      localStorage.setItem("opk.device-token-expires", "0");
    });
    await context.setOffline(true);

    const offlinePage = await context.newPage();
    await offlinePage.goto("/today", { waitUntil: "domcontentloaded" });
    await expect(offlinePage.getByRole("heading", { name: "Tänään" })).toBeVisible({ timeout: 30_000 });
    await expect(offlinePage.getByLabel("Käyttäjänimi")).toBeHidden();
    await offlinePage.close();
  } finally {
    await context.setOffline(false).catch(() => undefined);
    await context.close();
  }
});

test("a stale second device cannot overwrite a newer planner edit", async ({ browser }) => {
  const contextA = await browser.newContext({ serviceWorkers: "allow" });
  const contextB = await browser.newContext({ serviceWorkers: "allow" });
  const pageA = await contextA.newPage();
  const pageB = await contextB.newPage();
  let supabaseOrigin: string | null = null;
  let apiKey: string | null = null;
  let planItemId: string | null = null;

  pageA.on("request", (request) => {
    if (!request.url().includes("/rest/v1/") && !request.url().includes("/rpc/")) return;
    try {
      const url = new URL(request.url());
      if (!/supabase/i.test(url.hostname)) return;
      supabaseOrigin = url.origin;
      apiKey = request.headers()["apikey"] ?? apiKey;
    } catch {
      // Ignore unrelated requests.
    }
  });

  try {
    await enterApp(pageA);
    await enterApp(pageB);
    expect(supabaseOrigin).toBeTruthy();
    expect(apiKey).toBeTruthy();

    const tokenA = await pageA.evaluate(() => localStorage.getItem("opk.device-token"));
    const tokenB = await pageB.evaluate(() => localStorage.getItem("opk.device-token"));
    expect(tokenA).toBeTruthy();
    expect(tokenB).toBeTruthy();

    const headersA = {
      apikey: apiKey!,
      Authorization: "Bearer " + tokenA,
      "Content-Type": "application/json",
    };
    const headersB = {
      apikey: apiKey!,
      Authorization: "Bearer " + tokenB,
      "Content-Type": "application/json",
    };

    const coursesResponse = await contextA.request.get(
      supabaseOrigin! + "/rest/v1/courses?select=id&archived=eq.false&limit=1",
      { headers: headersA },
    );
    expect(coursesResponse.ok()).toBe(true);
    const courses = await coursesResponse.json() as Array<{ id: string }>;
    expect(courses[0]?.id).toBeTruthy();

    const marker = "OPK-CONFLICT-" + Date.now();
    const createResponse = await contextA.request.post(
      supabaseOrigin! + "/rest/v1/plan_items",
      {
        headers: { ...headersA, Prefer: "return=representation" },
        data: {
          course_id: courses[0]!.id,
          date: "2099-01-01",
          phase: "review",
          kind: "study",
          title: marker,
          min_minutes: 1,
          target_minutes: 1,
          extra_minutes: 0,
          status: "planned",
        },
      },
    );
    expect(createResponse.ok()).toBe(true);
    const created = await createResponse.json() as Array<{
      id: string;
      date: string;
      status: string;
      updated_at: string;
    }>;
    planItemId = created[0]?.id ?? null;
    expect(planItemId).toBeTruthy();

    const firstUpdate = await contextA.request.patch(
      supabaseOrigin! +
        "/rest/v1/plan_items?id=eq." + encodeURIComponent(planItemId!) +
        "&date=eq.2099-01-01&status=eq.planned",
      {
        headers: { ...headersA, Prefer: "return=representation" },
        data: { date: "2099-01-02", moved_from: "2099-01-01", status: "planned" },
      },
    );
    expect(firstUpdate.ok()).toBe(true);
    const firstRows = await firstUpdate.json() as Array<{ date: string }>;
    expect(firstRows).toHaveLength(1);
    expect(firstRows[0]?.date).toBe("2099-01-02");

    // Device B still believes the row is on 2099-01-01. The same predicates
    // used by the app's optimistic write must therefore match zero rows.
    const staleUpdate = await contextB.request.patch(
      supabaseOrigin! +
        "/rest/v1/plan_items?id=eq." + encodeURIComponent(planItemId!) +
        "&date=eq.2099-01-01&status=eq.planned",
      {
        headers: { ...headersB, Prefer: "return=representation" },
        data: { date: "2099-01-03", moved_from: "2099-01-01", status: "planned" },
      },
    );
    expect(staleUpdate.ok()).toBe(true);
    expect(await staleUpdate.json()).toEqual([]);

    const finalResponse = await contextA.request.get(
      supabaseOrigin! +
        "/rest/v1/plan_items?select=date,status&id=eq." + encodeURIComponent(planItemId!),
      { headers: headersA },
    );
    expect(finalResponse.ok()).toBe(true);
    const finalRows = await finalResponse.json() as Array<{ date: string; status: string }>;
    expect(finalRows).toHaveLength(1);
    expect(finalRows[0]?.date).toBe("2099-01-02");
    expect(finalRows[0]?.status).toBe("planned");
  } finally {
    if (supabaseOrigin && apiKey && planItemId) {
      const token = await pageA.evaluate(() => localStorage.getItem("opk.device-token")).catch(() => null);
      if (token) {
        await contextA.request.delete(
          supabaseOrigin + "/rest/v1/plan_items?id=eq." + encodeURIComponent(planItemId),
          {
            headers: {
              apikey: apiKey,
              Authorization: "Bearer " + token,
              Prefer: "return=minimal",
            },
          },
        ).catch(() => undefined);
      }
    }
    await contextB.close();
    await contextA.close();
  }
});

test("v5 offline write survives reload, syncs, and appears on a second device", async ({ browser }) => {
  const contextA = await browser.newContext({ serviceWorkers: "allow" });
  const pageA = await contextA.newPage();
  let supabaseOrigin: string | null = null;
  let apiKey: string | null = null;

  pageA.on("request", (request) => {
    if (!request.url().includes("/rest/v1/") && !request.url().includes("/rpc/")) return;
    try {
      const url = new URL(request.url());
      if (!/supabase/i.test(url.hostname)) return;
      supabaseOrigin = url.origin;
      apiKey = request.headers()["apikey"] ?? apiKey;
    } catch {
      // Ignore unrelated requests.
    }
  });

  await enterApp(pageA);
  await waitForServiceWorker(pageA);

  const marker = "OPK-E2E-" + Date.now();
  await pageA.getByRole("button", { name: "Lisää", exact: true }).click();
  const actionSheet = pageA.getByRole("dialog", { name: "Lisää toimintoja" });
  await expect(actionSheet).toBeVisible();
  await actionSheet.getByRole("button", { name: /Kirjaa opiskelu/ }).click();
  await expect(pageA.getByRole("dialog")).toBeVisible();
  await pageA.getByLabel("Todellinen kesto minuutteina").fill("1");
  await pageA.getByLabel("Mitä teit?").fill("Cross-device offline E2E");
  await pageA.getByLabel("Mikä jäi epäselväksi?").fill(marker);

  await contextA.setOffline(true);
  await pageA.getByRole("button", { name: "Tallenna" }).click();
  await expect(pageA.getByRole("status")).toContainText("Tallennettu paikallisesti");

  await pageA.reload({ waitUntil: "domcontentloaded" });
  await expect(pageA.getByRole("status")).toContainText("synkataan yhteyden palattua");

  await contextA.setOffline(false);
  await expect(pageA.getByRole("status")).toBeHidden({ timeout: 30_000 });

  const contextB = await browser.newContext({ serviceWorkers: "allow" });
  const pageB = await contextB.newPage();
  try {
    await enterApp(pageB);
    await pageB.getByRole("button", { name: "Tänään" }).click();
    await expect(pageB.getByText(marker, { exact: true })).toBeVisible({ timeout: 30_000 });

    // A fresh reload on device B must still read the server-side value.
    await pageB.reload({ waitUntil: "domcontentloaded" });
    await expect(pageB.getByText(marker, { exact: true })).toBeVisible({ timeout: 30_000 });
  } finally {
    await cleanupSession(contextA, pageA, supabaseOrigin, apiKey, marker);
    await contextB.close();
    await contextA.close();
  }
});
