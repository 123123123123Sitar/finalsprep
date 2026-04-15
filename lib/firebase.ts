import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Default to the Firebase-managed auth domain so Google OAuth works
// without extra Google Cloud Console setup. If you want the consent
// screen to show your own domain instead, set
// NEXT_PUBLIC_FIREBASE_USE_CUSTOM_AUTH_DOMAIN=1 AND add your custom
// `https://<site>/__/auth/handler` to the OAuth client's Authorized
// redirect URIs, otherwise Google will reject the request with
// `redirect_uri_mismatch`.
function resolveAuthDomain(): string | undefined {
  const useCustom =
    process.env.NEXT_PUBLIC_FIREBASE_USE_CUSTOM_AUTH_DOMAIN === "1";
  if (useCustom) {
    const site = process.env.NEXT_PUBLIC_SITE_URL;
    if (site) {
      try {
        return new URL(site).host;
      } catch {
        /* fall through */
      }
    }
  }
  return process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: resolveAuthDomain(),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId
  );
}

export function getFirebaseProjectId(): string | undefined {
  return firebaseConfig.projectId as string | undefined;
}

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

function getApp(): FirebaseApp | null {
  if (!isFirebaseConfigured()) return null;
  if (app) return app;
  app = getApps()[0] ?? initializeApp(firebaseConfig as any);
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (authInstance) return authInstance;
  const a = getApp();
  if (!a) return null;
  authInstance = getAuth(a);
  return authInstance;
}

export function getDb(): Firestore | null {
  if (dbInstance) return dbInstance;
  const a = getApp();
  if (!a) return null;
  dbInstance = getFirestore(a);
  return dbInstance;
}
