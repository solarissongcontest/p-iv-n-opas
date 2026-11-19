import {useEffect,useRef,useState} from "react";
import {losGermanVoices} from "./losSpeech";
import {losVoiceIdentity,readLosPreferredVoice,saveLosPreferredVoice} from "./losVoicePreference";

/** Optional technical playback samples. These are not pronunciation examinations. */
export const LOS_VOICE_PROBES=[
 {id:"greetings",name:"Tervehdykset",text:"Guten Morgen! Guten Abend! Auf Wiedersehen!"},
 {id:"ich",name:"Ich-äänne",text:"Ich heiße Aino. Ich komme aus Finnland."},
 {id:"umlaut",name:"Umlautit",text:"Fünf, zwölf, müde, Österreich, München."},
 {id:"numbers",name:"Kuusi ja seitsemän",text:"Sechs, sieben, sechzehn, siebzehn."},
 {id:"w-v",name:"W ja V",text:"Wie heißt du? Vier, wir, von."},
 {id:"spelling",name:"Tavaaminen",text:"A. I. N. O. L. A. I. N. E."},
 {id:"weekdays",name:"Viikonpäivät",text:"Mittwoch, Donnerstag, Freitag, Sonntag."},
 {id:"formal",name:"Kohtelias puhuttelu",text:"Guten Tag, Herr Weber. Wie heißen Sie?"},
] as const;

function deviceClass():string{
 if(typeof navigator==="undefined")return "tuntematon laite";
 const ua=navigator.userAgent;
 if(/iPhone/i.test(ua))return "iPhone";
 if(/iPad/i.test(ua))return "iPad";
 if(/Android/i.test(ua))return "Android";
 return "tietokone";
}

