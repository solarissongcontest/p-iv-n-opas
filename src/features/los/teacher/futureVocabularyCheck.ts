import type { TeacherQuestion, TeacherBoardStep } from "./engine.ts";
import type { LosFutureManuscript } from "../content/losFutureManuscriptTypes.ts";
import { losFutureExercisesFor } from "../content/losFutureExercises.ts";
import { losFutureMatchingPairs } from "../content/losFutureMatching.ts";

type Pair={de:string;fi:string};

/**
 * Every chapter lesson has a source-grounded formative retrieval question.
 * Prefer the four T05 manuscript pairs; where Finnish glosses overlap
 * (e.g. Arzt/Ärztin), choose distinct word senses from the same Cxx vocabulary
 * instead. Never invent a new translation or a grade for this editorial draft.
 */
export function futureVocabularyPairs(bookId:number,chapterId:string,manuscript:LosFutureManuscript):Pair[]|null{
  const t05=losFutureExercisesFor(bookId,chapterId).find(task=>task.id.endsWith("-T05"));
  const authored=t05?losFutureMatchingPairs(t05):null;
  if(authored)return authored;
  const unique:Pair[]=[];
  const german=new Set<string>(),finnish=new Set<string>();
  for(const entry of manuscript.vocabulary){
    const de=entry.de.trim(),fi=entry.fi.trim();
    if(!de||!fi||german.has(de)||finnish.has(fi))continue;
    german.add(de);finnish.add(fi);unique.push({de,fi});
    if(unique.length===4)return unique;
  }
  return null;
}

export function futureVocabularyCheck(
  bookId:number,chapterId:string,lessonNumber:number,manuscript:LosFutureManuscript,
):{board:TeacherBoardStep[];question:TeacherQuestion}|null {
  const pairs=futureVocabularyPairs(bookId,chapterId,manuscript);
  if(!pairs||pairs.length!==4)return null;
  const targetIndex=(bookId+lessonNumber)%pairs.length;
  const rotation=(bookId+Math.floor(lessonNumber/3))%pairs.length;
  const target=pairs[targetIndex]!;
  const choices=pairs.map((_,index)=>pairs[(index+rotation)%pairs.length]!);
  const letters=["a","b","c","d"];
  const correctIndex=choices.findIndex(pair=>pair.de===target.de);
  return {
    board:pairs.map((pair,index)=>({label:`Sanasto ${index+1}/4`,german:pair.de,meaning:pair.fi})),
    question:{
      prompt:`Mitä saksankielinen sana tai ilmaus "${target.de}" tarkoittaa tässä kappaleessa?`,
      type:"choice",
      skillId:`LOS${bookId}-C${chapterId}-VOCAB`,
      evidenceRole:"practice",
      options:choices.map((pair,index)=>({
        id:letters[index]!,label:pair.fi,lang:"fi" as const,
        ...(pair.de===target.de?{}:{wrongFeedback:`Valitsemasi merkitys kuuluu ilmaisuun "${pair.de}". Palaa opetustaulun sanaan "${target.de}" ja yritä uudelleen.`}),
      })),
      correctOption:letters[correctIndex]!,
      success:`Oikein. "${target.de}" tarkoittaa tässä yhteydessä "${target.fi}".`,
      hint:"Palaa juuri näytettyyn neljän sanan opetustauluun ja peitä suomennokset. Palauta merkitys itse ennen seuraavaa yritystä.",
      reteach:`Katso opetustaulun ilmaus "${target.de}". Yhdistä se merkitykseen "${target.fi}" ja sano pari ääneen. Tämä on ohjattua harjoittelua, ei itsenäisen osaamisen näyttö.`,
      genericWrong:"Katso, mitä saksankielistä ilmaisua valitsemasi suomennos vastaa. Vertaa sitten tavoitesanaan.",
    },
  };
}
