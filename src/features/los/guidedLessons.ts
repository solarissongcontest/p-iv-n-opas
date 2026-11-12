import { LOS_1_LESSONS } from "./learningPath.ts";
import { LOS1_C01_LESSON_BLUEPRINTS, type LosLessonBlueprint } from "./lessonEngine.ts";
import { LOS1_C02_LESSON_BLUEPRINTS } from "./lessonEngineC02.ts";
import { LOS1_C03_LESSON_BLUEPRINTS } from "./lessonEngineC03.ts";
import { LOS1_C04_C05_LESSONS } from "./lessonEngineC04C05.ts";
import { LOS1_REVIEW_I_LESSONS } from "./lessonEngineReviewI.ts";
import { LOS1_C06_LESSON_BLUEPRINTS } from "./lessonEngineC06.ts";
import { LOS1_C07_C09_LESSONS } from "./lessonEngineC07C09.ts";
import { LOS1_C08_C10_PARTIAL_LESSONS } from "./lessonEngineC08C10Partial.ts";

/**
 * Single canonical set of lessons with implemented completion/evidence logic.
 * An intentional gap in the 60-lesson sequence remains an editorial preview,
 * not an implicitly executable lesson. No hard-coded numeric range or fake
 * progress for missing source-dependent C08/C10 units, review II or final exam.
 */
export const LOS1_EXECUTABLE_LESSONS: readonly LosLessonBlueprint[] = [
  ...LOS1_C01_LESSON_BLUEPRINTS,
  ...LOS1_C02_LESSON_BLUEPRINTS,
  ...LOS1_C03_LESSON_BLUEPRINTS,
  ...LOS1_C04_C05_LESSONS,
  ...LOS1_REVIEW_I_LESSONS,
  ...LOS1_C06_LESSON_BLUEPRINTS,
  ...LOS1_C07_C09_LESSONS,
  ...LOS1_C08_C10_PARTIAL_LESSONS,
].sort((a,b)=>Number(a.id.slice(1))-Number(b.id.slice(1)));
const executableIds = new Set(LOS1_EXECUTABLE_LESSONS.map(lesson=>lesson.id));
export const isLos1ExecutableLesson = (id:string):boolean => executableIds.has(id);

/** Use the actual lesson plan chapter; a comparison step may read another chapter. */
export const los1LessonDraftChapter = (id:string):"01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"91" => {
  const lessonNumber = Number(id.slice(1));
  if (!/^L\d{3}$/.test(id) || !Number.isInteger(lessonNumber) || !executableIds.has(id)) return "01";
  if(lessonNumber>=27 && lessonNumber<=30)return "91";
  const chapter = LOS_1_LESSONS[lessonNumber-1]?.chapter;
  return chapter === "02" || chapter === "03" || chapter === "04" ||
    chapter === "05" || chapter === "06" || chapter === "07" || chapter === "08" || chapter === "09" || chapter === "10" ? chapter : "01";
};
