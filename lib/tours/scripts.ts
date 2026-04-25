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
      upsell: {
        whenPlan: ["learner"],
        copy: "Interactives and the full Insights dashboard require Pro or Hacker.",
      },
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

export const dashboardTour: Tour = {
  id: "dashboard-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/",
  label: "Dashboard",
  description:
    "An overview of your streak, tokens, enrolled courses, and quick links from the home page.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Your dashboard",
      body: "The home page summarizes your study activity across every enrolled course and provides direct access to the most-used features.",
    },
    {
      target: '[data-tour="dashboard-greeting"]',
      placement: "bottom",
      title: "Personalized welcome",
      body: "The greeting reflects the name set during onboarding and updates throughout the day.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="dashboard-streak"]',
      placement: "bottom",
      title: "Current streak",
      body: "Your streak counts consecutive days with at least one completed study activity. Maintaining a streak is the simplest indicator of consistent preparation.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="dashboard-tokens"]',
      placement: "bottom",
      title: "Token balance",
      body: "Tokens are the unit of consumption for the AI tutor and exam generation. Every plan includes a daily allotment; bonus tokens carry over and never expire.",
      upsell: {
        whenPlan: ["learner"],
        copy: "Pro and Hacker plans include significantly larger daily token allotments.",
      },
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="dashboard-courses"]',
      placement: "top",
      title: "Enrolled courses",
      body: "Each card represents a course you are preparing for. Selecting a card opens its full curriculum, lessons, tools, and practice resources.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="dashboard-quick-links"]',
      placement: "top",
      title: "Quick actions",
      body: "Direct links to the AI tutor, schedule planner, mock exams, insights dashboard, and the token shop.",
      fallbackToCenterIfMissing: true,
    },
  ],
};

export const scheduleTour: Tour = {
  id: "schedule-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/schedule",
  label: "Schedule and streaks",
  description:
    "Planning study blocks, maintaining a streak, claiming token rewards, and using the AI plan generator.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Schedule and streaks",
      body: "The schedule page is where weekly study time is planned, completed sessions are claimed for token rewards, and the daily activity streak is maintained.",
    },
    {
      target: '[data-tour="schedule-calendar"]',
      placement: "bottom",
      title: "Weekly calendar",
      body: "The seven-day grid shows scheduled study blocks across all enrolled courses. Each block is color-coded by course.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="schedule-add-block"]',
      placement: "top",
      title: "Add a study block",
      body: "Select a course, day, start time, and end time. Blocks can be added for any future day in the current week.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="schedule-token-balance"]',
      placement: "bottom",
      title: "Bonus token balance",
      body: "Bonus tokens earned from completed study blocks accumulate here. They are spent automatically when your daily plan token allotment is exhausted.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="schedule-claim"]',
      placement: "left",
      title: "Claim a completed block",
      body: "Once a study block has elapsed, the claim button awards bonus tokens. Longer blocks and active streaks both increase the payout.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="schedule-ai-plan"]',
      placement: "top",
      title: "AI study plan generator",
      body: "Describe an upcoming exam window and any focus areas, and the planner will generate a complete week of study blocks. Generated plans can be edited or replaced.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: "body",
      placement: "center",
      title: "Streak mechanics",
      body: "Completing at least one study block per day extends the active streak. Missing a day resets the streak to zero. Your longest streak is recorded permanently.",
    },
  ],
};

export const accountTour: Tour = {
  id: "account-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/account",
  label: "Account settings",
  description:
    "Profile, theme selection, plan management, token balance, and tutorial replay.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Account settings",
      body: "Account settings are organized into four tabs: Profile, Preferences, Billing, and Support. Changes are saved automatically.",
    },
    {
      target: '[data-tour="account-tabs"]',
      placement: "bottom",
      title: "Settings tabs",
      body: "Profile controls public-facing identity. Preferences controls tutor behavior and theme. Billing manages your plan and tokens. Support provides contact options and tutorial replay.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="account-avatar"]',
      placement: "top",
      title: "Avatar",
      body: "Choose an emoji and background color for the avatar that appears on your profile, in chat, and on community leaderboards.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="account-theme"]',
      placement: "top",
      title: "Theme",
      body: "Eight themes are available: light, dark, sepia, solarized, nord, rose, forest, and a high-contrast variant. The selection applies across the entire application and persists per device.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="account-billing"]',
      placement: "top",
      title: "Plan and billing",
      body: "Your current plan, renewal date, and an option to upgrade or change billing interval are shown here. Payments are processed through Ko-fi.",
      upsell: {
        whenPlan: ["learner"],
        copy: "Upgrade to Pro for $16 / month or Hacker for $29 / month from this tab.",
      },
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="account-tokens"]',
      placement: "top",
      title: "Bonus tokens",
      body: "Bonus tokens earned from study blocks and gift codes are tracked here. Tokens are consumed automatically when daily plan allotments run out.",
      fallbackToCenterIfMissing: true,
    },
  ],
};

