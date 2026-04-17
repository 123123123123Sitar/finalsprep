/**
 * Grouping layer on top of the raw CED topic list. A "lesson" is a
 * pedagogically-grouped set of adjacent CED topics, so students navigate
 * Unit → Lesson → Topic-as-tab instead of a flat 14+ topic list.
 *
 * Hand-crafted groupings live under COURSE_GROUPS keyed by {courseSlug →
 * unitNumber → [lesson defs]}. When a course is not yet grouped we fall
 * back to mechanical chunks of three topics.
 */

export type TopicLike = { id: string; title: string };

export type LessonGroup = {
  /** Stable id within the unit, e.g. "1-2" for unit 1 lesson 2. */
  id: string;
  /** 1-based ordinal within the unit, used as the lesson number. */
  number: number;
  title: string;
  topics: TopicLike[];
};

type GroupDef = { title: string; topicIds: string[] };

const PRECALC_GROUPS: Record<number, GroupDef[]> = {
  1: [
    { title: "Quadratics", topicIds: ["1.1", "1.2", "1.3"] },
    { title: "Polynomials", topicIds: ["1.4", "1.5", "1.6"] },
    {
      title: "Rational Functions",
      topicIds: ["1.7", "1.8", "1.9", "1.10"],
    },
    {
      title: "Functions & Transformations",
      topicIds: ["1.11", "1.12", "1.13", "1.14"],
    },
  ],
  2: [
    { title: "Sequences", topicIds: ["2.1", "2.2"] },
    {
      title: "Exponential Functions",
      topicIds: ["2.3", "2.4", "2.5", "2.6"],
    },
    { title: "Composition & Inverses", topicIds: ["2.7", "2.8"] },
    {
      title: "Logarithmic Functions",
      topicIds: ["2.9", "2.10", "2.11", "2.12"],
    },
    {
      title: "Exponential & Log Modeling",
      topicIds: ["2.13", "2.14", "2.15"],
    },
  ],
  3: [
    {
      title: "Trig Basics & Unit Circle",
      topicIds: ["3.1", "3.2", "3.3"],
    },
    {
      title: "Sinusoidal Functions",
      topicIds: ["3.4", "3.5", "3.6", "3.7"],
    },
    { title: "Other Trig Functions", topicIds: ["3.8", "3.11"] },
    { title: "Inverse Trig & Equations", topicIds: ["3.9", "3.10"] },
    { title: "Trig Identities", topicIds: ["3.12"] },
    {
      title: "Polar Coordinates",
      topicIds: ["3.13", "3.14", "3.15"],
    },
  ],
  4: [
    {
      title: "Parametric Functions",
      topicIds: ["4.1", "4.2", "4.3", "4.4"],
    },
    {
      title: "Implicit Functions & Conics",
      topicIds: ["4.5", "4.6", "4.7"],
    },
    { title: "Vectors", topicIds: ["4.8", "4.9"] },
    {
      title: "Matrices",
      topicIds: ["4.10", "4.11", "4.12", "4.13", "4.14"],
    },
  ],
};

const COURSE_GROUPS: Record<string, Record<number, GroupDef[]>> = {
  "ap-precalc": PRECALC_GROUPS,
};

export function groupTopicsIntoLessons(
  courseSlug: string,
  unitNumber: number,
  topics: TopicLike[]
): LessonGroup[] {
  const defined = COURSE_GROUPS[courseSlug]?.[unitNumber];
  if (defined && defined.length > 0) {
    const byId = new Map(topics.map((t) => [t.id, t]));
    const result: LessonGroup[] = [];
    defined.forEach((g, i) => {
      const items: TopicLike[] = [];
      for (const id of g.topicIds) {
        const t = byId.get(id);
        if (t) items.push(t);
      }
      if (items.length > 0) {
        result.push({
          id: `${unitNumber}-${i + 1}`,
          number: i + 1,
          title: g.title,
          topics: items,
        });
      }
    });
    const covered = new Set(defined.flatMap((g) => g.topicIds));
    const rest = topics.filter((t) => !covered.has(t.id));
    if (rest.length > 0) {
      result.push({
        id: `${unitNumber}-${result.length + 1}`,
        number: result.length + 1,
        title: "Additional topics",
        topics: rest,
      });
    }
    return result;
  }
  const groups: LessonGroup[] = [];
  const chunkSize = 3;
  for (let i = 0; i < topics.length; i += chunkSize) {
    const chunk = topics.slice(i, i + chunkSize);
    const idx = i / chunkSize + 1;
    groups.push({
      id: `${unitNumber}-${idx}`,
      number: idx,
      title: `Lesson ${idx}`,
      topics: chunk,
    });
  }
  return groups;
}

export function findLessonGroupFor(
  groups: LessonGroup[],
  topicId: string
): LessonGroup | undefined {
  return groups.find((g) => g.topics.some((t) => t.id === topicId));
}
