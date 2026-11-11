import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Cloud, CloudOff, DownloadCloud, LockKeyhole, RefreshCw, UploadCloud } from "lucide-react";
import {
  backupLosLocalDraft, fetchLosCloud, hasLosSyncPassphrase, loadLosCloudMeta,
  losDraftFingerprint, setLosSyncPassphrase, storeLosCloudMeta, uploadLosCloud
} from "./cloudClient";
import { draftIsEmpty, type LosCloudRecord } from "./cloudContract";
import type { LosChapterDraft } from "./studyState";

export function LosCloudPanel({bookId,chapterId,draft,replaceDraft}:{
  bookId:number;chapterId:string;draft:LosChapterDraft;replaceDraft:(draft:LosChapterDraft)=>void;
}) {
  const [unlocked,setUnlocked]=useState(hasLosSyncPassphrase());
  const [password,setPassword]=useState("");
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("Pilvitallennus on vapaaehtoinen. Paikallinen tallennus toimii ilman sitä.");
  const [conflict,setConflict]=useState<LosCloudRecord|null>(null);
  const [hasConflict,setHasConflict]=useState(false);
  const latest=useRef(draft);
  latest.current=draft;
  const errorMessage=(error:unknown)=>error instanceof Error?error.message:"Pilvitallennusta ei voitu käyttää.";

  const unlock=async(event:FormEvent)=>{
    event.preventDefault();
    if(password.length<24){setMessage("Synkronointiin tarvitaan palvelimeen määritetty pitkä salasana.");return;}
    setBusy(true);
    try{
      await fetchLosCloud(bookId,chapterId,password);
      setLosSyncPassphrase(password);setUnlocked(true);setPassword("");
      setMessage("Pilvitallennus avattu tässä välilehdessä. Tietoja ei ole vielä siirretty. Valitse Synkronoi nyt.");
    }catch(error){setMessage(errorMessage(error));}
    finally{setBusy(false);}
  };
  const importRecord=(record:LosCloudRecord)=>{
    // Invoked by a deliberate click, so preserve the local draft in a download.
    backupLosLocalDraft(bookId,chapterId,latest.current);
    replaceDraft(record.payload);storeLosCloudMeta(bookId,chapterId,record);
    setHasConflict(false);setConflict(null);
    setMessage("Pilviversio tuotu tähän selaimeen. Aiempi paikallinen luonnos ladattiin varmuuskopiona.");
  };
  const sync=async()=>{
    if(!unlocked||busy)return;
    setBusy(true);setHasConflict(false);
    const snapshot=latest.current;const fingerprint=losDraftFingerprint(snapshot);
    try{
      const remote=await fetchLosCloud(bookId,chapterId);
      if(losDraftFingerprint(latest.current)!==fingerprint){
        setMessage("Vastaus muuttui tarkistuksen aikana. Paina Synkronoi uudelleen.");return;
      }
      const localMeta=loadLosCloudMeta(bookId,chapterId);
      if(!remote){
        if(draftIsEmpty(snapshot)){setMessage("Pilvessä tai tällä laitteella ei vielä ole kappaleen tallennettavia tietoja.");return;}
        const saved=await uploadLosCloud(bookId,chapterId,snapshot,0);
        if(!saved)throw new Error("Palvelin ei vahvistanut tallennusta.");
        storeLosCloudMeta(bookId,chapterId,saved);
        setMessage("Kappale tallennettu pilveen. Avaa pilvitallennus myös toisella laitteella ja synkronoi siellä.");
        return;
      }
      const serverFingerprint=losDraftFingerprint(remote.payload);
      if(fingerprint===serverFingerprint){
        storeLosCloudMeta(bookId,chapterId,remote);
        setMessage("Tämän laitteen ja pilven tiedot ovat samat.");return;
      }
      if(draftIsEmpty(snapshot)){
        importRecord(remote);return;
      }
      if(localMeta?.revision===remote.revision){
        const uploaded=await uploadLosCloud(bookId,chapterId,snapshot,remote.revision);
        if(!uploaded)throw new Error("Palvelin ei vahvistanut tallennusta.");
        storeLosCloudMeta(bookId,chapterId,uploaded);
        setMessage("Laitteen uudet muutokset tallennettu pilveen.");return;
      }
      if((localMeta?.fingerprint===fingerprint)||draftIsEmpty(snapshot)){
        importRecord(remote);return;
      }
      setConflict(remote);setHasConflict(true);
      setMessage("Pilvessä ja tällä laitteella on eri muutoksia. Valitse kumpi säilytetään. Mitään ei korvattu automaattisesti.");
    }catch(error){
      setMessage(errorMessage(error));
      if(error && typeof error==="object" && "status" in error && error.status===409){
        const version=(error as {record?:LosCloudRecord|null}).record??null;
        if(version){setConflict(version);setHasConflict(true);}
      }
    }finally{setBusy(false);}
  };
  const keepLocal=async()=>{
    if(!conflict||busy)return;
    setBusy(true);
    try{
      const current=await fetchLosCloud(bookId,chapterId);
      if(!current || current.revision!==conflict.revision){
        setConflict(current);setHasConflict(Boolean(current));
        setMessage("Pilviversio on muuttunut jälleen. Tarkista tilanne ennen korvaamista.");return;
      }
      const snapshot=latest.current;
      // Download the previous cloud draft before an intentional overwrite.
      backupLosLocalDraft(bookId,chapterId,current.payload);
      const updated=await uploadLosCloud(bookId,chapterId,snapshot,current.revision);
      if(!updated)throw new Error("Palvelin ei vahvistanut tallennusta.");
      storeLosCloudMeta(bookId,chapterId,updated);
      setHasConflict(false);setConflict(null);
      setMessage("Tämän laitteen versio tallennettu pilveen. Se korvasi vanhan pilviversion.");
    }catch(error){setMessage(errorMessage(error));}
    finally{setBusy(false);}
  };
  return <section className="los-cloud-panel" aria-label="LOS!-pilvitallennus">
    <div className="los-cloud-title"><Cloud size={19}/><h3>Pilvisynkronointi</h3></div>
    {!unlocked?<form onSubmit={unlock} className="los-cloud-unlock">
      <p>Vain erikseen määritetyllä salasanalla avattava, suojattu LOS!-tallennus. Syöttämääsi salasanaa ei tallenneta selaimen paikalliseen muistiin.</p>
      <label htmlFor={`los-cloud-pass-${chapterId}`}>Synkronoinnin salasana</label>
      <div className="los-cloud-entry">
        <input id={`los-cloud-pass-${chapterId}`} type="password" value={password}
          onChange={e=>setPassword(e.target.value)} autoComplete="off" minLength={24} maxLength={1024}
          placeholder="Erillinen, pitkä synkronointisalasana"/>
        <button type="submit" disabled={busy||password.length<24}><LockKeyhole size={16}/> Avaa</button>
      </div>
    </form>:<>
      <p>Synkronointi on <strong>manuaalinen</strong>: avaa tämä samalla salasanalla molemmilla laitteilla ja paina Synkronoi nyt. Keskeneräinen vastaus tallennetaan ensin paikallisesti.</p>
      <div className="los-cloud-controls">
        <button type="button" onClick={()=>void sync()} disabled={busy}><RefreshCw size={17}/> Synkronoi nyt</button>
        <button type="button" onClick={()=>{setLosSyncPassphrase(null);setUnlocked(false);setMessage("Pilvitallennuksen salasana poistettiin tämän sivun muistista.");}}>
          <CloudOff size={16}/> Lukitse
        </button>
      </div>
      {hasConflict && conflict && <div className="los-cloud-conflict" role="alert">
        <strong>Kaksi erilaista versiota</strong>
        <p>Pilvessä on viimeksi tallennettu versio {new Date(conflict.updated_at).toLocaleString("fi-FI")}. Tämän laitteen muistiinpanoja ei korvata ilman valintaasi.</p>
        <div>
          <button type="button" disabled={busy} onClick={()=>importRecord(conflict)}><DownloadCloud size={16}/> Käytä pilviversiota</button>
          <button type="button" disabled={busy} onClick={()=>void keepLocal()}><UploadCloud size={16}/> Käytä tämän laitteen versiota</button>
        </div>
        <small>Pilviversion valinta lataa ensin paikalliset tiedot JSON-varmuuskopiona. Tämän laitteen version valinta korvaa pilvessä olevan version. Myös toinen versio kannattaa varmuuskopioida erikseen ennen korvaamista.</small>
      </div>}
    </>}
    <p className="los-cloud-message" role="status">{busy?<><RefreshCw size={15}/> Yhdistetään pilvitallennukseen…</>:<><CheckCircle2 size={15}/>{message}</>}</p>
  </section>;
}
