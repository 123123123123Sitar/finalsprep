"use client";
import { useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import Reveal from "@/app/components/Reveal";
import { useAuth } from "@/app/components/AuthProvider";

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

export default function Home() {
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

  async function buy(planKind: "monthly" | "sixmonth" = "monthly") {
    setLoading(true);
    try {
      const token = await getIdToken();
      if (!token) {
        // Not signed in - send them through signin first
        window.location.href = `/signin?next=${encodeURIComponent("/?plan=" + planKind)}`;
        return;
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: planKind === "sixmonth" ? "pro-sixmonth" : "pro-monthly" }),
      });
      const { url, error } = await res.json();
      if (url) window.location.href = url;
      else alert(error || "Checkout isn't wired up yet - set Stripe price IDs in env.");
    } finally {
      setLoading(false);
    }
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
      if (!res.ok) throw new Error("Server error");
      setCaptured("ok");
      setCaptureMsg("Sent. If you don't see it in a minute, check your spam folder.");
    } catch {
      setCaptured("err");
      setCaptureMsg("Couldn't send right now. Try again in a moment?");
    }
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav sticky>
        <a href="/chat" className="nav-link">Chat</a>
        <a href="/study" className="nav-link">Study</a>
        <a href="#coverage" className="nav-link hidden sm:inline">Coverage</a>
        <a href="#price" className="nav-link hidden sm:inline">Pricing</a>
        <button onClick={() => buy("monthly")} className="btn-primary">Get Pro - $16/mo</button>
      </SiteNav>

      {/* TOP BANNER - real urgency */}
      <div className="animate-slideDown border-b border-hair bg-orange-tint">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 px-6 py-2 text-xs text-orange-ink">
          <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-orange" />
          Finals &amp; AP exams: <strong className="font-semibold">May 5 - June 10</strong>. Every week you wait is 7% of your prep time.
        </div>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-24 sm:pt-28">
        <div className="max-w-3xl">
          <div className="label mb-6">For high school &amp; college students</div>
          <h1 className="font-serif text-[52px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[76px]">
            Step-by-step answers<br />
            for <span className="italic">every</span> math problem.
          </h1>
          <p className="mt-8 max-w-2xl text-[19px] leading-relaxed text-body">
            Instant walkthroughs for algebra, calculus, physics, biology,
            chemistry, computer science, and history - the concept, the
            reasoning, and the common mistakes, not just the final answer.
            Free to try. <strong className="text-ink">$16/month</strong> or{" "}
            <strong className="text-ink">$90/6 months</strong> for unlimited.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button onClick={() => buy("monthly")} disabled={loading} className="btn-primary text-base">
              {loading ? "Opening checkout…" : "Start Pro - $16/month"}
            </button>
            <a href="#try" className="btn-ghost text-base">
              Try 3 free right here ↓
            </a>
          </div>
          <p className="mt-4 max-w-xl text-sm text-muted">
            All curated walkthroughs are free. Plus a free chat budget that
            replenishes every 5 hours - try the tutor on your real homework
            with no signup. Upgrade for unlimited.
          </p>
        </div>

        {/* social proof strip */}
        <div className="mt-16 border-y border-hair py-6">
          <div className="grid gap-4 text-center sm:grid-cols-4">
            <div>
              <div className="font-serif text-3xl text-ink">21</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted">
                Worked problems, free
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl text-ink">4</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted">
                Subjects covered
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl text-ink">&lt;10s</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted">
                Average walkthrough
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl text-ink">7 days</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted">
                No-questions refund
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule mx-auto max-w-5xl" />

      {/* LIVE SOLVER - real working AI on the landing page */}
      <section id="try" className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div>
            <div className="label">Try it right here</div>
            <p className="mt-3 text-sm text-muted">
              A real explanation, right now, with no signup. Pick an example
              or type your own. Our curated problems are always free. New
              problems share a token budget that refills every 5 hours.
            </p>
            <div className="mt-4 text-xs text-muted">
              {demoTokensRemaining === null
                ? "Free budget refills every 5h"
                : demoTokensRemaining === 0
                ? `Out of free budget${
                    demoResetMinutes
                      ? ` · resets in ${formatMinutes(demoResetMinutes)}`
                      : ""
                  }`
                : `${demoTokensRemaining.toLocaleString()} tokens left this 5h window`}
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
                      className="rounded-full border border-hair bg-white px-3 py-1 text-xs text-ink transition-colors hover:border-orange hover:bg-orange-tint hover:text-orange-ink disabled:opacity-50"
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
                  className="focus-ring w-full rounded-lg border border-hair bg-white px-5 py-4 font-mono text-[14px] leading-6 text-ink placeholder-dim"
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
                  <button onClick={() => buy("monthly")} className="btn-link mt-2">
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
                        · {demoTokensRemaining.toLocaleString()} tokens left this 5h
                      </span>
                    )}
                  </div>
                </div>
                <pre className="whitespace-pre-wrap font-sans">{demoResult}</pre>
                <div className="mt-5 text-sm">
                  <button onClick={() => buy("monthly")} className="btn-link">
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

      {/* WHAT THIS IS NOT */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal from="left">
        <div className="max-w-3xl">
          <div className="label mb-4">One-minute honesty</div>
          <h2 className="font-serif text-4xl font-normal leading-tight text-ink">
            What this is <span className="italic">not</span>.
          </h2>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="prose-body">
            <p>
              <strong className="text-ink">It's not Photomath.</strong> Photomath
              shows the answer. FinalsPrep shows the reasoning - which is what
              you actually need if you have to do the problem yourself on an
              exam next week.
            </p>
            <p className="mt-5">
              <strong className="text-ink">It's not a general chatbot.</strong>{" "}
              General assistants hallucinate on harder problems, especially
              physics with unit conversions. FinalsPrep is tuned specifically
              for math and physics pedagogy, and refuses out-of-scope
              questions instead of making something up.
            </p>
          </div>
          <div className="prose-body">
            <p>
              <strong className="text-ink">It's not one subject.</strong>{" "}
              One subscription covers every AP in the catalog: all four math
              APs, all four physics APs, biology, chemistry, environmental
              science, both computer science courses, and three history APs.
              Whatever you're taking is already in here.
            </p>
            <p className="mt-5">
              <strong className="text-ink">It's less than a single tutoring
              session.</strong>{" "}
              $16/month is less than one hour with a human tutor and much
              less than a Barron's prep book. The 6-month plan works out to
              $15/month and covers an entire semester of finals.
            </p>
          </div>
        </div>
        </Reveal>
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
          16 AP courses. One price.
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] text-body">
          Whatever you're taking, it's in here. Math, science, computer
          science, history - every lesson structured around the official
          College Board unit numbering so you always know where you are.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              label: "Math",
              courses: [
                "AP Precalculus",
                "AP Calculus AB",
                "AP Calculus BC",
                "AP Statistics",
              ],
            },
            {
              label: "Science",
              courses: [
                "AP Physics 1",
                "AP Physics 2",
                "AP Physics C: Mechanics",
                "AP Physics C: Electricity & Magnetism",
                "AP Biology",
                "AP Chemistry",
                "AP Environmental Science",
              ],
            },
            {
              label: "Computer Science",
              courses: ["AP Computer Science A", "AP Computer Science Principles"],
            },
            {
              label: "History",
              courses: [
                "AP United States History",
                "AP World History: Modern",
                "AP European History",
              ],
            },
          ].map((group) => (
            <div
              key={group.label}
              className="rounded-lg border border-hair bg-white p-6"
            >
              <div className="label">{group.label}</div>
              <ul className="mt-3 space-y-2">
                {group.courses.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[15px] text-body">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-orange" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button onClick={() => buy("monthly")} disabled={loading} className="btn-primary text-base">
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
      <section id="price" className="mx-auto max-w-5xl px-6 py-20">
        <Reveal from="right">
        <div className="label mb-4">Pricing</div>
        <h2 className="font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">
          Two plans. Cancel anytime.
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] text-body">
          The free tier gives you 3-5 chat messages every 5 hours - enough
          to try the tutor on your actual homework. For unlimited access,
          pick a plan:
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* Monthly */}
          <div className="rounded-xl border border-hair bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-rule hover:shadow-[0_14px_36px_-22px_rgba(10,10,10,0.22)]">
            <div className="label">Monthly</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-6xl font-normal text-ink">$16</span>
              <span className="text-sm text-muted">/ month</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              Cancel anytime. Good for finals week or a single AP exam.
            </p>
            <ul className="mt-6 space-y-2 text-[15px] text-body">
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Unlimited AI walkthroughs on any problem</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Curriculum walkthroughs + practice for every unit</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Interactive tools: graphing, physics sims, code runners</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>All 16 AP courses, one subscription</span></li>
            </ul>
            <button
              onClick={() => buy("monthly")}
              disabled={loading}
              className="btn-primary mt-7 w-full justify-center text-base disabled:opacity-50"
            >
              {loading ? "Opening checkout…" : "Start monthly - $16"}
            </button>
          </div>

          {/* 6-month - recommended */}
          <div className="relative rounded-xl border-2 border-ink bg-white p-7 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5">
            <span className="absolute right-4 top-4 rounded-full bg-orange px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              Save $6
            </span>
            <div className="label">6 months</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-6xl font-normal text-ink">$90</span>
              <span className="text-sm text-muted">/ 6 months</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              Works out to <strong className="text-ink">$15/month</strong>.
              Covers a full semester of finals and AP exam prep.
            </p>
            <ul className="mt-6 space-y-2 text-[15px] text-body">
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Everything in Monthly</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Covers an entire semester</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Lock in the price for 6 months</span></li>
              <li className="flex gap-2"><span className="mt-[8px] h-1 w-1 rounded-full bg-orange" /><span>Cancel anytime, prorated refund</span></li>
            </ul>
            <button
              onClick={() => buy("sixmonth")}
              disabled={loading}
              className="btn-primary mt-7 w-full justify-center text-base disabled:opacity-50"
            >
              {loading ? "Opening checkout…" : "Start 6 months - $90"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted">
          Stripe handles checkout. Cancel from your receipt email in one
          click. Free plan stays free - no credit card required to try.
        </p>
        </Reveal>
      </section>

      <hr className="rule mx-auto max-w-5xl" />

      {/* EMAIL CAPTURE */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal from="left">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="label mb-3">Free cheat sheet</div>
            <h3 className="font-serif text-2xl font-normal leading-tight text-ink">
              Not ready to buy? Grab the formulas sheet.
            </h3>
            <p className="mt-3 text-sm text-muted">
              One-page PDF. The 40-ish formulas from algebra through calc
              every student should know cold before an exam. No spam after -
              at most one follow-up email two weeks before finals week.
            </p>
          </div>
          <form onSubmit={capture} className="flex flex-col gap-3 self-end sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (captured !== "idle") setCaptured("idle");
              }}
              placeholder="you@school.edu"
              className="focus-ring h-12 w-full rounded-md border border-hair bg-white px-4 text-ink placeholder-dim"
              aria-label="Email address"
              aria-invalid={captured === "err"}
            />
            <button type="submit" className="btn-primary h-12 whitespace-nowrap">
              Send me the PDF
            </button>
          </form>
        </div>
        {captured !== "idle" && (
          <p className={`mt-3 text-sm ${captured === "ok" ? "text-orange-ink" : "text-red-700"}`}>
            {captureMsg}
          </p>
        )}
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
              ["Can I use my school Google account?", "Yes. Checkout is standard Stripe, so any email works. School email sometimes routes receipts to spam."],
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
            Your next exam is closer than you think.
          </h2>
          <p className="mt-5 text-[17px] text-body">
            It takes less time to paste a problem in than to read the rest
            of this page. Try the free tier first. If it helps, $16/month
            is one click away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/study" className="btn-primary text-base">Open the solver</a>
            <button onClick={() => buy("monthly")} disabled={loading} className="btn-ghost text-base">
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
