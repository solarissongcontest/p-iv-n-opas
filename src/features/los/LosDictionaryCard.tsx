import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { getLosPronunciation } from "./pronunciation";
import { LosPronunciationButton } from "./LosPronunciationButton";

/**
 * Shared U1 dictionary card: editorial context always wins over unreviewed
 * dictionary candidates. No invented lemma, phonetics, grammar or audio.
 * Uses the existing chapter gloss rather than a duplicate storage model.
 */
export function LosDictionaryCard({
  word, contextMeaning, onClose,
}: { word: string; contextMeaning: string; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const pronunciation = getLosPronunciation(word);

  useEffect(() => {
    closeButton.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, word]);

  return <section className="los-c01-gloss los-dictionary-card"
    role="dialog" aria-modal="false" aria-label={`Sanan ${word} selitys`} lang="fi">
    <div className="los-dictionary-card-heading">
      <strong lang="de">{word}</strong>
      <button type="button" ref={closeButton} onClick={onClose} aria-label="Sulje sanan selitys">
        <X size={19} aria-hidden="true"/> Sulje
      </button>
    </div>
    <p className="los-dictionary-context-label">Kappaleen kontekstimerkitys</p>
    <p>{contextMeaning}</p>
    <div className="los-dictionary-pronunciation">
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
    </div>
    <p className="los-dictionary-card-footnote">
      Tämä on oppikirjan oma sanaselitys, ei vielä laajasta FreeDict-sanakannasta tuotu hakutulos.
      Puhesynteesi ei ole hyväksytty ihmisäänite eikä vielä julkaisutestattu ääntämismalli.
    </p>
  </section>;
}
