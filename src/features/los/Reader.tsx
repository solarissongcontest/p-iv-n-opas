import { useState } from "react";
import { BookOpen, Highlighter, NotebookPen, Settings2 } from "lucide-react";
import type { Book, BookId, ContentBlock, SourceAttribution } from "./model";
import { useLosRecord, losSyncMessage } from "./data/useLosRecord";
import { findGlossarySpans, type GlossaryEntry } from "./glossary";
import { CountrySchematic } from "./CountrySchematic";

export type ReaderMark = { blockId: string; version: string; start: number; end: number; color: "yellow" };
export type ReaderNote = { blockId: string; version: string; text: string; updatedAt: string };
function Attribution({ source }: { source: SourceAttribution | undefined }) {
  if (!source) return null;
  return <aside className="los-attribution" aria-label="Lähdetiedot">
    <b>Lähde: {source.title}</b>
    <span>{source.author ? source.author + " · " : ""}{source.publisher}</span>
    <span>{source.licenseOrBasis}{source.modification ? " · " + source.modification : ""}</span>
    <span className="los-attribution-links">
      {source.originalUrl && <a href={source.originalUrl} target="_blank" rel="noopener noreferrer">Alkuperäinen aineisto</a>}
      {source.licenseUrl && <a href={source.licenseUrl} target="_blank" rel="noopener noreferrer">Lisenssin ehdot</a>}
    </span>
  </aside>;
}
function SafeMedia({ block, source }: {
  block: Extract<ContentBlock, { kind: "media" }>; source: SourceAttribution | undefined;
}) {
  const [failed, setFailed] = useState(false);
  let validVideo = false;
  let validCommonsAudio = false;
  try {
    const url = new URL(block.embedUrl);
    validVideo = block.mediaType === "video" && source?.permittedMode === "embed"
      && url.protocol === "https:"
      && ["www.youtube-nocookie.com", "www.youtube.com"].includes(url.hostname)
      && url.pathname.startsWith("/embed/");
    validCommonsAudio = block.mediaType === "audio"
      && source?.permittedMode === "embed"
      && url.origin === "https://upload.wikimedia.org"
      && (
        (source.id === "M-COM-01" && url.pathname === "/wikipedia/commons/1/11/Gespr%C3%A4chVorstellung.ogg") ||
        (source.id === "M-COM-03" && url.pathname === "/wikipedia/commons/b/bb/German_Vocabulary_-_Greetings.ogg") ||
        (source.id === "M-COM-02" && url.pathname === "/wikipedia/commons/f/f9/Deutsch_Dialog_._Ich_bin_Peter.ogg")
      );
  } catch { /* Untrusted URLs never render a player. */ }
  let validMp3 = false;
  if (block.mp3Url && validCommonsAudio) {
    try {
      const alt = new URL(block.mp3Url);
      validMp3 = alt.origin === "https://upload.wikimedia.org" &&
        ((source?.id === "M-COM-01" &&
          alt.pathname === "/wikipedia/commons/transcoded/1/11/Gespr%C3%A4chVorstellung.ogg/Gespr%C3%A4chVorstellung.ogg.mp3") ||
         (source?.id === "M-COM-03" &&
          alt.pathname === "/wikipedia/commons/transcoded/b/bb/German_Vocabulary_-_Greetings.ogg/German_Vocabulary_-_Greetings.ogg.mp3"));
    } catch { /* Only pinned Wikimedia MP3 transcodes are ever played. */ }
  }
  const validLocalAudio = block.mediaType === "audio" && source?.permittedMode === "hosted"
    && /^\/los\/media\/[a-z0-9_-]+\.(ogg|mp3|m4a)$/i.test(block.embedUrl);
  return <figure className="los-media" id={block.id}>
    <figcaption>{block.title}</figcaption>
    {validVideo ? <iframe title={block.title} src={block.embedUrl} loading="lazy"
      allowFullScreen allow="fullscreen; encrypted-media; picture-in-picture" /> :
      validCommonsAudio || validLocalAudio
        ? <audio controls preload="metadata" aria-label={block.title}
            onError={() => setFailed(true)} onCanPlay={() => setFailed(false)}>
            {validMp3 && <source src={block.mp3Url} type="audio/mpeg"/>}
            <source src={block.embedUrl} type={validLocalAudio && block.embedUrl.endsWith(".mp3") ? "audio/mpeg" :
              validLocalAudio && block.embedUrl.endsWith(".m4a") ? "audio/mp4" : "audio/ogg"}/>
            Äänitoistoa ei tueta selaimessasi.
          </audio>
        : <p className="los-notice">Mediaa ei ole hyväksytty sisäiseen toistoon.</p>}
    {failed && <p className="los-notice" role="status">{source?.id === "M-COM-02" ?
      "Äänitettä ei voitu toistaa. Tämän lähteen koko litteraattia ei ole vielä toimitettu LOS!:iin: jätä ääneen perustuvat tehtävät myöhemmäksi, älä yritä arvata vastauksia. Voit silti opiskella kappaleen oman luettavan Text A -dialogin." :
      "Äänitettä ei voitu toistaa. Voit lukea saman lähteen transkription tai ilmauslistan kokonaan tekstinä. Äänen toimivuus on varmistettava ennen kuuntelutehtävän arviointia."}</p>}
    {validCommonsAudio && <p className="los-support">Ääni ladataan Wikimedia Commonsista. Soitin kokeilee ensin MP3-muunnosta ja käyttää tarvittaessa alkuperäistä OGG-äänitettä. Toisto edellyttää verkkoyhteyttä.</p>}
    <Attribution source={source}/>
  </figure>;
}
function ProductionBlock({ bookId, block }: {
  bookId: BookId; block: Extract<ContentBlock, { kind: "production" }>;
}) {
  const { value, update, status } = useLosRecord<{ text: string; reviewed: Record<string, boolean> }>(
    bookId, "notes", "production-" + block.id, block.version, { text: "", reviewed: {} },
  );
  return <section className="los-production" id={block.id}>
    <p className="los-eyebrow">KÄYTÄ SAKSAA ITSE · EI PISTEYTYSTÄ</p>
    <h2>{block.titleFi}</h2>
    <p>{block.promptFi}</p>
    <label htmlFor={"los-production-" + block.id}>Oma saksankielinen vastauksesi</label>
    <textarea id={"los-production-" + block.id} lang="de"
      spellCheck={false} autoCapitalize="none" rows={4}
      value={value.text} disabled={status === "loading"}
      onChange={event => update(previous => ({ ...previous, text: event.target.value }))}/>
    <p className="los-storage-state" role="status">{losSyncMessage(status)}</p>
    <details className="los-production-model">
      <summary>Avaa vasta oman yrityksen jälkeen: malliratkaisu</summary>
      <p lang="de"><b>{block.modelDe}</b></p>
      <p>{block.modelFi}</p>
      <p className="los-support">Malli on LOS!:n oma opetusesimerkki, ei lainattu alkuperäisteksti.</p>
    </details>
    <fieldset className="los-production-check">
      <legend>Tarkista itse, kun olet verrannut vastaustasi malliin</legend>
      {block.criteriaFi.map((criterion, index) => <label key={index}>
        <input type="checkbox" checked={Boolean(value.reviewed[String(index)])}
          disabled={status === "loading"}
          onChange={event => update(previous => ({
            ...previous, reviewed: { ...previous.reviewed, [String(index)]: event.target.checked },
          }))}/>
        {criterion}
      </label>)}
    </fieldset>
    <p className="los-support">Itsearviointi ei tuota automaattista pistettä eikä varmistettua kielitaitotasoa.</p>
  </section>;
}

