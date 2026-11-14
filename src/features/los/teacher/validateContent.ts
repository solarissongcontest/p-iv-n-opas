import type { TeacherLesson, TeacherQuestion, TeacherScene } from "./engine.ts";

/** A content mistake must be caught before a scripted lesson is shipped. */
export type TeacherContentIssue = { location: string; problem: string };

const name = (value: string) => /^[A-Za-z0-9_.-]{1,80}$/.test(value);
const meaningful = (value: string | undefined) => Boolean(value?.trim());
const textbookSections = new Set([
  "overview","contents","chapter","text","understand","vocabulary","grammar",
  "text-b","practice","apply","culture","test","appendix","dictionary","review","midterm","review-ii","final","summary",
]);

function checkQuestion(question: TeacherQuestion, location: string, issues: TeacherContentIssue[]) {
  if (!meaningful(question.prompt) || !meaningful(question.success) ||
      !meaningful(question.hint) || !meaningful(question.reteach) ||
      !meaningful(question.genericWrong) || !name(question.skillId))
    issues.push({ location, problem: "Kysymyksestä puuttuu ohje, taitotunniste tai korjaava palaute." });
  if (question.type === "choice") {
    const options = question.options ?? [];
    if (options.length < 2 || options.length > 8 ||
      options.some(option => !name(option.id) || !meaningful(option.label)) ||
      new Set(options.map(option => option.id)).size !== options.length ||
      !options.some(option => option.id === question.correctOption)) {
      issues.push({ location, problem: "Monivalinnassa ei ole yksiselitteistä hyväksyttyä vastausta." });
    }
  } else if (question.type === "text") {
    if (!question.accepted?.length || question.accepted.some(value => !meaningful(value))) {
      issues.push({ location, problem: "Kirjoitustehtävästä puuttuvat hyväksytyt vastausmuodot." });
    }
  } else {
    issues.push({ location, problem: "Tuntematon tehtävätyyppi." });
  }
}
function checkScene(scene: TeacherScene, location: string, issues: TeacherContentIssue[]) {
  if (!name(scene.id) || !meaningful(scene.title) || !meaningful(scene.phase) ||
      scene.paragraphs.length === 0 || scene.paragraphs.some(paragraph => !meaningful(paragraph))) {
    issues.push({ location, problem: "Opetustilanteelta puuttuu tunniste, otsikko tai selitys." });
  }
  if (scene.kind === "question" && !scene.question)
    issues.push({ location, problem: "Harjoitustilanteelta puuttuu tarkistettava tehtävä." });
  if (scene.question) checkQuestion(scene.question, location + ".question", issues);
  if (scene.kind === "reflection" && (!scene.reflection ||
      !meaningful(scene.reflection.prompt) || !meaningful(scene.reflection.placeholder) ||
      !Number.isInteger(scene.reflection.minLength) ||
      scene.reflection.minLength < 1 || scene.reflection.minLength > 500)) {
    issues.push({ location, problem: "Kirjoitus- tai pohdintatehtävästä puuttuu kelvollinen sisältö ja pituusraja." });
  }
  if (scene.numberBuilder && scene.kind !== "board")
    issues.push({ location, problem: "Numeronrakennustaulu edellyttää board-tilannetta." });
  if (scene.kind === "form" && (!scene.form || scene.form.length < 2 || scene.form.length > 8 ||
      new Set(scene.form.map(field => field.id)).size !== scene.form.length ||
      scene.form.some(field => !name(field.id) || !meaningful(field.label) ||
        !meaningful(field.placeholder) || !meaningful(field.sampleAnswer)))) {
    issues.push({ location, problem: "Lomakkeesta puuttuu nimettyjä kenttiä tai kirjallinen mallivastaus." });
  }
  if (scene.kind === "board" && (!scene.board?.length ||
      scene.board.some(item => !meaningful(item.label) ||
        !meaningful(item.german) || !meaningful(item.meaning)))) {
    issues.push({ location, problem: "Opetustaulussa ei ole kokonaisia, tarkistettavia vaiheita." });
  }
  if (scene.kind === "book" && !scene.bookLinks?.length)
    issues.push({ location, problem: "Oppikirjatilanteesta puuttuu täsmälinkki." });
  if (scene.bookLinks) for (const [i, link] of scene.bookLinks.entries()) {
    if (!/^\d{2}$/.test(link.chapterId) || !textbookSections.has(link.section) ||
        !meaningful(link.label) || !meaningful(link.instruction)) {
      issues.push({ location: location + ".bookLinks[" + i + "]",
        problem: "Oppikirjaviite on puutteellinen tai sen osio ei ole sallittu." });
    }
  }
  if (scene.kind === "calendar" && (!scene.calendar || !meaningful(scene.calendar.prompt) ||
    !meaningful(scene.calendar.sourceNote) ||
    !["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"].includes(scene.calendar.day) ||
    !/^(?:0[0-9]|1[0-9]|2[0-3]):00$/.test(scene.calendar.time) ||
    !scene.activityId)) issues.push({location,problem:"Kalenteriharjoituksen tiedot tai vahvistus puuttuvat."});
  if (scene.kind === "source" && !scene.sourceChapterId && !scene.textBChapterId)
    issues.push({location,problem:"Alkuperäistä tekstilähdettä ei ole sidottu."});
    if (scene.activityId && !name(scene.activityId))
    issues.push({ location, problem: "Opiskeluteon tunniste ei ole kelvollinen." });
}

