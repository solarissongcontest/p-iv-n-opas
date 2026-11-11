/** LOS! learner's mini-dictionary, built ONLY from published-to-preview
 * vocabulary entries already embedded inside the eight-book collection.
 *
 * No external dictionaries, scraped vocab, invented glosses, guesses
 * about morphological inflection, or ML-based translations.
 * Exact distinct German/Finnish pairs are aggregated, and each source
 * chapter remains traceable. This does NOT replace a full FreeDict import.
 */
import type {Book} from "./model";

export type DictionaryDirection="de-fi"|"fi-de";
export type DictionaryLocation={
 bookId:Book["id"];bookNumber:number;chapterId:string|null;chapterTitle:string;
 /** Exact stable row ID used by VocabularyIndex and its user's bookmark list. */
 vocabularyRowId:string;
};
export type DictionaryEntry={
 id:string;de:string;fi:string;notes:string[];
 locations:DictionaryLocation[];
};
export type DictionarySearchResult={entry:DictionaryEntry;rank:0|1|2|3};

export function normalizedSearchText(text:string):string{
 return text.trim().toLocaleLowerCase("fi-FI").normalize("NFD")
  .replace(/\p{M}/gu,"").replace(/ß/gu,"ss")
  .replace(/\s+/gu," ");
}

export function buildLosDictionary(books:readonly Book[]):DictionaryEntry[]{
 const unique=new Map<string,DictionaryEntry>();
 for(const book of books){
  for(const block of book.blocks){
   if(block.kind!=="vocabulary")continue;
   const matches=book.chapters.filter(chapter=>chapter.blockIds.includes(block.id));
   const locations:Omit<DictionaryLocation,"vocabularyRowId">[]=matches.length
    ?matches.map(chapter=>({
      bookId:book.id,bookNumber:book.number,
      chapterId:chapter.id,chapterTitle:chapter.title,
    }))
    :[{
      bookId:book.id,bookNumber:book.number,
      chapterId:null,chapterTitle:"Kirjan yhteissanasto",
    }];
   for(const vocab of block.entries){
    const de=vocab.de.trim(),fi=vocab.fi.trim();
    const vocabularyRowId=block.id+":"+vocab.id;
    if(!de||!fi)continue;
    // Dedupe only a truly matching bilingual pair; do NOT silently merge
    // ambiguous German lemmas with different valid Finnish glosses.
    const key=de.toLocaleLowerCase("de-DE")+"\u0000"+fi.toLocaleLowerCase("fi-FI");
    let entry=unique.get(key);
    if(!entry){
      entry={id:book.id+":"+vocabularyRowId,de,fi,notes:[],locations:[]};
      unique.set(key,entry);
    }
    const note=vocab.note?.trim();
    if(note&&!entry.notes.includes(note))entry.notes.push(note);
    for(const location of locations){
      // Exact identity maps back to the same row the book's bookmark list uses.
      // Distinct source occurrences of the same translation are not lost.
      if(!entry.locations.some(x=>x.bookId===location.bookId&&
        x.vocabularyRowId===vocabularyRowId&&x.chapterId===location.chapterId))
        entry.locations.push({...location,vocabularyRowId});
    }
   }
  }
 }
 return [...unique.values()].sort((a,b)=>
  a.de.localeCompare(b.de,"de")||a.fi.localeCompare(b.fi,"fi"));
}

/** Score exact/prefix/word-start/substring; keep stable alphabetical ties. */
export function searchLosDictionary(entries:readonly DictionaryEntry[],query:string,
 direction:DictionaryDirection,limit=48,offset=0):{
 total:number; results:DictionarySearchResult[];
}{
 const q=normalizedSearchText(query);
 const key=direction==="de-fi"?"de":"fi";
 const scored:DictionarySearchResult[]=[];
 for(const entry of entries){
  const text=normalizedSearchText(entry[key]);
  if(!q){scored.push({entry,rank:3});continue}
  let rank:0|1|2|3|undefined;
  if(text===q)rank=0;
  else if(text.startsWith(q))rank=1;
  else if(text.split(/[^\p{L}\p{N}]+/u).some(word=>word.startsWith(q)))rank=2;
  else if(text.includes(q))rank=3;
  if(rank!==undefined)scored.push({entry,rank});
 }
 scored.sort((a,b)=>a.rank-b.rank||
  a.entry[key].localeCompare(b.entry[key],direction==="de-fi"?"de":"fi")||
  a.entry.id.localeCompare(b.entry.id));
 const safeOffset=Number.isFinite(offset)?Math.max(0,Math.floor(offset)):0;
 const safeLimit=Number.isFinite(limit)?Math.max(1,Math.min(100,Math.floor(limit))):48;
 return {total:scored.length,
  results:scored.slice(safeOffset,safeOffset+safeLimit)};
}


/** An optional in-book German example, quoted exactly from an existing
 * licensed source or from a separately identifiable LOS! teaching example.
 * No sentence generation, fake narrator, inferred translation or web fetch.
 */
export type DictionaryContext={
 de:string;fi:string;blockId:string;bookId:Book["id"];
 kind:"authentic"|"teaching";sourceTitle?:string;
};
function containsExactGermanPhrase(line:string,phrase:string):boolean{
 const value=line.normalize("NFC").toLocaleLowerCase("de-DE");
 const needle=phrase.normalize("NFC").toLocaleLowerCase("de-DE");
 if(!needle)return false;
 let from=0;
 while(from<value.length){
  const at=value.indexOf(needle,from);
  if(at<0)return false;
  const before=at>0?value.slice(at-1,at):"";
  const after=value.slice(at+needle.length,at+needle.length+1);
  if((!before||!/[\p{L}\p{N}]/u.test(before))&&
     (!after||!/[\p{L}\p{N}]/u.test(after)))return true;
  from=at+1;
 }
 return false;
}
export function findLosDictionaryContext(books:readonly Book[],
 entry:DictionaryEntry):DictionaryContext|null{
 let authored:DictionaryContext|null=null;
 for(const location of entry.locations){
  const book=books.find(item=>item.id===location.bookId);
  const chapter=book?.chapters.find(item=>item.id===location.chapterId);
  if(!book||!chapter)continue;
  for(const blockId of chapter.blockIds){
   const block=book.blocks.find(item=>item.id===blockId);
   if(!block)continue;
   if(block.kind==="dialogue"||block.kind==="transcript"){
    const source=book.sources.find(item=>item.id===block.sourceId);
    if(!source||source.permittedMode==="pending"||
      source.readiness==="blocked")continue;
    const lines=block.kind==="dialogue"?
      block.turns.map(turn=>({de:turn.text,fi:turn.translationFi??""})):
      block.lines.map(line=>({de:line.de,fi:line.fi}));
    const found=lines.find(line=>line.de.length<=200&&
      containsExactGermanPhrase(line.de,entry.de));
    if(found)return {de:found.de,fi:found.fi,
      blockId:block.id,bookId:book.id,kind:"authentic",sourceTitle:source.title};
   }
   // Own teaching examples are a fallback. They must NEVER be presented
   // as human-authored original source dialogue.
   if(block.kind==="grammar"&&!authored){
    const found=block.examples.find(line=>line.de.length<=200&&
      containsExactGermanPhrase(line.de,entry.de));
    if(found)authored={de:found.de,fi:found.fi,
      blockId:block.id,bookId:book.id,kind:"teaching"};
   }
  }
 }
 return authored;
}
