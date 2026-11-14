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

/** Select the real open-response T18 exercise, rather than assuming every
 * source task renders the legacy textarea. T07 is now a working inline gap. */
async function selectOpenDraftExercise(page:import("@playwright/test").Page){
  const picker=page.locator("#los-future-exercise-choice");
  await expect(picker).toBeVisible();
  const options=await picker.locator("option").allTextContents();
  const index=options.findIndex(label=>label.trim().startsWith("T18 ·"));
  expect(index,"T18 open-response exercise must be listed").toBeGreaterThanOrEqual(0);
  await picker.selectOption({index});
  const answer=page.locator("#los-future-exercise-input");
  await expect(answer).toBeVisible();
  return answer;
}

test("LOS! 2–8 answer drafts and review marks persist by owner/book/chapter without touching LOS! 1",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  const answer=await selectOpenDraftExercise(page);
  await answer.fill("Antwort nur für LOS! 2.");
  await page.getByRole("button",{name:"Näytä vastausluonnos"}).click();
  await expect(page.locator(".los-future-exercise-solution")).toBeVisible();
  await page.getByRole("button",{name:"Olen verrannut vastaukseni"}).click();
  await expect(page.locator(".los-future-exercise-checked")).toContainText("Verrattu");
  await page.reload({waitUntil:"domcontentloaded"});
  await selectOpenDraftExercise(page);
  await expect(answer).toHaveValue("Antwort nur für LOS! 2.");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("1 verrattu vastausluonnokseen");

  await page.goto("/los#/3/01/practice",{waitUntil:"domcontentloaded"});
  await selectOpenDraftExercise(page);
  await expect(answer).toHaveValue("");
  await answer.fill("Antwort nur für LOS! 3.");
  await page.goto("/los#/2/02/practice",{waitUntil:"domcontentloaded"});
  await selectOpenDraftExercise(page);
  await expect(answer).toHaveValue("");
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await selectOpenDraftExercise(page);
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


test("LOS! 2 interactive vocabulary matching saves choices across reload without grading or erasing legacy drafts",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  await page.locator("#los-future-exercise-choice").selectOption({index:4});
  const matching=page.getByRole("group",{name:"Yhdistä saksan sana ja sen merkitys"});
  await expect(matching).toBeVisible();
  await matching.getByRole("combobox",{name:"Suomennos sanalle der Freund"}).selectOption("ystävä");
  await matching.getByRole("combobox",{name:"Suomennos sanalle die Freundin"}).selectOption("ystävä (naispuolinen)");
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator("#los-future-exercise-choice").selectOption({index:4});
  await expect(page.getByRole("combobox",{name:"Suomennos sanalle der Freund"})).toHaveValue("ystävä");
  await expect(page.getByRole("combobox",{name:"Suomennos sanalle die Freundin"})).toHaveValue("ystävä (naispuolinen)");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("0 verrattu vastausluonnokseen");
});

test("LOS! 2–8 chapter Teacher 2.0 shares its own saved exercises, paused scene, and non-completion gate",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/path",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-future-teacher-link")).toHaveCount(50);
  await page.locator(".los-future-teacher-link").first().click();
  await expect(page).toHaveURL(/\/los-lessons\/LOS2-L002$/);
  await expect(page.locator(".los-teacher-editorial-gate")).toContainText("ei muodosta");
  await expect(page.locator(".los-teacher-book")).toContainText("LOS! 2 · SAB32");
  const outline=page.locator(".los-teacher-outline nav button");
  await outline.nth(1).click();
  const recall=page.getByRole("textbox",{name:"Mitä muistat ennestään tästä aiheesta?"});
  await recall.fill("Muistan saksan sanan Hallo.");
  await page.getByRole("button",{name:"Keskeytä oppitunti"}).click();
  await expect(page.locator(".los-teacher-paused")).toBeVisible();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paused")).toBeVisible();
  await page.getByRole("button",{name:"Jatka opetusta"}).first().click();
  await expect(recall).toHaveValue("Muistan saksan sanan Hallo.");
  await outline.nth(5).click();
  await expect(page.locator(".los-future-exercises")).toBeVisible();
  await page.locator("#los-future-exercise-input").fill("Oma lähdetekstin ennakointi.");
  await outline.last().click();
  await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
  await expect(page.locator(".los-teacher-completion-checklist")).toContainText("käsikirjoitusluonnos");
  const records=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return {book2:localStorage.getItem("los.local.v1."+owner+".2.01"),book1:localStorage.getItem("los.local.v1."+owner+".1.01")};
  });
  expect(records.book2).toContain("LOS2-L002");
  expect(records.book2).toContain("Oma lähdetekstin ennakointi.");
  expect(records.book1).toBeNull();
  await page.goto("/los-lessons/LOS3-L002",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-book")).toContainText("LOS! 3 · SAB33");
  await expect(page.locator(".los-teacher-editorial-gate")).toBeVisible();
  await expect(page.locator(".los-teacher-outline nav button")).toHaveCount(9);
});

