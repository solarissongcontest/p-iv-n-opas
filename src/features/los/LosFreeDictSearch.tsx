import {useEffect,useMemo,useState} from "react";
import {fetchLosFreeDict,searchLosFreeDict,losFreeDictLemmaFor,type LosFreeDictAsset,type LosFreeDictPair} from "./los1FreeDict";

/** The imported FreeDict data stays distinct from LOS!'s course explanations. */
export function LosFreeDictSearch(){
 const [mode,setMode]=useState<LosFreeDictPair>("deu-fin");
 const [query,setQuery]=useState("");
 const [data,setData]=useState<Partial<Record<LosFreeDictPair,LosFreeDictAsset>>>({});
 const [error,setError]=useState("");
 const [loading,setLoading]=useState(false);
 useEffect(()=>{
  if(data[mode])return;
  const controller=new AbortController();
  setLoading(true);setError("");
  fetchLosFreeDict(mode,controller.signal).then(asset=>{
   if(!controller.signal.aborted)setData(old=>({...old,[mode]:asset}));
  }).catch(err=>{
   if(!controller.signal.aborted)setError(err instanceof Error?err.message:"Sanakirjan lataus epäonnistui.");
  }).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
  return ()=>controller.abort();
 },[data,mode]);
 const current=data[mode];
 const rows=useMemo(()=>current?searchLosFreeDict(current,query,120):[],[current,query]);
 const fin=mode==="fin-deu";
 const lemma=losFreeDictLemmaFor(query,mode);
 return <section className="los-freedict" aria-label="Laaja avoin kaksikielinen sanakirja">
  <h2>Laaja saksa–suomi-sanakirja</h2>
  <p>LOS!:n oman sanaston lisäksi voit hakea avoimesta FreeDict/WikDict-sanakirjasta. Tulokset ovat yleissanakirjan merkityksiä, eivät valmiita tekstikohtaisia vastauksia.</p>
  <div className="los-index-tabs" role="group" aria-label="Sanakirjan kielisuunta">
   <button type="button" aria-pressed={!fin} className={!fin?"is-active":""} onClick={()=>{setMode("deu-fin");setQuery("");}}>Saksa → suomi</button>
   <button type="button" aria-pressed={fin} className={fin?"is-active":""} onClick={()=>{setMode("fin-deu");setQuery("");}}>Suomi → saksa</button>
  </div>
  <label className="los-index-search"><span>{fin?"Etsi suomen sanaa":"Etsi saksan sanaa"}</span>
   <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={fin?"esimerkiksi tervehdys":"esimerkiksi Hallo"} autoComplete="off"/>
  </label>
  {loading&&<p role="status">Ladataan FreeDict-sanakirjaa…</p>}
  {error&&<p role="status">FreeDict-aineistoa ei voitu avata: {error} Kirjan oma sanasto toimii edelleen.</p>}
  {current&&<p className="los-index-footnote"><strong>{current.meta.entryCount.toLocaleString("fi-FI")} hakusanaa</strong> ·
   FreeDict / WikDict {current.meta.version}. <a href={current.meta.sourceUrl} target="_blank" rel="noreferrer">Lähdeaineisto</a>.
   {" "}Lisenssit: {current.meta.license.map((lic,i)=><span key={lic.url}>{i?", ":""}<a href={lic.url} target="_blank" rel="noreferrer">{lic.text||"Lue ehdot"}</a></span>)}.
   Muunnos: FreeDict TEI → LOS! JSON. Aineiston alkuperäinen tekijyys säilyy.</p>}
  {current&&query.trim().length<2&&<p>Kirjoita vähintään kaksi kirjainta nähdäksesi tulokset.</p>}
  {lemma&&rows.length>0&&
    <p className="los-dictionary-lemma-note">Sanan <strong lang="de">{query}</strong> hakua täydennetään perusmuodolla <strong lang="de">{lemma}</strong>.
      Käännös tulee FreeDict-lähteestä. Taivutusvastaavuus on LOS!:n toimituksellisesti määritelty.</p>}
  {query.trim().length>=2&&<div role="status" className="los-index-count">{rows.length} tulosta (enintään 120)</div>}
  {rows.length>0&&<div className="los-freedict-results" role="table" aria-label="FreeDict-hakutulokset">
   <div role="row" className="los-freedict-head"><strong role="columnheader">{fin?"Suomi":"Deutsch"}</strong><strong role="columnheader">{fin?"Deutsch":"Suomi"}</strong></div>
   {rows.map((row,i)=><div role="row" className="los-freedict-row" key={i}>
     <strong role="cell" lang={fin?"fi":"de"}>{row.word}</strong>
     <span role="cell" lang={fin?"de":"fi"}>{row.meaning}</span>
   </div>)}
  </div>}
 </section>;
}
