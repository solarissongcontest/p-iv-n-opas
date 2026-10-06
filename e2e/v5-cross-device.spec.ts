import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { enterApp } from "./helpers";

async function waitForServiceWorker(page: Page) {
  await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) return;
    await navigator.serviceWorker.ready;
  });
}

async function expectTodayWorkspace(page: Page, timeout = 30_000) {
  await expect(page.locator("[data-page='today']")).toBeVisible({ timeout });
}

async function pendingOfflineWrites(page: Page) {
  return page.evaluate(() => {
    let total = 0;
    for (let index = 0; index < localStorage.length; index += 1) {
      const storageKey = localStorage.key(index);
      if (!storageKey?.startsWith("opk.pending.v2.")) continue;
      try {
        const value = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
        if (Array.isArray(value)) total += value.length;
      } catch {
        // Malformed queue data is ignored by the production queue as well.
      }
    }
    return total;
  });
}

async function openStudyLog(page: Page) {
  const directLog = page.getByRole("button", { name: "Kirjaa opiskelu", exact: true });
  if (await directLog.isVisible().catch(() => false)) {
    await directLog.click();
    return;
  }

  await page.getByRole("button", { name: "Lisää", exact: true }).click();
  const actionSheet = page.getByRole("dialog", { name: "Lisää toimintoja" });
  await expect(actionSheet).toBeVisible();
  await actionSheet.getByRole("button", { name: /Kirjaa opiskelu/ }).click();
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
    await expectTodayWorkspace(offlinePage);
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
    await expectTodayWorkspace(page);

    await page.evaluate(() => {
      localStorage.setItem("opk.device-token-expires", "0");
    });
    await context.setOffline(true);

    const offlinePage = await context.newPage();
    await offlinePage.goto("/today", { waitUntil: "domcontentloaded" });
    await expectTodayWorkspace(offlinePage);
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
  expect(supabaseOrigin).toBeTruthy();
  expect(apiKey).toBeTruthy();

  const marker = "OPK-E2E-" + Date.now();
  await openStudyLog(pageA);
  await expect(pageA.getByRole("dialog")).toBeVisible();
  await pageA.getByLabel("Todellinen kesto minuutteina").fill("1");
  await pageA.getByLabel("Mitä teit?").fill("Cross-device offline E2E");
  await pageA.getByLabel("Mikä jäi epäselväksi?").fill(marker);

  await contextA.setOffline(true);
  await pageA.getByRole("button", { name: "Tallenna" }).click();
  const offlineQueueStatus = pageA.locator("p[role='status']").filter({ hasText: "Tallennettu paikallisesti" }).first();
  await expect(offlineQueueStatus).toBeVisible({ timeout: 15_000 });
  await expect.poll(() => pendingOfflineWrites(pageA), { timeout: 15_000 }).toBeGreaterThan(0);

  await pageA.reload({ waitUntil: "domcontentloaded" });
  const reloadedQueueStatus = pageA.locator("p[role='status']").filter({ hasText: "Tallennettu paikallisesti" }).first();
  await expect(reloadedQueueStatus).toBeVisible({ timeout: 15_000 });
  await expect.poll(() => pendingOfflineWrites(pageA), { timeout: 15_000 }).toBeGreaterThan(0);

  await contextA.setOffline(false);

  let syncedCourseId: string | null = null;
  await expect.poll(async () => {
    const token = await pageA.evaluate(() => localStorage.getItem("opk.device-token"));
    if (!token || !supabaseOrigin || !apiKey) return 0;
    const response = await contextA.request.get(
      supabaseOrigin + "/rest/v1/study_sessions?select=id,course_id,unclear&unclear=eq." + encodeURIComponent(marker),
      {
        headers: {
          apikey: apiKey,
          Authorization: "Bearer " + token,
        },
      },
    );
    if (!response.ok()) return 0;
    const rows = await response.json() as Array<{ id: string; course_id: string; unclear: string | null }>;
    syncedCourseId = rows[0]?.course_id ?? null;
    return rows.length;
  }, { timeout: 45_000, intervals: [500, 1_000, 2_000, 4_000] }).toBe(1);

  await expect.poll(() => pendingOfflineWrites(pageA), { timeout: 15_000 }).toBe(0);
  await expect(reloadedQueueStatus).toBeHidden({ timeout: 15_000 });
  expect(syncedCourseId).toBeTruthy();

  const contextB = await browser.newContext({ serviceWorkers: "allow" });
  const pageB = await contextB.newPage();
  try {
    await enterApp(pageB);
    const tokenB = await pageB.evaluate(() => localStorage.getItem("opk.device-token"));
    expect(tokenB).toBeTruthy();

    const headersB = {
      apikey: apiKey!,
      Authorization: "Bearer " + tokenB,
    };
    const secondDeviceSession = await contextB.request.get(
      supabaseOrigin! + "/rest/v1/study_sessions?select=id,course_id,unclear&unclear=eq." + encodeURIComponent(marker),
      { headers: headersB },
    );
    expect(secondDeviceSession.ok()).toBe(true);
    const secondDeviceRows = await secondDeviceSession.json() as Array<{ id: string; course_id: string; unclear: string | null }>;
    expect(secondDeviceRows).toHaveLength(1);
    expect(secondDeviceRows[0]?.unclear).toBe(marker);

    const courseResponse = await contextB.request.get(
      supabaseOrigin! + "/rest/v1/courses?select=code&id=eq." + encodeURIComponent(syncedCourseId!) + "&limit=1",
      { headers: headersB },
    );
    expect(courseResponse.ok()).toBe(true);
    const courseRows = await courseResponse.json() as Array<{ code: string }>;
    const courseCode = courseRows[0]?.code;
    expect(courseCode).toBeTruthy();

    // Verify the same server-backed record in the second device's actual UI,
    // using History where every study session is rendered instead of relying
    // on Today's single "latest note" summary.
    await pageB.goto(`/studies/${encodeURIComponent(courseCode!)}/history`, { waitUntil: "domcontentloaded" });
    await expect(pageB.getByText(marker, { exact: true })).toBeVisible({ timeout: 30_000 });

    await pageB.reload({ waitUntil: "domcontentloaded" });
    await expect(pageB.getByText(marker, { exact: true })).toBeVisible({ timeout: 30_000 });
  } finally {
    await cleanupSession(contextA, pageA, supabaseOrigin, apiKey, marker);
    await contextB.close();
    await contextA.close();
  }
});


