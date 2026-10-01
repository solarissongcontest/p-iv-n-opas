import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/exams/$examId")({ component: ExamDetailRoute });

function ExamDetailRoute() {
  const { examId } = Route.useParams();
  return <StudyAppRoot initialPage="exams" examId={examId} />;
}
