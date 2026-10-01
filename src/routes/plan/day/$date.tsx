import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/plan/day/$date")({ component: PlanDayRoute });

function PlanDayRoute() {
  const { date } = Route.useParams();
  return <StudyAppRoot initialPage="plan" planMode="päivä" planAnchor={date} />;
}
