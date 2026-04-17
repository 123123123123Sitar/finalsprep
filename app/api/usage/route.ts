import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { LIMITS, peek, userKey } from "@/lib/rateLimit";
import { getTokenBank } from "@/lib/tokenBank";
import { getPlan, planToRateTier } from "@/lib/userPlan";

export const runtime = "nodejs";

/**
 * Read-only endpoint the chat UI hits to show a student how much of their
 * daily budget is left and how many bonus tokens they're sitting on. Never
 * mutates — just reads the same rate-limiter and token-bank that /api/chat
 * writes to.
 */
export async function GET(req: Request) {
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;

  if (adminOn && !user) {
    return new Response(JSON.stringify({ error: "Not signed in" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userPlan = user ? await getPlan(user.uid) : null;
  const plan = userPlan?.plan ?? "learner";
  const tier = planToRateTier(userPlan);
  const caps = LIMITS[tier];

  const key = userKey(user?.uid, req);
  const p = peek(key, tier);

  const bank = user ? await getTokenBank(user.uid) : { balance: 0, updatedAt: 0 };

  return new Response(
    JSON.stringify({
      plan,
      tier,
      tokensRemaining: p.tokensRemaining,
      tokensCap: caps.tokens,
      messagesRemaining: p.messagesRemaining,
      messagesCap: caps.messages,
      resetMinutes: p.resetMinutes,
      bonusBalance: bank.balance,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
}
