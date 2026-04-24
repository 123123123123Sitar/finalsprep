import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { redeemGiftCode } from "@/lib/gifts";
import { logEvent } from "@/lib/events";

export const runtime = "nodejs";

/**
 * POST /api/gifts/redeem { code }
 *
 * Requires an authenticated + email-verified account so a throwaway
 * signup can't burn a code before a real plan is tied to it. Returns
 * the tier/interval/expiresAt the recipient was granted on success.
 */
export async function POST(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { uid, email, emailVerified } = authed.user;

  if (!emailVerified) {
    return NextResponse.json(
      {
        error: "email-not-verified",
        message: "Verify your email before redeeming a gift.",
      },
      { status: 403 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = typeof body?.code === "string" ? body.code : "";
  if (!code.trim()) {
    return NextResponse.json({ error: "missing-code" }, { status: 400 });
  }

  const result = await redeemGiftCode(uid, code);
  if (!result.ok) {
    const status =
      result.reason === "invalid-code"
        ? 404
        : result.reason === "already-redeemed" || result.reason === "self-redeem"
          ? 409
          : 500;
    return NextResponse.json(
      { error: result.reason, message: result.message },
      { status }
    );
  }

  void logEvent({
    kind: "signup",
    uid,
    email,
    meta: {
      via: "gift-redeem",
      tier: result.tier,
      interval: result.interval,
    },
  });

  return NextResponse.json({
    ok: true,
    tier: result.tier,
    interval: result.interval,
    expiresAt: result.expiresAt,
  });
}
