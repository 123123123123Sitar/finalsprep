# FinalsPrep

An AI tutor that explains math, physics, CS, and history step by step. Covers **16 AP courses** organized by the official College Board unit structure. Free to try, $9/month or $50/year for unlimited usage. Built with Next.js 14, Firebase (auth + Firestore), Stripe (subscriptions), Anthropic Claude (streaming responses), KaTeX (math rendering), and Tailwind.

## What's in the box

- **`app/page.tsx`** — landing page with hero, live solver demo, stats strip, coverage of all 16 APs, pricing cards (monthly + yearly), email capture, FAQ, closing CTA
- **`app/study/page.tsx`** — study tool: categorized AP course picker, sidebar grouped by AP unit number, per-lesson tabs (Lesson / Diagram / Flashcards / Links / Solver)
- **`app/chat/page.tsx`** — tutor chat with streaming LaTeX responses, history sidebar, voice input, Claude-style 5-hour token budget
- **`app/signin/page.tsx`** — dedicated sign-in / sign-up page with email verification flow
- **`app/privacy/page.tsx`**, **`app/terms/page.tsx`** — plain-English legal pages
- **`app/api/chat/route.ts`** — streaming Anthropic endpoint with server-side auth, token-based rate limiting, plan lookup
- **`app/api/explain/route.ts`** — one-shot explain endpoint: curated walkthroughs (free, instant) + AI fallback (gated)
- **`app/api/checkout/route.ts`** — Stripe subscription checkout (monthly/yearly), attaches Firebase uid as `client_reference_id`
- **`app/api/webhooks/stripe/route.ts`** — verified Stripe webhook that promotes users to Pro in Firestore on successful checkout
- **`lib/firebase.ts`** — client SDK init
- **`lib/firebaseAdmin.ts`** — server SDK init from base64-encoded service account
- **`lib/authGuard.ts`** — server-side ID token verification
- **`lib/userPlan.ts`** — Firestore read/write for subscription plan state
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
4. **`STRIPE_SECRET_KEY`**, **`STRIPE_PRICE_MONTHLY`**, **`STRIPE_PRICE_YEARLY`** — see "Stripe setup" below.
5. **`STRIPE_WEBHOOK_SECRET`** — for verifying webhook payloads. See "Stripe webhook setup".

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

## Stripe setup

### 1. Account + products (test mode first)

1. https://dashboard.stripe.com/register → sign up. You can **skip activation** and stay in test mode while you develop.
2. Make sure you're in **Test mode** (toggle in the top nav).
3. **Products** → Add Product → "FinalsPrep Pro Monthly"
   - Recurring, $9.00 / month
   - Save → copy the `price_...` ID
4. Repeat for "FinalsPrep Pro Yearly" → $50.00 / year
5. **Developers → API keys** → copy the **Secret key** (`sk_test_...`)
6. In `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PRICE_MONTHLY=price_...
   STRIPE_PRICE_YEARLY=price_...
   ```
7. Test with card `4242 4242 4242 4242` (any future date, any CVC).

### 2. Stripe webhook setup

The webhook promotes users to Pro when their checkout completes. For local development you need the Stripe CLI:

```
# Install if you haven't (already done on this machine via brew):
brew install stripe/stripe-cli/stripe

stripe login                                      # opens browser, authenticates CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The `stripe listen` command prints a line like:
```
> Ready! Your webhook signing secret is whsec_1234abcd...
```

Paste that value into `.env.local` as `STRIPE_WEBHOOK_SECRET`. Keep `stripe listen` running in a separate terminal while testing - it forwards real Stripe events to your local server.

For **production** (Vercel): Stripe Dashboard → **Developers → Webhooks → Add endpoint** → URL `https://yourdomain.com/api/webhooks/stripe` → select events `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted` → Save → copy the **Signing secret** → set as `STRIPE_WEBHOOK_SECRET` in Vercel env vars.

### 3. Going live

When you're ready for real payments:
1. Stripe dashboard → **Activate account** → complete the KYC flow (legal name, DOB, last-4 SSN, bank, address). Takes 5-10 min of forms + 1-2 business days of verification.
2. Optionally: **Settings → Payouts → Schedule → Manual** so funds sit in your balance until you trigger a payout.
3. Flip dashboard to **Live mode**.
4. Re-create the two products + prices in live mode (they're separate from test mode).
5. Swap `sk_test_...` for `sk_live_...` and update `STRIPE_PRICE_MONTHLY` / `STRIPE_PRICE_YEARLY` to the live price IDs in your production env.
6. Re-create the webhook endpoint in live mode and update `STRIPE_WEBHOOK_SECRET`.

## Deploy to Vercel (10 min)

1. `git init && git add . && git commit -m "initial"`
2. Create a new GitHub repo (keep it private - your `.env.local` is gitignored but don't push service account JSONs).
3. `git remote add origin ... && git push -u origin main`
4. https://vercel.com/new → Import the repo → Deploy.
5. Vercel → Project → Settings → Environment Variables → paste **every** line from your `.env.local`. Make sure to set `NEXT_PUBLIC_SITE_URL` to your real domain.
6. Vercel → Settings → Domains → add your custom domain → follow DNS instructions.
7. Redeploy.
8. Firebase Console → Authentication → Settings → Authorized domains → add your production domain.
9. Stripe Dashboard → Webhooks → Add production endpoint → copy signing secret → add to Vercel env vars.

## How the plan enforcement works end to end

1. **Signup**: user creates account at `/signin`, receives verification email, clicks link, signs in. Firestore has the user doc but no billing record yet → plan defaults to `free`.
2. **Free chat**: every chat request sends `Authorization: Bearer <idToken>`. Server verifies the token with Firebase Admin, looks up the user's plan in Firestore, and rate-limits against the `free` tier (4,000 tokens per 5-hour rolling window).
3. **Subscribe**: user clicks "Start Pro - $9/month". Client fetches `/api/checkout` with the ID token. Server creates a Stripe Checkout Session with `client_reference_id = user.uid` and subscription metadata `{ uid, plan }`.
4. **Webhook**: Stripe sends `checkout.session.completed` to `/api/webhooks/stripe`. Server verifies the signature, reads the uid from `client_reference_id`, fetches the subscription, and writes `{ plan: "pro", stripeCustomerId, stripeSubscriptionId, currentPeriodEnd }` to `users/{uid}/profile/billing` in Firestore.
5. **Paid chat**: AuthProvider is subscribed via `onSnapshot` to the billing doc, so the chat footer instantly reads "Pro plan · unlimited". Next request rate-limits against the `paid` tier (60,000 tokens per 5-hour window).
6. **Cancellation**: `customer.subscription.deleted` webhook event sets the plan back to `free`. The user's access expires at the end of the current billing period via the `currentPeriodEnd` check in `lib/userPlan.ts`.

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
- **Webhook signature verification fails** — `STRIPE_WEBHOOK_SECRET` is wrong. In local dev, re-run `stripe listen` and grab the `whsec_...` it prints. In production, re-copy from Stripe Dashboard → Webhooks.
- **"Demo mode"** — `ANTHROPIC_API_KEY` isn't set. Add it to `.env.local` and restart.
- **Rate limit not resetting** — the 5-hour window is sliding, not fixed. Wait until the oldest entry ages out. Check `resetMinutes` in the chat footer.
