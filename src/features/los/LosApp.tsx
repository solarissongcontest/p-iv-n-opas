import {useEffect,useMemo,useRef,useState,type ReactNode} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {BookOpen,ChevronLeft,ChevronRight,Menu,Search,Volume2,Bookmark,CheckCircle2} from 'lucide-react';
import {AppShell} from '@/app/AppShell';
import {type StudyPage} from '@/app/navigation';
import {chapters,sections,lessons,allWords,LOS_VERSION,type Chapter,type Exercise,type Block} from './content';
import {gradeExercise,tokenOffsets,anchorFromSelectedTokens,dueDate,type TextAnchor,type Grade} from './engine';
import {allChapterExercises} from './practiceExtras';
import {ExamSession} from './ExamSession';
import {type FirstLessonStep} from './firstLessons';
import {guidedLessons} from './guidedLessons';
import {auditLosRelease} from './releaseAudit';
import {NumberPractice} from './NumberPractice';







import {WeekCalendarPractice} from './WeekCalendarPractice';

import {reviewOneItems} from './reviewOneItems';
import {reviewTwoItems} from './reviewTwoItems';
import {SummaryPractice} from './SummaryPractice';
import {exams,type ExamId} from './examBank';
import {lookupGloss,translationFi} from './translations';
import {useLosStore,type SyncStatus} from './useLosStore';
import './los.css';

