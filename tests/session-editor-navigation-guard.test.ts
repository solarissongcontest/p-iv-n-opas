import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const editor = readFileSync(
  new URL("../src/components/AbittiAnswerEditor.tsx", import.meta.url),
  "utf8",
);
const editorBase = readFileSync(
  new URL("../src/components/AbittiAnswerEditorBase.tsx", import.meta.url),
  "utf8",
);
const guidedRetrieval = readFileSync(
  new URL("../src/features/session/GuidedRetrievalAnswerEditor.tsx", import.meta.url),
  "utf8",
);
const app = readFileSync(
  new URL("../src/app/StudyApp.tsx", import.meta.url),
  "utf8",
);

test("Abitti editor keyboard input cannot bubble into global navigation shortcuts", () => {
  // The public editor is now a compatibility adapter. Both the normal editor
  // and the guided retrieval flow delegate the actual editable surface to the
  // same base component, where keyboard propagation is stopped.
  assert.match(editor, /BaseAbittiAnswerEditor/);
  assert.match(guidedRetrieval, /BaseAbittiAnswerEditor/);
  assert.match(
    editorBase,
    /className=\{className\} onKeyDown=\{\(event\) => event\.stopPropagation\(\)\}/,
  );
  assert.match(app, /e\.key\.toLowerCase\(\) === "t"\) go\("today"\)/);
  assert.match(app, /e\.key\.toLowerCase\(\) === "n"\) setEntry\("manual"\)/);
});
