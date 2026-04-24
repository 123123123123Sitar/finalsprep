# FinalsPrep

An AI tutor that explains math, physics, CS, and history step by step. Covers **16 AP courses** organized by the official College Board unit structure. Free to try, one-time Ko-fi shop orders for paid access. Built with Next.js 14, Firebase (Auth + Firestore + Storage), Ko-fi (payments), Anthropic Claude (streaming responses), KaTeX (math rendering), and Tailwind.

## Feature surface

- **Landing + study + chat** — hero with live solver demo, AP course catalog with per-unit lesson tabs, streaming tutor chat with voice input, image uploads, and a sliding 5-hour token budget.
- **Practice** — MCQ exams assembled from a per-course bank (gated behind Pro/Hacker), FRQ grading, diagnostic quizzes, and a mastery-unlock toggle that enforces easy → medium → hard.
- **Social** — public profiles at `/users/{uid}`, followers, direct messages, lesson comments, course leaderboards, activity feed, and subject-scoped forums.
- **Profile + account** — tabbed `/account` (profile / preferences / billing / support) with display name, bio, photo upload, emoji+color fallback, grade level, and interests. `/profile` is a share-friendly redirect to the signed-in user's public page.
- **Billing + growth loops** — Ko-fi one-time orders for Pro/Hacker (monthly + 6-month) and token packs, referral codes that grant 5k tokens to both sides on email verification, and gift SKUs that mint a redemption code + credit the buyer 1k (Pro) / 2.5k (Hacker) bonus tokens.
- **Contact** — `/contact` form writes to `contactMessages/*` and emails `finalsprephelp@gmail.com` via Resend.

## Repo map

- `app/` — App Router pages + API routes.
  - `app/api/chat/route.ts` — streaming Anthropic endpoint with ID-token auth, token-based rate limiting, plan lookup.
  - `app/api/explain/route.ts` — one-shot explain endpoint: curated walkthroughs (free) + AI fallback (gated).
  - `app/api/webhooks/kofi/route.ts` — Ko-fi webhook: verifies the shared token, resolves shop SKUs to plan/pack/gift, grants idempotently.
  - `app/api/me/avatar/route.ts` — multipart avatar upload + delete; writes to `avatars/{uid}/` in Firebase Storage with a stable `firebaseStorageDownloadTokens` URL.
  - `app/api/me/profile/route.ts` — GET/PATCH for the caller's `publicProfiles/{uid}` doc.
  - `app/api/referral/{code,attribute}/route.ts` — lazy code issuance + one-way referee attribution on email verify.
  - `app/api/gifts/{mine,preview,redeem}/route.ts` — list buyer codes, unauthed preview, and authed redemption.
  - `app/api/contact/route.ts` — contact-form ingestion; Firestore persistence + Resend email.
- `lib/` — server + shared helpers.
  - `lib/firebase.ts`, `lib/firebaseAdmin.ts` — client and server SDK init.
  - `lib/kofiSkus.ts`, `lib/kofiGrant.ts` — Ko-fi SKU catalog + idempotent post-purchase grant.
  - `lib/gifts.ts` — gift-code minting + transactional redemption.
  - `lib/referral.ts` — referral code lifecycle + paired token grants.
  - `lib/social.ts`, `lib/socialAdmin.ts` — profile types + server-side helpers.
  - `lib/userPlan.ts`, `lib/tokenBank.ts`, `lib/rateLimit.ts` — plan state, bonus tokens, sliding-window limiter.
  - `lib/topics.ts` — 16 AP courses, official unit structures, curated lessons + flashcards + diagrams.
- `firestore.rules`, `storage.rules` — published security rules. Firestore is server-authoritative for every cross-user collection; client writes only hit `users/{uid}/...`. Storage locks writes entirely and exposes `avatars/{uid}/*` for public read.
- `MARKETING.md` — launch content pack (Reddit, TikTok, Twitter, email, ads).

## Local run (3 min)

```
cd finalsprep
npm install
cp .env.example .env.local       # only if it doesn't already exist
# Fill in the required env vars (see below)
npm run dev
```

Open http://localhost:3000.

## Required environment variables

Minimum needed for a usable dev instance:

1. **`ANTHROPIC_API_KEY`** — https://console.anthropic.com → API Keys → Create Key.
2. **Firebase client config** — 6 `NEXT_PUBLIC_FIREBASE_*` values. Firebase Console → Project Settings → Web app → Config.
3. **`FIREBASE_ADMIN_KEY_B64`** — base64-encoded service account JSON (see "Firebase Admin setup").
4. **`FIREBASE_STORAGE_BUCKET`** — usually the same value as `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`. Required for avatar uploads.
5. **Ko-fi config** (only for paid flows) — `KOFI_VERIFICATION_TOKEN` + `KOFI_CODE_*` direct-link codes per SKU. See "Ko-fi setup" below.
6. **Email delivery** (optional):
   - `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` — for contact-form delivery via nodemailer (see "Email" below).
   - `RESEND_API_KEY` — for the lead-magnet formula sheet at `/api/capture`.