/** The learner may check whether sound works; no German expertise or approval is required. */
export function LosVoiceDiagnostics(){
 const [voices,setVoices]=useState<SpeechSynthesisVoice[]>([]);
 const [selected,setSelected]=useState(readLosPreferredVoice);
 const [status,setStatus]=useState("Tarkistetaan, löytyykö tältä laitteelta saksankielisiä puheääniä.");
 const [playing,setPlaying]=useState<string|null>(null);
 const [completed,setCompleted]=useState<Record<string,boolean>>({});
 const playback=useRef(0);
 useEffect(()=>{
  if(typeof window==="undefined"||!("speechSynthesis" in window))return;
  const synth=window.speechSynthesis;
  const refresh=()=>setVoices(losGermanVoices(synth.getVoices()));
  refresh();synth.addEventListener?.("voiceschanged",refresh);
  return()=>{playback.current+=1;synth.removeEventListener?.("voiceschanged",refresh);synth.cancel();};
 },[]);
 const chosen=voices.find(v=>losVoiceIdentity(v)===selected)??voices[0];
 const id=chosen?losVoiceIdentity(chosen):"";
 const count=LOS_VOICE_PROBES.filter(p=>completed[id+"/"+p.id]).length;
 const cancel=()=>{
  playback.current+=1;
  if(typeof window!=="undefined"&&"speechSynthesis" in window)window.speechSynthesis.cancel();
  setPlaying(null);
 };
 const play=(probe:(typeof LOS_VOICE_PROBES)[number])=>{
  cancel();
  if(!chosen||typeof window==="undefined"||!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window)){
   setStatus("Saksankielistä puheääntä ei ole saatavilla tällä laitteella.");
   return;
  }
  const current=++playback.current;
  const key=id+"/"+probe.id;
  setCompleted(prev=>({...prev,[key]:false}));
  const synth=window.speechSynthesis;
  const utterance=new SpeechSynthesisUtterance(probe.text);
  utterance.voice=chosen;utterance.lang=chosen.lang;utterance.rate=0.86;
  utterance.onstart=()=>{
   if(playback.current!==current)return;
   setStatus("Selain aloitti toiston: "+probe.name+" · "+chosen.name);
  };
  utterance.onend=()=>{
   if(playback.current!==current)return;
   setPlaying(null);
   setCompleted(prev=>({...prev,[key]:true}));
   setStatus("Selain ilmoitti näytteen päättyneen. Tämä ei vahvista ääntämisen oikeellisuutta.");
  };
  utterance.onerror=e=>{
   if(playback.current!==current)return;
   setPlaying(null);
   setCompleted(prev=>({...prev,[key]:false}));
   setStatus("Puheentoistossa tapahtui virhe ("+e.error+"). Kokeile toista puheääntä.");
  };
  try{
   setPlaying(probe.id);
   setStatus("Toistetaan näytettä: "+probe.name+".");
   synth.speak(utterance);
  }catch{
   setPlaying(null);
   setStatus("Selaimen puheentoisto ei käynnistynyt. Kokeile toista puheääntä.");
  }
 };
 const exportReport=async()=>{
  const report={
   schema:"los1-tts-technical-playback-v3",
   device:deviceClass(),voice:chosen?.name??null,language:chosen?.lang??null,
   samplesBrowserReportedCompleted:count,samplesTotal:LOS_VOICE_PROBES.length,
   samples:LOS_VOICE_PROBES.map(p=>({id:p.id,browserReportedCompleted:Boolean(completed[id+"/"+p.id])})),
   limitation:"Browser event log only. Not an acoustic, linguistic, expert, or physical-device certification.",
  };
  try{
   await navigator.clipboard.writeText(JSON.stringify(report,null,2));
   setStatus("Tekninen toistoraportti kopioitiin.");
  }catch{setStatus("Raporttia ei voitu kopioida selaimen leikepöydälle.");}
 };
 return <section className="los-voice-diagnostics" aria-label="Saksankielisten äänten vapaaehtoinen toimintatesti">
  <h3>Kokeile saksankielistä puheääntä</h3>
  <p>Voit kuunnella haluamiasi esimerkkejä ja varmistaa, kuuluuko ääni laitteellasi.
   <strong> Sinun ei tarvitse arvioida saksan ääntämisen oikeellisuutta tai hyväksyä mitään näytteitä.</strong>
   Tämä testi on vapaaehtoinen eikä estä oppikirjan käyttöä.</p>
  <p><strong>Laite: {deviceClass()}.</strong> Toimintatesti käyttää selaimen puhesynteesiä,
   eikä se todista äänen laatua tai korvaa erillisiä äänitiedostoja.</p>
  <label>Saksankielinen puheääni (sama valinta myös Text A–C -teksteissä)
   <select aria-label="Toimintatestin saksankielinen puheääni" value={id} onChange={event=>{
    cancel();setSelected(event.target.value);saveLosPreferredVoice(event.target.value);
    setStatus("Puheääni vaihdettu. Sama ääni valitaan myös tekstien kuunteluun tällä laitteella.");
   }}>
    {voices.length?voices.map(voice=><option key={losVoiceIdentity(voice)} value={losVoiceIdentity(voice)}>
     {voice.name} · {voice.lang}
    </option>):<option value="">Saksankielisiä puheääniä ei löytynyt vielä</option>}
   </select>
  </label>
  {voices.length===0&&<button type="button" onClick={()=>{
   if(typeof window==="undefined"||!("speechSynthesis" in window))return;
   const available=losGermanVoices(window.speechSynthesis.getVoices());
   setVoices(available);
   setStatus(available.length?"Löytyi "+available.length+" saksankielistä puheääntä.":
    "Saksankielistä ääntä ei löytynyt. Tarkista laitteen puheäänet.");
  }}>Päivitä saksan puheäänet</button>}
  <p role="status">{status}</p>
  <ul>{LOS_VOICE_PROBES.map(probe=><li key={probe.id}>
   <strong>{probe.name}</strong><span lang="de">{probe.text}</span>
   <button type="button" disabled={!chosen} onClick={()=>{
    if(playing===probe.id){cancel();setStatus("Toisto pysäytetty.");}
    else play(probe);
   }}>{playing===probe.id?"Pysäytä":"Kuuntele"}</button>
   {completed[id+"/"+probe.id]&&<span>Selain ilmoitti toiston päättyneen</span>}
  </li>)}</ul>
  <p><strong>Selaimen ilmoituksen mukaan päättyneitä näytteitä: {count}/{LOS_VOICE_PROBES.length}.</strong>
   Laskuri on vain tämän istunnon teknistä tietoa, ei saksan osaamis- tai laatupisteytys.</p>
  <button type="button" disabled={!chosen} onClick={()=>{void exportReport();}}>
   Kopioi vapaaehtoinen tekninen toistoraportti
  </button>
 </section>;
}
