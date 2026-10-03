type LovableErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type LovableEvents = {
  track?: (event: string, properties?: Record<string, unknown>) => string | null;
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: LovableErrorOptions,
  ) => void;
};

function telemetryError(error: unknown) {
  if (error instanceof Response) {
    return new Error(`Response status ${error.status}`);
  }
  if (error instanceof Error) {
    const status = (error as { status?: unknown; statusCode?: unknown }).status ??
      (error as { statusCode?: unknown }).statusCode;
    const safe = new Error(
      `${/^[A-Za-z][A-Za-z0-9_.-]{0,79}$/.test(error.name) ? error.name : "Error"}${typeof status === "number" ? ` status ${status}` : ""}`,
    );
    if (error.stack) {
      const frames = error.stack
        .split("\n")
        .slice(1)
        .filter((line) => /^\s*at\s/.test(line))
        .slice(0, 30);
      safe.stack = [safe.message, ...frames].join("\n");
    }
    return safe;
  }
  return new Error("NonErrorThrown");
}

declare global {
  interface Window {
    __lovableEvents?: LovableEvents;
    __lovableReportRuntimeError?: (payload: {
      message: string;
      stack?: string;
      filename?: string;
    }) => void;
  }
}

export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const safeError = telemetryError(error);
  window.__lovableEvents?.captureException?.(
    safeError,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
  // Prod React does not rethrow boundary-caught errors to window.onerror, so the
  // editor's telemetry never sees them. Forward to lovable.js's reporting hook,
  // which is present only inside the editor preview.
  // Loaders and server fns commonly throw a raw Response; String(it) is the
  // opaque "[object Response]", so pull out the status and URL instead.
  window.__lovableReportRuntimeError?.({
    message: safeError.message,
    ...(safeError.stack !== undefined && { stack: safeError.stack }),
    filename: window.location.pathname,
  });
}
