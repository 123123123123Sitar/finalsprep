# FinalsPrep

An AI tutor that explains math, physics, CS, and history step by step. Covers **16 AP courses** organized by the official College Board unit structure. Free to try, one-time PayPal purchases for paid access. Built with Next.js 14, Firebase (auth + Firestore), PayPal Orders API (one-time payments), Anthropic Claude (streaming responses), KaTeX (math rendering), and Tailwind.

## What's in the box

- **`app/page.tsx`** — landing page with hero, live solver demo, stats strip, coverage of all 16 APs, pricing cards (monthly + yearly), email capture, FAQ, closing CTA
- **`app/study/page.tsx`** — study tool: categorized AP course picker, sidebar grouped by AP unit number, per-lesson tabs (Lesson / Diagram / Flashcards / Links / Solver)
- **`app/chat/page.tsx`** — tutor chat with streaming LaTeX responses, history sidebar, voice input, Claude-style 5-hour token budget
- **`app/signin/page.tsx`** — dedicated sign-in / sign-up page with email verification flow
- **`app/privacy/page.tsx`**, **`app/terms/page.tsx`** — plain-English legal pages
- **`app/api/chat/route.ts`** — streaming Anthropic endpoint with server-side auth, token-based rate limiting, plan lookup
- **`app/api/explain/route.ts`** — one-shot explain endpoint: curated walkthroughs (free, instant) + AI fallback (gated)
- **`app/api/paypal/create-order/route.ts`** — creates a PayPal Order for the chosen plan (Pro/Hacker × monthly/6-month) or token pack, embeds `{uid, plan, coupon}` in `custom_id`
- **`app/api/paypal/capture-order/route.ts`** — captures an approved order, extends the user's access period in Firestore
- **`app/api/webhooks/paypal/route.ts`** — verified PayPal webhook (PAYMENT.CAPTURE.COMPLETED) for belt-and-braces idempotent re-grant
- **`app/checkout/page.tsx`** — PayPal Buttons checkout page used for all paid purchases
- **`lib/firebase.ts`** — client SDK init
- **`lib/firebaseAdmin.ts`** — server SDK init from base64-encoded service account
- **`lib/authGuard.ts`** — server-side ID token verification
- **`lib/userPlan.ts`** — Firestore read/write for access-period state (auto-downgrades to learner when `currentPeriodEnd` passes)
- **`lib/paypal.ts`** — server-side PayPal REST helper (OAuth, create/capture orders, verify webhook)
- **`lib/rateLimit.ts`** — sliding 5-hour token window limiter
- **`lib/topics.ts`** — 16 AP courses, official unit structures, 21 curated lessons with walkthroughs, flashcards, links, diagrams
- **`lib/autoLatex.ts`** — plain-text math → KaTeX auto-wrapper
- **`MARKETING.md`** — launch content pack (Reddit, TikTok, Twitter, email, ads)

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

Minimum needed for the full flow to work:

1. **`ANTHROPIC_API_KEY`** — https://console.anthropic.com → API Keys → Create Key. Add $5+ credit.
2. **Firebase client config** — 6 `NEXT_PUBLIC_FIREBASE_*` values. Firebase Console → Project Settings → Web app → Config.
3. **`FIREBASE_ADMIN_KEY_B64`** — base64-encoded service account JSON. See "Firebase Admin setup" below.
4. **`PAYPAL_CLIENT_ID`** + **`NEXT_PUBLIC_PAYPAL_CLIENT_ID`** (same value), **`PAYPAL_CLIENT_SECRET`**, **`PAYPAL_ENV`** (`sandbox` or `live`) — see "PayPal setup" below.
5. **`PAYPAL_WEBHOOK_ID`** — optional, for the belt-and-braces webhook. Only add once you have a public URL.

Everything else in `.env.example` is optional.

## Firebase setup

The chat requires a Firebase project for authentication and storing chat history. Each user must verify their email before they can chat.

### 1. Create the project + enable auth

