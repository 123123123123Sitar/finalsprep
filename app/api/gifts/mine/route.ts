import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import { listBuyerGifts } from "@/lib/gifts";

export const runtime = "nodejs";

/** GET /api/gifts/mine - all codes the caller has purchased, redeemed or not. */
export async function GET(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const gifts = await listBuyerGifts(authed.user.uid);
  return NextResponse.json({ gifts });
}
