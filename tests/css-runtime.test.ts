import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) =>
  readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("standalone glass stylesheet uses browser-native class rules", () => {
  const glass = read("src/styles/glass.css");
  assert.doesNotMatch(glass, /^\s*@utility\b/m);
  for (const selector of [
    ".glass-base {",
    ".glass-clear {",
    ".glass-thick {",
    ".glass-specular::before {",
    ".glass-interactive {",
  ]) {
    assert.ok(glass.includes(selector), selector);
  }
});

test("shell helpers have runtime CSS and load immediately after the shell stylesheet", () => {
  const compat = read("src/styles/shell-utilities.css");
  const root = read("src/routes/__root.tsx");

  for (const selector of [".panel {", ".press {", ".tabular {", ".rise {"]) {
    assert.ok(compat.includes(selector), selector);
  }

  assert.match(root, /import shellCss from "\.\.\/styles\/shell\.css\?url";/);
  assert.match(root, /import shellUtilitiesCss from "\.\.\/styles\/shell-utilities\.css\?url";/);

  const shellLink = root.indexOf('href: shellCss');
  const utilitiesLink = root.indexOf('href: shellUtilitiesCss');
  const layoutsLink = root.indexOf('href: layoutsCss');
  assert.ok(shellLink >= 0 && shellLink < utilitiesLink && utilitiesLink < layoutsLink);
});