1. https://console.firebase.google.com → Add project (or use an existing one).
2. Left sidebar → **Build → Authentication → Get started**.
3. **Sign-in method** tab → **Email/Password** → Enable → Save.
4. Left sidebar → **Build → Firestore Database → Create database** → Production mode → pick closest region.
5. Firestore → **Rules** tab → paste:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
   → Publish.
6. Gear icon → **Project settings → Your apps → Web (`</>`)** → register app → copy each value into `.env.local`:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`

### 2. Firebase Admin setup (for server-side auth + webhook)

The server verifies ID tokens and writes subscription state to Firestore using Firebase Admin SDK. Admin requires a service account key.

1. Firebase Console → **Project Settings → Service accounts** → **Generate new private key** → Save the downloaded `.json` somewhere private.
2. Base64-encode the JSON and paste into `.env.local`:
   ```
   cat /path/to/service-account.json | base64 | tr -d '\n'
   ```
   Set `FIREBASE_ADMIN_KEY_B64` to the output.
3. Restart the dev server. The admin SDK auto-initializes on first API request.

### 3. Authorized production domains

When you deploy, Firebase only accepts auth from whitelisted domains. Go to **Authentication → Settings → Authorized domains** and add your production domain alongside `localhost`.

## PayPal setup

We use **one-time PayPal Orders** (not subscriptions). Each purchase unlocks
access for a fixed period and does not auto-renew — the user revisits
`/checkout` to renew. This is the only model that works on PayPal Personal
accounts; if you upgrade to PayPal Business you can switch to the
Subscriptions API later.

### 1. Create a REST API app (sandbox)

1. https://developer.paypal.com/dashboard/applications/sandbox → log in.
2. Apps & Credentials → **Create App** → name it "FinalsPrep" → Type: Merchant → Create.
3. Copy the **Client ID** and reveal + copy **Secret key 1**.
4. In `.env.local`:
   ```
   PAYPAL_ENV=sandbox
   PAYPAL_CLIENT_ID=...
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=...   # same value, exposed to the browser SDK
   PAYPAL_CLIENT_SECRET=...
   ```
5. Sandbox test accounts: developer dashboard → Testing Tools → Sandbox Accounts.
   Use the generated "personal" account's email + password in the PayPal popup
   on the /checkout page to simulate a buyer.

### 2. PayPal webhook (optional, recommended after deploy)

The `/api/paypal/capture-order` route is authoritative — it writes the
user's new plan/expiration to Firestore as soon as PayPal returns a
completed capture. The webhook at `/api/webhooks/paypal` is a belt-and-
braces idempotent re-grant in case the browser drops between approval
and capture.

1. Deploy to Vercel so you have a public URL.
2. Developer dashboard → your FinalsPrep app → **Sandbox Webhooks** →
   **Add Webhook** → URL: `https://yourdomain.com/api/webhooks/paypal`.
3. Event types: **Payment capture completed** (`PAYMENT.CAPTURE.COMPLETED`).
4. Copy the **Webhook ID** → set as `PAYPAL_WEBHOOK_ID` in Vercel env vars.

### 3. Going live

1. Upgrade your PayPal account to **PayPal for Business** (free, 5 min).
2. Developer dashboard → switch to **Live** → **Create App** → copy live
   Client ID + Secret. Recreate the webhook under **Live Webhooks**.
3. In production env: `PAYPAL_ENV=live` + the live client ID/secret/webhook.

## Deploy to Vercel (10 min)

