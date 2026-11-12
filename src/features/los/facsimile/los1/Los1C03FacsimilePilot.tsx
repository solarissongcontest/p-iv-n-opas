import {useCallback,useEffect,useMemo,useRef,useState,
  type CSSProperties,type TouchEvent as ReactTouchEvent} from "react";
import {ArrowLeft,Bookmark,BookOpen,ChevronLeft,ChevronRight,
  Columns2,List,Minus,Plus,Printer,Search,X} from "lucide-react";
import {getDeviceOwnerId} from "@/lib/deviceSession";
import {getFacsimileSwipeDirection} from "./navigation";
import {
  LOS1_C03_PRINT_PAGES as pages,LOS1_C03_PRINT_CHAPTER as chapter,
  LOS1_C03_SOURCE as source,LOS1_C03_TEXT_A as textA,
  LOS1_C03_TEXT_B as textB,LOS1_C03_SOURCE_QUESTIONS as sourceQuestions,
  LOS1_C03_TEXT_B_REVIEW_QUESTIONS as textBQuestions,
  LOS1_C03_CULTURE as culture,LOS1_C03_EXERCISES as exercises,
  LOS1_C03_SOURCE_GATE as sourceGate,type LosC03PrintPage,type LosC03Section,
} from "./c03Pilot";
import "./facsimile.css";
import "./c03Pilot.css";

type Mode="auto"|"single"|"spread"|"continuous";
type State={pageId:string;mode:Mode;zoom:number};
const validModes:readonly Mode[]=["auto","single","spread","continuous"];
const keyForOwner=()=>{
  const owner=getDeviceOwnerId();
  return owner?"los.facsimile.c03.draft."+owner:null;
};
const boundedZoom=(n:number)=>Math.max(75,Math.min(200,n));
function loadDraftState():State{
  try{
    const key=keyForOwner();
    const raw:unknown=JSON.parse(key?localStorage.getItem(key)??"null":"null");
    if(raw&&typeof raw==="object"){
      const v=raw as Partial<State>;
      return {
        pageId:pages.some(p=>p.pageId===v.pageId)?v.pageId!:"c03-open-left",
        mode:validModes.includes(v.mode as Mode)?v.mode!:"auto",
        zoom:boundedZoom(typeof v.zoom==="number"&&Number.isFinite(v.zoom)?v.zoom:100),
      };
    }
  }catch{/* Keep reading without local storage. */}
  return {pageId:"c03-open-left",mode:"auto",zoom:100};
}
function loadDraftBookmarks():string[]{
  try{
    const key=keyForOwner();
    const raw:unknown=JSON.parse(key?localStorage.getItem(key+".bookmarks")??"[]":"[]");
    return Array.isArray(raw)?raw.filter((id):id is string=>typeof id==="string"&&
      pages.some(page=>page.pageId===id)):[];
  }catch{return [];}
}

