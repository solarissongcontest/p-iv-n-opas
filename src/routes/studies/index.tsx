import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/studies/")({
  component: () => <StudyAppRoot initialPage="courses" />,
});
