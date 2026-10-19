import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) =>
  readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("typescript-eslint stays pinned to the release captured by bun.lock", () => {
  const pkg = JSON.parse(read("package.json")) as {
    devDependencies: Record<string, string>;
  };
  const locked = read("bun.lock");

  assert.equal(pkg.devDependencies["typescript-eslint"], "8.65.0");
  assert.match(locked, /"typescript-eslint@8\.65\.0"/);
  assert.match(locked, /"@typescript-eslint\/eslint-plugin@8\.65\.0"/);
});
