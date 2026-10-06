import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/studies/$courseCode")({
  component: StudiesCourseLayout,
});

function StudiesCourseLayout() {
  return <Outlet />;
}

// The index/content/history/analysis child routes render StudyAppRoot. Keeping
// this path as a pure Outlet layout ensures their deep links render the child
// instead of being masked by the course overview.
