import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const files = [
  "../src/features/practice/PracticeView.tsx",
  "../src/features/today/TodayView.tsx",
  "../src/features/planner/PlanView.tsx",
  "../src/features/studies/CourseView.tsx",
  "../src/features/exams/ExamsView.tsx",
  "../src/features/progress/ProgressView.tsx",
  "../src/features/settings/SettingsView.tsx",
  "../src/features/session/SessionForm.tsx",
  "../src/features/search/SearchPanel.tsx",
  "../src/components/AICoach.tsx",
  "../src/components/CourseLearningTools.tsx",
  "../src/components/LearningOSV5Panels.tsx",
  "../src/components/ExamSimulationV5.tsx",
  "../src/components/ContrastiveErrorLab.tsx",
  "../src/components/Onboarding.tsx",
  "../src/app/StudyApp.tsx",
  "../src/lib/error-page.ts",
  "../src/lib/push.ts",
  "../src/routes/api.device-auth.ts",
  "../src/routes/api.push.test.ts",
  "../src/routes/api.push.subscribe.ts",
  "../src/routes/api.push.unsubscribe.ts",
  "../src/routes/api.push.public-key.ts",
  "../src/components/ui/carousel.tsx",
  "../src/components/ui/pagination.tsx",
  "../src/components/ui/sidebar.tsx",
  "../src/components/ui/dialog.tsx",
  "../src/components/ui/sheet.tsx",
  "../src/components/ui/breadcrumb.tsx",
  "../src/lib/learning-engine.ts",
  "../src/lib/learning-os-v4.ts",
  "../src/lib/learning-os-v5.ts",
  "../src/lib/domain.ts",
];

const source = files
  .map((file) => readFileSync(new URL(file, import.meta.url), "utf8"))
  .join("\n");

test("user-facing UI does not regress to known English product jargon", () => {
  const forbidden = [
    "Practice Mode",
    "Preview Challenge",
    "Diagnostic Mode",
    "Worked example",
    "Knowledge Graph",
    "Retention Budget v5",
    "What-if Planner",
    "Delayed Calibration",
    "Friction learning",
    "Reminder Tapering",
    "Subject × task",
    "Personal Experiment Engine",
    "Adaptive Retention Budget",
    "Adaptive Feedback",
    "Behavior Engine",
    "YO Mode",
    "Exam Blueprint",
    "Exam buffer",
    "Session Fatigue",
    "Learning Engine ·",
    "Contrastive Error Lab",
    ">Not assessed<",
    ">Developing<",
    ">At risk<",
    'title="Forecast"',
    ">Forecast<",
    "Recovery success",
    "recoveryistä",
    "autosavetettu",
    "tehtäväblokki",
    "koetason evidenssiksi",
    "Dataa ei ole vielä tarpeeksi",
    "Osaamiskartta v4",
    "viivevarmistus",
    "Opittu esimerkki",
    "Transfer-tehtävä",
    "Mixed practice",
    "Metakognitiivinen kalibrointi",
    "Viivästetty varmuusarvio",
    "Hyvin kalibroitu",
    "Coach-yhteys",
    "tehtäväblokki",
    "autosavetettu",
    "koetason evidenssiksi",
    "mastery-neutraali",
    "mastery-rangaistus",
    "evidence confidence",
    "relation-tyyppisiä",
    "paikallinen fallback",
    "Tietosuoja ja AI",
    "Concept / Rubric Evaluator",
    "Dependency-ehdotukset",
    "Exam Mode ja valmius",
    "This page didn't load",
    "Something went wrong on our end",
    "Missing server environment variable",
    "Previous slide",
    "Next slide",
    "Toggle Sidebar",
    ">Previous</span>",
    ">Next</span>",
    ">Close</span>",
    "Web Push on käytössä",
    "Push-tilauksen tallennus epäonnistui",
    "Push-tilauksen poisto epäonnistui",
    "Push-avain puuttuu",
    "Kaikkea ei voitu synkata vielä",
    "Synkattiin ",
    "Try again",
    "Seuraavan viikon fokus",
    '<html lang="en">',
  ];
  for (const phrase of forbidden) {
    assert.equal(source.includes(phrase), false, phrase);
  }
});

