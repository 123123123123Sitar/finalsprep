/**
 * POST /api/contact — persist contact-form submissions to Firestore.
 *
 * Writes go through the Admin SDK into a top-level `contactMessages`
 * collection. Client writes are denied by firestore.rules, so this route
 * is the only write path. Signed-in submissions capture the caller's uid
 * and verified email; anonymous submissions are allowed but must supply
 * their own email.
 *
 * The in-memory rate limiter is best-effort (see lib/rateLimit.ts note
 * about serverless cold starts). The real hard limit is the firestore
 * admin-only write rule + the 10 KB body cap below.
 */
import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import nodemailer, { type Transporter } from "nodemailer";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { getAuthedUser } from "@/lib/authGuard";
import { captureException } from "@/lib/observability";

export const runtime = "nodejs";

const INQUIRY_TYPES = [
  "support",
  "report-issue",
  "billing",
  "general",
  "feature-request",
  "corporate",
] as const;
type InquiryType = (typeof INQUIRY_TYPES)[number];

const MAX_BODY_BYTES = 10_000;
const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5_000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

// Very small per-IP throttle — 5 messages / hour / IP.
const RECENT = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
function throttled(ip: string): boolean {
  const now = Date.now();
  const history = (RECENT.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (history.length >= MAX_PER_WINDOW) {
    RECENT.set(ip, history);
    return true;
  }
  history.push(now);
  RECENT.set(ip, history);
  return false;
}

export async function POST(req: Request) {
  // Body-size guard before JSON parse — trivial DoS protection.
  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 413 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const inquiryType = clean(body?.inquiryType, 40) as InquiryType;
  if (!INQUIRY_TYPES.includes(inquiryType)) {
    return NextResponse.json(
      { error: "Pick an inquiry type." },
      { status: 400 }
    );
  }

  const name = clean(body?.name, MAX_NAME);
  const email = clean(body?.email, MAX_EMAIL);
  const subject = clean(body?.subject, MAX_SUBJECT);
  const message = clean(body?.message, MAX_MESSAGE);
  const company = clean(body?.company, MAX_NAME); // corporate inquiries only
  // Honeypot: real users leave this blank; bots fill every field.
  const trap = clean(body?.website, 120);
  if (trap) {
    // Silent success to avoid telling a bot it was caught.
    return NextResponse.json({ ok: true });
  }

  if (!name) {
    return NextResponse.json(
      { error: "Please add your name." },
      { status: 400 }
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email so we can reply." },
      { status: 400 }
    );
  }
  if (!subject) {
    return NextResponse.json(
      { error: "Add a short subject." },
      { status: 400 }
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Describe the issue in a few sentences." },
      { status: 400 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  if (throttled(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Try again in an hour." },
      { status: 429 }
    );
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json(
      {
        error:
          "Contact service is temporarily unavailable. Try again shortly.",
      },
      { status: 503 }
    );
  }

  // Attach authed identity when present — best-effort; not required.
  const authed = await getAuthedUser(req).catch(() => null);

  const userAgent = req.headers.get("user-agent") || "";
  const referer = req.headers.get("referer") || "";

  const doc = {
    inquiryType,
    name,
    email,
    subject,
    message,
    company: inquiryType === "corporate" ? company : "",
    status: "new",
    uid: authed?.uid ?? null,
    authedEmail: authed?.email ?? null,
    emailVerified: authed?.emailVerified ?? false,
    userAgent: userAgent.slice(0, 400),
    referer: referer.slice(0, 400),
    ip: ip.slice(0, 100),
    createdAt: FieldValue.serverTimestamp(),
    createdAtMs: Date.now(),
  };

  let docId: string;
  try {
    const ref = await db.collection("contactMessages").add(doc);
    docId = ref.id;
  } catch (e) {
    console.error("[contact] failed to write message", e);
    return NextResponse.json(
      { error: "Could not send message. Please try again." },
      { status: 500 }
    );
  }

  // Email delivery runs after Firestore succeeds so the submission is never
  // lost — if Resend is misconfigured or rate-limited, the user still gets a
  // success response and the admin panel still sees the message. Logged via
  // captureException so failures show up in observability.
  void sendContactEmail({ ...doc, id: docId }).catch((e) =>
    captureException(e, { area: "contact.email", docId })
  );

  return NextResponse.json({ ok: true, id: docId });
}

type EmailPayload = {
  id: string;
  inquiryType: InquiryType;
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
  uid: string | null;
  authedEmail: string | null;
  emailVerified: boolean;
  userAgent: string;
  referer: string;
  ip: string;
};

// Lazily build a single SMTP transporter and reuse it across requests.
// Nodemailer maintains a connection pool under the hood so warm invocations
// avoid the TLS handshake cost.
let cachedTransporter: Transporter | null = null;
let cachedTransporterKey = "";

function buildTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  // Port 465 is implicit TLS; every other port (587, 25, 2525) uses STARTTLS.
  const secure = port === 465;

  const key = `${host}|${port}|${secure}|${user}`;
  if (cachedTransporter && cachedTransporterKey === key) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    pool: true,
    maxConnections: 2,
  });
  cachedTransporterKey = key;
  return cachedTransporter;
}

async function sendContactEmail(payload: EmailPayload): Promise<void> {
  // Single-mailbox setup: finalsprephelp@gmail.com emails itself with every
  // contact-form submission. Hardcoded (not env-driven) because the SMTP
  // account owner IS the support inbox — any other From/To combination
  // would just be Gmail rejecting the send for failing its own SPF check.
  const to = "finalsprephelp@gmail.com";
  const from = "FinalsPrep <finalsprephelp@gmail.com>";

  const transporter = buildTransporter();
  if (!transporter) {
    console.error(
      "[contact] SMTP not configured; email NOT delivered for",
      payload.id,
      "— set SMTP_HOST, SMTP_USER, SMTP_PASS (e.g. Gmail app password)"
    );
    return;
  }

  const subject = `[${payload.inquiryType}] ${payload.subject}`;
  const lines: string[] = [
    `Inquiry type: ${payload.inquiryType}`,
    `From: ${payload.name} <${payload.email}>`,
    payload.company ? `Company: ${payload.company}` : "",
    payload.uid ? `Signed-in uid: ${payload.uid}` : "Anonymous submission",
    payload.authedEmail
      ? `Verified email on account: ${payload.authedEmail} (verified=${payload.emailVerified})`
      : "",
    `IP: ${payload.ip}`,
    payload.referer ? `Referer: ${payload.referer}` : "",
    payload.userAgent ? `User agent: ${payload.userAgent}` : "",
    `Message ID: ${payload.id}`,
    "",
    "---",
    "",
    payload.message,
  ].filter(Boolean);

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject,
      text: lines.join("\n"),
    });
  } catch (e: any) {
    // Surface the SMTP response code + message in logs so the cause (bad
    // app password, wrong host, blocked port, etc.) is obvious without
    // digging through Sentry.
    console.error(
      "[contact] nodemailer failed to send",
      { code: e?.code, response: e?.response, docId: payload.id, from, to }
    );
    throw e;
  }
}
