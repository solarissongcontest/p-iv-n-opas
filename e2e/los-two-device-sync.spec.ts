import {test,expect,type BrowserContext,type Page} from "@playwright/test";

/** Two *independent browser storage profiles* exercising the real LOS! UI
 * and HTTP/CAS contract against a deterministic local mock server. No actual
 * user's account, passwords, or live backend data are accessed.
 */
test("phone and desktop exchange notes, reject conflicting edits and preserve local data",async({browser})=>{
 test.setTimeout(120000);
 const origin=process.env.E2E_BASE_URL??"http://127.0.0.1:5173";
 const password="playwright-fixture-key-not-a-real-secret-456";
 const owner="00000000-0000-4000-8000-000000000195";
 type RecordShape={revision:number;payload:Record<string,unknown>;updated_at:string};
 let cloud:RecordShape|null=null;
 let rejected=0;
 const requestDiagnostics:string[]=[];
 const create=async() => {
  const context=await browser.newContext({acceptDownloads:true});
  await context.addInitScript((args)=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id",args.owner);
    localStorage.setItem("opk.device-token","test-only-device-access-token");
    localStorage.setItem("opk.device-token-expires",String(Date.now()+3600000));
  },{owner});
  await context.route(/\/api\/los-sync(?:\?.*)?$/,async route=>{
    const request=route.request();
    const header=request.headers();
    requestDiagnostics.push(request.method()+" bearer="+Boolean(header.authorization)+" keyMatches="+(header["x-los-sync-key"]===password));
    if(header.authorization!=="Bearer test-only-device-access-token" || header["x-los-sync-key"]!==password){
      rejected++;await route.fulfill({status:401,json:{error:"Väärä salasana"}});return;
    }
    if(request.method()==="GET"){
      await route.fulfill({status:200,json:{record:cloud}});return;
    }
    if(request.method()!=="PUT"){
      await route.fulfill({status:405,json:{error:"Method not allowed"}});return;
    }
    const body=request.postDataJSON() as {expected_revision:number;payload:Record<string,unknown>};
    const currentRevision=cloud?.revision??0;
    if(body.expected_revision!==currentRevision){
      rejected++;await route.fulfill({status:409,json:{error:"Muokkausristiriita",record:cloud}});return;
    }
    cloud={revision:currentRevision+1,payload:body.payload,updated_at:new Date().toISOString()};
    await route.fulfill({status:200,json:{record:cloud}});
  });
  const page=await context.newPage();
  await page.goto(origin+"/los#/1/01/chapter",{waitUntil:"domcontentloaded"});
  await expect(page.locator("#los-notes-01")).toBeVisible({timeout:30000});
  return {context,page};
 };
 const open=async(page:Page)=>{
  await page.getByLabel("Synkronoinnin salasana").fill(password);
  await page.locator(".los-cloud-panel button[type=submit]").click();
  await expect(page.locator(".los-cloud-message")).not.toContainText("Yhdistetään pilvitallennukseen",{timeout:15000});
  const unlockMessage=await page.locator(".los-cloud-message").textContent();
  if(!unlockMessage?.includes("Pilvitallennus avattu")){
    const authState=await page.evaluate(()=>({
      owner:Boolean(localStorage.getItem("opk.owner-id")),
      token:Boolean(localStorage.getItem("opk.device-token")),
      expiresAt:Number(localStorage.getItem("opk.device-token-expires")),
    }));
    console.log("LOS_SYNC_UNLOCK_DIAG "+JSON.stringify({unlockMessage,authState,requestDiagnostics}));
  }
  await expect(page.locator(".los-cloud-message")).toContainText("Pilvitallennus avattu");
  const leaked=await page.evaluate(secret=>Object.values(localStorage).some(v=>v.includes(secret)),password);
  expect(leaked).toBe(false);
 };
 const sync=async(page:Page)=>page.locator(".los-cloud-panel").getByRole("button",{name:"Synkronoi nyt"}).click();
 const a=await create();
 try{
  await a.page.locator("#los-notes-01").fill("Muistiinpanot puhelimella");
  await open(a.page);await sync(a.page);
  await expect(a.page.locator(".los-cloud-message")).toContainText("Kappale tallennettu pilveen");
  expect(cloud?.revision).toBe(1);
  const b=await create();
  try{
   await open(b.page);await sync(b.page);
   await expect(b.page.locator("#los-notes-01")).toHaveValue("Muistiinpanot puhelimella");
   await b.page.locator("#los-notes-01").fill("Tietokoneelta lisätty muutos");
   await sync(b.page);
   await expect(b.page.locator(".los-cloud-message")).toContainText("Laitteen uudet muutokset tallennettu");
   expect(cloud?.revision).toBe(2);
   await a.page.locator("#los-notes-01").fill("Puhelimen rinnakkainen paikallinen muutos");
   await sync(a.page);
   await expect(a.page.locator(".los-cloud-conflict")).toBeVisible();
   await expect(a.page.locator("#los-notes-01")).toHaveValue("Puhelimen rinnakkainen paikallinen muutos");
   expect(cloud?.revision).toBe(2);
   const downloaded=a.page.waitForEvent("download");
   await a.page.getByRole("button",{name:"Käytä pilviversiota"}).click();
   const backup=await downloaded;
   expect(backup.suggestedFilename()).toMatch(/LOS-1-kappale-01-varmuuskopio\.json/);
   await expect(a.page.locator("#los-notes-01")).toHaveValue("Tietokoneelta lisätty muutos");
   expect(rejected).toBe(0);
  }finally{await b.context.close();}
 }finally{await a.context.close();}
});