Everything else in `.env.example` is optional.

## Firebase setup

FinalsPrep uses Firebase for auth, Firestore persistence, and Storage (avatars).

### 1. Create the project + enable Auth + Firestore

1. https://console.firebase.google.com → Add project.
2. **Build → Authentication → Get started** → enable **Email/Password**.
3. **Build → Firestore Database → Create database** → Production mode → pick your region.
4. **Firestore → Rules** → paste the contents of `firestore.rules` from this repo → Publish.
5. Gear icon → **Project settings → Your apps → Web (`</>`)** → register app → copy each value into `.env.local`:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`

### 2. Firebase Admin setup (server-side)

The server verifies ID tokens and writes billing/profile state using the Admin SDK.

1. Firebase Console → **Project Settings → Service accounts** → **Generate new private key** → save the JSON privately.
2. Base64-encode it and paste into `.env.local`:
   ```
   cat /path/to/service-account.json | base64 | tr -d '\n'
   ```
   Set `FIREBASE_ADMIN_KEY_B64` to the output.
3. Restart the dev server. The admin SDK auto-initializes on first API request.

### 3. Firebase Storage (for avatar uploads)

1. **Build → Storage → Get started** → Production mode → same region as Firestore.
2. **Storage → Rules** → paste the contents of `storage.rules` from this repo → Publish.
3. Set `FIREBASE_STORAGE_BUCKET` in `.env.local` to the bucket name shown in the Storage UI (usually `<project-id>.appspot.com`).

### 4. Authorized production domains

When you deploy, Firebase only accepts auth from whitelisted domains. Go to **Authentication → Settings → Authorized domains** and add your production domain alongside `localhost`.

## Ko-fi setup

Paid access is sold as **one-time Ko-fi shop orders**. Ko-fi routes the payment directly to your connected PayPal / Stripe; we only listen on the webhook to grant access.

### 1. Enable the webhook

1. https://ko-fi.com/manage/webhooks → copy the verification token.
2. Set `KOFI_VERIFICATION_TOKEN` in `.env.local`.
3. After you have a public URL (Vercel), paste `https://yourdomain.com/api/webhooks/kofi` as the endpoint.

### 2. Create Shop products + map SKUs

Each paid SKU gets its own shop product on Ko-fi. Create the product, copy the direct-link code from the URL (`ko-fi.com/s/<code>`), and paste it into the matching env var:

| SKU                    | Env var                          |
| ---------------------- | -------------------------------- |
| Pro, 1 month           | `KOFI_CODE_PRO_MONTHLY`          |
| Pro, 6 months          | `KOFI_CODE_PRO_SIXMONTH`         |
| Hacker, 1 month        | `KOFI_CODE_HACKER_MONTHLY`       |
| Hacker, 6 months       | `KOFI_CODE_HACKER_SIXMONTH`      |
| Token pack (small/med/large) | `KOFI_CODE_PACK_{SMALL,MEDIUM,LARGE}` |
| Gift — Pro, 1 month    | `KOFI_CODE_GIFT_PRO_MONTHLY`     |
| Gift — Pro, 6 months   | `KOFI_CODE_GIFT_PRO_SIXMONTH`    |
| Gift — Hacker, 1 month | `KOFI_CODE_GIFT_HACKER_MONTHLY`  |
| Gift — Hacker, 6 months| `KOFI_CODE_GIFT_HACKER_SIXMONTH` |

Gift SKUs are the same duration/tier as the regular plan, but the webhook mints a one-time redemption code instead of activating the buyer's plan, and credits the buyer 1,000 bonus tokens (Pro) or 2,500 (Hacker). Recipients claim at `/gift?code=XXXX`.

## Email

Two separate email paths, on purpose:

- **Contact form (`/api/contact`)** — nodemailer over SMTP. No verified-domain requirement, so it works with a plain Gmail inbox.
- **Lead-magnet capture (`/api/capture`)** — Resend, because it sends to untrusted user-provided addresses and needs a verified sending domain.

### Contact form (SMTP via nodemailer)

Recommended setup for `finalsprephelp@gmail.com`:

1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Create an App Password (Mail, "Other: FinalsPrep"): https://myaccount.google.com/apppasswords
3. Set env:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=finalsprephelp@gmail.com
   SMTP_PASS=<16-char app password, no spaces>
   ```

Sender and recipient are both hardcoded to `finalsprephelp@gmail.com` — the support inbox sends itself every submission. If you need a different routing setup, change the constants at the top of `sendContactEmail` in [app/api/contact/route.ts](app/api/contact/route.ts).

If SMTP env is missing, the contact form still writes to Firestore but no email goes out — nothing is lost.

### Lead-magnet capture (Resend)

1. https://resend.com → API Keys → create one → set `RESEND_API_KEY`.
2. Add your sending domain under **Domains** and verify the DNS records. Set `CAPTURE_FROM_EMAIL` to something like `FinalsPrep <hello@yourdomain.com>`. Defaults to `FinalsPrep <hello@finalsprep.com>`.

## Deploy to Vercel (10 min)

1. `git init && git add . && git commit -m "initial"`
2. Create a new GitHub repo (keep it private — `.env.local` is gitignored but don't commit service account JSONs either).
3. `git remote add origin ... && git push -u origin main`
4. https://vercel.com/new → import the repo → deploy.
5. Vercel → Project → Settings → Environment Variables → paste every line from `.env.local`. Set `NEXT_PUBLIC_SITE_URL` to the real domain.
6. Vercel → Settings → Domains → add your custom domain.
7. Redeploy.
8. Firebase Console → Authentication → Settings → Authorized domains → add the production domain.
9. Ko-fi → Webhooks → endpoint URL `https://yourdomain.com/api/webhooks/kofi`.

