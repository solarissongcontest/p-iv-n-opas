import { useRef, useState } from "react";
import { Check, Eraser, Highlighter, Info, MousePointerClick } from "lucide-react";
import { useLosChapterDraft } from "./studyState";
import { LOS_READER_COLORS, type LosReaderColor } from "./content/c01Annotations";
import {
  appendLosReaderRange, losReaderMarkKey, losReaderTokenColor, parseLosReaderAnnotation,
} from "./content/readerAnnotations";
import { LosDictionaryCard } from "./LosDictionaryCard";
import "./los-authentic-reader.css";

export type LosOriginalLine = {
  readonly id: string;
  readonly speaker: string;
  readonly text: string;
  readonly meaning: string;
  readonly sectionTitle?: string;
};
export type LosOriginalDialogueProps = {
  chapterId: string;
  sourceId: string;
  version: string;
  lines: readonly LosOriginalLine[];
  glossary: Readonly<Record<string,string>>;
  heading: string;
  usageLabel?: string;
  guidance: string;
  author: string;
  sourceTitle: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  sourceDetail: string;
};

const colorLabels: Record<LosReaderColor,string> = {
  yellow: "Keltainen", pink: "Pinkki", green: "Vihreä", blue: "Sininen",
};
function tokenize(sourceId: string, line: LosOriginalLine) {
  return (line.text.match(/\S+\s*/gu) ?? []).map((display,index) => ({
    id: sourceId + "-" + line.id + "-t" + index,
    index, display,
    word: display.trim().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,"").toLocaleLowerCase("de"),
  }));
}

/**
 * One real-text reading and annotation engine for C01, C02 and later books.
 * Legacy C01 keys and JSON mark shape are retained without migrations.
 */
