import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai/material")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleMaterialAnalysis } = await import(
          "@/lib/material-ai.server"
        );
        return handleMaterialAnalysis(request);
      },
    },
  },
});
