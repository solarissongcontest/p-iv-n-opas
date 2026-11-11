import assert from "node:assert/strict";
import test from "node:test";
import { LOS_BOOKS } from "../src/features/los/books.ts";
import {
  addCalendarDays, bookReviewCards, localDay, nextReview,
  reviewCounts, reviewQueue, reviewedAnswerCorrect,
  REVIEW_INTERVAL_DAYS, type ReviewLedger,
} from "../src/features/los/spacedReview.ts";

const book = LOS_BOOKS[0];
if (!book) throw new Error("Missing LOS! 1");
const cards = bookReviewCards(book);
const first = cards[0];
if (!first) throw new Error("C01 should contain real vocabulary");

test("only genuinely authored book vocabulary enters the review deck", () => {
  assert.ok(cards.length >= 10);
  assert.ok(cards.every(card => card.bookId === book.id));
  assert.equal(new Set(cards.map(card => card.id)).size, cards.length);
  for (const forthcoming of LOS_BOOKS.slice(1)) assert.deepEqual(bookReviewCards(forthcoming), []);
});

test("review answers use correct German Unicode but do not accept misspellings", () => {
  const umlaut = { ...first, de: "später" };
  assert.equal(reviewedAnswerCorrect("  SPA\u0308TER  ", umlaut), true);
  assert.equal(reviewedAnswerCorrect("spater", umlaut), false);
  assert.equal(reviewedAnswerCorrect("später!", umlaut), false);
  assert.equal(reviewedAnswerCorrect("  ", umlaut), false);
});

test("review intervals progress 1, 3, 7, 14, 30 local calendar days", () => {
  let row = undefined;
  const days = ["2026-11-11","2026-11-12","2026-11-15","2026-11-22","2026-12-06"];
  const expected = ["2026-11-12","2026-11-15","2026-11-22","2026-12-06","2027-01-05"];
  for (let i = 0; i < REVIEW_INTERVAL_DAYS.length; i++) {
    row = nextReview(row, first, true, days[i]!);
    assert.equal(row.stage, i);
    assert.equal(row.dueOn, expected[i]);
    assert.equal(row.successes, i + 1);
    assert.equal(row.attempts, i + 1);
  }
  row = nextReview(row, first, true, expected.at(-1)!);
  assert.equal(row.stage, 4);
  assert.equal(row.dueOn, "2027-02-04");
});

test("an incorrect attempt resets the interval, not the historical evidence", () => {
  const initial = nextReview(undefined, first, true, "2026-11-11");
  const returned = nextReview(initial, first, false, "2026-11-12");
  assert.equal(returned.stage, 0);
  assert.equal(returned.dueOn, "2026-11-13");
  assert.equal(returned.successes, 1);
  assert.equal(returned.attempts, 2);
  assert.equal(returned.lastCorrect, false);
});

test("calendar arithmetic uses dates, not 24-hour local DST transitions", () => {
  assert.equal(addCalendarDays("2026-03-28", 3), "2026-03-31");
  assert.equal(addCalendarDays("2026-10-24", 3), "2026-10-27");
  assert.equal(addCalendarDays("2026-12-30", 3), "2027-01-02");
  assert.equal(localDay(new Date(2026, 10, 11, 12)), "2026-11-11");
});

test("review queue caps one batch, prioritizes due and does not create backlog debt", () => {
  const start = reviewQueue(cards, {}, "2026-11-11", 8);
  assert.equal(start.length, Math.min(8, cards.length));
  const ledger: ReviewLedger = {
    [first.id]: nextReview(undefined, first, true, "2026-11-10"),
  };
  assert.equal(reviewCounts(cards, ledger, "2026-11-11").due, 1);
  const queue = reviewQueue(cards, ledger, "2026-11-11", 8);
  assert.equal(queue[0]?.id, first.id);
  assert.equal(queue.length, 8);
  assert.equal(reviewQueue(cards, ledger, "2026-11-10", 0).length, 0);
  const future = reviewCounts(cards, ledger, "2026-11-10");
  assert.equal(future.upcoming, 1);
  assert.equal(future.due, 0);
  // An overdue card remains one card, never 30 duplicate missed-day tasks.
  assert.equal(reviewCounts(cards, ledger, "2027-02-01").due, 1);
});

test("content revisions reset the schedule without inventing prior success", () => {
  const old = nextReview(undefined, first, true, "2026-11-11");
  const changed = { ...first, contentVersion: "999.0.0" };
  const reset = nextReview(old, changed, true, "2026-11-20");
  assert.equal(reset.stage, 0);
  assert.equal(reset.successes, 1);
  assert.equal(reset.cardVersion, "999.0.0");
});
