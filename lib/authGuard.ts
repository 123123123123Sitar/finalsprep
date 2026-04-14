/**
 * Server-side auth guard. Reads Authorization: Bearer <id token> from an
 * incoming request, verifies with Firebase Admin, and returns the caller's
 * uid + email + email-verified state.
 *
 * If Firebase Admin isn't configured OR the header is missing, returns
 * null. API routes decide whether to 401 or to fall back to anonymous
 * (IP-keyed) behavior.
 */
import { getAdminAuth } from "@/lib/firebaseAdmin";

export type AuthedUser = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
};

export async function getAuthedUser(req: Request): Promise<AuthedUser | null> {
  const header = req.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;

  const auth = getAdminAuth();
  if (!auth) return null;

  try {
    const decoded = await auth.verifyIdToken(match[1], true);
    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
      emailVerified: !!decoded.email_verified,
    };
  } catch (e) {
    return null;
  }
}

/** Assertive variant - returns a 401 Response if not authed. */
export async function requireAuthedUser(
  req: Request
): Promise<{ user: AuthedUser } | { error: Response }> {
  const user = await getAuthedUser(req);
  if (!user) {
    return {
      error: new Response(
        JSON.stringify({
          error: "Authentication required",
          message: "You need to be signed in to use the AI tutor.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      ),
    };
  }
  if (!user.emailVerified) {
    return {
      error: new Response(
        JSON.stringify({
          error: "Email not verified",
          message: "Verify your email before using the tutor.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      ),
    };
  }
  return { user };
}
