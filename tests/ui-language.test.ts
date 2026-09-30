import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  attemptOutcomeLabel,
  attemptTypeLabel,
  confidenceLabel,
  dimensionLabel,
  errorCategoryLabel,
  eventKindLabel,
  masteryLabelFi,
  planPhaseLabel,
  plannerModeLabel,
  relationLabel,
  riskLabel,
  simulationProfileLabel,
  stimulusFieldLabel,
  yoPhaseLabel,
} from "../src/lib/ui-fi.ts";

const root=new URL("..",import.meta.url);
const componentsDir=new URL("../src/components/",import.meta.url);

const forbiddenEnglish=/\b(?:Preview|Practice|Diagnostic|Knowledge|Coach|Mastery|Retrieval|Retention|Forecast|Fallback|Autopilot|Assisted|Manual|Extra|Secure|Strong|Developing|Session|Learning|AI|API)\b/i;

function componentSource(name:string){
  return readFileSync(new URL("../src/components/"+name,import.meta.url),"utf8");
}

test("static visible component text does not expose English developer vocabulary",()=>{
  const files=readdirSync(componentsDir).filter(name=>name.endsWith(".tsx"));
  const failures:string[]=[];
  for(const file of files){
    const source=componentSource(file);
    const visible=[...source.matchAll(/>([^<>{}]+)</g)].map(match=>match[1]!.replace(/\s+/g," ").trim()).filter(Boolean);
    const props=[...source.matchAll(/\b(?:title|placeholder|aria-label|label)=["']([^"']+)["']/g)].map(match=>match[1]!.trim());
    const toasts=[...source.matchAll(/toast\.(?:success|error|info)\(\s*["'`]([^"'`]+)["'`]/g)].map(match=>match[1]!.trim());
    for(const text of [...visible,...props,...toasts]){
      if(forbiddenEnglish.test(text))failures.push(file+": "+text);
    }
  }
  assert.deepEqual(failures,[]);
});

test("known developer-facing labels never render as raw UI labels",()=>{
  const surfaces=[
    "CourseLearningTools.tsx","PracticeView.tsx","StudyViews.tsx","StudyDialogs.tsx",
    "AICoach.tsx","LearningOSV5Panels.tsx","ExamSimulationV5.tsx","ContrastiveErrorLab.tsx",
  ].map(componentSource).join("\n");

  for(const phrase of [
    "Knowledge Graph","Preview Challenge","Practice Mode","Diagnostic Mode","Worked example",
    "What-if Planner","Retention Budget","Friction learning","Reminder Tapering","Subject × task",
    "Learning OS","Session Fatigue","Exam Blueprint","YO Mode","Web Push","Contrastive Error Lab",
    "autosavetettu","tehtäväblokki","relation-tyyppisiä","Dataa ei ole vielä tarpeeksi.",
  ]){
    assert.equal(surfaces.includes(phrase),false,phrase);
  }

  const relations=componentSource("CourseLearningTools.tsx");
  for(const raw of ["prerequisite","depends_on","builds_on","related_to","commonly_confused_with"]){
    assert.doesNotMatch(relations,new RegExp(">\\s*"+raw+"\\s*<"));
  }

  const progress=componentSource("StudyViews.tsx");
  for(const phrase of ['["Not assessed"','["Developing"','["At risk"','title="Forecast"','title="Osaamiskartta v4"']){
    assert.equal(progress.includes(phrase),false,phrase);
  }
});

test("engine-generated learner copy stays Finnish",()=>{
  const files=["learning-os-v4.ts","learning-os-v5.ts","learning-engine.ts","practice-rubric.ts"];
  const source=files.map(name=>readFileSync(new URL("../src/lib/"+name,import.meta.url),"utf8")).join("\n");
  for(const phrase of [
    "Preview Challenge kartoittaa","Transfer-tehtävä","Mixed practice","Coachia. Tarvitaan",
    "Next Best Action pysyy","Review Queue ei","Mastery ja confidence","evidenssin varmuuden",
    "koko tehtäväblokin","Rubriikki näkee","Rubriikki ei vielä","Secure/Strong-tasolla",
  ]){
    assert.equal(source.includes(phrase),false,phrase);
  }
});

test("internal enum values have explicit Finnish presentation labels",()=>{
  assert.equal(relationLabel("prerequisite"),"esitieto");
  assert.equal(relationLabel("depends_on"),"riippuu aiheesta");
  assert.equal(relationLabel("builds_on"),"rakentuu aiheen varaan");
  assert.equal(relationLabel("related_to"),"liittyy aiheeseen");
  assert.equal(relationLabel("commonly_confused_with"),"sekoittuu helposti aiheeseen");
  assert.equal(confidenceLabel("very_low"),"erittäin vähäinen");
  assert.equal(riskLabel("high"),"suuri");
  assert.equal(masteryLabelFi("Not assessed"),"Ei vielä arvioitu");
  assert.equal(masteryLabelFi("At risk"),"Riskissä");
  assert.equal(dimensionLabel("calibration"),"varmuusarvion osuvuus");
  assert.equal(plannerModeLabel("autopilot"),"Automaattinen");
  assert.equal(planPhaseLabel("review"),"kertaus");
  assert.equal(attemptTypeLabel("free_recall"),"vapaa muistista palautus");
  assert.equal(attemptOutcomeLabel("not_yet"),"ei vielä onnistunut");
  assert.equal(eventKindLabel("mastery"),"osaaminen");
  assert.equal(yoPhaseLabel("exam_practice"),"Koetyylinen harjoittelu");
  assert.equal(simulationProfileLabel("frequent_forgetting"),"Asiat unohtuvat tavallista nopeammin");
  assert.equal(errorCategoryLabel("prerequisite"),"puuttuva esitieto");
  assert.equal(stimulusFieldLabel("context"),"Taustatieto");
});
