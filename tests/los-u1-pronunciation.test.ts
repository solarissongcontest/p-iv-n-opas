import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  getLosPronunciation, LOS_PRONUNCIATIONS, normalizeLosGermanHeadword,
} from "../src/features/los/pronunciation.ts";

test("U1: only source-inspected German IPA has a source and explicit review status", () => {
  assert.equal(LOS_PRONUNCIATIONS.length, 15);
  for (const item of LOS_PRONUNCIATIONS) {
    assert.equal(item.language, "de");
    assert.equal(item.region, "de-DE");
    assert.ok(item.targetType === "lemma" || item.targetType === "phrase");
    assert.equal(item.ipaReviewStatus, "source-verified");
    assert.match(item.ipa ?? "", /[^\s]/u);
    assert.match(item.ipaSourceUrl ?? "", /^https:\/\/de\.wiktionary\.org\/wiki\//);
    assert.deepEqual(item.audioAssets, []);
  }
});

test("U1: de word normalization preserves umlaut, ß and token matching", () => {
  assert.equal(normalizeLosGermanHeadword("Tschüss!"), "tschüss");
  assert.equal(normalizeLosGermanHeadword("„Ich,“"), "ich");
  assert.equal(getLosPronunciation("Hallo!")?.ipa, "ˈhalo");
  assert.equal(getLosPronunciation("tschüss!")?.ipa, "t͡ʃʏs");
  assert.equal(getLosPronunciation("WIE")?.ipa, "viː");
});

test("U1: never manufacture IPA for unverified phrases or unknown inflections", () => {
  assert.equal(getLosPronunciation("Guten Tag!")?.ipa, "ˌɡutn̩ ˈtaːk");
  assert.equal(getLosPronunciation("Guten Morgen!")?.targetType, "phrase");
  assert.equal(getLosPronunciation("Gute Nacht!")?.ipa, "ˌɡutə ˈnaxt");
  assert.equal(getLosPronunciation("Auf Wiedersehen!")?.ipa, "aʊ̯f ˈviːdɐˌzeːən");
  assert.equal(getLosPronunciation("Bitte!")?.ipa, "ˈbɪtə");
  assert.equal(getLosPronunciation("Bis später!"), null);
  assert.equal(getLosPronunciation("Wie heißt du?"), null);
  assert.equal(getLosPronunciation("heiße"), null);
  assert.equal(getLosPronunciation("foobar"), null);
});
