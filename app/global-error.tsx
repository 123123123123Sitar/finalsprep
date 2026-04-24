"use client";
import { useEffect } from "react";

/**
 * Top-level error boundary. Catches render-time errors anywhere under the
 * root layout and forwards them to Sentry if configured. Shows a minimal
 * recovery UI so the user can retry without losing their route history.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn) return;
    import(/* webpackIgnore: true */ "@sentry/nextjs")
      .then((Sentry) => {
        Sentry.captureException(error, {
          extra: { area: "globalError", digest: error.digest },
        });
      })
      .catch(() => {});
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-serif">Something broke.</h1>
          <p className="mt-3 text-sm text-gray-600">
            We've logged the error. You can try again, or head back home.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              onClick={reset}
              className="rounded-md bg-black px-4 py-2 text-sm text-white"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm"
            >
              Go home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
