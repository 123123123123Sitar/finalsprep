import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type Firestore,
} from "firebase/firestore";

export type Bookmark = {
  slug: string;
  title: string;
  courseSlug: string;
  courseTitle: string;
  unitNumber?: number;
  unitTitle?: string;
  createdAt?: number;
};

// Firestore doc IDs can't contain "/" so we normalize the slug.
function bookmarkId(slug: string) {
  return slug.replace(/\//g, "__");
}

export function bookmarkRef(db: Firestore, uid: string, slug: string) {
  return doc(db, "users", uid, "bookmarks", bookmarkId(slug));
}

export function bookmarksCollection(db: Firestore, uid: string) {
  return collection(db, "users", uid, "bookmarks");
}

export async function addBookmark(
  db: Firestore,
  uid: string,
  bm: Bookmark
): Promise<void> {
  await setDoc(bookmarkRef(db, uid, bm.slug), {
    ...bm,
    createdAt: serverTimestamp(),
  });
}

export async function removeBookmark(
  db: Firestore,
  uid: string,
  slug: string
): Promise<void> {
  await deleteDoc(bookmarkRef(db, uid, slug));
}

export function subscribeBookmarks(
  db: Firestore,
  uid: string,
  cb: (bookmarks: Bookmark[]) => void
): () => void {
  const q = query(bookmarksCollection(db, uid), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const arr: Bookmark[] = [];
      snap.forEach((d) => {
        const data = d.data() as any;
        arr.push({
          slug: data.slug,
          title: data.title,
          courseSlug: data.courseSlug,
          courseTitle: data.courseTitle,
          unitNumber: data.unitNumber,
          unitTitle: data.unitTitle,
          createdAt: data.createdAt?.toMillis?.() ?? 0,
        });
      });
      cb(arr);
    },
    () => cb([])
  );
}