test("LOS! 5 source gap exercise keeps punctuation and saves the exact draft on reload",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/5/07/practice",{waitUntil:"domcontentloaded"});
  const field=page.getByRole("textbox",{name:"Puuttuva saksankielinen sana tai ilmaus"});
  await expect(field).toBeVisible();
  await expect(page.locator(".los-future-gap-sentence")).toContainText("Ich");
  await field.fill("denke,");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(field).toHaveValue("denke,");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("0 verrattu vastausluonnokseen");
  await expect(page.locator(".los-future-exercise-notice")).toContainText("ei tarkistettu automaattinen arvostelu");
});

test("LOS! 8 ordered words assemble into the same original answer and survive reload",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/8/10/practice",{waitUntil:"domcontentloaded"});
  await page.locator("#los-future-exercise-choice").selectOption({index:1});
  const pieces=page.getByRole("group",{name:"Lauseen rakennuspalat"});
  await expect(pieces).toBeVisible();
  await pieces.getByRole("button",{name:"Ich",exact:true}).click();
  await pieces.getByRole("button",{name:"denke,",exact:true}).click();
  await expect(page.locator(".los-future-ordering-answer")).toHaveText("Ich denke,");
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator("#los-future-exercise-choice").selectOption({index:1});
  await expect(page.locator(".los-future-ordering-answer")).toHaveText("Ich denke,");
  await page.getByRole("button",{name:"Poista viimeinen"}).click();
  await expect(page.locator(".los-future-ordering-answer")).toHaveText("Ich");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("0 verrattu vastausluonnokseen");
});

test("LOS! 2 source R02 no longer reveals the answer before assembling its shuffled words",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  await page.locator("#los-future-exercise-choice").selectOption({index:7});
  const card=page.locator(".los-future-exercise-card");
  await expect(card.locator(".los-future-exercise-question")).toContainText("Järjestä sanapalat");
  await expect(card.locator(".los-future-exercise-question")).not.toContainText("Am Montag trifft sie Jonas in einem Deutschkurs.");
  const pieces=page.getByRole("group",{name:"Lauseen rakennuspalat"});
  await expect(pieces).toBeVisible();
  await pieces.getByRole("button",{name:"Am",exact:true}).click();
  await pieces.getByRole("button",{name:"Montag",exact:true}).click();
  await expect(card.locator(".los-future-ordering-answer")).toHaveText("Am Montag");
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator("#los-future-exercise-choice").selectOption({index:7});
  await expect(card.locator(".los-future-ordering-answer")).toHaveText("Am Montag");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("0 verrattu vastausluonnokseen");
});

test("LOS! 2 T06 uses six independent recall fields with saved text across reload, not fake grading",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  const picker=page.locator("#los-future-exercise-choice");
  const labels=await picker.locator("option").allTextContents();
  const index=labels.findIndex(label=>label.trim().startsWith("T06 ·"));
  expect(index).toBeGreaterThanOrEqual(0);
  await picker.selectOption({index});
  const recall=page.getByRole("group",{name:"Palauta kuusi sanaa muistista"});
  await expect(recall).toBeVisible();
  const answers=recall.locator("input");
  await expect(answers).toHaveCount(6);
  await answers.nth(0).fill("der Freund");
  await answers.nth(1).fill("die Freundin");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("1 vastattu");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("0 verrattu vastausluonnokseen");
  await page.reload({waitUntil:"domcontentloaded"});
  await picker.selectOption({index});
  await expect(recall.locator("input").nth(0)).toHaveValue("der Freund");
  await expect(recall.locator("input").nth(1)).toHaveValue("die Freundin");
  await expect(recall.locator("input").nth(2)).toHaveValue("");
  await expect(page.locator(".los-future-exercise-solution")).toHaveCount(0);
  const stored=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return localStorage.getItem(`los.local.v1.${owner}.2.01`)??"";
  });
  expect(stored).toContain("der Freund");
  expect(stored).toContain("die Freundin");
  await expectNoHorizontalOverflow(page);
});


