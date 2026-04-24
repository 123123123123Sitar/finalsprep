/**
 * Single wrapper around error-reporting so call sites don't import Sentry
 * directly. If @sentry/nextjs is installed and NEXT_PUBLIC_SENTRY_DSN is
 * set, this forwards exceptions to Sentry with structured context. If
 * either is missing we fall back to console.error, so the app still runs
 * and logs usefully in local dev or environments without Sentry.
 *
 * All server-side long-running code paths (API routes, webhooks, cron)
 * should funnel caught exceptions through captureException() instead of
 * console.error so we get aggregated alerts in prod.
 */

type Context = Record<string, unknown>;

let sentryPromise: Promise<any> | null = null;
let sentryInitTried = false;

function sentryEnabled(): boolean {
  const dsn =
    process.env.SENTRY_DSN ||
    process.env.NEXT_PUBLIC_SENTRY_DSN;
  return !!dsn;
}

async function loadSentry(): Promise<any | null> {
  if (!sentryEnabled()) return null;
  if (sentryPromise) return sentryPromise;
  sentryPromise = (async () => {
    try {
      // webpackIgnore lets the build succeed when @sentry/nextjs isn't
      // installed locally; Node resolves it at runtime, and a missing
      // module falls through to the .catch() below.
      const mod = await import(
        /* webpackIgnore: true */ "@sentry/nextjs"
      ).catch(() => null);
      if (!mod) return null;
      if (!sentryInitTried) {
        sentryInitTried = true;
        // The Sentry SDK auto-initializes from sentry.server.config.ts in
        // Next 14+; we don't call init() here.
      }
      return mod;
    } catch {
      return null;
    }
  })();
  return sentryPromise;
}

export function captureException(error: unknown, context?: Context): void {
  // Fire-and-forget — never block a request on logging.
  void (async () => {
    const sentry = await loadSentry();
    if (sentry && typeof sentry.captureException === "function") {
      try {
        sentry.captureException(error, context ? { extra: context } : undefined);
        return;
      } catch {
        /* fall through */
      }
    }
    // Always log to stderr too so the error shows up in Vercel logs even
    // when Sentry is configured.
    const tag = context?.area ? `[${context.area}]` : "[error]";
    // eslint-disable-next-line no-console
    console.error(tag, error, context || "");
  })();
}

export function captureMessage(
  message: string,
  context?: Context & { level?: "info" | "warning" | "error" }
): void {
  void (async () => {
    const sentry = await loadSentry();
    const level = context?.level || "info";
    if (sentry && typeof sentry.captureMessage === "function") {
      try {
        sentry.captureMessage(message, {
          level,
          extra: context,
        });
        return;
      } catch {
        /* fall through */
      }
    }
    const tag = context?.area ? `[${context.area}]` : "[msg]";
    // eslint-disable-next-line no-console
    console[level === "error" ? "error" : "log"](tag, message, context || "");
  })();
}
