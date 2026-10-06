import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";
import { PlanAdherencePortal } from "@/components/PlanAdherencePortal";

export const Route = createFileRoute("/progress/")({
  component: () => <><StudyAppRoot initialPage="progress" /><PlanAdherencePortal /></>,
});