function RenderBlock({ block, bookId, source, marked, highlighterEnabled, glossary, onLookup, onSelection, onNote }: {
  block: ContentBlock;
  bookId: BookId;
  source: SourceAttribution | undefined;
  marked: ReaderMark | undefined;
  highlighterEnabled: boolean;
  glossary: readonly GlossaryEntry[];
  onLookup: (entry: GlossaryEntry) => void;
  onSelection: (block: ContentBlock, start: number, end: number) => void;
  onNote: (block: ContentBlock) => void;
}) {
  const markedText = (text: string, offset = 0) => {
    if (!marked || marked.end <= offset || marked.start >= offset + text.length) return text;
    // The same mark may span a glossary token boundary. Clip the visible
    // fragment instead of hiding saved highlights when word lookups are on.
    const start = Math.max(0, marked.start - offset);
    const end = Math.min(text.length, marked.end - offset);
    if (end <= start) return text;
    return <>{text.slice(0, start)}<mark className="los-marker">{text.slice(start, end)}</mark>{text.slice(end)}</>;
  };
  const textWithGlosses = (text: string, offset = 0, german = true) => {
    if (highlighterEnabled || !german) return markedText(text, offset);
    const spans = findGlossarySpans(text, glossary);
    if (!spans.length) return markedText(text, offset);
    let cursor = 0;
    return <>{spans.map(span => {
      const beginning = cursor;
      const before = text.slice(beginning, span.start);
      cursor = span.end;
      const word = text.slice(span.start, span.end);
      return <span key={span.start}>
        {markedText(before, offset + beginning)}
        <button type="button" className="los-gloss-word" lang="de"
          aria-label={"Avaa sanan " + word + " merkitys"}
          onClick={() => onLookup(span.entry)}>{markedText(word, offset + span.start)}</button>
      </span>;
    })}{markedText(text.slice(cursor), offset + cursor)}</>;
  };
  const select = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>, text: string, offset = 0) => {
    const container = event.currentTarget;
    const selected = window.getSelection();
    if (!selected || selected.isCollapsed || !selected.rangeCount) return;
    const range = selected.getRangeAt(0);
    if (!container.contains(range.startContainer) || !container.contains(range.endContainer)) return;
    const prefix = range.cloneRange();
    prefix.selectNodeContents(container);
    prefix.setEnd(range.startContainer, range.startOffset);
    const start = prefix.toString().length;
    const end = start + range.toString().length;
    if (start >= 0 && end <= text.length && end > start) onSelection(block, offset + start, offset + end);
    selected.removeAllRanges();
  };
  switch (block.kind) {
    case "heading": return block.level === 2 ? <h2>{block.text}</h2> : <h3>{block.text}</h3>;
    case "paragraph":
    case "authenticText": return <div className="los-reader-paragraph" id={block.id}>
      <p lang={block.language} onMouseUp={highlighterEnabled ? event => select(event, block.text) : undefined} onTouchEnd={highlighterEnabled ? event => select(event, block.text) : undefined}>{textWithGlosses(block.text, 0, block.language === "de")}</p>
      {highlighterEnabled && <div className="los-token-picker" role="group" aria-label="Korosta sana tai ilmaus"><p className="los-support">Valitse sana näppäimistöllä tai napauttamalla. Peräkkäiset valinnat muodostavat kokonaisen ilmauksen.</p><div className="los-tokens">{Array.from(block.text.matchAll(/\S+/gu), match => ({ word: match[0], start: match.index, end: match.index + match[0].length })).map(token => <button type="button" key={token.start} lang={block.language} className="los-token" aria-pressed={!!marked && token.start >= marked.start && token.end <= marked.end} onClick={() => { const start = marked ? Math.min(marked.start, token.start) : token.start; const end = marked ? Math.max(marked.end, token.end) : token.end; onSelection(block, start, end); }}>{token.word}</button>)}</div></div>}
      <button type="button" className="los-text-action los-note-action" onClick={() => onNote(block)}><NotebookPen size={16} /> Muistiinpano</button>
      {source && <Attribution source={source}/>}
    </div>;
    case "dialogue": return <section className="los-dialogue" id={block.id} aria-label="Kokonainen alkuperäinen saksankielinen keskustelu" lang="de">
      <p className="los-eyebrow" lang="fi">ALKUPERÄINEN DIALOGI · {block.turns.length} REPLIIKKIÄ</p>
      {block.turns.map((turn, index) => {
        const offset = block.turns.slice(0, index).reduce((sum, previous) => sum + previous.text.length + 1, 0);
        return <div className="los-dialogue-turn" key={index}>
          <p><b>{turn.speaker}:</b>{" "}
            <span className="los-dialogue-spoken" onMouseUp={highlighterEnabled ? event => select(event, turn.text, offset) : undefined}
              onTouchEnd={highlighterEnabled ? event => select(event, turn.text, offset) : undefined}>
              {textWithGlosses(turn.text, offset)}
            </span>
          </p>
          {turn.translationFi && <details lang="fi" className="los-translation">
            <summary>Suomennos</summary><p>{turn.translationFi}</p>
          </details>}
          {highlighterEnabled && <div className="los-token-picker" role="group" aria-label={"Valitse " + turn.speaker + "-repliikin sana korostettavaksi"}>
            <div className="los-tokens">{Array.from(turn.text.matchAll(/\S+/gu), item => ({
              text: item[0], start: offset + item.index, end: offset + item.index + item[0].length,
            })).map(token => <button key={token.start} type="button" lang="de" className="los-token"
              aria-pressed={!!marked && token.start >= marked.start && token.end <= marked.end}
              onClick={() => {
                const start = marked ? Math.min(marked.start, token.start) : token.start;
                const end = marked ? Math.max(marked.end, token.end) : token.end;
                onSelection(block, start, end);
              }}>{token.text}</button>)}</div>
          </div>}
        </div>;
      })}
      <button type="button" className="los-text-action los-note-action" onClick={() => onNote(block)}>
        <NotebookPen size={16}/> Muistiinpano keskustelusta
      </button>
      <Attribution source={source}/>
    </section>;
    case "transcript": return <section className="los-transcript" id={block.id} lang="de"
      aria-label="Alkuperäisäänitteen kokonainen ilmausluettelo">
      <p lang="fi" className="los-eyebrow">KOKO ÄÄNITTEEN ILMAUSLISTA · {block.lines.length} KOHTAA</p>
      <ol>{block.lines.map((line, index) => <li key={index}>
        <div className="los-transcript-utterance">{textWithGlosses(line.de)}</div>
        <details className="los-translation" lang="fi">
          <summary>Suomennos</summary>
          <p>{line.fi}</p>
          {line.noteFi && <p className="los-support">{line.noteFi}</p>}
        </details>
      </li>)}</ol>
      <button type="button" className="los-text-action los-note-action" onClick={() => onNote(block)}>
        <NotebookPen size={16}/> Muistiinpano ilmauslistasta
      </button>
      <Attribution source={source}/>
    </section>;
    case "grammar": return <section className="los-grammar" id={block.id}>
      <p className="los-eyebrow">KIELIOPPI</p><h2>{block.title}</h2>
      <p>{block.explanationFi}</p>
      <div className="los-examples">{block.examples.map((entry, index) =>
        <div key={index}><p lang="de">{entry.de}</p><small>{entry.fi}</small></div>)}</div>
    </section>;
    case "table": return <div className="los-table-scroll"><table><thead><tr>{block.headers.map((value, index) =>
      <th key={index} scope="col">{value}</th>)}</tr></thead><tbody>{block.rows.map((cells, rowIndex) =>
      <tr key={rowIndex}>{cells.map((value, index) => <td key={index}>{value}</td>)}</tr>)}</tbody></table></div>;
    case "image": return <figure className="los-reader-image">
      <img src={block.src} alt={block.alt} loading="lazy" /><figcaption>{block.caption}</figcaption>
    </figure>;
    case "vocabulary": return <section className="los-vocabulary" id={block.id}>
      <h2>Sanasto</h2><dl>{block.entries.map(entry => <div key={entry.id}>
        <dt lang="de">{entry.de}</dt><dd>{entry.fi}{entry.note && <small>{entry.note}</small>}</dd>
      </div>)}</dl></section>;
    case "production": return <ProductionBlock bookId={bookId} block={block} />;
    case "geo-schematic": return <CountrySchematic titleFi={block.titleFi} instructionsFi={block.instructionsFi}/>;
    case "media": return <SafeMedia block={block} source={source} />;
  }
}

