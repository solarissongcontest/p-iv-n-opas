import { getDeviceAccessToken } from "@/lib/deviceSession";

export type LosDictionaryDirection = "de-fi" | "fi-de";
export type LosDictionaryResult = {
  source_id: string;
  source_entry_id: string;
  lemma: string;
  language: "de" | "fi";
  part_of_speech: string | null;
  gender: string | null;
  source_kind: "freedict" | "kaikki";
  license_code: string;
  license_url: string;
  evidence_url: string;
  match_type: "lemma" | "form" | "prefix";
  senses: readonly {
    senseIndex: number;
    glosses: readonly string[];
    glossLanguage: string | null;
    translations: readonly {language: "de" | "fi"; value: string}[];
  }[];
  forms: readonly {writtenForm:string;grammar:Record<string,unknown>}[];
  pronunciations: readonly {
    ipa:string; reviewStatus:"candidate"|"source-verified"|"reviewed";region:string;
  }[];
};
export type LosDictionaryResponse = {
  status:"ready";
  query:string;
  direction:LosDictionaryDirection;
  limit:number;
  sourcesPublished:number;
  results:LosDictionaryResult[];
  note:string;
};
export class LosDictionaryUnavailable extends Error {
  constructor(message:string,public readonly status:number) { super(message); }
}
export async function searchLosDictionary(
  query:string,direction:LosDictionaryDirection,signal?:AbortSignal,
):Promise<LosDictionaryResponse> {
  const token=getDeviceAccessToken();
  if(!token)throw new LosDictionaryUnavailable("Laitetunnistus puuttuu tai on vanhentunut.",401);
  const params=new URLSearchParams({q:query,direction,limit:"20"});
  let response:Response;
  try {
    response=await fetch("/api/los-dictionary?"+params,{
      method:"GET",headers:{"Authorization":"Bearer "+token},
      cache:"no-store",signal,
    });
  }catch(error) {
    if(signal?.aborted)throw error;
    throw new LosDictionaryUnavailable("Hakupalvelimeen ei saada yhteyttä. Kappalesanasto on edelleen käytössä.",0);
  }
  const raw=await response.json().catch(()=>null) as {
    status?:string;error?:string;results?:unknown;sourcesPublished?:number;
  }|null;
  if(!response.ok||raw?.status!=="ready"||!Array.isArray(raw.results)) {
    throw new LosDictionaryUnavailable(raw?.error ??
      "Sanakirja ei ole vielä käytettävissä.",response.status);
  }
  // The only public response is a bounded server result, never a dictionary dump.
  return raw as LosDictionaryResponse;
}
