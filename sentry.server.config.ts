/**
 * Sentry server-side initialization. Loaded automatically by
 * instrumentation.ts when running in the Node.js runtime.
 *
 * Kept optional: if SENTRY_DSN isn't set, the SDK is still imported but
 * init() is skipped, so there's zero network traffic. The dynamic import
 * in the try/catch lets the build succeed when @sentry/nextjs is not
 * installed (local dev without Sentry).
 */
export async function registerSentryServer() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  try {
    // webpackIgnore keeps the build green when @sentry/nextjs isn't
    // installed locally. Node resolves it natively at runtime; missing
    // module just falls through to the .catch() below.
    const Sentry = await import(
      /* webpackIgnore: true */ "@sentry/nextjs"
    ).catch(() => null);
    if (!Sentry) return;
    Sentry.init({
      dsn,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0.1),
      environment: process.env.NODE_ENV || "development",
      release: process.env.VERCEL_GIT_COMMIT_SHA || undefined,
      // FinalsPrep doesn't send PII beyond email (already hashed in events),
      // but set this explicitly so we don't accidentally forward request
      // bodies or user objects.
      sendDefaultPii: false,
    });
  } catch {
    // Never crash startup on a Sentry init failure.
  }
}
