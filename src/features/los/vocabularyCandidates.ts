import {chapters,LOS_VERSION,type ChapterId,type Word} from './content.ts';

/**
 * Candidate index, NOT the final native-speaker reviewed 160–190 item
 * coreVocabulary.json. Exact same German display forms are merged across
 * chapters without guessing a shared lemma or an unverified plural.
 */
export type VocabularyCandidate={
 entryId:string;bookId:'LOS1';introducedChapterId:ChapterId;chapters:ChapterId[];
 lemma:string;displayForm:string;partOfSpeech:'noun'|'chunk'|'unclassified';
 gender:'m'|'f'|'n'|null;plural:string|null;inflections:string[];
 meaningFi:string[];meaningScope:'chapter-vocabulary';pronunciationAudioId:string|null;
 exampleSourceId:string|null;exampleBlockId:string|null;
 importance:'active'|'recognition'|'support';skillTags:string[];reviewCardIds:string[];
 sourceAttributionId:string|null;reviewedBy:string|null;contentVersion:string;
};
const importance:Record<Word['tier'],VocabularyCandidate['importance']>={
 ydin:'active',tunnista:'recognition',tuki:'support'
};
const rank:Record<VocabularyCandidate['importance'],number>={active:3,recognition:2,support:1};
export const normalizeGermanEntry=(text:string):string=>
 text.normalize('NFC').trim().replace(/\s+/gu,' ').toLocaleLowerCase('de');

const noun=(form:string):{lemma:string;gender:'m'|'f'|'n'}|null=>{
 const match=/^(der|die|das)\s+(.+)$/u.exec(form);
 if(!match)return null;
 const g=match[1]==='der'?'m':match[1]==='die'?'f':'n';
 return {lemma:match[2]!,gender:g};
};
const sourceBlock=(form:string,blocks:readonly {id:string;text:string}[]):string|null=>{
 const needle=normalizeGermanEntry(form);
 if(!needle||needle.length<2)return null;
 const escaped=[...needle].map(char=>'.*+?^$()|[]{}\\'.includes(char)?'\\'+char:char).join('');
 // Only match a complete word or phrase, not a substring of another word.
 // If no original block matches, leave the source anchor deliberately null.
 const re=new RegExp('(^|[^\\p{L}\\p{N}])'+escaped+'(?=$|[^\\p{L}\\p{N}])','iu');
 return blocks.find(block=>re.test(normalizeGermanEntry(block.text)))?.id??null;
};
export function buildVocabularyCandidates():VocabularyCandidate[]{
 const map=new Map<string,VocabularyCandidate>();
 for(const chapter of chapters)for(const word of chapter.vocab){
  const key=normalizeGermanEntry(word.de);
  const existing=map.get(key);
  if(existing){
   if(!existing.chapters.includes(chapter.id))existing.chapters.push(chapter.id);
   if(!existing.meaningFi.includes(word.fi))existing.meaningFi.push(word.fi);
   if(rank[importance[word.tier]]>rank[existing.importance])existing.importance=importance[word.tier];
   if(!existing.skillTags.includes(chapter.id))existing.skillTags.push(chapter.id);
   if(!existing.exampleBlockId){
    const found=sourceBlock(word.de,chapter.blocks);
    if(found){
     existing.exampleBlockId=found;
     existing.exampleSourceId=chapter.sourceId;
     existing.sourceAttributionId=chapter.sourceId;
    }
   }
   continue;
  }
  const knownNoun=noun(word.de);
  const blockId=sourceBlock(word.de,chapter.blocks);
  const mediaId=sourceBlock(word.de,chapter.media?.transcript??[])?chapter.media?.sourceId??null:null;
  map.set(key,{
   entryId:'LOS1:'+encodeURIComponent(key),
   bookId:'LOS1',
   introducedChapterId:chapter.id,chapters:[chapter.id],
   lemma:knownNoun?.lemma??word.de,displayForm:word.de,
   partOfSpeech:knownNoun?'noun':/\s/u.test(word.de)?'chunk':'unclassified',
   gender:knownNoun?.gender??null,plural:null,inflections:[],
   meaningFi:[word.fi],meaningScope:'chapter-vocabulary',
   pronunciationAudioId:mediaId,
   exampleSourceId:blockId?chapter.sourceId:null,
   exampleBlockId:blockId,
   importance:importance[word.tier],
   skillTags:[chapter.id],reviewCardIds:['review:'+word.de],
   sourceAttributionId:blockId?chapter.sourceId:null,
   reviewedBy:null,contentVersion:LOS_VERSION
  });
 }
 return [...map.values()];
}
export const vocabularyCandidates=buildVocabularyCandidates();
export function vocabularySearch(query:string,limit=80):VocabularyCandidate[]{
 const needle=normalizeGermanEntry(query);
 return vocabularyCandidates.filter(word=>
  normalizeGermanEntry(word.displayForm).includes(needle)||
  normalizeGermanEntry(word.lemma).includes(needle)||
  word.meaningFi.some(m=>normalizeGermanEntry(m).includes(needle))
 ).slice(0,limit);
}
export function vocabularyReviewSummary(){
 const active=vocabularyCandidates.filter(word=>word.importance==='active');
 return {total:vocabularyCandidates.length,activeCandidates:active.length,
  reviewed:active.filter(x=>x.reviewedBy!==null).length,
  missingSourceExample:active.filter(x=>!x.exampleBlockId).length,
  missingGenderOrPlural:active.filter(x=>x.partOfSpeech==='noun'&&(!x.gender||!x.plural)).length
 };
}
