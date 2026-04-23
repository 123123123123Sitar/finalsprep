"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import SiteNav from "@/app/components/SiteNav";
import { LogoMark } from "@/app/components/Logo";

/**
 * Admin-only Instagram post generator. Each template renders at exact
 * 1080x1350 (the portrait Feed size that performs best) so a screenshot
 * of the fullscreen view becomes a ready-to-post asset. Scaled-down
 * previews live in a grid; click a card to open it 1:1 on a blank canvas.
 *
 * Edit copy inline via the "Edit" toggle — changes don't persist, they
 * just make it easy to tweak a single post before screenshotting.
 */

const POST_W = 1080;
const POST_H = 1350;

type PostId = string;

type Post = {
  id: PostId;
  label: string;
  render: (editing: boolean) => React.ReactNode;
};

function Editable({
  children,
  editing,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  editing: boolean;
  className?: string;
  as?: any;
}) {
  return (
    <As
      className={className}
      contentEditable={editing}
      suppressContentEditableWarning
      spellCheck={false}
    >
      {children}
    </As>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`grid h-12 w-12 place-items-center rounded-xl ${
          light ? "bg-white/15 text-white" : "bg-orange/10 text-orange-ink"
        }`}
      >
        <LogoMark size={24} />
      </div>
      <div className={light ? "text-white" : "text-ink"}>
        <div className="text-[20px] font-semibold leading-none">FinalsPrep</div>
        <div className={`mt-1 text-[14px] ${light ? "text-white/60" : "text-muted"}`}>
          finalsprep.com
        </div>
      </div>
    </div>
  );
}

function Dots({ light = false }: { light?: boolean }) {
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${light ? "bg-white/50" : "bg-ink/40"}`}
        />
      ))}
    </div>
  );
}

// ---------- Navy/orange palette used by the carousel ----------
const NAVY = "#0B1A3D";
const NAVY_2 = "#152A52";
const NAVY_3 = "#1F3566";
const ORANGE_HEX = "#F97316";

// ---------- Shared UI mockups reused across posts ----------

/** Safari-style window chrome around a block of content. */
function BrowserFrame({
  children,
  dark = false,
  url = "finalsprep.com/study",
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border shadow-xl ${
        dark
          ? "border-white/10 bg-[#0f172a]"
          : "border-hair bg-white"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 border-b px-5 py-3 ${
          dark ? "border-white/5 bg-white/[0.03]" : "border-hair bg-[#fafafa]"
        }`}
      >
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <div
          className={`mx-auto rounded-md px-3 py-1 text-[13px] ${
            dark ? "bg-white/5 text-white/60" : "bg-white text-muted"
          }`}
        >
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

/** Chat-style message row. role=user → orange pill; role=assistant → card. */
function ChatBubble({
  role,
  children,
  dark = false,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
  dark?: boolean;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[78%] rounded-[22px] rounded-tr-md px-6 py-4 text-[22px] leading-[1.35] text-white"
          style={{ background: ORANGE_HEX }}
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <div
        className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white"
        style={{ background: ORANGE_HEX }}
      >
        <LogoMark size={16} />
      </div>
      <div
        className={`max-w-[82%] rounded-[22px] rounded-tl-md border px-6 py-5 text-[22px] leading-[1.35] ${
          dark
            ? "border-white/10 bg-white/[0.06] text-white"
            : "border-hair bg-white text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/** Labeled reasoning step block (Concept / Step 1 / Common mistake). */
function StepCard({
  label,
  children,
  accent = "orange",
  dark = false,
}: {
  label: string;
  children: React.ReactNode;
  accent?: "orange" | "sky" | "emerald" | "red";
  dark?: boolean;
}) {
  const accentColors: Record<string, string> = {
    orange: ORANGE_HEX,
    sky: "#0ea5e9",
    emerald: "#10b981",
    red: "#ef4444",
  };
  const ac = accentColors[accent];
  return (
    <div
      className={`rounded-2xl border p-6 ${
        dark ? "border-white/10 bg-white/[0.04]" : "border-hair bg-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <div
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: ac }}
        />
        <div
          className={`text-[13px] font-semibold uppercase tracking-[0.16em] ${
            dark ? "text-white/65" : "text-muted"
          }`}
          style={{ color: ac }}
        >
          {label}
        </div>
      </div>
      <div className={`mt-3 text-[22px] leading-[1.4] ${dark ? "text-white/90" : "text-body"}`}>
        {children}
      </div>
    </div>
  );
}

/** Mini voice-activity bar visualization. */
function WaveformBars({ color = "#fff" }: { color?: string }) {
  const heights = [20, 38, 54, 72, 90, 64, 42, 28, 50, 74, 92, 58, 34, 22, 46];
  return (
    <div className="flex items-end gap-1.5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full"
          style={{ height: `${h}%`, background: color, opacity: 0.65 + (i % 3) * 0.1 }}
        />
      ))}
    </div>
  );
}

/** iPhone-frame mockup with children inside. */
function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[56px] border-8 border-[#1a1a1f] bg-[#0b0f1a] shadow-2xl ${className}`}
      style={{ aspectRatio: "9/19" }}
    >
      <div className="absolute left-1/2 top-2.5 z-10 h-7 w-32 -translate-x-1/2 rounded-full bg-black" />
      {children}
    </div>
  );
}

// ---------- Templates ----------

