import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) =>
  readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("CI uses the committed Bun lockfile instead of floating npm installs", () => {
  const workflows = [
    ".github/workflows/quality.yml",
    ".github/workflows/iphone-e2e.yml",
    ".github/workflows/visual-baselines.yml",
    ".github/workflows/push-device-check.yml",
  ];

  for (const path of workflows) {
    const workflow = read(path);
    assert.doesNotMatch(workflow, /npm (?:install|ci)\b/, path);
  }

  for (const path of [
    ".github/workflows/quality.yml",
    ".github/workflows/iphone-e2e.yml",
    ".github/workflows/visual-baselines.yml",
    ".github/workflows/push-device-check.yml",
  ]) {
    const workflow = read(path);
    assert.match(workflow, /oven-sh\/setup-bun@v2/, path);
    assert.match(workflow, /bun install --frozen-lockfile/, path);
  }
});

test("ephemeral browser tooling does not ask npm to re-resolve the project tree", () => {
  const pkg = JSON.parse(read("package.json")) as { scripts: Record<string, string> };
  const install = pkg.scripts["e2e:install"];
  assert.match(install, /^bun add /);
  assert.match(install, /--no-save/);
  assert.match(install, /@playwright\/test@1\.55\.0/);
  assert.match(install, /@axe-core\/playwright@4\.10\.2/);
  assert.doesNotMatch(install, /npm install/);
});