export function Reader({ book, blocks, title, headingLevel = 2 }: { book: Book; blocks: ContentBlock[]; title: string; headingLevel?: 1 | 2 }) {
  const { value: readerPreferences, update: updateReaderPreferences } = useLosRecord(
    book.id, "preferences", "reader-settings", "1.0.0", { fontSize: 18, lineHeight: 1.75 },
  );
  const { fontSize, lineHeight } = readerPreferences;
  const [readingMode, setReadingMode] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [highlighter, setHighlighter] = useState(false);
  const { value: marks, update: setMarks, status: marksStatus } = useLosRecord<ReaderMark[]>(book.id, "marks", "reader", book.contentVersion, []);
  const { value: notes, update: setNotes, status: notesStatus } = useLosRecord<ReaderNote[]>(book.id, "notes", "reader", book.contentVersion, []);
  const [activeNote, setActiveNote] = useState<ContentBlock | null>(null);
  const [activeGloss, setActiveGloss] = useState<GlossaryEntry | null>(null);
  const glossary = book.blocks.filter(block => block.kind === "vocabulary").flatMap(block => block.entries);
  const noteValue = notes.find(note => note.blockId === activeNote?.id && note.version === activeNote.version)?.text ?? "";
  const updateNote = (text: string) => {
    if (!activeNote) return;
    setNotes(previous => [...previous.filter(note => note.blockId !== activeNote.id), {
      blockId: activeNote.id, version: activeNote.version, text, updatedAt: new Date().toISOString(),
    }]);
  };
  if (!blocks.length) return <section className="los-empty"><BookOpen size={24} /><h2>Tekstejä ei ole vielä lisätty</h2><p>Tämän kirjan lukija on valmis näyttämään myöhemmin lisättävät luvalliset kokonaiset tekstit suoraan LOS!:ssa.</p></section>;
  return <article className={"los-reader " + (readingMode ? "is-reading" : "")}
    style={{ "--los-reader-font": fontSize + "px", "--los-reader-leading": lineHeight } as React.CSSProperties}>
    <div className="los-reader-top"><div><p className="los-eyebrow">LUE JA OPI</p>{headingLevel === 1 ? <h1>{title}</h1> : <h2>{title}</h2>}</div>
      <div className="los-reader-tools" role="toolbar" aria-label="Lukijan työkalut">
        <button className="los-button los-button-secondary" type="button" aria-pressed={highlighter} onClick={() => setHighlighter(v => !v)}><Highlighter size={17} /> Korosta</button>
        <button className="los-button los-button-secondary" type="button" aria-pressed={readingMode} onClick={() => setReadingMode(v => !v)}><BookOpen size={17} /> {readingMode ? "Opiskele" : "Lukutila"}</button>
        <button className="los-button los-button-secondary" type="button" aria-expanded={toolsOpen} onClick={() => setToolsOpen(v => !v)}><Settings2 size={17} /> Teksti</button>
      </div>
    </div>
    {toolsOpen && <div className="los-reader-settings">
      <label>Tekstin koko {fontSize} px <input aria-label="Tekstin koko" type="range" min="16" max="24" step="1" value={fontSize} onChange={event => updateReaderPreferences(previous => ({ ...previous, fontSize: Number(event.target.value) }))} /></label>
      <label>Riviväli {lineHeight.toFixed(2)} <input aria-label="Riviväli" type="range" min="1.4" max="1.9" step=".05" value={lineHeight} onChange={event => updateReaderPreferences(previous => ({ ...previous, lineHeight: Number(event.target.value) }))}/></label>
    </div>}
    {highlighter && <p className="los-notice">Valitse hiirellä tai kosketuksella teksti maalattavaksi. Merkinnät tallentuvat ensin laitteelle ja synkronoituvat palvelimelle, kun yhteys ja tietokanta ovat saatavilla.</p>}
    <p className="los-storage-state" role="status">{losSyncMessage(marksStatus)}</p>
    {activeGloss && <aside className="los-gloss-panel" aria-live="polite" aria-label="Sanan merkitys" lang="fi">
      <div><p className="los-eyebrow">SANASTON MERKITYS</p>
        <b lang="de">{activeGloss.de}</b><p>{activeGloss.fi}</p>
        {activeGloss.note && <small>{activeGloss.note}</small>}
      </div>
      <button type="button" className="los-button los-button-secondary" onClick={() => setActiveGloss(null)}>Sulje</button>
    </aside>}
    <div className="los-reading-body">{blocks.map(block => <RenderBlock
      key={block.id + ":" + block.version} block={block} bookId={book.id}
      source={"sourceId" in block ? book.sources.find(item => item.id === block.sourceId) : undefined}
      highlighterEnabled={highlighter}
      glossary={readingMode ? [] : glossary}
      onLookup={setActiveGloss}
      marked={marks.find(mark => mark.blockId === block.id && mark.version === block.version)}
      onSelection={(source, start, end) => {
        if (!highlighter) return;
        setMarks(previous => [...previous.filter(mark => mark.blockId !== source.id), { blockId: source.id, version: source.version, start, end, color: "yellow" }]);
      }}
      onNote={setActiveNote}
    />)}</div>
    {activeNote && <section className="los-note-editor" aria-labelledby="los-note-heading">
      <div className="los-inline-head"><h2 id="los-note-heading">Muistiinpano</h2><button className="los-button los-button-secondary" onClick={() => setActiveNote(null)}>Sulje</button></div>
      <label htmlFor="los-note-input">Oma merkintä tähän tekstikohtaan</label>
      <textarea id="los-note-input" value={noteValue} onChange={event => updateNote(event.target.value)} rows={5}/>
      <p className="los-storage-state">{losSyncMessage(notesStatus)}</p>
    </section>}
  </article>;
}
