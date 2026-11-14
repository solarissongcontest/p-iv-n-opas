import { VolumeX } from "lucide-react";

/**
 * Teacher Experience 2.0 disallows unverified synthetic speech.
 * The separate textbook media player serves reviewed licensed human audio.
 * Unknown word audio is explicitly absent, never synthesized at runtime.
 */
export function LosPronunciationButton({ text }: { text: string }) {
  return <span className="los-pronunciation-control" role="note">
    <span className="los-pronunciation-button is-unavailable" aria-label={`Malliääni puuttuu: ${text}`}>
      <VolumeX size={17} aria-hidden="true" /> Malliääni puuttuu
    </span>
    <small className="los-pronunciation-disclaimer">
      Harjoittele kirjoitusasusta ja saatavilla olevasta IPA-merkinnästä.
      Vain erikseen tarkistettu ihmisäänite kelpaa ääntämismalliksi.
    </small>
  </span>;
}
