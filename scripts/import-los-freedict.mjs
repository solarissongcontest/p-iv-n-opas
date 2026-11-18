/**
 * LOS! FreeDict asset importer. Generates static, separately attributed dictionary
 * data at build time rather than copying content into source files or relying
 * on a third-party runtime API. SPDX for generated data is SOURCE-SPECIFIC.
 *
 * Data: https://freedict.org/downloads/ (WikDict-based source).
 * This script never declares data licensed or verified based on a filename:
 * it inspects TEI licence metadata and records attribution in every result.
 */
import {execFileSync} from "node:child_process";
import {mkdtemp, mkdir, readFile, rm, writeFile, stat} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
const VERSION="2025.11.23";
const OUT="public/los-dictionary/v1";
const pairs=["deu-fin","fin-deu"];
const xmlDecode=s=>s.replace(/&#x([a-f0-9]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)))
 .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)))
 .replace(/&(?:amp|lt|gt|quot|apos);/g,x=>({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'"}[x]));
const strip=s=>xmlDecode(s.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim());
export function parseFreeDictTEI(xml,pair){
  const entries=[];
  const seen=new Set();
  const re=/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/g;
  let match;
  while((match=re.exec(xml))!==null){
    const block=match[1];
    const headMatch=/<orth(?:\s[^>]*)?>([\s\S]*?)<\/orth>/.exec(block);
    if(!headMatch)continue;
    const head=strip(headMatch[1]);
    if(!head || head.length>100 || /[<>{}]/.test(head))continue;
    const translations=[...block.matchAll(/<cit\b[^>]*type=["']trans["'][^>]*>([\s\S]*?)<\/cit>/g)]
      .flatMap(m=>[...m[1].matchAll(/<quote(?:\s[^>]*)?>([\s\S]*?)<\/quote>/g)].map(x=>strip(x[1])));
    // Generated FreeDict data sometimes uses <def> instead of <cit>.
    if(!translations.length)translations.push(...[...block.matchAll(/<def(?:\s[^>]*)?>([\s\S]*?)<\/def>/g)].map(x=>strip(x[1])));
    const definitions=[...new Set(translations.filter(x=>x && x.length<280))].slice(0,6);
    if(!definitions.length)continue;
    const key=head.toLocaleLowerCase(pair.startsWith("deu")?"de":"fi");
    const duplicateKey=key+"\u0000"+definitions.join("|");
    if(seen.has(duplicateKey))continue;
    seen.add(duplicateKey);
    entries.push([head,definitions.join("; ")]);
  }
  return entries.sort((a,b)=>a[0].localeCompare(b[0],pair.startsWith("deu")?"de":"fi"));
}
export function getLicence(xml){
 const header=xml.slice(0,Math.min(xml.indexOf("<body>")>0?xml.indexOf("<body>"):14000,25000));
 const candidates=[...header.matchAll(/<licen[cs]e\b[^>]*?(?:target|href)=["']([^"']+)["'][^>]*>([\s\S]*?)<\/licen[cs]e>/gi)];
 return candidates.map(m=>({url:xmlDecode(m[1]),text:strip(m[2])})).filter(x=>x.url.startsWith("http"));
}
export async function createDictionaryAsset(pair,{fetcher=fetch,output=OUT}={}){
 const parent=await mkdtemp(join(tmpdir(),"los-freedict-"));
 try{
  const file=join(parent,pair+".tar.xz");
  const url="https://download.freedict.org/dictionaries/"+pair+"/"+VERSION+"/freedict-"+pair+"-"+VERSION+".src.tar.xz";
  const response=await fetcher(url,{signal:AbortSignal.timeout(85000)});
  if(!response.ok)throw Error(pair+": FreeDict latausvirhe "+response.status);
  const raw=Buffer.from(await response.arrayBuffer());
  if(raw.length<20000 || raw.length>50000000)throw Error("Odottamaton FreeDict-paketin koko.");
  await writeFile(file,raw);
  const paths=execFileSync("tar",["-tJf",file],{encoding:"utf8",timeout:25000})
    .split("\n").filter(x=>/\.tei$/i.test(x)&&!x.includes(".."));
  if(paths.length!==1)throw Error(pair+": TEI-tiedostoa ei löydy yksiselitteisesti.");
  const xml=execFileSync("tar",["-xJOf",file,paths[0]],{encoding:"utf8",maxBuffer:65*1024*1024,timeout:35000});
  const licenses=getLicence(xml);
  if(!licenses.length)throw Error(pair+": lisenssitietoa ei löytynyt TEI-tiedoston otsakkeesta: julkaisu estetty.");
  // This distribution is WikDict-derived: check the actual license, not simply the project.
  const label=(licenses.map(x=>x.text+" "+x.url).join(" ")).toLowerCase();
  if(!/(creativecommons\.org\/licenses\/by-sa|gnu\.org\/licenses\/(?:gpl|fdl)|spdx\.org\/licenses\/(?:cc-by-sa|gpl|gfdl))/i.test(label))
    throw Error(pair+": lisenssiä ei voi luokitella luotettavasti: "+label.slice(0,180));
  const entries=parseFreeDictTEI(xml,pair);
  if(entries.length<8500)throw Error(pair+": hyväksyttyjä hakusanoja vain "+entries.length);
  const packageData={
   meta:{source:"FreeDict / WikDict",sourceUrl:url,version:VERSION,pair,
    license:licenses,attribution:"FreeDict contributors and original Wiktionary contributors; changes: converted from TEI to LOS! JSON; retain ShareAlike conditions where applicable",
    entryCount:entries.length, generatedAt:new Date().toISOString().slice(0,10)},
   entries
  };
  await mkdir(output,{recursive:true});
  const target=join(output,pair+".json");
  await writeFile(target,JSON.stringify(packageData));
  return {pair,count:entries.length,path:target,size:(await stat(target)).size,licenses};
 }finally{await rm(parent,{recursive:true,force:true});}
}
if(process.argv[1]?.endsWith("import-los-freedict.mjs")){
 const strict=process.argv.includes("--strict");
 const results=[];
 for(const pair of pairs){
  try{results.push(await createDictionaryAsset(pair));}
  catch(error){if(strict)throw error;console.warn("[LOS! sanakirja] "+pair+" tuonti ei onnistunut: "+String(error));}
 }
 console.log("[LOS! sanakirja] "+JSON.stringify(results.map(x=>({pair:x.pair,count:x.count,size:x.size}))));
}
