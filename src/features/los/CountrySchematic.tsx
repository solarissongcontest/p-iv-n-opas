/** Stylized geographic relationships for the beginner's DACH vocabulary.
 * This is explicitly a schematic, not a politically accurate or scaled map.
 * Names and spatial relationships are available in HTML text independently.
 */
const places = [
  { name: "Ruotsi · Schweden", x: 230, y: 111, flag: "🇸🇪" },
  { name: "Suomi · Finnland", x: 450, y: 95, flag: "🇫🇮" },
  { name: "Viro · Estland", x: 468, y: 230, flag: "🇪🇪" },
  { name: "Saksa · Deutschland", x: 267, y: 260, flag: "🇩🇪" },
  { name: "Sveitsi · die Schweiz", x: 125, y: 357, flag: "🇨🇭" },
  { name: "Itävalta · Österreich", x: 373, y: 350, flag: "🇦🇹" },
  { name: "Liechtenstein", x: 256, y: 359, flag: "🇱🇮" },
] as const;

export function CountrySchematic({ titleFi, instructionsFi }: {
  titleFi: string; instructionsFi: string;
}) {
  return <section className="los-country-schematic" aria-label={titleFi}>
    <p className="los-eyebrow">LAND UND LEUTE · MAIDEN SIJAINTI</p>
    <h2>{titleFi}</h2>
    <p>{instructionsFi}</p>
    <p className="los-support">Kaavio näyttää vain maiden suhteellisia ilmansuuntia.
      Se ei ole mittakaavassa, eikä siitä voi päätellä valtioiden rajoja, etäisyyksiä tai kokoja.</p>
    <div className="los-country-map-scroll">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 455"
        role="img" aria-labelledby="los-map-title los-map-desc">
        <title id="los-map-title">Pohjois- ja Keski-Euroopan maiden sijaintikaavio</title>
        <desc id="los-map-desc">
          Ruotsi on Suomen länsipuolella. Viro on Suomen eteläpuolella.
          Saksa on Sveitsin ja Itävallan pohjoispuolella.
          Sveitsi on Itävallan länsipuolella ja Liechtenstein on niiden välissä.
          Maapisteet eivät näytä valtioiden rajoja.
        </desc>
        <rect x="1" y="1" width="638" height="453" rx="18" fill="var(--los-map-sea,#EAF4F9)" stroke="var(--los-border)"/>
        <text x="34" y="37" fill="var(--los-ink-secondary)" fontSize="13" fontWeight="650">SUHTEELLINEN SIJAINTI · EI MITTAKAAVASSA</text>
        <g fill="none" stroke="var(--los-map-guide,#B4CDD4)" strokeWidth="1.5" strokeDasharray="5 7">
          <path d="M230 111 L450 95 L468 230"/>
          <path d="M267 260 L125 357 L256 359 L373 350 L267 260"/>
          <path d="M267 260 L230 111"/>
        </g>
        <g transform="translate(590 56)" aria-hidden="true" fill="var(--los-ink-secondary)" stroke="var(--los-ink-secondary)" strokeWidth="2">
          <path d="M0 26 V-14 M0 -14 L-7 -3 M0 -14 L7 -3" fill="none"/>
          <text x="0" y="-23" textAnchor="middle" stroke="none" fontSize="14" fontWeight="700">N</text>
        </g>
        {places.map((place, index) => <g key={place.flag + index} transform={"translate(" + place.x + " " + place.y + ")"}>
          <circle r="23" fill="var(--los-surface)" stroke="var(--los-book-accent)" strokeWidth="2"/>
          <circle r="6" fill="var(--los-book-accent)"/>
          <text textAnchor="middle" y="-33" fill="var(--los-ink)" fontSize="14" fontWeight="600">{place.flag} {place.name}</text>
        </g>)}
        <text x="320" y="435" textAnchor="middle" fill="var(--los-ink-secondary)" fontSize="12">
          Alueiden sijaintisuhteet. Saksan kielen harjoituskaavio, ei poliittinen kartta.
        </text>
      </svg>
    </div>
    <details className="los-country-map-text">
      <summary>Maiden sijainnit tekstinä</summary>
      <ul>
        <li>Schweden (Ruotsi) on Finnlandin (Suomen) länsipuolella.</li>
        <li>Estland (Viro) on Finnlandin (Suomen) eteläpuolella.</li>
        <li>Deutschland (Saksa) on Österreichin (Itävallan) ja die Schweizin (Sveitsin) pohjoispuolella.</li>
        <li>Die Schweiz (Sveitsi) on Österreichin (Itävallan) länsipuolella.</li>
        <li>Liechtenstein sijaitsee Sveitsin ja Itävallan välissä.</li>
      </ul>
    </details>
  </section>;
}
