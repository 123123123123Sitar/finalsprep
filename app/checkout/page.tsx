import SiteNav from "@/app/components/SiteNav";
import { kofiUrlFor, planSkuFromId, packSkuFromId } from "@/lib/kofiSkus";
import {
  parseCheckoutPlan,
  planPrice,
  checkoutDescription,
  type PaidCheckoutPlan,
} from "@/lib/plans";
import { TOKEN_PACKS } from "@/lib/tokenPacks";
import CheckoutPopup from "./CheckoutPopup";

export const dynamic = "force-dynamic";

type SearchParams = { plan?: string; pack?: string };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const packId = typeof params.pack === "string" ? params.pack : null;
  const planId = typeof params.plan === "string" ? params.plan : null;

  if (packId) {
    const pack = packSkuFromId(packId);
    if (!pack) return <InvalidItem />;
    const kofiUrl = kofiUrlFor({ kind: "pack", sku: pack.sku });
    const packDetails = TOKEN_PACKS.find((p) => p.id === pack.sku);
    if (!packDetails) return <InvalidItem />;
    return (
      <Shell>
        <CheckoutPopup
          kind="pack"
          sku={pack.sku}
          title={packDetails.label}
          subtitle={`${pack.tokens.toLocaleString()} bonus AI tokens. Stack on top of your daily budget, never expire.`}
          priceUsd={packDetails.priceUsd}
          kofiUrl={kofiUrl}
          successPath="/shop?status=ok"
          benefits={[
            `${pack.tokens.toLocaleString()} bonus tokens credited to your account`,
            "Never expire, use any time you hit your daily cap",
            "Stack freely with your tier's daily allowance",
          ]}
        />
      </Shell>
    );
  }

  const { key, tier, interval } = parseCheckoutPlan(planId ?? "pro-monthly");
  const plan = planSkuFromId(key);
  if (!plan) return <InvalidItem />;
  const kofiUrl = kofiUrlFor({ kind: "plan", sku: plan.sku });
  const price = planPrice(key);

  return (
    <Shell>
      <CheckoutPopup
        kind="plan"
        sku={plan.sku}
        title={checkoutDescription(tier, interval)}
        subtitle={
          interval === "monthly"
            ? "1 month of access. Does not auto-renew."
            : "6 months of access. Does not auto-renew."
        }
        priceUsd={price.amount}
        kofiUrl={kofiUrl}
        successPath={`/success?plan=${encodeURIComponent(plan.sku)}`}
        benefits={benefitsFor(tier, interval as PaidCheckoutPlan extends `${string}-${infer I}` ? I : never)}
      />
    </Shell>
  );
}

function benefitsFor(tier: "pro" | "hacker", interval: "monthly" | "sixmonth"): string[] {
  if (tier === "pro") {
    return [
      "20,000 AI tokens per day",
      "Smarter model + Thinking mode for hard problems",
      "All 16 AP courses, every unit, unlimited lessons",
      "Image uploads, FRQ practice, 5 diagnostic quizzes / month",
      interval === "sixmonth" ? "$15/month, billed once" : "$16 for the month",
    ];
  }
  return [
    "80,000 AI tokens per day",
    "Strongest model + Thinking mode on demand",
    "Priority AI traffic, no queueing",
    "Unlimited diagnostic quizzes",
    interval === "sixmonth" ? "$27/month, billed once" : "$29 for the month",
  ];
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-paper text-body min-h-screen">
      <SiteNav />
      {children}
    </main>
  );
}

function InvalidItem() {
  return (
    <Shell>
      <section className="mx-auto max-w-xl px-6 py-16">
        <h1 className="font-serif text-3xl text-ink">We couldn't find that item.</h1>
        <p className="mt-3 text-body">Check the link or head back to the pricing page.</p>
        <a href="/#price" className="btn-primary mt-6 inline-flex">View pricing</a>
      </section>
    </Shell>
  );
}
