import {useState} from "react";
import {LOS1_CULTURE_PHOTOS,type Los1CulturePhoto} from "./los1CulturePhotos";
import "./los1-culture-gallery.css";

function CulturePhoto({photo}:{photo:Los1CulturePhoto}){
 const [failed,setFailed]=useState(false);
 return <figure className="los1-culture-gallery-card">
   {!failed?<picture>
     <source media="(max-width:700px)" srcSet={photo.mobileSrc} type="image/webp"/>
     <img src={photo.desktopSrc} alt={photo.alt} width={1024} height={640}
       loading="lazy" decoding="async" onError={()=>setFailed(true)}/>
   </picture>:
   <div className="los1-culture-gallery-fallback" role="img" aria-label={photo.alt}>
     <strong>{photo.heading}</strong><span>Kuvaa ei voitu ladata.</span>
   </div>}
   <figcaption>
     <h3>{photo.heading}</h3>
     <p>{photo.caption}</p>
     <small>Kuva: {photo.photographer} /
       {" "}<a href={photo.sourceUrl} rel="noopener noreferrer"
         target="_blank">Pexels</a></small>
   </figcaption>
 </figure>;
}
/** Contextual visual evidence, never a claim that the people or places
 * in an illustrative image are the speakers of textbook source dialogues. */
export function Los1CultureGallery({chapterId}:{chapterId:string}){
 const photos=LOS1_CULTURE_PHOTOS[chapterId];
 if(!photos?.length)return null;
 return <section className="los1-culture-gallery"
   aria-label={"Kappaleen "+chapterId+" kulttuurikuvat"}>
   <div className="los1-culture-gallery-heading">
     <p className="los-overline">LAND UND LEUTE · KUVAT</p>
     <h2>Kulttuuri kuvissa</h2>
   </div>
   <div className="los1-culture-gallery-grid">
     {photos.map(photo=><CulturePhoto key={photo.key} photo={photo}/>)}
   </div>
 </section>;
}
