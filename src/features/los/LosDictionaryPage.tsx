import {useMemo,useState} from "react";
import {ArrowLeft,ArrowRight,BookOpen,Search} from "lucide-react";
import {LOS_BASE_PATH,LOS_BOOKS,bookPath} from "./books";
import {buildLosDictionary,searchLosDictionary,type DictionaryDirection} from "./dictionary";

/** A working course dictionary indexed exclusively from the actual
 * German–Finnish learner vocabulary inside LOS! books. This is not
 * a comprehensive general dictionary or a phonetic pronunciation service.
 */
export function LosDictionaryPage(){
 const [query,setQuery]=useState("");
 const [direction,setDirection]=useState<DictionaryDirection>("de-fi");
 const [selectedBook,setSelectedBook]=useState("all");
 const entries=useMemo(()=>buildLosDictionary(LOS_BOOKS),[]);
 const scoped=useMemo(()=>selectedBook==="all" ? entries :
  entries.filter(item=>item.locations.some(location=>location.bookId===selectedBook)),
  [entries,selectedBook]);
 const {total,results}=useMemo(()=>searchLosDictionary(scoped,query,direction,60),
  [scoped,query,direction]);
 const activeBooks=LOS_BOOKS.filter(book=>book.blocks.some(block=>
  block.kind==="vocabulary"&&block.entries.length>0));
 return <main className="los-app los-dictionary">
   <div className="los-context"><a href={LOS_BASE_PATH}><ArrowLeft size={17}/> Oppikirjasto</a><span>Saksa B3 · sanahaku</span></div>
   <header className="los-dictionary-header">
     <p className="los-eyebrow">DEUTSCH ↔ SUOMI</p>
     <h1>LOS!-sanahaku</h1>
     <p className="los-intro">Etsi saksan- ja suomenkielisiä sanoja ja ilmauksia, jotka on jo opetettu LOS!-kirjojen omissa sanastoissa. Kaikki tulokset tulevat oikeista oppikirjan sanastokorteista. Ulkopuolisia sanakirjaosumia, arvattuja käännöksiä tai keksittyä ääntämistä ei näytetä.</p>
   </header>
   <section className="los-dictionary-controls" aria-label="Sanakirjan haku">
     <fieldset className="los-dictionary-direction">
       <legend>Haun suunta</legend>
       <label><input type="radio" name="los-dictionary-direction" value="de-fi"
         checked={direction==="de-fi"} onChange={()=>setDirection("de-fi")}/>
         Saksa → suomi</label>
       <label><input type="radio" name="los-dictionary-direction" value="fi-de"
         checked={direction==="fi-de"} onChange={()=>setDirection("fi-de")}/>
         Suomi → saksa</label>
     </fieldset>
     <div className="los-dictionary-search">
       <label htmlFor="los-dictionary-query">Hae sanalla tai ilmauksella</label>
       <div className="los-dictionary-search-input"><Search size={20} aria-hidden="true"/>
         <input id="los-dictionary-query" type="search" autoCapitalize="none"
           spellCheck={false} autoComplete="off" value={query}
           placeholder={direction==="de-fi"?"Esim. Montag, schön, verstehen":"Esim. maanantai, kotoisin, kiitos"}
           onChange={event=>setQuery(event.target.value)}/></div>
     </div>
     <div className="los-dictionary-filter">
       <label htmlFor="los-dictionary-book">Rajaa kirjaan</label>
       <select id="los-dictionary-book" value={selectedBook}
         onChange={event=>setSelectedBook(event.target.value)}>
         <option value="all">Kaikki saatavilla olevat kirjat</option>
         {activeBooks.map(book=><option key={book.id} value={book.id}>LOS! {book.number} · {book.title}</option>)}
       </select>
     </div>
   </section>
   <p className="los-dictionary-count" role="status" aria-live="polite">
     {query.trim()?total+" hakutulosta":total+" saatavilla olevaa saksan ja suomen sanastoparia"}
     {total>results.length?" · Näytetään "+results.length+" ensimmäistä":""}
   </p>
   {total===0?<section className="los-empty" role="status">
     <BookOpen size={24} aria-hidden="true"/>
     <h2>Ei osumia oppikirjan sanastosta</h2>
     <p>Kokeile lyhyempää hakua tai vaihda suuntaa. Tämä on vielä rajattu LOS!-sanakirja, ei täydellinen saksan yleissanakirja.</p>
   </section>:
   <ol className="los-dictionary-results">{results.map(({entry})=>
     <li className="los-dictionary-entry" key={entry.id}>
       <div className="los-dictionary-translation">
         <strong lang={direction==="de-fi"?"de":"fi"}>{direction==="de-fi"?entry.de:entry.fi}</strong>
         <span className="los-dictionary-equals" aria-hidden="true">↔</span>
         <span lang={direction==="de-fi"?"fi":"de"}>{direction==="de-fi"?entry.fi:entry.de}</span>
       </div>
       {!!entry.notes.length && <div className="los-dictionary-notes">{entry.notes.map((note,i)=>
         <p key={i}>{note}</p>)}</div>}
       <div className="los-dictionary-references">
         {entry.locations.map(location=>{
           const book=LOS_BOOKS.find(item=>item.id===location.bookId);
           if(!book)return null;
           return <a key={location.bookId+":"+location.chapterId}
             href={location.chapterId?
               bookPath(book,"kappale/"+location.chapterId.slice(1)+"/sanasto"):
               bookPath(book,"sanastot")}
             aria-label={"Avaa LOS! "+location.bookNumber+", "+location.chapterTitle+" -sanasto"}>
             LOS! {location.bookNumber} · {location.chapterTitle}<ArrowRight size={14} aria-hidden="true"/>
           </a>;
         })}
       </div>
     </li>)}</ol>}
   <p className="los-dictionary-disclaimer">
     Sisältö muodostuu LOS!:n olemassa olevista sanastokorteista, ei erikseen hankitusta FreeDict-sanastosta. Sanaparien määrä ei mittaa koko aktiivisen sanavaraston kokoa: sama ilmaus voi esiintyä useassa kappaleessa ja eri merkityksiä voi olla useita. Ääntäminen, taivutusmuodot, esimerkkien täydellinen tarkistus ja yleissanakirjan laajennus ovat myöhempiä töitä.
   </p>
 </main>;
}
