import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai/course-structure")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleCourseStructure } = await import(
          "@/lib/course-structure-ai.server"
        );
        return handleCourseStructure(request);
      },
    },
  },
});
