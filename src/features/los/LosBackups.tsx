import { useState, type ChangeEvent } from "react";
import { Download, FileJson2, FileUp, ShieldAlert } from "lucide-react";
import {
  createLosBookBackup, downloadLosBookBackup, importLosBookBackup,
  parseLosBookBackup, planLosBookImport, type LosBookBackup,
} from "./localBackups";

export function LosBackups({bookId}:{bookId:number}){
  const [preview,setPreview]=useState<LosBookBackup|null>(null);
  const [replaceConfirmed,setReplaceConfirmed]=useState(false);
  const [status,setStatus]=useState("");
  if(bookId!==1)return null;
  const exportAll=()=>{
    try {
      const backup=createLosBookBackup(bookId);
      downloadLosBookBackup(backup);
      setStatus(`Ladattiin LOS! 1:n varmuuskopio, jossa on ${Object.keys(backup.chapters).length} tallennuskohdetta.`);
    }catch(error){setStatus(error instanceof Error?error.message:"Varmuuskopion vienti epäonnistui.");}
  };
  const chooseFile=async(event:ChangeEvent<HTMLInputElement>)=>{
    setPreview(null);setReplaceConfirmed(false);
    const file=event.target.files?.[0];
    if(!file)return;
    if(file.size>1_000_000){setStatus("Tiedosto on liian suuri (enintään 1 Mt).");return;}
    try{
      const parsed=parseLosBookBackup(await file.text());
      setPreview(parsed);
      setStatus("Varmuuskopio tarkistettu. Valitse alla, miten tiedot tuodaan.");
    }catch(error){setStatus(error instanceof Error?error.message:"Varmuuskopiota ei voitu lukea.");}
    event.target.value="";
  };
  const plan=preview?planLosBookImport(preview,createLosBookBackup(bookId)):null;
  const apply=(mode:"missing-only"|"replace")=>{
    if(!preview)return;
    try{
      if(mode==="replace"){
        if(!replaceConfirmed)return;
        // A fresh local backup is downloaded before any intentional replacement.
        downloadLosBookBackup(createLosBookBackup(bookId),`LOS-1-ennen-tuontia-${new Date().toISOString().slice(0,10)}.json`);
      }
      const result=importLosBookBackup(preview,mode);
      setStatus(`Tuotu ${result.imported} tallennuskohdetta, ohitettu ${result.skipped}. Päivitä sivu tarvittaessa, jotta kaikki näkymät latautuvat.`);
      setPreview(null);setReplaceConfirmed(false);
    }catch(error){setStatus(error instanceof Error?error.message:"Tietojen tuonti epäonnistui.");}
  };
  return <section className="los-backup-section" aria-label="LOS! 1:n omat varmuuskopiot">
    <p className="los-eyebrow">OMAT TIEDOT · VARMUUSKOPIOT</p>
    <h2>Siirrä opiskelutyö laitteesta toiseen</h2>
    <p>Lataa LOS! 1:n muistiinpanot, kirjoitustehtävät, harjoitusvastaukset ja sanaston kertauskorttien aikataulut JSON-tiedostoksi. Voit tuoda saman tiedoston toisella laitteella myös silloin, kun pilvitallennusta ei ole otettu käyttöön.</p>
    <div className="los-backup-actions">
      <button type="button" onClick={exportAll}><Download size={17}/> Vie koko LOS! 1:n varmuuskopio</button>
      <label className="los-backup-upload"><FileUp size={17}/> Tuo LOS!-varmuuskopio<input type="file" accept=".json,application/json" onChange={event=>void chooseFile(event)} /></label>
    </div>
    <p className="los-backup-warning"><ShieldAlert size={16}/> Tiedosto sisältää omat vastauksesi ja muistiinpanosi. Säilytä se yksityisenä. Tuonti ei vaadi pilvipalvelua.</p>
    {preview && plan && <div className="los-backup-preview">
      <h3><FileJson2 size={18}/> Tarkistettu varmuuskopio</h3>
      <p>Varmuuskopiossa on {plan.incoming.length} tallennuskohdetta. Tällä laitteella {plan.conflicts.length} tallennuskohteessa on jo omia tallennuksia.</p>
      {plan.incoming.length>0&&<p>Tallennuskohteet: {plan.incoming.map(x=>x==="91"?"Kertaus I / EX-MID":x==="92"?"Kertaus II":"Kappale "+Number(x)).join(", ")}.</p>}
      <div className="los-backup-choices">
        <button type="button" onClick={()=>apply("missing-only")} disabled={plan.newChapters.length===0}>Tuo vain puuttuvat ({plan.newChapters.length})</button>
        {plan.conflicts.length>0&&<>
          <label><input type="checkbox" checked={replaceConfirmed} onChange={event=>setReplaceConfirmed(event.target.checked)} /> Ymmärrän, että tuonti korvaa olemassa olevia paikallisia kappaletietoja.</label>
          <button type="button" disabled={!replaceConfirmed} onClick={()=>apply("replace")}>Korvaa tiedot ja lataa ensin nykyinen varmuuskopio</button>
        </>}
      </div>
    </div>}
    {status&&<p role="status" className="los-backup-status">{status}</p>}
  </section>;
}
