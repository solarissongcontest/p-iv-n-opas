/** A device-local browser preference. It never certifies speech or syncs to other devices. */
export const LOS_VOICE_PREFERENCE_KEY="los1.audio.preferred-german-voice.v1";
export const losVoiceIdentity=(voice:{lang:string;name:string})=>voice.lang+" / "+voice.name;

export function readLosPreferredVoice():string{
 if(typeof window==="undefined")return "";
 try{
  const stored=window.localStorage.getItem(LOS_VOICE_PREFERENCE_KEY)??"";
  return stored.length<=240?stored:"";
 }catch{return "";}
}
export function saveLosPreferredVoice(value:string):boolean{
 if(typeof window==="undefined")return false;
 try{
  if(!value)window.localStorage.removeItem(LOS_VOICE_PREFERENCE_KEY);
  else window.localStorage.setItem(LOS_VOICE_PREFERENCE_KEY,value);
  return true;
 }catch{return false;}
}
export function matchLosPreferredVoice<T extends {lang:string;name:string}>(
 voices:readonly T[],identity:string,
):T|undefined{
 if(!identity)return undefined;
 return voices.find(voice=>losVoiceIdentity(voice)===identity);
}
