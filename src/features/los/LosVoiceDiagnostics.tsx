import {useEffect,useRef,useState} from "react";
import {losGermanVoices} from "./losSpeech";
import {losVoiceIdentity,readLosPreferredVoice,saveLosPreferredVoice} from "./losVoicePreference";

const STORAGE_KEY="los1.audio.device-approval.v2";
/** Each probe tests one difficult German sound family or prosody pattern. */
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

type Approvals=Record<string,Record<string,string>>;
function storedApprovals():Approvals{
 if(typeof window==="undefined")return {};
 try{
  const decoded:unknown=JSON.parse(window.localStorage.getItem(STORAGE_KEY)??"{}");
  if(!decoded||typeof decoded!=="object"||Array.isArray(decoded))return {};
  const result:Approvals={};
  for(const [voice,entries] of Object.entries(decoded)){
   if(!entries||typeof entries!=="object"||Array.isArray(entries))continue;
   const safe:Record<string,string>={};
   for(const p of LOS_VOICE_PROBES){
    const date=(entries as Record<string,unknown>)[p.id];
    if(typeof date==="string"&&Number.isFinite(Date.parse(date)))safe[p.id]=date;
   }
   result[voice]=safe;
  }
  return result;
 }catch{return {};}
}
function deviceClass():string{
 if(typeof navigator==="undefined")return "tuntematon laite";
 const ua=navigator.userAgent;
 if(/iPhone/i.test(ua))return "iPhone";
 if(/iPad/i.test(ua))return "iPad";
 if(/Android/i.test(ua))return "Android";
 return "tietokone";
}
const voiceKey=losVoiceIdentity;

