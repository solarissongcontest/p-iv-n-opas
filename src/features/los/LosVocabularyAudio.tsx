import {useEffect,useRef,useState} from "react";
import {Volume2,Square} from "lucide-react";
import {losGermanVoices} from "./losSpeech";
import {matchLosPreferredVoice,readLosPreferredVoice} from "./losVoicePreference";

/** Optional browser TTS for every core vocabulary item.
 * Uses only installed German voices, never silently falls back to Finnish or English.
 * This is not a prerecorded audio asset or a pronunciation certification.
 */
export function LosVocabularyAudio({word,kind="sana",rate=0.9}:{word:string;kind?:"sana"|"lause"|"ilmaus";rate?:number}){
 const [playing,setPlaying]=useState(false);
 const [status,setStatus]=useState("");
 const utteranceRef=useRef<SpeechSynthesisUtterance|null>(null);
 const playbackId=useRef(0);
 useEffect(()=>()=>{ 
  playbackId.current+=1;
  if(utteranceRef.current && typeof window!=="undefined" && "speechSynthesis" in window){
   utteranceRef.current=null;
   window.speechSynthesis.cancel();
  }
 },[]);
 const play=()=>{
  if(typeof window==="undefined" || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)){
   setStatus("Puheentoisto ei ole saatavilla tässä selaimessa.");
   return;
  }
  const synthesis=window.speechSynthesis;
  if(playing){
   playbackId.current+=1;
   utteranceRef.current=null;
   synthesis.cancel();
   setPlaying(false);
   setStatus("Toisto pysäytetty.");
   return;
  }
  const voices=losGermanVoices(synthesis.getVoices());
  const voice=matchLosPreferredVoice(voices,readLosPreferredVoice())??voices[0];
  if(!voice){
   setStatus("Laitteella ei ole käytettävissä saksankielistä puheääntä. Tarkista laitteen puheääniasetukset.");
   return;
  }
  const current=++playbackId.current;
  synthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(word);
  utteranceRef.current=utterance;
  utterance.voice=voice;
  utterance.lang=voice.lang;
  utterance.rate=Math.max(0.5,Math.min(2,rate));
  utterance.onend=()=>{
   if(playbackId.current!==current)return;
   utteranceRef.current=null;
   setPlaying(false);
   setStatus("");
  };
  utterance.onerror=event=>{
   if(playbackId.current!==current)return;
   utteranceRef.current=null;
   setPlaying(false);
   setStatus("Saksankielinen puheentoisto epäonnistui ("+event.error+").");
  };
  setPlaying(true);
  setStatus("");
  try{synthesis.speak(utterance);}
  catch{
   utteranceRef.current=null;
   setPlaying(false);
   setStatus("Saksankielistä puhetta ei voitu käynnistää.");
  }
 };
 return <span className="los-vocab-audio-wrap">
  <button type="button" className="los-vocab-audio-button" onClick={play}
   aria-label={playing?"Pysäytä "+(kind==="sana"?"sanan":kind==="lause"?"lauseen":"ilmauksen")+" "+word+" ääni":"Kuuntele saksaksi: "+word}
   title={playing?"Pysäytä":"Kuuntele saksaksi"}>
   {playing?<Square size={15} aria-hidden="true"/>:<Volume2 size={16} aria-hidden="true"/>}
  </button>
  {status&&<small className="los-vocab-audio-status" role="status">{status}</small>}
 </span>;
}
