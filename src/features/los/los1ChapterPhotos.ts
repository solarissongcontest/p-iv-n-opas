/**
 * LOS! 1 digital textbook: selected EXISTING Pexels photos, NOT facsimile art.
 * Every entry has a human-verifiable original photo page and photographer.
 * These remote preview URLs are deliberately not treated as locally archived
 * approved assets. Before a stable production release, download, optimize and
 * self-host source photographs under the verified Pexels license.
 * Photos illustrate learning situations; models are NOT textbook characters
 * and must not be presented as endorsing LOS!.
 */
export type Los1ChapterPhoto={
  chapterId:string;
  photoId:number;
  src:string;
  sourceUrl:string;
  photographer:string;
  alt:string;
  subject:string;
  licenseUrl:"https://www.pexels.com/license/";
  source:"Pexels";
};
export const LOS1_CHAPTER_PHOTOS:Readonly<Record<string,Los1ChapterPhoto>>={
  "01":{
    chapterId:"01",photoId:5537577,
    src:"https://images.pexels.com/photos/5537577/pexels-photo-5537577.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl:"https://www.pexels.com/photo/smiling-woman-waving-5537577/",
    photographer:"Zen Chung",source:"Pexels",
    alt:"Kaksi ihmistä tervehtii toisiaan ulkona; toinen vilkuttaa hymyillen.",
    subject:"Tervehdykset",licenseUrl:"https://www.pexels.com/license/",
  },
  "02":{
    chapterId:"02",photoId:35605778,
    src:"https://images.pexels.com/photos/35605778/pexels-photo-35605778.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl:"https://www.pexels.com/photo/casual-portrait-of-smiling-young-adult-35605778/",
    photographer:"finix photographer",source:"Pexels",
    alt:"Nuori aikuinen hymyilee muotokuvassa vaaleaa taustaa vasten.",
    subject:"Esittäytyminen ja oma nimi",licenseUrl:"https://www.pexels.com/license/",
  },
  "03":{
    chapterId:"03",photoId:11041062,
    src:"https://images.pexels.com/photos/11041062/pexels-photo-11041062.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl:"https://www.pexels.com/photo/view-of-a-tram-bicycles-and-pedestrians-on-a-street-in-berlin-in-sunlight-11041062/",
    photographer:"Christina Watkins",source:"Pexels",
    alt:"Berliinin katunäkymässä kulkee keltainen raitiovaunu ja pyöräilijöitä.",
    subject:"Saksankielinen kaupunki ja kotipaikka",licenseUrl:"https://www.pexels.com/license/",
  },
  "04":{
    chapterId:"04",photoId:8297612,
    src:"https://images.pexels.com/photos/8297612/pexels-photo-8297612.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl:"https://www.pexels.com/photo/businessman-and-businesswoman-shaking-hands-in-a-conference-room-8297612/",
    photographer:"Mikhail Nilov",source:"Pexels",
    alt:"Kaksi aikuista kättelee toisiaan virallisessa kohtaamistilanteessa.",
    subject:"Kohtelias puhuttelu",licenseUrl:"https://www.pexels.com/license/",
  },
  "05":{
    chapterId:"05",photoId:36729758,
    src:"https://images.pexels.com/photos/36729758/pexels-photo-36729758.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl:"https://www.pexels.com/photo/friends-enjoying-coffee-and-conversing-at-a-cafe-36729758/",
    photographer:"Vitaly Gariev",source:"Pexels",
    alt:"Neljä ystävää keskustelee ja hymyilee kahvilan pöydän ääressä.",
    subject:"Vointikuulumiset",licenseUrl:"https://www.pexels.com/license/",
  },
  "06":{
    chapterId:"06",photoId:29711471,
    src:"https://images.pexels.com/photos/29711471/pexels-photo-29711471.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl:"https://www.pexels.com/photo/two-friends-smiling-outdoors-in-autumn-29711471/",
    photographer:"Julio Lopez",source:"Pexels",
    alt:"Kaksi ystävää kävelee yhdessä ulkona syksyllä ja hymyilee.",
    subject:"Ikä ja tutustuminen, kuvituskuva",licenseUrl:"https://www.pexels.com/license/",
  },
  "07":{
    chapterId:"07",photoId:8716188,
    src:"https://images.pexels.com/photos/8716188/pexels-photo-8716188.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl:"https://www.pexels.com/photo/woman-writing-on-a-notebook-8716188/",
    photographer:"Katya Wolf",source:"Pexels",
    alt:"Käsi kirjoittaa kirjaimia kynällä muistikirjaan.",
    subject:"Kirjoitusasu ja tavaaminen",licenseUrl:"https://www.pexels.com/license/",
  },
  "08":{
    chapterId:"08",photoId:36729726,
    src:"https://images.pexels.com/photos/36729726/pexels-photo-36729726.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl:"https://www.pexels.com/photo/friendly-barista-at-cafe-counter-assisting-customers-36729726/",
    photographer:"Vitaly Gariev",source:"Pexels",
    alt:"Kahvilan työntekijä palvelee asiakasta tiskillä.",
    subject:"Kysytään uudelleen ja selvennetään",licenseUrl:"https://www.pexels.com/license/",
  },
  "09":{
    chapterId:"09",photoId:28353121,
    src:"https://images.pexels.com/photos/28353121/pexels-photo-28353121.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl:"https://www.pexels.com/photo/a-black-and-white-calendar-with-a-pen-on-top-28353121/",
    photographer:"Natalia S",source:"Pexels",
    alt:"Avoin kalenteri ja kynä pöydällä.",
    subject:"Viikonpäivät ja tapaamisen ajankohta",licenseUrl:"https://www.pexels.com/license/",
  },
  "10":{
    chapterId:"10",photoId:20243345,
    src:"https://images.pexels.com/photos/20243345/pexels-photo-20243345.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl:"https://www.pexels.com/photo/a-group-of-people-sitting-outside-and-smiling-20243345/",
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
  if(!photo.sourceUrl.startsWith("https://www.pexels.com/photo/")||
     !photo.src.startsWith("https://images.pexels.com/photos/"+photo.photoId+"/")||
     !photo.photographer||!photo.alt)
    errors.push("Kuvan lähteet tai tekstivastine puuttuvat: "+id);
 }
 return errors;
}
