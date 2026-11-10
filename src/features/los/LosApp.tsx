import {useEffect,useMemo,useRef,useState,type ReactNode} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {BookOpen,ChevronLeft,ChevronRight,Menu,Search,Volume2,Bookmark,CheckCircle2} from 'lucide-react';
import {AppShell} from '@/app/AppShell';
import {type StudyPage} from '@/app/navigation';
import {chapters,sections,lessons,allWords,LOS_VERSION,type Chapter,type Exercise,type Block} from './content';
import {gradeExercise,tokenOffsets,dueDate,type TextAnchor,type Grade} from './engine';
import {useLosStore,type SyncStatus} from './useLosStore';
import './los.css';

type View = {kind:'library'|'home'|'contents'|'chapter'|'lessons'|'lesson'|'dictionary'|'grammar'|'notes'|'bookmarks'|'media'|'sources'|'progress'|'review'|'settings'|'exams'; cid?:string; section?:string;lesson?:string};
const initial:View={kind:'home'};
const parseHash=():View=>{
 if(typeof window==='undefined')return initial;
 const parts=decodeURIComponent(window.location.hash.replace(/^#\/?/, '')).split('/');
 const kind=parts[0] as View['kind'];
 if(!['library','home','contents','chapter','lessons','lesson','dictionary','grammar','notes','bookmarks','media','sources','progress','review','settings','exams'].includes(kind))return initial;
 return {kind,cid:parts[1],section:parts[2],lesson:parts[1]};
};
type Store = ReturnType<typeof useLosStore>;
const item=(store:Store,key:string)=>store.items[key];
const valueString=(store:Store,key:string)=>typeof store.items[key]==='string'?store.items[key] as string:'';
function Label({children}:{children:ReactNode}){return <span className="los-label">{children}</span>}
function StateLabel({status,error}:{status:SyncStatus;error:string}){
 return <p className={'los-save '+(status==='error'?'los-error':'')} role="status" aria-live="polite">
  {status==='loading'?'Ladataan omia merkintöjä…':status==='saved'?'Tallennettu Supabaseen':status==='pending'?'Tallennusjonossa, odottaa palvelinta':'Tallennusta ei voitu vahvistaa'}
  {status==='error'&&error?<small>{error}</small>:null}
 </p>;
}
function SourceNotice({chapter}:{chapter:Chapter}){
 return <p className="los-source"><b>{chapter.sourceId}</b> · {chapter.attribution} · {chapter.license}
  {chapter.sourceUrl?<a href={chapter.sourceUrl} target="_blank" rel="noreferrer"> Lähdetiedot</a>:null}
  {chapter.license.includes('BY-SA')?<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer"> Lisenssiehdot</a>:null}
 </p>;
}
function Audio({src,title}:{src:string;title:string}){
 const [failed,setFailed]=useState(false);
 return <div className="los-media">
 <Label>ALKUPERÄINEN IHMISÄÄNI</Label>
 <p><Volume2 size={17} aria-hidden="true"/> {title}</p>
 {!failed?<audio controls preload="none" src={src} onError={()=>setFailed(true)} aria-label={title}/>:<p role="alert">Äänitteen lataus epäonnistui. Voit jatkaa tekstin ja sanaston avulla. Äänitettä ei merkitä kuunnelluksi.</p>}
 </div>;
}
function Media({chapter}:{chapter:Chapter}){
 if(chapter.id==='C01')return <>
  <Audio src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg" title="Franz ja Jörg, GesprächVorstellung (14 s)"/>
  {chapter.media?<Audio src={chapter.media.url} title={chapter.media.title}/>:null}
  <SourceNotice chapter={chapter}/>
  <p>Ääni ja teksti ovat eri aineistotyyppejä. Äänitteitä ei luoda koneellisesti eikä luvata toimiviksi ennen toistotestausta.</p>
 </>;
 if(chapter.media)return <Audio src={chapter.media.url} title={chapter.media.title}/>;
 return <p>Erillisen autenttisen kuuntelun käyttöönotto on vielä kesken. Tästä ei synny suoritusmerkintää.</p>;
}
function WordSheet({word,onClose,onReview}:{word:string;onClose:()=>void;onReview:(term:string)=>void}){
 const candidate=allWords.find(w=>w.de.toLocaleLowerCase('de')===word.toLocaleLowerCase('de')||w.de.toLocaleLowerCase('de').includes(word.toLocaleLowerCase('de')));
 return <div className="los-sheet-backdrop" onClick={onClose}>
  <aside className="los-word-sheet" role="dialog" aria-modal="true" aria-label="Sanan selitys" onClick={e=>e.stopPropagation()}>
   <button className="los-quiet" onClick={onClose} aria-label="Sulje sanakortti">Sulje</button>
   <h2 lang="de">{candidate?.de??word}</h2>
   <p>{candidate?.fi??'Tälle sanalle ei ole vielä tarkistettua käännöstä. Hae myös sanakirjasta.'}</p>
   {candidate?<><p className="los-meta">Löytyy kappaleesta {candidate.chapterId}</p><button onClick={()=>{onReview(candidate.de);onClose()}}>Lisää kertaukseen</button></>:null}
  </aside>
 </div>;
}
function Reader({chapter,store,exerciseMode,onSelect,selection,fontSize}:{chapter:Chapter;store:Store;exerciseMode?:boolean;onSelect?:(a:TextAnchor)=>void;selection?:TextAnchor|null;fontSize:number}){
 const [selectedWord,setSelectedWord]=useState('');
 const [freeInk,setFreeInk]=useState(false);
 const [draft,setDraft]=useState<TextAnchor|null>(null);
 const isPicking=Boolean(exerciseMode||freeInk);
 const selectToken=(block:Block,start:number,end:number)=>{
  const previous=exerciseMode?selection:draft;
  const same=previous?.blockId===block.id;
  const next:TextAnchor={blockId:block.id,start:same?Math.min(previous.start,start):start,end:same?Math.max(previous.end,end):end,contentVersion:LOS_VERSION};
  if(exerciseMode)onSelect?.(next);
  else {setDraft(next);store.put('ink:'+block.id,next);}
 };
 const selectDrag=(block:Block)=>{
  if(!isPicking)return;
  const selectionText=window.getSelection();
  if(!selectionText||selectionText.isCollapsed||!selectionText.rangeCount)return;
  const range=selectionText.getRangeAt(0);
  const element=(node:Node)=>node.nodeType===Node.ELEMENT_NODE?node as Element:node.parentElement;
  const startEl=element(range.startContainer)?.closest('[data-los-start]');
  const endEl=element(range.endContainer)?.closest('[data-los-end]');
  if(!startEl||!endEl||!startEl.closest('[data-los-block="'+block.id+'"]')||!endEl.closest('[data-los-block="'+block.id+'"]'))return;
  const start=Number(startEl.getAttribute('data-los-start'));
  const end=Number(endEl.getAttribute('data-los-end'));
  if(Number.isFinite(start)&&Number.isFinite(end))selectToken(block,Math.min(start,end),Math.max(start,end));
  selectionText.removeAllRanges();
 };
 return <div className="los-reader">
  {!exerciseMode?<div className="los-reader-tools">
   <button aria-pressed={freeInk} onClick={()=>setFreeInk(!freeInk)}>{freeInk?'Poistu omasta korostuksesta':'Oma korostustussi'}</button>
   <span>{freeInk?'Napauta tai maalaa sanat. Tämä korostus ei ole tehtävävastaus.':'Napauta sanaa nähdäksesi merkityksen.'}</span>
  </div>:<p className="los-meta">Tehtäväkorostus: napauta sanoja peräkkäin tai maalaa hiirellä/sormella. Vastauksen ankkurit tallennetaan tekstin merkkiväleinä.</p>}
  <div className="los-text" lang="de" style={{fontSize:fontSize+'px'}}>
  {chapter.blocks.map(block=>{
   const tokens=tokenOffsets(block.text);
   const stored=exerciseMode?selection:item(store,'ink:'+block.id) as TextAnchor|null;
   const active=stored?.blockId===block.id?stored:null;
   return <p key={block.id} data-los-block={block.id} onPointerUp={()=>selectDrag(block)}>
    {block.speaker?<strong>{block.speaker}: </strong>:null}
    {tokens.map((token,i)=>{
     const highlighted=active&&token.start>=active.start&&token.end<=active.end;
     const prevEnd=i?tokens[i-1].end:0;
     return <span key={token.start}>
      {block.text.slice(prevEnd,token.start)}
      <span role="button" tabIndex={0} data-los-start={token.start} data-los-end={token.end}
       className={'los-word'+(highlighted?' los-marked':'')}
       aria-label={'Sana '+token.text}
       onClick={()=>isPicking?selectToken(block,token.start,token.end):setSelectedWord(token.text.replace(/[.!?,:]/g,''))}
       onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();isPicking?selectToken(block,token.start,token.end):setSelectedWord(token.text.replace(/[.!?,:]/g,''));}}}
      >{token.text}</span>
     </span>;
    })}
    {block.text.slice(tokens[tokens.length-1]?.end??0)}
   </p>;
  })}
  </div>
  {selectedWord?<WordSheet word={selectedWord} onClose={()=>setSelectedWord('')} onReview={term=>store.put('review:'+term,{due:new Date().toISOString().slice(0,10),stage:0,source:chapter.id})}/>:null}
  {!exerciseMode&&freeInk&&draft?<button className="los-quiet" onClick={()=>{store.put('ink:'+draft.blockId,null);setDraft(null)}}>Pyyhi oma korostus</button>:null}
 </div>;
}
function SpeechRecorder(){
 const media=useRef<MediaRecorder|null>(null);
 const chunks=useRef<Blob[]>([]);
 const [url,setUrl]=useState('');
 const [recording,setRecording]=useState(false);
 const [error,setError]=useState('');
 useEffect(()=>()=>{media.current?.stream.getTracks().forEach(t=>t.stop());if(url)URL.revokeObjectURL(url);},[url]);
 const begin=async()=>{
  try{
   if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined')throw new Error('Tällä selaimella ei voi äänittää.');
   const stream=await navigator.mediaDevices.getUserMedia({audio:true});
   const rec=new MediaRecorder(stream);media.current=rec;chunks.current=[];
   rec.ondataavailable=e=>{if(e.data.size)chunks.current.push(e.data);};
   rec.onstop=()=>{setUrl(URL.createObjectURL(new Blob(chunks.current,{type:rec.mimeType})));stream.getTracks().forEach(t=>t.stop());setRecording(false);};
   rec.start();setRecording(true);setError('');
  }catch(e){setError(e instanceof Error?e.message:'Mikrofonin käyttö epäonnistui.');}
 };
 return <div className="los-recorder">
  <button type="button" onClick={()=>recording?media.current?.stop():void begin()}>{recording?'Lopeta äänitys':'Äänitä oma puhe'}</button>
  {url?<><audio controls src={url}/><small>Äänitys pysyy vain tämän istunnon selaimessa, sitä ei vielä tallenneta pilveen.</small></>:null}
  {error?<p role="alert">{error} Voit silti tehdä tehtävän puhumalla ääneen.</p>:null}
 </div>;
}
function ExerciseCard({exercise,chapter,store,exam=false,fontSize}:{exercise:Exercise;chapter:Chapter;store:Store;exam?:boolean;fontSize:number}){
 const draftKey='draft:'+exercise.id+(exam?':exam':'');
 const prev=item(store,draftKey);
 const [answer,setAnswer]=useState<string>(typeof prev==='string'?prev:'');
 const [highlight,setHighlight]=useState<TextAnchor|null>(null);
 const [hint,setHint]=useState(false);
 const [result,setResult]=useState<Grade|null>(null);
 const [submitted,setSubmitted]=useState(false);
 useEffect(()=>{if(typeof prev==='string'&&!answer)setAnswer(prev);},[prev]);
 const update=(value:string)=>{setAnswer(value);store.put(draftKey,value);setResult(null);};
 const source=chapter.blocks.find(b=>b.id===exercise.blockId);
 const ordered=answer?answer.split(' | '):[];
 const remaining=(exercise.order??[]).filter((w,i)=>ordered.filter(x=>x===w).length<(exercise.order??[]).filter((x,j)=>x===w&&j<=i).length);
 const submit=()=>{
  const grade=gradeExercise({...exercise,sourceText:source?.text} as Exercise & {sourceText?:string},exercise.type==='highlight'?highlight:answer);
  setResult(grade);setSubmitted(true);
  const entry={answer:exercise.type==='highlight'?highlight:answer,grade:grade.status,at:new Date().toISOString(),version:LOS_VERSION,exam};
  store.put('latest:'+exercise.id,entry);
  store.put('attempt:'+exercise.id+':'+Date.now(),entry);
  if(grade.status==='correct'||grade.status==='incorrect'){
   const old=item(store,'review:'+exercise.id) as {stage?:number}|undefined;
   const next=dueDate(new Date(),grade.status==='correct',old?.stage??0);
   store.put('review:'+exercise.id,next);
  }
 };
 return <article className="los-exercise" id={exercise.id}>
  <Label>{exercise.id} · {exam?'Koetila':'Harjoitustila'}</Label>
  <h3>{exercise.prompt}</h3>
  {exercise.type==='highlight'&&source?<Reader chapter={{...chapter,blocks:[source]}} store={store} exerciseMode onSelect={setHighlight} selection={highlight} fontSize={fontSize}/>:null}
  {exercise.options?<div className="los-options" role="radiogroup" aria-label={exercise.prompt}>
   {exercise.options.map(option=><label key={option}><input type="radio" name={exercise.id+(exam?'-exam':'')} value={option} checked={answer===option} onChange={()=>update(option)} disabled={exam&&submitted}/><span>{option}</span></label>)}
  </div>:null}
  {['fill','translate','writing'].includes(exercise.type)?(exercise.type==='writing'?
   <textarea aria-label={exercise.prompt} value={answer} onChange={e=>update(e.target.value)} rows={4} disabled={exam&&submitted} placeholder="Kirjoita vastauksesi tähän…"/>:
   <input aria-label={exercise.prompt} value={answer} onChange={e=>update(e.target.value)} disabled={exam&&submitted} lang="de" autoComplete="off" />):null}
  {exercise.type==='ordering'?<div className="los-order">
   <p>Valittu järjestys: <span lang="de">{ordered.join(' ')||'Ei vielä sanoja'}</span></p>
   <div>{remaining.map((token,i)=><button key={token+i} type="button" onClick={()=>update([...ordered,token].join(' | '))}>{token}</button>)}</div>
   <button className="los-quiet" onClick={()=>update('')}>Aloita järjestys alusta</button>
  </div>:null}
  {exercise.type==='speech'?<SpeechRecorder/>:null}
  {!exam&&exercise.hint?<button className="los-quiet" onClick={()=>setHint(!hint)}>{hint?'Piilota vihje':'Näytä vihje'}</button>:null}
  {hint&&!exam?<p className="los-hint">{exercise.hint}</p>:null}
  <div className="los-actions">
   <button onClick={submit} disabled={exam&&submitted}>{exercise.type==='speech'||exercise.type==='writing'?'Avaa itsearviointimalli':'Tarkista vastaus'}</button>
   {!exam&&result?<button className="los-quiet" onClick={()=>{setResult(null);setSubmitted(false);setHint(false);}}>Yritä uudelleen</button>:null}
  </div>
  {result?<p role="status" className={'los-feedback los-'+result.status}><b>{result.status==='correct'?'Oikein':result.status==='self-review'?'Itsearviointi':'Tarkista vielä'}</b> · {result.feedback}</p>:null}
 </article>;
}
function Words({chapter,store}:{chapter:Chapter;store:Store}){
 const [filter,setFilter]=useState('');const [hide,setHide]=useState(false);
 const filtered=chapter.vocab.filter(w=>(w.de+' '+w.fi).toLowerCase().includes(filter.toLowerCase()));
 return <><h2>Kappaleen sanasto</h2><div className="los-inline"><input aria-label="Hae kappalesanastosta" placeholder="Hae saksaksi tai suomeksi" value={filter} onChange={e=>setFilter(e.target.value)}/><button onClick={()=>setHide(!hide)}>{hide?'Näytä merkitykset':'Piilota merkitykset'}</button></div>
  <div className="los-vocab">{filtered.map(w=><div className="los-vocab-row" key={w.de}><span lang="de"><b>{w.de}</b><small>{w.tier}</small></span><span>{hide?'••••':w.fi}</span><button className="los-quiet" onClick={()=>store.put('review:'+w.de,{due:new Date().toISOString().slice(0,10),stage:0})}>Kertaa</button></div>)}</div>
  {!filtered.length?<p>Ei hakutuloksia.</p>:null}
 </>;
}
function Grammar({chapter}:{chapter:Chapter}){return <div className="los-prose">
 <Label>GRAMMATIK</Label><h2>{chapter.grammar.title}</h2><p>{chapter.grammar.explanation}</p>
 <div className="los-grammar-examples">{chapter.grammar.examples.map(([de,fi])=><div key={de}><p lang="de">{de}</p><small>{fi}</small></div>)}</div>
 <h3>Muista</h3>{chapter.teaching.map((s,i)=><p key={i}>{s}</p>)}
 </div>;}
