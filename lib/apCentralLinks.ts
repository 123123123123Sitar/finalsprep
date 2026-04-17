/**
 * Official College Board AP Central URLs per course. Used by the CED
 * topic view + unit header to link out to the authoritative source.
 *
 * AP Central does not expose per-topic deep links — the topic codes
 * (e.g. "1.1") only appear inside the downloadable CED PDF. The most
 * useful official link-out is the course page, which has:
 *   - Course overview
 *   - "Course framework" download (the CED PDF)
 *   - Exam format details
 *   - Instructional resources and sample questions
 *
 * URLs verified against apcentral.collegeboard.org (2026 navigation).
 * Update here only if College Board renames a course slug.
 */

import type { CourseSlug } from "@/lib/topics";

export type ApCentralLinks = {
  /** The course's AP Central home page. */
  course: string;
  /** Direct CED PDF download (when published by CB for this course). */
  cedPdf?: string;
};

export const AP_CENTRAL_LINKS: Record<CourseSlug, ApCentralLinks> = {
  "ap-precalc": {
    course: "https://apcentral.collegeboard.org/courses/ap-precalculus",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-precalculus-course-and-exam-description.pdf",
  },
  "ap-calc-ab": {
    course: "https://apcentral.collegeboard.org/courses/ap-calculus-ab",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-and-bc-course-and-exam-description.pdf",
  },
  "ap-calc-bc": {
    course: "https://apcentral.collegeboard.org/courses/ap-calculus-bc",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-and-bc-course-and-exam-description.pdf",
  },
  "ap-statistics": {
    course: "https://apcentral.collegeboard.org/courses/ap-statistics",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-statistics-course-and-exam-description.pdf",
  },
  "ap-physics-1": {
    course: "https://apcentral.collegeboard.org/courses/ap-physics-1",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description.pdf",
  },
  "ap-physics-2": {
    course: "https://apcentral.collegeboard.org/courses/ap-physics-2",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-physics-2-course-and-exam-description.pdf",
  },
  "ap-physics-c-mech": {
    course:
      "https://apcentral.collegeboard.org/courses/ap-physics-c-mechanics",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-physics-c-mechanics-course-and-exam-description.pdf",
  },
  "ap-physics-c-em": {
    course:
      "https://apcentral.collegeboard.org/courses/ap-physics-c-electricity-and-magnetism",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-physics-c-electricity-and-magnetism-course-and-exam-description.pdf",
  },
  "ap-biology": {
    course: "https://apcentral.collegeboard.org/courses/ap-biology",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-biology-course-and-exam-description.pdf",
  },
  "ap-chemistry": {
    course: "https://apcentral.collegeboard.org/courses/ap-chemistry",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-chemistry-course-and-exam-description.pdf",
  },
  "ap-environmental": {
    course:
      "https://apcentral.collegeboard.org/courses/ap-environmental-science",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-environmental-science-course-and-exam-description.pdf",
  },
  "ap-cs-a": {
    course: "https://apcentral.collegeboard.org/courses/ap-computer-science-a",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf",
  },
  "ap-cs-principles": {
    course:
      "https://apcentral.collegeboard.org/courses/ap-computer-science-principles",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-computer-science-principles-course-and-exam-description.pdf",
  },
  "ap-us-history": {
    course:
      "https://apcentral.collegeboard.org/courses/ap-united-states-history",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-us-history-course-and-exam-description.pdf",
  },
  "ap-world-history": {
    course:
      "https://apcentral.collegeboard.org/courses/ap-world-history-modern",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-world-history-modern-course-and-exam-description.pdf",
  },
  "ap-euro-history": {
    course:
      "https://apcentral.collegeboard.org/courses/ap-european-history",
    cedPdf:
      "https://apcentral.collegeboard.org/media/pdf/ap-european-history-course-and-exam-description.pdf",
  },
};

/** Lookup by course slug. Returns null if the slug isn't recognized. */
export function apCentralLinksFor(
  courseSlug: string
): ApCentralLinks | null {
  return (AP_CENTRAL_LINKS as Record<string, ApCentralLinks | undefined>)[courseSlug] ?? null;
}
