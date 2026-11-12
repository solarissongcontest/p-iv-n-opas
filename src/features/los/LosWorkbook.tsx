import { useState } from "react";
import { Bookmark, BookOpen, Check, CircleAlert, Download, FileText, RotateCcw } from "lucide-react";
import { losExercisesFor, losIsCorrect, losScore, type LosExercise } from "./exerciseBank";
import { useLosChapterDraft } from "./studyState";
import { LosCloudPanel } from "./LosCloudPanel";
import { LosRichExercises } from "./LosRichExercises";
import {losArchiveChapterExam,losChapterExamHistory,losWithoutWorkbookAnswers} from "./losWorkbookPersistence";
import type { LosChapter } from "./catalog";

function LosSaveNotice({saved}:{saved:boolean}) {
  return <p className={`los-save-state ${saved?"":"is-error"}`} role="status">
    {saved ? <><Check size={14}/> Tallennettu tähän selaimeen. Tallennus on paikallinen, kunnes teet erillisen suojatun pilvisynkronoinnin.</> :
      <><CircleAlert size={15}/> Tallennus epäonnistui. Älä sulje sivua ennen kuin olet kopioinut vastauksesi talteen.</>}
  </p>;
}
function Question({item,index,value,locked,reveal,onValue}:{
  item:LosExercise;index:number;value:string;locked:boolean;reveal:boolean;
  onValue:(value:string)=>void;
}) {
  const correct=losIsCorrect(item,value);
  return <li className="los-workbook-question" id={item.id}>
    <div className="los-workbook-question-header"><span className="los-question-number">{item.chapterId.replace(/^0/,"")}.{index+1}</span><span>{item.instruction}</span></div>
    <fieldset disabled={locked}>
      <legend>{item.prompt}</legend>
      {item.kind==="choice" ? <div className="los-workbook-choices">
        {(item.options??[]).map(option=><label className={value===option?"is-selected":""} key={option}>
          <input type="radio" name={item.id} value={option} checked={value===option} onChange={()=>onValue(option)}/>
          <span>{option}</span>
        </label>)}
      </div> : <label className="los-workbook-fill">
        <span className="sr-only">Kirjoita puuttuva sana</span>
        <input type="text" spellCheck={false} autoComplete="off" inputMode="text" value={value}
          onChange={event=>onValue(event.target.value)} placeholder="Kirjoita vastaus tähän" maxLength={100}/>
      </label>}
    </fieldset>
    {reveal && <div className={`los-workbook-feedback ${correct?"is-right":"is-wrong"}`} role="status">
      <strong>{correct?"Oikein.":"Korjattavaa."}</strong> {item.explanation}
      {!correct && <span className="los-workbook-answer">Oikea vastaus: <b lang={item.chapterId==="01"||item.chapterId==="02"?"de":undefined}>{item.correct}</b></span>}
    </div>}
  </li>;
}
const selfAssessments:Record<string,string> = {
  "01":"Kuvittele, että tapaat ensin opettajan aamulla ja myöhemmin hyvästelet ystävän. Sano molemmat ilmaukset ääneen ja arvioi, osasitko ne ilman näkyvää mallia.",
  "02":"Kuvittele esittäytyväsi uudelle henkilölle. Kerro nimesi ja kysy hänen nimeään saksaksi ääneen ilman valmista tekstiä.",
  "03":"Kuvittele tapaavasi henkilön Saksasta. Kysy, mistä hän on kotoisin, ja kerro olevasi kotoisin Suomesta. Tarkista erityisesti woher, kommen ja aus.",
  "04":"Kuvittele kaksi kohtaamista: puhut tutulle ystävälle ja asioit kohteliaasti tuntemattoman aikuisen kanssa. Esitä kummassakin sopiva nimikysymys.",
  "05":"Kuvittele ystävän kysyvän kuulumisiasi. Vastaa realistisesti, esitä vastakysymys ja kokeile sitten kohteliasta Ihnen-muotoa.",
  "06":"Esitä ääneen kaksi kuvitteellista ikäkeskustelua (17 ja 20 vuotta). Kirjoita sen jälkeen ilman mallia luvut 7, 16, 21 ja 32 saksaksi.",
  "07":"Tavaa ääneen kahdeksan kuvitteellista etunimeä ja lue neljä itse kirjoittamaasi numerojonoa. Pysähdy jokaisen kirjaimen kohdalle. Vertaa vasta lopuksi omaan kirjoitusasuusi. Äänen oikeellisuutta ei pisteytetä automaattisesti.",
  "08":"Kokeile kolmea erilaista avunpyyntöä: en ymmärrä, toistatteko ja mitä tämä sana tarkoittaa. Sano ne ääneen mielikuvitukselliselle opettajalle ja arvioi, osaisitko käyttää niitä ilman mallia.",
  "09":"Lue ääneen itse kirjoittamasi viikon seitsemän kalenterimerkintää. Kirjoita kolmella repliikillä tapaaminen, jossa käytät am + viikonpäivä ja um + tasatunti.",
  "10":"Esitä ääneen kaksi erilaista 6–8 repliikin kohtaamista, toinen du- ja toinen Sie-puhuttelulla. Esittele myös kolmas henkilö neljällä omalla virkkeellä ja arvioi, mitä osasit ilman mallia.",
};

