import {createFileRoute,redirect} from '@tanstack/react-router';

/** Legacy discovery URL from the parallel LOS! foundation.
 * Use one owner-scoped implementation, not two competing progress stores.
 */
export const Route=createFileRoute('/oppikirjasto/saksa-b3/$')({
 beforeLoad:()=>{throw redirect({to:'/studies/los',replace:true});}
});
