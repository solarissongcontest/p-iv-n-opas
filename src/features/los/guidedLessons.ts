import {firstLessons} from './firstLessons.ts';
import {chapter02Lessons} from './chapter02Lessons.ts';
import {chapter03Lessons} from './chapter03Lessons.ts';
import {chapter04Lessons} from './chapter04Lessons.ts';
import {chapter05Lessons} from './chapter05Lessons.ts';
import {chapter07Lessons} from './chapter07Lessons.ts';
import {chapter09Lessons} from './chapter09Lessons.ts';
import {chapter10Lessons} from './chapter10Lessons.ts';
import {reviewOneLessons} from './reviewOneLessons.ts';

/** One ordered canonical list: does not imply all 60 lessons are finished. */
export const guidedLessons=[
 ...firstLessons,
 ...chapter02Lessons,
 ...chapter03Lessons,
 ...chapter04Lessons,
 ...chapter05Lessons,
 ...reviewOneLessons,
 ...chapter07Lessons,
 ...chapter09Lessons,
 ...chapter10Lessons
];
