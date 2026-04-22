import { NextResponse } from "next/server";
import { requireAuthedUser } from "@/lib/authGuard";
import {
  adminDbOrThrow,
  ensurePublicProfile,
} from "@/lib/socialAdmin";
import {
  validateUsername,
  AVATAR_COLOR_OPTIONS,
  AVATAR_EMOJI_OPTIONS,
  sanitizeGradeLevel,
  sanitizeInterests,
} from "@/lib/social";
import { getPlan } from "@/lib/userPlan";

export const runtime = "nodejs";

/** Write the caller's current plan into their public profile. */
async function syncPlanToProfile(db: FirebaseFirestore.Firestore, uid: string) {
  try {
    const { plan } = await getPlan(uid);
    await db
      .collection("publicProfiles")
      .doc(uid)
      .set({ plan, updatedAt: Date.now() }, { merge: true });
  } catch {
    // Plan sync is best-effort; don't fail the profile request on it.
  }
}

/** GET /api/me/profile: ensure + return the caller's public profile. */
export async function GET(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const db = adminDbOrThrow();
  await ensurePublicProfile(db, authed.user.uid, authed.user.email);
  await syncPlanToProfile(db, authed.user.uid);
  const snap = await db.collection("publicProfiles").doc(authed.user.uid).get();
  return NextResponse.json({ profile: snap.data() });
}

/** PATCH /api/me/profile: update the caller's profile fields. */
export async function PATCH(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { user } = authed;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const updates: Record<string, any> = { updatedAt: Date.now() };

  if (typeof body?.displayName === "string") {
    const d = body.displayName.trim().slice(0, 40);
    if (d.length === 0) {
      return NextResponse.json({ error: "Display name can't be empty." }, { status: 400 });
    }
    updates.displayName = d;
  }

  if (typeof body?.bio === "string") {
    updates.bio = body.bio.trim().slice(0, 280);
  }

  if (typeof body?.visibility === "string") {
    if (body.visibility !== "public" && body.visibility !== "private") {
      return NextResponse.json({ error: "Bad visibility" }, { status: 400 });
    }
    updates.visibility = body.visibility;
  }

  if (typeof body?.avatarEmoji === "string" || body?.avatarEmoji === null) {
    const v = body.avatarEmoji;
    if (v === null || v === "") {
      updates.avatarEmoji = null;
    } else if (AVATAR_EMOJI_OPTIONS.includes(v)) {
      updates.avatarEmoji = v;
    } else {
      return NextResponse.json({ error: "Bad avatarEmoji" }, { status: 400 });
    }
  }

  if (typeof body?.avatarColor === "string" || body?.avatarColor === null) {
    const v = body.avatarColor;
    if (v === null || v === "") {
      updates.avatarColor = null;
    } else if (AVATAR_COLOR_OPTIONS.includes(v)) {
      updates.avatarColor = v;
    } else {
      return NextResponse.json({ error: "Bad avatarColor" }, { status: 400 });
    }
  }

  if ("gradeLevel" in (body || {})) {
    if (body.gradeLevel === null || body.gradeLevel === "") {
      updates.gradeLevel = null;
    } else {
      const g = sanitizeGradeLevel(body.gradeLevel);
      if (!g) {
        return NextResponse.json({ error: "Bad gradeLevel" }, { status: 400 });
      }
      updates.gradeLevel = g;
    }
  }

  if ("interests" in (body || {})) {
    if (body.interests === null) {
      updates.interests = [];
    } else if (Array.isArray(body.interests)) {
      updates.interests = sanitizeInterests(body.interests);
    } else {
      return NextResponse.json({ error: "Bad interests" }, { status: 400 });
    }
  }

  if (typeof body?.username === "string") {
    const err = validateUsername(body.username);
    if (err) return NextResponse.json({ error: err }, { status: 400 });
    const db = adminDbOrThrow();
    const existing = await db
      .collection("publicProfiles")
      .where("usernameLower", "==", body.username.toLowerCase())
      .limit(1)
      .get();
    if (!existing.empty && existing.docs[0].id !== user.uid) {
      return NextResponse.json({ error: "Username is taken." }, { status: 409 });
    }
    updates.username = body.username;
    updates.usernameLower = body.username.toLowerCase();
  }

  const db = adminDbOrThrow();
  await ensurePublicProfile(db, user.uid, user.email);
  await db.collection("publicProfiles").doc(user.uid).set(updates, { merge: true });
  await syncPlanToProfile(db, user.uid);

  const snap = await db.collection("publicProfiles").doc(user.uid).get();
  return NextResponse.json({ profile: snap.data() });
}
