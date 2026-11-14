import { useState, type ChangeEvent } from "react";
import { Download, FileJson2, FileUp, ShieldAlert } from "lucide-react";
import { getDeviceOwnerId } from "@/lib/deviceSession";
import {
  LOS_FUTURE_BACKUP_MAX_BYTES,applyLosFutureBackup,createLosFutureBackup,
  parseLosFutureBackup,planLosFutureBackupImport,
  type LosFutureBookBackup,
} from "./losFutureLocalBackups";

type PreviewPlan=ReturnType<typeof planLosFutureBackupImport>;
function download(backup:LosFutureBookBackup,name?:string){
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const link=document.createElement("a");
  link.href=url;
  link.download=name??`LOS-${backup.bookId}-varmuuskopio-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(()=>URL.revokeObjectURL(url),30_000);
}

/** Books 2–8 have editable local drafts, but no approved cloud persistence.
 * This is an explicit offline transfer, not a network sync or grading feature. */
export function LosFutureBackups({bookId}:{bookId:number}){
  const [preview,setPreview]=useState<LosFutureBookBackup|null>(null);
  const [plan,setPlan]=useState<PreviewPlan|null>(null);
  const [replaceConfirmed,setReplaceConfirmed]=useState(false);
  const [status,setStatus]=useState("");
  if(bookId<2||bookId>8)return null;

  function ownBackup(){
    const ownerId=getDeviceOwnerId();
    if(!ownerId)throw Error("Laitteen omistajatunnus puuttuu.");
    return {ownerId,backup:createLosFutureBackup(bookId,ownerId,localStorage)};
  }
  function exportAll(){
    try{
      const {backup}=ownBackup();
      download(backup);
      setStatus(`Ladattiin LOS! ${bookId}:n varmuuskopio, jossa on ${Object.keys(backup.chapters).length} kappaleen tietoja.`);
    }catch(error){
      setStatus(error instanceof Error?error.message:"Varmuuskopion vienti epäonnistui.");
    }
  }
  async function chooseFile(event:ChangeEvent<HTMLInputElement>){
    setPreview(null);
    setPlan(null);
    setReplaceConfirmed(false);
    const file=event.target.files?.[0];
    event.target.value="";
    if(!file)return;
    if(file.size>LOS_FUTURE_BACKUP_MAX_BYTES){
      setStatus("Varmuuskopio on liian suuri (enintään 5 Mt).");
      return;
    }
    try{
      const imported=parseLosFutureBackup(await file.text());
      if(imported.bookId!==bookId)throw Error(`Tämä varmuuskopio kuuluu kirjaan LOS! ${imported.bookId}, ei kirjaan LOS! ${bookId}.`);
      const current=ownBackup().backup;
      const next=planLosFutureBackupImport(imported,current);
      setPreview(imported);
      setPlan(next);
      setStatus("Varmuuskopio tarkistettu. Valitse, tuodaanko vain puuttuvat tiedot vai korvataanko nykyisiä.");
    }catch(error){
      setStatus(error instanceof Error?error.message:"Varmuuskopion tarkistaminen epäonnistui.");
    }
  }
  function apply(mode:"missing-only"|"replace"){
    if(!preview||!plan||(mode==="replace"&&!replaceConfirmed))return;
    try{
      const {ownerId,backup:current}=ownBackup();
      if(mode==="replace"){
        // Always give the student the existing data before overwriting anything.
        download(current,`LOS-${bookId}-ennen-tuontia-${new Date().toISOString().slice(0,10)}.json`);
      }
      const result=applyLosFutureBackup(preview,bookId,ownerId,localStorage,mode);
      for(const change of result.changes){
        window.dispatchEvent(new CustomEvent("los:draft-change",{detail:change}));
      }
      setStatus(`Tuotu ${result.imported} kappaleen tallennusta; ${result.skipped} ohitettu. Tiedot ovat edelleen vain tällä laitteella.`);
      setPreview(null);
      setPlan(null);
      setReplaceConfirmed(false);
    }catch(error){
      setStatus(error instanceof Error?error.message:"Varmuuskopion tuonti epäonnistui.");
    }
  }

  return <section className="los-backup-section" aria-label={`LOS! ${bookId}:n varmuuskopiot`}>
    <p className="los-eyebrow">OMAT TIEDOT · VAIN TÄMÄ SELAIN</p>
    <h2>Varmuuskopioi harjoittelu ja siirrä se laitteiden välillä</h2>
    <p>LOS! {bookId}:n vastaukset, omat vertailumerkinnät, opetuspolun itse merkityt vaiheet
      ja reflektiot tallentuvat tähän selaimeen. Lataa ne JSON-tiedostoksi, jotta
      voit jatkaa toisella laitteella. Tämä ei ole automaattinen pilvisynkronointi.</p>
    <div className="los-backup-actions">
      <button type="button" onClick={exportAll}><Download size={17}/> Vie LOS! {bookId}:n varmuuskopio</button>
      <label className="los-backup-upload"><FileUp size={17}/> Tuo tämän kirjan varmuuskopio
        <input type="file" accept=".json,application/json" onChange={event=>void chooseFile(event)}/></label>
    </div>
    <p className="los-backup-warning"><ShieldAlert size={16}/>
      Tiedosto sisältää omia tekstejäsi ja vastausluonnoksiasi. Säilytä se yksityisenä.
      Varmuuskopiota ei lähetetä palvelimelle.</p>
    {preview&&plan&&<div className="los-backup-preview">
      <h3><FileJson2 size={18}/> Vahvistettava tuonti · LOS! {preview.bookId}</h3>
      <p>Varmuuskopio: {new Date(preview.exportedAt).toLocaleString("fi-FI")}.
        Tallennuksia {plan.incoming.length}, joista {plan.conflicts.length} on ristiriidassa tämän selaimen tietojen kanssa.</p>
      <p>Tuotavat kappaleet: {plan.incoming.map(id=>Number(id)).join(", ")||"ei yhtään"}.</p>
      <div className="los-backup-choices">
        <button type="button" disabled={plan.missing.length===0} onClick={()=>apply("missing-only")}>
          Tuo vain puuttuvat ({plan.missing.length})</button>
        {plan.conflicts.length>0&&<>
          <label><input type="checkbox" checked={replaceConfirmed}
            onChange={event=>setReplaceConfirmed(event.target.checked)}/>
            Ymmärrän, että korvaaminen vaihtaa nykyiset kappalevastaukseni.
            Nykyisistä tiedoista ladataan ensin turvakopio.</label>
          <button type="button" disabled={!replaceConfirmed} onClick={()=>apply("replace")}>
            Korvaa tämän kirjan tiedot ja lataa turvakopio</button>
        </>}
      </div>
    </div>}
    {status&&<p role="status" className="los-backup-status">{status}</p>}
  </section>;
}
