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
import Flashcards from "@/app/components/Flashcards";
import SiteNav from "@/app/components/SiteNav";
import MathRender from "@/app/components/Math";
import { useAuth } from "@/app/components/AuthProvider";

type Tab = "lesson" | "diagram" | "cards" | "links" | "solver";

export default function Study() {
  const [category, setCategory] = useState<CourseCategory>("math");
  const coursesInCategory = useMemo(
    () => COURSES.filter((c) => c.category === category),
    [category]
  );
  const { getIdToken } = useAuth();
  const [courseSlug, setCourseSlug] = useState<CourseSlug>(COURSES[0].slug);
  const course = useMemo(
    () => COURSES.find((c) => c.slug === courseSlug)!,
    [courseSlug]
  );
  const units = useMemo(() => unitsForCourse(courseSlug), [courseSlug]);
  const firstLessonInCourse = units
    .flatMap((u) => u.lessons)[0];
  const [selected, setSelected] = useState<Lesson | null>(
    firstLessonInCourse ?? LESSONS[0]
  );
  const [tab, setTab] = useState<Tab>("lesson");
  const [problem, setProblem] = useState("");
  const [explanation, setExplanation] = useState("");
  const [source, setSource] = useState<"curated" | "ai" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);

  const currentMembership = selected?.courses.find(
    (c) => c.courseSlug === courseSlug
  );
  const hasAnyLessons = units.some((u) => u.lessons.length > 0);

  const TABS: { key: Tab; label: string; show: boolean }[] = [
    { key: "lesson", label: "Lesson", show: !!selected },
    { key: "diagram", label: "Diagram", show: !!selected?.diagram },
    { key: "cards", label: "Flashcards", show: !!selected },
    { key: "links", label: "Links", show: !!selected && selected.links.length > 0 },
    { key: "solver", label: "Solver", show: true },
  ];

  function selectLesson(l: Lesson) {
    setSelected(l);
    setTab("lesson");
    setExplanation("");
    setError("");
  }

  function switchCategory(cat: CourseCategory) {
    setCategory(cat);
    const firstCourse = COURSES.find((c) => c.category === cat);
    if (firstCourse) switchCourse(firstCourse.slug);
  }

  function switchCourse(slug: CourseSlug) {
    setCourseSlug(slug);
    const first = unitsForCourse(slug).flatMap((u) => u.lessons)[0];
    setSelected(first ?? null);
    setTab(first ? "lesson" : "solver");
    setExplanation("");
    setError("");
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
    if (!selected) return;
    setProblem(selected.sampleProblem);
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
            Study tool · {COURSES.length} AP courses · free demo
          </div>
          <h1 className="mt-3 font-serif text-[42px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[56px]">
            Pick your AP course.
          </h1>
          <p className="mt-4 max-w-xl text-[17px] text-body">
            Every course is organized by the official College Board unit
            numbering. Lessons ship with a short summary, a diagram where it
            helps, flashcards, curated links, and a worked example you can run
            free and instantly.
          </p>
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

        <section className="mt-10 grid gap-10 lg:grid-cols-[300px_1fr]">
          {/* Sidebar: units + lessons */}
          <aside className="space-y-8">
            {units.length === 0 && (
              <div className="rounded-md border border-hair bg-offwhite p-4 text-sm text-muted">
                No units defined yet.
              </div>
            )}
            {units.map((unit) => (
              <div key={unit.number}>
                <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                  Unit {unit.number}
                </div>
                <div className="mt-0.5 text-[13px] font-medium text-ink">
                  {unit.title}
                </div>
                <ul className="mt-2 space-y-0.5 border-l border-hair pl-3">
                  {unit.lessons.length === 0 ? (
                    <li className="py-1 text-[12px] italic text-dim">
                      Lessons coming soon
                    </li>
                  ) : (
                    unit.lessons.map((l) => (
                      <li key={l.slug}>
                        <button
                          onClick={() => selectLesson(l)}
                          className={`flex w-full items-baseline gap-2 px-0 py-1 text-left text-[14px] transition-colors ${
                            selected?.slug === l.slug
                              ? "font-medium text-orange"
                              : "text-body hover:text-ink"
                          }`}
                        >
                          {selected?.slug === l.slug && (
                            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                          )}
                          <span>{l.title}</span>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}
          </aside>

          {/* Main lesson panel */}
          <div>
            {!selected ? (
              <EmptyCourseView courseTitle={course.title} hasAny={hasAnyLessons} />
            ) : (
              <>
                <div className="border-b border-hair pb-6">
                  <div className="meta">
                    {course.title}
                    {currentMembership
                      ? ` · Unit ${currentMembership.unitNumber}: ${currentMembership.unitTitle}`
                      : ""}
                  </div>
                  <h2 className="mt-1 font-serif text-3xl font-normal text-ink sm:text-4xl">
                    {selected.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-muted">
                    <MathRender auto>{selected.blurb}</MathRender>
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-6 border-b border-hair">
                  {TABS.filter((t) => t.show).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`relative -mb-px border-b-2 px-0 py-3 text-sm font-medium transition-colors ${
                        tab === t.key
                          ? "border-orange text-ink"
                          : "border-transparent text-muted hover:text-ink"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div key={`${selected.slug}-${tab}`} className="mt-8 animate-fadeUp">
                  {tab === "lesson" && (
                    <div className="max-w-2xl">
                      <ul className="space-y-3 text-[16px]">
                        {selected.keyIdeas.map((k) => (
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
                          <MathRender auto>{selected.sampleProblem}</MathRender>
                        </div>
                        <button onClick={loadSample} className="btn-link mt-3">
                          Show the full walkthrough →
                        </button>
                      </div>
                    </div>
                  )}

                  {tab === "diagram" && selected.diagram && (
                    <div className="max-w-2xl rounded-md border border-hair bg-white p-4">
                      <div dangerouslySetInnerHTML={{ __html: selected.diagram }} />
                      <div className="mt-3 text-xs text-muted">
                        Hand-coded SVG. Not a stock illustration.
                      </div>
                    </div>
                  )}

                  {tab === "cards" && (
                    <div className="max-w-2xl">
                      <Flashcards cards={selected.flashcards} storageKey={selected.slug} />
                      <p className="mt-4 text-xs text-muted">
                        Progress is stored locally in your browser. Clearing site
                        data will reset your "known" marks.
                      </p>
                    </div>
                  )}

                  {tab === "links" && (
                    <div className="max-w-2xl">
                      <p className="mb-4 text-sm text-muted">
                        External resources recommended for this topic. Not
                        affiliate links.
                      </p>
                      <ul className="divide-y divide-hair border-y border-hair">
                        {selected.links.map((l) => (
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
                              <span className="text-muted group-hover:text-orange">↗</span>
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
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function EmptyCourseView({
  courseTitle,
  hasAny,
}: {
  courseTitle: string;
  hasAny: boolean;
}) {
  return (
    <div className="rounded-md border border-dashed border-hair bg-offwhite p-8">
      <div className="meta">{courseTitle}</div>
      <h2 className="mt-2 font-serif text-3xl font-normal text-ink">
        Unit outline is ready. Lessons coming soon.
      </h2>
      <p className="mt-3 max-w-xl text-muted">
        The full AP unit structure for this course is listed in the sidebar.
        Curated walkthroughs, diagrams, and flashcards are rolling out next.
        In the meantime, you can use the solver tab to paste any problem from
        this course and get a step-by-step explanation.
      </p>
      <div className="mt-4 text-xs text-muted">
        {hasAny
          ? "Some lessons are available - pick one from the sidebar."
          : "Nothing curated yet for this course."}
      </div>
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
        walkthrough (free). Anything else requires the $19 unlock, since each
        arbitrary problem costs an API call.
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
            <a href="/" className="mt-2 inline-block btn-link">
              Unlock unlimited for $19 →
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
