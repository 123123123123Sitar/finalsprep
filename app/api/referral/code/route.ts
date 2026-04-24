import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { ensureReferralCode, getReferralDoc } from "@/lib/referral";

export const runtime = "nodejs";

/** GET /api/referral/code — lazily create + return the caller's referral. */
export async function GET(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { uid } = authed.user;

  const existing = await getReferralDoc(uid);
  const doc = existing?.code ? existing : await ensureReferralCode(uid);

  return NextResponse.json({
    code: doc.code,
    referredCount: doc.referredCount ?? 0,
    totalEarnedTokens: doc.totalEarnedTokens ?? 0,
    referredBy: doc.referredBy ?? null,
    referredByCode: doc.referredByCode ?? null,
  });
}
