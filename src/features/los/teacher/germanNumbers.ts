/** German numbers 20–100 used by the shared C06 Teacher number board. Exact ß/umlauts are intentional. */
export const GERMAN_NUMBER_UNITS = ["","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun"] as const;
export const GERMAN_NUMBER_TENS: Readonly<Record<number,string>> = {
  20:"zwanzig",30:"dreißig",40:"vierzig",50:"fünfzig",
  60:"sechzig",70:"siebzig",80:"achtzig",90:"neunzig",
};
export function germanCompositeNumber(number: number): string {
  if (!Number.isInteger(number) || number < 20 || number > 100) throw new RangeError("Only German numbers 20–100 are defined");
  if (number === 100) return "hundert";
  const unit = number % 10;
  const tens = Math.floor(number / 10) * 10;
  if (unit === 0) return GERMAN_NUMBER_TENS[tens]!;
  return (unit === 1 ? "ein" : GERMAN_NUMBER_UNITS[unit]) + "und" + GERMAN_NUMBER_TENS[tens];
}
