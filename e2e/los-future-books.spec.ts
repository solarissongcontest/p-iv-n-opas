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

/** Pick the manuscript task by stable suffix rather than its display label.
 * Answered/checked options append a status glyph, so exact label selectors
 * are not stable across reload. Wait for React to render before reading options. */
async function selectFutureTask(page:import("@playwright/test").Page,suffix:string){
  const picker=page.locator("#los-future-exercise-choice");
  await expect(picker).toBeVisible();
  await expect(picker.locator("option").filter({hasText:new RegExp("^"+suffix+" ·")})).toHaveCount(1);
  const options=await picker.locator("option").allTextContents();
  const index=options.findIndex(label=>label.trim().startsWith(suffix+" ·"));
  expect(index,"Source task "+suffix+" is listed for the current book and section").toBeGreaterThanOrEqual(0);
  await picker.selectOption({index});
  return picker;
}
/** T16 now has two separate authored responses, not a legacy generic textarea. */
async function selectOpenDraftExercise(page:import("@playwright/test").Page){
  await selectFutureTask(page,"T16");
  const answer=page.locator(".los-future-remaining-row textarea").first();
  await expect(page.locator(".los-future-remaining-row textarea")).toHaveCount(2);
  await expect(answer).toBeVisible();
  return answer;
}

test("LOS! 2–8 answer drafts and review marks persist by owner/book/chapter without touching LOS! 1",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  const answer=await selectOpenDraftExercise(page);
  await answer.fill("Antwort nur für LOS! 2.");
  await page.locator(".los-future-remaining-row textarea").nth(1)
    .fill("Tarkistin sanajärjestyksen ja kysymysmerkin.");
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

test("LOS! 2–8 show all 60 lessons and protect local paper exam answer keys",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/4/path",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-future-path-group")).toHaveCount(5);
  await expect(page.locator(".los-future-path-group li")).toHaveCount(60);
  await expect(page.locator(".los-future-path-group li button")).toHaveCount(60);
  await expect(page.locator("#los-future-lesson-runner")).toBeVisible();
  await expect(page.locator(".los-review-practice")).toContainText("Muistista palautus");
  await expect(page.getByText("0 valmiiksi hyväksyttyä ohjattua oppituntia")).toBeVisible();
  await page.getByRole("button",{name:/Tunti 2: Aloita ja ennakoi/}).click();
  await expect(page.locator(".los-guided-lesson-stage-nav button")).toHaveCount(6);
  await expect(page.locator(".los-guided-lesson-stage")).toContainText("Opettajan aloitus");
  await page.getByText("Kertaus ja välikoe",{exact:true}).click();
  await page.getByRole("button",{name:/Tunti 30: välikoe/i}).click();
  await expect(page.locator(".los-guided-review")).toContainText("Kirjallinen harjoituskoe, ei hyväksytty arviointikoe");
  await expect(page.locator(".los-future-exam")).toBeVisible();
  await expect(page.locator(".los-future-exam-model")).toHaveCount(0);
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
  const prediction=runner.locator(".los-future-remaining-row textarea");
  await expect(prediction).toHaveCount(3);
  await prediction.nth(0).fill("Harjoitustunnin ensimmäinen oma vastaus.");
  await prediction.nth(1).fill("He tutustuvat kielikurssilla.");
  await prediction.nth(2).fill("Ensimmäinen ennustukseni vastasi päätekstiä.");
  await runner.getByRole("button",{name:"Merkitse vaihe kokeilluksi"}).click();
  await expect(runner).toContainText("1/6 vaihetta kokeiltu");
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-future-remaining-row textarea").first()).toHaveValue("Harjoitustunnin ensimmäinen oma vastaus.");
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
  // The vocabulary-check scene is optional and takes slot 6; select by
  // the actual scene title, not by its changing position.
  await outline.filter({hasText:"Tämän tunnin omat tehtävät"}).click();
  await expect(page.locator(".los-future-exercises")).toBeVisible();
  const teacherPrediction=page.locator(".los-future-remaining-row textarea");
  await expect(teacherPrediction).toHaveCount(3);
  await teacherPrediction.first().fill("Oma lähdetekstin ennakointi.");
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
  // Both chapters have the same scripted optional vocabulary-check scene.
  // This is 10 scenes, not the old nine-scene placeholder outline.
  await expect(page.locator(".los-teacher-outline nav button")).toHaveCount(10);
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
  const reveal=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(reveal).toBeDisabled();
  await answers.nth(0).fill("arbeiten");
  await expect(reveal).toBeDisabled();
  await answers.nth(1).fill("Koska hän haluaa oppia lisää.");
  await expect(reveal).toBeEnabled();
  await expect(page.locator(".los-future-exercise-solution")).toHaveCount(0);
  await page.reload({waitUntil:"domcontentloaded"});
  await picker.selectOption({index});
  await expect(ticket.locator("textarea").nth(0)).toHaveValue("arbeiten");
  await expect(ticket.locator("textarea").nth(1)).toHaveValue("Koska hän haluaa oppia lisää.");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("1 vastattu");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("0 verrattu vastausluonnokseen");
  await expectNoHorizontalOverflow(page);
});

test("LOS! 2–8 T09 and T12 one-line exercises save under original task IDs with delayed self-review",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  const picker=page.locator("#los-future-exercise-choice");
  const options=await picker.locator("option").allTextContents();
  const translation=options.findIndex(label=>label.trim().startsWith("T09 ·"));
  const grammar=options.findIndex(label=>label.trim().startsWith("T12 ·"));
  expect(translation).toBeGreaterThanOrEqual(0);
  expect(grammar).toBeGreaterThanOrEqual(0);

  await picker.selectOption({index:translation});
  const short=page.locator("#los-future-short-input");
  await expect(short).toBeVisible();
  await expect(short).toHaveAttribute("lang","de");
  const reveal=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(reveal).toBeDisabled();
  await short.fill("Ich lerne jeden Tag Deutsch.");
  await expect(reveal).toBeEnabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await picker.selectOption({index:translation});
  await expect(short).toHaveValue("Ich lerne jeden Tag Deutsch.");
  await expect(page.locator(".los-future-exercise-solution")).toHaveCount(0);

  await picker.selectOption({index:grammar});
  await expect(short).toBeVisible();
  await expect(short).not.toHaveAttribute("lang","de");
  await expect(short).toHaveValue("");
  await short.fill("Wir lernen Deutsch.");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("2 vastattu");
  await page.goto("/los#/3/01/practice",{waitUntil:"domcontentloaded"});
  const picker3=page.locator("#los-future-exercise-choice");
  const options3=await picker3.locator("option").allTextContents();
  const grammar3=options3.findIndex(label=>label.trim().startsWith("T12 ·"));
  expect(grammar3).toBeGreaterThanOrEqual(0);
  await picker3.selectOption({index:grammar3});
  await expect(page.locator("#los-future-short-input")).toHaveValue("");
  await expectNoHorizontalOverflow(page);
});

