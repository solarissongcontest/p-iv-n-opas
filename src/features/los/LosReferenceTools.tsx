import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, ChevronRight, Headphones, Search, Volume2 } from "lucide-react";
import { LOS_BOOKS, type LosBookDefinition } from "./catalog";
import { LosDictionarySearch } from "./LosDictionarySearch";
import { LosDictionaryCard } from "./LosDictionaryCard";
import type { LosDictionaryResult } from "./dictionaryClient";
import { LOS_1_LESSONS } from "./learningPath";
import { LosFirstLessons } from "./LosFirstLessons";
import { LOS1_EXECUTABLE_LESSONS, isLos1ExecutableLesson } from "./guidedLessons";

export type LosDestination = "overview" | "contents" | "chapter" | "text" | "understand" | "vocabulary" | "grammar" | "text-b" | "practice" | "apply" | "culture" | "test" | "appendix" | "dictionary" | "path" | "search" | "midterm" | "review" | "review-ii" | "cards" | "progress" | "final" | "summary";
import {searchLos1OriginalTexts} from "./content/los1TextSearch";
export type LosNavigate = (chapter: string | null, section: LosDestination) => void;
type WordEntry = { book: number; code: string; chapter: string; title: string; word: string; meaning: string };
type DictionarySelection =
  | {kind:"local";entry:WordEntry}
  | {kind:"published";entry:LosDictionaryResult};
const DICTIONARY = LOS_BOOKS.flatMap(book => book.chapters.flatMap(chapter =>
  chapter.vocabulary.map(item => {
    const [word, ...rest] = item.split(" – ");
    return { book: book.id, code: book.code, chapter: chapter.id, title: chapter.title, word: word ?? "", meaning: rest.join(" – ") } satisfies WordEntry;
  })
));
function compare(a: string, b: string) { return a.localeCompare(b, "de"); }

