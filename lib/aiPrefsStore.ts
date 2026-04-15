import { getAdminDb } from "@/lib/firebaseAdmin";
import { DEFAULT_AI_PREFS, normalizeAiPrefs, type AiPrefs } from "@/lib/aiPrefs";

export async function getStoredAiPrefs(uid: string): Promise<AiPrefs> {
  const db = getAdminDb();
  if (!db) return DEFAULT_AI_PREFS;
  try {
    const snap = await db.doc(`users/${uid}/profile/prefs`).get();
    return normalizeAiPrefs((snap.data() as Partial<AiPrefs> | undefined) ?? null);
  } catch (e) {
    console.error("[aiPrefs] failed to load prefs", e);
    return DEFAULT_AI_PREFS;
  }
}
