export type LosFreeDictPair="deu-fin"|"fin-deu";
export type LosFreeDictAsset={
 meta:{source:string;sourceUrl:string;version:string;pair:LosFreeDictPair;
  license:readonly {url:string;text:string}[];attribution:string;entryCount:number;generatedAt:string};
 entries:readonly (readonly [word:string,meaning:string])[];
};
export function isLosFreeDictAsset(value:unknown,pair:LosFreeDictPair):value is LosFreeDictAsset {
 if(!value||typeof value!=="object")return false;
 const v=value as Partial<LosFreeDictAsset>;
 return v.meta?.pair===pair&&v.meta.license?.length>0&&
   Array.isArray(v.entries)&&v.entries.length>8500&&
   v.entries.every(entry=>Array.isArray(entry)&&typeof entry[0]==="string"&&typeof entry[1]==="string");
}
/** Small, explicitly curated morphology bridges for common beginner queries.
 * FreeDict remains the source of every displayed definition: no translations
 * are generated or inferred from an inflected form.
 */
const DE_FORM_LEMMA:Readonly<Record<string,string>>={
 "heiße":"heißen","heisse":"heißen","heißt":"heißen","heisst":"heißen",
 "komme":"kommen","kommst":"kommen","kommt":"kommen",
 "bin":"sein","bist":"sein","ist":"sein","sind":"sein",
 "wohnst":"wohnen","wohnt":"wohnen",
 "schreibt":"schreiben","schreibst":"schreiben",
 "geht":"gehen","gehst":"gehen",
 "häuser":"Haus","häusern":"Haus",
 "strasse":"Straße","maedchen":"Mädchen",
};
export function losFreeDictLemmaFor(query:string,pair:LosFreeDictPair):string|null{
 if(pair!=="deu-fin")return null;
 const normalized=query.trim().toLocaleLowerCase("de");
 return DE_FORM_LEMMA[normalized]??null;
}
export function searchLosFreeDict(
  data:LosFreeDictAsset,query:string,limit=120
):readonly {word:string;meaning:string}[]{
 const needle=query.toLocaleLowerCase(data.meta.pair==="deu-fin"?"de":"fi").trim();
 if(needle.length<2)return[];
 const starts: {word:string;meaning:string}[]=[];
 const contains: {word:string;meaning:string}[]=[];
 const lemma=losFreeDictLemmaFor(query,data.meta.pair);
 const lemmaMatches:{word:string;meaning:string}[]=[];
 for(const [word,meaning] of data.entries){
  const head=word.toLocaleLowerCase(data.meta.pair==="deu-fin"?"de":"fi");
  const item={word,meaning};
  if(head.startsWith(needle))starts.push(item);
  else if(lemma&&head===lemma.toLocaleLowerCase("de"))lemmaMatches.push(item);
  else if(head.includes(needle)||meaning.toLocaleLowerCase("fi").includes(needle))
   contains.push(item);
  if(starts.length>=limit)break;
 }
 return [...starts,...(starts.length===0?lemmaMatches:[]),...contains].slice(0,limit);
}
export async function fetchLosFreeDict(pair:LosFreeDictPair,signal?:AbortSignal):Promise<LosFreeDictAsset>{
 const response=await fetch("/los-dictionary/v1/"+pair+".json",signal?{signal}:{});
 if(!response.ok)throw Error("Sanakirja-aineistoa "+pair+" ei ole asennettu ("+response.status+").");
 const data:unknown=await response.json();
 if(!isLosFreeDictAsset(data,pair))throw Error("Sanakirjan tiedostoa ei voitu vahvistaa.");
 return data;
}
