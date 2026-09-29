import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai/questions")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleQuestionGeneration } = await import(
          "@/lib/question-bank.server"
        );
        return handleQuestionGeneration(request);
      },
    },
  },
});
