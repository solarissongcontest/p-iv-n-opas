import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/exams/")({
  component: () => <StudyAppRoot initialPage="exams" />,
});
