import type { Tour, TourId } from "./types";

/**
 * Timestamp marking when the First Look tutorial system shipped to users.
 * Tours added in this initial batch all share this date. New tours added
 * later should set their own `firstAvailableAt` to roughly the deploy date
 * so existing users get them as new content rather than as a backlog.
 *
 * Date.UTC(year, monthIndex, day) — months are 0-indexed.
 */
const FIRST_AVAILABLE_AT = Date.UTC(2026, 3, 25); // 2026-04-25

export const chatTour: Tour = {
  id: "chat-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/chat",
  label: "Chat tutor",
  description:
    "How to use the AI tutor: composing messages, attaching problems, voice input, and customization.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Your AI tutor",
      body: "Chat is where you will ask questions, request explanations, and work through problems. The following walkthrough introduces the interface.",
    },
    {
      target: '[data-tour="chat-input"]',
      placement: "top",
      title: "Compose a message",
      body: "Type your question, paste content, or drag in a file. Markdown and LaTeX are rendered automatically.",
    },
    {
      target: '[data-tour="chat-upload"]',
      placement: "top",
      title: "Attach a problem",
      body: "Photos, screenshots, and PDFs are supported. Text is extracted from images and answered in context.",
    },
    {
      target: '[data-tour="chat-mic"]',
      placement: "top",
      title: "Voice input",
      body: "Select the microphone to dictate a question. The response can be read aloud using the selected tutor voice.",
    },
    {
      target: '[data-tour="chat-settings"]',
      placement: "left",
      title: "Customize the tutor",
      body: "Adjust response length, teaching style, and personality. Preferences are saved to your account and apply to all conversations.",
    },
    {
      target: '[data-tour="chat-sidebar"]',
      placement: "right",
      title: "Conversation history",
      body: "Past chats are listed here. Pin a conversation to keep related discussions grouped as a project.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="chat-extensions"]',
      placement: "right",
      title: "Related tools",
      body: "Quick links to Interactives, Schedule, Insights, and Shop. Each opens in an embedded panel without leaving Chat.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: "body",
      placement: "center",
      title: "Save important responses",
      body: "Each response includes a star control. Saved messages can be retrieved later from Insights → Saved.",
    },
    {
      target: "body",
      placement: "center",
      title: "Additional tutor voices",
      body: "Pro and Hacker plans include access to over 20 tutor voices, including premium options. The full voice list is available in the chat settings panel.",
      onlyForPlans: ["learner"],
      upsell: {
        whenPlan: ["learner"],
        copy: "Available on Pro and Hacker plans.",
      },
    },
  ],
};

export const studyTour: Tour = {
  id: "study-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/study",
  label: "Study and curriculum",
  description:
    "Browsing the AP curriculum, units, lessons, course-specific tools, and practice quizzes.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "AP curriculum",
      body: "This page contains lessons, practice banks, course-specific tools, flashcards, and reference material for every course you are enrolled in.",
    },
    {
      target: '[data-tour="study-courses-grid"]',
      placement: "top",
      title: "Your enrolled courses",
      body: "Each card represents an enrolled AP course. Selecting a course opens its full curriculum tree, lessons, tools, flashcards, and practice quizzes.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: "body",
      placement: "center",
      title: "Sections inside each course",
      body: "Eight sections are available per course: Curriculum, Practice, Tools, Lesson, Diagram, Flashcards, Links, and Equation Solver. The Tools tab includes a Desmos calculator for math, simulations for physics, and a code sandbox for computer science.",
    },
    {
      target: "body",
      placement: "center",
      title: "Progress and review",
      body: "Marking lessons complete contributes to your Insights metrics. Incorrect quiz answers are added to your review bank automatically for spaced-repetition study.",
    },
    {
      target: "body",
      placement: "center",
      title: "Lesson content access",
      body: "Full unit lessons, in-text highlights, annotations, and bookmarks require a Pro plan. The unit structure and example previews are available on the Learner plan at no cost.",
      onlyForPlans: ["learner"],
      upsell: {
        whenPlan: ["learner"],
        copy: "Pro plan: $16 / month or $90 / 6 months.",
      },
    },
  ],
};

