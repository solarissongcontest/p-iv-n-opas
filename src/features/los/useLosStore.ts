import {useCallback,useEffect,useRef,useState} from 'react';
import type {SupabaseClient} from '@supabase/supabase-js';
import {supabase} from '@/integrations/supabase/client';
import {drainLosPending} from './syncQueue';

type Row={item_key:string;value:unknown};
export type SyncStatus='loading'|'saved'|'pending'|'error';
const db=supabase as unknown as SupabaseClient;
const cacheKey=(owner:string)=>'opk.los1.pending.'+owner;
const safeRead=(owner:string):Record<string,unknown>=>{
 if(typeof window==='undefined')return {};
 try {
  const raw=window.localStorage.getItem(cacheKey(owner));
  const value:unknown=raw?JSON.parse(raw):{};
  return value&&typeof value==='object'&&!Array.isArray(value)?value as Record<string,unknown>:{};
 } catch {return {}}
};
const safeWrite=(owner:string,items:Record<string,unknown>)=>{
 try{window.localStorage.setItem(cacheKey(owner),JSON.stringify(items));return true;}catch{return false;}
};

// Supabase is the source of truth; local storage is ONLY a pending upload queue,
// not an invented cross-device sync. UI labels the difference explicitly.
export function useLosStore(ownerId:string){
 const [items,setItems]=useState<Record<string,unknown>>(()=>safeRead(ownerId));
 const [status,setStatus]=useState<SyncStatus>('loading');
 const [error,setError]=useState('');
 const pending=useRef<Record<string,unknown>>(safeRead(ownerId));
 const flushing=useRef(false);
 const mounted=useRef(true);
 const flushDelay=useRef<ReturnType<typeof setTimeout>|null>(null);
 const flush=useCallback(async()=>{
  if(flushing.current)return;
  if(typeof navigator!=='undefined'&&!navigator.onLine){setStatus('pending');return;}
  if(!Object.keys(pending.current).length){setStatus('saved');return;}
  flushing.current=true;setStatus('pending');
  try{
   // A write occurring while a previous upsert is in flight must never be
   // marked "saved" until its *new* value has also reached the database.
   const drained=await drainLosPending(pending,async(item_key,value)=>{
    const {error:saveError}=await db.from('los_user_items').upsert(
     {owner_id:ownerId,item_key,value},
     {onConflict:'owner_id,item_key'}
    );
    if(saveError)throw saveError;
   },()=>{safeWrite(ownerId,pending.current);});
   if(mounted.current){
    setError('');
    setStatus(drained?'saved':'pending');
   }
  }catch(e){
   if(mounted.current){
    setError(e instanceof Error?e.message:String(e));
    setStatus('error');
   }
  }finally{
   flushing.current=false;
  }
 },[ownerId]);
 const reload=useCallback(async()=>{
  try{
   const {data,error:loadError}=await db.from('los_user_items')
    .select('item_key,value').eq('owner_id',ownerId);
   if(loadError)throw loadError;
   if(!mounted.current)return;
   const remote=Object.fromEntries(((data??[]) as Row[]).map(row=>[row.item_key,row.value]));
   setItems({...remote,...pending.current});
   setError('');
   await flush();
  }catch(e){
   if(!mounted.current)return;
   setError(e instanceof Error?e.message:String(e));
   setStatus('error');
  }
 },[ownerId,flush]);
 useEffect(()=>{
  mounted.current=true;
  void reload();
  const onReconnect=()=>{void reload();};
  window.addEventListener('online',onReconnect);
  const onFocus=()=>{if(document.visibilityState==='visible')void reload();};
  document.addEventListener('visibilitychange',onFocus);
  return()=>{mounted.current=false;if(flushDelay.current)clearTimeout(flushDelay.current);window.removeEventListener('online',onReconnect);document.removeEventListener('visibilitychange',onFocus);};
 },[reload]);
 const put=useCallback((key:string,value:unknown)=>{
  // Never signal saved before the server confirms it. Retain pending writes
  // across reload, when browser storage is writable.
  pending.current={...pending.current,[key]:value};
  setItems(old=>({...old,[key]:value}));
  const queued=safeWrite(ownerId,pending.current);
  setStatus(queued?'pending':'error');
  if(!queued)setError('Paikallisen luonnoksen tallennus epäonnistui. Älä sulje sivua.');
  if(flushDelay.current)clearTimeout(flushDelay.current);
  flushDelay.current=setTimeout(()=>{void flush();},350);
 },[flush,ownerId]);
 return {items,put,reload,status,error};
}
