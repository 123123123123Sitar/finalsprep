"use client";
import { useEffect, useMemo, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import CommunityTabs from "@/app/components/CommunityTabs";
import CourseLeaderboard from "@/app/components/CourseLeaderboard";
import CourseIcon from "@/app/components/CourseIcon";
import { useAuth } from "@/app/components/AuthProvider";
import { getDb } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { COURSES, type CourseSlug } from "@/lib/topics";

const CATEGORY_LABEL: Record<string, string> = {
  math: "Math",
  science: "Science",
  cs: "Computer Science",
  history: "History",
};

type ActiveKey = "overall" | CourseSlug;

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [selectedCourses, setSelectedCourses] = useState<CourseSlug[] | null>(null);
  const [active, setActive] = useState<ActiveKey>("overall");

  // Load the user's enrolled courses so we can scope the list.
  useEffect(() => {
    if (!user) {
      setSelectedCourses([]);
      return;
    }
    const db = getDb();
    if (!db) {
      setSelectedCourses([]);
      return;
    }
    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid, "profile", "prefs"));
        const cs = (snap.data() as any)?.selectedCourses;
        if (Array.isArray(cs)) {
          const valid = cs.filter(
            (s) => typeof s === "string" && COURSES.some((c) => c.slug === s)
          ) as CourseSlug[];
          setSelectedCourses(valid);
        } else {
          setSelectedCourses([]);
        }
      } catch {
        setSelectedCourses([]);
      }
    })();
  }, [user]);

  // Restore active tab from URL on first load.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCourse = params.get("course");
    if (urlCourse === "overall") {
      setActive("overall");
    } else if (urlCourse && COURSES.some((c) => c.slug === urlCourse)) {
      setActive(urlCourse as CourseSlug);
    }
  }, []);

  // Keep URL in sync with selection.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("course", active);
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", url);
  }, [active]);

  const enrolled = useMemo(() => {
    if (!selectedCourses || selectedCourses.length === 0) return [];
    const order = new Map(COURSES.map((c, i) => [c.slug, i] as const));
    return COURSES.filter((c) =>
      selectedCourses.includes(c.slug as CourseSlug)
    ).sort((a, b) => (order.get(a.slug) || 0) - (order.get(b.slug) || 0));
  }, [selectedCourses]);

  const grouped = useMemo(() => {
    const groups = new Map<string, typeof COURSES>();
    for (const c of enrolled) {
      if (!groups.has(c.category)) groups.set(c.category, []);
      groups.get(c.category)!.push(c);
    }
    return Array.from(groups.entries());
  }, [enrolled]);

  const activeCourse =
    active === "overall" ? null : COURSES.find((c) => c.slug === active);

  return (
    <main className="min-h-screen bg-paper">
      <SiteNav sticky />
      <CommunityTabs />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8">
          <div className="label">Community</div>
          <h1 className="mt-1 font-serif text-4xl text-ink">Leaderboards</h1>
          <p className="mt-2 max-w-xl text-[15px] text-body">
            Top problem solvers across your enrolled courses. Solve problems in
            the{" "}
            <a href="/study" className="text-orange hover:underline">
              study tool
            </a>{" "}
            or the{" "}
            <a href="/chat" className="text-orange hover:underline">
              chat tutor
            </a>{" "}
            to climb.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside data-tour="leaderboard-tabs" className="space-y-5">
            <div>
              <div className="label mb-2">Global</div>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActive("overall")}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13.5px] transition ${
                      active === "overall"
                        ? "bg-ink text-paper"
                        : "text-body hover:bg-offwhite hover:text-ink"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-orange-tint text-orange-ink"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.75}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M7 4 H 17 V 9 a 5 5 0 0 1 -10 0 Z" />
                        <path d="M7 6 H 4 V 8 a 3 3 0 0 0 3 3" />
                        <path d="M17 6 H 20 V 8 a 3 3 0 0 1 -3 3" />
                        <path d="M10 14 H 14 L 13.5 17 H 10.5 Z" />
                        <path d="M8 20 H 16" />
                      </svg>
                    </span>
                    <span className="truncate">Overall</span>
                  </button>
                </li>
              </ul>
            </div>

            {selectedCourses === null ? (
              <div className="rounded-md bg-offwhite/60 p-3 text-[12.5px] text-muted">
                Loading your courses…
              </div>
            ) : enrolled.length === 0 ? (
              <div className="rounded-md bg-offwhite/60 p-3 text-[12.5px] text-muted">
                You're not enrolled in any courses yet. Add courses in{" "}
                <a href="/account" className="text-orange hover:underline">
                  account settings
                </a>{" "}
                to see per-course boards.
              </div>
            ) : (
              grouped.map(([cat, list]) => (
                <div key={cat}>
                  <div className="label mb-2">{CATEGORY_LABEL[cat] || cat}</div>
                  <ul className="space-y-1">
                    {list.map((c) => (
                      <li key={c.slug}>
                        <button
                          onClick={() => setActive(c.slug as CourseSlug)}
                          className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13.5px] transition ${
                            active === c.slug
                              ? "bg-ink text-paper"
                              : "text-body hover:bg-offwhite hover:text-ink"
                          }`}
                        >
                          <CourseIcon
                            slug={c.slug}
                            category={c.category}
                            size="sm"
                          />
                          <span className="truncate">{c.shortTitle}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </aside>

          <div data-tour="leaderboard-table" className="space-y-4">
            {active === "overall" ? (
              <CourseLeaderboard
                courseSlug="overall"
                courseTitle="Overall"
                limit={50}
              />
            ) : activeCourse ? (
              <CourseLeaderboard
                courseSlug={activeCourse.slug}
                courseTitle={activeCourse.title}
                limit={50}
              />
            ) : (
              <div className="rounded-lg bg-offwhite/60 p-6 text-sm text-muted">
                Pick a course.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
