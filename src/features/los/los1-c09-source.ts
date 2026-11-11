/** Real source-linked checks for C09's AVAILABLE seven-weekday list only.
 * Do not confuse this with the still-pending M-WB-03 dialogue or M-DIB-05 audio.
 */
import type {Exercise} from "./model";
import {LOS1_C09_WEEKDAYS} from "./los1-c09-content.ts";
export const LOS1_C09_WB04_TEXT=LOS1_C09_WEEKDAYS.join(", ");
const highlight="Mittwoch";
const start=LOS1_C09_WB04_TEXT.indexOf(highlight);
if(start<0)throw Error("C09 weekday list range mismatch");
const base={version:"0.1.0",difficulty:"guided" as const,objectives:["L1-TIME-01","L1-READ-01"]};
export const LOS1_C09_SOURCE_EXERCISES:Exercise[]=[
 {...base,id:"los1-c09-source-order",type:"single-choice",
  promptFi:"Mikä viikonpäivä on kolmantena Wikibooksin alkuperäisessä seitsemän päivän listassa?",
  options:[{id:"mon",label:"Montag"},{id:"mid",label:"Mittwoch"},{id:"fri",label:"Freitag"}],
  correctOptionId:"mid",explanationFi:"Luettelon järjestys alkaa Montag, Dienstag, Mittwoch."},
 {...base,id:"los1-c09-source-last",type:"single-choice",
  promptFi:"Mihin viikonpäivään Wikibooksin aito lähdeluettelo päättyy?",
  options:[{id:"s",label:"Sonntag"},{id:"t",label:"Dienstag"},{id:"sa",label:"Samstag"}],
  correctOptionId:"s",explanationFi:"Luettelon seitsemäs sana on Sonntag."},
 {...base,id:"los1-c09-source-weekend",type:"multiple-choice",
  promptFi:"Valitse viikonlopun kaksi päivää autenttisesta lähdeluettelosta.",
  options:[
   {id:"sa",label:"Samstag"},{id:"mo",label:"Montag"},
   {id:"so",label:"Sonntag"},{id:"di",label:"Dienstag"},
  ],
  correctOptionIds:["sa","so"],
  explanationFi:"Lähteen luettelossa Samstag ja Sonntag tarkoittavat lauantaita ja sunnuntaita."},
 {...base,id:"los1-c09-source-highlight-wed",type:"highlight",
  blockId:"los1-c09-wb-04-days",
  promptFi:"Korosta alkuperäisestä seitsemän viikonpäivän tekstistä Mittwoch.",
  text:LOS1_C09_WB04_TEXT,acceptedRanges:[{start,end:start+highlight.length}],
  explanationFi:"Mittwoch on keskiviikko ja alkuperäisen luettelon kolmas sana."},
];
