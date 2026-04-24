/**
 * Budget reservation for /api/chat. Unifies the two paths — Firestore/
 * Redis-backed for signed-in users, in-memory for anonymous callers —
 * behind one async call so the route stays short.
 *
 * When a signed-in user's daily budget is exhausted but their bonus
 * token bank still has enough to cover the reserve minimum, we let the
 * request through. Actual deduction is handled later by spendTokens().
 */
import { LIMITS, reserve, type Tier } from "@/lib/rateLimit";
import { reserveUsage } from "@/lib/rateLimitStore";
import { getTokenBank } from "@/lib/tokenBank";

export type BudgetResult = {
  ok: boolean;
  tier: Tier;
  tokensRemaining: number;
  messagesRemaining: number;
  reason?: "tokens" | "messages";
  message?: string;
  resetMinutes?: number;
};

export async function reserveBudget(params: {
  uid?: string | null;
  tier: Tier;
  key: string;
}): Promise<BudgetResult> {
  const { uid, tier, key } = params;
  let r: BudgetResult;
  if (uid) {
    const p = await reserveUsage(uid, tier);
    r = p.ok
      ? {
          ok: true,
          tier,
          tokensRemaining: p.tokensRemaining,
          messagesRemaining: p.messagesRemaining,
        }
      : {
          ok: false,
          tier,
          tokensRemaining: p.tokensRemaining,
          messagesRemaining: p.messagesRemaining,
          reason: p.reason,
          message: p.message,
          resetMinutes: p.resetMinutes,
        };
  } else {
    const mem = reserve(key, tier);
    r = mem.ok
      ? {
          ok: true,
          tier,
          tokensRemaining: mem.tokensRemaining,
          messagesRemaining: mem.messagesRemaining,
        }
      : {
          ok: false,
          tier,
          tokensRemaining: mem.tokensRemaining,
          messagesRemaining: mem.messagesRemaining,
          reason: mem.reason,
          message: mem.message,
          resetMinutes: mem.resetMinutes,
        };
  }
  // Daily out → try bonus bank as a fallback gate.
  if (!r.ok && uid) {
    const bank = await getTokenBank(uid);
    if (bank.balance >= LIMITS.RESERVE_MIN_TOKENS) {
      r = {
        ok: true,
        tier,
        tokensRemaining: bank.balance,
        messagesRemaining: Math.floor(bank.balance / 700),
      };
    }
  }
  return r;
}