export function LosWorkbook({chapter,mode}:{chapter:LosChapter;mode:"practice"|"test"}) {
  const {draft,update,saved}=useLosChapterDraft(1,chapter.id);
  const exercises=losExercisesFor(chapter.id);
  const [revealPractice,setRevealPractice]=useState<string[]>([]);
  const [retakeError,setRetakeError]=useState("");
  const history=mode==="test"?losChapterExamHistory(draft.practiceAnswers,chapter.id):[];
  if(!exercises.length) return <section className="los-inner-page los-workbook">
    <p className="los-eyebrow">{mode==="test"?"WIEDERHOLEN":"ÜBEN"} / KAPITEL {Number(chapter.id)}</p>
    <h1>{mode==="test"?"Kappaletesti":"Harjoittele"}</h1>
    <div className="los-editorial-note"><h2>Tehtäväsarja valmistellaan</h2>
    <p>Tälle kappaleelle ei vielä ole julkaistu tarkistettua, kokonaisuudessaan arvioitavaa tehtäväsarjaa. Kappaleen sisältösivut ovat vapaasti luettavissa.</p></div>
  </section>;
  const answers=mode==="test"?draft.testAnswers:draft.practiceAnswers;
  const locked=mode==="test"&&Boolean(draft.testSubmittedAt);
  const filled=exercises.filter(ex=>Boolean(answers[ex.id]?.trim())).length;
  const score=losScore(chapter.id,answers);
  const retake=()=>{
    if(!saved||!draft.testSubmittedAt)return;
    try{
      update(current=>({...current,
        practiceAnswers:losArchiveChapterExam(
          current.practiceAnswers,chapter.id,exercises,current.testAnswers,current.testSubmittedAt??""),
        testAnswers:{},testSubmittedAt:null,
      }));
      setRetakeError("");
    }catch(error){setRetakeError(error instanceof Error?error.message:"Vanhaa tulosta ei voitu säilyttää.");}
  };
  const updateAnswer=(id:string,value:string)=>{
    if(locked)return;
    update(current=>mode==="test"?
      {...current,testAnswers:{...current.testAnswers,[id]:value}}:
      {...current,practiceAnswers:{...current.practiceAnswers,[id]:value}});
    if(mode==="practice")setRevealPractice(prev=>prev.filter(key=>key!==id));
  };
  return <section className="los-inner-page los-workbook">
    <p className="los-eyebrow">{mode==="test"?"WIEDERHOLEN / KAPPALETESTI":"ÜBEN / HARJOITTELE"} · KAPITEL {Number(chapter.id)}</p>
    <h1>{mode==="test"?"Kappaletesti":"Harjoittele"}</h1>
    <p className="los-page-intro">{mode==="test"?
      "Vastaa kaikkiin tehtäviin ilman näkyvää mallia. Saat ratkaisut ja perustelut vasta palautettuasi koko testin.":
      "Harjoittele jokainen tehtävä rauhassa. Harjoitustilassa voit nähdä perustelun heti vastauksen jälkeen. Voit tehdä tehtävät uudelleen."}</p>
    <div className="los-workbook-intro">
      <p><strong>{exercises.length} osatehtävää</strong> · {filled} vastattu</p>
      <LosSaveNotice saved={saved}/>
      <p className="los-workbook-scope">Nämä ovat LOS!:n omia alkeiden muoto- ja fraasiharjoituksia. Alkuperäisen päätekstin ymmärtämistä, kuuntelua ja puheen tuottamista arvioidaan erikseen.</p>
    </div>
    <ol className="los-workbook-list">
      {exercises.map((item,index)=><Question key={item.id} item={item} index={index}
        value={answers[item.id]??""} locked={locked}
        reveal={mode==="test"?locked:revealPractice.includes(item.id)}
        onValue={value=>updateAnswer(item.id,value)} />)}
    </ol>
    {mode==="practice"?<div className="los-workbook-tools">
      <button className="los-outline-button" onClick={()=>setRevealPractice(exercises.filter(ex=>Boolean(answers[ex.id]?.trim())).map(ex=>ex.id))} disabled={!filled}>
        <Check size={17}/> Tarkista vastatut ({filled})
      </button>
      <button className="los-text-link" onClick={()=>{update(current=>({...current,practiceAnswers:losWithoutWorkbookAnswers(current.practiceAnswers,exercises)}));setRevealPractice([]);}}>
        <RotateCcw size={16}/> Tyhjennä vain tämän harjoitussarjan vastaukset
      </button>
    </div>:locked?<div className="los-test-result" role="status">
      <p className="los-overline">TESTI PALAUTETTU · PAIKALLINEN TULOS</p>
      <h2>{score.correct} / {score.total} oikein</h2>
      <p>Katso kunkin tehtävän perustelu yllä. Tulos tallennetaan ensin tähän selaimeen. Mahdollinen pilvisynkronointi tehdään erikseen. Muoto- ja fraasitehtävien tulos ei yksin todista koko kappaleen kielitaitoa.</p>
      <button className="los-outline-button" onClick={retake} disabled={!saved}>
        <RotateCcw size={17}/> Arkistoi tulos ja aloita uusinta
      </button>
      {retakeError&&<p role="alert">{retakeError}</p>}
      <p>Edellisen yrityksen pisteet, palautusaika ja vastaukset jäävät talteen. Oma itsearviointi säilyy myös uusinnassa. Sama tehtäväpankki tulee toistaiseksi uudelleen.</p>
    </div>:<div className="los-test-submit">
      <p>Testi voidaan palauttaa, kun olet vastannut kaikkiin {exercises.length} osatehtävään. Ennen palautusta ratkaisuja ei näytetä.</p>
      <button className="los-primary" disabled={filled!==exercises.length} onClick={()=>
        update(current=>({...current,testSubmittedAt:new Date().toISOString()}))
      }>Palauta testi · {filled}/{exercises.length}</button>
    </div>}
    {mode==="test"&&history.length>0&&<div className="los-test-result" aria-label="Kappaletestin aiemmat yritykset">
      <h2>Aiemmat kappaletestit</h2>
      <ol>{history.map(item=><li key={item.number}>
        <strong>Yritys {item.number}:</strong> {item.correct}/{item.total} pistettä,
        {" "}{new Date(item.submittedAt).toLocaleString("fi-FI")}
        <details><summary>Näytä vanhat vastaukset</summary>
          <ul>{item.answers.map(answer=><li key={answer.id}>
            <strong>{answer.id}:</strong> {answer.answer}
          </li>)}</ul>
        </details>
      </li>)}</ol>
    </div>}
    {mode==="practice"&&<LosRichExercises chapterId={chapter.id}/>}
    {mode==="test"&&locked&&<div className="los-self-assessment">
      <h2>Itsearviointi: puhu tai kirjoita itse</h2>
      <p>{selfAssessments[chapter.id] ?? "Tee kappaleen viestintätavoitteista oma lyhyt puhe- tai kirjoitusharjoitus. Arvioi, mitä osaat ilman mallia."}</p>
      <label htmlFor={`los-self-${chapter.id}`}>Mitä osasin? Mitä täytyy vielä harjoitella?</label>
      <textarea id={`los-self-${chapter.id}`} value={draft.selfAssessment} maxLength={5000}
        onChange={e=>update(current=>({...current,selfAssessment:e.target.value}))} rows={4} placeholder="Kirjaa oma havaintosi, ei automaattisesti pisteytettävä vastaus."/>
      <LosSaveNotice saved={saved}/>
    </div>}
  </section>;
}
export function LosNotebook({chapter}:{chapter:LosChapter}) {
  const {draft,update,saved}=useLosChapterDraft(1,chapter.id);
  const download=()=>{
    const lines=[`LOS! 1 · Kappale ${Number(chapter.id)} · ${chapter.title}`,"","Omat muistiinpanot",draft.note,"","Itsearviointi",draft.selfAssessment,"",`Paikallisen tallennuksen päiväys: ${draft.updatedAt||"ei vielä tallennettu"}`];
    const blob=new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download=`LOS1-kappale-${chapter.id}-muistiinpanot.txt`;document.body.appendChild(a);a.click();a.remove();
    URL.revokeObjectURL(url);
  };
  return <aside className="los-chapter-notes" aria-label="Omat muistiinpanot">
    <div className="los-chapter-notes-title">
      <div><FileText size={19}/><h2>Omat muistiinpanot</h2></div>
      <button type="button" aria-pressed={draft.bookmarked} onClick={()=>update(current=>({...current,bookmarked:!current.bookmarked}))}>
        <Bookmark size={17} fill={draft.bookmarked?"currentColor":"none"}/>{draft.bookmarked?"Merkitty":"Merkitse kappale"}
      </button>
    </div>
    <p>Kirjoita omat havainnot tähän. Muistiinpano säilyy tässä selaimessa myös sivun sulkemisen jälkeen, jos selaimen tallennustietoja ei poisteta.</p>
    <label htmlFor={`los-notes-${chapter.id}`} className="sr-only">Omat muistiinpanot kappaleesta {Number(chapter.id)}</label>
    <textarea id={`los-notes-${chapter.id}`} rows={4} maxLength={8000} value={draft.note}
      placeholder="Kirjoita tähän omia esimerkkejä, muistettavia sanoja ja kysymyksiä…"
      onChange={e=>update(current=>({...current,note:e.target.value}))}/>
    <div className="los-chapter-notes-bottom">
      <LosSaveNotice saved={saved}/>
      <button type="button" onClick={download} title="Lataa muistiinpanot omalle laitteelle"><Download size={16}/> Vie muistiinpanot .txt</button>
    </div>
    <LosCloudPanel bookId={1} chapterId={chapter.id} draft={draft} replaceDraft={remote=>update(()=>remote)} />
  </aside>;
}