type View = {kind:'library'|'home'|'contents'|'chapter'|'lessons'|'lesson'|'dictionary'|'grammar'|'notes'|'bookmarks'|'media'|'sources'|'progress'|'review'|'settings'|'exams'; cid?:string|undefined; section?:string|undefined;lesson?:string|undefined};
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
  {chapter.license==='CC BY-SA 3.0'?<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer"> Lisenssiehdot</a>:null}
  {chapter.license.startsWith('CC BY 4.0')?<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer"> Tekstin CC BY 4.0 -lisenssi</a>:null}
 </p>;
}
function Audio({src,title,onFailure,onCompleted}:{src:string;title:string;onFailure?:()=>void;onCompleted?:()=>void}){
 const [failed,setFailed]=useState(false);
 return <div className="los-media">
 <Label>ALKUPERÄINEN IHMISÄÄNI</Label>
 <p><Volume2 size={17} aria-hidden="true"/> {title}</p>
 {!failed?<audio controls preload="none" src={src} onEnded={onCompleted} onError={()=>{setFailed(true);onFailure?.();}} aria-label={title}/>:<p role="alert">Äänitteen lataus epäonnistui. Voit jatkaa tekstin ja sanaston avulla. Äänitettä ei merkitä kuunnelluksi.</p>}
 </div>;
}
function Media({chapter,store,fontSize=18,onAudioCompleted,lessonId}:{chapter:Chapter;store:Store;fontSize?:number;onAudioCompleted?:()=>void;lessonId?:string}){
 if(chapter.id==='C06')return <>
  <Label>TEKSTI B · ERILLINEN ALKUPERÄINEN KERTAUSÄÄNITE</Label>
  <h3>Franz ja Jörg: Wie alt bist du?</h3>
  <p>C06:n Teksti A koostuu Monika Janickan neljästä alkuperäisestä ikäminidialogista. Seuraava ääni on **eri lähteen** jo C01:ssa julkaistu 14 sekunnin Franz–Jörg-keskustelu. Ääni ei ole Janickan ZPE-keskustelujen nauhoitus.</p>
  <Audio src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg"
   title="Xzapro4 ja Erkan Yilmaz: Franz ja Jörg (14 sekuntia)"
   onCompleted={()=>{
    if(lessonId==='L034')store.put('media:completed:review:L034:M-COM-01',{at:new Date().toISOString(),version:LOS_VERSION});
    else store.put('media:completed:C06:M-COM-01',{at:new Date().toISOString(),version:LOS_VERSION});
   }}/>
  <Reader chapter={chapters[0]!} store={store} fontSize={fontSize}/>
  <p className="los-source"><b>M-COM-01</b> · Xzapro4 ja Erkan Yilmaz (2008), alkuperäinen ihmisäänite, CC BY-SA 3.0, ei muutoksia ·
   <a href="https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg" target="_blank" rel="noreferrer">Lähde ja alkuperäiset repliikit</a> ·
   <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">Lisenssi</a></p>
  <p className="los-meta">Monika Janickan oman äänitteen sovelluksen sisäistä toistoa ei ole varmennettu. C06:n pääteksti on silti kokonaisuudessaan luettavissa suomeksi käännettynä.</p>
 </>;
 if(chapter.id==='C02'&&chapter.media?.transcript)return <>
   <Label>TEKSTI B · ALKUPERÄINEN ÄÄNITETTY DIALOGI</Label>
   <h3>{chapter.media.title}</h3>
   <p>Thomas, Takashi ja Peter esittäytyvät. Tässä kuullaan myös kotipaikka, mutta ilmausta <i lang="de">Ich komme aus ...</i> harjoitellaan vasta kappaleessa 3.</p>
   <Audio src={chapter.media.url} title={chapter.media.title}
    onCompleted={()=>{store.put('media:completed:'+chapter.media!.sourceId,{at:new Date().toISOString(),version:LOS_VERSION});onAudioCompleted?.();}}/>
   <Reader chapter={{...chapter,blocks:chapter.media.transcript}} store={store} fontSize={fontSize}/>
   <p className="los-source">
    <b>{chapter.media.sourceId}</b> · {chapter.media.attribution} · {chapter.media.license} ·
    <a href={chapter.media.sourceUrl} target="_blank" rel="noreferrer"> Alkuperäinen äänite ja tekstilähde</a> ·
    <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer"> Lisenssiehdot</a>
   </p>
   <p className="los-meta">Äänite on alkuperäisen julkaisijan palvelimella, ei LOS!:iin kopioitu. Upotuksen toistettavuus testataan vielä varsinaisella mobiili- ja desktop-laitteella.</p>
  </>;
 if(chapter.id==='C08'&&chapter.media?.transcript)return <>
  <Label>TEKSTI B · KAKSI ERILLISTÄ AITOA ÄÄNTÄMISNÄYTETTÄ</Label>
  <h3>Ich verstehe nicht · wiederholen</h3>
  <p>Kuuntele kaksi erillistä alkuperäistä ihmisäänitettä: Timwin koko fraasi <i lang="de">Ich verstehe nicht</i> ja Jeuwren yhden sanan ääntämisnäyte <i lang="de">wiederholen</i>. Kumpikaan ei ole Magdalena Sieradzin kahdentoista vuoron kirjoitetun chat-keskustelun ääniversio.</p>
  <Audio src={chapter.media.url} title={chapter.media.title}
   onCompleted={()=>store.put('media:completed:M-COM-08-ICH',{at:new Date().toISOString(),version:LOS_VERSION})}/>
  <Reader chapter={{...chapter,blocks:chapter.media.transcript}} store={store} fontSize={fontSize}/>
  <p className="los-source"><b>M-COM-08-ICH</b> · Timwi (2004), alkuperäinen itse nauhoitettu fraasi, tekijän public domain -luovutus ·
   <a href={chapter.media.sourceUrl} target="_blank" rel="noreferrer"> Alkuperäinen ääni ja käyttöoikeus</a></p>
  <Audio src="https://commons.wikimedia.org/wiki/Special:Redirect/file/De-wiederholen2.ogg"
   title="wiederholen · Jeuwre, 2,1 sekuntia"
   onCompleted={()=>store.put('media:completed:M-COM-08-WIED',{at:new Date().toISOString(),version:LOS_VERSION})}/>
  <p><span lang="de">wiederholen</span> = toistaa. Tämä on erillinen yksi sana, eikä sitä voi pisteyttää koulukeskustelun autenttiseksi kuuntelemiseksi.</p>
  <p className="los-source"><b>M-COM-08-WIED</b> · Jeuwre (2020), syntyperäisen saksalaisen puhujan ihmisääni, alkuperäinen sana, CC BY-SA 4.0, ei muutoksia ·
   <a href="https://commons.wikimedia.org/wiki/File:De-wiederholen2.ogg" target="_blank" rel="noreferrer"> Äänitiedoston lähde</a> ·
   <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer"> Lisenssiehdot</a></p>
  <p className="los-meta">Molemmat kuuntelut on toistettava loppuun L044:n suoritusmerkintää varten. Jos tiedostot eivät toimi laitteella, teksti jää luettavaksi, mutta kuuntelua ei kuitata valmiiksi.</p>
 </>;
 if(chapter.id==='C07'&&chapter.media?.transcript)return <>
  <Label>TEKSTI B · ÄÄNTÄMINEN JA AAKKOSET</Label>
  <h3>Tavaa saksaksi</h3>
  <p>Kuuntele ensin saksankielisen puhujan lausuma sana <i lang="de">buchstabieren</i> ja sen jälkeen kokonainen saksan aakkosten ihmisäänite. Ne ovat kaksi eri autenttista äänitiedostoa, eivät C07:n hakemistopuhelun ääniversio.</p>
  <Audio src={chapter.media.url} title={chapter.media.title}
   onCompleted={()=>{store.put('media:completed:M-COM-07-BUCH',{at:new Date().toISOString(),version:LOS_VERSION});onAudioCompleted?.();}}/>
  <Reader chapter={{...chapter,blocks:chapter.media.transcript}} store={store} fontSize={fontSize}/>
  <p className="los-source"><b>{chapter.media.sourceId}</b> · {chapter.media.attribution} · {chapter.media.license} ·
   <a href={chapter.media.sourceUrl} target="_blank" rel="noreferrer"> Alkuperäinen sanaäänite</a> ·
   <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer"> CC BY-SA 4.0</a></p>
  <Audio src="https://commons.wikimedia.org/wiki/Special:Redirect/file/German_Grammar_-_The_Alphabet.ogg"
   title="Saksan aakkoset · endymi0n (61 sekuntia)"
   onCompleted={()=>store.put('media:completed:M-COM-07-ABC',{at:new Date().toISOString(),version:LOS_VERSION})}/>
  <div className="los-grammar-examples">
   <p lang="de" aria-label="Saksan kirjaimet A:sta Z:aan">A · B · C · D · E · F · G · H · I · J · K · L · M · N · O · P · Q · R · S · T · U · V · W · X · Y · Z</p>
   <p lang="de">Ä · Ö · Ü · ß</p>
  </div>
  <p className="los-meta">Kirjainrivi on LOS!:n toimitettu opiskelulista, ei väite äänitteen sanatarkasta litteraatista. Ääntämisnäytteessä kuullaan kirjainten ääntämistä, mutta listaa ei arvioida sanasta sanaan äänitteen perusteella.</p>
  <p className="los-source"><b>M-COM-07-ABC</b> · endymi0n (2006), saksan aakkosten alkuperäinen äänite, englanninkielisen Wikibooksin käyttäjän German Men92 lataamana · CC BY-SA 3.0 / GFDL · muokkaamaton ·
   <a href="https://commons.wikimedia.org/wiki/File:German_Grammar_-_The_Alphabet.ogg" target="_blank" rel="noreferrer"> Alkuperäinen äänite</a> ·
   <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer"> Lisenssiehdot</a></p>
  <p className="los-meta">Äänitteet toistetaan Commonsin omista tiedostoista. Puhelun alkuperäisen äänitteen lisenssi ja toiminta ovat erikseen avoimia.</p>
 </>;
 if(chapter.id==='C10')return <>
  <Label>TEKSTI B · HAASTATTELUJEN VERTAILU</Label>
  <h3>Berna ja Harald: kaksi oikeaa henkilöhaastattelua</h3>
  <p>Alla luetaan kokonaisena Bernan aiemmin julkaistu alkuperäishaastattelu ja verrataan sitä Haraldin C10 Teksti A:han. Molemmat saksankieliset tekstit ovat LOS!:n lukijassa. Kummankaan haastattelun alkuperäistä videota ei ole merkitty toimivaksi tai katsotuksi.</p>
  <Reader chapter={chapters[2]!} store={store} fontSize={fontSize}/>
  <SourceNotice chapter={chapters[2]!}/>
  <h3>Lisäkuuntelu · tuttavallinen esittäytyminen</h3>
  <p>Erillinen alkuperäinen Franzin ja Jörgin neljäntoista sekunnin dialogi on jo C01:stä tuttu. Se ei ole Haraldin eikä Bernan haastattelun äänite. Tässä kertauskuuntelussa yrität erottaa nimen, iän ja hyvästelyn.</p>
  <Audio src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg"
   title="Xzapro4 ja Erkan Yilmaz: Franz ja Jörg, 14 sekunnin alkuperäisdialogi"
   onCompleted={()=>{store.put('media:completed:review:L054:M-COM-01',{at:new Date().toISOString(),version:LOS_VERSION});onAudioCompleted?.();}}/>
  <p className="los-source"><b>M-COM-01</b> · Xzapro4 ja Erkan Yilmaz (2008), alkuperäinen kaksihenkilöinen saksankielinen äänite, CC BY-SA 3.0 ·
   <a href="https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg" target="_blank" rel="noreferrer"> Alkuperäinen äänite ja litteraatti</a> ·
   <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer"> Lisenssi</a></p>
 </>;
 if(chapter.id==='C01')return <>
  <Audio src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg" title="Franz ja Jörg, GesprächVorstellung (14 s)" onCompleted={()=>store.put("media:completed:M-COM-01",{at:new Date().toISOString(),version:LOS_VERSION})}/>
  {chapter.media?<Audio src={chapter.media.url} title={chapter.media.title} onCompleted={()=>store.put("media:completed:"+chapter.media!.sourceId,{at:new Date().toISOString(),version:LOS_VERSION})}/>:null}
  <SourceNotice chapter={chapter}/>
  <p>Ääni ja teksti ovat eri aineistotyyppejä. Äänitteitä ei luoda koneellisesti eikä luvata toimiviksi ennen toistotestausta.</p>
 </>;
 if(chapter.media?.transcript?.length)return <>
  <Label>TEKSTI B · ALKUPERÄINEN IHMISÄÄNITE</Label>
  <h3>{chapter.media.title}</h3>
  <p>{chapter.id==='C09'?'Kuuntele ensin ilman litteraattia seitsemän viikonpäivän autenttinen ääniluettelo. Toista se sitten alkuperäistä tekstilistaa seuraten. Äänite ei sisällä tapaamisajoista käytävää keskustelua.':chapter.media.transcript.length>1?'Kuuntele ensin ilman litteraattia ja toista sitten koko alkuperäinen dialogi tekstin kanssa.':'Kuuntele ensin ilman litteraattia. Tämä äänite sisältää yksittäisen puhutun fraasin, ei kokonaista dialogia.'}</p>
  <Audio src={chapter.media.url} title={chapter.media.title} onCompleted={()=>{store.put('media:completed:'+(chapter.id==='C03'?'C03:':'')+chapter.media!.sourceId,{at:new Date().toISOString(),version:LOS_VERSION});onAudioCompleted?.();}}/>
  <Reader chapter={{...chapter,blocks:chapter.media.transcript}} store={store} fontSize={fontSize}/>
  <p className="los-source"><b>{chapter.media.sourceId}</b> · {chapter.media.attribution} · {chapter.media.license} ·
   <a href={chapter.media.sourceUrl} target="_blank" rel="noreferrer"> Alkuperäinen äänitiedosto</a> ·
   <a href={chapter.media.license.includes("4.0")?"https://creativecommons.org/licenses/by-sa/4.0/":"https://creativecommons.org/licenses/by-sa/3.0/"} target="_blank" rel="noreferrer"> Lisenssiehdot</a>
  </p>
  <p className="los-meta">Teksti ja äänite ovat kirjan sisällä; toisto ladataan suoraan alkuperäisestä Wikimedia Commonsin tiedostosta. Laitetestit ovat vielä tekemättä.</p>
 </>;
 if(chapter.media)return <Audio src={chapter.media.url} title={chapter.media.title} onCompleted={()=>store.put('media:completed:'+chapter.media!.sourceId,{at:new Date().toISOString(),version:LOS_VERSION})}/>;
 return <p>Erillisen autenttisen kuuntelun käyttöönotto on vielä kesken. Tästä ei synny suoritusmerkintää.</p>;
}
function WordSheet({word,onClose,onReview}:{word:string;onClose:()=>void;onReview:(term:string)=>void}){
 const candidate=allWords.find(w=>w.de.toLocaleLowerCase('de')===word.toLocaleLowerCase('de'));
 const gloss=lookupGloss(word);
 return <div className="los-sheet-backdrop" onClick={onClose}>
  <aside className="los-word-sheet" role="dialog" aria-modal="true" aria-label="Sanan selitys" onClick={e=>e.stopPropagation()}>
   <button className="los-quiet" onClick={onClose} aria-label="Sulje sanakortti">Sulje</button>
   <h2 lang="de">{word}</h2>
   <p>{gloss?.fi??candidate?.fi??'Tälle sanalle ei ole vielä tarkistettua käännöstä. Hae myös sanakirjasta.'}</p>
   {gloss?.lemma?<p className="los-meta">Perusmuoto: <span lang="de">{gloss.lemma}</span></p>:null}
   {gloss?.note?<p className="los-meta">{gloss.note}</p>:null}
   {candidate?<p className="los-meta">Löytyy kappaleesta {candidate.chapterId}</p>:null}
   {candidate||gloss?<button onClick={()=>{onReview(candidate?.de??gloss?.lemma??word);onClose()}}>Lisää kertaukseen</button>:null}
  </aside>
 </div>;
}
function Reader({chapter,store,exerciseMode,onSelect,onClear,selection,fontSize}:{chapter:Chapter;store:Store;exerciseMode?:boolean;onSelect?:(a:TextAnchor)=>void;onClear?:()=>void;selection?:TextAnchor|null;fontSize:number}){
 const [selectedWord,setSelectedWord]=useState('');
 const [freeInk,setFreeInk]=useState(false);
 const [showTranslations,setShowTranslations]=useState(false);
 const [draft,setDraft]=useState<TextAnchor|null>(null);
 const [undoMark,setUndoMark]=useState<{before:TextAnchor|null;after:TextAnchor}|null>(null);
 const suppressNextWordClick=useRef(false);
 const isPicking=Boolean(exerciseMode||freeInk);
 const selectToken=(block:Block,start:number,end:number)=>{
  const existing=item(store,'ink:'+block.id) as TextAnchor|null;
  const previous=(exerciseMode?selection:(draft??(existing?.contentVersion===LOS_VERSION?existing:null)))??null;
  const same=previous?.blockId===block.id;
  const next:TextAnchor={blockId:block.id,start:same&&previous?Math.min(previous.start,start):start,end:same&&previous?Math.max(previous.end,end):end,contentVersion:LOS_VERSION};
  setUndoMark({before:previous,after:next});
  if(exerciseMode)onSelect?.(next);
  else {setDraft(next);store.put('ink:'+block.id,next);}
 };
 const selectDrag=(block:Block,paragraph:HTMLParagraphElement)=>{
  if(!isPicking)return;
  const selectionText=window.getSelection();
  if(!selectionText||selectionText.isCollapsed||!selectionText.rangeCount)return;
  const range=selectionText.getRangeAt(0);
  const tokens=Array.from(paragraph.querySelectorAll<HTMLElement>('[data-los-start][data-los-end]'));
  // A user can begin dragging on a blank text node between two words.
  // Inspect every intersecting word instead of assuming that both Range
  // boundary nodes themselves have data-los-start/end.
  const touched=tokens.filter(node=>{
   try{return range.intersectsNode(node)}catch{return false}
  }).map(node=>({start:Number(node.dataset['losStart']),end:Number(node.dataset['losEnd'])}));
  const next=anchorFromSelectedTokens(block.id,touched,block.text.length);
  if(!next)return;
  // A completed pointer-drag may also emit a click on its final word.
  // Ignore that click so the precisely dragged span is not overwritten.
  suppressNextWordClick.current=true;
  const existing=item(store,'ink:'+block.id) as TextAnchor|null;
  const previous=(exerciseMode?selection:(draft??existing))??null;
  setUndoMark({before:previous,after:next});
  if(exerciseMode)onSelect?.(next);
  else {setDraft(next);store.put('ink:'+block.id,next);}
  selectionText.removeAllRanges();
 };
 const undoSelection=()=>{
  if(!undoMark)return;
  if(exerciseMode){
   if(undoMark.before)onSelect?.(undoMark.before);
   else onClear?.();
  }else{
   store.put('ink:'+undoMark.after.blockId,null);
   if(undoMark.before)store.put('ink:'+undoMark.before.blockId,undoMark.before);
   setDraft(undoMark.before);
  }
  setUndoMark(null);
 };
 return <div className="los-reader">
  {!exerciseMode?<div className="los-reader-tools">
   <button aria-pressed={freeInk} onClick={()=>setFreeInk(!freeInk)}>{freeInk?'Poistu omasta korostuksesta':'Oma korostustussi'}</button>
   <button type="button" aria-pressed={showTranslations} onClick={()=>setShowTranslations(value=>!value)}>{showTranslations?'Piilota suomennokset':'Näytä suomennokset'}</button>
   <span>{freeInk?'Napauta tai maalaa sanat. Tämä korostus ei ole tehtävävastaus.':'Napauta sanaa nähdäksesi merkityksen.'}</span>
  </div>:<p className="los-meta">Tehtäväkorostus: napauta sanoja peräkkäin tai maalaa hiirellä/sormella. Vastauksen ankkurit tallennetaan tekstin merkkiväleinä.</p>}
  {exerciseMode&&(selection||undoMark)?<div className="los-reader-actions">{undoMark?<button className="los-quiet" type="button" onClick={undoSelection}>Kumoa valinta</button>:null}{selection?<button className="los-quiet" type="button" onClick={()=>{onClear?.();setUndoMark(null);}}>Pyyhi tehtäväkorostus</button>:null}</div>:null}
  <div className="los-text" lang="de" style={{fontSize:fontSize+'px'}}>
  {chapter.blocks.map(block=>{
   const tokens=tokenOffsets(block.text);
   const stored=exerciseMode?selection:item(store,'ink:'+block.id) as TextAnchor|null;
   const active=stored?.blockId===block.id&&stored.contentVersion===LOS_VERSION&&stored.start>=0&&stored.end<=block.text.length?stored:null;
   return <div key={block.id} className="los-reader-block"><p data-los-block={block.id} onPointerDown={()=>{suppressNextWordClick.current=false;}} onPointerUp={event=>selectDrag(block,event.currentTarget)}>
    {block.speaker?<strong>{block.speaker}: </strong>:null}
    {tokens.map((token,i)=>{
     const highlighted=active&&token.start>=active.start&&token.end<=active.end;
     const prevEnd=i?(tokens[i-1]?.end??0):0;
     return <span key={token.start}>
      {block.text.slice(prevEnd,token.start)}
      <span role="button" tabIndex={0} data-los-start={token.start} data-los-end={token.end}
       className={'los-word'+(highlighted?' los-marked':'')}
       aria-label={'Sana '+token.text}
       onClick={()=>{if(suppressNextWordClick.current){suppressNextWordClick.current=false;return;}if(isPicking)selectToken(block,token.start,token.end);else setSelectedWord(token.text.replace(/[.!?,:]/g,''));}}
       onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(isPicking)selectToken(block,token.start,token.end);else setSelectedWord(token.text.replace(/[.!?,:]/g,''));}}}
      >{token.text}</span>
     </span>;
    })}
    {block.text.slice(tokens[tokens.length-1]?.end??0)}
   </p>{showTranslations&&!exerciseMode&&translationFi[block.id]?<p className="los-translation" lang="fi">{translationFi[block.id]}</p>:null}</div>;
  })}
  </div>
  {selectedWord?<WordSheet word={selectedWord} onClose={()=>setSelectedWord('')} onReview={term=>store.put('review:'+term,{due:new Date().toISOString().slice(0,10),stage:0,source:chapter.id})}/>:null}
  {!exerciseMode&&freeInk?<div className="los-reader-actions">{undoMark?<button className="los-quiet" type="button" onClick={undoSelection}>Kumoa valinta</button>:null}{chapter.blocks.some(block=>Boolean(item(store,'ink:'+block.id)))?<button className="los-quiet" type="button" onClick={()=>{for(const block of chapter.blocks)store.put('ink:'+block.id,null);setDraft(null);setUndoMark(null);}}>Pyyhi tämän tekstin omat korostukset</button>:null}</div>:null}
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
 const [highlight,setHighlight]=useState<TextAnchor|null>(()=>prev&&typeof prev==='object'&&'blockId' in prev?prev as TextAnchor:null);
 const [hint,setHint]=useState(false);
 const [result,setResult]=useState<Grade|null>(null);
 const [submitted,setSubmitted]=useState(false);
 const [mediaFailed,setMediaFailed]=useState(false);
 useEffect(()=>{if(typeof prev==='string')setAnswer(prev);else if(prev&&typeof prev==='object'&&'blockId' in prev)setHighlight(prev as TextAnchor);},[prev]);
 const update=(value:string)=>{setAnswer(value);store.put(draftKey,value);setResult(null);};
 const source=chapter.blocks.find(b=>b.id===exercise.blockId);
 const ordered=answer?answer.split(' | '):[];
 const remaining=(exercise.order??[]).filter((w,i)=>ordered.filter(x=>x===w).length<(exercise.order??[]).filter((x,j)=>x===w&&j<=i).length);
 const pairs=exercise.pairs??[];
 let mapping:Record<string,string>={};
 if(answer){try{const parsed:unknown=JSON.parse(answer);if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))mapping=parsed as Record<string,string>;}catch{/* Not a mapping answer */}}
 const setMapped=(left:string,value:string)=>update(JSON.stringify({...mapping,[left]:value}));
 const submit=()=>{
  const grade=gradeExercise({...exercise,sourceText:source?.text} as Exercise & {sourceText?:string},(exercise.type==='highlight'||exercise.type==='find-text')?highlight:answer);
  setResult(grade);setSubmitted(true);
  const entry={answer:(exercise.type==='highlight'||exercise.type==='find-text')?highlight:answer,grade:grade.status,at:new Date().toISOString(),version:LOS_VERSION,exam};
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
  {(exercise.type==='highlight'||exercise.type==='find-text')&&source?<Reader chapter={{...chapter,blocks:[source]}} store={store} exerciseMode onSelect={next=>{setHighlight(next);store.put(draftKey,next);setResult(null);}} onClear={()=>{setHighlight(null);store.put(draftKey,null);setResult(null);}} selection={highlight} fontSize={fontSize}/>:null}
  {(exercise.type==='listen-choice'||exercise.type==='listen-write')&&exercise.mediaUrl?<><Audio src={exercise.mediaUrl} title={'Kuuntele alkuperäisäänite '+exercise.id} onFailure={()=>setMediaFailed(true)}/>{mediaFailed?<><p className="los-warning">Äänite ei toimi. Siirrymme saman alkuperäisaineiston lukemiseen, joten tätä yritystä ei lasketa kuuntelunäytöksi.</p><Reader chapter={chapter} store={store} fontSize={fontSize}/></>:null}</>:null}
  {exercise.type==='video'?<>{exercise.videoId&&exercise.reviewedMedia?<div className="los-video"><iframe src={'https://www.youtube-nocookie.com/embed/'+exercise.videoId} title={'Videotehtävä '+exercise.id} loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div>:null}{!exercise.reviewedMedia?<p className="los-warning">Videon sisältöä ja upotusta ei ole vielä tarkistettu. Tehtävää ei pisteytetä.</p>:null}</>:null}
  {exercise.options?<div className="los-options" role="radiogroup" aria-label={exercise.prompt}>
   {exercise.options.map(option=><label key={option}><input type="radio" name={exercise.id+(exam?'-exam':'')} value={option} checked={answer===option} onChange={()=>update(option)} disabled={exam&&submitted}/><span>{option}</span></label>)}
  </div>:null}
  {['fill','translate','listen-write','error-correction','writing'].includes(exercise.type)?(exercise.type==='writing'?
   <textarea aria-label={exercise.prompt} value={answer} onChange={e=>update(e.target.value)} rows={4} disabled={exam&&submitted} placeholder="Kirjoita vastauksesi tähän…"/>:
   <input aria-label={exercise.prompt} value={answer} onChange={e=>update(e.target.value)} disabled={exam&&submitted} lang="de" autoComplete="off" />):null}
  {['matching','article-sort','conjugation'].includes(exercise.type)&&pairs.length>0?<fieldset className="los-pairs">
   <legend className="sr-only">Täydennä jokainen rivi tehtävässä {exercise.id}</legend>
   {pairs.map(([left,right],i)=><div className="los-pair-row" key={left}>
    <label htmlFor={exercise.id+'-'+i} lang="de">{left}</label>
    {exercise.type==='conjugation'?<input id={exercise.id+'-'+i} lang="de" value={mapping[left]??''} onChange={e=>setMapped(left,e.target.value)} placeholder="Kirjoita verbimuoto" autoComplete="off"/>:
    <select id={exercise.id+'-'+i} lang="de" value={mapping[left]??''} onChange={e=>setMapped(left,e.target.value)}>
     <option value="">Valitse…</option>
     {(exercise.type==='article-sort'?['der','die','das']:pairs.map(pair=>pair[1])).slice((i+1)%pairs.length).concat((exercise.type==='article-sort'?['der','die','das']:pairs.map(pair=>pair[1])).slice(0,(i+1)%pairs.length)).filter((option,idx,items)=>items.indexOf(option)===idx).map(option=><option key={option} value={option}>{option}</option>)}
    </select>}
   </div>)}
  </fieldset>:null}
  {exercise.type==='ordering'?<div className="los-order">
   <p>Valittu järjestys: <span lang="de">{ordered.join(' ')||'Ei vielä sanoja'}</span></p>
   <div>{remaining.map((token,i)=><button key={token+i} type="button" onClick={()=>update([...ordered,token].join(' | '))}>{token}</button>)}</div>
   <button className="los-quiet" onClick={()=>update('')}>Aloita järjestys alusta</button>
  </div>:null}
  {exercise.type==='speech'?<SpeechRecorder/>:null}
  {!exam&&exercise.hint?<button className="los-quiet" onClick={()=>setHint(!hint)}>{hint?'Piilota vihje':'Näytä vihje'}</button>:null}
  {hint&&!exam?<p className="los-hint">{exercise.hint}</p>:null}
  <div className="los-actions">
   <button onClick={submit} disabled={(exam&&submitted)||(exercise.type==='video'&&!exercise.reviewedMedia)}>{exercise.type==='speech'||exercise.type==='writing'?'Avaa itsearviointimalli':'Tarkista vastaus'}</button>
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
 const exercises=allChapterExercises(chapter.id,chapter.exercises);
 if(section==='Aloita')return <div className="los-prose"><h2>Mitä opit?</h2><p>{chapter.goal}</p>{chapter.teaching.map((p,i)=><p key={i}>{p}</p>)}</div>;
 if(section==='Teksti A'||section==='Ymmärrä')return <>
  <h2>{section==='Teksti A'?'Teksti A · kokonainen lähdeteksti':'Ymmärrä lukemasi'}</h2>
  {chapter.blocks.length?<><Reader chapter={chapter} store={store} fontSize={fontSize}/><SourceNotice chapter={chapter}/></>:<p className="los-warning">Tämän kappaleen alkuperäisen päätekstin lupa tai täsmällinen lähde on vielä kesken. Ulkoista sivua ei käytetä tekstin korvikkeena.</p>}
  {section==='Teksti A'&&active&&chapter.id==='C01'?<Audio src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg" title="GesprächVorstellung (14 s)"/>:null}
  {section==='Ymmärrä'&&exercises.filter(e=>e.type==='highlight'||e.type==='find-text').map(ex=><ExerciseCard key={ex.id} exercise={ex} chapter={chapter} store={store} fontSize={fontSize}/>)}
 </>;
 if(section==='Sanasto')return <Words chapter={chapter} store={store}/>;
 if(section==='Kielioppi')return <Grammar chapter={chapter}/>;
 if(section==='Teksti B')return <><h2>Teksti B / Kuuntelu</h2><Media chapter={chapter} store={store} fontSize={fontSize}/></>;
 if(section==='Kulttuuri')return <div className="los-prose"><Label>LAND UND LEUTE</Label><h2>Kulttuuri</h2><p>{chapter.culture}</p></div>;
 if(section==='Harjoittele')return <><h2>Harjoittele</h2>{chapter.id==='C06'?<NumberPractice items={store.items} put={store.put}/>:null}{exercises.filter(e=>!['highlight','writing','speech'].includes(e.type)).map(ex=><ExerciseCard key={ex.id} exercise={ex} chapter={chapter} store={store} fontSize={fontSize}/>)}</>;
 if(section==='Käytä saksaa')return <><h2>Käytä saksaa itse</h2>{exercises.filter(e=>['writing','speech'].includes(e.type)).map(ex=><ExerciseCard key={ex.id} exercise={ex} chapter={chapter} store={store} fontSize={fontSize}/>)}</>;
 if(section==='Kappaletesti'&&chapter.status==='source-pending')return <p className="los-warning">Kappaletestiä ei ole vielä julkaistu, koska tämän kappaleen pääteksti on hyväksymättä. Harjoitteita voi tehdä erikseen.</p>;
 if(section==='Kappaletesti'&&['C01','C02','C03','C04','C05','C06','C07','C08','C09','C10'].includes(chapter.id)){
  const id=('EX-'+chapter.id) as ExamId;
  return <ExamSession id={id} store={store} onExit={()=>window.location.hash='/chapter/'+chapter.id+'/Harjoittele'} onSubmit={()=>store.put('exam:submitted:'+id,{submittedAt:new Date().toISOString(),version:LOS_VERSION})}/>;
 }
 if(section==='Kappaletesti')return <p className="los-warning" role="status">Tämän kappaleen 12–20 tehtävän riippumaton koepankki on vielä toimituksellisesti kesken. Kappaleen muita harjoituksia voi tehdä Harjoittele-välilehdellä; niitä ei näytetä virheellisesti valmiina kokeena.</p>;
 return null;
}


function FirstLessonRunner({lessonId,store,fontSize,onNext,onContents}:{lessonId:string;store:Store;fontSize:number;onNext:()=>void;onContents:()=>void}){
 const plan=guidedLessons.find(p=>p.id===lessonId);
 const [stepIndex,setStepIndex]=useState(0);
 const storedStep=item(store,'lesson:step:'+lessonId);
 useEffect(()=>{
  if(typeof storedStep==='number'&&Number.isFinite(storedStep)){
   setStepIndex(Math.max(0,Math.min(4,storedStep)));
  }
 },[storedStep]);
 if(!plan)return <p role="alert">Oppitunnin sisältösuunnitelmaa ei löydy.</p>;
 const current=plan.steps[stepIndex];
 if(!current)return <p role="alert">Oppitunnin vaihe puuttuu.</p>;
 const currentChapter=chapters.find(c=>c.id===current.chapterId)??chapters[0]!;
 const exerciseEntries=[
  ...chapters.flatMap(c=>allChapterExercises(c.id,c.exercises).map(exercise=>({exercise,chapter:c}))),
  ...reviewOneItems.map(entry=>({exercise:entry.exercise,chapter:chapters.find(c=>c.id===entry.chapterId)??chapters[0]!})),
  ...reviewTwoItems.map(entry=>({exercise:entry.exercise,chapter:chapters.find(c=>c.id===entry.chapterId)??chapters[0]!}))
 ];
 const requiredIds=current.exerciseIds??[];
 const allSubmitted=requiredIds.every(id=>
  id in exams?Boolean(item(store,'exam:submitted:'+id)):Boolean(item(store,'latest:'+id)));
 const hasGoal=lessonId!=='L001'||valueString(store,'goal:los1').trim().length>=8;
 const hasReflection=!['L006','L011','L016','L021','L026','L027','L028','L029','L030','L040','L041','L050','L055','L056','L058','L060'].includes(lessonId)||valueString(store,'lesson:reflection:'+lessonId).trim().length>=12;
 const mediaDone=(plan?.requiredMediaIds??[]).every(id=>Boolean(item(store,'media:completed:'+id)));
 const midtermAttempt=typeof item(store,'exam:no:EX-MID')==='number'?item(store,'exam:no:EX-MID') as number:0;
 const hasMidtermWriting=lessonId!=='L030'||valueString(store,'exam:self:EX-MID:'+midtermAttempt).trim().length>=30;
 const canAdvance=(current.kind!=='practice'||allSubmitted)&&(current.kind!=='goal'||hasGoal)&&(current.kind!=='reflection'||hasReflection);
 const fulfilled=mediaDone&&plan.requiredIds.every(id=>id in exams?Boolean(item(store,'exam:submitted:'+id)):Boolean(item(store,'latest:'+id)));
 const completed=item(store,'lesson:'+lessonId)===true&&store.status==='saved';
 const priorStepsDone=plan.steps.slice(0,-1).every((_,i)=>Boolean(item(store,'step:'+lessonId+':'+i)));
 const last=stepIndex===plan.steps.length-1;
 const next=()=>{
  if(!canAdvance)return;
  store.put('lesson:step:'+lessonId,Math.min(stepIndex+1,plan.steps.length-1));
  store.put('step:'+lessonId+':'+stepIndex,{completedAt:new Date().toISOString(),version:LOS_VERSION});
  if(last){
   if(!fulfilled||!hasGoal||!hasReflection||!hasMidtermWriting||!priorStepsDone)return;
   store.put('lesson:'+lessonId,true);
   return;
  }
  setStepIndex(index=>Math.min(plan.steps.length-1,index+1));
 };
 const stepContent=(st:FirstLessonStep)=>{
  if(st.kind==='goal')return <>
   <label htmlFor="los-first-goal">Oma tavoite</label>
   <textarea id="los-first-goal" rows={4} value={valueString(store,'goal:los1')} onChange={e=>store.put('goal:los1',e.target.value)}
     placeholder="Haluan osata tervehtiä ja esitellä itseni."/>
   <p className="los-meta">Vähintään kahdeksan merkkiä, jotta tavoite on konkreettinen.</p>
  </>;
  if(st.kind==='read')return <>
   <Reader chapter={currentChapter} store={store} fontSize={fontSize}/>
   <SourceNotice chapter={currentChapter}/>
  </>;
  if(st.kind==='listen')return <Media chapter={currentChapter} store={store} fontSize={fontSize} lessonId={lessonId}
    onAudioCompleted={()=>{if(currentChapter.media?.sourceId)store.put('media:completed:review:'+lessonId+':'+currentChapter.media.sourceId,{at:new Date().toISOString(),version:LOS_VERSION});}}/>;
  if(st.kind==='vocabulary')return <Words chapter={currentChapter} store={store}/>;
  if(st.kind==='grammar'||st.kind==='instruction')return <Grammar chapter={currentChapter}/>;
  if(st.kind==='practice'){
   const examId=st.exerciseIds?.find(id=>id in exams) as ExamId|undefined;
   if(examId)return <ExamSession id={examId} store={store} onExit={onContents}
     onSubmit={()=>store.put('exam:submitted:'+examId,{submittedAt:new Date().toISOString(),version:LOS_VERSION})}/>;
   if(st.exerciseIds?.includes('C09-SCHEDULE'))return <WeekCalendarPractice items={store.items} put={store.put}/>;
   if(st.exerciseIds?.includes('SUMMARY-CHECK'))return <SummaryPractice items={store.items} put={store.put}/>;
   return <>{(st.exerciseIds??[]).map(id=>{
    const entry=exerciseEntries.find(e=>e.exercise.id===id);
    return entry?<ExerciseCard key={entry.exercise.id} exercise={entry.exercise} chapter={entry.chapter} store={store} fontSize={fontSize}/>:
      <p key={id} role="alert">Pakollinen tehtävä {id} puuttuu; oppituntia ei voi kuitata suoritetuksi.</p>;
   })}</>;
  }
  if(st.kind==='reflection')return <>
   <label htmlFor="los-reflection">Itsearviointi</label>
   <textarea id="los-reflection" rows={4} value={valueString(store,'lesson:reflection:'+lessonId)}
     onChange={e=>store.put('lesson:reflection:'+lessonId,e.target.value)}
     placeholder="Muistan jo ... Vaikeinta oli ... Aion kerrata ..."/>
  </>;
  if(st.kind==='guide')return <div className="los-prose">
   <p>Kirjan tekstit, suomennokset, äänet ja harjoitukset löytyvät oppikirjan sisältä. Tehtävissä voi yrittää uudelleen; harjoituksen oikeat vastaukset näkyvät vasta tarkistuksen jälkeen. Kokeen vastaukset tulevat näkyviin vasta koko kokeen palautuksessa.</p>
   <p>Tekstilukijassa sanaa napauttamalla saat sanakortin. Tehtäväkorostus ja oma korostustussi tallennetaan erikseen.</p>
   <button onClick={onContents}>Tutki sisällysluetteloa</button>
  </div>;
  if(st.kind==='check')return <div className="los-prose">
   <p>Tämän tunnin suoritus edellyttää opetusta ja harjoituksia, mutta täydellisiä pisteitä ei vaadita. Kertaus on osa myöhempiä tunteja.</p>
   <p>Jos palvelin ei ole vahvistanut viimeisiä merkintöjä, tila näkyy tallennusjonossa. Sulje vasta, kun tallennus on vahvistettu.</p>
  </div>;
  return <div className="los-prose"><p>Yritä ensin palauttaa opittu muistista. Avaa sanasto tarvittaessa vasta sen jälkeen.</p></div>;
 };
 return <section className="los-first-lesson">
  <Label>OHJATTU OPPITUNTI · {lessonId} · NOIN 30 MIN</Label>
  <h1>{plan.title}</h1>
  <p>Viisi joustavaa vaihetta. Voit edetä omaan tahtiisi, eikä aikaa lasketa alas.</p>
  <div className="los-stats"><span>Vaihe <b>{stepIndex+1} / {plan.steps.length}</b></span><span>Suoritukset <b>{plan.requiredIds.filter(id=>id in exams?Boolean(item(store,'exam:submitted:'+id)):Boolean(item(store,'latest:'+id))).length} / {plan.requiredIds.length}</b></span><span>Oppitunti <b>{completed?'Suoritettu':item(store,'lesson:'+lessonId)===true?'Odottaa synkronointia':'Kesken'}</b></span></div>
  <ol className="los-stepper" aria-label="Oppitunnin vaiheet">{plan.steps.map((st,i)=><li key={st.id}>
   <button aria-current={i===stepIndex?'step':undefined} className={i===stepIndex?'los-active-step':''}
    onClick={()=>{setStepIndex(i);store.put('lesson:step:'+lessonId,i);}}>
    <span>{i+1}</span> {st.title}
   </button>
  </li>)}</ol>
  <section className="los-step">
   <Label>{current.id} · {current.minutes} MIN SUOSITUS</Label>
   <h2>{current.title}</h2>
   <p>{current.instructionFi}</p>
   {stepContent(current)}
  </section>
  {current.kind==='practice'&&!allSubmitted?<p role="status" className="los-hint">Palauta ensin kaikki tämän vaiheen {requiredIds.length} tehtävää. Oikein menemistä ei vaadita, mutta jokaisesta tarvitaan yritys.</p>:null}
  {plan.requiredMediaIds?.length&&!mediaDone?<p className="los-warning" role="status">Tämän oppitunnin kuuntelunäyttö puuttuu. Toista alkuperäinen äänite loppuun Teksti B -vaiheessa. Tekstilähde säilyy harjoittelukäytössä, vaikka äänen toisto ei onnistuisi.</p>:null}
  <div className="los-actions">
   <button className="los-quiet" disabled={stepIndex===0} onClick={()=>setStepIndex(i=>Math.max(0,i-1))}>Edellinen vaihe</button>
   {!last?<button disabled={!canAdvance} onClick={next}>Jatka seuraavaan vaiheeseen <ChevronRight size={17}/></button>:
    completed?<button onClick={onNext}>Seuraava oppitunti <ChevronRight size={17}/></button>:
    <button disabled={!canAdvance||!fulfilled||!hasMidtermWriting||!priorStepsDone||store.status!=='saved'} onClick={next}>
     <CheckCircle2 size={17}/> Merkitse oppitunti suoritetuksi
    </button>}
  </div>
  {last&&store.status!=='saved'?<p className="los-meta" role="status">Suorituksen viimeistely vaatii vahvistetun palvelintallennuksen. Tila: {store.status}.</p>:null}
  {last&&!hasMidtermWriting?<p role="status" className="los-warning">Välikokeen itsearvioitu kirjoitusnäyte puuttuu tai on liian lyhyt. Avaa koe uudelleen ja kirjoita vähintään noin kolme lyhyttä virkettä sen omaan kirjoituskenttään.</p>:null}
  {last&&!priorStepsDone?<p role="status" className="los-warning">Oppitunnin aiempia vaiheita ei ole vielä merkitty käydyiksi. Palaa keskeneräisiin vaiheisiin, tee tehtävät ja jatka sitten loppuun.</p>:null}
  {last&&!fulfilled?<p className="los-warning">Kaikkia oppitunnin tehtäviä ei ole vielä palautettu. Voit avata aiemman vaiheen yllä olevasta vaihevalikosta.</p>:null}
 </section>;
}

const toolsMenu:[View['kind'],string][]=[['dictionary','Sanakirja'],['grammar','Kielioppi'],['notes','Muistiinpanot'],['bookmarks','Kirjanmerkit'],['media','Mediat'],['sources','Lähteet'],['progress','Osaaminen'],['exams','Kokeet'],['settings','Lukuasetukset']];
export function LosApp({ownerId}:{ownerId:string}){
 const navigate=useNavigate();
 const [view,setView]=useState<View>(initial);
 const [wordSearch,setWordSearch]=useState('');
 const [moreOpen,setMoreOpen]=useState(false);
 const store=useLosStore(ownerId);
 const fontSize=typeof item(store,'setting:fontSize')==='number'?Number(item(store,'setting:fontSize')):18;
 useEffect(()=>{const update=()=>setView(parseHash());update();window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
 const go=(v:View)=>{window.location.hash='/'+[v.kind,v.kind==='lesson'?v.lesson:v.cid,v.section].filter((value):value is string=>Boolean(value)).map(encodeURIComponent).join('/');setView(v);window.scrollTo({top:0,behavior:'auto'});};
 const goApp=(p:StudyPage)=>{const urls:Record<StudyPage,string>={today:'/today',plan:'/plan',courses:'/studies',practice:'/practice',progress:'/progress',exams:'/exams',settings:'/settings'};void navigate({to:urls[p]});};
 const chapter=chapters.find(c=>c.id===view.cid);
 const lesson=lessons.find(l=>l.id===view.lesson);
 const finishedLessons=lessons.filter(l=>item(store,'lesson:'+l.id)===true).length;
 const reviews=Object.entries(store.items).filter(([key,v])=>key.startsWith('review:')&&v&&typeof v==='object'&&'due' in v&&String((v as {due:string}).due)<=new Date().toISOString().slice(0,10));
 const dictionaryResults=allWords.filter(w=>(w.de+' '+w.fi).toLocaleLowerCase('de').includes(wordSearch.toLocaleLowerCase('de'))).slice(0,80);
 const lessonPosition=lesson?.chapterId?(Number(lesson.id.slice(1))<=26?(Number(lesson.id.slice(1))-2)%5:(Number(lesson.id.slice(1))-31)%5):0;
 const lessonSteps=lesson?.id==='L001'?['Opas','Oma tavoite','Teksti B']:lesson?.chapterId?lessonPosition===0?['Aloita','Teksti A','Ymmärrä']:lessonPosition===1?['Teksti A','Ymmärrä','Sanasto']:lessonPosition===2?['Kielioppi','Harjoittele']:lessonPosition===3?['Teksti B','Käytä saksaa']:['Kulttuuri','Kappaletesti']:['Kertaus'];
 const [step,setStep]=useState(0);
 useEffect(()=>setStep(0),[lesson?.id]);
 return <AppShell page="courses" pageTitle="LOS! 1" pageEyebrow="Saksa B3 · SAB31 · 2 op" moreOpen={moreOpen}
  onMoreOpenChange={setMoreOpen} onNavigate={goApp} onLog={()=>void navigate({to:'/studies'})} onSearch={()=>go({kind:'dictionary'})}>
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
    <div className="los-main">
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
       <button onClick={()=>go({kind:'lesson',lesson:lessons.find(l=>l.status==='initial-material'&&item(store,'lesson:'+l.id)!==true)?.id??'L001'})}>Aloita / jatka opiskelua <ChevronRight size={17}/></button>
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
      <button onClick={()=>go({kind:'chapter',cid:chapter.id,section:sections[(sections.indexOf((view.section??'Aloita') as typeof sections[number])+1)%sections.length]??'Aloita'})}>Seuraava osio <ChevronRight size={17}/></button></div>
     </>:null}
     {view.kind==='lessons'?<><h1>Opetuspolku</h1><p>60 joustavaa noin 30 minuutin oppituntia, ei aikarajalaskuria. Tämä versio sisältää käyttökelpoiset alkutunnit. Muut tunnit erotetaan keskeneräisinä.</p><div className="los-lesson-list">{lessons.map(l=><button key={l.id} onClick={()=>go({kind:'lesson',lesson:l.id})}><b>{l.id}</b><span>{l.name}<small>{l.section} · noin 30 min</small></span><span>{item(store,'lesson:'+l.id)===true?'Suoritettu':l.status==='initial-material'?'Aloita':'Sisältö kesken'}</span></button>)}</div></>:null}
     {view.kind==='lesson'&&lesson&&guidedLessons.some(p=>p.id===lesson.id)?<FirstLessonRunner key={lesson.id} lessonId={lesson.id} store={store} fontSize={fontSize} onNext={()=>{const next=lessons.slice(Number(lesson.id.slice(1))).find(l=>l.status==='initial-material');go(next?{kind:'lesson',lesson:next.id}:{kind:'progress'});}} onContents={()=>go({kind:'contents'})}/>:null}
     {view.kind==='lesson'&&lesson&&lesson.id==='L059'?<ExamSession id='EX-FINAL' store={store} onExit={()=>go({kind:'lessons'})} onSubmit={()=>store.put('exam:preview:'+lesson.id,{submittedAt:new Date().toISOString(),version:LOS_VERSION,status:'provisional-assessment'})}/>:null}
     {view.kind==='lesson'&&lesson&&!guidedLessons.some(p=>p.id===lesson.id)&&lesson.id!=='L059'?<><Label>TUNTI {Number(lesson.id.slice(1))} / 60</Label><h1>{lesson.name}</h1><p>{lesson.section} · noin 30 minuuttia, omaan tahtiin</p>
      {lesson.status==='pending'?<p className="los-warning">Tämän tunnin julkaisuportti on edelleen avoin. Linkitettyä sisältöä voi tarkastella, mutta tuntia ei merkitä valmiiksi keskeneräisen aineiston perusteella.</p>:null}
      <div className="los-stats"><span>Vaihe <b>{step+1}/{lessonSteps.length}</b></span><span>Tila <b>{item(store,'lesson:'+lesson.id)===true?'Suoritettu':'Kesken'}</b></span></div>
      <div className="los-step"><Label>{lessonSteps[step]}</Label>
       {lesson.id==='L001'&&step===0?<div className="los-prose"><h2>Näin opiskelet</h2><p>Valitse oppikirjasta kappale tai seuraa vapaaehtoista opetuspolkua. Kaikki tekstit on tarkoitus lukea LOS!:ssa. Napauta sanaa saadaksesi selityksen. Oikea korostustussi on erillään omista merkinnöistäsi.</p><p>Vihjeitä saa käyttää harjoittelussa. Kokeessa vastaus palautetaan ilman niitä. Edistyminen ei tarkoita samaa asiaa kuin osaaminen.</p></div>:null}
       {lesson.id==='L001'&&step===1?<><h2>Kirjoita oma tavoitteesi</h2><textarea aria-label="Oma tavoite" rows={4} value={valueString(store,'goal:los1')} onChange={e=>store.put('goal:los1',e.target.value)} placeholder="Haluan esimerkiksi osata tervehtiä ja esitellä itseni saksaksi." /></>:null}
       {lesson.id==='L001'&&step===2?<Media chapter={chapters[0]!} store={store} fontSize={fontSize}/>:null}
       {lesson.chapterId?<ChapterSection chapter={chapters.find(c=>c.id===lesson.chapterId)??chapters[0]!} section={lessonSteps[step]??'Aloita'} store={store} fontSize={fontSize}/>:null}
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
     {view.kind==='media'?<><h1>Mediakirjasto</h1><Audio title="Franz ja Jörg, alkuperäinen dialogi (14 s)" src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg"/><Audio title="German Vocabulary – Greetings (28 s)" src="https://commons.wikimedia.org/wiki/Special:Redirect/file/German_Vocabulary_-_Greetings.ogg"/><h2>Videot, joita ei ole vielä toistotestattu</h2><p>Nicos Weg -video voidaan avata virallisessa upotuksessa. Käytettävyyttä ei ole vahvistettu eikä tästä tehdä automaattisesti arvosteltavaa tehtävää.</p><p className="los-warning">Virallista videoupotusta ei ole vielä tarkistettu alkuperäisen palveluntarjoajan kautta. Video pidetään julkaisuportin takana eikä sen perusteella pisteytetä vastauksia.</p></>:null}
     {view.kind==='sources'?<><h1>Lähteet ja julkaisun tarkistustilat</h1>
      <p>Alkuperäiset tekstit luetaan kokonaisuudessaan LOS!:ssa. Julkaisuportin tila ei muutu hyväksytyksi vain siksi, että lähdesivu tai kooditesti toimii.</p>
      {(()=>{const audit=auditLosRelease();return <>
       <h2>Oppikirjan toimituksellinen tilanne</h2>
       <div className="los-stats">
        <span>Päätekstit <b>{audit.textsImported}/10 tuotu</b></span>
        <span>Ohjatut tunnit <b>{audit.lessonsAuthored}/{audit.lessonsTotal}</b></span>
        <span>Kappalekokeet <b>{audit.chapterExams}/10 alustavaa</b></span>
        <span>Alustava ydinsanasto <b>{audit.uniqueCoreWords} eri merkintää</b></span>
       </div>
       <p className="los-warning" role="status">{audit.ready?'Kaikki G1–G8-portit hyväksytty.':'Koko LOS! 1 ei ole vielä julkaisuvalmis. Lähteiden, laitteiden ja tietokannan erilliset hyväksynnät ovat edelleen avoimia.'}</p>
       <h2>Julkaisuportit G1–G8</h2>
       <div className="los-gate-list">{audit.gates.map(g=><section className="los-note" key={g.id}>
        <h3>{g.id} · {g.title} · {g.passed?'Hyväksytty':'Avoin'}</h3>
        <p>{g.detail}</p>
       </section>)}</div>
       <h2>Vielä toteuttamatta olevat oppitunnit</h2>
       <p>{audit.unauthoredLessonIds.join(', ')||'Kaikilla tunnuksilla on käsikirjoitettu opetuspolku.'}</p>
       {audit.additionalBlocks.map(block=><p key={block.id}><b>{block.id} · {block.resolved?'Varmistettu':'Avoin'}</b>: {block.detail}</p>)}
      </>})()}
      <h2>Alkuperäisten päätekstien lähdemerkinnät</h2>
      {chapters.map(c=><section className="los-note" key={c.id}><h3>{c.id} {c.name}</h3><p>{c.status==='text-reviewed'?'Koko lähdeteksti alustavasti tuotu kirjan sisään. Lopullinen tekijänoikeus- ja kieliasutarkistus edelleen avoin.':'Päätekstin käyttö ja oppituntien hyväksyntä estetty, kunnes kokonainen alkuperäinen lähde on saatu.'}</p><SourceNotice chapter={c}/></section>)}
     </>:null}
     {view.kind==='progress'?<><h1>Osaaminen</h1><p>Oppitunteja kirjattu {finishedLessons}/60. Tämä ei ole kielitaitoarvosana.</p><h2>Erilliset osaamisnäytöt</h2><p>Tehtäviin tallennetut vastausyritykset: {Object.keys(store.items).filter(x=>x.startsWith('attempt:')).length}. Viivästetyt kertaukset: {Object.keys(store.items).filter(x=>x.startsWith('review:')).length}. Nämä mittarit eivät itsessään todista A1-tasoa.</p><button onClick={()=>go({kind:'review'})}>Avaa tämän päivän kertaus</button></>:null}
     {view.kind==='review'?<><h1>Kertaa</h1><p>Harjoittele myös myöhempinä päivinä. Kertauksen viiveet 1, 3, 7, 14 ja 30 päivää. Ei pakollista streakiä.</p>{reviews.length===0?<p>Ei erääntyneitä kortteja. Voit lisätä niitä sanastosta.</p>:reviews.slice(0,16).map(([key,v])=><ReviewCard key={key} id={key} value={v} store={store}/>)}</>:null}
     {view.kind==='settings'?<><h1>Lukemisen asetukset</h1><label htmlFor="los-text-size">Saksankielisen tekstin koko: {fontSize} px</label><input id="los-text-size" type="range" min={16} max={24} value={fontSize} onChange={e=>store.put('setting:fontSize',Number(e.target.value))}/><p>Vaalea ja tumma tila periytyvät Opintopäiväkirjan asetuksista. Älä käytä puhelimen toista päällekkäistä alapalkkia.</p></>:null}
     {view.kind==='exams'?<><h1>Kokeet ja kertaukset</h1><p>Väli- ja loppukokeiden alustavat, erikseen palautettavat 25 ja 50 tehtävän kysymyspankit toimivat. Lähde- ja mediavalidointi on kuitenkin kesken; nämä eivät vielä täytä lopullista julkaisukriteeriä.</p><div className="los-actions"><button onClick={()=>go({kind:'lesson',lesson:'L030'})}>Avaa L030 · Välikoe</button><button onClick={()=>go({kind:'lesson',lesson:'L059'})}>Avaa L059 · Loppukoe</button></div><button onClick={()=>go({kind:'chapter',cid:'C01',section:'Kappaletesti'})}>C01 harjoitustesti</button>{chapters.slice(1).map(c=><button className="los-index-row" key={c.id} onClick={()=>go({kind:'chapter',cid:c.id,section:'Kappaletesti'})}>{c.id} testi · {c.status==='text-reviewed'?'Osittainen':'Pääteksti kesken'}</button>)}</>:null}
    </div>
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
