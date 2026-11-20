import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookOpen, Headphones, Square, Volume2 } from "lucide-react";
import { LOS1_REVISED_AB } from "./content/los1RevisedAB";
import { LOS1_REVISED_C } from "./content/los1RevisedC";
import { LOS1_C_SPEECH_BLOCKS, LOS1_C_AUDIO_EXAMPLES } from "./content/los1SupportSpeech";
import { LosReadingExercises, LosReadingUnderstanding } from "./LosReadingExercises";
import { losGermanVoices, losSpeakerSlot, losSpeechSegments, losSpeechSentenceSegments } from "./losSpeech";
import {LosVocabularyAudio} from "./LosVocabularyAudio";
import {losVoiceIdentity,readLosPreferredVoice,saveLosPreferredVoice,matchLosPreferredVoice} from "./losVoicePreference";
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
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [preferredVoice,setPreferredVoice]=useState(readLosPreferredVoice);
  const voiceCount=voices.length;
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const segments = losSpeechSegments(blocks,chapterId,kind);
  const sentences=segments.flatMap((segment,turnIndex)=>losSpeechSentenceSegments(segment.text)
    .map((text,sentenceIndex)=>({text,turnIndex,sentenceIndex,speaker:segment.speaker})));
  const playbackId = useRef(0);
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synthesis = window.speechSynthesis;
    const refreshVoices = () => setVoices(losGermanVoices(synthesis.getVoices()));
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
    setActiveSegment(null);
    setMessage("Toisto pysäytetty.");
  };

  const start = (onlyIndex: number | null = null) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setMessage("Tämä selain ei tue laitteen puhesynteesiä.");
      return;
    }
    const synthesis = window.speechSynthesis;
    const voices = losGermanVoices(synthesis.getVoices());
    setVoices(voices);
    if (!voices.length) {
      setMessage("Laitteelta ei löydy saksankielistä puheääntä. Tarkista laitteen puheäänet ja avaa lukija uudelleen. Vääränkielisellä äänellä ei harjoitella ääntämistä.");
      return;
    }
    const selected = onlyIndex === null ? segments : (segments[onlyIndex] ? [segments[onlyIndex]] : []);
    if (!selected.length) {
      setMessage("Tässä tekstissä ei ole luettavia saksankielisiä puheenvuoroja.");
      return;
    }
    playbackId.current += 1;
    const currentPlayback = playbackId.current;
    synthesis.cancel();
    setActiveSegment(onlyIndex);
    const chosenVoice=matchLosPreferredVoice(voices,preferredVoice);
    const utterances = selected.map(segment => {
      const utterance = new SpeechSynthesisUtterance(segment.text);
      utterance.rate = Math.max(0.5, Math.min(2, Number(rate) * segment.rateFactor));
      const spokenVoice=chosenVoice ?? voices[losSpeakerSlot(segment.speaker, voices.length)] ?? voices[0] ?? null;
      utterance.voice = spokenVoice;
      utterance.lang = spokenVoice?.lang ?? "de-DE";
      utterance.onerror = event => {
        if (playbackId.current !== currentPlayback) return;
        playbackId.current += 1;
        synthesis.cancel();
        setIsSpeaking(false);
        setActiveSegment(null);
        setMessage("Puheentoisto epäonnistui ("+event.error+"). Tarkista laitteen saksankielinen puheääni tai kokeile uudelleen.");
      };
      return utterance;
    });
    const last = utterances.at(-1);
    if (last) last.onend = () => {
      if (playbackId.current !== currentPlayback) return;
      setIsSpeaking(false);
      setActiveSegment(null);
      setMessage("Kuuntelu päättyi. Voit kuunnella tekstin uudelleen.");
    };
    setIsSpeaking(true);
    setMessage(chosenVoice ?
      "Toistetaan valitulla saksankielisellä äänellä: "+chosenVoice.name+"." :
      preferredVoice ?
      "Aiemmin valittu puheääni ei ole tällä laitteella saatavilla. Käytetään laitteen saksankielistä ääntä." :
      voices.length>1 ?
      "Toistetaan laitteen "+voices.length+" saksankielisellä äänellä. Henkilöillä voi olla eri ääniä laitteen valikoiman mukaan." :
      "Toistetaan laitteen saksankielisellä puheäänellä. Kaikilla henkilöillä on sama ääni.");
    utterances.forEach(utterance => synthesis.speak(utterance));
  };
  return <div className="los-revised-speech">
    <div className="los-revised-speech-controls">
      <Headphones size={18} aria-hidden="true" />
      <button type="button" className="los-outline-button" onClick={isSpeaking ? stop : ()=>start()}>
        {isSpeaking ? <><Square size={15} aria-hidden="true" /> Pysäytä</> : <><Volume2 size={16} aria-hidden="true" /> Kuuntele teksti</>}
      </button>
      <details className="los-revised-speech-options">
        <summary>Ääni ja nopeus</summary>
        <div className="los-revised-speech-option-fields">
      <label>Toistonopeus
        <select value={rate} onChange={event => setRate(event.target.value)} aria-label="Puhenopeus">
          <option value="0.75">0,75×</option><option value="1">1×</option><option value="1.25">1,25×</option>
        </select>
      </label>
      <label>Saksan puheääni
        <select value={preferredVoice} aria-label="Saksan puheääni" onChange={event=>{
          if(isSpeaking)stop();
          setPreferredVoice(event.target.value);
          const stored=saveLosPreferredVoice(event.target.value);
          setMessage(stored?"Puheäänivalinta tallennettu tähän laitteeseen.":"Puheäänivalinta toimii nyt, mutta sitä ei voitu tallentaa.");
        }}>
          <option value="">Automaattinen</option>
          {preferredVoice&&!matchLosPreferredVoice(voices,preferredVoice)&&
            <option value={preferredVoice}>Aiemmin valittu ääni ei ole saatavilla</option>}
          {voices.map(voice=><option key={losVoiceIdentity(voice)} value={losVoiceIdentity(voice)}>
            {voice.name} · {voice.lang}
          </option>)}
        </select>
      </label>
      {voiceCount===0&&<button type="button" className="los-outline-button" onClick={()=>{
        if(typeof window==="undefined"||!("speechSynthesis" in window))return;
        const available=losGermanVoices(window.speechSynthesis.getVoices());
        setVoices(available);
        setMessage(available.length?"Saksankielisiä puheääniä löytyi: "+available.length:
          "Saksankielisiä puheääniä ei löytynyt vielä. Tarkista laitteen kieliasetukset.");
      }}>Päivitä äänet</button>}
        </div>
      </details>
    </div>
    <details className="los-speech-unit-picker">
      <summary>Kuuntele osissa: lauseet ja puheenvuorot</summary>
      <div className="los-speech-secondary-controls">
    {segments.length>1&&<details className="los-revised-speech-segments">
      <summary>Kuuntele yksittäinen {kind==="C"?"mallilause":"puheenvuoro"} ({segments.length})</summary>
      <ol>{segments.map((segment,index)=><li key={index}>
        <div className="los-revised-speech-segment-label">
          <strong>{kind==="C"?"Malli "+(index+1):segment.speaker==="Erzähler"?"Kertoja":segment.speaker}</strong>
          <span lang="de">{segment.text}</span>
        </div>
        <button type="button" className="los-outline-button" aria-label={"Kuuntele "+(kind==="C"?"mallilause":"puheenvuoro")+" "+(index+1)}
          aria-pressed={isSpeaking&&activeSegment===index}
          onClick={()=>isSpeaking&&activeSegment===index?stop():start(index)}>
          {isSpeaking&&activeSegment===index?<Square size={14} aria-hidden="true"/>:<Volume2 size={16} aria-hidden="true"/>}
          {isSpeaking&&activeSegment===index?" Pysäytä":" Kuuntele"}
        </button>
      </li>)}</ol>
    </details>}
    {sentences.length>0&&<details className="los-revised-speech-sentences">
      <summary>Kuuntele jokainen lause erikseen ({sentences.length})</summary>
      <ol>{sentences.map(({text,turnIndex,sentenceIndex,speaker})=><li key={turnIndex+"-"+sentenceIndex}>
        <div className="los-revised-speech-segment-label">
          <strong>{speaker==="Erzähler"?"Lause":speaker+" · lause"}</strong>
          <span lang="de">{text}</span>
        </div>
        <LosVocabularyAudio word={text} kind="lause" rate={Number(rate)}/>
      </li>)}</ol>
    </details>}
      </div>
    </details>
    {(message||voiceCount>0)&&<p className="los-revised-muted" role="status">
      {message||("Saksankielinen puheääni käytettävissä ("+voiceCount+").")}
    </p>}
  </div>;
}

