import type { Ke04SeedQuestion } from "./types.ts";
import { questions as chapter01 } from "./chapter-01.ts";
import { questions as chapter02 } from "./chapter-02.ts";
import { questions as chapter03 } from "./chapter-03.ts";
import { questions as chapter04 } from "./chapter-04.ts";
import { questions as chapter05 } from "./chapter-05.ts";
import { questions as chapter06 } from "./chapter-06.ts";
import { questions as chapter07 } from "./chapter-07.ts";
import { questions as chapter08 } from "./chapter-08.ts";
import { questions as chapter09 } from "./chapter-09.ts";
import { questions as chapter10 } from "./chapter-10.ts";
import { questions as chapter11 } from "./chapter-11.ts";
import { questions as chapter12 } from "./chapter-12.ts";
import { questions as chapter13 } from "./chapter-13.ts";
import { questions as chapter14 } from "./chapter-14.ts";
import { questions as chapter15 } from "./chapter-15.ts";

export type { Ke04SeedQuestion, Ke04SeedQuestionType } from "./types";

export const KE04_QUESTION_BANK_VERSION = "v3" as const;
export const KE04_QUESTION_BANK: Ke04SeedQuestion[] = [
  ...chapter01,
  ...chapter02,
  ...chapter03,
  ...chapter04,
  ...chapter05,
  ...chapter06,
  ...chapter07,
  ...chapter08,
  ...chapter09,
  ...chapter10,
  ...chapter11,
  ...chapter12,
  ...chapter13,
  ...chapter14,
  ...chapter15,
];

export const KE04_QUESTION_COUNT = KE04_QUESTION_BANK.length;
export const KE04_RESERVE_COUNT = KE04_QUESTION_BANK.filter((question) => question.reserveForExam).length;
