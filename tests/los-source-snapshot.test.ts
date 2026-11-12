import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_SOURCE_MANIFEST_DATA} from "../src/features/los/content/los1-sources-data.ts";
import {LOS1_SOURCE_REGISTRY} from "../src/features/los/content/sourceRegistry.ts";

const path="src/features/los/content/los1-sources.json";
const compiled="src/features/los/content/los1-sources-data.ts";
test("generated TypeScript snapshot exactly reproduces the canonical JSON manifest",()=>{
 const canonical=JSON.parse(readFileSync(path,"utf8"));
 assert.deepEqual(LOS1_SOURCE_MANIFEST_DATA,canonical);
 assert.equal(canonical.sources.length,31);
 assert.equal(LOS1_SOURCE_REGISTRY.length,canonical.sourceCount);
 const rendered=`/**
 * GENERATED FILE. Canonical source: los1-sources.json.
 * Generated as TypeScript rather than importing JSON in browser so the LOS!
 * reader can reload in Vite/TanStack Start without an intermittent ?import 404.
 * Update with scripts/sync-los-source-snapshot.mjs after JSON changes.
 * Never edit this snapshot directly. CI compares it with the JSON manifest.
 */
export const LOS1_SOURCE_MANIFEST_DATA = ${JSON.stringify(canonical,null,2)} as const;
`;
 assert.equal(readFileSync(compiled,"utf8"),rendered,"Regenerate snapshot after any JSON edit");
});
test("the live reader imports the generated TS module, never a JSON ?import subrequest",()=>{
 const registry=readFileSync("src/features/los/content/sourceRegistry.ts","utf8");
 assert.match(registry,/import \{LOS1_SOURCE_MANIFEST_DATA as rawManifest\} from "\.\/los1-sources-data\.ts";/);
 assert.doesNotMatch(registry,/import .*\.json/);
 const generator=readFileSync("scripts/sync-los-source-snapshot.mjs","utf8");
 assert.match(generator,/process\.argv\.includes\("--check"\)/);
});
