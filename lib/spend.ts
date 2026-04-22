/**
 * Single entry point for charging an authed user for an AI call.
 *
 * Spending order is intentional: drain the user's daily budget FIRST, then
 * spill the overflow into their bonus token bank. That way:
 *
 *   1. Free / paid daily allowances are used as designed (you spend what
 *      you've already paid for before dipping into purchased / earned tokens).
 *   2. The bonus bank only ever decreases when the daily budget literally
 *      can't cover the call - keeps purchased balances feeling durable.
 *
 * The split is computed inside a single read of `peekUsage`, so a user
 * doesn't get billed twice for the same call.
 */
import { peekUsage, recordUsage } from "@/lib/rateLimitStore";
import { deductFromTokenBank } from "@/lib/tokenBank";
import { planToRateTier, getPlan } from "@/lib/userPlan";

export type SpendResult = {
  charged: number;
  fromDaily: number;
  fromBank: number;
};

/**
 * Charge `amount` tokens against the user, draining daily budget first and
 * any overflow from the bonus bank. Safe to call when amount === 0.
 */
export async function spendTokens(
  uid: string,
  amount: number
): Promise<SpendResult> {
  const cost = Math.max(0, Math.round(amount));
  if (cost <= 0) return { charged: 0, fromDaily: 0, fromBank: 0 };

  const userPlan = await getPlan(uid);
  const tier = planToRateTier(userPlan);
  const usage = await peekUsage(uid, tier);

  const fromDaily = Math.min(cost, Math.max(0, usage.tokensRemaining));
  const fromBank = cost - fromDaily;

  if (fromDaily > 0) await recordUsage(uid, fromDaily);
  if (fromBank > 0) await deductFromTokenBank(uid, fromBank);

  return { charged: fromDaily + fromBank, fromDaily, fromBank };
}
