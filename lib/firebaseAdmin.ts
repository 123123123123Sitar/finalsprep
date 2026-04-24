/**
 * Server-side Firebase Admin SDK initialization.
 *
 * Requires FIREBASE_ADMIN_KEY_B64 in the environment - a base64-encoded
 * service account JSON from the Firebase console. We decode it at runtime
 * so secrets never sit as plain JSON in the repo or build output.
 *
 * All three exports are lazy and return null if the admin SDK isn't
 * configured, so routes can fall back to anonymous mode gracefully.
 */
import {
  cert,
  getApps,
  initializeApp,
  type App,
  type ServiceAccount,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage, type Storage } from "firebase-admin/storage";

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;
let adminStorage: Storage | null = null;
let triedInit = false;

export function isAdminConfigured(): boolean {
  return !!process.env.FIREBASE_ADMIN_KEY_B64;
}

function ensureAdmin(): App | null {
  if (adminApp) return adminApp;
  if (triedInit) return null;
  triedInit = true;

  const b64 = process.env.FIREBASE_ADMIN_KEY_B64;
  if (!b64) return null;

  let credentials: ServiceAccount;
  try {
    const json = Buffer.from(b64, "base64").toString("utf8");
    credentials = JSON.parse(json);
  } catch (e) {
    console.error("[firebaseAdmin] failed to decode FIREBASE_ADMIN_KEY_B64", e);
    return null;
  }

  try {
    const existing = getApps();
    adminApp =
      existing.find((a) => a.name === "finalsprep-admin") ??
      initializeApp(
        {
          credential: cert(credentials),
          projectId: (credentials as any).project_id,
        },
        "finalsprep-admin"
      );
    return adminApp;
  } catch (e) {
    console.error("[firebaseAdmin] initializeApp failed", e);
    return null;
  }
}

export function getAdminAuth(): Auth | null {
  if (adminAuth) return adminAuth;
  const app = ensureAdmin();
  if (!app) return null;
  adminAuth = getAuth(app);
  return adminAuth;
}

export function getAdminDb(): Firestore | null {
  if (adminDb) return adminDb;
  const app = ensureAdmin();
  if (!app) return null;
  adminDb = getFirestore(app);
  return adminDb;
}

/**
 * Default Storage bucket for avatar uploads. Prefers the public env var
 * so the same bucket name is consistent between client and server.
 * Returns null if Storage isn't configured.
 */
export function getAdminStorageBucket() {
  if (!adminStorage) {
    const app = ensureAdmin();
    if (!app) return null;
    adminStorage = getStorage(app);
  }
  const bucketName =
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucketName) return null;
  return adminStorage.bucket(bucketName);
}
