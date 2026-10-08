import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

test.describe("Progress trajectory", () => {
  test("Progress renders a real plan curve, Today marker and all three views without escaping the iPhone viewport", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await enterApp(page);
    await page.goto("/progress", { waitUntil: "domcontentloaded" });

    const card = page.locator(".progress-trajectory-card").first();
    await expect(card).toBeVisible();
    await expect(page.getByText("Suunnitelmassa pysyminen", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Eteneminen", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Työmäärä", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Harjoitusnäyttö", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Päivittäin", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Koko kurssi", exact: true })).toBeVisible();
    await expect(page.getByText(/Tänään \d{1,2}\.\d{1,2}\./).first()).toBeVisible();

    const plot = page.getByTestId("trajectory-main-plot").first();
    await expect(plot).toBeVisible();
    const marks = await plot.evaluate(node => {
      const plan = node.querySelector<SVGPathElement>('[data-trajectory-series="plan"]');
      const actual = node.querySelector<SVGPathElement>('[data-trajectory-series="actual"]');
      const planBox = plan?.getBBox();
      const actualBox = actual?.getBBox();
      const planStyle = plan ? getComputedStyle(plan) : null;
      return {
        planD: plan?.getAttribute("d") ?? "",
        planWidth: planBox?.width ?? 0,
        planHeight: planBox?.height ?? 0,
        planStroke: planStyle?.stroke ?? "none",
        planOpacity: planStyle?.opacity ?? "0",
        actualD: actual?.getAttribute("d") ?? "",
        actualWidth: actualBox?.width ?? 0,
        actualHeight: actualBox?.height ?? 0,
        dots: node.querySelectorAll("[data-trajectory-dot]").length,
      };
    });
    expect(marks.planD.length).toBeGreaterThan(8);
    expect(marks.planWidth).toBeGreaterThan(20);
    expect(marks.planHeight).toBeGreaterThan(2);
    expect(marks.planStroke).not.toBe("none");
    expect(Number(marks.planOpacity)).toBeGreaterThan(0);
    expect(marks.actualD.length + marks.dots).toBeGreaterThan(0);

    await expect(page.getByLabel("Etenemisen luvut")).toBeVisible();
    await expect(page.getByText("Opiskelupäivien ero", { exact: true })).toBeVisible();
    await expect(page.getByTestId("trajectory-deviation-plot")).toBeVisible();

    await page.getByRole("button", { name: "Työmäärä", exact: true }).click();
    await expect(page.getByRole("img", { name: /työmäärä/ })).toBeVisible();
    await page.getByRole("button", { name: "Harjoitusnäyttö", exact: true }).click();
    await expect(page.getByRole("img", { name: /harjoitusnäyttö/ })).toBeVisible();
    await expect(page.getByText(/Harjoitusnäyttö on enintään 20 viimeisimmän harjoitusyrityksen painotettu onnistumispiste/)).toBeVisible();
    await expect(page.getByText(/Se ei ole kurssin osaamisprosentti, arvosanaennuste eikä arvio koko sisällön hallinnasta/)).toBeVisible();

    const geometry = await page.evaluate(() => {
      const card = document.querySelector<HTMLElement>(".progress-trajectory-card");
      const body = card?.querySelector<HTMLElement>(".study-card-body") ?? null;
      const contentTabs = card?.querySelector<HTMLElement>('[aria-label="Kuvaajan sisältö"]') ?? null;
      const rangeTabs = card?.querySelector<HTMLElement>('[aria-label="Kuvaajan tarkkuus"]') ?? null;
      const legend = card?.querySelector<HTMLElement>('[aria-label="Kuvaajan selite"]') ?? null;
      const scroller = card?.querySelector<HTMLElement>(".overflow-x-auto") ?? null;
      const rect = (node: HTMLElement | null) => {
        if (!node) return null;
        const box = node.getBoundingClientRect();
        return { left: box.left, right: box.right, width: box.width };
      };
      return {
        viewportWidth: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        card: rect(card),
        body: rect(body),
        contentTabs: rect(contentTabs),
        rangeTabs: rect(rangeTabs),
        legend: rect(legend),
        scroller: rect(scroller),
        scrollerClientWidth: scroller?.clientWidth ?? 0,
        scrollerScrollWidth: scroller?.scrollWidth ?? 0,
      };
    });

    expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
    expect(geometry.card).not.toBeNull();
    expect(geometry.body).not.toBeNull();
    expect(geometry.contentTabs).not.toBeNull();
    expect(geometry.rangeTabs).not.toBeNull();
    expect(geometry.legend).not.toBeNull();
    expect(geometry.scroller).not.toBeNull();
    for (const box of [geometry.card, geometry.body, geometry.contentTabs, geometry.rangeTabs, geometry.legend, geometry.scroller]) {
      expect(box!.left).toBeGreaterThanOrEqual(-1);
      expect(box!.right).toBeLessThanOrEqual(geometry.viewportWidth + 1);
    }
    expect(geometry.scrollerClientWidth).toBeLessThanOrEqual(geometry.card!.width + 1);
    expect(geometry.scrollerScrollWidth).toBeGreaterThanOrEqual(geometry.scrollerClientWidth);

    await expect(page.getByRole("button", { name: "Edellinen päivä" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Seuraava päivä" })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await testInfo.attach("progress-trajectory-mobile-contained.png", {
      body: await page.screenshot({ fullPage: true, animations: "disabled" }),
      contentType: "image/png",
    });
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
    await expect(page.getByRole("button", { name: "Harjoitusnäyttö", exact: true })).toBeVisible();
    await expect(page.getByText("Etenemiskäytävä ja ennuste", { exact: true })).toBeHidden();
  });
});