test("legacy T20 free-text work remains readable, reviewable and untouched by the two-field migration",async({page})=>{
  await enterFutureBook(page);
  const key=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return `los.local.v1.${owner}.2.10`;
  });
  const original="(1) Oma aiempi vastaukseni. (2) Toinen selitykseni.";
  await page.evaluate(({key,original})=>localStorage.setItem(key,JSON.stringify({
    version:1,note:"",applicationDraft:"",bookmarked:false,
    practiceAnswers:{"LOS2-C10-T20":original},practiceChecked:[],
    testAnswers:{},testSubmittedAt:null,selfAssessment:"",
    updatedAt:"2026-11-14T00:00:00.000Z",
  })),{key,original});
  await page.goto("/los#/2/10/apply",{waitUntil:"domcontentloaded"});
  const picker=page.locator("#los-future-exercise-choice");
  const labels=await picker.locator("option").allTextContents();
  const index=labels.findIndex(label=>label.trim().startsWith("T20 ·"));
  expect(index).toBeGreaterThanOrEqual(0);
  await picker.selectOption({index});
  await expect(page.getByRole("group",{name:"Kaksi itsenäistä lopputarkistusta"})).toHaveCount(0);
  await expect(page.locator("#los-future-exercise-input")).toHaveValue(original);
  const reveal=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(reveal).toBeEnabled();
  await reveal.click();
  await expect(page.locator(".los-future-exercise-solution")).toBeVisible();
  await page.getByRole("button",{name:"Olen verrannut vastaukseni"}).click();
  const saved=await page.evaluate(key=>localStorage.getItem(key),key);
  expect(JSON.parse(saved??"{}").practiceAnswers["LOS2-C10-T20"]).toBe(original);
  await page.reload({waitUntil:"domcontentloaded"});
  await picker.selectOption({index});
  await expect(page.locator("#los-future-exercise-input")).toHaveValue(original);
  await expectNoHorizontalOverflow(page);
});

test("LOS! 2 reading T02 accepts an independent Finnish evidence answer, saves and never auto-scores",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  const picker=page.locator("#los-future-exercise-choice");
  const labels=await picker.locator("option").allTextContents();
  const index=labels.findIndex(label=>label.trim().startsWith("T02 ·"));
  expect(index).toBeGreaterThanOrEqual(0);
  await picker.selectOption({index});
  const answer=page.locator("#los-future-short-input");
  await expect(answer).toBeVisible();
  await expect(answer).toHaveAttribute("lang","fi");
  const reveal=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(reveal).toBeDisabled();
  await answer.fill("Henkilöt keskustelevat siitä, missä he asuvat.");
  await expect(reveal).toBeEnabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await picker.selectOption({index});
  await expect(answer).toHaveValue("Henkilöt keskustelevat siitä, missä he asuvat.");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("0 verrattu vastausluonnokseen");
  await expect(page.locator(".los-future-exercise-solution")).toHaveCount(0);
  await page.goto("/los#/4/01/understand",{waitUntil:"domcontentloaded"});
  const options4=await page.locator("#los-future-exercise-choice option").allTextContents();
  const index4=options4.findIndex(label=>label.trim().startsWith("T02 ·"));
  expect(index4).toBeGreaterThanOrEqual(0);
  await page.locator("#los-future-exercise-choice").selectOption({index:index4});
  await expect(page.locator("#los-future-short-input")).toHaveValue("");
  await expectNoHorizontalOverflow(page);
});

test("LOS! 5 medical vocabulary matching accepts the same Finnish meaning for Arzt and Ärztin",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/5/03/understand",{waitUntil:"domcontentloaded"});
  const picker=page.locator("#los-future-exercise-choice");
  const list=await picker.locator("option").allTextContents();
  const index=list.findIndex(label=>label.trim().startsWith("T05 ·"));
  expect(index).toBeGreaterThanOrEqual(0);
  await picker.selectOption({index});
  const matching=page.getByRole("group",{name:"Yhdistä saksan sana ja sen merkitys"});
  await expect(matching).toBeVisible();
  const doctor=matching.getByRole("combobox",{name:"Suomennos sanalle der Arzt",exact:true});
  const doctorF=matching.getByRole("combobox",{name:"Suomennos sanalle die Ärztin",exact:true});
  await doctor.selectOption("lääkäri");
  await doctorF.selectOption("lääkäri");
  await expect(doctor).toHaveValue("lääkäri");
  await expect(doctorF).toHaveValue("lääkäri");
  await page.reload({waitUntil:"domcontentloaded"});
  await picker.selectOption({index});
  await expect(doctor).toHaveValue("lääkäri");
  await expect(doctorF).toHaveValue("lääkäri");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("1 vastattu");
  await expect(page.locator(".los-future-exercise-summary")).toContainText("0 verrattu vastausluonnokseen");
  await expectNoHorizontalOverflow(page);
});

