import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root=resolve(import.meta.dirname,"..");
const sql=readFileSync(resolve(root,"supabase/migrations/20261112170000_los_dictionary_search_staging.sql"),"utf8");
const route=readFileSync(resolve(root,"src/routes/api.los-dictionary.ts"),"utf8");

test("LOS U2: one canonical dictionary migration, not two incompatible schemas",()=>{
  const files=readdirSync(resolve(root,"supabase/migrations"))
    .filter(name=>name.includes("los_dictionary")&&name.endsWith(".sql"));
  assert.deepEqual(files,["20261112170000_los_dictionary_search_staging.sql"]);
});

test("LOS U2: API and DDL agree on source publication and search function",()=>{
  assert.match(route,/\.eq\("published",true\)/);
  assert.match(sql,/published boolean NOT NULL DEFAULT false/);
  assert.match(route,/\.rpc\("los_dictionary_search"/);
  assert.match(sql,/CREATE OR REPLACE FUNCTION public\.los_dictionary_search/);
  assert.match(sql,/JOIN public\.los_dictionary_sources s ON s\.source_id=l\.source_id AND s\.published=true/);
});

test("LOS U2: unpublished rows and audio remain gated server-side",()=>{
  assert.match(sql,/REVOKE ALL ON TABLE public\.%I FROM public, anon, authenticated/);
  assert.match(sql,/ALTER TABLE public\.%I ENABLE ROW LEVEL SECURITY/);
  assert.match(sql,/REVOKE ALL ON FUNCTION public\.los_dictionary_search/);
  assert.match(sql,/TO service_role/);
  assert.match(sql,/playback_status <> 'ready'/);
  assert.match(route,/verifyArthurDeviceToken/);
  assert.match(route,/SUPABASE_JWT_SECRET/);
});
