"use client";
import { useEffect, useMemo, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import CommunityTabs from "@/app/components/CommunityTabs";
import CourseLeaderboard from "@/app/components/CourseLeaderboard";
import { COURSES, type CourseSlug } from "@/lib/topics";

const CATEGORY_LABEL: Record<string, string> = {
  math: "Math",
  science: "Science",
  cs: "Computer Science",
  history: "History",
};

export default function LeaderboardPage() {
  const categories = useMemo(() => {
    const groups = new Map<string, typeof COURSES>();
    for (const c of COURSES) {
      if (!groups.has(c.category)) groups.set(c.category, []);
      groups.get(c.category)!.push(c);
    }
    return Array.from(groups.entries());
  }, []);

  const [activeCourse, setActiveCourse] = useState<CourseSlug>(
    COURSES[0]?.slug as CourseSlug
  );

  // Keep the active course in the URL so shares deep-link correctly.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCourse = params.get("course");
    if (urlCourse && COURSES.some((c) => c.slug === urlCourse)) {
      setActiveCourse(urlCourse as CourseSlug);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("course", activeCourse);
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", url);
  }, [activeCourse]);

  const active = COURSES.find((c) => c.slug === activeCourse);

  return (
    <main className="min-h-screen bg-paper">
      <SiteNav sticky />
      <CommunityTabs />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8">
          <div className="label">Community</div>
          <h1 className="mt-1 font-serif text-4xl text-ink">Leaderboards</h1>
          <p className="mt-2 max-w-xl text-[15px] text-body">
            Top problem solvers per AP course. Solve problems in the{" "}
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
          <aside className="space-y-5">
            {categories.map(([cat, list]) => (
              <div key={cat}>
                <div className="label mb-2">{CATEGORY_LABEL[cat] || cat}</div>
                <ul className="space-y-1">
                  {list.map((c) => (
                    <li key={c.slug}>
                      <button
                        onClick={() => setActiveCourse(c.slug as CourseSlug)}
                        className={`w-full rounded-md px-3 py-2 text-left text-[13.5px] transition ${
                          activeCourse === c.slug
                            ? "bg-ink text-paper"
                            : "text-body hover:bg-offwhite hover:text-ink"
                        }`}
                      >
                        {c.shortTitle}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          <div className="space-y-4">
            {active ? (
              <CourseLeaderboard
                courseSlug={active.slug}
                courseTitle={active.title}
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
