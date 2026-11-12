import { LOS_BOOKS } from "./catalog.ts";
import { getLosPronunciation, type LosPronunciation } from "./pronunciation.ts";

export type LosVocabularyQA = {
  bookId: number;
  chapterId: string;
  total: number;
  ipaSourced: number;
  ipaHumanReviewed: number;
  audioApproved: number;
  ready: number;
  issues: readonly {
    word: string;
    missing: readonly ("IPA" | "IPA-expert-review" | "audio" | "source")[];
  }[];
};

/** Metadata checks cannot authenticate a reviewer themselves. Release requires
 * independent verification of these identities and actual source recordings.
 * In particular, a browser TTS capability is never a published audio asset.
 */
const approvedTimestamp=(value?:string):boolean=>
  Boolean(value && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)
    && Number.isFinite(Date.parse(value)));
const namedReviewer=(value?:string):boolean=>Boolean(value && value.trim().length>=3);
const httpsSource=(url?:string):boolean=>Boolean(url && /^https:\/\/[^/\s]+(?:\/|$)/i.test(url));

export function inspectLosPronunciationEvidence(entry:LosPronunciation|null){
  const sourced=Boolean(entry?.ipa && entry.ipaSourceId?.trim() && httpsSource(entry.ipaSourceUrl));
  const reviewed=Boolean(sourced && entry?.ipaReviewStatus==="reviewed"
    && namedReviewer(entry.ipaReviewedBy) && approvedTimestamp(entry.ipaReviewedAt));
  const accepted=Boolean(entry?.audioAssets.some(asset=>
    asset.usageStatus==="ready" &&
    namedReviewer(asset.reviewedBy) && approvedTimestamp(asset.reviewedAt) &&
    Boolean(asset.sourceId.trim()) && Boolean(asset.licenseId?.trim()) &&
    httpsSource(asset.url) &&
    (asset.speakerType==="human" ||
      (asset.speakerType==="synthetic" && /^de-DE$/i.test(asset.voiceLocale??"")))
  ));
  return {sourced,reviewed,accepted};
}
/**
 * A staged source citation is not enough for publication. Every *active*
 * vocabulary entry needs phrase-accurate IPA plus qualified review and
 * reviewed playback, not just a browser SpeechSynthesis voice.
 */
export function inspectLosVocabularyQA(bookId:number,chapterId:string):LosVocabularyQA {
  const chapter=LOS_BOOKS.find(book=>book.id===bookId)?.chapters.find(ch=>ch.id===chapterId);
  const vocabulary=chapter?.vocabulary ?? [];
  const issues: LosVocabularyQA["issues"][number][]=[];
  let ipaSourced=0,ipaHumanReviewed=0,audioApproved=0,ready=0;
  for(const raw of vocabulary){
    const word=raw.split(" – ")[0]?.trim()??"";
    const entry=getLosPronunciation(word);
    const {sourced,reviewed,accepted}=inspectLosPronunciationEvidence(entry);
    ipaSourced+=Number(sourced);
    ipaHumanReviewed+=Number(reviewed);
    audioApproved+=Number(accepted);
    if(sourced&&reviewed&&accepted)ready++;
    else{
      const missing:("IPA"|"IPA-expert-review"|"audio"|"source")[]=[];
      if(!entry?.ipa)missing.push("IPA");
      if(!entry?.ipaSourceUrl||!entry.ipaSourceId)missing.push("source");
      if(!reviewed)missing.push("IPA-expert-review");
      if(!accepted)missing.push("audio");
      issues.push({word,missing});
    }
  }
  return {bookId,chapterId,total:vocabulary.length,ipaSourced,
    ipaHumanReviewed,audioApproved,ready,issues};
}
export function isLosVocabularyPublishable(bookId:number,chapterId:string):boolean {
  const result=inspectLosVocabularyQA(bookId,chapterId);
  return result.total>0 && result.issues.length===0;
}
