import {useCallback,useEffect,useMemo,useState,type CSSProperties} from "react";
import {
  ArrowLeft,BookOpen,ChevronLeft,ChevronRight,
  Columns2,FileText,List,Minus,Plus,Printer,
} from "lucide-react";
import {getDeviceOwnerId} from "@/lib/deviceSession";
import {
  LOS1_C01_FACSIMILE_CHAPTER as chapter,
  LOS1_C01_FACSIMILE_CULTURE as culture,
  LOS1_C01_FACSIMILE_DIALOGUE as dialogue,
  LOS1_C01_FACSIMILE_EXERCISES as exercises,
  LOS1_C01_FACSIMILE_PAGES as pages,
  LOS1_C01_FACSIMILE_QUESTIONS as questions,
  LOS1_C01_FACSIMILE_TEXT_B as textB,
  LOS1_FACSIMILE_PILOT_ID,
  type LosFacsimilePage,
  type LosFacsimileSection,
} from "./c01Pilot";
import "./facsimile.css";

type ViewMode="auto"|"single"|"spread"|"continuous";
type ReaderState={pageId:string;mode:ViewMode;zoom:number};
const storageKey=()=> {
  const id=getDeviceOwnerId();
  return id?"los.facsimile.c01.draft."+id:null;
};
const zoomLimit=(z:number)=>Math.min(200,Math.max(75,z));
const isMode=(v:unknown):v is ViewMode=>["auto","single","spread","continuous"].includes(String(v));
function readState():ReaderState{
  try{
    const key=storageKey();
    const raw=key?localStorage.getItem(key):null;
    if(raw){
      const input=JSON.parse(raw) as Partial<ReaderState>;
      return {
        pageId:pages.some(p=>p.pageId===input.pageId)?input.pageId!:"cover",
        mode:isMode(input.mode)?input.mode:"auto",
        zoom:zoomLimit(typeof input.zoom==="number"&&Number.isFinite(input.zoom)?input.zoom:100),
      };
    }
  }catch{/* Private/denied localStorage: reader still works in memory. */}
  return {pageId:"cover",mode:"auto",zoom:100};
}
function PaperQuestion({number,prompt,options,fill=false}:{
 number:number;prompt:string;options?:readonly string[];fill?:boolean;
}){
  return <li className="los-facs-question">
    <strong className="los-facs-question-number">{number}.</strong>
    <div><p>{prompt}</p>
      {options?.length?<div className="los-facs-options">{options.map((option,i)=>
        <span key={i} lang="de"><i aria-hidden="true"/> {String.fromCharCode(97+i)}) {option}</span>)}</div>:
        <div className="los-facs-answer-line" aria-label={fill?"Kirjoita vastaus":"Vastaustila"}/>}
    </div>
  </li>;
}
function PaperPageBody({page}:{page:LosFacsimilePage}){
  if(page.kind==="front-cover")return <img
    className="los-facs-cover-image" src="/los/los-1-cover.jpeg"
    alt="Hyväksytty LOS! 1 -oppikirjan etukansi" draggable={false}/>;
  if(page.kind==="inside-cover")return <div className="los-facs-inside">
    <span>LOS! 1</span><h2>Kirjan ensimmäisen luvun näköiskirjapilotti</h2>
    <p>Tämä ei ole koko kirjan painos. Sivut ovat B5-kokoisia suunnittelusivuja;
      painettuja sivunumeroita, kaikkien kuvien käyttöoikeuksia tai painotalon
      hyväksyntää ei ole vielä vahvistettu.</p>
    <p>Samojen harjoitusten vastaukset ja suoritusmerkinnät tehdään edelleen
      interaktiivisessa digikirjassa. Paperisivujen selaaminen ei arvioi osaamista.</p>
  </div>;
  if(page.pageId==="c01-open-left")return <div className="los-facs-chapter-splash">
    <span className="los-facs-chapter-num">01</span>
    <p className="los-facs-chapter-label">KAPITEL EINS</p>
    <h2 lang="de">{chapter.title}</h2>
    <p>{chapter.subtitle}</p>
    <div className="los-facs-photo-gate">
      <span>Toimituksellinen kuvapaikka</span>
      <small>Avauskuvan käyttöoikeus, kuvan alkuperä ja painoresoluutio ovat vielä tarkistamatta.</small>
    </div>
  </div>;
  if(page.pageId==="c01-open-right")return <>
    <p className="los-facs-lead">Ensimmäinen kohtaaminen alkaa tervehdyksestä. Kappaleessa tutustut
      lyhyeen oikeaan saksankieliseen keskusteluun sekä harjoittelet tilanteeseen sopivia ilmauksia.</p>
    <h3>Das lernst du! · Mitä opit?</h3>
    <ul className="los-facs-goals">{chapter.objectives.map(x=><li key={x}>{x}</li>)}</ul>
    <h3>Ennen kuin luet</h3>
    <p>Miten sanoisit suomeksi hei, hyvää huomenta ja moikka? Mieti,
      milloin käytät kutakin. Saksassa on samoin erilaisia tapoja tervehtiä.</p>
    <div className="los-facs-note"><b>Huomaa</b><p>Et tarvitse aiempaa saksan taitoa.
      Lue aluksi teksti kokonaisena. Kaikkia siinä esiintyviä muotoja ei
      tarvitse vielä osata itse muodostaa.</p></div>
  </>;
  if(page.section==="text")return <>
    <p className="los-facs-lead">Koko alkuperäinen keskustelu. Lue ensin saksaksi; suomennokset
      auttavat ymmärtämään. Ikää koskevia muotoja opetellaan tarkemmin vasta myöhemmin.</p>
    <ol className="los-facs-dialogue">{dialogue.map(line=><li key={line.id}>
      <b>{line.speaker}</b><span lang="de">{line.text}</span>
      <small>{line.meaning}</small></li>)}</ol>
    <p className="los-facs-source">Alkuperäinen lähde {page.mediaIds[0]}: Xzapro4 ja Erkan Yilmaz,
      GesprächVorstellung.ogg (2008). CC BY-SA 3.0.</p>
  </>;
  if(page.section==="understand")return <>
    <p>Lue Text A ja vastaa sen perusteella. Tehtävät ovat samat
      kuin digikirjassa, mutta tässä vastaukset merkitään paperille.</p>
    <ol className="los-facs-questions">{questions.map((q,i)=>
      <PaperQuestion key={q.id} number={i+1} prompt={q.prompt}
        options={q.options.map(o=>o.text)}/>)}</ol>
    <div className="los-facs-note"><b>Etsi tekstistä</b><p>Missä puheenvuorossa Franz sanoo
      <i lang="de"> Bis später!</i>? Merkitse repliikin numero: ________</p></div>
  </>;
  if(page.section==="vocabulary")return <>
    <p className="los-facs-lead">Harjoittele ensiksi kokonaisia tervehdyksiä ja hyvästelyjä.</p>
    <table className="los-facs-vocabulary"><thead><tr>
      <th lang="de">Deutsch</th><th>Suomeksi</th></tr></thead><tbody>
      {chapter.vocabulary.map((item,i)=>{
        const split=item.split(" – ");
        return <tr key={i}><td lang="de">{split[0]}</td><td>{split.slice(1).join(" – ")}</td></tr>;
      })}
    </tbody></table>
  </>;
  if(page.section==="grammar")return <>
    <h3>Tervehdykset opitaan kokonaisina</h3>
    <p>Saksan alussa riittää, että tunnet tilanteeseen sopivan ilmauksen.
      Sen yksittäisiä taivutusmuotoja ei tarvitse vielä selittää.</p>
    <table className="los-facs-vocabulary"><thead><tr><th lang="de">Deutsch</th><th>Tilanne</th></tr></thead>
    <tbody><tr><td lang="de">Guten Morgen!</td><td>Aamulla</td></tr>
      <tr><td lang="de">Guten Tag!</td><td>Päivällä</td></tr>
      <tr><td lang="de">Guten Abend!</td><td>Illalla</td></tr></tbody></table>
    <h3>Ensimmäisiä ääntämisen havaintoja</h3>
    <table className="los-facs-vocabulary"><thead><tr><th>Merkki</th><th>Ääntämisen tuki</th></tr></thead><tbody>
      <tr><td lang="de">w</td><td>Useimmiten suomen v, esim. <i lang="de">wie</i></td></tr>
      <tr><td lang="de">z</td><td>ts, esim. <i lang="de">zehn</i></td></tr>
      <tr><td lang="de">ei</td><td>ai, esim. <i lang="de">mein</i></td></tr>
      <tr><td lang="de">ie</td><td>Pitkä i, esim. <i lang="de">wie</i></td></tr>
      <tr><td lang="de">sch</td><td>š, esim. <i lang="de">Schule</i></td></tr>
    </tbody></table>
    <div className="los-facs-note"><b>Merke! / Muista!</b><p>Saksan substantiivit
      kirjoitetaan isolla alkukirjaimella. Ä, ö, ü ja ß tulevat tutuiksi vähitellen.</p></div>
  </>;
  if(page.section==="text-b")return <>
    <p>Kokonainen julkaistu tervehdys- ja hyvästelyluettelo. Tämä on ihmisen ääneen
      lukema lista, ei kahden henkilön välinen keskustelu. Äänitteen toimivuus
      omalla laitteella on vielä erikseen tarkistettava.</p>
    <ol className="los-facs-b-lines" start={page.pageId==="c01-text-b-2"?11:1}>
      {textB.lines.filter(line=>page.sourceLineIds.includes(line.id)).map(line=>
        <li key={line.id}><span lang="de">{line.text}</span><small>{line.meaning}</small></li>)}
    </ol>
    <p className="los-facs-source">M-COM-03 · German Men92,
      German Vocabulary - Greetings.ogg, public domain.
      Alkuperäinen ääni avataan interaktiivisen digikirjan soittimesta.</p>
  </>;
  if(page.section==="practice"||page.section==="test"){
    const subset=exercises.filter(ex=>page.exerciseIds.includes(ex.id));
    return <>
      <p>{page.section==="test"
        ?"Vastaa ilman sanastoa. Tämä on harjoituskirjan paperinen testisivun pilotti; itsenäinen digitaalinen kappaletesti tehdään LOS!:n diginäkymässä."
        :"Harjoittele tervehdyksiä. Ympyröi sopiva vaihtoehto tai kirjoita sana viivalle."}</p>
      <ol className="los-facs-questions">{subset.map((ex,i)=>
        <PaperQuestion key={ex.id} number={i+1}
          prompt={ex.prompt} options={ex.kind==="choice"?ex.options:undefined} fill={ex.kind==="fill"}/>)}
      </ol>
      {page.section==="test"&&<p className="los-facs-source">Digikirjan tehtävätunnukset: {subset.map(ex=>ex.id).join(", ")}.
        Vastausten tarkistus ja tulokset vain digikirjassa.</p>}
    </>;
  }
  if(page.section==="apply")return <>
    <h3>Tervehdi ja hyvästele</h3>
    <p>Kuvittele, että tulet koululle aamulla ja tapaat opettajan.
      Myöhemmin hyvästelet tutun ystävän. Kirjoita molempiin tilanteisiin
      sopiva saksankielinen ilmaus omille riveilleen.</p>
    <div className="los-facs-writing"><label>Aamulla</label><span/>
      <label>Hyvästely</label><span/></div>
    <h3>Itsearvioi</h3><ul className="los-facs-checklist">
      <li>Valitsinko aamun tervehdyksen?</li>
      <li>Onko hyvästely tuttavallinen?</li>
      <li>Kirjoitinko ison alkukirjaimen ja tarvittavat merkit?</li>
    </ul>
    <p className="los-facs-source">Paperin täyttäminen ei tallenna
      vastausta digikirjaan. Sama kirjoitustehtävä löytyy C01 / Käytä saksaa -sivulta.</p>
  </>;
  if(page.section==="culture")return <>
    <p className="los-facs-lead">{culture.note}</p>
    <div className="los-facs-culture-terms">
      <div><b lang="de">Moin!</b><p>Pohjois-Saksaan yhdistetty tervehdys,
        jota voi kuulla muulloinkin kuin aamulla.</p></div>
      <div><b lang="de">Servus!</b><p>Tuttavallinen alueellinen tervehdys,
        jota käytetään myös hyvästelynä.</p></div>
    </div>
    <h3>Tarkista ymmärtäminen</h3>
    <ol className="los-facs-questions">{culture.questions.map((q,i)=>
      <PaperQuestion key={q.id} number={i+1} prompt={q.prompt}
        options={q.options.map(o=>o.text)}/>)}</ol>
    <p className="los-facs-source">Lähde: {culture.sourceTitle}.
      {culture.sourceNote}</p>
  </>;
  if(page.section==="appendix")return <>
    <p>Tässä C01-pilotissa käytetyt alkuperäiset saksankieliset
      aineistot säilyvät muuttamattomina. Suomenkieliset opetustekstit,
      selitykset ja harjoitukset ovat LOS!:n omia.</p>
    <h3>Text A · M-COM-01</h3>
    <p>Franz ja Jörg: GesprächVorstellung.ogg, Xzapro4 ja Erkan Yilmaz,
      29.6.2008. CC BY-SA 3.0.
      <a href="https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg"
        target="_blank" rel="noreferrer"> Alkuperäinen tiedostosivu</a>.
      <a href="https://creativecommons.org/licenses/by-sa/3.0/"
        target="_blank" rel="noreferrer"> Lisenssin ehdot</a>.</p>
    <h3>Text B · M-COM-03</h3>
    <p>German Men92: German Vocabulary - Greetings.ogg.
      Tekijän julkisen domainin lähdetiedosto.
      <a href={textB.attribution.url} target="_blank" rel="noreferrer"> Lähde</a>.
      <a href={textB.attribution.licenseUrl} target="_blank" rel="noreferrer"> Lisenssitiedot</a>.</p>
    <h3>Land und Leute</h3>
    <p>{culture.sourceTitle}.
      <a href={culture.sourceUrl} target="_blank" rel="noreferrer"> Lähde</a>.
      Kulttuuriteksti on alkuperäinen LOS!-selitys.</p>
    <h3>Julkaisuportti</h3>
    <p>Painettu näköiskirja on vasta C01-luonnos: sivunumerot,
      kuvamateriaalin hyväksyntä, täydellinen saksan pedagoginen tarkistus,
      B5-PDF:n renderöintitesti ja paino-PDF puuttuvat. Älä käsittele
      tätä koko kirjan valmiina julkaisuna.</p>
  </>;
  return null;
}
function FacsimileLeaf({page,zoom=100}:{page:LosFacsimilePage;zoom?:number}){
  return <article className={"los-facs-leaf los-facs-"+page.kind}
    data-facsimile-page={page.pageId}
    data-physical-side={page.physicalSide}
    style={{"--los-facs-zoom":zoom/100} as CSSProperties}>
    {page.kind!=="front-cover"&&page.kind!=="inside-cover"&&<header className="los-facs-running">
      <span>LOS! 1 · SAB31</span><span>KAPITEL 01</span>
    </header>}
    <div className="los-facs-page-content">
      {page.kind!=="front-cover"&&page.kind!=="inside-cover"&&page.kind!=="chapter-open"&&
      <><span className="los-facs-section-name">{page.section==="text"?"TEXT A":
        page.section==="text-b"?"TEXT B":page.section.toLocaleUpperCase("fi")}</span>
      <h2>{page.title}</h2><p className="los-facs-subtitle">{page.subtitle}</p></>}
      <PaperPageBody page={page}/>
    </div>
    {page.kind!=="front-cover"&&page.kind!=="inside-cover"&&<footer className="los-facs-folio">
      <span>LOS! 1 · C01-PILOTTI</span>
      <span>Luonnoslehti {page.pdfPageIndex+1}</span>
    </footer>}
  </article>;
}

