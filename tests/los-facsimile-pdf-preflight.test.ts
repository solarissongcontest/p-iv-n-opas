import assert from "node:assert/strict";
import {test} from "node:test";
import {readFileSync} from "node:fs";
import {
  LOS1_C01_DRAFT_PDF_SPECS,LOS1_C02_DRAFT_PDF_SPECS,LOS1_C03_DRAFT_PDF_SPECS,LOS1_C04_DRAFT_PDF_SPECS,parsePdfInfo,inspectDraftPdf,
} from "../scripts/los1-facsimile-pdf-preflight.mjs";

const info=[
  "Title: LOS 1 pilot",
  "Pages:          15",
  "Page size:      498.90 x 708.66 pts (176 x 250 mm)",
  "Tagged:         yes",
].join("\n");
const textContent="Franz Jörg Hallo Wortschatz Grammatik ".repeat(45);

test("B5 print preflight accepts searchable, exact 15-leaf draft only",()=>{
  const result=inspectDraftPdf({info,text:textContent});
  assert.equal(result.ok,true);
  assert.equal(result.pages,15);
  assert.equal(LOS1_C01_DRAFT_PDF_SPECS.widthMm,176);
  assert.equal(LOS1_C01_DRAFT_PDF_SPECS.heightMm,250);
});

test("PDF parser preserves independent physical page count and dimensions",()=>{
  assert.deepEqual(parsePdfInfo(info),{pages:15,widthPts:498.9,heightPts:708.66});
});

test("preflight rejects extra pages, A4 and picture-only nonsearchable exports",()=>{
  const extra=inspectDraftPdf({info:info.replace("Pages:          15","Pages:          16"),text:textContent});
  assert.ok(extra.errors.some(e=>e.includes("Sivumäärä")));
  const a4=inspectDraftPdf({info:info.replace("498.90 x 708.66","595.28 x 841.89"),text:textContent});
  assert.ok(a4.errors.some(e=>e.includes("Sivukoko")));
  const imageOnly=inspectDraftPdf({info,text:""});
  assert.ok(imageOnly.errors.some(e=>e.includes("tekstikerroksesta")));
  assert.ok(imageOnly.errors.some(e=>e.includes("lyhyt")));
});

test("export uses existing owner-gated reader print leaves instead of duplicated content",()=>{
  const exporter=readFileSync("scripts/los1-facsimile-export.mjs","utf8");
  const printCss=readFileSync("src/features/los/facsimile/los1/facsimile.css","utf8");
  assert.match(exporter,/\/los#\/1\/facsimile/);
  assert.match(exporter,/los-facs-print-only \.los-facs-leaf/);
  assert.match(exporter,/preferCSSPageSize:true/);
  assert.match(printCss,/@page\s*\{\s*size:\s*176mm 250mm/);
  assert.match(printCss,/\.los-facs-reader > :not\(\.los-facs-print-only\)/);
});

test("C02 draft preflight verifies fourteen B5 leaves and both original dialogues",()=>{
  const c02Info=info.replace("Pages:          15","Pages:          14");
  const content="Franz Greta Thomas Takashi Wortschatz Grammatik Ich heiße ".repeat(45);
  const accepted=inspectDraftPdf({info:c02Info,text:content,spec:LOS1_C02_DRAFT_PDF_SPECS});
  assert.equal(accepted.ok,true);
  assert.equal(accepted.pages,14);
  assert.equal(LOS1_C02_DRAFT_PDF_SPECS.widthMm,176);
  assert.equal(LOS1_C02_DRAFT_PDF_SPECS.heightMm,250);
  const incomplete=inspectDraftPdf({
    info:c02Info,text:"Franz Greta Wortschatz Grammatik ".repeat(45),
    spec:LOS1_C02_DRAFT_PDF_SPECS,
  });
  assert.ok(incomplete.errors.some(e=>e.includes("Thomas")));
  const extra=inspectDraftPdf({info,text:content,spec:LOS1_C02_DRAFT_PDF_SPECS});
  assert.ok(extra.errors.some(e=>e.includes("Sivumäärä")));
});

test("C03 PDF requires exactly 14 B5 leaves and both complete source names",()=>{
  const infoC03=info.replace("Pages:          15","Pages:          14");
  const content="Lisa Müller Woher Deutschland Bern Thomas Takashi Wortschatz Grammatik ".repeat(38);
  const checked=inspectDraftPdf({info:infoC03,text:content,spec:LOS1_C03_DRAFT_PDF_SPECS});
  assert.equal(checked.ok,true);
  assert.equal(checked.pages,14);
  const missing=inspectDraftPdf({info:infoC03,text:"Lisa Müller Woher Deutschland Bern ".repeat(50),
    spec:LOS1_C03_DRAFT_PDF_SPECS});
  assert.ok(missing.errors.some(e=>e.includes("Thomas")));
  const extra=inspectDraftPdf({info,text:content,spec:LOS1_C03_DRAFT_PDF_SPECS});
  assert.ok(extra.errors.some(e=>e.includes("Sivumäärä")));
});

test("C04 PDF must have 16 B5 leaves and both sources visible in searchable text",()=>{
  const c04Info=info.replace("Pages:          15","Pages:          16");
  const tokens="Schmidt Standish Ihnen Guten Morgen Wie geht es Sie heißt du heißen Sie Wortschatz Grammatik Moin Servus Bis bald Gute Nacht Duzen siezen ";
  const accepted=inspectDraftPdf({info:c04Info,text:tokens.repeat(38),spec:LOS1_C04_DRAFT_PDF_SPECS});
  assert.equal(accepted.ok,true);
  assert.equal(accepted.pages,16);
  assert.equal(LOS1_C04_DRAFT_PDF_SPECS.widthMm,176);
  assert.equal(LOS1_C04_DRAFT_PDF_SPECS.heightMm,250);
  const lostGreet=inspectDraftPdf({
    info:c04Info,text:"Schmidt Standish Ihnen Guten Morgen Wie geht es Sie heißt du heißen Sie Wortschatz Grammatik ".repeat(40),
    spec:LOS1_C04_DRAFT_PDF_SPECS,
  });
  assert.ok(lostGreet.errors.some(e=>e.includes("Moin")));
  const wrongCount=inspectDraftPdf({info,text:tokens.repeat(38),spec:LOS1_C04_DRAFT_PDF_SPECS});
  assert.ok(wrongCount.errors.some(e=>e.includes("Sivumäärä")));
});
