/**
 * LOS! 1 digital textbook: selected EXISTING Pexels photos, NOT facsimile art.
 * Every entry has a human-verifiable original photo page and photographer.
 * All displayed images are optimized, self-hosted WebP files. Original photo
 * pages, photographers, and the source-to-asset SHA-256 audit manifest live in
 * public/los/chapters/sources-manifest.json.
 * Photos illustrate learning situations; models are NOT textbook characters
 * and must not be presented as endorsing LOS!.
 */
export type Los1ChapterPhoto={
  chapterId:string;
  photoId:number;
  src:string;
  sourceUrl:string;
  mobileSrc:string;
  photographer:string;
  alt:string;
  subject:string;
  licenseUrl:"https://www.pexels.com/license/";
  source:"Pexels";
};
export const LOS1_CHAPTER_PHOTOS:Readonly<Record<string,Los1ChapterPhoto>>={
  "01":{
    chapterId:"01",photoId:5537577,
    src:"/los/chapters/LOS1-C01-5537577-desktop.webp",
    sourceUrl:"https://www.pexels.com/photo/smiling-woman-waving-5537577/",
    mobileSrc:"/los/chapters/LOS1-C01-5537577-mobile.webp",
    photographer:"Zen Chung",source:"Pexels",
    alt:"Kaksi ihmistä tervehtii toisiaan ulkona; toinen vilkuttaa hymyillen.",
    subject:"Tervehdykset",licenseUrl:"https://www.pexels.com/license/",
  },
  "02":{
    chapterId:"02",photoId:35605778,
    src:"/los/chapters/LOS1-C02-35605778-desktop.webp",
    sourceUrl:"https://www.pexels.com/photo/casual-portrait-of-smiling-young-adult-35605778/",
    mobileSrc:"/los/chapters/LOS1-C02-35605778-mobile.webp",
    photographer:"finix photographer",source:"Pexels",
    alt:"Nuori aikuinen hymyilee muotokuvassa vaaleaa taustaa vasten.",
    subject:"Esittäytyminen ja oma nimi",licenseUrl:"https://www.pexels.com/license/",
  },
  "03":{
    chapterId:"03",photoId:11041062,
    src:"/los/chapters/LOS1-C03-11041062-desktop.webp",
    sourceUrl:"https://www.pexels.com/photo/view-of-a-tram-bicycles-and-pedestrians-on-a-street-in-berlin-in-sunlight-11041062/",
    mobileSrc:"/los/chapters/LOS1-C03-11041062-mobile.webp",
    photographer:"Christina Watkins",source:"Pexels",
    alt:"Berliinin katunäkymässä kulkee keltainen raitiovaunu ja pyöräilijöitä.",
    subject:"Saksankielinen kaupunki ja kotipaikka",licenseUrl:"https://www.pexels.com/license/",
  },
  "04":{
    chapterId:"04",photoId:8297612,
    src:"/los/chapters/LOS1-C04-8297612-desktop.webp",
    sourceUrl:"https://www.pexels.com/photo/businessman-and-businesswoman-shaking-hands-in-a-conference-room-8297612/",
    mobileSrc:"/los/chapters/LOS1-C04-8297612-mobile.webp",
    photographer:"Mikhail Nilov",source:"Pexels",
    alt:"Kaksi aikuista kättelee toisiaan virallisessa kohtaamistilanteessa.",
    subject:"Kohtelias puhuttelu",licenseUrl:"https://www.pexels.com/license/",
  },
  "05":{
    chapterId:"05",photoId:36729758,
    src:"/los/chapters/LOS1-C05-36729758-desktop.webp",
    sourceUrl:"https://www.pexels.com/photo/friends-enjoying-coffee-and-conversing-at-a-cafe-36729758/",
    mobileSrc:"/los/chapters/LOS1-C05-36729758-mobile.webp",
    photographer:"Vitaly Gariev",source:"Pexels",
    alt:"Neljä ystävää keskustelee ja hymyilee kahvilan pöydän ääressä.",
    subject:"Vointikuulumiset",licenseUrl:"https://www.pexels.com/license/",
  },
  "06":{
    chapterId:"06",photoId:29711471,
    src:"/los/chapters/LOS1-C06-29711471-desktop.webp",
    sourceUrl:"https://www.pexels.com/photo/two-friends-smiling-outdoors-in-autumn-29711471/",
    mobileSrc:"/los/chapters/LOS1-C06-29711471-mobile.webp",
    photographer:"Julio Lopez",source:"Pexels",
    alt:"Kaksi ystävää kävelee yhdessä ulkona syksyllä ja hymyilee.",
    subject:"Ikä ja tutustuminen, kuvituskuva",licenseUrl:"https://www.pexels.com/license/",
  },
  "07":{
    chapterId:"07",photoId:8716188,
    src:"/los/chapters/LOS1-C07-8716188-desktop.webp",
    sourceUrl:"https://www.pexels.com/photo/woman-writing-on-a-notebook-8716188/",
    mobileSrc:"/los/chapters/LOS1-C07-8716188-mobile.webp",
    photographer:"Katya Wolf",source:"Pexels",
    alt:"Käsi kirjoittaa kirjaimia kynällä muistikirjaan.",
    subject:"Kirjoitusasu ja tavaaminen",licenseUrl:"https://www.pexels.com/license/",
  },
  "08":{
    chapterId:"08",photoId:36729726,
    src:"/los/chapters/LOS1-C08-36729726-desktop.webp",
    sourceUrl:"https://www.pexels.com/photo/friendly-barista-at-cafe-counter-assisting-customers-36729726/",
    mobileSrc:"/los/chapters/LOS1-C08-36729726-mobile.webp",
    photographer:"Vitaly Gariev",source:"Pexels",
    alt:"Kahvilan työntekijä palvelee asiakasta tiskillä.",
    subject:"Kysytään uudelleen ja selvennetään",licenseUrl:"https://www.pexels.com/license/",
  },
  "09":{
    chapterId:"09",photoId:28353121,
    src:"/los/chapters/LOS1-C09-28353121-desktop.webp",
    sourceUrl:"https://www.pexels.com/photo/a-black-and-white-calendar-with-a-pen-on-top-28353121/",
    mobileSrc:"/los/chapters/LOS1-C09-28353121-mobile.webp",
    photographer:"Natalia S",source:"Pexels",
    alt:"Avoin kalenteri ja kynä pöydällä.",
    subject:"Viikonpäivät ja tapaamisen ajankohta",licenseUrl:"https://www.pexels.com/license/",
  },
  "10":{
    chapterId:"10",photoId:20243345,
    src:"/los/chapters/LOS1-C10-20243345-desktop.webp",
    sourceUrl:"https://www.pexels.com/photo/a-group-of-people-sitting-outside-and-smiling-20243345/",
    mobileSrc:"/los/chapters/LOS1-C10-20243345-mobile.webp",
    photographer:"Sachu Zayn",source:"Pexels",
    alt:"Ryhmä ihmisiä istuu ulkona keskustelemassa ja hymyilee.",
    subject:"Uusiin ihmisiin tutustuminen",licenseUrl:"https://www.pexels.com/license/",
  },
};
export function validateLos1ChapterPhotos():string[]{
 const errors:string[]=[];
 const ids=new Set<number>();
 for(let n=1;n<=10;n++){
  const id=String(n).padStart(2,"0");
  const photo=LOS1_CHAPTER_PHOTOS[id];
  if(!photo){errors.push("Puuttuva kuva: "+id);continue;}
  if(photo.chapterId!==id)errors.push("Väärä kappaletunnus: "+id);
  if(ids.has(photo.photoId))errors.push("Toistuva valokuva: "+photo.photoId);
  ids.add(photo.photoId);
  const base="/los/chapters/LOS1-C"+id+"-"+photo.photoId+"-";
  if(!photo.sourceUrl.startsWith("https://www.pexels.com/photo/")||
     photo.src!==base+"desktop.webp"||photo.mobileSrc!==base+"mobile.webp"||
     !photo.photographer||!photo.alt)
    errors.push("Kuvan lähteet tai tekstivastine puuttuvat: "+id);
 }
 return errors;
}