test("raw dependency enum values are never shown as option labels", () => {
  const tool = readFileSync(
    new URL("../src/components/CourseLearningTools.tsx", import.meta.url),
    "utf8",
  );
  for (const raw of [
    "prerequisite",
    "depends_on",
    "builds_on",
    "related_to",
    "commonly_confused_with",
  ]) {
    assert.equal(tool.includes(`>${raw}<`), false, raw);
  }
  for (const label of [
    "Esitieto",
    "Riippuu aiheesta",
    "Rakentuu aiheen varaan",
    "Liittyy aiheeseen",
    "Sekoittuu helposti aiheeseen",
  ]) {
    assert.equal(tool.includes(label), true, label);
  }
});

test("critical adaptive-learning controls have Finnish display labels", () => {
  const panels = readFileSync(
    new URL("../src/components/LearningOSV5Panels.tsx", import.meta.url),
    "utf8",
  );
  const settings = readFileSync(
    new URL("../src/features/settings/SettingsView.tsx", import.meta.url),
    "utf8",
  );
  for (const phrase of [
    "Mukautuva kertausbudjetti",
    "Vaihtoehtojen vertailu",
    "Oman arvion tarkkuus ajan myötä",
    "Opiskelun esteiden tunnistus",
    "Muistutusten vähentäminen",
    "Oppiaine- ja tehtävätyyppikohtainen mukautus",
  ]) assert.equal(panels.includes(phrase), true, phrase);

  for (const phrase of [
    "Mukautuva opiskelu",
    "Henkilökohtaiset oppimiskokeilut",
    "Mukautuva palaute",
    "YO / Abitti 2 -vastaavuus",
  ]) assert.equal(settings.includes(phrase), true, phrase);
});

test("exam and practice engines generate Finnish stage labels", () => {
  const engine = readFileSync(
    new URL("../src/lib/learning-engine.ts", import.meta.url),
    "utf8",
  );
  const domain = readFileSync(
    new URL("../src/lib/domain.ts", import.meta.url),
    "utf8",
  );
  for (const phrase of [
    "Sisältökierros",
    "Muistista palautus",
    "Vaihtelevat tehtävät",
    "Soveltaminen",
    "Koesimulaatio",
    "Virheiden korjaus",
  ]) {
    assert.equal(engine.includes(phrase), true, "engine: " + phrase);
    assert.equal(domain.includes(phrase), true, "domain: " + phrase);
  }
});


test("shared accessibility and fatal-error copy is Finnish", () => {
  const expected = new Map([
    ["../src/components/ui/carousel.tsx", ["Edellinen dia", "Seuraava dia"]],
    ["../src/components/ui/pagination.tsx", ["Edellinen", "Seuraava", "Lisää sivuja"]],
    ["../src/components/ui/sidebar.tsx", ["Sivupalkki", "Näytä tai piilota sivupalkki"]],
    ["../src/components/ui/dialog.tsx", ["Sulje"]],
    ["../src/components/ui/sheet.tsx", ["Sulje"]],
    ["../src/components/ui/breadcrumb.tsx", ["Sivupolku", "Lisää"]],
    ["../src/lib/error-page.ts", ['<html lang="fi">', "Sivua ei voitu ladata", "Päivitä sivu", "Palaa etusivulle"]],
  ]);
  for (const [file, phrases] of expected) {
    const text = readFileSync(new URL(file, import.meta.url), "utf8");
    for (const phrase of phrases) assert.equal(text.includes(phrase), true, file + ": " + phrase);
  }
});


test("unknown display enums stay Finnish instead of exposing raw identifiers", () => {
  const labels = readFileSync(new URL("../src/lib/ui-fi.ts", import.meta.url), "utf8");
  assert.equal(labels.includes('value.replaceAll("_", " ")'), false);
  for (const phrase of [
    "muu yhteys",
    "ei vielä arvioitu",
    "muu osa-alue",
    "muu tehtävätyyppi",
    "muu vaihe",
    "muu tila",
    "ei luokiteltu",
    "muu vastaustapa",
  ]) assert.equal(labels.includes(phrase), true, phrase);
});


