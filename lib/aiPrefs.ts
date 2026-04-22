export type AiVerbosity = "brief" | "balanced" | "deep";
export type AiMode = "direct" | "socratic" | "exam_cram";
export type AiPersonality = "calm" | "encouraging" | "straight_shooter";

export type AiPrefs = {
  aiVerbosity: AiVerbosity;
  aiMode: AiMode;
  aiPersonality: AiPersonality;
  aiCustomInstructions: string;
  /** Optional — pulled from the user's publicProfile for personalization. */
  interests?: string[];
  gradeLevel?: string | null;
};

export const AI_CUSTOM_INSTRUCTIONS_LIMIT = 500;

export const DEFAULT_AI_PREFS: AiPrefs = {
  aiVerbosity: "brief",
  aiMode: "direct",
  aiPersonality: "calm",
  aiCustomInstructions: "",
};

export const AI_VERBOSITY_OPTIONS: Array<{
  key: AiVerbosity;
  label: string;
  description: string;
}> = [
  {
    key: "brief",
    label: "Brief",
    description: "Shortest useful answer. Tight explanations, less token waste.",
  },
  {
    key: "balanced",
    label: "Balanced",
    description: "Normal tutoring depth with enough detail to follow the logic.",
  },
  {
    key: "deep",
    label: "Deep dive",
    description: "Longer walkthroughs when you want more detail and context.",
  },
];

export const AI_MODE_OPTIONS: Array<{
  key: AiMode;
  label: string;
  description: string;
}> = [
  {
    key: "direct",
    label: "Direct tutor",
    description: "Explain the path clearly and get to the point fast.",
  },
  {
    key: "socratic",
    label: "Socratic",
    description: "Guide with short questions before giving the next step.",
  },
  {
    key: "exam_cram",
    label: "Exam cram",
    description: "Prioritize the fastest exam-ready pattern and common traps.",
  },
];

export const AI_PERSONALITY_OPTIONS: Array<{
  key: AiPersonality;
  label: string;
  description: string;
}> = [
  {
    key: "calm",
    label: "Calm",
    description: "Steady, low-drama tone.",
  },
  {
    key: "encouraging",
    label: "Encouraging",
    description: "A bit more supportive without sounding cheesy.",
  },
  {
    key: "straight_shooter",
    label: "Straight shooter",
    description: "Blunt, efficient, and low-fluff.",
  },
];

function sanitizeCustomInstructions(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, AI_CUSTOM_INSTRUCTIONS_LIMIT);
}

function isVerbosity(value: unknown): value is AiVerbosity {
  return value === "brief" || value === "balanced" || value === "deep";
}

function isMode(value: unknown): value is AiMode {
  return value === "direct" || value === "socratic" || value === "exam_cram";
}

function isPersonality(value: unknown): value is AiPersonality {
  return (
    value === "calm" ||
    value === "encouraging" ||
    value === "straight_shooter"
  );
}

export function normalizeAiPrefs(raw: Partial<AiPrefs> | null | undefined): AiPrefs {
  return {
    aiVerbosity: isVerbosity(raw?.aiVerbosity)
      ? raw.aiVerbosity
      : DEFAULT_AI_PREFS.aiVerbosity,
    aiMode: isMode(raw?.aiMode) ? raw.aiMode : DEFAULT_AI_PREFS.aiMode,
    aiPersonality: isPersonality(raw?.aiPersonality)
      ? raw.aiPersonality
      : DEFAULT_AI_PREFS.aiPersonality,
    aiCustomInstructions: sanitizeCustomInstructions(raw?.aiCustomInstructions),
  };
}

function verbosityPrompt(value: AiVerbosity): string {
  switch (value) {
    case "balanced":
      return "Give a medium-length answer. Explain the core steps, but do not pad or repeat.";
    case "deep":
      return "Give a fuller explanation with extra detail when it improves understanding, but still avoid filler.";
    default:
      return "Be brief by default. Use the fewest words that still teach the step correctly.";
  }
}

function modePrompt(value: AiMode): string {
  switch (value) {
    case "socratic":
      return "Use a Socratic style. Ask short guiding questions before revealing the next step when that is practical.";
    case "exam_cram":
      return "Use exam-cram mode. Prioritize the fastest reliable method, the pattern to memorize, and the trap to avoid.";
    default:
      return "Use a direct tutor style. Explain the path clearly and move efficiently.";
  }
}

function personalityPrompt(value: AiPersonality): string {
  switch (value) {
    case "encouraging":
      return "Sound encouraging and supportive, but stay natural and never cheesy.";
    case "straight_shooter":
      return "Sound like a straight shooter: crisp, honest, and low-fluff.";
    default:
      return "Sound calm and composed.";
  }
}

export function buildAiPreferencePrompt(prefs: AiPrefs): string {
  const lines = [
    "USER PREFERENCES: honor these unless they conflict with the teaching rules above.",
    `- ${verbosityPrompt(prefs.aiVerbosity)}`,
    `- ${modePrompt(prefs.aiMode)}`,
    `- ${personalityPrompt(prefs.aiPersonality)}`,
  ];
  if (prefs.gradeLevel) {
    lines.push(
      `- Student context: ${prefs.gradeLevel}. Pitch vocabulary, examples, and depth to that level.`
    );
  }
  if (prefs.interests && prefs.interests.length > 0) {
    lines.push(
      `- Interests: ${prefs.interests.join(", ")}. When choosing analogies or examples, prefer ones that connect to these interests, but never force it.`
    );
  }
  if (prefs.aiCustomInstructions) {
    lines.push(
      "- Additional custom instructions from the user:",
      prefs.aiCustomInstructions
    );
  }
  return lines.join("\n");
}

export function maxOutputTokens(
  surface: "chat" | "explain",
  verbosity: AiVerbosity
): number {
  if (surface === "explain") {
    switch (verbosity) {
      case "balanced":
        return 700;
      case "deep":
        return 1000;
      default:
        return 450;
    }
  }

  switch (verbosity) {
    case "balanced":
      return 900;
    case "deep":
      return 1300;
    default:
      return 550;
  }
}
