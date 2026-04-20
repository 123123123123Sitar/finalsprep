"use client";
import { useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import Reveal from "@/app/components/Reveal";
import { useAuth } from "@/app/components/AuthProvider";
import Dashboard from "@/app/components/Dashboard";
import PageLoader from "@/app/components/PageLoader";
import ScrollCinema from "@/app/components/ScrollCinema";
import CedCinema from "@/app/components/CedCinema";
import AuroraBackground from "@/app/components/AuroraBackground";

function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

const DEMO_EXAMPLES = [
  { label: "Quadratic", problem: "Solve 2x^2 - 5x - 3 = 0" },
  { label: "Chain rule", problem: "Find dy/dx if y = (3x^2 + 1)^5" },
  { label: "Projectile", problem: "A ball is thrown up at 20 m/s from ground level. How high does it go? (g = 10 m/s^2)" },
  { label: "u-sub", problem: "Evaluate integral of 2x · (x^2 + 1)^3 dx." },
];

/**
 * Home route. Auth-aware: while Firebase is still resolving we render a
 * minimal shell (same nav, no content) to avoid a marketing→dashboard flash.
 * Once auth is resolved, signed-in verified users see the Dashboard; everyone
 * else sees the marketing page. All marketing hooks live inside MarketingHome
 * so hook order stays stable across auth states.
 */
export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <HomeLoading />;
  if (user && user.emailVerified) return <Dashboard />;
  return <MarketingHome />;
}

function HomeLoading() {
  return (
    <main className="bg-paper text-body">
      <SiteNav sticky />
      <PageLoader />
    </main>
  );
}

