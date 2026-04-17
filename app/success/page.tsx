import SiteNav from "@/app/components/SiteNav";
import SuccessNotifier from "./SuccessNotifier";

export default function Success({
  searchParams,
}: {
  searchParams?: { plan?: string };
}) {
  const plan = typeof searchParams?.plan === "string" ? searchParams.plan : null;
  return (
    <main className="bg-paper">
      <SiteNav />
      <SuccessNotifier plan={plan} />
      <section className="mx-auto max-w-2xl px-6 py-24">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          Payment received
        </div>
        <h1 className="mt-3 font-serif text-5xl font-normal leading-tight text-ink">
          You're in. Thank you.
        </h1>
        <div className="prose-body mt-6">
          <p>
            Your plan is active. A receipt is on its way from Ko-fi / PayPal. If you
            paid with a school email, the receipt may land in spam.
          </p>
          <p className="mt-4">
            Start with whatever topic you have a test on first. Most people
            jump straight to the solver. That's fine.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/study" className="btn-primary">Open the study tool</a>
          <a href="mailto:finalsprephelp@gmail.com" className="btn-ghost">
            Email if something breaks
          </a>
        </div>
        <p className="mt-10 text-xs text-muted">
          7-day refund, no questions. Reply to your receipt within a week.
        </p>
      </section>
    </main>
  );
}
