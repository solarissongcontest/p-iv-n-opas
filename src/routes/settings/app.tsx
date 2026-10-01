import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/settings/app")({
  component: () => <StudyAppRoot initialPage="settings" settingsSection="app" />,
});