export const practiceTour: Tour = {
  id: "practice-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/practice",
  label: "Exam practice",
  description:
    "Generating mock exams, practicing past free-response questions, and exam timing options.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Exam practice",
      body: "Generate full-length mock exams or work through real past free-response questions, with optional AP-pace timing.",
    },
    {
      target: '[data-tour="practice-tabs"]',
      placement: "bottom",
      title: "Two modes",
      body: "Exams are AI-generated and tunable. FRQs are official past free-response questions from the College Board, organized by year and topic.",
    },
    {
      target: '[data-tour="practice-course"]',
      placement: "bottom",
      title: "Course",
      body: "Select the AP course you are preparing for. Available courses are determined by your current enrollment.",
    },
    {
      target: '[data-tour="practice-mcq-slider"]',
      placement: "right",
      title: "Question mix",
      body: "Set the number of multiple-choice and free-response questions. The defaults match the official AP exam format for the selected course.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="practice-timer"]',
      placement: "top",
      title: "Timing",
      body: "AP-pace simulates the actual exam. Untimed is recommended for early practice. Custom allows a specific duration.",
    },
    {
      target: '[data-tour="practice-difficulty"]',
      placement: "top",
      title: "Difficulty",
      body: "Easy reinforces fundamentals. Hard targets the upper end of the question distribution. Mixed practice across all three is the broadest preparation.",
    },
    {
      target: '[data-tour="practice-generate"]',
      placement: "top",
      title: "Generate the exam",
      body: "The exam will be assembled and presented in approximately ten seconds. During the exam, a question navigator allows jumping between items.",
    },
    {
      target: "body",
      placement: "center",
      title: "Free-response grading",
      body: "Self-grading against the rubric is available on all plans. Hacker plans include automatic AI grading of free-response answers against the official AP rubric, with point-by-point feedback.",
      onlyForPlans: ["learner", "pro"],
      upsell: {
        whenPlan: ["learner", "pro"],
        copy: "Automatic FRQ grading is a Hacker plan feature.",
      },
    },
  ],
};

export const insightsTour: Tour = {
  id: "insights-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/insights",
  label: "Performance insights",
  description:
    "Reading your activity heatmap, mastery bars, AP score projection, and review bank.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Performance analytics",
      body: "This page summarizes your study activity, identifies weak areas, and projects an estimated AP score based on your practice history.",
    },
    {
      target: '[data-tour="insights-learner-upsell"]',
      placement: "bottom",
      title: "Insights is a Pro feature",
      body: "The full dashboard, including the activity heatmap, course mastery bars, AP score projection, and the wrong-answer review bank, is unlocked with a Pro or Hacker plan.",
      onlyForPlans: ["learner"],
      upsell: {
        whenPlan: ["learner"],
        copy: "Pro plan starts at $16 / month.",
      },
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="insights-prediction"]',
      placement: "top",
      title: "Predicted AP score",
      body: "Calculated from your practice exam history and accuracy. Use this as a directional indicator rather than a definitive prediction.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="insights-mastery"]',
      placement: "top",
      title: "Mastery by course and unit",
      body: "Lower bars indicate areas to prioritize. Each unit links to the corresponding lessons in Study.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="insights-heatmap"]',
      placement: "top",
      title: "Activity heatmap",
      body: "Each cell represents one day of activity. Color intensity reflects total time studied. Consistency typically outperforms cramming.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="insights-weak-topics"]',
      placement: "top",
      title: "Recommended focus areas",
      body: "Topics where your accuracy is lowest, ordered by recency. Each entry links to a relevant lesson or chat prompt.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="insights-review-tab"]',
      placement: "bottom",
      title: "Review bank",
      body: "All previously incorrect questions, sorted by recency and filterable by course or difficulty. Working through this list typically improves exam scores faster than additional new practice.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
  ],
};

export const ALL_TOURS: ReadonlyArray<Tour> = [
  chatTour,
  studyTour,
  practiceTour,
  insightsTour,
];

/** Earliest `firstAvailableAt` across all tours. Used by veteran-user gating. */
export const EARLIEST_TOUR_AVAILABLE_AT = ALL_TOURS.reduce(
  (acc, t) => Math.min(acc, t.firstAvailableAt),
  Number.POSITIVE_INFINITY
);

export function getTourForRoute(pathname: string): Tour | null {
  return ALL_TOURS.find((t) => t.route === pathname) ?? null;
}

export function getTourById(id: string): Tour | null {
  return ALL_TOURS.find((t) => t.id === id) ?? null;
}

export function isTourId(value: unknown): value is TourId {
  return (
    typeof value === "string" &&
    ALL_TOURS.some((t) => t.id === (value as TourId))
  );
}
