import test from "node:test";
import assert from "node:assert/strict";
import { pickCanonicalArthurOwner } from "../src/lib/canonicalOwner.server.ts";

const original = "11111111-1111-4111-8111-111111111111";
const provisional = "22222222-2222-4222-8222-222222222222";
const legacy = "33333333-3333-4333-8333-333333333333";

test("a newer provisional owner cannot replace an onboarded canonical owner", () => {
  assert.equal(
    pickCanonicalArthurOwner([
      {
        owner_id: provisional,
        onboarding_completed: false,
        created_at: "2026-10-05T08:42:31.000Z",
      },
      {
        owner_id: original,
        onboarding_completed: true,
        created_at: "2026-09-28T18:18:45.000Z",
      },
    ]),
    original,
  );
});

test("canonical selection stays on the oldest completed owner", () => {
  assert.equal(
    pickCanonicalArthurOwner([
      {
        owner_id: provisional,
        onboarding_completed: true,
        created_at: "2026-10-05T08:42:31.000Z",
      },
      {
        owner_id: original,
        onboarding_completed: true,
        created_at: "2026-09-28T18:18:45.000Z",
      },
    ]),
    original,
  );
});

test("a completed profile wins over an older unfinished seed", () => {
  assert.equal(
    pickCanonicalArthurOwner([
      {
        owner_id: original,
        onboarding_completed: false,
        created_at: "2026-09-28T18:18:45.000Z",
      },
      {
        owner_id: provisional,
        onboarding_completed: true,
        created_at: "2026-10-05T08:42:31.000Z",
      },
    ]),
    provisional,
  );
});

test("legacy owner is only a fallback when no stored Arthur profile exists", () => {
  assert.equal(pickCanonicalArthurOwner([], legacy), legacy);
  assert.equal(pickCanonicalArthurOwner([{ owner_id: "not-a-uuid" }], legacy), legacy);
});