export function validateTeacherLesson(lesson: TeacherLesson): TeacherContentIssue[] {
  const issues: TeacherContentIssue[] = [];
  const allIds = lesson.scenes.map(scene => scene.id);
  const idMatchesBook = lesson.bookId === 1
    ? /^L\d{3}$/.test(lesson.id)
    : new RegExp("^LOS" + lesson.bookId + "-L\\d{3}$").test(lesson.id);
  if (!idMatchesBook || !Number.isInteger(lesson.bookId) ||
      lesson.bookId < 1 || lesson.bookId > 8 ||
      !/^\d{2}$/.test(lesson.chapterId) || !meaningful(lesson.version) ||
      !meaningful(lesson.title) || !meaningful(lesson.objective) ||
      lesson.estimatedMinutes <= 0) {
    issues.push({ location: "lesson", problem: "Oppitunnin metatiedot ovat virheelliset." });
  }
  if (!lesson.scenes.length || lesson.scenes.length > 80 ||
      new Set(allIds).size !== allIds.length) {
    issues.push({ location: "scenes", problem: "Opetustilanteita puuttuu tai tunnisteet eivät ole yksilöllisiä." });
  }
  for (const [i, scene] of lesson.scenes.entries()) {
    checkScene(scene, "scenes[" + i + "]", issues);
  }
  const unique = (values: readonly string[]) =>
    new Set(values).size === values.length && values.every(name);
  if (!unique(lesson.requiredQuestionIds) || lesson.requiredQuestionIds.some(id =>
      !lesson.scenes.some(scene => scene.id === id && scene.question))) {
    issues.push({ location: "requiredQuestionIds", problem: "Vaadittu tarkistus puuttuu opetuskäsikirjoituksesta." });
  }
  if (!unique(lesson.requiredActivityIds) || lesson.requiredActivityIds.some(id =>
      !lesson.scenes.some(scene => scene.activityId === id))) {
    issues.push({ location: "requiredActivityIds", problem: "Vaadittu opiskeluteko puuttuu oppitunnilta." });
  }
  if (!unique(lesson.requiredPracticeIds) || lesson.requiredPracticeIds.some(id =>
      !/^C\d{2}-EX-\d{2,3}$/.test(id))) {
    issues.push({ location: "requiredPracticeIds", problem: "Kirjan tehtävätunniste on virheellinen." });
  }
  if (lesson.requiredCheckedIds &&
      (!unique(lesson.requiredCheckedIds) || lesson.requiredCheckedIds.some(id =>
        !/^C\d{2}-(?:SOURCE|ZPE|TEXTB|MCOM02|SCHOOL|HARALD)-Q\d{2}$/.test(id)))) {
    issues.push({ location: "requiredCheckedIds", problem: "Tarkistettavan lähdetehtävän tunniste on virheellinen." });
  }
  if (lesson.mediaGate && (!/^M-[A-Z0-9-]+$/.test(lesson.mediaGate.sourceId) ||
      typeof lesson.mediaGate.approved !== "boolean" || !meaningful(lesson.mediaGate.reason))) {
    issues.push({location:"mediaGate",problem:"Median hyväksyntäportilta puuttuu lähde, tila tai perustelu."});
  }
  if (lesson.externalCheck && (
      (lesson.externalCheck === "review-ii" && (lesson.chapterId !== "92" || !["L056","L057","L058"].includes(lesson.id))) ||
      (["final","summary"].includes(lesson.externalCheck) && lesson.chapterId !== "93") ||
      !["review-ii","final","summary"].includes(lesson.externalCheck))) {
    issues.push({location:"externalCheck",problem:"Ulkoinen näyttö ei vastaa olemassa olevaa arviointipaikkaa."});
  }
  const assessment = lesson.chapterAssessment;
  if (assessment && (
    !unique(assessment.requiredTestIds) || assessment.requiredTestIds.length < 1 ||
    assessment.requiredTestIds.length > 40 ||
    assessment.requiredTestIds.some(id => !new RegExp("^C" + lesson.chapterId + "-EX-\\d{2,3}$").test(id)) ||
    typeof assessment.requireApplicationDraft !== "boolean" ||
    !Number.isInteger(assessment.minSelfAssessmentLength) || assessment.minSelfAssessmentLength < 1 ||
    assessment.minSelfAssessmentLength > 500
  )) {
    issues.push({ location: "chapterAssessment", problem: "Kappaletestin tai itsearvioinnin vaatimus on virheellinen." });
  }
  if (lesson.examAssessment && (lesson.examAssessment.id !== "EX-MID" ||
      lesson.id !== "L030" || lesson.chapterId !== "91" || lesson.chapterAssessment)) {
    issues.push({ location: "examAssessment", problem: "EX-MID on sallittu vain L030:n oikeassa koeluonnoksessa." });
  }
  if (!lesson.scenes.some(scene => scene.kind === "summary")) {
    issues.push({ location: "scenes", problem: "Oppitunnilta puuttuu yhteenveto." });
  }
  return issues;
}