export function LosRevisedTextPage({ chapterId, kind }: { chapterId: string; kind: "A" | "B" }) {
  const [readingFocus,setReadingFocus] = useState<boolean>(()=>{
    if(typeof window==="undefined")return false;
    try{return window.localStorage.getItem("los1.reader.focus")==="true";}catch{return false;}
  });
  const setFocus=(value:boolean)=>{
    setReadingFocus(value);
    if(typeof window!=="undefined")try{window.localStorage.setItem("los1.reader.focus",String(value));}catch{/* optional preference */}
  };
  const [sideBySide,setSideBySide] = useState<boolean>(()=>{
    if(typeof window==="undefined")return false;
    try{return window.localStorage.getItem("los1.reader.split") === "true";}
    catch{return false;}
  });
  const setLayout=(value:boolean)=>{
    setSideBySide(value);
    if(typeof window!=="undefined"){
      try{window.localStorage.setItem("los1.reader.split",String(value));}catch {/* personal layout preference is optional */}
    }
  };
  const chapter = LOS1_REVISED_AB.chapters.find(candidate => candidate.chapterId === "C" + chapterId);
  if (!chapter) return <div role="status">Tämän kappaleen tekstiä ei löydy sisältöaineistosta.</div>;
  const source = kind === "A" ? chapter.textA : chapter.textB;
  const supportId="los-reading-task-pane-"+chapterId+"-"+kind;
  return <section className={"los-revised-page"+(sideBySide&&!readingFocus?" is-study-split":"")+(readingFocus?" is-reading-focus":"")} aria-labelledby={"los-revised-heading-" + chapterId + kind}>
    <p className="los-eyebrow">KAPPALE {chapterId} / TEXT {kind}</p>
    <h1 id={"los-revised-heading-" + chapterId + kind} lang="de">{source.title}</h1>
    <p className="los-page-intro">{kind === "A" ? "Lue keskustelu ja kuuntele saksaa omaan tahtiin." : "Harjoittele tuttuja ilmauksia uudessa tilanteessa."}</p>
    <div className="los-study-layout-toggle" role="group" aria-label="Tekstin ja tehtävien asettelu">
      <label className="los-study-mode-picker">
        <span>Näkymä</span>
        <select aria-label="Opiskelutila" aria-controls={supportId}
          value={readingFocus?"focus":sideBySide?"split":"book"}
          onChange={event=>{
            const mode=event.target.value;
            setFocus(mode==="focus");
            setLayout(mode==="split");
          }}>
          <option value="book">Kirja</option>
          <option value="split">Kirja + tehtävät</option>
          <option value="focus">Rauhallinen lukutila</option>
        </select>
      </label>
    </div>
    <div className={"los-study-layout"+(sideBySide&&!readingFocus?" is-split":"")}>
      <div className="los-study-reading">
        <TextSpeech blocks={source.blocks} chapterId={chapterId} kind={kind} />
        <LosOriginalDialogue
          chapterId={chapterId}
          sourceId={kind==="A"?"los-own-text-a":"los-own-text-b"}
          version={LOS1_CANONICAL_VERSION}
          heading="Tekstin sanat ja omat korostukset"
          usageLabel={"LOS!:N OMA TEKSTI · TEXT "+kind}
          guidance="Napauta saksankielistä sanaa avataksesi sanaselityksen tai vaihda korostustussiin. Korostukset tallentuvat omaan opiskelutilaasi."
          lines={los1CanonicalLines(chapterId,kind).map(line=>({...line,meaning:""}))}
          glossary={los1CourseGlossary(chapterId)}
          author="LOS!" sourceTitle={source.title} sourceUrl="" license="LOS!:n oma opetusteksti" licenseUrl=""
          sourceDetail="" isOwnText
        />
        <details className="los-revised-disclaimer">
          <summary>Tietoa tekstin ja äänen alkuperästä</summary>
          <p>LOS!:n oma opetusteksti, ei ulkopuolinen autenttinen lähdeteksti. Toimituksellinen kielentarkistus on tehty tekoälyllä, ei riippumattomalla kieliasiantuntijalla. Selaimen saksankielinen TTS-ääni ei ole erillinen ihmisäänite.</p>
        </details>
      </div>
      <div className="los-study-questions" id={supportId} aria-label={"Text "+kind+" -tehtävät"}>
        <LosReadingExercises chapterId={chapterId} text={kind} compact={sideBySide}/>
      </div>
    </div>
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

function LosCInteractiveExamples({chapterId}: {chapterId:string}) {
  const [show,setShow] = useState(false);
  const examples = LOS1_C_SPEECH_BLOCKS[chapterId]??[];
  return <section className="los-revised-supplement los-c-interactive-words" aria-label="Saksankielisten mallien sanakohtainen lukija">
    <button type="button" className="los-revised-supplement-toggle"
      aria-expanded={show} aria-controls={"los-c-words-"+chapterId} onClick={()=>setShow(state=>!state)}>
      {show?"Piilota sanakohtainen harjoittelu":"Avaa saksankielisten mallien sanaselitykset ja korostukset"}
    </button>
    {show&&<div id={"los-c-words-"+chapterId} className="los-revised-supplement-content">
      <LosOriginalDialogue chapterId={chapterId} sourceId="los-own-text-c"
        version={LOS1_CANONICAL_VERSION} heading="Text C:n saksankieliset mallit"
        usageLabel="LOS!:N OMA TEKSTI · TEXT C"
        guidance="Napauta sanaa nähdäksesi sen merkityksen tai valitse korostustussi. Samat mallit voi kuunnella tukitekstin kuuntelupainikkeella."
        lines={examples.map((block,index)=>({
          id:"e"+String(index).padStart(3,"0"),speaker:"",text:block.text,meaning:"",
        }))}
        glossary={los1CourseGlossary(chapterId)}
        author="LOS!" sourceTitle="Text C · Hilfstext" sourceUrl="" license="LOS!:n oma tukiteksti"
        licenseUrl="" sourceDetail="" isOwnText/>
    </div>}
  </section>;
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
    <LosCInteractiveExamples chapterId={chapterId} />
    <LosReadingExercises chapterId={chapterId} text="C" />
    <aside className="los-revised-disclaimer" role="note">
      <BookOpen size={18} aria-hidden="true" />
      <span>LOS!:n oma opetuksellinen tukiteksti · kielentarkistus kesken. Tukiteksti ei ole autenttinen ulkopuolinen lähde.</span>
    </aside>
  </section>;
}