function MultipleChoice({items}:{items:readonly {
  id:string;prompt:string;options:readonly {id:string;text:string}[];
}[]}){
  return <ol className="los-facs-questions">{items.map((question,i)=>
    <li key={question.id} className="los-facs-question">
      <strong className="los-facs-question-number">{i+1}.</strong>
      <div><p>{question.prompt}</p><div className="los-facs-options">
        {question.options.map((option,j)=><span key={option.id}>
          <i aria-hidden="true"/> {String.fromCharCode(97+j)}) {option.text}
        </span>)}</div></div>
    </li>)}</ol>;
}
function WorksheetTasks({ids}:{ids:readonly string[]}){
  return <ol className="los-facs-c03-exercises">{ids.map(id=>{
    const task=exercises.find(ex=>ex.id===id);
    if(!task)return null;
    return <li key={task.id} className="los-facs-c03-exercise">
      <strong className="los-facs-c03-exercise-id">{task.id.split("-").at(-1)}</strong>
      <div><small>{task.instruction}</small><p>{task.prompt}</p>
        {task.kind==="choice"&&task.options?
          <div className="los-facs-c03-choice">{task.options.map((option,i)=>
            <span key={option}><i aria-hidden="true"/>
              {String.fromCharCode(97+i)}) {option}</span>)}</div>:
          <div className="los-facs-c03-answer" aria-label="Vastausrivi"/>}
      </div>
    </li>;
  })}</ol>;
}
function PrintBody({page}:{page:LosC03PrintPage}){
  if(page.pageId==="c03-open-left")return <div className="los-facs-c03-splash">
    <span className="los-facs-c03-num">03</span>
    <p className="los-facs-chapter-label">KAPITEL DREI</p>
    <h2 lang="de">{chapter.title}</h2>
    <p>{chapter.subtitle}</p>
    <div className="los-facs-c03-photo-space">
      <b>KUVAPAIKKA · DACH / KAUPUNKINÄKYMÄ</b>
      <p>Julkaisukelpoinen kuva valitaan vasta, kun tarkka kuvakohde,
      lisenssi ja B5-painotarkkuus on vahvistettu.</p>
    </div>
  </div>;
  if(page.pageId==="c03-open-right")return <>
    <p className="los-facs-lead">Mistä olet kotoisin? Opit kertomaan
      kotimaasi ja tunnistamaan lähtöpaikkaa tarkoittavan kysymyksen.</p>
    <h3>Das lernst du!</h3>
    <ul className="los-facs-goals">{chapter.objectives.map(goal=><li key={goal}>{goal}</li>)}</ul>
    <h3>Ennen tekstiä</h3>
    <p>Yhdistä jo tuntemasi nimi-ilmaus uuteen lauseeseen:</p>
    <div className="los-facs-note">
      <b lang="de">Ich heiße … / Ich komme aus Finnland.</b>
      <p>Ensimmäinen lause kertoo nimen, toinen lähtömaan.</p>
    </div>
    <p>Text A sisältää myös kohteliaan <i lang="de">Sie</i>-puhuttelun.
      Sen tarkempi opetus on vasta C04:ssä.</p>
  </>;
  if(page.section==="text")return <>
    <p className="los-facs-lead">{source.guidance}</p>
    <ol className="los-facs-dialogue los-facs-c03-dialogue">
      {textA.map(line=><li key={line.id}><b>{line.speaker}</b>
        <span lang="de">{line.text}</span><small>{line.meaning}</small>
      </li>)}
    </ol>
    <p className="los-facs-source">{source.sourceId} · Wikibooks
      (sivuversio {source.revision}). Koko kahdeksan repliikin
      alkuperäiskeskustelu; suomennokset ovat LOS!:n opetustukea.</p>
  </>;
  if(page.section==="understand")return <>
    <p>Vastaa keskustelun perusteella. Erota tekstin lähtömaa ja asuinpaikka.</p>
    <MultipleChoice items={sourceQuestions.map(q=>({
      id:q.id,prompt:q.prompt,options:q.answers,
    }))}/>
    <div className="los-facs-note"><b>Belegstelle · Todiste tekstistä</b>
      <p>{source.evidenceQuestion}</p>
      <p>Alleviivaa vastauksen sisältävä saksankielinen repliikki.</p>
    </div>
  </>;
  if(page.section==="vocabulary")return <>
    <p className="los-facs-lead">Aktiivisanasto kattaa kysymyssanat,
      lähtömaat ja kotipaikasta kertomisen.</p>
    <table className="los-facs-vocabulary"><thead><tr>
      <th lang="de">Deutsch</th><th>Suomeksi</th></tr></thead><tbody>
      {chapter.vocabulary.map((entry,i)=>{
        const [german,...meaning]=entry.split(" – ");
        return <tr key={i}><td lang="de">{german}</td><td>{meaning.join(" – ")}</td></tr>;
      })}
    </tbody></table>
    <p className="los-facs-source">Keskustelun tunnistussanastossa esiintyviä
      vaikeampia muotoja ei tarvitse vielä tuottaa itse.</p>
  </>;
  if(page.section==="grammar")return <>
    <h3>1. Kysy lähtöpaikka</h3>
    <table className="los-facs-vocabulary"><thead><tr>
      <th lang="de">Deutsch</th><th>Suomeksi</th></tr></thead><tbody>
      <tr><td lang="de">Woher kommst du?</td><td>Mistä olet kotoisin?</td></tr>
      <tr><td lang="de">Ich komme aus Finnland.</td><td>Olen kotoisin Suomesta.</td></tr>
    </tbody></table>
    <h3>2. kommen · ich ja du</h3>
    <table className="los-facs-vocabulary"><thead><tr>
      <th>Pronomini</th><th>Verbin muoto</th></tr></thead><tbody>
      <tr><td lang="de">ich</td><td lang="de">komme</td></tr>
      <tr><td lang="de">du</td><td lang="de">kommst</td></tr>
    </tbody></table>
    <h3>3. aus ja maannimet</h3>
    <p lang="de">aus Finnland · aus Deutschland · aus Österreich</p>
    <p>Sveitsi poikkeaa näistä: <b lang="de">aus der Schweiz</b>.
      Opettele tässä vaiheessa ilmaus kokonaisena.</p>
    <div className="los-facs-note"><b>Sanajärjestys</b>
      <p lang="de">Woher + kommst + du?</p>
      <p>Alkuperäisen Text A:n <i lang="de">Woher kommen Sie?</i>
        on kohtelias muoto, jota käsitellään C04:ssä.</p></div>
  </>;
  if(page.section==="text-b")return <>
    <p className="los-facs-lead">Tämä on täsmälleen sama
      M-COM-02-lähde, joka esiintyi C02:ssa. Nyt tavoitteena on tunnistaa
      mistä Thomas, Peter ja Takashi tulevat. Se ei ole uusi lähde.</p>
    <ol className="los-facs-dialogue">{textB.map(line=><li key={line.id}>
      <b>{line.speaker}</b><span lang="de">{line.text}</span>
      <small>{line.meaning}</small></li>)}</ol>
    <div className="los-facs-note"><b>Äänite</b>
      <p>Alkuperäinen M-COM-02-äänite on olemassa Commonsissa, mutta
        LOS!:n iPhone-/tietokonetoistoa ei ole hyväksytty. Koko
        tekstilitteraatti näkyy tässä suoraan kirjassa.</p></div>
    <p className="los-facs-source">Ariser (2011) · CC BY-SA 3.0,
      M-COM-02. Sama aineisto kuin C02:ssa.</p>
  </>;
  if(page.section==="text-b-understand")return <>
    <p>Vastaa alkuperäisen Text B:n pohjalta. Kysymykset ovat
      C02:ssa esitellyn lähteen kertauskysymyksiä; samat tunnisteet
      säilyvät eikä vastauksia kirjata uutena arviointina.</p>
    <MultipleChoice items={textBQuestions.map(q=>({
      id:q.id,prompt:q.question,options:q.options,
    }))}/>
    <div className="los-facs-note"><b>Etsi lähtöpaikka</b>
      <p lang="de">Wir kommen aus Berlin. / Ich komme aus Kyoto.</p>
      <p>Ympyröi molemmista lauseista lähtöpaikan kertova rakenne.</p>
    </div>
  </>;
  if(page.section==="practice"||page.section==="test")return <>
    {page.section==="test"&&<p className="los-facs-lead">
      Das kann ich schon! · Kertaa lähtömaat ja kommen-verbi.</p>}
    <WorksheetTasks ids={page.exerciseIds}/>
    {page.section==="test"&&<p className="los-facs-source">
      Digikirjan automaattinen arviointi ei käynnisty painettuja
      luonnossivuja selaamalla.</p>}
  </>;
  if(page.section==="apply")return <>
    <p className="los-facs-lead">Käytä kappaleen ilmauksia omassa,
      itse kirjoittamassasi esittäytymisessä.</p>
    <div className="los-facs-c03-worksheet">
      <div><b>1. Mistä olet kotoisin?</b><p lang="de">Ich komme aus …</p>
        <span/><span/></div>
      <div><b>2. Kysy toiselta lähtöpaikka.</b><p lang="de">Woher kommst du?</p>
        <span/><span/></div>
      <div><b>3. Kirjoita oma lähtömaasi saksaksi.</b>
        <span/><span/></div>
      <div><b>4. Kirjoita lyhyt keskustelu, jossa kysytään ja
        kerrotaan kahden ihmisen kotimaat.</b><span/><span/><span/><span/></div>
    </div>
    <p className="los-facs-source">Harjoituslauseet ovat LOS!:n
      itse tuottamaa opetusaineistoa, eivät lähteen alkuperäisiä repliikkejä.</p>
  </>;
  if(page.section==="culture")return <>
    <p className="los-facs-lead">{culture.note}</p>
    <div className="los-facs-culture-terms los-facs-c03-country-cards">
      <div><b lang="de">Deutschland</b><p>Saksa</p></div>
      <div><b lang="de">Österreich</b><p>Itävalta</p></div>
      <div><b lang="de">die Schweiz</b><p>Sveitsi, jossa on useita kielialueita</p></div>
    </div>
    <h3>Verstehen · Tarkista ymmärtäminen</h3>
    <MultipleChoice items={culture.questions}/>
    <p className="los-facs-source">Tausta-aineisto: {culture.sourceTitle}.
      {culture.sourceNote} DACH ei tarkoita kolmen maan muodostamaa
      yhtenäistä kulttuuria.</p>
  </>;
  if(page.section==="appendix")return <>
    <h3>Text A · {source.sourceId}</h3>
    <p>Wikibooks contributors · <i>{source.title}</i>,
      kahdeksan vuoron alkuperäinen Lisa Müllerin keskustelu,
      sivuversio {source.revision}. CC BY-SA 4.0.
      Alkuperäinen saksankielinen teksti säilytetty.
      Suomennokset ja opetusosiot ovat LOS!:n omia.</p>
    <p><a href={source.sourceUrl} target="_blank" rel="noreferrer">
      Alkuperäinen lähdesivu</a>.
      <a href="https://creativecommons.org/licenses/by-sa/4.0/"
      target="_blank" rel="noreferrer"> Lisenssi CC BY-SA 4.0</a>.</p>
    <h3>Text B · M-COM-02</h3>
    <p>Ariser (7.9.2011), <i>Deutsch Dialog . Ich bin Peter.ogg</i>,
      neljä alkuperäistä repliikkiä. CC BY-SA 3.0.
      Sama lähde kuin C02:ssa, ei uusi itsenäinen äänite.</p>
    <p><a href="https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg"
      target="_blank" rel="noreferrer">Alkuperäisen tiedoston sivu</a>.
      <a href="https://creativecommons.org/licenses/by-sa/3.0/"
      target="_blank" rel="noreferrer"> Lisenssi CC BY-SA 3.0</a>.</p>
    <h3>Land und Leute</h3>
    <p>{culture.sourceTitle} ·
      <a href={culture.sourceUrl} target="_blank" rel="noreferrer"> Lähde</a>.</p>
    <h3>Julkaisun esteet</h3>
    <p>C03:n lähteen tila: {sourceGate.sourceStage}.
      {sourceGate.ready?" Hyväksynnät on kirjattu.":
      " Kieli- ja tasotarkistus, laitetestaus sekä lopullinen julkaisu ovat kesken."}</p>
    <p>Tämä 14-lehtinen B5-taitto on luonnos. Kuvien, median
      toiston, sivukohtaisen taiton ja painovalmistuksen hyväksyntä puuttuu.</p>
  </>;
  return null;
}
function Leaf({page}:{page:LosC03PrintPage}){
  return <article className={"los-facs-leaf los-facs-"+page.kind+" los-facs-c03-leaf"}
    data-facsimile-page={page.pageId} data-physical-side={page.physicalSide}>
    <header className="los-facs-running"><span>LOS! 1 · SAB31</span><span>KAPITEL 03</span></header>
    <div className="los-facs-page-content">
      {page.kind!=="chapter-open"&&<><span className="los-facs-section-name">{
        page.section==="text"?"TEXT A":page.section==="text-b"?"TEXT B":
        page.section==="appendix"?"QUELLEN":page.section.toLocaleUpperCase("fi")}</span>
        <h2>{page.title}</h2><p className="los-facs-subtitle">{page.subtitle}</p></>}
      <PrintBody page={page}/>
    </div>
    <footer className="los-facs-folio">
      <span>LOS! 1 · C03-TAITTOLUONNOS</span><span>Luonnoslehti {page.pdfPageIndex+1}</span>
    </footer>
  </article>;
}
export function Los1C03FacsimilePilot({onBack,onOpenDigital,onOpenC04}:{
  onBack:()=>void;
  onOpenC04:()=>void;
  onOpenDigital:(section:LosC03Section)=>void;
}){
  const [state,setState]=useState<State>({pageId:"c03-open-left",mode:"auto",zoom:100});
  const [ready,setReady]=useState(false);
  const [wide,setWide]=useState(false);
  const [tocOpen,setTocOpen]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);
  const [search,setSearch]=useState("");
  const [bookmarks,setBookmarks]=useState<string[]>([]);
  const [jumpValue,setJumpValue]=useState("");
  const [jumpError,setJumpError]=useState("");
  const stageRef=useRef<HTMLDivElement>(null);
  const touchStart=useRef<{x:number;y:number;fingers:number;control:boolean}|null>(null);
  useEffect(()=>{
    setState(loadDraftState());setBookmarks(loadDraftBookmarks());setReady(true);
    const stage=stageRef.current;if(!stage)return;
    const update=()=>setWide(stage.clientWidth>=980);
    update();
    const observer=typeof ResizeObserver!=="undefined"?new ResizeObserver(update):null;
    observer?.observe(stage);window.addEventListener("resize",update);
    return()=>{observer?.disconnect();window.removeEventListener("resize",update);};
  },[]);
  useEffect(()=>{
    if(!ready)return;
    try{
      const key=keyForOwner();
      if(key){localStorage.setItem(key,JSON.stringify(state));
        localStorage.setItem(key+".bookmarks",JSON.stringify(bookmarks));}
    }catch{/* Draft still works with localStorage disabled. */}
  },[state,bookmarks,ready]);
  const index=Math.max(0,pages.findIndex(p=>p.pageId===state.pageId));
  const actualMode=state.mode==="auto"?(wide?"spread":"single"):state.mode;
  const spread=actualMode==="spread"&&wide;
  const visible=useMemo(()=>{
    if(actualMode==="continuous")return pages;
    if(!spread)return [pages[index]!];
    const start=index%2===0?index:index-1;
    return pages.slice(start,start+2);
  },[actualMode,spread,index]);
  const goTo=useCallback((nextIndex:number)=>{
    const limited=Math.max(0,Math.min(pages.length-1,nextIndex));
    setState(old=>({...old,pageId:pages[limited]!.pageId}));
  },[]);
  const next=useCallback(()=>{
    if(actualMode==="continuous")return;
    goTo(spread?Math.min(pages.length-1,(index%2===0?index:index-1)+2):index+1);
  },[actualMode,spread,index,goTo]);
  const previous=useCallback(()=>{
    if(actualMode==="continuous")return;
    goTo(spread?Math.max(0,(index%2===0?index:index-1)-2):index-1);
  },[actualMode,spread,index,goTo]);
  const searchResults=useMemo(()=>{
    const needle=search.trim().toLocaleLowerCase("fi");
    if(!needle)return [];
    return pages.filter(p=>{
      const body=p.section==="text"?textA.map(l=>l.text+" "+l.meaning).join(" "):
        p.section==="text-b"?textB.map(l=>l.text+" "+l.meaning).join(" "):
        p.section==="vocabulary"?chapter.vocabulary.join(" "):
        p.section==="practice"||p.section==="test"?
          p.exerciseIds.map(id=>exercises.find(q=>q.id===id)?.prompt??"").join(" "):
        p.section==="culture"?culture.note:"";
      return [p.title,p.subtitle,body].join(" ").toLocaleLowerCase("fi").includes(needle);
    });
  },[search]);
  const swipeStart=(event:ReactTouchEvent<HTMLDivElement>)=>{
    const touch=event.touches[0];touchStart.current=touch?{
      x:touch.clientX,y:touch.clientY,fingers:event.touches.length,
      control:Boolean((event.target as HTMLElement)
        .closest("button,a,input,textarea,select"))}:null;
  };
  const swipeEnd=(event:ReactTouchEvent<HTMLDivElement>)=>{
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
      if(event.altKey||event.ctrlKey||event.shiftKey||event.metaKey)return;
      const target=event.target as HTMLElement;
      if(target.closest("button,a,input,textarea,select,[contenteditable=true]"))return;
      if(["ArrowRight","PageDown"].includes(event.key)){event.preventDefault();next();}
      if(["ArrowLeft","PageUp"].includes(event.key)){event.preventDefault();previous();}
      if(event.key==="Home"){event.preventDefault();goTo(0);}
      if(event.key==="End"){event.preventDefault();goTo(pages.length-1);}
      if(event.key==="Escape"){setTocOpen(false);setSearchOpen(false);}
    };
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[goTo,next,previous]);
  const jump=()=>{
    const number=Number(jumpValue);
    if(!/^\d+$/.test(jumpValue.trim())||!Number.isInteger(number)||
      number<1||number>pages.length){
      setJumpError("C03-luonnoksessa on 14 lehteä.");return;
    }
    goTo(number-1);setJumpValue("");setJumpError("");
  };
  const isBookmarked=bookmarks.includes(pages[index]!.pageId);
  const toggleBookmark=()=>setBookmarks(old=>isBookmarked?
    old.filter(id=>id!==pages[index]!.pageId):[...old,pages[index]!.pageId]);
  return <section className="los-facs-reader los-facs-c03-reader"
    aria-label="LOS! 1:n C03-kappaleen 14 B5-sivun taittoluonnos">
    <div className="los-facs-toolbar">
      <div className="los-facs-toolbar-title"><BookOpen size={19}/>
        <div><strong>LOS! 1 · C03 Woher kommst du?</strong>
          <small>14 B5-luonnossivua · ei valmis painos</small></div></div>
      <div className="los-facs-toolbar-actions">
        <button type="button" onClick={onBack}><ArrowLeft size={16}/> C02</button>
        <button type="button" aria-expanded={tocOpen} onClick={()=>{
          setTocOpen(v=>!v);setSearchOpen(false);}}><List size={17}/> Sisältö</button>
        <button type="button" aria-pressed={searchOpen} onClick={()=>{
          setSearchOpen(v=>!v);setTocOpen(false);}}><Search size={17}/> Hae</button>
        <button type="button" aria-pressed={isBookmarked} onClick={toggleBookmark}>
          <Bookmark size={17} fill={isBookmarked?"currentColor":"none"}/>
          {isBookmarked?"Merkitty":"Kirjanmerkki"}</button>
        <label className="los-facs-mode-label">Näkymä <select value={state.mode}
          onChange={e=>setState(v=>({...v,mode:e.target.value as Mode}))}>
          <option value="auto">Automaattinen</option><option value="single">Yksi sivu</option>
          <option value="spread">Aukeama</option><option value="continuous">Jatkuva</option>
        </select></label>
        <button type="button" disabled={state.zoom<=75} aria-label="Pienennä"
          onClick={()=>setState(v=>({...v,zoom:boundedZoom(v.zoom-25)}))}>
          <Minus size={17}/></button>
        <output aria-label="Zoom">{state.zoom}%</output>
        <button type="button" disabled={state.zoom>=200} aria-label="Suurenna"
          onClick={()=>setState(v=>({...v,zoom:boundedZoom(v.zoom+25)}))}>
          <Plus size={17}/></button>
        <button type="button" className="los-facs-print-action"
          onClick={()=>window.print()}><Printer size={17}/> Tulosta C03-luonnos</button>
      </div>
    </div>
    <p className="los-facs-honesty" role="status"><BookOpen size={16}/>
      C03 on keskeneräinen taittoluonnos: alkuperäistekstit ovat kokonaisia,
      mutta kielentarkistus, mediat, kuvat ja lopullinen sivutus odottavat.
      C02:n Text B on sama lähde, jota käytetään nyt uudelleen.
    </p>
    {searchOpen&&<section className="los-facs-search" aria-label="Haku C03-luonnoksesta">
      <label htmlFor="los-facs-c03-search">Hae C03:n luonnossivuilta</label>
      <div className="los-facs-search-entry">
        <input id="los-facs-c03-search" autoFocus value={search}
          onChange={e=>setSearch(e.target.value)} placeholder="Esimerkiksi Woher"/>
        <button type="button" aria-label="Sulje haku"
          onClick={()=>setSearchOpen(false)}><X size={17}/></button>
      </div>
      {search.trim()&&<div className="los-facs-search-hits">
        {searchResults.length?searchResults.map(p=><button type="button" key={p.pageId}
          onClick={()=>{goTo(p.pdfPageIndex);setSearchOpen(false);}}>
          <strong>{p.title}</strong><small>Luonnoslehti {p.pdfPageIndex+1}</small></button>):
        <p>Ei hakutuloksia C03-luonnoksesta.</p>}
      </div>}
    </section>}
    {tocOpen&&<nav className="los-facs-toc" aria-label="C03-luonnoksen sisällysluettelo">
      {pages.map(p=><button type="button" key={p.pageId}
        onClick={()=>{goTo(p.pdfPageIndex);setTocOpen(false);}}>
        <span>{p.title}</span><small>Luonnoslehti {p.pdfPageIndex+1}</small></button>)}
      {bookmarks.map(id=>{const p=pages.find(x=>x.pageId===id);
        return p?<button type="button" key={"bookmark-"+id}
          onClick={()=>{goTo(p.pdfPageIndex);setTocOpen(false);}}>
          <Bookmark size={14}/>{p.title}</button>:null;})}
    </nav>}
    {state.mode==="spread"&&!wide&&<p className="los-facs-honesty">
      <Columns2 size={16}/> Näyttö on liian kapea luettavaan aukeamaan.
      Näytetään yksi sivu.</p>}
    <div ref={stageRef} onTouchStart={swipeStart} onTouchEnd={swipeEnd}
      className={"los-facs-stage "+(actualMode==="continuous"?"is-continuous":"")}
      style={{"--los-facs-zoom":state.zoom/100} as CSSProperties}>
      <div className={"los-facs-leaves "+(visible.length===2?"is-spread":"is-single")}
        aria-label="C03-kappaleen B5-sivut">
        {visible.map(p=><div key={p.pageId} className="los-facs-sheet" data-leaf={p.pageId}>
          <Leaf page={p}/></div>)}
      </div>
    </div>
    <div className="los-facs-bottom">
      <button type="button" onClick={previous} disabled={index===0||actualMode==="continuous"}>
        <ChevronLeft size={18}/> Edellinen</button>
      <div className="los-facs-jump">
        <span>Luonnoslehti {index+1} / {pages.length} · Ei painettu sivunumero</span>
        <form onSubmit={e=>{e.preventDefault();jump();}}>
          <label htmlFor="los-facs-c03-jump">Siirry luonnoslehdelle</label>
          <input id="los-facs-c03-jump" value={jumpValue} inputMode="numeric"
            onChange={e=>{setJumpValue(e.target.value);setJumpError("");}}
            placeholder="1–14"/>
          <button type="submit">Siirry</button>
        </form>{jumpError&&<small role="alert">{jumpError}</small>}
      </div>
      <button type="button" disabled={index===pages.length-1||actualMode==="continuous"}
        onClick={next}>Seuraava <ChevronRight size={18}/></button>
    </div>
    <div className="los-facs-return">
      <button type="button" onClick={onOpenC04}><BookOpen size={16}/> Siirry C04-kappaleen taittoluonnokseen</button>
      <button type="button" onClick={()=>onOpenDigital(
        pages[index]!.section==="text-b-understand"?"text-b":pages[index]!.section)}>
        <BookOpen size={16}/> Avaa sama osio C03-digikirjassa</button>
      <span>Taittoluonnos ei tallenna vastauksia eikä pisteitä.</span>
    </div>
    <div className="los-facs-print-only" aria-hidden="true">
      {pages.map(p=><Leaf key={p.pageId} page={p}/>)}
    </div>
  </section>;
}
