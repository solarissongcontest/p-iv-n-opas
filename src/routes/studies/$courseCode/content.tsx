import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/studies/$courseCode/content")({ component: CourseContentRoute });

function CourseContentRoute() {
  const { courseCode } = Route.useParams();
  return <StudyAppRoot initialPage="courses" courseCode={courseCode} courseTab="Sisältö" />;
}
