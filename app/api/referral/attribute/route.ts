import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  attributeReferral,
  REFERRAL_TOKEN_REWARD_REFEREE,
} from "@/lib/referral";
import { logEvent } from "@/lib/events";

export const runtime = "nodejs";

/**
 * POST /api/referral/attribute { code: string }
 *
 * Called once from the client after the user's email is verified. The
 * gate ensures a spam signup can't burn referrer rewards before the
 * account is real.
 */
export async function POST(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { uid, email } = authed.user;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = typeof body?.code === "string" ? body.code : "";
  if (!code.trim()) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const result = await attributeReferral(uid, code);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.reason, message: result.message },
      { status: result.reason === "invalid-code" ? 404 : 400 }
    );
  }

  if (!result.alreadyAttributed) {
    void logEvent({
      kind: "signup",
      uid,
      email,
      meta: {
        via: "referral",
        referrerUid: result.referrerUid,
        rewardTokens: REFERRAL_TOKEN_REWARD_REFEREE,
      },
    });
  }

  return NextResponse.json({
    ok: true,
    alreadyAttributed: !!result.alreadyAttributed,
    tokensGranted: result.alreadyAttributed
      ? 0
      : REFERRAL_TOKEN_REWARD_REFEREE,
  });
}
