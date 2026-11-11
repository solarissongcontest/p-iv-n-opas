import {chapters,lessons,allWords} from './content.ts';
import {guidedLessons} from './guidedLessons.ts';
import {exams} from './examBank.ts';

export type LosReleaseEvidence={
 rightsReviewed:boolean; mediaPlaybackVerified:boolean; fallbackVerified:boolean;
 pedagogyReviewed:boolean; lexiconReviewed:boolean; sourceAnswerQA:boolean;
 mobileAndDesktopE2e:boolean; accessibilityVerified:boolean;
 productionMigrationVerified:boolean; twoDeviceSyncVerified:boolean;
 originalApprovedAssetsVerified:boolean; localLops21Reviewed:boolean;
};
/** True means confirmed evidence, not a guess based on a file or URL. */
export const losReleaseEvidence:Readonly<LosReleaseEvidence>={
 rightsReviewed:false,mediaPlaybackVerified:false,fallbackVerified:false,
 pedagogyReviewed:false,lexiconReviewed:false,sourceAnswerQA:false,
 mobileAndDesktopE2e:false,accessibilityVerified:false,
 productionMigrationVerified:false,twoDeviceSyncVerified:false,
 originalApprovedAssetsVerified:false,localLops21Reviewed:false
};
export type ReleaseGate={id:'G1'|'G2'|'G3'|'G4'|'G5'|'G6'|'G7'|'G8';title:string;passed:boolean;detail:string};
export type ReleaseAudit={
 ready:boolean;lessonsTotal:number;lessonsAuthored:number;textsImported:number;mediaMetadata:number;
 chapterExams:number;uniqueCoreWords:number;blockingChapterIds:string[];unauthoredLessonIds:string[];
 gates:ReleaseGate[];additionalBlocks:{id:string;resolved:boolean;detail:string}[];
};

export function auditLosRelease(evidence:LosReleaseEvidence=losReleaseEvidence):ReleaseAudit{
 const guidedIds=new Set(guidedLessons.map(l=>l.id));
 const imported=chapters.filter(c=>c.status==='text-reviewed'&&c.blocks.length>0);
 const blocked=chapters.filter(c=>c.status!=='text-reviewed'||!c.blocks.length).map(c=>c.id);
 const media=chapters.filter(c=>Boolean(c.media?.sourceUrl&&c.media?.transcript?.length));
 const sourceIds=new Set(imported.map(c=>c.sourceId));
 const core=new Set(allWords.filter(w=>w.tier==='ydin').map(w=>w.de.toLocaleLowerCase('de').normalize('NFC')));
 const examCount=chapters.filter(c=>('EX-'+c.id) in exams).length;
 const knownLessonIds=new Set(lessons.map(l=>l.id));
 const validLessons=guidedLessons.every(l=>knownLessonIds.has(l.id)&&l.steps.length===5&&
  l.steps.every(s=>Boolean(s.id&&s.title&&s.instructionFi.trim()))&&
  l.steps.reduce((sum,s)=>sum+s.minutes,0)===30);
 const full=guidedIds.size===60&&validLessons;
 const gates:ReleaseGate[]=[
  {id:'G1',title:'Aineisto',passed:imported.length===10&&sourceIds.size===10&&evidence.rightsReviewed,
   detail:imported.length+'/10 päätekstiä alustavasti tuotu. Puuttuvat: '+(blocked.join(', ')||'ei')+'. Alkuperäisten tekstien loppuoikeuskatselmointi on erillinen portti.'},
  {id:'G2',title:'Mediat',passed:media.length===10&&evidence.mediaPlaybackVerified&&evidence.fallbackVerified,
   detail:media.length+'/10 kappaletta sisältää erillisen lähteistetyn media-aineistotietueen. Kappaleiden vertailutekstit voivat käyttää aiempaa lähdettä. Toisto ja fallback ovat vielä tarkistamatta.'},
  {id:'G3',title:'Taso',passed:full&&evidence.pedagogyReviewed,
   detail:guidedIds.size+'/60 oikeasti käsikirjoitettua viisivaiheista opetuspolkua. Pedagoginen eteneminen ja tukimuodot odottavat pätevää tarkistusta.'},
  {id:'G4',title:'Sanasto',passed:core.size>=160&&core.size<=190&&evidence.lexiconReviewed,
   detail:core.size+' uniikkia ydinluokiteltua saksankielistä sanaa tai ilmausta. Tavoite 160–190; lemmat ja artikkelit on katselmoitava.'},
  {id:'G5',title:'Tehtävät',passed:examCount===10&&evidence.sourceAnswerQA&&Boolean(exams['EX-FINAL']),
   detail:examCount+'/10 alustavasti koottua kappalekoetta. Lähdesidonnaisten vastausten tarkistus ja lopputestien katselmointi avoinna.'},
  {id:'G6',title:'Julkaisun testit',passed:full&&evidence.mobileAndDesktopE2e&&evidence.originalApprovedAssetsVerified,
   detail:'Koodikäännös ei vastaa mobiilin ja tietokoneen loppukäyttäjän e2e-testiä eikä hyväksyttyjen kuvien asentamista.'},
  {id:'G7',title:'Esteettömyys',passed:evidence.accessibilityVerified,
   detail:'Näppäimistö, ruudunlukija, 320 px mobiili, 200 % zoom ja kontrastit tarvitsevat oikean laitetestin.'},
  {id:'G8',title:'Synkronointi',passed:evidence.productionMigrationVerified&&evidence.twoDeviceSyncVerified,
   detail:'Supabase-migraatio ei ole todennetusti tuotannossa eikä kahden kirjautuneen laitteen synkronointia ole testattu.'}
 ];
 const additionalBlocks=[
  {id:'BLOCK-08',resolved:evidence.originalApprovedAssetsVerified,detail:'Hyväksytty alkuperäinen kansi, banneri ja sanamerkki eivät ole repositorion asennettuja assetteja.'},
  {id:'BLOCK-09',resolved:evidence.localLops21Reviewed,detail:'SAB31:n paikalliset LOPS21-tavoitteet odottavat tarkistusta.'}
 ];
 return {ready:gates.every(g=>g.passed)&&additionalBlocks.every(b=>b.resolved),
  lessonsTotal:lessons.length,lessonsAuthored:guidedIds.size,textsImported:imported.length,
  mediaMetadata:media.length,chapterExams:examCount,uniqueCoreWords:core.size,
  blockingChapterIds:blocked,unauthoredLessonIds:lessons.filter(l=>!guidedIds.has(l.id)).map(l=>l.id),
  gates,additionalBlocks};
}
