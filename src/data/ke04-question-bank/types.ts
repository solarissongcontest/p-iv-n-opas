export type Ke04SeedQuestionType =
  | "free_recall"
  | "short_answer"
  | "calculation"
  | "application"
  | "multiple_choice"
  | "matching"
  | "explanation"
  | "ordering"
  | "error_detection"
  | "simulation"
  | "recognition";

export type Ke04SeedQuestion = {
  seedKey: string;
  contentId: string;
  chapter: number;
  topicName: string;
  subtopic: string;
  questionType: Ke04SeedQuestionType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  options: string[];
  correctAnswer: string | null;
  explanation: string;
  scoring: string;
  hints: string[];
  skills: string[];
  expectedConcepts: string[];
  prerequisites: string[];
  commonErrors: string[];
  estimatedSeconds: number;
  examEligible: boolean;
  reserveForExam: boolean;
  validated: boolean;
  points: number;
  answerMode: "text" | "formula" | "matching" | "mixed";
  matchingPairs: Array<{ left: string; right: string }>;
  originalType: string;
};
