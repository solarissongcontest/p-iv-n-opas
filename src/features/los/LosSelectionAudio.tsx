import {useEffect,useState} from "react";
import {LosVocabularyAudio} from "./LosVocabularyAudio";

/** Reader-wide fallback: selecting any German text lets a beginner hear exactly that
 * selection, including exercise prompts and examples without dedicated audio buttons.
 * No automatic language detection or pronunciation quality claim is made.
 */
export function LosSelectionAudio(){
 const [selected,setSelected]=useState("");
 useEffect(()=>{
  const update=()=>{
   const selection=window.getSelection();
   const anchor=selection?.anchorNode;
   const root=document.querySelector("#main-content .los-book-paper");
   if(!selection||!anchor||!root||!root.contains(anchor))return;
   const value=selection.toString().replace(/\s+/g," ").trim();
   // Keep the previous selection when the learner taps Play and native selection collapses.
   if(!value)return;
   if(value.length>280){setSelected("");return;}
   if(/[\p{L}\p{N}]/u.test(value))setSelected(value);
  };
  document.addEventListener("selectionchange",update);
  return()=>document.removeEventListener("selectionchange",update);
 },[]);
 if(!selected)return null;
 return <aside className="los-selection-audio" aria-label="Valitun saksankielisen tekstin kuuntelu">
  <strong>Kuuntele valittu teksti</strong>
  <p>Maalaa saksankielinen sana tai lause mistä tahansa kirjan sivulta.</p>
  <span lang="de" className="los-selection-audio-text">{selected}</span>
  <div className="los-selection-audio-actions">
   <LosVocabularyAudio word={selected} kind="ilmaus"/>
   <button type="button" className="los-outline-button" onClick={()=>setSelected("")}>Sulje</button>
  </div>
 </aside>;
}
