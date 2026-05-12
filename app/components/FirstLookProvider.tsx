"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { doc, onSnapshot } from "firebase/firestore";
import {
  ACTIONS,
  EVENTS,
  STATUS,
  type CallBackProps,
  type Step,
} from "react-joyride";
import { useAuth } from "./AuthProvider";
import FirstLookTooltip from "./FirstLookTooltip";
import { getDb } from "@/lib/firebase";
import {
  ALL_TOURS,
  getTourById,
  getTourForRoute,
  isTourId,
} from "@/lib/tours/scripts";
import {
  bulkMarkSeenForVeteran,
  initFirstSeenSystemAt,
  markTourSeen,
  subscribeTutorialsSeen,
} from "@/lib/tours/storage";
import type {
  StepCtx,
  Tour,
  TourId,
  TourStep,
  TutorialsSeenDoc,
} from "@/lib/tours/types";

// react-joyride uses portals + DOM queries — must be client-only.
const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

const REPLAY_QUERY_PARAM = "fp_tour";

type OnboardingShape = {
  completed?: boolean;
  completedAt?: { toMillis?: () => number; seconds?: number } | null;
};

type FirstLookContextValue = {
  /**
   * Imperatively start a tour if the current user has not already seen
   * it at the current version. Used by pages that need to fire tours
   * based on internal state rather than a route change (for example,
   * `/study` calls this when a user opens a specific course).
   * If a tour is already running, blocked, or already seen, this is a no-op.
   */
  triggerIfUnseen: (tourId: TourId) => void;
};

const FirstLookContext = createContext<FirstLookContextValue | null>(null);

/**
 * Hook for pages to imperatively start tours bound to internal state.
 * Returns a no-op implementation when used outside the provider so call
 * sites don't have to gate on context availability.
 */
export function useFirstLook(): FirstLookContextValue {
  const ctx = useContext(FirstLookContext);
  return ctx ?? { triggerIfUnseen: () => {} };
}

function readReplayTourId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return new URLSearchParams(window.location.search).get(REPLAY_QUERY_PARAM);
  } catch {
    return null;
  }
}

/**
 * Convert a `TourStep` to a react-joyride `Step`, including a pre-flight
 * check for missing target elements so we can quietly fall back to a
 * centered placement instead of having react-joyride skip the step.
 */
function toJoyrideStep(step: TourStep, ctx: StepCtx): Step {
  let target = step.target;
  let placement: Step["placement"] = step.placement ?? "auto";

  if (
    target !== "body" &&
    step.fallbackToCenterIfMissing !== false &&
    typeof document !== "undefined" &&
    !document.querySelector(target)
  ) {
    target = "body";
    placement = "center";
  }

  return {
    target,
    content: typeof step.body === "function" ? step.body(ctx) : step.body,
    title: step.title,
    placement,
    disableBeacon: true,
    data: { upsell: step.upsell, plan: ctx.plan },
  };
}

/**
 * Owns First Look state: subscribes to onboarding + tutorialsSeen, watches
 * the pathname, and fires the appropriate tour when a signed-in, verified
 * user arrives on a page they have not yet seen.
 *
 * Veteran users (those whose onboarding pre-dates every shipped tour) are
 * auto-marked seen on first mount so they aren't tour-bombed; they can
 * still replay any tour from Account → Support.
 *
 * Wraps children so descendants can call `useFirstLook().triggerIfUnseen(id)`
 * for state-based tours that aren't tied to a specific route.
 */
