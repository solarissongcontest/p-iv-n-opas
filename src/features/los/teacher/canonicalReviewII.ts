import type {TeacherLesson,TeacherScene} from "./engine.ts";
import {LOS1_TEACHER_CANONICAL_VERSION} from "./canonicalTeacherLessons.ts";

/** Review II's current A/B/C names must not refer to retired sample
 * characters. Preserve the original Teacher 2.0 script and question logic;
 * the new content version archives earlier attempts before re-use.
 */
export function canonicalizeReviewII(original:TeacherLesson):TeacherLesson {
 if(original.id!=="L057")return original;
 const scenes:TeacherScene[]=original.scenes.map(scene=>{
   if(scene.id==="skill-map")return {...scene,
     board:scene.board?.map(item=>
       item.label.startsWith("C02")?{...item,german:"Wie heißt du? / Ich heiße Aino."}:
       item.label.startsWith("C10")?{...item,german:"Das ist Mila. Sie heißt Mila."}:item)};
   if(scene.id==="transfer"&&scene.question)return {...scene,
     question:{...scene.question,
       prompt:"Kirjoita saksaksi samaan vastaukseen: Hei! Nimeni on Aino. Olen kotoisin Suomesta. Tervehdyksen voi erottaa huutomerkillä tai pilkulla.",
       accepted:["Hallo! Ich heiße Aino. Ich komme aus Finnland.","Hallo, ich heiße Aino. Ich komme aus Finnland."],
       reteach:"Kolme tuttua rakennetta ovat Hallo! / Ich heiße Aino. / Ich komme aus Finnland."}};
   if(scene.id==="book")return {...scene,
     paragraphs:[...scene.paragraphs,
       "Vertaa nyt myös nykyisten C08:n ja C10:n Text C -tukitekstien ilmauksia ja kertaa uudet A- ja B-dialogit."],
     bookLinks:[...(scene.bookLinks??[]),
       {chapterId:"08",section:"text-c",label:"C08 · uusi Text C",instruction:"Kertaa luokkafraasit uuden tukitekstin avulla."},
       {chapterId:"10",section:"text-c",label:"C10 · uusi Text C",instruction:"Kertaa esittelyä ja keskustelun muodostamista uuden tukitekstin avulla."}]
    };
   return scene;
 });
 return {...original,version:LOS1_TEACHER_CANONICAL_VERSION,scenes};
}
