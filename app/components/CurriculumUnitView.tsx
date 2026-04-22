"use client";
import type { CurriculumUnit } from "@/lib/curriculum";
import type { ApTopic } from "@/lib/topics";
import type { PlanTier } from "@/lib/plans";
import { getCedLesson, type CedLesson } from "@/lib/cedLessons";
import { apCentralLinksFor } from "@/lib/apCentralLinks";
import { lessonKey } from "@/lib/social";
import MathRender from "./Math";
import Markdown from "./Markdown";
import LessonComments from "./LessonComments";

type Props = {
  unit: CurriculumUnit;
  courseSlug?: string;
  plan?: PlanTier;
  locked?: boolean;
  onUpgrade?: () => void;
};

export default function CurriculumUnitView({
  unit,
  courseSlug,
  locked,
  onUpgrade,
}: Props) {
  if (locked) {
    return <LockedUnitView unit={unit} onUpgrade={onUpgrade} />;
  }
  return <UnlockedUnitView unit={unit} courseSlug={courseSlug} />;
}

function UnlockedUnitView({
  unit,
  courseSlug,
}: {
  unit: CurriculumUnit;
  courseSlug?: string;
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
        {courseSlug && <ApCentralUnitLinks courseSlug={courseSlug} />}
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
          same wrong answer on thousands of exams:{" "}
          {unit.commonMistakes[0] || "watch the signs"} is the #1 one. When you
          hit practice problems, do the hard one first; if you can do it, the
          easy ones are free.
        </p>
      </div>

      {courseSlug && (
        <LessonComments
          lessonKey={lessonKey(courseSlug, unit.unitNumber)}
        />
      )}
    </div>
  );
}

