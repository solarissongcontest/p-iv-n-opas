import type { Book, BookId } from "./model";
import { normalizeGap } from "./exercises/evaluate";

export type ReviewCard = {
  id: string; bookId: BookId; contentVersion: string; de: string; fi: string; note?: string;
};
export type ReviewEntry = {
  cardVersion: string;
  stage: number;
  dueOn: string; // User-local calendar date YYYY-MM-DD, independent of DST.
  attempts: number;
  successes: number;
  lastReviewedOn: string;
  lastCorrect: boolean;
};
export type ReviewLedger = Record<string, ReviewEntry>;
export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30] as const;

export function localDay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}
export function addCalendarDays(day: string, amount: number): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isInteger(amount))
    throw new Error("Invalid date/interval");
  const next = new Date(day + "T12:00:00Z");
  if (Number.isNaN(next.getTime())) throw new Error("Invalid date");
  next.setUTCDate(next.getUTCDate() + amount);
  return next.toISOString().slice(0, 10);
}
export function reviewedAnswerCorrect(answer: string, card: ReviewCard): boolean {
  const actual = normalizeGap(answer).toLocaleLowerCase("de-DE");
  const expected = normalizeGap(card.de).toLocaleLowerCase("de-DE");
  return Boolean(actual) && actual === expected;
}
export function nextReview(previous: ReviewEntry | undefined, card: ReviewCard, correct: boolean, on: string): ReviewEntry {
  const currentStage = previous?.cardVersion === card.contentVersion ? previous.stage : -1;
  const stage = correct ? Math.min(currentStage + 1, REVIEW_INTERVAL_DAYS.length - 1) : 0;
  const dueOn = addCalendarDays(on, REVIEW_INTERVAL_DAYS[stage] ?? 1);
  return {
    cardVersion: card.contentVersion, stage, dueOn,
    attempts: (previous?.cardVersion === card.contentVersion ? previous.attempts : 0) + 1,
    successes: (previous?.cardVersion === card.contentVersion ? previous.successes : 0) + Number(correct),
    lastReviewedOn: on,
    lastCorrect: correct,
  };
}
export function bookReviewCards(book: Book): ReviewCard[] {
  return book.blocks.flatMap(block => block.kind === "vocabulary"
    ? block.entries.map(entry => ({
      id: block.id + ":" + entry.id,
      bookId: book.id,
      contentVersion: block.version,
      de: entry.de,
      fi: entry.fi,
      ...(entry.note ? { note: entry.note } : {}),
    }))
    : []);
}
export function reviewQueue(cards: readonly ReviewCard[], ledger: ReviewLedger, on: string, limit = 8): ReviewCard[] {
  const orderedDue = cards.filter(card => {
    const state = ledger[card.id];
    return state && state.cardVersion === card.contentVersion && state.dueOn <= on;
  }).sort((a, b) => (ledger[a.id]?.dueOn ?? "").localeCompare(ledger[b.id]?.dueOn ?? ""));
  const newCards = cards.filter(card => !ledger[card.id] || ledger[card.id]?.cardVersion !== card.contentVersion);
  return [...orderedDue, ...newCards].slice(0, Math.max(0, limit));
}
export function reviewCounts(cards: readonly ReviewCard[], ledger: ReviewLedger, on: string) {
  let due = 0; let fresh = 0; let upcoming = 0;
  for (const card of cards) {
    const entry = ledger[card.id];
    if (!entry || entry.cardVersion !== card.contentVersion) fresh++;
    else if (entry.dueOn <= on) due++;
    else upcoming++;
  }
  return { due, fresh, upcoming };
}
