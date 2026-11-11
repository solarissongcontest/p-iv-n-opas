import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";
import { LosApp } from "@/features/los/LosApp";

export const Route = createFileRoute("/oppikirjasto/saksa-b3/$")({
  component: () => <StudyAppRoot initialPage="courses" losContent={<LosApp/>} />,
});
