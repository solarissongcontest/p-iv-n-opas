import type {Lesson,LessonTask} from "./EnglishMasterBook";
import {resolveEnglishBookRef} from "./englishChapterLinks";
import type {TeacherLesson,TeacherScene} from "../los/teacher/engine.ts";

/** Translate English Master Alpha 0.8 lessons into the exact shared
 * LOS! Teacher 2.0 teaching scene contract; no German questions are reused.
 * Keep the converter pure so all 192 bundled lessons can be audited in CI.
 */
const manualTask=(task:LessonTask)=>task.requires_manual_review||
  task.format==="free_response"||
  (task.format==="single_choice"?!task.correct_option:!task.acceptable_answers?.length);
const taskSceneId=(index:number,manual:boolean)=>(manual?"reflection-":"question-")+index;
const boardActivityId=(index:number)=>"board-activity-"+index;

export function asTeacherLesson(source:Lesson):TeacherLesson {
  const scenes:TeacherScene[]=[{
    id:"intro",kind:"introduction",phase:"ALOITUS",title:"Aloitus ja tavoitteet",
    paragraphs:[
      source.payload.hook_fi??"Aloita oppitunnin tavoitteista.",
      ...(source.payload.objectives_fi??[]).map((goal,i)=>String(i+1)+". "+goal),
    ],
  }];
  for(const [i,ex] of (source.payload.explanations??[]).entries()) {
    scenes.push({
      id:"explanation-"+i,kind:"explanation",phase:"OPETUS",
      title:ex.heading_fi??"Opetus "+(i+1),
      paragraphs:[ex.text_fi,...(ex.examples??[]).map(model=>
        model.en+" · "+(model.meaning_fi??"")+(model.why_fi?" · "+model.why_fi:""))],
      ...(ex.examples?.length?{board:ex.examples.map((item,j)=>({
        label:"Esimerkki "+(j+1),german:item.en,meaning:
          [item.meaning_fi,item.why_fi].filter(Boolean).join(" · "),
      }))}:{}),
    });
  }
  for(const [i,entry] of (source.payload.teacher_scenes??[]).entries()){
    const activityId=boardActivityId(i);
    scenes.push({
      id:"board-"+i,kind:"board",phase:"OPETUSTAULU",
      title:entry.title_fi??"Opetustilanne "+(i+1),
      paragraphs:[entry.teacher_fi??entry.text_fi??"Käy esimerkki läpi ja kertaa sen idea."],
      board:entry.board?.visible_en?[{
        label:"Opetusesimerkki",german:entry.board.visible_en,
        meaning:entry.board.teacher_fi??"",
      }]:[],
      activityId,activityLabel:"Olen käynyt opetustaulun vaiheen läpi",
      ...(entry.help_fi?{help:[{title:"Toinen selitys",body:entry.help_fi}]}:{}),
    });
  }
  const chapterIds=[...new Set((source.book_refs??[])
    .map(resolveEnglishBookRef)
    .filter((ref):ref is string=>Boolean(ref)))];
  if(chapterIds.length){
    scenes.push({
      id:"textbook",kind:"book",phase:"OPPIKIRJA",title:"Avaa aihe oppikirjassa",
      paragraphs:["Lue oppikirjan esimerkit ja palaa sitten tähän oppituntiin."],
      bookLinks:chapterIds.map(chapterId=>({
        label:chapterId==="A00"?"A00 · Aloitus":chapterId==="A08"?"A08 · Opetuspolku":chapterId+" · English Master",
        chapterId,section:"opening",
        instruction:chapterId==="A00"?"Tutustu kirjan aloitussivuun.":
          chapterId==="A08"?"Tutustu Opetuspolkuun ja oppituntien järjestykseen.":
          "Lue teoria ja esimerkit ennen harjoituksia.",
      })),
    });
  }
  for(const [i,task] of (source.payload.tasks??[]).entries()){
    const manual=manualTask(task);
    const id=taskSceneId(i,manual);
    if(manual){
      scenes.push({
        id,kind:"reflection",phase:"HARJOITUS",title:"Harjoitus "+(i+1),
        paragraphs:[task.prompt_en??task.prompt_fi??"Kirjoita oma vastauksesi.",
          "Tämä tehtävä arvioidaan itse. Sen tekeminen ei ole automaattinen kielitaidon osaamisnäyttö."],
        reflection:{prompt:"Kirjoita oma vastauksesi englanniksi",
          placeholder:"Oma vastaus englanniksi",minLength:1},
        ...(task.hint_fi?{help:[{title:"Vihje",body:task.hint_fi}]}:{}),
      });
    }else{
      scenes.push({
        id,kind:"question",phase:"HARJOITUS",title:"Harjoitus "+(i+1),paragraphs:[],
        question:{
          prompt:task.prompt_en??task.prompt_fi??"Valitse tai kirjoita vastaus.",
          type:task.format==="single_choice"?"choice":"text",
          skillId:task.task_id,
          evidenceRole:["independent","application","exit"].includes(task.phase??"")
            ?task.phase as "independent"|"application"|"exit":"practice",
          ...(task.options?{options:task.options.map(option=>({
            id:option.id,label:option.text,lang:"en" as const,
            ...(task.wrong_option_feedback_fi?.[option.id]?
              {wrongFeedback:task.wrong_option_feedback_fi[option.id]}:{}),
          }))}:{}),
          ...(task.correct_option?{correctOption:task.correct_option}:{}),
          ...(task.acceptable_answers?{accepted:task.acceptable_answers}:{}),
          success:task.feedback_correct_fi??"Oikein!",
          hint:task.hint_fi??"Palaa opetukseen, vertaa esimerkkiin ja mieti uudelleen.",
          reteach:task.hint_fi??"Palaa edelliseen vaiheeseen ja kertaa sääntö.",
          genericWrong:"Tarkista vastaus ja kertaa edellinen opetusvaihe.",
        },
      });
    }
  }
  scenes.push({
    id:"summary",kind:"summary",phase:"YHTEENVETO",
    title:"Kertaa ja päätä oppitunti",
    paragraphs:[source.payload.summary_fi??"Kertaa tavoitteet ja tarkista, mitä harjoittelit."],
  });
  return {
    id:source.content_id,bookId:1,chapterId:source.book_refs?.[0]??"G01",
    language:"en",version:"em-0.8",
    title:source.title,objective:source.payload.hook_fi??"Harjoittele englannin taitoja.",
    estimatedMinutes:0,scenes,
    requiredQuestionIds:scenes.filter(scene=>scene.question).map(scene=>scene.id),
    requiredActivityIds:scenes.filter(scene=>scene.activityId).map(scene=>scene.activityId!),
    requiredPracticeIds:[],
  };
}