function VoiceTutorPost({ editing }: { editing: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0f1a] text-white">
      {/* Orb backdrop */}
      <div className="absolute -right-32 -top-32 h-[720px] w-[720px] rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 opacity-60 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-pink-500 opacity-30 blur-3xl" />

      <div className="relative flex h-full flex-col justify-between p-20">
        <div className="flex items-start justify-between">
          <Brand light />
          <div className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[14px] font-medium text-white/80">
            NEW
          </div>
        </div>

        <div>
          <Editable
            editing={editing}
            as="div"
            className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-[15px] font-medium tracking-wide text-white/80"
          >
            VOICE TUTOR
          </Editable>
          <Editable
            editing={editing}
            as="h1"
            className="font-serif text-[96px] font-normal leading-[1.02] tracking-tight"
          >
            Just
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-fuchsia-300 to-amber-200">
              ask it
            </span>
            <br />
            out loud.
          </Editable>
          <Editable
            editing={editing}
            as="p"
            className="mt-8 max-w-[800px] text-[28px] leading-[1.3] text-white/70"
          >
            Your AP tutor now listens, thinks, and talks back.
          </Editable>

          {/* Mock chat bubbles showing voice → AI reply */}
          <div className="mt-10 space-y-4">
            <ChatBubble role="user" dark>
              <Editable editing={editing} as="span">
                Why does dy/dx become negative here?
              </Editable>
            </ChatBubble>
            <ChatBubble role="assistant" dark>
              <Editable editing={editing} as="span">
                Because y is decreasing as x grows — the slope is
                literally negative. Let me show you…
              </Editable>
            </ChatBubble>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div
              className="grid h-16 w-16 place-items-center rounded-full text-white"
              style={{ background: ORANGE_HEX }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="h-12 w-44">
              <WaveformBars color="#fff" />
            </div>
          </div>
          <Dots light />
        </div>
      </div>
    </div>
  );
}

