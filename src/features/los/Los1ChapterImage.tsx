import {useState} from "react";
import {LOS1_CHAPTER_PHOTOS} from "./los1ChapterPhotos";
import "./los1-chapter-photos.css";

/**
 * Visuals belong to responsive digital lessons, not a simulated paper page.
 * If a remote stock image fails, keep a readable typographic fallback.
 */
export function Los1ChapterImage({chapterId}:{chapterId:string}){
  const [failed,setFailed]=useState(false);
  const photo=LOS1_CHAPTER_PHOTOS[chapterId];
  if(!photo)return null;
  return <figure className="los1-digital-photo">
    {!failed?<img key={photo.photoId} src={photo.src} alt={photo.alt}
      loading="lazy" decoding="async" onError={()=>setFailed(true)}/>:
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
