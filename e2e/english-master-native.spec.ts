import { expect, test } from "@playwright/test";
import { gzipSync } from "node:zlib";
import { readFile } from "node:fs/promises";
import { expectNoHorizontalOverflow } from "./helpers";

const owner = "00000000-0000-4000-8000-000000000195";
async function enterLocalBook(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    if (!["localhost", "127.0.0.1"].includes(window.location.hostname)) return;
    window.localStorage.setItem("opk.device-authorized", "Arthur");
    window.localStorage.setItem("opk.owner-id", "00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/english-master", { waitUntil: "domcontentloaded" });
}
function tinyStructuralFixture() {
  const chapters: Record<string, unknown> = {};
  for (let n = 1; n <= 122; n++) {
    const id = n === 1 ? "G01" : "G" + String(n + 40);
    chapters[id] = { content_id: id, title: n === 1 ? "How English Sentences Work" : "Test chapter " + n, status: "draft", payload: {
      objectives_fi: ["Muodosta oma lause."], sections: [{ section_id: id + ".1", title: "Lauseen rakenne", theory_fi: "Tämä on vain testin sisältöä.", worked_examples: [{ en: "I study English.", meaning_fi: "Opiskelen englantia." }] }] } };
  }
  const lessons: Record<string, unknown> = {};
  for (let n = 1; n <= 192; n++) {
    const unit = "J" + String(Math.min(32, Math.ceil(n / 6))).padStart(2, "0");
    const id = "EM-LP-" + unit + "-L" + String(n).padStart(3, "0");
    lessons[id] = { content_id: id, title: "Test lesson " + n, status: "draft", book_refs: ["G01"],
      payload: { hook_fi: "Opi muodostamaan lause.", explanations: [{ heading_fi: "Sääntö", text_fi: "Tämä on vain testin sisältöä." }],
        teacher_scenes: [{ id: "scene-1", title_fi: "Ensimmäinen vaihe", teacher_fi: "Opettajan ensimmäinen selitys." }, { id: "scene-2", title_fi: "Toinen vaihe", teacher_fi: "Opettajan toinen selitys." }],
        tasks: [{ task_id: id + "-T01", format: "single_choice", phase: "guided", prompt_en: "Choose the correct sentence.",
          options: [{ id: "A", text: "I study English." }, { id: "B", text: "I studies English." }], correct_option: "A",
          feedback_correct_fi: "Study is correct with I.", wrong_option_feedback_fi: { B: "Studies belongs with he/she/it." } }] } };
  }
  const media: Record<string, string> = {};
  for (let n = 1; n <= 20; n++) media["test_" + n + ".mp3"] = "data:audio/mpeg;base64,//tQxAAAAAA";
  return { schema: "em-opintopaivakirja-pack-0.8", version: "0.8", chapter_count: 122, lesson_count: 192, chapters, lessons, extras: {}, media };
}
test.use({ viewport: { width: 1280, height: 800 } });

