import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const workflow = readFileSync(
  new URL("../.github/workflows/iphone-e2e.yml", import.meta.url),
  "utf8",
);

test("automatic Final Release Gate keeps code-quality successful instead of skipped", () => {
  assert.equal(
    workflow.includes("code-quality:\n    if: github.event_name == 'workflow_dispatch'"),
    false,
  );
  assert.match(workflow, /Reuse upstream Quality Gate result/);
  assert.match(
    workflow,
    /Reuse upstream Quality Gate result[\s\S]*if: github\.event_name == 'workflow_run'/,
  );
});

test("production E2E explicitly runs after a successful production wait", () => {
  assert.match(
    workflow,
    /production-e2e:[\s\S]*if: \$\{\{ always\(\) && needs\.wait-for-production\.result == 'success' \}\}/,
  );
  assert.match(workflow, /iPhone WebKit smoke and deep-link test/);
  assert.match(workflow, /Desktop production, WCAG and push backend checks/);
  assert.match(workflow, /Offline reload and second-device synchronization/);
  assert.match(workflow, /Responsive layout evidence matrix/);
});
