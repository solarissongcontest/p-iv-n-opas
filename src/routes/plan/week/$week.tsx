import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";
import { dateFromIsoWeek } from "@/features/planner/routeDate";

export const Route = createFileRoute("/plan/week/$week")({ component: PlanWeekRoute });

function PlanWeekRoute() {
  const { week } = Route.useParams();
  return <StudyAppRoot initialPage="plan" planMode="viikko" planAnchor={dateFromIsoWeek(week) ?? undefined} />;
}
