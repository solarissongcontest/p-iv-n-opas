import {LOS1_SOURCE_REGISTRY,isLosSourcePublishable,sourcePublicationIssues} from "./content/sourceRegistry.ts";
export function los1SupplementalSourceAudit(){
 const sources=LOS1_SOURCE_REGISTRY;
 const byStage:Record<string,number>={};
 const pending=sources.map(item=>{
  byStage[item.stage]=(byStage[item.stage]??0)+1;
  return {id:item.id,description:item.description,sourceUrl:item.sourceUrl,
    ready:isLosSourcePublishable(item),stage:item.stage,issues:sourcePublicationIssues(item)};
 });
 return {total:sources.length,published:pending.filter(x=>x.ready).length,
   byStage,pending};
}
/** Authentic supplements are always optional to the new LOS!-authored Text A/B/C.
 * There is no mandatory authentic-source readiness gate for the 60 lessons. */
export const LOS1_CORE_SOURCE_POLICY="canonical-teaching-texts-first-supplemental-authentic-sources-optional" as const;
