import {useCallback,useEffect,useMemo,useRef,useState,
  type CSSProperties,type TouchEvent as ReactTouchEvent} from "react";
import {ArrowLeft,Bookmark,BookOpen,ChevronLeft,ChevronRight,
  Columns2,List,Minus,Plus,Printer,Search,X} from "lucide-react";
import {getDeviceOwnerId} from "@/lib/deviceSession";
import {getFacsimileSwipeDirection} from "./navigation";
import {
  LOS1_C02_PRINT_PAGES as pages,LOS1_C02_PRINT_CHAPTER as chapter,
  LOS1_C02_TEXT_A as dialogue,LOS1_C02_TEXT_B as textB,
  LOS1_C02_SOURCE_QUESTIONS as questions,LOS1_C02_TEXT_B_QUESTIONS as textBQuestions,
  LOS1_C02_EXERCISES as exercises,LOS1_C02_CULTURE as culture,
  LOS1_C02_SOURCE_GATE as sourceGate,type LosC02PrintPage,type LosC02PrintSection,
} from "./c02Pilot";
import "./facsimile.css";
import "./c02Pilot.css";

type ViewMode="auto"|"single"|"spread"|"continuous";
type ReaderState={pageId:string;mode:ViewMode;zoom:number};
const ownerKey=()=>{
  const id=getDeviceOwnerId();
  return id?"los.facsimile.c02.draft."+id:null;
};
const safeZoom=(n:number)=>Math.max(75,Math.min(200,n));
const isView=(s:unknown):s is ViewMode=>["auto","single","spread","continuous"].includes(String(s));
function readState():ReaderState{
  try{
    const key=ownerKey();
    const data:unknown=JSON.parse(key?localStorage.getItem(key)??"null":"null");
    if(data&&typeof data==="object"){
      const value=data as Partial<ReaderState>;
      return {pageId:pages.some(p=>p.pageId===value.pageId)?value.pageId!:"c02-open-left",
        mode:isView(value.mode)?value.mode:"auto",
        zoom:safeZoom(Number.isFinite(value.zoom)?value.zoom!:100)};
    }
  }catch{/* Preserve the reader even without local storage. */}
  return {pageId:"c02-open-left",mode:"auto",zoom:100};
}
function readBookmarks():string[]{
  try{
    const key=ownerKey();
    const values:unknown=JSON.parse(key?localStorage.getItem(key+".bookmarks")??"[]":"[]");
    return Array.isArray(values)?values.filter((item):item is string=>
      typeof item==="string"&&pages.some(p=>p.pageId===item)):[];
  }catch{return [];}
}

