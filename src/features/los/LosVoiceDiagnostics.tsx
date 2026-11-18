import {useEffect,useState} from "react";
import {losGermanVoices} from "./losSpeech";

/** Real device-audible QA surface. Browser simulations can verify events,
 * but a human listening on each target device must approve acoustic quality. */
const probes=[
 ["Tervehdykset","Guten Morgen! Guten Abend! Auf Wiedersehen!"],
 ["Ich-äänne","Ich heiße Aino. Ich komme aus Finnland."],
 ["Umlautit","Fünf, zwölf, müde, Österreich, München."],
 ["Kuusi ja seitsemän","Sechs, sieben, sechzehn, siebzehn."],
 ["W ja V","Wie heißt du? Vier, wir, von."],
 ["Tavaaminen","A. I. N. O. L. A. I. N. E."],
 ["Viikonpäivät","Mittwoch, Donnerstag, Freitag, Sonntag."],
 ["Kohtelias puhuttelu","Guten Tag, Herr Weber. Wie heißen Sie?"],
] as const;
export function LosVoiceDiagnostics(){
 const [voices,setVoices]=useState<SpeechSynthesisVoice[]>([]);
 const [selected,setSelected]=useState("");
 const [status,setStatus]=useState("Äänen saatavuus ja toisto tarkistetaan tällä laitteella.");
 const [checked,setChecked]=useState<Readonly<Record<string,boolean>>>({});
 useEffect(()=>{
  if(typeof window==="undefined"||!("speechSynthesis" in window))return;
  const synth=window.speechSynthesis;
  const load=()=>setVoices(losGermanVoices(synth.getVoices()));
  load();synth.addEventListener?.("voiceschanged",load);
  return()=>{synth.removeEventListener?.("voiceschanged",load);synth.cancel();};
 },[]);
 const chosen=voices.find(x=>x.name===selected)??voices[0];
 const play=(text:string)=>{
  if(!chosen||typeof window==="undefined"||!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window)){
   setStatus("Saksankielistä puheääntä ei ole tällä laitteella.");
   return;
  }
  const synth=window.speechSynthesis;
  synth.cancel();
  const utterance=new SpeechSynthesisUtterance(text);
  utterance.voice=chosen;utterance.lang="de-DE";utterance.rate=0.86;
  utterance.onstart=()=>setStatus("Toistetaan puhetta: "+chosen.name);
  utterance.onend=()=>setStatus("Selaimen toisto päättyi. Ääntämisen luonnollisuus täytyy arvioida kuuntelemalla.");
  utterance.onerror=e=>setStatus("Äänentoiston virhe: "+e.error);
  synth.speak(utterance);
 };
 return <section className="los-voice-diagnostics" aria-label="Saksankielisten äänten laitetarkistus">
  <h3>Tarkista saksan ääntäminen omalla laitteella</h3>
  <p>Selaimen äänen tekninen toiminta ei vielä todista, että ääntäminen olisi luonnollista. Nämä testifraasit on tarkoitettu kuunneltaviksi iPhonella ja tietokoneella erikseen.</p>
  <label>Saksankielinen puheääni
   <select value={selected||chosen?.name||""} onChange={e=>setSelected(e.target.value)}>
    {voices.length?voices.map(v=><option value={v.name} key={v.name}>{v.name} · {v.lang}</option>):
     <option value="">Laitteelta ei löytynyt saksankielisiä puheääniä</option>}
   </select>
  </label>
  <p role="status">{status}</p>
  <ul>{probes.map(([name,text])=><li key={name}>
    <strong>{name}</strong> <span lang="de">{text}</span>
    <button type="button" disabled={!chosen} onClick={()=>play(text)}>Kuuntele</button>
    <label><input type="checkbox" checked={Boolean(checked[name])}
      onChange={e=>setChecked(prev=>({...prev,[name]:e.target.checked}))}/>
      Olen itse kuunnellut ja arvioinut tämän näytteen</label>
  </li>)}</ul>
  <p><strong>Oma kuuntelumerkintä: {Object.values(checked).filter(Boolean).length}/{probes.length}.</strong> Merkintä ei ole riippumaton kieli- eikä ääntämissertifikaatti eikä muuta lähdeaineistojen julkaisuhyväksyntöjä.</p>
 </section>;
}