test("LOS! 2 review L027 resumes written recall, shared exercise and self-assessment without a fake grade",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/path",{waitUntil:"domcontentloaded"});
  await page.locator(".los-future-path-group").nth(2).locator("summary").click();
  await page.getByRole("button",{name:/Tunti 27: ensimmäinen kertaus/i}).click();
  const review=page.locator(".los-review-practice");
  await expect(review).toBeVisible();
  const steps=page.getByRole("navigation",{name:"Kertausoppitunnin vaiheet"});
  await expect(steps.getByRole("button")).toHaveCount(4);
  await review.getByRole("textbox",{name:"Omat aikaisemmat tiedot ja kysymykset"}).fill("Wir lernen Deutsch.");
  await steps.getByRole("button",{name:/Opettajan kertaus/}).click();
  await expect(review.locator(".los-review-vocab-board>div")).toHaveCount(4);
  await expect(review.locator("blockquote[lang='de']")).toBeVisible();
  await steps.getByRole("button",{name:/Ohjattu harjoittelu/}).click();
  const task=review.locator("#los-future-short-input");
  await expect(task).toBeVisible();
  await task.fill("Lähdetekstin henkilö kertoo arjestaan.");
  await steps.getByRole("button",{name:/Sovella ja arvioi itse/}).click();
  await review.getByRole("textbox",{name:"Oma uusi saksankielinen esimerkki"}).fill("Ich lerne am Freitag Deutsch.");
  await review.getByRole("textbox",{name:"Itsearviointi suomeksi ja seuraava kertaus"}).fill("Kertaan sanajärjestystä.");
  await expect(review).toContainText("Niitä ei ole arvioitu automaattisesti.");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(review).toBeVisible();
  await expect(review.getByRole("textbox",{name:"Oma uusi saksankielinen esimerkki"}))
    .toHaveValue("Ich lerne am Freitag Deutsch.");
  await steps.getByRole("button",{name:/Muistista palautus/}).click();
  await expect(review.getByRole("textbox",{name:"Omat aikaisemmat tiedot ja kysymykset"}))
    .toHaveValue("Wir lernen Deutsch.");
  const values=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return {
      los2:localStorage.getItem(`los.local.v1.${owner}.2.05`),
      los3:localStorage.getItem(`los.local.v1.${owner}.3.05`),
    };
  });
  expect(JSON.parse(values.los2??"{}").practiceAnswers["LOS2-L027:review:reflection"]).toBe("Kertaan sanajärjestystä.");
  expect(values.los3).toBeNull();
  await expectNoHorizontalOverflow(page);
});

test("book exams L030 and L059 offer manuscript practice, with no answers or audio leaked before submission",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/path",{waitUntil:"domcontentloaded"});
  await page.getByText("Kertaus ja välikoe",{exact:true}).click();
  await page.getByRole("button",{name:/Tunti 30: välikoe/i}).click();
  await expect(page.locator(".los-review-practice")).toHaveCount(0);
  await expect(page.locator(".los-future-exam")).toBeVisible();
  await expect(page.locator(".los-future-exam-model")).toHaveCount(0);
  await expect(page.locator(".los-guided-review textarea")).toHaveCount(0);
  await page.goto("/los#/8/path",{waitUntil:"domcontentloaded"});
  await page.locator(".los-future-path-group").nth(4).locator("summary").click();
  await page.getByRole("button",{name:/Tunti 59: loppukoe/i}).click();
  await expect(page.locator(".los-review-practice")).toHaveCount(0);
  await expect(page.locator(".los-future-exam")).toBeVisible();
  await expect(page.locator(".los-future-exam-model")).toHaveCount(0);
  await expect(page.locator(".los-future-exam audio")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});

test("LOS! 2 source midterm keeps all answers hidden until explicit submission and preserves a retake archive",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/path",{waitUntil:"domcontentloaded"});
  await page.getByText("Kertaus ja välikoe",{exact:true}).click();
  await page.getByRole("button",{name:/Tunti 30: välikoe/i}).click();
  const exam=page.locator(".los-future-exam");
  await expect(exam).toBeVisible();
  await expect(exam.locator(".los-future-exam-question")).toHaveCount(15);
  await expect(exam.locator(".los-future-exam-reading p[lang='de']")).toContainText("Eva wohnt");
  await expect(exam.getByText("Pienessä kaupungissa, perheensä kanssa.")).toHaveCount(0);
  const response=exam.locator("textarea#LOS2-MID-R01");
  await response.fill("Pienessä kaupungissa, perheensä kanssa.");
  await exam.locator("textarea#LOS2-MID-W01").fill("Eva wohnt in einer kleinen Stadt.");
  await expect(exam.getByRole("button",{name:"Palauta harjoituskoe"})).toBeDisabled();
  await exam.getByRole("checkbox",{name:/Ymmärrän, että palauttamisen jälkeen/}).check();
  await exam.getByRole("button",{name:"Palauta harjoituskoe"}).click();
  await expect(exam.locator(".los-future-exam-model")).toHaveCount(16);
  // The same words also occur in the student's disabled textbox.
  // Scope the assertion to the revealed answer key, not both elements.
  await expect(exam.locator(".los-future-exam-model").first())
    .toContainText("Pienessä kaupungissa, perheensä kanssa.");
  await expect(response).toBeDisabled();
  await expect(exam).toContainText("Muut");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(exam.locator(".los-future-exam-model")).toHaveCount(16);
  await exam.getByRole("checkbox",{name:/Aloita uusinta/}).check();
  await exam.getByRole("button",{name:"Aloita uusi yritys"}).click();
  await expect(response).toBeEnabled();
  await expect(response).toHaveValue("");
  await expect(exam.locator(".los-future-exam-model")).toHaveCount(0);
  const stored=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return localStorage.getItem(`los.local.v1.${owner}.2.05`);
  });
  const parsed=JSON.parse(stored??"{}");
  const attempts=JSON.parse(parsed.testAnswers["LOS2-MID:history"]);
  expect(attempts).toHaveLength(1);
  expect(attempts[0].answers["LOS2-MID-R01"]).toBe("Pienessä kaupungissa, perheensä kanssa.");
  await expectNoHorizontalOverflow(page);
});

