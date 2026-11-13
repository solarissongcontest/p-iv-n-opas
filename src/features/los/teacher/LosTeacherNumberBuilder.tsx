import { useMemo } from "react";

/** Deterministic C06 learning aid, NOT audio or an alternate assessment engine. */
const units = ["","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun"] as const;
const tens: Readonly<Record<number,string>> = {
  20:"zwanzig",30:"dreißig",40:"vierzig",50:"fünfzig",
  60:"sechzig",70:"siebzig",80:"achtzig",90:"neunzig",
};
export function germanCompositeNumber(number: number): string {
  if (!Number.isInteger(number) || number < 20 || number > 100) throw new RangeError("Teacher board supports 20–100 only");
  if (number === 100) return "hundert";
  const unit = number % 10;
  const base = Math.floor(number / 10) * 10;
  if (!unit) return tens[base]!;
  return (unit === 1 ? "ein" : units[unit]) + "und" + tens[base];
}
export function LosTeacherNumberBuilder({ value, onChange, historyCount }: {
  value: string | undefined;
  onChange: (value: number) => void;
  historyCount: number;
}) {
  const number = useMemo(() => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed >= 20 && parsed <= 100 ? parsed : 21;
  }, [value]);
  const base = number === 100 ? 100 : Math.floor(number / 10) * 10;
  const unit = number === 100 ? 0 : number % 10;
  const german = germanCompositeNumber(number);
  const parts = number === 100 ? "hundert = 100" :
    unit === 0 ? tens[base] + " = " + number :
    (unit === 1 ? "ein" : units[unit]) + " + und + " + tens[base] + " = " + german;
  return <section className="los-teacher-number-builder" aria-label="Interaktiivinen saksan numeroiden rakennustaulu">
    <h3>Rakenna itse luku 20–100</h3>
    <p>Vaihda kymmeniä ja yksiköitä. Huomaa saksan sanajärjestys: ensin yksiköt, sitten und, sitten kymmenet.</p>
    <div className="los-teacher-number-selects">
      <label>Kymmenet
        <select aria-label="Valitse kymmenet" value={base} onChange={e => onChange(Number(e.target.value) === 100 ? 100 : Number(e.target.value) + unit)}>
          {[20,30,40,50,60,70,80,90,100].map(item =>
            <option key={item} value={item}>{item === 100 ? "100 · hundert" : item + " · " + tens[item]}</option>)}
        </select>
      </label>
      <label>Yksiköt
        <select aria-label="Valitse yksiköt" disabled={base === 100} value={unit} onChange={e => onChange(base + Number(e.target.value))}>
          {units.map((item,i) => <option key={i} value={i}>{i} {i === 1 ? "· ein (ei eins)" : item ? "· " + item : "· tasakymmen"}</option>)}
        </select>
      </label>
    </div>
    <div className="los-teacher-number-result" role="status" aria-live="polite">
      <span>Numeromerkintä</span><strong>{number}</strong>
      <span>Saksankielinen sana</span><strong lang="de">{german}</strong>
      <p>{parts}</p>
      <p>{number === 100 ? "Sata on hundert. Myös einhundert on oikein." :
        unit === 0 ? "Tasakymmenessä ei ole yksikköosaa eikä und-sanaa." :
        unit === 1 ? "Ykkönen lyhenee yhdyssanassa muotoon ein. Älä kirjoita einsund... ." :
        "Yksikköosa tulee ensin, sitten und ja lopuksi kymmenet. Sana kirjoitetaan yhteen."}</p>
      {Math.floor(number/10) === 3 && <p>Kolmekymmentä on dreißig: ß säilyy myös yhdistelmäluvussa.</p>}
    </div>
    <p className="los-teacher-number-count">Erilaisia rakennettuja lukuja tallessa: {historyCount}/4 vaadittua. Käytä vähintään neljää yhdistelmää.</p>
  </section>;
}
