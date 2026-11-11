import { useEffect, useRef, useState } from "react";
import { Download, Mic, MicOff, PlayCircle, ShieldCheck } from "lucide-react";

type PracticeChapter = "07" | "08" | "10";
const instruction:Record<PracticeChapter,string>={
  "07":"Tavaa kahdeksan kuvitteellista nimeä ääneen ja pyydä tarvittaessa toistamaan. Tarkista kirjoitetut kirjaimet erikseen.",
  "08":"Lausu kolme selviytymisfraasia ja harjoittele niiden käyttämistä kuvitellulle opettajalle.",
  "10":"Esitä ensin tuttavallinen ja sen jälkeen kohtelias keskustelu. Voit tarvittaessa lukea toisen henkilön repliikit itse.",
};

/**
 * Explicit opt-in microphone recording; no network calls, no silent capture,
 * and no misleading automated pronunciation score.
 * Audio survives only in this mounted component until deliberately downloaded.
 */
export function LosVoicePractice({chapterId}:{chapterId:PracticeChapter}){
  const recorderRef=useRef<MediaRecorder|null>(null);
  const streamRef=useRef<MediaStream|null>(null);
  const chunksRef=useRef<BlobPart[]>([]);
  const audioRef=useRef<string|null>(null);
  const blobRef=useRef<Blob|null>(null);
  const mountedRef=useRef(true);
  const [recording,setRecording]=useState(false);
  const [audioUrl,setAudioUrl]=useState<string|null>(null);
  const [message,setMessage]=useState("Äänittäminen on vapaaehtoista. Mikrofoni ei ole päällä.");
  const [busy,setBusy]=useState(false);
  useEffect(()=>{
    mountedRef.current=true;
    return ()=>{
      mountedRef.current=false;
      const r=recorderRef.current;
      if(r?.state==="recording"){r.onstop=null;r.stop();}
      recorderRef.current=null;
      streamRef.current?.getTracks().forEach(track=>track.stop());
      streamRef.current=null;
      if(audioRef.current)URL.revokeObjectURL(audioRef.current);
      audioRef.current=null;
      blobRef.current=null;
    };
  },[]);
  function clearPrevious(){
    if(audioRef.current){URL.revokeObjectURL(audioRef.current);audioRef.current=null;}
    blobRef.current=null;
    setAudioUrl(null);
  }
  async function start(){
    if(recording || busy)return;
    setBusy(true);
    try{
      if(typeof navigator==="undefined"||!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==="undefined"){
        setMessage("Tämä selain ei tue paikallista mikrofonitallennusta. Harjoittele puhumista ilman äänitystä.");
        return;
      }
      const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});
      if(!mountedRef.current){stream.getTracks().forEach(track=>track.stop());return;}
      streamRef.current=stream;
      clearPrevious();
      chunksRef.current=[];
      const format=["audio/mp4","audio/webm;codecs=opus","audio/webm"].find(type=>MediaRecorder.isTypeSupported(type));
      const recorder=format?new MediaRecorder(stream,{mimeType:format}):new MediaRecorder(stream);
      recorderRef.current=recorder;
      recorder.ondataavailable=event=>{
        if(event.data.size>0)chunksRef.current.push(event.data);
      };
      recorder.onerror=()=>{
        stream.getTracks().forEach(track=>track.stop());
        if(mountedRef.current){setRecording(false);setMessage("Tallennuksessa tapahtui virhe. Kokeile uudelleen.");}
      };
      recorder.onstop=()=>{
        stream.getTracks().forEach(track=>track.stop());
        streamRef.current=null;
        recorderRef.current=null;
        if(!mountedRef.current)return;
        setRecording(false);
        const blob=new Blob(chunksRef.current,{type:recorder.mimeType||"audio/webm"});
        if(!blob.size){setMessage("Äänite jäi tyhjäksi. Uusi yritys on mahdollinen.");return;}
        blobRef.current=blob;
        const url=URL.createObjectURL(blob);
        audioRef.current=url;
        setAudioUrl(url);
        setMessage("Äänite on kuunneltavissa vain tässä näkymässä. Lataa tiedosto talteen, jos haluat säilyttää sen.");
      };
      recorder.start();
      setRecording(true);
      setMessage("Mikrofoni tallentaa nyt. Paina Lopeta äänitys, kun olet valmis.");
    }catch{
      streamRef.current?.getTracks().forEach(track=>track.stop());
      streamRef.current=null;
      setRecording(false);
      setMessage("Mikrofonin käyttö ei onnistunut tai lupaa ei myönnetty. Voit silti tehdä muut oppikirjatehtävät.");
    }finally{
      if(mountedRef.current)setBusy(false);
    }
  }
  function stop(){
    if(recorderRef.current?.state==="recording"){
      recorderRef.current.stop();
      setMessage("Äänitys lopetetaan ja paikallinen esikuuntelu valmistellaan.");
    }
  }
  function download(){
    const blob=blobRef.current;
    if(!blob)return;
    const ext=blob.type.includes("mp4")?"m4a":blob.type.includes("ogg")?"ogg":"webm";
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;
    link.download="LOS1-kappale-"+chapterId+"-puheharjoitus."+ext;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url),30_000);
  }
  return <aside className="los-voice-practice" aria-label="Oma puheharjoitus">
    <h3><Mic size={18}/> Kokeile ääneen</h3>
    <p>{instruction[chapterId]}</p>
    <p className="los-voice-privacy"><ShieldCheck size={16}/> Ääni tallennetaan ainoastaan selaimen tilapäiseen muistiin. Sitä ei lähetetä palvelimelle eikä tallenneta kirjan harjoitusvastauksiin. Tallennuksen aloittaminen edellyttää omaa painallusta ja selaimen mikrofonilupaa.</p>
    <div className="los-voice-actions">
      {!recording?<button type="button" disabled={busy} onClick={()=>void start()}><Mic size={17}/> Aloita äänitys</button>:
        <button type="button" onClick={stop}><MicOff size={17}/> Lopeta äänitys</button>}
      {audioUrl&&!recording&&<button type="button" onClick={download}><Download size={17}/> Lataa oma äänite</button>}
    </div>
    {audioUrl&&!recording&&<div className="los-voice-playback">
      <PlayCircle size={17}/><span>Kuuntele oma harjoituksesi</span>
      <audio controls src={audioUrl} preload="none" aria-label="Oman puheharjoituksen äänite"/>
    </div>}
    <p className="los-voice-message" role="status">{message}</p>
    <small>Tätä äänitystä ei pisteytetä eikä siitä johdeta kielitaitomittaria. Sivulta poistuminen poistaa esikuuntelun, ellei tiedostoa ole erikseen ladattu.</small>
  </aside>;
}
