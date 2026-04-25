"use client";

import type { TooltipRenderProps } from "react-joyride";
import type { Upsell } from "@/lib/tours/types";
import type { PlanTier } from "@/lib/plans";

type StepData = {
  upsell?: Upsell;
  plan?: PlanTier;
};

/**
 * Branded tooltip rendered for every First Look tour step. Replaces
 * react-joyride's default tooltip via the `tooltipComponent` prop so we can
 * theme it with the same Tailwind tokens the rest of the app uses (paper,
 * ink, orange, hair) and adapt to all eight active themes for free.
 */
export default function FirstLookTooltip(props: TooltipRenderProps) {
  const {
    backProps,
    continuous,
    index,
    isLastStep,
    primaryProps,
    size,
    skipProps,
    step,
    tooltipProps,
  } = props;

  const data = (step.data as StepData | undefined) ?? {};
  const showUpsell =
    !!data.upsell && !!data.plan && data.upsell.whenPlan.includes(data.plan);

  return (
    <div
      {...tooltipProps}
      className="w-[min(92vw,380px)] rounded-2xl border border-hair bg-paper p-5 shadow-[0_18px_44px_-20px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-baseline justify-between text-[10.5px] uppercase tracking-wider text-muted">
        <span>FinalsPrep walkthrough</span>
        <span>
          {index + 1} / {size}
        </span>
      </div>

      {step.title && (
        <h3 className="mt-3 font-serif text-lg leading-tight text-ink">
          {step.title}
        </h3>
      )}

      <div className="mt-2 text-[14px] leading-relaxed text-body">
        {step.content}
      </div>

      {showUpsell && data.upsell && (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-orange/40 bg-orange-tint px-2.5 py-1 text-[11.5px] text-orange-ink">
          <span aria-hidden="true">✦</span>
          <span>{data.upsell.copy}</span>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          {...skipProps}
          className="text-[12.5px] text-muted hover:text-ink"
        >
          Skip tour
        </button>
        <div className="flex items-center gap-2">
          {index > 0 && (
            <button
              type="button"
              {...backProps}
              className="rounded-md border border-hair bg-paper px-3 py-1.5 text-[13px] text-body transition-colors hover:border-ink"
            >
              Back
            </button>
          )}
          {continuous && (
            <button
              type="button"
              {...primaryProps}
              className="rounded-md bg-orange px-3 py-1.5 text-[13px] font-medium text-paper transition-opacity hover:opacity-90"
            >
              {isLastStep ? "Done" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
