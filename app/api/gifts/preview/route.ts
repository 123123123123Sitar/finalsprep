import { NextResponse } from "next/server";
import { getGiftCode } from "@/lib/gifts";

export const runtime = "nodejs";

/**
 * GET /api/gifts/preview?code=XXXX
 *
 * Unauthenticated lookup used by /gift landing page to show what the
 * recipient is about to claim before they sign in. Only returns fields
 * that are safe to expose to anonymous visitors (not buyerUid).
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = (url.searchParams.get("code") || "").trim();
  if (!code) {
    return NextResponse.json({ error: "missing-code" }, { status: 400 });
  }
  const gift = await getGiftCode(code);
  if (!gift) {
    return NextResponse.json({ error: "invalid-code" }, { status: 404 });
  }
  return NextResponse.json({
    gift: {
      code: gift.code,
      tier: gift.tier,
      interval: gift.interval,
      redeemed: gift.redeemed,
    },
  });
}