function CountdownPost({ editing }: { editing: boolean }) {
  return (
    <div className="relative h-full w-full bg-orange-tint">
      {/* Grid paper feel */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,45,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,45,10,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-20">
        <div className="flex items-start justify-between">
          <Brand />
          <Editable
            editing={editing}
            as="div"
            className="rounded-full border border-orange/40 bg-white px-5 py-2 text-[16px] font-medium text-orange-ink"
          >
            AP EXAMS 2026
          </Editable>
        </div>

        <div>
          <Editable
            editing={editing}
            as="div"
            className="mb-2 text-[24px] font-medium uppercase tracking-[0.3em] text-orange-ink"
          >
            T-minus
          </Editable>
          <div className="flex items-end gap-6">
            <Editable
              editing={editing}
              as="div"
              className="font-serif text-[240px] font-normal leading-none tracking-tighter text-ink"
            >
              11
            </Editable>
            <Editable
              editing={editing}
              as="div"
              className="pb-6 font-serif text-[64px] leading-none text-orange-ink"
            >
              days.
            </Editable>
          </div>
          <Editable
            editing={editing}
            as="p"
            className="mt-8 max-w-[760px] text-[26px] leading-[1.4] text-body"
          >
            Sixty minutes a day on FinalsPrep is all you need.
          </Editable>

          {/* Today's plan card UI */}
          <div className="mt-8 rounded-3xl border border-hair bg-white p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-[15px] font-semibold uppercase tracking-wider text-muted">
                Today's plan · AP Calc AB
              </div>
              <div className="text-[15px] font-medium text-orange-ink">
                60 min
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-4">
                <div
                  className="grid h-7 w-7 place-items-center rounded-full text-white"
                  style={{ background: ORANGE_HEX }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-[20px] text-ink line-through opacity-60">
                  Lesson: Chain rule
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-7 w-7 rounded-full border-2" style={{ borderColor: ORANGE_HEX }} />
                <div className="text-[20px] text-ink">
                  Practice: Related rates · 8 problems
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-7 w-7 rounded-full border-2 border-hair" />
                <div className="text-[20px] text-muted">
                  Flashcards · 12 due
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[20px] font-medium text-ink">
            Start at finalsprep.com
          </div>
          <Dots />
        </div>
      </div>
    </div>
  );
}

function StudyTipPost({ editing }: { editing: boolean }) {
  return (
    <div className="relative h-full w-full bg-paper">
      <div className="relative flex h-full flex-col justify-between p-20">
        <div className="flex items-start justify-between">
          <Brand />
          <Editable
            editing={editing}
            as="div"
            className="text-[15px] font-medium uppercase tracking-[0.2em] text-muted"
          >
            STUDY TIP · 04
          </Editable>
        </div>

        <div>
          <div className="mb-10 h-1.5 w-24 rounded-full bg-orange" />
          <Editable
            editing={editing}
            as="h1"
            className="font-serif text-[86px] font-normal leading-[1.05] tracking-tight text-ink"
          >
            Don't reread. <br />
            <span className="text-orange-ink italic">Retrieve.</span>
          </Editable>
          <Editable
            editing={editing}
            as="p"
            className="mt-10 max-w-[820px] text-[30px] leading-[1.45] text-body"
          >
            Rereading your notes feels productive, but it barely moves
            the needle. Close the book and try to explain the concept
            out loud — that's where the real learning happens.
          </Editable>
          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-hair bg-orange-tint/40 p-6">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange text-white">
              <span className="text-[20px] font-semibold">→</span>
            </div>
            <Editable
              editing={editing}
              as="p"
              className="text-[22px] leading-[1.4] text-ink"
            >
              Try it: after each FinalsPrep lesson, close the tab and
              write the main idea from memory.
            </Editable>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Editable
            editing={editing}
            as="div"
            className="text-[18px] text-muted"
          >
            Science-backed study techniques
          </Editable>
          <Dots />
        </div>
      </div>
    </div>
  );
}

function ProblemOfDayPost({ editing }: { editing: boolean }) {
  return (
    <div className="relative h-full w-full bg-ink text-paper">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-20">
        <div className="flex items-start justify-between">
          <Brand light />
          <Editable
            editing={editing}
            as="div"
            className="rounded-full bg-orange px-5 py-2 text-[16px] font-semibold text-white"
          >
            PROBLEM OF THE DAY
          </Editable>
        </div>

        <div>
          <Editable
            editing={editing}
            as="div"
            className="mb-4 text-[22px] font-medium text-orange-ink"
          >
            AP Calculus AB · Related Rates
          </Editable>
          <Editable
            editing={editing}
            as="p"
            className="font-serif text-[40px] leading-[1.3] text-paper"
          >
            A ladder 10 ft long leans against a wall. The bottom slides
            away at 2 ft/s. How fast is the top sliding down when the
            bottom is 6 ft from the wall?
          </Editable>
          <div className="mt-12 flex items-center justify-between rounded-3xl border border-white/15 bg-white/5 p-8">
            <div className="font-serif text-[52px] tracking-tight">
              <span className="text-white/50">dy/dt =</span>{" "}
              <Editable editing={editing} as="span" className="text-amber-300">
                ?
              </Editable>
            </div>
            <div
              className="rounded-full px-6 py-3 text-[20px] font-semibold text-white shadow-lg"
              style={{ background: ORANGE_HEX }}
            >
              Show me why →
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="text-[13px] uppercase tracking-wider text-emerald-300">
                Concept
              </div>
              <div className="mt-1 text-[16px] text-white/80">
                Related rates
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="text-[13px] uppercase tracking-wider text-sky-300">
                Step-by-step
              </div>
              <div className="mt-1 text-[16px] text-white/80">
                Implicit diff
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="text-[13px] uppercase tracking-wider text-red-300">
                Common mistake
              </div>
              <div className="mt-1 text-[16px] text-white/80">
                Wrong sign
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Editable
            editing={editing}
            as="div"
            className="text-[20px] font-medium text-white/70"
          >
            finalsprep.com/study
          </Editable>
          <Dots light />
        </div>
      </div>
    </div>
  );
}

function SocialProofPost({ editing }: { editing: boolean }) {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-orange via-orange-hover to-[#7c2d0a] text-white">
      <div className="relative flex h-full flex-col justify-between p-20">
        <div className="flex items-start justify-between">
          <Brand light />
          <Editable
            editing={editing}
            as="div"
            className="rounded-full bg-white/15 px-5 py-2 text-[16px] font-medium text-white"
          >
            THIS WEEK ON FINALSPREP
          </Editable>
        </div>

        <div className="space-y-14">
          <div>
            <Editable
              editing={editing}
              as="div"
              className="font-serif text-[200px] font-normal leading-none tracking-tight"
            >
              10,284
            </Editable>
            <Editable
              editing={editing}
              as="div"
              className="mt-4 text-[34px] font-medium text-white/90"
            >
              practice problems solved.
            </Editable>
          </div>
          <div className="space-y-3 rounded-3xl bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between rounded-xl bg-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <Editable editing={editing} as="span" className="text-[20px] text-white/95">
                  Maya solved "Related rates" · AP Calc AB
                </Editable>
              </div>
              <div className="text-[16px] text-white/70">2m ago</div>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-200" />
                <Editable editing={editing} as="span" className="text-[20px] text-white/95">
                  Jay reviewed 24 flashcards · AP Bio
                </Editable>
              </div>
              <div className="text-[16px] text-white/70">5m ago</div>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-sky-300" />
                <Editable editing={editing} as="span" className="text-[20px] text-white/95">
                  Priya asked the voice tutor · AP Physics 1
                </Editable>
              </div>
              <div className="text-[16px] text-white/70">just now</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Editable
            editing={editing}
            as="div"
            className="text-[20px] font-medium text-white/80"
          >
            Join them. finalsprep.com
          </Editable>
          <Dots light />
        </div>
      </div>
    </div>
  );
}

function FlashcardsSrsPost({ editing }: { editing: boolean }) {
  return (
    <div className="relative h-full w-full bg-paper">
      <div className="relative flex h-full flex-col justify-between p-20">
        <div className="flex items-start justify-between">
          <Brand />
          <Editable
            editing={editing}
            as="div"
            className="text-[15px] font-medium uppercase tracking-[0.2em] text-muted"
          >
            FEATURE
          </Editable>
        </div>

        <div>
          <Editable
            editing={editing}
            as="h1"
            className="font-serif text-[90px] font-normal leading-[1.05] tracking-tight text-ink"
          >
            Review smarter,
            <br />
            <span className="italic text-orange-ink">not longer.</span>
          </Editable>
          <Editable
            editing={editing}
            as="p"
            className="mt-8 max-w-[820px] text-[30px] leading-[1.4] text-body"
          >
            Spaced repetition re-shows you a card right before you'd
            forget it. Ten minutes a day beats cramming.
          </Editable>

          {/* Card stack */}
          <div className="relative mt-14 h-[320px]">
            <div className="absolute left-6 top-6 h-[280px] w-[520px] rounded-3xl border border-hair bg-orange-tint/40 shadow-md" />
            <div className="absolute left-3 top-3 h-[280px] w-[520px] rounded-3xl border border-hair bg-orange-tint shadow-md" />
            <div className="absolute h-[280px] w-[520px] rounded-3xl border border-orange/30 bg-paper p-8 shadow-xl">
              <div className="text-[13px] font-medium uppercase tracking-widest text-muted">
                AP Physics 1
              </div>
              <Editable
                editing={editing}
                as="div"
                className="mt-4 font-serif text-[38px] leading-[1.15] text-ink"
              >
                Newton's 2nd law in one sentence?
              </Editable>
              <div className="absolute bottom-8 left-8 flex gap-2">
                <div className="rounded-full bg-red-50 px-3 py-1 text-[14px] text-red-700">
                  Hard
                </div>
                <div className="rounded-full bg-amber-50 px-3 py-1 text-[14px] text-amber-700">
                  Okay
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-[14px] text-emerald-700">
                  Easy
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-10 w-[380px] rounded-2xl border border-hair bg-white p-6 shadow-lg">
              <div className="text-[14px] text-muted">Next review</div>
              <div className="mt-1 font-serif text-[40px] leading-none text-ink">
                in 3 days
              </div>
              <div className="mt-3 h-2 rounded-full bg-hair">
                <div className="h-2 w-2/3 rounded-full bg-orange" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Editable
            editing={editing}
            as="div"
            className="text-[20px] font-medium text-ink"
          >
            Flashcards + SRS on every lesson
          </Editable>
          <Dots />
        </div>
      </div>
    </div>
  );
}

function FeatureGridPost({ editing }: { editing: boolean }) {
  const features = [
    { t: "AI tutor", s: "24/7 help", bg: "bg-orange-tint" },
    { t: "Voice mode", s: "Speak to learn", bg: "bg-sky-100" },
    { t: "Flashcards", s: "SRS scheduled", bg: "bg-emerald-100" },
    { t: "Mock exams", s: "Timed & scored", bg: "bg-amber-100" },
    { t: "Past FRQs", s: "With AI feedback", bg: "bg-fuchsia-100" },
    { t: "Progress", s: "Weak spots flagged", bg: "bg-indigo-100" },
  ];
  return (
    <div className="relative h-full w-full bg-paper">
      <div className="relative flex h-full flex-col justify-between p-20">
        <div className="flex items-start justify-between">
          <Brand />
          <Editable
            editing={editing}
            as="div"
            className="text-[15px] font-medium uppercase tracking-[0.2em] text-muted"
          >
            WHAT'S INSIDE
          </Editable>
        </div>

        <div>
          <Editable
            editing={editing}
            as="h1"
            className="font-serif text-[80px] font-normal leading-[1.02] tracking-tight text-ink"
          >
            Everything to ace AP exams,
            <br />
            <span className="text-orange-ink italic">in one place.</span>
          </Editable>
          <div className="mt-12 grid grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className={`rounded-3xl border border-hair ${f.bg} p-8`}
              >
                <Editable
                  editing={editing}
                  as="div"
                  className="font-serif text-[40px] leading-none text-ink"
                >
                  {f.t}
                </Editable>
                <Editable
                  editing={editing}
                  as="div"
                  className="mt-3 text-[20px] text-body"
                >
                  {f.s}
                </Editable>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Editable
            editing={editing}
            as="div"
            className="text-[20px] font-medium text-ink"
          >
            Free to start · finalsprep.com
          </Editable>
          <Dots />
        </div>
      </div>
    </div>
  );
}

function CtaFreePost({ editing }: { editing: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink text-paper">
      <div className="absolute -left-32 top-1/3 h-[540px] w-[540px] rounded-full bg-orange/40 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[540px] w-[540px] rounded-full bg-amber-400/30 blur-3xl" />

      {/* Tilted phone mockup peeking from the right */}
      <div
        className="absolute -right-16 top-28 w-[360px] rotate-[8deg]"
        style={{ aspectRatio: "9/19" }}
      >
        <PhoneFrame>
          <div className="absolute inset-0 flex flex-col p-5 pt-14">
            <div className="rounded-2xl bg-white/10 p-3">
              <div className="text-[8px] uppercase tracking-wider text-white/60">
                AP Calc AB
              </div>
              <div className="mt-1 text-[13px] font-medium text-white">
                Related rates
              </div>
            </div>
            <div className="mt-3 rounded-2xl bg-white/5 p-3">
              <div className="text-[10px] text-white/70">
                dy/dt = −9/4 ft/s
              </div>
              <div
                className="mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold text-white"
                style={{ background: ORANGE_HEX }}
              >
                Correct ✓
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white/5 p-3">
              <div
                className="grid h-6 w-6 place-items-center rounded-full text-white"
                style={{ background: ORANGE_HEX }}
              >
                <LogoMark size={10} />
              </div>
              <div className="text-[10px] text-white/80">
                Great — try the next one
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>

      <div className="relative flex h-full flex-col justify-between p-20">
        <Brand light />

        <div className="max-w-[640px]">
          <Editable
            editing={editing}
            as="div"
            className="mb-6 inline-block rounded-full border border-white/20 bg-white/5 px-5 py-2 text-[18px] font-medium tracking-wide text-white/80"
          >
            FREE TO START
          </Editable>
          <Editable
            editing={editing}
            as="h1"
            className="font-serif text-[96px] font-normal leading-[1.02] tracking-tight"
          >
            Stop guessing.
            <br />
            <span className="text-orange-ink italic">Start learning.</span>
          </Editable>
          <Editable
            editing={editing}
            as="p"
            className="mt-8 text-[26px] leading-[1.35] text-white/75"
          >
            Lessons, flashcards, practice, and a voice tutor — built
            for the students sprinting to May.
          </Editable>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div
              className="rounded-full px-8 py-4 text-[26px] font-semibold text-white shadow-lg"
              style={{ background: ORANGE_HEX }}
            >
              finalsprep.com
            </div>
            <Editable
              editing={editing}
              as="div"
              className="mt-4 text-[18px] text-white/60"
            >
              No credit card. Takes 30 seconds.
            </Editable>
          </div>
          <Dots light />
        </div>
      </div>
    </div>
  );
}

// ---------- Navy carousel: 9 slides telling the brand story ----------

function NavyBrand({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <LogoMark size={small ? 56 : 72} className="text-white" />
      <div className="text-white">
        <div
          className={`${small ? "text-[22px]" : "text-[26px]"} font-semibold leading-none`}
        >
          FinalsPrep
        </div>
        {!small && (
          <div className="mt-2 text-[14px] text-white/60">finalsprep.com</div>
        )}
      </div>
    </div>
  );
}

function SwipeIndicator() {
  return (
    <div className="flex items-center gap-2 text-[15px] font-medium text-white/60">
      <span>Swipe</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Shared wrapper for the navy slides — common background + padding. */
function NavySlide({
  children,
  slideNum,
  total = 9,
  showSwipe = true,
}: {
  children: React.ReactNode;
  slideNum: number;
  total?: number;
  showSwipe?: boolean;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden text-white"
      style={{ background: NAVY }}
    >
      {/* Faint navy gradient depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 0%, ${NAVY_3} 0%, ${NAVY} 55%), radial-gradient(circle at 90% 100%, ${NAVY_2} 0%, transparent 40%)`,
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-20">
        <div className="flex items-start justify-between">
          <NavyBrand />
          <div
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[14px] font-medium text-white/70"
          >
            {slideNum} / {total}
          </div>
        </div>
        <div className="flex-1 py-12">{children}</div>
        <div className="flex items-end justify-between">
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(slideNum / total) * 100}%`,
                background: ORANGE_HEX,
              }}
            />
          </div>
          {showSwipe && slideNum < total && <SwipeIndicator />}
          {slideNum === total && (
            <div className="text-[15px] font-medium text-white/70">
              finalsprep.com
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Slide1Cover({ editing }: { editing: boolean }) {
  return (
    <NavySlide slideNum={1}>
      <div className="flex h-full flex-col justify-center">
        <Editable
          editing={editing}
          as="div"
          className="mb-8 inline-block self-start rounded-full px-5 py-2 text-[18px] font-semibold uppercase tracking-[0.2em] text-white"
          // @ts-ignore inline style via Tailwind arbitrary value
          style={{ background: ORANGE_HEX }}
        >
          AP 2026
        </Editable>
        <Editable
          editing={editing}
          as="h1"
          className="font-serif text-[108px] font-normal leading-[0.98] tracking-tight text-white"
        >
          Understand
          <br />
          every step.
        </Editable>
        <Editable
          editing={editing}
          as="h2"
          className="mt-6 font-serif text-[80px] font-normal leading-[1.02] tracking-tight"
          // @ts-ignore
          style={{ color: ORANGE_HEX }}
        >
          Ace every AP exam.
        </Editable>
        <Editable
          editing={editing}
          as="p"
          className="mt-10 max-w-[820px] text-[26px] leading-[1.4] text-white/65"
        >
          An AI tutor built for the sprint to May — not just answers,
          real understanding.
        </Editable>
      </div>
    </NavySlide>
  );
}

function Slide2Problem({ editing }: { editing: boolean }) {
  return (
    <NavySlide slideNum={2}>
      <div className="flex h-full flex-col justify-center">
        <div className="mb-10 flex items-center gap-3 text-[20px] font-medium uppercase tracking-[0.24em] text-white/50">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          The problem
        </div>
        <Editable
          editing={editing}
          as="h1"
          className="font-serif text-[92px] font-normal leading-[1.02] tracking-tight text-white"
        >
          Most tools just
          <br />
          give you the
          <br />
          <span
            className="italic"
            // @ts-ignore
            style={{ color: ORANGE_HEX }}
          >
            answer.
          </span>
        </Editable>
        <Editable
          editing={editing}
          as="p"
          className="mt-12 max-w-[820px] text-[32px] leading-[1.35] text-white/70"
        >
          That's why students stay confused.
        </Editable>

        {/* UI: mock "here's the answer" reply that doesn't teach */}
        <div className="mt-14 max-w-[720px] rounded-2xl border border-white/10 bg-white/[0.05] p-7">
          <div className="text-[14px] uppercase tracking-wider text-white/40">
            Other tools
          </div>
          <div className="mt-2 font-serif text-[38px] text-white/90">
            "The answer is −9/4."
          </div>
          <div className="mt-3 text-[20px] text-white/50">
            …and nothing else.
          </div>
        </div>
      </div>
    </NavySlide>
  );
}

function Slide3Solution({ editing }: { editing: boolean }) {
  return (
    <NavySlide slideNum={3}>
      <div className="flex h-full flex-col justify-center">
        <div className="mb-10 flex items-center gap-3 text-[20px] font-medium uppercase tracking-[0.24em]" style={{ color: ORANGE_HEX }}>
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: ORANGE_HEX }}
          />
          The fix
        </div>
        <Editable
          editing={editing}
          as="h1"
          className="font-serif text-[108px] font-normal leading-[0.98] tracking-tight text-white"
        >
          FinalsPrep
          <br />
          <span
            className="italic"
            // @ts-ignore
            style={{ color: ORANGE_HEX }}
          >
            is different.
          </span>
        </Editable>
        <Editable
          editing={editing}
          as="p"
          className="mt-10 max-w-[820px] text-[34px] leading-[1.35] text-white/80"
        >
          AI that actually teaches you.
        </Editable>
        <Editable
          editing={editing}
          as="p"
          className="mt-4 max-w-[820px] text-[22px] leading-[1.45] text-white/55"
        >
          Every answer comes with the concept, the reasoning, and the
          mistake most students make — so the pattern sticks for the
          exam.
        </Editable>
      </div>
    </NavySlide>
  );
}

function Slide4HowItWorks({ editing }: { editing: boolean }) {
  return (
    <NavySlide slideNum={4}>
      <div className="flex h-full flex-col">
        <Editable
          editing={editing}
          as="h1"
          className="font-serif text-[68px] font-normal leading-[1.05] tracking-tight text-white"
        >
          Every reply,{" "}
          <span className="italic" style={{ color: ORANGE_HEX }}>
            broken down.
          </span>
        </Editable>

        {/* Mock chat reply with labeled reasoning steps */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          <div className="mb-5 flex items-center gap-3">
            <div
              className="grid h-9 w-9 place-items-center rounded-full text-white"
              style={{ background: ORANGE_HEX }}
            >
              <LogoMark size={16} />
            </div>
            <div className="text-[17px] font-medium text-white/80">
              FinalsPrep AI
            </div>
          </div>
          <div className="space-y-4">
            <StepCard label="Concept" accent="emerald" dark>
              <Editable editing={editing} as="span">
                This is a related-rates problem — relate variables
                with an equation, then differentiate both sides.
              </Editable>
            </StepCard>
            <StepCard label="Step-by-step solution" accent="sky" dark>
              <Editable editing={editing} as="span">
                From x² + y² = 100, take d/dt of both sides:
                2x(dx/dt) + 2y(dy/dt) = 0. Plug in x = 6, dx/dt = 2,
                y = 8 → dy/dt = −3/2 ft/s.
              </Editable>
            </StepCard>
            <StepCard label="Common mistake" accent="red" dark>
              <Editable editing={editing} as="span">
                Don't forget the negative sign — the top is sliding
                down, so dy/dt is negative.
              </Editable>
            </StepCard>
          </div>
        </div>
      </div>
    </NavySlide>
  );
}

function Slide5AI({ editing }: { editing: boolean }) {
  return (
    <NavySlide slideNum={5}>
      <div className="flex h-full flex-col justify-center">
        <div
          className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[16px] font-semibold uppercase tracking-[0.2em] text-white/80"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: ORANGE_HEX }}
          />
          Powered by AI
        </div>
        <Editable
          editing={editing}
          as="h1"
          className="font-serif text-[96px] font-normal leading-[1.02] tracking-tight text-white"
        >
          Advanced models.
          <br />
          <span className="italic" style={{ color: ORANGE_HEX }}>
            Real reasoning.
          </span>
        </Editable>
        <Editable
          editing={editing}
          as="p"
          className="mt-10 max-w-[820px] text-[28px] leading-[1.4] text-white/70"
        >
          Explains reasoning, not just answers. Adapts to how you
          learn. Available 24/7.
        </Editable>

        {/* Reasoning stream mock */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center gap-2 text-[14px] font-medium uppercase tracking-widest text-white/50">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: ORANGE_HEX }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: ORANGE_HEX }}
              />
            </span>
            Thinking
          </div>
          <div className="mt-3 space-y-2 text-[20px] leading-[1.45] text-white/80">
            <div>→ First, identify this as related rates.</div>
            <div>→ Write the Pythagorean relation.</div>
            <div>→ Differentiate implicitly, then solve for dy/dt.</div>
          </div>
        </div>
      </div>
    </NavySlide>
  );
}

function Slide6Coverage({ editing }: { editing: boolean }) {
  // Matches the 16 courses in lib/topics.ts COURSES[].
  const subjects = [
    "AP Precalculus",
    "AP Calculus AB",
    "AP Calculus BC",
    "AP Statistics",
    "AP Physics 1",
    "AP Physics 2",
    "AP Physics C: Mech",
    "AP Physics C: E&M",
    "AP Biology",
    "AP Chemistry",
    "AP Environmental Sci",
    "AP CS A",
    "AP CS Principles",
    "AP US History",
    "AP World History",
    "AP European History",
  ];
  return (
    <NavySlide slideNum={6}>
      <div className="flex h-full flex-col">
        <Editable
          editing={editing}
          as="h1"
          className="font-serif text-[88px] font-normal leading-[1.02] tracking-tight text-white"
        >
          <span style={{ color: ORANGE_HEX }}>16 AP courses</span>
          <br />
          covered.
        </Editable>
        <Editable
          editing={editing}
          as="p"
          className="mt-4 max-w-[820px] text-[24px] leading-[1.4] text-white/65"
        >
          STEM, humanities, and everything between.
        </Editable>

        <div className="mt-10 grid grid-cols-4 gap-3">
          {subjects.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4"
            >
              <div
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: ORANGE_HEX }}
              />
              <Editable
                editing={editing}
                as="span"
                className="text-[17px] font-medium text-white/85"
              >
                {s}
              </Editable>
            </div>
          ))}
        </div>
      </div>
    </NavySlide>
  );
}

