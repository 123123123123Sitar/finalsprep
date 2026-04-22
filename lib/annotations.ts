import {
  deleteField,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Firestore,
} from "firebase/firestore";

export type HighlightColor = "yellow" | "green" | "pink";

export type Highlight = {
  id: string;
  text: string;
  color: HighlightColor;
  note?: string;
  createdAt: number;
};

export type LessonAnnotations = {
  note: string;
  highlights: Highlight[];
};

export const EMPTY_ANNOTATIONS: LessonAnnotations = {
  note: "",
  highlights: [],
};

// Firestore doc IDs can't contain "/" so we normalize the slug the same way
// bookmarks do.
function annotationDocId(slug: string) {
  return slug.replace(/\//g, "__");
}

export function annotationRef(db: Firestore, uid: string, slug: string) {
  return doc(db, "users", uid, "lessonAnnotations", annotationDocId(slug));
}

export function subscribeAnnotations(
  db: Firestore,
  uid: string,
  slug: string,
  cb: (annotations: LessonAnnotations) => void
): () => void {
  return onSnapshot(
    annotationRef(db, uid, slug),
    (snap) => {
      const data = snap.data() as any;
      if (!data) {
        cb(EMPTY_ANNOTATIONS);
        return;
      }
      const highlights: Highlight[] = Array.isArray(data.highlights)
        ? data.highlights
            .filter((h: any) => h && typeof h.id === "string")
            .map((h: any) => {
              const out: Highlight = {
                id: h.id,
                text: String(h.text || ""),
                color: (h.color as HighlightColor) || "yellow",
                createdAt: typeof h.createdAt === "number" ? h.createdAt : 0,
              };
              // Only set `note` when it's a real string - Firestore rejects
              // `undefined` field values, so leaving it off the object keeps
              // future saveHighlights() round-trips valid.
              if (typeof h.note === "string") out.note = h.note;
              return out;
            })
        : [];
      cb({
        note: typeof data.note === "string" ? data.note : "",
        highlights,
      });
    },
    () => cb(EMPTY_ANNOTATIONS)
  );
}

export async function saveNote(
  db: Firestore,
  uid: string,
  slug: string,
  note: string
): Promise<void> {
  await setDoc(
    annotationRef(db, uid, slug),
    { note, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function saveHighlights(
  db: Firestore,
  uid: string,
  slug: string,
  highlights: Highlight[]
): Promise<void> {
  await setDoc(
    annotationRef(db, uid, slug),
    {
      highlights: highlights.length ? highlights : deleteField(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export function makeHighlightId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}