function ChapterSection({chapter,section,store,fontSize}:{chapter:Chapter;section:string;store:Store;fontSize:number}){
 const active=chapter.status==='text-reviewed';
 const exercises=chapter.exercises;
 if(section==='Aloita')return <div className="los-prose"><h2>Mitä opit?</h2><p>{chapter.goal}</p>{chapter.teaching.map((p,i)=><p key={i}>{p}</p>)}</div>;
 if(section==='Teksti A'||section==='Ymmärrä')return <>
  <h2>{section==='Teksti A'?'Teksti A · kokonainen lähdeteksti':'Ymmärrä lukemasi'}</h2>
  {chapter.blocks.length?<><Reader chapter={chapter} store={store} fontSize={fontSize}/><SourceNotice chapter={chapter}/></>:<p className="los-warning">Tämän kappaleen alkuperäisen päätekstin lupa tai täsmällinen lähde on vielä kesken. Ulkoista sivua ei käytetä tekstin korvikkeena.</p>}
  {section==='Teksti A'&&active&&chapter.id==='C01'?<Audio src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg" title="GesprächVorstellung (14 s)"/>:null}
  {section==='Ymmärrä'&&exercises.filter(e=>e.type==='highlight').map(ex=><ExerciseCard key={ex.id} exercise={ex} chapter={chapter} store={store} fontSize={fontSize}/>)}
 </>;
 if(section==='Sanasto')return <Words chapter={chapter} store={store}/>;
 if(section==='Kielioppi')return <Grammar chapter={chapter}/>;
 if(section==='Teksti B')return <><h2>Teksti B / Kuuntelu</h2><Media chapter={chapter}/></>;
 if(section==='Kulttuuri')return <div className="los-prose"><Label>LAND UND LEUTE</Label><h2>Kulttuuri</h2><p>{chapter.culture}</p></div>;
 if(section==='Harjoittele')return <><h2>Harjoittele</h2>{exercises.filter(e=>!['highlight','writing','speech'].includes(e.type)).map(ex=><ExerciseCard key={ex.id} exercise={ex} chapter={chapter} store={store} fontSize={fontSize}/>)}</>;
 if(section==='Käytä saksaa')return <><h2>Käytä saksaa itse</h2>{exercises.filter(e=>['writing','speech'].includes(e.type)).map(ex=><ExerciseCard key={ex.id} exercise={ex} chapter={chapter} store={store} fontSize={fontSize}/>)}</>;
 if(section==='Kappaletesti')return <><Label>OMA HARJOITUSTESTI</Label><h2>{chapter.name}: kappaletesti</h2><p>Vihjeet ja ratkaisut eivät näy ennen palautusta. Ensimmäinen tehtäväpankin versio: joitakin tehtäviä käytetään myös harjoittelussa, joten tämä ei vielä ole lopullinen riippumaton koe.</p>{exercises.filter(e=>e.type!=='highlight').map(ex=><ExerciseCard key={ex.id+'-exam'} exam exercise={ex} chapter={chapter} store={store} fontSize={fontSize}/>)}</>;
 return null;
}
const toolsMenu:[View['kind'],string][]=[['dictionary','Sanakirja'],['grammar','Kielioppi'],['notes','Muistiinpanot'],['bookmarks','Kirjanmerkit'],['media','Mediat'],['sources','Lähteet'],['progress','Osaaminen'],['exams','Kokeet'],['settings','Lukuasetukset']];
export function LosApp({ownerId}:{ownerId:string}){
 const navigate=useNavigate();
 const [view,setView]=useState<View>(initial);
 const [wordSearch,setWordSearch]=useState('');
 const store=useLosStore(ownerId);
 const fontSize=typeof item(store,'setting:fontSize')==='number'?Number(item(store,'setting:fontSize')):18;
 useEffect(()=>{const update=()=>setView(parseHash());update();window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
 const go=(v:View)=>{window.location.hash='/'+[v.kind,v.kind==='lesson'?v.lesson:v.cid,v.section].filter(Boolean).map(encodeURIComponent).join('/');setView(v);window.scrollTo({top:0,behavior:'instant'});};
 const goApp=(p:StudyPage)=>{const urls:Record<StudyPage,string>={today:'/today',plan:'/plan',courses:'/studies',practice:'/practice',progress:'/progress',exams:'/exams',settings:'/settings'};void navigate({to:urls[p]});};
 const chapter=chapters.find(c=>c.id===view.cid);
 const lesson=lessons.find(l=>l.id===view.lesson);
 const finishedLessons=lessons.filter(l=>item(store,'lesson:'+l.id)===true).length;
 const reviews=Object.entries(store.items).filter(([key,v])=>key.startsWith('review:')&&v&&typeof v==='object'&&'due' in v&&String((v as {due:string}).due)<=new Date().toISOString().slice(0,10));
 const dictionaryResults=allWords.filter(w=>(w.de+' '+w.fi).toLocaleLowerCase('de').includes(wordSearch.toLocaleLowerCase('de'))).slice(0,80);
 const lessonSteps=lesson?.id==='L001'?['Opas','Oma tavoite','Teksti B']:lesson?.chapterId?(Number(lesson.id.slice(1))-2)%5===0?['Aloita','Teksti A','Ymmärrä']:(Number(lesson.id.slice(1))-2)%5===1?['Teksti A','Ymmärrä','Sanasto']:(Number(lesson.id.slice(1))-2)%5===2?['Kielioppi','Harjoittele']:(Number(lesson.id.slice(1))-2)%5===3?['Teksti B','Käytä saksaa']:['Kulttuuri','Kappaletesti']:['Kertaus'];
 const [step,setStep]=useState(0);
 useEffect(()=>setStep(0),[lesson?.id]);
 return <AppShell page="courses" pageTitle="LOS! 1" pageEyebrow="Saksa B3 · SAB31 · 2 op" moreOpen={false}
  onMoreOpenChange={()=>{}} onNavigate={goApp} onLog={()=>void navigate({to:'/studies'})} onSearch={()=>go({kind:'dictionary'})}>
  <div className="los" id="los-root">
   <div className="los-top"><button className="los-quiet" onClick={()=>go({kind:'home'})}><ChevronLeft size={17}/> LOS! 1</button><span>Perustason alkeet 1 · Tutustu ja ihastu saksan kieleen</span><StateLabel status={store.status} error={store.error}/></div>
   <div className="los-layout">
    <nav className="los-sidebar" aria-label="LOS!-kirjan sisällysluettelo">
     <b>LOS! 1</b>
     <button onClick={()=>go({kind:'home'})}>Etusivu</button>
     <button onClick={()=>go({kind:'contents'})}>Sisällysluettelo</button>
     <button onClick={()=>go({kind:'lessons'})}>Opetuspolku</button>
     <button onClick={()=>go({kind:'review'})}>Kertaus</button>
     <div className="los-nav-divider"/>
     {chapters.map(c=><button key={c.id} onClick={()=>go({kind:'chapter',cid:c.id,section:'Aloita'})}>{c.id.slice(1)} {c.name}</button>)}
     <div className="los-nav-divider"/>
     {toolsMenu.map(([key,label])=><button key={key} onClick={()=>go({kind:key})}>{label}</button>)}
     <button onClick={()=>go({kind:'library'})}>LOS!-sarja</button>
    </nav>
    <main className="los-main">
     <details className="los-mobile-nav"><summary><Menu size={17}/> Kirjan valikko</summary><div>
      {([['home','Etusivu'],['contents','Sisällysluettelo'],['lessons','Opetuspolku'],['review','Kertaus'],...toolsMenu] as [View['kind'],string][]).map(([kind,label])=><button key={kind} onClick={e=>{go({kind});e.currentTarget.closest('details')?.removeAttribute('open')}}>{label}</button>)}
      {chapters.map(c=><button key={c.id} onClick={e=>{go({kind:'chapter',cid:c.id,section:'Aloita'});e.currentTarget.closest('details')?.removeAttribute('open')}}>{c.id} {c.name}</button>)}
     </div></details>
     {view.kind==='home'?<div>
      <Label>LOS! 1 · SAB31 · 2 OP</Label>
      <h1>Tutustu ja ihastu saksan kieleen</h1>
      <p>Oikea nollasta alkava saksan oppikirja. Versio {LOS_VERSION} on keskeneräinen toimitus, eikä koko kirja ole vielä valmis.</p>
      <div className="los-art-pending" role="status">Hyväksytty kansi ja banneri odottavat alkuperäisiä IMG_3444.jpeg / IMG_3445.jpeg -tiedostoja. Kuvia ei korvata generoidulla grafiikalla.</div>
      <div className="los-stats"><span>Oppitunnit <b>{finishedLessons} / 60</b></span><span>Kertaukset tänään <b>{reviews.length}</b></span></div>
      <div className="los-home-actions">
       <button onClick={()=>go({kind:'lesson',lesson:lessons.find(l=>item(store,'lesson:'+l.id)!==true)?.id??'L001'})}>Aloita / jatka opiskelua <ChevronRight size={17}/></button>
       <button onClick={()=>go({kind:'contents'})}>Sisällysluettelo</button>
       <button onClick={()=>go({kind:'lessons'})}>Opetuspolku</button>
       <button onClick={()=>go({kind:'review'})}>Kertaa</button>
      </div>
      <h2>Kappaleet</h2>
      <div className="los-chapters">{chapters.map(c=><button key={c.id} onClick={()=>go({kind:'chapter',cid:c.id,section:'Aloita'})}>
       <span className="los-number">{c.id.slice(1)}</span><span><b lang="de">{c.name}</b><small>{c.goal}</small></span><span className="los-status">{c.status==='text-reviewed'?'Lähdeteksti tuotu':'Lähde kesken'}</span>
      </button>)}</div>
     </div>:null}
     {view.kind==='library'?<><Label>SAKSA B3</Label><h1>LOS!-oppikirjasto</h1><p>Kahdeksan itsenäisen oppikirjan sarja. Ensimmäisen kirjan toteutus on käynnissä.</p><div className="los-book-grid">{['Tutustu ja ihastu saksan kieleen','Saksaa arjessa','Saksaa vapaa-aikana ja lomalla','Elämää Saksassa ja Suomessa','Hyvinvointia ja elämää nyt ja tulevaisuudessa','Kulttuuria saksaksi','Opiskelua ja työelämää saksaksi','Muuttuva maailma saksaksi'].map((title,i)=><div key={title} className="los-book-card"><div className="los-book-placeholder">LOS! {i+1}<small>Ei kansiassetia</small></div><b>LOS! {i+1}</b><p>{title}</p><small>SAB3{i+1} · {i===0?'Osittain toteutettu':'Ei vielä toteutettu'}</small>{i===0?<button onClick={()=>go({kind:'home'})}>Avaa kirja</button>:null}</div>)}</div></>:null}
     {view.kind==='contents'?<><h1>Sisällysluettelo</h1><p>10 kappaletta · 60 oppituntia · SAB31</p>
      <div className="los-chapters">{chapters.map(c=><div key={c.id} className="los-content-row"><button onClick={()=>go({kind:'chapter',cid:c.id,section:'Aloita'})}><span className="los-number">{c.id.slice(1)}</span><b lang="de">{c.name}</b><span>{c.status==='source-pending'?'Julkaisuportti auki':'Teksti käytettävissä'}</span></button><div className="los-mini-sections">{sections.map(s=><button key={s} onClick={()=>go({kind:'chapter',cid:c.id,section:s})}>{s}</button>)}</div></div>)}</div>
      <button onClick={()=>go({kind:'exams'})}>Kertaukset ja kokeet</button></>:null}
     {view.kind==='chapter'&&chapter?<><Label>KAPPALE {chapter.id.slice(1)} / 10</Label><h1 lang="de">{chapter.name}</h1><p>{chapter.goal}</p>
      <div className="los-tabs" aria-label="Kappaleen osiot">{sections.map(section=><button key={section} aria-current={(view.section??'Aloita')===section?'page':undefined} onClick={()=>go({kind:'chapter',cid:chapter.id,section})}>{section}</button>)}</div>
      <ChapterSection chapter={chapter} section={view.section??'Aloita'} store={store} fontSize={fontSize}/>
      <div className="los-note"><h3>Oma muistiinpano</h3><textarea aria-label={'Muistiinpanot '+chapter.name} rows={3} value={valueString(store,'note:'+chapter.id)} onChange={e=>store.put('note:'+chapter.id,e.target.value)} placeholder="Kirjoita, mitä opit tai mikä jäi epäselväksi…"/></div>
      <div className="los-actions"><button onClick={()=>store.put('bookmark:'+chapter.id,{section:view.section??'Aloita',version:LOS_VERSION})}><Bookmark size={16}/> Lisää kirjanmerkki</button>
      <button onClick={()=>go({kind:'chapter',cid:chapter.id,section:sections[(sections.indexOf((view.section??'Aloita') as typeof sections[number])+1)%sections.length]})}>Seuraava osio <ChevronRight size={17}/></button></div>
     </>:null}
     {view.kind==='lessons'?<><h1>Opetuspolku</h1><p>60 joustavaa noin 30 minuutin oppituntia, ei aikarajalaskuria. Tämä versio sisältää käyttökelpoiset alkutunnit. Muut tunnit erotetaan keskeneräisinä.</p><div className="los-lesson-list">{lessons.map(l=><button key={l.id} onClick={()=>go({kind:'lesson',lesson:l.id})}><b>{l.id}</b><span>{l.name}<small>{l.section} · noin 30 min</small></span><span>{item(store,'lesson:'+l.id)===true?'Suoritettu':l.status==='initial-material'?'Aloita':'Sisältö kesken'}</span></button>)}</div></>:null}
     {view.kind==='lesson'&&lesson?<><Label>TUNTI {Number(lesson.id.slice(1))} / 60</Label><h1>{lesson.name}</h1><p>{lesson.section} · noin 30 minuuttia, omaan tahtiin</p>
      {lesson.status==='pending'?<p className="los-warning">Tämän tunnin julkaisuportti on edelleen avoin. Linkitettyä sisältöä voi tarkastella, mutta tuntia ei merkitä valmiiksi keskeneräisen aineiston perusteella.</p>:null}
      <div className="los-stats"><span>Vaihe <b>{step+1}/{lessonSteps.length}</b></span><span>Tila <b>{item(store,'lesson:'+lesson.id)===true?'Suoritettu':'Kesken'}</b></span></div>
      <div className="los-step"><Label>{lessonSteps[step]}</Label>
       {lesson.id==='L001'&&step===0?<div className="los-prose"><h2>Näin opiskelet</h2><p>Valitse oppikirjasta kappale tai seuraa vapaaehtoista opetuspolkua. Kaikki tekstit on tarkoitus lukea LOS!:ssa. Napauta sanaa saadaksesi selityksen. Oikea korostustussi on erillään omista merkinnöistäsi.</p><p>Vihjeitä saa käyttää harjoittelussa. Kokeessa vastaus palautetaan ilman niitä. Edistyminen ei tarkoita samaa asiaa kuin osaaminen.</p></div>:null}
       {lesson.id==='L001'&&step===1?<><h2>Kirjoita oma tavoitteesi</h2><textarea aria-label="Oma tavoite" rows={4} value={valueString(store,'goal:los1')} onChange={e=>store.put('goal:los1',e.target.value)} placeholder="Haluan esimerkiksi osata tervehtiä ja esitellä itseni saksaksi." /></>:null}
       {lesson.id==='L001'&&step===2?<Media chapter={chapters[0]}/>:null}
       {lesson.chapterId?<ChapterSection chapter={chapters.find(c=>c.id===lesson.chapterId)??chapters[0]} section={lessonSteps[step]} store={store} fontSize={fontSize}/>:null}
       {!lesson.chapterId&&lesson.id!=='L001'?<div className="los-prose"><h2>Opetussisältöä tarkistetaan</h2><p>Laajaa kertausta ja oikeaa arviointikoetta ei ole vielä hyväksytty. Tämä näkymä ei väitä suoritusta.</p><button onClick={()=>go({kind:'exams'})}>Kokeiden tilanne</button></div>:null}
      </div>
      <div className="los-actions">
       <button disabled={step===0} className="los-quiet" onClick={()=>setStep(s=>Math.max(0,s-1))}>Edellinen vaihe</button>
       {step<lessonSteps.length-1?<button onClick={()=>{store.put('step:'+lesson.id+':'+step,true);setStep(s=>s+1)}}>Merkitse vaihe luetuksi ja jatka</button>:
       <button disabled={lesson.status==='pending'||(lesson.id==='L001'&&!valueString(store,'goal:los1').trim())}
        onClick={()=>{store.put('step:'+lesson.id+':'+step,true);store.put('lesson:'+lesson.id,true);const next=lessons[Number(lesson.id.slice(1))];if(next)go({kind:'lesson',lesson:next.id});else go({kind:'progress'});}}>
        <CheckCircle2 size={17}/> Päätä oppitunti ja jatka</button>}
      </div>
     </>:null}
     {view.kind==='dictionary'?<><Label>DEUTSCH ↔ SUOMI</Label><h1>LOS!-sanakirja</h1><p>Tässä versiossa haku kattaa vain toimitetun LOS! 1:n sanaston. FreeDictin laajaa aineistoa ei ole vielä tuotu.</p><div className="los-search"><Search size={18}/><input aria-label="Hae sanakirjasta" value={wordSearch} onChange={e=>setWordSearch(e.target.value)} placeholder="Hae saksaksi tai suomeksi…"/></div><div className="los-vocab">{dictionaryResults.map((w,i)=><div key={w.chapterId+'-'+w.de+'-'+i} className="los-vocab-row"><b lang="de">{w.de}</b><span>{w.fi}</span><button onClick={()=>store.put('review:'+w.de,{due:new Date().toISOString().slice(0,10),stage:0})}>Lisää kertaukseen</button></div>)}</div></>:null}
     {view.kind==='grammar'?<><h1>Kielioppihakemisto</h1>{chapters.map(c=><button className="los-index-row" key={c.id} onClick={()=>go({kind:'chapter',cid:c.id,section:'Kielioppi'})}><b>{c.id}</b><span>{c.grammar.title}</span><ChevronRight size={16}/></button>)}</>:null}
     {view.kind==='notes'?<><h1>Omat muistiinpanot</h1>{chapters.map(c=><div className="los-note" key={c.id}><h2>{c.id} · {c.name}</h2><textarea aria-label={'Muistiinpanot '+c.name} rows={4} value={valueString(store,'note:'+c.id)} onChange={e=>store.put('note:'+c.id,e.target.value)}/></div>)}</>:null}
     {view.kind==='bookmarks'?<><h1>Kirjanmerkit</h1>{chapters.filter(c=>item(store,'bookmark:'+c.id)).map(c=><button className="los-index-row" key={c.id} onClick={()=>go({kind:'chapter',cid:c.id,section:(item(store,'bookmark:'+c.id) as {section:string}).section})}>{c.id} · {c.name} · Avaa tallennettu osio</button>)}{!chapters.some(c=>item(store,'bookmark:'+c.id))?<p>Et ole vielä tallentanut kirjanmerkkejä.</p>:null}</>:null}
     {view.kind==='media'?<><h1>Mediakirjasto</h1><Audio title="Franz ja Jörg, alkuperäinen dialogi (14 s)" src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg"/><Audio title="German Vocabulary – Greetings (28 s)" src="https://commons.wikimedia.org/wiki/Special:Redirect/file/German_Vocabulary_-_Greetings.ogg"/><h2>Videot, joita ei ole vielä toistotestattu</h2><p>Nicos Weg -video voidaan avata virallisessa upotuksessa. Käytettävyyttä ei ole vahvistettu eikä tästä tehdä automaattisesti arvosteltavaa tehtävää.</p><div className="los-video"><iframe src="https://www.youtube-nocookie.com/embed/dC6ZGLzdaTs" title="DW Nicos Weg A1 – Hallo! (upotus testaamatta)" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div></>:null}
     {view.kind==='sources'?<><h1>Lähteet ja tarkistustilat</h1><p>Aineistojen oikeudet tarkistetaan erikseen teksteille, äänelle ja videoille. Tekstien katselu ei edellytä näiden osoitteiden avaamista.</p>{chapters.map(c=><section className="los-note" key={c.id}><h2>{c.id} {c.name}</h2><p>{c.status==='text-reviewed'?'Tekstilohko tuotu; lisenssin ja kieliasun lopullinen QA avoin.':'Päätekstin julkaisu estynyt.'}</p><SourceNotice chapter={c}/></section>)}</>:null}
     {view.kind==='progress'?<><h1>Osaaminen</h1><p>Oppitunteja kirjattu {finishedLessons}/60. Tämä ei ole kielitaitoarvosana.</p><h2>Erilliset osaamisnäytöt</h2><p>Tehtäviin tallennetut vastausyritykset: {Object.keys(store.items).filter(x=>x.startsWith('attempt:')).length}. Viivästetyt kertaukset: {Object.keys(store.items).filter(x=>x.startsWith('review:')).length}. Nämä mittarit eivät itsessään todista A1-tasoa.</p><button onClick={()=>go({kind:'review'})}>Avaa tämän päivän kertaus</button></>:null}
     {view.kind==='review'?<><h1>Kertaa</h1><p>Harjoittele myös myöhempinä päivinä. Kertauksen viiveet 1, 3, 7, 14 ja 30 päivää. Ei pakollista streakiä.</p>{reviews.length===0?<p>Ei erääntyneitä kortteja. Voit lisätä niitä sanastosta.</p>:reviews.slice(0,16).map(([key,v])=><ReviewCard key={key} id={key} value={v} store={store}/>)}</>:null}
     {view.kind==='settings'?<><h1>Lukemisen asetukset</h1><label htmlFor="los-text-size">Saksankielisen tekstin koko: {fontSize} px</label><input id="los-text-size" type="range" min={16} max={24} value={fontSize} onChange={e=>store.put('setting:fontSize',Number(e.target.value))}/><p>Vaalea ja tumma tila periytyvät Opintopäiväkirjan asetuksista. Älä käytä puhelimen toista päällekkäistä alapalkkia.</p></>:null}
     {view.kind==='exams'?<><h1>Kokeet ja kertaukset</h1><p>Ensimmäisen kappaleen harjoitustesti on käytettävissä. Varsinainen 25 tehtävän välikoe L030 ja 50 tehtävän loppukoe L059 eivät vielä ole julkaisuvalmiita.</p><button onClick={()=>go({kind:'chapter',cid:'C01',section:'Kappaletesti'})}>C01 harjoitustesti</button>{chapters.slice(1).map(c=><button className="los-index-row" key={c.id} onClick={()=>go({kind:'chapter',cid:c.id,section:'Kappaletesti'})}>{c.id} testi · {c.exercises.length?'Osittainen':'Sisältö kesken'}</button>)}</>:null}
    </main>
   </div>
  </div>
 </AppShell>;
}
function ReviewCard({id,store}:{id:string;value:unknown;store:Store}){
 const de=id.replace(/^review:/,'');
 const [shown,setShown]=useState(false);
 const word=allWords.find(w=>w.de===de);
 const mark=(success:boolean)=>{
  const old=item(store,id) as {stage?:number}|undefined;
  store.put(id,dueDate(new Date(),success,old?.stage??0));setShown(false);
 };
 return <article className="los-review-card"><p lang="de"><b>{de}</b></p><button onClick={()=>setShown(!shown)}>{shown?'Piilota vastaus':'Näytä suomennos / ratkaisu'}</button>{shown?<><p>{word?.fi??'Katso alkuperäinen harjoitus uudelleen ja arvioi vastauksesi.'}</p><button onClick={()=>mark(true)}>Muistin</button><button className="los-quiet" onClick={()=>mark(false)}>Harjoittele uudelleen huomenna</button></>:null}</article>;
}
