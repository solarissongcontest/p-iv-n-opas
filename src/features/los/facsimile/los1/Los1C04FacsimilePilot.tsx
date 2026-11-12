import {useCallback,useEffect,useMemo,useRef,useState,
  type CSSProperties,type TouchEvent as ReactTouchEvent} from "react";
import {ArrowLeft,Bookmark,BookOpen,ChevronLeft,ChevronRight,
  Columns2,List,Minus,Plus,Printer,Search,X} from "lucide-react";
import {getDeviceOwnerId} from "@/lib/deviceSession";
import {getFacsimileSwipeDirection} from "./navigation";
import {
  LOS1_C04_PRINT_PAGES as pages,LOS1_C04_PRINT_CHAPTER as chapter,
  LOS1_C04_SOURCE as source,LOS1_C04_TEXT_A as textA,
  LOS1_C04_TEXT_B as textB,
  LOS1_C04_CULTURE as culture,LOS1_C04_EXERCISES as exercises,
  LOS1_C04_SOURCE_GATE as sourceGate,type LosC04PrintPage,type LosC04Section,
} from "./c04Pilot";
import "./facsimile.css";
import "./c04Pilot.css";

type Mode="auto"|"single"|"spread"|"continuous";
type State={pageId:string;mode:Mode;zoom:number};
const validModes:readonly Mode[]=["auto","single","spread","continuous"];
const keyForOwner=()=>{
  const owner=getDeviceOwnerId();
  return owner?"los.facsimile.c04.draft."+owner:null;
};
const boundedZoom=(n:number)=>Math.max(75,Math.min(200,n));
function loadDraftState():State{
  try{
    const key=keyForOwner();
    const raw:unknown=JSON.parse(key?localStorage.getItem(key)??"null":"null");
    if(raw&&typeof raw==="object"){
      const v=raw as Partial<State>;
      return {
        pageId:pages.some(p=>p.pageId===v.pageId)?v.pageId!:"c04-open-left",
        mode:validModes.includes(v.mode as Mode)?v.mode!:"auto",
        zoom:boundedZoom(typeof v.zoom==="number"&&Number.isFinite(v.zoom)?v.zoom:100),
      };
    }
  }catch{/* Keep reading without local storage. */}
  return {pageId:"c04-open-left",mode:"auto",zoom:100};
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
  return <ol className="los-facs-c04-exercises">{ids.map(id=>{
    const task=exercises.find(ex=>ex.id===id);
    if(!task)return null;
    return <li key={task.id} className="los-facs-c04-exercise">
      <strong className="los-facs-c04-exercise-id">{task.id.split("-").at(-1)}</strong>
      <div><small>{task.instruction}</small><p>{task.prompt}</p>
        {task.kind==="choice"&&task.options?
          <div className="los-facs-c04-choice">{task.options.map((option,i)=>
            <span key={option}><i aria-hidden="true"/>
              {String.fromCharCode(97+i)}) {option}</span>)}</div>:
          <div className="los-facs-c04-answer" aria-label="Vastausrivi"/>}
      </div>
    </li>;
  })}</ol>;
}
function PrintBody({page}:{page:LosC04PrintPage}){
  if(page.pageId==="c04-open-left")return <div className="los-facs-c04-splash">
    <span className="los-facs-c04-num">04</span>
    <p className="los-facs-chapter-label">KAPITEL VIER</p>
    <h2 lang="de">{chapter.title}</h2><p>{chapter.subtitle}</p>
    <div className="los-facs-c04-photo-space">
      <b>KUVAPAIKKA · ASIOINTI JA KOHTAAMINEN</b>
      <p>Tilanteeseen sopiva kuva lisätään vasta, kun kohde,
        kuvien käyttöoikeudet ja B5-painotarkkuus on vahvistettu.</p>
    </div>
  </div>;
  if(page.pageId==="c04-open-right")return <>
    <p className="los-facs-lead">Tutun kanssa saksaksi puhutellaan usein
      sanalla <i lang="de">du</i>. Kohteliaassa asioinnissa voit
      käyttää isolla kirjoitettua <i lang="de">Sie</i>-muotoa.</p>
    <h3>Das lernst du!</h3>
    <ul className="los-facs-goals">{chapter.objectives.map(goal=><li key={goal}>{goal}</li>)}</ul>
    <h3>Ennen tekstiä</h3>
    <div className="los-facs-note"><b>Vertaa</b>
      <p lang="de">Wie heißt du? / Wie heißen Sie?</p>
      <p>Tämä on LOS!:n opetusesimerkki, ei alkuperäisen Text A:n repliikki.</p>
    </div>
    <p>Puhuttelutapa riippuu suhteesta, tilanteesta ja toiveista.
      Henkilön ikä ei yksin ratkaise puhuttelua.</p>
  </>;
  if(page.section==="text")return <>
    <p className="los-facs-lead">{source.guidance}</p>
    <ol className="los-facs-dialogue los-facs-c04-dialogue">
      {textA.map(line=><li key={line.id}>
        <b>{line.speaker}</b><span lang="de">{line.text}</span>
        <small>{line.meaning}</small></li>)}
    </ol>
    <p className="los-facs-source">{source.sourceId} · Wikibooks, vanha
      sivuversio {source.revision}. Kaikki kahdeksan alkuperäistä repliikkiä;
      suomenkieliset merkitykset ovat erillistä opetustukea.</p>
  </>;
  if(page.section==="understand")return <>
    <p>Vastaa alkuperäiskeskustelun perusteella. Aineistossa näkyvät
      <i lang="de"> Ihnen</i> ja <i lang="de"> Herr</i> ovat
      tärkeitä kohteliaan puhuttelun tunnusmerkkejä.</p>
    <MultipleChoice items={source.questions.map(q=>({
      id:q.id,prompt:q.prompt,options:q.answers,
    }))}/>
    <div className="los-facs-note"><b>Etsi tekstistä</b>
      <p>{source.evidenceQuestion}</p>
      <p>Ympyröi tekstin <i lang="de">Ihnen</i>-muodot.</p>
    </div>
  </>;
  if(page.section==="vocabulary")return <>
    <p className="los-facs-lead">Nämä ovat kappaleen aktiiviset
      ilmaisut. Opettele erityisesti kohteliaan puhuttelun muodot.</p>
    <table className="los-facs-vocabulary"><thead><tr>
      <th lang="de">Deutsch</th><th>Suomeksi</th></tr></thead><tbody>
      {chapter.vocabulary.map((entry,index)=>{
        const [german,...meaning]=entry.split(" – ");
        return <tr key={index}><td lang="de">{german}</td><td>{meaning.join(" – ")}</td></tr>;
      })}
    </tbody></table>
    <p className="los-facs-source">Tekstin <i lang="de">Ich habe</i>,
      <i lang="de"> kann</i> ja muut pidemmät rakenteet
      ovat tässä tunnistettavaa tukisanastoa.</p>
  </>;
  if(page.section==="grammar")return <>
    <h3>1. du / Sie</h3>
    <p><i lang="de">du</i> on tuttavallinen sinä.
      <i lang="de"> Sie</i> on isolla alkukirjaimella kirjoitettu
      kohtelias Te. Myös verbin muoto vaihtuu.</p>
    <table className="los-facs-vocabulary"><thead><tr>
      <th>Rakenne</th><th lang="de">du</th><th lang="de">Sie</th>
    </tr></thead><tbody>
      <tr><td>Nimen kysyminen</td>
        <td lang="de">Wie heißt du?</td><td lang="de">Wie heißen Sie?</td></tr>
      <tr><td>Lähtöpaikka</td>
        <td lang="de">Woher kommst du?</td><td lang="de">Woher kommen Sie?</td></tr>
    </tbody></table>
    <h3>2. Verbimuotoja</h3>
    <table className="los-facs-vocabulary"><thead><tr>
      <th>Perusmuoto</th><th lang="de">du</th><th lang="de">Sie</th>
    </tr></thead><tbody>
      <tr><td lang="de">heißen</td><td lang="de">heißt</td><td lang="de">heißen</td></tr>
      <tr><td lang="de">kommen</td><td lang="de">kommst</td><td lang="de">kommen</td></tr>
    </tbody></table>
    <div className="los-facs-note"><b>Huomaa!</b>
      <p>Kohteliaan <i lang="de">Sie</i>-pronominin
        alkukirjain kirjoitetaan isolla myös keskellä virkettä.</p></div>
  </>;
  if(page.section==="grammar-comparison")return <>
    <p className="los-facs-lead">Valitse puhuttelu tilanteen ja
      toisen henkilön toiveen mukaan. Nämä ovat LOS!:n omia
      mallilauseita, eivät Text A:n alkuperäistekstiä.</p>
    <div className="los-facs-c04-register-grid">
      <div><b>du · tuttavallinen</b>
        <p lang="de">Hallo!</p>
        <p lang="de">Wie heißt du?</p>
        <p lang="de">Woher kommst du?</p>
        <p lang="de">Tschüss!</p>
      </div>
      <div><b>Sie · kohtelias</b>
        <p lang="de">Guten Tag!</p>
        <p lang="de">Wie heißen Sie?</p>
        <p lang="de">Woher kommen Sie?</p>
        <p lang="de">Auf Wiedersehen!</p>
      </div>
    </div>
    <h3>Harjoittele paperilla</h3>
    <p>Miten muuttaisit nämä kysymykset kohteliaiksi?
      Kirjoita vastaukset riveille.</p>
    <ol className="los-facs-c04-writing">
      <li><span lang="de">Wie heißt du?</span><i/></li>
      <li><span lang="de">Woher kommst du?</span><i/></li>
    </ol>
    <p>Selitä suomeksi, miksi puhuttelun valintaa ei voi
      ratkaista yksin keskustelijoiden iästä.</p>
    <div className="los-facs-c04-answer"/>
    <div className="los-facs-c04-answer"/>
  </>;
  if(page.section==="text-b")return <>
    <p className="los-facs-lead">{page.pageId==="c04-text-b-1"?
      "Alkuperäisen M-COM-03-äänitteen tervehdykset 1–10.":
      "Alkuperäisen M-COM-03-äänitteen tervehdykset 11–20."}
      {" "}Sama julkisen domainin 20 ilmauksen lista esiintyi C01:ssä.
      Tämä on luettelo, ei kahden henkilön dialogi.</p>
    <ol className="los-facs-c04-greetings" start={page.pdfPageIndex===7?1:11}>
      {textB.lines.filter(line=>page.sourceLineIds.includes(line.id))
        .map(line=><li key={line.id}><span lang="de">{line.text}</span>
          <small>{line.meaning}</small></li>)}
    </ol>
    <p className="los-facs-source">German Men92 ·
      <i> German Vocabulary - Greetings.ogg</i> · Public domain.
      Äänitteen iPhone-/tietokonetoistoa ei ole vielä hyväksytty.</p>
  </>;
  if(page.section==="text-b-understand")return <>
    <p>Vertaa listan ilmauksia sen mukaan, sopivatko
      ne tiettyyn kohteliaaseen tai tuttavalliseen tilanteeseen.
      Aineisto ei ole dialogi, eikä tällä sivulla arvioida
      vielä kuullun ymmärtämistä.</p>
    <MultipleChoice items={textB.questions}/>
    <div className="los-facs-note"><b>Huomaa alueellinen vaihtelu</b>
      <p>Esimerkiksi <i lang="de">Servus</i> ja
        <i lang="de"> Moin</i> esiintyvät erityisesti
        tietyillä saksankielisillä alueilla.</p>
    </div>
  </>;
  if(page.section==="practice"||page.section==="test")return <>
    {page.section==="test"&&<p className="los-facs-lead">
      Das kann ich schon! · Tarkista kohteliaan
      <i lang="de"> Sie</i>-muodon käyttäminen.</p>}
    <WorksheetTasks ids={page.exerciseIds}/>
    {page.section==="test"&&<p className="los-facs-source">
      Paperinen vastaus ei muuta digikirjan suorituspisteitä.</p>}
  </>;
  if(page.section==="apply")return <>
    <p className="los-facs-lead">Kirjoita kahden eri tilanteen
      esittäytymiset, toinen tutulle ja toinen viralliseen asiointiin.</p>
    <div className="los-facs-c04-worksheet">
      <div><b>1. Tuttu samanikäinen</b>
        <p lang="de">Hallo! Wie heißt du?</p><span/><span/><span/></div>
      <div><b>2. Uusi tuttavuus virallisessa tilanteessa</b>
        <p lang="de">Guten Tag! Wie heißen Sie?</p><span/><span/><span/></div>
      <div><b>3. Vaihda puhuttelumuotoa</b>
        <p>Kirjoita vielä yksi kysymys sekä du- että Sie-muodossa.</p>
        <span/><span/></div>
    </div>
  </>;
  if(page.section==="culture")return <>
    <p className="los-facs-lead">{culture.note}</p>
    <div className="los-facs-c04-register-grid">
      <div><b lang="de">duzen</b>
        <p>Sinutella, puhutella sanalla <i lang="de">du</i>.</p></div>
      <div><b lang="de">siezen</b>
        <p>Teititellä, puhutella kohteliaalla <i lang="de">Sie</i>-muodolla.</p></div>
    </div>
    <h3>Verstehen · Tilanteet</h3>
    <MultipleChoice items={culture.questions}/>
    <p className="los-facs-source">{culture.sourceTitle}.
      {culture.sourceNote} Yhteistä sääntöä kaikkiin tilanteisiin ei ole.</p>
  </>;
  if(page.section==="appendix")return <>
    <h3>Text A · {source.sourceId}</h3>
    <p>Wikibooks contributors · <i>{source.title}</i>.
      Kahdeksan repliikin Herr Schmidt–Herr Standish -dialogi,
      sivuversio {source.revision}. CC BY-SA 4.0.
      Alkuperäiset saksankieliset repliikit säilytetty;
      käännökset ja tehtävät ovat LOS!:n omia.</p>
    <p><a href={source.sourceUrl} target="_blank" rel="noreferrer">
      Alkuperäinen Wikibooks-sivu</a> ·
      <a href="https://creativecommons.org/licenses/by-sa/4.0/"
        target="_blank" rel="noreferrer"> CC BY-SA 4.0</a>.</p>
    <h3>Text B · {textB.sourceId}</h3>
    <p>{textB.attribution.author}, <i>{textB.attribution.title}</i>.
      Kaikki 20 alkuperäistä tervehdys- ja hyvästelyilmausta
      ovat kirjassa. {textB.attribution.license}.
      <b> Täsmälleen sama äänitelähde oli jo C01:ssä.</b>
      Alkuperäisestä tallenteesta ei väitetä uutta dialogia.</p>
    <p><a href={textB.attribution.url} target="_blank" rel="noreferrer">
      Tiedoston lähdesivu</a> ·
      <a href={textB.attribution.licenseUrl} target="_blank" rel="noreferrer">
        Lisenssitieto</a>.</p>
    <h3>Land und Leute</h3>
    <p>{culture.sourceTitle} ·
      <a href={culture.sourceUrl} target="_blank" rel="noreferrer">Lähde</a>.</p>
    <h3>Julkaisutilanne</h3>
    <p>Ensisijaisen Text A:n tila: {sourceGate.sourceStage}.
      {sourceGate.ready?" Lähteen hyväksynnät ovat voimassa.":
        " Kielentarkistus, mediatoiston testaus ja lopullinen julkaisu puuttuvat."}</p>
    <p>16 B5-luonnossivua ei ole koko LOS! 1:n
      lopullisesti sivunumeroitu painos. Valokuvien ja
      äänen käyttö sekä kaikki sivut pitää tarkastaa.</p>
  </>;
  return null;
}
function Leaf({page}:{page:LosC04PrintPage}){
  return <article className={"los-facs-leaf los-facs-"+page.kind+" los-facs-c04-leaf"}
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
      <span>LOS! 1 · C04-TAITTOLUONNOS</span><span>Luonnoslehti {page.pdfPageIndex+1}</span>
    </footer>
  </article>;
}
export function Los1C04FacsimilePilot({onBack,onOpenDigital}:{
  onBack:()=>void;
  onOpenDigital:(section:LosC04Section)=>void;
}){
  const [state,setState]=useState<State>({pageId:"c04-open-left",mode:"auto",zoom:100});
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
        p.section==="text-b"?textB.lines.filter(l=>p.sourceLineIds.includes(l.id))
          .map(l=>l.text+" "+l.meaning).join(" "):
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
      setJumpError("C04-luonnoksessa on 16 lehteä.");return;
    }
    goTo(number-1);setJumpValue("");setJumpError("");
  };
  const isBookmarked=bookmarks.includes(pages[index]!.pageId);
  const toggleBookmark=()=>setBookmarks(old=>isBookmarked?
    old.filter(id=>id!==pages[index]!.pageId):[...old,pages[index]!.pageId]);
  return <section className="los-facs-reader los-facs-c04-reader"
    aria-label="LOS! 1:n C04-kappaleen 16 B5-sivun taittoluonnos">
    <div className="los-facs-toolbar">
      <div className="los-facs-toolbar-title"><BookOpen size={19}/>
        <div><strong>LOS! 1 · C04 Woher kommst du?</strong>
          <small>16 B5-luonnossivua · ei valmis painos</small></div></div>
      <div className="los-facs-toolbar-actions">
        <button type="button" onClick={onBack}><ArrowLeft size={16}/> C03</button>
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
          onClick={()=>window.print()}><Printer size={17}/> Tulosta C04-luonnos</button>
      </div>
    </div>
    <p className="los-facs-honesty" role="status"><BookOpen size={16}/>
      C04 on keskeneräinen taittoluonnos: alkuperäistekstit ovat kokonaisia,
      mutta kielentarkistus, mediat, kuvat ja lopullinen sivutus odottavat.
      Text B on sama alkuperäinen 20 ilmauksen listalähde, joka esiteltiin C01:ssä.
    </p>
    {searchOpen&&<section className="los-facs-search" aria-label="Haku C04-luonnoksesta">
      <label htmlFor="los-facs-c04-search">Hae C04:n luonnossivuilta</label>
      <div className="los-facs-search-entry">
        <input id="los-facs-c04-search" autoFocus value={search}
          onChange={e=>setSearch(e.target.value)} placeholder="Esimerkiksi Woher"/>
        <button type="button" aria-label="Sulje haku"
          onClick={()=>setSearchOpen(false)}><X size={17}/></button>
      </div>
      {search.trim()&&<div className="los-facs-search-hits">
        {searchResults.length?searchResults.map(p=><button type="button" key={p.pageId}
          onClick={()=>{goTo(p.pdfPageIndex);setSearchOpen(false);}}>
          <strong>{p.title}</strong><small>Luonnoslehti {p.pdfPageIndex+1}</small></button>):
        <p>Ei hakutuloksia C04-luonnoksesta.</p>}
      </div>}
    </section>}
    {tocOpen&&<nav className="los-facs-toc" aria-label="C04-luonnoksen sisällysluettelo">
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
        aria-label="C04-kappaleen B5-sivut">
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
          <label htmlFor="los-facs-c04-jump">Siirry luonnoslehdelle</label>
          <input id="los-facs-c04-jump" value={jumpValue} inputMode="numeric"
            onChange={e=>{setJumpValue(e.target.value);setJumpError("");}}
            placeholder="1–16"/>
          <button type="submit">Siirry</button>
        </form>{jumpError&&<small role="alert">{jumpError}</small>}
      </div>
      <button type="button" disabled={index===pages.length-1||actualMode==="continuous"}
        onClick={next}>Seuraava <ChevronRight size={18}/></button>
    </div>
    <div className="los-facs-return">
      <button type="button" onClick={()=>onOpenDigital(
        pages[index]!.section==="text-b-understand"?"text-b":
        pages[index]!.section==="grammar-comparison"?"grammar":pages[index]!.section)}>
        <BookOpen size={16}/> Avaa sama osio C04-digikirjassa</button>
      <span>Taittoluonnos ei tallenna vastauksia eikä pisteitä.</span>
    </div>
    <div className="los-facs-print-only" aria-hidden="true">
      {pages.map(p=><Leaf key={p.pageId} page={p}/>)}
    </div>
  </section>;
}
