import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  searchLosDictionary,type LosDictionaryDirection,type LosDictionaryResult,
} from "./dictionaryClient";
import "./los-u2-dictionary.css";

export function LosDictionarySourceResult({entry,onSearch,onOpenCard}:{
  entry:LosDictionaryResult; onSearch:(word:string)=>void;
  onOpenCard?:(entry:LosDictionaryResult)=>void;
}) {
  return <li className="los-dict-result">
    <div className="los-dict-result-head">
      <strong lang={entry.language}>{entry.lemma}</strong>
      {onOpenCard && <button type="button" className="los-dict-open-card"
        aria-label={`Avaa sanakortti: ${entry.lemma}`}
        onClick={() => onOpenCard(entry)}>Avaa sanakortti</button>}
      <span>{entry.part_of_speech || "Sanaluokka ei saatavilla"}</span>
      {entry.gender && <span>Artikkeli / suku: {entry.gender}</span>}
    </div>
    <p className="los-dict-result-type">
      {entry.match_type==="form" ? "Taivutusmuodon kautta" :
        entry.match_type==="prefix" ? "Alkava sana" : "Perusmuodon kautta"}
    </p>
    {entry.senses.length ? <ol className="los-dict-senses">
      {entry.senses.map(sense=><li key={sense.senseIndex}>
        {sense.translations.length?
          sense.translations.map((t,i)=><span key={i} lang={t.language}>
            {t.value}{i+1<sense.translations.length?"; ":""}
          </span>) :
          <span className="los-dict-notice">Suomenkielistä käännöstä ei ole tästä lähteestä.</span>}
        {Boolean(sense.formOfCandidates?.length) && <p className="los-dict-form-of">
          Lähteen ilmoittama mahdollinen perusmuoto:{" "}
          {sense.formOfCandidates?.map(candidate=><button key={candidate} type="button"
            className="los-dict-lemma-button" lang="de"
            aria-label={`Hae perusmuoto ${candidate} sanakirjasta`}
            onClick={()=>onSearch(candidate)}>{candidate}</button>)}
          <span>Muotoyhteyttä ei ole erikseen kielentarkistettu.</span>
        </p>}
        {sense.glosses.length>0 && <details>
          <summary>Lähteen alkuperäiset selitteet (ei automaattisia suomennoksia)</summary>
          {sense.glosses.map((gloss,i)=><p key={i} lang={sense.glossLanguage ?? undefined}>{gloss}</p>)}
        </details>}
      </li>)}
    </ol> : <p className="los-dict-notice">Tälle tietueelle ei ole vielä merkitysselitteitä.</p>}
    {entry.pronunciations.length>0&&<div className="los-dict-ipa">
      <span>IPA-ehdokkaat lähteestä (ei välttämättä kielentarkistettu): </span>
      {entry.pronunciations.map((p,i)=><span key={i} lang="de">[{p.ipa}] ({p.reviewStatus}){" "}</span>)}
    </div>}
    {entry.forms.length>0&&<details className="los-dict-forms">
      <summary>Sanamuodot ({entry.forms.length})</summary>
      <p lang={entry.language}>{entry.forms.map(f=>f.writtenForm).join(", ")}</p>
    </details>}
    <p className="los-dict-source">Lähdekerros: {entry.source_kind} · {entry.source_id}
      {" · "}<a href={entry.evidence_url} target="_blank" rel="noopener noreferrer">Lähdetietue / oikeustiedot</a>
      {" · "}<a href={entry.license_url} target="_blank" rel="noopener noreferrer">{entry.license_code}</a>
    </p>
  </li>;
}
export function LosDictionarySearch({onOpenCard}:{
  onOpenCard?:(entry:LosDictionaryResult)=>void;
} = {}) {
  const [query,setQuery]=useState("");
  const [direction,setDirection]=useState<LosDictionaryDirection>("de-fi");
  const [state,setState]=useState<
    {kind:"idle"|"loading"} |
    {kind:"error";message:string} |
    {kind:"done";results:LosDictionaryResult[];sourcesPublished:number}
  >({kind:"idle"});
  useEffect(()=>{
    const q=query.trim();
    if(q.length<2 || q.length>80) {
      setState({kind:"idle"});
      return;
    }
    const abort=new AbortController();
    const timer=window.setTimeout(()=>{
      setState({kind:"loading"});
      void searchLosDictionary(q,direction,abort.signal).then(result=>{
        if(!abort.signal.aborted)setState({
          kind:"done",results:result.results,sourcesPublished:result.sourcesPublished,
        });
      }).catch(error=>{
        if(!abort.signal.aborted)setState({
          kind:"error",message:error instanceof Error ? error.message : "Sanakirjapalvelu ei ole käytettävissä.",
        });
      });
    },300);
    return ()=>{window.clearTimeout(timer);abort.abort();};
  },[query,direction]);
  return <section className="los-dict-search" aria-label="Laajan sanakirjakannan haku">
    <p className="los-eyebrow">LÄHTEISTETTY SANAKIRJA · DE–FI / FI–DE</p>
    <h2>Hae saksaksi tai suomeksi</h2>
    <p>Haku käyttää vain erikseen julkaistua ja lähteistettyä sanakirjadataa. Se ei sekoita englanninkielisiä Wiktionary-selitteitä suomalaisiin käännöksiin.</p>
    <div className="los-dict-directions" role="group" aria-label="Valitse hakusuunta">
      <button type="button" aria-pressed={direction==="de-fi"} onClick={()=>setDirection("de-fi")}>
        Saksa → suomi
      </button>
      <button type="button" aria-pressed={direction==="fi-de"} onClick={()=>setDirection("fi-de")}>
        Suomi → saksa
      </button>
    </div>
    <label className="los-dict-query"><Search size={18} aria-hidden="true"/>
      <span className="sr-only">Sanakirjan hakusana</span>
      <input type="search" value={query} maxLength={80} onChange={e=>setQuery(e.target.value)}
        placeholder={direction==="de-fi"?"Esim. Haus, Häuser":"Esim. talo"}/>
    </label>
    <div className="los-dict-live" role="status" aria-live="polite">
      {state.kind==="idle"&&<p>Kirjoita vähintään kaksi merkkiä aloittaaksesi haun.</p>}
      {state.kind==="loading"&&<p>Haetaan julkaistua sanakirjadataa…</p>}
      {state.kind==="error"&&<p className="los-dict-notice">{state.message}
        {" "}Alla oleva kappalesanasto toimii edelleen ilman sanakirjapalvelua.</p>}
      {state.kind==="done"&&<p>{state.results.length} hakutulosta tällä sivulla
        {" · "}{state.sourcesPublished} julkaistua lähdekerrosta.</p>}
    </div>
    {state.kind==="done"&&
      (state.results.length?<ol className="los-dict-results">
        {state.results.map(item=><LosDictionarySourceResult key={item.source_id+":"+item.source_entry_id} entry={item} onSearch={setQuery}
          {...(onOpenCard ? {onOpenCard} : {})}/>) }
      </ol>:<p>Ei osumia julkaistusta aineistosta tällä hakusanalla.</p>)}
  </section>;
}
