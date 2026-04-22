"use client";
import { useMemo } from "react";
import Link from "next/link";
import { COURSES, LESSONS } from "@/lib/topics";

type HistoryEntry = { kind: string; tokens?: number; createdAt?: number };

export default function ProgressPanel({
  selectedCourses,
  completedSlugs,
  aiHistory,
  wrongCount,
}: {
  selectedCourses: string[];
  completedSlugs: Set<string>;
  aiHistory: HistoryEntry[];
  wrongCount: number;
}) {
  // Course progress bars
  const courseProgress = useMemo(() => {
    return selectedCourses
      .map((slug) => {
        const course = COURSES.find((c) => c.slug === slug);
        if (!course) return null;
        const courseLessons = LESSONS.filter((l) =>
          l.courses.some((m) => m.courseSlug === slug)
        );
        const completed = courseLessons.filter((l) =>
          completedSlugs.has(l.slug)
        ).length;
        return {
          slug,
          title: course.shortTitle,
          completed,
          total: courseLessons.length,
        };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);
  }, [selectedCourses, completedSlugs]);

  // 7-day activity chart
  const last7days = useMemo(() => {
    const days: { date: string; tokens: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const tokens = aiHistory
        .filter((h) => {
          if (!h.createdAt) return false;
          const hDate = new Date(h.createdAt).toISOString().split("T")[0];
          return hDate === dateStr;
        })
        .reduce((sum, h) => sum + (h.tokens || 0), 0);
      days.push({ date: dateStr, tokens });
    }
    return days;
  }, [aiHistory]);

  const maxTokens = Math.max(...last7days.map((d) => d.tokens), 1000);
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="py-8">
      <h2 className="text-lg font-semibold text-ink mb-6">Your progress</h2>

      <div className="grid gap-8">
        {/* Course progress bars */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider">
            Lessons
          </h3>
          {courseProgress.length > 0 ? (
            <div className="space-y-3">
              {courseProgress.map((course) => (
                <div key={course.slug}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-ink font-medium">{course.title}</span>
                    <span className="text-xs text-muted">
                      {course.completed}/{course.total}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-hair">
                    <div
                      className="h-full transition-all bg-orange"
                      style={{
                        width: `${(course.completed / course.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted">No courses selected yet</div>
          )}
        </div>

        {/* 7-day activity chart */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider">
            Weekly activity
          </h3>
          <div className="flex items-end gap-1.5 h-24">
            {last7days.map((day, idx) => (
              <div
                key={day.date}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className="w-full bg-orange rounded transition-colors hover:opacity-80"
                  style={{
                    height: `${Math.max((day.tokens / maxTokens) * 96, 4)}px`,
                  }}
                  title={`${day.date}: ${day.tokens} tokens`}
                />
                <span className="text-[10px] text-muted mt-1">
                  {dayLabels[(new Date(day.date).getDay())]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak spots card */}
        <div className="rounded-lg border border-orange/20 bg-orange-tint/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-orange-ink">
                {wrongCount} problem{wrongCount === 1 ? "" : "s"} saved for review
              </h3>
              <p className="text-xs text-orange-700 mt-1">
                Spaced repetition helps you master these.
              </p>
            </div>
            {wrongCount > 0 && (
              <Link
                href="/review"
                className="text-xs font-medium text-orange-ink hover:underline whitespace-nowrap ml-4"
              >
                Review →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
