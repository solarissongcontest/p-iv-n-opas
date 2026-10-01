import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/release-info")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(
          {
            commit: process.env["VERCEL_GIT_COMMIT_SHA"] ?? null,
            environment: process.env["VERCEL_ENV"] ?? process.env["NODE_ENV"] ?? null,
            deploymentUrl: process.env["VERCEL_URL"] ?? null,
          },
          {
            headers: {
              "Cache-Control": "no-store, max-age=0",
            },
          },
        ),
    },
  },
});
