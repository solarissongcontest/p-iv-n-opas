import { expect, test } from "@playwright/test";
import { enterApp, expectNoHorizontalOverflow } from "./helpers";

/**
 * Run on both desktop Chromium and iPhone WebKit.
 * These tests verify browser flow and persistence, not real-device audio QA.
 */
test("C07 L036 grouped alphabet, pause/resume and real book deep link",async({page})=>{
  await enterApp(page);
  await page.goto("/los-lessons/L036",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Aakkosten ja nimen kertaus"})).toBeVisible();
  await page.getByRole("button",{name:"Keskeytä oppitunti"}).click();
  await expect(page.getByRole("heading",{name:"Oppitunti keskeytetty"})).toBeVisible();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Oppitunti keskeytetty"})).toBeVisible();
  await page.getByRole("button",{name:"Jatka opetusta"}).first().click();
  await page.getByRole("navigation",{name:"Oppitunnin opetustilanteet"})
    .getByRole("button",{name:/Aakkoset ryhmittäin/}).click();
  await expect(page.getByText("OPETUSTAULU")).toBeVisible();
  await page.getByRole("button",{name:"Näytä kaikki"}).click();
  await expect(page.locator(".los-teacher-board-item")).toHaveCount(7);
  await expect(page.locator(".los-teacher-board")).toContainText("V /faʊ/");
  await page.getByRole("navigation",{name:"Oppitunnin opetustilanteet"})
    .getByRole("button",{name:"Tee kolme oikeaa C07-tehtävää"}).click();
  const link=page.getByRole("link",{name:/Avaa kirjassa/}).first();
  await expect(link).toHaveAttribute("href",/lessonReturn=L036.*#\/1\/07\/vocabulary/);
  const [book]=await Promise.all([page.waitForEvent("popup"),link.click()]);
  await expect(book).toHaveURL(/\/los\?lessonReturn=L036#\/1\/07\/vocabulary/);
  await expect(book.getByRole("link",{name:/Palaa oppitunnille L036/})).toBeVisible();
  await book.close();
  await expect(page.locator(".los-teacher-app")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("C07 L037 shows five real source turns and same textbook comprehension checks",async({page})=>{
  await enterApp(page);
  await page.goto("/los-lessons/L037",{waitUntil:"domcontentloaded"});
  await page.getByRole("navigation",{name:"Oppitunnin opetustilanteet"})
    .getByRole("button",{name:"Kaikki viisi alkuperäistä puheenvuoroa"}).click();
  await page.getByRole("button",{name:"Näytä kaikki"}).click();
  await expect(page.locator(".los-teacher-board-item")).toHaveCount(5);
  await expect(page.locator(".los-teacher-board")).toContainText("Bitte buchstabieren Sie.");
  await page.goto("/los#/1/07/text",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-c01-turn")).toHaveCount(5);
  await expect(page.locator(".los-c01-attribution")).toContainText("Wikibooks");
  await page.goto("/los#/1/07/understand",{waitUntil:"domcontentloaded"});
  const questions=page.locator("fieldset.los-c01-question");
  await expect(questions).toHaveCount(5);
  await expect(questions.nth(0)).toContainText("Wie schreibt man das?");
  await expect(questions.nth(1)).toContainText("Kuka pyytää");
  await expect(questions.nth(2)).toContainText("zweimal");
  await expectNoHorizontalOverflow(page);
});

test("C07 L039 form saves two fictional fields and Text B cannot earn listening points",async({page})=>{
  await enterApp(page);
  await page.goto("/los-lessons/L039",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Kuuntele ja täytä lomake"})).toBeVisible();
  await page.getByRole("navigation",{name:"Oppitunnin opetustilanteet"})
    .getByRole("button",{name:"Täytä kaksikenttäinen harjoituslomake"}).click();
  await expect(page.getByText(/Kentät eivät perustu varmentamattomaan kuunteluun/)).toBeVisible();
  await page.getByLabel("Nimi (keksitty)").fill("Mia");
  await page.getByLabel("Harjoituskoodi (ei puhelinnumero)").fill("1742");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.getByLabel("Nimi (keksitty)")).toHaveValue("Mia");
  await expect(page.getByLabel("Harjoituskoodi (ei puhelinnumero)")).toHaveValue("1742");
  await page.goto("/los#/1/07/text-b",{waitUntil:"domcontentloaded"});
  await expect(page.getByText("C07:n aakkosäänite odottaa hyväksyntää.")).toBeVisible();
  await expect(page.locator(".los-secondary-source audio")).toHaveCount(0);
  await expect(page.getByText(/ei.*sanatarkka transkriptio/).first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("C07 L040 displays actual 15-item chapter assessment separately from Teacher completion",async({page})=>{
  await enterApp(page);
  await page.goto("/los-lessons/L040",{waitUntil:"domcontentloaded"});
  await page.getByRole("navigation",{name:"Oppitunnin opetustilanteet"})
    .getByRole("button",{name:"Palauta C07:n 15 osatehtävää"}).click();
  await expect(page.getByRole("region",{name:"Kappaletestin ja itsearvioinnin tilanne"})).toContainText("Kappaletesti: 0/15");
  await page.goto("/los#/1/07/test",{waitUntil:"domcontentloaded"});
  await expect(page.locator("fieldset").count()).resolves.toBeGreaterThan(0);
  await expectNoHorizontalOverflow(page);
});
