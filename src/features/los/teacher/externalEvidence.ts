import type { LosChapterDraft } from "../studyState.ts";
import type { TeacherLesson } from "./engine.ts";
import {
  losReviewIIQuestionsFor, losReviewIIReflectionId,
  LOS1_REVIEW_II_WRITING_ID, type LosReviewIIGroupId,
} from "../content/los1ReviewII.ts";
import {
  LOS1_FINAL_QUESTIONS, LOS1_FINAL_AUDIO_SOURCES,
  LOS1_FINAL_WRITING_CHECK, LOS1_FINAL_VOICE_CHECK,
  LOS1_SUMMARY_CARDS, LOS1_SUMMARY_GOAL, LOS1_SUMMARY_REFLECTION,
  losFinalReadyToSubmit, losFinalScore,
} from "../content/los1FinalExam.ts";
import { losArchivedExamHistory } from "../content/los1ExamArchive.ts";

export type TeacherExternalStatus = {
  ready: boolean;
  lines: readonly string[];
};
/**
 * Read-only evidence adapter: never makes another score, answer copy, or
 * teaching record. A checked incorrect review answer counts as an attempt,
 * not a verified skill. Media playback is never inferred from a play click.
 */
export function teacherExternalStatus(
  lesson: TeacherLesson,
  draft: LosChapterDraft,
  allDrafts: Readonly<Record<string, LosChapterDraft>> = {},
): TeacherExternalStatus {
  if (lesson.externalCheck === "review-ii") {
    const group = lesson.id as LosReviewIIGroupId;
    const items = losReviewIIQuestionsFor(group);
    const checked = items.filter(q =>
      draft.practiceChecked.includes(q.id) &&
      q.answers.some(answer => answer.id === draft.practiceAnswers[q.id])).length;
    const correct = items.filter(q =>
      draft.practiceChecked.includes(q.id) && draft.practiceAnswers[q.id] === q.correctId).length;
    const reflection = draft.practiceAnswers[losReviewIIReflectionId(group)] ?? "";
    const rated = ["well", "some", "again"].includes(reflection);
    const writing = draft.practiceAnswers[LOS1_REVIEW_II_WRITING_ID] ?? "";
    const lines = writing.split(/\n/).map(line => line.trim()).filter(Boolean);
    const writingReady = group !== "L058" ||
      (lines.length >= 5 && lines.length <= 7 && writing.trim().length >= 80);
    const hintedWriting = Boolean(draft.teacherSessions?.["L058"]?.helpedIds.includes("writing-model"));
    return {
      ready: items.length === 5 && checked === 5 && rated && writingReady,
      lines: [
        "Kertaus " + group + ": " + checked + "/5 tarkistettu, " + correct + " oikein. Täydellistä pistemäärää ei vaadita.",
        "Muistamisen oma arvio: " + (rated ? "kirjattu" : "puuttuu") + ".",
        ...(group === "L058" ? [
          "Oma 5–7 lauseen esittely: " + (writingReady ? "tallennettu" : "kesken (5–7 riviä, vähintään 80 merkkiä)") + ".",
          "Mallin käyttö: " + (hintedWriting ? "käytetty, itsenäistä kielioppinäyttöä ei päätellä tekstistä" :
            "ei kirjattua mallin avaamista; vapaan tekstin oikeakielisyys ei silti ole automaattisesti tarkistettu") + ".",
        ] : []),
      ],
    };
  }
  if (lesson.externalCheck === "final") {
    const archived = losArchivedExamHistory(draft.practiceAnswers, "EX-FINAL");
    const hasCurrent = Boolean(draft.testSubmittedAt && Number.isFinite(Date.parse(draft.testSubmittedAt)) &&
      losFinalReadyToSubmit(draft.testAnswers) &&
      LOS1_FINAL_AUDIO_SOURCES.every(src => Boolean(draft.practiceAnswers["EX-FINAL-AUDIO-" + src.id])));
    const hasExam = hasCurrent || archived.length > 0;
    const examResult = hasCurrent ? losFinalScore(draft.testAnswers) : archived[archived.length - 1];
    const messageChecked = Boolean(draft.practiceAnswers[LOS1_FINAL_WRITING_CHECK] &&
      draft.applicationDraft.trim().length >= 80 &&
      draft.applicationDraft.split(/\n/).filter(line => line.trim()).length >= 5 &&
      draft.applicationDraft.split(/\n/).filter(line => line.trim()).length <= 7);
    const voiceChecked = draft.practiceAnswers[LOS1_FINAL_VOICE_CHECK] === "audio-download-started";
    const voiceSelf = ["well", "some", "again"].includes(draft.practiceAnswers["EX-FINAL-DIALOGUE-SELF"] ?? "");
    const self = draft.selfAssessment.trim().length >= 15;
    return {
      ready: hasExam && messageChecked && voiceChecked && voiceSelf && self,
      lines: [
        "EX-FINAL: " + (hasExam ? (examResult?.correct ?? "?") + "/50 pistettä; palautettu yritys." : "ei vielä palautettua 50 tehtävän yritystä."),
        "Arkistoidut aiemmat yritykset: " + archived.length + ". Nykyistä koehistoriaa ei kopioida.",
        "Oma 5–7 lauseen viesti: " + (messageChecked ? "tallennettu ja vahvistettu" : "puuttuu tai vahvistamatta") + ".",
        "Keskustelun tallennuksen lataus: " + (voiceChecked ? "käynnistetty" : "puuttuu") +
          ". Puhetta ei pisteytetä koneellisesti.",
        "Keskustelun oma arvio ja sanallinen palaute: " + (voiceSelf && self ? "kirjattu" : "kesken") + ".",
      ],
    };
  }
  if (lesson.externalCheck === "summary") {
    const goals = Array.from({length:10},(_,i) =>
      draft.practiceAnswers["EX-SUMMARY-C" + String(i + 1).padStart(2,"0")] === "reviewed").filter(Boolean).length;
    const reviewed = new Set(Object.entries(allDrafts).flatMap(([chapter, d]) =>
      /^0[1-9]$|^10$/.test(chapter) ? Object.keys(d.recallCards ?? {}) : [])).size;
    const cards = reviewed >= 5 && /^reviewed-\d+$/.test(draft.practiceAnswers[LOS1_SUMMARY_CARDS] ?? "");
    const goal = (draft.practiceAnswers[LOS1_SUMMARY_GOAL] ?? "").trim();
    const goalOk = goal.length >= 25 && draft.practiceAnswers["EX-SUMMARY-GOAL-OK"] === "confirmed";
    const reflection = ["well","some","again"].includes(draft.practiceAnswers[LOS1_SUMMARY_REFLECTION] ?? "");
    return {
      ready: goals === 10 && cards && goalOk && reflection,
      lines: [
        "Opetustavoitteet katselmoitu: " + goals + "/10. Katselmointi ei ole hyväksytty osaamisnäyttö.",
        "Oikeasti arvioituja sanakortteja: " + reviewed + ". Vahvistus: " + (cards ? "kyllä" : "kesken") + ".",
        "Oma seuraava tavoite: " + (goalOk ? "vahvistettu" : "puuttuu tai vahvistamatta") + ".",
        "Oma kokonaisarvio: " + (reflection ? "kirjattu" : "puuttuu") + ".",
      ],
    };
  }
  return {ready:true,lines:[]};
}