function Slide7LateNight({ editing }: { editing: boolean }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden text-white"
      style={{ background: NAVY }}
    >
      {/* Late-night sky: stars + window-light glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, rgba(249,115,22,0.22) 0%, transparent 42%), radial-gradient(circle at 80% 20%, ${NAVY_2} 0%, ${NAVY} 60%)`,
        }}
      />
      {/* Stars */}
      {[
        [10, 12],
        [18, 26],
        [30, 8],
        [45, 20],
        [65, 10],
        [78, 30],
        [88, 15],
        [15, 55],
        [25, 70],
        [72, 60],
        [92, 70],
        [55, 80],
      ].map(([x, y], i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            opacity: 0.45 + ((i * 7) % 40) / 100,
          }}
        />
      ))}
      {/* Window-light glow + crescent moon */}
      <div className="absolute right-[12%] top-[14%] h-24 w-24 rounded-full bg-white/85 shadow-[0_0_60px_rgba(255,255,255,0.5)]">
        <div
          className="absolute right-0 top-0 h-24 w-20 rounded-full"
          style={{ background: NAVY }}
        />
      </div>

      <div className="relative flex h-full flex-col justify-between p-20">
        <div className="flex items-start justify-between">
          <NavyBrand />
          <div className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[14px] font-medium text-white/70">
            7 / 9
          </div>
        </div>

        <div>
          {/* Mock time + lamp glow card */}
          <div className="mb-10 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3">
            <div className="h-2 w-2 rounded-full bg-orange-400" />
            <div className="text-[18px] font-medium uppercase tracking-widest text-white/70">
              11:47 pm · Tuesday
            </div>
          </div>
          <Editable
            editing={editing}
            as="h1"
            className="font-serif text-[120px] font-normal leading-[0.98] tracking-tight text-white"
          >
            Stuck at
            <br />
            <span className="italic" style={{ color: ORANGE_HEX }}>
              11 pm?
            </span>
          </Editable>
          <Editable
            editing={editing}
            as="p"
            className="mt-10 max-w-[760px] text-[30px] leading-[1.35] text-white/70"
          >
            Your tutor doesn't sleep. Open FinalsPrep, speak your
            question, get a real explanation — in under a minute.
          </Editable>
        </div>

        <div className="flex items-end justify-between">
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full"
              style={{ width: "77.7%", background: ORANGE_HEX }}
            />
          </div>
          <SwipeIndicator />
        </div>
      </div>
    </div>
  );
}

