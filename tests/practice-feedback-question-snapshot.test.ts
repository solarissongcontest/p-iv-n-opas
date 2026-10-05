import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(
  new URL("../src/features/practice/PracticeView.tsx", import.meta.url),
  "utf8",
);

test("practice feedback stays bound to the question that was answered", () => {
  assert.match(
    source,
    /setPinnedSelection\(selection\);\s*setFeedbackExplanation\(selection\.question\.explanation\);/,
  );
  assert.match(source, /feedbackExplanation \|\| selection\.question\.explanation/);
  assert.match(
    source,
    /setPinnedSelection\(null\);setFeedbackExplanation\(""\);setCompletedCount/,
  );
});

test("adaptive stage updates cannot clear an answered question snapshot", () => {
  const pinReset = source.match(
    /useEffect\(\(\)=>\{\s*setPinnedSelection\(null\);\s*\},\[([^\]]+)\]\);/s,
  );
  assert.ok(pinReset, "pin reset effect must exist");
  assert.doesNotMatch(pinReset[1] ?? "", /activePath/);

  const questionReset = source.match(
    /setFeedbackExplanation\(""\);\s*\}, \[([^\]]+)\]\);/s,
  );
  assert.ok(questionReset, "question reset effect must exist");
  assert.doesNotMatch(questionReset[1] ?? "", /activePath/);
});
