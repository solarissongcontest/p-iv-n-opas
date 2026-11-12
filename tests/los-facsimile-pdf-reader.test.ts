import assert from "node:assert/strict";
import {test} from "node:test";
import {
  LOS1_C01_PDF_CONTRACT,visiblePdfLeaves,turnPdfLeaf,
  validatePdfGeometry,validateC01TextALayer,
} from "../src/features/los/facsimile/los1/pdfReaderModel.ts";

test("draft B5 PDF contract matches C01 printed page map",()=>{
  assert.equal(LOS1_C01_PDF_CONTRACT.pageCount,15);
  assert.equal(LOS1_C01_PDF_CONTRACT.textAPdfPage,5);
  assert.equal(validatePdfGeometry(498.96,708.96,15),null);
  assert.match(validatePdfGeometry(595.28,841.89,15)??"",/B5/);
  assert.match(validatePdfGeometry(498.96,708.96,17)??"",/17/);
});
test("cover and inside-cover remain single, C01 opening is paired in order",()=>{
  assert.deepEqual(visiblePdfLeaves(0,15,true),[0]);
  assert.deepEqual(visiblePdfLeaves(1,15,true),[1]);
  assert.deepEqual(visiblePdfLeaves(2,15,true),[2,3]);
  assert.deepEqual(visiblePdfLeaves(3,15,true),[2,3]);
  assert.deepEqual(visiblePdfLeaves(14,15,true),[14]);
  assert.deepEqual(visiblePdfLeaves(7,15,false),[7]);
});
test("spread navigation never skips or exceeds PDF page bounds",()=>{
  assert.equal(turnPdfLeaf(0,15,true,1),1);
  assert.equal(turnPdfLeaf(1,15,true,1),2);
  assert.equal(turnPdfLeaf(3,15,true,1),4);
  assert.equal(turnPdfLeaf(4,15,true,-1),3);
  assert.equal(turnPdfLeaf(0,15,true,-1),0);
  assert.equal(turnPdfLeaf(14,15,true,1),14);
  assert.equal(turnPdfLeaf(8,15,false,1),9);
});
test("C01 original source text must exist in the page text layer",()=>{
  assert.equal(validateC01TextALayer(["Franz:","Hallo!","Jörg:","Guten Tag!"]),null);
  assert.match(validateC01TextALayer(["Nur ein Bild"])??"",/Text A/);
});