function Slide8Urgency({ editing }: { editing: boolean }) {
  return (
    <NavySlide slideNum={8}>
      <div className="flex h-full flex-col justify-center">
        <Editable
          editing={editing}
          as="div"
          className="mb-4 text-[22px] font-semibold uppercase tracking-[0.3em] text-white/55"
        >
          AP exams start
        </Editable>
        <div className="flex items-end gap-6">
          <Editable
            editing={editing}
            as="div"
            className="font-serif text-[340px] font-normal leading-[0.88] tracking-tighter"
            // @ts-ignore
            style={{ color: ORANGE_HEX }}
          >
            11
          </Editable>
          <Editable
            editing={editing}
            as="div"
            className="pb-8 font-serif text-[84px] leading-none text-white"
          >
            days.
          </Editable>
        </div>
        <Editable
          editing={editing}
          as="h2"
          className="mt-6 font-serif text-[68px] font-normal leading-[1.05] tracking-tight text-white"
        >
          Start now.
        </Editable>
        <Editable
          editing={editing}
          as="p"
          className="mt-6 max-w-[760px] text-[26px] leading-[1.4] text-white/65"
        >
          Even 45 minutes a day between now and May moves the needle.
        </Editable>
      </div>
    </NavySlide>
  );
}

function Slide9CTA({ editing }: { editing: boolean }) {
  return (
    <NavySlide slideNum={9} showSwipe={false}>
      <div className="flex h-full flex-col justify-center">
        <Editable
          editing={editing}
          as="h1"
          className="font-serif text-[100px] font-normal leading-[0.98] tracking-tight text-white"
        >
          Stop guessing.
          <br />
          <span className="italic" style={{ color: ORANGE_HEX }}>
            Start understanding.
          </span>
        </Editable>
        <Editable
          editing={editing}
          as="p"
          className="mt-10 max-w-[760px] text-[30px] leading-[1.4] text-white/75"
        >
          Try FinalsPrep — free to start, no credit card.
        </Editable>
        <div className="mt-12 flex items-center gap-4">
          <div
            className="rounded-full px-10 py-5 text-[28px] font-semibold text-white shadow-xl"
            style={{ background: ORANGE_HEX }}
          >
            Link in bio
          </div>
          <div className="text-[22px] font-medium text-white/65">
            finalsprep.com
          </div>
        </div>
      </div>
    </NavySlide>
  );
}

