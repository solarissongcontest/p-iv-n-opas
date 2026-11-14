import {useMemo,useState} from "react";
import {LosDictionaryCard} from "./LosDictionaryCard.tsx";
import {useLosChapterDraft} from "./studyState.ts";
import {LOS_READER_COLORS,type LosReaderColor} from "./content/c01Annotations.ts";
import {parseLosReaderAnnotation} from "./content/readerAnnotations.ts";
import {
  losFutureReaderMarkKey,losFutureReaderTextVersion,losFutureReaderWords,
  losFutureReaderAppend,losFutureReaderColor,type LosFutureReaderSource,
} from "./losFutureReaderMarks.ts";
import "./los-future-reader.css";

type Vocabulary=readonly {de:string;fi:string;status:string}[];
const colorLabels:Record<LosReaderColor,string>={
  yellow:"Keltainen",pink:"Vaaleanpunainen",green:"Vihreä",blue:"Sininen",
};
/** The same manuscript words, saved with the owner's existing chapter draft.
 * Click a word for the shared dictionary or select two tokens to highlight.
 * Stale text-version marks are never silently reassigned to new words. */
export function LosFutureInteractiveReader({bookId,chapterId,source,text,vocabulary,showNotes=true}:{
  bookId:number;chapterId:string;source:LosFutureReaderSource;text:string;
  vocabulary:Vocabulary;showNotes?:boolean;
}){
  const {draft,update,saved}=useLosChapterDraft(bookId,chapterId);
  const [mode,setMode]=useState<"dictionary"|"highlight">("dictionary");
  const [color,setColor]=useState<LosReaderColor>("yellow");
  const [first,setFirst]=useState<number|null>(null);
  const [word,setWord]=useState<string|null>(null);
  const parts=useMemo(()=>losFutureReaderWords(text),[text]);
  const key=losFutureReaderMarkKey(bookId,chapterId,source);
  const version=losFutureReaderTextVersion(text);
  const raw=draft.readerMarks?.[key];
  const annotation=parseLosReaderAnnotation(raw,version);
  const stale=Boolean(raw&&annotation.contentVersion!==version);
  const glossary=word?vocabulary.filter(item=>{
    const lemma=item.de.trim().toLocaleLowerCase("de");
    const term=word.toLocaleLowerCase("de");
    return lemma===term||lemma.endsWith(" "+term);
  }):[];
  const meaning=glossary.length===1?glossary[0]!.fi:undefined;
  function persist(rawMark:string){
    update(current=>({...current,readerMarks:{...current.readerMarks,[key]:rawMark}}));
  }
  function choose(index:number,value:string){
    if(mode==="dictionary"){
      const term=value.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,"");
      if(term)setWord(term);
      return;
    }
    if(stale)return;
    setWord(null);
    if(first===null){setFirst(index);return;}
    const updated=losFutureReaderAppend(raw,text,first,index,color);
    if(updated!==null)persist(updated);
    setFirst(null);
  }
  function removeLast(){
    if(stale)return;
    persist(JSON.stringify({...annotation,ranges:annotation.ranges.slice(0,-1)}));
    setFirst(null);
  }
  function reset(){
    persist(JSON.stringify({contentVersion:version,ranges:[]}));
    setFirst(null);setWord(null);
  }
  return <section className="los-future-interactive-reader"
    aria-label={source==="text-a"?"Text A:n lukija":source==="text-b"?"Text B:n lukija":"Tukidialogin lukija"}>
    <div className="los-future-reader-tools">
      <div className="los-future-reader-modes" role="group" aria-label="Tekstin työkalut">
        <button type="button" aria-pressed={mode==="dictionary"}
          onClick={()=>{setMode("dictionary");setFirst(null);}}>Avaa sanaselitys</button>
        <button type="button" aria-pressed={mode==="highlight"}
          onClick={()=>{setMode("highlight");setWord(null);}}>Korosta tekstiä</button>
      </div>
      {mode==="highlight"&&<div className="los-future-reader-colors" role="group" aria-label="Korostusväri">
        {LOS_READER_COLORS.map(item=><button key={item} type="button"
          aria-label={colorLabels[item]} aria-pressed={color===item}
          className={"los-future-reader-color los-future-reader-color-"+item}
          onClick={()=>{setColor(item);setFirst(null);}}>{colorLabels[item]}</button>)}
      </div>}
      <p className="los-future-reader-help" role="status">
        {stale?"Tekstiä on muutettu korostusten tallentamisen jälkeen. Vanhat merkit säilyvät tallessa, mutta niitä ei aseteta väärään kohtaan.":
          mode==="dictionary"?"Valitse tekstistä sana nähdäksesi lähteistetyn sanakirjakortin. Kaikille taivutusmuodoille ei ole valmista selitystä.":
          first!==null?"Valitse korostuksen viimeinen sana.":"Valitse ensin korostuksen alkusana ja sitten loppusana."}
      </p>
      {stale?<button type="button" onClick={reset}>Aloita korostukset nykyiseen tekstiversioon</button>:
        <div className="los-future-reader-actions">
          <button type="button" disabled={!annotation.ranges.length} onClick={removeLast}>Poista viimeisin korostus</button>
          <button type="button" disabled={!annotation.ranges.length} onClick={reset}>Tyhjennä tämän tekstin korostukset</button>
        </div>}
    </div>
    <div lang="de" className="los-future-reader-language">
      <p className="los-future-reader-text">
      {parts.map((part,i)=>part.index===null
        ? <span key={i}>{part.value}</span>
        : <button type="button" key={i}
          lang="de" className={"los-future-reader-token"+
            (losFutureReaderColor(raw,text,part.index)?" is-"+losFutureReaderColor(raw,text,part.index):"")+
            (first===part.index?" is-first":"")}
          aria-label={(mode==="dictionary"?"Avaa sanan selitys: ":"Valitse korostukseen: ")+part.value}
          onClick={()=>choose(part.index!,part.value)}>{part.value}</button>)}
      </p>
    </div>
    {word&&mode==="dictionary"&&<LosDictionaryCard word={word}
      {...(meaning?{contextMeaning:meaning}:{})} onClose={()=>setWord(null)}/>}
    {showNotes&&<label className="los-future-reader-note">
      <strong>Kappaleen omat muistiinpanot</strong>
      <textarea rows={3} maxLength={8000} value={draft.note}
        placeholder="Kirjoita havainto tekstin sisällöstä tai uudesta saksan ilmauksesta..."
        onChange={event=>update(current=>({...current,note:event.target.value.slice(0,8000)}))}/>
    </label>}
    <p className="los-future-reader-saved" role="status">{saved?
      "Omat muistiinpanot ja korostukset tallentuvat paikallisesti. Ne sisältyvät kirjan JSON-varmuuskopioon.":
      "Tallennus ei onnistunut. Säilytä tärkeä tekstisi muualla, kunnes tallennus toimii."}</p>
  </section>;
}
