import {test} from "node:test";
import assert from "node:assert/strict";
import {parseFreeDictTEI,getLicence} from "../scripts/import-los-freedict.mjs";
import {searchLosFreeDict,isLosFreeDictAsset,losFreeDictLemmaFor} from "../src/features/los/los1FreeDict.ts";
const mock='<TEI><teiHeader><fileDesc><publicationStmt><availability><licence target="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</licence></availability></publicationStmt></fileDesc></teiHeader><text><body>'+
 '<entry xml:id="hallo"><form><orth>Hallo</orth></form><sense><cit type="trans"><quote>hei</quote></cit></sense></entry>'+
 '<entry xml:id="morgen"><form><orth>Morgen</orth></form><sense><cit type="trans"><quote>aamu</quote></cit><cit type="trans"><quote>huominen</quote></cit></sense></entry>'+
 '<entry xml:id="frau"><form><orth>Frau</orth></form><sense><cit type="trans"><quote>nainen &amp; rouva</quote></cit></sense></entry>'+
 '</body></text></TEI>';
test("FreeDict TEI importer preserves all senses, XML entities and real licence metadata",()=>{
 assert.deepEqual(parseFreeDictTEI(mock,"deu-fin"),[
  ["Frau","nainen & rouva"],["Hallo","hei"],["Morgen","aamu; huominen"]
 ]);
 assert.deepEqual(getLicence(mock),[{url:"https://creativecommons.org/licenses/by-sa/3.0/",text:"CC BY-SA 3.0"}]);
});
test("bad/unverified generated dictionary data never passes client validation",()=>{
 const meta={source:"FreeDict",sourceUrl:"https://freedict.org/downloads/",version:"2025.11.23",
  pair:"deu-fin" as const,license:[{url:"https://creativecommons.org/licenses/by-sa/3.0/",text:"CC BY-SA 3.0"}],
  attribution:"FreeDict contributors",entryCount:9000,generatedAt:"2026-11-18"};
 const items=Array.from({length:9000},(_,i):readonly [string,string]=>[i===0?"Hallo":"Wort"+i,i===0?"hei":"suomi"+i]);
 const dataset={meta,entries:items};
 assert.equal(isLosFreeDictAsset(dataset,"deu-fin"),true);
 assert.equal(isLosFreeDictAsset({...dataset,meta:{...meta,license:[]}},"deu-fin"),false);
 assert.equal(isLosFreeDictAsset({...dataset,entries:items.slice(0,2)},"deu-fin"),false);
 assert.deepEqual(searchLosFreeDict(dataset,"hal"),[{word:"Hallo",meaning:"hei"}]);
 assert.equal(searchLosFreeDict(dataset,"h").length,0);
});

test("inflected forms use only documented lemma bridges and source meanings",()=>{
 const entries:readonly (readonly [string,string])[]=[
  ["Hallo","hei"],["Haus","talo"],["heißen","olla nimeltään"],
  ["kommen","tulla"],["Mädchen","tyttö"],["Straße","katu"],["Bank","pankki; penkki"]
 ];
 const data={meta:{
    source:"FreeDict",sourceUrl:"https://download.freedict.org/",version:"2025.11.23",
    pair:"deu-fin" as const,license:[{url:"https://creativecommons.org/licenses/by-sa/3.0/",text:"CC BY-SA"}],
    attribution:"FreeDict",entryCount:9000,generatedAt:"2026-11-18"},
  entries};
 assert.equal(losFreeDictLemmaFor("Häuser","deu-fin"),"Haus");
 assert.equal(losFreeDictLemmaFor("kommt","deu-fin"),"kommen");
 assert.equal(losFreeDictLemmaFor("heiße","deu-fin"),"heißen");
 assert.equal(losFreeDictLemmaFor("Mädchen","deu-fin"),null);
 assert.equal(losFreeDictLemmaFor("Häuser","fin-deu"),null);
 assert.equal(losFreeDictLemmaFor("Strasse","deu-fin"),"Straße");
 assert.deepEqual(searchLosFreeDict(data,"Häuser"),[{word:"Haus",meaning:"talo"}]);
 assert.deepEqual(searchLosFreeDict(data,"kommt"),[{word:"kommen",meaning:"tulla"}]);
 assert.deepEqual(searchLosFreeDict(data,"heiße"),[{word:"heißen",meaning:"olla nimeltään"}]);
 assert.deepEqual(searchLosFreeDict(data,"Strasse"),[{word:"Straße",meaning:"katu"}]);
 assert.deepEqual(searchLosFreeDict(data,"Bank"),[{word:"Bank",meaning:"pankki; penkki"}]);
 assert.deepEqual(searchLosFreeDict(data,"xyz"),[]);
});
