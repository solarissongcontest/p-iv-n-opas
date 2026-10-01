import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/studies/$courseCode/analysis")({ component: CourseAnalysisRoute });

function CourseAnalysisRoute() {
  const { courseCode } = Route.useParams();
  return <StudyAppRoot initialPage="courses" courseCode={courseCode} courseTab="Analyysi" />;
}
