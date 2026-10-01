import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/practice/$courseCode/$topicId")({
  component: PracticeTopicRoute,
});

function PracticeTopicRoute() {
  const { courseCode, topicId } = Route.useParams();
  return (
    <StudyAppRoot
      initialPage="practice"
      practiceCourseCode={courseCode}
      practiceTopicId={topicId}
    />
  );
}
