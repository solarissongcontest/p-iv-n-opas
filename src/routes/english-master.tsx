import { createFileRoute } from "@tanstack/react-router";
import { EnglishMasterBook } from "@/features/english-master/EnglishMasterBook";

/** Like LOS!, English Master owns its entire book/lesson shell. */
export const Route = createFileRoute("/english-master")({
  component: EnglishMasterBook,
});
