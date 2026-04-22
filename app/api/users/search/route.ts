import { NextResponse } from "next/server";
import { adminDbOrThrow } from "@/lib/socialAdmin";

export const runtime = "nodejs";

/**
 * GET /api/users/search?q=foo — case-insensitive username prefix search.
 *
 * Uses `usernameLower >= q && usernameLower <= q + \uf8ff` for a simple
 * prefix range query. Caps at 10 results.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  if (q.length < 2) return NextResponse.json({ results: [] });

  let db;
  try {
    db = adminDbOrThrow();
  } catch {
    return NextResponse.json({ results: [] });
  }

  const snap = await db
    .collection("publicProfiles")
    .where("usernameLower", ">=", q)
    .where("usernameLower", "<=", q + "\uf8ff")
    .limit(10)
    .get();

  const results = snap.docs.map((d) => {
    const p = d.data() as any;
    return {
      uid: p.uid,
      username: p.username,
      displayName: p.displayName,
      bio: (p.bio || "").slice(0, 80),
      avatarEmoji: p.avatarEmoji ?? null,
      avatarColor: p.avatarColor ?? null,
      stats: {
        problemsSolved: p.stats?.problemsSolved || 0,
        followersCount: p.stats?.followersCount || 0,
      },
    };
  });

  return NextResponse.json({ results });
}
