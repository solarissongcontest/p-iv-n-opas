import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/studies/$courseCode/history")({ component: CourseHistoryRoute });

function CourseHistoryRoute() {
  const { courseCode } = Route.useParams();
  return <StudyAppRoot initialPage="courses" courseCode={courseCode} courseTab="Historia" />;
}
