import { getAdminDb } from "@/lib/firebaseAdmin";
import { DEFAULT_AI_PREFS, normalizeAiPrefs, type AiPrefs } from "@/lib/aiPrefs";
import { sanitizeGradeLevel, sanitizeInterests } from "@/lib/social";

export async function getStoredAiPrefs(uid: string): Promise<AiPrefs> {
  const db = getAdminDb();
  if (!db) return DEFAULT_AI_PREFS;
  try {
    const [prefsSnap, profileSnap] = await Promise.all([
      db.doc(`users/${uid}/profile/prefs`).get(),
      db.doc(`publicProfiles/${uid}`).get(),
    ]);
    const prefs = normalizeAiPrefs(
      (prefsSnap.data() as Partial<AiPrefs> | undefined) ?? null
    );
    const profile = profileSnap.data() as any | undefined;
    if (profile) {
      prefs.gradeLevel = sanitizeGradeLevel(profile.gradeLevel);
      prefs.interests = sanitizeInterests(profile.interests);
    }
    return prefs;
  } catch (e) {
    console.error("[aiPrefs] failed to load prefs", e);
    return DEFAULT_AI_PREFS;
  }
}