export default function FirstLookProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, plan, planLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [onboardingCompletedAt, setOnboardingCompletedAt] = useState<
    number | null
  >(null);
  const [onboardingResolved, setOnboardingResolved] = useState(false);
  const [tutorialsSeen, setTutorialsSeen] = useState<TutorialsSeenDoc | null>(
    null
  );
  const [seenResolved, setSeenResolved] = useState(false);

  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [joyrideSteps, setJoyrideSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [run, setRun] = useState(false);

  // Guards against the 350ms gap between `startTour` and `setRun(true)`:
  // without it, a dependency change (e.g. a Firestore subscription emitting
  // a new object reference) could re-run the route effect and queue a second
  // startTour while the first one is still waiting to flip `run`.
  const pendingTourIdRef = useRef<TourId | null>(null);

  // Latest values mirrored to a ref so the imperative `triggerIfUnseen`
  // reads fresh state without causing the callback identity to churn on
  // every state change (which would re-run dependent useEffects in callers).
  const stateRef = useRef({
    user,
    loading,
    plan,
    planLoading,
    onboardingCompletedAt,
    onboardingResolved,
    seenResolved,
    tutorialsSeen,
    run,
  });
  stateRef.current = {
    user,
    loading,
    plan,
    planLoading,
    onboardingCompletedAt,
    onboardingResolved,
    seenResolved,
    tutorialsSeen,
    run,
  };

  // Subscribe to onboarding doc — we need `completedAt` to gate veterans
  // and `completed` to know whether OnboardingFlow has already finished.
  useEffect(() => {
    if (!user) {
      setOnboardingCompletedAt(null);
      setOnboardingResolved(true);
      return;
    }
    const db = getDb();
    if (!db) {
      setOnboardingResolved(true);
      return;
    }
    const ref = doc(db, "users", user.uid, "profile", "onboarding");
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const d = snap.data() as OnboardingShape | undefined;
        if (d?.completed) {
          const ts = d.completedAt;
          let ms: number | null = null;
          if (ts && typeof ts.toMillis === "function") {
            ms = ts.toMillis();
          } else if (ts && typeof ts.seconds === "number") {
            ms = ts.seconds * 1000;
          } else {
            // No completedAt yet — treat as just-completed.
            ms = Date.now();
          }
          setOnboardingCompletedAt(ms);
        } else {
          setOnboardingCompletedAt(null);
        }
        setOnboardingResolved(true);
      },
      () => setOnboardingResolved(true)
    );
    return () => unsub();
  }, [user]);

  // Subscribe to tutorialsSeen doc.
  useEffect(() => {
    if (!user) {
      setTutorialsSeen(null);
      setSeenResolved(true);
      return;
    }
    const db = getDb();
    if (!db) {
      setSeenResolved(true);
      return;
    }
    const unsub = subscribeTutorialsSeen(db, user.uid, (d) => {
      setTutorialsSeen(d);
      setSeenResolved(true);
    });
    return () => unsub();
  }, [user]);

  // First-time initialization: distinguish brand-new vs veteran users and
  // either record the moment or pre-populate seen entries.
  useEffect(() => {
    if (!user || !user.emailVerified) return;
    if (!onboardingResolved || !seenResolved) return;
    if (planLoading) return;
    if (onboardingCompletedAt === null) return; // OnboardingFlow not done
    if (tutorialsSeen?.firstSeenSystemAt) return; // Already initialized

    const db = getDb();
    if (!db) return;

    const isVeteran = ALL_TOURS.every(
      (t) => onboardingCompletedAt < t.firstAvailableAt
    );

    if (isVeteran) {
      bulkMarkSeenForVeteran(
        db,
        user.uid,
        ALL_TOURS.map((t) => ({ id: t.id, version: t.version }))
      ).catch(() => {});
    } else {
      initFirstSeenSystemAt(db, user.uid).catch(() => {});
    }
  }, [
    user,
    onboardingResolved,
    seenResolved,
    planLoading,
    onboardingCompletedAt,
    tutorialsSeen?.firstSeenSystemAt,
  ]);

  /**
   * Shared logic for starting a tour. Used by both the route-based
   * auto-fire effect and the imperative `triggerIfUnseen` API. Returns
   * true if the tour was started, false otherwise.
   */
  const startTour = useCallback(
    (tour: Tour, opts: { ignoreSeenCheck?: boolean }): boolean => {
      const s = stateRef.current;
      if (s.run) return false;
      if (pendingTourIdRef.current) return false;
      if (!s.user || !s.user.emailVerified) return false;
      if (s.loading || s.planLoading) return false;
      if (!s.onboardingResolved || !s.seenResolved) return false;
      if (s.onboardingCompletedAt === null) return false;
      if (s.tutorialsSeen?.dismissedAll) return false;

      const seen = s.tutorialsSeen?.seen?.[tour.id];
      const alreadySeen = !!seen && seen.version >= tour.version;
      if (alreadySeen && !opts.ignoreSeenCheck) return false;

      const filtered = tour.steps.filter(
        (step) => !step.onlyForPlans || step.onlyForPlans.includes(s.plan)
      );
      if (filtered.length === 0) return false;

      pendingTourIdRef.current = tour.id;
      // Give the page a moment to hydrate before resolving anchors.
      window.setTimeout(() => {
        const ctx: StepCtx = { plan: stateRef.current.plan };
        const resolved = filtered.map((step) => toJoyrideStep(step, ctx));
        setActiveTour(tour);
        setJoyrideSteps(resolved);
        setStepIndex(0);
        setRun(true);
        pendingTourIdRef.current = null;
      }, 350);

      return true;
    },
    []
  );

  // Imperative API for state-based triggers.
  const triggerIfUnseen = useCallback(
    (tourId: TourId) => {
      const tour = getTourById(tourId);
      if (!tour) return;
      startTour(tour, { ignoreSeenCheck: false });
    },
    [startTour]
  );

  // Decide whether to fire a tour for the current route.
  useEffect(() => {
    if (run) return;
    if (!user || !user.emailVerified) return;
    if (loading || planLoading) return;
    if (!onboardingResolved || !seenResolved) return;
    if (onboardingCompletedAt === null) return;
    if (tutorialsSeen?.dismissedAll) return;

    const replayTourId = readReplayTourId();
    let tour: Tour | null = null;
    let ignoreSeenCheck = false;

    if (replayTourId && isTourId(replayTourId)) {
      const candidate = getTourById(replayTourId);
      if (candidate && candidate.route === pathname) {
        tour = candidate;
        ignoreSeenCheck = true;
      }
    }

    if (!tour) {
      const routeTour = getTourForRoute(pathname);
      if (routeTour && !routeTour.manualTrigger) tour = routeTour;
    }

    if (!tour) return;

    const timeoutId = window.setTimeout(() => {
      const t = tour;
      if (!t) return;
      startTour(t, { ignoreSeenCheck });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [
    user,
    loading,
    plan,
    planLoading,
    onboardingResolved,
    seenResolved,
    onboardingCompletedAt,
    tutorialsSeen,
    pathname,
    run,
    startTour,
  ]);

  // Strip the `fp_tour` replay param from the URL once a tour starts so a
  // page refresh doesn't re-fire indefinitely.
  useEffect(() => {
    if (!run) return;
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has(REPLAY_QUERY_PARAM)) return;
    params.delete(REPLAY_QUERY_PARAM);
    const next = params.toString();
    router.replace(`${pathname}${next ? `?${next}` : ""}`, { scroll: false });
  }, [run, pathname, router]);

  const handleCallback = useCallback(
    (data: CallBackProps) => {
      const { action, index, status, type } = data;
      const finishStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

      if (finishStatuses.includes(status)) {
        const completed = status === STATUS.FINISHED;
        const tour = activeTour;
        setRun(false);
        setStepIndex(0);
        setActiveTour(null);
        setJoyrideSteps([]);
        pendingTourIdRef.current = null;

        if (tour && user) {
          // Optimistically reflect the seen entry locally so the route-based
          // effect doesn't re-fire this tour during the round-trip to Firestore.
          setTutorialsSeen((prev) => ({
            ...(prev || {}),
            seen: {
              ...(prev?.seen || {}),
              [tour.id]: {
                version: tour.version,
                seenAt: Date.now(),
                completed,
              },
            },
          }));
          const db = getDb();
          if (db) {
            markTourSeen(
              db,
              user.uid,
              tour.id,
              tour.version,
              completed
            ).catch(() => {});
          }
        }
        return;
      }

      if (
        type === EVENTS.STEP_AFTER ||
        type === EVENTS.TARGET_NOT_FOUND
      ) {
        const nextIndex = index + (action === ACTIONS.PREV ? -1 : 1);
        setStepIndex(nextIndex);
      }
    },
    [activeTour, user]
  );

  const ctxValue = useMemo<FirstLookContextValue>(
    () => ({ triggerIfUnseen }),
    [triggerIfUnseen]
  );

  return (
    <FirstLookContext.Provider value={ctxValue}>
      {children}
      {joyrideSteps.length > 0 && (
        <Joyride
          steps={joyrideSteps}
          run={run}
          stepIndex={stepIndex}
          callback={handleCallback}
          continuous
          showSkipButton
          disableOverlayClose
          hideCloseButton
          scrollToFirstStep
          scrollOffset={80}
          tooltipComponent={FirstLookTooltip}
          floaterProps={{ hideArrow: true }}
          styles={{
            options: {
              overlayColor: "rgba(0, 0, 0, 0.45)",
              zIndex: 50,
            },
          }}
        />
      )}
    </FirstLookContext.Provider>
  );
}
