/**
 * A1.1 German cardinal numbers 0..100. This is original instructional code,
 * not a transcript or replacement for C06's missing human-written Text A.
 */
const single=['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun'] as const;
const teens=['zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'] as const;
const tens:Readonly<Record<number,string>>={
 20:'zwanzig',30:'dreißig',40:'vierzig',50:'fünfzig',
 60:'sechzig',70:'siebzig',80:'achtzig',90:'neunzig'
};
export function germanNumber(value:number):string{
 if(!Number.isInteger(value)||value<0||value>100)throw new RangeError('LOS! 1 harjoittelee kokonaislukuja 0–100.');
 if(value<10)return single[value]!;
 if(value<20)return teens[value-10]!;
 if(value===100)return 'einhundert';
 const tensValue=Math.floor(value/10)*10;
 const tensWord=tens[tensValue];
 if(!tensWord)throw new Error('Luvun muodostusvirhe');
 const unit=value%10;
 if(unit===0)return tensWord;
 return (unit===1?'ein':single[unit])+'und'+tensWord;
}
export function numberAnswerAccepted(number:number,answer:string):boolean{
 if(!Number.isInteger(number)||number<0||number>100)return false;
 const normalized=answer.normalize('NFC').trim().toLocaleLowerCase('de').replace(/\s+/gu,'');
 return normalized===germanNumber(number)||(number===100&&normalized==='hundert');
}
export const NUMBER_DRILL=[
 0,1,2,7,11,12,13,16,17,19,20,21,27,30,32,40,50,60,70,80,90,99,100
] as const;
/** Two actual writing drills. Review the exceptions at least once. */
export const NUMBER_SESSIONS=[
 {id:'perusteet',title:'Luvut 0–20',numbers:[0,1,2,7,11,12,13,16,17,19,20]},
 {id:'kymmenluvut',title:'Luvut 21–100',numbers:[21,27,30,32,40,50,60,70,80,90,99,100]}
] as const;
export function numberDrillResult(numbers:readonly number[],answers:Record<string,string>):{correct:number;total:number;errors:number[]}{
 const errors=numbers.filter(n=>!numberAnswerAccepted(n,answers[String(n)]??''));
 return {correct:numbers.length-errors.length,total:numbers.length,errors};
}