export function Los1FacsimilePilot({onOpenDigital}:{onOpenDigital:(section:LosFacsimileSection)=>void}){
  const [state,setState]=useState<ReaderState>({pageId:"cover",mode:"auto",zoom:100});
  const [wide,setWide]=useState(false);
  const [tocOpen,setTocOpen]=useState(false);
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{
    setState(readState());setLoaded(true);
    const resize=()=>setWide(window.innerWidth>=1080);
    resize();window.addEventListener("resize",resize);
    return ()=>window.removeEventListener("resize",resize);
  },[]);
  useEffect(()=>{
    if(!loaded)return;
    try{const key=storageKey();if(key)localStorage.setItem(key,JSON.stringify(state));}
    catch{/* Reader still navigates if storage is unavailable. */}
  },[state,loaded]);
  const index=Math.max(0,pages.findIndex(p=>p.pageId===state.pageId));
  const actualMode=state.mode==="auto"?(wide?"spread":"single"):state.mode;
  const spreadAllowed=actualMode==="spread"&&wide;
  const group=useMemo(()=>{
    if(actualMode==="continuous")return pages;
    if(!spreadAllowed||index<=1)return [pages[index]!];
    const start=index%2===0?index:index-1;
    return pages.slice(start,start+2);
  },[index,actualMode,spreadAllowed]);
  const goTo=useCallback((next:number)=>{
    const bounded=Math.min(pages.length-1,Math.max(0,next));
    setState(previous=>({...previous,pageId:pages[bounded]!.pageId}));
  },[]);
  const next=useCallback(()=>{
    if(actualMode==="continuous")return;
    if(spreadAllowed&&index>=2)goTo(Math.min(pages.length-1,(index%2===0?index:index-1)+2));
    else goTo(index+1);
  },[actualMode,spreadAllowed,index,goTo]);
  const previous=useCallback(()=>{
    if(actualMode==="continuous")return;
    if(spreadAllowed&&index>=4)goTo((index%2===0?index:index-1)-2);
    else goTo(index-1);
  },[actualMode,spreadAllowed,index,goTo]);
  useEffect(()=>{
    const keydown=(e:KeyboardEvent)=>{
      if(e.altKey||e.metaKey||e.ctrlKey||e.shiftKey)return;
      const tag=(e.target as HTMLElement|null)?.tagName;
      if(tag&&["INPUT","TEXTAREA","SELECT"].includes(tag))return;
      if(e.key==="ArrowRight"||e.key==="PageDown"){e.preventDefault();next();}
      if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();previous();}
      if(e.key==="Home"){e.preventDefault();goTo(0);}
      if(e.key==="End"){e.preventDefault();goTo(pages.length-1);}
      if(e.key==="Escape")setTocOpen(false);
    };
    window.addEventListener("keydown",keydown);
    return ()=>window.removeEventListener("keydown",keydown);
  },[goTo,next,previous]);
  return <section className="los-facs-reader" aria-label="LOS! 1 näköiskirjan C01-pilotti">
    <div className="los-facs-toolbar">
      <div className="los-facs-toolbar-title"><FileText size={19}/>
        <div><strong>LOS! 1 · Näköiskirja</strong><small>C01-pilotti · B5-luonnos, ei valmis painos</small></div>
      </div>
      <div className="los-facs-toolbar-actions">
        <button type="button" onClick={()=>setTocOpen(v=>!v)} aria-expanded={tocOpen}>
          <List size={17}/> Sisältö
        </button>
        <label className="los-facs-mode-label">Näkymä
          <select value={state.mode}
            onChange={e=>setState(v=>({...v,mode:e.target.value as ViewMode}))}>
            <option value="auto">Automaattinen</option>
            <option value="single">Yksi sivu</option>
            <option value="spread">Aukeama</option>
            <option value="continuous">Jatkuva</option>
          </select>
        </label>
        <button type="button" onClick={()=>setState(v=>({...v,zoom:zoomLimit(v.zoom-25)}))}
          aria-label="Pienennä" disabled={state.zoom<=75}><Minus size={17}/></button>
        <output aria-label="Zoom">{state.zoom}%</output>
        <button type="button" onClick={()=>setState(v=>({...v,zoom:zoomLimit(v.zoom+25)}))}
          aria-label="Suurenna" disabled={state.zoom>=200}><Plus size={17}/></button>
        <button type="button" onClick={()=>window.print()} className="los-facs-print-action">
          <Printer size={17}/> Tulosta C01-luonnos
        </button>
      </div>
    </div>
    <p className="los-facs-honesty" role="status">
      <BookOpen size={16}/> Näytössä on vain C01:n painotaittopilotti.
      Sivut eivät ole julkaistun PDF:n sivuja, eikä tämän näkymän lukeminen
      merkitse oppitunteja tai kokeita tehdyiksi.
    </p>
    {tocOpen&&<nav className="los-facs-toc" aria-label="Näköiskirjan sisällysluettelo">
      {pages.filter((p,i)=>i===0||i===2||p.section!==pages[i-1]?.section).map(p=>
        <button key={p.pageId} type="button"
          onClick={()=>{goTo(p.pdfPageIndex);setTocOpen(false);}}>
          <span>{p.kind==="front-cover"?"Kansi":p.title}</span>
          <small>Luonnoslehti {p.pdfPageIndex+1}</small></button>)}
    </nav>}
    {state.mode==="spread"&&!wide&&<p className="los-facs-honesty" role="status">
      <Columns2 size={15}/> Näyttö on liian kapea luettavaan aukeamaan.
      Näytetään yksi sivu; aukeamavalinta säilyy leveämpää näyttöä varten.
    </p>}
    <div className={"los-facs-stage "+(actualMode==="continuous"?"is-continuous":"")}>
      <div className={"los-facs-leaves "+(group.length===2?"is-spread":"is-single")}
        aria-label="B5-sivut">
        {group.map(p=><div key={p.pageId} className="los-facs-sheet" data-leaf={p.pageId}>
          <FacsimileLeaf page={p} zoom={state.zoom}/>
        </div>)}
      </div>
    </div>
    <div className="los-facs-bottom">
      <button type="button" onClick={previous}
        disabled={actualMode==="continuous"||index===0}><ChevronLeft size={18}/> Edellinen</button>
      <span>Luonnoslehti {index+1} / {pages.length} · Ei lopullinen sivunumero</span>
      <button type="button" onClick={next}
        disabled={actualMode==="continuous"||index===pages.length-1}>Seuraava <ChevronRight size={18}/></button>
    </div>
    <div className="los-facs-return">
      <button type="button" onClick={()=>onOpenDigital(pages[index]?.section??"chapter")}>
        <ArrowLeft size={17}/> Avaa sama osio digikirjassa
      </button>
      <span>Teksti ja tehtävät tulevat samoista LOS!-lähteistä.
        Painettu pilotti ei luo uusia opiskelusuorituksia.</span>
    </div>
    <div className="los-facs-print-only" aria-hidden="true">
      {pages.map(p=><FacsimileLeaf key={p.pageId} page={p}/>)}
    </div>
  </section>;
}
