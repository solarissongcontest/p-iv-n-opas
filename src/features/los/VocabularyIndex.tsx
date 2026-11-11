import { useEffect, useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, Search } from "lucide-react";
import type { Book } from "./model";
import { bookPath } from "./books";
import { useLosRecord, losSyncMessage } from "./data/useLosRecord";
import { bookVocabularyRows, filterBookVocabulary } from "./vocabularyIndex";

export function VocabularyIndex({ book }: { book: Book }) {
  const [query, setQuery] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const { value: saved, update: updateSaved, status } = useLosRecord<string[]>(
    book.id, "bookmark", "saved-vocabulary", book.contentVersion, [],
  );
  const rows = useMemo(() => bookVocabularyRows(book), [book]);
  // Exact book-specific row references come from the learner dictionary.
  // The hash only selects a known in-book ID, never arbitrary user HTML.
  useEffect(() => {
    let hash: string;
    try { hash = decodeURIComponent(window.location.hash.slice(1)); }
    catch { return; } // A malformed fragment cannot crash the vocabulary page.
    if (!hash.startsWith("los-word-")) return;
    const rowId = hash.slice("los-word-".length);
    if (!rows.some(row => row.id === rowId)) return;
    const target = document.getElementById(hash);
    target?.scrollIntoView({ block: "center", behavior: "auto" });
    target?.focus({ preventScroll: true });
  }, [rows]);
  const visible = filterBookVocabulary(rows, query, savedOnly, saved);
  const savedSet = new Set(saved);
  const toggle = (id: string) => updateSaved(previous =>
    previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);

  return <section className="los-word-index">
    <p className="los-eyebrow">WORTSCHATZ</p>
    <h1>Sanastot ja oma sanalista</h1>
    <p className="los-intro">Kirjaan toimitetut ydinsanat ja ilmaukset aakkosjärjestyksessä. Voit etsiä suomeksi tai saksaksi ja tallentaa sanat omaan listaan ilman tekoälyä.</p>
    <div className="los-word-controls">
      <div className="los-word-search">
        <label htmlFor="los-word-query"><Search size={17}/> Etsi sanaa</label>
        <input id="los-word-query" type="search" autoComplete="off"
          placeholder="Sana tai suomennos" value={query}
          onChange={event => setQuery(event.target.value)}/>
      </div>
      <div className="los-word-filters" role="group" aria-label="Sanastoluettelon rajaus">
        <button type="button" aria-pressed={!savedOnly} onClick={() => setSavedOnly(false)}>Kaikki {rows.length}</button>
        <button type="button" aria-pressed={savedOnly} onClick={() => setSavedOnly(true)}>
          <Bookmark size={15}/> Omat {saved.filter(id => rows.some(row => row.id === id)).length}
        </button>
      </div>
    </div>
    <p className="los-storage-state" role="status">{losSyncMessage(status)}</p>
    {rows.length === 0 ?
      <div className="los-empty"><h2>Kirjan sanastoa valmistellaan</h2><p>Tähän tuodaan vain toimitetut ja tarkistetut sana- ja ilmauslistat. Muiden kirjojen sanastoa ei keksitä ennakkoon.</p></div> :
      !visible.length ?
        <div className="los-empty"><h2>Ei vastaavia sanoja</h2><p>{savedOnly ? "Lisää sanoja omaan listaan tai poista nykyinen hakurajaus." : "Kokeile eri hakusanaa. Tässä näytetään vain kirjaan kuuluvat sanat."}</p></div> :
        <ul className="los-word-list">{visible.map(row =>
          <li key={row.id} id={"los-word-" + row.id} tabIndex={-1}>
            <div className="los-word-main">
              <b lang="de">{row.de}</b><p lang="fi">{row.fi}</p>
              {row.note && <small>{row.note}</small>}
              {row.chapterId && <a href={bookPath(book, "kappale/" + row.chapterId.slice(1) + "/sanasto")}>
                {row.chapterId.replace("C", "Kappale ")} · avaa opetussanasto
              </a>}
            </div>
            <button type="button" className="los-button los-button-secondary"
              aria-pressed={savedSet.has(row.id)} disabled={status === "loading"}
              onClick={() => toggle(row.id)}>
              {savedSet.has(row.id) ? <BookmarkCheck size={18}/> : <Bookmark size={18}/>}
              {savedSet.has(row.id) ? "Oma sana · poista" : "Omaan listaan"}
            </button>
          </li>)}</ul>}
    {!!rows.length && <div className="los-word-footer">
      <p>Näytetään {visible.length} / {rows.length} toimitettua ilmausta. Omaan sanalistaan tallentaminen ei itsessään osoita osaamista.</p>
      <a className="los-button los-button-primary" href={bookPath(book, "kertaus")}>Harjoittele sanastoa</a>
    </div>}
  </section>;
}
