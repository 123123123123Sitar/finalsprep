import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export type WrongBankEntry = {
  id: string;
  courseSlug: string;
  unitNumber: number;
  prompt: string;
  answer: string;
  explanation: string;
  difficulty: string;
  savedAt: number;
};

export async function addToWrongBank(
  uid: string,
  entry: Omit<WrongBankEntry, "id" | "savedAt">
): Promise<string | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const col = collection(db, "users", uid, "wrongBank");
    const docRef = await addDoc(col, {
      ...entry,
      savedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch {
    return null;
  }
}

export async function listWrongBank(
  uid: string
): Promise<WrongBankEntry[]> {
  const db = getDb();
  if (!db) return [];
  try {
    const col = collection(db, "users", uid, "wrongBank");
    const snap = await getDocs(query(col, orderBy("savedAt", "desc")));
    return snap.docs.map((d) => {
      const data = d.data() as any;
      const savedAtMs =
        data.savedAt && typeof data.savedAt.toMillis === "function"
          ? data.savedAt.toMillis()
          : Date.now();
      return {
        id: d.id,
        courseSlug: data.courseSlug || "",
        unitNumber: data.unitNumber || 0,
        prompt: data.prompt || "",
        answer: data.answer || "",
        explanation: data.explanation || "",
        difficulty: data.difficulty || "medium",
        savedAt: savedAtMs,
      } as WrongBankEntry;
    });
  } catch {
    return [];
  }
}

export async function removeFromWrongBank(
  uid: string,
  entryId: string
): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await deleteDoc(doc(db, "users", uid, "wrongBank", entryId));
    return true;
  } catch {
    return false;
  }
}
