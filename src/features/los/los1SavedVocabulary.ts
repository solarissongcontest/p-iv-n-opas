import {losRecallKey, type LosRecallCard} from "./recallEngine.ts";

/** Saved words are editorially bounded and stored with the same owner-scoped
 * chapter draft as reading marks, allowing existing backups and manual sync.
 * These are learner-chosen context meanings, NOT dictionary-certified lemmas. */
export const LOS_SAVED_WORD_LIMIT=40;
export function losSavedWordKey(word:string):string {
  const normalized=word.normalize("NFC").trim().replace(/\s+/g," ").toLocaleLowerCase("de");
  return /^[\p{L}\p{N}äöüß'’ .-]{1,64}$/u.test(normalized)?normalized:"";
}
export function validLosSavedWords(value:unknown):value is Record<string,string>{
  if(value===null||typeof value!=="object"||Array.isArray(value))return false;
  const entries=Object.entries(value);
  return entries.length<=LOS_SAVED_WORD_LIMIT && entries.every(([key,meaning])=>
    key===losSavedWordKey(key) && typeof meaning==="string" &&
    meaning.trim().length>0 && meaning.length<=160);
}
export function parseLosSavedWords(value:unknown):Record<string,string>{
  if(!value||typeof value!=="object"||Array.isArray(value))return {};
  const candidate=Object.fromEntries(Object.entries(value).filter(([key,v])=>
    key===losSavedWordKey(key)&&typeof v==="string"&&v.trim().length>0&&v.length<=160
  ).slice(0,LOS_SAVED_WORD_LIMIT));
  return validLosSavedWords(candidate)?candidate:{};
}
export function losSaveWord(existing:Readonly<Record<string,string>>,word:string,meaning:string):Record<string,string>{
  const key=losSavedWordKey(word);
  if(!key||!meaning.trim()||meaning.length>160)
    throw new Error("Sanaa ei voitu tallentaa: tarkistettu merkitys tai sallittu kirjoitusasu puuttuu.");
  if(!Object.hasOwn(existing,key)&&Object.keys(existing).length>=LOS_SAVED_WORD_LIMIT)
    throw new Error("Kappaleen 40 oman sanan raja tuli vastaan. Kertaa sanoja ennen uusien lisäämistä.");
  return {...existing,[key]:meaning};
}
export function losSavedWordCards(chapterId:string,entries:Readonly<Record<string,string>>):LosRecallCard[]{
  return Object.entries(entries).flatMap(([german,finnish])=>
    (["de-fi","fi-de"] as const).map(direction=>({
      id:losRecallKey(chapterId,german,direction),chapterId,german,finnish,direction
    })));
}