function PaperQuestions({items}:{items:readonly {
  id:string;prompt:string;options:readonly {id:string;text:string}[];
}[]}){
  return <ol className="los-facs-questions">{items.map((q,i)=><li key={q.id}
    className="los-facs-question"><strong className="los-facs-question-number">{i+1}.</strong>
    <div><p>{q.prompt}</p><div className="los-facs-options">
      {q.options.map((option,j)=><span key={option.id} lang="de">
        <i aria-hidden="true"/> {String.fromCharCode(97+j)}) {option.text}
      </span>)}
    </div></div>
  </li>)}</ol>;
}
function PaperExercises({ids}:{ids:readonly string[]}){
  return <ol className="los-facs-c02-exercises">{ids.map(id=>{
    const task=exercises.find(ex=>ex.id===id);
    if(!task)return null;
    return <li key={task.id} className="los-facs-c02-exercise">
      <span className="los-facs-c02-exercise-id">{task.id.replace("C02-EX-","")}</span>
      <div><small>{task.instruction}</small><p>{task.prompt}</p>
      {task.kind==="choice"&&task.options?.length?
        <div className="los-facs-c02-choice">{task.options.map((answer,i)=>
          <span key={answer}><i aria-hidden="true"/> {String.fromCharCode(97+i)}) {answer}</span>)}</div>:
        <div className="los-facs-c02-answer" aria-label="Kirjoita vastauksesi"/>}
      </div>
    </li>;
  })}</ol>;
}
function PaperPageBody({page}:{page:LosC02PrintPage}){
  if(page.pageId==="c02-open-left")return <div className="los-facs-c02-splash">
    <span className="los-facs-c02-num">02</span>
    <p className="los-facs-chapter-label">KAPITEL ZWEI</p>
    <h2 lang="de">{chapter.title}</h2><p>{chapter.subtitle}</p>
    <div className="los-facs-c02-photo-space" role="note">
      <span>HENKILÖESITTELYJEN KUVAPAIKKA</span>
      <p>Kuva tai kuvasommitelma valitaan vasta kuvalisenssin,
        mallilupien ja painoresoluution tarkistuksen jälkeen.</p>
    </div>
  </div>;
  if(page.pageId==="c02-open-right")return <>
    <p className="los-facs-lead">Tutustut ensimmäisiin tapoihin kertoa oma nimesi,
      kysyä toisen nimeä ja esitellä ihmisiä saksaksi.</p>
    <h3>Das lernst du! · Mitä opit?</h3>
    <ul className="los-facs-goals">{chapter.objectives.map(goal=><li key={goal}>{goal}</li>)}</ul>
    <h3>Ennen tekstiä</h3>
    <p>Millä tavoin kerrot uuden tuttavan nimen suomeksi?
      Huomaat, että saksaksi voit sanoa sekä <i lang="de">Ich heiße …</i>
      että <i lang="de">Ich bin …</i>.</p>
    <div className="los-facs-note"><b>Muista!</b><p>Olet vasta alussa.
      Kaikki alkuperäistekstin sanat eivät kuulu tämän kappaleen aktiiviseen kielioppiin.</p></div>
  </>;
  if(page.section==="text")return <>
    <p className="los-facs-lead">Lue koko alkuperäinen Franzin ja Gretan kohtaaminen.
      Nimen kysymiseen ja kertomiseen tarvitset erityisesti ilmauksia
      <i lang="de"> Wie heißt du?</i> ja <i lang="de"> Ich heiße …</i>.</p>
    <ol className="los-facs-dialogue">{dialogue.map(line=><li key={line.id}>
      <b>{line.speaker}</b><span lang="de">{line.text}</span>
      <small>{line.meaning}</small></li>)}</ol>
    <p className="los-facs-source">M-WB-01: Wikibooksin kuuden repliikin dialogi,
      sivuversio 4430449, CC BY-SA 4.0. Alkuperäinen saksankielinen teksti on
      mukana kokonaan. Äänitteitä ei ole tuotu tämän sivun osaksi.</p>
  </>;
  if(page.section==="understand")return <>
    <p>Vastaa kaikkiin neljään kysymykseen edellisen sivun keskustelun perusteella.
      Valitse paperilla yksi vaihtoehto. Älä etsi vielä oikeita vastauksia.</p>
    <PaperQuestions items={questions}/>
    <div className="los-facs-note"><b>Etsi alkuperäistekstistä</b>
      <p>Alleviivaa ilmaukset <i lang="de">Wie heißt du?</i>
        ja <i lang="de">Ich heiße Greta.</i></p></div>
  </>;
  if(page.section==="vocabulary")return <>
    <p className="los-facs-lead">Opettele ensin aktiiviset nimi- ja esittäytymisfraasit.</p>
    <table className="los-facs-vocabulary"><thead><tr><th lang="de">Deutsch</th>
      <th>Suomeksi</th></tr></thead><tbody>
      {chapter.vocabulary.map((item,i)=>{
        const [de,...fi]=item.split(" – ");
        return <tr key={i}><td lang="de">{de}</td><td>{fi.join(" – ")}</td></tr>;
      })}
    </tbody></table>
    <p className="los-facs-source">Tekstin muut sanat ovat ymmärtämisen tukisanastoa.
      Kaikkia keskustelun rakenteita ei tarvitse osata muodostaa itse.</p>
  </>;
  if(page.section==="grammar")return <>
    <h3>1. Kysyt ja kerrot nimen</h3>
    <table className="los-facs-vocabulary">
      <thead><tr><th>Saksa</th><th>Suomi</th></tr></thead>
      <tbody><tr><td lang="de">Wie heißt du?</td><td>Mikä sinun nimesi on?</td></tr>
        <tr><td lang="de">Ich heiße Greta.</td><td>Minun nimeni on Greta.</td></tr></tbody>
    </table>
    <h3>2. Ich ja du</h3>
    <p><i lang="de">ich</i> tarkoittaa minä, <i lang="de">du</i> tarkoittaa sinä.
      Verbi vaihtaa muotoaan tekijän mukaan.</p>
    <table className="los-facs-vocabulary">
      <thead><tr><th>Pronomini</th><th lang="de">heißen</th><th lang="de">sein</th></tr></thead>
      <tbody><tr><td lang="de">ich</td><td lang="de">heiße</td><td lang="de">bin</td></tr>
        <tr><td lang="de">du</td><td lang="de">heißt</td><td lang="de">bist</td></tr></tbody>
    </table>
    <div className="los-facs-note"><b>Merke! · Muista!</b>
      <p lang="de">ich heiße · du heißt / ich bin · du bist.</p>
      <p>Kirjoita <i lang="de">du heißt</i>, ei <s lang="de">du heißst</s>.</p>
    </div>
    <h3>3. Sovella</h3><p>Täydennä: <i lang="de">Ich ____ Mia. Du ____ Max.</i></p>
    <div className="los-facs-c02-answer" aria-label="Vastausrivi"/>
  </>;
  if(page.section==="text-b")return <>
    <p className="los-facs-lead">Alkuperäinen neljän repliikin teksti on
      toinen, eri ihmisten tekemä saksankielinen lähde.</p>
    <ol className="los-facs-dialogue">{textB.map(line=><li key={line.id}>
      <b>{line.speaker}</b><span lang="de">{line.text}</span><small>{line.meaning}</small>
    </li>)}</ol>
    <div className="los-facs-note"><b>Kuuntelu</b>
      <p>M-COM-02:n äänitiedoston käyttöoikeus on ilmoitettu lähteessä,
        mutta LOS!:n mobiili- ja tietokonekuuntelua ei ole vielä varmennettu.
        Lukuteksti on mukana eikä sitä korvata linkillä.</p></div>
    <p className="los-facs-source">M-COM-02: Ariser (2011),
      <i> Deutsch Dialog . Ich bin Peter.ogg</i>, CC BY-SA 3.0.</p>
  </>;
  if(page.section==="text-b-understand")return <>
    <p>Tarkista ymmärtäminen Text B:stä. Vaikeammat alkuperätekstiin
      kuuluvat maanimet ja <i lang="de">wir</i>-muoto vain tunnistetaan.</p>
    <PaperQuestions items={textBQuestions.map(q=>({...q,prompt:q.question}))}/>
    <div className="los-facs-note"><b>Etsi tekstistä</b>
      <p>Ympyröi <i lang="de">Ich heiße Takashi</i> sekä
        <i lang="de"> Das ist Peter</i>.</p></div>
  </>;
  if(page.section==="practice")return <PaperExercises ids={page.exerciseIds}/>;
  if(page.section==="apply")return <>
    <p className="los-facs-lead">Kirjoita omat esittäytymisfraasisi.
      Nämä lauseet ovat harjoitusmalleja, eivät autenttisen dialogin repliikkejä.</p>
    <div className="los-facs-c02-worksheet">
      <div><b>1. Kerro oma nimesi:</b><p lang="de">Ich heiße …</p>
        <span/><span/></div>
      <div><b>2. Kerro uudelle tuttavalle:</b><p lang="de">Ich bin …</p>
        <span/><span/></div>
      <div><b>3. Kysy toisen nimeä:</b><p lang="de">Wie heißt du?</p>
        <span/><span/></div>
      <div><b>4. Kirjoita lyhyt kahden henkilön keskustelu:</b>
        <span/><span/><span/><span/></div>
    </div>
    <p className="los-facs-source">Digikirjan vastaavat tehtävät tehdään
      ja arvioidaan normaalisti digikirjassa. Näköiskirjan sivu ei tallenna vastauksia.</p>
  </>;
  if(page.section==="culture")return <>
    <p className="los-facs-lead">{culture.note}</p>
    <div className="los-facs-culture-terms">
      <div><b lang="de">Herr Weiß</b>
        <p>Herr on sukunimen edellä kohtelias puhuttelu.</p></div>
      <div><b lang="de">Frau Müller</b>
        <p>Frau on vastaava puhuttelu. Oikea puhuttelumuoto huomioi henkilön toiveen.</p></div>
    </div>
    <h3>Tarkista ymmärtäminen</h3>
    <PaperQuestions items={culture.questions}/>
    <p className="los-facs-source">Lähde: {culture.sourceTitle}.
      {culture.sourceNote} Kulttuurikuva odottaa käyttöoikeuksien tarkistamista.</p>
  </>;
  if(page.section==="test")return <>
    <p className="los-facs-lead">Das kann ich schon! · Tarkista, miten hyvin
      osaat käyttää nimikysymyksiä ja <i lang="de">ich</i>/<i lang="de">du</i>-muotoja.</p>
    <PaperExercises ids={page.exerciseIds}/>
    <p className="los-facs-source">Vastaukset tarkistetaan
      digikirjassa tai myöhemmin kirjan takaosan ratkaisuluettelosta,
      ei tällä sivulla.</p>
  </>;
  if(page.section==="appendix")return <>
    <h3>Text A · M-WB-01</h3>
    <p>Wikibooks contributors: German/Level I/Wie heißt du? (1. Teil),
      kuuden repliikin Franz–Greta-keskustelu, vanha sivuversio 4430449
      (2.9.2024). CC BY-SA 4.0. Alkuperäinen teksti säilytetty;
      suomenkieliset käännökset ja tehtävät LOS!:n omia.</p>
    <p><a href="https://en.wikibooks.org/w/index.php?title=German/Level_I/Wie_heißt_du&oldid=4430449"
      target="_blank" rel="noreferrer">Alkuperäinen sivu</a>.
      <a href="https://creativecommons.org/licenses/by-sa/4.0/"
      target="_blank" rel="noreferrer"> Lisenssiehdot</a>.</p>
    <h3>Text B · M-COM-02</h3>
    <p>Ariser (7.9.2011): Deutsch Dialog . Ich bin Peter.ogg.
      Neljän repliikin tekstilitteraatti, CC BY-SA 3.0.</p>
    <p><a href="https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg"
      target="_blank" rel="noreferrer">Alkuperäinen äänitiedoston sivu</a>.
      <a href="https://creativecommons.org/licenses/by-sa/3.0/"
      target="_blank" rel="noreferrer"> Lisenssiehdot</a>.</p>
    <h3>Land und Leute</h3>
    <p>{culture.sourceTitle}.
      <a href={culture.sourceUrl} target="_blank" rel="noreferrer"> Lähde</a>.</p>
    <h3>Julkaisuportti</h3>
    <p>C02:n ensisijaisen lähteen tila: {sourceGate.sourceStage}.
      {sourceGate.ready?" Ensisijaisen tekstin julkaisuehdot on tarkistettu.":
        " Kieli- ja laitetestaus sekä julkaisun lopullinen hyväksyntä puuttuvat."}</p>
    <p>Tämä on 14 lehden C02-taittoluonnos. Sivunumerot, kuvat,
      mahdollisten äänten toisto ja painoprosessi tarkistetaan ennen koko kirjan julkaisua.</p>
  </>;
  return null;
}
function Leaf({page}:{page:LosC02PrintPage}){
  return <article className={"los-facs-leaf los-facs-"+page.kind+" los-facs-c02-leaf"}
    data-facsimile-page={page.pageId} data-physical-side={page.physicalSide}>
    <header className="los-facs-running">
      <span>LOS! 1 · SAB31</span><span>KAPITEL 02</span>
    </header>
    <div className="los-facs-page-content">
      {page.kind!=="chapter-open"&&<><span className="los-facs-section-name">
        {page.section==="text"?"TEXT A":page.section==="text-b"?"TEXT B":
          page.section==="appendix"?"QUELLEN":page.section.toLocaleUpperCase("fi")}</span>
        <h2>{page.title}</h2><p className="los-facs-subtitle">{page.subtitle}</p></>}
      <PaperPageBody page={page}/>
    </div>
    <footer className="los-facs-folio">
      <span>LOS! 1 · C02-TAITTOLUONNOS</span><span>Luonnoslehti {page.pdfPageIndex+1}</span>
    </footer>
  </article>;
}
export function Los1C02FacsimilePilot({onBack,onOpenDigital}:{
  onBack:()=>void;
  onOpenDigital:(section:LosC02PrintSection)=>void;
}){
  const [state,setState]=useState<ReaderState>({
    pageId:"c02-open-left",mode:"auto",zoom:100,
  });
  const [ready,setReady]=useState(false);
  const [wide,setWide]=useState(false);
  const [tocOpen,setTocOpen]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);
  const [query,setQuery]=useState("");
  const [bookmarks,setBookmarks]=useState<string[]>([]);
  const [jumpInput,setJumpInput]=useState("");
  const [jumpError,setJumpError]=useState("");
  const stageRef=useRef<HTMLDivElement>(null);
  const touchStart=useRef<{x:number;y:number;fingers:number;control:boolean}|null>(null);
  useEffect(()=>{
    setState(readState());setBookmarks(readBookmarks());setReady(true);
    const stage=stageRef.current;
    if(!stage)return;
    const update=()=>setWide(stage.clientWidth>=980);
    update();
    const observer=typeof ResizeObserver!=="undefined"?new ResizeObserver(update):null;
    observer?.observe(stage);
    window.addEventListener("resize",update);
    return()=>{observer?.disconnect();window.removeEventListener("resize",update);};
  },[]);
  useEffect(()=>{
    if(!ready)return;
    try{
      const key=ownerKey();
      if(key){localStorage.setItem(key,JSON.stringify(state));
        localStorage.setItem(key+".bookmarks",JSON.stringify(bookmarks));}
    }catch{/* Draft remains usable without local storage. */}
  },[state,bookmarks,ready]);
  const index=Math.max(0,pages.findIndex(p=>p.pageId===state.pageId));
  const actualMode=state.mode==="auto"?(wide?"spread":"single"):state.mode;
  const spread=actualMode==="spread"&&wide;
  const group=useMemo(()=>{
    if(actualMode==="continuous")return pages;
    if(!spread)return [pages[index]!];
    const first=index%2===0?index:index-1;
    return pages.slice(first,first+2);
  },[actualMode,spread,index]);
  const goTo=useCallback((next:number)=>{
    const n=Math.max(0,Math.min(pages.length-1,next));
    setState(old=>({...old,pageId:pages[n]!.pageId}));
  },[]);
  const next=useCallback(()=>{
    if(actualMode==="continuous")return;
    goTo(spread?Math.min(pages.length-1,(index%2===0?index:index-1)+2):index+1);
  },[actualMode,spread,index,goTo]);
  const previous=useCallback(()=>{
    if(actualMode==="continuous")return;
    goTo(spread?Math.max(0,(index%2===0?index:index-1)-2):index-1);
  },[actualMode,spread,index,goTo]);
  const onTouchStart=(event:ReactTouchEvent<HTMLDivElement>)=>{
    const touch=event.touches[0];
    touchStart.current=touch?{x:touch.clientX,y:touch.clientY,
      fingers:event.touches.length,
      control:Boolean((event.target as HTMLElement).closest("a,button,input,textarea,select"))}:null;
  };
  const onTouchEnd=(event:ReactTouchEvent<HTMLDivElement>)=>{
    const start=touchStart.current;touchStart.current=null;
    const touch=event.changedTouches[0];
    if(!start||!touch)return;
    const direction=getFacsimileSwipeDirection({
      startX:start.x,deltaX:touch.clientX-start.x,deltaY:touch.clientY-start.y,
      zoom:state.zoom,continuous:actualMode==="continuous",
      beganOnControl:start.control,fingers:start.fingers,
    });
    if(direction===1)next();else if(direction===-1)previous();
  };
  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{
      if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
      const target=event.target as HTMLElement;
      if(target.closest("input,textarea,select,button,a,[contenteditable=true]"))return;
      if(event.key==="ArrowRight"||event.key==="PageDown"){event.preventDefault();next();}
      if(event.key==="ArrowLeft"||event.key==="PageUp"){event.preventDefault();previous();}
      if(event.key==="Home"){event.preventDefault();goTo(0);}
      if(event.key==="End"){event.preventDefault();goTo(pages.length-1);}
      if(event.key==="Escape"){setTocOpen(false);setSearchOpen(false);}
    };
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[next,previous,goTo]);
  const searchResults=useMemo(()=>{
    const term=query.trim().toLocaleLowerCase("fi");
    if(!term)return [];
    return pages.filter(p=>{
      const text=p.section==="text"?dialogue.map(x=>x.text+" "+x.meaning).join(" "):
        p.section==="text-b"?textB.map(x=>x.text+" "+x.meaning).join(" "):
        p.section==="vocabulary"?chapter.vocabulary.join(" "):
        p.section==="practice"||p.section==="test"?
          p.exerciseIds.map(id=>exercises.find(q=>q.id===id)?.prompt??"").join(" "):"";
      return [p.title,p.subtitle,text].join(" ").toLocaleLowerCase("fi").includes(term);
    });
  },[query]);
  const jump=()=>{
    const num=Number(jumpInput);
    if(!/^[0-9]+$/.test(jumpInput.trim())||!Number.isInteger(num)||num<1||num>pages.length){
      setJumpError("C02-luonnoksessa on 14 lehteä.");return;
    }
    goTo(num-1);setJumpInput("");setJumpError("");
  };
  const saved=bookmarks.includes(pages[index]!.pageId);
  const toggleBookmark=()=>setBookmarks(old=>saved?
    old.filter(id=>id!==pages[index]!.pageId):[...old,pages[index]!.pageId]);
  return <section className="los-facs-reader los-facs-c02-reader"
    aria-label="LOS! 1:n C02-kappaleen 14 B5-sivun taittoluonnos">
    <div className="los-facs-toolbar">
      <div className="los-facs-toolbar-title"><BookOpen size={19}/>
        <div><strong>LOS! 1 · C02 Ich heiße …</strong>
          <small>14 B5-luonnossivua · ei valmis painos</small></div></div>
      <div className="los-facs-toolbar-actions">
        <button type="button" onClick={onBack}><ArrowLeft size={16}/> C01</button>
        <button type="button" aria-expanded={tocOpen} onClick={()=>{
          setTocOpen(v=>!v);setSearchOpen(false);}}><List size={17}/> Sisältö</button>
        <button type="button" aria-pressed={searchOpen} onClick={()=>{
          setSearchOpen(v=>!v);setTocOpen(false);}}><Search size={17}/> Hae</button>
        <button type="button" aria-pressed={saved} onClick={toggleBookmark}>
          <Bookmark size={17} fill={saved?"currentColor":"none"}/>
          {saved?"Merkitty":"Kirjanmerkki"}</button>
        <label className="los-facs-mode-label">Näkymä <select value={state.mode}
          onChange={e=>setState(v=>({...v,mode:e.target.value as ViewMode}))}>
          <option value="auto">Automaattinen</option><option value="single">Yksi sivu</option>
          <option value="spread">Aukeama</option><option value="continuous">Jatkuva</option></select></label>
        <button type="button" aria-label="Pienennä" disabled={state.zoom<=75}
          onClick={()=>setState(v=>({...v,zoom:safeZoom(v.zoom-25)}))}><Minus size={17}/></button>
        <output aria-label="Zoom">{state.zoom}%</output>
        <button type="button" aria-label="Suurenna" disabled={state.zoom>=200}
          onClick={()=>setState(v=>({...v,zoom:safeZoom(v.zoom+25)}))}><Plus size={17}/></button>
        <button type="button" className="los-facs-print-action" onClick={()=>window.print()}>
          <Printer size={17}/> Tulosta C02-luonnos</button>
      </div>
    </div>
    <p className="los-facs-honesty" role="status"><BookOpen size={16}/>
      Tämä on C02:n toimituksellinen taittopilotti. Text A ja Text B ovat
      kokonaisina lähteistä, mutta kielentarkistus, kuvat, media ja lopullinen
      painosivutus ovat kesken. Selaaminen ei kirjaa opiskelusuorituksia.
    </p>
    {searchOpen&&<section className="los-facs-search" aria-label="Haku C02-luonnoksesta">
      <label htmlFor="los-facs-c02-search">Hae C02:n luonnossivuilta</label>
      <div className="los-facs-search-entry">
        <input id="los-facs-c02-search" autoFocus value={query}
          onChange={e=>setQuery(e.target.value)} placeholder="Esim. Ich heiße"/>
        <button type="button" aria-label="Sulje haku"
          onClick={()=>setSearchOpen(false)}><X size={17}/></button>
      </div>
      {query.trim()&&<div className="los-facs-search-hits">
        {searchResults.length?searchResults.map(p=><button type="button" key={p.pageId}
          onClick={()=>{goTo(p.pdfPageIndex);setSearchOpen(false);}}>
          <strong>{p.title}</strong><small>Luonnoslehti {p.pdfPageIndex+1}</small></button>):
          <p>Ei hakutuloksia C02-luonnoksesta.</p>}
      </div>}
    </section>}
    {tocOpen&&<nav className="los-facs-toc" aria-label="C02-luonnoksen sisällysluettelo">
      {pages.map(p=><button type="button" key={p.pageId}
        onClick={()=>{goTo(p.pdfPageIndex);setTocOpen(false);}}>
        <span>{p.title}</span><small>Luonnoslehti {p.pdfPageIndex+1}</small></button>)}
      {bookmarks.map(id=>{const p=pages.find(x=>x.pageId===id);
        return p?<button type="button" key={"mark-"+id}
          onClick={()=>{goTo(p.pdfPageIndex);setTocOpen(false);}}>
          <Bookmark size={14}/>{p.title}</button>:null;})}
    </nav>}
    {state.mode==="spread"&&!wide&&<p className="los-facs-honesty" role="status">
      <Columns2 size={16}/> Näyttö on liian kapea kahden sivun lukemiseen.
      Näytetään yksi sivu.</p>}
    <div className={"los-facs-stage "+(actualMode==="continuous"?"is-continuous":"")}
      ref={stageRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      style={{"--los-facs-zoom":state.zoom/100} as CSSProperties}>
      <div className={"los-facs-leaves "+(group.length===2?"is-spread":"is-single")}
        aria-label="C02-kappaleen B5-sivut">
        {group.map(p=><div key={p.pageId} className="los-facs-sheet"
          data-leaf={p.pageId}><Leaf page={p}/></div>)}
      </div>
    </div>
    <div className="los-facs-bottom">
      <button type="button" disabled={index===0||actualMode==="continuous"}
        onClick={previous}><ChevronLeft size={18}/> Edellinen</button>
      <div className="los-facs-jump">
        <span>Luonnoslehti {index+1} / {pages.length} · Ei painettu sivunumero</span>
        <form onSubmit={e=>{e.preventDefault();jump();}}>
          <label htmlFor="los-facs-c02-jump">Siirry luonnoslehdelle</label>
          <input id="los-facs-c02-jump" inputMode="numeric" value={jumpInput}
            onChange={e=>{setJumpInput(e.target.value);setJumpError("");}}
            placeholder="1–14"/>
          <button type="submit">Siirry</button>
        </form>{jumpError&&<small role="alert">{jumpError}</small>}
      </div>
      <button type="button" disabled={index>=pages.length-1||actualMode==="continuous"}
        onClick={next}>Seuraava <ChevronRight size={18}/></button>
    </div>
    <div className="los-facs-return">
      <button type="button" onClick={()=>onOpenDigital(
        pages[index]!.section==="text-b-understand"?"text-b":
        pages[index]!.section==="appendix"?"appendix":pages[index]!.section)}>
        <BookOpen size={16}/> Avaa tämä osio C02-digikirjassa
      </button><span>Painettu luonnos ei tallenna vastauksia.</span>
    </div>
    <div className="los-facs-print-only" aria-hidden="true">
      {pages.map(p=><Leaf key={p.pageId} page={p}/>)}
    </div>
  </section>;
}
