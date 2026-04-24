import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAuthedUser } from "@/lib/authGuard";
import { getAdminDb, getAdminStorageBucket } from "@/lib/firebaseAdmin";
import { captureException } from "@/lib/observability";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp"]);

function extFor(mime: string): string {
  switch (mime) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}

function downloadUrlFor(bucketName: string, path: string, token: string) {
  const encoded = encodeURIComponent(path);
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encoded}?alt=media&token=${token}`;
}

async function deletePreviousAvatar(
  bucket: ReturnType<typeof getAdminStorageBucket>,
  uid: string,
  except?: string
) {
  if (!bucket) return;
  try {
    const [files] = await bucket.getFiles({ prefix: `avatars/${uid}/` });
    await Promise.all(
      files
        .filter((f) => f.name !== except)
        .map((f) => f.delete().catch(() => undefined))
    );
  } catch (e) {
    captureException(e, { area: "avatar.cleanup", uid });
  }
}

export async function POST(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { uid } = authed.user;

  const bucket = getAdminStorageBucket();
  if (!bucket) {
    return NextResponse.json(
      {
        error: "storage-unconfigured",
        message:
          "Avatar uploads aren't configured on this server. Set FIREBASE_STORAGE_BUCKET to enable them.",
      },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type. Use PNG, JPEG, or WebP." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large. Max 5MB." },
      { status: 413 }
    );
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const downloadToken = randomUUID();
    const path = `avatars/${uid}/${Date.now()}.${extFor(file.type)}`;
    const storageFile = bucket.file(path);
    // Writing the download token as custom metadata opts us into the
    // Firebase-hosted URL pattern, which stays stable across service
    // account key rotations (signed URLs don't).
    await storageFile.save(buf, {
      resumable: false,
      contentType: file.type,
      metadata: {
        cacheControl: "public, max-age=31536000",
        metadata: { firebaseStorageDownloadTokens: downloadToken },
      },
    });

    const avatarUrl = downloadUrlFor(bucket.name, path, downloadToken);

    const db = getAdminDb();
    if (db) {
      await db
        .collection("publicProfiles")
        .doc(uid)
        .set({ avatarUrl, updatedAt: Date.now() }, { merge: true });
    }

    // Clean up any earlier avatar objects so we don't leak storage.
    void deletePreviousAvatar(bucket, uid, path);

    return NextResponse.json({ ok: true, avatarUrl });
  } catch (e: any) {
    captureException(e, { area: "avatar.upload", uid });
    return NextResponse.json(
      { error: e?.message || "Upload failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const authed = await requireAuthedUser(req);
  if ("error" in authed) return authed.error;
  const { uid } = authed.user;

  const bucket = getAdminStorageBucket();
  try {
    if (bucket) {
      await deletePreviousAvatar(bucket, uid);
    }
    const db = getAdminDb();
    if (db) {
      await db
        .collection("publicProfiles")
        .doc(uid)
        .set({ avatarUrl: null, updatedAt: Date.now() }, { merge: true });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    captureException(e, { area: "avatar.delete", uid });
    return NextResponse.json(
      { error: e?.message || "Delete failed" },
      { status: 500 }
    );
  }
}
