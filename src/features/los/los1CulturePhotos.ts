/**
 * LOS! 1's distinct culture-page photography.
 * Original licensed-source pictures, not facsimile art.
 * A documentary location claim is made only if supported by
 * the original Pexels photo's stated location.
 */
export type Los1CulturePhoto={
  key:string;
  chapterId:"01"|"03"|"08";
  photoId:number;
  heading:string;
  caption:string;
  alt:string;
  photographer:string;
  sourceUrl:string;
  desktopSrc:string;
  mobileSrc:string;
  locationVerified:boolean;
  licenseUrl:"https://www.pexels.com/license/";
};
export const LOS1_CULTURE_PHOTOS:Readonly<Record<string,readonly Los1CulturePhoto[]>>={
  "01":[{
    key:"hamburg-harbour",chapterId:"01",photoId:29250831,
    heading:"Hamburg, Norddeutschland",
    caption:"Hampurin satamaa Pohjois-Saksassa. Moin on yksi pohjoisessa kuultavista tervehdyksistä. Kuva ei kerro, mitä yksittäiset ihmiset sanovat.",
    alt:"Hampurin sataman vesialuetta, veneitä ja kaupunkirakennuksia.",
    photographer:"Naimish Verma",
    sourceUrl:"https://www.pexels.com/photo/scenic-view-of-hamburg-harbor-with-boats-and-buildings-29250831/",
    desktopSrc:"/los/culture/LOS1-C01-CULTURE-29250831-desktop.webp",
    mobileSrc:"/los/culture/LOS1-C01-CULTURE-29250831-mobile.webp",
    locationVerified:true,licenseUrl:"https://www.pexels.com/license/",
  }],
  "03":[{
    key:"vienna-street",chapterId:"03",photoId:6063650,
    heading:"Wien, Österreich",
    caption:"Katunäkymä Wienissä, Itävallassa. Wien on esimerkki saksankielisestä kaupungista, joka ei sijaitse Saksassa.",
    alt:"Ihmisiä kävelee Wienin historiallisen keskustan kadulla Itävallassa.",
    photographer:"Anton Uniqueton",
    sourceUrl:"https://www.pexels.com/photo/people-walking-on-the-street-among-buildings-6063650/",
    desktopSrc:"/los/culture/LOS1-C03-CULTURE-6063650-desktop.webp",
    mobileSrc:"/los/culture/LOS1-C03-CULTURE-6063650-mobile.webp",
    locationVerified:true,licenseUrl:"https://www.pexels.com/license/",
  },{
    key:"switzerland-lake",chapterId:"03",photoId:32379758,
    heading:"Thun, die Schweiz",
    caption:"Järvenrantamaisema Thunista, Sveitsistä. Sveitsissä puhutaan saksan lisäksi muitakin kansalliskieliä. Valokuva ei ole maan kielialuekartta.",
    alt:"Sveitsiläisen Thunin järven rannalla näkyy kylärakennuksia, vehreitä rinteitä ja vuoria.",
    photographer:"Jean-Paul Wettstein",
    sourceUrl:"https://www.pexels.com/photo/scenic-swiss-landscape-with-lakeside-village-and-mountains-32379758/",
    desktopSrc:"/los/culture/LOS1-C03-CULTURE-32379758-desktop.webp",
    mobileSrc:"/los/culture/LOS1-C03-CULTURE-32379758-mobile.webp",
    locationVerified:true,licenseUrl:"https://www.pexels.com/license/",
  }],
  "08":[{
    key:"classroom",chapterId:"08",photoId:5427660,
    heading:"Im Unterricht",
    caption:"Havainnekuva oppimistilanteesta. Tätä kuvaa ei ole lähteessä paikannettu Saksaan, eikä sitä esitetä saksalaisena koululuokkana.",
    alt:"Opiskelijoita istuu luokassa pöytien ääressä, kirjoja ja muistikirjoja on pöydillä.",
    photographer:"Tima Miroshnichenko",
    sourceUrl:"https://www.pexels.com/photo/students-sitting-inside-a-classroom-5427660/",
    desktopSrc:"/los/culture/LOS1-C08-CULTURE-5427660-desktop.webp",
    mobileSrc:"/los/culture/LOS1-C08-CULTURE-5427660-mobile.webp",
    locationVerified:false,licenseUrl:"https://www.pexels.com/license/",
  }],
};
export function validateLos1CulturePhotos():string[]{
  const errors:string[]=[];
  const used=new Set<number>();
  for(const [chapterId,photos] of Object.entries(LOS1_CULTURE_PHOTOS)){
    if(!["01","03","08"].includes(chapterId))errors.push("Ylimääräinen kulttuurikuvaosio: "+chapterId);
    if(!photos.length)errors.push("Tyhjä kulttuurikuvaosio: "+chapterId);
    for(const p of photos){
      if(p.chapterId!==chapterId)errors.push("Väärä kappale: "+p.key);
      if(used.has(p.photoId))errors.push("Sama kuva kahdesti: "+p.photoId);
      used.add(p.photoId);
      if(!p.heading||!p.caption||!p.alt||!p.photographer)
        errors.push("Kuvan nimi, selite, tekstivastine tai kuvaaja puuttuu: "+p.key);
      if(!p.sourceUrl.endsWith("-"+p.photoId+"/")||
        !p.sourceUrl.startsWith("https://www.pexels.com/photo/"))
        errors.push("Alkuperäinen Pexels-lähde puuttuu: "+p.key);
      const assetBase="/los/culture/LOS1-C"+chapterId+"-CULTURE-"+p.photoId+"-";
      if(p.desktopSrc!==assetBase+"desktop.webp"||p.mobileSrc!==assetBase+"mobile.webp")
        errors.push("Omat paikalliset tiedostot puuttuvat: "+p.key);
    }
  }
  if(used.size!==4)errors.push("Odotettu neljä ainutlaatuista kulttuurivalokuvaa.");
  return errors;
}
