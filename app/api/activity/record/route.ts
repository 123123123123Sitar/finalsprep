import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { recordActivity } from "@/lib/activity";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && (!user || !user.emailVerified)) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  if (!user) {
    return NextResponse.json(
      { error: "Admin SDK not configured" },
      { status: 500 }
    );
  }

  await recordActivity(user.uid);
  return NextResponse.json({ ok: true });
}
