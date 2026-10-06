import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        // Mutations that support offline persistence must execute their
        // mutationFn while disconnected so runOrQueue can store the write
        // immediately instead of TanStack Query pausing it until reconnect.
        // Direct network mutations still surface their normal error path.
        networkMode: "always",
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};