// ---------- Registry ----------

type PostGroup = { title: string; subtitle: string; posts: Post[] };

const POST_GROUPS: PostGroup[] = [
  {
    title: "Standalone posts",
    subtitle: "Drop any of these in a single-image Feed post.",
    posts: [
      { id: "voice-tutor", label: "Voice tutor", render: (e) => <VoiceTutorPost editing={e} /> },
      { id: "countdown", label: "Countdown", render: (e) => <CountdownPost editing={e} /> },
      { id: "study-tip", label: "Study tip", render: (e) => <StudyTipPost editing={e} /> },
      { id: "problem-of-day", label: "Problem of the day", render: (e) => <ProblemOfDayPost editing={e} /> },
      { id: "social-proof", label: "Social proof", render: (e) => <SocialProofPost editing={e} /> },
      { id: "flashcards-srs", label: "Flashcards + SRS", render: (e) => <FlashcardsSrsPost editing={e} /> },
      { id: "feature-grid", label: "Feature grid", render: (e) => <FeatureGridPost editing={e} /> },
      { id: "cta-free", label: "Free to start CTA", render: (e) => <CtaFreePost editing={e} /> },
    ],
  },
  {
    title: "Full brand story · 9-slide carousel",
    subtitle:
      "Navy + orange. Screenshot slides 1–9 in order, upload as a single carousel post.",
    posts: [
      { id: "c1-cover", label: "1 · Hook (cover)", render: (e) => <Slide1Cover editing={e} /> },
      { id: "c2-problem", label: "2 · The problem", render: (e) => <Slide2Problem editing={e} /> },
      { id: "c3-solution", label: "3 · The solution", render: (e) => <Slide3Solution editing={e} /> },
      { id: "c4-how", label: "4 · How it works", render: (e) => <Slide4HowItWorks editing={e} /> },
      { id: "c5-ai", label: "5 · AI emphasis", render: (e) => <Slide5AI editing={e} /> },
      { id: "c6-coverage", label: "6 · Coverage", render: (e) => <Slide6Coverage editing={e} /> },
      { id: "c7-latenight", label: "7 · Relatable moment", render: (e) => <Slide7LateNight editing={e} /> },
      { id: "c8-urgency", label: "8 · Urgency", render: (e) => <Slide8Urgency editing={e} /> },
      { id: "c9-cta", label: "9 · CTA", render: (e) => <Slide9CTA editing={e} /> },
    ],
  },
];

