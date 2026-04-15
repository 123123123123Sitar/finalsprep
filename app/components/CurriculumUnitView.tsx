"use client";
import { useState } from "react";
import type { CurriculumUnit } from "@/lib/curriculum";
import type { ApTopic } from "@/lib/topics";
import type { PlanTier } from "@/lib/plans";
import { getCedLesson, type CedLesson } from "@/lib/cedLessons";
import MathRender from "./Math";

type Props = {
  unit: CurriculumUnit;
  courseSlug?: string;
  unitTopics?: ApTopic[];
  plan?: PlanTier;
  locked?: boolean;
  onUpgrade?: () => void;
};

export default function CurriculumUnitView({
  unit,
  courseSlug,
  unitTopics,
  plan,
  locked,
  onUpgrade,
}: Props) {
  if (locked) {
    return <LockedUnitView unit={unit} onUpgrade={onUpgrade} />;
  }
  return (
    <UnlockedUnitView
      unit={unit}
      courseSlug={courseSlug}
      unitTopics={unitTopics}
      plan={plan}
      onUpgrade={onUpgrade}
    />
  );
}

function UnlockedUnitView({
  unit,
  courseSlug,
  unitTopics,
  plan,
  onUpgrade,
}: {
  unit: CurriculumUnit;
  courseSlug?: string;
  unitTopics?: ApTopic[];
  plan?: PlanTier;
  onUpgrade?: () => void;
}) {
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

      {courseSlug && unitTopics && unitTopics.length > 0 && (
        <CedTopicsSection
          courseSlug={courseSlug}
          topics={unitTopics}
          plan={plan}
          onUpgrade={onUpgrade}
        />
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
          <span className="text-xs text-muted">
            What actually shows up on the exam
          </span>
        </div>
        <p className="text-[15px] leading-relaxed text-body">
          <strong className="text-ink">
            If you only study one thing in this unit,
          </strong>{" "}
          memorize the{" "}
          {unit.essentials[0]?.heading.toLowerCase() || "core idea"} and
          understand why each common mistake above is a trap. Graders see the
          same wrong answer on thousands of exams —{" "}
          {unit.commonMistakes[0] || "watch the signs"} is the #1 one. When you
          hit practice problems, do the hard one first; if you can do it, the
          easy ones are free.
        </p>
      </div>
    </div>
  );
}

function CedTopicsSection({
  courseSlug,
  topics,
  plan,
  onUpgrade,
}: {
  courseSlug: string;
  topics: ApTopic[];
  plan?: PlanTier;
  onUpgrade?: () => void;
}) {
  const isPaid = plan === "pro" || plan === "hacker";

  // Learners: show a single upsell card in place of the topic list, not
  // per-topic placeholders. They already see the full unit overview
  // above; this keeps the pro gate clean and obvious.
  if (!isPaid) {
    return (
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            CED topics · {topics.length}
          </div>
          <span className="rounded-full bg-orange-tint px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-ink">
            Pro
          </span>
        </div>
        <div className="rounded-xl border-2 border-orange/40 bg-orange-tint/50 p-5">
          <div className="text-[12px] font-medium uppercase tracking-[0.14em] text-orange-ink">
            Unlock every CED topic
          </div>
          <p className="mt-2 text-[14px] text-body">
            Pro gets a full walkthrough for every College Board topic in this
            unit — concept, diagram where it helps, worked example, and the
            common traps graders watch for.
          </p>
          <ul className="mt-3 grid gap-1 text-[12px] text-muted sm:grid-cols-2">
            {topics.slice(0, 8).map((t) => (
              <li key={t.id} className="flex gap-2">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-orange" />
                <span className="truncate">
                  <span className="font-mono">{t.id}</span> {t.title}
                </span>
              </li>
            ))}
            {topics.length > 8 && (
              <li className="text-dim">+ {topics.length - 8} more topics</li>
            )}
          </ul>
          <button
            onClick={onUpgrade}
            className="btn-primary mt-4 text-sm"
          >
            Unlock Pro — $11 first month
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          CED topics · {topics.length}
        </div>
      </div>
      <div className="space-y-2">
        {topics.map((t) => {
          const lesson = getCedLesson(courseSlug, t.id);
          return (
            <CedTopicCard
              key={t.id}
              topicId={t.id}
              title={t.title}
              lesson={lesson}
              locked={false}
              onUpgrade={onUpgrade}
            />
          );
        })}
      </div>
    </div>
  );
}

function CedTopicCard({
  topicId,
  title,
  lesson,
  locked,
  onUpgrade,
}: {
  topicId: string;
  title: string;
  lesson?: CedLesson;
  locked: boolean;
  onUpgrade?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasContent = !!lesson;

  return (
    <div
      className={`overflow-hidden rounded-lg border transition ${
        open ? "border-orange/50" : "border-hair"
      } bg-paper`}
    >
      <button
        onClick={() => {
          if (locked) return;
          if (!hasContent) return;
          setOpen((o) => !o);
        }}
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left hover:bg-offwhite"
        aria-expanded={open}
        disabled={locked}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted">
              {topicId}
            </span>
            <span className="text-[14px] font-medium text-ink">{title}</span>
            {locked && (
              <span className="rounded-full bg-orange-tint px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-ink">
                Pro
              </span>
            )}
            {!locked && !hasContent && (
              <span className="rounded-full bg-hair/60 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted">
                Coming soon
              </span>
            )}
          </div>
          {lesson?.summary && !open && (
            <div className="mt-1 text-[12.5px] text-muted">
              <MathRender auto>{lesson.summary}</MathRender>
            </div>
          )}
        </div>
        {!locked && hasContent && (
          <span
            aria-hidden="true"
            className={`mt-1 shrink-0 text-muted transition-transform ${
              open ? "rotate-90" : ""
            }`}
          >
            ›
          </span>
        )}
      </button>
      {open && lesson && (
        <div className="animate-fadeUpSm space-y-5 border-t border-hair bg-offwhite px-5 pb-6 pt-5">
          <div className="prose-body text-[14.5px]">
            <MathRender auto>{lesson.lesson}</MathRender>
          </div>

          {lesson.diagram && (
            <div
              className="rounded-md border border-hair bg-paper p-3"
              dangerouslySetInnerHTML={{ __html: lesson.diagram }}
            />
          )}

          {lesson.keyIdeas.length > 0 && (
            <div>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                Key ideas
              </div>
              <ul className="mt-2 space-y-1 text-[13.5px]">
                {lesson.keyIdeas.map((k, i) => (
                  <li key={i} className="flex gap-2 text-body">
                    <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-orange" />
                    <span>
                      <MathRender auto>{k}</MathRender>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lesson.workedExample && (
            <div className="rounded-md border-l-2 border-orange bg-paper px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-orange-ink">
                Worked example
              </div>
              <div className="mt-2 text-[13.5px] text-body">
                <div className="font-medium text-ink">
                  <MathRender auto>{lesson.workedExample.prompt}</MathRender>
                </div>
                <div className="mt-2">
                  <MathRender auto>{lesson.workedExample.solution}</MathRender>
                </div>
              </div>
            </div>
          )}

          {lesson.commonMistakes.length > 0 && (
            <div>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                Common mistakes
              </div>
              <ul className="mt-2 space-y-1 text-[13px]">
                {lesson.commonMistakes.map((m, i) => (
                  <li key={i} className="flex gap-2 text-body">
                    <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-red-400" />
                    <span>
                      <MathRender auto>{m}</MathRender>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {locked && (
        <div className="border-t border-hair bg-orange-tint/30 px-5 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-[12px] text-orange-ink">
              Full walkthrough + diagram + worked example in Pro.
            </div>
            <button
              onClick={onUpgrade}
              className="rounded-md border border-orange bg-orange px-3 py-1 text-[11px] font-medium text-white hover:bg-orange-hover"
            >
              Unlock Pro
            </button>
          </div>
        </div>
      )}
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="text-orange-ink"
          >
            <path
              d="M6 10V7a6 6 0 0 1 12 0v3M5 10h14v10H5z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
          mistakes graders watch for, per-CED-topic lessons with diagrams,
          worked examples, practice sets, flashcards, and interactive tools)
          plus every other unit in all 16 AP courses.
        </p>
        <ul className="mt-4 space-y-1.5 text-[13.5px] text-body">
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 rounded-full bg-orange" />
            <span>
              Every CED topic in every unit — written walkthroughs +
              diagrams/maps
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 rounded-full bg-orange" />
            <span>
              Practice problems with solutions, Pro Notes, flashcards
            </span>
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