export function LosDictionary({ book, move, openBook }: { book: LosBookDefinition; move: LosNavigate; openBook: (id: number) => void }) {
  const [search, setSearch] = useState("");
  const [hidden, setHidden] = useState(false);
  const [scope, setScope] = useState<"book" | "series">("book");
  const [selection,setSelection] = useState<DictionarySelection|null>(null);
  const entries = useMemo(() => DICTIONARY.filter(entry =>
    (scope === "series" || entry.book === book.id) &&
    (entry.word.toLocaleLowerCase("de").includes(search.trim().toLocaleLowerCase("de")) ||
      entry.meaning.toLocaleLowerCase("fi").includes(search.trim().toLocaleLowerCase("fi")))
  ).sort((a,b) => compare(a.word,b.word)), [search,book.id,scope]);
  return <section className="los-inner-page los-dictionary-page">
    <p className="los-eyebrow">WÖRTERBUCH · LOS! {book.id}</p>
    <h1>Sanakirja</h1>
    <p className="los-page-intro">Laaja saksa–suomi- ja suomi–saksa-sanakirja käyttää vain erikseen hyväksyttyjä, ladattuja sanakirjalähteitä. Hakutulokset näytetään lähteineen, kun aineiston julkaisu on vahvistettu.</p>
    <LosDictionarySearch onOpenCard={entry=>setSelection({kind:"published",entry})} />
    {selection?.kind==="published" && <LosDictionaryCard floating
      word={selection.entry.lemma} publishedEntry={selection.entry}
      onClose={() => setSelection(null)} />}
    {selection?.kind==="local" && <LosDictionaryCard floating
      word={selection.entry.word} contextMeaning={selection.entry.meaning}
      onClose={() => setSelection(null)} />}
    <h2>Kappalesanasto</h2>
    <p>Tämä erillinen paikallinen sanastoluettelo perustuu LOS!-kirjojen opetettaviin sanoihin. Se ei ole yleissanakirja. Alkuperäistekstien kokonaisia repliikkejä ja niiden suomennoksia voit hakea myös kirjan Haku-sivulla.</p>
    <div className="los-index-options">
      <div className="los-index-tabs" role="group" aria-label="Kappalesanaston laajuus">
        <button className={scope === "book" ? "is-active" : ""} aria-pressed={scope === "book"} onClick={() => setScope("book")}>Tämä kirja</button>
        <button className={scope === "series" ? "is-active" : ""} aria-pressed={scope === "series"} onClick={() => setScope("series")}>Koko sarja</button>
      </div>
      <button className="los-index-toggle" onClick={() => setHidden(v => !v)} aria-pressed={hidden}>{hidden ? "Näytä suomennokset" : "Peitä suomennokset"}</button>
    </div>
    <label className="los-index-search"><Search size={19}/><span className="sr-only">Hae saksaksi tai suomeksi</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Hae saksaksi tai suomeksi" autoComplete="off" /></label>
    <p className="los-index-count">{entries.length} kappalesanaston hakusanaa</p>
    {entries.length === 0 ? <p>Ei hakusanoja tällä rajauksella. Muut kirjat saavat hakusanastonsa, kun niiden sisällöt valmistuvat.</p> :
      <div className="los-index-table" role="table" aria-label="Sanakirjahakemisto">
        <div className="los-index-table-head" role="row"><span role="columnheader">Deutsch</span><span role="columnheader">Suomi</span><span role="columnheader">Lähde</span></div>
        {entries.map((item,i)=><div role="row" className="los-index-entry" key={`${item.book}-${item.chapter}-${i}-${item.word}`}>
          <strong role="cell"><button type="button" lang="de" className="los-index-word-card"
            aria-label={`Avaa sanakortti: ${item.word}`}
            onClick={()=>setSelection({kind:"local",entry:item})}>{item.word}</button></strong>
          <span role="cell">{hidden ? <span className="los-muted-hidden">Piilotettu</span> : item.meaning}</span>
          <button type="button" role="cell" title={`Avaa ${item.title}`} onClick={()=>item.book === book.id ? move(item.chapter, "vocabulary") : openBook(item.book)}>
            <span>{item.code} · {Number(item.chapter)}</span><ChevronRight size={15}/>
          </button>
        </div>)}
      </div>
    }
    {scope === "series" && <p className="los-index-footnote">Muiden kirjojen keskeneräiset hakemistot eivät vielä sisällä sanastoja. Tämä ei ole kattava saksan yleissanakirja.</p>}
  </section>;
}
export function LosLearningPath({ book, move }: { book: LosBookDefinition; move: LosNavigate }) {
  const [selectedLesson, setSelectedLesson] = useState("L001");
  // A book page temporarily unmounts the guided path. Restore the active lesson
  // when returning, but do not treat this UI selection as learning evidence.
  useEffect(() => {
    if (book.id !== 1) return;
    try {
      const stored = sessionStorage.getItem("los1.selectedLesson");
      if (stored && isLos1ExecutableLesson(stored)) setSelectedLesson(stored);
    } catch { /* storage denied: navigation still works in memory */ }
  }, [book.id]);
  const selectLesson = (id: string) => {
    if (!isLos1ExecutableLesson(id)) return;
    setSelectedLesson(id);
    try { sessionStorage.setItem("los1.selectedLesson", id); }
    catch { /* storage denied */ }
  };
  const groups = useMemo(() => {
    const result: { section: string; items: typeof LOS_1_LESSONS[number][] }[] = [];
    for (const lesson of LOS_1_LESSONS) {
      let group = result[result.length - 1];
      if (!group || group.section !== lesson.section) {
        group = { section: lesson.section, items: [] }; result.push(group);
      }
      group.items.push(lesson);
    }
    return result;
  }, []);
  if (book.id !== 1) return <section className="los-inner-page los-learning-path">
    <p className="los-eyebrow">OHJATTU LUKUJÄRJESTYS / {book.code}</p>
    <h1>Opetuspolku</h1>
    <p className="los-page-intro">Tämän kirjan oppituntien sisältö ja järjestys laaditaan erillisessä kirjakohtaisessa masterplanissa. LOS! 1:n oppitunteja ei käytetä tässä kirjassa.</p>
  </section>;
  return <section className="los-inner-page los-learning-path">
    <p className="los-eyebrow">OHJATTU LUKUJÄRJESTYS / {book.code}</p>
    <h1>Opetuspolku</h1>
    <p className="los-page-intro">Kirjan 60 toteutettua, pääosin noin 30 minuutin oppituntia. Opetuspolku viittaa samoihin oppikirjasivuihin, eikä tee niistä erillisiä kursseja. Välikoe ja loppukoe ovat käytettävissä; äänen ja videoiden todellinen laitetestaus sekä pedagoginen lopputarkistus ovat erillisiä julkaisuportteja.</p>
    <div className="los-path-notice"><BookOpen size={20}/><p><strong>{LOS1_EXECUTABLE_LESSONS.length}/60 oppituntia on käytettävissä.</strong> Opetuspolun oppitunnit ovat käytettävissä kaikissa kymmenessä kappaleessa sekä kertaus-, väliarviointi- ja loppuarviointijaksoissa. C08:n koko Wikibooksin kouluympäristön alkuperäiskohtaus ja C10:n Harald-haastattelu ovat nyt kirjan sisällä. Näiden kappaleiden lukemisen, kirjoittamisen ja kappaletestien oppitunnit ovat käytettävissä. Alkuperäisten audio-/videoaineistojen oikeudet, kuuntelun toimivuus, kielitason tarkistus ja julkaisuportit eivät kuitenkaan vielä ole valmiit. Erilliset EX-FINAL-loppukoe ja L060-yhteenveto ovat nyt opiskelupolussa; kummankin suoritus vaatii oikeat palautukset ja itsearvioinnit.</p></div>
    <LosFirstLessons selectedId={selectedLesson} onSelect={selectLesson} move={move} />
    {groups.map(group=><section key={group.section} className="los-path-group">
      <h2>{group.section}</h2>
      <ol>
        {group.items.map(lesson=><li key={lesson.number}>
          <button onClick={()=>{ if(isLos1ExecutableLesson("L"+String(lesson.number).padStart(3,"0"))){ selectLesson("L"+String(lesson.number).padStart(3,"0")); document.getElementById("los-lesson-runner")?.scrollIntoView({block:"start",behavior:"smooth"}); } else move(lesson.chapter,lesson.destination); }}>
            <span className="los-path-number">{String(lesson.number).padStart(2,"0")}</span>
            <span className="los-path-copy"><strong>{lesson.title}</strong><small>{isLos1ExecutableLesson("L"+String(lesson.number).padStart(3,"0")) ? "Avaa ohjattu oppitunti" : lesson.chapter ? `Kappale ${Number(lesson.chapter)} · Oppikirjan sisältöön (suoritus ei vielä käytössä)`  : "Suoritusjärjestelmä ei vielä käytössä"}</small></span>
            <ArrowRight size={18}/>
          </button>
        </li>)}
      </ol>
    </section>)}
  </section>;
}
type LosSearchHit={id:string;kind:"Kirja"|"Kappale"|"Kielioppi"|"Sanasto"|"Tavoite"|"Alkuperäisteksti";title:string;description:string;chapter:string|null;section:LosDestination};
export function LosIndexSearch({book,move}:{book:LosBookDefinition;move:LosNavigate}) {
  const [query,setQuery]=useState("");
  const hits=useMemo<LosSearchHit[]>(()=>{
    const q=query.trim().toLocaleLowerCase("fi");
    if (!q) return [];
    const out:LosSearchHit[]=[];
    const add=(item:LosSearchHit)=>{if ((item.title+" "+item.description).toLocaleLowerCase("fi").includes(q))out.push(item);};
    add({id:"book",kind:"Kirja",title:book.title,description:book.summary,chapter:null,section:"overview"});
    if(book.id===1){
      for(const line of searchLos1OriginalTexts(q,55)){
        add({
          id:"original-"+line.id,kind:"Alkuperäisteksti",
          title:"C"+line.chapterId+" · "+(line.section==="text"?"Teksti A":"Teksti B")+" · "+line.heading,
          description:(line.speaker?line.speaker+": ":"")+line.original+" · "+line.meaning,
          chapter:line.chapterId,section:line.section,
        });
      }
    }
    for (const ch of book.chapters){
      add({id:`ch-${ch.id}`,kind:"Kappale",title:ch.title,description:ch.subtitle,chapter:ch.id,section:"chapter"});
      add({id:`gr-${ch.id}`,kind:"Kielioppi",title:ch.grammar,description:ch.title,chapter:ch.id,section:"grammar"});
      for(const [i,item] of ch.vocabulary.entries()) add({id:`vo-${ch.id}-${i}`,kind:"Sanasto",title:item.split(" – ")[0]??item,description:item.split(" – ")[1]??"",chapter:ch.id,section:"vocabulary"});
      for(const [i,objective] of ch.objectives.entries())add({id:`ob-${ch.id}-${i}`,kind:"Tavoite",title:objective,description:ch.title,chapter:ch.id,section:"chapter"});
    }
    return out.slice(0,100);
  },[book,query]);
  return <section className="los-inner-page los-index-search-page">
    <p className="los-eyebrow">HAKU · {book.code}</p>
    <h1>Hae kirjasta</h1>
    <p className="los-page-intro">Hae kappaleiden nimistä, sanastosta, kieliopista, osaamistavoitteista sekä kaikista kymmenestä alkuperäisestä Teksti A -lukijasta ja niiden käytettävissä olevista kokonaisista Teksti B -litteraateista. Voit hakea myös saksankielisten repliikkien suomennoksia. Hakutulos avaa tekstin suoraan LOS!:n sisällä.</p>
    <label className="los-index-search"><Search size={19}/><span className="sr-only">Hae tästä oppikirjasta</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Hae sanaa, kappaletta tai kielioppia" /></label>
    {!query.trim()?<p className="los-index-footnote">Voit kokeilla esimerkiksi hakusanoja <b lang="de">heißen</b>, <b lang="de">Hallo</b> tai <b lang="de">kommen</b>.</p>:
      <><p className="los-index-count">{hits.length} tulosta</p>
      {hits.length ? <ul className="los-search-results">{hits.map(hit=><li key={hit.id}><button onClick={()=>move(hit.chapter,hit.section)}>
        <span className="los-search-kind">{hit.kind}</span><span className="los-search-copy"><strong>{hit.title}</strong><small>{hit.description}</small></span><ChevronRight size={20} />
      </button></li>)}</ul>:<p>Hakusanalle ei löytynyt tuloksia kirjan valmiista hakemistotiedoista.</p>}</>}
  </section>;
}

