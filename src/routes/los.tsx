import { createFileRoute } from "@tanstack/react-router";
import { LosBook } from "@/features/los/LosBook";

/** LOS! owns its entire visible shell; StudyOS AppShell must not wrap this route. */
export const Route = createFileRoute("/los")({
  component: LosBook,
});
