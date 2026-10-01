import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/progress/")({
  component: () => <StudyAppRoot initialPage="progress" />,
});
