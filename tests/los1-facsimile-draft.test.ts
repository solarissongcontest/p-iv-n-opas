import assert from "node:assert/strict";
import { test } from "node:test";
import {
  LOS1_DRAFT_PAGES, getDraftVisiblePageIndexes, moveDraftPage, validateDraftPages,
} from "../src/features/los/facsimile/los1/draftPages.ts";

test("LOS! 1 pilot page map has unique, contiguous physical spreads", () => {
  assert.deepEqual(validateDraftPages(LOS1_DRAFT_PAGES), []);
  assert.equal(LOS1_DRAFT_PAGES[0]?.kind, "cover");
  assert.ok(LOS1_DRAFT_PAGES.every(page => page.printedPageLabel === null));
});

test("cover remains single and chapter opening has left/right pairing", () => {
  assert.deepEqual(getDraftVisiblePageIndexes(LOS1_DRAFT_PAGES, 0, "spread"), [0]);
  assert.deepEqual(getDraftVisiblePageIndexes(LOS1_DRAFT_PAGES, 5, "spread"), [5, 6]);
  assert.deepEqual(getDraftVisiblePageIndexes(LOS1_DRAFT_PAGES, 6, "spread"), [5, 6]);
  assert.deepEqual(getDraftVisiblePageIndexes(LOS1_DRAFT_PAGES, 6, "single"), [6]);
});

test("spread turns advance to the next spread without skipping the cover", () => {
  assert.equal(moveDraftPage(LOS1_DRAFT_PAGES, 0, "spread", 1), 1);
  assert.equal(moveDraftPage(LOS1_DRAFT_PAGES, 1, "spread", 1), 3);
  assert.equal(moveDraftPage(LOS1_DRAFT_PAGES, 6, "spread", 1), 7);
  assert.equal(moveDraftPage(LOS1_DRAFT_PAGES, 7, "spread", -1), 6);
  assert.equal(moveDraftPage(LOS1_DRAFT_PAGES, 0, "spread", -1), 0);
  assert.equal(moveDraftPage(LOS1_DRAFT_PAGES, 8, "spread", 1), 8);
});
