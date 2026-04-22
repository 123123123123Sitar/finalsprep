import SiteNav from "@/app/components/SiteNav";

export const metadata = {
  title: "Privacy Policy - FinalsPrep",
  description: "How FinalsPrep collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-paper text-body">
      <SiteNav>
        <a href="/study" className="nav-link">Study</a>
      </SiteNav>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="label mb-3">Legal</div>
        <h1 className="font-serif text-5xl font-normal leading-tight text-ink">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: April 13, 2026</p>

        <div className="prose-body mt-10 space-y-6">
          <p>
            FinalsPrep ("we", "us") builds an AI tutor for high school and
            college students. This policy explains, in plain English, what
            data we collect and what we do with it.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            1. What we collect
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-ink">Account info:</strong> the email
              address you sign up with, stored with our authentication
              provider.
            </li>
            <li>
              <strong className="text-ink">Chat history:</strong> the
              messages you send to the AI tutor and the responses you get
              back. These are stored under your user ID so you can access
              them across devices.
            </li>
            <li>
              <strong className="text-ink">Billing info:</strong> when you
              buy a plan, our payment processor handles the transaction.
              We never see or store your card number; we only receive an
              order ID and a payment status.
            </li>
            <li>
              <strong className="text-ink">Technical data:</strong> basic
              server logs (IP address, user agent, timestamp) for about 14
              days, used only to debug and enforce rate limits.
            </li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            2. What we do with it
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>Run the product - your account, your chat history, your billing.</li>
            <li>
              Send chat prompts to upstream AI model providers to generate
              responses. Those providers operate under their own data
              retention policies, which prohibit training on customer
              inputs by default.
            </li>
            <li>Enforce per-user rate limits so one account can't drain the API budget for everyone.</li>
            <li>
              Send occasional product emails (at most once a month) if you
              ask for the free cheat sheet or receive an account notice.
              You can unsubscribe in one click.
            </li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            3. What we don't do
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>We don't sell your data to anyone, ever.</li>
            <li>
              We don't train AI models on your chat history. Our upstream
              model providers don't either; their API terms prohibit
              training on customer inputs by default.
            </li>
            <li>We don't show ads on the site.</li>
            <li>We don't use tracking pixels beyond basic, aggregated analytics.</li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            4. Children's privacy
          </h2>
          <p>
            FinalsPrep is targeted at high school and college students.
            Students under 13 should not use FinalsPrep without a parent's
            consent. If you're a parent and you believe we have your
            under-13 child's data, email{" "}
            <a className="text-orange underline" href="mailto:finalsprephelp@gmail.com">
              finalsprephelp@gmail.com
            </a>{" "}
            and we will delete it.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            5. Your rights
          </h2>
          <p>
            You can: download your chat history, delete individual
            conversations from the history sidebar, delete your entire
            account (email{" "}
            <a className="text-orange underline" href="mailto:finalsprephelp@gmail.com">
              finalsprephelp@gmail.com
            </a>{" "}
            and we'll purge it within 7 days). Paid plans are one-time
            purchases and do not auto-renew, so there is no subscription
            to cancel.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            6. Where data lives
          </h2>
          <p>
            Account data and chat history are stored in a managed
            cloud-hosted database in the US region. Payment records are
            held by our payment processor. Chat prompts are sent to our
            upstream AI model providers for inference. No other third
            parties touch user data.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            7. Changes to this policy
          </h2>
          <p>
            If we change how we handle data, we will update this page and
            note the date at the top. For material changes, we will email
            everyone with an active account.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">8. Contact</h2>
          <p>
            Questions:{" "}
            <a className="text-orange underline" href="mailto:finalsprephelp@gmail.com">
              finalsprephelp@gmail.com
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
