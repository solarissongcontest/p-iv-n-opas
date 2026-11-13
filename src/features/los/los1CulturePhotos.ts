/**
 * LOS! 1's distinct culture-page photography.
 * Original licensed-source pictures, not facsimile art.
 * A documentary location claim is made only if supported by
 * the original Pexels photo's stated location.
 */
export type Los1CulturePhoto={
  key:string;
  chapterId:"01"|"03"|"04"|"07"|"08"|"09";
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
  "04":[{
    key:"berlin-reception",chapterId:"04",photoId:6925914,
    heading:"Ein Gespräch am Empfang",
    caption:"Asiakaspalvelutilanne berliiniläisessä liikkeessä. Saksaksi puhuttelun valinta riippuu tilanteesta ja osapuolten toiveista, eikä valokuvasta voi päätellä käyttävätkö ihmiset du- vai Sie-muotoa.",
    alt:"Asiakas keskustelee vastaanottotiskillä asiakaspalvelijan kanssa liikkeessä.",
    photographer:"Tom Tillhub",
    sourceUrl:"https://www.pexels.com/photo/woman-talking-to-a-receptionist-in-a-beauty-salon-6925914/",
    desktopSrc:"/los/culture/LOS1-C04-CULTURE-6925914-desktop.webp",
    mobileSrc:"/los/culture/LOS1-C04-CULTURE-6925914-mobile.webp",
    locationVerified:true,licenseUrl:"https://www.pexels.com/license/",
  }],
  "07":[{
    key:"duesseldorf-street-sign",chapterId:"07",photoId:30125064,
    heading:"Straßenschilder in Düsseldorf",
    caption:"Kyltissä lukee Düsseldorfer Straße. Huomaa sanan Straße ß-kirjain. Yksi esimerkki ei kuitenkaan yksin selitä kaikkia saksan oikeinkirjoitussääntöjä.",
    alt:"Düsseldorfin kadunnimikyltissä lukee Düsseldorfer Straße, jossa on ß-kirjain.",
    photographer:"Markus Winkler",
    sourceUrl:"https://www.pexels.com/photo/street-sign-in-dusseldorf-cityscape-30125064/",
    desktopSrc:"/los/culture/LOS1-C07-CULTURE-30125064-desktop.webp",
    mobileSrc:"/los/culture/LOS1-C07-CULTURE-30125064-mobile.webp",
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
  "09":[{
    key:"weekly-appointments",chapterId:"09",photoId:6170644,
    heading:"Die Woche planen",
    caption:"Kalenteriin merkitään tapaamisaikoja. Kuva on yleinen ajanvarauksen havainnekuva, eikä lähde vahvista saksankielistä kalenteria. Saksankieliset viikonpäivät ja am/um-rakenteet opetellaan LOS!:n omasta tekstistä.",
    alt:"Henkilö kirjoittaa pöydällä olevaan kalenteriin ja suunnittelee aikataulua.",
    photographer:"RDNE Stock project",
    sourceUrl:"https://www.pexels.com/photo/a-person-writing-on-a-desk-calendar-6170644/",
    desktopSrc:"/los/culture/LOS1-C09-CULTURE-6170644-desktop.webp",
    mobileSrc:"/los/culture/LOS1-C09-CULTURE-6170644-mobile.webp",
    locationVerified:false,licenseUrl:"https://www.pexels.com/license/",
  }],
};
export function validateLos1CulturePhotos():string[]{
  const errors:string[]=[];
  const used=new Set<number>();
  for(const [chapterId,photos] of Object.entries(LOS1_CULTURE_PHOTOS)){
    if(!["01","03","04","07","08","09"].includes(chapterId))errors.push("Ylimääräinen kulttuurikuvaosio: "+chapterId);
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
  if(used.size!==7)errors.push("Odotettu seitsemän ainutlaatuista kulttuurivalokuvaa.");
  return errors;
}
