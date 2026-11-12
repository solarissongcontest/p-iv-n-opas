import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
 LOS_RECALL_DAYS,losRecallKey,losRecallFromVocabulary,losRecallReview,losRecallIsDue,
 validLosRecallCardMap,parseLosRecallCardMap,
} from "../src/features/los/recallEngine.ts";
import {validateLosCloudDraft,draftIsEmpty} from "../src/features/los/cloudContract.ts";

const start="2026-11-12T10:00:00.000Z";
const plus=(days:number)=>new Date(Date.parse(start)+days*86_400_000).toISOString();
test("stable chapter-and-direction keys never mix two kinds of recall",()=>{
 const vocab=["Ich heiße … – Nimeni on …","das Wort – sana","Tschüss! – Moikka!","invalid"];
 const cards=losRecallFromVocabulary("02",vocab);
 assert.equal(cards.length,6);
 assert.equal(new Set(cards.map(x=>x.id)).size,6);
 assert.deepEqual(cards.map(x=>x.direction),["de-fi","fi-de","de-fi","fi-de","de-fi","fi-de"]);
 assert.notEqual(losRecallKey("02","das Wort","de-fi"),losRecallKey("02","das Wort","fi-de"));
 assert.notEqual(losRecallKey("02","das Wort","de-fi"),losRecallKey("08","das Wort","de-fi"));
 assert.equal(losRecallKey("02"," Das Wort ","de-fi"),losRecallKey("02","das wort","de-fi"));
 assert.equal(cards[0]?.german,"Ich heiße …");
 assert.equal(cards[0]?.finnish,"Nimeni on …");
});
test("successful recall follows the 1,3,7,14,30 day heuristic deterministically",()=>{
 assert.deepEqual([...LOS_RECALL_DAYS],[1,3,7,14,30]);
 let card=undefined;
 for(const [i,days] of [...LOS_RECALL_DAYS].entries()){
   const now=plus(i*35);
   const reviewed=losRecallReview(card,"remembered",now);
   assert.equal(reviewed.level,i+1);
   assert.equal(reviewed.nextDueAt,new Date(Date.parse(now)+days*86_400_000).toISOString());
   assert.equal(reviewed.lastRating,"remembered");
   card=reviewed;
 }
 assert.equal(losRecallReview(card,"remembered",plus(200)).level,5);
 assert.equal(losRecallReview(card,"remembered",plus(200)).nextDueAt,plus(230));
});
test("forgotten and uncertain cards return soon, without punitive skipped-day debt",()=>{
 const learned=losRecallReview(undefined,"remembered",start);
 assert.equal(losRecallIsDue(undefined,start),true);
 assert.equal(losRecallIsDue(learned,start),false);
 assert.equal(losRecallIsDue(learned,plus(1)),true);
 const next=losRecallReview(learned,"remembered",plus(1));
 assert.equal(next.level,2);
 assert.equal(losRecallIsDue(next,plus(3)),false);
 assert.equal(losRecallIsDue(next,plus(4)),true);
 const uncertain=losRecallReview(next,"uncertain",plus(4));
 assert.equal(uncertain.level,1);
 assert.equal(uncertain.nextDueAt,plus(5));
 const forgotten=losRecallReview(next,"again",plus(4));
 assert.equal(forgotten.level,0);
 assert.equal(forgotten.nextDueAt,plus(5));
});
test("invalid or suspicious recall data is filtered from local drafts and rejected from sync",()=>{
 const card=losRecallReview(undefined,"remembered",start);
 const state={"02|de-fi|ich":card};
 assert.equal(validLosRecallCardMap(state),true);
 assert.deepEqual(parseLosRecallCardMap(state),state);
 assert.equal(validLosRecallCardMap({"bad":{...card,level:999}}),false);
 assert.equal(validLosRecallCardMap({"02|de-fi|ich":{...card,nextDueAt:"not-a-date"}}),false);
 assert.equal(validLosRecallCardMap(Object.fromEntries(Array.from({length:201},(_,i)=>["c-"+i,card]))),false);
 assert.deepEqual(parseLosRecallCardMap({"good":card,"bad":{...card,level:-1}}),{"good":card});
});
test("recall cards survive existing v1 JSON/cloud draft and make an otherwise empty draft nonempty",()=>{
 const card=losRecallReview(undefined,"remembered",start);
 const base={version:1 as const,note:"",applicationDraft:"",selfAssessment:"",bookmarked:false,
  practiceAnswers:{},practiceChecked:[],testAnswers:{},testSubmittedAt:null,updatedAt:start};
 const draft={...base,recallCards:{"02|de-fi|wort":card}};
 assert.equal(validateLosCloudDraft(draft),true);
 assert.equal(draftIsEmpty(base),true);
 assert.equal(draftIsEmpty(draft),false);
 const study=readFileSync("src/features/los/studyState.ts","utf8");
 assert.match(study,/recallCards:parseLosRecallCardMap\(input\.recallCards\)/);
 assert.match(study,/recallCards\?: Record/);
});
test("chapter tab is real and hides Finnish/German answer until the user reveals it",()=>{
 const view=readFileSync("src/features/los/LosRecallCards.tsx","utf8");
 const book=readFileSync("src/features/los/LosBook.tsx","utf8");
 const nav=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
 assert.match(book,/id:"cards", label:"Kertauskortit"/);
 assert.match(book,/section === "cards" \? <LosRecallCards/);
 assert.match(nav,/"cards"/);
 assert.match(view,/!revealed\?/);
 assert.match(view,/Näytä vastaus/);
 assert.match(view,/if\(!card\|\|!revealed/);
 assert.match(view,/REVIEW_LIMIT=10/);
 assert.match(view,/setSessionReviewed/);
 assert.match(view,/Muistin epäröiden/);
});
