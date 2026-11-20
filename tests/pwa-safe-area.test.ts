import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("iOS PWA reserves the top safe area inside the StudyOS mobile header", () => {
  const css = readFileSync("src/styles/studyos.css", "utf8");
  const root = readFileSync("src/routes/__root.tsx", "utf8");

  assert.match(root, /viewport-fit=cover/);
  assert.match(root, /apple-mobile-web-app-status-bar-style", content: "black-translucent"/);
  assert.match(css, /--studyos-top-safe-area:\s*env\(safe-area-inset-top, 0px\)/);
  assert.match(
    css,
    /\.studyos-systembar\s*\{[^}]*box-sizing:\s*border-box;[^}]*height:\s*calc\(var\(--studyos-header-h\) \+ var\(--studyos-top-safe-area\)\);[^}]*padding-top:\s*var\(--studyos-top-safe-area\)/,
  );
});

test("PWA status bar, page, and installation colors match StudyOS backgrounds", () => {
  const root = readFileSync("src/routes/__root.tsx", "utf8");
  const theme = readFileSync("src/lib/theme.ts", "utf8");
  const shell = readFileSync("src/styles/shell.css", "utf8");
  const studyos = readFileSync("src/styles/studyos.css", "utf8");
  const manifest = JSON.parse(readFileSync("public/manifest.webmanifest", "utf8"));

  assert.match(root, /dark \? "#111310" : "#f5f4f0"/);
  assert.match(theme, /LIGHT_THEME_COLOR = "#f5f4f0"/);
  assert.match(theme, /DARK_THEME_COLOR = "#111310"/);
  assert.match(studyos, /--studyos-canvas: #f5f4f0/);
  assert.match(studyos, /--studyos-canvas: #111310/);
  assert.match(shell, /html\.dark,\s*html\.dark body\s*\{\s*background-color: #111310 !important/);
  assert.equal(manifest.background_color, "#f5f4f0");
  assert.equal(manifest.theme_color, "#f5f4f0");
});
