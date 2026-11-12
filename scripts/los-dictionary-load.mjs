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
    gloss_language:sense.glossLanguage??null});
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
 if(!process.argv.includes("--write-staging")){
  let verified=0;
  for await(const item of rows(input)){
   makeBatch([item],report.sourceId);
   verified++;
  }
  if(verified!==report.importedSourceRows)throw new Error("Staged row count does not match manifest");
  console.log(JSON.stringify({status:"VALIDATED_STAGING_ONLY",
   actualParsedRows:verified,translations:report.translationVariants,
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
  const {error}=await db.from("los_dictionary_sources")
   .update({actual_loaded_rows:count}).eq("source_id",report.sourceId).eq("published",false);
  if(error)throw error;
 }catch(error){
  console.error("Database staging is INCOMPLETE and UNPUBLISHED. Needs manual cleanup before retry.");
  throw error;
 }
 console.log(JSON.stringify({status:"STAGED_NOT_PUBLISHED",sourceId:report.sourceId,
  actualDatabaseRows:count,published:false}));
}
main().catch(error=>{
 console.error(error instanceof Error?error.message:"LOS staging failed");
 process.exitCode=1;
});
