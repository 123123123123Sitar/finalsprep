import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export type ExamResult = {
  id: string;
  courseSlug: string;
  score: number;
  total: number;
  percentage: number;
  createdAt: number;
};

export async function saveExamResult(
  uid: string,
  entry: Omit<ExamResult, "id" | "createdAt">
): Promise<string | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const col = collection(db, "users", uid, "examResults");
    const docRef = await addDoc(col, {
      ...entry,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch {
    return null;
  }
}

export async function listExamResults(uid: string): Promise<ExamResult[]> {
  const db = getDb();
  if (!db) return [];
  try {
    const col = collection(db, "users", uid, "examResults");
    const snap = await getDocs(query(col, orderBy("createdAt", "desc")));
    return snap.docs.map((d) => {
      const data = d.data() as any;
      const createdAtMs =
        data.createdAt && typeof data.createdAt.toMillis === "function"
          ? data.createdAt.toMillis()
          : Date.now();
      return {
        id: d.id,
        courseSlug: data.courseSlug || "",
        score: data.score || 0,
        total: data.total || 0,
        percentage: data.percentage || 0,
        createdAt: createdAtMs,
      } as ExamResult;
    });
  } catch {
    return [];
  }
}
