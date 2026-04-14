import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export type StoredMsg = { role: "user" | "assistant"; content: string };
export type StoredConversation = {
  id: string;
  title: string;
  messages: StoredMsg[];
  createdAt: number;
  updatedAt: number;
};

function conversationsCol(uid: string) {
  const db = getDb();
  if (!db) throw new Error("Firestore not configured");
  return collection(db, "users", uid, "conversations");
}

function toPlain(m: StoredMsg): StoredMsg {
  return { role: m.role, content: m.content };
}

export async function createConversation(
  uid: string,
  title: string,
  messages: StoredMsg[]
): Promise<string> {
  const col = conversationsCol(uid);
  const ref = await addDoc(col, {
    title: title.slice(0, 120) || "Untitled chat",
    messages: messages.map(toPlain),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateConversation(
  uid: string,
  conversationId: string,
  messages: StoredMsg[],
  title?: string
) {
  const db = getDb();
  if (!db) throw new Error("Firestore not configured");
  const ref = doc(db, "users", uid, "conversations", conversationId);
  const payload: any = {
    messages: messages.map(toPlain),
    updatedAt: serverTimestamp(),
  };
  if (title) payload.title = title.slice(0, 120);
  await setDoc(ref, payload, { merge: true });
}

export async function deleteConversation(uid: string, conversationId: string) {
  const db = getDb();
  if (!db) throw new Error("Firestore not configured");
  const ref = doc(db, "users", uid, "conversations", conversationId);
  await deleteDoc(ref);
}

export async function listConversations(
  uid: string,
  max = 50
): Promise<StoredConversation[]> {
  const col = conversationsCol(uid);
  const q = query(col, orderBy("updatedAt", "desc"), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      title: data.title || "Untitled chat",
      messages: Array.isArray(data.messages) ? (data.messages as StoredMsg[]) : [],
      createdAt: tsToMillis(data.createdAt),
      updatedAt: tsToMillis(data.updatedAt),
    };
  });
}

function tsToMillis(t: any): number {
  if (!t) return Date.now();
  if (t instanceof Timestamp) return t.toMillis();
  if (typeof t?.toMillis === "function") return t.toMillis();
  if (typeof t === "number") return t;
  return Date.now();
}

export function titleFromFirstMessage(messages: StoredMsg[]): string {
  const first = messages.find((m) => m.role === "user");
  if (!first) return "New chat";
  return first.content.slice(0, 60).replace(/\s+/g, " ").trim();
}
