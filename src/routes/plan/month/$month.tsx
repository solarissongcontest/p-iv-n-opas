import { createFileRoute } from "@tanstack/react-router";
import { StudyAppRoot } from "@/app/StudyApp";

export const Route = createFileRoute("/plan/month/$month")({ component: PlanMonthRoute });

function PlanMonthRoute() {
  const { month } = Route.useParams();
  return <StudyAppRoot initialPage="plan" planMode="kuukausi" planAnchor={/^\d{4}-\d{2}$/.test(month) ? month+"-01" : undefined} />;
}
