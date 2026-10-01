import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/progress/mastery")({
  component: () => <StudyAppRoot initialPage="progress" progressSection="mastery" />,
});
