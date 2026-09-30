import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const files = [
  "../src/components/PracticeView.tsx",
  "../src/components/StudyDialogs.tsx",
  "../src/components/AICoach.tsx",
  "../src/components/CourseLearningTools.tsx",
  "../src/components/LearningOSV5Panels.tsx",
  "../src/components/ExamSimulationV5.tsx",
  "../src/components/ContrastiveErrorLab.tsx",
  "../src/components/StudyViews.tsx",
  "../src/components/Onboarding.tsx",
  "../src/routes/index.tsx",
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
    "Opittu esimerkki",
    "Transfer-tehtävä",
    "Mixed practice",
    "Metakognitiivinen kalibrointi",
    "Oman arvion tarkkuus ajan myötä",
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
    new URL("../src/components/StudyViews.tsx", import.meta.url),
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
