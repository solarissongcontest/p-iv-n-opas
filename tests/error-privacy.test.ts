import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("error telemetry keeps technical metadata but not arbitrary error messages or payloads", () => {
  const capture = read("src/lib/error-capture.ts");
  const client = read("src/lib/lovable-error-reporting.ts");

  assert.match(capture, /safeStackFrames/);
  assert.match(capture, /describeStatus/);
  assert.match(capture, /describeCode/);
  assert.equal(capture.includes("current.message"), false);
  assert.equal(capture.includes("safeStringify"), false);
  assert.equal(capture.includes("JSON.stringify(value)"), false);
  assert.match(capture, /return "\[string redacted\]"/);
  assert.match(capture, /return "\[value redacted\]"/);
  assert.match(capture, /args\.map\(safeConsoleArg\)/);

  assert.match(client, /const safeError = telemetryError\(error\)/);
  assert.match(client, /captureException\?\.\(\s*safeError/);
  assert.equal(client.includes("error.url"), false);
  assert.equal(client.includes("? error.message"), false);
  assert.equal(client.includes(": String(error)"), false);
});

test("root error boundary logs only from an effect and keeps recovery actions touchable", () => {
  const root = read("src/routes/__root.tsx");
  const component = root.slice(root.indexOf("function ErrorComponent"), root.indexOf("export const Route"));
  assert.match(component, /useMemo/);
  assert.match(component, /useEffect\(\(\) => \{\s*console\.error\(normalizedError\)/);
  assert.equal(component.indexOf("console.error(normalizedError)") < component.indexOf("useEffect"), false);
  assert.match(component, /min-h-11/);
});