export function LosVoiceDiagnostics(){
 const [voices,setVoices]=useState<SpeechSynthesisVoice[]>([]);
 const [selected,setSelected]=useState(readLosPreferredVoice);
 const [status,setStatus]=useState("Saksankielisten puheäänien saatavuutta tarkistetaan.");
 const [playing,setPlaying]=useState<string|null>(null);
 const [finished,setFinished]=useState<Record<string,boolean>>({});
 const [approvals,setApprovals]=useState<Approvals>(storedApprovals);
 const playback=useRef(0);
 useEffect(()=>{
  if(typeof window==="undefined"||!("speechSynthesis" in window))return;
  const synth=window.speechSynthesis;
  const refresh=()=>setVoices(losGermanVoices(synth.getVoices()));
  refresh();synth.addEventListener?.("voiceschanged",refresh);
  return()=>{playback.current+=1;synth.removeEventListener?.("voiceschanged",refresh);synth.cancel();};
 },[]);
 const chosen=voices.find(v=>voiceKey(v)===selected)??voices[0];
 const id=chosen?voiceKey(chosen):"";
 const selfChecks=approvals[id]??{};
 const passed=LOS_VOICE_PROBES.filter(p=>Boolean(selfChecks[p.id])).length;
 const device=deviceClass();
 const persist=(next:Approvals)=>{
  setApprovals(next);
  if(typeof window!=="undefined")try{window.localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}
  catch{setStatus("Paikallinen tallennus ei onnistunut. Merkitse testit muistiin itse.");}
 };
 const cancel=()=>{
  playback.current+=1;
  if(typeof window!=="undefined"&&"speechSynthesis" in window)window.speechSynthesis.cancel();
  setPlaying(null);
 };
 const play=(probe:(typeof LOS_VOICE_PROBES)[number])=>{
  cancel();
  if(!chosen||typeof window==="undefined"||!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window)){
   setStatus("Saksankielistä puheääntä ei ole tällä laitteella.");
   return;
  }
  const current=++playback.current;
  const key=id+"/"+probe.id;
  setFinished(prev=>({...prev,[key]:false}));
  const synth=window.speechSynthesis;
  const utterance=new SpeechSynthesisUtterance(probe.text);
  utterance.voice=chosen;utterance.lang="de-DE";utterance.rate=0.86;
  utterance.onstart=()=>{
   if(playback.current!==current)return;
   setPlaying(probe.id);
   setStatus("Kuunnellaan: "+probe.name+" · "+chosen.name);
  };
  utterance.onend=()=>{
   if(playback.current!==current)return;
   setPlaying(null);
   setFinished(prev=>({...prev,[key]:true}));
   setStatus("Näyte toistui loppuun. Arvioi nyt, kuulostiko ääntäminen oikealta.");
  };
  utterance.onerror=e=>{
   if(playback.current!==current)return;
   setPlaying(null);
   setFinished(prev=>({...prev,[key]:false}));
   setStatus("Toisto epäonnistui ("+e.error+"). Näytettä ei voi hyväksyä.");
  };
  try{synth.speak(utterance);}
  catch{setPlaying(null);setStatus("Selaimen ääntoisto epäonnistui. Näytettä ei hyväksytty.");}
 };
 const setApproved=(probeId:string,approved:boolean)=>{
  const current=approvals[id]??{};
  const next={...current};
  if(approved){
   if(!finished[id+"/"+probeId])return;
   next[probeId]=new Date().toISOString();
  }else delete next[probeId];
  persist({...approvals,[id]:next});
 };
 const exportReport=async()=>{
  if(!chosen)return;
  const report={
   schema:"los1-tts-device-self-review-v2",device,voice:chosen.name,language:chosen.lang,
   checkedAt:Object.values(selfChecks).sort().at(-1)??null,
   samplesApproved:passed,samplesTotal:LOS_VOICE_PROBES.length,
   samples:LOS_VOICE_PROBES.map(p=>({id:p.id,approvedAt:selfChecks[p.id]??null})),
   scope:"Personal self-report on this browser only. Not expert or recording certification.",
  };
  try{
   await navigator.clipboard.writeText(JSON.stringify(report,null,2));
   setStatus("Tämän laitteen tarkistusraportti kopioitiin leikepöydälle.");
  }catch{setStatus("Leikepöydälle kopiointi ei onnistunut selaimessa.");}
 };
 return <section className="los-voice-diagnostics" aria-label="Saksankielisten äänten laitetarkistus">
  <h3>Tarkista saksan ääntäminen omalla laitteella</h3>
  <p>Kuuntele kahdeksan näytettä kokonaan, arvioi ääntäminen itse ja merkitse hyväksytyt. 
   Pelkkä painikkeen painaminen tai selaintestin läpäisy ei riitä.</p>
  <p><strong>Tämä laite: {device}.</strong> Merkinnät tallentuvat vain tähän selaimeen ja valittuun puheääneen.
   Tee tarkistus erikseen iPhonella ja tietokoneella.</p>
  <label>Saksankielinen puheääni (käytetään myös Text A–C -teksteissä)
   <select value={id} onChange={e=>{cancel();setSelected(e.target.value);saveLosPreferredVoice(e.target.value);setStatus("Puheääni vaihdettu myös kirjan tekstien kuunteluun. Tällä äänellä on oma hyväksyntätilansa.");}}>
    {voices.length?voices.map(v=><option key={voiceKey(v)} value={voiceKey(v)}>{v.name} · {v.lang}</option>):
     <option value="">Laitteelta ei löytynyt saksankielisiä puheääniä</option>}
   </select>
  </label>
  {voices.length===0&&<button type="button" onClick={()=>{
    if(typeof window==="undefined"||!("speechSynthesis" in window))return;
    const available=losGermanVoices(window.speechSynthesis.getVoices());
    setVoices(available);
    setStatus(available.length?"Saksankielisiä puheääniä löytyi: "+available.length:
      "Saksankielisiä ääniä ei löytynyt. Tarkista laitteen puhekieli ja yritä uudelleen.");
   }}>Päivitä saksan puheäänet</button>}
  <p role="status">{status}</p>
  <ul>{LOS_VOICE_PROBES.map(probe=>{
   const done=Boolean(finished[id+"/"+probe.id]);
   const checked=Boolean(selfChecks[probe.id]);
   return <li key={probe.id}>
    <strong>{probe.name}</strong><span lang="de">{probe.text}</span>
    <button type="button" disabled={!chosen}
     onClick={()=>playing===probe.id?(cancel(),setStatus("Toisto keskeytettiin. Näytettä ei voi hyväksyä.")):play(probe)}>
     {playing===probe.id?"Pysäytä":"Kuuntele"}
    </button>
    <label><input type="checkbox" checked={checked} disabled={!chosen||(!done&&!checked)}
      onChange={e=>setApproved(probe.id,e.target.checked)}/>
     {checked?"Olen kuunnellut ja hyväksynyt tämän näytteen":"Kuuntele loppuun ja hyväksy, jos ääntäminen on kunnossa"}
    </label>
   </li>;
  })}</ul>
  <p><strong>Tämän laitteen ja puheäänen oma hyväksyntä: {passed}/{LOS_VOICE_PROBES.length}.</strong></p>
  <button type="button" disabled={!chosen} onClick={()=>{void exportReport();}}>
   Kopioi tämän laitteen tarkistusraportti
  </button>
  <p>Raportti on oma kuunteluarvio, ei riippumaton kieli- tai ääntämistarkastus.
   Se ei myöskään vahvista toisella laitteella tehtyä synkronointitestiä eikä
   korvaa erillisiä ihmisäänitteitä.</p>
 </section>;
}
