/**
 * Sentry client-side initialization. Loaded once at the top of the
 * root layout via `"use client"` wrapper; Next.js bundles this into
 * the initial JS so reports are captured even on the first render.
 */
"use client";
import { useEffect } from "react";

let initialized = false;

export function initSentryClient() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn || initialized) return;
  initialized = true;
  // webpackIgnore skips bundling; the browser tries a native import at
  // runtime. Missing module → silent .catch() → Sentry stays off.
  import(/* webpackIgnore: true */ "@sentry/nextjs")
    .then((Sentry) => {
      Sentry.init({
        dsn,
        tracesSampleRate: Number(
          process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || 0.05
        ),
        environment: process.env.NODE_ENV || "development",
        release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || undefined,
        sendDefaultPii: false,
      });
    })
    .catch(() => {});
}

export default function SentryClientInit() {
  useEffect(() => {
    initSentryClient();
  }, []);
  return null;
}
