/**
 * Drains an owner-scoped queue without discarding edits made during an in-flight
 * network write. The send callback must be idempotent for the same key/value.
 * Each successful row is removed only if that exact value is still queued.
 */
export async function drainLosPending(
 pending: {current:Record<string,unknown>},
 send:(key:string,value:unknown)=>Promise<void>,
 persisted:()=>void,
 maxPasses=100,
):Promise<boolean>{
 for(let pass=0;pass<maxPasses;pass++){
  const batch=Object.entries(pending.current);
  if(!batch.length)return true;
  for(const [key,value] of batch){
   await send(key,value);
   if(pending.current[key]===value){
    delete pending.current[key];
    persisted();
   }
  }
 }
 return !Object.keys(pending.current).length;
}
