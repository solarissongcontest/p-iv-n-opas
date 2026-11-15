import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { getLosPronunciation } from "./pronunciation";
import { LosPronunciationButton } from "./LosPronunciationButton";
import { LosDictionarySourceResult } from "./LosDictionarySearch";
import { searchLosDictionary, type LosDictionaryResult } from "./dictionaryClient";
import "./los-u1-pronunciation.css";

type RemoteLookup =
  | {kind:"idle"}
  | {kind:"loading";term:string}
  | {kind:"unavailable";term:string}
  | {kind:"done";term:string;entries:readonly LosDictionaryResult[]};

/**
 * Shared U1 dictionary card: editorial context always wins over unreviewed
 * dictionary candidates. No invented lemma, phonetics, grammar or audio.
 * Uses the existing chapter gloss rather than a duplicate storage model.
 */
export function LosDictionaryCard({
  word, contextMeaning, publishedEntry, floating = false, onClose,
}: {
  word: string;
  contextMeaning?: string;
  publishedEntry?: LosDictionaryResult;
  floating?: boolean;
  onClose: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const language = publishedEntry?.language ?? "de";
  const pronunciation = language==="de" ? getLosPronunciation(word) : null;
  const controllerRef = useRef<AbortController | null>(null);
  const [remote, setRemote] = useState<RemoteLookup>({kind:"idle"});

  useEffect(() => {
    setRemote({kind:"idle"});
    return () => controllerRef.current?.abort();
  }, [word]);

  const lookupPublished = async (term: string) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setRemote({kind:"loading",term});
    try {
      const data = await searchLosDictionary(term,language==="de"?"de-fi":"fi-de",controller.signal);
      if (!controller.signal.aborted) {
        setRemote({kind:"done",term,entries:data.results});
      }
    } catch {
      if (!controller.signal.aborted) setRemote({kind:"unavailable",term});
    }
  };

  useEffect(() => {
    previousFocus.current = document.activeElement instanceof HTMLElement
      ? document.activeElement : null;
    closeButton.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onCloseRef.current(); }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (previousFocus.current?.isConnected) previousFocus.current.focus();
    };
  }, [word]);

  return <section className={"los-c01-gloss los-dictionary-card"+(floating?" los-dictionary-card-floating":"")}
    role="dialog" aria-modal="false" aria-label={`Sanan ${word} selitys`} lang="fi">
    <div className="los-dictionary-card-heading">
      <strong lang={language}>{word}</strong>
      <button type="button" ref={closeButton} onClick={onClose} aria-label="Sulje sanan selitys">
        <X size={19} aria-hidden="true"/> Sulje
      </button>
    </div>
    {contextMeaning ? <>
      <p className="los-dictionary-context-label">Kappaleen kontekstimerkitys</p>
      <p>{contextMeaning}</p>
    </> : <p className="los-dictionary-context-label">
      Julkaistu lähdetietue · ei kappalekohtaista kontekstisuomennosta
    </p>}
    {publishedEntry && <ol className="los-dict-results" aria-label="Valittu lähdetietue">
      <LosDictionarySourceResult entry={publishedEntry}
        onSearch={next => { void lookupPublished(next); }} />
    </ol>}
    {language==="de" && <div className="los-dictionary-pronunciation">
      <span className="los-dictionary-context-label">Ääntäminen (de-DE)</span>
      {pronunciation?.ipa ? <>
        <span className="los-dictionary-ipa" lang="de">[{pronunciation.ipa}]</span>
        {pronunciation.alternatives?.map(ipa =>
          <span key={ipa} className="los-dictionary-ipa" lang="de">[{ipa}]</span>)}
        <small>IPA: lähteen sanamuoto tarkistettu, ei vielä erillistä asiantuntija-arviota.</small>
        {pronunciation.ipaSourceUrl &&
          <a href={pronunciation.ipaSourceUrl} target="_blank" rel="noopener noreferrer">IPA-lähde: Wiktionary</a>}
      </> : <span>IPA tarkistamatta tälle sanamuodolle. Ei korvata arvauksella.</span>}
      <LosPronunciationButton text={word} />
    </div>}
    <div className="los-dictionary-remote">
      <button type="button" className="los-dictionary-remote-button"
        onClick={() => { void lookupPublished(word); }}>
        {publishedEntry ? "Hae lisää julkaistusta yleissanakirjasta" : "Hae julkaistusta yleissanakirjasta"}
      </button>
      <div className="los-dictionary-remote-status" role="status" aria-live="polite">
        {remote.kind==="idle" && <p>{contextMeaning
          ? "Lähteistetty yleissanakirja avataan erikseen. Kappaleen oma selitys toimii myös ilman sitä."
          : "Näytetään vain julkaistusta lähdeaineistosta saatu hakutulos. Voit hakea myös muita merkityksiä."}</p>}
        {remote.kind==="loading" && <p>Haetaan julkaistuista lähteistä sanaa {remote.term}…</p>}
        {remote.kind==="unavailable" && <p>Julkaistua yleissanakirjan hakua ei ole käytettävissä tällä hetkellä. Kappaleen oma selitys toimii edelleen.</p>}
        {remote.kind==="done" && <p>{remote.entries.length
          ? `Julkaistun aineiston osumat: ${remote.entries.length}. Näytetään enintään viisi lähdetietuetta.`
          : `Hakusanalle ${remote.term} ei löytynyt osumia julkaistusta aineistosta.`}</p>}
      </div>
      {remote.kind==="done" && remote.entries.length>0 && (
        <ol className="los-dict-results" aria-label="Yleissanakirjan lähdetietueet">
          {remote.entries.slice(0,5).map(entry=>
            <LosDictionarySourceResult key={entry.source_id+":"+entry.source_entry_id}
              entry={entry} onSearch={next => { void lookupPublished(next); }} />)}
        </ol>
      )}
    </div>
    <p className="los-dictionary-card-footnote">
      {contextMeaning
        ? "Kappaleen kontekstiselitys perustuu oppikirjaan. Yleissanakirjan osumat ovat erillisiä lähdetietueita."
        : "Tämä sanakortti näyttää julkaistun sanakirjalähteen tietoja, ei asiantuntijan tarkistamaa oppikirjasuomennosta."}
      {language==="de" && " Puhesynteesi ei ole hyväksytty ihmisäänite eikä vielä julkaisutestattu ääntämismalli."}
    </p>
  </section>;
}
