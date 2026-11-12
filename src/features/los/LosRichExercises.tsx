import {useState} from "react";
import {CheckCircle2,Headphones,BookOpen,AlertTriangle} from "lucide-react";
import {useLosChapterDraft} from "./studyState";
import {LosVoicePractice} from "./LosVoicePractice";
import {LOS1_RICH_TASKS,gradeLosRichTask,losRichTasksFor,
 type LosRichTask} from "./content/los1RichExercises";
import "./los-rich-exercises.css";
const availableTypes:Record<string,string>={
 "highlight-span":"Korosta tekstijakso","single-choice":"Yksi oikea vaihtoehto",
 "true-false":"Tosi vai epätosi","fill-gap":"Täydennä aukko",
 "match-pairs":"Yhdistä parit","word-order":"Järjestä sanat",
 "translation-restricted":"Rajattu käännös","locate-evidence":"Etsi tekstistä näyttö",
 "listen-select":"Kuuntele ja valitse","listen-type":"Kuuntele ja kirjoita",
 "video-comprehension":"Katso ja ymmärrä","article-sort":"Lajittele artikkelit",
 "inflection-grid":"Täydennä taivutustaulukko","correct-error":"Korjaa virhe",
 "guided-writing":"Kirjoita ja arvioi","record-and-reflect":"Äänitä ja arvioi",
};
const parseMap=(value:string):Record<string,string>=>{
 try{const parsed=JSON.parse(value) as unknown;
  if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return {};
  return Object.fromEntries(Object.entries(parsed).filter(([k,v])=>k.length<40&&typeof v==="string"));
 }catch{return {};}
};
function RichExerciseFrame({task}:{task:LosRichTask}){
 const {draft,update,saved}=useLosChapterDraft(1,task.chapterId);
 const [mediaError,setMediaError]=useState(false);
 const response=draft.practiceAnswers[task.id]??"";
 const checked=draft.practiceChecked.includes(task.id);
 const completedAudio=draft.practiceAnswers[task.id+"-AUDIO"]==="played";
 const selfReviewed=draft.practiceAnswers[task.id+"-SELF"]==="reviewed";
 const download=draft.practiceAnswers[task.id+"-DOWNLOAD"]==="attempted";
 const outcome=gradeLosRichTask(task,response,
  {audioFinished:completedAudio,selfReviewed,recordDownloadStarted:download});
 const setResponse=(value:string)=>update(current=>({...current,
  practiceAnswers:{...current.practiceAnswers,[task.id]:value},
  practiceChecked:current.practiceChecked.filter(id=>id!==task.id),
 }));
 const setFlag=(suffix:string,value:string)=>update(current=>({...current,
  practiceAnswers:{...current.practiceAnswers,[task.id+"-"+suffix]:value},
  practiceChecked:current.practiceChecked.filter(id=>id!==task.id),
 }));
 const check=()=>{
  if(outcome==="media-unavailable"||outcome==="requires-audio"||outcome==="unanswered")return;
  update(current=>({...current,
   practiceChecked:Array.from(new Set([...current.practiceChecked,task.id])),
  }));
 };
 const structured=task.type==="match-pairs"||task.type==="article-sort"||task.type==="inflection-grid";
 const rows=task.pairs??task.grid??[];
 const map=parseMap(response);
 const values=task.type==="article-sort"?["der","die","das"]:
  task.type==="inflection-grid"?["kommt","kommst","komme"]:
   rows.map(row=>row.right).reverse();
 const playable=task.type==="listen-select"||task.type==="listen-type";
 const free=task.type==="guided-writing"||task.type==="record-and-reflect";
 const unavailable=task.type==="video-comprehension"&&!task.video?.verified;
 const showFeedback=checked&&(outcome==="right"||outcome==="wrong"||outcome==="self-assessed");
 const setTableValue=(rowId:string,newValue:string)=>setResponse(JSON.stringify({...map,[rowId]:newValue}));
 const mediaSource=task.audio;
 const minLength=task.minLength??15;
 const completedCount=task.type==="highlight-span"?1:rows.length;
 return <article className="los-rich-frame" id={task.id}>
  <header className="los-rich-frame-header">
   <span className="los-rich-type">{availableTypes[task.type]}</span>
   <span className="los-rich-source">{task.sourceId??"LOS!-harjoitus"}</span>
  </header>
  <h3>{task.prompt}</h3>
  <p className="los-rich-hint">{task.hint}</p>
  {unavailable?<div role="status" className="los-rich-pending">
   <AlertTriangle size={17}/><p><strong>Videotehtävää ei ole avattu.</strong> Todennettu videosoitin, käyttölupa ja aikakoodiin sidottu vastaus puuttuvat. Tämä ei ole pakollinen suoritus, eikä sitä lasketa kuuntelu- tai videoymmärtämiseksi.</p>
   {task.video?.officialUrl&&<a href={task.video.officialUrl} target="_blank" rel="noopener noreferrer">Alkuperäisen videon lähdetiedot</a>}
  </div>:<>
   {playable&&mediaSource&&<div className="los-rich-media">
    <p><Headphones size={16}/><strong>Alkuperäinen, kokonainen ihmisen ääni</strong></p>
    <audio controls preload="none" src={mediaSource.src} aria-label={"Äänite "+mediaSource.sourceId}
     onEnded={()=>setFlag("AUDIO","played")} onError={()=>setMediaError(true)}>
     Selaimesi ei tue äänentoistoa.
    </audio>
    <p><a href={mediaSource.sourceUrl} target="_blank" rel="noopener noreferrer">Lähdetiedosto</a> · {mediaSource.sourceId} · {mediaSource.license}</p>
    {mediaError&&<p role="alert">Äänite ei toistu tässä selaimessa. Tehtävää ei voi merkitä kuulluksi. Kirjan Text B:ssä on erillinen tekstiharjoitus, mutta se ei korvaa äänen ymmärtämistä.</p>}
    {!completedAudio&&<p role="status">Toista äänite loppuun ennen tarkistamista. Pelkkä play-painallus ei riitä.</p>}
    {completedAudio&&<p role="status"><CheckCircle2 size={15}/> Äänitteen toisto päättyi selaimessa.</p>}
   </div>}
   {task.type==="highlight-span"&&<fieldset className="los-rich-options">
    <legend>Valitse alkuperäisen lähteen sanajakso</legend>
    {task.tokens?.map(token=><button key={token.id} type="button" className={response===token.id?"los-rich-highlight is-active":"los-rich-highlight"}
     aria-pressed={response===token.id} onClick={()=>setResponse(response===token.id?"":token.id)}
     lang="de">{token.text}</button>)}
    <small>Valinta ankkuroidaan alkuperäiseen token-tunnisteeseen, ei sijaintiin ruudulla.</small>
   </fieldset>}
   {["single-choice","true-false","locate-evidence","listen-select","video-comprehension"].includes(task.type)&&
    <fieldset className="los-rich-options"><legend>Valitse vastaus</legend>
     {task.options?.map(option=><label className={response===option.id?"is-selected":""} key={option.id}>
      <input type="radio" name={task.id} value={option.id} checked={response===option.id}
       onChange={()=>setResponse(option.id)}/><span>{option.label}</span>
     </label>)}
    </fieldset>}
   {structured&&<fieldset className="los-rich-grid">
    <legend>{task.type==="article-sort"?"Valitse jokaisen substantiivin artikkeli":
      "Täydennä kukin rivi oikealla merkityksellä tai muodolla"}</legend>
    {rows.map((row,i)=><label key={row.id}>
     <span lang="de">{i+1}. {row.left}</span>
     <select value={map[row.id]??""} onChange={e=>setTableValue(row.id,e.target.value)}>
      <option value="">Valitse…</option>
      {values.map(value=><option key={value} value={value}>{value}</option>)}
     </select>
    </label>)}
    <small>{completedCount} erillistä rivikohtaista valintaa; kaikki rivit vaaditaan ennen tarkistusta.</small>
   </fieldset>}
   {["fill-gap","translation-restricted","word-order","listen-type","correct-error"].includes(task.type)&&<label className="los-rich-free-input">
    <span>Kirjoita vastaus saksaksi</span>
    <input lang="de" type="text" autoComplete="off" spellCheck={false} maxLength={150} value={response}
     onChange={e=>setResponse(e.target.value)}/>
    {task.type==="word-order"&&<small>Sanat: {task.tokens?.map(x=>x.text).join(" / ")}</small>}
   </label>}
   {free&&<>
    <label className="los-rich-free-input">
     <span>{task.type==="guided-writing"?"Oma saksankielinen teksti":"Oma arvio puheharjoituksesta"}</span>
     <textarea rows={4} maxLength={450} value={response} onChange={e=>setResponse(e.target.value)}
      placeholder={task.type==="guided-writing"?"Kirjoita neljä omaa lausetta…":"Mikä sujui ilman mallia, mitä kertailet?"}/>
     <small>{response.trim().length}/{minLength} merkkiä minimiin. Teksti ei saa automaattista kielioppiarvosanaa.</small>
    </label>
    {task.type==="record-and-reflect"&&<div className="los-rich-voice">
     <LosVoicePractice chapterId="10" onDownloaded={()=>setFlag("DOWNLOAD","attempted")}/>
     <p role="status">{download?"Äänitiedoston lataus käynnistetty. Varmista itse tiedoston löytyminen.":"Äänitteen latausta ei ole vielä käynnistetty."}</p>
    </div>}
    <label className="los-rich-self-check"><input type="checkbox" checked={selfReviewed}
     disabled={response.trim().length<minLength||task.type==="record-and-reflect"&&!download}
     onChange={e=>setFlag("SELF",e.target.checked?"reviewed":"")}/>
     <span>Olen tarkistanut oman yritykseni ohjeen mukaisesti. Tämä on itsearvio, ei koneen antama oikeellisuuspiste.</span>
    </label>
   </>}
   <div className="los-rich-check-row">
    <button type="button" className="los-exercise-check" disabled={outcome==="unanswered"||outcome==="requires-audio"||outcome==="media-unavailable"} onClick={check}>
     Tarkista harjoitus
    </button>
    <span role="status">{saved?"Tallennettu tähän selaimeen":"Tallennus epäonnistui, kopioi vastauksesi talteen."}</span>
   </div>
   {showFeedback&&<p className="los-rich-feedback" role="status">
    <strong>{outcome==="right"?"Oikein.":outcome==="wrong"?"Korjattavaa.":"Oma yritys kirjattu ilman arvosanaa."}</strong>
    {" "}{task.explanation}
   </p>}
  </>}
 </article>;
}
export function LosRichExercises({chapterId}:{chapterId:string}){
 const tasks=losRichTasksFor(chapterId);
 if(!tasks.length)return null;
 const available=tasks.filter(item=>item.type!=="video-comprehension"||item.video?.verified).length;
 return <section className="los-rich-exercises" aria-label={"Kappaleen "+chapterId+" monipuoliset harjoitukset"}>
  <h2>Monipuoliset tehtävätyypit</h2>
  <p>LOS! 1:n yhteisen tehtävämoottorin erilaisia harjoituksia. Tässä kappaleessa on {tasks.length} tehtävätyyppiä, joista {available} on käytettävissä. Osaa voi tarkistaa automaattisesti; kirjoittaminen ja puhe arvioidaan aina itse. Vahvistamatonta videota ei suoriteta.</p>
  {tasks.map(task=><RichExerciseFrame key={task.id} task={task}/>)}
  <p><BookOpen size={16}/> Kirjan 147 alkuperäistä muoto- ja fraasitehtävää löytyvät saman sivun ylemmästä osasta. Uudet tyypit täydentävät niitä eivätkä muuta vanhojen testien pisteitä.</p>
 </section>;
}
export const LOS1_RICH_TYPE_COUNT=LOS1_RICH_TASKS.length;
