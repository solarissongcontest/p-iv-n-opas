import test from "node:test";
import assert from "node:assert/strict";
import { addMonths, diffDays, isValidISODate, isValidISOMonth, startOfWeek } from "../src/lib/fi.ts";
import { dateFromIsoWeek, isoWeekFromDate } from "../src/features/planner/routeDate.ts";

test("calendar-safe month arithmetic clamps month ends", () => {
  assert.equal(addMonths("2026-01-31", 1), "2026-02-28");
  assert.equal(addMonths("2028-01-31", 1), "2028-02-29");
  assert.equal(addMonths("2026-03-31", -1), "2026-02-28");
  assert.equal(addMonths("2026-12-31", 1), "2027-01-31");
});

test("date-only day differences are stable across DST boundaries", () => {
  assert.equal(diffDays("2026-03-30", "2026-03-28"), 2);
  assert.equal(diffDays("2026-10-26", "2026-10-24"), 2);
  assert.equal(startOfWeek("2026-01-01"), "2025-12-29");
});

test("planner deep-link dates reject impossible calendar values", () => {
  assert.equal(isValidISODate("2028-02-29"), true);
  assert.equal(isValidISODate("2026-02-29"), false);
  assert.equal(isValidISODate("2026-02-31"), false);
  assert.equal(isValidISOMonth("2026-12"), true);
  assert.equal(isValidISOMonth("2026-13"), false);
});

test("ISO week conversion rejects nonexistent week 53", () => {
  assert.equal(dateFromIsoWeek("2025-W53"), null);
  const valid = dateFromIsoWeek("2026-W53");
  assert.ok(valid);
  assert.equal(isoWeekFromDate(valid!), "2026-W53");
});