function MarketingHome() {
  const { user, configured: authConfigured, getIdToken, plan } = useAuth();
  const isSignedIn = !!user && user.emailVerified;
  const [email, setEmail] = useState("");
  const [captured, setCaptured] = useState<"idle" | "ok" | "err">("idle");
  const [captureMsg, setCaptureMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Live solver state (runs on the landing page)
  const [demoProblem, setDemoProblem] = useState(DEMO_EXAMPLES[0].problem);
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoResult, setDemoResult] = useState<string>("");
  const [demoSource, setDemoSource] = useState<"curated" | "ai" | null>(null);
  const [demoTokensRemaining, setDemoTokensRemaining] = useState<number | null>(null);
  const [demoMessagesRemaining, setDemoMessagesRemaining] = useState<number | null>(null);
  const [demoResetMinutes, setDemoResetMinutes] = useState<number | null>(null);
  const [demoError, setDemoError] = useState("");
  const [demoLimitHit, setDemoLimitHit] = useState(false);

  async function runDemo(problemOverride?: string) {
    const p = (problemOverride ?? demoProblem).trim();
    if (!p) return;
    if (problemOverride) setDemoProblem(problemOverride);
    setDemoLoading(true);
    setDemoError("");
    setDemoResult("");
    setDemoLimitHit(false);
    setDemoSource(null);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ problem: p }),
      });
      const data = await res.json();
      if (typeof data?.tokensRemaining === "number")
        setDemoTokensRemaining(data.tokensRemaining);
      if (typeof data?.messagesRemaining === "number")
        setDemoMessagesRemaining(data.messagesRemaining);
      if (typeof data?.resetMinutes === "number")
        setDemoResetMinutes(data.resetMinutes);
      if (!res.ok) {
        if (data?.limitReached) setDemoLimitHit(true);
        setDemoError(data?.message || data?.error || "Something went wrong.");
      } else {
        setDemoResult(data.explanation);
        setDemoSource(data.source || null);
      }
    } catch (e: any) {
      setDemoError(e.message || "Network error.");
    } finally {
      setDemoLoading(false);
    }
  }

  async function buy(
    checkoutPlan:
      | "pro-monthly"
      | "pro-sixmonth"
      | "hacker-monthly"
      | "hacker-sixmonth" = "pro-monthly"
  ) {
    const token = await getIdToken();
    if (!token) {
      window.location.href = `/signin?next=${encodeURIComponent(
        "/checkout?plan=" + checkoutPlan
      )}`;
      return;
    }
    window.location.href = `/checkout?plan=${encodeURIComponent(checkoutPlan)}`;
  }

  async function capture(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setCaptured("err");
      setCaptureMsg("Email can't be empty.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setCaptured("err");
      setCaptureMsg("That doesn't look like a valid email address.");
      return;
    }
    try {
      const res = await fetch("/api/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "landing" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Server error");
      }
      setCaptured("ok");
      setCaptureMsg("Sent. If you don't see it in a minute, check your spam folder.");
    } catch (e: any) {
      setCaptured("err");
      setCaptureMsg(e?.message || "Couldn't send right now. Try again in a moment?");
    }
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav sticky>
        <a href="#coverage" className="nav-link hidden sm:inline">Coverage</a>
        <a href="#price" className="nav-link hidden sm:inline">Pricing</a>
      </SiteNav>

      {/* TOP BANNER - AP sale urgency */}
      <div className="animate-slideDown border-b border-hair bg-orange-tint">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-6 py-2 text-xs text-orange-ink">
          <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-orange" />
          <span className="font-semibold">AP sale:</span>
          <span>
            $5 off your first month. Code{" "}
            <code className="rounded bg-paper/60 px-1 font-mono text-[11px]">SCORE5</code>{" "}
            at checkout.
          </span>
        </div>
      </div>

      {/* HERO */}
      <div className="relative isolate overflow-hidden">
        {/* Animated aurora background — full viewport width */}
        <AuroraBackground />
      <section className="relative z-10 mx-auto max-w-5xl overflow-visible px-6 pt-20 pb-24 sm:pt-28">
        <div className="relative max-w-3xl">
          <div className="label animate-fadeUp mb-6">For AP students</div>
          <h1 className="animate-heroReveal font-serif text-[52px] font-normal leading-[1.1] tracking-tightest text-ink pb-2 sm:text-[76px]">
            A tutor for <span className="italic gradient-text">every</span>{" "}
            AP class.<br />
            Open 24 hours.
          </h1>
          <p className="animate-fadeUp delay-300 mt-8 max-w-2xl text-[19px] leading-relaxed text-body">
            A real AI tutor that walks you through math, physics, chemistry,
            bio, CS, and history — the concept and reasoning, not just the
            answer. Curriculum overviews for all 16 AP courses, interactive
            tools, a Book-Mode reading view, and a chat that remembers what
            you asked yesterday. <strong className="text-ink">$16/month</strong>,{" "}
            or free forever with a daily token budget.
          </p>
          <div className="animate-fadeUp delay-500 mt-10 flex flex-wrap items-center gap-3">
            <button onClick={() => buy("pro-monthly")} disabled={loading} className="btn-primary animate-glowPulse text-base">
              {loading ? "Opening checkout…" : "Start Pro - $11 first month"}
            </button>
            <a href="#try" className="btn-ghost text-base">
              Try the tutor free ↓
            </a>
          </div>
          <p className="animate-fadeUp delay-700 mt-4 max-w-xl text-sm text-muted">
            Free tier is real:{" "}
            <strong className="text-ink">10,000 AI tokens per day</strong>,
            every day. Enough to run the tutor on your real homework without
            ever paying a cent.
          </p>
        </div>

        {/* scroll hint */}
        <div className="animate-fadeUp delay-700 mt-14 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="h-px w-10 bg-hair" />
          <span>Scroll to watch it in action</span>
          <span className="animate-scrollHint text-orange">↓</span>
        </div>

        {/* social proof strip */}
        <Reveal from="up">
        <div className="mt-16 border-y border-hair py-6">
          <div className="grid gap-4 text-center sm:grid-cols-4">
            {[
              { n: "16", l: "AP courses covered" },
              { n: "10k", l: "Free tokens / day" },
              { n: "8", l: "Reading themes" },
              { n: "7 days", l: "No-questions refund" },
            ].map((s, i) => (
              <div
                key={s.l}
                className="animate-countUp"
                style={{ animationDelay: `${200 + i * 140}ms` }}
              >
                <div className="font-serif text-4xl text-ink">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>
      </div>

      {/* Cinematic scroll-synced demo: AI tutor */}
      <ScrollCinema />

      {/* Cinematic scroll-synced demo: CED + interactive tools */}
      <CedCinema />

      <hr className="rule mx-auto max-w-5xl" />

      {/* LIVE SOLVER - real working AI on the landing page */}
      <section id="try" className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div>
            <div className="label">Try it right here</div>
            <p className="mt-3 text-sm text-muted">
              A real explanation, right now. Pick an example or type your
              own. Curated walkthroughs are free. New problems pull from
              your daily token budget — <strong>10,000 tokens a day</strong>{" "}
              on the Learner tier, on a rolling 24-hour window.
            </p>
            <div className="mt-4 text-xs text-muted">
              {demoTokensRemaining === null
                ? "Free budget refills daily"
                : demoTokensRemaining === 0
                ? `Out of today's budget${
                    demoResetMinutes
                      ? ` · resets in ${formatMinutes(demoResetMinutes)}`
                      : ""
                  }`
                : `${demoTokensRemaining.toLocaleString()} tokens left this 24h window`}
            </div>
          </div>

          <div>
            {!isSignedIn && authConfigured ? (
              <div className="rounded-xl border border-dashed border-hair bg-offwhite p-8 text-center">
                <div className="label mb-2">Account required</div>
                <h3 className="font-serif text-2xl font-normal text-ink">
                  Sign in to use the AI tutor.
                </h3>
                <p className="mt-3 text-sm text-muted">
                  Free to create. Email verification keeps the tutor free
                  and fair for everyone. Takes 30 seconds.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href="/signin" className="btn-primary">
                    Create free account
                  </a>
                  <a href="/signin" className="btn-ghost">
                    I already have one
                  </a>
                </div>
                <p className="mt-4 text-[11px] text-muted">
                  No credit card. No spam. Cancel any time.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-3 flex flex-wrap gap-2">
                  {DEMO_EXAMPLES.map((ex) => (
                    <button
                      key={ex.label}
                      onClick={() => runDemo(ex.problem)}
                      disabled={demoLoading}
                      className="rounded-full border border-hair bg-paper px-3 py-1 text-xs text-ink transition-colors hover:border-orange hover:bg-orange-tint hover:text-orange-ink disabled:opacity-50"
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>

                <label htmlFor="demo-problem" className="sr-only">
                  Problem
                </label>
                <textarea
                  id="demo-problem"
                  value={demoProblem}
                  onChange={(e) => setDemoProblem(e.target.value)}
                  rows={3}
                  placeholder="Paste any math or physics problem..."
                  className="focus-ring w-full rounded-lg border border-hair bg-paper px-5 py-4 font-mono text-[14px] leading-6 text-ink placeholder-dim"
                />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => runDemo()}
                    disabled={demoLoading || !demoProblem.trim()}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {demoLoading ? "Thinking…" : "Explain it"}
                  </button>
                  <span className="text-xs text-muted">
                    {demoLoading
                      ? "The tutor is writing - takes a few seconds on arbitrary problems."
                      : `Signed in as ${user?.email ?? "you"}.`}
                  </span>
                </div>
              </>
            )}

            {demoError && (
              <div
                className={`mt-5 rounded-md border p-4 text-sm ${
                  demoLimitHit
                    ? "border-orange/40 bg-orange-tint text-orange-ink"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                <div>{demoError}</div>
                {demoLimitHit && (
                  <button onClick={() => buy("pro-monthly")} className="btn-link mt-2">
                    Unlock unlimited - $16/month →
                  </button>
                )}
              </div>
            )}

            {demoResult && (
              <div className="animate-fadeUp mt-6 border-l-2 border-orange pl-6 text-[16px] leading-relaxed text-body">
                <div className="mb-2 flex items-center justify-between">
                  <div className="meta">Walkthrough</div>
                  <div className="flex items-center gap-3">
                    {demoSource && (
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                        {demoSource === "curated" ? "Pre-written" : "Generated just now"}
                      </span>
                    )}
                    {demoTokensRemaining !== null && demoSource === "ai" && (
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                        · {demoTokensRemaining.toLocaleString()} tokens left today
                      </span>
                    )}
                  </div>
                </div>
                <pre className="whitespace-pre-wrap font-sans">{demoResult}</pre>
                <div className="mt-5 text-sm">
                  <button onClick={() => buy("pro-monthly")} className="btn-link">
                    Like this? Unlock unlimited - $16/month →
                  </button>
                </div>
              </div>
            )}

            {!demoResult && !demoError && (
              <p className="mt-4 text-xs text-muted">
                Click an example above, or type your own and hit{" "}
                <em>Explain it</em>. The walkthrough will appear here.
              </p>
            )}
          </div>
        </div>
      </section>

      <hr className="rule mx-auto max-w-5xl" />

      {/* FEATURE PREVIEWS - visual mockups of what's actually in the app */}
      <section id="features" className="relative mx-auto max-w-6xl overflow-hidden px-6 py-20">
        <Reveal from="up">
          <div className="label mb-3">What's actually inside</div>
          <h2 className="font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">
            A tutor, a textbook, and a lab bench.<br />
            In one tab.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] text-body">
            Every screen below is a real page in the app. Sign in free and
            all six are unlocked immediately.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <FeaturePreview
            delay={0}
            from="left"
            eyebrow="Chat tutor"
            title="Ask anything. It remembers what you asked yesterday."
            blurb="Full chat with message history, image uploads for handwritten work, and a settings popup for response length and tone. Math renders cleanly with proper notation automatically."
            cta={{ href: "/chat", label: "Open the tutor →" }}
            mock={<ChatMock />}
          />

          <FeaturePreview
            delay={100}
            from="right"
            eyebrow="Book Mode"
            title="Read a lesson like a real book. No scroll."
            blurb="Toggle Book Mode on any lesson and content paginates across viewport-sized pages. Flip with arrow keys, click the page edge, or tap forward. Eight reading themes."
            cta={{ href: "/study", label: "See Book Mode →" }}
            mock={<BookMock />}
          />

          <FeaturePreview
            delay={0}
            from="left"
            eyebrow="Per-unit curriculum"
            title="Every AP unit, structured like the College Board organizes it."
            blurb="Exam guide, big ideas, essential knowledge, key facts, and CED sublesson walkthroughs. Progress tracked per topic — mark complete, see your course bar fill."
            cta={{ href: "/study", label: "Browse units →" }}
            mock={<StudyMock />}
          />

          <FeaturePreview
            delay={100}
            from="right"
            eyebrow="Interactive tools"
            title="Graphing calc, 3D plots, physics sims, live code."
            blurb="Drop into any unit and play with the concept: a 2D/3D graphing calculator, nine physics simulations, and a Java / pseudocode sandbox with trace output."
            cta={{ href: "/study", label: "Try the tools →" }}
            mock={<ToolsMock />}
          />

          <FeaturePreview
            delay={0}
            from="left"
            eyebrow="Review & insights"
            title="Every problem you got wrong — spaced and re-served."
            blurb="Miss a practice problem? It lands in your review bank. The Insights dashboard shows your 7-day token usage, streak, and the topics you keep tripping on."
            cta={{ href: "/review", label: "Open review →" }}
            mock={<ReviewMock />}
          />

          <FeaturePreview
            delay={100}
            from="right"
            eyebrow="Study scheduler"
            title="Schedule sessions. Finish them. Earn bonus tokens."
            blurb="Set a daily study goal. Every session you complete stacks bonus tokens on top of your plan's daily budget — they never expire, so grinding pays off."
            cta={{ href: "/schedule", label: "Open scheduler →" }}
            mock={<ScheduleMock />}
          />
        </div>
      </section>

      <hr className="rule mx-auto max-w-5xl" />

      {/* COMMON MISTAKES */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal from="right">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="label mb-3">From the tutor's notebook</div>
            <h2 className="font-serif text-3xl font-normal leading-tight text-ink sm:text-4xl">
              Mistakes we watch for.
            </h2>
            <p className="mt-4 text-sm text-muted">
              Every explanation includes a "common mistakes" callout when one
              of these shows up. These are the four most frequent ones across
              the curriculum.
            </p>
          </div>
          <ol className="space-y-6 border-l border-hair pl-6 text-[16px] leading-relaxed text-body">
            <li>
              <div className="meta">#01 · Radicals</div>
              <p className="mt-1">
                Squaring both sides of √(2x + 3) = x and forgetting to check
                for extraneous solutions at the end. Squaring creates fake
                answers roughly half the time on these.
              </p>
            </li>
            <li>
              <div className="meta">#02 · Logarithms</div>
              <p className="mt-1">
                Writing log(x) + log(x − 3) = 1, solving for x = 5 and x = −2,
                then reporting both. x = −2 makes log(x) undefined - the
                answer is x = 5 only.
              </p>
            </li>
            <li>
              <div className="meta">#03 · Related rates</div>
              <p className="mt-1">
                Plugging in numeric values <em>before</em> differentiating. If
                x = 6 goes in first, then dx/dt disappears because you just
                differentiated a constant. Always differentiate first.
              </p>
            </li>
            <li>
              <div className="meta">#04 · Free-body diagrams on inclines</div>
              <p className="mt-1">
                Not tilting the axes. Keep x horizontal on an incline problem
                and you'll spend the next 15 minutes doing trig the hard way.
                Tilt the axes parallel to the ramp and the algebra collapses.
              </p>
            </li>
          </ol>
        </div>
        </Reveal>
      </section>

      <hr className="rule mx-auto max-w-5xl" />

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-5xl px-6 py-16">
        <Reveal from="left">
        <div className="label mb-4">How it works</div>
        <h2 className="font-serif text-4xl font-normal leading-tight text-ink">
          Three steps. Nothing clever.
        </h2>
        <div className="mt-10 max-w-3xl prose-body">
          <p>
            <strong className="text-ink">1.</strong>&nbsp;&nbsp;Go to{" "}
            <a href="/study" className="text-orange underline decoration-orange/40">
              /study
            </a>
            . Pick a topic from the sidebar, or jump straight to the solver.
            Paste a problem. It can be typed, or copy-pasted from a PDF, or
            retyped from a photo - whatever's fastest.
          </p>
          <p className="mt-5">
            <strong className="text-ink">2.</strong>&nbsp;&nbsp;The tutor writes
            back a walkthrough in plain English. It names the concept in the
            first sentence ("This is conservation of momentum"), explains each
            step before doing it, and ends with a one-line takeaway.
          </p>
          <p className="mt-5">
            <strong className="text-ink">3.</strong>&nbsp;&nbsp;Ask follow-up
            questions. The tutor remembers the conversation, so you can drill
            into the step you didn't understand without starting over.
          </p>
        </div>
        </Reveal>
      </section>

      <hr className="rule mx-auto max-w-5xl" />

      {/* COVERAGE - every AP we cover, organized by category */}
      <section id="coverage" className="mx-auto max-w-5xl px-6 py-16">
        <Reveal from="up">
          <div className="label mb-4">Every AP covered</div>
          <h2 className="font-serif text-3xl font-normal leading-tight text-ink sm:text-4xl">
            16 AP courses. One subscription.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] text-body">
            Every AP has a full curriculum overview — units, big ideas,
            essential knowledge, skills, exam weighting — laid out the way
            the College Board organizes it. The AI tutor and all interactive
            tools work across every course from day one.
          </p>
          <p className="mt-3 max-w-2xl text-[14px] text-muted">
            <strong className="text-ink">Content depth is rolling out.</strong>{" "}
            AP Precalculus has the deepest CED sublesson walkthroughs today.
            The rest of the catalog has the full unit structure, exam guide,
            and tutor access — we're publishing more written lessons every
            week.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              label: "Math",
              courses: [
                { name: "AP Precalculus", depth: "Deep CED lessons" },
                { name: "AP Calculus AB", depth: "Structured overview" },
                { name: "AP Calculus BC", depth: "Structured overview" },
                { name: "AP Statistics", depth: "Structured overview" },
              ],
            },
            {
              label: "Science",
              courses: [
                { name: "AP Physics 1", depth: "Structured overview" },
                { name: "AP Physics 2", depth: "Structured overview" },
                { name: "AP Physics C: Mechanics", depth: "Structured overview" },
                { name: "AP Physics C: E & M", depth: "Structured overview" },
                { name: "AP Biology", depth: "Structured overview" },
                { name: "AP Chemistry", depth: "Structured overview" },
                { name: "AP Environmental Science", depth: "Structured overview" },
              ],
            },
            {
              label: "Computer Science",
              courses: [
                { name: "AP Computer Science A", depth: "Structured overview" },
                { name: "AP Computer Science Principles", depth: "Structured overview" },
              ],
            },
            {
              label: "History",
              courses: [
                { name: "AP United States History", depth: "Structured overview" },
                { name: "AP World History: Modern", depth: "Structured overview" },
                { name: "AP European History", depth: "Structured overview" },
              ],
            },
          ].map((group, i) => (
            <Reveal
              key={group.label}
              from={i % 2 === 0 ? "left" : "right"}
              delay={i * 120}
            >
              <div className="card-hover h-full rounded-lg border border-hair bg-paper p-6">
                <div className="label">{group.label}</div>
                <ul className="mt-3 space-y-2">
                  {group.courses.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-start gap-2 text-[15px] text-body"
                    >
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-orange" />
                      <span className="flex-1">
                        {c.name}
                        {c.depth === "Deep CED lessons" && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-orange-tint px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-ink">
                            Deep lessons
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal from="up" delay={200}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button onClick={() => buy("pro-monthly")} disabled={loading} className="btn-primary text-base">
              {loading ? "Opening checkout…" : "Unlock all 16 courses - $16/mo"}
            </button>
            <a href="/study" className="btn-ghost text-base">
              Browse free lessons →
            </a>
          </div>
          <p className="mt-3 text-xs text-muted">
            Free to try. Cancel anytime. Every AP, one subscription.
          </p>
        </Reveal>
      </section>

      <hr className="rule mx-auto max-w-5xl" />

      {/* PRICING */}
      <section id="price" className="mx-auto max-w-6xl px-6 py-20">
        <Reveal from="up">
          <div className="label mb-4">Pricing</div>
          <h2 className="font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">
            Three plans. Cancel anytime.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] text-body">
            Learner is free forever — 10,000 AI tokens a day, every day. Pro
            doubles that with image uploads, the full curriculum for every
            AP course, the Insights dashboard, and a smarter thinking mode.
            Hacker quadruples tokens again with priority traffic and the
            strongest reasoning model on demand.
          </p>
        </Reveal>

        {/* THREE TIER CARDS */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {/* LEARNER */}
          <Reveal from="left" delay={0}>
          <div className="card-hover h-full rounded-xl border border-hair bg-paper p-7">
            <div className="label">Learner</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-6xl font-normal text-ink">$0</span>
              <span className="text-sm text-muted">forever</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              Test the tutor on your real homework. No card required.
            </p>
            <ul className="mt-6 space-y-2 text-[15px] text-body">
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span><strong className="text-ink">10,000 AI tokens / day</strong></span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Smart AI model + full chat history</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Units 1-2 of every AP course + 2 free lessons</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Up to 3 courses added to your study list</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Graphing calc, physics sims, code sandbox</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Book Mode + 8 reading themes</span></li>
            </ul>
            <a
              href="/signin?mode=signup"
              className="btn-ghost mt-7 w-full justify-center text-base"
            >
              Create free account
            </a>
          </div>
          </Reveal>

          {/* PRO - recommended */}
          <Reveal from="up" delay={120}>
          <div className="card-hover relative h-full rounded-xl border-2 border-ink bg-paper p-7 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.35)]">
            <span className="absolute right-4 top-4 animate-bounceIn rounded-full bg-orange px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              Most popular
            </span>
            <div className="label">Pro</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-6xl font-normal text-ink">$11</span>
              <span className="text-sm text-muted">first month</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              <span className="text-dim line-through">$16</span>{" "}
              with <code className="font-mono text-[11px] text-ink">SCORE5</code>,
              then $16/mo. Or <strong className="text-ink">$90</strong>{" "}
              for 6 months.
            </p>
            <ul className="mt-6 space-y-2 text-[15px] text-body">
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Everything in Learner</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span><strong className="text-ink">20,000 AI tokens / day</strong></span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Smart + Thinking model for hard problems</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>All 16 AP courses, every unit, unlimited lessons</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Up to 10 courses added + all interactive tools</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Image uploads, Insights dashboard, review bank</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Scheduler + bonus tokens for completed sessions</span></li>
            </ul>
            <button
              onClick={() => buy("pro-monthly")}
              disabled={loading}
              className="btn-primary mt-7 w-full justify-center text-base disabled:opacity-50"
            >
              {loading ? "Opening checkout…" : "Start Pro - $11 first month"}
            </button>
            <button
              onClick={() => buy("pro-sixmonth")}
              disabled={loading}
              className="mt-2 w-full text-center text-xs text-muted hover:text-ink"
            >
              or $90 for 6 months →
            </button>
          </div>
          </Reveal>

          {/* HACKER */}
          <Reveal from="right" delay={240}>
          <div className="card-hover relative h-full rounded-xl border border-hair bg-gradient-to-b from-amber-50 to-white p-7">
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              <CrownIcon className="h-3 w-3" /> Premium
            </span>
            <div className="label">Hacker</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-6xl font-normal text-ink">$24</span>
              <span className="text-sm text-muted">first month</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              <span className="text-dim line-through">$29</span>{" "}
              with <code className="font-mono text-[11px] text-ink">SCORE5</code>,
              then $29/mo. Or <strong className="text-ink">$160</strong>{" "}
              for 6 months.
            </p>
            <ul className="mt-6 space-y-2 text-[15px] text-body">
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-amber-500" /><span>Everything in Pro</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-amber-500" /><span><strong className="text-ink">80,000 AI tokens / day</strong></span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-amber-500" /><span>Priority AI traffic (skip the queue at peak hours)</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-amber-500" /><span>Strongest reasoning model on demand, always</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-amber-500" /><span>All 16 courses added, no course limit</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-amber-500" /><span>Free image uploads (no 2× token cost)</span></li>
            </ul>
            <button
              onClick={() => buy("hacker-monthly")}
              disabled={loading}
              className="mt-7 w-full rounded-md bg-amber-500 px-4 py-3 text-center text-base font-medium text-white transition hover:bg-amber-600 disabled:opacity-50"
            >
              {loading ? "Opening checkout…" : "Go Hacker - $24 first month"}
            </button>
            <button
              onClick={() => buy("hacker-sixmonth")}
              disabled={loading}
              className="mt-2 w-full text-center text-xs text-muted hover:text-ink"
            >
              or $160 for 6 months →
            </button>
          </div>
          </Reveal>
        </div>

        {/* COMPARISON TABLE */}
        <Reveal from="up">
        <div className="mt-16">
          <div className="label mb-4">Compare plans</div>
          <div className="overflow-x-auto rounded-xl border border-hair bg-paper">
            <table className="w-full min-w-[560px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-hair bg-offwhite">
                  <th className="py-4 pl-6 pr-3 font-normal text-muted">
                    Feature
                  </th>
                  <th className="w-[150px] py-4 text-center font-semibold text-ink">
                    Learner
                  </th>
                  <th className="w-[150px] py-4 text-center font-semibold text-ink">
                    Pro
                  </th>
                  <th className="w-[150px] py-4 text-center font-semibold text-ink">
                    <span className="inline-flex items-center gap-1">
                      <CrownIcon className="h-3.5 w-3.5 text-amber-500" />
                      Hacker
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hair">
                <FeatureRow
                  label="AI tokens per day"
                  values={{ free: "10,000", pro: "20,000", premium: "80,000" }}
                />
                <FeatureRow
                  label="Model strength"
                  values={{ free: "Smart", pro: "Smarter + Thinking", premium: "Advanced + Thinking" }}
                />
                <FeatureRow
                  label="Courses you can add"
                  values={{ free: "3", pro: "10", premium: "Unlimited" }}
                />
                <FeatureRow
                  label="AI chat tutor with persistent history"
                  free
                  pro
                  premium
                />
                <FeatureRow
                  label="Every AP curriculum overview"
                  values={{ free: "Units 1-2", pro: "All units", premium: "All units" }}
                />
                <FeatureRow
                  label="Full lessons"
                  values={{ free: "Overviews only", pro: "Unlimited", premium: "Unlimited" }}
                />
                <FeatureRow
                  label="Practice problems"
                  free
                  pro
                  premium
                />
                <FeatureRow
                  label="Graphing calc, 3D plot, physics sim, code sandbox"
                  free
                  pro
                  premium
                />
                <FeatureRow
                  label="Flashcards + hand-drawn diagrams"
                  free
                  pro
                  premium
                />
                <FeatureRow
                  label="Book Mode reading view + 8 themes"
                  free
                  pro
                  premium
                />
                <FeatureRow
                  label="Lesson highlights + bookmarks"
                  free
                  pro
                  premium
                />
                <FeatureRow
                  label="Insights dashboard (tokens, streak, review bank)"
                  free
                  pro
                  premium
                />
                <FeatureRow
                  label="Image uploads (photos of handwritten work)"
                  pro
                  premium
                />
                <FeatureRow
                  label="Wrong-answer review bank"
                  pro
                  premium
                />
                <FeatureRow
                  label="Scheduler and bonus tokens"
                  pro
                  premium
                />
                <FeatureRow
                  label="Free image uploads "
                  premiumOnly
                  premium
                />
                <FeatureRow
                  label="Priority AI traffic"
                  premiumOnly
                  premium
                />
              </tbody>
            </table>
          </div>
        </div>

        </Reveal>
      </section>



      <hr className="rule mx-auto max-w-5xl" />

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal from="scale">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div>
            <div className="label">FAQ</div>
          </div>
          <div className="space-y-4 text-[16px]">
            {[
              ["Does it work on my phone?", "Yes. The solver works fine on mobile. The diagrams can be a little cramped on small screens - we're working on it."],
              ["Can I use my school Google account?", "Yes. Checkout takes any major credit or debit card. School email sometimes routes receipts to spam, so check there if it doesn't arrive."],
              ["Is this cheating?", "If you paste a problem in, read the explanation, and then do the problem again on your own, no. If you paste it in and copy the answer without reading, that's on you."],
              ["What if the tutor gets something wrong?", "Tell it in the next message and it will correct itself. If you hit a problem in scope where the explanation was genuinely bad, email finalsprephelp@gmail.com and we'll refund the purchase."],
              ["What if I want a refund?", "Reply to your receipt within 7 days. No questions asked."],
              ["How does this compare to a human tutor?", "$16/month is less than one hour with a human tutor, and a real tutor isn't available at 11pm the night before your exam. Use a real tutor for big conceptual gaps; use this for getting unstuck on homework."],
            ].map(([q, a]) => (
              <details key={q} className="group border-b border-hair pb-4">
                <summary className="flex cursor-pointer items-center justify-between py-2 text-ink">
                  <span className="font-medium">{q}</span>
                  <span className="ml-4 text-muted transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 max-w-2xl pr-8 text-body">{a}</p>
              </details>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      <hr className="rule mx-auto max-w-5xl" />

      {/* CLOSING */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal from="up">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">
            Your next exam is <span className="sweep-underline italic">closer</span> than you think.
          </h2>
          <p className="mt-5 text-[17px] text-body">
            It takes less time to paste a problem in than to read the rest
            of this page. Try the free tier first. If it helps, $16/month
            is one click away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/study" className="btn-primary text-base">Open the solver</a>
            <button onClick={() => buy("pro-monthly")} disabled={loading} className="btn-ghost text-base">
              Skip ahead - $16/mo
            </button>
          </div>
        </div>
        </Reveal>
      </section>

      <footer className="border-t border-hair">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} FinalsPrep, Inc.</div>
          <div className="flex gap-4">
            <a href="mailto:finalsprephelp@gmail.com" className="hover:text-ink">finalsprephelp@gmail.com</a>
            <a href="/study" className="hover:text-ink">Study tool</a>
            <a href="#price" className="hover:text-ink">Pricing</a>
            <a href="/privacy" className="hover:text-ink">Privacy</a>
            <a href="/terms" className="hover:text-ink">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeaturePreview({
  eyebrow,
  title,
  blurb,
  cta,
  mock,
  from,
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  cta: { href: string; label: string };
  mock: React.ReactNode;
  from: "left" | "right";
  delay?: number;
}) {
  return (
    <Reveal from={from} delay={delay}>
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hair bg-paper transition-all duration-500 hover:-translate-y-1 hover:border-orange/50 hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.35)]">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-hair bg-offwhite">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(194,65,12,0.10),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.04),transparent_60%)]" />
          <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-[1.02]">
            {mock}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="label">{eyebrow}</div>
          <h3 className="mt-2 font-serif text-2xl font-normal leading-snug text-ink">
            {title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-body">{blurb}</p>
          <a
            href={cta.href}
            className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-orange underline decoration-orange/40 underline-offset-4 hover:decoration-orange"
          >
            {cta.label}
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function MockFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-4 flex flex-col overflow-hidden rounded-lg border border-hair bg-paper shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-1.5 border-b border-hair bg-offwhite px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
        <span className="h-2 w-2 rounded-full bg-green-400/70" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function ChatMock() {
  return (
    <MockFrame>
      <div className="flex h-full">
        <div className="hidden w-28 shrink-0 flex-col gap-1 border-r border-hair bg-offwhite/60 p-2 text-[9px] text-muted sm:flex">
          <div className="rounded bg-orange/15 px-1.5 py-1 text-orange-ink">
            Projectile question
          </div>
          <div className="rounded px-1.5 py-1">Chain rule check</div>
          <div className="rounded px-1.5 py-1">u-sub warm-up</div>
          <div className="rounded px-1.5 py-1">Redox half-cells</div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="space-y-2 overflow-hidden p-3">
            <div className="max-w-[80%] rounded-lg bg-offwhite px-3 py-2 text-[10px] leading-snug text-body">
              A ball is thrown up at 20 m/s. How high does it go?
            </div>
            <div className="ml-auto max-w-[85%] rounded-lg border-l-2 border-orange bg-paper px-3 py-2 text-[10px] leading-snug text-body">
              Call up positive. At the peak, v = 0. Use{" "}
              <span className="italic">v² = v₀² − 2gh</span> → h = v₀² / (2g)
              = 400 / 20 = <strong className="text-ink">20 m</strong>.
            </div>
            <div className="ml-auto max-w-[70%] rounded-lg border-l-2 border-orange bg-paper px-3 py-2 text-[10px] leading-snug text-body">
              <span className="inline-block h-2 w-2 animate-pulseSoft rounded-full bg-orange" />{" "}
              <span className="ml-1">Want the full walkthrough?</span>
            </div>
          </div>
          <div className="mt-auto border-t border-hair p-2">
            <div className="flex items-center gap-1.5 rounded-md border border-hair bg-offwhite px-2 py-1.5 text-[10px] text-muted">
              <span>Ask a follow-up…</span>
              <span className="ml-auto rounded bg-ink/90 px-1.5 py-0.5 text-[9px] text-paper">
                ↵
              </span>
            </div>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function BookMock() {
  return (
    <MockFrame>
      <div className="relative flex h-full items-stretch justify-center bg-gradient-to-b from-offwhite to-paper p-3">
        <div className="relative flex aspect-[4/3] w-full max-w-[220px] flex-col rounded-sm border border-hair bg-paper shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]">
          <div className="absolute inset-y-1 -right-1 w-1.5 rounded-r-sm border border-hair border-l-0 bg-offwhite opacity-70" />
          <div className="absolute inset-y-2 -right-2.5 w-1.5 rounded-r-sm border border-hair border-l-0 bg-offwhite opacity-40" />
          <div className="border-b border-hair px-3 py-2 text-center">
            <div className="text-[7px] uppercase tracking-[0.22em] text-muted">
              AP Calc BC · Unit 6
            </div>
            <div className="mt-0.5 font-serif text-[13px] text-ink">
              Integration by Parts
            </div>
          </div>
          <div className="flex-1 space-y-1 px-4 py-3">
            <div className="h-1.5 w-[85%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[92%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[78%] rounded-full bg-ink/10" />
            <div className="my-2 rounded bg-offwhite px-2 py-1 text-center font-serif text-[10px] italic text-ink">
              ∫ u dv = uv − ∫ v du
            </div>
            <div className="h-1.5 w-[88%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[70%] rounded-full bg-ink/10" />
          </div>
          <div className="flex items-center justify-between border-t border-hair px-3 py-1.5 font-serif text-[8px] italic text-muted">
            <span>← Previous</span>
            <span>Page 3 of 7</span>
            <span>Next →</span>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function StudyMock() {
  return (
    <MockFrame>
      <div className="flex h-full">
        <div className="w-[38%] shrink-0 border-r border-hair bg-offwhite/70 p-2 text-[9px]">
          <div className="text-[7px] font-semibold uppercase tracking-[0.18em] text-orange-ink/80">
            Unit 1
          </div>
          <div className="font-serif text-[11px] text-ink">Kinematics</div>
          <div className="mt-2 space-y-0.5 border-l border-orange/40 pl-2">
            <div className="flex items-center gap-1 text-orange">
              <span className="h-1 w-1 rounded-full bg-orange" />
              <span>1.1 Motion</span>
            </div>
            <div className="flex items-center gap-1 text-muted">
              <span className="h-1 w-1 rounded-full bg-ink/30" />
              <span>1.2 Vectors</span>
            </div>
            <div className="flex items-center gap-1 text-muted">
              <span className="h-1 w-1 rounded-full bg-ink/30" />
              <span>1.3 Projectile</span>
              <span className="ml-auto text-green-700">✓</span>
            </div>
          </div>
          <div className="mt-3 text-[7px] font-semibold uppercase tracking-[0.18em] text-orange-ink/80">
            Unit 2
          </div>
          <div className="font-serif text-[11px] text-ink">Forces</div>
        </div>
        <div className="min-w-0 flex-1 p-3">
          <div className="text-[7px] uppercase tracking-wider text-muted">
            Unit 1 · Exam weight 12–18%
          </div>
          <div className="font-serif text-[12px] text-ink">
            Kinematics in one dimension
          </div>
          <div className="mt-2 flex gap-3 border-b border-hair text-[9px]">
            <span className="-mb-px border-b-2 border-orange py-1 text-ink">
              Overview
            </span>
            <span className="py-1 text-muted">Practice</span>
            <span className="py-1 text-muted">Interactive</span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-[95%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[88%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[72%] rounded-full bg-ink/10" />
          </div>
          <div className="mt-3 rounded border border-hair bg-offwhite p-2 text-[8.5px] text-body">
            <span className="font-semibold text-ink">Big idea.</span> Position,
            velocity, and acceleration are each the derivative of the last.
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function ToolsMock() {
  return (
    <MockFrame>
      <div className="flex h-full flex-col gap-2 p-3">
        <div className="flex items-center gap-1.5 text-[9px] text-muted">
          <span className="rounded border border-hair bg-offwhite px-1.5 py-0.5 text-ink">
            Graph 2D
          </span>
          <span className="rounded border border-hair px-1.5 py-0.5">
            3D
          </span>
          <span className="rounded border border-hair px-1.5 py-0.5">
            Physics
          </span>
          <span className="rounded border border-hair px-1.5 py-0.5">
            Java
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden rounded-md border border-hair bg-paper">
          <svg
            viewBox="0 0 200 120"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="g" width="20" height="15" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V15" fill="none" stroke="rgb(var(--hair))" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="200" height="120" fill="url(#g)" />
            <line x1="0" y1="60" x2="200" y2="60" stroke="rgb(var(--rule))" strokeWidth="0.7" />
            <line x1="100" y1="0" x2="100" y2="120" stroke="rgb(var(--rule))" strokeWidth="0.7" />
            <path
              d="M10 115 Q 100 -40 190 115"
              fill="none"
              stroke="rgb(var(--orange))"
              strokeWidth="1.5"
            />
            <path
              d="M10 60 C 40 30, 70 90, 100 60 S 160 30, 190 60"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
            <circle cx="100" cy="15" r="2.2" fill="rgb(var(--orange))" />
          </svg>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-hair bg-offwhite px-2 py-1.5 font-mono text-[9px] text-ink">
          <span className="text-muted">f(x) =</span>
          <span>-x² + 100</span>
          <span className="ml-auto text-muted">g(x) = sin(x/20)·30 + 60</span>
        </div>
      </div>
    </MockFrame>
  );
}

function ReviewMock() {
  return (
    <MockFrame>
      <div className="flex h-full flex-col p-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[8px] uppercase tracking-wider text-muted">
              Token usage · last 7 days
            </div>
            <div className="font-serif text-[13px] text-ink">
              42,180 tokens
            </div>
          </div>
          <div className="text-right">
            <div className="text-[8px] uppercase tracking-wider text-muted">
              Streak
            </div>
            <div className="font-serif text-[13px] text-orange">5 days</div>
          </div>
        </div>
        <div className="mt-2 flex h-12 items-end gap-1">
          {[8, 14, 11, 18, 9, 16, 22].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-orange/70"
              style={{ height: `${(h / 22) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-3 text-[8px] uppercase tracking-wider text-muted">
          Review bank · topics to revisit
        </div>
        <div className="mt-1 space-y-1">
          <div className="flex items-center justify-between rounded border border-hair px-2 py-1 text-[10px] text-body">
            <span>Related rates — ladder problem</span>
            <span className="text-orange-ink">retry</span>
          </div>
          <div className="flex items-center justify-between rounded border border-hair px-2 py-1 text-[10px] text-body">
            <span>Gibbs free energy sign convention</span>
            <span className="text-orange-ink">retry</span>
          </div>
          <div className="flex items-center justify-between rounded border border-hair px-2 py-1 text-[10px] text-body">
            <span>Projectile — range formula</span>
            <span className="text-green-700">✓ fixed</span>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function ScheduleMock() {
  return (
    <MockFrame>
      <div className="flex h-full flex-col p-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[8px] uppercase tracking-wider text-muted">
              Today · April 17
            </div>
            <div className="font-serif text-[13px] text-ink">
              45 / 60 min studied
            </div>
          </div>
          <div className="text-[10px] text-orange-ink">
            <span className="font-semibold">+800</span> bonus tokens earned
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-offwhite">
          <div className="h-full rounded-full bg-orange" style={{ width: "75%" }} />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2 rounded border border-hair bg-offwhite px-2 py-1.5 text-[10px]">
            <span className="h-4 w-4 rounded bg-green-100 text-center text-green-700">
              ✓
            </span>
            <span className="text-muted line-through">Calc BC · 6.3 Integration</span>
            <span className="ml-auto text-[9px] text-muted">20m</span>
          </div>
          <div className="flex items-center gap-2 rounded border border-hair bg-offwhite px-2 py-1.5 text-[10px]">
            <span className="h-4 w-4 rounded bg-green-100 text-center text-green-700">
              ✓
            </span>
            <span className="text-muted line-through">Physics 1 · review bank</span>
            <span className="ml-auto text-[9px] text-muted">25m</span>
          </div>
          <div className="flex items-center gap-2 rounded border border-orange/40 bg-orange-tint px-2 py-1.5 text-[10px] text-orange-ink">
            <span className="h-4 w-4 rounded border border-orange/40 bg-paper text-center">
              ·
            </span>
            <span>Chem · FRQ warm-up</span>
            <span className="ml-auto text-[9px]">15m</span>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function CrownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M1.5 4.5 4 8l3-5 1 2 1-2 3 5 2.5-3.5L14 12H2L1.5 4.5Zm.8 9h11.4v1H2.3v-1Z" />
    </svg>
  );
}

type FeatureRowProps = {
  label: string;
  free?: boolean;
  pro?: boolean;
  premium?: boolean;
  premiumOnly?: boolean;
  values?: { free: string; pro: string; premium: string };
};

function FeatureRow({ label, free, pro, premium, premiumOnly, values }: FeatureRowProps) {
  return (
    <tr>
      <td className="py-3 pl-6 pr-3 text-body">
        {premiumOnly && (
          <CrownIcon className="mr-1 inline h-3.5 w-3.5 text-amber-500" />
        )}
        {label}
      </td>
      <FeatureCell on={!!free} value={values?.free} />
      <FeatureCell on={!!pro} value={values?.pro} />
      <FeatureCell on={!!premium} value={values?.premium} />
    </tr>
  );
}

function FeatureCell({ on, value }: { on: boolean; value?: string }) {
  if (value) {
    return (
      <td className="py-3 text-center font-medium text-ink">{value}</td>
    );
  }
  return (
    <td className="py-3 text-center">
      {on ? (
        <span
          aria-label="Included"
          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700"
        >
          ✓
        </span>
      ) : (
        <span
          aria-label="Not included"
          className="inline-flex h-5 w-5 items-center justify-center text-muted"
        >
          ×
        </span>
      )}
    </td>
  );
}
