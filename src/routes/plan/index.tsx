import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/plan/")({
  component: () => <StudyAppRoot initialPage="plan" />,
});
