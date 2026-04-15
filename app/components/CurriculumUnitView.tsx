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

      <div className="mt-6 rounded-md border border-dashed border-hair bg-offwhite p-4">
        <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
          Preview · first big idea
        </div>
        <p className="mt-2 text-[15px] text-body">
          <MathRender auto>{unit.bigIdeas[0] ?? ""}</MathRender>
        </p>
      </div>

      <div className="mt-6 rounded-xl border-2 border-orange/40 bg-orange-tint p-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-orange-ink">
          Pro content
        </div>
        <h4 className="mt-2 font-serif text-2xl font-normal text-ink">
          Unlock the rest of Unit {unit.unitNumber} and every other unit.
        </h4>
        <p className="mt-3 max-w-xl text-[15px] text-body">
          The full unit walkthrough includes {unit.essentials.length}{" "}
          essential-knowledge sections, {unit.commonMistakes.length} common
          mistakes graders watch for, an exam strategy paragraph, and{" "}
          {unit.studyTips.length} concrete study actions — all written to match
          the College Board CED. Free users get Units 1 and 2 of every course
          as a sample.
        </p>
        <ul className="mt-4 space-y-1.5 text-[13.5px] text-body">
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 rounded-full bg-orange" />
            <span>Big ideas, key facts, and exam strategy for every unit</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 rounded-full bg-orange" />
            <span>Common mistakes and graders' pet peeves called out by unit</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 rounded-full bg-orange" />
            <span>Unlimited AI walkthroughs on any problem you paste</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 rounded-full bg-orange" />
            <span>All 16 AP courses covered — one subscription</span>
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onUpgrade}
            className="btn-primary text-sm"
            data-testid="unit-upgrade-button"
          >
            Unlock Pro — $9/month
          </button>
          <a href="/#price" className="btn-ghost text-sm">
            See yearly ($50) →
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