export function CedLessonsView({
  courseSlug,
  unit,
  lessonNumber,
  lessonTitle,
  topics,
  activeTopicId,
  onSelectTopic,
  completedTopicIds,
  onToggleTopicComplete,
  togglingTopicId,
  hideHeader,
}: {
  courseSlug: string;
  unit: CurriculumUnit;
  lessonNumber: number;
  lessonTitle: string;
  topics: ApTopic[];
  activeTopicId: string;
  onSelectTopic: (topicId: string) => void;
  /** Subset of these topic ids the user has marked complete. */
  completedTopicIds?: Set<string>;
  /** When provided, renders a Mark-complete toggle for the active topic. */
  onToggleTopicComplete?: (topicId: string, next: boolean) => void;
  togglingTopicId?: string | null;
  /** In Book Mode the wrapping BookPage owns the lesson title, so hide the
   * internal header to avoid a duplicate heading. */
  hideHeader?: boolean;
}) {
  const active = topics.find((t) => t.id === activeTopicId) ?? topics[0];
  if (!active) return null;
  const lesson = getCedLesson(courseSlug, active.id);
  const completed = completedTopicIds ?? new Set<string>();
  const isActiveCompleted = completed.has(active.id);
  const isToggling = togglingTopicId === active.id;

  return (
    <div className="max-w-3xl space-y-6">
      {!hideHeader && (
        <div>
          <div className="meta">
            Unit {unit.unitNumber} · Lesson {lessonNumber}
          </div>
          <h3 className="mt-1 font-serif text-3xl font-normal text-ink">
            {lessonTitle}
          </h3>
          <div className="mt-1 text-[13px] text-muted">{unit.title}</div>
        </div>
      )}

      <div className="-mx-1 flex flex-wrap gap-1 border-b border-hair pb-0">
        {topics.map((t) => {
          const isActive = t.id === active.id;
          const isDone = completed.has(t.id);
          return (
            <button
              key={t.id}
              onClick={() => onSelectTopic(t.id)}
              className={`-mb-px flex items-center gap-1.5 whitespace-nowrap rounded-t-md border-b-2 px-3 py-2 text-[12px] transition ${
                isActive
                  ? "border-orange bg-paper font-medium text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <span className="font-mono text-[10.5px] text-dim">{t.id}</span>
              <span>{t.title}</span>
              {isDone && (
                <span className="text-[11px] text-green-700">✓</span>
              )}
            </button>
          );
        })}
      </div>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-mono text-[12px] text-muted">{active.id}</span>
          <h4 className="font-serif text-2xl font-normal text-ink">
            {active.title}
          </h4>
          <ApCentralTopicLink courseSlug={courseSlug} />
        </div>
        {lesson?.summary && (
          <p className="mt-2 text-[14.5px] text-muted">
            <MathRender auto>{lesson.summary}</MathRender>
          </p>
        )}
      </div>

      {lesson ? (
        <LessonBody lesson={lesson} />
      ) : (
        <LessonFallback topicId={active.id} title={active.title} />
      )}

      {onToggleTopicComplete && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-hair bg-paper p-4">
          <div>
            <div className="label">Sublesson progress</div>
            <div className="mt-1 text-[13px] text-muted">
              {isActiveCompleted
                ? "Marked complete. This sublesson counts toward your course progress."
                : "Done with this sublesson? Mark it complete to advance your progress."}
            </div>
          </div>
          <button
            onClick={() =>
              onToggleTopicComplete(active.id, !isActiveCompleted)
            }
            disabled={isToggling}
            className={
              isActiveCompleted
                ? "shrink-0 rounded-md border border-green-600/40 bg-green-50 px-3 py-2 text-[13px] font-medium text-green-700 hover:bg-green-100 disabled:opacity-60"
                : "shrink-0 rounded-md bg-ink px-3 py-2 text-[13px] font-medium text-paper hover:bg-ink/90 disabled:opacity-60"
            }
          >
            {isActiveCompleted ? "✓ Completed" : "Mark complete"}
          </button>
        </div>
      )}
    </div>
  );
}

function LessonBody({ lesson }: { lesson: CedLesson }) {
  return (
    <div className="space-y-6">
      <div className="prose-body text-[15px] leading-relaxed">
        <Markdown>{lesson.lesson}</Markdown>
      </div>

      {lesson.diagram && (
        <div
          className="rounded-md border border-hair bg-paper p-3"
          dangerouslySetInnerHTML={{ __html: lesson.diagram }}
        />
      )}

      {lesson.keyIdeas.length > 0 && (
        <Section title="Key ideas">
          <ul className="space-y-1.5 text-[14px]">
            {lesson.keyIdeas.map((k, i) => (
              <li key={i} className="flex gap-2 text-body">
                <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-orange" />
                <span>
                  <MathRender auto>{k}</MathRender>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {lesson.workedExample && (
        <div className="rounded-md border-l-2 border-orange bg-offwhite px-4 py-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-orange-ink">
            Worked example
          </div>
          <div className="mt-2 text-[14px] text-body">
            <div className="font-medium text-ink">
              <Markdown>{lesson.workedExample.prompt}</Markdown>
            </div>
            <div className="mt-2">
              <Markdown>{lesson.workedExample.solution}</Markdown>
            </div>
          </div>
        </div>
      )}

      {lesson.commonMistakes.length > 0 && (
        <Section title="Common mistakes">
          <ul className="space-y-1.5 text-[13.5px]">
            {lesson.commonMistakes.map((m, i) => (
              <li key={i} className="flex gap-2 text-body">
                <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-red-400" />
                <span>
                  <MathRender auto>{m}</MathRender>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function LessonFallback({
  topicId,
  title,
}: {
  topicId: string;
  title: string;
}) {
  const teach = `/chat?q=${encodeURIComponent(
    `Teach me AP topic ${topicId}: ${title}. Give me the core concept, a worked example, and 2 common mistakes I should watch for.`
  )}`;
  const quiz = `/chat?q=${encodeURIComponent(
    `Quiz me on AP topic ${topicId}: ${title}. Start with one MCQ, then a free-response that's exam-style.`
  )}`;
  return (
    <div className="rounded-md border border-hair bg-offwhite p-5">
      <p className="text-[14.5px] leading-relaxed text-body">
        A full written walkthrough for{" "}
        <span className="font-medium text-ink">{title}</span> is still being
        drafted. In the meantime the AI tutor can teach you this topic
        step-by-step, with diagrams and worked examples tuned to your level.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={teach}
          className="rounded-md border border-orange bg-orange px-3 py-1.5 text-[12px] font-medium text-white hover:bg-orange-hover"
        >
          Teach me this in chat →
        </a>
        <a
          href={quiz}
          className="rounded-md border border-hair bg-paper px-3 py-1.5 text-[12px] font-medium text-ink hover:bg-offwhite"
        >
          Quiz me on it
        </a>
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
              Every CED topic in every unit: written walkthroughs +
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
            <span>Larger AI chat budget: 8x what Free gets</span>
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onUpgrade}
            className="btn-primary text-sm"
            data-testid="unit-upgrade-button"
          >
            Unlock Pro - $16/month
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

/** Small "AP Central ↗" chip next to a CED topic. Goes to the course's
 *  official AP Central page: the authoritative source for this framework
 *  entry. (College Board doesn't expose per-topic deep links; the topic
 *  code only appears inside the downloadable CED PDF.) */
function ApCentralTopicLink({ courseSlug }: { courseSlug: string }) {
  const links = apCentralLinksFor(courseSlug);
  if (!links) return null;
  return (
    <a
      href={links.course}
      target="_blank"
      rel="noopener noreferrer"
      title="View this course on AP Central"
      className="ml-1 inline-flex items-center gap-1 rounded-full border border-hair px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted hover:border-orange hover:text-orange-ink"
    >
      AP Central <span aria-hidden>↗</span>
    </a>
  );
}

/** Pair of links at the unit level: the course page on AP Central plus
 *  the downloadable CED PDF (when published). */
function ApCentralUnitLinks({ courseSlug }: { courseSlug: string }) {
  const links = apCentralLinksFor(courseSlug);
  if (!links) return null;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
      <a
        href={links.course}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted underline-offset-2 hover:text-orange-ink hover:underline"
      >
        View on AP Central ↗
      </a>
      {links.cedPdf && (
        <>
          <span className="text-dim">·</span>
          <a
            href={links.cedPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted underline-offset-2 hover:text-orange-ink hover:underline"
          >
            Official CED PDF ↗
          </a>
        </>
      )}
    </div>
  );
}
