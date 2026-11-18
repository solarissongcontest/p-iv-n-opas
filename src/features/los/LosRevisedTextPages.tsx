import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookOpen, Headphones, Square, Volume2 } from "lucide-react";
import { LOS1_REVISED_AB } from "./content/los1RevisedAB";
import { LOS1_REVISED_C } from "./content/los1RevisedC";
import { LOS1_C_SPEECH_BLOCKS, LOS1_C_AUDIO_EXAMPLES } from "./content/los1SupportSpeech";
import { LosReadingExercises, LosReadingUnderstanding } from "./LosReadingExercises";
import { losGermanVoices, losSpeakerSlot, losSpeechSegments } from "./losSpeech";
import {LosOriginalDialogue} from "./LosOriginalDialogue";
import {los1CanonicalLines,LOS1_CANONICAL_VERSION} from "./los1Canonical";
import {los1CourseGlossary} from "./los1CourseGlossary";
import "./los-revised-texts.css";

/** These pages show LOS!-authored drafts. They are NOT authentic source transcripts. */
type ReaderBlock = { readonly kind: "stage" | "break" | "prose"; readonly text?: string };

function inlineContent(value: string): ReactNode[] {
  return value.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index} lang="de">{part.slice(1, -1)}</em>;
    return <span key={index}>{part}</span>;
  });
}
function TextSpeech({ blocks, chapterId, kind }: { blocks: readonly ReaderBlock[]; chapterId:string; kind:"A"|"B"|"C" }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState("1");
  const [message, setMessage] = useState("");
  const [voiceCount, setVoiceCount] = useState(0);
  const playbackId = useRef(0);
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synthesis = window.speechSynthesis;
    const refreshVoices = () => setVoiceCount(losGermanVoices(synthesis.getVoices()).length);
    refreshVoices();
    synthesis.addEventListener?.("voiceschanged", refreshVoices);
    return () => {
      playbackId.current += 1;
      synthesis.removeEventListener?.("voiceschanged", refreshVoices);
      synthesis.cancel();
    };
  }, [blocks]);

  const stop = () => {
    playbackId.current += 1;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessage("Toisto pysäytetty.");
  };

  const start = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setMessage("Tämä selain ei tue laitteen puhesynteesiä.");
      return;
    }
    const synthesis = window.speechSynthesis;
    const voices = losGermanVoices(synthesis.getVoices());
    setVoiceCount(voices.length);
    if (!voices.length) {
      setMessage("Laitteelta ei löydy saksankielistä puheääntä. Tarkista laitteen puheäänet ja avaa lukija uudelleen. Vääränkielisellä äänellä ei harjoitella ääntämistä.");
      return;
    }
    const segments = losSpeechSegments(blocks, chapterId, kind);
    if (!segments.length) {
      setMessage("Tässä tekstissä ei ole luettavia saksankielisiä puheenvuoroja.");
      return;
    }
    playbackId.current += 1;
    const currentPlayback = playbackId.current;
    synthesis.cancel();
    const utterances = segments.map(segment => {
      const utterance = new SpeechSynthesisUtterance(segment.text);
      utterance.lang = "de-DE";
      utterance.rate = Math.max(0.5, Math.min(2, Number(rate) * segment.rateFactor));
      utterance.voice = voices[losSpeakerSlot(segment.speaker, voices.length)] ?? voices[0] ?? null;
      utterance.onerror = event => {
        if (playbackId.current !== currentPlayback) return;
        playbackId.current += 1;
        synthesis.cancel();
        setIsSpeaking(false);
        setMessage("Puheentoisto epäonnistui ("+event.error+"). Tarkista laitteen saksankielinen puheääni tai kokeile uudelleen.");
      };
      return utterance;
    });
    const last = utterances.at(-1);
    if (last) last.onend = () => {
      if (playbackId.current !== currentPlayback) return;
      setIsSpeaking(false);
      setMessage("Kuuntelu päättyi. Voit kuunnella tekstin uudelleen.");
    };
    setIsSpeaking(true);
    setMessage(voices.length>1 ?
      "Toistetaan laitteen "+voices.length+" saksankielisellä äänellä. Henkilöillä voi olla eri ääniä laitteen valikoiman mukaan." :
      "Toistetaan laitteen saksankielisellä puheäänellä. Kaikilla henkilöillä on sama ääni.");
    utterances.forEach(utterance => synthesis.speak(utterance));
  };
  return <div className="los-revised-speech">
    <div className="los-revised-speech-controls">
      <Headphones size={18} aria-hidden="true" />
      <button type="button" className="los-outline-button" onClick={isSpeaking ? stop : start}>
        {isSpeaking ? <><Square size={15} aria-hidden="true" /> Pysäytä</> : <><Volume2 size={16} aria-hidden="true" /> Kuuntele teksti</>}
      </button>
      <label>Toistonopeus
        <select value={rate} onChange={event => setRate(event.target.value)} aria-label="Puhenopeus">
          <option value="0.75">0,75×</option><option value="1">1×</option><option value="1.25">1,25×</option>
        </select>
      </label>
    </div>
    <p className="los-revised-muted" role="status">{message || (
      voiceCount>0 ?
        "Saksankielisiä puheääniä laitteessa: "+voiceCount+". Selaimen synteettistä ääntämistä ei ole akustisesti hyväksytty." :
        "TTS käyttää laitteen puheääniä. Saksankielisen äänen saatavuus tarkistetaan kuuntelupainikkeella."
    )}</p>
  </div>;
}

