import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/questions/seed-ke04")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleKe04QuestionBankSeed } = await import(
          "@/lib/ke04-question-bank.server"
        );
        return handleKe04QuestionBankSeed(request);
      },
    },
  },
});