test("70 LOS! 2–8 chapter check pages have independently saved answers and delayed model reveal",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/test",{waitUntil:"domcontentloaded"});
  const check=page.locator(".los-future-chapter-check");
  await expect(check).toBeVisible();
  await expect(check.locator(".los-future-check-question")).toHaveCount(5);
  await expect(check.locator(".los-future-check-model")).toHaveCount(0);
  await expect(check).toContainText("Meine kleine Welt");
  await check.locator("#los-check-LOS2-C01-T02").fill("He opiskelevat saksaa.");
  await check.locator("#los-check-LOS2-C01-T18").fill("Ich heiße Mira. Wir lernen Deutsch.");
  await expect(check.getByRole("button",{name:"Palauta oma tarkistus"})).toBeDisabled();
  await check.getByRole("checkbox",{name:/Olen valmis vertaamaan vastauksiani/}).check();
  await check.getByRole("button",{name:"Palauta oma tarkistus"}).click();
  await expect(check.locator(".los-future-check-model")).toHaveCount(5);
  await expect(check.locator("#los-check-LOS2-C01-T02")).toBeDisabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(check.locator(".los-future-check-model")).toHaveCount(5);
  await expect(check.locator("#los-check-LOS2-C01-T18"))
    .toHaveValue("Ich heiße Mira. Wir lernen Deutsch.");
  await check.getByRole("checkbox",{name:/Tallenna koko nykyinen yritys/}).check();
  await check.getByRole("button",{name:"Aloita uusi harjoituskierros"}).click();
  await expect(check.locator(".los-future-check-model")).toHaveCount(0);
  await expect(check.locator("#los-check-LOS2-C01-T02")).toHaveValue("");
  const stored=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return {
      book2:localStorage.getItem(`los.local.v1.${owner}.2.01`),
      book8:localStorage.getItem(`los.local.v1.${owner}.8.01`),
    };
  });
  const data=JSON.parse(stored.book2??"{}");
  const old=JSON.parse(data.practiceAnswers["LOS2-C01-CHECK:previous-1"]);
  expect(old.answers["LOS2-C01-T18"]).toBe("Ich heiße Mira. Wir lernen Deutsch.");
  expect(data.practiceAnswers["LOS2-C01-T18"]).toBeUndefined();
  expect(stored.book8).toBeNull();
  await expectNoHorizontalOverflow(page);
});

test("LOS! 8 chapter 10 check uses its own sourced Text A and exercise IDs",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/8/10/test",{waitUntil:"domcontentloaded"});
  const check=page.locator(".los-future-chapter-check");
  await expect(check).toBeVisible();
  await expect(check.locator(".los-future-check-question")).toHaveCount(5);
  await expect(check.locator("#los-check-LOS8-C10-T09")).toBeVisible();
  await expect(check.locator("#los-check-LOS2-C01-T09")).toHaveCount(0);
  await check.locator(".los-future-check-reading summary").click();
  await expect(check.locator(".los-future-check-reading p[lang='de']")).toBeVisible();
  await expect(check.locator(".los-future-check-model")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});

test("source T10 correction and T13 Text B keep separate written fields and hide models until both answered",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  const choose=page.locator("#los-future-exercise-choice");
  await choose.selectOption({label:"T10 · Korjaa oppijan kielivirhe"});
  const rows=page.locator(".los-future-two-part-row");
  await expect(rows).toHaveCount(2);
  await expect(page.locator(".los-future-two-part-source[lang='de']")).toContainText("Wir lernt Deutsch");
  const show=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(show).toBeDisabled();
  await rows.nth(0).locator("textarea").fill("Wir lernen Deutsch.");
  await expect(show).toBeDisabled();
  await rows.nth(1).locator("textarea").fill("Wir saa monikon -en-päätteen.");
  await expect(show).toBeEnabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T10");
  await expect(rows.nth(1).locator("textarea")).toHaveValue("Wir saa monikon -en-päätteen.");
  await show.click();
  await expect(page.locator(".los-future-exercise-solution")).toBeVisible();
  await choose.selectOption({label:"T13 · Erillisen Text B:n tulkinta"});
  await expect(rows).toHaveCount(2);
  await expect(page.locator(".los-future-two-part-source")).toContainText("Hallo Mira");
  await expect(show).toBeDisabled();
  await rows.nth(0).locator("textarea").fill("Jonas kirjoittaa Miralle.");
  await rows.nth(1).locator("textarea").fill("He opiskelevat yhdessä tiistaina.");
  await expect(show).toBeEnabled();
  const stored=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return JSON.parse(localStorage.getItem(`los.local.v1.${owner}.2.01`)??"{}");
  });
  expect(JSON.parse(stored.practiceAnswers["LOS2-C01-T10"]).answers)
    .toEqual(["Wir lernen Deutsch.","Wir saa monikon -en-päätteen."]);
  expect(JSON.parse(stored.practiceAnswers["LOS2-C01-T13"]).answers)
    .toEqual(["Jonas kirjoittaa Miralle.","He opiskelevat yhdessä tiistaina."]);
  await expectNoHorizontalOverflow(page);
});

test("T03 dialog and R01 textual evidence bind to the right chapter without revealing model early",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  const picker=page.locator("#los-future-exercise-choice");
  await picker.selectOption({label:"T03 · Puhujat ja vuorot"});
  const rows=page.locator(".los-future-evidence-row");
  const show=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(rows).toHaveCount(2);
  await expect(page.locator(".los-future-evidence-source[lang='de']")).toContainText("Mira: Hallo");
  await expect(show).toBeDisabled();
  await rows.nth(0).locator("textarea").fill("Neljä puheenvuoroa.");
  await expect(show).toBeDisabled();
  await rows.nth(1).locator("textarea").fill("Mira tervehtii ja esittelee itsensä.");
  await expect(show).toBeEnabled();
  await picker.selectOption({label:"R01 · text-evidence"});
  await expect(rows).toHaveCount(2);
  await expect(page.locator(".los-future-evidence-source")).toContainText("Mira");
  await expect(show).toBeDisabled();
  await rows.nth(0).locator("textarea").fill("Mira und Jonas lernen zusammen Deutsch.");
  await expect(page.getByText("Kopioimaasi tekstikohtaa ei löydy Text A:sta täsmälleen näin.",{exact:false})).toBeVisible();
  await rows.nth(0).locator("textarea").fill("Mira ist neu in Bonn.");
  await expect(page.getByText("Kopioimasi teksti löytyy Text A:sta.",{exact:false})).toBeVisible();
  await rows.nth(1).locator("textarea").fill("Lause kertoo Miran olevan uusi Bonnissa.");
  await expect(show).toBeEnabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"R01");
  await expect(rows.nth(0).locator("textarea"))
    .toHaveValue("Mira ist neu in Bonn.");
  const stored=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return JSON.parse(localStorage.getItem(`los.local.v1.${owner}.2.01`)??"{}");
  });
  expect(JSON.parse(stored.practiceAnswers["LOS2-C01-T03"]).answers).toHaveLength(2);
  expect(JSON.parse(stored.practiceAnswers["LOS2-C01-R01"]).answers[1])
    .toBe("Lause kertoo Miran olevan uusi Bonnissa.");
  await expectNoHorizontalOverflow(page);
});

