import { redirect } from "next/navigation";
import SiteNav from "@/app/components/SiteNav";
import { kofiUrlFor, planSkuFromId, packSkuFromId } from "@/lib/kofiSkus";
import { parseCheckoutPlan, planPrice, checkoutDescription } from "@/lib/plans";
import { TOKEN_PACKS } from "@/lib/tokenPacks";

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
    const url = kofiUrlFor({ kind: "pack", sku: pack.sku });
    if (url) redirect(url);
    const packDetails = TOKEN_PACKS.find((p) => p.id === pack.sku);
    return (
      <ManualCheckout
        title={packDetails?.label ?? "Token pack"}
        subtitle={`${pack.tokens.toLocaleString()} bonus tokens, never expire.`}
        priceUsd={packDetails?.priceUsd ?? 0}
      />
    );
  }

  const { key, tier, interval } = parseCheckoutPlan(planId ?? "pro-monthly");
  const plan = planSkuFromId(key);
  if (!plan) return <InvalidItem />;
  const url = kofiUrlFor({ kind: "plan", sku: plan.sku });
  if (url) redirect(url);

  const price = planPrice(key);
  return (
    <ManualCheckout
      title={checkoutDescription(tier, interval)}
      subtitle={
        interval === "monthly"
          ? "1 month of access. Does not auto-renew."
          : "6 months of access. Does not auto-renew."
      }
      priceUsd={price.amount}
    />
  );
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

function ManualCheckout({
  title,
  subtitle,
  priceUsd,
}: {
  title: string;
  subtitle: string;
  priceUsd: number;
}) {
  return (
    <Shell>
      <section className="mx-auto max-w-xl px-6 py-16">
        <div className="label mb-3">Checkout</div>
        <h1 className="font-serif text-3xl leading-tight text-ink">{title}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>

        <div className="mt-8 rounded-xl border border-hair bg-paper p-6">
          <p className="text-sm text-body">
            Checkout isn't wired up for this item yet — the Ko-fi product link
            hasn't been configured. For now, send{" "}
            <strong className="text-ink">${priceUsd.toFixed(2)}</strong> to{" "}
            <a
              className="underline"
              href="https://ko-fi.com/finalsprep"
              target="_blank"
              rel="noopener noreferrer"
            >
              ko-fi.com/finalsprep
            </a>{" "}
            with your FinalsPrep account email in the message field, and we'll
            activate your plan within a few hours.
          </p>
          <p className="mt-3 text-xs text-muted">
            Or email{" "}
            <a className="underline" href="mailto:finalsprephelp@gmail.com">
              finalsprephelp@gmail.com
            </a>{" "}
            and we'll sort you out directly.
          </p>
        </div>
      </section>
    </Shell>
  );
}
