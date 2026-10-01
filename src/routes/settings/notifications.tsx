import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/settings/notifications")({
  component: () => <StudyAppRoot initialPage="settings" settingsSection="notifications" />,
});
