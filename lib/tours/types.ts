import type { PlanTier } from "@/lib/plans";

export type TourId =
  | "chat-tour"
  | "study-tour"
  | "practice-tour"
  | "insights-tour";

export type StepCtx = { plan: PlanTier };

export type Upsell = {
  whenPlan: PlanTier[];
  copy: string;
};

export type StepPlacement =
  | "auto"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end"
  | "center";

export type TourStep = {
  /** CSS selector (e.g. `[data-tour="chat-input"]`) or `body` for centered. */
  target: string;
  title?: string;
  /** Body string, or a function so copy can adapt to the user's plan. */
  body: string | ((ctx: StepCtx) => string);
  upsell?: Upsell;
  placement?: StepPlacement;
  /**
   * If the target element is missing at run time, render the step centered
   * instead of skipping it. Default: true.
   */
  fallbackToCenterIfMissing?: boolean;
  /** Restrict step to specific plan tiers. Filtered out if plan not in list. */
  onlyForPlans?: PlanTier[];
};

export type Tour = {
  id: TourId;
  version: number;
  /**
   * ms timestamp marking when this tour first existed in production.
   * Users whose `onboarding.completedAt` predates this are auto-marked
   * seen so they aren't tour-bombed; they can still replay manually.
   */
  firstAvailableAt: number;
  route: string;
  label: string;
  description: string;
  steps: TourStep[];
};

export type TutorialsSeenEntry = {
  version: number;
  seenAt: number;
  completed: boolean;
};

export type TutorialsSeenDoc = {
  seen?: Record<string, TutorialsSeenEntry>;
  dismissedAll?: boolean;
  firstSeenSystemAt?: number;
  schemaVersion?: number;
};
