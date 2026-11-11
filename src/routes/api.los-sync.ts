import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { createHash, timingSafeEqual } from "node:crypto";
import { verifyArthurDeviceToken } from "@/lib/deviceAuth.server";
import { isUuid } from "@/lib/ownerSync.server";
import { validLosChapter, validateLosCloudDraft } from "@/features/los/cloudContract";

type Row = { revision:number; payload:unknown; updated_at:string };
class AuthFailure extends Error {
  constructor(public readonly status:number, message:string){super(message);}
}
function reply(body:unknown,status=200){
  return Response.json(body,{status,headers:{"Cache-Control":"no-store","Vary":"Authorization, X-LOS-Sync-Key"}});
}
function required(name:string){
  const value=process.env[name];
  if(!value)throw new AuthFailure(503,"LOS!-pilvitallennusta ei ole vielä otettu käyttöön palvelimella.");
  return value;
}
function hash(value:string){return createHash("sha256").update(value,"utf8").digest();}
function authenticate(request:Request) {
  const url=new URL(request.url);
  const origin=request.headers.get("origin");
  if(origin && new URL(origin).origin!==url.origin)throw new AuthFailure(403,"Virheellinen alkuperä.");
  const expected=required("LOS_SYNC_PASSPHRASE");
  if(expected.length<24)throw new AuthFailure(503,"LOS!-pilvitallennus vaatii turvallisen palvelinsalaisuuden.");
  const supplied=request.headers.get("x-los-sync-key")??"";
  if(!supplied || supplied.length>1024 || !timingSafeEqual(hash(supplied),hash(expected))) {
    throw new AuthFailure(401,"Pilvitallennuksen salasana ei kelpaa.");
  }
  const authorization=request.headers.get("authorization")??"";
  if(!authorization.startsWith("Bearer "))throw new AuthFailure(401,"Laitteen tunnistus puuttuu.");
  let claims:ReturnType<typeof verifyArthurDeviceToken>;
  try{claims=verifyArthurDeviceToken(authorization.slice(7),required("SUPABASE_JWT_SECRET"));}
  catch{throw new AuthFailure(401,"Laitteen tunnistus ei kelpaa.");}
  if(!isUuid(claims.sub))throw new AuthFailure(401,"Laitteen käyttäjätunnus on virheellinen.");
  const supabaseUrl=required("SUPABASE_URL");
  const expectedIss=`${supabaseUrl.replace(/\/$/,"")}/auth/v1`;
  if(claims.iss!==expectedIss)throw new AuthFailure(401,"Laitetunnistuksen myöntäjä ei vastaa palvelinta.");
  return {
    ownerId:claims.sub,
    db:createClient(supabaseUrl,required("SUPABASE_SECRET_KEY"),{
      auth:{persistSession:false,autoRefreshToken:false}
    }),
  };
}
function parseKey(rawBook:string|null,rawChapter:string|null){
  const bookId=Number(rawBook);
  if(!validLosChapter(bookId,rawChapter))throw new AuthFailure(400,"Virheellinen LOS!-kappale.");
  return {bookId,chapterId:rawChapter as string};
}
function handleError(error:unknown){
  if(error instanceof AuthFailure)return reply({error:error.message},error.status);
  if(error instanceof Error && /Laitetunniste|Laitetunnistuksen|JWT/.test(error.message))
    return reply({error:"Laitteen tunnistus ei kelpaa."},401);
  console.error("[LOS sync] server error",error);
  return reply({error:"Pilvitallennus ei ole juuri nyt käytettävissä."},500);
}
async function currentRecord(db:ReturnType<typeof createClient>,ownerId:string,bookId:number,chapterId:string){
  const {data,error}=await db.from("los_chapter_drafts")
    .select("revision,payload,updated_at")
    .eq("owner_id",ownerId).eq("book_id",bookId).eq("chapter_id",chapterId).maybeSingle();
  if(error)throw error;
  return (data??null) as Row|null;
}
export const Route=createFileRoute("/api/los-sync")({
  server:{
    handlers:{
      GET:async({request})=>{
        try{
          const {ownerId,db}=authenticate(request);
          const url=new URL(request.url);
          const {bookId,chapterId}=parseKey(url.searchParams.get("book"),url.searchParams.get("chapter"));
          const record=await currentRecord(db,ownerId,bookId,chapterId);
          return reply({record});
        }catch(error){return handleError(error);}
      },
      PUT:async({request})=>{
        try{
          const {ownerId,db}=authenticate(request);
          const body=await request.json().catch(()=>null) as {
            book_id?:unknown;chapter_id?:unknown;expected_revision?:unknown;payload?:unknown
          }|null;
          if(!body||!validLosChapter(body.book_id,body.chapter_id)||
            typeof body.expected_revision!=="number" || !Number.isSafeInteger(body.expected_revision) ||
            body.expected_revision<0 || body.expected_revision>1_000_000_000 ||
            !validateLosCloudDraft(body.payload)){
            return reply({error:"Tallennuspyynnössä on virheellinen tai liian suuri tieto."},400);
          }
          const bookId=body.book_id;
          const chapterId=body.chapter_id as string;
          const nextRevision=body.expected_revision+1;
          const updated_at=new Date().toISOString();
          if(body.expected_revision===0){
            const {data,error}=await db.from("los_chapter_drafts").insert({
              owner_id:ownerId,book_id:bookId,chapter_id:chapterId,
              revision:nextRevision,payload:body.payload,updated_at,
            }).select("revision,payload,updated_at").maybeSingle();
            if(error && error.code!=="23505")throw error;
            if(data)return reply({record:data});
          }else{
            const {data,error}=await db.from("los_chapter_drafts").update({
              payload:body.payload,revision:nextRevision,updated_at,
            }).eq("owner_id",ownerId).eq("book_id",bookId)
              .eq("chapter_id",chapterId).eq("revision",body.expected_revision)
              .select("revision,payload,updated_at").maybeSingle();
            if(error)throw error;
            if(data)return reply({record:data});
          }
          // Stale revision. Never silently replace data from another device.
          const record=await currentRecord(db,ownerId,bookId,chapterId);
          return reply({error:"Toinen laite on tallentanut uudemman version.",record},409);
        }catch(error){return handleError(error);}
      },
    },
  },
});