test("mobile screenshot regressions stay fully Finnish and natural", () => {
  const relations = readFileSync(new URL("../src/components/CourseLearningTools.tsx", import.meta.url), "utf8");
  const practice = readFileSync(new URL("../src/features/practice/PracticeView.tsx", import.meta.url), "utf8");
  const mistakes = readFileSync(new URL("../src/components/ContrastiveErrorLab.tsx", import.meta.url), "utf8");
  const exam = readFileSync(new URL("../src/components/ExamSimulationV5.tsx", import.meta.url), "utf8");

  for (const phrase of [
    "Aiheiden yhteydet",
    "Esitieto",
    "Riippuu aiheesta",
    "Rakentuu aiheen varaan",
    "Liittyy aiheeseen",
    "Sekoittuu helposti aiheeseen",
  ]) assert.equal(relations.includes(phrase), true, phrase);

  for (const raw of [
    ">prerequisite<",
    ">depends_on<",
    ">builds_on<",
    ">related_to<",
    ">commonly_confused_with<",
  ]) assert.equal(relations.includes(raw), false, raw);

  for (const phrase of [
    "Harjoittelutila",
    "Kartoita lähtötaso",
    "varatehtävä",
    "vaihteleva harjoittelu",
    "ei vaikuta osaamistasoon",
  ]) assert.equal(practice.includes(phrase), true, phrase);

  for (const phrase of [
    "Virheen korjaus",
    "Oma aiempi ratkaisu",
    "Myöhempi varmistustehtävä",
  ]) assert.equal(mistakes.includes(phrase), true, phrase);

  for (const phrase of [
    "Vastaukset tallennetaan automaattisesti",
    "tehtäväkokonaisuus",
    "koetason osaamisnäytöksi",
  ]) assert.equal(exam.includes(phrase), true, phrase);

  for (const awkward of [
    "Knowledge Graph",
    "Preview Challenge",
    "Contrastive Error Lab",
    "autosavetettu",
    "tehtäväblokki",
    "koetason evidenssiksi",
  ]) {
    assert.equal((relations+practice+mistakes+exam).includes(awkward), false, awkward);
  }
});


test("document and install metadata stay explicitly Finnish", () => {
  const root = readFileSync(new URL("../src/routes/__root.tsx", import.meta.url), "utf8");
  const manifest = JSON.parse(
    readFileSync(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"),
  ) as { lang?: string; name?: string; description?: string };

  assert.match(root, /<html lang="fi">/);
  assert.equal(manifest.lang, "fi");
  assert.equal(manifest.name, "Opintopäiväkirja");
  assert.match(manifest.description ?? "", /opisk/i);
});

test("static visible UI copy does not reintroduce English developer vocabulary", () => {
  const roots = [
    new URL("../src/components/", import.meta.url),
    new URL("../src/features/", import.meta.url),
    new URL("../src/app/", import.meta.url),
    new URL("../src/routes/", import.meta.url),
  ];
  const forbidden =
    /\b(?:Preview|Practice|Diagnostic|Knowledge|Coach|Mastery|Retrieval|Retention|Forecast|Fallback|Autopilot|Assisted|Manual|Extra|Secure|Strong|Developing|Session|Learning)\b/i;
  const failures: string[] = [];

  const visit = (directory: URL) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
      if (entry.isDirectory()) {
        visit(url);
        continue;
      }
      if (!entry.name.endsWith(".tsx")) continue;

      const text = readFileSync(url, "utf8");
      const visible = [...text.matchAll(/>([^<>{}]+)</g)]
        .map((match) => match[1]!.replace(/\s+/g, " ").trim())
        .filter((copy) => Boolean(copy) && !/[=]{2,}|=>|>=|<=/.test(copy));
      const props = [...text.matchAll(/\b(?:title|placeholder|aria-label|label)=["']([^"']+)["']/g)]
        .map((match) => match[1]!.trim());
      const toasts = [...text.matchAll(/toast\.(?:success|error|info)\(\s*["'`]([^"'`]+)["'`]/g)]
        .map((match) => match[1]!.trim());

      for (const copy of [...visible, ...props, ...toasts]) {
        if (forbidden.test(copy)) failures.push(entry.name + ": " + copy);
      }
    }
  };

  for (const root of roots) visit(root);
  assert.deepEqual(failures, []);
});
