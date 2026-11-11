import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { LOS_BOOKS } from "../src/features/los/books.ts";
import { evaluateExercise } from "../src/features/los/exercises/evaluate.ts";
import { validateBook } from "../src/features/los/model.ts";
import { LOS1_C01_AUTHENTIC_TEXT, LOS1_C01_DIALOGUE_TURNS } from "../src/features/los/los1-c01-source.ts";
import { LOS1_C01_GREETING_AUDIO_LINES } from "../src/features/los/los1-c01-audio-list.ts";
import { findGlossarySpans } from "../src/features/los/glossary.ts";
import { LOS_CHAPTER_SECTION_TITLES } from "../src/features/los/chapterSections.ts";

const los1 = LOS_BOOKS[0];
if (!los1) throw new Error("LOS! 1 must exist");

test("LOS! 1 retains 10 chapters and 60 canonical lessons, with fifty-six preview lessons", () => {
  assert.equal(los1.chapters.length, 10);
  assert.equal(los1.lessons.length, 60);
  assert.deepEqual(los1.chapters.map(item => item.id), Array.from({ length: 10 }, (_, i) => "C" + String(i + 1).padStart(2, "0")));
  assert.deepEqual(los1.lessons.map(item => item.id), Array.from({ length: 60 }, (_, i) => "L" + String(i + 1).padStart(3, "0")));
  assert.equal(los1.chapters.filter(item => item.publicationStatus === "preview").length, 10);
  assert.equal(los1.chapters.filter(item => item.publicationStatus === "published").length, 0);
  assert.deepEqual(los1.lessons.filter(item => item.publicationStatus === "preview").map(item => item.id), ["L001", "L002", "L003", "L004", "L005", "L006", "L007", "L008", "L009", "L010", "L011", "L012", "L013", "L014", "L015", "L016", "L017", "L018", "L019", "L020", "L021", "L022", "L023", "L024", "L025", "L026", "L027", "L028", "L029", "L030", "L031", "L032", "L033", "L034", "L035", "L036", "L037", "L038", "L039", "L040", "L041", "L042", "L043", "L045", "L046", "L047", "L048", "L050", "L051", "L053", "L055", "L056", "L057", "L058", "L059", "L060"]);
  assert.ok(los1.lessons.filter(item => item.publicationStatus !== "preview").every(item => !item.steps.length));
  assert.deepEqual(validateBook(los1), []);
});
test("each planned chapter exposes exactly ten routable sections", () => {
  const ids = LOS_CHAPTER_SECTION_TITLES.map(section => section.id);
  assert.equal(ids.length, 10);
  assert.equal(new Set(ids).size, 10);
  for (const chapter of los1.chapters) {
    assert.deepEqual(chapter.sections?.map(section => section.id), ids);
    assert.ok(chapter.sections?.every(section =>
      section.blockIds.every(id => chapter.blockIds.includes(id)) &&
      section.exerciseIds.every(id => chapter.exerciseIds.includes(id))));
  }
  const first = los1.chapters[0];
  assert.ok(first);
  assert.equal(first.sections?.find(section => section.id === "teksti-a")?.blockIds.includes("los1-c01-m-com-01-dialogue"), true);
  assert.equal(first.sections?.find(section => section.id === "teksti-b")?.publicationStatus, "preview");
  assert.equal(first.sections?.find(section => section.id === "tarkista")?.publicationStatus, "preview");
  assert.equal(first.sections?.find(section => section.id === "kulttuuri")?.exerciseIds.length, 2);
  assert.equal(first.sections?.find(section => section.id === "kielioppi")?.exerciseIds.length, 5);
  assert.equal(first.sections?.find(section => section.id === "harjoittele")?.exerciseIds.length, 12);
  assert.ok(first.sections?.find(section => section.id === "kayta")?.blockIds.includes("los1-c01-application-writing"));
  assert.equal(first.sections?.filter(section => section.publicationStatus === "planned").length, 0);
});
test("L001 begins without prerequisite German and stores an ungraded personal goal", () => {
  const lesson = los1.lessons.find(item => item.id === "L001");
  assert.ok(lesson);
  assert.equal(lesson.publicationStatus, "preview");
  assert.ok(lesson.steps.length >= 5);
  const reflection = lesson.steps.find(step => step.reflectionPromptFi);
  assert.ok(reflection);
  assert.equal(reflection.required, true);
  assert.equal(reflection.blockId, undefined);
  assert.equal(reflection.exerciseId, undefined);
  assert.ok(lesson.steps.some(step => step.blockId === "los1-c01-m-com-01-dialogue"));
  assert.ok(lesson.steps.some(step => step.blockId === "los1-c01-m-com-01-audio"));
});
test("two Commons media sources verified, with separate Goethe culture reference", () => {
  assert.equal(los1.sources.length, 30);
  assert.equal(los1.sources.filter(source => source.permittedMode === "pending").length, 10);
  const source = los1.sources.find(item => item.id === "M-COM-01");
  assert.equal(source?.permittedMode, "embed");
  assert.equal(source?.licenseUrl, "https://creativecommons.org/licenses/by-sa/3.0/");
  const dialogue = los1.blocks.find(block => block.kind === "dialogue");
  assert.ok(dialogue && dialogue.kind === "dialogue");
  assert.equal(dialogue.turns.length, 8);
  assert.deepEqual(dialogue.turns.map(turn => turn.text), LOS1_C01_DIALOGUE_TURNS.map(turn => turn.text));
  assert.equal(LOS1_C01_AUTHENTIC_TEXT, LOS1_C01_DIALOGUE_TURNS.map(turn => turn.text).join("\n"));
  assert.ok(los1.blocks.some(block => block.kind === "media" && block.sourceId === "M-COM-01"));
  assert.equal(los1.blocks.filter(block => block.kind === "dialogue").length, 14);
  assert.equal(los1.blocks.filter(block => block.kind === "dialogue" && block.sourceId === "M-COM-01").length, 2);
  const list = los1.blocks.find(block => block.kind === "transcript");
  assert.ok(list && list.kind === "transcript");
  assert.equal(list.lines.length, 20);
  assert.deepEqual(list.lines.map(line => line.de), LOS1_C01_GREETING_AUDIO_LINES.map(line => line.de));
  assert.equal(los1.sources.find(source => source.id === "M-COM-03")?.permittedMode, "embed");
  assert.equal(los1.sources.find(source => source.id === "M-COM-03")?.licenseOrBasis,
    "Public domain - tekijän oma vapaa luovutus");
  assert.ok(los1.blocks.some(block => block.kind === "media" && block.sourceId === "M-COM-03"));
  const licensedAudio = los1.blocks.filter(block => block.kind === "media" &&
    ["M-COM-01", "M-COM-03"].includes(block.sourceId));
  assert.equal(licensedAudio.length, 4);
  assert.equal(new Set(licensedAudio.map(block => block.kind === "media" ? block.sourceId : "")).size, 2);
  assert.ok(licensedAudio.every(block => block.kind === "media" &&
    block.embedUrl.startsWith("https://upload.wikimedia.org/wikipedia/commons/") &&
    block.mp3Url?.startsWith("https://upload.wikimedia.org/wikipedia/commons/transcoded/") &&
    block.mp3Url.endsWith(".ogg.mp3")));

});
test("C01's 52 combined exercises across eight interaction families are indexed", () => {
  const c01 = los1.chapters.find(chapter => chapter.id === "C01");
  assert.ok(c01);
  assert.equal(c01.exerciseIds.length, 52);
  assert.ok(c01.blockIds.length >= 8);
  const choice = los1.exercises.find(ex => ex.type === "single-choice");
  const gap = los1.exercises.find(ex => ex.type === "gap-fill");
  const match = los1.exercises.find(ex => ex.type === "matching");
  const highlight = los1.exercises.find(ex => ex.type === "highlight");
  assert.ok(choice && gap && match && highlight);
  assert.equal(evaluateExercise(choice, "morning")?.correct, true);
  assert.equal(evaluateExercise(choice, "night")?.correct, false);
  assert.equal(evaluateExercise(gap, "morgen")?.correct, true);
  assert.equal(evaluateExercise(gap, "abend")?.correct, false);
  assert.equal(evaluateExercise(match, { morgen:"morning", abend:"evening", tag:"day", tschuess:"bye" })?.correct, true);
  assert.equal(evaluateExercise(match, { morgen:"evening", abend:"morning", tag:"day", tschuess:"bye" })?.correct, false);
  assert.equal(evaluateExercise(highlight, highlight.acceptedRanges[0] ?? null)?.correct, true);
});
test("C02 chapter has ten connected preview sections, not counterfeit source text", () => {
  const chapter = los1.chapters.find(item => item.id === "C02");
  assert.ok(chapter);
  assert.equal(chapter.sections?.length, 10);
  assert.equal(chapter.sections?.filter(item => item.publicationStatus === "preview").length, 10);
  assert.equal(chapter.blockIds.length, 19);
  assert.equal(chapter.exerciseIds.length, 38);
  const audio = los1.blocks.find(block => block.id === "los1-c02-commons-02-audio");
  assert.ok(audio && audio.kind === "media");
  assert.equal(audio.sourceId, "M-COM-02");
  const sourced = los1.sources.find(item => item.id === "M-COM-02");
  assert.equal(sourced?.permittedMode, "embed");
  assert.equal(sourced?.licenseUrl, "https://creativecommons.org/licenses/by-sa/3.0/");
  const editorial = los1.blocks.find(block => block.id === "los1-c02-text-a-editorial");
  assert.ok(editorial && editorial.kind === "dialogue");
  assert.equal(editorial.turns.length, 8);
  assert.equal(editorial.sourceId, "LOS-EDITORIAL-C02");
  assert.notEqual(editorial.sourceId, "M-WB-01");
  assert.equal(los1.chapterTests.find(item => item.chapterId === "C02")?.exerciseIds.length, 15);
  assert.equal(los1.lessons.filter(lesson => lesson.chapterId === "C02" && lesson.publicationStatus === "preview").length, 5);
});
test("original-source highlighting is tied to the full licensed dialogue", () => {
  const exercise = los1.exercises.find(item => item.id === "los1-c01-text-a-highlight-greeting");
  assert.ok(exercise && exercise.type === "highlight");
  assert.equal(exercise.text, LOS1_C01_AUTHENTIC_TEXT);
  assert.equal(exercise.blockId, "los1-c01-m-com-01-dialogue");
  assert.equal(evaluateExercise(exercise, { start: 0, end: 5 })?.correct, true);
  assert.equal(evaluateExercise(exercise, { start: 0, end: 8 })?.correct, false);
});
test("curated dictionary lookup matches whole words and prioritizes phrases", () => {
  const entries = [
    { id: "hello", de: "hallo", fi: "hei" },
    { id: "i", de: "ich", fi: "minä" },
    { id: "until", de: "bis", fi: "saakka" },
    { id: "soon", de: "bis später", fi: "nähdään myöhemmin" },
  ];
  const spans = findGlossarySpans("Hallo, ich heiße Franz. Bis später!", entries);
  assert.deepEqual(spans.map(span => ({ value: "Hallo, ich heiße Franz. Bis später!".slice(span.start, span.end), id: span.entry.id })), [
    { value: "Hallo", id: "hello" },
    { value: "ich", id: "i" },
    { value: "Bis später", id: "soon" },
  ]);
  assert.deepEqual(findGlossarySpans("nicht", [{ id: "i", de: "ich", fi: "minä" }]), []);
});
test("C01 application is an editable original task and not a scored source text", () => {
  const block = los1.blocks.find(block => block.id === "los1-c01-application-writing");
  assert.ok(block && block.kind === "production");
  assert.equal(block.criteriaFi.length, 3);
  assert.ok(block.modelDe.includes("Guten Morgen"));
  const culture = los1.blocks.find(block => block.id === "los1-c01-culture-greetings");
  assert.ok(culture && culture.kind === "paragraph");
  assert.equal(culture.sourceId, "GOETHE-REGIONAL-GREETINGS-01");
  assert.ok(los1.sources.some(source => source.id === culture.sourceId &&
    source.originalUrl?.startsWith("https://www.goethe.de/")));
});
test("LOS! cloud schema requires ownership, RLS and idempotent write constraints", () => {
  const sql = readFileSync("supabase/migrations/20261110214000_los_personal_records.sql", "utf8");
  assert.match(sql, /enable row level security/i);
  assert.match(sql, /owner_id\s*=\s*\(select auth.uid\(\)\)/i);
  assert.match(sql, /security invoker/i);
  assert.match(sql, /client_updated_at\s*<=\s*excluded.client_updated_at/i);
  assert.match(sql, /revoke all on table\s+public.los_user_records\s+from anon/i);
});