export function LosRevisedTextPage({ chapterId, kind }: { chapterId: string; kind: "A" | "B" }) {
  const chapter = LOS1_REVISED_AB.chapters.find(candidate => candidate.chapterId === "C" + chapterId);
  if (!chapter) return <div role="status">Tämän kappaleen tekstiä ei löydy sisältöaineistosta.</div>;
  const source = kind === "A" ? chapter.textA : chapter.textB;
  return <section className="los-revised-page" aria-labelledby={"los-revised-heading-" + chapterId + kind}>
    <p className="los-eyebrow">KAPPALE {chapterId} / TEXT {kind}</p>
    <h1 id={"los-revised-heading-" + chapterId + kind} lang="de">{source.title}</h1>
    <p className="los-page-intro">{kind === "A" ? "Kappaleen uusi pääteksti. Lue ensin tilanteen kuvaus ja seuraa keskustelua." : "Toinen tekstilaji. Harjoittele kappaleen ilmauksia uudessa tilanteessa."}</p>
    <TextSpeech blocks={source.blocks} chapterId={chapterId} kind={kind} />
    <LosOriginalDialogue
      chapterId={chapterId}
      sourceId={kind==="A"?"los-own-text-a":"los-own-text-b"}
      version={LOS1_CANONICAL_VERSION}
      heading="Tekstin sanat ja omat korostukset"
      usageLabel={"LOS!:N OMA TEKSTI · TEXT "+kind}
      guidance="Napauta saksankielistä sanaa avataksesi tarkistetun selityksen. Valitse korostustussi ja merkitse haluamasi kohdat. Merkinnät tallennetaan omaan opiskelutilaasi."
      lines={los1CanonicalLines(chapterId,kind).map(line=>({...line,meaning:""}))}
      glossary={los1CourseGlossary(chapterId)}
      author="LOS!" sourceTitle={source.title} sourceUrl="" license="LOS!:n oma opetusteksti" licenseUrl=""
      sourceDetail="" isOwnText
    />
    {kind === "B" && <LosReadingExercises chapterId={chapterId} text="B" />}
    <aside className="los-revised-disclaimer" role="note">
      <strong>LOS!:n oma opetusteksti · toimitusluonnos</strong>
      <p>Uusi teksti ei ole ulkopuolinen autenttinen lähdeteksti. Riippumaton saksan kielentarkistus ja toimitettu äänite ovat vielä kesken. Laitteen TTS ei korvaa alkuperäistä ihmisäänitettä.</p>
    </aside>
  </section>;
}

/** Retain the public component name while replacing the former three-question mock-up
 * with the 15-question evidence-grounded A/B/C exercise system. */
export function LosRevisedUnderstanding({chapterId,navigate}: {
  chapterId:string;
  navigate?: (section:"text"|"text-b"|"text-c")=>void;
}) {
  return <LosReadingUnderstanding chapterId={chapterId} {...(navigate ? {navigate} : {})}/>;
}

/** Explicit, accessible source expander: old reader stays mounted only while open.
 * Unlike nested native details toggles, the button's state survives child re-renders. */
export function LosLegacySourcePanel({chapterId,kind,children}:{
  chapterId:string;
  kind:"A"|"B";
  children:ReactNode;
}) {
  const [isOpen,setIsOpen] = useState(false);
  const panelId="los-legacy-source-"+chapterId+"-"+kind.toLowerCase();
  return <section className="los-revised-supplement">
    <button type="button" className="los-revised-supplement-toggle"
      aria-expanded={isOpen} aria-controls={panelId}
      onClick={()=>setIsOpen(open=>!open)}>
      {isOpen?"Piilota aiempi autenttinen lisäaineisto":
        "Avaa aiempi autenttinen lisäaineisto tai alkuperäisäänite"}
    </button>
    {isOpen && <div id={panelId} className="los-revised-supplement-content">
      {children}
    </div>}
  </section>;
}

