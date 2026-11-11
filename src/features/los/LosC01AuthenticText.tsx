import { LOS1_C01_GLOSS, LOS1_C01_LINES, LOS1_C01_SOURCE_ID, LOS1_C01_TEXT_VERSION } from "./content/los1C01";
import { LosOriginalDialogue } from "./LosOriginalDialogue";

/**
 * C01 now runs on the shared original-dialogue reader.
 * All existing 'los1-c01-m-com-01-uXX' saved mark keys remain unchanged.
 */
export function LosC01AuthenticText() {
  return <LosOriginalDialogue
    chapterId="01"
    sourceId={LOS1_C01_SOURCE_ID}
    version={LOS1_C01_TEXT_VERSION}
    lines={LOS1_C01_LINES}
    glossary={LOS1_C01_GLOSS}
    heading="Franz ja Jörg tutustuvat"
    guidance="Kuuntele ensin koko keskustelu. Lue sitten repliikit ääneen ja avaa tarvittaessa sanaselitykset. Tässä kappaleessa tärkeintä ovat tervehdykset ja hyvästelyt; nimet, ikä ja verbimuodot opitaan myöhemmin tarkemmin."
    author="Xzapro4 ja Erkan Yilmaz (2008)"
    sourceTitle="GesprächVorstellung.ogg, Wikimedia Commons"
    sourceUrl="https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg"
    license="CC BY-SA 3.0"
    licenseUrl="https://creativecommons.org/licenses/by-sa/3.0/"
    sourceDetail="Alkuperäinen dialogi ja sen äänite kuuluvat samaan lähteeseen. Äänitettä ei väitetä kahden natiivipuhujan keskusteluksi."
  />;
}