export const shopTour: Tour = {
  id: "shop-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/shop",
  label: "Token shop",
  description:
    "Purchasing token packs to supplement your daily plan allotment.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Token shop",
      body: "Token packs are one-time purchases that supplement the daily plan token allotment. Tokens never expire and are spent automatically when the daily allotment runs out.",
    },
    {
      target: '[data-tour="shop-balance"]',
      placement: "bottom",
      title: "Current balance",
      body: "Your bonus token balance is shown at the top of the shop. This balance is shared with the bonus tokens earned from completed study blocks on the schedule page.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="shop-packs"]',
      placement: "top",
      title: "Token packs",
      body: "Each pack lists its token count and price. Larger packs offer a better per-token rate.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: "body",
      placement: "center",
      title: "Pricing and payment",
      body: "Pack purchases are processed through Ko-fi. After payment, tokens are credited to your account automatically and shown in the balance above.",
    },
  ],
};

export const interactivesTour: Tour = {
  id: "interactives-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/interactives",
  label: "Interactives",
  description:
    "AI-generated graphs, simulations, and code playgrounds. Available on Pro and Hacker plans.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Interactives",
      body: "The Interactives feature generates custom graphs, three-dimensional plots, physics simulations, and editable code playgrounds from a natural-language prompt.",
    },
    {
      target: '[data-tour="interactives-learner-upsell"]',
      placement: "bottom",
      title: "Pro and Hacker feature",
      body: "Interactives is part of the Pro plan. Upgrading enables generation of Desmos-style graphs, three-dimensional plots, physics simulations, and editable code playgrounds from a single prompt.",
      onlyForPlans: ["learner"],
      upsell: {
        whenPlan: ["learner"],
        copy: "Available on Pro ($16 / month) and Hacker ($29 / month) plans.",
      },
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="interactives-prompt"]',
      placement: "top",
      title: "Prompt input",
      body: "Describe the graph, simulation, or code example you want to generate. Specific prompts produce better results — include the relevant equations, parameters, or expected behavior.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="interactives-examples"]',
      placement: "top",
      title: "Example prompts",
      body: "Selecting an example fills the prompt input. The examples cover common patterns across math, physics, and computer science.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="interactives-generate"]',
      placement: "top",
      title: "Generate",
      body: "Generation typically completes in five to fifteen seconds. The result is rendered inline below the prompt and added to your history.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="interactives-history"]',
      placement: "top",
      title: "Past interactives",
      body: "Previously generated interactives are listed here. Each can be reopened or deleted.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
  ],
};

export const socialTour: Tour = {
  id: "social-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/social",
  label: "Community",
  description:
    "Following other students, browsing forums, and engaging with course-specific posts.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Community",
      body: "The community page surfaces hot posts from every course forum and provides tools to follow other students for activity updates.",
    },
    {
      target: '[data-tour="social-feed"]',
      placement: "top",
      title: "Hot posts",
      body: "Recent high-engagement posts from every course forum are listed here. Selecting a post opens the full thread with comments.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="social-search"]',
      placement: "bottom",
      title: "Find users",
      body: "Search by username to find other students. Following a user surfaces their posts and progress in your activity feed.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="social-recommendations"]',
      placement: "top",
      title: "Suggested follows",
      body: "Suggested users are based on shared courses and activity patterns. The list updates as you study and engage with the community.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: "body",
      placement: "center",
      title: "Course forums",
      body: "Each AP course has its own forum, accessible from that course's section. Posts tagged to a specific course typically receive faster, more focused responses.",
    },
  ],
};

export const messagesTour: Tour = {
  id: "messages-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/messages",
  label: "Direct messages",
  description: "Sending and receiving private messages with other users.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Direct messages",
      body: "Direct messages allow private conversations with other users. Threads support markdown formatting and persist across devices.",
    },
    {
      target: '[data-tour="messages-conversations"]',
      placement: "right",
      title: "Conversations",
      body: "Existing conversations are listed here, ordered by most recent activity. Selecting a conversation opens the thread on the right.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="messages-new"]',
      placement: "bottom",
      title: "Start a new conversation",
      body: "The composer searches for users by username. Conversations begin once the first message is sent.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="messages-thread"]',
      placement: "left",
      title: "Active thread",
      body: "Messages within a thread are shown in chronological order. Markdown and inline links are rendered automatically.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="messages-composer"]',
      placement: "top",
      title: "Compose",
      body: "Press Enter to send, or use Shift+Enter for a new line. Markdown formatting is supported.",
      fallbackToCenterIfMissing: true,
    },
  ],
};

