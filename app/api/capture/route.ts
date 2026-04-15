import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const email = (body?.email || "").toString().trim().toLowerCase();
  const source = (body?.source || "unknown").toString().slice(0, 40);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const row = { email, source, ts: new Date().toISOString() };

  // Local dev / Vercel: append to a JSONL file. For production durability,
  // swap this for Postgres (Neon) or Resend audiences - see README.
  try {
    const file = path.join(process.cwd(), "captures.jsonl");
    await fs.appendFile(file, JSON.stringify(row) + "\n", "utf8");
  } catch {
    // Filesystem is read-only on Vercel - that's fine, just log.
    console.log("[capture]", row);
  }

  const resendKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CAPTURE_FROM_EMAIL || "FinalsPrep <hello@finalsprep.com>";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://finalsprep.com";

  if (!resendKey) {
    console.error("[capture] RESEND_API_KEY is not set — email not sent");
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [email],
        subject: "Your FinalsPrep formula sheet",
        html: `<p>Here it is — the one-page sheet of the ~40 formulas from algebra through calculus every student should know cold before an exam.</p>
<p><a href="${siteUrl}/formula-sheet.pdf">Download the formula sheet (PDF)</a></p>
<p>If you want step-by-step walkthroughs on your actual homework — algebra through calc, physics, bio, chem, CS, history — Pro is <a href="${siteUrl}/#price">$11 for the first month with code SCORE5</a>.</p>
<p>Good luck on finals. You got this.</p>`,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[capture] resend error", res.status, text);
      return NextResponse.json(
        { error: "Couldn't send the email. Please try again in a minute." },
        { status: 502 }
      );
    }
  } catch (e) {
    console.error("[capture] resend fetch failed", e);
    return NextResponse.json(
      { error: "Couldn't reach the email service. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
