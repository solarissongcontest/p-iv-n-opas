import { expect, test } from "@playwright/test";
import { gzipSync } from "node:zlib";

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
  await enterLocalBook(page);
  await expect(page.getByRole("heading", { name: "Ota englannin oppikirja käyttöön" })).toBeVisible();
  const fixture = gzipSync(Buffer.from(JSON.stringify(tinyStructuralFixture()), "utf8"));
  await page.locator("input[type=file]").first().setInputFiles({ name: "content.pack.json.gz", mimeType: "application/gzip", buffer: fixture });
  await expect(page.getByRole("heading", { name: "English Master", exact: true })).toBeVisible();
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "English Master", exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Oppikirja" }).click();
  await expect(page.getByText("How English Sentences Work")).toBeVisible();
  await expect(page.getByText("Tämä on vain testin sisältöä.").first()).toBeVisible();

  await page.getByRole("button", { name: "Opetuspolku" }).click();
  await expect(page.getByText("Test lesson 1")).toBeVisible();
  await page.getByRole("button", { name: /Test lesson 1/ }).first().click();
  await page.locator(".em-task input[type=radio]").first().check();
  await page.getByRole("button", { name: "Tarkista vastaus" }).click();
  await expect(page.getByRole("status")).toContainText("Oikein");
  await page.getByRole("button", { name: /Merkitse harjoitelluksi/ }).click();
  await page.getByRole("button", { name: "Oma edistyminen" }).click();
  await expect(page.getByText("1 / 192")).toBeVisible();
});

test("English Master requires the same local device entry as LOS!", async ({ page }) => {
  await page.goto("/english-master", { waitUntil: "domcontentloaded" });
  // In clean contexts the book displays a gate, never silently exposes private progress.
  await expect(page.getByRole("heading", { name: /English Master kuuluu Opintopäiväkirjaan/ })).toBeVisible();
});
