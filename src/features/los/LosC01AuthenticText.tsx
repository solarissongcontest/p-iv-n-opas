import { useState } from "react";
import { Check, Eraser, Highlighter, Info, MousePointerClick } from "lucide-react";
import { useLosChapterDraft } from "./studyState";
import {
  LOS1_C01_GLOSS, LOS1_C01_LINES, LOS1_C01_SOURCE_ID, LOS1_C01_TEXT_VERSION,
  losC01Tokens, type LosC01Line,
} from "./content/los1C01";
import {
  LOS_READER_COLORS, appendLosC01Range, losC01MarkKey, losC01TokenColor, parseLosC01Mark,
  type LosReaderColor,
} from "./content/c01Annotations";
import "./los-authentic-reader.css";

type SelectionMode = "meaning" | "highlight";
const colorLabels: Record<LosReaderColor,string> = {
  yellow:"Keltainen",pink:"Pinkki",green:"Vihreä",blue:"Sininen",
};

/** Real original text displayed within LOS!, not a link or a generated substitute. */
export function LosC01AuthenticText() {
  const {draft,update,saved} = useLosChapterDraft(1,"01");
  const [mode,setMode] = useState<SelectionMode>("meaning");
  const [color,setColor] = useState<LosReaderColor>("yellow");
  const [first,setFirst] = useState<{lineId:string;index:number}|null>(null);
  const [gloss,setGloss] = useState<{word:string;meaning:string}|null>(null);
  const [lastAction,setLastAction] = useState<{lineId:string;previous:string|undefined}|null>(null);
  const annotations = draft.readerMarks ?? {};
  const clickWord = (line:LosC01Line,index:number,word:string) => {
    if(mode==="meaning") {
      setGloss({word,meaning:LOS1_C01_GLOSS[word] ?? "Tälle sanalle ei ole vielä tarkistettua kontekstiselitystä."});
      return;
    }
    if(!first || first.lineId!==line.id) {
      setFirst({lineId:line.id,index});
      return;
    }
    const key=losC01MarkKey(line.id);
    const previous=annotations[key];
    const parsed=parseLosC01Mark(previous);
    if(parsed.contentVersion!==LOS1_C01_TEXT_VERSION) {
      setFirst(null);
      return;
    }
    const result=appendLosC01Range(parsed,first.index,index,color,losC01Tokens(line).length);
    update(current=>({...current,readerMarks:{
      ...current.readerMarks,
      [key]:JSON.stringify(result),
    }}));
    setLastAction({lineId:line.id,previous});
    setFirst(null);
  };
  const removeLineMarks=(lineId:string)=>{
    const key=losC01MarkKey(lineId);
    const previous=annotations[key];
    update(current=>{
      const marks={...current.readerMarks};
      delete marks[key];
      return {...current,readerMarks:marks};
    });
    setLastAction({lineId,previous});
    setFirst(null);
  };
  const undo=()=>{
    if(!lastAction)return;
    const key=losC01MarkKey(lastAction.lineId);
    update(current=>{
      const marks={...current.readerMarks};
      if(lastAction.previous===undefined)delete marks[key];
      else marks[key]=lastAction.previous;
      return {...current,readerMarks:marks};
    });
    setLastAction(null);
    setFirst(null);
  };
  const hasOutdated=Object.entries(annotations).some(([key,value])=>
    key.startsWith("los1-c01-m-com-01-") && parseLosC01Mark(value).contentVersion!==LOS1_C01_TEXT_VERSION);
  return <div className="los-c01-reader" aria-label="Franzin ja Jörgin alkuperäinen keskustelu">
    <div className="los-c01-reader-intro">
      <p className="los-overline">ORIGINALTEXT · TEXT A · {LOS1_C01_SOURCE_ID}</p>
      <h2>Franz ja Jörg tutustuvat</h2>
      <p>Kuuntele ensin keskustelu kokonaan. Lue sen jälkeen repliikit ääneen. Opettele tässä kappaleessa erityisesti tervehdykset ja hyvästelyt; nimet, ikä ja verbimuodot selitetään tarkemmin myöhemmin.</p>
      <p className="los-c01-reader-warning"><Info size={17}/> Teksti on tuotu kokonaisena ja käyttöoikeus tarkistettu. Lopullinen kielellinen tarkistus ja laitetestaus ovat vielä kesken.</p>
    </div>
    <div className="los-c01-toolbox" aria-label="Lukijan työkalut">
      <div className="los-c01-modes" role="group" aria-label="Sanan napautuksen toiminto">
        <button type="button" aria-pressed={mode==="meaning"} className={mode==="meaning"?"is-current":""} onClick={()=>{setMode("meaning");setFirst(null);}}><MousePointerClick size={17}/> Sanojen selitykset</button>
        <button type="button" aria-pressed={mode==="highlight"} className={mode==="highlight"?"is-current":""} onClick={()=>{setMode("highlight");setGloss(null);}}><Highlighter size={17}/> Korostustussi</button>
      </div>
      {mode==="highlight" && <div className="los-c01-colors" role="group" aria-label="Korostuksen väri">
        {LOS_READER_COLORS.map(item=><button key={item} type="button"
          className={`los-c01-color los-c01-color-${item}`}
          aria-label={colorLabels[item]} aria-pressed={color===item}
          onClick={()=>setColor(item)}>{color===item&&<Check size={14}/>}</button>)}
        <button type="button" className="los-c01-undo" onClick={undo} disabled={!lastAction}>Kumoa</button>
      </div>}
      <p className="los-c01-instruction" role="status">{mode==="meaning"
        ?"Napauta saksankielistä sanaa, niin näet sen merkityksen."
        :first?"Valitse saman repliikin viimeinen korostettava sana.":"Napauta ensin korostuksen ensimmäistä ja sitten viimeistä sanaa. Voit valita myös yhden sanan."}</p>
    </div>
    <div className="los-c01-turns" lang="de">
      {LOS1_C01_LINES.map(line=>{
        const tokens=losC01Tokens(line);
        const key=losC01MarkKey(line.id);
        const ann=parseLosC01Mark(annotations[key]);
        return <div className="los-c01-turn" key={line.id}>
          <span className="los-c01-speaker">{line.speaker}</span>
          <div className="los-c01-turn-body">
            <p className="los-c01-words">{tokens.map(token=>{
              const marker=losC01TokenColor(ann,token.index);
              const pending=first?.lineId===line.id&&first.index===token.index;
              return <button type="button" key={token.id}
                className={`los-c01-token ${marker?`los-c01-mark-${marker}`:""} ${pending?"is-first":""}`}
                onClick={()=>clickWord(line,token.index,token.word)}
                aria-label={`${token.word}, ${mode==="meaning"?"selitys":"korostuksen sana"}`}
                aria-pressed={mode==="highlight"?Boolean(marker||pending):undefined}
                title={mode==="meaning"?"Näytä sanan merkitys":"Valitse korostukseen"}
                >{token.display}</button>;
            })}</p>
            {ann.ranges.length>0&&<button className="los-c01-clear" type="button" onClick={()=>removeLineMarks(line.id)}><Eraser size={14}/> Poista tämän repliikin korostukset</button>}
          </div>
        </div>;
      })}
    </div>
    {gloss&&<div className="los-c01-gloss" role="status">
      <strong lang="de">{gloss.word}</strong><p>{gloss.meaning}</p>
      <button type="button" onClick={()=>setGloss(null)}>Sulje selitys</button>
    </div>}
    {hasOutdated&&<p role="status" className="los-c01-outdated">Osa vanhoista korostuksista kuuluu tekstin toiseen versioon. Niitä ei siirretä arvauksella; ne säilyvät tallennettuna, kunnes versio voidaan tarkistaa.</p>}
    <p className="los-c01-saved" role="status">{saved?"Korostukset tallentuvat tähän selaimeen ja sisältyvät LOS!-varmuuskopioon.":"Tallennus epäonnistui. Älä sulje tätä sivua ennen kuin tallennustila on kunnossa."}</p>
    <div className="los-c01-attribution">
      <p><strong>Alkuperäinen teksti ja ääni:</strong> Xzapro4 ja Erkan Yilmaz (2008), <a href="https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg" target="_blank" rel="noopener noreferrer">GesprächVorstellung.ogg, Wikimedia Commons</a>. Lisenssi <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a>. Saksan keskustelua ei ole lyhennetty eikä käännetty osaksi alkuperäistekstiä. Suomenkieliset selitykset ja käyttöliittymä ovat LOS!:n toimituksellisia lisäyksiä. Sisältöversio {LOS1_C01_TEXT_VERSION}.</p>
    </div>
  </div>;
}