export function LosOriginalDialogue(props: LosOriginalDialogueProps) {
  const { chapterId, sourceId, version, lines, glossary } = props;
  const {draft,update,saved} = useLosChapterDraft(1, chapterId);
  const [mode,setMode] = useState<"meaning"|"highlight">("meaning");
  const [color,setColor] = useState<LosReaderColor>("yellow");
  const [first,setFirst] = useState<{lineId:string;index:number}|null>(null);
  const [gloss,setGloss] = useState<{word:string;meaning:string}|null>(null);
  const wordTrigger = useRef<HTMLButtonElement | null>(null);
  const [undoMark,setUndoMark] = useState<{key:string;previous:string|undefined}|null>(null);
  const marks = draft.readerMarks ?? {};

  const selectWord = (line:LosOriginalLine,index:number,word:string,trigger:HTMLButtonElement) => {
    if(mode==="meaning") {
      wordTrigger.current = trigger;
      setGloss({word,meaning:glossary[word] ?? "Tälle sanalle ei ole vielä tarkistettua kontekstiselitystä."});
      return;
    }
    if(!first || first.lineId!==line.id) {
      setFirst({lineId:line.id,index});
      return;
    }
    const key = losReaderMarkKey(chapterId,sourceId,line.id);
    const previous = marks[key];
    const parsed = parseLosReaderAnnotation(previous,version);
    if(parsed.contentVersion!==version) { setFirst(null); return; }
    const next = appendLosReaderRange(parsed,first.index,index,color,tokenize(sourceId,line).length,version);
    update(current=>({...current,readerMarks:{...current.readerMarks,[key]:JSON.stringify(next)}}));
    setUndoMark({key,previous});
    setFirst(null);
  };
  const removeLine = (lineId:string) => {
    const key=losReaderMarkKey(chapterId,sourceId,lineId);
    const previous=marks[key];
    update(current=>{
      const next={...current.readerMarks};
      delete next[key];
      return {...current,readerMarks:next};
    });
    setUndoMark({key,previous});
    setFirst(null);
  };
  const undo=() => {
    if(!undoMark)return;
    update(current=>{
      const next={...current.readerMarks};
      if(undoMark.previous===undefined)delete next[undoMark.key];
      else next[undoMark.key]=undoMark.previous;
      return {...current,readerMarks:next};
    });
    setUndoMark(null);
    setFirst(null);
  };
  const markPrefix=losReaderMarkKey(chapterId,sourceId,"");
  const outdated=Object.entries(marks).some(([key,raw])=>key.startsWith(markPrefix) &&
    parseLosReaderAnnotation(raw,version).contentVersion!==version);

  return <div className="los-c01-reader" aria-label={props.heading}>
    <div className="los-c01-reader-intro">
      <p className="los-overline">{props.usageLabel ?? "ORIGINALTEXT · TEXT A"} · {sourceId}</p>
      <h2>{props.heading}</h2>
      <p>{props.guidance}</p>
      <p className="los-c01-reader-warning"><Info size={17}/> Kokonainen lähdeteksti on tuotu käyttöoikeuksien perusteella. Lopullinen kielellinen tarkistus ja laitetestaus ovat kesken.</p>
    </div>
    <div className="los-c01-toolbox" aria-label="Lukijan työkalut">
      <div className="los-c01-modes" role="group" aria-label="Sanan napautuksen toiminto">
        <button type="button" aria-pressed={mode==="meaning"} className={mode==="meaning"?"is-current":""}
          onClick={()=>{setMode("meaning");setFirst(null);}}><MousePointerClick size={17}/> Sanojen selitykset</button>
        <button type="button" aria-pressed={mode==="highlight"} className={mode==="highlight"?"is-current":""}
          onClick={()=>{setMode("highlight");setGloss(null);}}><Highlighter size={17}/> Korostustussi</button>
      </div>
      {mode==="highlight"&&<div className="los-c01-colors" role="group" aria-label="Korostuksen väri">
        {LOS_READER_COLORS.map(item=><button key={item} type="button"
          className={"los-c01-color los-c01-color-"+item}
          aria-label={colorLabels[item]} aria-pressed={color===item}
          onClick={()=>setColor(item)}>{color===item&&<Check size={14}/>}</button>)}
        <button type="button" className="los-c01-undo" onClick={undo} disabled={!undoMark}>Kumoa</button>
      </div>}
      <p className="los-c01-instruction" role="status">{mode==="meaning"?
        "Napauta saksankielistä sanaa, niin näet sen merkityksen.":
        first?"Valitse saman repliikin viimeinen korostettava sana.":
          "Napauta ensin korostuksen ensimmäistä ja sitten viimeistä sanaa. Voit valita myös yhden sanan."}</p>
    </div>
    <div className="los-c01-turns" lang="de">
      {lines.map(line=>{
        const key=losReaderMarkKey(chapterId,sourceId,line.id);
        const annotation=parseLosReaderAnnotation(marks[key],version);
        return <div className="los-c01-turn" key={line.id}>
          {line.sectionTitle && <h3 className="los-c01-dialogue-subheading">{line.sectionTitle}</h3>}
          <span className="los-c01-speaker">{line.speaker}</span>
          <div className="los-c01-turn-body">
            <p className="los-c01-words">{tokenize(sourceId,line).map(token=>{
              const marker=losReaderTokenColor(annotation,token.index,version);
              const pending=first?.lineId===line.id&&first.index===token.index;
              return <button type="button" key={token.id}
                className={"los-c01-token "+(marker?"los-c01-mark-"+marker:"")+(pending?" is-first":"")}
                onClick={event=>selectWord(line,token.index,token.word,event.currentTarget)}
                aria-label={token.word+", "+(mode==="meaning"?"selitys":"korostuksen sana")}
                aria-pressed={mode==="highlight"?Boolean(marker||pending):undefined}
                title={mode==="meaning"?"Näytä sanan merkitys":"Valitse korostukseen"}>{token.display}</button>;
            })}</p>
            {annotation.ranges.length>0&&<button className="los-c01-clear" type="button" onClick={()=>removeLine(line.id)}><Eraser size={14}/> Poista tämän repliikin korostukset</button>}
          </div>
        </div>;
      })}
    </div>
    {gloss && <LosDictionaryCard word={gloss.word} contextMeaning={gloss.meaning}
      onClose={() => { setGloss(null); wordTrigger.current?.focus(); }} />}
    {outdated&&<p role="status" className="los-c01-outdated">Vanhat korostukset kuuluvat tekstin toiseen versioon. Ne säilyvät tallessa, mutta niitä ei sijoiteta uuteen tekstiin arvauksella.</p>}
    <p className="los-c01-saved" role="status">{saved?
      "Korostukset tallentuvat tähän selaimeen ja sisältyvät LOS!-varmuuskopioon.":
      "Tallennus epäonnistui. Säilytä vastauksesi muualla ennen sivun sulkemista."}</p>
    <div className="los-c01-attribution">
      <p><strong>Alkuperäinen teksti:</strong> {props.author}, <a href={props.sourceUrl} target="_blank" rel="noopener noreferrer">{props.sourceTitle}</a>.
        {" "}Lisenssi <a href={props.licenseUrl} target="_blank" rel="noopener noreferrer">{props.license}</a>.
        {" "}{props.sourceDetail} Saksankielinen alkuperäisteksti on muuttamaton.
        Suomenkieliset käännökset ja selitteet ovat erillistä opetusaineistoa; lähdetekstin käännöksissä noudatetaan samaa ShareAlike-lisenssiä.
        Sisältöversio {version}.</p>
    </div>
  </div>;
}
