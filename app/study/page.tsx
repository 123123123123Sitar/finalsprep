"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  doc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { subscribeSelectedCourses } from "@/lib/selectedCourses";
import { postScoreEvent } from "@/lib/postScoreEvent";
import {
  COURSES,
  LESSONS,
  unitsForCourse,
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
import SiteNav from "@/app/components/SiteNav";
import CourseIcon from "@/app/components/CourseIcon";
import MathRender from "@/app/components/Math";
import CurriculumUnitView, {
  CedLessonsView,
} from "@/app/components/CurriculumUnitView";
import {
  groupTopicsIntoLessons,
  findLessonGroupFor,
} from "@/lib/cedLessonGroups";
import HighlightTooltip from "@/app/components/HighlightTooltip";
import PracticeProblems from "@/app/components/PracticeProblems";
import BookmarkButton from "@/app/components/BookmarkButton";

// Heavy interactive widgets are lazy-loaded. Each bundles a chunky
// third-party library (Desmos for the graphing calc, Plotly/three for
// Graph3D, Monaco/pyodide for CodeSandbox, canvas animations for
// PhysicsSim). next/dynamic with a loading fallback defers fetching
// the chunk until the widget actually renders, so a user studying a
// humanities course never pays for the math widgets. Flashcards stays
// statically imported (it is small and shown on the default tab).
const DesmosCalculator = dynamic(
  () => import("@/app/components/DesmosCalculator"),
  { loading: () => <WidgetLoading label="Loading calculator" /> }
);
const Graph3D = dynamic(() => import("@/app/components/Graph3D"), {
  loading: () => <WidgetLoading label="Loading 3D graph" />,
});
const PhysicsSim = dynamic(() => import("@/app/components/PhysicsSim"), {
  loading: () => <WidgetLoading label="Loading physics simulation" />,
});
const CodeSandbox = dynamic(() => import("@/app/components/CodeSandbox"), {
  loading: () => <WidgetLoading label="Loading code sandbox" />,
});
import Flashcards from "@/app/components/Flashcards";

function WidgetLoading({ label }: { label: string }) {
  return (
    <div className="flex h-48 items-center justify-center rounded-md border border-hair bg-offwhite/60 text-[13px] text-muted">
      {label}…
    </div>
  );
}
import {
  BookModeToggle,
  BookPage,
  useBookMode,
} from "@/app/components/BookMode";
import CoursePicker from "@/app/components/CoursePicker";
import PageLoader from "@/app/components/PageLoader";
import LessonAnnotationsPanel from "@/app/components/LessonAnnotations";
import InlineHighlights from "@/app/components/InlineHighlights";
import { examCountdownLabel } from "@/lib/examDates";
import {
  cedTopicSlug,
  setLessonCompleted,
  subscribeCompletedSlugs,
} from "@/lib/progress";
import { hasMcqs, loadMcqsFor, PRIMARY_COUNT, type Mcq } from "@/lib/mcqs";
import { Quiz } from "@/app/components/Quiz";
import { recordActivityClient } from "@/lib/activityClient";
import { useAuth } from "@/app/components/AuthProvider";
import { useFirstLook } from "@/app/components/FirstLookProvider";
import type { PlanTier } from "@/lib/plans";

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
  const { user, loading: authLoading, getIdToken, plan, planLoading } = useAuth();
  const { bookMode } = useBookMode();
  // Enrollment state machine:
  //   null  = unresolved (auth or Firestore still pending)
  //   []    = resolved, user has selected no courses → show picker
  //   [..]  = resolved, render the dashboard
  // Crucially we do NOT collapse "auth loading" into "signed out", because
  // that used to flash the "Pick your AP courses" screen for a frame on
  // reload before the Firestore snapshot arrived.
  const [selectedCourses, setSelectedCourses] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    // Hold the loading sentinel until auth resolves - otherwise a signed-in
    // user's first render would see `!user` and flip the state to `[]`,
    // triggering the empty-state UI before we even know who they are.
    if (authLoading) {
      setSelectedCourses(null);
      return;
    }
    if (!user) {
      setSelectedCourses([]);
      return;
    }
    const db = getDb();
    if (!db) {
      setSelectedCourses([]);
      return;
    }
    // Reset to the loading sentinel when the user identity changes so the
    // previous user's snapshot doesn't briefly render for the new user.
    setSelectedCourses(null);
    const unsub = subscribeSelectedCourses(db, user.uid, setSelectedCourses);
    return () => unsub();
  }, [user, authLoading]);

  // Single source of truth for "what the user can see on /study". Derived
  // strictly from the added list - no hardcoded defaults, no fallback.
  const coursesLoading = selectedCourses === null;
  const addedCourses = useMemo(
    () =>
      selectedCourses
        ? COURSES.filter((c) => selectedCourses.includes(c.slug))
        : [],
    [selectedCourses]
  );
  // Lazy default: the first added course, not COURSES[0]. Reconciled below
  // whenever the added list changes.
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
  const [viewedCedTopic, setViewedCedTopic] = useState<string | null>(null);
  // Course-level "Exam Guide" page - sits before Unit 1 in the sidebar and
  // shows the at-a-glance exam format + framing. Opening a course lands here
  // so students see the exam shape before diving into units.
  const [viewExamGuide, setViewExamGuide] = useState<boolean>(true);

  // Keep the active course pinned to something the user has actually added.
  // Runs whenever the added list changes; no-op if the current slug is
  // still valid, so it doesn't fight with explicit user clicks.
  useEffect(() => {
    if (coursesLoading) return;
    if (addedCourses.length === 0) return;
    if (addedCourses.some((c) => c.slug === courseSlug)) return;
    const next = addedCourses[0];
    setCourseSlug(next.slug);
    const nextUnits = unitsForCourse(next.slug);
    setSelectedUnit(nextUnits[0]?.number ?? 1);
    setSelectedLesson(null);
    setTab("curriculum");
  }, [coursesLoading, addedCourses, courseSlug]);

  // Deep-link from /bookmarks or external links: ?course=slug&lesson=slug.
  // Only honor the deep link if the target course is actually in the added
  // list - otherwise we'd re-introduce the "unassigned lessons on screen" bug
  // through the back door. We wait until the added list has resolved so a
  // signed-in user's assignments are considered before accepting the param.
  const [deepLinkHandled, setDeepLinkHandled] = useState(false);
  useEffect(() => {
    if (deepLinkHandled) return;
    if (coursesLoading) return;
    if (typeof window === "undefined") return;
    setDeepLinkHandled(true);
    const params = new URLSearchParams(window.location.search);
    const courseParam = params.get("course") as CourseSlug | null;
    const lessonParam = params.get("lesson");
    const unitParam = params.get("unit");
    const topicParam = params.get("topic");
    const courseIsAdded =
      !!courseParam && addedCourses.some((c) => c.slug === courseParam);
    if (courseIsAdded && courseParam) {
      setCourseSlug(courseParam);
      setView("course");
    }
    if (lessonParam && courseIsAdded) {
      const l = LESSONS.find((x) => x.slug === lessonParam);
      if (l) {
        setSelectedLesson(l);
        const m = l.courses.find(
          (c) => c.courseSlug === (courseParam ?? courseSlug)
        );
        if (m) setSelectedUnit(m.unitNumber);
        setTab("lesson");
        setView("course");
        setViewExamGuide(false);
      }
    } else if (unitParam && courseIsAdded) {
      const unitNum = parseInt(unitParam, 10);
      if (!isNaN(unitNum)) {
        setSelectedUnit(unitNum);
        setViewExamGuide(false);
        setTab("curriculum");
        if (topicParam) setViewedCedTopic(topicParam);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursesLoading, addedCourses]);

  // Always start on the Overview tab when the page first mounts or when the
  // user switches to a unit without a lesson context. Prevents landing on
  // "lesson" or "solver" from a stale prior state.
  useEffect(() => {
    if (!selectedLesson) setTab("curriculum");
    // Only depend on the course/unit/lesson identifiers so we don't fight
    // the user's manual tab clicks within a unit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSlug, selectedUnit]);

  const [problem, setProblem] = useState("");
  const [explanation, setExplanation] = useState("");
  const [source, setSource] = useState<"curated" | "ai" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Pre-fill the problem textarea from a `?q=...` query param. Lets
  // blog review guides (and any other referrer) deep-link into the
  // tutor with starter text already loaded — e.g. "Help me review AP
  // Biology. I just read the review guide." The param is consumed
  // once on mount; reloading the page without the param does not
  // re-prompt.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q && !problem) {
      setProblem(q);
      // Strip the param from the URL so a reload does not re-apply it
      // and so the URL matches the user's current selection state.
      params.delete("q");
      const qs = params.toString();
      const next = window.location.pathname + (qs ? `?${qs}` : "");
      window.history.replaceState(null, "", next);
    }
    // Intentional: only run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // "home" = course grid with progress; "course" = the actual study workspace.
  // Starts on home so users always land on the overview, not a half-remembered
  // course from last session.
  const [view, setView] = useState<"home" | "course">("home");

  // Fire the deep course-view tour the first time the user opens a specific
  // course. Covers tabs, units, lesson tools, highlights, bookmarks,
  // flashcards, the quiz module, and (for learners) the PRO lock indicator.
  const { triggerIfUnseen } = useFirstLook();
  useEffect(() => {
    if (view !== "course") return;
    triggerIfUnseen("study-course-tour");
  }, [view, triggerIfUnseen]);

  // Sync URL with current course/unit/lesson selection so each has a
  // bookmarkable route. Uses replaceState so we don't pollute history.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!deepLinkHandled) return;
    const params = new URLSearchParams();
    if (view === "course") {
      params.set("course", courseSlug);
      if (selectedLesson) {
        params.set("lesson", selectedLesson.slug);
      } else if (!viewExamGuide) {
        params.set("unit", String(selectedUnit));
        if (viewedCedTopic) params.set("topic", viewedCedTopic);
      }
    }
    const qs = params.toString();
    const newUrl = qs ? `/study?${qs}` : "/study";
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [
    view,
    courseSlug,
    selectedUnit,
    selectedLesson,
    viewExamGuide,
    viewedCedTopic,
    deepLinkHandled,
  ]);

  const mainPanelRef = useRef<HTMLDivElement>(null);

  // Progress tracking - subscribes to the user's `completedSlugs` field so
  // course progress only advances after the user explicitly marks a lesson
  // complete, not just when they open it.
  const [completedSlugsAll, setCompletedSlugsAll] = useState<Set<string>>(
    new Set()
  );
  useEffect(() => {
    if (!user) {
      setCompletedSlugsAll(new Set());
      return;
    }
    const db = getDb();
    if (!db) return;
    const unsub = subscribeCompletedSlugs(db, user.uid, setCompletedSlugsAll);
    return () => unsub();
  }, [user]);

  // CED sublesson completion uses the same `completedSlugs` field as LESSONS,
  // but with a `ced:<courseSlug>:<topicId>` slug so the two namespaces don't
  // collide. We track the in-flight topic id to disable its toggle button.
  const [togglingCedTopicId, setTogglingCedTopicId] = useState<string | null>(
    null
  );
  const toggleCedTopicComplete = useCallback(
    async (topicId: string, next: boolean) => {
      if (!user) return;
      const db = getDb();
      if (!db) return;
      setTogglingCedTopicId(topicId);
      try {
        await setLessonCompleted(
          db,
          user.uid,
          cedTopicSlug(courseSlug, topicId),
          next
        );
        if (next) void recordActivityClient(getIdToken);
      } finally {
        setTogglingCedTopicId(null);
      }
    },
    [user, courseSlug, getIdToken]
  );

  // <InlineHighlights /> exposes the addHighlight hook so the text-selection
  // tooltip can push new highlights into Firestore (and then render them in
  // place on the lesson text).
  const highlightsApiRef = useRef<{ addHighlight: (text: string) => void } | null>(
    null
  );
  const handleHighlight = useCallback((text: string) => {
    highlightsApiRef.current?.addHighlight(text);
  }, []);

  const curriculumUnit = curriculum
    ? getCurriculumUnit(courseSlug, selectedUnit)
    : undefined;
  // Learners can read every unit's overview (CurriculumUnitView) but the
  // deeper material (per-topic lessons, flashcards, practice, interactive
  // tools) is Pro-only. The `locked` flag only forces the full upsell
  // view when a learner is outside their selected-course allowance.
  const isPro = plan !== "learner";
  const locked = false;
  const learnerOverviewOnly = !isPro;
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

  const TABS: { key: Tab; label: string; show: boolean }[] = [
    { key: "curriculum", label: "Overview", show: !!curriculumUnit },
    {
      key: "practice",
      label: "Practice",
      show: isPro && unitPractice.length > 0,
    },
    {
      key: "tools",
      label: "Interactive",
      show: isPro && unitTools.length > 0,
    },
    { key: "lesson", label: "Lesson", show: isPro && !!selectedLesson },
    {
      key: "diagram",
      label: "Diagram",
      show: isPro && !!selectedLesson?.diagram,
    },
    { key: "cards", label: "Flashcards", show: isPro && !!selectedLesson },
    {
      key: "links",
      label: "Links",
      show: isPro && !!selectedLesson && selectedLesson.links.length > 0,
    },
    { key: "solver", label: "Solver", show: true },
  ];

  const [scrollTopTick, setScrollTopTick] = useState(0);
  const triggerScrollTop = useCallback(() => {
    setScrollTopTick((n) => n + 1);
  }, []);

  useLayoutEffect(() => {
    if (scrollTopTick === 0 || typeof window === "undefined") return;
    // Skip the scroll-to-top only if the TOP of the main panel is still near
    // the viewport, i.e. the user is already looking at the start of the new
    // content. A pure "fraction visible" check breaks on long pages (max
    // possible fraction is viewport/panel, so the bottom of a 3× viewport
    // panel reads as ~33% visible and would incorrectly suppress the scroll).
    const panel = mainPanelRef.current;
    if (panel) {
      const rect = panel.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Allow up to ~30% of a viewport height above the fold before we give up
      // and yank to the top. Generous enough to not fight small scroll offsets.
      if (rect.top >= -viewportH * 0.3 && rect.top <= viewportH) return;
    }
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const jump = () => {
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    jump();
    const raf = requestAnimationFrame(() => {
      jump();
      html.style.scrollBehavior = prev;
    });
    const timer = setTimeout(jump, 80);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      html.style.scrollBehavior = prev;
    };
  }, [scrollTopTick]);

  function selectLesson(l: Lesson) {
    setSelectedLesson(l);
    const m = l.courses.find((c) => c.courseSlug === courseSlug);
    if (m) setSelectedUnit(m.unitNumber);
    setTab("lesson");
    setViewedCedTopic(null);
    setViewExamGuide(false);
    setExplanation("");
    setError("");
    triggerScrollTop();
  }

  function selectUnit(n: number) {
    setSelectedUnit(n);
    setSelectedLesson(null);
    setTab("curriculum");
    setViewedCedTopic(null);
    setViewExamGuide(false);
  }

  function selectTopic(unitNumber: number, topicId: string) {
    setSelectedUnit(unitNumber);
    setSelectedLesson(null);
    setTab("curriculum");
    setViewedCedTopic(topicId);
    setViewExamGuide(false);
    triggerScrollTop();
  }

  function selectExamGuide() {
    setSelectedLesson(null);
    setViewedCedTopic(null);
    setTab("curriculum");
    setViewExamGuide(true);
    triggerScrollTop();
  }

  function openCourse(slug: CourseSlug) {
    switchCourse(slug);
    setView("course");
  }

  function goHome() {
    setView("home");
    setSelectedLesson(null);
  }

  function switchCourse(slug: CourseSlug) {
    setCourseSlug(slug);
    const nextUnits = unitsForCourse(slug);
    const firstUnit = nextUnits[0]?.number ?? 1;
    setSelectedUnit(firstUnit);
    setSelectedLesson(null);
    setTab("curriculum");
    setViewedCedTopic(null);
    setViewExamGuide(true);
    setExplanation("");
    setError("");
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
        void postScoreEvent(getIdToken, courseSlug, "tool_use");
      }
    } catch (e: any) {
      setError(e?.message || "Couldn't load that explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function loadSample() {
    if (!selectedLesson) return;
    setProblem(selectedLesson.sampleProblem);
    setTab("solver");
  }

  // Gate rendering on the assignment list so we never show placeholder or
  // unassigned courses, even for a single frame. All hooks above have
  // already run, so returning early here is safe.
  if (coursesLoading) return <StudyLoading />;
  if (addedCourses.length === 0) return <StudyEmpty signedIn={!!user} plan={plan} />;

  return (
    <main className="bg-paper text-body">
      <SiteNav maxWidth="max-w-6xl">
      </SiteNav>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {view === "home" ? (
          <StudyHome
            courses={addedCourses}
            completedSlugs={completedSlugsAll}
            onOpen={openCourse}
            onEdit={() => setPickerOpen(true)}
            isPro={isPro}
            buyLoading={buyLoading}
            onBuy={() => buy("pro-monthly")}
          />
        ) : (
          <>
        <button
          onClick={goHome}
          className="inline-flex items-center gap-1 text-[13px] text-muted hover:text-ink"
        >
          <span aria-hidden="true">←</span>
          <span>All courses</span>
        </button>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="font-serif text-[42px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[48px]">
            {course.title}
          </h1>
          <div className="text-[12px] text-muted">
            {courseProgressLabel(courseSlug, completedSlugsAll)}
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-[15px] text-body">{course.subtitle}</p>
        {!isPro && (
          <div className="mt-5 inline-flex items-center gap-3 rounded-lg border border-orange/30 bg-orange-tint px-4 py-2 text-[13px] text-orange-ink">
            <span>
              You're on the free plan: Units 1 and 2 unlocked. Upgrade to
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

        <section className="mt-10 grid gap-10 lg:grid-cols-[300px_1fr]">
          {/* Sidebar: units + lessons */}
          <aside data-tour="study-unit-tree" className="space-y-6">
            {curriculum && (
              <button
                onClick={selectExamGuide}
                className={`block w-full border-l-2 pl-3 text-left transition-colors ${
                  viewExamGuide
                    ? "border-orange"
                    : "border-orange/40 hover:border-orange"
                }`}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-ink/80">
                  Overview
                </div>
                <div
                  className={`mt-0.5 font-serif text-[16px] leading-tight transition-colors ${
                    viewExamGuide
                      ? "text-orange"
                      : "text-ink hover:text-orange"
                  }`}
                >
                  Exam Guide
                </div>
              </button>
            )}
            {units.length === 0 && (
              <div className="rounded-md border border-hair bg-offwhite p-4 text-sm text-muted">
                No units defined yet.
              </div>
            )}
            {units.map((unit) => {
              const unitLocked = !isUnitUnlocked(unit.number, plan);
              const isActiveUnit =
                !viewExamGuide &&
                selectedUnit === unit.number &&
                !selectedLesson;
              return (
                <div key={unit.number} className="border-l-2 border-orange/40 pl-3">
                  <button
                    onClick={() => selectUnit(unit.number)}
                    className="group block w-full text-left"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-ink/80">
                      Unit {unit.number}
                      {unitLocked && (
                        <span data-tour="study-pro-lock" className="ml-2 rounded bg-orange/20 px-1.5 py-0.5 text-[9px] text-orange-ink">
                          PRO
                        </span>
                      )}
                    </div>
                    <div
                      className={`mt-0.5 font-serif text-[16px] leading-tight transition-colors ${
                        isActiveUnit
                          ? "text-orange"
                          : "text-ink group-hover:text-orange"
                      }`}
                    >
                      {unit.title}
                    </div>
                  </button>
                  {(() => {
                    const cedGroups =
                      unit.topics && unit.topics.length > 0
                        ? groupTopicsIntoLessons(
                            courseSlug,
                            unit.number,
                            unit.topics
                          )
                        : [];
                    const norm = (s: string) =>
                      s.toLowerCase().replace(/[^a-z0-9]+/g, "");
                    const lessonByTitle = new Map(
                      unit.lessons.map((l) => [norm(l.title), l] as const)
                    );

                    if (cedGroups.length > 0) {
                      return (
                        <ul className="mt-3 space-y-2">
                          {cedGroups.map((g) => {
                            const matchedLesson = lessonByTitle.get(
                              norm(g.title)
                            );
                            const isActiveLesson =
                              !!matchedLesson &&
                              selectedLesson?.slug ===
                                matchedLesson.slug;
                            const containsViewed =
                              !!viewedCedTopic &&
                              selectedUnit === unit.number &&
                              g.topics.some(
                                (t) => t.id === viewedCedTopic
                              );
                            const isActive =
                              isActiveLesson || containsViewed;
                            const lessonDone =
                              !!matchedLesson &&
                              completedSlugsAll.has(matchedLesson.slug);
                            const allTopicsDone =
                              g.topics.length > 0 &&
                              g.topics.every((t) =>
                                completedSlugsAll.has(
                                  cedTopicSlug(courseSlug, t.id)
                                )
                              );
                            const showLessonCheck =
                              lessonDone || allTopicsDone;
                            return (
                              <li key={g.id}>
                                <button
                                  onClick={() => {
                                    if (matchedLesson) {
                                      selectLesson(matchedLesson);
                                    } else {
                                      selectTopic(
                                        unit.number,
                                        g.topics[0].id
                                      );
                                    }
                                  }}
                                  className={`flex w-full items-center gap-2 py-1 text-left text-[13.5px] transition-colors ${
                                    isActive
                                      ? "font-medium text-orange"
                                      : "text-ink hover:text-orange"
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                                      isActive
                                        ? "bg-orange"
                                        : "bg-ink/40"
                                    }`}
                                  />
                                  <span className="flex-1">{g.title}</span>
                                  {showLessonCheck && (
                                    <span className="shrink-0 text-[11px] text-green-700">
                                      ✓
                                    </span>
                                  )}
                                </button>
                                {selectedUnit === unit.number && (
                                  <ul className="mt-0.5 space-y-0 border-l border-hair pl-3 ml-[3px]">
                                    {g.topics.map((t) => {
                                      const isTopicActive =
                                        viewedCedTopic === t.id &&
                                        selectedUnit === unit.number;
                                      const topicDone =
                                        completedSlugsAll.has(
                                          cedTopicSlug(courseSlug, t.id)
                                        );
                                      return (
                                        <li key={t.id}>
                                          <button
                                            onClick={() =>
                                              selectTopic(
                                                unit.number,
                                                t.id
                                              )
                                            }
                                            className={`flex w-full items-start gap-2 py-0.5 text-left text-[12px] leading-snug transition-colors ${
                                              isTopicActive
                                                ? "font-medium text-orange"
                                                : "text-muted hover:text-ink"
                                            }`}
                                          >
                                            <span className="shrink-0 font-mono text-[11px] text-dim">
                                              {t.id}
                                            </span>
                                            <span className="flex-1">
                                              {t.title}
                                            </span>
                                            {topicDone && (
                                              <span className="shrink-0 text-[10px] text-green-700">
                                                ✓
                                              </span>
                                            )}
                                          </button>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      );
                    }

                    if (unit.lessons.length === 0) return null;
                    return (
                      <ul className="mt-3 space-y-1">
                        {unit.lessons.map((l) => {
                          const isActive =
                            selectedLesson?.slug === l.slug;
                          const lessonDone = completedSlugsAll.has(l.slug);
                          return (
                            <li key={l.slug}>
                              <button
                                onClick={() => selectLesson(l)}
                                className={`flex w-full items-center gap-2 py-1 text-left text-[13.5px] transition-colors ${
                                  isActive
                                    ? "font-medium text-orange"
                                    : "text-ink hover:text-orange"
                                }`}
                              >
                                <span
                                  className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                                    isActive ? "bg-orange" : "bg-ink/40"
                                  }`}
                                />
                                <span className="flex-1">{l.title}</span>
                                {lessonDone && (
                                  <span className="shrink-0 text-[11px] text-green-700">
                                    ✓
                                  </span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })()}
                </div>
              );
            })}
          </aside>

          {/* Main panel */}
          <div ref={mainPanelRef} className="scroll-mt-4">
            {viewExamGuide && curriculum ? (
              <ExamGuideView curriculum={curriculum} />
            ) : !curriculumUnit && !selectedLesson ? (
              <EmptyCourseView courseTitle={course.title} />
            ) : (
              <>
                {selectedLesson && !bookMode && (
                  <div className="border-b border-hair pb-6">
                    <div className="meta">
                      {course.title}
                      {currentMembership
                        ? ` · Unit ${currentMembership.unitNumber}: ${currentMembership.unitTitle}`
                        : ""}
                    </div>
                    <div className="mt-1 flex items-start justify-between gap-4">
                      <h2 className="font-serif text-3xl font-normal text-ink sm:text-4xl">
                        {selectedLesson.title}
                      </h2>
                      <div data-tour="study-bookmark" className="shrink-0 pt-2">
                        <BookmarkButton
                          bookmark={{
                            slug: selectedLesson.slug,
                            title: selectedLesson.title,
                            courseSlug,
                            courseTitle: course.title,
                            unitNumber: currentMembership?.unitNumber,
                            unitTitle: currentMembership?.unitTitle,
                          }}
                        />
                      </div>
                    </div>
                    <p className="mt-2 max-w-2xl text-muted">
                      <MathRender auto>{selectedLesson.blurb}</MathRender>
                    </p>
                  </div>
                )}

                {(selectedLesson || curriculumUnit) && (
                  <LessonAnnotationsPanel
                    key={
                      selectedLesson?.slug ??
                      `unit:${courseSlug}:${selectedUnit}`
                    }
                    lessonSlug={
                      selectedLesson?.slug ??
                      `unit:${courseSlug}:${selectedUnit}`
                    }
                  />
                )}

                <div data-tour="study-tab-strip" className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-hair">
                  <div className="flex flex-wrap gap-x-6">
                    {TABS.filter((t) => t.show).map((t) => (
                      <button
                        key={t.key}
                        onClick={() => {
                          setTab(t.key);
                          setViewedCedTopic(null);
                          triggerScrollTop();
                        }}
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
                  {(!!selectedLesson || !!viewedCedTopic) && (
                    <div data-tour="study-bookmode" className="pb-2">
                      <BookModeToggle />
                    </div>
                  )}
                </div>

                <div data-tour="study-highlight-tooltip">
                <HighlightTooltip
                  onHighlight={handleHighlight}
                  enabled={tab === "curriculum" || tab === "lesson"}
                >
                <InlineHighlights
                  key={`hl:${selectedLesson?.slug ?? `unit:${courseSlug}:${selectedUnit}`}`}
                  lessonSlug={
                    selectedLesson?.slug ??
                    `unit:${courseSlug}:${selectedUnit}`
                  }
                  onReady={(api) => {
                    highlightsApiRef.current = api;
                  }}
                >
                <div
                  data-tour="study-lesson-area"
                  key={`${courseSlug}-${selectedUnit}-${selectedLesson?.slug ?? ""}-${tab}`}
                  className="mt-8 animate-fadeUp"
                >
                  {tab === "curriculum" && curriculumUnit && !viewedCedTopic && (
                    <CurriculumUnitView
                      unit={curriculumUnit}
                      courseSlug={courseSlug}
                      locked={locked}
                      plan={plan}
                      onUpgrade={() => buy("pro-monthly")}
                    />
                  )}
                  {tab === "curriculum" &&
                    curriculumUnit &&
                    viewedCedTopic &&
                    (() => {
                      const unitTopics =
                        units.find((u) => u.number === selectedUnit)?.topics ??
                        [];
                      if (unitTopics.length === 0) return null;
                      const groups = groupTopicsIntoLessons(
                        courseSlug,
                        selectedUnit,
                        unitTopics
                      );
                      const activeGroup =
                        findLessonGroupFor(groups, viewedCedTopic) ??
                        groups[0];
                      if (!activeGroup) return null;
                      const completedTopicIds = new Set(
                        activeGroup.topics
                          .filter((t) =>
                            completedSlugsAll.has(
                              cedTopicSlug(courseSlug, t.id)
                            )
                          )
                          .map((t) => t.id)
                      );
                      const activeIdx = activeGroup.topics.findIndex(
                        (t) => t.id === viewedCedTopic
                      );
                      const prevTopic =
                        activeIdx > 0
                          ? activeGroup.topics[activeIdx - 1]
                          : null;
                      const nextTopic =
                        activeIdx >= 0 &&
                        activeIdx < activeGroup.topics.length - 1
                          ? activeGroup.topics[activeIdx + 1]
                          : null;
                      const view = (
                        <CedLessonsView
                          courseSlug={courseSlug}
                          unit={curriculumUnit}
                          lessonNumber={activeGroup.number}
                          lessonTitle={activeGroup.title}
                          topics={activeGroup.topics}
                          activeTopicId={viewedCedTopic}
                          onSelectTopic={(id) => {
                            setViewedCedTopic(id);
                            triggerScrollTop();
                          }}
                          completedTopicIds={completedTopicIds}
                          togglingTopicId={togglingCedTopicId}
                          onToggleTopicComplete={
                            user
                              ? (topicId, next) =>
                                  toggleCedTopicComplete(topicId, next)
                              : undefined
                          }
                          hideHeader={bookMode}
                        />
                      );
                      if (!bookMode) return view;
                      const activeTopic =
                        activeGroup.topics[Math.max(0, activeIdx)];
                      return (
                        <BookPage
                          pageKey={`ced:${viewedCedTopic}`}
                          chapter={`${course.title} · Unit ${curriculumUnit.unitNumber} · Lesson ${activeGroup.number}`}
                          title={activeTopic?.title ?? activeGroup.title}
                          onPrevLesson={
                            prevTopic
                              ? () => {
                                  setViewedCedTopic(prevTopic.id);
                                  triggerScrollTop();
                                }
                              : undefined
                          }
                          onNextLesson={
                            nextTopic
                              ? () => {
                                  setViewedCedTopic(nextTopic.id);
                                  triggerScrollTop();
                                }
                              : undefined
                          }
                        >
                          {view}
                        </BookPage>
                      );
                    })()}

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
                        <div data-tour="study-tools-panel">
                          <ToolsPanel tools={unitTools} />
                        </div>
                      )}
                    </>
                  )}

                  {tab === "lesson" && selectedLesson && (
                    bookMode ? (
                      <BookPage
                        pageKey={`lesson:${selectedLesson.slug}`}
                        chapter={`${course.title}${
                          currentMembership
                            ? ` · Unit ${currentMembership.unitNumber}: ${currentMembership.unitTitle}`
                            : ""
                        }`}
                        title={selectedLesson.title}
                      >
                        <LessonPanel
                          lesson={selectedLesson}
                          plan={plan}
                          uid={user?.uid ?? null}
                          courseSlug={courseSlug}
                          getIdToken={getIdToken}
                          loadSample={loadSample}
                          onUpgrade={() => buy("pro-monthly")}
                        />
                      </BookPage>
                    ) : (
                      <LessonPanel
                        lesson={selectedLesson}
                        plan={plan}
                        uid={user?.uid ?? null}
                        courseSlug={courseSlug}
                        getIdToken={getIdToken}
                        loadSample={loadSample}
                        onUpgrade={() => buy("pro-monthly")}
                      />
                    )
                  )}

                  {tab === "diagram" && selectedLesson?.diagram && (
                    <div className="max-w-2xl rounded-md border border-hair bg-paper p-4">
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
                    <div data-tour="study-flashcards" className="max-w-2xl">
                      <Flashcards
                        cards={selectedLesson.flashcards}
                        storageKey={selectedLesson.slug}
                      />
                      <p className="mt-4 text-xs text-muted">
                        Progress is stored locally in your browser. Clearing site
                        data will reset your "known" marks.
                      </p>
                    </div>
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
                </InlineHighlights>
                </HighlightTooltip>
                </div>
              </>
            )}
          </div>
        </section>
          </>
        )}
      </div>

      {pickerOpen && (
        <CoursePicker
          selected={selectedCourses ?? []}
          plan={plan}
          variant="dialog"
          heading="Your AP courses"
          subheading="Toggle the courses you're studying. Saves as you go."
          onClose={() => setPickerOpen(false)}
        />
      )}
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
          return <DesmosCalculator key={i} initialExprs={tool.initial ?? []} />;
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
          Unlock Pro - $16/month
        </button>
        <a href="/#price" className="btn-ghost text-sm">
          See 6-month ($90) →
        </a>
      </div>
    </div>
  );
}

const FREE_LESSON_LIMIT = 2;

function LessonPanel({
  lesson,
  plan,
  uid,
  courseSlug,
  getIdToken,
  loadSample,
  onUpgrade,
}: {
  lesson: Lesson;
  plan: "learner" | "pro" | "hacker";
  uid: string | null;
  courseSlug: string;
  getIdToken: () => Promise<string | null>;
  loadSample: () => void;
  onUpgrade: () => void;
}) {
  // null = not yet loaded for learner users; [] = loaded empty; [..] = loaded
  const [viewedSlugs, setViewedSlugs] = useState<string[] | null>(null);
  const [writeError, setWriteError] = useState<string | null>(null);
  // Separate completion state - drives the progress bars. Starts false,
  // gets reconciled from the `completedSlugs` field on the same doc.
  const [isCompleted, setIsCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);

  // Lazy-loaded MCQs. Previously this was a sync `getMcqsFor(slug)` call
  // that forced the /study bundle to include every course's MCQ data
  // (~7 MB). We now load the course's MCQs on demand when the user
  // opens a lesson. `hasMcqs` answers synchronously from a tiny
  // manifest, so we can still decide up-front whether to render the
  // quiz UI at all.
  const [mcqPool, setMcqPool] = useState<Mcq[] | null>(null);
  const [mcqLoading, setMcqLoading] = useState(false);
  useEffect(() => {
    if (!uid || !hasMcqs(lesson.slug)) {
      setMcqPool(null);
      return;
    }
    let cancelled = false;
    setMcqLoading(true);
    loadMcqsFor(lesson.slug)
      .then((mcqs) => {
        if (cancelled) return;
        setMcqPool(mcqs);
      })
      .finally(() => {
        if (!cancelled) setMcqLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [uid, lesson.slug]);

  // Paid plans skip all of this and get immediate access.
  const isPaid = plan !== "learner";

  // Live subscription to the user's viewed lessons so the cap update is
  // reflected immediately after a write.
  useEffect(() => {
    if (isPaid || !uid) {
      setViewedSlugs(null);
      return;
    }
    const db = getDb();
    if (!db) return;
    const unsub = onSnapshot(
      doc(db, "users", uid, "profile", "lessons"),
      (snap) => {
        const arr = (snap.data() as any)?.viewedSlugs;
        setViewedSlugs(Array.isArray(arr) ? arr : []);
      },
      () => setViewedSlugs([])
    );
    return () => unsub();
  }, [uid, isPaid]);

  // Record this lesson view atomically (transaction) so two fast clicks
  // can't push past the learner cap. Paid plans also write so the Study
  // homepage progress bar fills up for everyone; the cap check is
  // skipped for them.
  useEffect(() => {
    if (!uid) return;
    const db = getDb();
    if (!db) return;
    const ref = doc(db, "users", uid, "profile", "lessons");
    runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      const cur = (snap.data() as any)?.viewedSlugs;
      const arr: string[] = Array.isArray(cur) ? cur : [];
      if (arr.includes(lesson.slug)) return;
      if (!isPaid && arr.length >= FREE_LESSON_LIMIT) return;
      tx.set(
        ref,
        {
          viewedSlugs: [...arr, lesson.slug],
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }).catch((e) => setWriteError(e?.message || "couldn't record"));
  }, [isPaid, uid, lesson.slug]);

  // Subscribe to the `completedSlugs` field so the Mark-complete toggle
  // reflects prior completion when the user returns to a lesson.
  useEffect(() => {
    if (!uid) {
      setIsCompleted(false);
      return;
    }
    const db = getDb();
    if (!db) return;
    const unsub = subscribeCompletedSlugs(db, uid, (slugs) => {
      setIsCompleted(slugs.has(lesson.slug));
    });
    return () => unsub();
  }, [uid, lesson.slug]);

  async function toggleComplete() {
    if (!uid) return;
    const db = getDb();
    if (!db) return;
    setCompleting(true);
    // Optimistic: flip locally, then persist. The subscription will reconcile.
    const next = !isCompleted;
    setIsCompleted(next);
    try {
      await setLessonCompleted(db, uid, lesson.slug, next);
      // Only award points on completion, not on un-completion.
      if (next) {
        void postScoreEvent(getIdToken, courseSlug, "lesson_complete", {
          lessonTitle: lesson.title,
        });
        void recordActivityClient(getIdToken);
      }
    } catch (e: any) {
      setIsCompleted(!next);
      setWriteError(e?.message || "couldn't save");
    } finally {
      setCompleting(false);
    }
  }

  // Loading state: don't flash the lesson content before we know the cap.
  if (!isPaid && viewedSlugs === null) {
    return (
      <div className="max-w-2xl rounded-md border border-hair bg-offwhite p-6 text-sm text-muted">
        Loading your lesson access…
      </div>
    );
  }

  const rawViewedCount = viewedSlugs?.length ?? 0;
  const alreadyViewed = viewedSlugs?.includes(lesson.slug) ?? false;
  // Clamp the displayed count so we can never render "4/2".
  const shownCount = Math.min(
    alreadyViewed ? rawViewedCount : rawViewedCount + 1,
    FREE_LESSON_LIMIT
  );
  const allowed =
    isPaid || alreadyViewed || rawViewedCount < FREE_LESSON_LIMIT;

  if (!allowed) {
    return (
      <div className="max-w-2xl rounded-xl border-2 border-orange/40 bg-orange-tint p-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-orange-ink">
          Free lesson limit
        </div>
        <h4 className="mt-2 font-serif text-2xl font-normal text-ink">
          You've opened {FREE_LESSON_LIMIT}/{FREE_LESSON_LIMIT} free lessons.
        </h4>
        <p className="mt-3 max-w-xl text-[15px] text-body">
          Free accounts can preview {FREE_LESSON_LIMIT} lessons total across
          every AP course. Upgrade to Pro for unlimited lessons, flashcards,
          diagrams, and the full curriculum.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={onUpgrade} className="btn-primary text-sm">
            Unlock Pro - $16/mo
          </button>
          <a href="/#price" className="btn-ghost text-sm">
            See all plans →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {!isPaid && (
        <div className="mb-4 rounded-md border border-orange/30 bg-orange-tint/40 p-3 text-xs text-orange-ink">
          Free preview · {shownCount}/{FREE_LESSON_LIMIT} lessons used
          {writeError && <span className="ml-2 text-red-600">({writeError})</span>}
        </div>
      )}
      <ul className="space-y-3 text-[16px]">
        {lesson.keyIdeas.map((k) => (
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
          <MathRender auto>{lesson.sampleProblem}</MathRender>
        </div>
        <button onClick={loadSample} className="btn-link mt-3">
          Show the full walkthrough →
        </button>
      </div>

      {uid && hasMcqs(lesson.slug) && mcqLoading && !mcqPool && (
        <div className="mt-8 flex h-24 items-center justify-center rounded-md border border-hair bg-offwhite/60 text-[13px] text-muted">
          Loading quiz…
        </div>
      )}
      {uid && hasMcqs(lesson.slug) && mcqPool && (
        <div data-tour="study-quiz" className="mt-8">
          <Quiz
            lessonSlug={lesson.slug}
            pool={mcqPool}
            isCompleted={isCompleted}
            onPass={async () => {
              if (!isCompleted) {
                const db = getDb();
                if (db) {
                  setIsCompleted(true);
                  try {
                    await setLessonCompleted(db, uid, lesson.slug, true);
                    void postScoreEvent(getIdToken, courseSlug, "lesson_complete", {
                      lessonTitle: lesson.title,
                    });
                    void recordActivityClient(getIdToken);
                  } catch (e: any) {
                    setIsCompleted(false);
                    setWriteError(e?.message || "couldn't save");
                  }
                }
              }
            }}
          />
          {writeError && (
            <div className="mt-2 text-[12px] text-red-600">{writeError}</div>
          )}
        </div>
      )}

      {uid && !hasMcqs(lesson.slug) && (
        <div className="mt-8 flex items-center justify-between gap-3 rounded-lg border border-hair bg-paper p-4">
          <div>
            <div className="label">Lesson progress</div>
            <div className="mt-1 text-[13px] text-muted">
              {isCompleted
                ? "Marked complete. This lesson counts toward your course progress."
                : "Finish the lesson, then mark it complete to advance your progress."}
            </div>
          </div>
          <button
            onClick={toggleComplete}
            disabled={completing}
            className={
              isCompleted
                ? "shrink-0 rounded-md border border-green-600/40 bg-green-50 px-3 py-2 text-[13px] font-medium text-green-700 hover:bg-green-100 disabled:opacity-60"
                : "shrink-0 rounded-md bg-ink px-3 py-2 text-[13px] font-medium text-paper hover:bg-ink/90 disabled:opacity-60"
            }
          >
            {isCompleted ? "✓ Completed" : "Mark complete"}
          </button>
        </div>
      )}
    </div>
  );
}

function ExamGuideView({
  curriculum,
}: {
  curriculum: import("@/lib/curriculum/types").CourseCurriculum;
}) {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <div className="meta">Overview</div>
        <h3 className="mt-1 font-serif text-3xl font-normal text-ink">
          Exam Guide
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          {curriculum.framing}
        </p>
      </div>

      <div className="rounded-lg border border-hair bg-paper p-5">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          Exam at a glance
        </div>
        <div className="mt-3 grid gap-5 text-sm text-body md:grid-cols-3">
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
      </div>

      {curriculum.units.length > 0 && (
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Units and exam weights
          </div>
          <ul className="mt-3 divide-y divide-hair overflow-hidden rounded-lg border border-hair">
            {curriculum.units.map((u) => (
              <li
                key={u.unitNumber}
                className="flex items-baseline justify-between gap-4 bg-paper px-4 py-3"
              >
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Unit {u.unitNumber}
                  </div>
                  <div className="mt-0.5 text-[14.5px] font-medium text-ink">
                    {u.title}
                  </div>
                </div>
                <div className="shrink-0 text-[12px] text-muted">
                  {u.examWeight}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
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

/**
 * Rendered while the user's added-courses list is still being fetched.
 * Matches the SiteNav + main container geometry so the hand-off to the real
 * page doesn't shift layout.
 */
// All progress-eligible slugs for a course: hand-authored LESSONS plus every
// CED sublesson in every unit. CED topics get a prefixed slug (see
// `cedTopicSlug`) so they live in the same `completedSlugs` set without
// colliding with LESSON slugs.
function courseLessonSlugs(slug: CourseSlug): string[] {
  const lessonSlugs = LESSONS.filter((l) =>
    l.courses.some((c) => c.courseSlug === slug)
  ).map((l) => l.slug);
  const cedSlugs: string[] = [];
  for (const u of unitsForCourse(slug)) {
    for (const t of u.topics ?? []) {
      cedSlugs.push(cedTopicSlug(slug, t.id));
    }
  }
  return [...lessonSlugs, ...cedSlugs];
}

function courseProgress(
  slug: CourseSlug,
  completed: Set<string>
): { done: number; total: number; pct: number } {
  const slugs = courseLessonSlugs(slug);
  const total = slugs.length;
  const done = slugs.reduce((n, s) => (completed.has(s) ? n + 1 : n), 0);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

function courseProgressLabel(
  slug: CourseSlug,
  completed: Set<string>
): string {
  const { done, total, pct } = courseProgress(slug, completed);
  if (total === 0) return "";
  return `${pct}% · ${done}/${total} lessons`;
}

/**
 * Landing view for /study - shows every added course as a card with a
 * completion bar. Clicking a card opens that course's workspace.
 */
function StudyHome({
  courses,
  completedSlugs,
  onOpen,
  onEdit,
  isPro,
  buyLoading,
  onBuy,
}: {
  courses: typeof COURSES;
  completedSlugs: Set<string>;
  onOpen: (slug: CourseSlug) => void;
  onEdit: () => void;
  isPro: boolean;
  buyLoading: boolean;
  onBuy: () => void;
}) {
  return (
    <>
      <div className="max-w-3xl">
        <h1 className="mt-3 font-serif text-[42px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[56px]">
          Your courses.
        </h1>
        <p className="mt-4 max-w-xl text-[17px] text-body">
          Pick up where you left off. Each card tracks how many lessons
          you've opened so you can see your progress at a glance.
        </p>
        {!isPro && (
          <div className="mt-5 inline-flex items-center gap-3 rounded-lg border border-orange/30 bg-orange-tint px-4 py-2 text-[13px] text-orange-ink">
            <span>
              You're on the free plan: Units 1 and 2 unlocked. Upgrade to
              unlock everything.
            </span>
            <button
              onClick={onBuy}
              disabled={buyLoading}
              className="btn-link text-orange-ink underline"
            >
              Unlock Pro
            </button>
          </div>
        )}
      </div>

      <div data-tour="study-courses-grid" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => {
          const { done, total, pct } = courseProgress(c.slug, completedSlugs);
          return (
            <button
              key={c.slug}
              onClick={() => onOpen(c.slug)}
              className="group flex flex-col rounded-xl border border-hair bg-paper p-5 text-left transition hover:-translate-y-0.5 hover:border-orange hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.25)]"
            >
              <div className="flex min-w-0 items-start gap-3">
                <CourseIcon slug={c.slug} category={c.category} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-xl text-ink group-hover:text-orange">
                    {c.title}
                  </div>
                  {examCountdownLabel(c.slug) && (
                    <div className="mt-0.5 text-[11px] font-medium text-orange-ink">
                      {examCountdownLabel(c.slug)}
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-2 line-clamp-3 text-[13px] text-muted">
                {c.subtitle}
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span>
                    {total === 0
                      ? "No lessons yet"
                      : `${done}/${total} lessons`}
                  </span>
                  <span className="font-medium text-ink">{pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-offwhite">
                  <div
                    className="h-full rounded-full bg-orange transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
        <button
          onClick={onEdit}
          className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-hair bg-offwhite p-5 text-center text-sm text-muted transition hover:border-orange hover:text-orange-ink"
        >
          <div className="text-2xl leading-none">+</div>
          <div className="mt-1">Edit courses</div>
        </button>
      </div>
    </>
  );
}

function StudyLoading() {
  return (
    <main className="bg-paper text-body">
      <SiteNav maxWidth="max-w-6xl">
      </SiteNav>
      <PageLoader />
    </main>
  );
}

/**
 * Rendered when the added-courses list is loaded but empty. This is the
 * state that replaces the old "show every course as a fallback" behavior.
 * users without assignments now see a clear CTA to pick courses instead of
 * a wall of unassigned content.
 *
 * Signed-in users get the picker inline (saves directly to Firestore; the
 * parent's subscription will re-render Study with real content on the next
 * snapshot). Signed-out users get a sign-in CTA since we have nowhere to
 * persist their selection.
 */
function StudyEmpty({ signedIn, plan }: { signedIn: boolean; plan: PlanTier }) {
  return (
    <main className="bg-paper text-body">
      <SiteNav maxWidth="max-w-6xl">
      </SiteNav>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="label mb-3">Study</div>
        <h1 className="font-serif text-[40px] font-normal leading-[1.1] tracking-tightest text-ink sm:text-[48px]">
          Pick your AP courses.
        </h1>
        <p className="mt-4 max-w-xl text-[15px] text-muted">
          {signedIn
            ? "Choose the courses you're studying and they'll show up here. You can change this anytime from this page."
            : "Sign in to pick the AP courses you're studying. Your selection is saved to your account."}
        </p>
        {signedIn ? (
          <div className="mt-8 rounded-xl border border-hair bg-paper p-6">
            <CoursePicker
              selected={[]}
              plan={plan}
              heading="Your AP courses"
              subheading="Saves as you go."
            />
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`/signin?next=${encodeURIComponent("/study")}`}
              className="btn-primary"
            >
              Sign in to pick courses
            </a>
            <a href="/" className="btn-ghost">
              Back home
            </a>
          </div>
        )}
      </div>
    </main>
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
        walkthrough (free). Anything else counts against your AI budget. Free
        users get 10 messages per 5-hour window.
      </p>
      <textarea
        id="problem"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        rows={4}
        placeholder="e.g. Find dy/dx if y = (3x^2 + 1)^5"
        className="focus-ring mt-3 w-full rounded-lg border border-hair bg-paper px-5 py-4 font-mono text-[14px] leading-6 text-ink placeholder-dim"
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
              Unlock unlimited - $9/month →
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