test("T11 grammar explanations and R03 three claims each persist separate source-grounded responses",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  const select=page.locator("#los-future-exercise-choice");
  await select.selectOption({label:"T11 · Kieliopin selitys omin sanoin"});
  let rows=page.locator(".los-future-reasoning-row");
  const show=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(rows).toHaveCount(3);
  await expect(show).toBeDisabled();
  await rows.nth(0).locator("textarea").fill("Wir päättyy usein -en.");
  await rows.nth(1).locator("textarea").fill("Wir lernen Deutsch.");
  await rows.nth(2).locator("textarea").fill("Lernen-verbin loppuosa -en.");
  await expect(show).toBeEnabled();
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  await select.selectOption({label:"R03 · reading-inference"});
  rows=page.locator(".los-future-reasoning-row");
  await expect(rows).toHaveCount(6);
  await expect(page.locator(".los-future-reasoning-source p[lang='de']")).toContainText("Mira");
  await expect(show).toBeDisabled();
  for(let index=0;index<6;index++){
    await rows.nth(index).locator("textarea").fill(index%2===0?"Mira lernt Deutsch.":"Mira lernt Deutsch.");
  }
  await expect(show).toBeEnabled();
  const saved=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return JSON.parse(localStorage.getItem(`los.local.v1.${owner}.2.01`)??"{}").practiceAnswers;
  });
  expect(JSON.parse(saved["LOS2-C01-T11"]).answers).toHaveLength(3);
  expect(JSON.parse(saved["LOS2-C01-R03"]).answers).toHaveLength(6);
  await expectNoHorizontalOverflow(page);
});

test("T19 and R06 four-turn dialogues save all turns without pretending to assess speech",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/apply",{waitUntil:"domcontentloaded"});
  const picker=page.locator("#los-future-exercise-choice");
  await picker.selectOption({label:"T19 · Tilannesimulaatio"});
  let rows=page.locator(".los-future-four-turn-row");
  const show=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(rows).toHaveCount(4);
  await expect(show).toBeDisabled();
  for(let n=0;n<4;n++)await rows.nth(n).locator("textarea").fill(
    ["Hallo!","Guten Tag!","Was machst du?","Ich lerne Deutsch."][n]!);
  await expect(show).toBeEnabled();
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await picker.selectOption({label:"R06 · dialogue-production"});
  rows=page.locator(".los-future-four-turn-row");
  await expect(rows).toHaveCount(4);
  await expect(show).toBeDisabled();
  for(let n=0;n<4;n++)await rows.nth(n).locator("textarea").fill(
    ["Hallo Jonas!","Hallo Mira!","Lernst du Deutsch?","Ja, zusammen."][n]!);
  await expect(show).toBeEnabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"R06");
  await expect(rows.nth(3).locator("textarea")).toHaveValue("Ja, zusammen.");
  const draft=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return JSON.parse(localStorage.getItem(`los.local.v1.${owner}.2.01`)??"{}").practiceAnswers;
  });
  expect(JSON.parse(draft["LOS2-C01-T19"]).answers).toHaveLength(4);
  expect(JSON.parse(draft["LOS2-C01-R06"]).answers).toHaveLength(4);
  await expectNoHorizontalOverflow(page);
});

test("T04 literal span and T14 two-source genres persist separately without premature model",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  const picker=page.locator("#los-future-exercise-choice");
  await selectFutureTask(page,"T04");
  const box=page.locator(".los-future-span-genre");
  await expect(box).toBeVisible();
  await expect(box.locator('input[type="radio"]')).toHaveCount(4);
  const show=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(show).toBeDisabled();
  await box.locator('input[type="radio"]').first().check();
  await box.locator("textarea").first().fill("Hallo");
  await expect(box.locator("mark")).toHaveText("Hallo");
  await box.locator("textarea").nth(1).fill("Tervehdys aloittaa keskustelun.");
  await expect(show).toBeEnabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T04");
  await expect(box.locator('input[type="radio"]').first()).toBeChecked();
  await expect(box.locator("textarea").nth(1)).toHaveValue("Tervehdys aloittaa keskustelun.");
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T14");
  await expect(box.locator(".los-future-span-genre-source")).toHaveCount(2);
  await expect(show).toBeDisabled();
  await box.locator("textarea").first().fill("Dialogissa henkilöt puhuvat, viestillä on lukija.");
  await box.locator("textarea").nth(1).fill("Dialogissa on vuorot, Text B on kirjoitettu viesti.");
  await expect(show).toBeEnabled();
  const data=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return JSON.parse(localStorage.getItem(`los.local.v1.${owner}.2.01`)??"{}").practiceAnswers;
  });
  expect(JSON.parse(data["LOS2-C01-T04"]).selection).toBe(0);
  expect(JSON.parse(data["LOS2-C01-T14"]).answers).toHaveLength(2);
  await expectNoHorizontalOverflow(page);
});

test("T01 prediction unlocks the original text only after two guesses, then saves reflection",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  const task=page.locator(".los-future-remaining");
  await expect(task).toBeVisible();
  await expect(task.locator("textarea")).toHaveCount(3);
  await expect(task.locator(".los-future-remaining-source blockquote")).toHaveCount(0);
  await task.locator("textarea").nth(0).fill("Uudet opiskelijat kohtaavat.");
  await task.locator("textarea").nth(1).fill("He opiskelevat saksaa yhdessä.");
  await expect(task.locator(".los-future-remaining-source details")).toBeVisible();
  await expect(task.locator("textarea").nth(2)).toBeEnabled();
  await task.locator("textarea").nth(2).fill("Toinen ennustus osui lähelle.");
  await expect(page.getByRole("button",{name:"Näytä vastausluonnos"})).toBeEnabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(task.locator("textarea").nth(2)).toHaveValue("Toinen ennustus osui lähelle.");
  await expectNoHorizontalOverflow(page);
});

