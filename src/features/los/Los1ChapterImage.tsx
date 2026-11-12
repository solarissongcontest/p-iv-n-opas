import {useState} from "react";
import {LOS1_CHAPTER_PHOTOS} from "./los1ChapterPhotos";
import "./los1-chapter-photos.css";

/**
 * Visuals belong to responsive digital lessons, not a simulated paper page.
 * Desktop/mobile images are local, optimized WebP assets. If an image
 * cannot load, keep a readable typographic fallback.
 */
export function Los1ChapterImage({chapterId}:{chapterId:string}){
  const [failed,setFailed]=useState(false);
  const photo=LOS1_CHAPTER_PHOTOS[chapterId];
  if(!photo)return null;
  return <figure className="los1-digital-photo">
    {!failed?<picture key={photo.photoId}>
      <source media="(max-width: 700px)" type="image/webp" srcSet={photo.mobileSrc}/>
      <img src={photo.src} alt={photo.alt}
        width={1440} height={630}
        loading="lazy" decoding="async" onError={()=>setFailed(true)}/>
    </picture>:
      <div className="los1-digital-photo-fallback" role="img"
        aria-label={photo.alt}>
        <span>LOS! 1</span><strong>{photo.subject}</strong>
      </div>}
    <figcaption>
      <span>Kuvituskuva · {photo.subject}</span>
      <span>Kuva: {photo.photographer} / <a href={photo.sourceUrl} target="_blank"
        rel="noopener noreferrer">Pexels</a></span>
    </figcaption>
  </figure>;
}
