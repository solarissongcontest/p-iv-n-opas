import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

test("PDF.js stays an owner-gated LOS! 1 subview, not a public PDF route",()=>{
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const pilot=readFileSync("src/features/los/facsimile/los1/Los1FacsimilePilot.tsx","utf8");
  assert.match(book,/readCachedDeviceUser\(\)/);
  assert.match(book,/section === "facsimile-pdf" && book\.id===1 \? <Los1PdfReader/);
  assert.match(book,/section === "facsimile" && book\.id===1 \? <Los1FacsimilePilot/);
  assert.match(pilot,/Avaa PDF\.js-lukija/);
});
test("PDF.js reads local bytes, uses self-hosted worker and keeps the PDF on-device",()=>{
  const reader=readFileSync("src/features/los/facsimile/los1/Los1PdfReader.tsx","utf8");
  const pkg=JSON.parse(readFileSync("package.json","utf8"));
  assert.equal(pkg.dependencies["pdfjs-dist"],"5.7.284");
  assert.match(reader,/pdfjs-dist\/legacy\/build\/pdf\.worker\.min\.mjs\?url/);
  assert.match(reader,/pdfjs-dist\/legacy\/build\/pdf\.mjs/);
  assert.match(reader,/file\.arrayBuffer\(\)/);
  assert.match(reader,/pdfjs\.getDocument\(\{data:new Uint8Array\(buffer\)\}\)/);
  assert.doesNotMatch(reader,/fetch\(|axios\(|formData|uploadTo/);
  assert.match(reader,/new pdfjs\.TextLayer\(/);
  assert.match(reader,/validatePdfGeometry/);
  assert.match(reader,/validateC01TextALayer/);
  assert.match(reader,/getFacsimileSwipeDirection/);
});
test("local preview must never claim release or published PDF URL",()=>{
  const reader=readFileSync("src/features/los/facsimile/los1/Los1PdfReader.tsx","utf8");
  assert.match(reader,/ei julkaistu painos/);
  assert.match(reader,/Paikallinen C01/);
  assert.doesNotMatch(reader,/\/public\/los\/.*\.pdf/);
});
