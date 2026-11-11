import { LOS1_C02_GLOSS, LOS1_C02_LINES, LOS1_C02_SOURCE_ID, LOS1_C02_TEXT_VERSION, LOS1_C02_SOURCE_REVISION } from "./content/los1C02";
import { LosOriginalDialogue } from "./LosOriginalDialogue";

/** C02: unabridged, human-authored Wikibooks dialogue in the LOS! reader. */
export function LosC02AuthenticText() {
  return <LosOriginalDialogue
    chapterId="02"
    sourceId={LOS1_C02_SOURCE_ID}
    version={LOS1_C02_TEXT_VERSION}
    lines={LOS1_C02_LINES}
    glossary={LOS1_C02_GLOSS}
    heading="Franz ja Greta tutustuvat"
    guidance="Lue kuuden repliikin alkuperäinen keskustelu. Etsi, miten henkilöt kertovat nimensä ja kysyvät toisen nimeä. Avaa tuntemattomien sanojen selitykset; opettamattomat rakenteet ovat vasta tunnistettavia tukimuotoja."
    author="Wikibooksin kirjoittajat"
    sourceTitle="German/Level I/Wie heißt du? (1. Teil)"
    sourceUrl={"https://en.wikibooks.org/w/index.php?title=German/Level_I/Wie_heißt_du&oldid=" + LOS1_C02_SOURCE_REVISION}
    license="CC BY-SA 4.0"
    licenseUrl="https://creativecommons.org/licenses/by-sa/4.0/"
    sourceDetail="Lähdesivun pysyvä versio 4430449. Alkuperäisten mahdollisten äänitteiden erillisiä oikeuksia ei ole vahvistettu, joten niitä ei ole liitetty tähän tekstiin."
  />;
}
