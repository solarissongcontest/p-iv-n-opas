import type { LosChapterDraft } from "./studyState.ts";
import { LOS1_FINAL_QUESTIONS, losFinalReadyToSubmit } from "./content/los1FinalExam.ts";
import { losArchivedExamHistory } from "./content/los1ExamArchive.ts";
import { getLosTeacherLesson } from "./teacher/lessonL004.ts";

type SkillSpec = { id:string; title:string; chapter:string; examItems: readonly number[] };
/** Stable LOS! 1 learning objectives from LOS_BOOK_01_SPEC, not inferred CEFR levels. */
export const LOS1_SKILLS: readonly SkillSpec[] = [
  {id:"L1-PHON-01",title:"Saksan kirjaimet ja ääntäminen",chapter:"01",examItems:[]},
  {id:"L1-INT-01",title:"Tervehdin ja hyvästelen",chapter:"01",examItems:[1,6,50]},
  {id:"L1-INT-02",title:"Kysyn ja kerron nimen",chapter:"02",examItems:[2,3,7,8,38]},
  {id:"L1-GRA-01",title:"Käytän alkeiden persoonamuotoja",chapter:"02",examItems:[33,34,35,36,38,41]},
  {id:"L1-INT-03",title:"Kysyn ja kerron alkuperän",chapter:"03",examItems:[11,12,20,33,36]},
  {id:"L1-INT-04",title:"Valitsen kohteliaan Sie-puhuttelun",chapter:"04",examItems:[37,46]},
  {id:"L1-INT-05",title:"Kysyn kuulumisia ja reagoin",chapter:"05",examItems:[]},
  {id:"L1-NUM-01",title:"Tunnistan ja tuotan lukuja",chapter:"06",examItems:[4,5,13,14,15,24,27]},
  {id:"L1-INT-06",title:"Kerron iän, tavaan ja tunnistan numeron",chapter:"07",examItems:[23,48]},
  {id:"L1-STRAT-01",title:"Pyydän toistoa ja selitystä",chapter:"08",examItems:[43,44,45,47]},
  {id:"L1-TIME-01",title:"Tunnistan viikonpäivän ja ajan",chapter:"09",examItems:[25,29,32,39,40,49]},
  {id:"L1-MED-01",title:"Ymmärrän lyhyttä autenttista puhetta",chapter:"10",examItems:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {id:"L1-READ-01",title:"Löydän lyhyestä tekstistä ydintiedot",chapter:"10",examItems:[13,14,15,16,17,18,19,20,21,22]},
  {id:"L1-PROD-01",title:"Tuotan oman 5–7 lauseen esittelyn",chapter:"10",examItems:[]},
  {id:"L1-CULT-01",title:"Tunnistan kielialueita ja kulttuurieroja",chapter:"04",examItems:[]},
];
export type LosMasterySkill = {
  id:string; title:string; chapter:string; covered:boolean;
  independentChecks:number; laterConfirmed:boolean;
  examCorrect:number; examTotal:number; status:"confirmed"|"independent"|"exam"|"missing";
};
export type LosMasterySnapshot = {
  coveredChapters:readonly string[];
  skills:readonly LosMasterySkill[];
  review:readonly LosMasterySkill[];
  nextSuggestion:string;
  ownGoal:string|null;
  exam:{correct:number;total:number;attempts:number}|null;
  writing:{recorded:boolean;assisted:boolean};
};

/**
 * A reproducible read-only projection across the 13 ORIGINAL book draft slots.
 * Does not store or migrate a second answer history. "Later confirmed" needs
 * two correct FIRST unassisted attempts for the same skill, in different
 * teacher lessons, at least 24h apart. Book checkboxes never count as mastery.
 */
export function summarizeLos1Mastery(
  drafts:Readonly<Record<string, LosChapterDraft>>,
): LosMasterySnapshot {
  const chapterIds = Array.from({length:10},(_,i)=>String(i+1).padStart(2,"0"));
  const coveredChapters = chapterIds.filter(chapter => {
    const d = drafts[chapter];
    if (!d) return false;
    return Object.values(d.teacherSessions ?? {}).some(s =>
        Boolean(s.completedAt || s.visitedIds.length || s.attempts.length)) ||
      Object.values(d.lessonProgress ?? {}).some(s => Boolean(s.completedAt)) ||
      d.practiceChecked.length > 0 || Boolean(d.testSubmittedAt);
  });
  const checks = new Map<string,{lessonId:string;at:number}[]>();
  for (const chapter of [...chapterIds,"91","92","93"]) {
    for (const [lessonId,session] of Object.entries(drafts[chapter]?.teacherSessions ?? {})) {
      const lesson = getLosTeacherLesson(lessonId);
      if (!lesson || session.lessonId !== lessonId || !/^L\d{3}$/.test(lessonId)) continue;
      for (const scene of lesson.scenes) {
        const role = scene.question?.evidenceRole;
        const skillId = scene.question?.skillId;
        if (!skillId || (role !== "independent" && role !== "application" && role !== "exit")) continue;
        const first = session.attempts.find(attempt => attempt.sceneId === scene.id);
        if (!first?.correct || !first.independent || session.helpedIds.includes(scene.id) ||
            session.revealedIds.includes(scene.id)) continue;
        const at = Date.parse(first.at);
        if (!Number.isFinite(at)) continue;
        checks.set(skillId,[...(checks.get(skillId)??[]),{lessonId,at}]);
      }
    }
  }
  const final = drafts["93"];
  const archive = losArchivedExamHistory(final?.practiceAnswers ?? {}, "EX-FINAL");
  const validCurrent = Boolean(final?.testSubmittedAt &&
    Number.isFinite(Date.parse(final.testSubmittedAt)) &&
    losFinalReadyToSubmit(final.testAnswers) &&
    ["M-COM-01","M-COM-02"].every(source =>
      Boolean(final.practiceAnswers["EX-FINAL-AUDIO-" + source])));
  const lastChoices = validCurrent ?
    LOS1_FINAL_QUESTIONS.map(q => final!.testAnswers[q.id]) :
    archive.length ? archive[archive.length - 1]!.choices.split("") : null;
  const objectiveResult = lastChoices
    ? LOS1_FINAL_QUESTIONS.filter((q,i)=>lastChoices[i]===q.correctId).length : 0;
  const skills:LosMasterySkill[] = LOS1_SKILLS.map(spec => {
    const attempts = (checks.get(spec.id) ?? []).sort((a,b)=>a.at-b.at);
    const independentChecks = attempts.length;
    const laterConfirmed = attempts.some((a,i)=>attempts.slice(i+1).some(b =>
      a.lessonId !== b.lessonId && b.at - a.at >= 24*60*60*1000));
    const examItems = spec.examItems.map(n => n-1);
    const examTotal = lastChoices ? examItems.length : 0;
    const examCorrect = lastChoices ? examItems.filter(index =>
      lastChoices[index] === LOS1_FINAL_QUESTIONS[index]?.correctId).length : 0;
    const status = laterConfirmed ? "confirmed" :
      independentChecks > 0 ? "independent" :
      examCorrect > 0 ? "exam" : "missing";
    return {id:spec.id,title:spec.title,chapter:spec.chapter,
      covered:coveredChapters.includes(spec.chapter),
      independentChecks,laterConfirmed,examTotal,examCorrect,status};
  });
  const priority = skills.filter(skill => skill.status === "missing" ||
    (skill.status === "exam" && skill.examCorrect < skill.examTotal));
  const review = priority.slice(0,4);
  const weakest = priority[0] ?? skills.find(skill=>!skill.laterConfirmed);
  const ownGoal = (final?.practiceAnswers["EX-SUMMARY-GOAL"] ?? "").trim() || null;
  const written = Boolean((drafts["92"]?.practiceAnswers["EX-REV2-WRITING-058"] ?? "").trim() ||
    (final?.applicationDraft ?? "").trim());
  const assisted = Boolean(drafts["92"]?.teacherSessions?.L058?.helpedIds.includes("writing-model"));
  return {
    coveredChapters,skills,review,
    nextSuggestion: weakest ? "Kertaa " + weakest.title.toLowerCase() +
      " ja tee uusi vihjeetön tarkistus eri päivänä." :
      "Jatka LOS! 2:n arjen vuorovaikutukseen ja palaa tarvittaessa LOS! 1:n kertaustehtäviin.",
    ownGoal,
    exam:lastChoices?{correct:objectiveResult,total:50,attempts:archive.length+(validCurrent?1:0)}:null,
    writing:{recorded:written,assisted},
  };
}
