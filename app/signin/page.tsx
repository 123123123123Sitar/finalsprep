"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SiteNav from "@/app/components/SiteNav";
import AuthPanel from "@/app/components/AuthPanel";
import { useAuth } from "@/app/components/AuthProvider";

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInPageSkeleton />}>
      <SignInPageInner />
    </Suspense>
  );
}

function SignInPageInner() {
  const { user, loading, configured } = useAuth();
  const searchParams = useSearchParams();
  const nextHref = searchParams.get("next") || "/chat";
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  // If they're already signed in + verified, send them to the chat.
  useEffect(() => {
    if (!loading && user && user.emailVerified) {
      window.location.href = nextHref;
    }
  }, [user, loading, nextHref]);

  return (
    <main className="bg-paper text-body">
      <SiteNav>
        <a href="/study" className="nav-link">Study</a>
        <a href="/" className="nav-link">Home</a>
      </SiteNav>

      <section className="mx-auto max-w-5xl px-6 py-16">
        {!configured ? (
          <div className="mx-auto max-w-xl text-center">
            <div className="label mb-3">Auth not configured</div>
            <h2 className="font-serif text-3xl text-ink">
              Firebase isn't wired up yet.
            </h2>
            <p className="mt-4 text-muted">
              Set the{" "}
              <code className="font-mono text-ink">NEXT_PUBLIC_FIREBASE_*</code>{" "}
              variables in{" "}
              <code className="font-mono text-ink">.env.local</code>, restart
              the dev server, and this page will show the sign-in form.
            </p>
          </div>
        ) : loading ? (
          <div className="flex h-64 items-center justify-center text-muted">
            <div className="typing-dots" aria-label="Loading">
              <span /> <span /> <span />
            </div>
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
            <div className="max-w-md">
              <div className="label mb-3">Account required</div>
              <h1 className="font-serif text-[42px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
                Sign in to use the AI tutor.
              </h1>
              <p className="mt-5 text-[17px] text-body">
                FinalsPrep is free to try, but the AI features need an
                account so we can save your chat history and rate-limit fairly
                across users. Email verification is required - it takes 30
                seconds.
              </p>
              <ul className="mt-6 space-y-2 text-[15px] text-body">
                <li className="flex gap-2">
                  <span className="mt-[8px] h-1 w-1 rounded-full bg-orange" />
                  <span>Free tier with a 5-hour token budget</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[8px] h-1 w-1 rounded-full bg-orange" />
                  <span>Chat history saved across sessions</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[8px] h-1 w-1 rounded-full bg-orange" />
                  <span>No spam. We don't email you unless you ask.</span>
                </li>
              </ul>
            </div>

            <div>
              <AuthPanel
                initialMode={initialMode}
                pendingUser={!!user && !user.emailVerified}
                onSuccess={() => (window.location.href = nextHref)}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function SignInPageSkeleton() {
  return (
    <main className="bg-paper text-body">
      <SiteNav>
        <a href="/study" className="nav-link">Study</a>
        <a href="/" className="nav-link">Home</a>
      </SiteNav>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex h-64 items-center justify-center text-muted">
          <div className="typing-dots" aria-label="Loading">
            <span /> <span /> <span />
          </div>
        </div>
      </section>
    </main>
  );
}
