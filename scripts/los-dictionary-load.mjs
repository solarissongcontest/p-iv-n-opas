#!/usr/bin/env node
/* LOS U2: explicit, staged-only NDJSON -> Supabase. NEVER auto-publish. */
import {createReadStream,readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {createInterface} from "node:readline";
// Supabase dependency is loaded only for explicitly authorized database writes.

function option(key) {
 const i=process.argv.indexOf(key);
 if(i<0||!process.argv[i+1])throw new Error("Missing argument "+key);
 return process.argv[i+1];
}
const norm=(text)=>String(text).normalize("NFC").trim().toLocaleLowerCase();
function formSearchKeys(form,language) {
 const base=norm(form);
 if(language!=="de")return [base];
 return [...new Set([base,base.replaceAll("ß","ss"),
  base.replaceAll("ä","ae").replaceAll("ö","oe").replaceAll("ü","ue"),
  base.replaceAll("ß","ss").replaceAll("ä","ae").replaceAll("ö","oe").replaceAll("ü","ue")])];
}
async function checksum(path) {
 const hash=createHash("sha512");
 for await(const chunk of createReadStream(path))hash.update(chunk);
 return hash.digest("hex");
}
async function* rows(path) {
 const reader=createInterface({input:createReadStream(path,{encoding:"utf8"}),crlfDelay:Infinity});
 for await (const line of reader)if(line.trim())yield JSON.parse(line);
}
function makeBatch(items,sourceId){
 const lexemes=[],senses=[],translations=[],forms=[],pronunciations=[];
 for(const item of items){
  if(item.sourceId!==sourceId||item.licenseSourceId!==sourceId||
     typeof item.lemma!=="string"||!item.lemma.trim()||item.lemma.length>180||
     !["de","fi"].includes(item.language)||!Array.isArray(item.searchKeys)||
     !Array.isArray(item.senses) || !item.sourceEntryId)throw new Error("Bad staged source row");
  const id={source_id:sourceId,source_entry_id:item.sourceEntryId};
  lexemes.push({...id,source_row:item.row,language:item.language,
   target_language:item.targetLanguage,lemma:item.lemma,lemma_key:norm(item.lemma),
   search_keys:item.searchKeys,part_of_speech:item.partOfSpeech,gender:item.gender});
  for(const [index,sense]of item.senses.entries()){
   const num=sense.index??index+1;
   senses.push({...id,sense_index:num,source_glosses:sense.glosses??[],
    gloss_language:sense.glossLanguage??null,
    form_of_candidates:sense.formOfCandidates??[]});
   for(const [idx,value]of (sense.translations??[]).entries()){
    if(!["fi","de"].includes(sense.translationLanguage))throw new Error("Unlabelled translation");
    translations.push({...id,sense_index:num,translation_index:idx+1,
     language:sense.translationLanguage,value,value_key:norm(value)});
   }
  }
  const sourceForms=item.formDetails?.length ? item.formDetails :
   (item.forms??[]).map(form=>({form,tags:[],rawTags:[]}));
  sourceForms.forEach((detail,i)=>{
   const written=detail.form;
   if(typeof written==="string"&&written.trim())forms.push({...id,form_index:i+1,
    written_form:written,form_key:norm(written),
    form_search_keys:formSearchKeys(written,item.language),
    grammar:{tags:detail.tags??[],rawTags:detail.rawTags??[]}});
  });
  (item.ipaCandidates??[]).forEach((ipa,i)=>{
   if(typeof ipa==="string"&&ipa.trim())pronunciations.push({...id,
    pronunciation_index:i+1,target_type:"lemma",ipa,ipa_status:"candidate",
    region:"unspecified"});
  });
 }
 return {lexemes,senses,translations,forms,pronunciations};
}
/** Two-pass integrity guard: validate every row before any DB INSERT. */
async function preflight(input,report,approved){
 const expectedLanguage=approved.direction.split("-")[0];
 const expectedTarget=approved.kind==="freedict"?
  approved.direction.split("-")[1]:null;
 if(approved.kind==="kaikki"&&
    (approved.glossLanguage!=="en"&&approved.glossLanguage!=="de"||
     report.glossLanguage!==approved.glossLanguage))
   throw new Error("Wiktionary gloss language is unverified or conflicts with source");
 const seen=new Set();
 let count=0,translatedRows=0,translations=0,ipaCandidates=0;
 for await(const row of rows(input)){
  if(row.language!==expectedLanguage||row.targetLanguage!==expectedTarget||
   row.sourceKind!==approved.kind||!Number.isSafeInteger(row.row)||row.row<1)
    throw new Error("Staged row language, kind or row ordinal does not match source");
  const id=row.sourceEntryId;
  if(typeof id!=="string"||!id||id.length>190||seen.has(id))
    throw new Error("Duplicate or invalid source entry ID: "+id);
  seen.add(id);
  if(approved.kind==="kaikki"&&
    row.senses.some(sense=>sense.glossLanguage!==approved.glossLanguage))
   throw new Error("Wiktionary entry has wrong gloss language");
  const batch=makeBatch([row],report.sourceId);
  if(batch.lexemes.length!==1)throw new Error("Expected one lexeme per source row");
  for(const form of batch.forms){
   if(form.written_form.length>180||form.form_key.length>180)
    throw new Error("Invalid morphological form length");
  }
  for(const entry of batch.translations){
   if(entry.language!==expectedTarget ||
      typeof entry.value!=="string" || entry.value.length>2000 ||
      !entry.value.trim())
    throw new Error("Source translation language/content is invalid");
  }
  for(const pronunciation of batch.pronunciations){
   if(pronunciation.ipa.length>140)throw new Error("IPA candidate length exceeds schema");
  }
  count++;
  translations+=batch.translations.length;
  translatedRows+=Number(batch.translations.length>0);
  ipaCandidates+=batch.pronunciations.length;
 }
 if(count!==report.importedSourceRows||
    translations!==report.translationVariants||
    translatedRows!==report.rowsWithTranslations||
    ipaCandidates!==report.ipaCandidates)
   throw new Error("Staged data counts do not match signed source manifest");
 return {count,translatedRows,translations,ipaCandidates,distinctSourceEntries:seen.size};
}
async function main(){
 const input=option("--input"), report=JSON.parse(readFileSync(option("--manifest"),"utf8"));
 const approvals=JSON.parse(readFileSync(option("--approvals"),"utf8"));
 const approved=approvals.entries?.find(x=>x.sourceId===report.sourceId);
 if(!approved||report.status!=="STAGED_NOT_PUBLISHED"||
  report.sourceSha512!==approved.sourceSha512||
  report.licenseCode!==approved.rightsApproval?.licenseCode||
  approved.rightsApproval?.stagingApproved!==true||
  approved.rightsApproval?.publicationApproved===true||
  report.outputSha512!==await checksum(input))
   throw new Error("Source checksum or staging-rights evidence invalid");
 if(report.kind!==approved.kind||report.direction!==approved.direction||
    !/^[a-z0-9_.-]{3,160}$/.test(report.sourceId)||
    !approved.sourceUrl?.startsWith("https://"))
   throw new Error("Source direction, identity or HTTPS provenance not approved");
 // The same full preflight runs for dry-run and live staging. Neither can
 // write even one row until the complete staged file is validated.
 const inspected=await preflight(input,report,approved);
 if(!process.argv.includes("--write-staging")){
  console.log(JSON.stringify({status:"VALIDATED_STAGING_ONLY",
   actualParsedRows:inspected.count,actualTranslationVariants:inspected.translations,
   actualRowsWithTranslations:inspected.translatedRows,
   actualIpaCandidates:inspected.ipaCandidates,
   sourceId:report.sourceId,publishedRows:0}));
  return;
 }
 if(process.env.LOS_DICTIONARY_STAGING_WRITES!=="YES")
   throw new Error("Requires explicit LOS_DICTIONARY_STAGING_WRITES=YES");
 if(!process.env.SUPABASE_URL||!process.env.SUPABASE_SECRET_KEY)
   throw new Error("Server-only Supabase credentials unavailable");
 const {createClient}=await import("@supabase/supabase-js");
 const db=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SECRET_KEY,
  {auth:{persistSession:false,autoRefreshToken:false}});
 const {data:existing,error:existsError}=await db.from("los_dictionary_sources")
  .select("source_id").eq("source_id",report.sourceId).maybeSingle();
 if(existsError)throw existsError;
 if(existing)throw new Error("Source ID already exists; no silent overwrite");
 const source={
  source_id:report.sourceId,source_kind:approved.kind,
  source_lang:approved.direction.split("-")[0],
  target_lang:approved.kind==="freedict"?approved.direction.split("-")[1]:null,
  dataset_version:approved.datasetVersion??"2025.11.23",
  original_url:approved.sourceUrl,original_sha512:report.sourceSha512,
  output_sha512:report.outputSha512,license_code:report.licenseCode,
  license_url:report.licenseUrl,evidence_url:report.evidenceUrl,
  reviewed_by:report.reviewedBy,reviewed_at:report.reviewedAt,
  imported_source_rows:report.importedSourceRows,actual_loaded_rows:0,
  published:false,published_at:null,
 };
 const {error:sourceError}=await db.from("los_dictionary_sources").insert(source);
 if(sourceError)throw sourceError;
 const write=async(name,data)=>{
  for(let i=0;i<data.length;i+=200){
   const {error}=await db.from("los_dictionary_"+name).insert(data.slice(i,i+200));
   if(error)throw new Error(name+" insert: "+error.message);
  }
 };
 let batch=[],count=0;
 async function flush(){
  if(!batch.length)return;
  const model=makeBatch(batch,report.sourceId);
  for(const kind of ["lexemes","senses","translations","forms","pronunciations"])
   await write(kind,model[kind]);
  count+=batch.length;batch=[];
 }
 try{
  for await (const item of rows(input)){
   batch.push(item);
   if(batch.length>=60)await flush();
  }
  await flush();
  if(count!==report.importedSourceRows)
   throw new Error("Loaded row count does not match integrity manifest");
  const actualDatabaseCount=async(table)=>{
   const {count:rows,error}=await db.from("los_dictionary_"+table)
    .select("source_id",{head:true,count:"exact"}).eq("source_id",report.sourceId);
   if(error||rows===null)throw new Error("Could not verify actual database "+table+" count");
   return rows;
  };
  const actualLexemes=await actualDatabaseCount("lexemes");
  const actualTranslations=await actualDatabaseCount("translations");
  if(actualLexemes!==count||actualTranslations!==report.translationVariants)
   throw new Error("Physical Postgres row counts differ from verified staging manifest");
  const {error}=await db.from("los_dictionary_sources")
   .update({actual_loaded_rows:actualLexemes}).eq("source_id",report.sourceId).eq("published",false);
  if(error)throw error;
 }catch(error){
  console.error("Database staging is INCOMPLETE and UNPUBLISHED. Needs manual cleanup before retry.");
  throw error;
 }
 console.log(JSON.stringify({status:"STAGED_NOT_PUBLISHED",sourceId:report.sourceId,
  actualDatabaseRows:count,
  actualDatabaseTranslations:report.translationVariants,published:false}));
}
main().catch(error=>{
 console.error(error instanceof Error?error.message:"LOS staging failed");
 process.exitCode=1;
});
