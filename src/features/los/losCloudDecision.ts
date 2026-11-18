import type {LosChapterDraft} from "./studyState";
import type {LosCloudRecord} from "./cloudContract";
import {draftIsEmpty} from "./cloudContract";

export type LosSyncDecision=
 | {kind:"no-change"}
 | {kind:"create";expectedRevision:0}
 | {kind:"upload";expectedRevision:number}
 | {kind:"download"}
 | {kind:"conflict"};
export type LosLastSynced={revision:number;fingerprint:string}|null;
/** Pure, deterministic model shared by UI and simulated multi-device tests.
 * It never silently chooses one device over another when both have edits.
 */
export function decideLosCloudSync(args:{
 local:LosChapterDraft;
 remote:LosCloudRecord|null;
 lastSynced:LosLastSynced;
 fingerprint:(draft:LosChapterDraft)=>string;
}):LosSyncDecision{
 const {local,remote,lastSynced,fingerprint}=args;
 const localFingerprint=fingerprint(local);
 if(!remote)return draftIsEmpty(local)?{kind:"no-change"}:{kind:"create",expectedRevision:0};
 const remoteFingerprint=fingerprint(remote.payload);
 if(localFingerprint===remoteFingerprint)return{kind:"no-change"};
 if(draftIsEmpty(local))return{kind:"download"};
 if(lastSynced && lastSynced.fingerprint===localFingerprint)return{kind:"download"};
 if(lastSynced && lastSynced.revision===remote.revision)
  return{kind:"upload",expectedRevision:remote.revision};
 return{kind:"conflict"};
}
/** A 409 error indicates concurrent changes; never retry an overwrite
 * without a fresh fetch and an explicit user decision. */
export function losSyncNeedsConflictReview(status:number){
 return status===409||status===412;
}