test("English Master opens as a first-class book route, imports one content pack and keeps it after reload", async ({ page }) => {
  // Test the manual offline fallback even though the production bundle auto-loads.
  await page.route("**/english-master/content.manifest.json", route => route.fulfill({ status: 404, body: "Not found" }));
  await enterLocalBook(page);
  await expect(page.getByRole("heading", { name: "Ota englannin oppikirja käyttöön" })).toBeVisible();
  const fixture = gzipSync(Buffer.from(JSON.stringify(tinyStructuralFixture()), "utf8"));
  await page.locator("input[type=file]").first().setInputFiles({ name: "content.pack.json.gz", mimeType: "application/gzip", buffer: fixture });
  await expect(page.getByRole("heading", { name: "English Master", exact: true })).toBeVisible();
  await expect(page.locator(".los-front-banner")).toBeVisible();
  await expect(page.locator(".los-sidebar-chapter-group")).toHaveCount(1);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "English Master", exact: true })).toBeVisible();

  await page.locator(".los-book-main").getByRole("button", { name: "Sisällysluettelo", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Sisällysluettelo", exact: true })).toBeVisible();
  await expect(page.locator(".em-los-contents-part")).toHaveCount(1);
  await expect(page.locator(".em-los-contents .los-contents-list li")).toHaveCount(122);

  await page.getByRole("button", { name: "Oppikirja", exact: true }).click();
  await expect(page.locator(".em-chapter h1")).toHaveText("How English Sentences Work");
  await expect(page.locator(".los-opening-head")).toBeVisible();
  await expect(page.locator(".los-chapter-links button")).toHaveCount(1);
  await expect(page.locator(".los-pagination")).toBeVisible();
  await expect(page.locator(".em-los-section-nav .los-section-step")).toHaveCount(2);
  await expect(page.getByRole("combobox", {name:"Valitse luvun osio"})).toHaveValue("0");
  await page.getByRole("button", {name:"Seuraava osio"}).click();
  await expect(page.getByRole("combobox", {name:"Valitse luvun osio"})).toHaveValue("1");
  await page.getByRole("button", {name:"Edellinen osio"}).click();
  await expect(page.getByRole("combobox", {name:"Valitse luvun osio"})).toHaveValue("0");
  // Exact LOS! reader controls are reused, not an English-only imitation.
  await page.locator(".los-display-settings > summary").click();
  await page.getByLabel("Tekstin koko").selectOption("large");
  await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-size", "large");
  await expect(page.getByText("Tämä on vain testin sisältöä.").first()).toBeVisible();

  await page.getByRole("button", { name: "Opetuspolku", exact: true }).click();
  await expect(page.getByText("Test lesson 1", {exact:true})).toBeVisible();
  await expect(page.locator(".em-teacher-resume")).toContainText("0/192");
  await page.getByRole("button", { name: "Aloita Teacher 2.0", exact: true }).click();
  await expect(page.locator(".em-teacher-app")).toBeVisible();
  await expect(page.locator(".los-teacher-layout")).toBeVisible();
  await expect(page.locator(".los-teacher-paper")).toBeVisible();
  await expect(page.locator(".los-teacher-outline")).toBeVisible();
  await expect(page.getByRole("progressbar", { name: "Oppitunnin opetustilanteet" }))
    .toHaveAttribute("aria-valuemax", "7");
  await expect(page.getByRole("heading", { name: "Aloitus ja tavoitteet" })).toBeVisible();
  await page.getByRole("button", { name: "Keskeytä oppitunti" }).click();
  await expect(page.getByRole("heading", { name: "Oppitunti keskeytetty" })).toBeVisible();
  await page.getByRole("button", { name: "Jatka opetusta" }).first().click();
  await page.getByRole("button", { name: "Seuraava", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Sääntö" })).toBeVisible();
  await page.getByRole("button", { name: "Seuraava", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Ensimmäinen vaihe" })).toBeVisible();
  await page.getByRole("button", { name: "Olen käynyt opetustaulun vaiheen läpi" }).click();
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Ensimmäinen vaihe" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Harjoittelu vahvistettu" })).toBeVisible();
  await page.getByRole("button", { name: "Seuraava", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Toinen vaihe" })).toBeVisible();
  await page.getByRole("button", { name: "Olen käynyt opetustaulun vaiheen läpi" }).click();
  await page.getByRole("button", { name: "Seuraava", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Avaa aihe oppikirjassa" })).toBeVisible();
  const textbookLink=page.getByRole("link",{name:/Avaa kirjassa/});
  await expect(textbookLink).toHaveAttribute("target","_blank");
  await expect(textbookLink).toHaveAttribute("href",/lessonReturn=EM-LP-J01-L001#\/book\/G01/);
  const popupPromise=page.waitForEvent("popup");
  await textbookLink.click();
  const reader=await popupPromise;
  await expect(reader.getByRole("heading",{name:"How English Sentences Work"})).toBeVisible();
  await expect(reader.getByRole("button",{name:/Palaa oppituntiin/})).toBeVisible();
  await reader.getByRole("button",{name:/Palaa oppituntiin/}).click();
  await expect(reader.locator(".em-teacher-app")).toBeVisible();
  await expect(reader.getByRole("heading",{name:"Avaa aihe oppikirjassa"})).toBeVisible();
  await reader.close();
  await expect(page.getByRole("heading",{name:"Avaa aihe oppikirjassa"})).toBeVisible();
  await page.getByRole("button", { name: "Seuraava", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Harjoitus 1" })).toBeVisible();
  // The exact LOS! Teacher 2.0 engine enforces the same retry / hint policy.
  await page.getByRole("button", { name: /I studies English\./ }).click();
  await expect(page.locator(".los-teacher-feedback")).toContainText("Katsotaan tätä vielä");
  await page.getByRole("button", { name: /I studies English\./ }).click();
  await expect(page.getByRole("button", { name: "Näytä mallivastaus" })).toBeVisible();
  await page.getByRole("button", { name: /I study English\./ }).click();
  await expect(page.locator(".los-teacher-feedback")).toContainText("Oikein");
  await expect(page.locator(".los-teacher-feedback")).toContainText("Täysin itsenäinen näyttö arvioidaan erikseen.");
  await page.getByRole("button", { name: "Seuraava", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Kertaa ja päätä oppitunti" })).toBeVisible();
  await page.getByRole("button", { name: "Merkitse oppitunti läpikäydyksi" }).click();
  await page.getByRole("button", { name: "Oma edistyminen" }).click();
  await expect(page.getByText("1 / 192")).toBeVisible();
  // Backups must contain the real shared Teacher 2.0 session, including
  // attempts and persisted navigation, not only a superficial completion flag.
  const downloadPromise=page.waitForEvent("download");
  await page.getByRole("button",{name:"Vie opiskelun varmuuskopio"}).click();
  const downloaded=await downloadPromise;
  const backup=JSON.parse(await readFile(await downloaded.path(),"utf8")) as {
    schema:string;teacherSessions:Record<string,{schemaVersion:number;attempts:unknown[]}>;
  };
  const firstLessonId="EM-LP-J01-L001";
  expect(backup.schema).toBe("em-native-progress-1");
  expect(backup.teacherSessions[firstLessonId]?.schemaVersion).toBe(1);
  expect(backup.teacherSessions[firstLessonId]?.attempts).toHaveLength(3);
  const savedKey="em-teacher-core-v1-"+owner+"-"+firstLessonId;
  await page.evaluate(key=>localStorage.removeItem(key),savedKey);
  await page.locator(".em-import-button input[type=file]").setInputFiles({
    name:"english-master-oma-varmuuskopio.json",mimeType:"application/json",
    buffer:Buffer.from(JSON.stringify(backup)),
  });
  await expect.poll(()=>page.evaluate(key=>{
    const data=localStorage.getItem(key);
    return data?JSON.parse(data).attempts.length:0;
  },savedKey)).toBe(3);
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("English Master requires the same local device entry as LOS!", async ({ page }) => {
  await page.goto("/english-master", { waitUntil: "domcontentloaded" });
  // In clean contexts the book displays a gate, never silently exposes private progress.
  await expect(page.getByRole("heading", { name: /English Master kuuluu Opintopäiväkirjaan/ })).toBeVisible();
});

test("English Master loads the real 122/192/20 content automatically and keeps it after reload", async ({ page }) => {
  await enterLocalBook(page);
  await expect(page.getByRole("heading", { name: "English Master", exact: true })).toBeVisible({ timeout: 45_000 });
  await expect(page.getByText("122 kirjalukua")).toBeVisible();
  await page.getByRole("button", { name: "Oppikirja", exact: true }).click();
  await page.getByRole("button", { name: "Avaa kaikki", exact: true }).click();
  await expect(page.locator(".em-los-toc-chapter")).toHaveCount(122);
  await page.getByRole("button", { name: "Opetuspolku", exact: true }).click();
  await expect(page.locator(".em-unit")).toHaveCount(32);
  await page.getByRole("button", { name: "Kuuntelu", exact: true }).click();
  await expect(page.locator(".em-audio-grid article")).toHaveCount(20);
  await page.reload({ waitUntil: "domcontentloaded" });
  // A reload must preserve the current section, not return to the book front.
  await expect(page).toHaveURL(/\/english-master#\/listening$/);
  await expect(page.getByRole("heading", { name: "Kuuntelu", exact: true })).toBeVisible({ timeout: 30_000 });
  await expect(page.locator(".em-audio-grid article")).toHaveCount(20);
  await expect(page.getByRole("heading", { name: "Ota englannin oppikirja käyttöön" })).toHaveCount(0);
});


test("the FIRST and LAST real English Master lessons run the actual Teacher 2.0 interface and survive reload", async ({page})=>{
  await enterLocalBook(page);
  await expect(page.locator(".los-front")).toBeVisible({timeout:45_000});
  await page.goto("/english-master#/path",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".em-unit")).toHaveCount(32);

  const first=page.locator(".em-unit").first().locator("li button").first();
  const firstTitle=await first.locator(".los-path-copy strong").textContent();
  await first.click();
  await expect(page.locator(".em-teacher-app")).toBeVisible();
  await expect(page.locator(".los-teacher-sidebar h1")).toHaveText(firstTitle!);
  await expect(page.locator(".los-teacher-outline nav button").first()).toBeVisible();
  await expect(page.getByRole("button",{name:"Keskeytä oppitunti"})).toBeVisible();
  await page.getByRole("button",{name:"Seuraava",exact:true}).click();
  const firstStep=await page.locator(".los-teacher-paper h2").textContent();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper h2")).toHaveText(firstStep!);
  await expectNoHorizontalOverflow(page);

  await page.setViewportSize({width:320,height:780});
  await page.goto("/english-master#/path",{waitUntil:"domcontentloaded"});
  const last=page.locator(".em-unit").last().locator("li button").last();
  const lastTitle=await last.locator(".los-path-copy strong").textContent();
  await last.click();
  await expect(page.locator(".em-teacher-app")).toBeVisible();
  await expect(page.locator(".los-teacher-sidebar h1")).toHaveText(lastTitle!);
  await expect(page.locator(".los-teacher-paper")).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper")).toBeVisible();
  await expect(page.getByRole("progressbar",{name:"Oppitunnin opetustilanteet"})).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("real introductory A00/A08 teacher references open native pages and return without completion", async ({page})=>{
  await enterLocalBook(page);
  await expect(page.locator(".los-front")).toBeVisible({timeout:45_000});
  await page.goto("/english-master#/lesson/EM-LP-J01-L01",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".em-teacher-app")).toBeVisible();
  await page.locator(".los-teacher-outline nav").getByRole("button",{name:"Avaa aihe oppikirjassa"}).click();
  const chapterLinks=page.locator(".los-teacher-book-links a");
  await expect(chapterLinks).toHaveCount(2);
  await expect(chapterLinks.nth(0)).toHaveAttribute("href",/lessonReturn=EM-LP-J01-L01#\\/home$/);
  await expect(chapterLinks.nth(1)).toHaveAttribute("href",/lessonReturn=EM-LP-J01-L01#\\/path$/);
  for(const index of [0,1]){
    const pop=page.waitForEvent("popup");
    await chapterLinks.nth(index).click();
    const reader=await pop;
    await expect(reader.locator(".em-teacher-return")).toBeVisible();
    await expect(reader.locator(".em-teacher-return")).toContainText("Sivulla käyminen ei merkitse oppituntia");
    await reader.getByRole("button",{name:"Palaa oppituntiin"}).click();
    await expect(reader.locator(".em-teacher-app")).toBeVisible();
    await expect(reader.getByRole("heading",{name:"Avaa aihe oppikirjassa"})).toBeVisible();
    await reader.close();
  }
  await expect(page.getByRole("heading",{name:"Avaa aihe oppikirjassa"})).toBeVisible();
});

test("English Master mobile drawer mirrors LOS!: focus trap, Escape, body scroll lock and navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await enterLocalBook(page);
  await expect(page.getByRole("heading", { name: "English Master", exact: true })).toBeVisible({ timeout: 45_000 });
  await page.getByRole("button", { name: "Avaa sisällysluettelo" }).click();
  const drawer = page.getByRole("dialog", { name: "English Masterin sisällysluettelo" });
  await expect(drawer).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(drawer.getByRole("button", { name: "Sulje sisällysluettelo" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(drawer).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.getByRole("button", { name: "Avaa sisällysluettelo" })).toBeFocused();
  await page.getByRole("button", { name: "Avaa sisällysluettelo" }).click();
  await page.getByRole("dialog", { name: "English Masterin sisällysluettelo" })
    .getByRole("button", { name: "Oppikirja", exact: true }).click();
  await expect(page.locator(".em-chapter h1")).toBeVisible();
  await expect(page.getByRole("dialog", { name: "English Masterin sisällysluettelo" })).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("English Master book shares LOS! 1 persistent text size, line spacing and measure controls", async ({ page }) => {
  await enterLocalBook(page);
  await expect(page.getByRole("heading", { name: "English Master", exact: true })).toBeVisible({ timeout: 45_000 });
  await page.getByRole("button", { name: "Oppikirja", exact: true }).click();
  await page.locator(".los-display-settings > summary").click();
  await page.getByLabel("Tekstin koko").selectOption("extra");
  await page.getByLabel("Riviväli").selectOption("relaxed");
  await page.getByLabel("Lukurivin leveys").selectOption("narrow");
  await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-size", "extra");
  await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-spacing", "relaxed");
  await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-measure", "narrow");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-size", "extra");
  await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-spacing", "relaxed");
  await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-measure", "narrow");
});

test("English Master reuses the LOS! v4 editorial layouts at 1440, 390 and 320 pixels", async ({ page }, testInfo) => {
  await enterLocalBook(page);
  await expect(page.locator(".los-front")).toBeVisible({ timeout: 45_000 });
  const scenes = [
    { slug: "front", hash: "#/home", selector: ".los-front" },
    { slug: "contents", hash: "#/contents", selector: ".em-los-contents" },
    { slug: "chapter", hash: "#/book/G01", selector: ".los-opening" },
    { slug: "lessons", hash: "#/path", selector: ".los-learning-path" },
    { slug: "teacher-2", hash: "#/lesson", selector: ".em-teacher-app" },
  ] as const;

  for (const size of [{ name: "desktop", width: 1440, height: 900 },
    { name: "mobile390", width: 390, height: 844 },
    { name: "mobile320", width: 320, height: 780 }] as const) {
    await page.setViewportSize({ width: size.width, height: size.height });
    for (const scene of scenes) {
      await page.goto("/english-master" + scene.hash, { waitUntil: "domcontentloaded" });
      await expect(page.locator(scene.selector).first()).toBeVisible({ timeout: 45_000 });
      await expectNoHorizontalOverflow(page);
      await page.screenshot({
        path: testInfo.outputPath("english-master-v4-" + size.name + "-" + scene.slug + ".png"),
        fullPage: false, animations: "disabled",
      });
    }
  }

  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/english-master#/book/G01", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".em-los-section-nav")).toBeVisible({ timeout: 45_000 });
  const sectionNav = page.locator(".em-los-section-nav");
  await expect(sectionNav.getByRole("combobox", { name: "Valitse luvun osio" })).toBeVisible();
  await sectionNav.locator(".los-display-settings summary").click();
  const bounds = await sectionNav.locator(".los-display-settings-panel").evaluate(el => {
    const rect = el.getBoundingClientRect();
    return { left: rect.left, right: rect.right, viewport: window.innerWidth };
  });
  expect(bounds.left).toBeGreaterThanOrEqual(0);
  expect(bounds.right).toBeLessThanOrEqual(bounds.viewport + 1);
  await expectNoHorizontalOverflow(page);

  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await sectionNav.locator(".los-display-settings summary").click();
  await page.screenshot({
    path: testInfo.outputPath("english-master-v4-mobile320-dark-chapter.png"),
    fullPage: false, animations: "disabled",
  });
  await expectNoHorizontalOverflow(page);
});

test("English Teacher 2.0 saves stage and drafts locally without claiming automatic mastery", async ({ page }) => {
  await enterLocalBook(page);
  await expect(page.locator(".los-front")).toBeVisible({ timeout: 45_000 });
  await page.goto("/english-master#/lesson", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".em-teacher-app")).toBeVisible({ timeout: 45_000 });
  await expect(page.locator(".los-teacher-sidebar")).toBeVisible();
  await expect(page.locator(".los-teacher-paper")).toBeVisible();
  await page.getByRole("button", { name: "Keskeytä oppitunti" }).click();
  await expect(page.getByRole("heading", { name: "Oppitunti keskeytetty" })).toBeVisible();
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Oppitunti keskeytetty" })).toBeVisible({ timeout: 45_000 });
  await page.getByRole("button", { name: "Jatka opetusta" }).first().click();
  await expect(page.locator(".los-teacher-paper")).toBeVisible();
  const saved = await page.evaluate(() => Object.keys(localStorage)
    .filter(key => key.startsWith("em-teacher-core-v1-") && !key.endsWith("-archive")));
  expect(saved).toHaveLength(1);
  await expect(page.getByRole("button", { name: "Merkitse oppitunti läpikäydyksi" })).toHaveCount(0);
});

test("English Teacher 2.0 reflows on narrow mobile screens without importing German lesson content", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await enterLocalBook(page);
  await expect(page.locator(".los-front")).toBeVisible({ timeout: 45_000 });
  await page.goto("/english-master#/lesson", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".em-teacher-app")).toBeVisible({ timeout: 45_000 });
  await expect(page.locator(".los-teacher-sidebar")).toBeVisible();
  await expect(page.locator(".los-teacher-paper")).toBeVisible();
  await expect(page.locator(".los-teacher-outline")).not.toHaveAttribute("open");
  const teacherPaperTop = await page.locator(".los-teacher-paper").evaluate(el=>el.getBoundingClientRect().top);
  expect(teacherPaperTop, "The teaching surface must appear above the fold on a 320px phone").toBeLessThan(780);
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath("english-master-teacher-2-mobile320.png"), animations: "disabled" });
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath("english-master-teacher-2-mobile320-dark.png"), animations: "disabled" });
});

test("English Teacher 2.0 resume chooses the actual unfinished shared-engine session", async ({page})=>{
  await enterLocalBook(page);
  await expect(page.locator(".los-front")).toBeVisible({timeout:45_000});
  await page.goto("/english-master#/path",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".em-teacher-resume")).toContainText("0/192");
  const start=page.getByRole("button",{name:"Aloita Teacher 2.0",exact:true});
  await expect(start).toBeVisible();
  await start.click();
  await expect(page.locator(".em-teacher-app")).toBeVisible();
  await page.getByRole("button",{name:"Seuraava",exact:true}).click();
  const current=await page.locator(".los-teacher-paper h2").textContent();
  expect(current).toBeTruthy();
  await page.locator(".los-teacher-back").click();
  await expect(page.locator(".em-teacher-resume")).toContainText("Jatka siitä, mihin jäit");
  await page.getByRole("button",{name:"Jatka Teacher 2.0:ssa"}).click();
  await expect(page.locator(".los-teacher-paper h2")).toHaveText(current!);
  await expect(page.locator(".los-teacher-save")).not.toContainText("Tallennus epäonnistui");
  await expectNoHorizontalOverflow(page);
});
