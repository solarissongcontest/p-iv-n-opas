import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS1_SOURCE_REGISTRY, findLosSource, getLosChapterSourceGate,
  isLosSourcePublishable, validateLosSourceRegistry } from "../src/features/los/content/sourceRegistry.ts";

test("two original native-speaker pronunciation samples are registered with independent CC BY-SA 4.0 evidence", () => {
  for (const id of ["M-COM-04","M-COM-05"]) {
    const source=findLosSource(id);
    assert.ok(source);
    assert.equal(source.kind,"source");
    assert.equal(source.licenseCode,"CC BY-SA 4.0");
    assert.equal(source.licenseUrl,"https://creativecommons.org/licenses/by-sa/4.0/");
    assert.match(source.sourceUrl,/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.equal(source.licenseEvidenceUrl,source.sourceUrl);
    assert.equal(source.stage,"rights-verified");
    assert.equal(source.integrated,true);
    assert.equal(source.deviceTested,false);
    assert.equal(source.mediaTested,false);
    assert.equal(source.languageReviewed,false);
    assert.equal(source.published,false);
    assert.equal(isLosSourcePublishable(source),false);
    assert.match(source.description,/ääntämisnäyte/);
  }
  assert.equal(LOS1_SOURCE_REGISTRY.length,31);
  assert.deepEqual(validateLosSourceRegistry(),[]);
});
test("C05 has full separate source dialogue while old pronunciation samples remain available", () => {
  const source=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
  const audio=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(source,/\["01","04","05","06","07","08","09","10"\]\.includes\(chapter.id\)/);
  const full=readFileSync("src/features/los/content/los1TextBAdditional.ts","utf8");
  assert.match(full,/sourceId:"M-COM-08"/);
  assert.match(full,/textAttribution:/);
  assert.match(full,/LOS1_C02_LINES/);
  assert.match(audio,/M-COM-08/);
  assert.match(audio,/Dialogue_franz_greta_1\.ogg/);
  assert.match(audio,/M-COM-04/);
  assert.match(audio,/M-COM-05/);
  assert.match(audio,/De-wie_geht_es_dir\.ogg/);
  assert.match(audio,/De-Wie_geht%27s%3F\.ogg/);
  assert.equal(findLosSource("M-COM-08")?.licenseCode,"public-domain");
  assert.equal(findLosSource("M-COM-08")?.published,false);
  assert.equal(getLosChapterSourceGate("05").ready,false);
});