test("T15 pronunciation notes, T16 own question and T17 transformations keep their source drafts",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  const picker=page.locator("#los-future-exercise-choice");
  const form=page.locator(".los-future-remaining");
  const show=page.getByRole("button",{name:"Näytä vastausluonnos"});
  for(const [id,labels] of [
    ["T15 · Harjoittele puheen rytmiä",["Wir LERnen Deutsch.","SIE wohnen ZUsammen.","Harjoittelin, mutta äänimallia ei vielä ole."]],
    ["T16 · Rakenna uusi kysymys",["Was macht ihr am Wochenende?","Tarkistin verbin paikkaa ja kysymysmerkin."]],
    ["T17 · Muokkaa henkilötietoa",["Wir lernen Deutsch.","Vaihdoin puhujan.","Monikon verbimuoto on lernen."]],
  ] as const){
    await picker.selectOption({label:id});
    await expect(form.locator("textarea")).toHaveCount(labels.length);
    await expect(show).toBeDisabled();
    for(let i=0;i<labels.length;i++)await form.locator("textarea").nth(i).fill(labels[i]!);
    await expect(show).toBeEnabled();
  }
  await expect(page.locator(".los-future-remaining audio")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});

test("T18 writing revision, R04 context words and R05 two-sentence summary use independent source steps",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/8/10/apply",{waitUntil:"domcontentloaded"});
  let picker=page.locator("#los-future-exercise-choice");
  await picker.selectOption({label:"T18 · Tuota kappaleen oma teksti"});
  let form=page.locator(".los-future-remaining");
  await expect(form.locator("textarea")).toHaveCount(3);
  await form.locator("textarea").nth(0).fill("Ich lerne Deutsch. Das ist wichtig.");
  await form.locator("textarea").nth(1).fill("Korjasin verbin paikan.");
  await form.locator("textarea").nth(2).fill("Ich lerne jeden Tag Deutsch.");
  await page.goto("/los#/8/10/practice",{waitUntil:"domcontentloaded"});
  picker=page.locator("#los-future-exercise-choice");
  await picker.selectOption({label:"R04 · vocab-in-context"});
  form=page.locator(".los-future-remaining");
  await expect(form.locator("textarea")).toHaveCount(9);
  await form.locator("textarea").nth(0).fill("Thema");
  await expect(page.getByRole("button",{name:"Näytä vastausluonnos"})).toBeDisabled();
  await picker.selectOption({label:"R05 · text-summary"});
  await expect(form.locator("textarea")).toHaveCount(4);
  await form.locator("textarea").nth(0).fill("Die Schüler lernen.");
  await form.locator("textarea").nth(1).fill("Sie arbeiten zusammen.");
  await form.locator("textarea").nth(3).fill("Otin pääasian mukaan.");
  await expect(page.getByRole("button",{name:"Näytä vastausluonnos"})).toBeEnabled();
  await expectNoHorizontalOverflow(page);
});

test("later-book recall cards share LOS! 1 spaced-recall logic but keep book-specific progress",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/cards",{waitUntil:"domcontentloaded"});
  const recall=page.locator(".los-recall");
  await expect(recall).toBeVisible();
  await expect(recall.getByRole("heading",{name:"Sanaston kertauskortit"})).toBeVisible();
  await expect(recall.locator(".los-recall-stage")).toBeVisible();
  await expect(recall.locator(".los-recall-save")).toContainText("JSON-varmuuskopiossa");
  const first=await recall.locator(".los-recall-prompt").textContent();
  await recall.getByRole("button",{name:"Näytä vastaus"}).click();
  await expect(recall.locator(".los-recall-answer")).toBeVisible();
  await recall.getByRole("button",{name:"Muistin oikein"}).click();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(recall.locator(".los-recall-stage")).toBeVisible();
  await expect(recall.locator(".los-recall-prompt")).not.toHaveText(first!.trim());
  const saved=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return JSON.parse(localStorage.getItem(`los.local.v1.${owner}.2.01`)??"{}");
  });
  expect(Object.keys(saved.recallCards)).toHaveLength(1);
  expect(Object.values(saved.recallCards)[0]).toMatchObject({level:1,lastRating:"remembered"});
  await page.goto("/los#/3/01/cards",{waitUntil:"domcontentloaded"});
  await expect(recall.locator(".los-recall-stage")).toBeVisible();
  const other=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    return localStorage.getItem(`los.local.v1.${owner}.3.01`);
  });
  expect(other).toBeNull();
  await expectNoHorizontalOverflow(page);
});

test("LOS! 2 Text A highlights and chapter notes survive reload without leaking into book 3",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/text",{waitUntil:"domcontentloaded"});
  const reader=page.locator(".los-future-interactive-reader");
  await expect(reader).toHaveCount(1);
  await expect(reader.locator(".los-future-reader-token")).not.toHaveCount(0);
  await reader.getByRole("button",{name:"Korosta tekstiä"}).click();
  const tokens=reader.locator(".los-future-reader-token");
  await tokens.nth(0).click();
  await tokens.nth(1).click();
  await expect(tokens.nth(0)).toHaveClass(/is-yellow/);
  await reader.getByRole("textbox",{name:"Kappaleen omat muistiinpanot"})
    .fill("Muistan nyt sanan neu.");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(reader.locator(".los-future-reader-token").first()).toHaveClass(/is-yellow/);
  await expect(reader.getByRole("textbox",{name:"Kappaleen omat muistiinpanot"}))
    .toHaveValue("Muistan nyt sanan neu.");
  await reader.getByRole("button",{name:"Avaa sanaselitys"}).click();
  await reader.locator(".los-future-reader-token").first().click();
  await expect(reader.getByRole("dialog",{name:/Sanan .* selitys/})).toBeVisible();
  await reader.getByRole("button",{name:"Sulje sanan selitys"}).click();
  await page.goto("/los#/3/01/text",{waitUntil:"domcontentloaded"});
  const other=page.locator(".los-future-interactive-reader");
  await expect(other.locator(".los-future-reader-token.is-yellow")).toHaveCount(0);
  await expect(other.getByRole("textbox",{name:"Kappaleen omat muistiinpanot"})).toHaveValue("");
  await expectNoHorizontalOverflow(page);
});

