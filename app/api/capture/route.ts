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

  // Optional: forward to Resend broadcast list
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "FinalsPrep <hello@finalsprep.com>",
          to: [email],
          subject: "Your Algebra 2 Final Cheat Sheet",
          html: `<p>Here it is - the one-page cheat sheet of the formulas your teacher expects you to know cold for your Algebra 2 final.</p>
<p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/cheatsheet.pdf">Download the cheat sheet (PDF)</a></p>
<p>If you want the full thing - the 15 topics that actually show up on finals, unlimited practice, and step-by-step explanations on any problem - it's <a href="${process.env.NEXT_PUBLIC_SITE_URL}">here for $19</a>. One time, lifetime access.</p>
<p>Good luck on your final. You got this.</p>`,
        }),
      });
    } catch (e) {
      console.error("resend fail", e);
    }
  }

  return NextResponse.json({ ok: true });
}
