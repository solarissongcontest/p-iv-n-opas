import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/studies/$courseCode/")({
  component: StudiesCourseIndexRoute,
});

function StudiesCourseIndexRoute() {
  const { courseCode } = Route.useParams();
  return <StudyAppRoot initialPage="courses" courseCode={courseCode} />;
}
