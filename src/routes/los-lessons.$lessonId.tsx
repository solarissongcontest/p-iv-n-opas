import { createFileRoute } from "@tanstack/react-router";
import { LosTeacherPlayer } from "@/features/los/teacher/LosTeacherPlayer";

/** Standalone LOS teaching screen. The existing textbook route remains independent. */
export const Route = createFileRoute("/los-lessons/$lessonId")({
  component: function TeacherLessonRoute() {
    const { lessonId } = Route.useParams();
    return <LosTeacherPlayer lessonId={lessonId} />;
  },
});
