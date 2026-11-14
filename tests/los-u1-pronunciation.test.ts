import { strict as assert } from "node:assert";
import {readFileSync} from "node:fs";
import { test } from "node:test";
import {
  getLosPronunciation, getLosSourcedWordIpaParts, LOS_PRONUNCIATIONS, normalizeLosGermanHeadword,
} from "../src/features/los/pronunciation.ts";

test("U1: only source-inspected German IPA has a source and explicit review status", () => {
  assert.equal(LOS_PRONUNCIATIONS.length, 17);
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
  assert.equal(getLosPronunciation("Bis")?.ipa, "bɪs");
  assert.equal(getLosPronunciation("später")?.ipa, "ˈʃpɛːtɐ");
  assert.equal(getLosPronunciation("Später!")?.ipaSourceId, "de.wiktionary:später");
  assert.equal(getLosPronunciation("Bis!")?.ipaSourceUrl, "https://de.wiktionary.org/wiki/bis");
});

test("U1: never manufacture IPA for unverified phrases or unknown inflections", () => {
  assert.equal(getLosPronunciation("Guten Tag!")?.ipa, "ˌɡutn̩ ˈtaːk");
  assert.equal(getLosPronunciation("Guten Morgen!")?.targetType, "phrase");
  assert.equal(getLosPronunciation("Gute Nacht!")?.ipa, "ˌɡutə ˈnaxt");
  assert.equal(getLosPronunciation("Auf Wiedersehen!")?.ipa, "aʊ̯f ˈviːdɐˌzeːən");
  assert.equal(getLosPronunciation("Bitte!")?.ipa, "ˈbɪtə");
  assert.equal(getLosPronunciation("Bis später!"), null, "word-level IPA never implies full-phrase IPA");
  assert.equal(getLosPronunciation("Bis später!")?.ipa, undefined);
  assert.equal(getLosPronunciation("Wie heißt du?"), null);
  assert.equal(getLosPronunciation("heiße"), null);
  assert.equal(getLosPronunciation("foobar"), null);
});

test("U1: a phrase card can show individually sourced IPA without inventing the full phrase",()=>{
  const pieces=getLosSourcedWordIpaParts("Bis später!");
  assert.deepEqual(pieces.map(part=>[part.word,part.ipa]),[
    ["Bis","bɪs"],["später!","ˈʃpɛːtɐ"],
  ]);
  assert.deepEqual(pieces.map(part=>part.sourceUrl),[
    "https://de.wiktionary.org/wiki/bis",
    "https://de.wiktionary.org/wiki/sp%C3%A4ter",
  ]);
  assert.deepEqual(getLosSourcedWordIpaParts("Bis"),[]);
  assert.deepEqual(getLosSourcedWordIpaParts("Wie heißt du?"),[],
    "incomplete sourced token sets must not be displayed as if complete");
  assert.equal(getLosPronunciation("Bis später!"),null);
  const card=readFileSync("src/features/los/LosDictionaryCard.tsx","utf8");
  assert.match(card,/getLosSourcedWordIpaParts\(word\)/);
  assert.match(card,/eivät ole koko ilmauksen ääntämismalli/);
  assert.match(card,/wordIpaParts\.map/);
  assert.match(card,/href=\{part\.sourceUrl\}/);
});
