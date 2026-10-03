// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

// h3's HTTPError serializes to {"status":500,"unhandled":true,"message":"HTTPError"} —
// no stack, no cause — so a plain console.error(error) reaches the log pipeline with
// the failure detail stripped. Expand Error-like args into a string that keeps the
// message, stack, and the full cause chain.
const CAUSE_DEPTH_LIMIT = 5;
const DESCRIPTION_LENGTH_LIMIT = 8_000;

export function describeError(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;
  for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
    if (!(current instanceof Error)) {
      parts.push(depth === 0 ? "NonErrorThrown" : "caused by: NonErrorThrown");
      break;
    }
    const label = depth === 0 ? "" : "caused by: ";
    const status = describeStatus(current);
    const code = describeCode(current);
    const frames = safeStackFrames(current);
    parts.push(`${label}${safeErrorName(current)}${status}${code}${frames ? `\n${frames}` : ""}`);
    current = current.cause;
  }
  return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}

function safeErrorName(error: Error): string {
  return /^[A-Za-z][A-Za-z0-9_.-]{0,79}$/.test(error.name) ? error.name : "Error";
}

function describeStatus(error: Error): string {
  const { status, statusCode } = error as { status?: unknown; statusCode?: unknown };
  const value = status ?? statusCode;
  return typeof value === "number" ? ` (status ${value})` : "";
}

function describeCode(error: Error): string {
  const value = (error as { code?: unknown }).code;
  return typeof value === "string" && /^[A-Z0-9_.:-]{1,64}$/.test(value)
    ? ` (code ${value})`
    : "";
}

function safeStackFrames(error: Error): string {
  if (!error.stack) return "";
  return error.stack
    .split("\n")
    .slice(1)
    .filter((line) => /^\s*at\s/.test(line))
    .slice(0, 30)
    .join("\n");
}

function isErrorLike(value: unknown): value is Error {
  return value instanceof Error;
}

function safeConsoleArg(value: unknown): unknown {
  if (isErrorLike(value)) {
    record(value);
    return describeError(value);
  }
  if (typeof value === "number" || typeof value === "boolean" || value == null) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (
      trimmed.length <= 180 &&
      /^\[(?:Opintopäiväkirja|Supabase|db|server)\]\s+[A-Za-z0-9 _.,:;()\x2F-]+$/i.test(trimmed)
    ) return trimmed;
    return "[string redacted]";
  }
  return "[value redacted]";
}

// Wrap console.error so errors logged by any layer — including h3's internal
// unhandled-error logging, which this file cannot hook directly — are both
// recorded for consumeLastCapturedError and expanded before serialization.
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  originalConsoleError(...args.map(safeConsoleArg));
};

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
