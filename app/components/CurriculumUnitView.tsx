"use client";
import type { CurriculumUnit } from "@/lib/curriculum";
import MathRender from "./Math";

type Props = {
  unit: CurriculumUnit;
  locked?: boolean;
  onUpgrade?: () => void;
};

export default function CurriculumUnitView({ unit, locked, onUpgrade }: Props) {
  if (locked) {
    return <LockedUnitView unit={unit} onUpgrade={onUpgrade} />;
  }
  return <UnlockedUnitView unit={unit} />;
}

function UnlockedUnitView({ unit }: { unit: CurriculumUnit }) {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <div className="meta">
          Unit {unit.unitNumber} · Exam weight: {unit.examWeight}
        </div>
        <h3 className="mt-1 font-serif text-3xl font-normal text-ink">
          {unit.title}
        </h3>
        <p className="mt-3 text-[16px] text-body">
          <MathRender auto>{unit.overview}</MathRender>
        </p>
      </div>

      <Section title="Big ideas">
        <ul className="space-y-2 text-[15.5px]">
          {unit.bigIdeas.map((idea, i) => (
            <li key={i} className="flex gap-3 text-body">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange" />
              <span>
                <MathRender auto>{idea}</MathRender>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Essential knowledge">
        <div className="space-y-5">
          {unit.essentials.map((e, i) => (
            <div key={i}>
              <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
                {e.heading}
              </div>
              <p className="mt-1 text-[15px] leading-relaxed text-body">
                <MathRender auto>{e.body}</MathRender>
              </p>
            </div>
          ))}
        </div>
      </Section>

      {unit.keyFacts && unit.keyFacts.length > 0 && (
        <Section title="Key facts">
          <ul className="space-y-1.5 text-[14px]">
            {unit.keyFacts.map((f, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-orange" />
                <span>
                  <MathRender auto>{f}</MathRender>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Common mistakes">
        <ul className="space-y-1.5 text-[14px]">
          {unit.commonMistakes.map((m, i) => (
            <li key={i} className="flex gap-3 text-body">
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-red-400" />
              <span>
                <MathRender auto>{m}</MathRender>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Exam strategy">
        <p className="text-[15px] leading-relaxed text-body">
          <MathRender auto>{unit.examStrategy}</MathRender>
        </p>
      </Section>

      <Section title="Study plan">
        <ul className="space-y-1.5 text-[14px]">
          {unit.studyTips.map((t, i) => (
            <li key={i} className="flex gap-3 text-body">
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-orange" />
              <span>
                <MathRender auto>{t}</MathRender>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Pro Notes — deeper, opinionated synthesis */}
      <div className="rounded-xl border-2 border-orange/30 bg-orange-tint/40 p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-orange px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Pro notes
          </span>
          <span className="text-xs text-muted">What actually shows up on the exam</span>
        </div>
        <p className="text-[15px] leading-relaxed text-body">
          <strong className="text-ink">If you only study one thing in this unit,</strong>{" "}
          memorize the {unit.essentials[0]?.heading.toLowerCase() || "core idea"} and
          understand why each common mistake above is a trap. Graders see the same
          wrong answer on thousands of exams — {unit.commonMistakes[0] || "watch the signs"}
          {" "}is the #1 one. When you hit practice problems, do the hard one first;
          if you can do it, the easy ones are free.
        </p>
      </div>
    </div>
  );
}

function LockedUnitView({
  unit,
  onUpgrade,
}: {
  unit: CurriculumUnit;
  onUpgrade?: () => void;
}) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          Unit {unit.unitNumber} · Exam weight: {unit.examWeight}
        </span>
        <span className="rounded bg-orange text-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
          Locked
        </span>
      </div>
      <h3 className="mt-2 font-serif text-3xl font-normal text-ink">
        {unit.title}
      </h3>

      <div className="mt-6 rounded-xl border-2 border-orange/40 bg-orange-tint p-8">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-orange-ink">
            <path d="M6 10V7a6 6 0 0 1 12 0v3M5 10h14v10H5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-orange-ink">
            Pro content
          </span>
        </div>
        <h4 className="mt-3 font-serif text-2xl font-normal text-ink">
          Unlock every unit with Pro.
        </h4>
        <p className="mt-3 max-w-xl text-[15px] text-body">
          Free users get Units 1 and 2 as a sample. Pro unlocks the full
          walkthrough for this unit (overview, {unit.essentials.length}{" "}
          essential-knowledge sections, {unit.commonMistakes.length} common
          mistakes graders watch for, Pro Notes, full practice sets,
          flashcards, and interactive tools) plus every other unit in all
          16 AP courses.
        </p>
        <ul className="mt-4 space-y-1.5 text-[13.5px] text-body">
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 rounded-full bg-orange" />
            <span>All 27+ units per course, every walkthrough</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 rounded-full bg-orange" />
            <span>Practice problems with solutions, Pro Notes, flashcards</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 rounded-full bg-orange" />
            <span>Image uploads (photo your handwritten work)</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 rounded-full bg-orange" />
            <span>Larger AI chat budget — 8x what Free gets</span>
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onUpgrade}
            className="btn-primary text-sm"
            data-testid="unit-upgrade-button"
          >
            Unlock Pro — $16/month
          </button>
          <a href="/#price" className="btn-ghost text-sm">
            Or $90 for 6 months →
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
        {title}
      </div>
      {children}
    </div>
  );
}