export const leaderboardTour: Tour = {
  id: "leaderboard-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/leaderboard",
  label: "Leaderboard",
  description: "Course-scoped and overall rankings of active students.",
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Leaderboard",
      body: "The leaderboard ranks students by points earned through completed lessons, practice exams, and community engagement.",
    },
    {
      target: '[data-tour="leaderboard-tabs"]',
      placement: "right",
      title: "Course filter",
      body: "The Overall tab combines points across every course. Selecting a specific course filters the rankings to students enrolled in that course.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="leaderboard-table"]',
      placement: "left",
      title: "Rankings",
      body: "The table updates in real time as students complete activities. Selecting a user opens their public profile.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: "body",
      placement: "center",
      title: "How points are earned",
      body: "Points come from lesson completions, mock exam scores, free-response practice, and forum engagement. Higher difficulty and longer streaks both contribute multipliers.",
    },
  ],
};

export const studyCourseTour: Tour = {
  id: "study-course-tour",
  version: 1,
  firstAvailableAt: FIRST_AVAILABLE_AT,
  route: "/study",
  label: "Inside a course",
  description:
    "Lesson reading, highlights, bookmarks, course-specific tools, flashcards, and quizzes available within a single course.",
  manualTrigger: true,
  steps: [
    {
      target: "body",
      placement: "center",
      title: "Inside a course",
      body: "Each course is organized into eight tabs covering curriculum, practice, tools, lessons, diagrams, flashcards, links, and an equation solver.",
    },
    {
      target: '[data-tour="study-tab-strip"]',
      placement: "bottom",
      title: "Course sections",
      body: "Curriculum lists every unit and lesson. Practice provides MCQ banks. Tools includes course-specific calculators and simulations. Lesson opens the current reading. Diagram, Cards, Links, and Solver are supplemental.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="study-unit-tree"]',
      placement: "right",
      title: "Units and lessons",
      body: "The full curriculum tree. Selecting a lesson opens it in the lesson view and updates your progress.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="study-pro-lock"]',
      placement: "right",
      title: "Locked content",
      body: "Units marked PRO contain full lesson text, practice banks, highlights, and bookmarks. The unit structure is available on the Learner plan; the contents are unlocked with Pro.",
      onlyForPlans: ["learner"],
      upsell: {
        whenPlan: ["learner"],
        copy: "Unlock all unit content with Pro ($16 / month) or Hacker ($29 / month).",
      },
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="study-lesson-area"]',
      placement: "top",
      title: "Lesson content",
      body: "The main reading area renders lesson text, equations, and diagrams. Marking a lesson complete contributes to your Insights metrics.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="study-highlight-tooltip"]',
      placement: "top",
      title: "Highlights and annotations",
      body: "Selecting text within a lesson reveals a highlight and note tool. Annotations sync across devices and surface in your review later.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="study-bookmark"]',
      placement: "left",
      title: "Bookmark",
      body: "Bookmarked lessons appear in your account for quick re-access. Bookmarks are useful for lessons you intend to review repeatedly.",
      onlyForPlans: ["pro", "hacker"],
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="study-tools-panel"]',
      placement: "top",
      title: "Course-specific tools",
      body: "Tools vary by course: Desmos calculators for math, three-dimensional plotting for multivariable, physics simulations for mechanics and electricity, and a code sandbox for computer science.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="study-quiz"]',
      placement: "top",
      title: "Lesson quiz",
      body: "Each lesson includes a short multiple-choice quiz. Incorrect answers are added to your review bank automatically for spaced-repetition study.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="study-flashcards"]',
      placement: "top",
      title: "Flashcards",
      body: "Flashcards use spaced repetition: cards you struggle with reappear more frequently. Useful for definitions, formulas, and short factual content.",
      fallbackToCenterIfMissing: true,
    },
    {
      target: '[data-tour="study-bookmode"]',
      placement: "left",
      title: "Reading mode",
      body: "Reading mode hides the surrounding interface and enlarges the lesson text for distraction-free study sessions.",
      fallbackToCenterIfMissing: true,
    },
  ],
};

export const ALL_TOURS: ReadonlyArray<Tour> = [
  chatTour,
  studyTour,
  studyCourseTour,
  practiceTour,
  insightsTour,
  dashboardTour,
  scheduleTour,
  accountTour,
  shopTour,
  interactivesTour,
  socialTour,
  messagesTour,
  leaderboardTour,
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
