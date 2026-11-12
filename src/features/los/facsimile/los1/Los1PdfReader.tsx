import {useCallback,useEffect,useMemo,useRef,useState,
  type ChangeEvent,type KeyboardEvent,type TouchEvent} from "react";
import {ArrowLeft,BookOpen,Bookmark,ChevronLeft,ChevronRight,
  FileText,Search,Upload,X,ZoomIn,ZoomOut} from "lucide-react";
import type {PDFDocumentProxy,RenderTask} from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
import "pdfjs-dist/web/pdf_viewer.css";
import {getDeviceOwnerId} from "@/lib/deviceSession";
import {LOS1_C01_FACSIMILE_PAGES,type LosFacsimileSection} from "./c01Pilot";
import {getFacsimileSwipeDirection} from "./navigation";
import {Los1PrintOutlinePanel} from "./Los1PrintOutlinePanel";
import {LOS1_C01_PDF_CONTRACT,turnPdfLeaf,validateC01TextALayer,
  validatePdfGeometry,visiblePdfLeaves,type PdfFacsimileMode} from "./pdfReaderModel";
import {getPublishedLos1Edition,loadVerifiedLos1Pdf,
  visibleReleasedPages,turnReleasedPage,type Los1PublishedEdition} from "./editionRelease";
import "./pdfReader.css";

type SearchHit={page:number;snippet:string};
type StageSize={width:number;height:number};
type PdfTextItem={str?:string};
function extractStrings(items:readonly unknown[]):string[]{
  return items.filter((item):item is PdfTextItem=>
    Boolean(item&&typeof item==="object"&&"str" in item))
    .map(item=>item.str??"");
}

function LocalPdfPage({document,pageNumber,availableWidth,availableHeight,zoom,printedPageLabel,isPublished}:{
  document:PDFDocumentProxy;pageNumber:number;availableWidth:number;
  availableHeight:number;zoom:number;printedPageLabel:string|null;isPublished:boolean;
}){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const textRef=useRef<HTMLDivElement>(null);
  const [error,setError]=useState("");
  useEffect(()=>{
    let cancelled=false;
    let renderTask:RenderTask|null=null;
    let textLayer:{cancel:()=>void}|null=null;
    const canvas=canvasRef.current;
    const textBox=textRef.current;
    if(!canvas||!textBox)return;
    setError("");
    const render=async()=>{
      const pdfPage=await document.getPage(pageNumber);
      if(cancelled)return;
      const baseViewport=pdfPage.getViewport({scale:1});
      // At zoom 100%, fit the entire physical page, never stretch its proportions.
      const fit=Math.min(availableWidth/baseViewport.width,availableHeight/baseViewport.height);
      const scale=Math.max(0.1,fit)*(zoom/100);
      const viewport=pdfPage.getViewport({scale});
      const ctx=canvas.getContext("2d");
      if(!ctx)throw new Error("PDF-sivun piirtopintaa ei voi avata.");
      const pixelRatio=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.max(1,Math.floor(viewport.width*pixelRatio));
      canvas.height=Math.max(1,Math.floor(viewport.height*pixelRatio));
      canvas.style.width=String(viewport.width)+"px";
      canvas.style.height=String(viewport.height)+"px";
      textBox.style.width=String(viewport.width)+"px";
      textBox.style.height=String(viewport.height)+"px";
      textBox.style.setProperty("--scale-factor",String(scale));
      textBox.replaceChildren();
      renderTask=pdfPage.render({
        canvas,
        canvasContext:ctx,
        viewport,
        transform:pixelRatio===1?undefined:[pixelRatio,0,0,pixelRatio,0,0],
      });
      await renderTask.promise;
      if(cancelled)return;
      const pdfjs=await import("pdfjs-dist/legacy/build/pdf.mjs");
      const textContent=await pdfPage.getTextContent();
      if(cancelled)return;
      const layer=new pdfjs.TextLayer({textContentSource:textContent,container:textBox,viewport});
      textLayer=layer;
      await layer.render();
    };
    void render().catch(e=>{
      if(cancelled||String(e).includes("RenderingCancelledException"))return;
      setError(e instanceof Error?e.message:"PDF-sivun renderöinti epäonnistui.");
    });
    return ()=>{
      cancelled=true;
      renderTask?.cancel();
      textLayer?.cancel();
      textBox.replaceChildren();
    };
  },[document,pageNumber,availableWidth,availableHeight,zoom]);
  return <section className="los1-pdf-leaf" aria-label={isPublished?"Painettu sivu "+(printedPageLabel??"ilman numeroa"):"PDF-luonnoslehti "+pageNumber}>
    <div className="los1-pdf-leaf-content">
      <canvas ref={canvasRef} aria-hidden="true"/>
      <div ref={textRef} className="textLayer los1-pdf-textlayer"
        aria-label={"PDF-sivun "+pageNumber+" valittava teksti"}/>
    </div>
    {error&&<p className="los1-pdf-error" role="alert">{error}</p>}
    <span className="los1-pdf-folio">{isPublished?(printedPageLabel?"Sivu "+printedPageLabel:"Numeroimaton sivu"):"Luonnoslehti "+pageNumber}</span>
  </section>;
}