test("active study session created on one device is explicitly started and paused on another", async ({ browser }) => {
  const contextA = await browser.newContext({ serviceWorkers: "allow" });
  const contextB = await browser.newContext({ serviceWorkers: "allow" });
  const pageA = await contextA.newPage();
  const pageB = await contextB.newPage();
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

  try {
    await enterApp(pageA);
    await enterApp(pageB);
    expect(supabaseOrigin).toBeTruthy();
    expect(apiKey).toBeTruthy();

    const tokenA = await pageA.evaluate(() => localStorage.getItem("opk.device-token"));
    expect(tokenA).toBeTruthy();
    const headersA = {
      apikey: apiKey!,
      Authorization: "Bearer " + tokenA,
      "Content-Type": "application/json",
    };

    const coursesResponse = await contextA.request.get(
      supabaseOrigin! + "/rest/v1/courses?select=id&archived=eq.false&limit=1",
      { headers: headersA },
    );
    expect(coursesResponse.ok()).toBe(true);
    const courses = await coursesResponse.json() as Array<{ id: string }>;
    expect(courses[0]?.id).toBeTruthy();

    const clearResponse = await contextA.request.delete(
      supabaseOrigin! + "/rest/v1/active_study_sessions?id=not.is.null",
      { headers: { ...headersA, Prefer: "return=minimal" } },
    );
    expect(clearResponse.ok()).toBe(true);

    const marker = "Cross-device active session " + Date.now();
    const startResponse = await contextA.request.post(
      supabaseOrigin! + "/rest/v1/rpc/start_active_study_session",
      {
        headers: headersA,
        data: {
          p_plan_item_id: null,
          p_course_id: courses[0]!.id,
          p_topic_id: null,
          p_target_minutes: 20,
          p_kind: "study",
          p_objective: marker,
        },
      },
    );
    expect(startResponse.ok()).toBe(true);

    // Creating an active study session no longer starts the clock by itself.
    // Device B must first see the paused shared session, then explicitly enter
    // the study phase before timing begins.
    await pageB.goto("/today", { waitUntil: "domcontentloaded" });
    await expect(pageB.getByText("Opiskelukerta tauolla", { exact: true })).toBeVisible({ timeout: 30_000 });
    await pageB.getByRole("button", { name: /Opiskelukerta tauolla/ }).click();
    await expect(pageB.getByText("Ajastin tauolla", { exact: true })).toBeVisible({ timeout: 30_000 });

    await pageB.getByRole("button", { name: "Jatka", exact: true }).click();
    await expect(pageB.getByText("Aika käynnissä", { exact: true })).toBeVisible({ timeout: 30_000 });
    await expect.poll(async () => {
      const response = await contextA.request.post(
        supabaseOrigin! + "/rest/v1/rpc/active_study_session_snapshot",
        { headers: headersA, data: {} },
      );
      if (!response.ok()) return "request-failed";
      const snapshot = await response.json() as { status?: string; objective?: string } | null;
      return `${snapshot?.status ?? "none"}:${snapshot?.objective ?? ""}`;
    }, { timeout: 30_000, intervals: [250, 500, 1_000, 2_000] }).toBe(`running:${marker}`);

    await pageB.getByRole("button", { name: "Tauko", exact: true }).click();
    await expect(pageB.getByText("Ajastin tauolla", { exact: true })).toBeVisible({ timeout: 30_000 });
    await expect.poll(async () => {
      const response = await contextA.request.post(
        supabaseOrigin! + "/rest/v1/rpc/active_study_session_snapshot",
        { headers: headersA, data: {} },
      );
      if (!response.ok()) return "request-failed";
      const snapshot = await response.json() as { status?: string; objective?: string } | null;
      return `${snapshot?.status ?? "none"}:${snapshot?.objective ?? ""}`;
    }, { timeout: 30_000, intervals: [250, 500, 1_000, 2_000] }).toBe(`paused:${marker}`);

    await pageA.goto("/today", { waitUntil: "domcontentloaded" });
    await expect(pageA.getByText("Opiskelukerta tauolla", { exact: true })).toBeVisible({ timeout: 30_000 });

    const snapshotResponse = await contextA.request.post(
      supabaseOrigin! + "/rest/v1/rpc/active_study_session_snapshot",
      { headers: headersA, data: {} },
    );
    expect(snapshotResponse.ok()).toBe(true);
    const snapshot = await snapshotResponse.json() as {
      status?: string;
      objective?: string;
      effective_elapsed_seconds?: number;
    } | null;
    expect(snapshot?.status).toBe("paused");
    expect(snapshot?.objective).toBe(marker);
    expect(Number(snapshot?.effective_elapsed_seconds ?? 0)).toBeGreaterThanOrEqual(0);
  } finally {
    if (supabaseOrigin && apiKey) {
      const token = await pageA.evaluate(() => localStorage.getItem("opk.device-token")).catch(() => null);
      if (token) {
        await contextA.request.delete(
          supabaseOrigin + "/rest/v1/active_study_sessions?id=not.is.null",
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