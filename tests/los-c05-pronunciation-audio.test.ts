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
  assert.equal(LOS1_SOURCE_REGISTRY.length,26);
  assert.deepEqual(validateLosSourceRegistry(),[]);
});
test("C05 text B remains pending, not silently promoted after audio samples", () => {
  const source=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
  const audio=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(source,/chapter\.id==="05"/);
  assert.match(source,/LosAuthenticAudio chapterId="05" source="B"/);
  assert.match(source,/Varsinainen Text B on vielä kesken/);
  assert.match(source,/eivät Heinrichin ja Karlin keskustelun äänitys/);
  assert.match(audio,/M-COM-04/);
  assert.match(audio,/M-COM-05/);
  assert.match(audio,/De-wie_geht_es_dir\.ogg/);
  assert.match(audio,/De-Wie_geht%27s%3F\.ogg/);
  assert.match(audio,/Mobiilitoistoa ei ole vielä varmennettu/);
  assert.equal(getLosChapterSourceGate("05").ready,false);
});