test("LOS! 2–8 practice dashboard restores the first untried stage across reloads and keeps book totals separate",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/overview",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("button",{name:"Opetuspolku",exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Opetuspolku",exact:true}).click();
  const dashboard=page.locator(".los-future-progress");
  await expect(dashboard).toContainText("0/300");
  await expect(dashboard).toContainText("0/260");
  await page.getByRole("button",{name:/Tunti 2: Aloita ja ennakoi/}).click();
  const lesson=page.locator("#los-future-lesson-runner");
  await lesson.getByRole("button",{name:"Merkitse vaihe kokeilluksi"}).click();
  await expect(dashboard).toContainText("1/300");
  await expect(dashboard).toContainText("1/50");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(dashboard).toContainText("1/300");
  await dashboard.getByRole("button",{name:"Jatka oppitunnista 002"}).click();
  await expect(lesson.getByRole("heading",{name:"Mallin purku"})).toBeVisible();
  await lesson.getByRole("button",{name:"Merkitse vaihe kokeilluksi"}).click();
  await expect(dashboard).toContainText("2/300");
  await dashboard.getByRole("button",{name:"Näytä kappaleittain"}).click();
  await expect(dashboard.locator(".los-future-progress-chapters li")).toHaveCount(10);
  await expect(dashboard.locator(".los-future-progress-chapters li").first()).toContainText("2/30 vaihetta");

  await page.goto("/los#/3/path",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-future-progress")).toContainText("0/300");
  await page.goto("/los#/2/path",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-future-progress")).toContainText("2/300");
  await expectNoHorizontalOverflow(page);
});

test("LOS! 2 backup import restores exercise answers and guided self-checks without spilling into another book",async({page})=>{
  await enterFutureBook(page);
  const draft={
    version:1,note:"My private German practice.",applicationDraft:"",bookmarked:false,
    practiceAnswers:{"LOS2-C01-T07":"lernen"},
    practiceChecked:["los.future.guided:LOS2-L002:start"],
    testAnswers:{},testSubmittedAt:null,selfAssessment:"",updatedAt:"2026-11-14T00:00:00.000Z",
  };
  const payload=Buffer.from(JSON.stringify({
    format:"los-future-book-backup-v1",bookId:2,
    exportedAt:"2026-11-14T00:00:00.000Z",chapters:{"01":draft},
  }),"utf8");
  await page.goto("/los#/2/appendix",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Varmuuskopioi harjoittelu ja siirrä se laitteiden välillä"})).toBeVisible();
  await page.locator('.los-backup-section input[type="file"]').setInputFiles({
    name:"LOS-2-testi.json",mimeType:"application/json",buffer:payload,
  });
  await expect(page.locator(".los-backup-preview")).toContainText("LOS! 2");
  await page.getByRole("button",{name:"Tuo vain puuttuvat (1)"}).click();
  await expect(page.locator(".los-backup-status")).toContainText("Tuotu 1 kappaleen tallennusta");
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await expect(page.locator("#los-future-gap-input")).toHaveValue("lernen");
  await page.goto("/los#/2/path",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-future-progress")).toContainText("1/300");
  await expect(page.locator(".los-future-progress")).toContainText("1/260");
  await page.goto("/los#/3/01/practice",{waitUntil:"domcontentloaded"});
  await expect(page.locator("#los-future-gap-input")).toHaveValue("");
  await page.goto("/los#/3/appendix",{waitUntil:"domcontentloaded"});
  await page.locator('.los-backup-section input[type="file"]').setInputFiles({
    name:"LOS-2-testi.json",mimeType:"application/json",buffer:payload,
  });
  await expect(page.locator(".los-backup-status")).toContainText("kuuluu kirjaan LOS! 2");
  await expect(page.locator(".los-backup-preview")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});

test("LOS! 2 download offers a private book-specific file instead of claiming cloud sync",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/appendix",{waitUntil:"domcontentloaded"});
  const [download]=await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button",{name:"Vie LOS! 2:n varmuuskopio"}).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/^LOS-2-varmuuskopio-\d{4}-\d{2}-\d{2}\.json$/);
  await expect(page.locator(".los-backup-status")).toContainText("Ladattiin LOS! 2:n varmuuskopio");
  await expect(page.locator(".los-backup-section")).toContainText("ei ole automaattinen pilvisynkronointi");
  await expectNoHorizontalOverflow(page);
});


test("LOS! 7 T20 preserves two independently written answers across reload without early model reveal",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/7/01/apply",{waitUntil:"domcontentloaded"});
  const picker=page.locator("#los-future-exercise-choice");
  const labels=await picker.locator("option").allTextContents();
  const index=labels.findIndex(label=>label.trim().startsWith("T20 ·"));
  expect(index).toBeGreaterThanOrEqual(0);
  await picker.selectOption({index});
  const ticket=page.getByRole("group",{name:"Kaksi itsenäistä lopputarkistusta"});
  await expect(ticket).toBeVisible();
  const answers=ticket.locator("textarea");
  await expect(answers).toHaveCount(2);
  await answers.nth(0).fill("arbeiten");
  await answers.nth(1).fill("Koska hän haluaa oppia lisää.");
  await expect(page.locator(".los-future-exercise-solution")).toHaveCount(0);
  await page.reload({waitUntil:"domcontentloaded"});
  await picker.selectOption({index});
  await expect(ticket.locator("textarea").nth(0)).toHaveValue("arbeiten");
  await expect(ticket.locator("textarea").nth(1)).toHaveValue("Koska hän haluaa oppia lisää.");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("1 vastattu");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("0 verrattu vastausluonnokseen");
  await expectNoHorizontalOverflow(page);
});