## How access enforcement works end to end

1. **Signup**: user creates account at `/signin`, receives a verification email, clicks the link, signs in. Firestore has the user doc but no billing record → plan defaults to `learner`.
2. **Free chat**: every chat request sends `Authorization: Bearer <idToken>`. Server verifies with Firebase Admin, reads the user's plan from Firestore, and rate-limits against the `learner` tier.
3. **Purchase**: user hits `/checkout?plan=pro-monthly` (or `?pack=...` / `?gift=...`). The page renders a `CheckoutPopup` that opens the Ko-fi product URL.
4. **Ko-fi webhook**: after the Ko-fi shop order clears, Ko-fi POSTs to `/api/webhooks/kofi`. We verify the token, look up the buyer by email, and dispatch per SKU:
   - **Plan** — extend `users/{uid}/profile/billing.currentPeriodEnd` from `max(now, currentPeriodEnd)`.
   - **Pack** — credit tokens to `users/{uid}/profile/tokenBank`.
   - **Gift** — mint a `giftCodes/{CODE}` doc tied to the buyer, mirror it under their `users/{uid}/profile/giftPurchases`, and credit the buyer thank-you tokens. Recipients redeem at `/gift?code=XXXX`.
5. **Live UI**: `AuthProvider` is subscribed via `onSnapshot` to the billing doc so the header and chat footer reflect the new tier the moment the webhook writes.
6. **Expiration**: `getPlan()` compares `currentPeriodEnd` to `now` on every request; once it passes, the user silently reverts to `learner` until they renew.
7. **Idempotency**: every grant dedupes on `users/{uid}/kofiOrders/{messageId}:{sku}:{i}` so Ko-fi retries never double-credit.

## Referrals + gifts (growth loops)

- **Referrals** — every signed-in user has a lazily-created code at `users/{uid}/profile/referral`. `/signin?mode=signup&ref=CODE` stashes the code in localStorage; when the referee verifies their email, `/api/referral/attribute` pairs them and grants both sides 5,000 tokens. The pairing is claimed in a Firestore transaction so parallel calls can't double-grant.
- **Gifts** — see the Ko-fi setup above for SKUs. Codes redeem transactionally (recipient can't claim twice, can't self-redeem), stack on top of existing plan periods, and buyers see a copyable `/gift?code=XXXX` link in their `/account?tab=billing` panel.

## Rate limits

Defined in `lib/rateLimit.ts`. Sliding 5-hour window, same shape as Claude's free plan. Paid tiers raise both the token ceiling and per-message count; the bonus-token bank at `users/{uid}/profile/tokenBank` covers spillover once the daily budget is exhausted. The in-memory store works for single-region dev and Vercel's warm-start model; swap for Upstash Redis if you need cross-instance fairness.

## Launch plan

See `MARKETING.md` for the full launch content pack (Reddit posts, TikTok scripts, Twitter threads, cold emails, ad copy, launch checklist).

## Troubleshooting

- **"Firebase isn't wired up yet"** — the six `NEXT_PUBLIC_FIREBASE_*` env vars are missing.
- **"auth/operation-not-allowed"** — Email/Password sign-in isn't enabled in Firebase Console.
- **"Authentication required" on chat/explain** — the client has a token but the server can't verify it. Check `FIREBASE_ADMIN_KEY_B64` is set and decodes to valid JSON.
- **Avatar uploads return 503 `storage-unconfigured`** — `FIREBASE_STORAGE_BUCKET` is missing, or Firebase Storage isn't enabled / its rules aren't published.
- **Ko-fi webhook returns `no-token-configured`** — set `KOFI_VERIFICATION_TOKEN` in your environment.
- **Webhook returns `sku-not-mapped`** — the incoming direct-link code doesn't match any `KOFI_CODE_*` env var. Copy the code from the Ko-fi product URL exactly.
- **Contact form returns success but no email arrives** — the four `SMTP_*` env vars are missing or wrong. Firestore still has the message — check `contactMessages/*`. Grep Vercel logs for `[contact] nodemailer failed to send` to see the exact SMTP error. For Gmail, the most common cause is using your normal password instead of an App Password; see the Email section.
- **"Demo mode"** — `ANTHROPIC_API_KEY` isn't set.
- **Rate limit not resetting** — the 5-hour window is sliding, not fixed. Check `resetMinutes` in the chat footer.
