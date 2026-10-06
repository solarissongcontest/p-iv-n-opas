import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const editor = readFileSync(
  new URL("../src/components/AbittiAnswerEditor.tsx", import.meta.url),
  "utf8",
);
const app = readFileSync(
  new URL("../src/app/StudyApp.tsx", import.meta.url),
  "utf8",
);

test("Abitti editor keyboard input cannot bubble into global navigation shortcuts", () => {
  assert.match(
    editor,
    /className=\{className\} onKeyDown=\{\(event\) => event\.stopPropagation\(\)\}/,
  );
  assert.match(app, /e\.key\.toLowerCase\(\) === "t"\) go\("today"\)/);
  assert.match(app, /e\.key\.toLowerCase\(\) === "n"\) setEntry\("manual"\)/);
});
