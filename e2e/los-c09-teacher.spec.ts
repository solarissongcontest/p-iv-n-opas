import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

/**
 * Runs on desktop Chromium and iPhone WebKit using existing app test login.
 * Real-device audio playback, human German QA and perceived lesson duration
 * remain separate publication checks, not outcomes invented by these tests.
 */
/**
 * Loopback-only offline-owner fixture already used by los-full-book.spec.ts.
 * Never mocks server tokens or modifies application security.
 */
async function enterLocalTeacher(page:import("@playwright/test").Page) {
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
    window.localStorage.setItem("opk.device-authorized","Arthur");
    window.localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/1/09/chapter",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-book-workspace")).toBeVisible({timeout:30_000});
}
const lessons=[
  ["L046","Viikonpäivät"],
  ["L047","Lue Sport und Zeit"],
  ["L048","Am Montag, um drei Uhr"],
  ["L049","Kuuntele ja merkitse kalenteriin"],
  ["L050","Harjoittele ja testaa C09"],
] as const;
const openScene=async(page:import("@playwright/test").Page,title:string)=>{
  await page.locator(".los-teacher-outline nav").getByRole("button",{name:title}).click();
};

test("all five C09 Teacher routes open and expose help, lesson navigation and saved progress",async({page})=>{
  await enterLocalTeacher(page);
  for(const [id,title] of lessons){
    await page.goto("/los-lessons/"+id,{waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-teacher-sidebar h1")).toHaveText(title);
    await expect(page.locator(".los-teacher-outline nav button").first()).toBeVisible();
    await page.getByRole("button",{name:/En ymmärrä \/ haluan lisäselityksen/}).click();
    await expect(page.locator(".los-teacher-help-entries")).toBeVisible();
    await page.locator(".los-teacher-navigation").getByRole("button",{name:/Seuraava/}).click();
    await expect(page.locator(".los-teacher-progress")).toHaveAttribute("aria-valuenow","2");
    await page.reload({waitUntil:"domcontentloaded"});
    await expect(page.locator(".los-teacher-progress")).toHaveAttribute("aria-valuenow","2");
    await expectNoHorizontalOverflow(page);
  }
});

test("Text A keeps all seven authentic repliques and Text B remains an actual weekday list",async({page})=>{
  await enterLocalTeacher(page);
  await page.goto("/los-lessons/L047",{waitUntil:"domcontentloaded"});
  await openScene(page,"Koko Text A · seitsemän puheenvuoroa");
  await expect(page.locator(".los-teacher-source-line")).toHaveCount(7);
  await expect(page.locator(".los-teacher-original-credit")).toContainText("CC BY-SA 4.0");
  await expect(page.locator(".los-teacher-original")).toContainText("Es ist Viertel vor drei.");
  await expect(page.locator(".los-teacher-original")).toContainText("Wiedersehen!");
  await page.goto("/los-lessons/L049",{waitUntil:"domcontentloaded"});
  await openScene(page,"Koko Text B · Die Wochentage");
  await expect(page.locator(".los-teacher-source-line")).toHaveCount(1);
  await expect(page.locator(".los-teacher-original")).toContainText("Montag, Dienstag, Mittwoch, Donnerstag");
  await expect(page.locator(".los-teacher-source-warning")).toContainText("ei merkitse kuuntelua suoritetuksi");
  await expect(page.locator(".los-teacher-original")).not.toContainText("um drei Uhr");
  await expectNoHorizontalOverflow(page);
});

test("C09 interactive time calendar keeps a checked choice after reload without inventing audio completion",async({page})=>{
  await enterLocalTeacher(page);
  await page.goto("/los-lessons/L048",{waitUntil:"domcontentloaded"});
  await openScene(page,"Merkitse aika kalenteriin");
  const calendar=page.locator(".los-teacher-calendar");
  const confirm=page.getByRole("button",{name:"Vahvista oikea kalenterimerkintä"});
  await expect(calendar).toBeVisible();
  await expect(confirm).toBeDisabled();
  await calendar.locator("button",{hasText:"Sonntag"}).click();
  await calendar.locator("select").selectOption("19:00");
  await expect(calendar.locator(".los-teacher-calendar-retry")).toBeVisible();
  await expect(confirm).toBeDisabled();
  await calendar.locator("button",{hasText:"Montag"}).click();
  await calendar.locator("select").selectOption("15:00");
  await expect(calendar.locator(".los-teacher-calendar-good")).toBeVisible();
  await expect(confirm).toBeEnabled();
  await confirm.click();
  await expect(page.getByRole("button",{name:"Harjoittelu vahvistettu"})).toBeDisabled();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-calendar-days button.is-selected")).toContainText("Montag");
  await expect(page.locator(".los-teacher-calendar select")).toHaveValue("15:00");
  await expect(page.getByRole("button",{name:"Harjoittelu vahvistettu"})).toBeDisabled();
  await expectNoHorizontalOverflow(page);
});

test("L049 calendar separates transcript weekday from added practice time on mobile",async({page})=>{
  await enterLocalTeacher(page);
  await page.goto("/los-lessons/L049",{waitUntil:"domcontentloaded"});
  await openScene(page,"Merkitse lähteestä tunnistettu päivä kalenteriin");
  const calendar=page.locator(".los-teacher-calendar");
  await expect(calendar).toContainText("HARJOITUSTIETO");
  await calendar.locator("button",{hasText:"Mittwoch"}).click();
  await calendar.locator("select").selectOption("16:00");
  await expect(calendar.locator(".los-teacher-calendar-good")).toBeVisible();
  await page.getByRole("button",{name:"Vahvista oikea kalenterimerkintä"}).click();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(calendar.locator(".los-teacher-calendar-days button.is-selected")).toContainText("Mittwoch");
  await expect(calendar.locator("select")).toHaveValue("16:00");
  await expectNoHorizontalOverflow(page);
});

test("L050 cannot claim chapter-test completion by opening its summary",async({page})=>{
  await enterLocalTeacher(page);
  await page.goto("/los-lessons/L050",{waitUntil:"domcontentloaded"});
  await openScene(page,"Itsenäinen lopputarkistus");
  await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
  await expect(page.locator(".los-teacher-assessment-status")).toContainText("Ei vielä palautettu");
  await expectNoHorizontalOverflow(page);
});

test("book exercises and lesson sessions use the same C09 chapter draft",async({page})=>{
  await enterLocalTeacher(page);
  await page.goto("/los-lessons/L046",{waitUntil:"domcontentloaded"});
  await openScene(page,"Muodosta ajanilmaus ilman mallia");
  await page.locator("#los-teacher-answer").fill("am Donnerstag");
  await page.getByRole("button",{name:"Tarkista"}).click();
  await expect(page.locator(".los-teacher-feedback.is-right")).toBeVisible();
  await page.goto("/los#/1/09/practice",{waitUntil:"domcontentloaded"});
  const originalTask=page.locator("#C09-EX-01");
  await expect(originalTask).toContainText("Mikä viikonpäivä on Montag?");
  await originalTask.getByRole("radio",{name:"maanantai"}).check();
  await expect(originalTask.getByRole("radio",{name:"maanantai"})).toBeChecked();
  await page.goto("/los-lessons/L046",{waitUntil:"domcontentloaded"});
  await openScene(page,"Oikeat tehtävät samassa kirjassa");
  await expect(page.locator(".los-teacher-evidence").filter({hasText:"C09-EX-01"}))
    .toContainText("Vastaus tallennettu");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-evidence").filter({hasText:"C09-EX-01"}))
    .toContainText("Vastaus tallennettu");
  await openScene(page,"Muodosta ajanilmaus ilman mallia");
  await expect(page.locator(".los-teacher-feedback.is-right")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});


test("both distinct publisher licenses remain clickable inside the full C09 reader",async({page})=>{
  await enterLocalTeacher(page);
  await page.goto("/los-lessons/L047",{waitUntil:"domcontentloaded"});
  await openScene(page,"Koko Text A · seitsemän puheenvuoroa");
  const a=page.locator(".los-teacher-original-credit");
  await expect(a.getByRole("link",{name:/CC BY-SA 4.0 -lisenssi/}))
    .toHaveAttribute("href","https://creativecommons.org/licenses/by-sa/4.0/");
  await expect(a.getByRole("link",{name:/Alkuperäinen teksti ja tekijähistoria/}))
    .toHaveAttribute("href",/German\/Level_I\/Freizeit&oldid=4003622/);

  await page.goto("/los-lessons/L049",{waitUntil:"domcontentloaded"});
  await openScene(page,"Koko Text B · Die Wochentage");
  const b=page.locator(".los-teacher-original-credit");
  await expect(b).toContainText("Christoph");
  await expect(b.getByRole("link",{name:/CC BY-SA 3.0 -lisenssi/}))
    .toHaveAttribute("href","https://creativecommons.org/licenses/by-sa/3.0/");
  await expect(b.getByRole("link",{name:/Alkuperäinen ihmisen äänittämä sanalista/}))
    .toHaveAttribute("href","https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Days.ogg");
  await expect(page.locator(".los-teacher-source-warning"))
    .toContainText("ei merkitse kuuntelua suoritetuksi");
});
