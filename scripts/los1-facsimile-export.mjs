/**
 * Export DRAFT C01, C02, C03 or C04 B5 PDF from the exact LOS! React print leaves.
 *
 * Usage (from the repo root with the Vite dev server already running):
 *   bun run e2e:install
 *   bunx playwright install chromium
 *   node scripts/los1-facsimile-export.mjs
 *
 * Never deploy/upload this PDF as a released edition: content, image rights,
 * editorial review and print preflight have separate approval gates.
 */
import {mkdir} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const repoRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const chapter=process.env["LOS1_FACSIMILE_CHAPTER"]??"01";
if(!["01","02","03","04"].includes(chapter))throw Error("Only C01–C04 draft PDF export is allowed.");
const expectedLeaves=chapter==="01"?15:chapter==="04"?16:14;
const expectedFirst=chapter==="01"?"cover":"c"+chapter+"-open-left";
const outputPath=path.resolve(process.env["LOS1_FACSIMILE_PDF_OUTPUT"]||
  path.join(repoRoot,`.artifacts/los1/LOS1_C${chapter}_B5_TAITTOLUONNOS.pdf`));
const baseUrl=process.env["LOS1_FACSIMILE_BASE_URL"]||"http://127.0.0.1:5173";
const requestedUrl=new URL(chapter==="01"?"/los#/1/facsimile":"/los#/1/facsimile-c"+chapter,baseUrl).href;

async function run(){
  const {chromium}=await import("@playwright/test");
  const browser=await chromium.launch({headless:true});
  try{
    const context=await browser.newContext({
      viewport:{width:1400,height:920},
      reducedMotion:"reduce",
      locale:"fi-FI",
    });
    const page=await context.newPage();
    const errors=[];
    page.on("pageerror",error=>errors.push(error.message));
    // CI dummy owner ID only. No real device token, saved work or private API access.
    await page.addInitScript(()=>{
      localStorage.setItem("opk.device-authorized","Arthur");
      localStorage.setItem("opk.owner-id","los-c01-export-ci-local-only");
    });
    await page.goto(requestedUrl,{waitUntil:"domcontentloaded",timeout:60_000});
    await page.locator(".los-facs-reader").waitFor({state:"visible",timeout:60_000});
    await page.waitForFunction(expected=>
      document.querySelectorAll(".los-facs-print-only .los-facs-leaf").length===expected,
      expectedLeaves,{timeout:60_000});
    if(chapter==="01")await page.locator(".los-facs-print-only .los-facs-cover-image").evaluate(async img=>{
      if(!img.complete)await new Promise((resolve,reject)=>{
        img.addEventListener("load",resolve,{once:true});
        img.addEventListener("error",reject,{once:true});
      });
      if(img.naturalWidth<=0)throw Error("Approved LOS! 1 cover is missing.");
    });
    await page.evaluate(()=>document.fonts.ready);
    const leafInfo=await page.locator(".los-facs-print-only .los-facs-leaf").evaluateAll(elements=>
      elements.map(el=>({id:el.getAttribute("data-facsimile-page"),side:el.getAttribute("data-physical-side")})));
    if(leafInfo.length!==expectedLeaves||leafInfo[0]?.id!==expectedFirst||
       new Set(leafInfo.map(x=>x.id)).size!==expectedLeaves){
      throw new Error("The print-only page map is incomplete or duplicated.");
    }
    // The app shell can occupy extra invisible printed pages even with
    // visibility:hidden. Clone ONLY the already-rendered print leaves into
    // a clean document, keeping the same loaded CSS and original source data.
    await page.evaluate(chapter=>{
      const original=document.querySelector(".los-facs-print-only");
      if(!original)throw new Error("Missing C"+chapter+" print sheet container.");
      const standalone=document.createElement("main");
      standalone.className=chapter==="01"?"los-facs-reader":"los-facs-reader los-facs-c"+chapter+"-reader";
      standalone.appendChild(original.cloneNode(true));
      document.body.replaceChildren(standalone);
      document.body.removeAttribute("style");
      document.body.className="los-facs-pdf-export";
      document.documentElement.classList.remove("dark");
      document.title="LOS! 1 | C"+chapter+" B5 - Taittoluonnos";
    },chapter);
    await page.emulateMedia({media:"print"});
    const printChecks=await page.evaluate(()=>{
      const only=document.querySelector(".los-facs-print-only");
      const leaf=only?.querySelector(".los-facs-leaf");
      if(!only||!leaf)return {display:"none",width:0,height:0};
      const rect=leaf.getBoundingClientRect();
      return {display:getComputedStyle(only).display,width:rect.width,height:rect.height};
    });
    if(printChecks.display==="none"||printChecks.width<400||printChecks.height<650){
      throw new Error("B5 print stylesheet failed to show full sized pages: "+
        JSON.stringify(printChecks));
    }
    if(errors.length){
      throw new Error("The LOS! reader raised errors: "+errors.join("; "));
    }
    await mkdir(path.dirname(outputPath),{recursive:true});
    await page.pdf({
      path:outputPath,
      width:"176mm",height:"250mm",
      margin:{top:"0",right:"0",bottom:"0",left:"0"},
      preferCSSPageSize:true,
      printBackground:true,
      displayHeaderFooter:false,
      tagged:true,
    });
    process.stdout.write(JSON.stringify({
      type:"draft-PDF-only",
      output:outputPath,
      chapter,
      expectedLeaves,
      printChecks,
      pageMap:leafInfo,
      warning:"Not a released or print-ready edition. No approved PDF URL.",
    },null,2)+"\n");
  }finally{await browser.close();}
}
run().catch(error=>{console.error(error);process.exitCode=1;});
