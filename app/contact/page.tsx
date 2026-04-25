"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";

type InquiryType =
  | "support"
  | "report-issue"
  | "billing"
  | "general"
  | "feature-request"
  | "corporate";

type InquiryOption = {
  value: InquiryType;
  label: string;
  hint: string;
};

const INQUIRY_OPTIONS: InquiryOption[] = [
  {
    value: "support",
    label: "Customer support",
    hint: "Account access, login trouble, features not behaving as expected.",
  },
  {
    value: "report-issue",
    label: "Report an issue",
    hint: "A bug, a wrong answer from the tutor, or a broken lesson.",
  },
  {
    value: "billing",
    label: "Billing & refunds",
    hint: "Payment problems, plan changes, or refund requests.",
  },
  {
    value: "general",
    label: "General inquiry",
    hint: "A question that doesn't fit the other categories.",
  },
  {
    value: "feature-request",
    label: "Feature request",
    hint: "Something you'd like FinalsPrep to do that it doesn't yet.",
  },
  {
    value: "corporate",
    label: "Corporate / partnerships",
    hint: "School districts, tutoring programs, press, and partnership inquiries.",
  },
];

const QUERY_ALIASES: Record<string, InquiryType> = {
  support: "support",
  issue: "report-issue",
  bug: "report-issue",
  billing: "billing",
  refund: "billing",
  general: "general",
  feature: "feature-request",
  corporate: "corporate",
  partnership: "corporate",
  press: "corporate",
};

function isInquiryType(v: string | null): v is InquiryType {
  return (
    v === "support" ||
    v === "report-issue" ||
    v === "billing" ||
    v === "general" ||
    v === "feature-request" ||
    v === "corporate"
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactPageSkeleton />}>
      <ContactPageInner />
    </Suspense>
  );
}

function ContactPageSkeleton() {
  return (
    <main className="bg-paper text-body">
      <SiteNav />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="label mb-3">Contact</div>
        <div className="h-16 w-3/4 animate-pulse rounded bg-hair/40" />
        <div className="mt-8 h-64 animate-pulse rounded bg-hair/30" />
      </section>
    </main>
  );
}

