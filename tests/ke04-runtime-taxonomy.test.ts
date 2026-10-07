import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const source = [
  read("src/lib/data.ts"),
  read("src/lib/data-base.ts"),
].join("\n");

test("runtime KE04 provisioner uses the canonical Mooli 4 subchapter taxonomy", () => {
  assert.match(source, /import \{ KE04_TEXTBOOK_TOPICS \} from "\.\/ke04-textbook-topics"/);
  assert.match(source, /const KE04_TOPICS = KE04_TEXTBOOK_TOPICS\.map/);
  assert.doesNotMatch(
    source,
    /const KE04_TOPICS = \[\s*\{ name: "Reaktioyhtälöt ja tasapainotus"/,
  );
});
