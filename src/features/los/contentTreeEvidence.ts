/**
 * Read-only evidence projection of the existing LOS! chapter draft.
 * This is NOT a completion or scoring engine: an answer is "saved" only,
 * and the only exam submission signal is the existing testSubmittedAt.
 */
export type LosTreeEvidence = {
  bookmarked: boolean;
  practiceAnsweredIds: readonly string[];
  testAnsweredIds: readonly string[];
  testSubmitted: boolean;
};

export function summarizeLosTreeEvidence(draft: {
  bookmarked?: boolean;
  practiceAnswers?: Record<string,string>;
  testAnswers?: Record<string,string>;
  testSubmittedAt?: string | null;
}):LosTreeEvidence {
  const answered = (answers:Record<string,string>|undefined):string[] =>
    Object.entries(answers??{}).filter(([id,answer])=>
      id.length>0 && typeof answer==="string" && answer.trim().length>0)
      .map(([id])=>id);
  return {
    bookmarked:draft.bookmarked===true,
    practiceAnsweredIds:answered(draft.practiceAnswers),
    testAnsweredIds:answered(draft.testAnswers),
    testSubmitted:typeof draft.testSubmittedAt==="string" &&
      !Number.isNaN(Date.parse(draft.testSubmittedAt)),
  };
}
