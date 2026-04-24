/**
 * Sentry edge-runtime initialization. Loaded automatically by
 * instrumentation.ts when running in the Edge runtime.
 */
export async function registerSentryEdge() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  try {
    const Sentry = await import(
      /* webpackIgnore: true */ "@sentry/nextjs"
    ).catch(() => null);
    if (!Sentry) return;
    Sentry.init({
      dsn,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0.1),
      environment: process.env.NODE_ENV || "development",
      release: process.env.VERCEL_GIT_COMMIT_SHA || undefined,
      sendDefaultPii: false,
    });
  } catch {
    // No-op on failure.
  }
}
