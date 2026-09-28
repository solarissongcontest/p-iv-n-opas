import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai/coach")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { handleCoach } = await import(
          "@/lib/coach/handler.server"
        );
        return handleCoach(request);
      },
      POST: async ({ request }) => {
        const { handleCoach } = await import(
          "@/lib/coach/handler.server"
        );
        return handleCoach(request);
      },
    },
  },
});
