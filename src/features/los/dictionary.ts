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
export type DictionaryLocation={bookId:Book["id"];bookNumber:number;chapterId:string|null;chapterTitle:string};
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
   const locations:DictionaryLocation[]=matches.length
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
    if(!de||!fi)continue;
    // Dedupe only a truly matching bilingual pair; do NOT silently merge
    // ambiguous German lemmas with different valid Finnish glosses.
    const key=de.toLocaleLowerCase("de-DE")+"\u0000"+fi.toLocaleLowerCase("fi-FI");
    let entry=unique.get(key);
    if(!entry){
      entry={id:vocab.id,de,fi,notes:[],locations:[]};
      unique.set(key,entry);
    }
    const note=vocab.note?.trim();
    if(note&&!entry.notes.includes(note))entry.notes.push(note);
    for(const location of locations){
      if(!entry.locations.some(x=>x.bookId===location.bookId&&x.chapterId===location.chapterId))
        entry.locations.push(location);
    }
   }
  }
 }
 return [...unique.values()].sort((a,b)=>
  a.de.localeCompare(b.de,"de")||a.fi.localeCompare(b.fi,"fi"));
}

/** Score exact/prefix/word-start/substring; keep stable alphabetical ties. */
export function searchLosDictionary(entries:readonly DictionaryEntry[],query:string,
 direction:DictionaryDirection,limit=48):{
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
 return {total:scored.length,
  results:scored.slice(0,Math.max(1,Math.min(100,Math.floor(limit)||48)))};
}
