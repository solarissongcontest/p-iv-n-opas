/**
 * LOS! 1 · C08 scaffold for a complete, difficult historical Text A.
 * These are original Finnish reading instructions, not alternate source
 * transcript lines or a graded answer engine. All source rows stay in the
 * authenticated reader with unchanged sourceId/turnIds.
 */
export const LOS1_C08_READING_STAGES = [
  {
    id:"start",
    turns:"u01–u05",
    title:"1. Ennen kuin opettaja tulee (repliikit 1–5)",
    strategy:"Etsi ensin sana Mathe. Se kertoo alkutilanteen, vaikka et vielä ymmärtäisi kaikkia verbimuotoja.",
    question:"Mikä oppiaine on meneillään? Kuka kertoo tehneensä tehtävät bussissa?",
    answer:"Matematiikka. Torsten kertoo tehneensä tehtävät bussissa (im Bus).",
    recognise:"Mathe = matematiikka; im Bus = bussissa. Hast ... gemacht? on vain tunnistettava menneen ajan kysymys.",
  },
  {
    id:"math",
    turns:"u06–u15",
    title:"2. Opettaja ja laskut (repliikit 6–15)",
    strategy:"Huomaa, että Erzähler tarkoittaa kertojaa. Kaikki tekstirivit eivät siis ole puhetta. Katso ensin Guten Morgen! ja Sehr gut!.",
    question:"Miten opettaja tervehtii? Mitä Florian tekee taululla ja miten opettaja reagoi?",
    answer:"Opettaja sanoo Guten Morgen! Florian laskee taululla, ja opettaja kehuu häntä: Sehr gut, Florian!",
    recognise:"Guten Morgen! = hyvää huomenta; Sehr gut! = erittäin hyvä. Laskusanastoa ei tarvitse osata kirjoittaa muistista tällä tunnilla.",
  },
  {
    id:"music",
    turns:"u16–u22",
    title:"3. Kellon soitto ja musiikki (repliikit 16–22)",
    strategy:"Etsi ilmaus zu Musik. Se auttaa huomaamaan, minne oppilaat menevät seuraavaksi.",
    question:"Mikä oppiaine tulee matematiikan jälkeen? Mikä asia saa Torstenin innostumaan?",
    answer:"Oppilaat menevät musiikkiin. Torsten odottaa musiikkia ja puhuu laulamisesta.",
    recognise:"Musik = musiikki; Schnell! = nopeasti. Muodot müssen, wollen ja freue mich ovat tässä ymmärtämisen, eivät taivutuksen, kohteita.",
  },
  {
    id:"ending",
    turns:"u23–u26",
    title:"4. Musiikin jälkeen (repliikit 23–26)",
    strategy:"Huomaa aikahyppy: Nach dem Musikunterricht tarkoittaa musiikintunnin jälkeen.",
    question:"Mikä oppiaine olisi vielä jäljellä? Mitä Torsten ehdottaa?",
    answer:"Historia olisi vielä jäljellä. Torsten ehdottaa lintsaamista ja bistroon menemistä. Tämä ei ole oppikirjan suositus.",
    recognise:"Geschichte = historia; schon wieder = taas kerran. Teksti kuvaa tilannetta, eikä sen kaikkia rakenteita tarvitse käyttää omassa puheessa.",
  },
] as const;

export function LosC08ReadingGuide() {
  return <section className="los-editorial-note los-c08-reading-guide" aria-labelledby="los-c08-reading-guide-title">
    <p className="los-eyebrow">LUKUTUKI · C08 · TEXT A</p>
    <h3 id="los-c08-reading-guide-title">Lue pitkä alkuperäisteksti neljässä osassa</h3>
    <p>Seuraava alkuperäisteksti on 26-rivinen luokkahuonekohtaus. Se sisältää myös
      selvästi tähän oppikirjaan kuulumatonta vaikeampaa kielioppia.
      <strong> Sinun ei tarvitse osata kaikkea saksaa, joka tekstissä esiintyy.</strong>
      Tavoitteesi on tunnistaa tilanteet, puhujat, neljä tuttua sanaa ja tapahtumien järjestys.</p>
    <p><strong>Työskentely:</strong> etene alla olevissa neljässä lukuvaiheessa järjestyksessä.
      Lue aina mainitut repliikit kokonaisesta tekstistä, vastaa kysymykseen ensin itse
      ja avaa vasta sitten mallivastaus. Voit napauttaa saksankielisiä sanoja saadaksesi
      niiden selityksen. Tämä on vapaaehtoinen lukutuki, ei uusi pisteytettävä koe.</p>
    <ol className="los-c08-reading-stages">
      {LOS1_C08_READING_STAGES.map(stage=><li key={stage.id}>
        <h4>{stage.title}</h4>
        <p>{stage.strategy}</p>
        <p><strong>Pohdi ensin:</strong> {stage.question}</p>
        <details>
          <summary>Paljasta vastausesimerkki oman yrityksen jälkeen</summary>
          <p>{stage.answer}</p>
          <p><strong>Tunnistamissanasto:</strong> {stage.recognise}</p>
        </details>
      </li>)}
    </ol>
    <p><strong>Harjoittelun jälkeen:</strong> tee C08:n Ymmärrä-sivun oikeat tekstikysymykset.
      Varsinaiset opetettavat selviytymisfraasit, kuten <span lang="de">Ich verstehe nicht.</span>
      ja <span lang="de">Noch einmal, bitte.</span>, opitaan erikseen.
      Tekstistä ei päätellä kuullunymmärtämisen osaamista, sillä tälle lähteelle
      ei ole hyväksyttyä sisäistä ääniraitaa.</p>
  </section>;
}
