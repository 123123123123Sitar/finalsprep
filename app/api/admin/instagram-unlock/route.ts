import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

export const runtime = "nodejs";

/**
 * Password gate for the /admin/instagram template page. The expected
 * password lives in INSTAGRAM_ADMIN_PASSWORD (server-side env var) and
 * is never shipped to the client. We compare with timingSafeEqual so
 * attackers can't learn prefixes by measuring response latency.
 */
export async function POST(req: Request) {
  const expected = process.env.INSTAGRAM_ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Unlock not configured on this server." },
      { status: 500 }
    );
  }
  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // fall through — empty string fails the compare
  }
  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }
  const a = Buffer.from(password, "utf8");
  const b = Buffer.from(expected, "utf8");
  const ok = a.length === b.length && timingSafeEqual(a, b);
  // Small constant-ish delay on failure blunts online brute force.
  if (!ok) {
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
