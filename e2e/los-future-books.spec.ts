import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow } from "./helpers";

/** Local-only owner cache fixture. NEVER represents production authentication. */
async function enterFutureBook(page:import("@playwright/test").Page){
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
    window.localStorage.setItem("opk.device-authorized","Arthur");
    window.localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/2/01/chapter",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-book-workspace")).toBeVisible({timeout:30_000});
}

test("LOS! 2–8 show each book's own chapter 01/10 texts and source drafts without redirects",async({page})=>{
  await enterFutureBook(page);
  for(const book of [2,3,4,5,6,7,8]){
    for(const chapter of ["01","10"]){
      await page.goto(`/los#/${book}/${chapter}/text`,{waitUntil:"domcontentloaded"});
      await expect(page.locator(".los-book-workspace")).toBeVisible();
      const paper=page.locator(".los-book-paper");
      await expect(paper.locator(".los-reading-page")).toBeVisible();
      await expect(paper.getByRole("heading",{name:"Text A"})).toBeVisible();
      await expect(paper).toContainText("Sisältöesikatselu, ei valmis oppikirja");
      await expect(paper.locator('[lang="de"] p').first()).toBeVisible();
      await page.goto(`/los#/${book}/${chapter}/text-b`,{waitUntil:"domcontentloaded"});
      await expect(page.locator(".los-reading-page")).toBeVisible();
      await expect(page.getByRole("heading",{name:"Toinen tekstilaji"})).toBeVisible();
      await expect(page.getByRole("heading",{name:"Tukidialogi"})).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }
  }
});

test("LOS! 2–8 exercise pages use the source's exact 9/14/3 section distribution",async({page})=>{
  await enterFutureBook(page);
  for(const [section,count] of [["understand",9],["practice",14],["apply",3]] as const){
    await page.goto("/los#/2/01/"+section,{waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-future-exercise-card")).toBeVisible();
    await expect(page.locator(".los-future-exercise-select option")).toHaveCount(count);
    await expect(page.locator(".los-future-exercise-summary")).toContainText(`${count} tehtävää`);
  }
});

test("LOS! 2–8 answer drafts and review marks persist by owner/book/chapter without touching LOS! 1",async({page})=>{
  await enterFutureBook(page);
  const answer=page.locator("#los-future-exercise-input");
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await expect(answer).toBeVisible();
  await answer.fill("Antwort nur für LOS! 2.");
  await page.getByRole("button",{name:"Näytä vastausluonnos"}).click();
  await expect(page.locator(".los-future-exercise-solution")).toBeVisible();
  await page.getByRole("button",{name:"Olen verrannut vastaukseni"}).click();
  await expect(page.locator(".los-future-exercise-checked")).toContainText("Verrattu");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(answer).toHaveValue("Antwort nur für LOS! 2.");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("1 verrattu vastausluonnokseen");

  await page.goto("/los#/3/01/practice",{waitUntil:"domcontentloaded"});
  await expect(answer).toHaveValue("");
  await answer.fill("Antwort nur für LOS! 3.");
  await page.goto("/los#/2/02/practice",{waitUntil:"domcontentloaded"});
  await expect(answer).toHaveValue("");
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await expect(answer).toHaveValue("Antwort nur für LOS! 2.");
  const keys=await page.evaluate(()=>{
    const id=localStorage.getItem("opk.owner-id");
    return [
      localStorage.getItem(`los.local.v1.${id}.2.01`),
      localStorage.getItem(`los.local.v1.${id}.3.01`),
      localStorage.getItem(`los.local.v1.${id}.1.01`),
    ];
  });
  expect(keys[0]).toContain("Antwort nur für LOS! 2.");
  expect(keys[1]).toContain("Antwort nur für LOS! 3.");
  expect(keys[2]).toBeNull();
  await expectNoHorizontalOverflow(page);
});

test("LOS! 2–8 show all 60 source-written lessons while keeping exams non-executable",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/4/path",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-future-path-group")).toHaveCount(5);
  await expect(page.locator(".los-future-path-group li")).toHaveCount(60);
  await expect(page.locator(".los-future-path-group li button")).toHaveCount(60);
  await expect(page.locator("#los-future-lesson-runner")).toBeVisible();
  await expect(page.locator(".los-guided-review")).toContainText("Opettajan aloitus");
  await expect(page.getByText("0 valmiiksi hyväksyttyä ohjattua oppituntia")).toBeVisible();
  await page.getByRole("button",{name:/Tunti 2: Aloita ja ennakoi/}).click();
  await expect(page.locator(".los-guided-lesson-stage-nav button")).toHaveCount(6);
  await expect(page.locator(".los-guided-lesson-stage")).toContainText("Opettajan aloitus");
  await page.getByText("Kertaus ja välikoe",{exact:true}).click();
  await page.getByRole("button",{name:/Tunti 30: välikoe/i}).click();
  await expect(page.locator(".los-guided-review")).toContainText("Kokeen ohje, ei avattu arvioitava koe");
  await expect(page.locator(".los-future-exercise-card")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});

test("a source-guided lesson reuses chapter answers and persists its own reflection",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/path",{waitUntil:"domcontentloaded"});
  await page.getByRole("button",{name:/Tunti 2: Aloita ja ennakoi/}).click();
  const runner=page.locator("#los-future-lesson-runner");
  await expect(runner).toContainText("Meine kleine Welt");
  await runner.getByRole("button",{name:/Tehtävät ja itsekorjaus/}).click();
  await expect(runner.locator(".los-future-exercise-select option")).toHaveCount(5);
  await runner.locator("#los-future-exercise-input").fill("Harjoitustunnin ensimmäinen oma vastaus.");
  await runner.getByRole("button",{name:"Merkitse vaihe kokeilluksi"}).click();
  await expect(runner).toContainText("1/6 vaihetta kokeiltu");
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  await expect(page.locator("#los-future-exercise-input")).toHaveValue("Harjoitustunnin ensimmäinen oma vastaus.");
  await page.goto("/los#/2/path",{waitUntil:"domcontentloaded"});
  await expect(runner).toContainText("Aloita ja ennakoi");
  await runner.getByRole("button",{name:/Tunnin lopputarkistus/}).click();
  const reflection=runner.getByPlaceholder("Mikä onnistui? Mitä harjoittelet seuraavaksi?");
  await reflection.fill("Kertaan saksan persoonapäätteet.");
  // A fresh session must still restore the selected scene from the owner-scoped chapter draft.
  await page.evaluate(()=>sessionStorage.removeItem("los.future.guided.LOS2-L002.selectedStage"));
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(reflection).toHaveValue("Kertaan saksan persoonapäätteet.");
  await expect(runner.locator("#los-guided-lesson-stage-title")).toHaveText("Tunnin lopputarkistus");
  const separate=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return {
      b2:localStorage.getItem(`los.local.v1.${owner}.2.01`),
      b1:localStorage.getItem(`los.local.v1.${owner}.1.01`),
    };
  });
  expect(separate.b2).toContain("Kertaan saksan persoonapäätteet.");
  expect(separate.b1).toBeNull();
});
