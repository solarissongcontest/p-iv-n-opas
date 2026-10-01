import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/progress/analysis")({
  component: () => <StudyAppRoot initialPage="progress" progressSection="analysis" />,
});