const POSTS: Post[] = POST_GROUPS.flatMap((g) => g.posts);

const UNLOCK_KEY = "fp-instagram-unlocked";

export default function InstagramAdminPage() {
  const [authed, setAuthed] = useState<"locked" | "ok">("locked");
  const [password, setPassword] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string>("");
  const [open, setOpen] = useState<PostId | null>(null);
  const [editing, setEditing] = useState(false);
  // The modal renders a separate DOM instance of the post. When you edit in
  // the modal, those edits live in this node, not in the preview. On close
  // we walk the modal's contentEditable elements and copy their text into
  // the preview's matching elements so the grid download (and any re-open)
  // reflects the edits. Capture routines point at the correct node based
  // on context — modal vs grid.
  const [downloadingId, setDownloadingId] = useState<PostId | null>(null);
  const modalInnerRef = useRef<HTMLDivElement>(null);

  // Sticky unlock for the tab session so you don't retype on every reload.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === "1") setAuthed("ok");
    } catch {}
  }, []);

  async function attemptUnlock(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (unlocking) return;
    setUnlockError("");
    setUnlocking(true);
    try {
      const res = await fetch("/api/admin/instagram-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setUnlockError(data?.error || "Wrong password.");
        return;
      }
      try {
        sessionStorage.setItem(UNLOCK_KEY, "1");
      } catch {}
      setAuthed("ok");
      setPassword("");
    } catch {
      setUnlockError("Couldn't reach the server.");
    } finally {
      setUnlocking(false);
    }
  }

  const activePost = useMemo(
    () => POSTS.find((p) => p.id === open) || null,
    [open]
  );

  /**
   * Copy text from one subtree's contentEditable elements to another's.
   * Preview and modal render the same component tree, so a
   * querySelectorAll walk returns matching elements in the same order.
   */
  function syncEdits(from: HTMLElement | null, to: HTMLElement | null) {
    if (!from || !to) return;
    const src = from.querySelectorAll<HTMLElement>('[contenteditable="true"]');
    const dst = to.querySelectorAll<HTMLElement>('[contenteditable="true"]');
    const n = Math.min(src.length, dst.length);
    for (let i = 0; i < n; i++) {
      // innerHTML preserves <br>, <span>, etc. that may have been inserted
      // by the browser when the user hit Enter mid-edit.
      dst[i].innerHTML = src[i].innerHTML;
    }
  }

  function closeModal() {
    // Persist edits from modal DOM into the preview DOM so the grid
    // download and future re-opens see the new text.
    if (open) {
      const preview = document.getElementById(`post-inner-${open}`);
      syncEdits(modalInnerRef.current, preview);
    }
    setOpen(null);
  }

  async function capturePostNode(
    postId: PostId,
    node: HTMLElement,
    opts: { stripTransform: boolean }
  ) {
    if (downloadingId) return;
    setDownloadingId(postId);
    try {
      await (document as any).fonts?.ready;
    } catch {}
    try {
      const style: Record<string, string> = {};
      if (opts.stripTransform) {
        style.transform = "none";
        style.transformOrigin = "top left";
        style.position = "static";
        style.margin = "0";
      }
      const dataUrl = await toPng(node, {
        width: POST_W,
        height: POST_H,
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: "#ffffff",
        style,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `finalsprep-${postId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error("[download] failed", e);
      alert("Download failed. Try again, or use the fullscreen screenshot option.");
    } finally {
      setDownloadingId(null);
    }
  }

  async function downloadPost(post: Post) {
    const node = document.getElementById(`post-inner-${post.id}`);
    if (!node) {
      alert("Couldn't find the post to download.");
      return;
    }
    await capturePostNode(post.id, node, { stripTransform: true });
  }

  async function downloadFromModal(post: Post) {
    const node = modalInnerRef.current;
    if (!node) return;
    await capturePostNode(post.id, node, { stripTransform: false });
  }

  // Escape closes the fullscreen modal (and syncs edits back).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // closeModal is stable enough for this handler (depends on `open` state
    // read inside), intentionally omitted from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (authed === "locked") {
    return (
      <main className="bg-paper">
        <SiteNav />
        <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
          <h1 className="font-serif text-3xl text-ink">
            Enter password to continue.
          </h1>
          <form onSubmit={attemptUnlock} className="mt-8">
            <label
              htmlFor="fp-ig-pass"
              className="block text-[13px] font-medium text-ink"
            >
              Password
            </label>
            <input
              id="fp-ig-pass"
              type="password"
              autoFocus
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-hair bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
              placeholder="••••••••"
            />
            {unlockError && (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-800">
                {unlockError}
              </div>
            )}
            <button
              type="submit"
              disabled={unlocking || !password}
              className="mt-5 w-full rounded-full bg-orange px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {unlocking ? "Checking…" : "Unlock"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="label mb-3">Admin · Marketing</div>
            <h1 className="font-serif text-4xl font-normal text-ink">
              Instagram post templates.
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] text-muted">
              Each card renders at exact 1080×1350 (portrait Feed).
              Click "Open" to view one at full size on a blank canvas,
              then screenshot it (Cmd+Shift+4, drag the post area).
              Toggle "Edit text" to rewrite copy in-place before
              capturing.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEditing((e) => !e)}
            className={`shrink-0 rounded-full border px-5 py-2 text-[14px] font-medium transition ${
              editing
                ? "border-orange bg-orange text-white"
                : "border-hair bg-paper text-ink hover:bg-orange-tint"
            }`}
          >
            {editing ? "Done editing" : "Edit text"}
          </button>
        </div>

        {POST_GROUPS.map((group) => (
          <div key={group.title} className="mt-16 first:mt-10">
            <div className="flex items-baseline justify-between border-b border-hair pb-3">
              <h2 className="font-serif text-2xl text-ink">{group.title}</h2>
              <div className="text-[13px] text-muted">{group.posts.length} posts</div>
            </div>
            <p className="mt-2 text-[14px] text-muted">{group.subtitle}</p>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {group.posts.map((p) => (
                <div key={p.id} className="group">
                  <div
                    className="relative w-full overflow-hidden rounded-2xl border border-hair shadow-sm [container-type:inline-size]"
                    style={{ aspectRatio: `${POST_W} / ${POST_H}` }}
                  >
                    <div
                      id={`post-inner-${p.id}`}
                      className="absolute left-0 top-0 origin-top-left [transform:scale(calc(100cqi/1080))]"
                      style={{
                        width: POST_W,
                        height: POST_H,
                      }}
                    >
                      {p.render(editing)}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="truncate text-[14px] font-medium text-ink">
                      {p.label}
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <button
                        type="button"
                        onClick={() => downloadPost(p)}
                        disabled={downloadingId !== null}
                        className="inline-flex items-center gap-1.5 rounded-full bg-orange px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {downloadingId === p.id ? "Saving…" : "Download"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpen(p.id)}
                        className="text-[13px] font-medium text-orange-ink hover:underline"
                      >
                        Open →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {activePost && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(18,18,20,0.92)] p-8"
          onClick={closeModal}
        >
          <div
            ref={modalInnerRef}
            className="relative"
            onClick={(e) => e.stopPropagation()}
            style={{ width: POST_W, height: POST_H }}
          >
            {activePost.render(editing)}
          </div>

          {/* Action bar: download straight from the modal — captures this
              DOM node so whatever you just edited ends up in the PNG. */}
          <div
            className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/10 px-3 py-2 text-[13px] text-white/85 backdrop-blur"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => downloadFromModal(activePost)}
              disabled={downloadingId !== null}
              className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {downloadingId === activePost.id ? "Saving…" : "Download PNG"}
            </button>
            <span className="px-2 text-white/60">
              {editing ? "Editing — edits save on close" : "Esc to close"}
            </span>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="fixed right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}
