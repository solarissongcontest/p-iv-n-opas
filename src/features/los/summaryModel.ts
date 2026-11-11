import type {ChapterId} from './content';

export const FINAL_SKILLS=[
 {id:'C01',title:'Osaan tervehtiä ja hyvästellä.',sample:'Hallo! Auf Wiedersehen!'},
 {id:'C02',title:'Osaan kysyä ja kertoa nimen.',sample:'Wie heißt du? Ich heiße Lea.'},
 {id:'C03',title:'Osaan kertoa kotimaan.',sample:'Ich komme aus Finnland.'},
 {id:'C04',title:'Erotan sinuttelun ja kohteliaan puhuttelun.',sample:'Wie heißen Sie?'},
 {id:'C05',title:'Osaan kysyä ja kertoa voinnin.',sample:'Wie geht es dir? Mir geht es gut.'},
 {id:'C06',title:'Osaan muodostaa alkeistason lukusanoja ja kertoa iän.',sample:'Ich bin siebzehn Jahre alt.'},
 {id:'C07',title:'Osaan pyytää nimen tavaamista.',sample:'Bitte buchstabieren Sie.'},
 {id:'C08',title:'Osaan kertoa, etten ymmärrä, ja pyytää toistoa.',sample:'Ich verstehe nicht. Noch einmal, bitte!'},
 {id:'C09',title:'Osaan sanoa viikonpäivän ja kellonajan.',sample:'Am Montag um drei Uhr.'},
 {id:'C10',title:'Osaan esitellä kolmannen henkilön.',sample:'Das ist Leo. Er kommt aus Finnland.'}
] as const satisfies readonly {id:ChapterId;title:string;sample:string}[];
export type SelfRating='harjoittelen'|'osaan'|'kertaan';
export type SelfRatingMap=Partial<Record<ChapterId,SelfRating>>;
export function normalizedRatings(value:unknown):SelfRatingMap{
 if(!value||typeof value!=='object'||Array.isArray(value))return {};
 const input=value as Record<string,unknown>;
 const out:SelfRatingMap={};
 for(const s of FINAL_SKILLS){
  const response=input[s.id];
  if(response==='harjoittelen'||response==='osaan'||response==='kertaan')out[s.id]=response;
 }
 return out;
}
export function eligibleSummary(ratings:unknown,nextGoal:unknown):boolean{
 const vals=normalizedRatings(ratings);
 return FINAL_SKILLS.every(s=>Boolean(vals[s.id]))&&
  typeof nextGoal==='string'&&nextGoal.trim().length>=20;
}
