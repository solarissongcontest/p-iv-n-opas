import {useId,type Dispatch,type SetStateAction} from "react";
import {SlidersHorizontal} from "lucide-react";

export const LOS_READER_SETTINGS_KEY="los.reader-display.v1";
export type LosReaderSettings={
 size:"normal"|"large"|"extra";
 spacing:"standard"|"relaxed";
 measure:"normal"|"narrow"|"wide";
};
export const DEFAULT_LOS_READER_SETTINGS:LosReaderSettings={
 size:"normal",spacing:"standard",measure:"normal",
};
export function readLosReaderSettings():LosReaderSettings{
 if(typeof window==="undefined")return {...DEFAULT_LOS_READER_SETTINGS};
 try{
  const stored=JSON.parse(window.localStorage.getItem(LOS_READER_SETTINGS_KEY)??"null");
  return {
   size:["normal","large","extra"].includes(stored?.size)?stored.size:"normal",
   spacing:["standard","relaxed"].includes(stored?.spacing)?stored.spacing:"standard",
   measure:["normal","narrow","wide"].includes(stored?.measure)?stored.measure:"normal",
  };
 }catch{return {...DEFAULT_LOS_READER_SETTINGS};}
}
export function saveLosReaderSettings(value:LosReaderSettings){
 if(typeof window==="undefined")return;
 try{window.localStorage.setItem(LOS_READER_SETTINGS_KEY,JSON.stringify(value));}
 catch{/* Display preferences are optional; never interrupt studying. */}
}
export function LosReaderDisplayControls({
 value,onChange,
}:{value:LosReaderSettings;onChange:Dispatch<SetStateAction<LosReaderSettings>>}){
 const id=useId();
 const update=<K extends keyof LosReaderSettings>(key:K,next:LosReaderSettings[K])=>{
  const updated={...value,[key]:next};
  onChange(updated);
  saveLosReaderSettings(updated);
 };
 return <details className="los-display-settings">
  <summary><SlidersHorizontal size={17} aria-hidden="true"/> Lukuasetukset</summary>
  <div className="los-display-settings-panel">
   <p>Muuta kirjan tekstin luettavuutta. Asetukset säilyvät tällä laitteella, eivätkä muuta tehtäviä tai vastauksia.</p>
   <div className="los-display-settings-fields">
    <label htmlFor={id+"-size"}>Tekstin koko
     <select id={id+"-size"} value={value.size} onChange={event=>update("size",event.target.value as LosReaderSettings["size"])}>
      <option value="normal">Normaali</option><option value="large">Suurempi</option><option value="extra">Suurin</option>
     </select>
    </label>
    <label htmlFor={id+"-spacing"}>Riviväli
     <select id={id+"-spacing"} value={value.spacing} onChange={event=>update("spacing",event.target.value as LosReaderSettings["spacing"])}>
      <option value="standard">Normaali</option><option value="relaxed">Väljempi</option>
     </select>
    </label>
    <label htmlFor={id+"-measure"}>Lukurivin leveys
     <select id={id+"-measure"} value={value.measure} onChange={event=>update("measure",event.target.value as LosReaderSettings["measure"])}>
      <option value="narrow">Kapea</option><option value="normal">Normaali</option><option value="wide">Leveä</option>
     </select>
    </label>
   </div>
   <button type="button" className="los-display-reset" onClick={()=>{
    onChange({...DEFAULT_LOS_READER_SETTINGS});
    saveLosReaderSettings(DEFAULT_LOS_READER_SETTINGS);
   }}>Palauta oletukset</button>
  </div>
 </details>;
}
