import {readFileSync,writeFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {resolve,dirname} from "node:path";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const jsonPath=resolve(root,"src/features/los/content/los1-sources.json");
const dataPath=resolve(root,"src/features/los/content/los1-sources-data.ts");
const manifest=JSON.parse(readFileSync(jsonPath,"utf8"));
if(manifest.bookId!==1||!Array.isArray(manifest.sources)||!Array.isArray(manifest.chapters))
 throw new Error("Unexpected LOS! 1 source manifest shape.");
const content=`/**
 * GENERATED FILE. Canonical source: los1-sources.json.
 * Generated as TypeScript rather than importing JSON in browser so the LOS!
 * reader can reload in Vite/TanStack Start without an intermittent ?import 404.
 * Update with scripts/sync-los-source-snapshot.mjs after JSON changes.
 * Never edit this snapshot directly. CI compares it with the JSON manifest.
 */
export const LOS1_SOURCE_MANIFEST_DATA = ${JSON.stringify(manifest,null,2)} as const;
`;
if(process.argv.includes("--check")){
 const existing=readFileSync(dataPath,"utf8");
 if(existing!==content){
  process.stderr.write("LOS source JSON/TypeScript snapshot mismatch. Run node scripts/sync-los-source-snapshot.mjs.\n");
  process.exitCode=1;
 }else{
  process.stdout.write("LOS! 1 source manifest snapshot matches canonical JSON.\n");
 }
}else{
 writeFileSync(dataPath,content);
 process.stdout.write("Generated "+dataPath+" from canonical los1-sources.json.\n");
}
