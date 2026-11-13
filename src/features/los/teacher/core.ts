/**
 * LOS Teacher Experience 2.0: versioned and deterministic lesson schema.
 * There are no language models, generated explanations or remote AI services.
 * This module is reusable across all eight books, while content is lesson-local.
 */
export type TeacherPhase =
  "activation" | "introduction" | "explanation" | "example" |
  "guided" | "independent" | "application" | "review" | "summary";
export type TeacherBookReference ={
  bookId:number;chapterId:string;
  section:"chapter"|"text"|"vocabulary"|"grammar"|"practice"|"culture";
  label:string;
};
export type TeacherQuestion={
  id:string;
  prompt:string;
  options:readonly {id:string;de:string;fi?:string}[];
  correctId:string;
  hint:string;
  secondExplanation:string;
  correctExplanation:string;
  mode:"activation"|"guided"|"independent"|"transfer";
};
export type TeacherScene={
  id:string;phase:TeacherPhase;heading:string;
  paragraphs:readonly string[];
  example?:{de:string;fi:string;commentary:string};
  /** Teacher builds the board one deliberate step at a time. */
  board?:readonly {text:string;note:string}[];
  question?:TeacherQuestion;
  help:{simpler:string;anotherExample:string;why:string};
  bookRef?:TeacherBookReference;
};
export type TeacherLesson={
  id:string;bookId:number;chapterId:string;
  title:string;objective:string;estimatedMinutes:number;
  contentVersion:string;
  scenes:readonly TeacherScene[];
};
export type TeacherAnswer={
  attempts:number;lastOption:string|null;
  status:"unanswered"|"hint"|"remediation"|"correct"|"solution";
  usedHelp:boolean;
  /** True only when a first, unassisted attempt is correct. */
  independentCorrect:boolean;
};
export type TeacherProgress={
  version:2;lessonId:string;contentVersion:string;
  sceneId:string;
  visitedSceneIds:string[];
  answers:Record<string,TeacherAnswer>;
  coveredAt:string|null;
};
export function validateTeacherLesson(lesson:TeacherLesson):string[]{
  const errors:string[]=[];
  if(!/^L\d{3}$/.test(lesson.id)||!lesson.scenes.length)errors.push("Puuttuva oppitunnin tunniste tai sisältö.");
  const sceneIds=new Set<string>(),questionIds=new Set<string>();
  for(const scene of lesson.scenes){
    if(sceneIds.has(scene.id))errors.push("Toistuva opetustilanne: "+scene.id);
    sceneIds.add(scene.id);
    if(!scene.heading||!scene.paragraphs.length||
      !scene.help.simpler||!scene.help.anotherExample||!scene.help.why)
      errors.push("Puuttuva opettajan selitys tai avun sisältö: "+scene.id);
    if(scene.bookRef&&(scene.bookRef.bookId!==lesson.bookId||
      scene.bookRef.chapterId!==lesson.chapterId))
      errors.push("Virheellinen oppikirjaviite: "+scene.id);
    const q=scene.question;
    if(!q)continue;
    if(questionIds.has(q.id))errors.push("Toistuva kysymys: "+q.id);
    questionIds.add(q.id);
    const options=new Set(q.options.map(o=>o.id));
    if(!options.has(q.correctId)||options.size!==q.options.length||
      q.options.length<2||!q.hint||!q.secondExplanation||!q.correctExplanation)
      errors.push("Kysymyksen vastaus tai korjaus puuttuu: "+q.id);
  }
  if(lesson.scenes[0]?.phase!=="introduction"||
     lesson.scenes.at(-1)?.phase!=="summary")
    errors.push("Johdanto tai yhteenveto puuttuu.");
  return errors;
}
export function emptyTeacherProgress(lesson:TeacherLesson):TeacherProgress{
  return {version:2,lessonId:lesson.id,contentVersion:lesson.contentVersion,
    sceneId:lesson.scenes[0]!.id,visitedSceneIds:[lesson.scenes[0]!.id],
    answers:{},coveredAt:null};
}
export function parseTeacherProgress(raw:string|null,lesson:TeacherLesson):TeacherProgress{
  const fallback=emptyTeacherProgress(lesson);
  if(!raw||raw.length>32000)return fallback;
  try{
    const x=JSON.parse(raw) as Partial<TeacherProgress>;
    if(x.version!==2||x.lessonId!==lesson.id||x.contentVersion!==lesson.contentVersion)return fallback;
    const sceneIds=new Set(lesson.scenes.map(s=>s.id));
    const questionMap=new Map(lesson.scenes.filter(s=>s.question).map(s=>[s.question!.id,s.question!] as const));
    const visited=Array.isArray(x.visitedSceneIds)?x.visitedSceneIds
      .filter((id):id is string=>typeof id==="string"&&sceneIds.has(id)).slice(0,lesson.scenes.length):[];
    const answers:Record<string,TeacherAnswer>={};
    if(x.answers&&typeof x.answers==="object"&&!Array.isArray(x.answers)){
      for(const [id,value] of Object.entries(x.answers)){
        const question=questionMap.get(id);
        if(!question||!value||typeof value!=="object")continue;
        const row=value as Partial<TeacherAnswer>;
        if(typeof row.attempts!=="number"||!Number.isInteger(row.attempts)||row.attempts<0||row.attempts>3)continue;
        if(!["unanswered","hint","remediation","correct","solution"].includes(row.status??""))continue;
        if(row.lastOption!==null&&!question.options.some(o=>o.id===row.lastOption))continue;
        const independentCorrect=row.independentCorrect===true&&row.attempts===1&&
          row.usedHelp!==true&&row.lastOption===question.correctId&&row.status==="correct";
        answers[id]={attempts:row.attempts!,lastOption:row.lastOption??null,
          status:row.status!,usedHelp:row.usedHelp===true,independentCorrect};
      }
    }
    const sceneId=typeof x.sceneId==="string"&&sceneIds.has(x.sceneId)?x.sceneId:fallback.sceneId;
    const normalized={...fallback,sceneId,
      visitedSceneIds:Array.from(new Set([...fallback.visitedSceneIds,...visited,sceneId])),answers};
    return {...normalized,coveredAt:typeof x.coveredAt==="string"&&
      canCoverTeacherLesson(normalized,lesson)?x.coveredAt:null};
  }catch{return fallback;}
}
export function teacherSelectScene(state:TeacherProgress,lesson:TeacherLesson,id:string):TeacherProgress{
  if(!lesson.scenes.some(s=>s.id===id))return state;
  return {...state,sceneId:id,
    visitedSceneIds:Array.from(new Set([...state.visitedSceneIds,id]))};
}
export function teacherAnswer(state:TeacherProgress,lesson:TeacherLesson,
  questionId:string,optionId:string):TeacherProgress{
  const q=lesson.scenes.find(s=>s.question?.id===questionId)?.question;
  if(!q||!q.options.some(o=>o.id===optionId))return state;
  const prev:TeacherAnswer=state.answers[q.id]??{attempts:0,lastOption:null,status:"unanswered",usedHelp:false,independentCorrect:false};
  if(prev.status==="correct"||prev.status==="solution"||prev.attempts>=3)return state;
  const attempts=prev.attempts+1;
  const correct=optionId===q.correctId;
  const next:TeacherAnswer={attempts,lastOption:optionId,
    status:correct?"correct":attempts===1?"hint":attempts===2?"remediation":"solution",
    usedHelp:prev.usedHelp,independentCorrect:correct&&attempts===1&&!prev.usedHelp};
  return {...state,answers:{...state.answers,[q.id]:next},coveredAt:null};
}
export function teacherRequestHelp(state:TeacherProgress,lesson:TeacherLesson):TeacherProgress{
  const q=lesson.scenes.find(s=>s.id===state.sceneId)?.question;
  if(!q)return state;
  const prev:TeacherAnswer=state.answers[q.id]??{attempts:0,lastOption:null,status:"unanswered",usedHelp:false,independentCorrect:false};
  if(prev.status==="correct"||prev.status==="solution")return state;
  return {...state,answers:{...state.answers,[q.id]:{...prev,usedHelp:true,independentCorrect:false}}};
}
export function teacherRevealSolution(state:TeacherProgress,lesson:TeacherLesson):TeacherProgress{
  const q=lesson.scenes.find(s=>s.id===state.sceneId)?.question;
  if(!q)return state;
  const prev:TeacherAnswer=state.answers[q.id]??{attempts:0,lastOption:null,status:"unanswered",usedHelp:false,independentCorrect:false};
  if(prev.status==="correct"||prev.status==="solution")return state;
  return {...state,answers:{...state.answers,[q.id]:{...prev,status:"solution",
    usedHelp:true,independentCorrect:false}},coveredAt:null};
}
export function canCoverTeacherLesson(state:TeacherProgress,lesson:TeacherLesson):boolean{
  if(!lesson.scenes.every(s=>state.visitedSceneIds.includes(s.id)))return false;
  return lesson.scenes.filter(s=>s.question).every(s=>{
    const status=state.answers[s.question!.id]?.status;
    return status==="correct"||status==="solution";
  });
}
export function teacherMarkCovered(state:TeacherProgress,lesson:TeacherLesson,at:string):TeacherProgress{
  return canCoverTeacherLesson(state,lesson)&&Number.isFinite(Date.parse(at))?
    {...state,coveredAt:state.coveredAt??at}:state;
}
export function teacherIndependentAnswers(state:TeacherProgress,lesson:TeacherLesson):number{
  return lesson.scenes.filter(s=>s.question&&
    (s.question.mode==="independent"||s.question.mode==="transfer")&&
    state.answers[s.question.id]?.independentCorrect).length;
}
