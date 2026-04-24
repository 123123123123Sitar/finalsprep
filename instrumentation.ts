/**
 * Next.js instrumentation hook. Runs once per runtime on boot.
 * We use it to lazily initialize Sentry on the server + edge side;
 * the client side initializes separately from the root layout.
 *
 * This file is a no-op if SENTRY_DSN isn't set, so local dev doesn't
 * ping Sentry.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const mod = await import("./sentry.server.config");
    await mod.registerSentryServer();
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    const mod = await import("./sentry.edge.config");
    await mod.registerSentryEdge();
  }
}
