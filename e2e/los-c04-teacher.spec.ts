import { expect, test, type Page } from "@playwright/test";

/**
 * Offline owner fixture works on loopback only. It is not a production
 * authentication bypass, cloud or real-device media test.
 */
async function enterLocalBook(page:Page){
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/1/04/chapter",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-book-workspace")).toBeVisible({timeout:30_000});
}

test("five C04 Teacher lessons open in the same Player on both browser projects",async({page})=>{
  await enterLocalBook(page);
  for(let number=17;number<=21;number++){
    const id="L"+String(number).padStart(3,"0");
    await page.goto("/los-lessons/"+id,{waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-teacher-sidebar h1")).toBeVisible();
    await expect(page.locator(".los-teacher-paper h2")).toBeVisible();
    await expect(page.locator(".los-teacher-sidebar")).toContainText(id);
    const help=page.getByRole("button",{name:/En ymmärrä \/ haluan lisäselityksen/});
    await help.click();
    await expect(page.locator(".los-teacher-help-entries")).toBeVisible();
    await expect(page.locator(".los-teacher-progress")).toHaveAttribute("role","progressbar");
  }
});

test("L018 references full canonical C04 Text A; C07 telephone stays separate",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los#/1/04/text",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-c01-turn")).toHaveCount(8);
  await expect(page.locator(".los-c01-turns")).toContainText("Wie geht es Ihnen?");
  await expect(page.locator(".los-c01-turns")).toContainText("Ich habe so viel Arbeit.");
  await page.goto("/los-lessons/L018",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline").getByRole("button",{name:/Lue jokainen repliikki/}).click();
  await expect(page.locator(".los-teacher-book-links")).toContainText("M-WB-06");
  await expect(page.getByRole("link",{name:/Avaa kirjassa/}).first())
    .toHaveAttribute("href",/lessonReturn=L018.*\/04\/text$/);
  await page.goto("/los#/1/07/text",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-c01-turn")).toHaveCount(5);
  await expect(page.locator(".los-c01-turns")).toContainText("Bitte buchstabieren Sie.");
});

test("C04 Text B remains complete even with unapproved audio; the five lessons reuse saved book data",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los#/1/04/text-b",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-secondary-source .los-c01-turn")).toHaveCount(20);
  await expect(page.locator(".los-secondary-source .los-c01-turns")).toContainText("Auf Wiedersehen!");
  await page.goto("/los-lessons/L020",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline").getByRole("button",{name:/Lue koko 20 ilmauksen/}).click();
  await expect(page.locator(".los-teacher-paper")).toContainText("tekst");
  await expect(page.getByRole("link",{name:/Avaa kirjassa/}).first())
    .toHaveAttribute("href",/lessonReturn=L020.*\/04\/text-b$/);
});

test("L021 teacher chapter test cannot be marked complete just by visiting it",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L021",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline").getByRole("button",{name:/C04:n harjoittelu ja testi/}).click();
  await expect(page.locator(".los-teacher-assessment-status")).toContainText("Ei vielä palautettu");
  await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Harjoittele ja testaa C04");
});

test("L017 hinted answer stays correct practice, not independent evidence, after reload",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L017",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline").getByRole("button",{name:"Vieraan kohtaaminen"}).click();
  await page.getByRole("button",{name:"Tarvitsen vihjeen"}).click();
  await expect(page.locator(".los-teacher-hint")).toBeVisible();
  await page.locator(".los-teacher-option").filter({hasText:"Sie"}).click();
  await expect(page.locator(".los-teacher-feedback")).toContainText("Tämä oli harjoittelussa oikein.");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-feedback")).toContainText("Tämä oli harjoittelussa oikein.");
});

test("L019 returns a specific verb correction and remembers the answer",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L019",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline").getByRole("button",{name:"Korjaa Sie-nimikysymys"}).click();
  const input=page.locator(".los-teacher-form input");
  await input.fill("Wie heißt Sie?");
  await page.getByRole("button",{name:"Tarkista",exact:true}).click();
  await expect(page.locator(".los-teacher-feedback")).toContainText("Heißt on du-muoto.");
  await input.fill("Wie heißen Sie?");
  await page.getByRole("button",{name:"Tarkista",exact:true}).click();
  await expect(page.locator(".los-teacher-feedback")).toContainText("Tämä oli harjoittelussa oikein.");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-feedback")).toContainText("Tämä oli harjoittelussa oikein.");
});
