import { test } from "node:test";
import assert from "node:assert/strict";
import { getFacsimileSwipeDirection } from "../src/features/los/facsimile/los1/navigation.ts";
const base = { startX: 120, deltaX: -85, deltaY: 9, zoom: 100, continuous: false, beganOnControl: false, fingers: 1 };
test("facsimile swipes turn a leaf only for a deliberate single-finger horizontal gesture", () => {
  assert.equal(getFacsimileSwipeDirection(base), 1);
  assert.equal(getFacsimileSwipeDirection({...base, deltaX: 90}), -1);
  assert.equal(getFacsimileSwipeDirection({...base, deltaX: 36}), null);
  assert.equal(getFacsimileSwipeDirection({...base, deltaY: 100}), null);
});
test("facsimile leaves pinch, panning, native back-edge and controls alone", () => {
  assert.equal(getFacsimileSwipeDirection({...base, zoom: 125}), null);
  assert.equal(getFacsimileSwipeDirection({...base, fingers: 2}), null);
  assert.equal(getFacsimileSwipeDirection({...base, startX: 8}), null);
  assert.equal(getFacsimileSwipeDirection({...base, continuous: true}), null);
  assert.equal(getFacsimileSwipeDirection({...base, beganOnControl: true}), null);
});
