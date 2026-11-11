import { useState } from "react";
import { BookOpen, Highlighter, NotebookPen, Settings2 } from "lucide-react";
import type { Book, ContentBlock, SourceAttribution } from "./model";
import { useLosRecord, losSyncMessage } from "./data/useLosRecord";

export type ReaderMark = { blockId: string; version: string; start: number; end: number; color: "yellow" };
export type ReaderNote = { blockId: string; version: string; text: string; updatedAt: string };
function Attribution({ source }: { source?: SourceAttribution }) {
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
  block: Extract<ContentBlock, { kind: "media" }>; source?: SourceAttribution;
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
      && source?.id === "M-COM-01" && source.permittedMode === "embed"
      && url.origin === "https://upload.wikimedia.org"
      && url.pathname === "/wikipedia/commons/1/11/Gespr%C3%A4chVorstellung.ogg";
  } catch { /* Untrusted URLs never render a player. */ }
  const validLocalAudio = block.mediaType === "audio" && source?.permittedMode === "hosted"
    && /^\/los\/media\/[a-z0-9_-]+\.(ogg|mp3|m4a)$/i.test(block.embedUrl);
  return <figure className="los-media" id={block.id}>
    <figcaption>{block.title}</figcaption>
    {validVideo ? <iframe title={block.title} src={block.embedUrl} loading="lazy"
      allowFullScreen allow="fullscreen; encrypted-media; picture-in-picture" /> :
      validCommonsAudio || validLocalAudio
        ? <audio controls preload="metadata" src={block.embedUrl} aria-label={block.title}
            onError={() => setFailed(true)} onCanPlay={() => setFailed(false)}>
            Äänitoistoa ei tueta selaimessasi.
          </audio>
        : <p className="los-notice">Mediaa ei ole hyväksytty sisäiseen toistoon.</p>}
    {failed && <p className="los-notice" role="status">Äänitettä ei voitu toistaa. Lue sama kokonainen keskustelu alapuolelta. Harjoittelu ei edellytä toimimatonta soitinta.</p>}
    {validCommonsAudio && <p className="los-support">Ääni ladataan Wikimedia Commonsista. Sen saatavuus ja toiminta voivat riippua verkkoyhteydestä.</p>}
    <Attribution source={source}/>
  </figure>;
}
function RenderBlock({ block, source, marked, highlighterEnabled, onSelection, onNote }: {
  block: ContentBlock;
  source?: SourceAttribution;
  marked: ReaderMark | undefined;
  highlighterEnabled: boolean;
  onSelection: (block: ContentBlock, start: number, end: number) => void;
  onNote: (block: ContentBlock) => void;
}) {
  const markedText = (text: string, offset = 0) => {
    if (!marked || marked.start < offset || marked.start >= offset + text.length || marked.end <= offset) return text;
    const start = Math.max(0, marked.start - offset);
    const end = Math.min(text.length, marked.end - offset);
    return <>{text.slice(0, start)}<mark className="los-marker">{text.slice(start, end)}</mark>{text.slice(end)}</>;
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
      <p lang={block.language} onMouseUp={highlighterEnabled ? event => select(event, block.text) : undefined} onTouchEnd={highlighterEnabled ? event => select(event, block.text) : undefined}>{markedText(block.text)}</p>
      {highlighterEnabled && <div className="los-token-picker" role="group" aria-label="Korosta sana tai ilmaus"><p className="los-support">Valitse sana näppäimistöllä tai napauttamalla. Peräkkäiset valinnat muodostavat kokonaisen ilmauksen.</p><div className="los-tokens">{Array.from(block.text.matchAll(/\S+/gu), match => ({ word: match[0], start: match.index, end: match.index + match[0].length })).map(token => <button type="button" key={token.start} lang={block.language} className="los-token" aria-pressed={!!marked && token.start >= marked.start && token.end <= marked.end} onClick={() => { const start = marked ? Math.min(marked.start, token.start) : token.start; const end = marked ? Math.max(marked.end, token.end) : token.end; onSelection(block, start, end); }}>{token.word}</button>)}</div></div>}
      <button type="button" className="los-text-action los-note-action" onClick={() => onNote(block)}><NotebookPen size={16} /> Muistiinpano</button>
    </div>;
    case "dialogue": return <section className="los-dialogue" id={block.id} aria-label="Kokonainen alkuperäinen saksankielinen keskustelu" lang="de">
      <p className="los-eyebrow" lang="fi">ALKUPERÄINEN DIALOGI · {block.turns.length} REPLIIKKIÄ</p>
      {block.turns.map((turn, index) => {
        const offset = block.turns.slice(0, index).reduce((sum, previous) => sum + previous.text.length + 1, 0);
        return <div className="los-dialogue-turn" key={index}>
          <p><b>{turn.speaker}:</b>{" "}
            <span className="los-dialogue-spoken" onMouseUp={highlighterEnabled ? event => select(event, turn.text, offset) : undefined}
              onTouchEnd={highlighterEnabled ? event => select(event, turn.text, offset) : undefined}>
              {markedText(turn.text, offset)}
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
    <div className="los-reading-body">{blocks.map(block => <RenderBlock
      key={block.id + ":" + block.version} block={block}
      source={"sourceId" in block ? book.sources.find(item => item.id === block.sourceId) : undefined}
      highlighterEnabled={highlighter}
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