function splitCells(line: string): string[] {
  return line.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map(cell => cell.trim());
}
function isTableLine(line: string): boolean { return /^\s*\|/.test(line); }
function isTableRule(line: string): boolean { return /^\s*\|?[\s|:-]+\|?\s*$/.test(line); }

/** A deliberately restricted Markdown renderer: no HTML injection, links or scripts. */
function renderSupportMarkdown(source: string): ReactNode[] {
  const lines = source.replace(/\r/g, "").split("\n");
  const rendered: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = (lines[i] ?? "").trim();
    if (!line) { i++; continue; }
    if (line === "---") { rendered.push(<hr key={i} className="los-revised-pause" />); i++; continue; }
    if (line.startsWith("### ")) { i++; continue; } // Page heading is rendered above once.
    if (isTableLine(line) && isTableLine(lines[i + 1] ?? "") && isTableRule(lines[i + 1] ?? "")) {
      const first = i;
      const headings = splitCells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableLine(lines[i] ?? "")) { rows.push(splitCells(lines[i] ?? "")); i++; }
      rendered.push(<div className="los-revised-table-wrap" key={first}><table>
        <thead><tr>{headings.map((heading, col) => <th key={col}>{inlineContent(heading)}</th>)}</tr></thead>
        <tbody>{rows.map((cells, row) => <tr key={row}>{cells.map((cell, col) => <td key={col}>{inlineContent(cell)}</td>)}</tr>)}</tbody>
      </table></div>);
      continue;
    }
    if (/^\*\*(?:Vastaus|Mallivastaus|Mallirunko):\*\*/.test(line)) {
      rendered.push(<details className="los-revised-answer" key={i}>
        <summary>Näytä mallivastaus</summary><p>{inlineContent(line.replace(/^\*\*(?:Vastaus|Mallivastaus|Mallirunko):\*\*\s*/, ""))}</p>
      </details>);
      i++; continue;
    }
    if (line.startsWith("- ")) {
      const first = i;
      const items: string[] = [];
      while (i < lines.length && (lines[i] ?? "").trim().startsWith("- ")) { items.push((lines[i] ?? "").trim().slice(2)); i++; }
      rendered.push(<ul key={first}>{items.map((item, index) => <li key={index}>{inlineContent(item)}</li>)}</ul>);
      continue;
    }
    const first = i;
    const paragraph: string[] = [line];
    i++;
    while (i < lines.length && (lines[i] ?? "").trim() &&
      !isTableLine(lines[i] ?? "") && !/^### |^---$|^\*\*(?:Vastaus|Mallivastaus|Mallirunko):\*\*|^- /.test((lines[i] ?? "").trim())) {
      paragraph.push((lines[i] ?? "").trim()); i++;
    }
    rendered.push(<p key={first}>{paragraph.map((fragment, index) => <span key={index}>{index > 0 && <br />}{inlineContent(fragment)}</span>)}</p>);
  }
  return rendered;
}

export function LosHilfstextPage({ chapterId }: { chapterId: string }) {
  const page = LOS1_REVISED_C.chapters.find(chapter => chapter.chapterId === chapterId);
  if (!page) return <div role="status">Tämän kappaleen tukitekstiä ei löydy sisältöaineistosta.</div>;
  return <section className="los-inner-page los-revised-page los-revised-support" aria-labelledby={"los-c-heading-" + chapterId}>
    <p className="los-eyebrow">KAPPALE {chapterId} / TEXT C · HILFSTEXT</p>
    <h1 id={"los-c-heading-" + chapterId} lang="de">{page.title}</h1>
    <p className="los-page-intro">{page.purpose}. Tämä tukiteksti täydentää Text A:ta ja Text B:tä. Saat palata siihen aina tarvittaessa.</p>
    <aside className="los-revised-support-audio">
      <p><strong>Kuuntele tukitekstin saksankieliset mallilauseet</strong></p>
      <p className="los-revised-muted">{LOS1_C_AUDIO_EXAMPLES[chapterId]?.length ?? 0} mallia. Suomenkielisiä selityksiä ei lueta saksankielisellä puheäänellä.</p>
      <TextSpeech blocks={LOS1_C_SPEECH_BLOCKS[chapterId]??[]} chapterId={chapterId} kind="C" />
    </aside>
    <div className="los-revised-support-content">{renderSupportMarkdown(page.contentMarkdown)}</div>
    <LosReadingExercises chapterId={chapterId} text="C" />
    <aside className="los-revised-disclaimer" role="note">
      <BookOpen size={18} aria-hidden="true" />
      <span>LOS!:n oma opetuksellinen tukiteksti · kielentarkistus kesken. Tukiteksti ei ole autenttinen ulkopuolinen lähde.</span>
    </aside>
  </section>;
}