test("revised Text A archives old highlights instead of overwriting them in WebKit/Chromium",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/text",{waitUntil:"domcontentloaded"});
  const reader=page.locator(".los-future-interactive-reader");
  await expect(reader).toBeVisible();
  await reader.getByRole("button",{name:"Korosta tekstiä"}).click();
  const tokens=reader.locator(".los-future-reader-token");
  await tokens.nth(0).click();
  await tokens.nth(1).click();
  await expect(tokens.nth(0)).toHaveClass(/is-yellow/);
  const archivedRaw=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    const path=`los.local.v1.${owner}.2.01`;
    const key="los-future-2-01-text-a";
    const draft=JSON.parse(localStorage.getItem(path)??"null");
    const old=JSON.parse(draft.readerMarks[key]);
    old.contentVersion="source-deadbeef-123";
    draft.readerMarks[key]=JSON.stringify(old);
    localStorage.setItem(path,JSON.stringify(draft));
    return draft.readerMarks[key] as string;
  });
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(reader.getByText("Tekstiä on muutettu.",{exact:false})).toBeVisible();
  await reader.getByRole("button",{name:"Aloita uudet korostukset ja arkistoi vanhat"}).click();
  await expect(reader.getByText("Tekstiä on muutettu.",{exact:false})).toHaveCount(0);
  await reader.getByRole("button",{name:"Korosta tekstiä"}).click();
  await tokens.nth(2).click();
  await tokens.nth(3).click();
  await expect(tokens.nth(2)).toHaveClass(/is-yellow/);
  await expect(tokens.nth(0)).not.toHaveClass(/is-yellow/);
  const marks=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    const draft=JSON.parse(localStorage.getItem(`los.local.v1.${owner}.2.01`)??"null");
    return draft.readerMarks as Record<string,string>;
  });
  expect(marks["los-future-2-01-text-a@source-deadbeef-123"]).toBe(archivedRaw);
  expect(marks["los-future-2-01-text-a"]).not.toBe(archivedRaw);
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(reader.locator(".los-future-reader-token").nth(2)).toHaveClass(/is-yellow/);
  await expectNoHorizontalOverflow(page);
});

test("T14 model and old prompt migration preserve the learner's two saved observations",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T14");
  const form=page.locator(".los-future-span-genre");
  await expect(form.locator("textarea")).toHaveCount(2);
  await form.locator("textarea").nth(0).fill("Puheessa on kaksi keskustelijaa.");
  await form.locator("textarea").nth(1).fill("Text B on Jonasilta Miralle.");
  const oldPrompt="Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.";
  await page.evaluate(({oldPrompt})=>{
    const owner=localStorage.getItem("opk.owner-id");
    const key=`los.local.v1.${owner}.2.01`;
    const draft=JSON.parse(localStorage.getItem(key)??"null");
    const previous=JSON.parse(draft.practiceAnswers["LOS2-C01-T14"]);
    previous.prompt=oldPrompt;
    draft.practiceAnswers["LOS2-C01-T14"]=JSON.stringify(previous);
    localStorage.setItem(key,JSON.stringify(draft));
  },{oldPrompt});
  await page.reload({waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T14");
  await expect(form.getByText("Tekstilajin nimitys ja tehtävänanto on tarkennettu.",{exact:false})).toBeVisible();
  await expect(form.locator("textarea").first()).toHaveValue("Puheessa on kaksi keskustelijaa.");
  await expect(form.locator("textarea").nth(1)).toHaveValue("Text B on Jonasilta Miralle.");
  await form.locator("textarea").nth(1).fill("Text B on lyhyt Jonasilta Miralle.");
  const persisted=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    const key=`los.local.v1.${owner}.2.01`;
    const draft=JSON.parse(localStorage.getItem(key)??"null");
    return JSON.parse(draft.practiceAnswers["LOS2-C01-T14"]);
  });
  expect(persisted.prompt).toContain("Text B -tekstiä");
  expect(persisted.answers[0]).toBe("Puheessa on kaksi keskustelijaa.");
  expect(persisted.answers[1]).toBe("Text B on lyhyt Jonasilta Miralle.");
  await expectNoHorizontalOverflow(page);
});


test("T13 displays manuscript punctuation exactly and keeps the older structured draft",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T13");
  const source=page.locator(".los-future-two-part-source");
  await expect(source).toHaveText("Hallo Mira! Wir lernen am Dienstag zusammen Deutsch. Bis bald! Jonas");
  await expect(page.locator(".los-future-exercise-question"))
    .toHaveText("Lue alla oleva Text B ja kirjoita kaksi perusteltua havaintoa suomeksi. Huomaa myös tekstin tarkoitus ja ilmaisutapa.");
  const entries=page.locator(".los-future-two-part textarea");
  await entries.nth(0).fill("Jonas kirjoittaa Miralle.");
  await entries.nth(1).fill("He opiskelevat tiistaina.");
  const previouslySaved=await page.evaluate(()=>{
    const owner=localStorage.getItem("opk.owner-id");
    const draft=JSON.parse(localStorage.getItem(`los.local.v1.${owner}.2.01`)??"null");
    return JSON.parse(draft.practiceAnswers["LOS2-C01-T13"]);
  });
  expect(previouslySaved.sourceText).toBe("Hallo Mira! Wir lernen am Dienstag zusammen Deutsch. Bis bald! Jonas.");
  expect(previouslySaved.answers).toEqual(["Jonas kirjoittaa Miralle.","He opiskelevat tiistaina."]);
  await page.reload({waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T13");
  await expect(entries.nth(0)).toHaveValue("Jonas kirjoittaa Miralle.");
  await expect(entries.nth(1)).toHaveValue("He opiskelevat tiistaina.");
  await page.goto("/los#/5/06/practice",{waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T13");
  await expect(source).toHaveText("Bewegung: Ein kleiner Spaziergang ist auch Bewegung.");
  await expect(source).not.toContainText("Bewegung..");
  await expectNoHorizontalOverflow(page);
});

test("R04 gives literal Text A evidence feedback in both desktop and mobile layouts",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"R04");
  const form=page.locator(".los-future-remaining");
  const rows=form.locator(".los-future-remaining-row textarea");
  await expect(rows).toHaveCount(9);
  await rows.nth(0).fill("Xenon");
  await rows.nth(1).fill("Mira ist neu in Bonn.");
  await expect(form.getByText("Sanaa ei löydy Text A:sta",{exact:false})).toBeVisible();
  await rows.nth(0).fill("Mira");
  await expect(form.getByText("Sana ja tekstikohta löytyvät Text A:sta",{exact:false}))
    .toHaveCount(1);
  await rows.nth(2).fill("Henkilön nimi, jota käytän tässä testissä vain lähteen tarkistamiseen.");
  await rows.nth(3).fill("mira");
  await rows.nth(4).fill("Mira ist neu in Bonn.");
  await expect(form.getByText("Olet valinnut tämän saman sanan jo aiemmin.",{exact:false})).toBeVisible();
  await rows.nth(3).fill("Jonas");
  await rows.nth(4).fill("Am Montag trifft sie Jonas in einem Deutschkurs.");
  await rows.nth(5).fill("Henkilön nimi.");
  await rows.nth(6).fill("Nora");
  await rows.nth(7).fill("Sie heißen Nora und Tim.");
  await rows.nth(8).fill("Henkilön nimi.");
  await expect(form.getByText("Sana ja tekstikohta löytyvät Text A:sta",{exact:false}))
    .toHaveCount(3);
  await expect(page.getByRole("button",{name:"Näytä vastausluonnos"})).toBeEnabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"R04");
  await expect(rows.nth(3)).toHaveValue("Jonas");
  await expect(rows.nth(4)).toHaveValue("Am Montag trifft sie Jonas in einem Deutschkurs.");
  await expect(form.getByText("Sana ja tekstikohta löytyy Text A:sta",{exact:false}))
    .toHaveCount(0);
  await expect(form.getByText("Sana ja tekstikohta löytyvät Text A:sta",{exact:false}))
    .toHaveCount(3);
  await expectNoHorizontalOverflow(page);
});