1. `git init && git add . && git commit -m "initial"`
2. Create a new GitHub repo (keep it private - your `.env.local` is gitignored but don't push service account JSONs).
3. `git remote add origin ... && git push -u origin main`
4. https://vercel.com/new → Import the repo → Deploy.
5. Vercel → Project → Settings → Environment Variables → paste **every** line from your `.env.local`. Make sure to set `NEXT_PUBLIC_SITE_URL` to your real domain.
6. Vercel → Settings → Domains → add your custom domain → follow DNS instructions.
7. Redeploy.
8. Firebase Console → Authentication → Settings → Authorized domains → add your production domain.
9. PayPal developer dashboard → Webhooks → Add endpoint → URL `https://yourdomain.com/api/webhooks/paypal` → copy Webhook ID → set as `PAYPAL_WEBHOOK_ID` in Vercel env vars.

## How the plan enforcement works end to end

1. **Signup**: user creates account at `/signin`, receives verification email, clicks link, signs in. Firestore has the user doc but no billing record yet → plan defaults to `learner`.
2. **Free chat**: every chat request sends `Authorization: Bearer <idToken>`. Server verifies the token with Firebase Admin, looks up the user's plan in Firestore, and rate-limits against the `learner` tier.
3. **Purchase**: user clicks "Start Pro". Client redirects to `/checkout?plan=pro-monthly`. The PayPal Buttons calls `/api/paypal/create-order` with the ID token. Server creates a PayPal Order with `custom_id = "<uid>|<plan>|<coupon?>"`.
4. **Approval + capture**: user approves in the PayPal popup. Client calls `/api/paypal/capture-order` with the order ID. Server verifies the buyer, captures via PayPal, then writes `{ plan: "pro"|"hacker", billingInterval, paypalOrderId, currentPeriodEnd }` to `users/{uid}/profile/billing` in Firestore. `currentPeriodEnd` is extended from `max(now, currentPeriodEnd)`.
5. **Webhook** (belt-and-braces): PayPal posts `PAYMENT.CAPTURE.COMPLETED` to `/api/webhooks/paypal`. The route verifies the signature and performs the same grant idempotently (no-op if the capture route already ran).
6. **Paid chat**: AuthProvider is subscribed via `onSnapshot` to the billing doc, so the chat footer instantly reflects the new tier.
7. **Expiration**: `getPlan()` compares `currentPeriodEnd` to `now` on every request. Once the period passes, the user silently reverts to `learner` until they buy again.

## Rate limits

Defined in `lib/rateLimit.ts`. Sliding 5-hour window, same shape as Claude's free plan.

| Tier | Tokens / 5h | Messages / 5h |
|---|---|---|
| Free | 4,000 | 10 |
| Paid | 60,000 | 120 |

`paid` is derived from the Firestore billing doc (see above). Both limits are enforced server-side using the authenticated `uid` as the bucket key. Curated walkthroughs never count against the budget.

**Production note:** the limiter is in-memory (`new Map()`). Local dev is fine; Vercel serverless cold-starts reset the Map. For real production abuse protection, swap the backing store for Upstash Redis (~15 min of work, single file change).

## Launch plan

See `MARKETING.md` for the full launch content pack (Reddit posts, TikTok scripts, Twitter threads, cold emails, ad copy, 48-hour launch checklist).

## Domain suggestions

- finalsprep.com / .app / .io
- apprep.io / .app
- cramapp.io
- studystreak.app
- myaptutor.com

Grab one from Namecheap or Cloudflare ($10-15/year).

## Troubleshooting

- **"Firebase isn't wired up yet"** — `NEXT_PUBLIC_FIREBASE_*` env vars are missing. Fill in all six.
- **"auth/operation-not-allowed"** — Email/Password sign-in isn't enabled in Firebase Console. Enable it under Authentication → Sign-in method.
- **"Authentication required" on chat/explain** — the client is signed in but the server can't verify the ID token. Check that `FIREBASE_ADMIN_KEY_B64` is set and base64-encodes valid JSON.
- **Webhook signature verification fails** — `PAYPAL_WEBHOOK_ID` is wrong or missing. Copy it from Developer Dashboard → your app → Sandbox Webhooks → Webhook ID. (The webhook route is belt-and-braces; the primary grant path is `/api/paypal/capture-order`.)
- **"paypal-not-configured"** — `PAYPAL_CLIENT_ID` and/or `PAYPAL_CLIENT_SECRET` are missing on the server. Check `.env.local` / Vercel env vars.
- **PayPal Buttons never render** — `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is missing on the client. It must be set at build time (it's a `NEXT_PUBLIC_` var).
- **"Demo mode"** — `ANTHROPIC_API_KEY` isn't set. Add it to `.env.local` and restart.
- **Rate limit not resetting** — the 5-hour window is sliding, not fixed. Wait until the oldest entry ages out. Check `resetMinutes` in the chat footer.