/**
 * Suoraan Wikimedia Commonsin alkuperäistiedostoon osoittava äänilähde.
 * CC BY-SA 3.0: Xzapro4 ja Erkan Yilmaz; PD: German Men92.
 * Teknisesti testattava todellisessa tuotantoympäristössä ennen READY-tilaa.
 */
const audioSources = [
  {
    id:"M-COM-01", title:"Franz ja Jörg: esittäytymiskeskustelu",
    duration:"14 s", author:"Xzapro4 ja Erkan Yilmaz", license:"CC BY-SA 3.0",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/",
    attributionUrl:"https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg",
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg",
    note:"Toisen puhujan äidinkieli ei ole saksa. Äänitettä ei esitetä kahden natiivipuhujan keskusteluna.",
  },
  {
    id:"M-COM-03",title:"Tervehdyksiä ja hyvästelyjä",
    duration:"28 s",author:"German Men92",license:"Public domain",
    licenseUrl:"https://creativecommons.org/publicdomain/mark/1.0/",
    attributionUrl:"https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Greetings.ogg",
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/German_Vocabulary_-_Greetings.ogg",
    note:"Äänite on luettu ilmausluettelo, ei yhtenäinen dialogi.",
  },
  {
    id:"M-COM-02",title:"Thomas ja Takashi: esittäytyminen ja kotipaikka",
    duration:"12 s",author:"Ariser",license:"CC BY-SA 3.0",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/",
    attributionUrl:"https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg",
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg",
    note:"Tämän neljän repliikin äänitteen jokainen puheenvuoro on näkyvissä LOS!:n Text B -osassa. Toisto vielä laitetestattava.",
  },
  {
    id:"M-COM-06",title:"Saksan aakkoset kokonaisena · endymi0n",
    duration:"1 min 1 s",author:"endymi0n (äänitys); German Men92 (Wikibooks)",
    license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/",
    attributionUrl:"https://commons.wikimedia.org/wiki/File:German_Grammar_-_The_Alphabet.ogg",
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/German_Grammar_-_The_Alphabet.ogg",
    note:"Alkuperäinen kokonainen aakkosäänite. LOS!:n kirjainrivi on opetustuki, ei vahvistettu sanatarkka litteraatti. Toisto vielä laitetestattava.",
  },
  {
    id:"M-COM-08",title:"Franz ja Greta: Wie geht's?",
    duration:"20 s",author:"Human Robot (English Wikibooks, 2006)",license:"Public domain",
    licenseUrl:"https://creativecommons.org/publicdomain/mark/1.0/",
    attributionUrl:"https://commons.wikimedia.org/wiki/File:Dialogue_franz_greta_1.ogg",
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Dialogue_franz_greta_1.ogg",
    note:"Koko kahden ihmisen alkuperäinen dialogi. C05:n kirjoitettu teksti on erikseen attribuoitu CC BY-SA 4.0 Wikibooks-lähde. Äänen ja tekstin vastaavuutta sekä toistoa ei ole vielä laitetestattu.",
  },
  {
    id:"M-COM-07",title:"Viikonpäivät: Montag–Sonntag",
    duration:"15 s",author:"Christoph (English Wikibooks, 2007)",
    license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/",
    attributionUrl:"https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Days.ogg",
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/German_Vocabulary_-_Days.ogg",
    note:"Ihmisen äänittämä täysi 7 päivän lista. Sen koko transkriptio näkyy C09:n Text B -lukijassa; äänen tekninen toimivuus testattava oikealla iPhonella ja tietokoneella.",
  },
  {
    id:"M-COM-04",title:"Wie geht es dir? · ääntämisnäyte",
    duration:"1,8 s",author:"Jeuwre",license:"CC BY-SA 4.0",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
    attributionUrl:"https://commons.wikimedia.org/wiki/File:De-wie_geht_es_dir.ogg",
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/De-wie_geht_es_dir.ogg",
    note:"Berliiniläisen äidinkielisen saksanpuhujan lausuma yksi fraasi. Ei kokonainen dialogi eikä korvaa C05:n puuttuvaa Text B -kuuntelua. Mobiilitoistoa ei ole vielä varmennettu.",
  },
  {
    id:"M-COM-05",title:"Wie geht's? · lyhyt ääntämisnäyte",
    duration:"1,7 s",author:"Jeuwre",license:"CC BY-SA 4.0",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
    attributionUrl:"https://commons.wikimedia.org/wiki/File:De-Wie_geht%27s%3F.ogg",
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/De-Wie_geht%27s%3F.ogg",
    note:"Berliiniläisen äidinkielisen saksanpuhujan lausuma yksi lyhennetty fraasi. Ei keskustelu tai koesuoritus; mobiili- ja desktop-toisto on vielä tarkistettava.",
  }
] as const;
export function LosAuthenticAudio({ chapterId, source = "all" }: { chapterId: string; source?: "A" | "B" | "all" }) {
  const [errors,setErrors] = useState<string[]>([]);
  const selected=chapterId==="01" ? (source==="A"?audioSources.slice(0,1):source==="B"?audioSources.slice(1,2):audioSources.slice(0,2)) : (chapterId==="02"||chapterId==="03") && source!=="A" ? audioSources.filter(item=>item.id==="M-COM-02") : chapterId==="05" && source!=="A"?audioSources.filter(item=>item.id==="M-COM-04"||item.id==="M-COM-05") : chapterId==="06"?audioSources.filter(item=>item.id==="M-COM-01") : chapterId==="04" && source!=="A"?audioSources.filter(item=>item.id==="M-COM-03") : chapterId==="07" && source!=="A"?audioSources.filter(item=>item.id==="M-COM-06") : chapterId==="05" && source==="B"?audioSources.filter(item=>item.id==="M-COM-08") : chapterId==="09" && source!=="A"?audioSources.filter(item=>item.id==="M-COM-07") : chapterId==="10" && source!=="A"?audioSources.filter(item=>item.id==="M-COM-02") : [];
  if(!selected.length)return null;
  return <section className="los-authentic-audio" aria-label="Alkuperäiset kuunteluäänitteet">
    <p className="los-overline">ALKUPERÄISET ÄÄNITTEET · KOKEILUTOISTO</p>
    <h2><Headphones size={22}/> Kuuntele aitoa saksaa</h2>
    <p>Äänitteet toistetaan julkaisijan palvelimelta kirjan omassa soittimessa. Toiston tekninen toimivuus on vielä testattava tässä sovelluksessa.</p>
    {selected.map(src=><div className="los-audio-line" key={src.id}>
      <div className="los-audio-label"><Volume2 size={19}/><strong>{src.title}</strong><small>{src.duration}</small></div>
      <audio controls preload="none" src={src.src} onError={()=>setErrors(previous=>previous.includes(src.id)?previous:[...previous,src.id])} aria-label={src.title}>Selaimesi ei tue äänentoistoa.</audio>
      {errors.includes(src.id)&&<p role="alert" className="los-audio-error">Äänitteen lataus epäonnistui. Tämä media ei ole tällä hetkellä käytettävissä.</p>}
      <p className="los-audio-license">Lähde: <a href={src.attributionUrl} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a> · {src.author} · <a href={src.licenseUrl} target="_blank" rel="noopener noreferrer">{src.license}</a>. {src.note}</p>
    </div>)}
  </section>;
}
