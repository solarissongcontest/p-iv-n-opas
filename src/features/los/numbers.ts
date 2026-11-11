/** Pure, complete German cardinal number system 0–100 used by C06.
 * This is a grammar algorithm, not a licensed source quotation.
 * Irregularities: sechzehn, siebzehn, sechzig, siebzig, dreißig,
 * eins -> ein in 21–99. German compounds are written as one word.
 */
const ones=["null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun"] as const;
const teens=["zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn"] as const;
const tens=["","","zwanzig","dreißig","vierzig","fünfzig","sechzig","siebzig","achtzig","neunzig"] as const;

export function germanCardinal(n:number):string {
  if (!Number.isInteger(n)||n<0||n>100) throw new RangeError("C06 covers only integers 0–100");
  if(n<10)return ones[n]!;
  if(n<20)return teens[n-10]!;
  if(n===100)return "hundert";
  const decade=Math.floor(n/10),unit=n%10;
  if(unit===0)return tens[decade]!;
  return (unit===1?"ein":ones[unit])+"und"+tens[decade];
}
export const C06_ZERO_TO_TWENTY=Array.from({length:21},(_,n)=>({n,de:germanCardinal(n)}));
export const C06_TENS=[20,30,40,50,60,70,80,90,100].map(n=>({n,de:germanCardinal(n)}));
export const C06_EXAMPLE_COMPOUNDS=[21,27,32,46,58,69,71,84,99].map(n=>({n,de:germanCardinal(n)}));