function ContactPageInner() {
  const { user } = useAuth();
  const params = useSearchParams();
  const initialTopic = (() => {
    const raw = params.get("topic");
    if (!raw) return "support" as InquiryType;
    if (isInquiryType(raw)) return raw;
    return QUERY_ALIASES[raw] ?? ("support" as InquiryType);
  })();

  const [inquiryType, setInquiryType] = useState<InquiryType>(initialTopic);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<
    | { kind: "ok"; id?: string }
    | { kind: "err"; text: string }
    | null
  >(null);

  // Prefill name + email if signed in.
  useEffect(() => {
    if (user) {
      if (!email && user.email) setEmail(user.email);
      const display = (user.displayName || "").trim();
      if (!name && display) setName(display);
    }
    // We intentionally don't overwrite fields the user has already typed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const selected = useMemo(
    () => INQUIRY_OPTIONS.find((o) => o.value === inquiryType)!,
    [inquiryType]
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setResult(null);

    const payload = {
      inquiryType,
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      subject: subject.trim(),
      message: message.trim(),
      website, // honeypot
    };

    if (!payload.name) {
      return setResult({ kind: "err", text: "Add your name." });
    }
    if (!payload.email) {
      return setResult({ kind: "err", text: "Add an email so we can reply." });
    }
    if (!payload.subject) {
      return setResult({ kind: "err", text: "Add a short subject." });
    }
    if (payload.message.length < 10) {
      return setResult({
        kind: "err",
        text: "Describe the issue in a few sentences.",
      });
    }

    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setResult({
          kind: "err",
          text: data?.error || "Could not send message. Try again.",
        });
      } else {
        setResult({ kind: "ok", id: data?.id });
        // Clear the content fields but keep identity to make follow-ups easy.
        setSubject("");
        setMessage("");
        setCompany("");
      }
    } catch {
      setResult({
        kind: "err",
        text: "Network error. Check your connection and try again.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="label mb-3">Contact</div>
        <h1 className="font-serif text-[42px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
          Talk to a human at FinalsPrep.
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] text-body">
          Pick the category that best matches what you need and we'll route
          your message to the right person. Most replies go out within a
          business day.
        </p>

        {result?.kind === "ok" ? (
          <div className="mt-10 rounded-lg border border-hair bg-paper p-6">
            <div className="label mb-2">Message sent</div>
            <h2 className="font-serif text-2xl text-ink">
              Thanks, we've got it.
            </h2>
            <p className="mt-2 text-[15px] text-body">
              We'll reply to <strong className="text-ink">{email}</strong>{" "}
              within one business day.
            </p>
            <button
              onClick={() => setResult(null)}
              className="btn-ghost mt-5 inline-flex text-sm"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10 space-y-5">
            <div>
              <label
                htmlFor="inquiryType"
                className="mb-2 block text-sm font-medium text-ink"
              >
                What can we help with?
              </label>
              <select
                id="inquiryType"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                className="focus-ring h-12 w-full rounded-md border border-hair bg-paper px-3 text-ink"
              >
                {INQUIRY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-muted">{selected.hint}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus-ring h-12 w-full rounded-md border border-hair bg-paper px-3 text-ink placeholder-dim"
                  placeholder="Ada Lovelace"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus-ring h-12 w-full rounded-md border border-hair bg-paper px-3 text-ink placeholder-dim"
                  placeholder="you@school.edu"
                />
              </div>
            </div>

            {inquiryType === "corporate" && (
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Organization
                </label>
                <input
                  id="company"
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="focus-ring h-12 w-full rounded-md border border-hair bg-paper px-3 text-ink placeholder-dim"
                  placeholder="School / district / company"
                />
                <p className="mt-2 text-xs text-muted">
                  Optional, but it helps us route press, school-district, and
                  partnership requests to the right person.
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={200}
                className="focus-ring h-12 w-full rounded-md border border-hair bg-paper px-3 text-ink placeholder-dim"
                placeholder="Short summary (e.g. can't sign in with Google)"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Details
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                maxLength={5000}
                className="focus-ring w-full rounded-md border border-hair bg-paper px-3 py-3 text-ink placeholder-dim"
                placeholder={
                  inquiryType === "report-issue"
                    ? "What did you do, what did you expect, and what actually happened? Include any error text."
                    : inquiryType === "billing"
                      ? "Order ID, plan, and what happened. If it's a refund, include the reason."
                      : inquiryType === "corporate"
                        ? "Tell us about your organization, the fit you see, and ideal next steps."
                        : "Share the details you'd tell a friend. The more specific, the faster we can help."
                }
              />
              <p className="mt-1 text-right text-xs text-muted">
                {message.length}/5000
              </p>
            </div>

            {/* Honeypot — visually hidden from humans, visible to bots. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {result?.kind === "err" && (
              <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {result.text}
              </div>
            )}

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={busy}
                className="btn-primary h-12 disabled:opacity-50"
              >
                {busy ? "Sending…" : "Send message"}
              </button>
              <p className="text-xs text-muted">
                We read everything. Replies to{" "}
                <span className="text-ink">{email || "your email"}</span>.
              </p>
            </div>
          </form>
        )}

        <div className="mt-16 border-t border-hair pt-10">
          <h3 className="font-serif text-xl text-ink">Before you write</h3>
          <ul className="mt-3 space-y-2 text-[15px] text-body">
            <li className="flex gap-2">
              <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-orange" />
              <span>
                Login trouble? Try signing out and back in. If the page says
                sign-in is temporarily unavailable, pick{" "}
                <em>Customer support</em> above.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-orange" />
              <span>
                Got a wrong answer from the tutor? Tell it in the next
                message and it usually corrects itself. If it doesn't, pick{" "}
                <em>Report an issue</em> and paste the question.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-orange" />
              <span>
                Billing questions get fastest turnaround when you include the
                order ID from your confirmation email.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