test("all unattempted exercises keep the model hidden until learner work exists",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/understand",{waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T01");
  const model=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(model).toBeDisabled();
  await expect(page.locator(".los-future-exercise-solution")).toHaveCount(0);
  const prediction=page.locator(".los-future-remaining-row textarea");
  await expect(prediction).toHaveCount(3);
  await prediction.nth(0).fill("Arvaan, että henkilöt keskustelevat koulusta.");
  await expect(model).toBeDisabled();
  await prediction.nth(1).fill("Arvaan, että joku muuttaa kaupunkiin.");
  await expect(model).toBeDisabled();
  await prediction.nth(2).fill("Tarkistan arvaukset Text A:sta.");
  await expect(model).toBeEnabled();
  await model.click();
  await expect(page.locator(".los-future-exercise-solution")).toBeVisible();
  await selectFutureTask(page,"T05");
  await expect(model).toBeDisabled();
  await expect(page.locator(".los-future-exercise-solution")).toHaveCount(0);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T07");
  await expect(model).toBeDisabled();
  await page.locator("#los-future-gap-input").fill("Deutsch");
  await expect(model).toBeEnabled();
  await expectNoHorizontalOverflow(page);
});


test("translation prompts show Finnish punctuation once and keep written answers on reload",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/07/practice",{waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T09");
  await expect(page.locator(".los-future-exercise-question"))
    .toHaveText("Kirjoita saksaksi: Mitä kahvi maksaa?");
  const translation=page.locator("#los-future-short-input");
  await translation.fill("Was kostet der Kaffee?");
  await page.reload({waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T09");
  await expect(translation).toHaveValue("Was kostet der Kaffee?");
  await page.goto("/los#/8/05/practice",{waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"T09");
  await expect(page.locator(".los-future-exercise-question"))
    .toHaveText("Kirjoita saksaksi: Tarkista lähde!");
  await expectNoHorizontalOverflow(page);
});

test("R05 source-specific German model appears only after the learner writes a summary",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/01/practice",{waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"R05");
  const form=page.locator(".los-future-remaining");
  const fields=form.locator("textarea");
  await expect(fields).toHaveCount(4);
  const show=page.getByRole("button",{name:"Näytä vastausluonnos"});
  await expect(show).toBeDisabled();
  await fields.nth(0).fill("Mira kommt aus Finnland.");
  await fields.nth(1).fill("Sie lernt mit ihren Freunden Deutsch.");
  await fields.nth(3).fill("Tarkistin pääasian ja verbimuodot.");
  await expect(show).toBeEnabled();
  await show.click();
  const model=page.locator(".los-future-exercise-solution");
  await expect(model).toContainText("Mira kommt aus Finnland und lernt jetzt in Bonn Deutsch.");
  await expect(model).not.toContainText("Käsin tarkistettava mallivastaus;");
  await model.getByRole("button",{name:"Olen verrannut vastaukseni"}).click();
  await page.reload({waitUntil:"domcontentloaded"});
  await selectFutureTask(page,"R05");
  await expect(fields.nth(0)).toHaveValue("Mira kommt aus Finnland.");
  await expect(fields.nth(3)).toHaveValue("Tarkistin pääasian ja verbimuodot.");
  await expectNoHorizontalOverflow(page);
});

test("eight-book chapter dictionary pages 60 rows at a time while searching all source rows",async({page})=>{
  await enterFutureBook(page);
  await page.goto("/los#/2/dictionary",{waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Kappalesanasto"})).toBeVisible();
  const entries=page.locator(".los-index-entry");
  const status=page.locator(".los-index-count");
  await expect(entries).toHaveCount(60);
  await expect(status).toContainText("Näytetään 60 /");
  await page.getByRole("button",{name:"Näytä seuraavat 60 sanaa"}).click();
  await expect(entries).toHaveCount(120);
  await expect(status).toContainText("Näytetään 120 /");
  await page.getByRole("button",{name:"Näytä vähemmän"}).click();
  await expect(entries).toHaveCount(60);

  await page.getByRole("button",{name:"Koko sarja"}).click();
  await expect(entries).toHaveCount(60);
  await expect(page.locator(".los-index-footnote")).toContainText("Koko sarjan kappalesanastot");
  const query=page.locator(".los-index-search input");
  await query.fill("Hallo");
  await expect(entries.first()).toContainText("Hallo");
  await expect(page.getByRole("button",{name:/Näytä seuraavat \d+ sanaa/})).toHaveCount(0);
  await query.fill("varta-vasten-hakutermi-jota-ei-ole-kirjoissa-123");
  await expect(entries).toHaveCount(0);
  await expect(status).toContainText("Näytetään 0 / 0");
  await expect(page.getByText("Ei osumia tällä rajauksella.",{exact:false})).toBeVisible();
  await query.clear();
  await expect(entries).toHaveCount(60);
  await expectNoHorizontalOverflow(page);
});
