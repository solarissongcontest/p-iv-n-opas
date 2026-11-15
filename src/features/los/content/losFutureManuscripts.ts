import type { LosFutureManuscript } from "./losFutureManuscriptTypes.ts";
import { LOS_FUTURE_BOOK_2 } from "./losFutureBook2.ts";
import { LOS_FUTURE_BOOK_3 } from "./losFutureBook3.ts";
import { LOS_FUTURE_BOOK_4 } from "./losFutureBook4.ts";
import { LOS_FUTURE_BOOK_5 } from "./losFutureBook5.ts";
import { LOS_FUTURE_BOOK_6 } from "./losFutureBook6.ts";
import { LOS_FUTURE_BOOK_7 } from "./losFutureBook7.ts";
import { LOS_FUTURE_BOOK_8 } from "./losFutureBook8.ts";

/** Kanoniset sisältöluonnokset: 70 kappaletta, lähteet Los2-5.txt ja Los6-8.txt.
 * Nämä ovat kielentarkistamattomia LOS!:n omia tekstejä. */
export const LOS_FUTURE_MANUSCRIPTS: Record<number, Record<string,LosFutureManuscript>> = {
  2: LOS_FUTURE_BOOK_2,
  3: LOS_FUTURE_BOOK_3,
  4: LOS_FUTURE_BOOK_4,
  5: LOS_FUTURE_BOOK_5,
  6: LOS_FUTURE_BOOK_6,
  7: LOS_FUTURE_BOOK_7,
  8: LOS_FUTURE_BOOK_8,
};
