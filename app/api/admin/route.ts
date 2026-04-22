import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/authGuard";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (allow.length === 0) return false;
  return allow.includes(email.toLowerCase());
}

export async function GET(req: Request) {
  const user = await getAuthedUser(req);
  if (!user || !user.emailVerified) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  if (!isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }
  const db = getAdminDb();
  if (!db) {
    return NextResponse.json(
      { error: "Admin SDK not configured" },
      { status: 500 }
    );
  }

  // Pull the most recent 200 events.
  const eventsSnap = await db
    .collection("events")
    .orderBy("at", "desc")
    .limit(200)
    .get();
  const events = eventsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  // Plan distribution + recent user count.
  // Shallow user stats: count billing docs by plan. For tens of thousands
  // of users this would need a real aggregate; we cap at 1000 here.
  const billingSnap = await db
    .collectionGroup("profile")
    .limit(1000)
    .get();
  const planCounts: Record<string, number> = {
    learner: 0,
    pro: 0,
    hacker: 0,
  };
  let totalBillingDocs = 0;
  billingSnap.forEach((d) => {
    if (d.id !== "billing") return;
    totalBillingDocs++;
    const plan = (d.data() as any).plan || "learner";
    if (planCounts[plan] !== undefined) planCounts[plan]++;
  });

  // Engagement: count events in the last 24h, 7d.
  const now = Date.now();
  const d24 = now - 24 * 60 * 60 * 1000;
  const d7 = now - 7 * 24 * 60 * 60 * 1000;
  const recent24hSnap = await db
    .collection("events")
    .where("at", ">=", d24)
    .limit(1000)
    .get();
  const recent7dSnap = await db
    .collection("events")
    .where("at", ">=", d7)
    .limit(1000)
    .get();

  const byKind24h: Record<string, number> = {};
  recent24hSnap.forEach((d) => {
    const k = (d.data() as any).kind;
    byKind24h[k] = (byKind24h[k] || 0) + 1;
  });

  const activeUsers24h = new Set<string>();
  const activeUsers7d = new Set<string>();
  recent24hSnap.forEach((d) => {
    const uid = (d.data() as any).uid;
    if (uid) activeUsers24h.add(uid);
  });
  recent7dSnap.forEach((d) => {
    const uid = (d.data() as any).uid;
    if (uid) activeUsers7d.add(uid);
  });

  return NextResponse.json({
    planCounts,
    totalBillingDocs,
    activeUsers24h: activeUsers24h.size,
    activeUsers7d: activeUsers7d.size,
    byKind24h,
    events,
  });
}
