"use client";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  COURSES,
  LESSONS,
  unitsForCourse,
  type CourseCategory,
  type CourseSlug,
  type Lesson,
} from "@/lib/topics";
import {
  getCurriculum,
  getCurriculumUnit,
  isUnitUnlocked,
  FREE_UNIT_LIMIT,
} from "@/lib/curriculum";
import { getUnitPractice } from "@/lib/practice";
import { getUnitTools } from "@/lib/courseTools";
import Flashcards from "@/app/components/Flashcards";
import SiteNav from "@/app/components/SiteNav";
import MathRender from "@/app/components/Math";
import CurriculumUnitView from "@/app/components/CurriculumUnitView";
import HighlightTooltip from "@/app/components/HighlightTooltip";
import PracticeProblems from "@/app/components/PracticeProblems";
import GraphingCalculator from "@/app/components/GraphingCalculator";
import Graph3D from "@/app/components/Graph3D";
import PhysicsSim from "@/app/components/PhysicsSim";
import CodeSandbox from "@/app/components/CodeSandbox";
import { useAuth } from "@/app/components/AuthProvider";

type Tab =
  | "curriculum"
  | "practice"
  | "tools"
  | "lesson"
  | "diagram"
  | "cards"
  | "links"
  | "solver";

export default function Study() {
  const [category, setCategory] = useState<CourseCategory>("math");
  const coursesInCategory = useMemo(
    () => COURSES.filter((c) => c.category === category),
    [category]
  );
  const { getIdToken, plan } = useAuth();
  const [courseSlug, setCourseSlug] = useState<CourseSlug>(COURSES[0].slug);
  const course = useMemo(
    () => COURSES.find((c) => c.slug === courseSlug)!,
    [courseSlug]
  );
  const curriculum = useMemo(() => getCurriculum(courseSlug), [courseSlug]);
  const units = useMemo(() => unitsForCourse(courseSlug), [courseSlug]);
  const [selectedUnit, setSelectedUnit] = useState<number>(
    units[0]?.number ?? 1
  );
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [tab, setTab] = useState<Tab>("curriculum");
  const [problem, setProblem] = useState("");
  const [explanation, setExplanation] = useState("");
  const [source, setSource] = useState<"curated" | "ai" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  const curriculumUnit = curriculum
    ? getCurriculumUnit(courseSlug, selectedUnit)
    : undefined;
  const locked = !isUnitUnlocked(selectedUnit, plan);
  const isPro = plan !== "free";
  const currentMembership = selectedLesson?.courses.find(
    (c) => c.courseSlug === courseSlug
  );

  const unitPractice = useMemo(
    () => getUnitPractice(courseSlug, selectedUnit),
    [courseSlug, selectedUnit]
  );
  const unitTools = useMemo(
    () => getUnitTools(courseSlug, selectedUnit),
    [courseSlug, selectedUnit]
  );

  const TABS: { key: Tab; label: string; show: boolean; proOnly?: boolean }[] = [
    { key: "curriculum", label: "Overview", show: !!curriculumUnit },
    {
      key: "practice",
      label: "Practice",
      show: unitPractice.length > 0,
    },
    {
      key: "tools",
      label: "Interactive",
      show: unitTools.length > 0,
    },
    { key: "lesson", label: "Lesson", show: !!selectedLesson, proOnly: true },
    {
      key: "diagram",
      label: "Diagram",
      show: !!selectedLesson?.diagram,
      proOnly: true,
    },
    { key: "cards", label: "Flashcards", show: !!selectedLesson, proOnly: true },
    {
      key: "links",
      label: "Links",
      show: !!selectedLesson && selectedLesson.links.length > 0,
      proOnly: true,
    },
    { key: "solver", label: "Solver", show: true },
  ];

  function selectLesson(l: Lesson) {
    setSelectedLesson(l);
    const m = l.courses.find((c) => c.courseSlug === courseSlug);
    if (m) setSelectedUnit(m.unitNumber);
    setTab("lesson");
    setExplanation("");
    setError("");
  }

  function selectUnit(n: number) {
    setSelectedUnit(n);
    setSelectedLesson(null);
    setTab("curriculum");
  }

  function switchCategory(cat: CourseCategory) {
    setCategory(cat);
    const firstCourse = COURSES.find((c) => c.category === cat);
    if (firstCourse) switchCourse(firstCourse.slug);
  }

  function switchCourse(slug: CourseSlug) {
    setCourseSlug(slug);
    const nextUnits = unitsForCourse(slug);
    const firstUnit = nextUnits[0]?.number ?? 1;
    setSelectedUnit(firstUnit);
    setSelectedLesson(null);
    setTab("curriculum");
    setExplanation("");
    setError("");
  }

  async function buy(
    checkoutPlan:
      | "pro-monthly"
      | "pro-sixmonth"
      | "premium-monthly"
      | "premium-sixmonth" = "pro-monthly"
  ) {
    setBuyLoading(true);
    try {
      const token = await getIdToken();
      if (!token) {
        window.location.href = `/signin?next=${encodeURIComponent(
          "/study?plan=" + checkoutPlan
        )}`;
        return;
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: checkoutPlan }),
      });
      const { url, error } = await res.json();
      if (url) window.location.href = url;
      else alert(error || "Checkout isn't wired up yet - set Stripe price IDs in env.");
    } finally {
      setBuyLoading(false);
    }
  }

  async function explain() {
    setLoading(true);
    setError("");
    setExplanation("");
    setLimitReached(false);
    setSource(null);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ problem }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.limitReached) setLimitReached(true);
        setError(data?.message || data?.error || "Something went wrong.");
      } else {
        setExplanation(data.explanation);
        setSource(data.source || null);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function loadSample() {
    if (!selectedLesson) return;
    setProblem(selectedLesson.sampleProblem);
    setTab("solver");
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav maxWidth="max-w-6xl">
        <a href="/chat" className="nav-link">Chat</a>
        <a href="/" className="nav-link">Home</a>
      </SiteNav>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-3xl">
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Study tool · {COURSES.length} AP courses ·{" "}
            {isPro ? "Pro access" : `free preview (Units 1-${FREE_UNIT_LIMIT})`}
          </div>
          <h1 className="mt-3 font-serif text-[42px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[56px]">
            Pick your AP course.
          </h1>
          <p className="mt-4 max-w-xl text-[17px] text-body">
            Every course is organized by the official College Board unit
            numbering. Units 1 and 2 of every course are free. Pro users unlock
            curriculum walkthroughs for every unit plus unlimited AI problem
            explanations.
          </p>
          {!isPro && (
            <div className="mt-5 inline-flex items-center gap-3 rounded-lg border border-orange/30 bg-orange-tint px-4 py-2 text-[13px] text-orange-ink">
              <span>
                You're on the free plan — Units 1 and 2 unlocked. Upgrade to
                unlock everything.
              </span>
              <button
                onClick={() => buy("pro-monthly")}
                disabled={buyLoading}
                className="btn-link text-orange-ink underline"
                data-testid="banner-upgrade-button"
              >
                Unlock Pro
              </button>
            </div>
          )}
        </div>

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap gap-6 border-b border-hair">
          {CATEGORIES.map((c) => {
            const active = c.key === category;
            const count = COURSES.filter((x) => x.category === c.key).length;
            return (
              <button
                key={c.key}
                onClick={() => switchCategory(c.key)}
                className={`relative -mb-px border-b-2 px-0 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "border-orange text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {c.label}{" "}
                <span className="ml-1 text-xs text-dim">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Course picker */}
        <div className="mt-6 flex flex-wrap gap-2">
          {coursesInCategory.map((c) => {
            const active = c.slug === courseSlug;
            return (
              <button
                key={c.slug}
                onClick={() => switchCourse(c.slug)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  active
                    ? "border-ink bg-ink text-white shadow-[0_4px_16px_-8px_rgba(0,0,0,0.3)]"
                    : "border-hair bg-white text-body hover:-translate-y-0.5 hover:border-rule hover:bg-offwhite"
                }`}
              >
                {c.title}
              </button>
            );
          })}
        </div>
        <p className="mt-4 max-w-2xl text-sm text-muted">{course.subtitle}</p>

        {curriculum && (
          <div className="mt-6 rounded-lg border border-hair bg-white p-5">
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              Exam at a glance
            </div>
            <div className="mt-2 grid gap-4 text-sm text-body md:grid-cols-3">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted">
                  Length
                </div>
                <div className="mt-1">{curriculum.examFormat.length}</div>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted">
                  Structure
                </div>
                <div className="mt-1">{curriculum.examFormat.structure}</div>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted">
                  Scoring
                </div>
                <div className="mt-1">{curriculum.examFormat.scoring}</div>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-[14px] text-body">
              {curriculum.framing}
            </p>
          </div>
        )}

        <section className="mt-10 grid gap-10 lg:grid-cols-[300px_1fr]">
          {/* Sidebar: units + lessons */}
          <aside className="space-y-6">
            {units.length === 0 && (
              <div className="rounded-md border border-hair bg-offwhite p-4 text-sm text-muted">
                No units defined yet.
              </div>
            )}
            {units.map((unit) => {
              const unitLocked = !isUnitUnlocked(unit.number, plan);
              const isActiveUnit =
                selectedUnit === unit.number && !selectedLesson;
              return (
                <div key={unit.number}>
                  <button
                    onClick={() => selectUnit(unit.number)}
                    className="group block w-full text-left"
                  >
                    <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                      Unit {unit.number}
                      {unitLocked && (
                        <span className="ml-2 rounded bg-orange/20 px-1.5 py-0.5 text-[9px] text-orange-ink">
                          PRO
                        </span>
                      )}
                    </div>
                    <div
                      className={`mt-0.5 text-[13px] font-medium transition-colors ${
                        isActiveUnit
                          ? "text-orange"
                          : "text-ink group-hover:text-orange"
                      }`}
                    >
                      {unit.title}
                    </div>
                  </button>
                  {unit.lessons.length > 0 && (
                    <ul className="mt-2 space-y-0.5 border-l border-hair pl-3">
                      {unit.lessons.map((l) => (
                        <li key={l.slug}>
                          <button
                            onClick={() => selectLesson(l)}
                            className={`flex w-full items-baseline gap-2 px-0 py-1 text-left text-[13px] transition-colors ${
                              selectedLesson?.slug === l.slug
                                ? "font-medium text-orange"
                                : "text-body hover:text-ink"
                            }`}
                          >
                            {selectedLesson?.slug === l.slug && (
                              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                            )}
                            <span>{l.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {unit.topics && unit.topics.length > 0 && (
                    <details className="group mt-2 pl-3">
                      <summary className="cursor-pointer list-none text-[11px] uppercase tracking-[0.12em] text-muted hover:text-ink">
                        <span className="inline-block w-3 transition-transform group-open:rotate-90">
                          ›
                        </span>
                        <span className="ml-1">
                          {unit.topics.length} CED topics
                        </span>
                      </summary>
                      <ul className="mt-2 space-y-1 border-l border-hair pl-3">
                        {unit.topics.map((t) => (
                          <li
                            key={t.id}
                            className="flex items-start gap-2 text-[12px] leading-snug text-muted"
                          >
                            <span className="shrink-0 font-mono text-[11px] text-dim">
                              {t.id}
                            </span>
                            <span>{t.title}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              );
            })}
          </aside>

          {/* Main panel */}
          <div>
            {!curriculumUnit && !selectedLesson ? (
              <EmptyCourseView courseTitle={course.title} />
            ) : (
              <>
                {selectedLesson && (
                  <div className="border-b border-hair pb-6">
                    <div className="meta">
                      {course.title}
                      {currentMembership
                        ? ` · Unit ${currentMembership.unitNumber}: ${currentMembership.unitTitle}`
                        : ""}
                    </div>
                    <h2 className="mt-1 font-serif text-3xl font-normal text-ink sm:text-4xl">
                      {selectedLesson.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-muted">
                      <MathRender auto>{selectedLesson.blurb}</MathRender>
                    </p>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-6 border-b border-hair">
                  {TABS.filter((t) => t.show).map((t) => {
                    const needsPro = t.proOnly && plan === "free";
                    return (
                      <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`relative -mb-px flex items-center gap-1.5 border-b-2 px-0 py-3 text-sm font-medium transition-colors ${
                          tab === t.key
                            ? "border-orange text-ink"
                            : "border-transparent text-muted hover:text-ink"
                        }`}
                      >
                        {t.label}
                        {needsPro && (
                          <span className="rounded bg-orange/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-ink">
                            Pro
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <HighlightTooltip>
                <div
                  key={`${courseSlug}-${selectedUnit}-${selectedLesson?.slug ?? ""}-${tab}`}
                  className="mt-8 animate-fadeUp"
                >
                  {tab === "curriculum" && curriculumUnit && (
                    <CurriculumUnitView
                      unit={curriculumUnit}
                      locked={locked}
                      onUpgrade={() => buy("pro-monthly")}
                    />
                  )}

                  {tab === "practice" && (
                    <>
                      {locked ? (
                        <LockedTabTeaser
                          label="practice problems"
                          count={unitPractice.length}
                          onUpgrade={() => buy("pro-monthly")}
                        />
                      ) : (
                        <PracticeProblems
                          problems={unitPractice}
                          courseSlug={courseSlug}
                          unitNumber={selectedUnit}
                          courseTitle={course.title}
                        />
                      )}
                    </>
                  )}

                  {tab === "tools" && (
                    <>
                      {locked ? (
                        <LockedTabTeaser
                          label="interactive tools"
                          count={unitTools.length}
                          onUpgrade={() => buy("pro-monthly")}
                        />
                      ) : (
                        <ToolsPanel tools={unitTools} />
                      )}
                    </>
                  )}

                  {tab === "lesson" && selectedLesson && (
                    plan === "free" ? (
                      <LockedTabTeaser
                        label="full lesson walkthrough"
                        count={selectedLesson.keyIdeas.length}
                        onUpgrade={() => buy("pro-monthly")}
                      />
                    ) : (
                      <div className="max-w-2xl">
                        <ul className="space-y-3 text-[16px]">
                          {selectedLesson.keyIdeas.map((k) => (
                            <li key={k} className="flex gap-3 text-body">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange" />
                              <span>
                                <MathRender auto>{k}</MathRender>
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8 rounded-md border border-hair bg-offwhite p-5">
                          <div className="meta">Worked example</div>
                          <div className="mt-1 text-[15px] text-ink">
                            <MathRender auto>
                              {selectedLesson.sampleProblem}
                            </MathRender>
                          </div>
                          <button onClick={loadSample} className="btn-link mt-3">
                            Show the full walkthrough →
                          </button>
                        </div>
                      </div>
                    )
                  )}

                  {tab === "diagram" && selectedLesson?.diagram && (
                    <div className="max-w-2xl rounded-md border border-hair bg-white p-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedLesson.diagram,
                        }}
                      />
                      <div className="mt-3 text-xs text-muted">
                        Hand-coded SVG. Not a stock illustration.
                      </div>
                    </div>
                  )}

                  {tab === "cards" && selectedLesson && (
                    plan === "free" ? (
                      <LockedTabTeaser
                        label="flashcards"
                        count={selectedLesson.flashcards.length}
                        onUpgrade={() => buy("pro-monthly")}
                      />
                    ) : (
                      <div className="max-w-2xl">
                        <Flashcards
                          cards={selectedLesson.flashcards}
                          storageKey={selectedLesson.slug}
                        />
                        <p className="mt-4 text-xs text-muted">
                          Progress is stored locally in your browser. Clearing site
                          data will reset your "known" marks.
                        </p>
                      </div>
                    )
                  )}

                  {tab === "links" && selectedLesson && (
                    <div className="max-w-2xl">
                      <p className="mb-4 text-sm text-muted">
                        External resources recommended for this topic. Not
                        affiliate links.
                      </p>
                      <ul className="divide-y divide-hair border-y border-hair">
                        {selectedLesson.links.map((l) => (
                          <li key={l.url}>
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between py-4"
                            >
                              <div>
                                <div className="font-medium text-ink group-hover:text-orange">
                                  {l.title}
                                </div>
                                <div className="meta">{l.source}</div>
                              </div>
                              <span className="text-muted group-hover:text-orange">
                                ↗
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tab === "solver" && (
                    <SolverPanel
                      problem={problem}
                      setProblem={setProblem}
                      explain={explain}
                      loading={loading}
                      error={error}
                      limitReached={limitReached}
                      explanation={explanation}
                      source={source}
                    />
                  )}
                </div>
                </HighlightTooltip>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function ToolsPanel({
  tools,
}: {
  tools: ReturnType<typeof getUnitTools>;
}) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
        Interactive tools ({tools.length})
      </div>
      {tools.map((tool, i) => {
        if (tool.type === "graph2d") {
          return <GraphingCalculator key={i} initialExprs={tool.initial} />;
        }
        if (tool.type === "graph3d") {
          return <Graph3D key={i} initialExpr={tool.initial} />;
        }
        if (tool.type === "physics") {
          return <PhysicsSim key={i} kind={tool.kind} />;
        }
        if (tool.type === "code-java") {
          return (
            <div key={i}>
              {tool.prompt && (
                <p className="mb-2 text-[13px] text-muted">{tool.prompt}</p>
              )}
              <CodeSandbox
                mode="java-trace"
                initialCode={tool.initialCode}
                expectedOutput={tool.expectedOutput}
              />
            </div>
          );
        }
        if (tool.type === "code-pseudo") {
          return (
            <div key={i}>
              {tool.prompt && (
                <p className="mb-2 text-[13px] text-muted">{tool.prompt}</p>
              )}
              <CodeSandbox
                mode="pseudo"
                initialCode={tool.initialCode}
                expectedOutput={tool.expectedOutput}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function LockedTabTeaser({
  label,
  count,
  onUpgrade,
}: {
  label: string;
  count: number;
  onUpgrade: () => void;
}) {
  return (
    <div className="max-w-2xl rounded-xl border-2 border-orange/40 bg-orange-tint p-6">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-orange-ink">
        Pro content
      </div>
      <h4 className="mt-2 font-serif text-2xl font-normal text-ink">
        Unlock {count} {label} for this unit.
      </h4>
      <p className="mt-3 max-w-xl text-[15px] text-body">
        Free users get full access to Units 1 and 2 of every course. Upgrade
        to Pro to unlock practice problems, interactive simulations, graphing
        calculators, and live code runners for every unit of every AP course.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={onUpgrade} className="btn-primary text-sm">
          Unlock Pro — $16/month
        </button>
        <a href="/#price" className="btn-ghost text-sm">
          See 6-month ($90) →
        </a>
      </div>
    </div>
  );
}

function EmptyCourseView({ courseTitle }: { courseTitle: string }) {
  return (
    <div className="rounded-md border border-dashed border-hair bg-offwhite p-8">
      <div className="meta">{courseTitle}</div>
      <h2 className="mt-2 font-serif text-3xl font-normal text-ink">
        Curriculum coming soon.
      </h2>
      <p className="mt-3 max-w-xl text-muted">
        The official AP unit structure for this course is listed in the
        sidebar. Pro curriculum walkthroughs are rolling out. In the meantime,
        you can use the solver tab to paste any problem from this course.
      </p>
    </div>
  );
}

function SolverPanel({
  problem,
  setProblem,
  explain,
  loading,
  error,
  limitReached,
  explanation,
  source,
}: {
  problem: string;
  setProblem: (v: string) => void;
  explain: () => void;
  loading: boolean;
  error: string;
  limitReached: boolean;
  explanation: string;
  source: "curated" | "ai" | null;
}) {
  return (
    <div className="max-w-2xl">
      <label htmlFor="problem" className="text-sm font-medium text-ink">
        Paste any problem
      </label>
      <p className="mt-1 text-xs text-muted">
        If it matches one of the curated lessons, you'll get an instant
        walkthrough (free). Anything else counts against your AI budget — free
        users get 10 messages per 5-hour window.
      </p>
      <textarea
        id="problem"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        rows={4}
        placeholder="e.g. Find dy/dx if y = (3x^2 + 1)^5"
        className="focus-ring mt-3 w-full rounded-lg border border-hair bg-white px-5 py-4 font-mono text-[14px] leading-6 text-ink placeholder-dim"
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={explain}
          disabled={loading || !problem.trim()}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Working on it…" : "Explain this"}
        </button>
        {!problem.trim() && (
          <span className="text-xs text-dim">Paste a problem first.</span>
        )}
      </div>
      {error && (
        <div
          className={`mt-4 rounded-md border p-4 text-sm ${
            limitReached
              ? "border-orange/40 bg-orange-tint text-orange-ink"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          <div>{error}</div>
          {limitReached && (
            <a href="/#price" className="mt-2 inline-block btn-link">
              Unlock unlimited — $9/month →
            </a>
          )}
        </div>
      )}
      {explanation && (
        <div className="mt-6 border-l-2 border-orange pl-5 text-[15.5px] leading-relaxed text-body">
          <div className="mb-2 flex items-center justify-between">
            <div className="meta">Walkthrough</div>
            {source && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                {source === "curated" ? "Pre-written" : "Generated"}
              </span>
            )}
          </div>
          <div className="whitespace-pre-wrap font-sans">
            <MathRender auto>{explanation}</MathRender>
          </div>
        </div>
      )}
    </div>
  );
}