export function Los1PdfReader({
  onBack,onOpenDigital,
}:{
  onBack:()=>void;
  onOpenDigital:(section:LosFacsimileSection,chapterId?:string|null)=>void;
}){
  const [fileName,setFileName]=useState("");
  const [document,setDocument]=useState<PDFDocumentProxy|null>(null);
  const [activeEdition,setActiveEdition]=useState<Los1PublishedEdition|null>(null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [pageIndex,setPageIndex]=useState(0);
  const [mode,setMode]=useState<PdfFacsimileMode>("auto");
  const [zoom,setZoom]=useState(100);
  const [stageSize,setStageSize]=useState<StageSize>({width:880,height:640});
  const [tocOpen,setTocOpen]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);
  const [query,setQuery]=useState("");
  const [hits,setHits]=useState<SearchHit[]>([]);
  const [searching,setSearching]=useState(false);
  const [bookmarks,setBookmarks]=useState<number[]>([]);
  const [bookmarkStorageKey,setBookmarkStorageKey]=useState<string|null>(null);
  const [readingStorageKey,setReadingStorageKey]=useState<string|null>(null);
  const [jumpValue,setJumpValue]=useState("");
  const [jumpError,setJumpError]=useState("");
  const stageRef=useRef<HTMLDivElement>(null);
  const currentLoadingTask=useRef<{destroy:()=>Promise<void>}|null>(null);
  const currentDoc=useRef<PDFDocumentProxy|null>(null);
  const touchStart=useRef<{x:number;y:number;fingers:number;control:boolean}|null>(null);

  useEffect(()=>{
    const node=stageRef.current;
    if(!node||typeof ResizeObserver==="undefined")return;
    const update=()=>setStageSize({width:node.clientWidth,height:node.clientHeight});
    update();
    const observer=new ResizeObserver(update);
    observer.observe(node);
    return ()=>observer.disconnect();
  },[document]);

  useEffect(()=>{
    if(!bookmarkStorageKey)return;
    try{localStorage.setItem(bookmarkStorageKey,JSON.stringify(bookmarks));}
    catch{/* Browser private-mode storage can be disabled. */}
  },[bookmarks,bookmarkStorageKey]);

  useEffect(()=>{
    if(!document||!readingStorageKey)return;
    try{localStorage.setItem(readingStorageKey,String(pageIndex));}
    catch{/* Reading place is optional on private-browsing devices. */}
  },[document,pageIndex,readingStorageKey]);
  useEffect(()=>()=>{void currentLoadingTask.current?.destroy();
    if(!currentLoadingTask.current)void currentDoc.current?.destroy();},[]);

  const spread=mode==="spread"||(mode==="auto"&&stageSize.width>=970);
  const shouldSpread=spread&&stageSize.width>=670;
  const visible=useMemo(()=>
    document?(activeEdition?
      visibleReleasedPages(activeEdition.pages,pageIndex,shouldSpread):
      visiblePdfLeaves(pageIndex,document.numPages,shouldSpread)):[],
  [document,pageIndex,shouldSpread,activeEdition]);
  const pageWidth=Math.max(190,(stageSize.width-(shouldSpread?50:34))/(shouldSpread?2:1));
  const pageHeight=Math.max(250,stageSize.height-54);
  const go=useCallback((direction:-1|1)=>{
    if(!document)return;
    setPageIndex(index=>activeEdition?
      turnReleasedPage(activeEdition.pages,index,shouldSpread,direction):
      turnPdfLeaf(index,document.numPages,shouldSpread,direction));
  },[document,shouldSpread,activeEdition]);
  const goTo=(index:number)=>{
    if(!document||index<0||index>=document.numPages)return;
    setPageIndex(index);setJumpValue("");setJumpError("");
    setTocOpen(false);setSearchOpen(false);
  };
  const openPdfBytes=useCallback(async(
    buffer:ArrayBuffer,name:string,release:Los1PublishedEdition|null,
  )=>{
    setBusy(true);setError("");setDocument(null);setFileName("");
    setActiveEdition(null);setBookmarkStorageKey(null);setReadingStorageKey(null);setBookmarks([]);setHits([]);
    try{
      await currentLoadingTask.current?.destroy();
      currentLoadingTask.current=null;
      currentDoc.current=null;
      const owner=getDeviceOwnerId();
      let bookmarkKey:string|null=null;
      let restoredBookmarks:number[]=[];
      let restoredPageIndex=0;
      // Compute digest before PDF.js worker may transfer/detach the bytes.
      if(owner&&typeof crypto!=="undefined"&&crypto.subtle){
        const hash=await crypto.subtle.digest("SHA-256",buffer);
        const digest=Array.from(new Uint8Array(hash))
          .map(x=>x.toString(16).padStart(2,"0")).join("");
        bookmarkKey="los1.pdf-bookmarks."+owner+"."+(release?.editionId??"c01-draft")+"."+digest;
        try{
          const data:unknown=JSON.parse(localStorage.getItem(bookmarkKey)??"[]");
          const maxPages=release?.pages.length??LOS1_C01_PDF_CONTRACT.pageCount;
          restoredBookmarks=Array.isArray(data)?data.filter((n):n is number=>
            Number.isInteger(n)&&n>=0&&n<maxPages):[];
        }catch{/* No stored bookmark set is fine. */}
        try{
          const raw=localStorage.getItem(bookmarkKey+".last-page");
          const saved=raw===null?NaN:Number(raw);
          const limit=release?.pages.length??LOS1_C01_PDF_CONTRACT.pageCount;
          if(Number.isInteger(saved)&&saved>=0&&saved<limit)restoredPageIndex=saved;
        }catch{/* Reading place is optional on private-browsing devices. */}
      }
      const pdfjs=await import("pdfjs-dist/legacy/build/pdf.mjs");
      pdfjs.GlobalWorkerOptions.workerSrc=pdfWorkerUrl;
      const loadingTask=pdfjs.getDocument({data:new Uint8Array(buffer)});
      currentLoadingTask.current=loadingTask;
      const pdf=await loadingTask.promise;
      const first=await pdf.getPage(1);
      const firstView=first.getViewport({scale:1});
      if(release){
        const expected=release.screenPdf.pageCount;
        if(pdf.numPages!==expected||pdf.numPages!==release.pages.length)
          throw Error("Julkaistun painoksen PDF:n sivumäärä ei vastaa sivukarttaa.");
        const expectedWidth=release.trimMm.width*72/25.4;
        const expectedHeight=release.trimMm.height*72/25.4;
        if(Math.abs(firstView.width-expectedWidth)>1.5||
           Math.abs(firstView.height-expectedHeight)>1.5)
          throw Error("Julkaistun PDF:n B5-sivukoko ei vastaa hyväksyttyä taittoa.");
      }else{
        const geometryError=validatePdfGeometry(firstView.width,firstView.height,pdf.numPages);
        if(geometryError)throw Error(geometryError);
        const textA=await pdf.getPage(LOS1_C01_PDF_CONTRACT.textAPdfPage);
        const textContent=await textA.getTextContent();
        const sourceError=validateC01TextALayer(extractStrings(textContent.items));
        if(sourceError)throw Error(sourceError);
      }
      currentDoc.current=pdf;
      setDocument(pdf);setActiveEdition(release);setPageIndex(restoredPageIndex);
      setZoom(100);setFileName(name);
      setBookmarks(restoredBookmarks);setBookmarkStorageKey(bookmarkKey);
      setReadingStorageKey(bookmarkKey?bookmarkKey+".last-page":null);
    }catch(e){
      setError(e instanceof Error?e.message:"PDF:n avaaminen epäonnistui.");
      setDocument(null);setActiveEdition(null);setReadingStorageKey(null);
      await currentLoadingTask.current?.destroy().catch(()=>{});
      currentLoadingTask.current=null;currentDoc.current=null;
    }finally{setBusy(false);}
  },[]);
  const onFile=async(event:ChangeEvent<HTMLInputElement>)=>{
    const file=event.currentTarget.files?.[0];
    event.currentTarget.value="";
    if(!file)return;
    if(!file.name.toLocaleLowerCase("fi").endsWith(".pdf")||
       file.size===0||file.size>LOS1_C01_PDF_CONTRACT.maxBytes){
      setError("Valitse enintään 35 Mt:n PDF-tiedosto.");return;
    }
    await openPdfBytes(await file.arrayBuffer(),file.name,null);
  };
  useEffect(()=>{
    const release=getPublishedLos1Edition();
    if(!release)return;
    let cancelled=false;
    void (async()=>{
      try{
        const bytes=await loadVerifiedLos1Pdf(release);
        if(!cancelled)await openPdfBytes(bytes,"LOS! 1 · "+release.editionId,release);
      }catch(e){
        if(!cancelled)setError(e instanceof Error?e.message:"Painoksen lataus epäonnistui.");
      }
    })();
    return()=>{cancelled=true;};
  },[openPdfBytes]);

  const runSearch=async()=>{
    if(!document||!query.trim())return;
    setSearching(true);setHits([]);
    try{
      const term=query.trim().toLocaleLowerCase("fi");
      const results:SearchHit[]=[];
      for(let n=1;n<=document.numPages;n++){
        const pdfPage=await document.getPage(n);
        const content=await pdfPage.getTextContent();
        const text=extractStrings(content.items).join(" ").replace(/\s+/g," ");
        const i=text.toLocaleLowerCase("fi").indexOf(term);
        if(i>=0)results.push({page:n,snippet:text.slice(Math.max(0,i-45),i+term.length+65)});
      }
      setHits(results);
    }catch(e){setError(e instanceof Error?e.message:"PDF-tekstin haku epäonnistui.");}
    finally{setSearching(false);}
  };
  const onKeyDown=(event:KeyboardEvent<HTMLDivElement>)=>{
    if((event.target as HTMLElement).closest("input,textarea,select,button,a,[contenteditable=true]"))return;
    if(event.key==="ArrowRight"||event.key==="PageDown"){event.preventDefault();go(1);}
    if(event.key==="ArrowLeft"||event.key==="PageUp"){event.preventDefault();go(-1);}
    if(event.key==="Home"){event.preventDefault();goTo(0);}
    if(event.key==="End"&&document){event.preventDefault();goTo(document.numPages-1);}
    if(event.key==="Escape"){setTocOpen(false);setSearchOpen(false);}
  };
  const onTouchStart=(event:TouchEvent<HTMLDivElement>)=>{
    const f=event.touches[0];
    touchStart.current=f?{x:f.clientX,y:f.clientY,fingers:event.touches.length,
      control:Boolean((event.target as HTMLElement).closest("a,button,input,select,textarea"))}:null;
  };
  const onTouchEnd=(event:TouchEvent<HTMLDivElement>)=>{
    const start=touchStart.current;
    touchStart.current=null;
    const end=event.changedTouches[0];
    if(!start||!end||!document)return;
    const dir=getFacsimileSwipeDirection({
      startX:start.x,deltaX:end.clientX-start.x,deltaY:end.clientY-start.y,
      zoom,continuous:false,beganOnControl:start.control,fingers:start.fingers,
    });
    if(dir)go(dir);
  };
  const jump=()=>{
    const n=Number(jumpValue);
    if(!/^[0-9]+$/.test(jumpValue.trim())||!Number.isInteger(n)||
       !document||n<1||n>document.numPages){
      setJumpError("Anna luonnoslehden järjestysnumero 1–15.");return;
    }
    goTo(n-1);
  };
  const toggleBookmark=()=>{
    setBookmarks(old=>old.includes(pageIndex)?old.filter(n=>n!==pageIndex):[...old,pageIndex]);
  };

  return <section className="los1-pdf-reader" aria-label="LOS! 1:n paikallinen PDF.js-lukija" onKeyDown={onKeyDown}>
    <header className="los1-pdf-header">
      <button type="button" onClick={onBack}><ArrowLeft size={18}/> Näköiskirjan pilottiin</button>
      <div className="los1-pdf-heading"><strong>LOS! 1 · PDF.js</strong>
        <small>{activeEdition?"Hyväksytty painos · "+activeEdition.editionId:
          "Paikallinen C01-taittoluonnos · ei julkaistu painos"}</small></div>
      {document&&<button type="button" onClick={()=>{setDocument(null);setActiveEdition(null);setFileName("");setBookmarkStorageKey(null);setReadingStorageKey(null);setBookmarks([]);setHits([]);
          void currentLoadingTask.current?.destroy().catch(()=>{});currentLoadingTask.current=null;currentDoc.current=null;}}>
          <X size={17}/> Sulje PDF
        </button>}
    </header>
    <p className="los1-pdf-disclaimer"><FileText size={16}/>
      {activeEdition?
        "Hyväksytty PDF haetaan käyttäjän oikeudet tarkistavalta palvelimelta, ja sen SHA-256 tarkistetaan ennen avaamista.":
        "Paikallista C01-PDF:ää ei lähetetä palvelimelle. Julkaistua koko kirjan PDF:ää ei ole vielä hyväksytty."}
    </p>
    {!getPublishedLos1Edition()&&<div className="los1-pdf-upload">
      <label className="los1-pdf-file-label"><Upload size={18}/>
        {busy?"Avataan PDF-tiedostoa…":"Valitse paikallinen C01-PDF"}
        <input type="file" accept=".pdf,application/pdf" disabled={busy} onChange={onFile}/>
      </label>
      {fileName&&<span title={fileName}>Avoinna: {fileName}</span>}
    </div>}
    {error&&<p className="los1-pdf-error" role="alert">{error}</p>}
    {!document&&!busy&&!getPublishedLos1Edition()&&<div className="los1-pdf-empty">
      <BookOpen size={36} strokeWidth={1.4}/>
      <h2>PDF.js-lukija on valmis testausta varten</h2>
      <p>Avaa ensin C01:n B5-taittoluonnos PDF-tiedostona. Automaattinen
        julkaistu PDF-linkki otetaan käyttöön vasta lähteiden, kuvien ja sivutuksen hyväksymisen jälkeen.</p>
      <p>Nykyinen HTML-pohjainen 15-sivuinen näköiskirjapilotti toimii edelleen erikseen.</p>
    </div>}
    {!document&&!busy&&!getPublishedLos1Edition()&&<Los1PrintOutlinePanel/>}
    {document&&<>
      <div className="los1-pdf-controls">
        <button type="button" onClick={()=>{setTocOpen(v=>!v);setSearchOpen(false);}}>Sisällys</button>
        <button type="button" onClick={()=>{setSearchOpen(v=>!v);setTocOpen(false);}}><Search size={16}/> Hae</button>
        <button type="button" onClick={toggleBookmark} aria-pressed={bookmarks.includes(pageIndex)}>
          <Bookmark size={16} fill={bookmarks.includes(pageIndex)?"currentColor":"none"}/> Kirjanmerkki
        </button>
        <label>Näkymä <select value={mode} onChange={e=>setMode(e.target.value as PdfFacsimileMode)}>
          <option value="auto">Automaattinen</option>
          <option value="single">Yksi sivu</option>
          <option value="spread">Aukeama</option>
        </select></label>
        <button type="button" aria-label="Pienennä" disabled={zoom<=50}
          onClick={()=>setZoom(v=>Math.max(50,v-25))}><ZoomOut size={18}/></button>
        <output>{zoom} %</output>
        <button type="button" aria-label="Suurenna" disabled={zoom>=250}
          onClick={()=>setZoom(v=>Math.min(250,v+25))}><ZoomIn size={18}/></button>
      </div>
      {tocOpen&&<nav className="los1-pdf-toc" aria-label="PDF:n sivujen sisällys">
        {(activeEdition?.pages??LOS1_C01_FACSIMILE_PAGES).map(p=><button type="button" key={p.pageId}
          aria-current={pageIndex===p.pdfPageIndex?"page":undefined} onClick={()=>goTo(p.pdfPageIndex)}>
          <span>{p.title||"Etukannen sisäpuoli"}</span>
          <small>{p.printedPageLabel??(activeEdition?"Numeroimaton":String(p.pdfPageIndex+1))}</small>
        </button>)}
        {bookmarks.length>0&&<div className="los1-pdf-bookmarks"><strong>Omat kirjanmerkit</strong>
          {bookmarks.map(n=><button type="button" key={n} onClick={()=>goTo(n)}>
            <Bookmark size={14}/> Luonnoslehti {n+1}</button>)}
        </div>}
      </nav>}
      {searchOpen&&<form className="los1-pdf-search" onSubmit={e=>{e.preventDefault();void runSearch();}}>
        <label htmlFor="los1-pdf-query">Etsi tekstiä PDF:n kaikilta sivuilta</label>
        <input id="los1-pdf-query" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Esim. Guten Morgen"/>
        <button type="submit" disabled={searching||!query.trim()}>{searching?"Haetaan…":"Hae"}</button>
        <div className="los1-pdf-hits" aria-live="polite">
          {hits.map(h=><button type="button" key={h.page} onClick={()=>goTo(h.page-1)}>
            <strong>Luonnoslehti {h.page}</strong><small>{h.snippet}</small>
          </button>)}
          {!searching&&query.trim()&&hits.length===0&&<small>Ei tuloksia tai haku ei ole vielä käynnistetty.</small>}
        </div>
      </form>}
      <div className="los1-pdf-stage" ref={stageRef} tabIndex={0}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        aria-label="PDF-kirjan sivut">
        <div className="los1-pdf-spread">
          {visible.map(index=><LocalPdfPage key={index} document={document} pageNumber={index+1}
            availableWidth={pageWidth} availableHeight={pageHeight} zoom={zoom}
            printedPageLabel={activeEdition?.pages[index]?.printedPageLabel??null}
            isPublished={Boolean(activeEdition)}/>)}
        </div>
      </div>
      <footer className="los1-pdf-footer">
        <button type="button" onClick={()=>go(-1)}
          disabled={pageIndex===0}><ChevronLeft size={17}/> Edellinen</button>
        <form onSubmit={e=>{e.preventDefault();jump();}}>
          <label htmlFor="los1-pdf-jump">{activeEdition?"PDF-sivu":"Luonnoslehti"} {pageIndex+1}/{document.numPages}</label>
          <input id="los1-pdf-jump" value={jumpValue} inputMode="numeric" placeholder="1–15"
            onChange={e=>{setJumpValue(e.target.value);setJumpError("");}}/>
          <button type="submit">Siirry</button>
        </form>
        <button type="button" onClick={()=>go(1)}
          disabled={pageIndex===document.numPages-1}>Seuraava <ChevronRight size={17}/></button>
        {jumpError&&<small role="alert">{jumpError}</small>}
      </footer>
      <div className="los1-pdf-digital-link">
        <span>PDF-sivu: {(activeEdition?.pages??LOS1_C01_FACSIMILE_PAGES)[pageIndex]?.title??"Sivu"}</span>
        <button type="button" onClick={()=>{
          const page=activeEdition?.pages[pageIndex];
          const section=page?.sectionId??LOS1_C01_FACSIMILE_PAGES[pageIndex]?.section??"chapter";
          const permitted:readonly string[]=["overview","chapter","text","understand","vocabulary",
            "grammar","text-b","practice","apply","culture","test","appendix"];
          onOpenDigital(permitted.includes(section)?section as LosFacsimileSection:"chapter",
            page?.chapterId??"01");
        }}>Avaa sama osio digikirjassa</button>
      </div>
    </>}
    <span className="sr-only">PDF on paikallinen taittoluonnos, ei julkaistu painos eikä painovalmis kirja.</span>
  </section>;
}
