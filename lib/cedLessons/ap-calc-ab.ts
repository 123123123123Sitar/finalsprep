import type { CourseCedLessons } from "./types";
import { AP_CALC_BC_CED_LESSONS } from "./ap-calc-bc";

/**
 * AP Calculus AB CED lessons — Units 1-8 of the CED. AB shares its content
 * entirely with BC Units 1-8, so we pull from the BC lesson set rather than
 * duplicating. The subset below matches the AB topic list exactly (AB drops
 * 6.11-6.13, 7.5, 7.9, and 8.13 relative to BC).
 */

const AB_TOPIC_IDS: readonly string[] = [
  // Unit 1 — Limits and Continuity
  "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8",
  "1.9", "1.10", "1.11", "1.12", "1.13", "1.14", "1.15", "1.16",
  // Unit 2 — Differentiation: Definition and Fundamental Properties
  "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9", "2.10",
  // Unit 3 — Differentiation: Composite, Implicit, and Inverse
  "3.1", "3.2", "3.3", "3.4", "3.5", "3.6",
  // Unit 4 — Contextual Applications of Differentiation
  "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7",
  // Unit 5 — Analytical Applications of Differentiation
  "5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "5.11", "5.12",
  // Unit 6 — Integration and Accumulation of Change (AB drops 6.11-6.13)
  "6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.14",
  // Unit 7 — Differential Equations (AB drops 7.5 and 7.9)
  "7.1", "7.2", "7.3", "7.4", "7.6", "7.7", "7.8",
  // Unit 8 — Applications of Integration (AB drops 8.13)
  "8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8", "8.9", "8.10", "8.11", "8.12",
];

export const AP_CALC_AB_CED_LESSONS: CourseCedLessons = AB_TOPIC_IDS.reduce<CourseCedLessons>(
  (acc, id) => {
    const lesson = AP_CALC_BC_CED_LESSONS[id];
    if (lesson) acc[id] = lesson;
    return acc;
  },
  {}
);
