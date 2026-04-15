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

export type Project = {
  id: string;
  name: string;
  description: string;
  contextNotes: string;
  createdAt: number;
  updatedAt: number;
};

function projectsCol(uid: string) {
  const db = getDb();
  if (!db) throw new Error("Firestore not configured");
  return collection(db, "users", uid, "projects");
}

export async function listProjects(
  uid: string,
  max = 100
): Promise<Project[]> {
  const q = query(projectsCol(uid), orderBy("updatedAt", "desc"), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      name: data.name || "Untitled project",
      description: data.description || "",
      contextNotes: data.contextNotes || "",
      createdAt: tsToMillis(data.createdAt),
      updatedAt: tsToMillis(data.updatedAt),
    };
  });
}

export async function createProject(
  uid: string,
  name: string,
  description = ""
): Promise<string> {
  const ref = await addDoc(projectsCol(uid), {
    name: name.trim().slice(0, 120) || "Untitled project",
    description: description.trim().slice(0, 500),
    contextNotes: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProject(
  uid: string,
  projectId: string,
  patch: Partial<Pick<Project, "name" | "description" | "contextNotes">>
) {
  const db = getDb();
  if (!db) throw new Error("Firestore not configured");
  await setDoc(
    doc(db, "users", uid, "projects", projectId),
    { ...patch, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function deleteProject(uid: string, projectId: string) {
  const db = getDb();
  if (!db) throw new Error("Firestore not configured");
  await deleteDoc(doc(db, "users", uid, "projects", projectId));
}

function tsToMillis(t: any): number {
  if (!t) return Date.now();
  if (t instanceof Timestamp) return t.toMillis();
  if (typeof t?.toMillis === "function") return t.toMillis();
  if (typeof t === "number") return t;
  return Date.now();
}
